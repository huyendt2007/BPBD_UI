/**
 * dang_ky_thay_doi.js
 * Quản lý logic soạn thảo thông tin thay đổi thông minh (Editable Cards, Delta, list CRUD) cho UC0025.MH02
 */

// Global state variables
let baselineData = null;
let originalData = null;
let c08Bypass = false;

// Track edit indices for lists (-1 means adding new)
let editSecuringIndex = -1;
let editSecuredIndex = -1;
let editAssetIndex = -1;

// Bộ lọc và tìm kiếm nhanh cho tài sản bảo đảm
let currentAssetFilter = 'all';
let assetSearchKeyword = '';

// Uploaded file names in mock state
let uploadedFiles = {
    reqFile: null,
    exemptionFile: null,
    assetsPdfFile: null
};

// Mock Data representing the dossier versions for sidebar comparison
const mockTimelineData = [
    {
        version: 3,
        label: "Thay đổi lần 2 (Mới nhất)",
        badgeClass: "badge-success",
        title: "Đăng ký thay đổi lần 2 - Phê duyệt thành công",
        date: "15/04/2026 09:30:15",
        dateOnly: "15/04/2026",
        regCode: "12345678-CD02",
        description: "Bổ sung thông tin bên thế chấp mới và thêm 02 xe máy",
        data: {
            requester: "Bên nhận thế chấp",
            orgName: "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VCB)",
            exemption: false,
            isFemaleOwner: false,
            scale: "1",
            loanValue: "2,500,000,000",
            contractNo: "HĐTC-2026-VCB",
            contractDate: "04/01/2026",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
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
                    status: "Bổ sung mới" // Added in version 3
                }
            ],
            securedParties: [
                {
                    name: "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VCB) - CHI NHÁNH HÀ NỘI",
                    country: "Việt Nam",
                    province: "Thành phố Hà Nội",
                    address: "Số 198 Trần Quang Khải, Quận Hoàn Kiếm, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    type: "oto",
                    typeName: "Ô tô",
                    name: "Xe ô tô con",
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
                    type: "moto",
                    typeName: "Mô tô",
                    name: "Xe máy điện",
                    brandColor: "VinFast Feliz S, Màu đỏ",
                    frameNo: "VF-FEL-2026A",
                    engineNo: "ENG-VF-9812",
                    plateNo: "29A1-999.88",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Bổ sung mới" // Added in version 3
                },
                {
                    id: 3,
                    type: "moto",
                    typeName: "Mô tô",
                    name: "Xe máy xăng",
                    brandColor: "Honda SH 150i, Màu trắng",
                    frameNo: "HON-SH-88771A",
                    engineNo: "ENG-SH-7711A",
                    plateNo: "29B2-888.88",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Bổ sung mới" // Added in version 3
                }
            ]
        },
        changesSummary: [
            "Bổ sung 01 Bên thế chấp: Trần Thị Bé (CCCD: 002095067890)",
            "Bổ sung 02 Tài sản bảo đảm: Xe máy điện VinFast (Khung: VF-FEL-2026A) và Xe máy Honda SH (Khung: HON-SH-88771A)"
        ]
    },
    {
        version: 2,
        label: "Thay đổi lần 1",
        badgeClass: "badge-primary",
        title: "Đăng ký thay đổi lần 1 - Phê duyệt thành công",
        date: "10/02/2026 14:15:22",
        dateOnly: "10/02/2026",
        regCode: "12345678-CD01",
        description: "Rút bớt 01 tài sản (Xe tải Hyundai) và tăng giá trị khoản vay nghĩa vụ lên 2.5 tỷ VNĐ",
        data: {
            requester: "Bên nhận thế chấp",
            orgName: "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VCB)",
            exemption: false,
            isFemaleOwner: false,
            scale: "1",
            loanValue: "2,500,000,000",
            contractNo: "HĐTC-2026-VCB",
            contractDate: "04/01/2026",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            securingParties: [
                {
                    type: "cd_vn",
                    name: "Nguyễn Văn Nam",
                    paperType: "CCCD",
                    paperNo: "001088012345",
                    address: "Số 15 Lý Thường Kiệt, Phường Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    name: "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VCB) - CHI NHÁNH HÀ NỘI",
                    country: "Việt Nam",
                    province: "Thành phố Hà Nội",
                    address: "Số 198 Trần Quang Khải, Quận Hoàn Kiếm, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    type: "oto",
                    typeName: "Ô tô",
                    name: "Xe ô tô con",
                    brandColor: "Toyota Vios, Màu đen",
                    frameNo: "TYT-VIOS-88992",
                    engineNo: "ENG-4A-FE-990",
                    plateNo: "30H-123.45",
                    hasNotice: true,
                    noticeAgency: "Cục Cảnh sát Giao thông đường bộ - Hà Nội",
                    status: "Không thay đổi"
                },
                {
                    id: 4,
                    type: "oto",
                    typeName: "Ô tô",
                    name: "Xe tải chở hàng",
                    brandColor: "Hyundai Porter, Màu xanh",
                    frameNo: "HD-POR-11223",
                    engineNo: "ENG-HD-8812",
                    plateNo: "29C-567.89",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Rút bớt" // Removed in version 2
                }
            ]
        },
        changesSummary: [
            "Rút bớt 01 tài sản: Xe tải chở hàng Hyundai Porter (Khung: HD-POR-11223)",
            "Thay đổi Giá trị khoản vay bảo đảm: Tăng từ 1,500,000,000 VNĐ lên 2,500,000,000 VNĐ"
        ]
    },
    {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-warning",
        title: "Đăng ký biện pháp bảo đảm lần đầu - Phê duyệt thành công",
        date: "05/01/2026 08:00:00",
        dateOnly: "05/01/2026",
        regCode: "12345678",
        description: "Đăng ký gốc lần đầu biện pháp bảo đảm bằng 02 xe ô tô, khoản vay 1.5 tỷ VNĐ",
        data: {
            requester: "Bên nhận thế chấp",
            orgName: "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VCB)",
            exemption: false,
            isFemaleOwner: false,
            scale: "1",
            loanValue: "1,500,000,000",
            contractNo: "HĐTC-2026-VCB",
            contractDate: "04/01/2026",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            securingParties: [
                {
                    type: "cd_vn",
                    name: "Nguyễn Văn Nam",
                    paperType: "CCCD",
                    paperNo: "001088012345",
                    address: "Số 15 Lý Thường Kiệt, Phường Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    name: "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VCB) - CHI NHÁNH HÀ NỘI",
                    country: "Việt Nam",
                    province: "Thành phố Hà Nội",
                    address: "Số 198 Trần Quang Khải, Quận Hoàn Kiếm, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    type: "oto",
                    typeName: "Ô tô",
                    name: "Xe ô tô con",
                    brandColor: "Toyota Vios, Màu đen",
                    frameNo: "TYT-VIOS-88992",
                    engineNo: "ENG-4A-FE-990",
                    plateNo: "30H-123.45",
                    hasNotice: true,
                    noticeAgency: "Cục Cảnh sát Giao thông đường bộ - Hà Nội",
                    status: "Không thay đổi"
                },
                {
                    id: 4,
                    type: "oto",
                    typeName: "Ô tô",
                    name: "Xe tải chở hàng",
                    brandColor: "Hyundai Porter, Màu xanh",
                    frameNo: "HD-POR-11223",
                    engineNo: "ENG-HD-8812",
                    plateNo: "29C-567.89",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Không thay đổi"
                }
            ]
        },
        changesSummary: [
            "Đăng ký ban đầu biện pháp bảo đảm bằng 02 xe ô tô: Toyota Vios và Hyundai Porter"
        ]
    }
];

// Standard province list for Vietnam
const VN_PROVINCES = [
    "Thành phố Hà Nội",
    "Thành phố Hồ Chí Minh",
    "Thành phố Đà Nẵng",
    "Thành phố Hải Phòng",
    "Thành phố Cần Thơ",
    "Tỉnh Bình Dương",
    "Tỉnh Đồng Nai",
    "Tỉnh Quảng Ninh",
    "Tỉnh Khánh Hòa"
];

function initPage() {
    try {
        console.log("DEBUG: initPage starting in dang_ky_thay_doi.js");
        // 1. Load baseline from localStorage
        let savedBaseline = localStorage.getItem('baselineData');
        let savedOriginal = localStorage.getItem('baselineOriginalData');
        let regNum = localStorage.getItem('regNum');
        let pinNum = localStorage.getItem('pinNum');

        if (!savedBaseline || !savedOriginal) {
            console.warn("Không tìm thấy thông tin hồ sơ gốc. Tự động nạp dữ liệu giả lập mới để chạy thử.");
            regNum = "12345678";
            pinNum = "8888";
            const defaultMock = {
                requester: "Bên nhận thế chấp",
                orgName: "NGÂN HÀNG TMCP FPT",
                exemption: false,
                isFemaleOwner: false,
                scale: "1",
                loanValue: "2,500,000,000",
                contractNo: "HĐTC-2026-FPT",
                contractDate: "04/01/2026",
                transactionType: "Biện pháp bảo đảm",
                measureType: "Thế chấp",
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
                        type: "oto",
                        typeName: "Ô tô",
                        name: "Xe ô tô con",
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
                        type: "moto",
                        typeName: "Mô tô",
                        name: "Xe máy điện",
                        brandColor: "VinFast Feliz S, Màu đỏ",
                        frameNo: "VF-FEL-2026A",
                        engineNo: "ENG-VF-9812",
                        plateNo: "29A1-999.88",
                        hasNotice: false,
                        noticeAgency: "",
                        status: "Không thay đổi"
                    },
                    {
                        id: 3,
                        type: "moto",
                        typeName: "Mô tô",
                        name: "Xe máy xăng",
                        brandColor: "Honda SH 150i, Màu trắng",
                        frameNo: "HON-SH-88771A",
                        engineNo: "ENG-SH-7711A",
                        plateNo: "29B2-888.88",
                        hasNotice: false,
                        noticeAgency: "",
                        status: "Không thay đổi"
                    }
                ]
            };
            localStorage.setItem('regNum', regNum);
            localStorage.setItem('pinNum', pinNum);
            localStorage.setItem('baselineVersion', '3');
            localStorage.setItem('baselineData', JSON.stringify(defaultMock));
            localStorage.setItem('baselineOriginalData', JSON.stringify(defaultMock));
            savedBaseline = JSON.stringify(defaultMock);
            savedOriginal = JSON.stringify(defaultMock);
        }

        baselineData = JSON.parse(savedBaseline);
        originalData = JSON.parse(savedOriginal);

        // Populate reference dossier labels
        document.getElementById('refRegNum').value = regNum || '12345678';

        // Set mock initial registration dates
        let regDateText = "05/01/2026 08:00:00";
        if (localStorage.getItem('baselineVersion') === '2') regDateText = "10/02/2026 14:15:22";
        if (localStorage.getItem('baselineVersion') === '3') regDateText = "15/04/2026 09:30:15";
        document.getElementById('refRegDate').value = regDateText;

        // Fill form elements from baselineData
        document.getElementById('reqRole').value = '';
        document.getElementById('transactionType').value = baselineData.transactionType || 'Biện pháp bảo đảm';

        // Populate transactionTypeSelect
        const txSelect = document.getElementById('transactionTypeSelect');
        if (txSelect) txSelect.value = baselineData.transactionType || 'Biện pháp bảo đảm';

        // Populate measureType or contractTypeSelect
        const hdSelect = document.getElementById('contractTypeSelect');
        if (baselineData.transactionType === 'Hợp đồng') {
            if (hdSelect) hdSelect.value = baselineData.measureType || 'Hợp đồng cho thuê tài chính';
        } else {
            document.getElementById('measureType').value = baselineData.measureType || 'Thế chấp';
        }

        document.getElementById('contractNo').value = baselineData.contractNo || '';
        document.getElementById('contractDate').value = baselineData.contractDate || '';
        document.getElementById('loanValue').value = baselineData.loanValue || '';
        document.getElementById('quyMo').value = baselineData.scale || '';
        document.getElementById('isFemaleOwner').checked = baselineData.isFemaleOwner || false;
        document.getElementById('isExempted').checked = baselineData.exemption || false;

        // Trigger attachments and visibility displays
        toggleExemptionField();
        toggleRequesterAttachment();
        toggleTransactionTypeFields();

        // 2. Setup interactive features
        // Setup select onChange events
        document.getElementById('isExempted').addEventListener('change', toggleExemptionField);
        document.getElementById('reqRole').addEventListener('change', toggleRequesterAttachment);

        // Handle dynamic title switching based on measureType (Thế chấp / Cầm cố...)
        document.getElementById('measureType').addEventListener('change', function () {
            updateMeasureTypeTitles(this.value);
            toggleRequesterAttachment();
        });

        // Trigger initial title load
        updateMeasureTypeTitles(document.getElementById('measureType').value);

        // Setup input change event listeners for general text fields (Delta detection)
        setupTextDeltaChecking('contractNo', 'contractNo', 'Số hợp đồng');
        setupTextDeltaChecking('contractDate', 'contractDate', 'Ngày hiệu lực hợp đồng');
        setupTextDeltaChecking('loanValue', 'loanValue', 'Giá trị khoản vay');
        setupTextDeltaChecking('quyMo', 'scale', 'Quy mô');
        // setupTextDeltaChecking('reqRole', 'requester', 'Vai trò người yêu cầu');
        setupTextDeltaChecking('measureType', 'measureType', 'Loại hình biện pháp');

        // Checkboxes change listeners
        document.getElementById('isFemaleOwner').addEventListener('change', function () {
            checkCheckboxDelta(this, 'isFemaleOwner', 'Chủ doanh nghiệp nữ');
        });
        document.getElementById('isExempted').addEventListener('change', function () {
            checkCheckboxDelta(this, 'exemption', 'Được miễn lệ phí');
        });

        // Populate country dropdowns dynamically from countries.js
        const populateCountryDropdown = (selectId, isPassport = false) => {
            const select = document.getElementById(selectId);
            if (select && typeof countriesList !== 'undefined') {
                if (isPassport) {
                    const firstOpt = select.options[0];
                    select.innerHTML = '';
                    if (firstOpt) select.appendChild(firstOpt);
                    
                    Object.values(countriesList).sort((a, b) => a.localeCompare(b, 'vi')).forEach(name => {
                        const opt = document.createElement('option');
                        opt.value = name;
                        opt.textContent = name;
                        select.appendChild(opt);
                    });
                } else {
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
            }
        };

        populateCountryDropdown('secPassportCountry', true);
        populateCountryDropdown('secCountry');
        populateCountryDropdown('sedCountry');

        // Populate country province wrappers for subforms
        setupCountryProvinceControls('secCountry', 'secProvinceWrapper', 'secProvince');
        setupCountryProvinceControls('sedCountry', 'sedProvinceWrapper', 'sedProvince');

        // Subject type change listener in Securing Party subform
        document.getElementById('secSubjectType').addEventListener('change', handleSecuringSubjectTypeChange);
        // Trigger initial change
        handleSecuringSubjectTypeChange();

        // 3. Render lists
        renderSecuringList();
        renderSecuredList();
        setupAssetCheckboxes();
        loadAssetsData();
        renderTimelineSidebar();

        // Setup history visibility based on baselineVersion
        const baselineVersion = localStorage.getItem('baselineVersion') || '1';
        const linkHistory = document.getElementById('linkHistory');
        const timelineSidebar = document.querySelector('.timeline-sidebar');

        if (baselineVersion === '1') {
            if (linkHistory) linkHistory.style.display = 'none';
            if (timelineSidebar) timelineSidebar.style.display = 'none';
        } else {
            if (linkHistory) linkHistory.style.display = 'inline-flex';
            if (timelineSidebar) timelineSidebar.style.display = 'block';
        }

        // 4. Force default settings on edit buttons
        initCardEditButtons();

        // Show initial prefilled file previews in the UI
        const filesMapping = [
            { id: 'reqFile', previewId: 'filePreviewReq' },
            { id: 'exemptionFile', previewId: 'filePreviewExempt' },
            { id: 'assetsPdfFile', previewId: 'filePreviewAssetsPdf' }
        ];
        filesMapping.forEach(item => {
            const previewEl = document.getElementById(item.previewId);
            if (previewEl && uploadedFiles[item.id]) {
                previewEl.style.display = 'flex';
                const nameSpan = previewEl.querySelector('.file-name');
                if (nameSpan) nameSpan.textContent = uploadedFiles[item.id];

                const savedUrl = localStorage.getItem('fileUrl_' + item.id);
                const lnk = previewEl.querySelector('a');
                if (lnk && savedUrl) {
                    lnk.href = savedUrl;
                }
            }
        });

        // 5. Setup Warning Modal Confirm and File change listeners
        const btnConfirmWarning = document.getElementById('btnConfirmWarning');
        if (btnConfirmWarning) {
            btnConfirmWarning.addEventListener('click', function () {
                c08Bypass = true;
                closeWarning();
                proceedToReview(); // Retrigger validation
            });
        }

        const c08ProofFile = document.getElementById('c08ProofFile');
        if (c08ProofFile) {
            c08ProofFile.addEventListener('change', function () {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    if (!file.name.toLowerCase().endsWith('.pdf')) {
                        alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng .pdf.');
                        this.value = '';
                        document.getElementById('lblFileNameC08').textContent = 'Chưa chọn tệp';
                        document.getElementById('btnConfirmWarning').disabled = true;
                        return;
                    }
                    if (file.size > 20 * 1024 * 1024) {
                        alert('Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.');
                        this.value = '';
                        document.getElementById('lblFileNameC08').textContent = 'Chưa chọn tệp';
                        document.getElementById('btnConfirmWarning').disabled = true;
                        return;
                    }
                    document.getElementById('lblFileNameC08').textContent = file.name;
                    document.getElementById('btnConfirmWarning').disabled = false;
                } else {
                    document.getElementById('lblFileNameC08').textContent = 'Chưa chọn tệp';
                    document.getElementById('btnConfirmWarning').disabled = true;
                }
            });
        }

        // Country dropdowns populated dynamically at the beginning of initPage
    } catch (err) {
        console.error("DEBUG: initPage CRASHED with error: ", err);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// Setup lock/unlock icons and text properly on load
function initCardEditButtons() {
    const cards = ['cardGeneral', 'cardSecuring', 'cardSecured', 'cardAssets'];
    cards.forEach(cardId => {
        const card = document.getElementById(cardId);
        if (!card) return;
        const btn = card.querySelector('.btn-lock-toggle');
        if (!btn) return;
        if (card.classList.contains('readonly')) {
            btn.innerHTML = `<i class="fa-solid fa-lock"></i> Mở khóa chỉnh sửa`;
        } else {
            btn.innerHTML = `<i class="fa-solid fa-unlock"></i> Đang chỉnh sửa`;
        }
    });
}

// Update Measure Titles dynamically (Thế chấp vs Cầm cố)
function updateMeasureTypeTitles(value) {
    document.getElementById('labelSecuringTitle').textContent = 'Bên bảo đảm';
    document.getElementById('labelSecuredTitle').textContent = 'Bên nhận bảo đảm';
    document.getElementById('labelAssetsTitle').textContent = `Tài sản ${value === 'Đặt cọc' ? 'đặt cọc' : (value === 'Cầm cố' ? 'cầm cố' : 'bảo đảm')}`;

    document.getElementById('securingFormTitle').textContent = 'Thêm Bên bảo đảm';
    document.getElementById('securedFormTitle').textContent = 'Thêm Bên nhận bảo đảm';
}

// ----------------------------------------------------
// CARD LOCKING/UNLOCKING
// ----------------------------------------------------
function toggleCardEditable(cardId) {
    const card = document.getElementById(cardId);
    const btn = card.querySelector('.btn-lock-toggle');

    if (card.classList.contains('readonly')) {
        // Unlock
        card.classList.remove('readonly');
        card.classList.add('editable');
        btn.innerHTML = `<i class="fa-solid fa-unlock"></i> Đang chỉnh sửa`;

        // Add visual yellow amber borders
        card.style.border = '2px solid var(--accent-color)';

        // Show add buttons if this is cardSecuring or cardSecured
        if (cardId === 'cardSecuring') {
            const addBtn = document.getElementById('btnShowAddSecuring');
            if (addBtn) addBtn.style.display = 'inline-flex';
        } else if (cardId === 'cardSecured') {
            const addBtn = document.getElementById('btnShowAddSecured');
            const selfBtn = document.getElementById('btnSelfSecured');
            if (addBtn) addBtn.style.display = 'inline-flex';
            if (selfBtn) selfBtn.style.display = 'inline-flex';
        }
    } else {
        // Lock
        card.classList.remove('editable');
        card.classList.add('readonly');
        btn.innerHTML = `<i class="fa-solid fa-lock"></i> Mở khóa chỉnh sửa`;

        // Remove amber borders
        card.style.border = '';

        // Hide add buttons
        if (cardId === 'cardSecuring') {
            const addBtn = document.getElementById('btnShowAddSecuring');
            if (addBtn) addBtn.style.display = 'none';
            hideSubForm('formSecuringParty');
        } else if (cardId === 'cardSecured') {
            const addBtn = document.getElementById('btnShowAddSecured');
            const selfBtn = document.getElementById('btnSelfSecured');
            if (addBtn) addBtn.style.display = 'none';
            if (selfBtn) selfBtn.style.display = 'none';
            hideSubForm('formSecuredParty');
        }
    }

    // Trigger re-rendering of lists to activate/deactivate hover states and edit events
    if (cardId === 'cardSecuring') {
        renderSecuringList();
    } else if (cardId === 'cardSecured') {
        renderSecuredList();
    } else if (cardId === 'cardAssets') {
        renderSoKhungGrid();
        renderTauCaGrid();
    }
}

// ----------------------------------------------------
// TEXT FIELD DELTA TRACKING
// ----------------------------------------------------
function setupTextDeltaChecking(elementId, dataField, displayName) {
    const input = document.getElementById(elementId);

    const checkDelta = () => {
        let currentVal = input.value;
        if (input.type === 'checkbox') currentVal = input.checked;

        const originalVal = originalData[dataField];

        // Normalize comparison for values
        const currentNorm = String(currentVal).trim().toLowerCase();
        const originalNorm = String(originalVal).trim().toLowerCase();

        const parent = input.parentElement;
        // Find existing delta badge
        let badge = parent.querySelector('.delta-badge');

        if (currentNorm !== originalNorm) {
            // Value is modified
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'delta-badge';
                badge.textContent = '[Đã sửa]';

                // Add next to label if possible
                const label = parent.querySelector('.form-label');
                if (label) {
                    label.appendChild(badge);
                } else {
                    parent.appendChild(badge);
                }
            }
            badge.setAttribute('data-old-value', `Giá trị cũ: ${originalVal === '' ? '(Trống)' : originalVal}`);
        } else {
            // Reverted
            if (badge) {
                badge.remove();
            }
        }
    };

    input.addEventListener('change', checkDelta);
    input.addEventListener('input', checkDelta);

    // Run once on load to catch prefill deltas if any
    checkDelta();
}

function checkCheckboxDelta(checkbox, dataField, displayName) {
    const parent = checkbox.parentElement;
    let badge = parent.querySelector('.delta-badge');
    const currentVal = checkbox.checked;
    const originalVal = !!originalData[dataField];

    if (currentVal !== originalVal) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'delta-badge';
            badge.textContent = '[Đã sửa]';
            parent.appendChild(badge);
        }
        badge.setAttribute('data-old-value', `Giá trị cũ: ${originalVal ? 'Có' : 'Không'}`);
    } else {
        if (badge) badge.remove();
    }
}

// ----------------------------------------------------
// ATTACHMENT DISPLAY TOGGLES
// ----------------------------------------------------
function toggleExemptionField() {
    const isExempted = document.getElementById('isExempted');
    const exemptGroup = document.getElementById('exemptionAttachmentGroup');
    if (exemptGroup && isExempted) {
        exemptGroup.style.display = isExempted.checked ? 'block' : 'none';
    }
}

function toggleTransactionTypeFields() {
    const txType = document.getElementById('transactionType').value;
    const bpWrapper = document.getElementById('loaiBienPhapWrapper');
    const hdWrapper = document.getElementById('loaiHopDongWrapper');

    if (txType === 'Hợp đồng') {
        if (bpWrapper) bpWrapper.style.display = 'none';
        if (hdWrapper) hdWrapper.style.display = 'flex';
    } else {
        if (bpWrapper) bpWrapper.style.display = 'flex';
        if (hdWrapper) hdWrapper.style.display = 'none';
    }
}

function toggleRequesterAttachment() {
    const role = document.getElementById('reqRole').value;
    const measureType = document.getElementById('measureType').value;
    const reqGroup = document.getElementById('requesterAttachmentGroup');

    const showAlways = [
        "Quản tài viên/Doanh nghiệp quản lý, thanh lý tài sản",
        "Chi nhánh của pháp nhân, người đại diện"
    ];
    const showOnCondition = [
        "Bên bảo đảm",
        "Bên bảo đảm mới"
    ];
    const condMeasures = [
        "Cầm cố",
        "Đặt cọc",
        "Ký cược",
        "Ký quỹ"
    ];

    if (showAlways.includes(role) || (showOnCondition.includes(role) && condMeasures.includes(measureType))) {
        reqGroup.style.display = 'block';
    } else {
        reqGroup.style.display = 'none';
    }
}

// File selected visual helpers
function handleFileSelected(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (input.files.length > 0) {
        const file = input.files[0];
        // Check pdf extension
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng .pdf.');
            input.value = '';
            preview.style.display = 'none';
            uploadedFiles[inputId] = null;
            localStorage.removeItem('fileUrl_' + inputId);
            return;
        }

        // Check size (20MB)
        if (file.size > 20 * 1024 * 1024) {
            alert('Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.');
            input.value = '';
            preview.style.display = 'none';
            uploadedFiles[inputId] = null;
            localStorage.removeItem('fileUrl_' + inputId);
            return;
        }

        // Show mock preview
        preview.style.display = 'flex';
        const nameSpan = preview.querySelector('.file-name');
        nameSpan.textContent = file.name;
        uploadedFiles[inputId] = file.name;

        // Save temporary object URL to localStorage
        const fileUrl = URL.createObjectURL(file);
        localStorage.setItem('fileUrl_' + inputId, fileUrl);

        const lnk = preview.querySelector('a');
        if (lnk) {
            lnk.href = fileUrl;
        }
    }
}

function removeSelectedFile(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    input.value = '';
    preview.style.display = 'none';
    uploadedFiles[inputId] = null;
    localStorage.removeItem('fileUrl_' + inputId);

    const lnk = preview.querySelector('a');
    if (lnk) {
        lnk.href = '#';
    }
}


// ----------------------------------------------------
// COUNTRY / PROVINCE IN SUB-FORMS DYNAMIC BINDING
// ----------------------------------------------------
function setupCountryProvinceControls(countrySelectId, wrapperId, newSelectId) {
    const countrySelect = document.getElementById(countrySelectId);
    const wrapper = document.getElementById(wrapperId);

    const updateControls = () => {
        wrapper.innerHTML = '';
        if (countrySelect.value === 'Việt Nam') {
            // Select dropdown (Default value requirement: "Vui lòng lựa chọn...")
            const select = document.createElement('select');
            select.id = newSelectId;
            select.className = 'form-select';

            const defOption = document.createElement('option');
            defOption.value = "";
            defOption.textContent = "Vui lòng lựa chọn Tỉnh/Thành phố";
            defOption.selected = true;
            select.appendChild(defOption);

            VN_PROVINCES.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p;
                opt.textContent = p;
                select.appendChild(opt);
            });

            wrapper.appendChild(select);
        } else {
            // Text input
            const input = document.createElement('input');
            input.type = 'text';
            input.id = newSelectId;
            input.className = 'form-control';
            wrapper.appendChild(input);
        }
    };

    countrySelect.addEventListener('change', updateControls);
    updateControls(); // Initial render
}


// ----------------------------------------------------
// BÊN BẢO ĐẢM (SECURES) LIST CRUD
// ----------------------------------------------------
function handleSecuringSubjectTypeChange() {
    const type = document.getElementById('secSubjectType').value;

    // Hide all conditional groups
    document.getElementById('secGroupFullName').style.display = 'none';
    document.getElementById('secGroupOrgName').style.display = 'none';
    document.getElementById('secGroupNameOther').style.display = 'none';
    document.getElementById('secGroupPaperNoCCCD').style.display = 'none';
    document.getElementById('secGroupTaxNo').style.display = 'none';
    document.getElementById('secGroupPassportNo').style.display = 'none';
    document.getElementById('secGroupPassportCountry').style.display = 'none';
    document.getElementById('secGroupResidencyCard').style.display = 'none';

    if (type === 'cd_vn') {
        document.getElementById('secGroupFullName').style.display = 'block';
        document.getElementById('secGroupPaperNoCCCD').style.display = 'block';
    } else if (type === 'nn_ngoai') {
        document.getElementById('secGroupFullName').style.display = 'block';
        document.getElementById('secGroupPassportNo').style.display = 'block';
        document.getElementById('secGroupPassportCountry').style.display = 'block';
    } else if (type === 'cd_kq') {
        document.getElementById('secGroupFullName').style.display = 'block';
        document.getElementById('secGroupResidencyCard').style.display = 'block';
    } else if (type === 'tc_dn') {
        document.getElementById('secGroupOrgName').style.display = 'block';
        document.getElementById('secGroupTaxNo').style.display = 'block';
    } else if (type === 'nd_nn') {
        document.getElementById('secGroupNameOther').style.display = 'block';
        document.getElementById('secGroupTaxNo').style.display = 'block';
    } else if (type === 'tc_khac') {
        document.getElementById('secGroupNameOther').style.display = 'block';
    }
}

function renderSecuringList() {
    const listContainer = document.getElementById('securingList');
    listContainer.innerHTML = '';

    const parties = baselineData.securingParties;

    // Show / Hide sub-form cancel button logic
    const btnCancel = document.getElementById('btnCancelSecuring');
    const btnClose = document.getElementById('btnCloseSecuring');
    const formSecuring = document.getElementById('formSecuringParty');

    const activeCount = parties.filter(p => p.status !== 'Rút bớt').length;

    if (activeCount === 0) {
        // If empty grid, auto-show form and hide Cancel & Close buttons to force user entry
        if (formSecuring) formSecuring.style.display = 'block';
        if (btnCancel) btnCancel.style.display = 'none';
        if (btnClose) btnClose.style.display = 'none';
    } else {
        if (btnCancel) btnCancel.style.display = 'inline-flex';
        if (btnClose) btnClose.style.display = 'inline-flex';
    }

    const isEditable = document.getElementById('cardSecuring').classList.contains('editable');

    parties.forEach((party, index) => {
        const tr = document.createElement('tr');

        let rowClass = 'row-unchanged';
        let statusTag = '<span class="entity-badge badge-unchanged">[Đang bảo đảm]</span>';

        if (party.status === 'Bổ sung mới') {
            rowClass = 'row-added';
            statusTag = '<span class="entity-badge badge-added">[Bổ sung mới]</span>';
        } else if (party.status === 'Sửa thông tin') {
            rowClass = 'row-modified';
            statusTag = '<span class="entity-badge badge-modified">[Sửa thông tin]</span>';
        } else if (party.status === 'Rút bớt') {
            rowClass = 'row-removed';
            statusTag = '<span class="entity-badge badge-removed">[Rút bớt]</span>';
        }

        tr.className = rowClass;

        // Find matching original subject to calculate cell deltas
        let orig = null;
        if (party.status !== 'Bổ sung mới') {
            orig = originalData.securingParties.find(p => p.paperNo && p.paperNo === party.paperNo) || originalData.securingParties[index];
        }

        const origTypeLabel = orig ? (orig.typeLabel || orig.paperType || '') : '';
        const origPaperNo = orig ? (orig.paperNo || '') : '';
        const origName = orig ? (orig.name || '') : '';
        const origAddress = orig ? (orig.address || '') : '';

        // Cell delta checks
        const typeTdAttr = orig ? getCellHtml(party.typeLabel || party.paperType || '', origTypeLabel) : '';
        const paperTdAttr = orig ? getCellHtml(party.paperNo || '', origPaperNo) : '';
        const nameTdAttr = orig ? getCellHtml(party.name || '', origName) : '';
        const addressTdAttr = orig ? getCellHtml(party.address || '', origAddress) : '';

        const typeHistory = orig ? getHistoryIcon(party.typeLabel || party.paperType || '', origTypeLabel) : '';
        const paperHistory = orig ? getHistoryIcon(party.paperNo || '', origPaperNo) : '';
        const nameHistory = orig ? getHistoryIcon(party.name || '', origName) : '';
        const addressHistory = orig ? getHistoryIcon(party.address || '', origAddress) : '';

        // Format actions column based on status
        let actionsHtml = '';
        if (isEditable) {
            if (party.status === 'Rút bớt') {
                actionsHtml = `<div class="grid-row-actions"><button class="grid-action-btn undo" title="Hoàn tác rút bớt" onclick="undoRemoveSecuring(${index})"><i class="fa-solid fa-rotate-left"></i><span>Hoàn tác</span></button></div>`;
            } else {
                actionsHtml = `
                    <div class="grid-row-actions">
                        <button class="grid-action-btn edit" title="Sửa thông tin" onclick="editSecuring(${index})"><i class="fa-solid fa-pen"></i><span>Sửa</span></button>
                        <button class="grid-action-btn delete" title="Xóa dòng" onclick="removeSecuring(${index})"><i class="fa-solid fa-trash-can"></i><span>Xóa</span></button>
                    </div>
                `;
            }
        } else {
            actionsHtml = `<span class="grid-action-locked"><i class="fa-solid fa-lock"></i> Khóa</span>`;
        }

        tr.innerHTML = `
            <td style="text-align: center;">${actionsHtml}</td>
            <td ${typeTdAttr}>${party.typeLabel || party.paperType || ''} ${typeHistory}</td>
            <td ${paperTdAttr}>${party.paperNo || ''} ${paperHistory}</td>
            <td ${nameTdAttr}>${party.name || ''} ${nameHistory}</td>
            <td ${addressTdAttr}>${party.address || ''} ${addressHistory}</td>
            <td>${statusTag}</td>
        `;

        listContainer.appendChild(tr);
    });
}

function showAddSecuringForm() {
    editSecuringIndex = -1;
    document.getElementById('securingFormTitle').textContent = "Thêm Bên bảo đảm mới";

    document.getElementById('secSubjectType').value = "cd_vn";
    handleSecuringSubjectTypeChange();

    document.getElementById('secFullName').value = "";
    document.getElementById('secOrgName').value = "";
    document.getElementById('secNameOther').value = "";
    document.getElementById('secPaperNoCCCD').value = "";
    document.getElementById('secTaxNo').value = "";
    document.getElementById('secPassportNo').value = "";
    document.getElementById('secPassportCountry').value = "";
    document.getElementById('secResidencyCard').value = "";

    document.getElementById('secCountry').value = "Việt Nam";
    document.getElementById('secCountry').dispatchEvent(new Event('change'));

    const provSelect = document.getElementById('secProvince');
    if (provSelect) provSelect.value = "";

    document.getElementById('secAddress').value = "";

    document.getElementById('btnSaveSecuringNew').style.display = 'inline-flex';
    document.getElementById('btnUpdateSecuring').style.display = 'none';

    document.getElementById('formSecuringParty').style.display = 'block';

    const parties = baselineData.securingParties;
    const btnCancel = document.getElementById('btnCancelSecuring');
    const btnClose = document.getElementById('btnCloseSecuring');
    if (parties.filter(p => p.status !== 'Rút bớt').length === 0) {
        if (btnCancel) btnCancel.style.display = 'none';
        if (btnClose) btnClose.style.display = 'none';
    } else {
        if (btnCancel) btnCancel.style.display = 'inline-flex';
        if (btnClose) btnClose.style.display = 'inline-flex';
    }
}

function editSecuring(index) {
    editSecuringIndex = index;
    const party = baselineData.securingParties[index];

    document.getElementById('securingFormTitle').textContent = `Sửa thông tin: ${party.name}`;
    document.getElementById('secSubjectType').value = party.type || 'cd_vn';
    handleSecuringSubjectTypeChange();

    document.getElementById('secFullName').value = "";
    document.getElementById('secOrgName').value = "";
    document.getElementById('secNameOther').value = "";
    document.getElementById('secPaperNoCCCD').value = "";
    document.getElementById('secTaxNo').value = "";
    document.getElementById('secPassportNo').value = "";
    document.getElementById('secPassportCountry').value = party.passportCountry || "";
    document.getElementById('secResidencyCard').value = "";
    document.getElementById('secCountry').value = party.country || "Việt Nam";

    const type = party.type || 'cd_vn';
    if (type === 'cd_vn') {
        document.getElementById('secFullName').value = party.name || "";
        document.getElementById('secPaperNoCCCD').value = party.paperNo || "";
    } else if (type === 'nn_ngoai') {
        document.getElementById('secFullName').value = party.name || "";
        document.getElementById('secPassportNo').value = party.paperNo || "";
        document.getElementById('secPassportCountry').value = party.passportCountry || "";
    } else if (type === 'cd_kq') {
        document.getElementById('secFullName').value = party.name || "";
        document.getElementById('secResidencyCard').value = party.paperNo || "";
    } else if (type === 'tc_dn') {
        document.getElementById('secOrgName').value = party.name || "";
        document.getElementById('secTaxNo').value = party.paperNo || "";
    } else if (type === 'nd_nn') {
        document.getElementById('secNameOther').value = party.name || "";
        document.getElementById('secTaxNo').value = party.paperNo || "";
    } else if (type === 'tc_khac') {
        document.getElementById('secNameOther').value = party.name || "";
    }

    document.getElementById('secCountry').dispatchEvent(new Event('change'));

    const provSelect = document.getElementById('secProvince');
    if (provSelect) {
        provSelect.value = party.province || "";
    }

    let rawAddress = party.address || "";
    let detailAddress = rawAddress;
    if (rawAddress.includes(" - ")) {
        const parts = rawAddress.split(" - ");
        detailAddress = parts[0];
    } else {
        if (party.province && detailAddress.includes(party.province)) {
            detailAddress = detailAddress.split(`, ${party.province}`)[0];
            detailAddress = detailAddress.split(` - ${party.province}`)[0];
        }
        if (party.country && detailAddress.includes(party.country)) {
            detailAddress = detailAddress.split(`, ${party.country}`)[0];
            detailAddress = detailAddress.split(` - ${party.country}`)[0];
        }
    }
    document.getElementById('secAddress').value = detailAddress.trim();

    document.getElementById('btnSaveSecuringNew').style.display = 'none';
    document.getElementById('btnUpdateSecuring').style.display = 'inline-flex';

    document.getElementById('formSecuringParty').style.display = 'block';

    const btnCancel = document.getElementById('btnCancelSecuring');
    const btnClose = document.getElementById('btnCloseSecuring');
    if (btnCancel) btnCancel.style.display = 'inline-flex';
    if (btnClose) btnClose.style.display = 'inline-flex';
}

function saveSecuringParty(isUpdate) {
    const inputs = document.querySelectorAll('#formSecuringParty .form-control, #formSecuringParty .form-select');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        const err = input.parentElement.querySelector('.error-text');
        if (err) err.remove();
    });

    const type = document.getElementById('secSubjectType').value;
    let name = '';
    let paperNo = '';
    let paperType = '';
    let passportCountry = '';

    let nameInput = null;
    let paperInput = null;

    if (type === 'cd_vn') {
        nameInput = document.getElementById('secFullName');
        paperInput = document.getElementById('secPaperNoCCCD');
        paperType = 'CCCD';
    } else if (type === 'nn_ngoai') {
        nameInput = document.getElementById('secFullName');
        paperInput = document.getElementById('secPassportNo');
        paperType = 'Hộ chiếu';
        passportCountry = document.getElementById('secPassportCountry').value;
    } else if (type === 'cd_kq') {
        nameInput = document.getElementById('secFullName');
        paperInput = document.getElementById('secResidencyCard');
        paperType = 'Thẻ cư trú';
    } else if (type === 'tc_dn') {
        nameInput = document.getElementById('secOrgName');
        paperInput = document.getElementById('secTaxNo');
        paperType = 'Mã số thuế';
    } else if (type === 'nd_nn') {
        nameInput = document.getElementById('secNameOther');
        paperInput = document.getElementById('secTaxNo');
        paperType = 'Mã số thuế';
    } else if (type === 'tc_khac') {
        nameInput = document.getElementById('secNameOther');
        paperType = '';
    }

    if (nameInput && !nameInput.value.trim()) {
        highlightError(nameInput, "Đây là trường bắt buộc");
        return;
    }
    name = nameInput ? nameInput.value.trim() : '';

    if (name.length > 255) {
        highlightError(nameInput, "Họ và tên vượt quá độ dài cho phép");
        return;
    }

    if (paperInput) {
        const rawPaper = paperInput.value.trim();
        if (!rawPaper) {
            highlightError(paperInput, "Đây là trường bắt buộc");
            return;
        }

        if (type === 'cd_vn') {
            const digitsRegex = /^\d{12}$/;
            if (!digitsRegex.test(rawPaper)) {
                highlightError(paperInput, "Số CMND/Căn cước công dân/Chứng minh quân đội không hợp lệ");
                return;
            }
        } else if (type === 'tc_dn' || type === 'nd_nn') {
            if (rawPaper.length > 50) {
                highlightError(paperInput, "Mã số thuế vượt quá độ dài cho phép");
                return;
            }
        } else if (type === 'nn_ngoai') {
            if (rawPaper.length > 50) {
                highlightError(paperInput, "Số Hộ chiếu vượt quá độ dài cho phép");
                return;
            }
        } else if (type === 'cd_kq') {
            if (rawPaper.length > 255) {
                highlightError(paperInput, "Thẻ cư trú vượt quá độ dài cho phép");
                return;
            }
        }
        paperNo = rawPaper;
    }

    const country = document.getElementById('secCountry').value;
    const provinceSelect = document.getElementById('secProvince');
    const province = provinceSelect ? provinceSelect.value.trim() : '';
    const addressInput = document.getElementById('secAddress');
    const detailAddress = addressInput.value.trim();

    if (!country) {
        highlightError(document.getElementById('secCountry'), "Đây là trường bắt buộc");
        return;
    }

    if (country === 'Việt Nam' && !province) {
        if (provinceSelect) {
            highlightError(provinceSelect, "Đây là trường bắt buộc");
            return;
        }
    }

    if (!detailAddress) {
        highlightError(addressInput, "Đây là trường bắt buộc");
        return;
    }

    if (detailAddress.length > 500) {
        highlightError(addressInput, "Địa chỉ chi tiết vượt quá độ dài cho phép");
        return;
    }

    if (paperNo) {
        const duplicate = baselineData.securingParties.find((p, idx) =>
            p.paperNo === paperNo &&
            idx !== editSecuringIndex &&
            p.status !== 'Rút bớt'
        );
        if (duplicate) {
            highlightError(paperInput, "Chủ thể này đã tồn tại trong danh sách. Vui lòng kiểm tra lại.");
            return;
        }
    }

    const fullAddress = `${detailAddress}${province ? ' - ' + province : ''} - ${country}`;

    let typeLabel = 'Công dân Việt Nam';
    if (type === 'nn_ngoai') typeLabel = 'Người nước ngoài';
    else if (type === 'cd_kq') typeLabel = 'Người không quốc tịch cư trú tại Việt Nam';
    else if (type === 'tc_dn') typeLabel = 'Tổ chức có đăng ký kinh doanh trong nước';
    else if (type === 'nd_nn') typeLabel = 'Nhà đầu tư nước ngoài';
    else if (type === 'tc_khac') typeLabel = 'Tổ chức khác';

    if (editSecuringIndex === -1) {
        baselineData.securingParties.push({
            type: type,
            typeLabel: typeLabel,
            name: name,
            paperType: paperType,
            paperNo: paperNo,
            passportCountry: passportCountry,
            country: country,
            province: province,
            address: fullAddress,
            status: "Bổ sung mới"
        });
    } else {
        const item = baselineData.securingParties[editSecuringIndex];
        const originalSubject = originalData.securingParties.find(p => p.paperNo === item.paperNo) || originalData.securingParties[editSecuringIndex] || {};

        const isModified = (
            name !== originalSubject.name ||
            paperNo !== originalSubject.paperNo ||
            type !== originalSubject.type ||
            fullAddress !== originalSubject.address
        );

        item.type = type;
        item.typeLabel = typeLabel;
        item.name = name;
        item.paperType = paperType;
        item.paperNo = paperNo;
        item.passportCountry = passportCountry;
        item.country = country;
        item.province = province;
        item.address = fullAddress;

        if (item.status !== 'Bổ sung mới') {
            item.status = isModified ? 'Sửa thông tin' : 'Không thay đổi';
        }
    }

    hideSubForm('formSecuringParty');
    renderSecuringList();
}

function removeSecuring(index) {
    const item = baselineData.securingParties[index];
    if (item.status === 'Bổ sung mới') {
        baselineData.securingParties.splice(index, 1);
    } else {
        item.status = 'Rút bớt';
    }
    renderSecuringList();
}

function undoRemoveSecuring(index) {
    const item = baselineData.securingParties[index];
    item.status = 'Không thay đổi';
    renderSecuringList();
}

function renderSecuredList() {
    const listContainer = document.getElementById('securedList');
    listContainer.innerHTML = '';

    const parties = baselineData.securedParties;
    const isEditable = document.getElementById('cardSecured').classList.contains('editable');

    const btnCancel = document.getElementById('btnCancelSecured');
    const btnClose = document.getElementById('btnCloseSecured');
    const formSecured = document.getElementById('formSecuredParty');

    const activeCount = parties.filter(p => p.status !== 'Rút bớt').length;

    if (activeCount === 0) {
        if (formSecured) formSecured.style.display = 'block';
        if (btnCancel) btnCancel.style.display = 'none';
        if (btnClose) btnClose.style.display = 'none';
    } else {
        if (btnCancel) btnCancel.style.display = 'inline-flex';
        if (btnClose) btnClose.style.display = 'inline-flex';
    }

    parties.forEach((party, index) => {
        const tr = document.createElement('tr');
        let rowClass = 'row-unchanged';
        let statusTag = '<span class="entity-badge badge-unchanged">[Đang bảo đảm]</span>';

        if (party.status === 'Bổ sung mới') {
            rowClass = 'row-added';
            statusTag = '<span class="entity-badge badge-added">[Bổ sung mới]</span>';
        } else if (party.status === 'Sửa thông tin') {
            rowClass = 'row-modified';
            statusTag = '<span class="entity-badge badge-modified">[Sửa thông tin]</span>';
        } else if (party.status === 'Rút bớt') {
            rowClass = 'row-removed';
            statusTag = '<span class="entity-badge badge-removed">[Rút bớt]</span>';
        }

        tr.className = rowClass;

        let orig = null;
        if (party.status !== 'Bổ sung mới') {
            orig = originalData.securedParties.find(p => p.name && p.name.toLowerCase() === party.name.toLowerCase()) || originalData.securedParties[index];
        }

        const origName = orig ? (orig.name || '') : '';
        const origAddress = orig ? (orig.address || '') : '';
        const origProvince = orig ? (orig.province || '') : '';
        const origCountry = orig ? (orig.country || '') : '';

        const nameTdAttr = orig ? getCellHtml(party.name || '', origName) : '';
        const addressTdAttr = orig ? getCellHtml(party.address || '', origAddress) : '';
        const provinceTdAttr = orig ? getCellHtml(party.province || '', origProvince) : '';
        const countryTdAttr = orig ? getCellHtml(party.country || '', origCountry) : '';

        const nameHistory = orig ? getHistoryIcon(party.name || '', origName) : '';
        const addressHistory = orig ? getHistoryIcon(party.address || '', origAddress) : '';
        const provinceHistory = orig ? getHistoryIcon(party.province || '', origProvince) : '';
        const countryHistory = orig ? getHistoryIcon(party.country || '', origCountry) : '';

        let actionsHtml = '';
        if (isEditable) {
            if (party.status === 'Rút bớt') {
                actionsHtml = `<div class="grid-row-actions"><button class="grid-action-btn undo" title="Hoàn tác rút bớt" onclick="undoRemoveSecured(${index})"><i class="fa-solid fa-rotate-left"></i><span>Hoàn tác</span></button></div>`;
            } else {
                actionsHtml = `
                    <div class="grid-row-actions">
                        <button class="grid-action-btn edit" title="Sửa thông tin" onclick="editSecured(${index})"><i class="fa-solid fa-pen"></i><span>Sửa</span></button>
                        <button class="grid-action-btn delete" title="Xóa dòng" onclick="removeSecured(${index})"><i class="fa-solid fa-trash-can"></i><span>Xóa</span></button>
                    </div>
                `;
            }
        } else {
            actionsHtml = `<span class="grid-action-locked"><i class="fa-solid fa-lock"></i> Khóa</span>`;
        }

        tr.innerHTML = `
            <td style="text-align: center;">${actionsHtml}</td>
            <td ${nameTdAttr}>${party.name || ''} ${nameHistory}</td>
            <td ${addressTdAttr}>${party.address || ''} ${addressHistory}</td>
            <td ${provinceTdAttr}>${party.province || ''} ${provinceHistory}</td>
            <td ${countryTdAttr}>${party.country || ''} ${countryHistory}</td>
            <td>${statusTag}</td>
        `;

        listContainer.appendChild(tr);
    });
}

function showAddSecuredForm() {
    editSecuredIndex = -1;
    document.getElementById('securedFormTitle').textContent = "Thêm Bên nhận bảo đảm mới";
    document.getElementById('sedName').value = "";
    document.getElementById('sedCountry').value = "Việt Nam";
    document.getElementById('sedCountry').dispatchEvent(new Event('change'));

    const provSelect = document.getElementById('sedProvince');
    if (provSelect) provSelect.value = "";

    document.getElementById('sedAddress').value = "";

    document.getElementById('btnSaveSecuredNew').style.display = 'inline-flex';
    document.getElementById('btnUpdateSecured').style.display = 'none';

    document.getElementById('formSecuredParty').style.display = 'block';

    const parties = baselineData.securedParties;
    const btnCancel = document.getElementById('btnCancelSecured');
    const btnClose = document.getElementById('btnCloseSecured');
    if (parties.filter(p => p.status !== 'Rút bớt').length === 0) {
        if (btnCancel) btnCancel.style.display = 'none';
        if (btnClose) btnClose.style.display = 'none';
    } else {
        if (btnCancel) btnCancel.style.display = 'inline-flex';
        if (btnClose) btnClose.style.display = 'inline-flex';
    }
}

function fillSelfAsSecured() {
    editSecuredIndex = -1;
    document.getElementById('securedFormTitle').textContent = "Thêm Bên nhận bảo đảm";

    document.getElementById('sedName').value = "DOANH NGHIỆP TƯ NHÂN NGUYỄN VĂN KHÁCH";
    document.getElementById('sedCountry').value = "Việt Nam";
    document.getElementById('sedCountry').dispatchEvent(new Event('change'));

    setTimeout(() => {
        const provSelect = document.getElementById('sedProvince');
        if (provSelect) provSelect.value = "Thành phố Hà Nội";
        document.getElementById('sedAddress').value = "Số 99 Trần Duy Hưng, Quận Cầu Giấy";
    }, 10);

    document.getElementById('formSecuredParty').style.display = 'block';
    document.getElementById('btnSelfSecured').style.display = 'none';

    document.getElementById('btnSaveSecuredNew').style.display = 'inline-flex';
    document.getElementById('btnUpdateSecured').style.display = 'none';

    const btnCancel = document.getElementById('btnCancelSecured');
    const btnClose = document.getElementById('btnCloseSecured');
    if (btnCancel) btnCancel.style.display = 'inline-flex';
    if (btnClose) btnClose.style.display = 'inline-flex';
}

function editSecured(index) {
    editSecuredIndex = index;
    const party = baselineData.securedParties[index];

    document.getElementById('securedFormTitle').textContent = `Sửa thông tin: ${party.name}`;
    document.getElementById('sedName').value = party.name;
    document.getElementById('sedCountry').value = party.country || 'Việt Nam';

    document.getElementById('sedCountry').dispatchEvent(new Event('change'));

    const provSelect = document.getElementById('sedProvince');
    if (provSelect) {
        provSelect.value = party.province || "";
    }

    let rawAddress = party.address || "";
    let detailAddress = rawAddress;
    if (rawAddress.includes(" - ")) {
        const parts = rawAddress.split(" - ");
        detailAddress = parts[0];
    } else {
        if (party.province && detailAddress.includes(party.province)) {
            detailAddress = detailAddress.split(`, ${party.province}`)[0];
            detailAddress = detailAddress.split(` - ${party.province}`)[0];
        }
        if (party.country && detailAddress.includes(party.country)) {
            detailAddress = detailAddress.split(`, ${party.country}`)[0];
            detailAddress = detailAddress.split(` - ${party.country}`)[0];
        }
    }
    document.getElementById('sedAddress').value = detailAddress.trim();

    document.getElementById('btnSaveSecuredNew').style.display = 'none';
    document.getElementById('btnUpdateSecured').style.display = 'inline-flex';

    document.getElementById('formSecuredParty').style.display = 'block';

    const btnCancel = document.getElementById('btnCancelSecured');
    const btnClose = document.getElementById('btnCloseSecured');
    if (btnCancel) btnCancel.style.display = 'inline-flex';
    if (btnClose) btnClose.style.display = 'inline-flex';
}

function saveSecuredParty(isUpdate) {
    const inputs = document.querySelectorAll('#formSecuredParty .form-control, #formSecuredParty .form-select');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        const err = input.parentElement.querySelector('.error-text');
        if (err) err.remove();
    });

    const nameInput = document.getElementById('sedName');
    const name = nameInput.value.trim();
    if (!name) {
        highlightError(nameInput, "Đây là trường bắt buộc");
        return;
    }

    if (name.length > 255) {
        highlightError(nameInput, "Tên bên nhận bảo đảm vượt quá độ dài cho phép");
        return;
    }

    const country = document.getElementById('sedCountry').value;
    const provinceSelect = document.getElementById('sedProvince');
    const province = provinceSelect ? provinceSelect.value.trim() : '';
    const addressInput = document.getElementById('sedAddress');
    const detailAddress = addressInput.value.trim();

    if (!country) {
        highlightError(document.getElementById('sedCountry'), "Đây là trường bắt buộc");
        return;
    }

    if (country === 'Việt Nam' && !province) {
        if (provinceSelect) {
            highlightError(provinceSelect, "Đây là trường bắt buộc");
            return;
        }
    }

    if (!detailAddress) {
        highlightError(addressInput, "Đây là trường bắt buộc");
        return;
    }

    if (detailAddress.length > 500) {
        highlightError(addressInput, "Địa chỉ chi tiết vượt quá độ dài cho phép");
        return;
    }

    const fullAddress = `${detailAddress}${province ? ' - ' + province : ''} - ${country}`;

    const duplicate = baselineData.securedParties.find((p, idx) =>
        p.name.toLowerCase() === name.toLowerCase() &&
        idx !== editSecuredIndex &&
        p.status !== 'Rút bớt'
    );
    if (duplicate) {
        highlightError(nameInput, "Chủ thể này đã tồn tại trong danh sách. Vui lòng kiểm tra lại.");
        return;
    }

    if (editSecuredIndex === -1) {
        baselineData.securedParties.push({
            name: name,
            country: country,
            province: province,
            address: fullAddress,
            status: "Bổ sung mới"
        });
    } else {
        const item = baselineData.securedParties[editSecuredIndex];
        const originalSubject = originalData.securedParties[editSecuredIndex] || originalData.securedParties.find(p => p.name.toLowerCase() === item.name.toLowerCase()) || {};

        const isModified = (
            name !== originalSubject.name ||
            fullAddress !== originalSubject.address
        );

        item.name = name;
        item.country = country;
        item.province = province;
        item.address = fullAddress;

        if (item.status !== 'Bổ sung mới') {
            item.status = isModified ? 'Sửa thông tin' : 'Không thay đổi';
        }
    }

    hideSubForm('formSecuredParty');
    renderSecuredList();
}

function removeSecured(index) {
    const item = baselineData.securedParties[index];
    if (item.status === 'Bổ sung mới') {
        baselineData.securedParties.splice(index, 1);
    } else {
        item.status = 'Rút bớt';
    }
    renderSecuredList();
}

function undoRemoveSecured(index) {
    const item = baselineData.securedParties[index];
    item.status = 'Không thay đổi';
    renderSecuredList();
}


// ----------------------------------------------------
// TÀI SẢN BẢO ĐẢM (ASSETS) LIST CRUD
// ----------------------------------------------------
// ----------------------------------------------------
// TÀI SẢN BẢO ĐẢM (ASSETS) LIST CRUD WITH FIVE CONDITIONAL SUBFORMS & INLINE GRIDS
// ----------------------------------------------------
let soKhungList = [];
let tauCaList = [];

function loadAssetsData() {
    soKhungList = [];
    tauCaList = [];

    if (baselineData && baselineData.assets) {
        baselineData.assets.forEach(a => {
            if (['tauca', 'duongthuy', 'duongsat', 'chuyendung'].includes(a.type)) {
                tauCaList.push({ ...a });
            } else {
                soKhungList.push({ ...a });
            }
        });
    }

    const chkSoKhung = document.getElementById('chkSoKhung');
    const chkTauCa = document.getElementById('chkTauCa');
    const chkQuyenTaiSan = document.getElementById('chkQuyenTaiSan');
    const chkHangHoa = document.getElementById('chkHangHoa');
    const chkChungKhoan = document.getElementById('chkChungKhoan');

    chkSoKhung.checked = soKhungList.length > 0;
    chkTauCa.checked = tauCaList.length > 0;

    chkQuyenTaiSan.checked = !!(baselineData.quyenTaiSan && baselineData.quyenTaiSan.tenQuyen);
    chkHangHoa.checked = !!(baselineData.hangHoa && baselineData.hangHoa.tenHangHoa);
    chkChungKhoan.checked = !!(baselineData.chungKhoan && baselineData.chungKhoan.ck_nam);

    if (chkQuyenTaiSan.checked) {
        document.getElementById('qts_tenQuyen').value = baselineData.quyenTaiSan.tenQuyen || '';
        document.getElementById('qts_canCu').value = baselineData.quyenTaiSan.canCu || '';
    }
    if (chkHangHoa.checked) {
        const hh = baselineData.hangHoa;
        if (hh.loai === 'khohang') {
            document.getElementById('radioKhoHang').checked = true;
        } else {
            document.getElementById('radioLuanchuyen').checked = true;
        }
        document.getElementById('hh_giaTriTenLoai').value = hh.tenHangHoa || '';
        document.getElementById('hh_diaChiKho').value = hh.diaChiKho || '';
        document.getElementById('hh_soHieuKho').value = hh.soHieuKho || '';
        toggleHangHoaFields();
    }
    if (chkChungKhoan.checked) {
        const ck = baselineData.chungKhoan;
        document.getElementById('ck_gio').value = ck.ck_gio || '';
        document.getElementById('ck_phut').value = ck.ck_phut || '';
        document.getElementById('ck_ngay').value = ck.ck_ngay || '';
        document.getElementById('ck_thang').value = ck.ck_thang || '';
        document.getElementById('ck_nam').value = ck.ck_nam || '';
    }

    // Set checkboxes change listeners to toggle subforms
    const checkboxes = [chkSoKhung, chkTauCa, chkQuyenTaiSan, chkHangHoa, chkChungKhoan];
    checkboxes.forEach(chk => {
        chk.addEventListener('change', toggleAssetSections);
    });

    toggleAssetSections();
    renderSoKhungGrid();
    renderTauCaGrid();
}

function toggleAssetSections() {
    const chkSoKhung = document.getElementById('chkSoKhung').checked;
    const chkTauCa = document.getElementById('chkTauCa').checked;
    const chkQuyenTaiSan = document.getElementById('chkQuyenTaiSan').checked;
    const chkHangHoa = document.getElementById('chkHangHoa').checked;
    const chkChungKhoan = document.getElementById('chkChungKhoan').checked;

    document.getElementById('gridSoKhung').classList.toggle('hidden', !chkSoKhung);
    document.getElementById('gridTauCa').classList.toggle('hidden', !chkTauCa);
    document.getElementById('gridQuyenTaiSan').classList.toggle('hidden', !chkQuyenTaiSan);
    document.getElementById('gridHangHoa').classList.toggle('hidden', !chkHangHoa);
    document.getElementById('gridChungKhoan').classList.toggle('hidden', !chkChungKhoan);

    // Khi tích chọn Loại tài sản tàu cá, thì ở bảng phải mặc định hiển thị sẵn 1 dòng để nhập liệu
    if (chkTauCa && tauCaList.length === 0) {
        addInlineTauCaRow();
    }

    // Hide or show the notice columns depending on Transaction Type
    const txType = document.getElementById('transactionType').value;
    const colNoticeSks = document.querySelectorAll('.col-notice-sk');
    const colNoticeTcs = document.querySelectorAll('.col-notice-tc');
    const btnYeuCauTatCaSK = document.getElementById('btnYeuCauTatCaSK');
    const btnYeuCauTatCaTC = document.getElementById('btnYeuCauTatCaTC');

    colNoticeSks.forEach(el => el.style.display = (txType === 'Hợp đồng') ? 'none' : '');
    colNoticeTcs.forEach(el => el.style.display = (txType === 'Hợp đồng') ? 'none' : '');
    if (btnYeuCauTatCaSK) btnYeuCauTatCaSK.style.display = (txType === 'Hợp đồng') ? 'none' : '';
    if (btnYeuCauTatCaTC) btnYeuCauTatCaTC.style.display = (txType === 'Hợp đồng') ? 'none' : '';
}

function getOriginalAsset(assetId) {
    if (!originalData || !originalData.assets) return null;
    return originalData.assets.find(a => a.id === assetId);
}

function getCellHtml(currentVal, originalVal) {
    if (originalVal !== undefined && String(currentVal).trim() !== String(originalVal).trim()) {
        const tooltip = `Giá trị cũ: ${originalVal ? originalVal : '(Trống)'}`;
        return `class="cell-modified" title="${tooltip}" style="border: 1px solid var(--accent-color); background-color: #FEF3C7;"`;
    }
    return '';
}

function getHistoryIcon(currentVal, originalVal) {
    if (originalVal !== undefined && String(currentVal).trim() !== String(originalVal).trim()) {
        const tooltip = `Giá trị cũ: ${originalVal ? originalVal : '(Trống)'}`;
        return `<button class="history-icon-btn" data-tooltip="${tooltip}"><i class="fa-solid fa-clock-rotate-left"></i></button>`;
    }
    return '';
}

function renderSoKhungGrid() {
    const tbody = document.getElementById('tbodySoKhung');
    if (!tbody) return;
    tbody.innerHTML = '';

    const txType = document.getElementById('transactionType').value;
    const isEditable = document.getElementById('cardAssets').classList.contains('editable');

    soKhungList.forEach((a, index) => {
        const tr = document.createElement('tr');

        let rowClass = 'row-unchanged';
        if (a.status === 'Bổ sung mới') {
            rowClass = 'row-added';
        } else if (a.status === 'Sửa thông tin') {
            rowClass = 'row-modified';
        } else if (a.status === 'Rút bớt') {
            rowClass = 'row-removed';
        }
        tr.className = rowClass;

        let orig = null;
        if (a.status !== 'Bổ sung mới') {
            orig = getOriginalAsset(a.id);
        }

        const origType = orig ? (orig.type || '') : '';
        const origBrandColor = orig ? (orig.brandColor || '') : '';
        const origFrameNo = orig ? (orig.frameNo || '') : '';
        const origEngineNo = orig ? (orig.engineNo || '') : '';
        const origPlateNo = orig ? (orig.plateNo || '') : '';
        const origHasNotice = orig ? !!orig.hasNotice : false;
        const origNoticeAgency = orig ? (orig.noticeAgency || '') : '';

        const typeTdAttr = orig ? getCellHtml(a.type, origType) : '';
        const brandColorTdAttr = orig ? getCellHtml(a.brandColor, origBrandColor) : '';
        const frameNoTdAttr = orig ? getCellHtml(a.frameNo, origFrameNo) : '';
        const engineNoTdAttr = orig ? getCellHtml(a.engineNo || '', origEngineNo) : '';
        const plateNoTdAttr = orig ? getCellHtml(a.plateNo || '', origPlateNo) : '';

        let noticeTdAttr = '';
        let noticeAgencyTdAttr = '';
        if (orig) {
            noticeTdAttr = getCellHtml(!!a.hasNotice ? 'Có' : 'Không', origHasNotice ? 'Có' : 'Không');
            noticeAgencyTdAttr = getCellHtml(a.noticeAgency || '', origNoticeAgency);
        }

        const typeHistory = orig ? getHistoryIcon(a.type, origType) : '';
        const brandColorHistory = orig ? getHistoryIcon(a.brandColor, origBrandColor) : '';
        const frameNoHistory = orig ? getHistoryIcon(a.frameNo, origFrameNo) : '';
        const engineNoHistory = orig ? getHistoryIcon(a.engineNo || '', origEngineNo) : '';
        const plateNoHistory = orig ? getHistoryIcon(a.plateNo || '', origPlateNo) : '';
        const noticeHistory = orig ? getHistoryIcon(!!a.hasNotice ? 'Có' : 'Không', origHasNotice ? 'Có' : 'Không') : '';
        const noticeAgencyHistory = orig ? getHistoryIcon(a.noticeAgency || '', origNoticeAgency) : '';

        const disabledAttr = (isEditable && a.status !== 'Rút bớt') ? '' : 'disabled';
        const readonlyAttr = (isEditable && a.status !== 'Rút bớt') ? '' : 'readonly';

        const typeSelectHtml = `
            <select class="form-select inline-input" ${disabledAttr} onchange="updateInlineAsset(${index}, 'sokhung', 'type', this.value)">
                <option value="oto" ${a.type === 'oto' ? 'selected' : ''}>Ô tô</option>
                <option value="moto" ${a.type === 'moto' ? 'selected' : ''}>Mô tô</option>
            </select>
        `;

        const noticeCheckboxHtml = `
            <input type="checkbox" ${disabledAttr} ${a.hasNotice ? 'checked' : ''} onchange="updateInlineAsset(${index}, 'sokhung', 'hasNotice', this.checked)">
        `;

        const actionBtn = (isEditable) ?
            (a.status === 'Rút bớt' ?
                `<button type="button" class="btn btn-outline" style="padding: 2px 6px;" onclick="undoRemoveInlineAsset(${index}, 'sokhung')"><i class="fa-solid fa-undo"></i></button>` :
                `<button type="button" class="btn btn-danger" style="padding: 2px 6px;" onclick="removeInlineAsset(${index}, 'sokhung')"><i class="fa-solid fa-trash"></i></button>`
            ) : '';

        tr.innerHTML = `
            <td style="text-align: center;"><input type="checkbox" class="chk-row-sk" data-index="${index}" ${disabledAttr}></td>
            <td>${index + 1}</td>
            <td ${typeTdAttr}>${typeSelectHtml} ${typeHistory}</td>
            <td ${brandColorTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.brandColor || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'sokhung', 'brandColor', this.value)">
                ${brandColorHistory}
            </td>
            <td ${frameNoTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.frameNo || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'sokhung', 'frameNo', this.value)">
                ${frameNoHistory}
            </td>
            <td ${engineNoTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.engineNo || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'sokhung', 'engineNo', this.value)">
                ${engineNoHistory}
            </td>
            <td ${plateNoTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.plateNo || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'sokhung', 'plateNo', this.value)">
                ${plateNoHistory}
            </td>
            <td class="col-notice-sk" style="text-align: center; ${txType === 'Hợp đồng' ? 'display:none;' : ''}" ${noticeTdAttr}>
                ${noticeCheckboxHtml} ${noticeHistory}
            </td>
            <td class="col-notice-sk" style="${txType === 'Hợp đồng' ? 'display:none;' : ''}" ${noticeAgencyTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.noticeAgency || ''}" ${readonlyAttr} ${a.hasNotice ? '' : 'disabled'} onchange="updateInlineAsset(${index}, 'sokhung', 'noticeAgency', this.value)">
                ${noticeAgencyHistory}
            </td>
            <td style="text-align: center;">${actionBtn}</td>
        `;

        tbody.appendChild(tr);
    });
}

function renderTauCaGrid() {
    const tbody = document.getElementById('tbodyTauCa');
    if (!tbody) return;
    tbody.innerHTML = '';

    const txType = document.getElementById('transactionType').value;
    const isEditable = document.getElementById('cardAssets').classList.contains('editable');

    tauCaList.forEach((a, index) => {
        const tr = document.createElement('tr');

        let rowClass = 'row-unchanged';
        if (a.status === 'Bổ sung mới') {
            rowClass = 'row-added';
        } else if (a.status === 'Sửa thông tin') {
            rowClass = 'row-modified';
        } else if (a.status === 'Rút bớt') {
            rowClass = 'row-removed';
        }
        tr.className = rowClass;

        let orig = null;
        if (a.status !== 'Bổ sung mới') {
            orig = getOriginalAsset(a.id);
        }

        const origName = orig ? (orig.name || '') : '';
        const origOwnerName = orig ? (orig.ownerName || '') : '';
        const origRegNo = orig ? (orig.regNo || '') : '';
        const origLevel = orig ? (orig.level || '') : '';
        const origHasNotice = orig ? !!orig.hasNotice : false;
        const origNoticeAgency = orig ? (orig.noticeAgency || '') : '';

        const nameTdAttr = orig ? getCellHtml(a.name || '', origName) : '';
        const ownerTdAttr = orig ? getCellHtml(a.ownerName || '', origOwnerName) : '';
        const regNoTdAttr = orig ? getCellHtml(a.regNo || '', origRegNo) : '';
        const levelTdAttr = orig ? getCellHtml(a.level || '', origLevel) : '';

        let noticeTdAttr = '';
        let noticeAgencyTdAttr = '';
        if (orig) {
            noticeTdAttr = getCellHtml(!!a.hasNotice ? 'Có' : 'Không', origHasNotice ? 'Có' : 'Không');
            noticeAgencyTdAttr = getCellHtml(a.noticeAgency || '', origNoticeAgency);
        }

        const nameHistory = orig ? getHistoryIcon(a.name || '', origName) : '';
        const ownerHistory = orig ? getHistoryIcon(a.ownerName || '', origOwnerName) : '';
        const regNoHistory = orig ? getHistoryIcon(a.regNo || '', origRegNo) : '';
        const levelHistory = orig ? getHistoryIcon(a.level || '', origLevel) : '';
        const noticeHistory = orig ? getHistoryIcon(!!a.hasNotice ? 'Có' : 'Không', origHasNotice ? 'Có' : 'Không') : '';
        const noticeAgencyHistory = orig ? getHistoryIcon(a.noticeAgency || '', origNoticeAgency) : '';

        const disabledAttr = (isEditable && a.status !== 'Rút bớt') ? '' : 'disabled';
        const readonlyAttr = (isEditable && a.status !== 'Rút bớt') ? '' : 'readonly';

        const noticeCheckboxHtml = `
            <input type="checkbox" ${disabledAttr} ${a.hasNotice ? 'checked' : ''} onchange="updateInlineAsset(${index}, 'tauca', 'hasNotice', this.checked)">
        `;

        const actionBtn = (isEditable) ?
            (a.status === 'Rút bớt' ?
                `<button type="button" class="btn btn-outline" style="padding: 2px 6px;" onclick="undoRemoveInlineAsset(${index}, 'tauca')"><i class="fa-solid fa-undo"></i></button>` :
                `<button type="button" class="btn btn-danger" style="padding: 2px 6px;" onclick="removeInlineAsset(${index}, 'tauca')"><i class="fa-solid fa-trash"></i></button>`
            ) : '';

        tr.innerHTML = `
            <td style="text-align: center;"><input type="checkbox" class="chk-row-tc" data-index="${index}" ${disabledAttr}></td>
            <td>${index + 1}</td>
            <td ${nameTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.name || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'tauca', 'name', this.value)">
                ${nameHistory}
            </td>
            <td ${ownerTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.ownerName || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'tauca', 'ownerName', this.value)">
                ${ownerHistory}
            </td>
            <td ${regNoTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.regNo || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'tauca', 'regNo', this.value)">
                ${regNoHistory}
            </td>
            <td ${levelTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.level || ''}" ${readonlyAttr} onchange="updateInlineAsset(${index}, 'tauca', 'level', this.value)">
                ${levelHistory}
            </td>
            <td class="col-notice-tc" style="text-align: center; ${txType === 'Hợp đồng' ? 'display:none;' : ''}" ${noticeTdAttr}>
                ${noticeCheckboxHtml} ${noticeHistory}
            </td>
            <td class="col-notice-tc" style="${txType === 'Hợp đồng' ? 'display:none;' : ''}" ${noticeAgencyTdAttr}>
                <input type="text" class="form-control inline-input" value="${a.noticeAgency || ''}" ${readonlyAttr} ${a.hasNotice ? '' : 'disabled'} onchange="updateInlineAsset(${index}, 'tauca', 'noticeAgency', this.value)">
                ${noticeAgencyHistory}
            </td>
            <td style="text-align: center;">${actionBtn}</td>
        `;

        tbody.appendChild(tr);
    });
}

function addInlineSoKhungRow() {
    soKhungList.push({
        id: Date.now() + Math.random(),
        type: "oto",
        brandColor: "",
        frameNo: "",
        engineNo: "",
        plateNo: "",
        hasNotice: false,
        noticeAgency: "",
        status: "Bổ sung mới"
    });
    renderSoKhungGrid();
}

function deleteSelectedSoKhungRows() {
    const checkboxes = document.querySelectorAll('.chk-row-sk:checked');
    if (checkboxes.length === 0) {
        alert("Vui lòng chọn ít nhất một số khung để xóa.");
        return;
    }

    const indices = Array.from(checkboxes).map(chk => parseInt(chk.getAttribute('data-index'))).sort((a, b) => b - a);

    indices.forEach(index => {
        const item = soKhungList[index];
        if (item.status === 'Bổ sung mới') {
            soKhungList.splice(index, 1);
        } else {
            item.status = 'Rút bớt';
        }
    });

    document.getElementById('chkAllSK').checked = false;
    renderSoKhungGrid();
}

function noticeAllSoKhungRows() {
    soKhungList.forEach(a => {
        if (a.status !== 'Rút bớt') {
            a.hasNotice = true;
            if (!a.noticeAgency) {
                a.noticeAgency = "Cục Cảnh sát Giao thông đường bộ - Hà Nội";
            }
            if (a.status !== 'Bổ sung mới') {
                a.status = 'Sửa thông tin';
            }
        }
    });
    renderSoKhungGrid();
}

function toggleSelectAllSoKhung(master) {
    const checkboxes = document.querySelectorAll('.chk-row-sk');
    checkboxes.forEach(chk => {
        if (!chk.disabled) {
            chk.checked = master.checked;
        }
    });
}

function addInlineTauCaRow() {
    tauCaList.push({
        id: Date.now() + Math.random(),
        type: "tauca",
        name: "",
        ownerName: "",
        regNo: "",
        level: "",
        hasNotice: false,
        noticeAgency: "",
        status: "Bổ sung mới"
    });
    renderTauCaGrid();
}

function deleteSelectedTauCaRows() {
    const checkboxes = document.querySelectorAll('.chk-row-tc:checked');
    if (checkboxes.length === 0) {
        alert("Vui lòng chọn ít nhất một phương tiện để xóa.");
        return;
    }

    const indices = Array.from(checkboxes).map(chk => parseInt(chk.getAttribute('data-index'))).sort((a, b) => b - a);

    indices.forEach(index => {
        const item = tauCaList[index];
        if (item.status === 'Bổ sung mới') {
            tauCaList.splice(index, 1);
        } else {
            item.status = 'Rút bớt';
        }
    });

    document.getElementById('chkAllTC').checked = false;
    renderTauCaGrid();
}

function noticeAllTauCaRows() {
    tauCaList.forEach(a => {
        if (a.status !== 'Rút bớt') {
            a.hasNotice = true;
            if (!a.noticeAgency) {
                a.noticeAgency = "Cục Cảnh sát Giao thông đường bộ - Hà Nội";
            }
            if (a.status !== 'Bổ sung mới') {
                a.status = 'Sửa thông tin';
            }
        }
    });
    renderTauCaGrid();
}

function toggleSelectAllTauCa(master) {
    const checkboxes = document.querySelectorAll('.chk-row-tc');
    checkboxes.forEach(chk => {
        if (!chk.disabled) {
            chk.checked = master.checked;
        }
    });
}

function removeInlineAsset(index, typeGrid) {
    const list = typeGrid === 'sokhung' ? soKhungList : tauCaList;
    const item = list[index];
    if (item.status === 'Bổ sung mới') {
        list.splice(index, 1);
    } else {
        item.status = 'Rút bớt';
    }
    if (typeGrid === 'sokhung') renderSoKhungGrid();
    else renderTauCaGrid();
}

function undoRemoveInlineAsset(index, typeGrid) {
    const list = typeGrid === 'sokhung' ? soKhungList : tauCaList;
    const item = list[index];
    item.status = 'Không thay đổi';
    if (typeGrid === 'sokhung') renderSoKhungGrid();
    else renderTauCaGrid();
}

function updateInlineAsset(index, typeGrid, field, value) {
    const list = typeGrid === 'sokhung' ? soKhungList : tauCaList;
    const item = list[index];
    if (!item) return;

    if (field === 'hasNotice') {
        item.hasNotice = !!value;
        if (!value) {
            item.noticeAgency = '';
        }
    } else {
        item[field] = value;
    }

    if (item.status !== 'Bổ sung mới') {
        const orig = getOriginalAsset(item.id);
        if (orig) {
            let isModified = false;
            if (typeGrid === 'sokhung') {
                isModified = (
                    item.type !== orig.type ||
                    item.brandColor !== orig.brandColor ||
                    item.frameNo !== orig.frameNo ||
                    (item.engineNo || '') !== (orig.engineNo || '') ||
                    (item.plateNo || '') !== (orig.plateNo || '') ||
                    !!item.hasNotice !== !!orig.hasNotice ||
                    (item.hasNotice ? item.noticeAgency !== orig.noticeAgency : false)
                );
            } else {
                isModified = (
                    item.name !== orig.name ||
                    item.ownerName !== orig.ownerName ||
                    item.regNo !== orig.regNo ||
                    item.level !== orig.level ||
                    !!item.hasNotice !== !!orig.hasNotice ||
                    (item.hasNotice ? item.noticeAgency !== orig.noticeAgency : false)
                );
            }
            item.status = isModified ? 'Sửa thông tin' : 'Không thay đổi';
        }
    }

    if (typeGrid === 'sokhung') {
        renderSoKhungGrid();
    } else {
        renderTauCaGrid();
    }
}

function downloadTemplateFile(type) {
    const txType = document.getElementById('transactionType').value;
    let fileName = '';

    if (type === 'sokhung') {
        fileName = (txType === 'Hợp đồng') ? 'Mau_Import_SoKhung_HopDong.xlsx' : 'Mau_Import_SoKhung_BPBD.xlsx';
    } else {
        fileName = (txType === 'Hợp đồng') ? 'Mau_Import_PhuongTien_HopDong.xlsx' : 'Mau_Import_PhuongTien_BPBD.xlsx';
    }

    const blob = new Blob(["MOCK EXCEL CONTENT"], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importExcelData(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xls,.xlsx';
    input.onchange = function (e) {
        if (this.files.length > 0) {
            const file = this.files[0];
            const ext = file.name.split('.').pop().toLowerCase();
            if (ext !== 'xls' && ext !== 'xlsx') {
                alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin Excel (.xls, .xlsx).');
                return;
            }

            if (type === 'sokhung') {
                soKhungList.push({
                    id: Date.now(),
                    type: "oto",
                    brandColor: "Imported Honda CRV, Màu đỏ",
                    frameNo: "HON-CRV-99223",
                    engineNo: "ENG-CRV-223",
                    plateNo: "30A-999.99",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Bổ sung mới"
                });
                soKhungList.push({
                    id: Date.now() + 1,
                    type: "moto",
                    brandColor: "Imported Yamaha Exciter, Màu xanh",
                    frameNo: "YAM-EXC-88112",
                    engineNo: "ENG-YAM-112",
                    plateNo: "29K1-777.77",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Bổ sung mới"
                });
                renderSoKhungGrid();
                alert("Import thành công: Đã tải lên 02 bản ghi hợp lệ. 01 dòng lỗi bị loại bỏ (Số khung bị trùng lặp).");
            } else {
                tauCaList.push({
                    id: Date.now(),
                    type: "tauca",
                    name: "Tàu cá Trường Sa 01",
                    ownerName: "Trần Văn Ngư",
                    regNo: "TS-9988-G1",
                    level: "Cấp I",
                    hasNotice: false,
                    noticeAgency: "",
                    status: "Bổ sung mới"
                });
                renderTauCaGrid();
                alert("Import thành công: Đã tải lên 01 bản ghi hợp lệ.");
            }
        }
    };
    input.click();
}

function toggleHangHoaFields() {
    const isKhoHang = document.getElementById('radioKhoHang').checked;
    const fieldsKhoHang = document.getElementById('fieldsKhoHang');
    const labelGiaTri = document.getElementById('hh_giaTriTenLoaiLabel');

    if (isKhoHang) {
        fieldsKhoHang.style.display = 'block';
        labelGiaTri.innerHTML = 'Giá trị hàng hóa/Tên, loại hàng hóa <span>*</span>';
    } else {
        fieldsKhoHang.style.display = 'none';
        labelGiaTri.innerHTML = 'Giá trị hàng hóa/Tên, loại hàng hóa <span>*</span>';
    }
}

function setupAssetCheckboxes() {
    // Add event listeners on checkboxes
    document.getElementById('chkSoKhung').addEventListener('change', toggleAssetSections);
    document.getElementById('chkTauCa').addEventListener('change', toggleAssetSections);
    document.getElementById('chkQuyenTaiSan').addEventListener('change', toggleAssetSections);
    document.getElementById('chkHangHoa').addEventListener('change', toggleAssetSections);
    document.getElementById('chkChungKhoan').addEventListener('change', toggleAssetSections);
}

// ----------------------------------------------------
// UI HELPERS
// ----------------------------------------------------
function hideSubForm(formId) {
    if (formId === 'formSecuringParty' && baselineData) {
        const activeCount = baselineData.securingParties.filter(p => p.status !== 'Rút bớt').length;
        if (activeCount === 0) return;
    }
    if (formId === 'formSecuredParty' && baselineData) {
        const activeCount = baselineData.securedParties.filter(p => p.status !== 'Rút bớt').length;
        if (activeCount === 0) return;
    }
    document.getElementById(formId).style.display = 'none';
}

function goBackToSearch() {
    if (confirm("Các thông tin vừa soạn thảo sẽ không được lưu. Bạn có muốn quay lại bước 1?")) {
        if (sessionStorage.getItem('registeredActionReturnContext')
            && window.top !== window.self
            && typeof window.top.returnFromCustomerModule === 'function') {
            window.top.returnFromCustomerModule();
            return;
        }
        window.location.href = 'tra_cuu_goc.html';
    }
}

// ----------------------------------------------------
// SUBMIT AND REDIRECT TO STEP 3 REVIEW
// ----------------------------------------------------
// Automatically compares originalData and current data to generate a summary list
function generateAutoSummary() {
    let summaryLines = [];

    // General fields comparison
    const fields = [
        { key: 'requester', current: document.getElementById('reqRole').value, label: 'Người yêu cầu đăng ký' },
        { key: 'orgName', current: document.getElementById('reqOrgName') ? document.getElementById('reqOrgName').value.trim() : (baselineData ? baselineData.orgName || '' : ''), label: 'Tên cơ quan / tổ chức yêu cầu' },
        { key: 'measureType', current: document.getElementById('measureType').value, label: 'Loại hình biện pháp / hợp đồng' },
        { key: 'contractNo', current: document.getElementById('contractNo').value.trim(), label: 'Số hợp đồng' },
        { key: 'contractDate', current: document.getElementById('contractDate').value.trim(), label: 'Ngày hiệu lực HĐ' },
        { key: 'loanValue', current: document.getElementById('loanValue').value.trim(), label: 'Giá trị nghĩa vụ (VND)' },
        { key: 'scale', current: document.getElementById('quyMo').value, label: 'Quy mô bên bảo đảm' },
        { key: 'isFemaleOwner', current: document.getElementById('isFemaleOwner').checked, label: 'Chủ doanh nghiệp nữ', type: 'bool' },
        { key: 'exemption', current: document.getElementById('isExempted').checked, label: 'Miễn lệ phí', type: 'bool' }
    ];

    fields.forEach(f => {
        let orig = originalData[f.key];
        let curr = f.current;

        if (f.type === 'bool') {
            orig = !!orig ? 'Có' : 'Không';
            curr = !!curr ? 'Có' : 'Không';
        }

        const origStr = String(orig === undefined || orig === null ? '' : orig).trim();
        const currStr = String(curr === undefined || curr === null ? '' : curr).trim();

        if (origStr !== currStr) {
            const before = origStr === '' ? '(Trống)' : origStr;
            const after = currStr === '' ? '(Trống)' : currStr;
            summaryLines.push(`+ Thay đổi thông tin [${f.label}] [${before}] ~ [${after}]`);
        }
    });

    // Securing parties comparison
    if (baselineData && baselineData.securingParties) {
        baselineData.securingParties.forEach(p => {
            if (p.status === 'Bổ sung mới') {
                summaryLines.push(`+ Thêm mới Bên bảo đảm [${p.name}] (Số giấy tờ: [${p.paperNo}])`);
            } else if (p.status === 'Rút bớt') {
                summaryLines.push(`+ Rút bớt Bên bảo đảm [${p.name}] (Số giấy tờ: [${p.paperNo}])`);
            } else if (p.status === 'Sửa thông tin') {
                const orig = originalData.securingParties.find(op => op.paperNo === p.paperNo);
                let oldParts = [];
                let newParts = [];
                if (orig) {
                    if (p.name !== orig.name) {
                        oldParts.push(`Tên: ${orig.name}`);
                        newParts.push(`Tên: ${p.name}`);
                    }
                    if (p.address !== orig.address) {
                        oldParts.push(`Địa chỉ: ${orig.address}`);
                        newParts.push(`Địa chỉ: ${p.address}`);
                    }
                }
                const oldInfo = oldParts.join(', ') || 'Thông tin cũ';
                const newInfo = newParts.join(', ') || 'Thông tin mới';
                summaryLines.push(`+ Sửa thông tin Bên bảo đảm [${p.name}] [${oldInfo}] ~ [${newInfo}]`);
            }
        });
    }

    // Secured parties comparison
    if (baselineData && baselineData.securedParties) {
        baselineData.securedParties.forEach(p => {
            if (p.status === 'Bổ sung mới') {
                summaryLines.push(`+ Thêm mới Bên nhận bảo đảm [${p.name}]`);
            } else if (p.status === 'Rút bớt') {
                summaryLines.push(`+ Rút bớt Bên nhận bảo đảm [${p.name}]`);
            } else if (p.status === 'Sửa thông tin') {
                const orig = originalData.securedParties.find(op => op.name.toLowerCase() === p.name.toLowerCase());
                let oldParts = [];
                let newParts = [];
                if (orig) {
                    if (p.address !== orig.address) {
                        oldParts.push(`Địa chỉ: ${orig.address}`);
                        newParts.push(`Địa chỉ: ${p.address}`);
                    }
                }
                const oldInfo = oldParts.join(', ') || 'Thông tin cũ';
                const newInfo = newParts.join(', ') || 'Thông tin mới';
                summaryLines.push(`+ Sửa thông tin Bên nhận bảo đảm [${p.name}] [${oldInfo}] ~ [${newInfo}]`);
            }
        });
    }

    // Assets comparison
    if (baselineData && baselineData.assets) {
        baselineData.assets.forEach(a => {
            if (a.status === 'Bổ sung mới') {
                summaryLines.push(`+ Thêm mới tài sản [${a.name || a.brandColor}] (Số khung: [${a.frameNo || 'N/A'}])`);
            } else if (a.status === 'Rút bớt') {
                summaryLines.push(`+ Rút bớt tài sản [${a.name || a.brandColor}] (Số khung: [${a.frameNo || 'N/A'}])`);
            } else if (a.status === 'Sửa thông tin') {
                const orig = getOriginalAsset(a.id);
                let oldParts = [];
                let newParts = [];
                if (orig) {
                    if (a.name !== orig.name) {
                        oldParts.push(`Tên: ${orig.name}`);
                        newParts.push(`Tên: ${a.name}`);
                    }
                    if (a.brandColor !== orig.brandColor) {
                        oldParts.push(`Hiệu/Sơn: ${orig.brandColor}`);
                        newParts.push(`Hiệu/Sơn: ${a.brandColor}`);
                    }
                    if (a.frameNo !== orig.frameNo) {
                        oldParts.push(`Số khung: ${orig.frameNo}`);
                        newParts.push(`Số khung: ${a.frameNo}`);
                    }
                    if ((a.engineNo || '') !== (orig.engineNo || '')) {
                        oldParts.push(`Số máy: ${orig.engineNo || '(Trống)'}`);
                        newParts.push(`Số máy: ${a.engineNo || '(Trống)'}`);
                    }
                    if ((a.plateNo || '') !== (orig.plateNo || '')) {
                        oldParts.push(`Biển số: ${orig.plateNo || '(Trống)'}`);
                        newParts.push(`Biển số: ${a.plateNo || '(Trống)'}`);
                    }
                }
                const oldInfo = oldParts.join(', ') || 'Thông tin cũ';
                const newInfo = newParts.join(', ') || 'Thông tin mới';
                summaryLines.push(`+ Sửa thông tin [${a.name || a.brandColor}] [${oldInfo}] ~ [${newInfo}]`);
            }
        });
    }

    return summaryLines.join('\n');
}

function showWarning(title, message, isRed = true, showC08Proof = false) {
    const modal = document.getElementById('warningModal');
    const header = document.getElementById('warningModalHeader');
    const titleEl = document.getElementById('warningModalTitle');
    const iconEl = document.getElementById('warningModalIcon');
    const msgEl = document.getElementById('warningModalMessage');
    const c08Wrapper = document.getElementById('c08UploadWrapper');
    const btnCancel = document.getElementById('btnCancelWarning');
    const btnConfirm = document.getElementById('btnConfirmWarning');

    if (!modal) return;

    msgEl.textContent = message;
    titleEl.textContent = title;

    if (isRed) {
        // Blocking Red warning design
        header.style.backgroundColor = '#FEF2F2';
        header.style.borderBottom = '1px solid #FEE2E2';
        titleEl.style.color = '#991B1B';
        iconEl.textContent = '❌';
        iconEl.style.color = '#EF4444';

        c08Wrapper.classList.add('hidden');
        btnConfirm.style.display = 'none';
        btnCancel.textContent = 'ĐÓNG';
    } else {
        // Bypassable Yellow warning design
        header.style.backgroundColor = '#FEF3C7';
        header.style.borderBottom = '1px solid #FDE68A';
        titleEl.style.color = '#B45309';
        iconEl.textContent = '⚠️';
        iconEl.style.color = '#F59E0B';

        if (showC08Proof) {
            c08Wrapper.classList.remove('hidden');
            // Clear previous file input
            document.getElementById('c08ProofFile').value = '';
            document.getElementById('lblFileNameC08').textContent = 'Chưa chọn tệp';
            btnConfirm.disabled = true;
        } else {
            c08Wrapper.classList.add('hidden');
            btnConfirm.disabled = false;
        }

        btnConfirm.style.display = 'inline-flex';
        btnConfirm.textContent = 'TIẾP TỤC';
        btnCancel.textContent = 'HỦY BỎ';
    }

    modal.classList.add('active');
}

function closeWarning() {
    const modal = document.getElementById('warningModal');
    if (modal) modal.classList.remove('active');
}

function clearErrors() {
    // Remove is-invalid class
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    // Remove error-text elements
    document.querySelectorAll('.error-text').forEach(el => {
        el.remove();
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('is-invalid');

    // Check if there is already an error message
    const parent = field.parentElement;
    let errText = parent.querySelector('.error-text');
    if (!errText) {
        errText = document.createElement('span');
        errText.className = 'error-text';
        parent.appendChild(errText);
    }
    errText.textContent = message;
}

function showErrorForUpload(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const parent = input.parentElement;
    const btn = parent.querySelector('.btn');
    if (btn) btn.classList.add('is-invalid');

    let errText = parent.querySelector('.error-text');
    if (!errText) {
        errText = document.createElement('span');
        errText.className = 'error-text';
        parent.appendChild(errText);
    }
    errText.textContent = message;
}

function proceedToReview() {
    // Save asset checkboxes states
    baselineData.cayHangNam = document.getElementById('chkCayHangNam').checked;
    baselineData.dongSanKhac = document.getElementById('chkDongSanKhac').checked;
    baselineData.soKhungChecked = document.getElementById('chkSoKhung').checked;
    baselineData.tauCaChecked = document.getElementById('chkTauCa').checked;

    // Merge assets list from grids
    const compiledAssets = [];
    if (document.getElementById('chkSoKhung').checked) {
        compiledAssets.push(...soKhungList);
    } else {
        soKhungList.forEach(a => {
            if (a.status !== 'Bổ sung mới') {
                compiledAssets.push({ ...a, status: 'Rút bớt' });
            }
        });
    }

    if (document.getElementById('chkTauCa').checked) {
        compiledAssets.push(...tauCaList);
    } else {
        tauCaList.forEach(a => {
            if (a.status !== 'Bổ sung mới') {
                compiledAssets.push({ ...a, status: 'Rút bớt' });
            }
        });
    }
    baselineData.assets = compiledAssets;

    // Save QuyenTaiSan, HangHoa, ChungKhoan inputs into baselineData
    baselineData.quyenTaiSan = {};
    if (document.getElementById('chkQuyenTaiSan').checked) {
        baselineData.quyenTaiSan = {
            tenQuyen: document.getElementById('qts_tenQuyen').value.trim(),
            canCu: document.getElementById('qts_canCu').value.trim()
        };
    }

    baselineData.hangHoa = {};
    if (document.getElementById('chkHangHoa').checked) {
        const isKhoHang = document.getElementById('radioKhoHang').checked;
        baselineData.hangHoa = {
            loai: isKhoHang ? 'khohang' : 'luanchuyen',
            tenHangHoa: document.getElementById('hh_giaTriTenLoai').value.trim(),
            diaChiKho: isKhoHang ? document.getElementById('hh_diaChiKho').value.trim() : '',
            soHieuKho: isKhoHang ? document.getElementById('hh_soHieuKho').value.trim() : ''
        };
    }

    baselineData.chungKhoan = {};
    if (document.getElementById('chkChungKhoan').checked) {
        baselineData.chungKhoan = {
            ck_gio: document.getElementById('ck_gio').value.trim(),
            ck_phut: document.getElementById('ck_phut').value.trim(),
            ck_ngay: document.getElementById('ck_ngay').value.trim(),
            ck_thang: document.getElementById('ck_thang').value.trim(),
            ck_nam: document.getElementById('ck_nam').value.trim()
        };
    }

    // Auto-generate change summary if empty (null-safe since field is removed from UI)
    let changeSummaryEl = document.getElementById('changeSummaryDesc');
    let changeSummary = changeSummaryEl ? changeSummaryEl.value.trim() : '';
    if (!changeSummary) {
        changeSummary = generateAutoSummary();
        if (changeSummaryEl) changeSummaryEl.value = changeSummary;
    }

    // --- STAGE 1: UI Validation ---
    clearErrors();
    let hasErrors = false;

    const reqRole = document.getElementById('reqRole').value;
    const reqOrgName = document.getElementById('reqOrgName') ? document.getElementById('reqOrgName').value.trim() : (baselineData.orgName || '');
    const contractNo = document.getElementById('contractNo').value.trim();
    const contractDate = document.getElementById('contractDate').value.trim();

    if (!reqRole) {
        hasErrors = true;
        showError('reqRole', 'Vui lòng lựa chọn người yêu cầu đăng ký.');
    }
    // Note: reqOrgName is removed, so we no longer validate it here!

    if (!contractNo) {
        hasErrors = true;
        showError('contractNo', 'Số hợp đồng là bắt buộc.');
    }
    if (!contractDate) {
        hasErrors = true;
        showError('contractDate', 'Ngày có hiệu lực của hợp đồng là bắt buộc.');
    } else {
        // Format check dd/mm/yyyy
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(contractDate)) {
            hasErrors = true;
            showError('contractDate', 'Định dạng Ngày hiệu lực hợp đồng không hợp lệ. Vui lòng nhập dạng dd/mm/yyyy (Ví dụ: 05/01/2026).');
        } else {
            // Future check
            const parts = contractDate.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            const inputDate = new Date(year, month, day);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (inputDate > today) {
                hasErrors = true;
                showError('contractDate', 'Ngày hiệu lực hợp đồng không thể vượt quá ngày hôm nay.');
            }
        }
    }
    if (changeSummaryEl && !changeSummary) {
        hasErrors = true;
        showError('changeSummaryDesc', 'Vui lòng nhập Nội dung tóm tắt thay đổi.');
    }

    // File check conditions
    const reqGroup = document.getElementById('requesterAttachmentGroup');
    if (reqGroup && reqGroup.style.display === 'block' && !uploadedFiles['reqFile']) {
        hasErrors = true;
        showErrorForUpload('reqFile', 'Vui lòng đính kèm Tệp tin tài liệu chứng minh tư cách đại diện/ủy quyền.');
    }

    const exemptionGroup = document.getElementById('exemptionAttachmentGroup');
    if (exemptionGroup && exemptionGroup.style.display === 'block' && !uploadedFiles['exemptionFile']) {
        hasErrors = true;
        showErrorForUpload('exemptionFile', 'Vui lòng đính kèm Tệp tin tài liệu chứng minh miễn lệ phí đăng ký.');
    }

    if (document.getElementById('chkChungKhoan').checked && !uploadedFiles['assetsPdfFile']) {
        hasErrors = true;
        showErrorForUpload('assetsPdfFile', 'Vui lòng đính kèm file .pdf.');
    }

    // Asset checkboxes check
    const isSoKhungChecked = document.getElementById('chkSoKhung').checked;
    const isTauCaChecked = document.getElementById('chkTauCa').checked;
    const isQuyenTaiSanChecked = document.getElementById('chkQuyenTaiSan').checked;
    const isCayHangNamChecked = document.getElementById('chkCayHangNam').checked;
    const isHangHoaChecked = document.getElementById('chkHangHoa').checked;
    const isChungKhoanChecked = document.getElementById('chkChungKhoan').checked;
    const isDongSanKhacChecked = document.getElementById('chkDongSanKhac').checked;

    if (!isSoKhungChecked && !isTauCaChecked && !isQuyenTaiSanChecked && !isCayHangNamChecked && !isHangHoaChecked && !isChungKhoanChecked && !isDongSanKhacChecked) {
        hasErrors = true;
        alert("Vui lòng chọn ít nhất một loại tài sản bảo đảm.");
    }

    // Common Description check
    const astDescCommon = document.getElementById('astDescCommon').value.trim();
    if (!astDescCommon) {
        hasErrors = true;
        showError('astDescCommon', 'Mô tả chung về tài sản bảo đảm là bắt buộc.');
    }

    // Sub-forms and grid validations
    let firstGridErr = null;
    let frameNosSeen = new Set();

    if (isSoKhungChecked) {
        const activeSK = soKhungList.filter(a => a.status !== 'Rút bớt');
        if (activeSK.length === 0) {
            hasErrors = true;
            alert("Vui lòng thêm ít nhất một phương tiện có số khung trong bảng Số khung.");
        } else {
            soKhungList.forEach((a, idx) => {
                if (a.status === 'Rút bớt') return;
                const rowEl = document.getElementById('tbodySoKhung').children[idx];
                if (!rowEl) return;

                const brandInput = rowEl.querySelector('input[onchange*="brandColor"]');
                const frameInput = rowEl.querySelector('input[onchange*="frameNo"]');
                const noticeAgencyInput = rowEl.querySelector('input[onchange*="noticeAgency"]');

                if (brandInput && !a.brandColor.trim()) {
                    hasErrors = true;
                    brandInput.classList.add('is-invalid');
                    if (!firstGridErr) firstGridErr = { input: brandInput, msg: `Nhãn hiệu, màu sơn của dòng số ${idx + 1} trong bảng Số khung không được để trống.` };
                }
                if (frameInput) {
                    const fNo = a.frameNo.trim();
                    if (!fNo) {
                        hasErrors = true;
                        frameInput.classList.add('is-invalid');
                        if (!firstGridErr) firstGridErr = { input: frameInput, msg: `Số khung của dòng số ${idx + 1} trong bảng Số khung không được để trống.` };
                    } else if (!/^[a-zA-Z0-9-]+$/.test(fNo)) {
                        hasErrors = true;
                        frameInput.classList.add('is-invalid');
                        if (!firstGridErr) firstGridErr = { input: frameInput, msg: `Số khung "${fNo}" ở dòng số ${idx + 1} không hợp lệ (chỉ được chứa chữ cái, chữ số và dấu gạch ngang (-)).` };
                    } else if (frameNosSeen.has(fNo.toLowerCase())) {
                        hasErrors = true;
                        frameInput.classList.add('is-invalid');
                        if (!firstGridErr) firstGridErr = { input: frameInput, msg: `Số khung "${fNo}" ở dòng số ${idx + 1} bị trùng lặp trong danh sách.` };
                    } else {
                        frameNosSeen.add(fNo.toLowerCase());
                    }
                }
                if (a.hasNotice && noticeAgencyInput && !a.noticeAgency.trim()) {
                    hasErrors = true;
                    noticeAgencyInput.classList.add('is-invalid');
                    if (!firstGridErr) firstGridErr = { input: noticeAgencyInput, msg: `Vui lòng điền Tên và địa chỉ cơ quan tiếp nhận thông báo cho dòng số ${idx + 1} trong bảng Số khung.` };
                }
            });
        }
    }

    if (isTauCaChecked) {
        const activeTC = tauCaList.filter(a => a.status !== 'Rút bớt');
        if (activeTC.length === 0) {
            hasErrors = true;
            alert("Vui lòng thêm ít nhất một phương tiện trong bảng Phương tiện.");
        } else {
            tauCaList.forEach((a, idx) => {
                if (a.status === 'Rút bớt') return;
                const rowEl = document.getElementById('tbodyTauCa').children[idx];
                if (!rowEl) return;

                const nameInput = rowEl.querySelector('input[onchange*="name"]');
                const ownerInput = rowEl.querySelector('input[onchange*="ownerName"]');
                const regNoInput = rowEl.querySelector('input[onchange*="regNo"]');
                const levelInput = rowEl.querySelector('input[onchange*="level"]');
                const noticeAgencyInput = rowEl.querySelector('input[onchange*="noticeAgency"]');

                if (nameInput && !a.name.trim()) {
                    hasErrors = true;
                    nameInput.classList.add('is-invalid');
                    if (!firstGridErr) firstGridErr = { input: nameInput, msg: `Tên phương tiện, nhãn hiệu của dòng số ${idx + 1} trong bảng Phương tiện không được để trống.` };
                }
                if (ownerInput && !a.ownerName.trim()) {
                    hasErrors = true;
                    ownerInput.classList.add('is-invalid');
                    if (!firstGridErr) firstGridErr = { input: ownerInput, msg: `Tên/Họ tên chủ phương tiện/Chủ sở hữu của dòng số ${idx + 1} không được để trống.` };
                }
                if (regNoInput && !a.regNo.trim()) {
                    hasErrors = true;
                    regNoInput.classList.add('is-invalid');
                    if (!firstGridErr) firstGridErr = { input: regNoInput, msg: `Số đăng ký, cơ quan cấp của dòng số ${idx + 1} không được để trống.` };
                }
                if (levelInput && !a.level.trim()) {
                    hasErrors = true;
                    levelInput.classList.add('is-invalid');
                    if (!firstGridErr) firstGridErr = { input: levelInput, msg: `Cấp phương tiện của dòng số ${idx + 1} không được để trống.` };
                }
                if (a.hasNotice && noticeAgencyInput && !a.noticeAgency.trim()) {
                    hasErrors = true;
                    noticeAgencyInput.classList.add('is-invalid');
                    if (!firstGridErr) firstGridErr = { input: noticeAgencyInput, msg: `Vui lòng điền Tên và địa chỉ cơ quan tiếp nhận thông báo cho dòng số ${idx + 1} trong bảng Phương tiện.` };
                }
            });
        }
    }

    if (isQuyenTaiSanChecked) {
        const tenQuyen = document.getElementById('qts_tenQuyen').value.trim();
        const canCu = document.getElementById('qts_canCu').value.trim();
        if (!tenQuyen) {
            hasErrors = true;
            showError('qts_tenQuyen', 'Tên quyền tài sản là bắt buộc.');
        }
        if (!canCu) {
            hasErrors = true;
            showError('qts_canCu', 'Căn cứ phát sinh quyền tài sản là bắt buộc.');
        }
    }

    if (isHangHoaChecked) {
        const giaTri = document.getElementById('hh_giaTriTenLoai').value.trim();
        if (!giaTri) {
            hasErrors = true;
            showError('hh_giaTriTenLoai', 'Giá trị/Tên loại hàng hóa là bắt buộc.');
        }
        if (document.getElementById('radioKhoHang').checked) {
            const diaChiKho = document.getElementById('hh_diaChiKho').value.trim();
            if (!diaChiKho) {
                hasErrors = true;
                showError('hh_diaChiKho', 'Địa chỉ kho hàng là bắt buộc.');
            }
        }
    }

    if (isChungKhoanChecked) {
        const gio = document.getElementById('ck_gio').value.trim();
        const phut = document.getElementById('ck_phut').value.trim();
        const ngay = document.getElementById('ck_ngay').value.trim();
        const thang = document.getElementById('ck_thang').value.trim();
        const nam = document.getElementById('ck_nam').value.trim();

        if (!gio) { hasErrors = true; showError('ck_gio', 'Giờ là bắt buộc.'); }
        else if (isNaN(gio) || parseInt(gio) < 0 || parseInt(gio) > 23) { hasErrors = true; showError('ck_gio', 'Giờ không hợp lệ (0-23).'); }

        if (!phut) { hasErrors = true; showError('ck_phut', 'Phút là bắt buộc.'); }
        else if (isNaN(phut) || parseInt(phut) < 0 || parseInt(phut) > 59) { hasErrors = true; showError('ck_phut', 'Phút không hợp lệ (0-59).'); }

        if (!ngay) { hasErrors = true; showError('ck_ngay', 'Ngày là bắt buộc.'); }
        else if (isNaN(ngay) || parseInt(ngay) < 1 || parseInt(ngay) > 31) { hasErrors = true; showError('ck_ngay', 'Ngày không hợp lệ (1-31).'); }

        if (!thang) { hasErrors = true; showError('ck_thang', 'Tháng là bắt buộc.'); }
        else if (isNaN(thang) || parseInt(thang) < 1 || parseInt(thang) > 12) { hasErrors = true; showError('ck_thang', 'Tháng không hợp lệ (1-12).'); }

        if (!nam) { hasErrors = true; showError('ck_nam', 'Năm là bắt buộc.'); }
        else if (isNaN(nam) || parseInt(nam) < 1900 || parseInt(nam) > 2100) { hasErrors = true; showError('ck_nam', 'Năm không hợp lệ.'); }
    }

    // Ensure list is not empty (must have at least 1 securing party, 1 secured party, and 1 asset)
    const activeSecurings = baselineData.securingParties.filter(p => p.status !== 'Rút bớt');
    const activeSecureds = baselineData.securedParties.filter(p => p.status !== 'Rút bớt');
    const activeAssets = baselineData.assets.filter(a => a.status !== 'Rút bớt');

    if (activeSecurings.length === 0) {
        hasErrors = true;
        alert("Hồ sơ thay đổi phải có ít nhất 01 Bên thế chấp/Bên bảo đảm hoạt động.");
    }
    if (activeSecureds.length === 0) {
        hasErrors = true;
        alert("Hồ sơ thay đổi phải có ít nhất 01 Bên nhận thế chấp/Bên nhận bảo đảm hoạt động.");
    }
    //if (activeAssets.length === 0) {
    //     hasErrors = true;
    //     alert("Hồ sơ thay đổi phải có ít nhất 01 Tài sản bảo đảm hoạt động.");
    // }

    if (hasErrors) {
        if (firstGridErr) {
            alert(firstGridErr.msg);
            firstGridErr.input.focus();
            firstGridErr.input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            const firstErr = document.querySelector('.is-invalid');
            if (firstErr) {
                firstErr.focus();
                firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        return;
    }

    // --- STAGE 2: Jurisdiction ---
    const outOfJurisdiction = activeAssets.find(a => ['bds', 'taubay', 'taubien'].includes(a.type));
    if (outOfJurisdiction) {
        showWarning(
            'Lỗi Thẩm Quyền Đăng Ký',
            `Tài sản ngoài thẩm quyền: Tài sản "${outOfJurisdiction.name || outOfJurisdiction.brandColor}" (${outOfJurisdiction.typeName || 'Bất động sản/Tàu bay/Tàu biển'}) không thuộc thẩm quyền đăng ký giao dịch bảo đảm tại Bộ Tư pháp. Vui lòng chuyển đến cơ quan có thẩm quyền đăng ký tương ứng (Văn phòng Đăng ký Đất đai, Cục Hàng không, hoặc Cục Hàng hải).`,
            true
        );
        return;
    }

    // --- STAGE 3: Blacklist THA (Kê biên) ---
    const blacklistedSecuring = activeSecurings.find(p => p.paperNo === '111111111111');
    const blacklistedAsset = activeAssets.find(a => a.frameNo === 'BLACKLIST123');
    if (blacklistedSecuring || blacklistedAsset) {
        let msg = '';
        if (blacklistedSecuring) {
            msg = `CẢNH BÁO KÊ BIÊN: Chủ thể "${blacklistedSecuring.name}" (Số giấy tờ: 111111111111) đang nằm trong danh sách cấm thay đổi/kê biên thi hành án của cơ quan có thẩm quyền. Hệ thống từ chối đăng ký thay đổi cho chủ thể này.`;
        } else {
            msg = `CẢNH BÁO KÊ BIÊN: Phương tiện có số khung "BLACKLIST123" đang nằm trong danh sách cấm thay đổi/kê biên thi hành án của cơ quan thi hành án dân sự. Hệ thống từ chối đăng ký thay đổi đối với phương tiện này.`;
        }
        showWarning('Cảnh Báo Kê Biên', msg, true);
        return;
    }

    // --- STAGE 4: Centralized Securities (VSDC) ---
    const vsdcAsset = activeAssets.find(a => (a.brandColor && a.brandColor.includes('VSDC999')) || (a.frameNo && a.frameNo.includes('VSDC999')));
    if (vsdcAsset) {
        const vsdcVal = (vsdcAsset.brandColor && vsdcAsset.brandColor.includes('VSDC999')) ? vsdcAsset.brandColor : vsdcAsset.frameNo;
        showWarning(
            'Mã Chứng Khoán Đã Lưu Ký',
            `Mã chứng khoán hoặc mã tài sản "${vsdcVal}" đã được lưu ký tập trung tại Tổng công ty Lưu ký và Bù trừ Chứng khoán Việt Nam (VSDC). Theo quy định, việc đăng ký giao dịch bảo đảm đối với loại tài sản này không thuộc thẩm quyền của Cục Đăng ký.`,
            true
        );
        return;
    }

    // --- STAGE 5: C08 Owner Mismatch ---
    if (!c08Bypass) {
        const mismatchAsset = activeAssets.find(a => a.frameNo === 'MISMATCH123');
        if (mismatchAsset) {
            showWarning(
                'Cảnh Báo Chủ Sở Hữu (C08)',
                `Cảnh báo C08: Phương tiện có số khung "MISMATCH123" có thông tin đăng ký sở hữu không khớp với dữ liệu đăng ký xe từ C08 (Bộ Công an). Để tiếp tục nộp hồ sơ, bạn cần đính kèm Tài liệu chứng minh quyền sở hữu hợp pháp để cơ quan đăng ký xác minh.`,
                false, // yellow warning
                true // show upload file
            );
            return;
        }
    }

    // Save current values to baselineData
    baselineData.requester = reqRole;
    baselineData.orgName = reqOrgName;
    const isContract = document.getElementById('transactionType').value === 'Hợp đồng';
    baselineData.measureType = isContract ? document.getElementById('contractTypeSelect').value : document.getElementById('measureType').value;
    baselineData.contractNo = contractNo;
    baselineData.contractDate = contractDate;
    baselineData.loanValue = document.getElementById('loanValue').value;
    baselineData.scale = document.getElementById('quyMo').value;
    baselineData.isFemaleOwner = document.getElementById('isFemaleOwner').checked;
    baselineData.exemption = document.getElementById('isExempted').checked;
    baselineData.summary = changeSummary;
    baselineData.astDescCommon = astDescCommon;

    // Save uploaded files mock refs
    baselineData.files = { ...uploadedFiles };
    if (c08Bypass) {
        baselineData.c08ProofFile = document.getElementById('lblFileNameC08') ? document.getElementById('lblFileNameC08').textContent : 'c08_proof.pdf';
    }

    // Compute diffs dynamically
    const deltas = [];

    // General fields check
    const fieldsToCheck = [
        // { key: 'requester', label: 'Người yêu cầu' },
        { key: 'orgName', label: 'Tên cơ quan yêu cầu' },
        { key: 'measureType', label: 'Loại biện pháp' },
        { key: 'contractNo', label: 'Số hợp đồng' },
        { key: 'contractDate', label: 'Ngày hiệu lực HĐ' },
        { key: 'loanValue', label: 'Giá trị nghĩa vụ (VND)' },
        { key: 'scale', label: 'Quy mô bên bảo đảm' },
        { key: 'isFemaleOwner', label: 'Chủ DN nữ', type: 'bool' },
        { key: 'exemption', label: 'Miễn lệ phí', type: 'bool' }
    ];

    fieldsToCheck.forEach(field => {
        let orig = originalData[field.key];
        let curr = baselineData[field.key];

        if (field.type === 'bool') {
            orig = !!orig ? 'Có' : 'Không';
            curr = !!curr ? 'Có' : 'Không';
        }

        if (String(orig).trim() !== String(curr).trim()) {
            deltas.push({
                type: 'field',
                label: field.label,
                before: orig || '(Trống)',
                after: curr || '(Trống)'
            });
        }
    });

    // Securing parties diffs
    baselineData.securingParties.forEach(p => {
        if (p.status === 'Bổ sung mới') {
            deltas.push({ type: 'list', action: 'Thêm mới Bên thế chấp', detail: `${p.name} (Số GT: ${p.paperNo}, Địa chỉ: ${p.address})` });
        } else if (p.status === 'Rút bớt') {
            deltas.push({ type: 'list', action: 'Rút bớt Bên thế chấp', detail: `${p.name} (Số GT: ${p.paperNo})` });
        } else if (p.status === 'Sửa thông tin') {
            deltas.push({ type: 'list', action: 'Sửa đổi Bên thế chấp', detail: `${p.name} (Mới: Số GT: ${p.paperNo}, Địa chỉ: ${p.address})` });
        }
    });

    // Secured parties diffs
    baselineData.securedParties.forEach(p => {
        if (p.status === 'Bổ sung mới') {
            deltas.push({ type: 'list', action: 'Thêm mới Bên nhận thế chấp', detail: `${p.name} (Địa chỉ: ${p.address})` });
        } else if (p.status === 'Rút bớt') {
            deltas.push({ type: 'list', action: 'Rút bớt Bên nhận thế chấp', detail: `${p.name}` });
        } else if (p.status === 'Sửa thông tin') {
            deltas.push({ type: 'list', action: 'Sửa đổi Bên nhận thế chấp', detail: `${p.name} (Địa chỉ mới: ${p.address})` });
        }
    });

    // Assets diffs
    baselineData.assets.forEach(a => {
        if (a.status === 'Bổ sung mới') {
            deltas.push({ type: 'list', action: 'Thêm mới Tài sản', detail: `${a.name || a.brandColor} (${a.brandColor || ''}, Số khung: ${a.frameNo || 'Không'}, BKS: ${a.plateNo || 'Không'})` });
        } else if (a.status === 'Rút bớt') {
            deltas.push({ type: 'list', action: 'Rút bớt Tài sản', detail: `${a.name || a.brandColor} (Số khung: ${a.frameNo || 'Không'})` });
        } else if (a.status === 'Sửa thông tin') {
            deltas.push({ type: 'list', action: 'Sửa đổi Tài sản', detail: `${a.name || a.brandColor} (Số khung: ${a.frameNo || 'Không'}, Hiệu/Sơn mới: ${a.brandColor || ''})` });
        }
    });

    // Save everything in localStorage
    localStorage.setItem('dossierDraft', JSON.stringify(baselineData));
    localStorage.setItem('deltaChanges', JSON.stringify(deltas));

    // Redirect to review page
    window.location.href = 'dang_ky_thay_doi_review.html';
}

function saveDraft() {
    const reqRole = document.getElementById('reqRole').value;
    if (!reqRole) {
        alert("Vui lòng chọn Người yêu cầu trước khi lưu nháp.");
        return;
    }

    // Save asset checkboxes states
    baselineData.cayHangNam = document.getElementById('chkCayHangNam').checked;
    baselineData.dongSanKhac = document.getElementById('chkDongSanKhac').checked;
    baselineData.soKhungChecked = document.getElementById('chkSoKhung').checked;
    baselineData.tauCaChecked = document.getElementById('chkTauCa').checked;

    // Merge assets list from grids
    const compiledAssets = [];
    if (document.getElementById('chkSoKhung').checked) {
        compiledAssets.push(...soKhungList);
    } else {
        soKhungList.forEach(a => {
            if (a.status !== 'Bổ sung mới') {
                compiledAssets.push({ ...a, status: 'Rút bớt' });
            }
        });
    }

    if (document.getElementById('chkTauCa').checked) {
        compiledAssets.push(...tauCaList);
    } else {
        tauCaList.forEach(a => {
            if (a.status !== 'Bổ sung mới') {
                compiledAssets.push({ ...a, status: 'Rút bớt' });
            }
        });
    }
    baselineData.assets = compiledAssets;

    // Save QuyenTaiSan, HangHoa, ChungKhoan inputs into baselineData
    baselineData.quyenTaiSan = {};
    if (document.getElementById('chkQuyenTaiSan').checked) {
        baselineData.quyenTaiSan = {
            tenQuyen: document.getElementById('qts_tenQuyen').value.trim(),
            canCu: document.getElementById('qts_canCu').value.trim()
        };
    }

    baselineData.hangHoa = {};
    if (document.getElementById('chkHangHoa').checked) {
        const isKhoHang = document.getElementById('radioKhoHang').checked;
        baselineData.hangHoa = {
            loai: isKhoHang ? 'khohang' : 'luanchuyen',
            tenHangHoa: document.getElementById('hh_giaTriTenLoai').value.trim(),
            diaChiKho: isKhoHang ? document.getElementById('hh_diaChiKho').value.trim() : '',
            soHieuKho: isKhoHang ? document.getElementById('hh_soHieuKho').value.trim() : ''
        };
    }

    baselineData.chungKhoan = {};
    if (document.getElementById('chkChungKhoan').checked) {
        baselineData.chungKhoan = {
            ck_gio: document.getElementById('ck_gio').value.trim(),
            ck_phut: document.getElementById('ck_phut').value.trim(),
            ck_ngay: document.getElementById('ck_ngay').value.trim(),
            ck_thang: document.getElementById('ck_thang').value.trim(),
            ck_nam: document.getElementById('ck_nam').value.trim()
        };
    }

    // Auto-generate change summary if empty (null-safe)
    let changeSummaryEl = document.getElementById('changeSummaryDesc');
    let changeSummary = changeSummaryEl ? changeSummaryEl.value.trim() : '';
    if (!changeSummary) {
        changeSummary = generateAutoSummary();
        if (changeSummaryEl) changeSummaryEl.value = changeSummary;
    }

    // Save current values to baselineData
    baselineData.requester = reqRole;
    baselineData.orgName = document.getElementById('reqOrgName') ? document.getElementById('reqOrgName').value.trim() : (baselineData.orgName || '');
    const isContract = document.getElementById('transactionType').value === 'Hợp đồng';
    baselineData.measureType = isContract ? document.getElementById('contractTypeSelect').value : document.getElementById('measureType').value;
    baselineData.contractNo = document.getElementById('contractNo').value.trim();
    baselineData.contractDate = document.getElementById('contractDate').value.trim();
    baselineData.loanValue = document.getElementById('loanValue').value;
    baselineData.scale = document.getElementById('quyMo').value;
    baselineData.isFemaleOwner = document.getElementById('isFemaleOwner').checked;
    baselineData.exemption = document.getElementById('isExempted').checked;
    baselineData.summary = changeSummary;
    baselineData.astDescCommon = document.getElementById('astDescCommon').value.trim();

    // Save uploaded files mock refs
    baselineData.files = { ...uploadedFiles };

    // Compute diffs dynamically
    const deltas = [];
    const fieldsToCheck = [
        { key: 'requester', label: 'Người yêu cầu' },
        { key: 'orgName', label: 'Tên cơ quan yêu cầu' },
        { key: 'measureType', label: 'Loại biện pháp' },
        { key: 'contractNo', label: 'Số hợp đồng' },
        { key: 'contractDate', label: 'Ngày hiệu lực HĐ' },
        { key: 'loanValue', label: 'Giá trị nghĩa vụ (VND)' },
        { key: 'scale', label: 'Quy mô bên bảo đảm' },
        { key: 'isFemaleOwner', label: 'Chủ DN nữ', type: 'bool' },
        { key: 'exemption', label: 'Miễn lệ phí', type: 'bool' }
    ];

    fieldsToCheck.forEach(field => {
        let orig = originalData[field.key];
        let curr = baselineData[field.key];

        if (field.type === 'bool') {
            orig = !!orig ? 'Có' : 'Không';
            curr = !!curr ? 'Có' : 'Không';
        }

        if (String(orig).trim() !== String(curr).trim()) {
            deltas.push({
                type: 'field',
                label: field.label,
                before: orig || '(Trống)',
                after: curr || '(Trống)'
            });
        }
    });

    // Securing parties diffs
    baselineData.securingParties.forEach(p => {
        if (p.status === 'Bổ sung mới') {
            deltas.push({ type: 'list', action: 'Thêm mới Bên thế chấp', detail: `${p.name} (Số GT: ${p.paperNo}, Địa chỉ: ${p.address})` });
        } else if (p.status === 'Rút bớt') {
            deltas.push({ type: 'list', action: 'Rút bớt Bên thế chấp', detail: `${p.name} (Số GT: ${p.paperNo})` });
        } else if (p.status === 'Sửa thông tin') {
            deltas.push({ type: 'list', action: 'Sửa đổi Bên thế chấp', detail: `${p.name} (Mới: Số GT: ${p.paperNo}, Địa chỉ: ${p.address})` });
        }
    });

    // Secured parties diffs
    baselineData.securedParties.forEach(p => {
        if (p.status === 'Bổ sung mới') {
            deltas.push({ type: 'list', action: 'Thêm mới Bên nhận thế chấp', detail: `${p.name} (Địa chỉ: ${p.address})` });
        } else if (p.status === 'Rút bớt') {
            deltas.push({ type: 'list', action: 'Rút bớt Bên nhận thế chấp', detail: `${p.name}` });
        } else if (p.status === 'Sửa thông tin') {
            deltas.push({ type: 'list', action: 'Sửa đổi Bên nhận thế chấp', detail: `${p.name} (Địa chỉ mới: ${p.address})` });
        }
    });

    // Assets diffs
    baselineData.assets.forEach(a => {
        if (a.status === 'Bổ sung mới') {
            deltas.push({ type: 'list', action: 'Thêm mới Tài sản', detail: `${a.name || a.brandColor} (${a.brandColor || ''}, Số khung: ${a.frameNo || 'Không'}, BKS: ${a.plateNo || 'Không'})` });
        } else if (a.status === 'Rút bớt') {
            deltas.push({ type: 'list', action: 'Rút bớt Tài sản', detail: `${a.name || a.brandColor} (Số khung: ${a.frameNo || 'Không'})` });
        } else if (a.status === 'Sửa thông tin') {
            deltas.push({ type: 'list', action: 'Sửa đổi Tài sản', detail: `${a.name || a.brandColor} (Số khung: ${a.frameNo || 'Không'}, Hiệu/Sơn mới: ${a.brandColor || ''})` });
        }
    });

    // Set status to "Lưu nháp"
    baselineData.status = 'Lưu nháp';

    // Save everything in localStorage
    localStorage.setItem('dossierDraft', JSON.stringify(baselineData));
    localStorage.setItem('deltaChanges', JSON.stringify(deltas));

    alert("Lưu hồ sơ nháp thành công.");
}

// Render các mốc lịch sử lên Timeline Sidebar bên trái
function renderTimelineSidebar() {
    const flowContainer = document.getElementById('timelineFlow');
    if (!flowContainer) return;

    flowContainer.innerHTML = '';

    // Lấy baselineVersion hiện tại đang được sửa
    const currentBaselineVersion = parseInt(localStorage.getItem('baselineVersion') || '3');

    mockTimelineData.forEach(item => {
        const node = document.createElement('div');
        node.className = 'timeline-node';
        if (item.version === currentBaselineVersion) {
            node.classList.add('active');
        }

        // Tạo cấu trúc cho node timeline
        node.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-node-content">
                <div class="timeline-version">
                    <span>${item.label}</span>
                    <span class="timeline-badge ${item.version === currentBaselineVersion ? 'current' : ''}">${item.version === currentBaselineVersion ? 'Bản sửa đổi' : 'Xem lại'}</span>
                </div>
                <div class="timeline-time">
                    <i class="fa-regular fa-clock"></i> ${item.dateOnly}
                </div>
                <div class="timeline-desc">${item.description}</div>
            </div>
        `;

        // Click để hiển thị Drawer chi tiết đối chiếu
        node.addEventListener('click', function () {
            viewVersionDetails(item);
        });

        flowContainer.appendChild(node);
    });
}

// Hiển thị chi tiết phiên bản lịch sử dạng Read-only trên Side Drawer
function viewVersionDetails(item) {
    const subheader = document.getElementById('drawerSubheader');
    const body = document.getElementById('drawerBody');
    const drawer = document.getElementById('slideDrawer');
    const overlay = document.getElementById('drawerOverlay');

    if (!subheader || !body || !drawer || !overlay) return;

    // Set tiêu đề phụ cho Drawer
    subheader.innerHTML = `Mã hồ sơ: <strong>${item.regCode}</strong> - Nộp ngày: ${item.date}`;

    // Tạo HTML cho nội dung chi tiết
    let html = '';

    // 1. Khối I & II: Thông tin Người yêu cầu & Thông tin chung
    html += `
        <div class="drawer-section-title">Thông tin chung & Người yêu cầu</div>
        <div class="drawer-grid">
            <div class="drawer-item">
                <div class="drawer-label">Người yêu cầu</div>
                <div class="drawer-value">${item.data.requester || 'N/A'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Tên tổ chức/Cá nhân yêu cầu</div>
                <div class="drawer-value">${item.data.orgName || 'N/A'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Loại giao dịch</div>
                <div class="drawer-value">${item.data.transactionType || 'Biện pháp bảo đảm'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Loại biện pháp</div>
                <div class="drawer-value">${item.data.measureType || 'Thế chấp'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Số hợp đồng</div>
                <div class="drawer-value">${item.data.contractNo || 'N/A'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Ngày hiệu lực hợp đồng</div>
                <div class="drawer-value">${item.data.contractDate || 'N/A'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Giá trị nghĩa vụ bảo đảm</div>
                <div class="drawer-value">${item.data.loanValue ? item.data.loanValue + ' VND' : 'N/A'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Quy mô bên bảo đảm</div>
                <div class="drawer-value">${item.data.scale || 'N/A'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Chủ DN là nữ?</div>
                <div class="drawer-value">${item.data.isFemaleOwner ? 'Có' : 'Không'}</div>
            </div>
            <div class="drawer-item">
                <div class="drawer-label">Miễn lệ phí?</div>
                <div class="drawer-value">${item.data.exemption ? 'Có' : 'Không'}</div>
            </div>
        </div>
    `;

    // 2. Bên bảo đảm
    html += `
        <div class="drawer-section-title">Danh sách Bên bảo đảm</div>
        <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden;">
    `;
    if (item.data.securingParties && item.data.securingParties.length > 0) {
        item.data.securingParties.forEach((p, idx) => {
            const statusBadge = p.status === 'Bổ sung mới' ? '<span class="entity-badge badge-added">[Bổ sung mới]</span>' :
                (p.status === 'Rút bớt' ? '<span class="entity-badge badge-removed">[Rút bớt]</span>' :
                    (p.status === 'Sửa thông tin' ? '<span class="entity-badge badge-modified">[Đã sửa]</span>' :
                        '<span class="entity-badge badge-unchanged">[Đang bảo đảm]</span>'));
            html += `
                <div class="drawer-list-item" style="${p.status === 'Rút bớt' ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                    <div class="drawer-list-item-title">
                        <span><strong>${idx + 1}. ${p.name}</strong></span>
                        ${statusBadge}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                        <div>Loại giấy tờ: ${p.paperType || 'CCCD'} | Số GT: ${p.paperNo}</div>
                        <div>Địa chỉ: ${p.address}</div>
                    </div>
                </div>
            `;
        });
    } else {
        html += `<div style="padding: 15px; color: var(--text-muted); text-align: center;">Không có dữ liệu</div>`;
    }
    html += `</div>`;

    // 3. Bên nhận bảo đảm
    html += `
        <div class="drawer-section-title" style="margin-top: 20px;">Danh sách Bên nhận bảo đảm</div>
        <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden;">
    `;
    if (item.data.securedParties && item.data.securedParties.length > 0) {
        item.data.securedParties.forEach((p, idx) => {
            const statusBadge = p.status === 'Bổ sung mới' ? '<span class="entity-badge badge-added">[Bổ sung mới]</span>' :
                (p.status === 'Rút bớt' ? '<span class="entity-badge badge-removed">[Rút bớt]</span>' :
                    (p.status === 'Sửa thông tin' ? '<span class="entity-badge badge-modified">[Đã sửa]</span>' :
                        '<span class="entity-badge badge-unchanged">[Đang bảo đảm]</span>'));
            html += `
                <div class="drawer-list-item" style="${p.status === 'Rút bớt' ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                    <div class="drawer-list-item-title">
                        <span><strong>${idx + 1}. ${p.name}</strong></span>
                        ${statusBadge}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                        <div>Địa chỉ: ${p.address} (${p.province || ''}, ${p.country || ''})</div>
                    </div>
                </div>
            `;
        });
    } else {
        html += `<div style="padding: 15px; color: var(--text-muted); text-align: center;">Không có dữ liệu</div>`;
    }
    html += `</div>`;

    // 4. Tài sản bảo đảm
    html += `
        <div class="drawer-section-title" style="margin-top: 20px;">Danh sách Tài sản bảo đảm</div>
        <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden;">
    `;
    if (item.data.assets && item.data.assets.length > 0) {
        item.data.assets.forEach((a, idx) => {
            const statusBadge = a.status === 'Bổ sung mới' ? '<span class="entity-badge badge-added">[Bổ sung mới]</span>' :
                (a.status === 'Rút bớt' ? '<span class="entity-badge badge-removed">[Rút bớt]</span>' :
                    (a.status === 'Sửa thông tin' ? '<span class="entity-badge badge-modified">[Đã sửa]</span>' :
                        '<span class="entity-badge badge-unchanged">[Đang bảo đảm]</span>'));
            html += `
                <div class="drawer-list-item" style="${a.status === 'Rút bớt' ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                    <div class="drawer-list-item-title">
                        <span><strong>${idx + 1}. ${a.name}</strong> - Nhãn hiệu: ${a.brandColor}</span>
                        ${statusBadge}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                        <div>Số khung: <strong>${a.frameNo}</strong> | Số máy: ${a.engineNo || 'Không'}</div>
                        <div>Biển kiểm soát: ${a.plateNo || 'Chưa đăng ký'}</div>
                        ${a.hasNotice ? `<div style="color: var(--secondary-color); font-weight: 500;"><i class="fa-solid fa-flag"></i> Yêu cầu gửi thông báo cho: ${a.noticeAgency}</div>` : ''}
                    </div>
                </div>
            `;
        });
    } else {
        html += `<div style="padding: 15px; color: var(--text-muted); text-align: center;">Không có dữ liệu</div>`;
    }
    html += `</div>`;

    // 5. Tóm tắt thay đổi ở phiên bản này
    if (item.changesSummary && item.changesSummary.length > 0) {
        html += `
            <div class="drawer-section-title" style="margin-top: 20px;">Tóm tắt nội dung thay đổi</div>
            <div style="background: #F8FAFC; border: 1px dashed var(--accent-color); border-radius: var(--border-radius-md); padding: 12px 15px; margin-bottom: 20px;">
                <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #475569; line-height: 1.5;">
                    ${item.changesSummary.map(change => `<li>${change}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    body.innerHTML = html;

    // Show Drawer & Overlay
    drawer.classList.add('active');
    overlay.classList.add('active');
}

// Đóng Side Drawer chi tiết đối chiếu
function closeDrawer() {
    const drawer = document.getElementById('slideDrawer');
    const overlay = document.getElementById('drawerOverlay');

    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Mở màn hình Xem chi tiết thay đổi (UC035) thay vì mở modal
function openHistoryModal() {
    let regNum = localStorage.getItem('regNum') || '12345678';
    
    if (regNum === '12345678') {
        regNum = 'BD-2026-001';
    }

    let url = `../UC027/xem_chi_tiet_lich_su_can_bo.html?regNum=${regNum}&focusId=${regNum}&from=change`;

    sessionStorage.setItem('prevCanBoPage', window.location.href);
    window.location.href = url;
}

// Đóng modal Lịch sử thay đổi
function closeHistoryModal() {
    const modal = document.getElementById('modalHistory');
    if (modal) modal.classList.remove('active');
}

function goHome() {
    if (window.top !== window.self && typeof window.top.returnFromCustomerModule === 'function') {
        window.top.returnFromCustomerModule();
        return;
    }
    if (window.top !== window.self && typeof window.top.showScreen === 'function') {
        window.top.showScreen('home');
    } else {
        window.location.href = '../trang_tong_the_website_khach_hang.html';
    }
}

// ============================================================================
// POPUP TÌM KIẾM CHỦ THỂ IMPLEMENTATION
// ============================================================================
let searchTargetForm = '';

const mockSubjectDB = [
    {
        type: 'cd_vn',
        name: 'Nguyễn Văn Hải',
        paperNo: '001088012345',
        country: 'Việt Nam',
        province: 'Hà Nội',
        address: '12 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy'
    },
    {
        type: 'cd_vn',
        name: 'Trần Thị Mai',
        paperNo: '002089054321',
        country: 'Việt Nam',
        province: 'Hải Phòng',
        address: '45 Lạch Tray, Quận Ngô Quyền'
    },
    {
        type: 'nn_ngoai',
        name: 'Robert Smith',
        paperNo: 'A12345678',
        passportCountry: 'Hoa Kỳ',
        country: 'Hoa Kỳ',
        province: 'Washington State',
        address: '500 Pine St, Seattle'
    },
    {
        type: 'nn_ngoai',
        name: 'Kim Woo Bin',
        paperNo: 'B98765432',
        passportCountry: 'Hàn Quốc',
        country: 'Hàn Quốc',
        province: 'Gyeonggi-do',
        address: '12 Pangyoyeok-ro, Bundang-gu'
    },
    {
        type: 'cd_kq',
        name: 'John Miller',
        paperNo: 'K88899988',
        country: 'Đức',
        province: 'Berlin State',
        address: 'Hauptstrasse 14, Berlin'
    },
    {
        type: 'tc_dn',
        name: 'Công ty Cổ phần Công nghệ FPT',
        paperNo: '0101243148',
        country: 'Việt Nam',
        province: 'Hà Nội',
        address: 'Tòa nhà FPT, Phố Duy Tân, Quận Cầu Giấy'
    },
    {
        type: 'tc_dn',
        name: 'Tổng Công ty Cổ phần Bảo hiểm Quân đội (MIC)',
        paperNo: '0102030405',
        country: 'Việt Nam',
        province: 'Hà Nội',
        address: 'Tầng 15, Tòa nhà MIPEC, 229 Tây Sơn, Quận Đống Đa'
    },
    {
        type: 'nd_nn',
        name: 'Samsung Electronics Vietnam Co., Ltd.',
        paperNo: '2300762459',
        country: 'Hàn Quốc',
        province: 'Bắc Ninh',
        address: 'KCN Yên Phong, Huyện Yên Phong'
    },
    {
        type: 'tc_khac',
        name: 'Quỹ Đầu tư Phát triển Thành phố Hồ Chí Minh',
        paperNo: '',
        country: 'Việt Nam',
        province: 'TP Hồ Chí Minh',
        address: '33 Nguyễn Thị Minh Khai, Quận 1'
    }
];

const subjectTypeLabels = {
    'cd_vn': 'Công dân Việt Nam',
    'nn_ngoai': 'Người nước ngoài',
    'cd_kq': 'Người không quốc tịch cư trú tại Việt Nam',
    'tc_dn': 'Tổ chức có đăng ký kinh doanh trong nước',
    'nd_nn': 'Nhà đầu tư nước ngoài',
    'tc_khac': 'Tổ chức khác'
};

function openSearchPopup(targetForm) {
    searchTargetForm = targetForm;
    const popup = document.getElementById('popupSearchSubject');
    if (!popup) return;
    
    // Set initial type based on target form or default
    const typeSelect = document.getElementById('searchSubjectType');
    if (targetForm === 'securing') {
        const currentType = document.getElementById('secSubjectType').value;
        typeSelect.value = currentType;
    } else {
        typeSelect.value = 'cd_vn';
    }
    
    // Clear fields
    clearSearchInputs();
    onSearchSubjectTypeChange();
    
    // Reset table body
    const body = document.getElementById('bodySearchResults');
    if (body) {
        body.innerHTML = '';
    }
    
    // Hide results grid by default
    const gridWrapper = document.getElementById('searchResultGridWrapper');
    if (gridWrapper) gridWrapper.style.display = 'none';
    
    // Hide error
    const err = document.getElementById('searchErrorMsg');
    if (err) err.style.display = 'none';
    
    popup.classList.add('active');
}

function closeSearchPopup() {
    const popup = document.getElementById('popupSearchSubject');
    if (popup) popup.classList.remove('active');
}

function clearSearchInputs() {
    const inputs = ['searchPaperNoCCCD', 'searchTaxNo', 'searchPassportNo', 'searchResidencyCard', 'searchNameOther'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = '';
            el.classList.remove('is-invalid');
        }
    });
}

function onSearchSubjectTypeChange() {
    const type = document.getElementById('searchSubjectType').value;
    
    // Hide all
    const groups = {
        'cd_vn': 'searchGroupPaperNoCCCD',
        'tc_dn': 'searchGroupTaxNo',
        'nd_nn': 'searchGroupTaxNo',
        'nn_ngoai': 'searchGroupPassportNo',
        'cd_kq': 'searchGroupResidencyCard',
        'tc_khac': 'searchGroupNameOther'
    };
    
    Object.values(groups).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // Show active
    const activeId = groups[type];
    const activeEl = document.getElementById(activeId);
    if (activeEl) activeEl.style.display = 'block';
    
    // Clear error
    const err = document.getElementById('searchErrorMsg');
    if (err) err.style.display = 'none';
    
    // Hide grid when changing search type
    const gridWrapper = document.getElementById('searchResultGridWrapper');
    if (gridWrapper) gridWrapper.style.display = 'none';
}

function executeSubjectSearch() {
    const type = document.getElementById('searchSubjectType').value;
    const err = document.getElementById('searchErrorMsg');
    const gridWrapper = document.getElementById('searchResultGridWrapper');
    
    if (err) err.style.display = 'none';
    if (gridWrapper) gridWrapper.style.display = 'none';
    
    let query = '';
    let inputEl = null;
    
    if (type === 'cd_vn') {
        inputEl = document.getElementById('searchPaperNoCCCD');
    } else if (type === 'tc_dn' || type === 'nd_nn') {
        inputEl = document.getElementById('searchTaxNo');
    } else if (type === 'nn_ngoai') {
        inputEl = document.getElementById('searchPassportNo');
    } else if (type === 'cd_kq') {
        inputEl = document.getElementById('searchResidencyCard');
    } else if (type === 'tc_khac') {
        inputEl = document.getElementById('searchNameOther');
    }
    
    if (inputEl) {
        inputEl.classList.remove('is-invalid');
        query = inputEl.value.trim();
    }
    
    // Validation
    if (!query) {
        if (inputEl) inputEl.classList.add('is-invalid');
        if (err) {
            err.innerText = "Vui lòng nhập thông tin để tìm kiếm";
            err.style.display = 'block';
        }
        return;
    }
    
    if (type === 'cd_vn') {
        const digitsRegex = /^\d+$/;
        if (query.length !== 12 || !digitsRegex.test(query)) {
            if (inputEl) inputEl.classList.add('is-invalid');
            if (err) {
                err.innerText = "Số CMND/Căn cước công dân/Chứng minh quân đội không hợp lệ (phải gồm 12 chữ số)";
                err.style.display = 'block';
            }
            return;
        }
    }
    
    // Execute search
    const results = mockSubjectDB.filter(item => {
        if (item.type !== type) return false;
        
        if (type === 'tc_khac') {
            return item.name.toLowerCase().includes(query.toLowerCase());
        } else {
            return item.paperNo === query;
        }
    });
    
    const body = document.getElementById('bodySearchResults');
    if (!body) return;
    
    if (results.length > 0) {
        body.innerHTML = '';
        const showPassportCountry = (type === 'nn_ngoai');
        const thPassport = document.getElementById('searchColPassportCountry');
        if (thPassport) {
            thPassport.style.display = showPassportCountry ? 'table-cell' : 'none';
        }
        results.forEach((item, idx) => {
            const tr = document.createElement('tr');
            
            // Find global index in mockSubjectDB to reference it
            const globalIdx = mockSubjectDB.findIndex(x => x === item);
            
            tr.innerHTML = `
                <td style="text-align: center; padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${idx + 1}</td>
                <td style="font-weight: 600; padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${item.name}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${item.paperNo || '-'}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color); display: ${showPassportCountry ? 'table-cell' : 'none'};">${item.type === 'nn_ngoai' ? (item.passportCountry || '-') : '-'}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${item.country || '-'}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${item.province || '-'}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${item.address || '-'}</td>
                <td style="text-align: center; padding: 10px 12px; border-bottom: 1px solid var(--border-color);">
                    <button type="button" class="btn btn-primary btn-sm" onclick="selectSubjectFromSearch(${globalIdx})" style="padding: 4px 10px; font-size: 12px; height: auto;">Chọn</button>
                </td>
            `;
            body.appendChild(tr);
        });
        
        if (gridWrapper) gridWrapper.style.display = 'block';
    } else {
        body.innerHTML = '';
        if (gridWrapper) gridWrapper.style.display = 'none';
        if (err) {
            err.innerText = "Kết quả tìm kiếm không tồn tại";
            err.style.display = 'block';
        }
    }
}

function selectSubjectFromSearch(idx) {
    const item = mockSubjectDB[idx];
    if (!item) return;
    
    if (searchTargetForm === 'securing') {
        const typeSelect = document.getElementById('secSubjectType');
        if (typeSelect) {
            typeSelect.value = item.type;
            handleSecuringSubjectTypeChange();
        }
        
        // Fill name
        if (item.type === 'cd_vn' || item.type === 'nn_ngoai' || item.type === 'cd_kq') {
            const el = document.getElementById('secFullName');
            if (el) el.value = item.name;
        } else if (item.type === 'tc_dn') {
            const el = document.getElementById('secOrgName');
            if (el) el.value = item.name;
        } else {
            const el = document.getElementById('secNameOther');
            if (el) el.value = item.name;
        }
        
        // Fill paper number
        if (item.type === 'cd_vn') {
            const el = document.getElementById('secPaperNoCCCD');
            if (el) el.value = item.paperNo;
        } else if (item.type === 'nn_ngoai') {
            const el = document.getElementById('secPassportNo');
            if (el) el.value = item.paperNo;
            const cEl = document.getElementById('secPassportCountry');
            if (cEl) cEl.value = item.passportCountry || '';
        } else if (item.type === 'cd_kq') {
            const el = document.getElementById('secResidencyCard');
            if (el) el.value = item.paperNo;
        } else if (item.type === 'tc_dn' || item.type === 'nd_nn') {
            const el = document.getElementById('secTaxNo');
            if (el) el.value = item.paperNo;
        }
        
        // Fill address
        const countrySelect = document.getElementById('secCountry');
        if (countrySelect) {
            countrySelect.value = item.country || 'Việt Nam';
            countrySelect.dispatchEvent(new Event('change'));
            
            setTimeout(() => {
                const provinceSelect = document.getElementById('secProvince');
                if (provinceSelect) {
                    provinceSelect.value = item.province;
                }
            }, 50);
        }
        
        const addressInput = document.getElementById('secAddress');
        if (addressInput) addressInput.value = item.address;
        
    } else if (searchTargetForm === 'secured') {
        const nameInput = document.getElementById('sedName');
        if (nameInput) nameInput.value = item.name;
        
        const countrySelect = document.getElementById('sedCountry');
        if (countrySelect) {
            countrySelect.value = item.country || 'Việt Nam';
            countrySelect.dispatchEvent(new Event('change'));
            
            setTimeout(() => {
                const provinceSelect = document.getElementById('sedProvince');
                if (provinceSelect) {
                    provinceSelect.value = item.province;
                }
            }, 50);
        }
        
        const addressInput = document.getElementById('sedAddress');
        if (addressInput) addressInput.value = item.address;
    }
    
    closeSearchPopup();
}

// Simulator Control Panel Scenario Manager for MH02
let activeSaveScenario = 'TH1';

function setSaveScenario(scen) {
    activeSaveScenario = scen;
    document.querySelectorAll('.btn-save-sim').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('btnSave' + scen);
    if (activeBtn) activeBtn.classList.add('active');

    if (scen === 'TH1') {
        // Normal success: restore baseline IDs and frame numbers
        c08Bypass = false;
        soKhungList.forEach((a, idx) => {
            if (a.frameNo === 'MISMATCH123' || a.frameNo === 'BLACKLIST123') {
                a.frameNo = 'TYT-VIOS-88992';
                a.type = 'oto';
                a.typeName = 'Ô tô';
                a.name = 'Xe ô tô con';
            }
        });
        // Remove paperNo blacklist
        baselineData.securingParties.forEach(p => {
            if (p.paperNo === '111111111111') p.paperNo = '001088012345';
        });
        renderSoKhungGrid();
    } else if (scen === 'TH2') {
        // C08 warning mismatch: frameNo MISMATCH123
        c08Bypass = false;
        if (soKhungList.length > 0) {
            soKhungList[0].frameNo = 'MISMATCH123';
            soKhungList[0].status = 'Sửa thông tin';
            renderSoKhungGrid();
        }
    } else if (scen === 'TH3') {
        // Blacklist Kê biên block: frameNo BLACKLIST123
        if (soKhungList.length > 0) {
            soKhungList[0].frameNo = 'BLACKLIST123';
            soKhungList[0].status = 'Sửa thông tin';
            renderSoKhungGrid();
        }
    } else if (scen === 'TH4') {
        // Out of jurisdiction block: type bds
        if (soKhungList.length > 0) {
            soKhungList[0].type = 'bds';
            soKhungList[0].typeName = 'Bất động sản';
            soKhungList[0].name = 'Quyền sử dụng đất tại Hà Nội';
            soKhungList[0].status = 'Sửa thông tin';
            renderSoKhungGrid();
        }
    }
}

