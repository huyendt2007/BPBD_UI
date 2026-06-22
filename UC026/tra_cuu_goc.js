/**
 * tra_cuu_goc.js - UC026
 * Xử lý nghiệp vụ tra cứu hồ sơ gốc trước khi thực hiện xóa đăng ký
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

    const mockAssets = [
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
    ];

    // Standard cases 12345678 and 99999999
    if (regNum === '12345678' || regNum === '99999999') {
        return {
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
            assets: mockAssets,
            pin: "8888",
            pending: regNum === '99999999'
        };
    }

    const meta = list[regNum];
    if (!meta) return null;

    return {
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
                name: meta.name,
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
        assets: mockAssets,
        pin: meta.pin,
        pending: false
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const regNumInput = document.getElementById('regNum');
    const pinNumInput = document.getElementById('pinNum');
    const btnSearch = document.getElementById('btnSearch');
    const errorMsg = document.getElementById('errorMsg');
    const errorText = document.getElementById('errorText');

    // Check query params for instant bypass
    const urlParams = new URLSearchParams(window.location.search);
    const bypassRegNum = urlParams.get('regNum');
    const bypassPin = urlParams.get('pin');
    const isBypass = urlParams.get('bypass') === 'true';

    if (isBypass && bypassRegNum && bypassPin) {
        const dossierInfo = getDossierData(bypassRegNum);
        if (dossierInfo) {
            localStorage.setItem('xoaRegNum', bypassRegNum);
            localStorage.setItem('xoaPinNum', bypassPin);
            localStorage.setItem('xoaBaselineData', JSON.stringify(dossierInfo));
            window.location.href = 'xoa_dang_ky_main.html';
            return;
        }
    }

    btnSearch.addEventListener('click', function () {
        const regNum = regNumInput.value.trim();
        const pinNum = pinNumInput.value.trim();

        // Xóa thông báo lỗi cũ
        errorMsg.style.display = 'none';
        clearInputErrors();

        // TH1 (Bỏ trống trường bắt buộc): Hiển thị cảnh báo lỗi tương ứng dưới trường thông tin bị bỏ trống
        let hasEmpty = false;
        if (!regNum) {
            showInputError(regNumInput, "Trường này bắt buộc nhập");
            hasEmpty = true;
        }
        if (!pinNum) {
            showInputError(pinNumInput, "Trường này bắt buộc nhập");
            hasEmpty = true;
        }
        if (hasEmpty) {
            return;
        }

        // Simulate test scenarios based on special input codes
        if (regNum === 'CSDL_FAIL') {
            errorMsg.style.display = 'flex';
            errorText.textContent = "Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau.";
            return;
        }
        if (regNum === 'SAI_PIN') {
            errorMsg.style.display = 'flex';
            errorText.textContent = "Số đăng ký lần đầu hoặc Số PIN không chính xác. Vui lòng kiểm tra lại.";
            return;
        }
        if (regNum === 'CHUA_HT') {
            errorMsg.style.display = 'flex';
            errorText.textContent = "Hồ sơ gốc chưa ở trạng thái Hoàn thành. Không thể thực hiện xóa đăng ký.";
            return;
        }
        if (regNum === 'LIEN_QUAN') {
            errorMsg.style.display = 'flex';
            errorText.textContent = "Tồn tại hồ sơ liên quan chưa được phê duyệt hoàn thành. Vui lòng kiểm tra lại.";
            return;
        }
        if (regNum === 'KHE_BIEN') {
            errorMsg.style.display = 'flex';
            errorText.textContent = "Hồ sơ gốc đang trong quá trình xử lý tài sản bảo đảm. Vui lòng thực hiện Xóa thông báo xử lý tài sản trước khi xóa đăng ký.";
            return;
        }

        // TH2 (Sai thông tin đăng ký): Số đăng ký lần đầu hoặc Số PIN không tồn tại hoặc không khớp
        const dossierInfo = getDossierData(regNum);
        if (!dossierInfo || pinNum !== dossierInfo.pin) {
            errorMsg.style.display = 'flex';
            errorText.textContent = "Số đăng ký lần đầu hoặc Số PIN không chính xác. Vui lòng kiểm tra lại.";
            return;
        }

        // TH5 (Có Hồ sơ xóa/thay đổi đăng ký đang chờ xử lý)
        if (dossierInfo.pending) {
            errorMsg.style.display = 'flex';
            errorText.textContent = "Tồn tại hồ sơ liên quan chưa được phê duyệt hoàn thành. Vui lòng kiểm tra lại.";
            return;
        }

        // TH Hợp lệ: Nạp dữ liệu vào localStorage và chuyển sang MH02
        localStorage.setItem('xoaRegNum', regNum);
        localStorage.setItem('xoaPinNum', pinNum);
        localStorage.setItem('xoaBaselineData', JSON.stringify(dossierInfo));

        window.location.href = 'xoa_dang_ky_main.html';
    });

    // Helper functions
    function showInputError(inputElement, msg) {
        inputElement.style.borderColor = '#EF4444';
        
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
        errorSpan.textContent = msg;
    }

    // Clear Errors helper
    function clearInputErrors() {
        regNumInput.style.borderColor = '';
        pinNumInput.style.borderColor = '';
        document.querySelectorAll('.field-error').forEach(el => el.remove());
    }
});

function goHome() {
    if (window.top !== window.self && typeof window.top.showScreen === 'function') {
        window.top.showScreen('home');
    } else {
        window.location.href = '../trang_tong_the_website_khach_hang.html';
    }
}
