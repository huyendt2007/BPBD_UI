/**
 * xoa_dang_ky.js - UC026
 * Quản lý logic màn hình nhập thông tin xóa đăng ký (MH02)
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Kiểm tra session & nạp dữ liệu gốc từ localStorage (hoặc nạp dữ liệu giả lập mặc định để test)
    let regNum = localStorage.getItem('xoaRegNum');
    let pinNum = localStorage.getItem('xoaPinNum');
    let baselineDataRaw = localStorage.getItem('xoaBaselineData');

    let baselineData = null;
    try {
        if (baselineDataRaw) {
            baselineData = JSON.parse(baselineDataRaw);
        }
    } catch (e) {}

    const isStale = !regNum || !pinNum || !baselineData || 
                    baselineData.scale === 'Doanh nghiệp lớn' || 
                    !baselineData.assets || 
                    baselineData.assets.length < 7;

    if (isStale) {
        console.warn("Không tìm thấy thông tin phiên tra cứu hoặc phát hiện dữ liệu cũ. Tự động nạp dữ liệu giả lập mới để chạy thử.");
        regNum = "12345678";
        pinNum = "8888";
        const defaultMock = {
            requester: "Bên nhận thế chấp",
            orgName: "NGÂN HÀNG TMCP FPT",
            exemption: false,
            isFemaleOwner: false,
            scale: "Bên bảo đảm là công ty có ít hơn 10 nhân viên",
            loanValue: "2,500,000,000",
            contractNo: "HĐTC-2026-FPT",
            contractDate: "04/01/2026",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            assetDescription: "Các phương tiện giao thông cơ giới đường bộ và các tài sản khác thuộc quyền sở hữu của bên bảo đảm để bảo đảm cho toàn bộ nghĩa vụ nợ của bên bảo đảm đối với bên nhận bảo đảm.",
            securingParties: [
                {
                    type: "cd_vn",
                    name: "Nguyễn Văn Nam",
                    paperType: "CCCD",
                    paperNo: "001088012345",
                    address: "Số 15 Lý Thường Kiệt, Phường Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    name: "Trần Thị Bé",
                    paperType: "CCCD",
                    paperNo: "002095067890",
                    address: "Số 88 Giải Phóng, Phường Phương Mai, Quận Đống Đa, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    name: "NGÂN HÀNG TMCP FPT",
                    country: "Việt Nam",
                    province: "Thành phố Hà Nội",
                    address: "Số 17 Duy Tân, Quận Cầu Giấy, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    type: "sokhung",
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con Toyota Vios",
                    brandColor: "Toyota Vios, Màu đen",
                    frameNo: "TYT-VIOS-88992",
                    engineNo: "ENG-4A-FE-990",
                    plateNo: "30H-123.45",
                    hasNotice: true,
                    noticeAgency: "Cục Cảnh sát Giao thông đường bộ - Hà Nội",
                    status: "Không thay đổi"
                },
                {
                    id: 2,
                    type: "tauca",
                    typeName: "Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
                    name: "Tàu cá vỏ gỗ Hải Nam",
                    brandColor: "Chủ sở hữu: Công ty TNHH Hải Nam - Cấp IV",
                    frameNo: "ĐK-99882-HP",
                    engineNo: "---",
                    plateNo: "",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Không thay đổi"
                },
                {
                    id: 3,
                    type: "quyen_ts",
                    typeName: "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản",
                    name: "Quyền đòi nợ phát sinh từ Hợp đồng mua bán số 12/2026/HĐMB",
                    brandColor: "Căn cứ phát sinh: Hợp đồng số 12/2026/HĐMB ký giữa Công ty A và Công ty B",
                    frameNo: "---",
                    engineNo: "---",
                    plateNo: "",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Không thay đổi"
                },
                {
                    id: 4,
                    type: "cay_hang_nam",
                    typeName: "Cây hằng năm, công trình tạm",
                    name: "Vườn cây cao su 5 năm tuổi",
                    brandColor: "Khu đất canh tác tại xã Ea Kly, huyện Krông Pắc, Đắk Lắk",
                    frameNo: "---",
                    engineNo: "---",
                    plateNo: "",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Không thay đổi"
                },
                {
                    id: 5,
                    type: "hang_hoa",
                    typeName: "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ",
                    name: "Kho hạt cà phê lưu kho",
                    brandColor: "Địa chỉ kho: Số 45 Cảng Cát Lái, Quận 2, TP.HCM - Số hiệu kho: KH-CF-02",
                    frameNo: "---",
                    engineNo: "---",
                    plateNo: "",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Không thay đổi"
                },
                {
                    id: 6,
                    type: "chung_khoan",
                    typeName: "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung",
                    name: "100.000 cổ phiếu của Công ty Cổ phần Thủy sản Miền Nam",
                    brandColor: "Thời điểm đăng ký: 09 giờ 30 phút ngày 15/04/2026",
                    frameNo: "---",
                    engineNo: "---",
                    plateNo: "",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Không thay đổi"
                },
                {
                    id: 7,
                    type: "dong_san_khac",
                    typeName: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
                    name: "Dây chuyền máy móc dệt may chuyên dụng",
                    brandColor: "Nhập khẩu nguyên chiếc từ Nhật Bản, Model 2025-TXT",
                    frameNo: "---",
                    engineNo: "---",
                    plateNo: "",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Không thay đổi"
                }
            ],
            pin: "8888"
        };
        localStorage.setItem('xoaRegNum', regNum);
        localStorage.setItem('xoaPinNum', pinNum);
        localStorage.setItem('xoaBaselineData', JSON.stringify(defaultMock));
        // Clear any old draft dossier to force a fresh test flow
        localStorage.removeItem('xoaDossierDraft');
        baselineData = defaultMock;
    }

    // 2. DOM Elements
    const refRegNumInput = document.getElementById('refRegNum');
    const refRegDateInput = document.getElementById('refRegDate');
    const refContractNoInput = document.getElementById('refContractNo');
    const refContractDateInput = document.getElementById('refContractDate');
    const refLoanValueInput = document.getElementById('refLoanValue');
    const refScaleInput = document.getElementById('refScale');
    const refFemaleOwnerCheckbox = document.getElementById('refFemaleOwner');
    const refContractTypeSelect = document.getElementById('refContractType');

    const requesterRoleSelect = document.getElementById('requesterRole');
    const representativeProofBlock = document.getElementById('representativeProofBlock');
    const fileRepresentativeInput = document.getElementById('fileRepresentative');
    const representativeFileInfo = document.getElementById('representativeFileInfo');
    const lblRepresentativeFileName = document.getElementById('lblRepresentativeFileName');
    const btnDeleteRepresentativeFile = document.getElementById('btnDeleteRepresentativeFile');
    const dropzoneRepresentative = document.getElementById('dropzoneRepresentative');

    const deletionBasisSelect = document.getElementById('deletionBasis');

    const exemptionTypeSelect = document.getElementById('exemptionType');
    const exemptionProofBlock = document.getElementById('exemptionProofBlock');
    const fileExemptionInput = document.getElementById('fileExemption');
    const exemptionFileInfo = document.getElementById('exemptionFileInfo');
    const lblExemptionFileName = document.getElementById('lblExemptionFileName');
    const btnDeleteExemptionFile = document.getElementById('btnDeleteExemptionFile');
    const dropzoneExemption = document.getElementById('dropzoneExemption');

    const securingPartiesBody = document.getElementById('securingPartiesBody');
    const securedPartiesBody = document.getElementById('securedPartiesBody');
    const assetsTableBody = document.getElementById('assetsTableBody');

    const btnBack = document.getElementById('btnBack');
    const btnDraft = document.getElementById('btnDraft');
    const btnSubmit = document.getElementById('btnSubmit');

    const errorSummary = document.getElementById('errorSummary');
    const errorList = document.getElementById('errorList');

    // 3. State Management for Uploaded Files
    let uploadedFiles = {
        representative: null,
        exemption: null
    };

    // 4. Fill baseline data into form
    refRegNumInput.value = regNum;
    refRegDateInput.value = (regNum === '12345678') ? "15/04/2026 09:30:15" : "05/01/2026 08:00:00";
    refContractNoInput.value = baselineData.contractNo || 'HĐTC-2026-FPT';
    refContractDateInput.value = baselineData.contractDate || '04/01/2026';
    refLoanValueInput.value = baselineData.loanValue ? baselineData.loanValue + " VNĐ" : '2,500,000,000 VNĐ';
    refScaleInput.value = baselineData.scale || 'Doanh nghiệp lớn';
    refFemaleOwnerCheckbox.checked = !!baselineData.isFemaleOwner;
    if (refContractTypeSelect) {
        refContractTypeSelect.value = baselineData.contractType || 'Hợp đồng cho thuê tài chính';
    }
    const refAssetDescriptionInput = document.getElementById('refAssetDescription');
    if (refAssetDescriptionInput) {
        refAssetDescriptionInput.value = baselineData.assetDescription || 'Các phương tiện giao thông cơ giới đường bộ thuộc sở hữu của Bên bảo đảm.';
    }

    // Dynamic show/hide of measure type or contract type fields based on transactionType
    const measureTypeBlock = document.getElementById('refMeasureTypeBlock');
    const contractTypeBlock = document.getElementById('refContractTypeBlock');
    if (baselineData.transactionType === 'Hợp đồng') {
        if (measureTypeBlock) measureTypeBlock.style.display = 'none';
        if (contractTypeBlock) contractTypeBlock.style.display = 'block';
        const refTxTypeSelect = document.getElementById('refTxType');
        if (refTxTypeSelect) {
            refTxTypeSelect.innerHTML = '<option value="Hợp đồng" selected>Hợp đồng</option>';
        }
    } else {
        if (measureTypeBlock) measureTypeBlock.style.display = 'block';
        if (contractTypeBlock) contractTypeBlock.style.display = 'none';
        const refTxTypeSelect = document.getElementById('refTxType');
        if (refTxTypeSelect) {
            refTxTypeSelect.innerHTML = '<option value="Biện pháp bảo đảm" selected>Biện pháp bảo đảm</option>';
        }
    }

    // 5. Render Securing Parties Table (Bên thế chấp) - Read-only
    function renderSecuringParties() {
        securingPartiesBody.innerHTML = '';
        if (baselineData.securingParties && baselineData.securingParties.length > 0) {
            baselineData.securingParties.forEach((party, index) => {
                const tr = document.createElement('tr');
                
                let typeText = "Công dân Việt Nam";
                if (party.type === 'nuoc_ngoai' || party.type === 'nn') typeText = "Người nước ngoài";
                else if (party.type === 'khong_qt') typeText = "Người không quốc tịch cư trú tại Việt Nam";
                else if (party.type === 'to_chuc_kd') typeText = "Tổ chức có đăng ký kinh doanh trong nước";
                else if (party.type === 'nha_dau_tu') typeText = "Nhà đầu tư nước ngoài";
                else if (party.type === 'to_chuc_khac') typeText = "Tổ chức khác";

                tr.innerHTML = `
                    <td style="text-align: center; font-weight: 500;">${index + 1}</td>
                    <td>${typeText}</td>
                    <td>${party.paperNo}</td>
                    <td style="font-weight: 600;">${party.name}</td>
                    <td>${party.address}</td>
                `;
                securingPartiesBody.appendChild(tr);
            });
        } else {
            securingPartiesBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Không có dữ liệu Bên thế chấp.</td></tr>`;
        }
    }

    // 6. Render Secured Parties Table (Bên nhận thế chấp) - Read-only
    function renderSecuredParties() {
        securedPartiesBody.innerHTML = '';
        if (baselineData.securedParties && baselineData.securedParties.length > 0) {
            baselineData.securedParties.forEach((party, index) => {
                const tr = document.createElement('tr');
                const fullAddress = `${party.address || ''} - ${party.province || ''} - ${party.country || ''}`.replace(/^[ \-]+|[ \-]+$/g, '').replace(/ -  - /g, ' - ');
                tr.innerHTML = `
                    <td style="text-align: center; font-weight: 500;">${index + 1}</td>
                    <td style="font-weight: 600;">${party.name}</td>
                    <td>${fullAddress}</td>
                `;
                securedPartiesBody.appendChild(tr);
            });
        } else {
            securedPartiesBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">Không có dữ liệu Bên nhận thế chấp.</td></tr>`;
        }
    }

    // 7. Render Assets Table - Read-only
    function renderAssets() {
        assetsTableBody.innerHTML = '';
        if (baselineData.assets && baselineData.assets.length > 0) {
            baselineData.assets.forEach((asset, index) => {
                const tr = document.createElement('tr');
                tr.id = `asset-row-${asset.id}`;
                tr.dataset.id = asset.id;

                tr.innerHTML = `
                    <td style="text-align: center; font-weight: 500;">${index + 1}</td>
                    <td class="asset-text-cell">${asset.typeName}</td>
                    <td class="asset-text-cell" style="font-weight: 600;">${asset.name}</td>
                    <td class="asset-text-cell">${asset.brandColor || ''}</td>
                    <td class="asset-text-cell" style="font-family: monospace;">${asset.frameNo || ''}</td>
                    <td class="asset-text-cell">${asset.engineNo || ''} ${asset.plateNo ? ' / ' + asset.plateNo : ''}</td>
                `;
                assetsTableBody.appendChild(tr);
            });
        } else {
            assetsTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Không có dữ liệu tài sản bảo đảm.</td></tr>`;
        }
    }

    // 8. Logic thay đổi người yêu cầu đăng ký
    requesterRoleSelect.addEventListener('change', function () {
        const val = this.value;
        
        // Ẩn tất cả trước
        representativeProofBlock.style.display = 'none';

        // Xử lý ẩn hiện động
        if (['ben_bd_moi', 'ben_nhan_bd_moi', 'quan_tai_vien', 'ben_ke_thua', 'co_quan_thads', 'co_quan_khac'].includes(val)) {
            representativeProofBlock.style.display = 'block';
        }
        
        // Clear old error messages when changing fields
        clearFieldError(requesterRoleSelect);
    });

    // 9. Logic thay đổi diện miễn nộp phí
    exemptionTypeSelect.addEventListener('change', function () {
        if (!this.checked) {
            exemptionProofBlock.style.display = 'none';
        } else {
            exemptionProofBlock.style.display = 'block';
        }
        
        clearFieldError(exemptionTypeSelect);
    });



    // 11. Xử lý tải file chứng minh
    setupFileUpload(dropzoneRepresentative, fileRepresentativeInput, representativeFileInfo, lblRepresentativeFileName, 'representative');
    setupFileUpload(dropzoneExemption, fileExemptionInput, exemptionFileInfo, lblExemptionFileName, 'exemption');

    function setupFileUpload(dropzone, fileInput, fileInfoPanel, lblFileName, fileKey) {
        // Click dropzone to select file
        dropzone.addEventListener('click', () => fileInput.click());

        // Handle file change
        fileInput.addEventListener('change', function () {
            if (this.files.length > 0) {
                const file = this.files[0];
                
                // Validate format .pdf
                if (!file.name.toLowerCase().endsWith('.pdf')) {
                    alert("Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng .pdf.");
                    this.value = '';
                    return;
                }

                // Validate size < 20MB
                if (file.size > 20 * 1024 * 1024) {
                    alert("Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.");
                    this.value = '';
                    return;
                }

                // Lưu file thành công
                uploadedFiles[fileKey] = file.name;
                lblFileName.textContent = file.name;
                
                dropzone.style.display = 'none';
                fileInfoPanel.style.display = 'flex';
                
                // Clear field error
                clearFieldError(dropzone);
            }
        });

        // Drag and drop event simulations
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'var(--secondary-color)';
            dropzone.style.backgroundColor = '#EFF6FF';
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.style.borderColor = '';
            dropzone.style.backgroundColor = '';
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = '';
            dropzone.style.backgroundColor = '';
            
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                const event = new Event('change');
                fileInput.dispatchEvent(event);
            }
        });
    }

    // Delete uploaded files
    document.getElementById('btnDeleteRepresentativeFile').addEventListener('click', function () {
        uploadedFiles.representative = null;
        fileRepresentativeInput.value = '';
        representativeFileInfo.style.display = 'none';
        dropzoneRepresentative.style.display = 'flex';
    });

    document.getElementById('btnDeleteExemptionFile').addEventListener('click', function () {
        uploadedFiles.exemption = null;
        fileExemptionInput.value = '';
        exemptionFileInfo.style.display = 'none';
        dropzoneExemption.style.display = 'flex';
    });

    // 12. Button Actions
    btnBack.addEventListener('click', function () {
        if (confirm("Bạn có chắc chắn muốn quay lại bước trước? Thông tin chưa nộp sẽ bị mất.")) {
            window.location.href = 'tra_cuu_goc.html';
        }
    });

    // Action Lưu nháp
    btnDraft.addEventListener('click', function () {
        clearAllErrors();
        
        const requesterRole = requesterRoleSelect.value;
        if (!requesterRole) {
            showInputError(requesterRoleSelect, "Vui lòng chọn Người yêu cầu đăng ký trước khi lưu nháp");
            alert("Vui lòng chọn Người yêu cầu đăng ký trước khi lưu nháp");
            return;
        }

        // Lưu thông tin bản nháp
        saveDossierData('Lưu nháp');
        alert("Lưu nháp hồ sơ thành công!");
    });

    // Action Tiếp tục
    btnSubmit.addEventListener('click', function () {
        clearAllErrors();
        
        // Thực hiện validation
        let isValid = validateForm();
        if (!isValid) {
            // Cuộn lên đầu trang tới bảng thông báo lỗi
            errorSummary.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Lưu thông tin và chuyển sang MH03 Review
        saveDossierData('Chờ thanh toán');
        window.location.href = 'xoa_dang_ky_review.html';
    });

    // Validation logic
    function validateForm() {
        let isValid = true;
        const errors = [];

        // 1. Kiểm tra Người yêu cầu
        const requesterRole = requesterRoleSelect.value;
        if (!requesterRole) {
            showInputError(requesterRoleSelect, "Đây là trường bắt buộc");
            errors.push("Chưa chọn Người yêu cầu đăng ký");
            isValid = false;
        }

        // 2. Kiểm tra Căn cứ xóa
        const deletionBasis = deletionBasisSelect.value;
        if (!deletionBasis) {
            showInputError(deletionBasisSelect, "Đây là trường bắt buộc");
            errors.push("Chưa chọn Căn cứ xóa đăng ký");
            isValid = false;
        }

        // 3. Kiểm tra đính kèm tài liệu chứng minh đại diện
        if (representativeProofBlock.style.display === 'block' && !uploadedFiles.representative) {
            showInputError(dropzoneRepresentative, "Vui lòng đính kèm tệp tin.");
            errors.push("Chưa đính kèm tài liệu chứng minh tư cách đại diện");
            isValid = false;
        }

        // 4. Kiểm tra đính kèm tài liệu chứng minh miễn phí
        if (exemptionProofBlock.style.display === 'block' && !uploadedFiles.exemption) {
            showInputError(dropzoneExemption, "Vui lòng đính kèm tài liệu chứng minh miễn nộp phí.");
            errors.push("Chưa đính kèm tài liệu chứng minh diện miễn nộp phí");
            isValid = false;
        }

        // Hiển thị lỗi lên khối errorSummary
        if (errors.length > 0) {
            errorList.innerHTML = '';
            errors.forEach(err => {
                const li = document.createElement('li');
                li.textContent = err;
                errorList.appendChild(li);
            });
        }

        return isValid;
    }

    // Helper: Hiển thị lỗi dưới ô nhập
    function showInputError(inputElement, msg) {
        inputElement.style.borderColor = '#EF4444';
        
        // Nếu là container của upload file
        if (inputElement.classList.contains('file-upload-container')) {
            inputElement.style.borderColor = '#EF4444';
        }

        const parent = inputElement.closest('.form-group');
        let errorSpan = parent.querySelector('.field-error');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'field-error';
            errorSpan.style.color = '#EF4444';
            errorSpan.style.fontSize = '12px';
            errorSpan.style.marginTop = '4px';
            parent.appendChild(errorSpan);
        }
        errorSpan.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
    }

    function clearFieldError(inputElement) {
        inputElement.style.borderColor = '';
        const parent = inputElement.closest('.form-group');
        const errorSpan = parent.querySelector('.field-error');
        if (errorSpan) errorSpan.remove();
    }

    function clearAllErrors() {
        errorSummary.style.display = 'none';
        errorList.innerHTML = '';
        
        document.querySelectorAll('.form-control, .form-select, .file-upload-container').forEach(el => {
            el.style.borderColor = '';
        });
        
        document.querySelectorAll('.field-error').forEach(el => el.remove());
    }

    // Đóng gói dữ liệu xóa đăng ký và lưu vào localStorage
    function saveDossierData(status) {
        const totalAssets = (baselineData.assets || []).map(asset => {
            return {
                ...asset,
                status: "Xóa"
            };
        });

        // Tạo mã số hồ sơ giả lập
        const dossierCode = "HS-XDK-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);

        // Tính phí xóa đăng ký
        const isExempt = exemptionTypeSelect.checked;
        const feeAmount = isExempt ? 0 : 20000;

        const refAssetDescriptionInput = document.getElementById('refAssetDescription');

        const dossierDraft = {
            dossierCode: dossierCode,
            status: status,
            requesterRole: requesterRoleSelect.value,
            requesterRoleText: requesterRoleSelect.options[requesterRoleSelect.selectedIndex].text,
            deletionBasis: deletionBasisSelect.value,
            deletionBasisText: deletionBasisSelect.options[deletionBasisSelect.selectedIndex].text,
            exemptionType: isExempt ? "miễn" : "không_miễn",
            exemptionTypeText: isExempt ? "Thuộc diện miễn nộp phí" : "Không thuộc diện miễn nộp phí",
            deletionType: "toan_phan",
            feeAmount: feeAmount,
            uploadedFiles: uploadedFiles,
            securingParties: baselineData.securingParties || [],
            securedParties: baselineData.securedParties || [],
            assets: totalAssets,
            contractNo: refContractNoInput.value,
            contractDate: refContractDateInput.value,
            loanValue: refLoanValueInput.value,
            scale: refScaleInput.value,
            isFemaleOwner: refFemaleOwnerCheckbox.checked,
            assetDescription: refAssetDescriptionInput ? refAssetDescriptionInput.value : 'Các phương tiện giao thông cơ giới đường bộ thuộc sở hữu của Bên bảo đảm.',
            createdAt: new Date().toLocaleString('vi-VN')
        };

        localStorage.setItem('xoaDossierDraft', JSON.stringify(dossierDraft));
    }

    // Initialize tables and settings
    renderSecuringParties();
    renderSecuredParties();
    renderAssets();

    // Load existing draft if any (e.g. when going back from review page)
    const savedDraftRaw = localStorage.getItem('xoaDossierDraft');
    if (savedDraftRaw) {
        try {
            const savedDraft = JSON.parse(savedDraftRaw);
            if (savedDraft) {
                // Pre-fill fields from draft
                if (savedDraft.requesterRole) {
                    requesterRoleSelect.value = savedDraft.requesterRole;
                    // Trigger change to update visibility
                    const event = new Event('change');
                    requesterRoleSelect.dispatchEvent(event);
                }
                if (savedDraft.deletionBasis) {
                    deletionBasisSelect.value = savedDraft.deletionBasis;
                }
                if (savedDraft.exemptionType) {
                    exemptionTypeSelect.checked = (savedDraft.exemptionType === 'miễn');
                    // Trigger change to update visibility
                    const event = new Event('change');
                    exemptionTypeSelect.dispatchEvent(event);
                }
                // Pre-fill uploaded files state
                if (savedDraft.uploadedFiles) {
                    if (savedDraft.uploadedFiles.representative) {
                        uploadedFiles.representative = savedDraft.uploadedFiles.representative;
                        lblRepresentativeFileName.textContent = savedDraft.uploadedFiles.representative;
                        dropzoneRepresentative.style.display = 'none';
                        representativeFileInfo.style.display = 'flex';
                    }
                    if (savedDraft.uploadedFiles.exemption) {
                        uploadedFiles.exemption = savedDraft.uploadedFiles.exemption;
                        lblExemptionFileName.textContent = savedDraft.uploadedFiles.exemption;
                        dropzoneExemption.style.display = 'none';
                        exemptionFileInfo.style.display = 'flex';
                    }
                }
            }
        } catch (e) {
            console.error("Lỗi khi khôi phục bản nháp:", e);
        }
    }
});

function goHome() {
    if (window.top !== window.self && typeof window.top.showScreen === 'function') {
        window.top.showScreen('home');
    } else {
        window.location.href = '../trang_tong_the_website_khach_hang.html';
    }
}
