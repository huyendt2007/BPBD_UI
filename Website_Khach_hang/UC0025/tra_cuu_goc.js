/**
 * tra_cuu_goc.js
 * Xử lý nghiệp vụ tra cứu hồ sơ gốc và hiển thị Timeline Baseline cho UC0025
 */

function getDossierData(regNum) {
    const list = {
        "1505156435": { name: "Nguyễn Văn A", pin: "5635" },
        "1505156436": { name: "Trần Thị Bình", pin: "5636" },
        "1505156437": { name: "Phạm Văn Cường", pin: "5637" },
        "1505156438": { name: "Công ty TNHH Hải Nam", pin: "5638" },
        "1505156439": { name: "Công ty CP Thủy sản miền Nam", pin: "5639" },
        "1505156440": { name: "Lê Văn D", pin: "5640" },
        "1505156441": { name: "Nguyễn Thị E", pin: "5641" },
        "1505156442": { name: "Công ty TNHH Logistics Minh Phát", pin: "5642" },
        "1505156443": { name: "Trần Văn F", pin: "5643" },
        "1505156444": { name: "Nguyễn Văn G", pin: "5644" },
        "1505156445": { name: "Trần Văn H", pin: "5645" },
        "1505156446": { name: "Lê Thị I", pin: "5646" }
    };

    // Standard cases 12345678 and 99999999
    if (regNum === '12345678') return { name: "Nguyễn Văn Nam", pin: "8888" };
    if (regNum === '99999999') return { name: "Nguyễn Văn Nam", pin: "8888", pending: true };

    return list[regNum] || null;
}

function generateTimeline(regNum, info) {
    return [
        {
            version: 3,
            label: "Thay đổi lần 2 (Mới nhất)",
            badgeClass: "badge-success",
            title: "Đăng ký thay đổi lần 2 - Phê duyệt thành công",
            date: "15/04/2026 09:30:15",
            dateOnly: "15/04/2026",
            regCode: regNum + "-CD02",
            description: "Bổ sung thông tin bên thế chấp mới và thêm 02 xe máy",
            data: {
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
                        name: info.name,
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
                        status: "Bổ sung mới"
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
                        status: "Bổ sung mới"
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
                        status: "Bổ sung mới"
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
            regCode: regNum + "-CD01",
            description: "Rút bớt 01 tài sản (Xe tải Hyundai) và tăng giá trị khoản vay nghĩa vụ lên 2.5 tỷ VNĐ",
            data: {
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
                        name: info.name,
                        paperType: "CCCD",
                        paperNo: "001088012345",
                        address: "Số 15 Lý Thường Kiệt, Phường Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội",
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
                        status: "Rút bớt"
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
            regCode: regNum,
            description: "Đăng ký gốc lần đầu biện pháp bảo đảm bằng 02 xe ô tô, khoản vay 1.5 tỷ VNĐ",
            data: {
                requester: "Bên nhận thế chấp",
                orgName: "NGÂN HÀNG TMCP FPT",
                exemption: false,
                isFemaleOwner: false,
                scale: "1",
                loanValue: "1,500,000,000",
                contractNo: "HĐTC-2026-FPT",
                contractDate: "04/01/2026",
                transactionType: "Biện pháp bảo đảm",
                measureType: "Thế chấp",
                securingParties: [
                    {
                        type: "cd_vn",
                        name: info.name,
                        paperType: "CCCD",
                        paperNo: "001088012345",
                        address: "Số 15 Lý Thường Kiệt, Phường Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội",
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
}

function initPage() {
    console.log("DEBUG: initPage starting in tra_cuu_goc.js");
    // DOM Elements
    const regNumInput = document.getElementById('regNum');
    const pinNumInput = document.getElementById('pinNum');
    const btnSearch = document.getElementById('btnSearch');
    const errorMsg = document.getElementById('errorMsg');
    const errorText = document.getElementById('errorText');
    const timelineWrapper = document.getElementById('timelineWrapper');
    const timelineNodes = document.getElementById('timelineNodes');
    const btnProceed = document.getElementById('btnProceed');

    // Preview Panel Elements
    const previewTitle = document.getElementById('previewTitle');
    const previewSubtitle = document.getElementById('previewSubtitle');
    const previewRegCode = document.getElementById('previewRegCode');
    const previewDate = document.getElementById('previewDate');
    const previewBaoDam = document.getElementById('previewBaoDam');
    const previewNhanBaoDam = document.getElementById('previewNhanBaoDam');
    const previewAssetCount = document.getElementById('previewAssetCount');
    const previewChanges = document.getElementById('previewChanges');

    let localTimelineData = [];
    let selectedBaseline = null;

    // Check query params for instant bypass
    const urlParams = new URLSearchParams(window.location.search);
    const bypassRegNum = urlParams.get('regNum');
    const bypassPin = urlParams.get('pin');
    const isBypass = urlParams.get('bypass') === 'true';

    if (isBypass && bypassRegNum && bypassPin) {
        console.log("DEBUG: Bypass params detected. regNum=" + bypassRegNum + ", pin=" + bypassPin);
        const dossierInfo = getDossierData(bypassRegNum);
        console.log("DEBUG: dossierInfo = ", dossierInfo);
        if (dossierInfo) {
            const timelineData = generateTimeline(bypassRegNum, dossierInfo);
            const latestBaseline = timelineData[0];
            console.log("DEBUG: setting localStorage keys...");
            localStorage.setItem('regNum', bypassRegNum);
            localStorage.setItem('pinNum', bypassPin);
            localStorage.setItem('baselineVersion', latestBaseline.version);
            localStorage.setItem('baselineData', JSON.stringify(latestBaseline.data));
            localStorage.setItem('baselineOriginalData', JSON.stringify(latestBaseline.data));
            console.log("DEBUG: window.location.href redirecting to dang_ky_thay_doi_main.html now...");
            window.location.href = 'dang_ky_thay_doi_main.html';
            return;
        } else {
            console.log("DEBUG: dossierInfo not found for regNum=" + bypassRegNum);
        }
    }

    // Search Trigger
    btnSearch.addEventListener('click', function () {
        const regNum = regNumInput.value.trim();
        const pinNum = pinNumInput.value.trim();

        // Xóa các cảnh báo lỗi cũ
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-text').forEach(el => el.remove());
        errorMsg.style.display = 'none';

        let hasErrors = false;

        // Kiểm tra bỏ trống (TH1)
        if (!regNum) {
            hasErrors = true;
            regNumInput.classList.add('is-invalid');
            showFieldError(regNumInput, 'Trường này bắt buộc nhập');
        }
        if (!pinNum) {
            hasErrors = true;
            pinNumInput.classList.add('is-invalid');
            showFieldError(pinNumInput, 'Trường này bắt buộc nhập');
        }

        if (hasErrors) return;

        // Custom test case for uncompleted original dossier (TH3)
        if (regNum === '77777777') {
            errorMsg.style.display = 'flex';
            errorText.textContent = 'Hồ sơ gốc chưa ở trạng thái Hoàn thành. Không thể thực hiện đăng ký thay đổi.';
            return;
        }

        // Kiểm tra khớp thông tin đăng ký trong CSDL (TH2)
        const dossierInfo = getDossierData(regNum);
        if (!dossierInfo || pinNum !== dossierInfo.pin) {
            errorMsg.style.display = 'flex';
            errorText.textContent = 'Số đăng ký lần đầu hoặc Số PIN không chính xác. Vui lòng kiểm tra lại.';
            return;
        }

        // Kiểm tra trường hợp hồ sơ thay đổi song song (chưa hoàn thành) (TH3)
        if (dossierInfo.pending) {
            errorMsg.style.display = 'flex';
            errorText.textContent = 'Hồ sơ gốc chưa ở trạng thái Hoàn thành. Không thể thực hiện đăng ký thay đổi.';
            return;
        }

        // TH Hợp lệ: Nạp dữ liệu Baseline của phiên bản mới nhất và chuyển sang Nhập thông tin luôn
        errorMsg.style.display = 'none';

        const timelineData = generateTimeline(regNum, dossierInfo);
        const latestBaseline = timelineData[0]; // Kế thừa bản mới nhất

        localStorage.setItem('regNum', regNum);
        localStorage.setItem('pinNum', pinNum);
        localStorage.setItem('baselineVersion', latestBaseline.version);
        
        // Save target baseline data state
        localStorage.setItem('baselineData', JSON.stringify(latestBaseline.data));
        
        // Initial state copy for delta checking
        localStorage.setItem('baselineOriginalData', JSON.stringify(latestBaseline.data));

        // Redirect to change form directly
        window.location.href = 'dang_ky_thay_doi_main.html';
    });

    function showFieldError(inputEl, message) {
        const parent = inputEl.parentElement;
        let errEl = parent.querySelector('.error-text');
        if (!errEl) {
            errEl = document.createElement('span');
            errEl.className = 'error-text';
            parent.appendChild(errEl);
        }
        errEl.textContent = message;
    }

    function renderTimeline(timelineData) {
        timelineNodes.innerHTML = '';
        timelineData.forEach((node, index) => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'timeline-node' + (index === 0 ? ' active' : '');
            nodeEl.innerHTML = `
                <div class="node-circle">
                    <span class="badge ${node.badgeClass}">${node.label}</span>
                </div>
                <div class="node-content">
                    <h4 class="node-title">${node.title}</h4>
                    <span class="node-date"><i class="fa-regular fa-clock"></i> ${node.date}</span>
                    <p class="node-desc">${node.description}</p>
                </div>
            `;
            nodeEl.addEventListener('click', function () {
                document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
                nodeEl.classList.add('active');
                selectTimelineNode(node);
            });
            timelineNodes.appendChild(nodeEl);
        });
        timelineWrapper.style.display = 'block';
    }

    function selectTimelineNode(node) {
        selectedBaseline = node;
        previewTitle.textContent = node.title;
        previewSubtitle.textContent = node.description;
        previewRegCode.textContent = node.regCode;
        previewDate.textContent = node.dateOnly;

        previewBaoDam.innerHTML = node.data.securingParties.map(p => `<strong>${p.name}</strong> (Giấy tờ: ${p.paperType} - ${p.paperNo})`).join('<br>');
        previewNhanBaoDam.innerHTML = node.data.securedParties.map(p => `<strong>${p.name}</strong><br>Địa chỉ: ${p.address}`).join('<br>');
        previewAssetCount.textContent = node.data.assets.length + " tài sản";

        if (node.changesSummary && node.changesSummary.length > 0) {
            previewChanges.innerHTML = node.changesSummary.map(c => `<li>${c}</li>`).join('');
        } else {
            previewChanges.innerHTML = '<li>Đăng ký gốc ban đầu, chưa ghi nhận thay đổi nào.</li>';
        }
    }

    // Proceed to edit form
    btnProceed.addEventListener('click', function () {
        if (!selectedBaseline) return;

        localStorage.setItem('regNum', regNumInput.value.trim());
        localStorage.setItem('pinNum', pinNumInput.value.trim());
        localStorage.setItem('baselineVersion', selectedBaseline.version);
        
        // Save target baseline data state
        localStorage.setItem('baselineData', JSON.stringify(selectedBaseline.data));
        
        // Initial state copy for delta checking
        localStorage.setItem('baselineOriginalData', JSON.stringify(selectedBaseline.data));

        // Redirect to change form
        window.location.href = 'dang_ky_thay_doi_main.html';
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
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
