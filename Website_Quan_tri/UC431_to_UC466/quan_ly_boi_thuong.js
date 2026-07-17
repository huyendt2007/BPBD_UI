// Synchronize Role Selectors and update table
        function syncRole(el) {
            const val = el.value;
            const selMain = document.getElementById('roleSelectorMain');
            const selGiaLap = document.getElementById('roleSelectorGiaLap');
            if (selMain) selMain.value = val;
            if (selGiaLap) selGiaLap.value = val;

            const wrapper = document.getElementById('currentOfficerSelectorWrapper');
            if (wrapper) {
                wrapper.style.display = val === 'chuyen-vien' ? 'inline-block' : 'none';
            }
            renderClaimsTable();
        }

        function handleRequestTypeChange(val) {
            const moneySec = document.getElementById('claimMoneySection');
            const advSec = document.getElementById('advancePaymentSection');
            const honorSec = document.getElementById('claimHonorSection');
            const needHonor = document.getElementById('claimNeedRestoreHonor');
            const descWrapper = document.getElementById('claimRestoreHonorDescWrapper');

            if (val === 'money') {
                if (moneySec) moneySec.style.display = 'block';
                if (advSec) advSec.style.display = 'block';
                if (honorSec) honorSec.style.display = 'none';
                if (needHonor) {
                    needHonor.checked = false;
                    needHonor.disabled = false;
                }
                if (descWrapper) descWrapper.style.display = 'none';
            } else if (val === 'honor') {
                if (moneySec) moneySec.style.display = 'none';
                if (advSec) advSec.style.display = 'none';
                if (honorSec) honorSec.style.display = 'block';
                if (needHonor) {
                    needHonor.checked = true;
                    needHonor.disabled = true;
                }
                if (descWrapper) descWrapper.style.display = 'block';
            } else {
                if (moneySec) moneySec.style.display = 'block';
                if (advSec) advSec.style.display = 'block';
                if (honorSec) honorSec.style.display = 'block';
                if (needHonor) {
                    needHonor.disabled = false;
                    if (descWrapper) descWrapper.style.display = needHonor.checked ? 'block' : 'none';
                }
            }
        }

        function handleVictimAliveChange(val) {
            const apology = document.getElementById('claimPhddFormApology');
            const news = document.getElementById('claimPhddFormNews');

            if (val === 'no') {
                if (apology) {
                    apology.checked = false;
                    apology.disabled = true;
                }
                if (news) {
                    news.checked = true;
                    news.disabled = true;
                }
            } else {
                if (apology) {
                    apology.disabled = false;
                }
                if (news) {
                    news.disabled = false;
                }
            }
        }

        // Get full uppercase name for fieldGroup
        function getFieldGroupName(val) {
            switch (val) {
                case 'hành chính': return 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH';
                case 'hình sự': return 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ';
                case 'dân sự': return 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ';
                case 'tố tụng hành chính': return 'TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH';
                case 'thi hành án hình sự': return 'TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ';
                case 'thi hành án dân sự': return 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ';
                default: return val ? val.toUpperCase() : '';
            }
        }

        // Auto-expand textarea height
        function autoExpandTextarea(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }

        // Format currency input automatically
        function formatCurrencyInput(input) {
            let selectionStart = input.selectionStart;
            let selectionEnd = input.selectionEnd;
            let originalLength = input.value.length;

            let value = input.value.replace(/\D/g, '');
            if (value) {
                let formatted = parseInt(value, 10).toLocaleString('vi-VN');
                formatted = formatted.replace(/,/g, '.');
                input.value = formatted;
            } else {
                input.value = '';
            }

            let newLength = input.value.length;
            let lengthDiff = newLength - originalLength;
            input.setSelectionRange(selectionStart + lengthDiff, selectionEnd + lengthDiff);

            sumClaimThietHai();
        }

        // Local simulation data for Quick-Fill
        const xdRequestList = [
            {
                code: "XD-2026-001",
                nycName: "Nguyễn Văn Nam",
                nycRole: "Người bị thiệt hại",
                nycGender: "Nam",
                nycBirth: "12/05/1988",
                nycCardType: "CCCD",
                nycCardNo: "001088002934",
                nycCardDate: "15/08/2021",
                nycCardPlace: "Cục Cảnh sát QLHC về TTXH",
                nycPhone: "0915223344",
                nycEmail: "namnv@example.com",
                nycCountry: "Việt Nam",
                nycTinhThanh: "Hà Nội",
                nycAddressDetail: "Số 20 Trần Hưng Đạo, Hoàn Kiếm",
                hanhVi: "UBND Phường đã thực hiện lập biên bản phạt hành chính sai thẩm quyền đối với hộ kinh doanh.",
                procTargetAgency: "Sở Tư pháp TP. Hà Nội",
                fieldGroup: "hành chính"
            },
            {
                code: "XD-2026-002",
                nycName: "Lê Hoàng Hải",
                nycRole: "Cá nhân, pháp nhân được ủy quyền hợp pháp",
                nycGender: "Nam",
                nycBirth: "20/10/1990",
                nycCardType: "CCCD",
                nycCardNo: "001090008812",
                nycCardDate: "10/02/2023",
                nycCardPlace: "Cục Cảnh sát QLHC về TTXH",
                nycPhone: "0988776655",
                nycEmail: "haile@example.com",
                nycCountry: "Việt Nam",
                nycTinhThanh: "Hải Phòng",
                nycAddressDetail: "Số 45 Lê Lợi, Ngô Quyền",
                hanhVi: "Bắt tạm giam khẩn cấp không phê chuẩn của Viện kiểm sát.",
                procTargetAgency: "Tòa án nhân dân TP. Hà Nội",
                fieldGroup: "hình sự"
            }
        ];

        const thietHaiNames = [
            "Tài sản bị xâm phạm",
            "Thu nhập thực tế bị mất/giảm sút",
            "Vật chất do người bị thiệt hại chết",
            "Vật chất do sức khỏe bị xâm phạm",
            "Thiệt hại về tinh thần",
            "Các chi phí hợp lý khác"
        ];

        // Claim Mock Data
        let currentClaimOfficers = [];
        let claimsList = [
            {
                id: "HS1",
                assignedOfficer: "Nguyễn Văn Chuyên Viên",
                code: "BT-2026-001",
                fieldGroup: "hành chính",
                date: "12/06/2026",
                nyc: "Nguyễn Văn A",
                victimAlive: "yes",
                cardType: "Cá nhân",
                cardNo: "001085002934",
                address: "Số 15 đường Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
                phone: "0912345678",
                role: "Người bị thiệt hại",
                docBase: "Quyết định xử phạt trái luật số 12/QD-XPVHC ngày 10/02/2026 của UBND quận Cầu Giấy",
                hanhVi: "Cưỡng chế tháo dỡ nhà ở khi chưa có quyết định hành chính có hiệu lực pháp luật.",
                nhanQua: "Việc đập phá công trình gây sụp đổ căn nhà và hư hỏng toàn bộ tài sản bên trong.",
                status: "Đang thương lượng",
                thulyVenue: "cơ quan quản lý",
                totalNum: 150000000,
                advanceNum: 30000000,
                advanceRec: "Nguyễn Văn A",
                advanceRecCard: "001085002934",
                advanceRecAddress: "Số 15 đường Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
                advanceRecKenh: "tien-mat",
                advanceRecBank: "",
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Đang thương lượng bồi thường (hạn còn 5 ngày)",
                restoreHonor: true,
                agency: "Sở Tư pháp Hà Nội",
                deadline: "20/08/2026",
                files: [
                    { name: "Đơn yêu cầu bồi thường Mẫu 01.pdf", url: "#" },
                    { name: "Biên bản hiện trạng tháo dỡ công trình.pdf", url: "#" }
                ],
                thietHaiList: [
                    { type: 1, calc: "Thiệt hại do tài sản bị xâm phạm hoặc tiêu hủy: 75.000.000 đ", val: 75000000, xmVal: 70000000, xmNote: "Xác định theo đơn giá bồi thường của UBND Tỉnh" },
                    { type: 2, calc: "Thu nhập thực tế bị mất/giảm sút trong thời gian đình chỉ: 45.000.000 đ", val: 45000000, xmVal: 40000000, xmNote: "Xác minh theo sổ sách doanh thu thực tế" },
                    { type: 6, calc: "Các chi phí hợp lý khác phát sinh trực tiếp: 30.000.000 đ", val: 30000000, xmVal: 30000000, xmNote: "Xác minh theo hóa đơn chứng từ hợp lệ" }
                ],
                xmTotalAmount: 140000000,
                xmOtherInfo: "Cơ quan giải quyết đã tiến hành đo đạc trực tiếp, kiểm kê hiện trạng tài sản thiệt hại và thẩm định giá độc lập.",
                xmMethod: "tien-mat",
                xmFiles: [
                    { name: "Bien_ban_kiem_ke_va_dinh_gia_BT-2026-001.pdf", url: "#" },
                    { name: "Bao_cao_ket_qua_xac_minh_so_15.pdf", url: "#" }
                ],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "12/06/2026", desc: "Hồ sơ tiếp nhận trực tiếp từ Nguyễn Văn A", status: "completed" },
                    { title: "Kiểm tra hồ sơ bổ sung", date: "15/06/2026", desc: "Hồ sơ hợp lệ, đủ thành phần.", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "17/06/2026", desc: "Quyết định thụ lý số 104/QĐ-TLHS của Sở Tư pháp.", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "02/07/2026", desc: "Hoàn thành báo cáo xác minh thiệt hại thực tế.", status: "completed" },
                    { title: "Thương lượng bồi thường", date: "08/07/2026", desc: "Đang tiến hành phiên thương lượng lần thứ 1.", status: "active" }
                ],
                tlTimeExp: "08/07/2026 09:00",
                tlVenueExp: "Phòng họp số 3, Sở Tư pháp",
                tlMembersExp: "Đại diện Sở, ông Nguyễn Văn A và chuyên viên xác minh Lê Văn B.",
                phddStep1No: "12/TB-STP",
                phddStep1Date: "20/06/2026",
                phddStep1Signer: "Nguyễn Văn Hoạt (Giám đốc Sở)",
                phddStep1File: "Thong_bao_chuyen_PHDD.pdf",
                phddStep2Opinion: "Đồng ý",
                phddStep2OpinionText: "Đồng ý thực hiện phục hồi danh dự bằng hình thức xin lỗi công khai và đăng tải báo chí.",
                phddStep2File: "Y_kien_dong_y_nguoi_bi_hai.pdf",
                fundRequests: [
                    {
                        code: "KP-2026-008",
                        type: "Cấp tạm ứng",
                        amount: 30000000,
                        approvedAmount: 30000000,
                        date: "15/06/2026",
                        status: "Hoàn thành",
                        source: "Tạm ứng kinh phí Bộ Tài chính",
                        cqCap: "Sở Tư pháp Hà Nội",
                        payoutDate: "18/06/2026",
                        payoutAmountReal: 30000000,
                        payoutMethod: "Tiền mặt trực tiếp tại Kho bạc",
                        payoutRecName: "Nguyễn Văn A",
                        notes: "Cấp tạm ứng bồi thường thiệt hại tinh thần cho ông Nguyễn Văn A theo hồ sơ BT-2026-001."
                    }
                ]
            },
            {
                id: "HS2",
                assignedOfficer: "Nguyễn Văn Chuyên Viên",
                code: "BT-2026-002",
                fieldGroup: "hình sự",
                date: "14/06/2026",
                nyc: "Trần Thị B",
                victimAlive: "no",
                cardType: "Cá nhân",
                cardNo: "002092003845",
                address: "Số 88 đường Lạch Tray, Ngô Quyền, Hải Phòng",
                phone: "0904888999",
                role: "Người thừa kế của người bị thiệt hại",
                docBase: "Bản án hình sự oan sai số 15/2026/HS-ST ngày 28/02/2026 của TAND tỉnh Lâm Đồng",
                hanhVi: "Bắt giam giữ oan sai trong thời gian 3 tháng liên tiếp.",
                nhanQua: "Gây tổn thương sức khỏe và tinh thần nghiêm trọng trong thời gian giam giữ trái luật.",
                status: "Đang xác minh thiệt hại",
                thulyVenue: "tòa án tố tụng",
                totalNum: 350000000,
                advanceNum: 0,
                slaDays: 12,
                slaStatus: "normal",
                slaText: "Đang tiến hành xác minh thiệt hại",
                restoreHonor: true,
                agency: "Tòa án nhân dân TP. Hà Nội",
                deadline: "30/08/2026",
                files: [
                    { name: "Đơn yêu cầu bồi thường Mẫu 01.pdf", url: "#" },
                    { name: "Bản án oan sai số 15.pdf", url: "#" }
                ],
                thietHaiList: [
                    { type: 1, calc: "Thiệt hại do tài sản bị xâm phạm, tiêu hủy hoặc bị mất", val: 50000000 },
                    { type: 2, calc: "Thu nhập thực tế bị mất hoặc bị giảm sút", val: 60000000 },
                    { type: 3, calc: "Thiệt hại do không sử dụng, khai thác được tài sản", val: 40000000 },
                    { type: 4, calc: "Thiệt hại về sức khỏe do bị bắt giữ oan sai", val: 80000000 },
                    { type: 5, calc: "Thiệt hại về tinh thần do bị tạm giam 3 tháng", val: 90000000 },
                    { type: 6, calc: "Chi phí thuê người bào chữa & chi phí đi lại", val: 30000000 }
                ],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "14/06/2026", desc: "Hồ sơ tiếp nhận thông qua DVC trực tuyến", status: "completed" },
                    { title: "Kiểm tra hồ sơ bổ sung", date: "16/06/2026", desc: "Hồ sơ hợp lệ.", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "18/06/2026", desc: "Quyết định thụ lý số 105/QĐ-TLHS.", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "Đang tiến hành", desc: "Chuyên viên đang thu thập tài liệu định giá thiệt hại.", status: "active" }
                ]
            },
            {
                id: "HS3",
                assignedOfficer: "Lê Văn Chuyên Viên",
                code: "BT-2026-003",
                fieldGroup: "hành chính",
                date: "05/01/2023",
                nyc: "Công ty Hải Phát",
                victimAlive: "yes",
                cardType: "Tổ chức",
                cardNo: "0102030405",
                address: "Khu đô thị mới An Hưng, Hà Đông, Hà Nội",
                phone: "0243556677",
                role: "Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại",
                docBase: "Quyết định thu hồi đất trái pháp luật số 888/QD-UBND ngày 20/12/2022 của UBND thành phố",
                hanhVi: "Thu hồi đất dự án xây dựng trái thẩm quyền làm ngưng trệ thi công.",
                nhanQua: "Làm phát sinh chi phí phạt hợp đồng thầu phụ và khấu hao thiết bị dừng thi công vô lý.",
                status: "Hoàn thành",
                thulyVenue: "cơ quan quản lý",
                totalNum: 4800000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "Đã chi trả bồi thường hoàn tất",
                restoreHonor: true,
                phddFormApology: true,
                phddFormNews: false,
                phddStep1No: "12/TB-STP",
                phddStep1Date: "12/01/2023",
                phddStep1Signer: "Nguyễn Văn Chuyên (Giám đốc)",
                phddStep1File: "Thong_bao_to_chuc_PHDD.pdf",
                phddStep2Opinion: "Đồng ý",
                phddStep2OpinionText: "Đồng ý thời gian và địa điểm tổ chức buổi xin lỗi trực tiếp tại trụ sở công ty.",
                phddStep2File: "Bien_ban_y_kien_PHDD.pdf",
                phddStep3No: "45/QĐ-PHDD",
                phddStep3Date: "20/01/2023",
                phddStep3Type: "Trực tiếp xin lỗi",
                phddStep3DateExp: "25/01/2023",
                phddStep3DirectVenue: "Trụ sở Công ty Hải Phát, Khu đô thị An Hưng, Hà Đông, Hà Nội",
                phddStep3DirectMembers: "Đại diện Sở Tư pháp Hà Nội, đại diện UBND quận Hà Đông, đại diện Công ty Hải Phát.",
                phddStep3DirectContent: "Tổ chức buổi xin lỗi trực tiếp và cải chính công khai tại trụ sở Công ty Hải Phát.",
                phddStep3File: "Quyet_dinh_to_chuc_PHDD.pdf",
                phddStep4DateAct: "25/01/2023",
                phddStep4VenueAct: "Trụ sở Công ty Hải Phát, Khu đô thị An Hưng, Hà Đông, Hà Nội",
                phddStep4MembersAct: "Đại diện Sở Tư pháp Hà Nội, đại diện UBND quận Hà Đông, đại diện Công ty Hải Phát.",
                phddStep4ResultDesc: "Đã tổ chức thành công buổi xin lỗi trực tiếp và cải chính công khai, ghi nhận sự chứng kiến của các cơ quan hữu quan và công bố công khai tại trụ sở doanh nghiệp.",
                phddStep4File: "Bien_ban_ket_qua_PHDD.pdf",
                agency: "UBND Quận Cầu Giấy",
                deadline: "10/05/2023",
                files: [{ name: "Hồ sơ tháo dỡ công trình Hải Phát.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "05/01/2023", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "10/01/2023", desc: "Thụ lý giải quyết bồi thường", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "15/02/2023", desc: "Đã ban hành báo cáo xác minh thiệt hại", status: "completed" },
                    { title: "Thương lượng bồi thường", date: "28/02/2023", desc: "Thương lượng thành công", status: "completed" },
                    { title: "Quyết định giải quyết bồi thường", date: "10/03/2023", desc: "Ban hành quyết định bồi thường số 45/QĐ-BT", status: "completed" },
                    { title: "Thực thi giải quyết bồi thường", date: "10/05/2023", desc: "Đã hoàn thành thực thi chi trả 4,8 tỷ đồng", status: "completed" }
                ],
                thucthiDate: "10/05/2023",
                thucthiNote: "Đã chuyển khoản đủ số tiền 4.800.000.000đ sang tài khoản Công ty Hải Phát.",
                fundRequests: [
                    {
                        code: "KP-2023-010",
                        type: "Cấp kinh phí bồi thường",
                        amount: 4800000000,
                        approvedAmount: 4800000000,
                        date: "12/03/2023",
                        status: "Hoàn thành",
                        source: "Ngân sách Trung ương",
                        cqCap: "Bộ Tài chính",
                        payoutDate: "10/05/2023",
                        payoutAmountReal: 4800000000,
                        payoutMethod: "Chuyển khoản qua ngân hàng",
                        payoutRecName: "Công ty Hải Phát (Đại diện pháp luật)",
                        payoutBankUser: "CÔNG TY HẢI PHÁT",
                        payoutBankAccount: "1100223344",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhánh Hà Tây",
                        notes: "Trình duyệt chi trả kinh phí bồi thường cho Công ty Hải Phát theo QĐ số 45/QĐ-BT."
                    }
                ]
            },
            {
                id: "HS4",
                code: "BT-2026-004",
                fieldGroup: "dân sự",
                date: "04/04/2026",
                nyc: "Trần Minh T",
                cardType: "Cá nhân",
                cardNo: "001094002934",
                address: "Số 9 Hàng Trống, Hoàn Kiếm, Hà Nội",
                phone: "0901223344",
                role: "Người bị thiệt hại",
                docBase: "Quyết định áp dụng khẩn cấp tạm thời phong tỏa tài khoản sai luật số 02/QD-BPKCTT",
                hanhVi: "Kê biên tài sản quá mức thiệt hại cần bảo đảm.",
                nhanQua: "Thiệt hại doanh thu bán hàng thực tế do phong tỏa tài sản.",
                status: "Yêu cầu bổ sung",
                thulyVenue: "tòa án dân sự A",
                totalNum: 75000000,
                advanceNum: 0,
                slaDays: 4,
                slaStatus: "warning",
                slaText: "Chờ người dân bổ sung hồ sơ",
                restoreHonor: false,
                agency: "Tòa án nhân dân quận Hoàn Kiếm",
                deadline: "28/08/2026",
                files: [{ name: "Đơn yêu cầu bồi thường.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "04/04/2026", desc: "Hồ sơ mới tiếp nhận", status: "completed" },
                    { title: "Kiểm tra hồ sơ bổ sung", date: "08/04/2026", desc: "Yêu cầu bổ sung Biên bản đối soát ngân hàng.", status: "active" }
                ],
                bosungLogs: [
                    { date: "08/04/2026", sender: "Chuyên viên Lê Văn A", content: "Yêu cầu bổ sung Biên bản đối soát sao kê tài khoản ngân hàng để chứng minh thiệt hại thực tế." }
                ]
            },
            {
                id: "HS5",
                code: "BT-2026-005",
                fieldGroup: "tố tụng hành chính",
                date: "10/02/2026",
                nyc: "Lê Văn D",
                cardType: "Cá nhân",
                cardNo: "001089004823",
                address: "Số 234 Láng Hạ, Đống Đa, Hà Nội",
                phone: "0911556677",
                role: "Người bị thiệt hại",
                docBase: "Bản án hành chính số 02/2026/HC-ST",
                hanhVi: "Không cấp giấy phép xây dựng trái luật.",
                nhanQua: "Nguyên vật liệu hư hỏng do chậm khởi công.",
                status: "Chờ thực thi",
                thulyVenue: "tòa án tố tụng",
                totalNum: 250000000,
                advanceNum: 0,
                slaDays: 20,
                slaStatus: "normal",
                restoreHonor: true,
                agency: "Sở Tư pháp Hải Phòng",
                deadline: "05/09/2026",
                files: [{ name: "Bản án hành chính số 02.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "10/02/2026", desc: "Đồng bộ từ vụ án hành chính", status: "completed" },
                    { title: "Kiểm tra hồ sơ bổ sung", date: "12/02/2026", desc: "Hợp lệ", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "15/02/2026", desc: "Thụ lý giải quyết bồi thường", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "12/03/2026", desc: "Báo cáo xác minh thiệt hại hoàn thành", status: "completed" },
                    { title: "Thương lượng bồi thường", date: "20/03/2026", desc: "Thương lượng thành công", status: "completed" },
                    { title: "Quyết định giải quyết bồi thường", date: "02/04/2026", desc: "Đã ban hành quyết định số 104/QĐ-BT", status: "completed" }
                ],
                decNo: "104/QĐ-BT",
                decDate: "02/04/2026",
                decAmount: 250000000,
                decContent: "Đồng ý bồi thường thiệt hại vật chất 250.000.000đ cho ông Lê Văn D và tổ chức cải chính danh dự công khai.",
                phddType: "Trực tiếp xin lỗi",
                phddDateExp: "10/07/2026",
                phddDirectVenue: "Nhà văn hóa tổ dân phố 12, Láng Hạ",
                phddDirectMembers: "Đại diện Sở Tư pháp, đại diện UBND Phường Láng Hạ và người bị thiệt hại Lê Văn D.",
                phddDirectContent: "Buổi xin lỗi trực tiếp công khai diễn giải lời xin lỗi chân thành từ phía cơ quan quản lý hành chính.",
                fundRequests: [
                    {
                        code: "KP-2026-001",
                        type: "Cấp kinh phí bồi thường",
                        amount: 250000000,
                        approvedAmount: 250000000,
                        date: "02/05/2026",
                        status: "Hoàn thành",
                        source: "Ngân sách địa phương (Dự phòng)",
                        cqCap: "Sở Tài chính Hà Nội",
                        payoutDate: "05/05/2026",
                        payoutAmountReal: 250000000,
                        payoutMethod: "Chuyển khoản qua ngân hàng",
                        payoutRecName: "Lê Văn D",
                        payoutBankUser: "LÊ VĂN D",
                        payoutBankAccount: "123456789012",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhánh Đống Đa",
                        notes: "Trình duyệt chi trả kinh phí bồi thường cho vụ việc của ông Lê Văn D."
                    }
                ]
            },
            {
                id: "HS6",
                code: "BT-2026-006",
                fieldGroup: "thi hành án dân sự",
                date: "18/06/2026",
                nyc: "Phạm Minh K",
                cardType: "Cá nhân",
                cardNo: "001092008745",
                address: "Số 45 Lê Lợi, Ngô Quyền, Hải Phòng",
                phone: "0904123456",
                role: "Người bị thiệt hại",
                docBase: "Quyết định hoãn thi hành án dân sự trái luật số 12/QD-HTHA",
                hanhVi: "Hoãn thi hành án dân sự dẫn đến tẩu tán tài sản.",
                nhanQua: "Không thu hồi được khoản nợ 420 triệu.",
                status: "Lưu nháp",
                thulyVenue: "tòa án dân sự B",
                totalNum: 420000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "draft",
                slaText: "Đang lưu nháp, chưa gửi tiếp nhận",
                restoreHonor: false,
                agency: "Sở Tư pháp Hải Phòng",
                deadline: "30/09/2026",
                files: [{ name: "Biên bản cưỡng chế bị hủy.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "18/06/2026", desc: "Hồ sơ được tạo dưới dạng lưu nháp.", status: "active" }
                ]
            },
            {
                id: "HS7",
                code: "BT-2026-007",
                fieldGroup: "thi hành án dân sự",
                date: "15/06/2026",
                nyc: "Vũ Văn L",
                cardType: "Cá nhân",
                cardNo: "001091008743",
                address: "Phường Quang Trung, TP. Thái Bình",
                phone: "0982345678",
                role: "Người bị thiệt hại",
                docBase: "Quyết định cưỡng chế thi hành án sai đối tượng",
                hanhVi: "Cưỡng chế kê biên nhà đất của bên thứ ba không có nghĩa vụ.",
                nhanQua: "Mất tự do và tổn thương danh dự.",
                status: "Chờ tiếp nhận",
                thulyVenue: "cơ quan quản lý",
                totalNum: 180000000,
                advanceNum: 80000000,
                advanceTinhThan: 50000000,
                advanceKhac: 30000000,
                advanceRecKenh: "chuyen-khoan",
                advanceBankUser: "VŨ VĂN L",
                advanceBankAccount: "1023456789",
                advanceBankName: "Vietcombank",
                advanceBankBranch: "Chi nhánh Thái Bình",
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Mới gửi tiếp nhận",
                restoreHonor: false,
                agency: "Cục Thi hành án dân sự TP. Hải Phòng",
                deadline: "15/09/2026",
                files: [{ name: "Quyết định kê biên tài sản.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "15/06/2026", desc: "Đã nộp trực tuyến, chờ tiếp nhận.", status: "active" }
                ]
            },
            {
                id: "HS8",
                code: "BT-2026-008",
                fieldGroup: "hành chính",
                date: "18/06/2026",
                nyc: "Hoàng Thị M",
                cardType: "Cá nhân",
                cardNo: "001096008742",
                address: "Phường Bạch Đằng, Hai Bà Trưng, Hà Nội",
                phone: "0977665544",
                role: "Người bị thiệt hại",
                docBase: "Quyết định cưỡng chế tháo dỡ công trình phụ số 14/QD-CC",
                hanhVi: "Áp dụng biện pháp khẩn cấp phong tỏa tài khoản ngân hàng trái luật.",
                nhanQua: "Thiệt hại tiền lãi phát sinh và phạt chậm thanh toán.",
                status: "Chờ thụ lý",
                thulyVenue: "tòa án tố tụng",
                totalNum: 90000000,
                advanceNum: 0,
                slaDays: 3,
                slaStatus: "normal",
                slaText: "Chờ thụ lý giải quyết bồi thường",
                restoreHonor: false,
                agency: "UBND Tỉnh Lâm Đồng",
                deadline: "18/09/2026",
                files: [{ name: "Quyết định cưỡng chế tháo dỡ.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "18/06/2026", desc: "Hồ sơ đã được tiếp nhận.", status: "completed" },
                    { title: "Kiểm tra hồ sơ bổ sung", date: "20/06/2026", desc: "Hồ sơ hợp lệ, đang trình thụ lý.", status: "active" }
                ]
            },
            {
                id: "HS9",
                code: "BT-2026-009",
                fieldGroup: "hành chính",
                date: "10/05/2026",
                nyc: "Nguyễn Văn E",
                cardType: "Cá nhân",
                cardNo: "001090002934",
                address: "Số 4 Hàng Bạc, Hoàn Kiếm, Hà Nội",
                phone: "0911223344",
                role: "Người bị thiệt hại",
                docBase: "Quyết định xử phạt số 14/QD-XP",
                hanhVi: "Cưỡng chế tịch thu phương tiện vận tải sai quy trình.",
                nhanQua: "Mất doanh thu kinh doanh vận tải trong 30 ngày.",
                status: "Từ chối thụ lý",
                thulyVenue: "cơ quan quản lý",
                rejectType: "Từ chối thụ lý",
                rejectReason: "Hồ sơ bị từ chối thụ lý do hết thời hiệu yêu cầu bồi thường theo quy định tại Điều 6 Luật Trách nhiệm bồi thường của Nhà nước (đã quá 03 năm kể từ ngày người bị thiệt hại nhận được văn bản làm căn cứ yêu cầu bồi thường).",
                rejectDate: "14/05/2026 10:30",
                rejectOfficer: "Nguyễn Văn Thủ Trưởng (Thủ trưởng cơ quan)",
                rejectionLog: [
                    {
                        date: "10/05/2026 14:00",
                        officer: "Nguyễn Văn Thủ Trưởng (Thủ trưởng cơ quan)",
                        action: "Từ chối thụ lý",
                        reason: "Hồ sơ chưa đính kèm Quyết định giải quyết khiếu nại làm căn cứ yêu cầu bồi thường."
                    },
                    {
                        date: "11/05/2026 09:30",
                        officer: "Nguyễn Văn Chuyên Viên (Cán bộ thụ lý)",
                        action: "Giải trình & Trình lại",
                        reason: "Cán bộ đã liên hệ người yêu cầu và đính kèm bổ sung Quyết định giải quyết khiếu nại số 14/QĐ-GQKN."
                    },
                    {
                        date: "12/05/2026 16:00",
                        officer: "Nguyễn Văn Thủ Trưởng (Thủ trưởng cơ quan)",
                        action: "Từ chối thụ lý",
                        reason: "Bản sao Quyết định giải quyết khiếu nại đính kèm không có chứng thực hoặc đối chiếu bản chính. Yêu cầu đính kèm bản quét màu từ bản chính."
                    },
                    {
                        date: "13/05/2026 10:15",
                        officer: "Nguyễn Văn Chuyên Viên (Cán bộ thụ lý)",
                        action: "Giải trình & Trình lại",
                        reason: "Đã cập nhật tệp quét màu từ bản gốc của Quyết định giải quyết khiếu nại."
                    },
                    {
                        date: "14/05/2026 10:30",
                        officer: "Nguyễn Văn Thủ Trưởng (Thủ trưởng cơ quan)",
                        action: "Từ chối thụ lý",
                        reason: "Hồ sơ bị từ chối thụ lý do hết thời hiệu yêu cầu bồi thường theo quy định tại Điều 6 Luật Trách nhiệm bồi thường của Nhà nước (đã quá 03 năm kể từ ngày người bị thiệt hại nhận được văn bản làm căn cứ yêu cầu bồi thường)."
                    }
                ],
                totalNum: 60000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Hồ sơ bị từ chối do hết thời hiệu",
                restoreHonor: false,
                agency: "UBND Quận Đống Đa",
                deadline: "10/08/2026",
                files: [{ name: "Quyet dinh tu choi thu ly.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "10/05/2026", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "14/05/2026", desc: "Từ chối thụ lý do hết thời hiệu yêu cầu bồi thường (Điều 6).", status: "completed" }
                ]
            },
            {
                id: "HS10",
                code: "BT-2026-010",
                fieldGroup: "hình sự",
                date: "15/05/2026",
                nyc: "Nguyễn Văn F",
                cardType: "Cá nhân",
                cardNo: "001092003842",
                address: "Phường Nghĩa Đô, Cầu Giấy, Hà Nội",
                phone: "0988665544",
                role: "Người bị thiệt hại",
                docBase: "Quyết định tạm đình chỉ điều tra bị can oan sai",
                hanhVi: "Giam giữ oan sai 45 ngày do sai sót điều tra.",
                nhanQua: "Mất tự do, ảnh hưởng tâm lý và danh dự trầm trọng.",
                status: "Thương lượng không thành công",
                thulyVenue: "tòa án tố tụng",
                totalNum: 120000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "Thương lượng thất bại, kết thúc luồng hành chính",
                restoreHonor: false,
                agency: "Tòa án nhân dân Tỉnh Lâm Đồng",
                deadline: "15/08/2026",
                files: [{ name: "Biên bản thương lượng không thành.pdf", url: "#" }],
                tlSessionIndex: 1,
                tlTimeAct: "02/07/2026 09:00",
                tlVenueAct: "Phòng họp số 2 - TAND Tỉnh Lâm Đồng",
                tlMembersAct: "Đại diện Tòa án, Chuyên viên thụ lý Lê Văn C, Người yêu cầu bồi thường Nguyễn Văn F.",
                tlDisputeProgress: "Người yêu cầu bồi thường đề nghị bồi thường thêm các khoản chi phí không có hóa đơn tài chính hợp lệ. Cơ quan giải quyết giải thích rõ quy định pháp luật nhưng hai bên không tìm được tiếng nói chung.",
                tlDisagreementReason: "Chênh lệch lớn về mức bồi thường thiệt hại thực tế đối với các khoản chi phí không có chứng từ chứng minh pháp lý.",
                tlFiles: [{ name: "Bien_ban_thuong_luong_khong_thanh_lan1.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "15/05/2026", desc: "Hồ sơ tiếp nhận trực tuyến", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "18/05/2026", desc: "Đã thụ lý giải quyết bồi thường", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "15/06/2026", desc: "Đã ban hành báo cáo xác minh thiệt hại", status: "completed" },
                    { title: "Thương lượng bồi thường", date: "02/07/2026", desc: "Thương lượng không thành công do không thống nhất mức tiền bồi thường.", status: "completed" }
                ]
            },
            {
                id: "HS11",
                code: "BT-2026-011",
                fieldGroup: "hành chính",
                date: "12/06/2026",
                nyc: "Trần Thị G",
                cardType: "Cá nhân",
                cardNo: "001095002934",
                address: "Phường Tràng Tiền, Hoàn Kiếm, Hà Nội",
                phone: "0904556677",
                role: "Người bị thiệt hại",
                docBase: "Quyết định thu hồi đất sai luật số 05/QD-TH",
                hanhVi: "Kê biên giải phóng mặt bằng sai diện tích đất thực tế.",
                nhanQua: "Giảm sút diện tích mặt bằng kinh doanh buôn bán.",
                status: "Chờ ban hành QĐ",
                thulyVenue: "cơ quan quản lý",
                totalNum: 300000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Chờ ban hành quyết định bồi thường chính thức",
                restoreHonor: false,
                agency: "Sở Tư pháp Hà Nội",
                deadline: "12/09/2026",
                files: [{ name: "Biên bản thương lượng thành.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "12/06/2026", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "16/06/2026", desc: "Thụ lý giải quyết bồi thường", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "02/07/2026", desc: "Ban hành báo cáo xác minh thiệt hại thực tế", status: "completed" },
                    { title: "Thương lượng bồi thường", date: "05/07/2026", desc: "Thương lượng thành công, ký biên bản thỏa thuận bồi thường.", status: "completed" }
                ]
            },
            {
                id: "HS12",
                code: "BT-2026-012",
                fieldGroup: "thi hành án dân sự",
                date: "25/05/2026",
                nyc: "Lê Văn H",
                cardType: "Cá nhân",
                cardNo: "001091002934",
                address: "Lê Đại Hành, Hai Bà Trưng, Hà Nội",
                phone: "0912233445",
                role: "Người bị thiệt hại",
                docBase: "Quyết định xử lý tài sản kê biên sai quy trình số 15/QD-THADS",
                hanhVi: "Bán đấu giá tài sản kê biên trái quy định.",
                nhanQua: "Mất tài sản sản xuất kinh doanh gây ngừng trệ nhà xưởng.",
                status: "Hoàn thành",
                thulyVenue: "cơ quan quản lý",
                totalNum: 850000000,
                advanceNum: 100000000,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "Hoàn thành chi trả bồi thường",
                restoreHonor: true,
                phddFormApology: false,
                phddFormNews: true,
                phddStep1No: "25/TB-THA",
                phddStep1Date: "28/05/2026",
                phddStep1Signer: "Phạm Hoàng Hải (Cục trưởng)",
                phddStep1File: "Thong_bao_PHDD_HS12.pdf",
                phddStep2Opinion: "Đồng ý",
                phddStep2OpinionText: "Người bị thiệt hại Lê Văn H thống nhất hình thức đăng báo xin lỗi và cải chính công khai.",
                phddStep2File: "Y_kien_phuc_hoi_danh_du_HS12.pdf",
                phddStep3No: "88/QĐ-THA",
                phddStep3Date: "05/06/2026",
                phddStep3Type: "Đăng báo xin lỗi",
                phddStep3DateExp: "12/06/2026",
                phddStep3NewsCentral: "Báo Nhân Dân",
                phddStep3NewsLocal: "Báo Hải Phòng",
                phddStep3NewsUrl: "https://nhandan.vn",
                phddStep3File: "Quyet_dinh_dang_bao_HS12.pdf",
                phddStep4DateAct: "12/06/2026",
                phddStep4NewsCentralAct: "Báo Nhân Dân",
                phddStep4NewsLocalAct: "Báo Hải Phòng",
                phddStep4NewsNumbers: "Số báo 25412 phát hành ngày 12/06/2026",
                phddStep4NewsUrl: "https://nhandan.vn/tin-tuc-cai-chinh-hs12",
                phddStep4CommuneDate: "15/06/2026",
                phddStep4CommuneReceiver: "UBND Phường Lê Đại Hành, Hà Nội",
                phddStep4ResultDesc: "Đã hoàn thành việc đăng xin lỗi và cải chính công khai trên 03 số báo liên tiếp của Báo Nhân Dân và Báo Hải Phòng, đồng thời gửi thông tin kết quả tới UBND cấp xã nơi cư trú.",
                phddStep4File: "Minh_chung_dang_bao_PHDD.pdf",
                agency: "Cục Thi hành án dân sự Hà Nội",
                deadline: "25/08/2026",
                files: [{ name: "Quyet dinh ban hanh gia quyet boi thuong.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "25/05/2026", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "28/05/2026", desc: "Quyết định thụ lý bồi thường", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "20/06/2026", desc: "Hoàn thành báo cáo xác minh thiệt hại", status: "completed" },
                    { title: "Thương lượng bồi thường", date: "30/06/2026", desc: "Thương lượng thành công", status: "completed" },
                    { title: "Quyết định giải quyết bồi thường", date: "05/07/2026", desc: "Ban hành quyết định số 56/QD-BT", status: "completed" },
                    { title: "Thực thi giải quyết bồi thường", date: "20/07/2026", desc: "Đã chi trả xong 850 triệu đồng cho ông Lê Văn H", status: "completed" }
                ],
                thucthiDate: "20/07/2026",
                thucthiNote: "Đã chi trả đủ qua chuyển khoản, khấu trừ 100 triệu đồng đã tạm ứng trước đó.",
                fundRequests: [
                    {
                        code: "KP-2026-088",
                        type: "Cấp tạm ứng",
                        amount: 100000000,
                        approvedAmount: 100000000,
                        date: "30/05/2026",
                        status: "Hoàn thành",
                        source: "Tạm ứng kinh phí Bộ Tài chính",
                        cqCap: "Cục Thi hành án dân sự Hà Nội",
                        payoutDate: "05/06/2026",
                        payoutAmountReal: 100000000,
                        payoutMethod: "Chuyển khoản qua ngân hàng",
                        payoutRecName: "Lê Văn H",
                        payoutBankUser: "LÊ VĂN H",
                        payoutBankAccount: "001100293421",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhánh Hà Nội",
                        notes: "Tạm ứng bồi thường chi phí tinh thần cho ông Lê Văn H."
                    },
                    {
                        code: "KP-2026-092",
                        type: "Cấp kinh phí bồi thường",
                        amount: 750000000,
                        approvedAmount: 750000000,
                        date: "06/07/2026",
                        status: "Hoàn thành",
                        source: "Ngân sách địa phương (Dự phòng)",
                        cqCap: "Sở Tài chính Hà Nội",
                        payoutDate: "20/07/2026",
                        payoutAmountReal: 750000000,
                        payoutMethod: "Chuyển khoản qua ngân hàng",
                        payoutRecName: "Lê Văn H",
                        payoutBankUser: "LÊ VĂN H",
                        payoutBankAccount: "001100293421",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhánh Hà Nội",
                        notes: "Cấp kinh phí bồi thường còn lại (Tổng 850 triệu trừ 100 triệu tạm ứng)."
                    }
                ]
            },
            {
                id: "HS13",
                code: "BT-2026-013",
                fieldGroup: "hình sự",
                date: "02/06/2026",
                nyc: "Trần Văn T",
                cardType: "Cá nhân",
                cardNo: "001095003921",
                address: "Phường Nguyễn Du, Hai Bà Trưng, Hà Nội",
                phone: "0904998877",
                role: "Người bị thiệt hại",
                docBase: "Quyết định hủy bỏ biện pháp ngăn chặn oan sai",
                hanhVi: "Áp dụng biện pháp cấm đi khỏi nơi cư trú trái pháp luật.",
                nhanQua: "Không thể đi làm và thực hiện giao dịch kinh tế đã ký.",
                status: "Từ chối tiếp nhận",
                totalNum: 45000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Từ chối tiếp nhận hồ sơ",
                restoreHonor: false,
                agency: "Viện kiểm sát nhân dân Tối cao",
                deadline: "02/09/2026",
                files: [{ name: "Quyet_dinh_oan_sai.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "02/06/2026", desc: "Hồ sơ nộp trực tuyến", status: "completed" },
                    { title: "Tiếp nhận hồ sơ", date: "05/06/2026", desc: "Từ chối tiếp nhận hồ sơ do hành vi gây thiệt hại xảy ra ngoài phạm vi điều chỉnh.", status: "completed" }
                ],
                rejectType: "Từ chối tiếp nhận",
                rejectReason: "Hồ sơ không đầy đủ thành phần hoặc không thuộc thẩm quyền tiếp nhận theo quy định.",
                rejectDate: "05/06/2026 09:30",
                rejectOfficer: "Trần Thị Chuyên Viên",
                rejectionLog: [
                    {
                        date: "05/06/2026 09:30",
                        officer: "Trần Thị Chuyên Viên",
                        action: "Từ chối tiếp nhận",
                        reason: "Hồ sơ không đầy đủ thành phần hoặc không thuộc thẩm quyền tiếp nhận theo quy định."
                    }
                ]
            },
            {
                id: "HS14",
                code: "BT-2026-014",
                fieldGroup: "hành chính",
                date: "04/06/2026",
                nyc: "Phạm Văn K",
                cardType: "Cá nhân",
                cardNo: "001095004123",
                address: "Phường Láng Hạ, Đống Đa, Hà Nội",
                phone: "0904321321",
                role: "Người bị thiệt hại",
                docBase: "Quyết định xử lý kỷ luật công chức trái thẩm quyền",
                hanhVi: "Kỷ luật hạ bậc lương sai quy định pháp luật.",
                nhanQua: "Bị tổn thất thu nhập và danh dự uy tín tại đơn vị công tác.",
                status: "Từ chối tiếp nhận",
                totalNum: 35000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Từ chối tiếp nhận hồ sơ",
                restoreHonor: false,
                agency: "UBND Thành phố Hà Nội",
                deadline: "04/09/2026",
                files: [{ name: "Don_yeu_cau_boi_thuong_k.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "04/06/2026", desc: "Hồ sơ nộp qua Cổng dịch vụ công trực tuyến", status: "completed" },
                    { title: "Tiếp nhận hồ sơ", date: "08/06/2026", desc: "Từ chối tiếp nhận hồ sơ do không thuộc phạm vi bồi thường nhà nước.", status: "completed" }
                ],
                rejectType: "Từ chối tiếp nhận",
                rejectReason: "Hồ sơ không thuộc phạm vi giải quyết bồi thường của nhà nước theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.",
                rejectDate: "08/06/2026 14:15",
                rejectOfficer: "Trần Thị Chuyên Viên",
                rejectionLog: [
                    {
                        date: "08/06/2026 14:15",
                        officer: "Trần Thị Chuyên Viên",
                        action: "Từ chối tiếp nhận",
                        reason: "Hồ sơ không thuộc phạm vi giải quyết bồi thường của nhà nước theo quy định của Luật Trách nhiệm bồi thường của Nhà nước."
                    }
                ]
            },
            {
                id: "HS15",
                code: "BT-2026-015",
                fieldGroup: "hình sự",
                date: "06/06/2026",
                nyc: "Vũ Thị L",
                cardType: "Cá nhân",
                cardNo: "001096009874",
                address: "Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
                phone: "0987123456",
                role: "Người bị thiệt hại",
                docBase: "Bản án hình sự tuyên vô tội",
                hanhVi: "Bắt giữ khẩn cấp không có phê duyệt của Viện kiểm sát.",
                nhanQua: "Bị giam giữ trái pháp luật trong thời gian 3 ngày.",
                status: "Từ chối tiếp nhận",
                totalNum: 25000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Từ chối tiếp nhận hồ sơ",
                restoreHonor: false,
                agency: "Viện kiểm sát nhân dân Quận 1",
                deadline: "06/09/2026",
                files: [{ name: "Ban_an_tuyen_vo_toi.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "06/06/2026", desc: "Hồ sơ nộp trực tiếp tại bộ phận một cửa", status: "completed" },
                    { title: "Tiếp nhận hồ sơ", date: "10/06/2026", desc: "Từ chối tiếp nhận do thiếu giấy tờ chứng minh thiệt hại thực tế.", status: "completed" }
                ],
                rejectType: "Từ chối tiếp nhận",
                rejectReason: "Hồ sơ thiếu các văn bản làm căn cứ yêu cầu bồi thường theo đúng quy định tại Điều 52 Luật Trách nhiệm bồi thường của Nhà nước.",
                rejectDate: "10/06/2026 16:30",
                rejectOfficer: "Lê Văn Chuyên Viên",
                rejectionLog: [
                    {
                        date: "10/06/2026 16:30",
                        officer: "Lê Văn Chuyên Viên",
                        action: "Từ chối tiếp nhận",
                        reason: "Hồ sơ thiếu các văn bản làm căn cứ yêu cầu bồi thường theo đúng quy định tại Điều 52 Luật Trách nhiệm bồi thường của Nhà nước."
                    }
                ]
            },
            {
                id: "HS16",
                code: "BT-2026-016",
                fieldGroup: "hành chính",
                date: "12/05/2026",
                nyc: "Trần Văn M",
                cardType: "Cá nhân",
                cardNo: "001090008892",
                address: "Phường Vĩnh Tuy, Hai Bà Trưng, Hà Nội",
                phone: "0915667788",
                role: "Người bị thiệt hại",
                docBase: "Quyết định xử lý vi phạm hành chính sai luật số 09/QD-XP",
                hanhVi: "Cưỡng chế đình chỉ hoạt động kinh doanh nhà hàng ăn uống sai thẩm quyền.",
                nhanQua: "Thiệt hại doanh thu và chi phí mặt bằng phát sinh trong 15 ngày đóng cửa.",
                status: "Từ chối thụ lý",
                thulyVenue: "cơ quan quản lý",
                rejectType: "Từ chối thụ lý",
                rejectReason: "Hồ sơ bị từ chối thụ lý do người yêu cầu bồi thường không bổ sung hồ sơ đúng hạn theo thông báo số 44/TB-STP ngày 15/05/2026.",
                rejectDate: "28/05/2026 11:00",
                rejectOfficer: "Nguyễn Văn Thụ Lý (Cán bộ thụ lý)",
                rejectionLog: [
                    {
                        date: "28/05/2026 11:00",
                        officer: "Nguyễn Văn Thụ Lý (Cán bộ thụ lý)",
                        action: "Từ chối thụ lý",
                        reason: "Hồ sơ bị từ chối thụ lý do người yêu cầu bồi thường không bổ sung hồ sơ đúng hạn theo thông báo số 44/TB-STP ngày 15/05/2026."
                    }
                ],
                totalNum: 80000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Từ chối thụ lý do quá hạn bổ sung",
                restoreHonor: false,
                agency: "Sở Tư pháp Hà Nội",
                deadline: "12/08/2026",
                files: [{ name: "Quyet_dinh_tu_choi_thu_ly_16.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "12/05/2026", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Yêu cầu bổ sung hồ sơ", date: "15/05/2026", desc: "Yêu cầu bổ sung Biên bản kiểm toán doanh thu.", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "28/05/2026", desc: "Từ chối thụ lý do không bổ sung hồ sơ đúng thời hạn luật định.", status: "completed" }
                ]
            },
            {
                id: "HS17",
                code: "BT-2026-017",
                fieldGroup: "thi hành án dân sự",
                date: "14/05/2026",
                nyc: "Phạm Hồng N",
                cardType: "Cá nhân",
                cardNo: "001091007788",
                address: "Phường An Lạc, Bình Tân, TP Hồ Chí Minh",
                phone: "0903889900",
                role: "Người bị thiệt hại",
                docBase: "Quyết định đình chỉ thi hành án số 22/QD-CCTHA",
                hanhVi: "Kê biên tài sản của người không có nghĩa vụ thi hành án.",
                nhanQua: "Thiệt hại do tài sản bị phong tỏa gây chậm trễ tiến độ bàn giao.",
                status: "Từ chối thụ lý",
                thulyVenue: "cơ quan quản lý",
                rejectType: "Từ chối thụ lý",
                rejectReason: "Hồ sơ bị từ chối thụ lý do vụ việc đã được giải quyết bằng bản án có hiệu lực pháp luật của Tòa án nhân dân quận Bình Tân.",
                rejectDate: "20/05/2026 15:45",
                rejectOfficer: "Lê Văn Thụ Lý (Cán bộ thụ lý)",
                rejectionLog: [
                    {
                        date: "20/05/2026 15:45",
                        officer: "Lê Văn Thụ Lý (Cán bộ thụ lý)",
                        action: "Từ chối thụ lý",
                        reason: "Hồ sơ bị từ chối thụ lý do vụ việc đã được giải quyết bằng bản án có hiệu lực pháp luật của Tòa án nhân dân quận Bình Tân."
                    }
                ],
                totalNum: 180000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Từ chối thụ lý do đã giải quyết tại Tòa",
                restoreHonor: false,
                agency: "Chi cục Thi hành án dân sự Bình Tân",
                deadline: "14/08/2026",
                files: [{ name: "Quyet_dinh_tu_choi_thu_ly_17.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "14/05/2026", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "20/05/2026", desc: "Từ chối thụ lý do sự việc đã được giải quyết bởi cơ quan tòa án.", status: "completed" }
                ]
            },
            {
                id: "HS18",
                code: "BT-2026-018",
                fieldGroup: "hành chính",
                date: "20/06/2026",
                nyc: "Trần Thu O",
                cardType: "Cá nhân",
                cardNo: "001095007721",
                address: "Phường Lê Lợi, TP Quy Nhơn, Bình Định",
                phone: "0905123456",
                role: "Người bị thiệt hại",
                docBase: "Quyết định xử phạt vi phạm hành chính sai luật số 08/QD-XP",
                hanhVi: "Tịch thu phương tiện ghe đánh bắt cá trái phép khi chưa có chứng cứ.",
                nhanQua: "Thiệt hại do mất thu nhập từ đánh bắt thủy sản trong 20 ngày tạm giữ.",
                status: "Chờ thụ lý",
                thulyVenue: "cơ quan quản lý",
                totalNum: 70000000,
                advanceNum: 0,
                slaDays: 4,
                slaStatus: "normal",
                slaText: "Chờ thụ lý giải quyết bồi thường",
                restoreHonor: false,
                agency: "Chi cục Thủy sản Bình Định",
                deadline: "20/09/2026",
                files: [{ name: "Giấy tờ ghe tàu đăng ký.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "20/06/2026", desc: "Hồ sơ đã được cán bộ một cửa tiếp nhận.", status: "completed" },
                    { title: "Kiểm tra hồ sơ bổ sung", date: "24/06/2026", desc: "Hồ sơ hợp lệ, đang chờ phê duyệt thụ lý.", status: "active" }
                ]
            },
            {
                id: "HS19",
                code: "BT-2026-019",
                fieldGroup: "hình sự",
                date: "22/06/2026",
                nyc: "Phạm Văn P",
                cardType: "Cá nhân",
                cardNo: "001093006677",
                address: "Phường Hòa Minh, Liên Chiểu, Đà Nẵng",
                phone: "0914112233",
                role: "Người bị thiệt hại",
                docBase: "Quyết định đình chỉ vụ án đối với bị can",
                hanhVi: "Khởi tố oan sai hành vi trộm cắp tài sản.",
                nhanQua: "Bị giam giữ oan sai 30 ngày và tạm đình chỉ công tác tại cơ quan.",
                status: "Chờ thụ lý",
                thulyVenue: "tòa án tố tụng",
                totalNum: 55000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Chờ thụ lý giải quyết bồi thường",
                restoreHonor: true,
                agency: "Tòa án nhân dân Quận Liên Chiểu",
                deadline: "22/09/2026",
                files: [{ name: "Quyet_dinh_dinh_chi_vu_an.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "22/06/2026", desc: "Hồ sơ tiếp nhận trực tiếp từ người yêu cầu.", status: "completed" },
                    { title: "Kiểm tra hồ sơ bổ sung", date: "26/06/2026", desc: "Hồ sơ đã qua bước thẩm định thành phần, chờ Thủ trưởng phê duyệt thụ lý.", status: "active" }
                ]
            },
            {
                id: "HS20",
                code: "BT-2026-020",
                fieldGroup: "thi hành án dân sự",
                date: "24/06/2026",
                nyc: "Trần Văn Q",
                cardType: "Cá nhân",
                cardNo: "001095009988",
                address: "Phường Nghĩa Tân, Cầu Giấy, Hà Nội",
                phone: "0904123987",
                role: "Người bị thiệt hại",
                docBase: "Quyết định thu hồi đất đai của cơ quan THADS",
                hanhVi: "Kê biên tài sản quá thời hạn không giải tỏa gây đình trệ sản xuất.",
                nhanQua: "Máy móc sản xuất bị rỉ sét hư hỏng và mất hợp đồng thương mại.",
                status: "Chờ tiếp nhận",
                totalNum: 140000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Chờ tiếp nhận hồ sơ bồi thường",
                restoreHonor: false,
                agency: "Chi cục Thi hành án dân sự Cầu Giấy",
                deadline: "24/09/2026",
                files: [{ name: "Giấy đề nghị bồi thường mẫu 01.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "24/06/2026", desc: "Hồ sơ tiếp nhận trực tuyến qua cổng dịch vụ công.", status: "completed" }
                ]
            },
            {
                id: "HS21",
                code: "BT-2026-021",
                fieldGroup: "hình sự",
                date: "26/06/2026",
                nyc: "Hoàng Văn R",
                cardType: "Cá nhân",
                cardNo: "001096001122",
                address: "Phường Lộc Thọ, Nha Trang, Khánh Hòa",
                phone: "0915998822",
                role: "Người bị thiệt hại",
                docBase: "Quyết định đình chỉ điều tra do hành vi không cấu thành tội phạm",
                hanhVi: "Khởi tố oan sai hành vi cố ý gây thương tích.",
                nhanQua: "Bị tạm giam oan sai 20 ngày và bị sa thải tại công ty cũ.",
                status: "Chờ tiếp nhận",
                totalNum: 65000000,
                advanceNum: 0,
                slaDays: 6,
                slaStatus: "normal",
                slaText: "Chờ tiếp nhận hồ sơ bồi thường",
                restoreHonor: true,
                agency: "Tòa án nhân dân Thành phố Nha Trang",
                deadline: "26/09/2026",
                files: [{ name: "Giấy tờ chứng minh oan sai.pdf", url: "#" }],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "26/06/2026", desc: "Hồ sơ tiếp nhận trực tiếp từ người nộp.", status: "completed" }
                ]
            },
            {
                id: "HS22",
                code: "BT-2026-022",
                fieldGroup: "hành chính",
                date: "20/05/2026",
                nyc: "Trần Văn Phú",
                cardType: "Cá nhân",
                cardNo: "001088002931",
                address: "Số 120 đường Nguyễn Trãi, Thanh Xuân, Hà Nội",
                phone: "0966778899",
                role: "Người bị thiệt hại",
                docBase: "Quyết định buộc thôi việc trái pháp luật số 55/QĐ-CC",
                hanhVi: "Buộc thôi việc trái pháp luật đối với công chức chuyên môn.",
                nhanQua: "Mất tiền lương và các chế độ phụ cấp công tác thực tế.",
                status: "Chờ ban hành QĐ",
                thulyVenue: "cơ quan quản lý",
                totalNum: 180000000,
                advanceNum: 0,
                slaDays: 6,
                slaStatus: "normal",
                slaText: "Chờ ban hành quyết định bồi thường",
                restoreHonor: false,
                agency: "Sở Tư pháp Hà Nội",
                deadline: "20/09/2026",
                files: [{ name: "Quyet_dinh_buoc_thoi_viec_va_ho_so.pdf", url: "#" }],
                tlSessionIndex: 2,
                tlTimeAct: "08/07/2026 14:00",
                tlVenueAct: "Phòng họp số 1 - Sở Tư pháp",
                tlMembersAct: "Đại diện Sở Tư pháp, ông Trần Văn Phú, Chuyên viên thụ lý.",
                tlResult: "Thương lượng thành công",
                tlFiles: [{ name: "Bien_ban_thuong_luong_thanh_cong.pdf", url: "#" }],
                tlHistory: [
                    {
                        sessionIndex: 1,
                        date: "25/06/2026 09:00",
                        venue: "Phòng họp số 3 - Sở Tư pháp",
                        members: "Đại diện Sở, ông Trần Văn Phú, Chuyên viên.",
                        result: "Thương lượng không thành công",
                        disputeProgress: "Hai bên tranh chấp gay gắt về mức bồi thường thiệt hại tinh thần cho thời gian nghỉ việc oan sai.",
                        disagreementReason: "Người yêu cầu đòi bồi thường tinh thần gấp 3 lần mức luật quy định.",
                        files: [{ name: "Bien_ban_thuong_luong_khong_thanh_lan1.pdf", url: "#" }]
                    },
                    {
                        sessionIndex: 2,
                        date: "08/07/2026 14:00",
                        venue: "Phòng họp số 1 - Sở Tư pháp",
                        members: "Đại diện Sở Tư pháp, ông Trần Văn Phú, Chuyên viên.",
                        result: "Thương lượng thành công",
                        disputeProgress: "Cán bộ giải thích cặn kẽ biểu mức luật định và đưa ra phương án hỗ trợ bổ sung quyền lợi bảo hiểm xã hội. Hai bên đồng ý.",
                        files: [{ name: "Bien_ban_thuong_luong_thanh_cong.pdf", url: "#" }]
                    }
                ],
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "20/05/2026", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "23/05/2026", desc: "Thụ lý giải quyết bồi thường", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "15/06/2026", desc: "Ban hành báo cáo xác minh thiệt hại thực tế", status: "completed" },
                    { title: "Thương lượng bồi thường (Lần 1)", date: "25/06/2026", desc: "Thương lượng không thành công do không thống nhất mức bồi thường tinh thần.", status: "completed" },
                    { title: "Thương lượng bồi thường (Lần 2)", date: "08/07/2026", desc: "Thương lượng thành công. Ký biên bản thỏa thuận.", status: "completed" }
                ]
            },
            {
                id: "HS23",
                code: "BT-2026-023",
                fieldGroup: "hình sự",
                date: "22/06/2026",
                nyc: "Phạm Văn Nam",
                cardType: "Cá nhân",
                cardNo: "001093004832",
                address: "Số 56 đường Lê Lợi, Ngô Quyền, Hải Phòng",
                phone: "0987654321",
                role: "Người bị thiệt hại",
                docBase: "Quyết định đình chỉ vụ án bị can oan sai",
                hanhVi: "Bắt giữ oan sai do sai sót nghiệp vụ công tố.",
                status: "Chờ ban hành QĐ",
                thulyVenue: "tòa án tố tụng",
                totalNum: 160000000,
                advanceNum: 0,
                slaDays: 3,
                slaStatus: "normal",
                slaText: "Chờ ban hành quyết định bồi thường",
                restoreHonor: false,
                agency: "Viện kiểm sát nhân dân TP. Hải Phòng",
                deadline: "22/09/2026",
                files: [{ name: "Quyet_dinh_dinh_chi_dieu_tra.pdf", url: "#" }],
                decNo: "88/QĐ-BT",
                decDate: "10/07/2026",
                decAmount: 160000000,
                decContent: "Bồi thường oan sai cho ông Phạm Văn Nam số tiền 160.000.000đ.",
                decStatus: "Chờ ký",
                decPublishDate: "--",
                decEffectiveDate: "--",
                decSigner: "Chưa ký (Chờ duyệt ký số)",
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: "22/06/2026", desc: "Hồ sơ tiếp nhận trực tiếp", status: "completed" },
                    { title: "Thụ lý hồ sơ yêu cầu bồi thường", date: "25/06/2026", desc: "Thụ lý giải quyết bồi thường", status: "completed" },
                    { title: "Xác minh thiệt hại", date: "02/07/2026", desc: "Báo cáo xác minh hoàn thành", status: "completed" },
                    { title: "Thương lượng bồi thường", date: "08/07/2026", desc: "Thương lượng thành công, ký biên bản thỏa thuận.", status: "completed" }
                ]
            }
        ];

        // Dynamically initialize thietHaiList and verification details for mock claims
        claimsList.forEach(claim => {
            if (!claim.thietHaiList && claim.totalNum > 0) {
                if (claim.fieldGroup === 'hình sự') {
                    claim.thietHaiList = [
                        { type: 4, calc: thietHaiNames[3] + ": " + (claim.totalNum * 0.2).toLocaleString('vi-VN') + " đ", val: claim.totalNum * 0.2 },
                        { type: 5, calc: thietHaiNames[4] + ": " + (claim.totalNum * 0.6).toLocaleString('vi-VN') + " đ", val: claim.totalNum * 0.6 },
                        { type: 6, calc: thietHaiNames[5] + ": " + (claim.totalNum * 0.2).toLocaleString('vi-VN') + " đ", val: claim.totalNum * 0.2 }
                    ];
                } else {
                    claim.thietHaiList = [
                        { type: 1, calc: thietHaiNames[0] + ": " + (claim.totalNum * 0.5).toLocaleString('vi-VN') + " đ", val: claim.totalNum * 0.5 },
                        { type: 2, calc: thietHaiNames[1] + ": " + (claim.totalNum * 0.3).toLocaleString('vi-VN') + " đ", val: claim.totalNum * 0.3 },
                        { type: 6, calc: thietHaiNames[5] + ": " + (claim.totalNum * 0.2).toLocaleString('vi-VN') + " đ", val: claim.totalNum * 0.2 }
                    ];
                }
            }

            // Populate verification details if state is post-verification
            const isPostVerification = ['Đang thương lượng', 'Thương lượng không thành công', 'Chờ ban hành QĐ', 'Chờ thực thi', 'Hoàn thành'].includes(claim.status);
            if (isPostVerification) {
                if (claim.thietHaiList) {
                    claim.thietHaiList.forEach(item => {
                        if (item.xmVal === undefined) item.xmVal = item.val;
                        if (!item.xmNote) item.xmNote = "Xác minh đúng giá trị thực tế yêu cầu";
                    });
                }
                if (claim.xmTotalAmount === undefined) {
                    claim.xmTotalAmount = claim.totalNum;
                }
                if (!claim.xmOtherInfo) {
                    claim.xmOtherInfo = "Cơ quan giải quyết đã tiến hành đo đạc trực tiếp, kiểm kê hiện trạng tài sản thiệt hại và thẩm định giá độc lập.";
                }
                if (!claim.xmMethod) {
                    claim.xmMethod = claim.advanceRecKenh || "chuyen-khoan";
                }
                if (!claim.xmFiles || claim.xmFiles.length === 0) {
                    claim.xmFiles = [
                        { name: "Bien_ban_kiem_ke_va_dinh_gia_" + claim.code + ".pdf", url: "#" },
                        { name: "Bao_cao_ket_qua_xac_minh_so_32.pdf", url: "#" }
                    ];
                }
            }
        });

        // State variables
        let currentClaimsPage = 1;
        let claimsPageSize = 5;
        let selectedClaimId = null;
        let editingClaimId = null;
        let isDetailEditMode = false;
        let activeDetailTab = 'chung';
        let activeDetailSubTab = 'kq-xl';
        let claimsSortAsc = false;

        // Active Documents metadata management for Creation Form
        let currentDocsList = [];

        // Simple Number to Vietnamese Words Converter
        function numberToVietnameseWords(num) {
            if (num === 0) return "Không đồng";
            const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
            const thousands = ["", "ngàn", "triệu", "tỷ"];

            let words = "";
            let i = 0;

            let tempNum = num;
            while (tempNum > 0) {
                let chunk = tempNum % 1000;
                if (chunk > 0) {
                    let chunkWords = "";
                    let hundreds = Math.floor(chunk / 100);
                    let remainder = chunk % 100;
                    let tens = Math.floor(remainder / 10);
                    let ones = remainder % 10;

                    if (hundreds > 0) {
                        chunkWords += units[hundreds] + " trăm ";
                    } else if (words !== "") {
                        chunkWords += "không trăm ";
                    }

                    if (tens > 1) {
                        chunkWords += units[tens] + " mươi ";
                        if (ones === 1) chunkWords += "mốt";
                        else if (ones === 5) chunkWords += "lăm";
                        else if (ones > 0) chunkWords += units[ones];
                    } else if (tens === 1) {
                        chunkWords += "mười ";
                        if (ones === 5) chunkWords += "lăm";
                        else if (ones > 0) chunkWords += units[ones];
                    } else {
                        if (ones > 0) {
                            if (hundreds > 0 || words !== "") chunkWords += "lẻ ";
                            chunkWords += units[ones];
                        }
                    }
                    chunkWords += " " + thousands[i] + " ";
                    words = chunkWords + words;
                }
                tempNum = Math.floor(tempNum / 1000);
                i++;
            }
            return words.trim().replace(/\s+/g, ' ') + " đồng";
        }

        // Initialize flatpickr on startup
        document.addEventListener('DOMContentLoaded', () => {
            if (!localStorage.getItem('claimsList_v10')) {
                localStorage.removeItem('claimsList');
                localStorage.setItem('claimsList_v10', 'true');
            }

            flatpickr("#searchFromDate", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#searchToDate", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#searchFromHan", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#searchToHan", { dateFormat: "d/m/Y", allowInput: true });

            flatpickr("#claimNYCBirth", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#claimNYCCardDate", { dateFormat: "d/m/Y", allowInput: true });

            flatpickr("#editTlTimeExp", { dateFormat: "d/m/Y H:i", enableTime: true, allowInput: true });
            flatpickr("#editTlTimeAct", { dateFormat: "d/m/Y H:i", enableTime: true, allowInput: true });
            flatpickr("#decDateInput", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#thucthiDateInput", { dateFormat: "d/m/Y", allowInput: true });

            flatpickr("#editPhddStep1Date", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#editPhddStep3Date", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#editPhddStep3DateExp", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#editPhddStep4DateAct", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#editPhddStep4CommuneDate", { dateFormat: "d/m/Y", allowInput: true });

            // Set default date values for filters
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            const formatDate = (date) => {
                const d = String(date.getDate()).padStart(2, '0');
                const m = String(date.getMonth() + 1).padStart(2, '0');
                const y = date.getFullYear();
                return `${d}/${m}/${y}`;
            };

            document.getElementById('searchFromDate').value = formatDate(firstDayOfMonth);
            document.getElementById('searchToDate').value = formatDate(today);
            document.getElementById('claimCreateDate').value = formatDate(today);

            // Load claimsList from localStorage if present
            const localClaims = localStorage.getItem('claimsList');
            if (localClaims) {
                const loadedList = JSON.parse(localClaims);
                claimsList.forEach(masterClaim => {
                    const existing = loadedList.find(c => c.id === masterClaim.id);
                    if (!existing) {
                        loadedList.push(masterClaim);
                    } else {
                        Object.assign(existing, masterClaim);
                    }
                });
                claimsList = loadedList;
            }

            // Dynamically assign mock dates in current month so they bypass the default date filters on load
            claimsList.forEach((claim, idx) => {
                if (claim.id && claim.id.startsWith('HS')) {
                    const d = String((idx % 5) + 1).padStart(2, '0');
                    const m = String(today.getMonth() + 1).padStart(2, '0');
                    const y = today.getFullYear();
                    claim.date = `${d}/${m}/${y}`;
                    if (claim.timeline && claim.timeline.length > 0) {
                        claim.timeline.forEach((item) => {
                            item.date = `${d}/${m}/${y}`;
                        });
                    }
                }
            });
            localStorage.setItem('claimsList', JSON.stringify(claimsList));

            // Populate table on load
            renderClaimsTable();
        });

        // RENDER CLAIMS TABLE
        function renderClaimsTable() {
            const tbody = document.getElementById('claimsTableBody');
            if (!tbody) return;
            tbody.innerHTML = '';

            let filtered = [...claimsList];

            // Apply advanced search filters
            const code = document.getElementById('searchCode').value.trim().toLowerCase();
            const nyc = document.getElementById('searchNyc').value.trim().toLowerCase();
            const agency = document.getElementById('searchAgency').value.trim().toLowerCase();
            const fieldGroup = document.getElementById('searchFieldGroup').value;
            const status = document.getElementById('searchStatus').value;

            const fromDateInput = document.getElementById('searchFromDate').value;
            const toDateInput = document.getElementById('searchToDate').value;
            const fromHanInput = document.getElementById('searchFromHan').value;
            const toHanInput = document.getElementById('searchToHan').value;

            if (code) {
                filtered = filtered.filter(item => item.code.toLowerCase().includes(code));
            }
            if (nyc) {
                filtered = filtered.filter(item => item.nyc.toLowerCase().includes(nyc));
            }
            if (agency) {
                filtered = filtered.filter(item => item.agency && item.agency.toLowerCase().includes(agency));
            }
            if (fieldGroup) {
                filtered = filtered.filter(item => item.fieldGroup === fieldGroup);
            }
            if (status) {
                filtered = filtered.filter(item => item.status === status);
            }

            const parseDateVi = (str) => {
                if (!str) return null;
                const parts = str.split('/');
                if (parts.length === 3) {
                    return new Date(parts[2], parts[1] - 1, parts[0]);
                }
                return null;
            };

            const fromDateVal = parseDateVi(fromDateInput);
            const toDateVal = parseDateVi(toDateInput);
            const fromHanVal = parseDateVi(fromHanInput);
            const toHanVal = parseDateVi(toHanInput);

            if (fromDateVal) {
                filtered = filtered.filter(item => {
                    const itemDate = parseDateVi(item.date);
                    return itemDate && itemDate >= fromDateVal;
                });
            }
            if (toDateVal) {
                filtered = filtered.filter(item => {
                    const itemDate = parseDateVi(item.date);
                    return itemDate && itemDate <= toDateVal;
                });
            }
            if (fromHanVal) {
                filtered = filtered.filter(item => {
                    const itemHan = parseDateVi(item.deadline);
                    return itemHan && itemHan >= fromHanVal;
                });
            }
            if (toHanVal) {
                filtered = filtered.filter(item => {
                    const itemHan = parseDateVi(item.deadline);
                    return itemHan && itemHan <= toHanVal;
                });
            }

            // Sorting by date
            filtered.sort((a, b) => {
                const dateA = parseDateVi(a.date) || new Date(0);
                const dateB = parseDateVi(b.date) || new Date(0);
                return claimsSortAsc ? (dateA - dateB) : (dateB - dateA);
            });

            // Pagination calculation
            const total = filtered.length;
            document.getElementById('claimsTotalCount').innerText = total;
            const maxPages = Math.ceil(total / claimsPageSize) || 1;

            if (currentClaimsPage > maxPages) currentClaimsPage = maxPages;
            if (currentClaimsPage < 1) currentClaimsPage = 1;

            const startIdx = (currentClaimsPage - 1) * claimsPageSize;
            const endIdx = Math.min(startIdx + claimsPageSize, total);

            if (total === 0) {
                tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:var(--text-muted); padding:30px;">Không tìm thấy hồ sơ nào phù hợp</td></tr>`;
                document.getElementById('claimsCurrentRange').innerText = "0-0";
                return;
            }

            document.getElementById('claimsCurrentRange').innerText = `${startIdx + 1}-${endIdx}`;
            const pageData = filtered.slice(startIdx, endIdx);

            const selMain = document.getElementById('roleSelectorMain');
            const currentRole = selMain ? selMain.value : 'chuyen-vien';

            pageData.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.style.cursor = 'pointer';
                tr.onclick = (e) => {
                    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I' && !e.target.closest('.icon-btn') && e.target.type !== 'checkbox') {
                        showCaseDetail(item.id, false);
                    }
                };

                // Badge Status
                let badgeClass = 'badge-info';
                if (item.status === 'Hoàn thành') badgeClass = 'badge-success';
                else if (item.status === 'Lưu nháp') badgeClass = 'badge-draft';
                else if (item.status === 'Chờ tiếp nhận') badgeClass = 'badge-pending';
                else if (item.status === 'Yêu cầu bổ sung') badgeClass = 'badge-warning';
                else if (item.status === 'Chờ thụ lý') badgeClass = 'badge-pending';
                else if (item.status === 'Bị từ chối' || item.status === 'Từ chối tiếp nhận' || item.status === 'Từ chối thụ lý') badgeClass = 'badge-danger';
                else if (item.status === 'Thương lượng không thành công') badgeClass = 'badge-danger';
                else if (item.status === 'Chờ ban hành QĐ') badgeClass = 'badge-warning';
                else if (item.status === 'Chờ thực thi') badgeClass = 'badge-warning';

                // Fixed slots
                const isDraft = item.status === 'Lưu nháp';
                const isPending = item.status === 'Chờ tiếp nhận';
                const hasUpdateRights = ['Lưu nháp', 'Yêu cầu bổ sung', 'Đang xác minh thiệt hại', 'Đang thương lượng', 'Chờ ban hành QĐ', 'Chờ thực thi', 'Từ chối thụ lý', 'Bị từ chối'].includes(item.status);

                const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyễn Văn Chuyên Viên';
                const isAssignedToOther = (currentRole === 'chuyen-vien') && item.assignedOfficer && (item.assignedOfficer !== currentOfficer);

                const viewBtn = `<button class="icon-btn view" title="Xem chi tiết" onclick="event.stopPropagation(); showCaseDetail('${item.id}', false)"><i class="fa-solid fa-eye"></i></button>`;

                let updateBtn = `<button class="icon-btn edit" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Không được cập nhật ở trạng thái này"><i class="fa-solid fa-pen-to-square"></i></button>`;
                if (hasUpdateRights) {
                    if (isAssignedToOther) {
                        updateBtn = `<button class="icon-btn edit" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Hồ sơ được giao cho cán bộ ${item.assignedOfficer}. Bạn chỉ có quyền Xem."><i class="fa-solid fa-pen-to-square"></i></button>`;
                    } else {
                        if (isDraft || item.status === 'Yêu cầu bổ sung' || item.status === 'Từ chối thụ lý' || item.status === 'Bị từ chối') {
                            updateBtn = `<button class="icon-btn edit" title="Cập nhật hồ sơ" onclick="event.stopPropagation(); openInlineClaimForm('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                        } else {
                            updateBtn = `<button class="icon-btn edit" title="Cập nhật hồ sơ" onclick="event.stopPropagation(); showCaseDetail('${item.id}', true)"><i class="fa-solid fa-pen-to-square"></i></button>`;
                        }
                    }
                }

                let deleteBtn = `<button class="icon-btn delete" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chỉ được xóa hồ sơ Lưu nháp"><i class="fa-solid fa-trash-can"></i></button>`;
                if (isDraft) {
                    if (isAssignedToOther) {
                        deleteBtn = `<button class="icon-btn delete" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Hồ sơ được giao cho cán bộ ${item.assignedOfficer}. Bạn chỉ có quyền Xem."><i class="fa-solid fa-trash-can"></i></button>`;
                    } else {
                        deleteBtn = `<button class="icon-btn delete" title="Xóa yêu cầu" onclick="event.stopPropagation(); deleteClaim('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    }
                }

                let acceptBtn = `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chỉ tiếp nhận khi ở trạng thái Chờ tiếp nhận"><i class="fa-solid fa-square-check"></i></button>`;
                if (isPending) {
                    if (isAssignedToOther) {
                        acceptBtn = `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Hồ sơ được giao cho cán bộ ${item.assignedOfficer}. Bạn chỉ có quyền Xem."><i class="fa-solid fa-square-check"></i></button>`;
                    } else {
                        acceptBtn = `<button class="icon-btn accept" title="Tiếp nhận hồ sơ" onclick="event.stopPropagation(); triggerAcceptClaim('${item.id}')"><i class="fa-solid fa-square-check"></i></button>`;
                    }
                }

                let suppBtn = `<button class="icon-btn supplement" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chỉ yêu cầu bổ sung khi ở trạng thái Chờ tiếp nhận"><i class="fa-solid fa-circle-question"></i></button>`;
                if (isPending) {
                    if (isAssignedToOther) {
                        suppBtn = `<button class="icon-btn supplement" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Hồ sơ được giao cho cán bộ ${item.assignedOfficer}. Bạn chỉ có quyền Xem."><i class="fa-solid fa-circle-question"></i></button>`;
                    } else {
                        suppBtn = `<button class="icon-btn supplement" title="Yêu cầu bổ sung" onclick="event.stopPropagation(); triggerRequireAdditionClaim('${item.id}')"><i class="fa-solid fa-circle-question"></i></button>`;
                    }
                }

                let denyBtn = `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chỉ từ chối tiếp nhận khi ở trạng thái Chờ tiếp nhận"><i class="fa-solid fa-ban"></i></button>`;
                if (isPending) {
                    if (isAssignedToOther) {
                        denyBtn = `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Hồ sơ được giao cho cán bộ ${item.assignedOfficer}. Bạn chỉ có quyền Xem."><i class="fa-solid fa-ban"></i></button>`;
                    } else {
                        denyBtn = `<button class="icon-btn reject" title="Từ chối tiếp nhận" onclick="event.stopPropagation(); triggerRejectClaim('${item.id}', 'Từ chối tiếp nhận')"><i class="fa-solid fa-ban"></i></button>`;
                    }
                }

                let actionsHtml = '';
                if (currentRole === 'thu-truong') {
                    const isChoThuly = item.status === 'Chờ thụ lý';
                    const lThuLyBtn = isChoThuly 
                        ? `<button class="icon-btn accept" title="Thụ lý hồ sơ" onclick="event.stopPropagation(); triggerLeaderAcceptClaim('${item.id}')"><i class="fa-solid fa-square-check"></i></button>`
                        : `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chỉ thụ lý khi hồ sơ ở trạng thái Chờ thụ lý"><i class="fa-solid fa-square-check"></i></button>`;
                    
                    const lTuChoiBtn = isChoThuly
                        ? `<button class="icon-btn reject" title="Từ chối thụ lý" onclick="event.stopPropagation(); triggerRejectClaim('${item.id}', 'Từ chối thụ lý')"><i class="fa-solid fa-ban"></i></button>`
                        : `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chỉ từ chối thụ lý khi hồ sơ ở trạng thái Chờ thụ lý"><i class="fa-solid fa-ban"></i></button>`;

                    actionsHtml = `
                        ${viewBtn}
                        ${lThuLyBtn}
                        ${lTuChoiBtn}
                    `;
                } else {
                    actionsHtml = `
                        ${viewBtn}
                        ${updateBtn}
                        ${deleteBtn}
                        ${acceptBtn}
                        ${suppBtn}
                        ${denyBtn}
                    `;
                }

                const shortenedHanhVi = item.hanhVi.length > 35 ? item.hanhVi.slice(0, 35) + '...' : item.hanhVi;

                tr.innerHTML = `
                    <td style="text-align:center;">${startIdx + index + 1}</td>
                    <td style="text-align:center;"><strong>${item.code}</strong></td>
                    <td><strong>${item.nyc}</strong></td>
                    <td title="${item.hanhVi}">${shortenedHanhVi}</td>
                    <td style="font-size:12px; color:var(--text-muted);">${getFieldGroupName(item.fieldGroup)}</td>
                    <td style="font-size:12px; color:var(--text-muted);">${item.agency || "Chưa phân công"}</td>
                    <td style="font-size:12px; color:var(--text-muted); font-weight: 500;">${item.assignedOfficer || '<span style="color:#94a3b8; font-style:italic;">Chưa phân công</span>'}</td>
                    <td style="text-align:center;">${item.date}</td>
                    <td style="text-align:center; font-weight: 500; color: #b45309;">${item.deadline || "--"}</td>
                    <td style="text-align:center;"><span class="badge ${badgeClass}">${item.status}</span></td>
                    <td style="text-align:center;">
                        <div class="action-flex">
                            ${actionsHtml}
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Update pagination buttons
            const totalPages = Math.ceil(total / claimsPageSize) || 1;
            document.getElementById('claimsPageNum1').classList.toggle('active', currentClaimsPage === 1);
            if (totalPages >= 2) {
                document.getElementById('claimsPageNum2').style.display = 'inline-block';
                document.getElementById('claimsPageNum2').classList.toggle('active', currentClaimsPage === 2);
            } else {
                document.getElementById('claimsPageNum2').style.display = 'none';
            }

            document.getElementById('claimsPageFirst').classList.toggle('disabled', currentClaimsPage === 1);
            document.getElementById('claimsPagePrev').classList.toggle('disabled', currentClaimsPage === 1);
            document.getElementById('claimsPageLast').classList.toggle('disabled', currentClaimsPage === totalPages);
            document.getElementById('claimsPageNext').classList.toggle('disabled', currentClaimsPage === totalPages);
        }

        // Sorting toggle
        function toggleClaimsSort() {
            claimsSortAsc = !claimsSortAsc;
            document.getElementById('claimsSortIcon').className = claimsSortAsc ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
            renderClaimsTable();
        }

        // Filter Actions
        function clearFilters() {
            document.getElementById('searchCode').value = '';
            document.getElementById('searchNyc').value = '';
            document.getElementById('searchAgency').value = '';
            document.getElementById('searchFieldGroup').value = '';
            document.getElementById('searchStatus').value = '';
            document.getElementById('searchFromDate').value = '';
            document.getElementById('searchToDate').value = '';
            document.getElementById('searchFromHan').value = '';
            document.getElementById('searchToHan').value = '';

            currentClaimsPage = 1;
            renderClaimsTable();
        }

        function triggerSearchClaims() {
            currentClaimsPage = 1;
            renderClaimsTable();
        }

        function changeClaimsPageSize(val) {
            claimsPageSize = parseInt(val);
            currentClaimsPage = 1;
            renderClaimsTable();
        }

        function claimsGoPage(page) {
            if (page === 'last') {
                const total = parseInt(document.getElementById('claimsTotalCount').innerText);
                currentClaimsPage = Math.ceil(total / claimsPageSize) || 1;
            } else {
                currentClaimsPage = page;
            }
            renderClaimsTable();
        }

        function claimsPrevPage() {
            if (currentClaimsPage > 1) {
                currentClaimsPage--;
                renderClaimsTable();
            }
        }

        function claimsNextPage() {
            const total = parseInt(document.getElementById('claimsTotalCount').innerText);
            const maxPages = Math.ceil(total / claimsPageSize) || 1;
            if (currentClaimsPage < maxPages) {
                currentClaimsPage++;
                renderClaimsTable();
            }
        }

        // Save claimsList to localStorage
        function saveClaimsToLocal() {
            localStorage.setItem('claimsList', JSON.stringify(claimsList));
        }

        // Action triggers from table
        function triggerAcceptClaim(id) {
            const claim = claimsList.find(c => c.id === id);
            if (claim) {
                changeStatus(id, 'Chờ thụ lý', `Đã tiếp nhận hồ sơ bồi thường thành công!`);
                
                // Auto-generate budget proposal if claim has advance request (advanceNum > 0)
                if (claim.advanceNum > 0) {
                    const localProposals = JSON.parse(localStorage.getItem('proposalsList')) || [];
                    // Check if a proposal for this claim already exists to avoid duplicates
                    const exists = localProposals.some(p => p.ycbtCode === claim.code && (p.type === 'Đề nghị tạm ứng' || p.type === 'Cấp tạm ứng'));
                    if (!exists) {
                        const codeNum = localProposals.length + 1;
                        const newProposal = {
                            id: "P_" + Date.now(),
                            code: `KP-2026-0${codeNum}`,
                            type: "Đề nghị tạm ứng",
                            ycbtCode: claim.code,
                            nycName: claim.nyc,
                            amount: claim.advanceNum,
                            user: claim.assignedOfficer || "Chuyên viên một cửa",
                            date: new Date().toLocaleDateString('vi-VN'),
                            status: "Chờ lập đề nghị",
                            source: "Tạm ứng kinh phí Bộ Tài chính",
                            cqCap: claim.agency || "Sở Tư pháp Hà Nội",
                            notes: `Tự động khởi tạo từ Hồ sơ bồi thường liên kết ${claim.code} có yêu cầu tạm ứng.`,
                            files: [],
                            isPreLinked: true // Custom flag to identify pre-linked flow
                        };
                        localProposals.push(newProposal);
                        localStorage.setItem('proposalsList', JSON.stringify(localProposals));
                    }
                }
            }
        }

        function triggerLeaderAcceptClaim(id) {
            showOfficerSelectModal(id, (claimId, officer) => {
                const claim = claimsList.find(c => c.id === claimId);
                if (claim) {
                    claim.assignedOfficer = officer;
                    changeStatus(claimId, 'Đang xác minh thiệt hại', `Đã thụ lý hồ sơ giải quyết bồi thường và phân công cho Cán bộ ${officer}!`);
                }
            });
        }

        function changeStatus(id, newStatus, message) {
            const item = claimsList.find(c => c.id === id);
            if (item) {
                item.status = newStatus;

                // Add timeline record
                const todayStr = new Date().toLocaleDateString('vi-VN');
                item.timeline.push({
                    title: newStatus,
                    date: todayStr,
                    desc: message,
                    status: "completed"
                });

                showToast(message, "success");
                saveClaimsToLocal();
                renderClaimsTable();

                if (selectedClaimId === id) {
                    showCaseDetail(id, false);
                }
            }
        }

        function triggerRejectClaim(id, rejectType = 'Từ chối tiếp nhận') {
            showRejectionModal(id, rejectType, (claimId, type, reason) => {
                const claim = claimsList.find(c => c.id === claimId);
                if (claim) {
                    const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : (type === 'Từ chối tiếp nhận' ? "Trần Thị Chuyên Viên (Cán bộ một cửa)" : "Nguyễn Văn Thủ Trưởng (Thủ trưởng cơ quan)");
                    const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

                    claim.rejectType = type;
                    claim.rejectReason = reason;
                    claim.rejectDate = todayStr;
                    claim.rejectOfficer = currentOfficer;

                    if (!claim.rejectionLog) claim.rejectionLog = [];
                    claim.rejectionLog.push({
                        date: todayStr,
                        officer: currentOfficer,
                        action: type,
                        reason: reason
                    });

                    changeStatus(claimId, type, `Đã chuyển hồ sơ sang trạng thái [${type}]!`);
                }
            });
        }

        function triggerRequireAdditionClaim(id) {
            showRejectionModal(id, 'Yêu cầu bổ sung', (claimId, type, reason) => {
                const claim = claimsList.find(c => c.id === claimId);
                if (claim) {
                    const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : "Trần Thị Chuyên Viên (Cán bộ một cửa)";
                    const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

                    claim.rejectType = type;
                    claim.rejectReason = reason;
                    claim.rejectDate = todayStr;
                    claim.rejectOfficer = currentOfficer;

                    if (!claim.rejectionLog) claim.rejectionLog = [];
                    claim.rejectionLog.push({
                        date: todayStr,
                        officer: currentOfficer,
                        action: type,
                        reason: reason
                    });

                    changeStatus(claimId, type, `Đã chuyển hồ sơ sang trạng thái [Yêu cầu bổ sung]!`);
                }
            });
        }

        function submitTuChoiThulyTrinhLai() {
            const explanation = document.getElementById('editThulyExplanation').value.trim();
            if (!explanation) {
                const el = document.getElementById('editThulyExplanation');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                el.focus();
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyễn Văn Chuyên Viên';
                const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

                if (!claim.rejectionLog) claim.rejectionLog = [];
                // Save adjustment to history log
                claim.rejectionLog.push({
                    date: todayStr,
                    officer: currentOfficer,
                    action: "Trình lại Lãnh đạo",
                    reason: explanation
                });

                // Clear active reject details since we are submitting again
                claim.rejectReason = '';
                claim.rejectDate = '';
                claim.rejectOfficer = '';
                claim.rejectType = '';

                changeStatus(selectedClaimId, 'Chờ thụ lý', 'Đã cập nhật hồ sơ và trình lại cho Lãnh đạo xét duyệt!');
            }
        }

        function triggerResubmitFromEdit() {
            const explanationEl = document.getElementById('editFormExplanationTextarea');
            const explanation = explanationEl.value.trim();
            if (!explanation) {
                explanationEl.classList.add('is-invalid');
                document.getElementById('editFormExplanationError').style.display = 'block';
                explanationEl.focus();
                return;
            }
            explanationEl.classList.remove('is-invalid');
            document.getElementById('editFormExplanationError').style.display = 'none';

            const claim = claimsList.find(c => c.id === editingClaimId);
            if (!claim) return;

            const requestType = document.querySelector('input[name="claimRequestType"]:checked')
                ? document.querySelector('input[name="claimRequestType"]:checked').value
                : 'both';
            const victimAlive = document.querySelector('input[name="claimVictimAlive"]:checked')
                ? document.querySelector('input[name="claimVictimAlive"]:checked').value
                : 'yes';

            const fieldGroup = document.getElementById('claimFieldGroup').value;
            const cqNhan = document.getElementById('claimCqNhan').value.trim();
            const role = document.getElementById('claimNYCRole').value;

            const name = document.getElementById('claimNYCName').value.trim();
            const birth = document.getElementById('claimNYCBirth').value.trim();
            const cardType = document.getElementById('claimNYCCardType').value;
            const cardNo = document.getElementById('claimNYCCardNo').value.trim();
            const cardDate = document.getElementById('claimNYCCardDate').value.trim();
            const cardPlace = document.getElementById('claimNYCCardPlace').value.trim();
            const phone = document.getElementById('claimNYCPhone').value.trim();
            const address = document.getElementById('claimNYCAddress').value.trim();
            const hanhVi = document.getElementById('claimHanhVi').value.trim();
            const nhanQua = document.getElementById('claimNhanQua').value.trim();
            const docBase = document.getElementById('claimDocBase').value.trim();

            let firstInvalid = null;
            if (!docBase) {
                const el = document.getElementById('claimDocBase');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }
            if (!name) {
                const el = document.getElementById('claimNYCName');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }
            if (!birth) {
                const el = document.getElementById('claimNYCBirth');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }
            if (!cardNo) {
                const el = document.getElementById('claimNYCCardNo');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }
            if (!phone) {
                const el = document.getElementById('claimNYCPhone');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }
            if (!address) {
                const el = document.getElementById('claimNYCAddress');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }
            if (!hanhVi) {
                const el = document.getElementById('claimHanhVi');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }
            if (!nhanQua) {
                const el = document.getElementById('claimNhanQua');
                el.classList.add('is-invalid');
                el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                if (!firstInvalid) firstInvalid = el;
            }

            if (firstInvalid) {
                firstInvalid.focus();
                return;
            }

            let total = 0;
            if (requestType !== 'honor') {
                for (let i = 1; i <= 6; i++) {
                    const checked = document.getElementById(`claimThietHaiCb_${i}`).checked;
                    if (checked) {
                        const calc = document.getElementById(`claimThietHaiCalc_${i}`).value.trim();
                        const valEl = document.getElementById(`claimThietHaiVal_${i}`);
                        const cleanValStr = valEl.value.replace(/\./g, '');
                        const val = parseFloat(cleanValStr) || 0;
                        if (!calc || val <= 0) {
                            showToast(`Thiếu cách tính hoặc số tiền cho mục thiệt hại được tích chọn!`, "error");
                            return;
                        }
                        total += val;
                    }
                }
                if (total === 0) {
                    showToast("Vui lòng tích chọn và nhập tối thiểu một loại thiệt hại!", "error");
                    return;
                }
            }

            claim.fieldGroup = fieldGroup;
            claim.nyc = name;
            claim.cardType = cardType;
            claim.cardNo = cardNo;
            claim.address = address;
            claim.phone = phone;
            claim.role = role;
            claim.docBase = docBase;
            claim.hanhVi = hanhVi;
            claim.nhanQua = nhanQua;
            claim.agency = cqNhan || "Chưa phân công";
            claim.totalNum = total;

            const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyễn Văn Chuyên Viên (Cán bộ thụ lý)';
            const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

            if (!claim.rejectionLog) claim.rejectionLog = [];
            claim.rejectionLog.push({
                date: todayStr,
                officer: currentOfficer,
                action: "Trình lại Lãnh đạo",
                reason: explanation
            });

            claim.rejectReason = '';
            claim.rejectDate = '';
            claim.rejectOfficer = '';
            claim.rejectType = '';
            claim.status = 'Chờ thụ lý';

            saveClaimsToLocal();
            closeInlineClaimForm();
            renderClaimsTable();
            showToast(`Đã cập nhật hồ sơ và trình lại cho Lãnh đạo xét duyệt!`, "success");
        }

        function triggerRejectFromEdit() {
            const explanationEl = document.getElementById('editFormExplanationTextarea');
            const explanation = explanationEl.value.trim();
            if (!explanation) {
                explanationEl.classList.add('is-invalid');
                document.getElementById('editFormExplanationError').style.display = 'block';
                explanationEl.focus();
                return;
            }
            explanationEl.classList.remove('is-invalid');
            document.getElementById('editFormExplanationError').style.display = 'none';

            const claim = claimsList.find(c => c.id === editingClaimId);
            if (!claim) return;

            showRejectionModal(claim.id, 'Từ chối tiếp nhận', (claimId, type, reason) => {
                const requestType = document.querySelector('input[name="claimRequestType"]:checked')
                    ? document.querySelector('input[name="claimRequestType"]:checked').value
                    : 'both';
                const fieldGroup = document.getElementById('claimFieldGroup').value;
                const cqNhan = document.getElementById('claimCqNhan').value.trim();
                const role = document.getElementById('claimNYCRole').value;

                const name = document.getElementById('claimNYCName').value.trim();
                const birth = document.getElementById('claimNYCBirth').value.trim();
                const cardType = document.getElementById('claimNYCCardType').value;
                const cardNo = document.getElementById('claimNYCCardNo').value.trim();
                const phone = document.getElementById('claimNYCPhone').value.trim();
                const address = document.getElementById('claimNYCAddress').value.trim();
                const hanhVi = document.getElementById('claimHanhVi').value.trim();
                const nhanQua = document.getElementById('claimNhanQua').value.trim();
                const docBase = document.getElementById('claimDocBase').value.trim();

                let total = 0;
                if (requestType !== 'honor') {
                    for (let i = 1; i <= 6; i++) {
                        const checked = document.getElementById(`claimThietHaiCb_${i}`).checked;
                        if (checked) {
                            const valEl = document.getElementById(`claimThietHaiVal_${i}`);
                            const cleanValStr = valEl.value.replace(/\./g, '');
                            const val = parseFloat(cleanValStr) || 0;
                            total += val;
                        }
                    }
                }

                claim.fieldGroup = fieldGroup;
                claim.nyc = name;
                claim.cardType = cardType;
                claim.cardNo = cardNo;
                claim.address = address;
                claim.phone = phone;
                claim.role = role;
                claim.docBase = docBase;
                claim.hanhVi = hanhVi;
                claim.nhanQua = nhanQua;
                claim.agency = cqNhan || "Chưa phân công";
                claim.totalNum = total;

                const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyễn Văn Chuyên Viên (Cán bộ một cửa)';
                const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

                claim.rejectType = type;
                claim.rejectReason = reason;
                claim.rejectDate = todayStr;
                claim.rejectOfficer = currentOfficer;

                if (!claim.rejectionLog) claim.rejectionLog = [];
                claim.rejectionLog.push({
                    date: todayStr,
                    officer: currentOfficer,
                    action: "Giải trình điều chỉnh",
                    reason: explanation
                });
                claim.rejectionLog.push({
                    date: todayStr,
                    officer: currentOfficer,
                    action: type,
                    reason: reason
                });

                claim.status = 'Từ chối tiếp nhận';

                saveClaimsToLocal();
                closeInlineClaimForm();
                renderClaimsTable();
                showToast(`Cán bộ đã chuyển hồ sơ sang trạng thái Từ chối tiếp nhận!`, "success");
            });
        }

        function submitTuChoiThulyTuChoiTiepNhan() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                showRejectionModal(claim.id, 'Từ chối tiếp nhận', (claimId, type, reason) => {
                    const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyễn Văn Chuyên Viên (Cán bộ một cửa)';
                    const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

                    claim.rejectType = type;
                    claim.rejectReason = reason;
                    claim.rejectDate = todayStr;
                    claim.rejectOfficer = currentOfficer;

                    if (!claim.rejectionLog) claim.rejectionLog = [];
                    claim.rejectionLog.push({
                        date: todayStr,
                        officer: currentOfficer,
                        action: type,
                        reason: reason
                    });

                    changeStatus(selectedClaimId, 'Từ chối tiếp nhận', 'Cán bộ đã chuyển hồ sơ sang trạng thái Từ chối tiếp nhận!');
                });
            }
        }

        function deleteClaim(id) {
            const index = claimsList.findIndex(c => c.id === id);
            if (index !== -1) {
                showConfirmModal("Bạn có chắc chắn muốn xóa hồ sơ lưu nháp này không?", () => {
                    claimsList.splice(index, 1);
                    showToast("Đã xóa vĩnh viễn hồ sơ lưu nháp!", "success");
                    saveClaimsToLocal();
                    renderClaimsTable();
                });
            }
        }

        // UC438 INLINE FORM LOGIC
        function openInlineClaimForm(id = null) {
            document.getElementById('subTabContentResolver').style.display = 'none';
            document.getElementById('caseDetailSection').style.display = 'none';

            const formPanel = document.getElementById('inlineClaimFormPanel');
            formPanel.style.display = 'flex';

            editingClaimId = id;
            const formTitle = document.querySelector('#inlineClaimFormPanel .info-group-title');
            if (formTitle) {
                formTitle.innerHTML = id ? `<i class="fa-solid fa-pen-to-square"></i> CẬP NHẬT YÊU CẦU GIẢI QUYẾT BỒI THƯỜNG` : `<i class="fa-solid fa-plus"></i> TIẾP NHẬN HỒ SƠ YÊU CẦU BỒI THƯỜNG MỚI (MẪU 01/BTNN)`;
            }

            const claim = id ? claimsList.find(c => c.id === id) : null;

            if (claim) {
                if (claim.status === 'Từ chối thụ lý' || claim.status === 'Bị từ chối') {
                    document.getElementById('editFormThulyRejectBlock').style.display = 'block';
                    document.getElementById('editFormRejectReasonText').innerText = claim.rejectReason || 'Không có lý do.';
                    
                    const explArea = document.getElementById('editFormExplanationTextarea');
                    explArea.value = '';
                    explArea.classList.remove('is-invalid');
                    document.getElementById('editFormExplanationError').style.display = 'none';

                    // Lịch sử Từ chối thụ lý lũy kế
                    const histContainer = document.getElementById('editFormRejectHistoryContainer');
                    const histList = document.getElementById('editFormRejectHistoryList');
                    if (histContainer && histList) {
                        histList.innerHTML = '';
                        // Lọc các log bị từ chối
                        const rejections = (claim.rejectionLog || []).filter(log => log.action === 'Từ chối thụ lý' || log.action === 'Từ chối tiếp nhận' || log.action === 'Bị từ chối');
                        if (rejections.length > 0) {
                            rejections.forEach((rej, index) => {
                                const rejDiv = document.createElement('div');
                                rejDiv.style.cssText = "background: #fff; padding: 10px; border-radius: 4px; border: 1px solid #FDE68A; font-size: 12px; line-height: 1.5;";
                                rejDiv.innerHTML = `
                                    <div style="display: flex; justify-content: space-between; font-weight: 600; color: #78350F; margin-bottom: 4px;">
                                        <span>Lần ${index + 1}: ${rej.date}</span>
                                        <span>Người thực hiện: ${rej.officer}</span>
                                    </div>
                                    <div style="color: #374151;"><strong>Lý do từ chối:</strong> ${rej.reason}</div>
                                `;
                                histList.appendChild(rejDiv);
                            });
                            histContainer.style.display = 'block';
                        } else {
                            histContainer.style.display = 'none';
                        }
                    }

                    document.getElementById('editFormBosungAlertBlock').style.display = 'none';
                    document.getElementById('rejectFlowButtonsContainer').style.display = 'flex';
                    document.getElementById('defaultFormButtons').style.display = 'none';
                    document.getElementById('bosungFlowButtonsContainer').style.display = 'none';

                    // Smooth scroll to reject history block
                    setTimeout(() => {
                        const rejectBlock = document.getElementById('editFormThulyRejectBlock');
                        if (rejectBlock) {
                            rejectBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 250);
                } else if (claim.status === 'Yêu cầu bổ sung') {
                    document.getElementById('editFormBosungAlertBlock').style.display = 'block';
                    document.getElementById('editFormBosungReasonText').innerText = claim.rejectReason || 'Yêu cầu bổ sung hồ sơ';
                    document.getElementById('editFormBosungOfficerText').innerText = claim.rejectOfficer || 'Cán bộ thụ lý';
                    document.getElementById('editFormBosungDateText').innerText = claim.rejectDate || new Date().toLocaleDateString('vi-VN');
                    
                    document.getElementById('editFormThulyRejectBlock').style.display = 'none';
                    document.getElementById('rejectFlowButtonsContainer').style.display = 'none';
                    document.getElementById('defaultFormButtons').style.display = 'none';
                    document.getElementById('bosungFlowButtonsContainer').style.display = 'flex';
                } else {
                    document.getElementById('editFormBosungAlertBlock').style.display = 'none';
                    document.getElementById('editFormThulyRejectBlock').style.display = 'none';
                    document.getElementById('rejectFlowButtonsContainer').style.display = 'none';
                    document.getElementById('defaultFormButtons').style.display = 'flex';
                    document.getElementById('bosungFlowButtonsContainer').style.display = 'none';
                }

                // Populate form inputs from claim
                document.getElementById('claimNYCName').value = claim.nyc || '';
                document.getElementById('claimFieldGroup').value = claim.fieldGroup || 'hành chính';
                document.getElementById('claimNYCBirth').value = claim.nycBirth || '';
                document.getElementById('claimNYCCardType').value = claim.cardType || 'Cá nhân';
                document.getElementById('claimNYCCardNo').value = claim.cardNo || '';
                document.getElementById('claimNYCCardDate').value = claim.nycCardDate || '';
                document.getElementById('claimNYCCardPlace').value = claim.nycCardPlace || '';
                document.getElementById('claimNYCPhone').value = claim.phone || '';
                document.getElementById('claimNYCEmail').value = claim.nycEmail || '';
                document.getElementById('claimNYCAddress').value = claim.address || '';
                document.getElementById('claimHanhVi').value = claim.hanhVi || '';
                document.getElementById('claimNhanQua').value = claim.nhanQua || '';
                document.getElementById('claimDocBase').value = claim.docBase || '';
                document.getElementById('claimCqNhan').value = claim.agency || '';

                const needAdv = claim.advanceNum > 0;
                document.getElementById('claimNeedAdvance').checked = needAdv;
                document.getElementById('claimAdvancePanel').style.display = needAdv ? 'block' : 'none';
                document.getElementById('claimAdvanceTinhThan').value = needAdv ? claim.advanceNum : '';
                document.getElementById('claimAdvanceKhacVal').value = '';
                document.getElementById('claimAdvanceKhacName').value = '';

                // Section IV Recipient fields
                document.getElementById('claimRecName').value = claim.advanceRecName || '';
                document.getElementById('claimRecCard').value = claim.advanceRecCard || '';
                document.getElementById('claimRecAddress').value = claim.advanceRecAddress || '';
                const recKenh = claim.advanceRecKenh || 'tien-mat';
                document.getElementById('claimRecKenh').value = recKenh;
                document.getElementById('claimRecReceiptNo').value = claim.advanceReceiptNo || '';
                document.getElementById('claimRecBankUser').value = claim.advanceBankUser || '';
                document.getElementById('claimRecBankAccount').value = claim.advanceBankAccount || '';
                document.getElementById('claimRecBankName').value = claim.advanceBankName || '';
                document.getElementById('claimRecBankBranch').value = claim.advanceBankBranch || '';
                toggleClaimRecKenh(recKenh);

                for (let i = 1; i <= 6; i++) {
                    const found = claim.thietHaiList ? claim.thietHaiList.find(x => x.type === i) : null;
                    const cb = document.getElementById(`claimThietHaiCb_${i}`);
                    const calcEl = document.getElementById(`claimThietHaiCalc_${i}`);
                    const valEl = document.getElementById(`claimThietHaiVal_${i}`);
                    
                    cb.checked = !!found;
                    calcEl.disabled = !found;
                    valEl.disabled = !found;
                    calcEl.value = found ? found.calc : '';
                    valEl.value = found ? found.val.toLocaleString('vi-VN') : '';
                    calcEl.style.height = '38px';
                }

                sumClaimThietHai();
                toggleRecInfoSection();

                document.getElementById('claimDocHelp').value = '';

                const reqRadios = document.getElementsByName('claimRequestType');
                reqRadios.forEach(r => {
                    r.checked = (r.value === (claim.requestType || 'both'));
                });
                handleRequestTypeChange(claim.requestType || 'both');

                const victimAliveRadios = document.getElementsByName('claimVictimAlive');
                victimAliveRadios.forEach(r => {
                    r.checked = (r.value === (claim.victimAlive || 'yes'));
                });
                handleVictimAliveChange(claim.victimAlive || 'yes');

                document.getElementById('claimNeedRestoreHonor').checked = claim.restoreHonor || false;
                document.getElementById('claimRestoreHonorDescWrapper').style.display = (claim.restoreHonor) ? 'block' : 'none';
                document.getElementById('claimPhddFormApology').checked = claim.phddFormApology || false;
                document.getElementById('claimPhddFormNews').checked = claim.phddFormNews || false;
                
                const opinionRadios = document.getElementsByName('claimPhddOpinion');
                opinionRadios.forEach(r => {
                    r.checked = (r.value === (claim.phddStep2Opinion || 'Đồng ý'));
                });
                document.getElementById('claimRestoreHonorDesc').value = claim.phddStep2OpinionText || '';

                // Docs files checklist
                currentDocsList = [];
                if (claim.files && claim.files.length > 0) {
                    claim.files.forEach(f => {
                        currentDocsList.push({
                            name: "Tài liệu chứng minh",
                            req: true,
                            file: f.name
                        });
                    });
                }
                renderDocsList();

            } else {
                document.getElementById('editFormBosungAlertBlock').style.display = 'none';
                document.getElementById('editFormThulyRejectBlock').style.display = 'none';
                document.getElementById('rejectFlowButtonsContainer').style.display = 'none';
                document.getElementById('defaultFormButtons').style.display = 'flex';

                // Reset form inputs
                document.getElementById('claimNYCName').value = '';
                document.getElementById('claimNYCBirth').value = '';
                document.getElementById('claimNYCCardNo').value = '';
                document.getElementById('claimNYCCardDate').value = '';
                document.getElementById('claimNYCCardPlace').value = '';
                document.getElementById('claimNYCPhone').value = '';
                document.getElementById('claimNYCEmail').value = '';
                document.getElementById('claimNYCAddress').value = '';
                document.getElementById('claimHanhVi').value = '';
                document.getElementById('claimNhanQua').value = '';
                document.getElementById('claimDocBase').value = '';
                document.getElementById('claimCqNhan').value = '';

                document.getElementById('claimNeedAdvance').checked = false;
                document.getElementById('claimAdvancePanel').style.display = 'none';
                document.getElementById('claimAdvanceTinhThan').value = '';
                document.getElementById('claimAdvanceKhacVal').value = '';
                document.getElementById('claimAdvanceKhacName').value = '';
                
                document.getElementById('claimRecName').value = '';
                document.getElementById('claimRecCard').value = '';
                document.getElementById('claimRecAddress').value = '';
                document.getElementById('claimRecKenh').value = 'tien-mat';
                document.getElementById('claimRecReceiptNo').value = '';
                document.getElementById('claimRecBankUser').value = '';
                document.getElementById('claimRecBankAccount').value = '';
                document.getElementById('claimRecBankName').value = '';
                document.getElementById('claimRecBankBranch').value = '';
                document.getElementById('claimRecInfoSection').style.display = 'none';
                toggleClaimRecKenh('tien-mat');

                for (let i = 1; i <= 6; i++) {
                    document.getElementById(`claimThietHaiCb_${i}`).checked = false;
                    const calcEl = document.getElementById(`claimThietHaiCalc_${i}`);
                    calcEl.value = '';
                    calcEl.style.height = '38px';
                    calcEl.disabled = true;
                    document.getElementById(`claimThietHaiVal_${i}`).value = '';
                    document.getElementById(`claimThietHaiVal_${i}`).disabled = true;
                }

                document.getElementById('claimTotalNumText').innerText = "0 đồng";
                document.getElementById('claimTotalWordText').innerText = "Viết bằng chữ: Không đồng";
                document.getElementById('claimDocHelp').value = '';

                const reqRadios = document.getElementsByName('claimRequestType');
                reqRadios.forEach(r => {
                    r.checked = (r.value === 'both');
                });
                handleRequestTypeChange('both');

                const victimAliveRadios = document.getElementsByName('claimVictimAlive');
                victimAliveRadios.forEach(r => {
                    r.checked = (r.value === 'yes');
                });
                handleVictimAliveChange('yes');

                document.getElementById('claimNeedRestoreHonor').checked = false;
                document.getElementById('claimRestoreHonorDescWrapper').style.display = 'none';
                document.getElementById('claimPhddFormApology').checked = true;
                document.getElementById('claimPhddFormNews').checked = false;
                const opinionRadios = document.getElementsByName('claimPhddOpinion');
                if (opinionRadios.length > 0) {
                    opinionRadios[0].checked = true;
                }
                document.getElementById('claimRestoreHonorDesc').value = '';

                initDocsList();
                toggleDocsByRole("Người bị thiệt hại");
            }
            toggleAdvanceByLinhVuc(document.getElementById('claimFieldGroup').value);
        }

        function closeInlineClaimForm() {
            const wasEditingFromDetail = !!editingClaimId && (editingClaimId === selectedClaimId);
            editingClaimId = null;
            document.getElementById('inlineClaimFormPanel').style.display = 'none';
            if (wasEditingFromDetail) {
                document.getElementById('caseDetailSection').style.display = 'block';
                showCaseDetail(selectedClaimId, false);
            } else {
                document.getElementById('subTabContentResolver').style.display = 'block';
                renderClaimsTable();
            }
        }

        // Toggle advance panel visibility by fieldGroup
        function toggleAdvanceByLinhVuc(linhVuc) {
            const section = document.getElementById('advancePaymentSection');
            if (section) {
                section.style.display = 'block';
            }
        }

        // Quick-Fill logic
        function triggerQuickFill() {
            const code = document.getElementById('quickFillCode').value.trim();
            const found = xdRequestList.find(r => r.code === code);
            if (!found) {
                showToast("Không tìm thấy Hồ sơ xác định cơ quan bồi thường nào phù hợp!", "error");
                return;
            }

            document.getElementById('claimFieldGroup').value = found.fieldGroup;
            toggleAdvanceByLinhVuc(found.fieldGroup);

            document.getElementById('claimCqNhan').value = found.procTargetAgency;
            document.getElementById('claimNYCName').value = found.nycName;
            document.getElementById('claimNYCRole').value = found.nycRole;
            document.getElementById('claimNYCGender').value = found.nycGender;
            document.getElementById('claimNYCBirth').value = found.nycBirth;
            document.getElementById('claimNYCCardType').value = found.nycCardType;
            document.getElementById('claimNYCCardNo').value = found.nycCardNo;
            document.getElementById('claimNYCCardDate').value = found.nycCardDate;
            document.getElementById('claimNYCCardPlace').value = found.nycCardPlace;
            document.getElementById('claimNYCPhone').value = found.nycPhone;
            document.getElementById('claimNYCEmail').value = found.nycEmail;

            document.getElementById('claimNYCCountry').value = found.nycCountry;
            toggleClaimCountrySelect(found.nycCountry);
            if (found.nycCountry === 'Việt Nam') {
                document.getElementById('claimNYCCity').value = found.nycTinhThanh;
            } else {
                document.getElementById('claimNYCCityText').value = found.nycTinhThanh;
            }
            document.getElementById('claimNYCAddress').value = found.nycAddressDetail;
            document.getElementById('claimHanhVi').value = found.hanhVi;

            document.getElementById('claimDocBase').value = `Văn bản xác định thẩm quyền số 02/QĐ-XĐCQ ban hành ngày 01/07/2026`;

            initDocsList();
            toggleDocsByRole(found.nycRole);

            showToast("Đã điền nhanh toàn bộ thông tin từ hồ sơ xác minh cơ quan bồi thường!", "success");
        }

        // Toggles Country selections
        function toggleClaimCountrySelect(val) {
            const drop = document.getElementById('claimCityDropdownWrapper');
            const inp = document.getElementById('claimCityInputWrapper');
            if (val === 'Việt Nam') {
                drop.style.display = 'block';
                inp.style.display = 'none';
            } else {
                drop.style.display = 'none';
                inp.style.display = 'block';
            }
        }

        function toggleClaimThietHaiRow(idx) {
            const cb = document.getElementById(`claimThietHaiCb_${idx}`);
            const calc = document.getElementById(`claimThietHaiCalc_${idx}`);
            const val = document.getElementById(`claimThietHaiVal_${idx}`);

            calc.disabled = !cb.checked;
            val.disabled = !cb.checked;

            if (!cb.checked) {
                calc.value = '';
                val.value = '';
                sumClaimThietHai();
            } else {
                calc.focus();
            }

            if (idx === 5) {
                syncAdvanceTinhThanState();
            }
            toggleRecInfoSection();
        }

        function syncAdvanceTinhThanState() {
            const tThanCb = document.getElementById('claimThietHaiCb_5');
            const advInp = document.getElementById('claimAdvanceTinhThan');

            if (!tThanCb.checked) {
                advInp.disabled = true;
                advInp.value = '';
                sumClaimAdvance();
            } else {
                advInp.disabled = false;
            }
        }

        function sumClaimThietHai() {
            let total = 0;
            for (let i = 1; i <= 6; i++) {
                const valEl = document.getElementById(`claimThietHaiVal_${i}`);
                const cleanValStr = valEl.value.replace(/\./g, '');
                const val = parseFloat(cleanValStr) || 0;
                total += val;
            }
            document.getElementById('claimTotalNumText').innerText = `${total.toLocaleString('vi-VN')} đồng`;
            document.getElementById('claimTotalWordText').innerText = `Viết bằng chữ: ${numberToVietnameseWords(total)}`;

            // Keep receiver details synced
            const name = document.getElementById('claimNYCName').value;
            const card = document.getElementById('claimNYCCardNo').value;
            const address = document.getElementById('claimNYCAddress').value;

            const recName = document.getElementById('claimRecName');
            const recCard = document.getElementById('claimRecCard');
            const recAddress = document.getElementById('claimRecAddress');
            
            if (recName && !recName.value) recName.value = name;
            if (recCard && !recCard.value) recCard.value = card;
            if (recAddress && !recAddress.value) recAddress.value = address;

            sumClaimAdvance();
        }

        function toggleClaimAdvancePanel(checked) {
            const panel = document.getElementById('claimAdvancePanel');
            panel.style.display = checked ? 'block' : 'none';
            if (checked) {
                syncAdvanceTinhThanState();
            }
            toggleRecInfoSection();
        }

        function toggleRecInfoSection() {
            const needAdvance = document.getElementById('claimNeedAdvance').checked;
            let anyDamageChecked = false;
            for (let i = 1; i <= 6; i++) {
                const cb = document.getElementById(`claimThietHaiCb_${i}`);
                if (cb && cb.checked) {
                    anyDamageChecked = true;
                    break;
                }
            }

            const recSection = document.getElementById('claimRecInfoSection');
            if (recSection) {
                recSection.style.display = (needAdvance || anyDamageChecked) ? 'block' : 'none';
            }
        }

        function toggleClaimRecKenh(val) {
            const cashDiv = document.getElementById('claimRecCashFields');
            const bankDiv = document.getElementById('claimRecBankFields');
            if (cashDiv && bankDiv) {
                if (val === 'chuyen-khoan') {
                    cashDiv.style.display = 'none';
                    bankDiv.style.display = 'grid';
                } else {
                    cashDiv.style.display = 'block';
                    bankDiv.style.display = 'none';
                }
            }
        }

        function sumClaimAdvance() {
            const tinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
            const khac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
            const total = tinhThan + khac;

            document.getElementById('claimAdvanceTotalText').innerText = `${total.toLocaleString('vi-VN')} đồng (Viết bằng chữ: ${numberToVietnameseWords(total)})`;
        }

        function initDocsList(role = "Người bị thiệt hại") {
            currentDocsList = [];

            // 1. Giấy tờ chứng minh nhân thân của người bị thiệt hại (Chỉ hiển thị khi Tư cách người yêu cầu = "Người bị thiệt hại")
            if (role === "Người bị thiệt hại") {
                currentDocsList.push({
                    name: "Giấy tờ chứng minh nhân thân của người bị thiệt hại",
                    required: true,
                    file: "Giay_to_chung_minh_nhan_than_bi_thiet_hai.pdf",
                    isCustom: false
                });
            }

            // 2. Tài liệu, chứng cứ có liên quan tới yêu cầu bồi thường (nếu có)
            currentDocsList.push({
                name: "Tài liệu, chứng cứ có liên quan tới yêu cầu bồi thường (nếu có)",
                required: false,
                file: "Tai_lieu_chung_cu_kem_theo.pdf",
                isCustom: false
            });

            // 3. Văn bản làm căn cứ yêu cầu bồi thường, trừ trường hợp người bị thiệt hại không được gửi hoặc không thể có văn bản làm căn cứ yêu cầu bồi thường
            currentDocsList.push({
                name: "Văn bản làm căn cứ yêu cầu bồi thường, trừ trường hợp người bị thiệt hại không được gửi hoặc không thể có văn bản làm căn cứ yêu cầu bồi thường",
                required: true,
                file: "Van_ban_lam_can_cu_yeu_cau_boi_thuong.pdf",
                isCustom: false
            });

            // 4. Văn bản yêu cầu bồi thường (Hệ thống tự động gen ra theo Mẫu 01/BTNN)
            currentDocsList.push({
                name: "Văn bản yêu cầu bồi thường (Hệ thống tự động gen ra theo Mẫu 01/BTNN)",
                required: true,
                file: "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf",
                isCustom: false
            });

            // 5. Giấy tờ chứng minh nhân thân của người thừa kế, người đại diện của người bị thiệt hại
            if (role === "Người thừa kế của người bị thiệt hại" ||
                role === "Người đại diện theo pháp luật của người bị thiệt hại" ||
                role === "Cá nhân, pháp nhân được ủy quyền hợp pháp") {
                currentDocsList.push({
                    name: "Giấy tờ chứng minh nhân thân của người thừa kế, người đại diện của người bị thiệt hại",
                    required: true,
                    file: "Chung_minh_nhan_than_nguoi_dai_dien_thua_ke.pdf",
                    isCustom: false
                });
            }

            // 6. Trường hợp người bị thiệt hại chết mà có di chúc thì người yêu cầu bồi thường phải cung cấp di chúc, trường hợp không có di chúc thì phải có văn bản hợp pháp về quyền thừa kế
            if (role === "Người thừa kế của người bị thiệt hại") {
                currentDocsList.push({
                    name: "Trường hợp người bị thiệt hại chết mà có di chúc thì người yêu cầu bồi thường phải cung cấp di chúc, trường hợp không có di chúc thì phải có văn bản hợp pháp về quyền thừa kế",
                    required: true,
                    file: "Di_chuc_hoac_van_ban_thua_ke_hop_phap.pdf",
                    isCustom: false
                });
            }

            // 7. Văn bản ủy quyền hợp pháp trong trường hợp đại diện theo ủy quyền
            if (role === "Cá nhân, pháp nhân được ủy quyền hợp pháp") {
                currentDocsList.push({
                    name: "Văn bản ủy quyền hợp pháp trong trường hợp đại diện theo ủy quyền",
                    required: true,
                    file: "Van_ban_uy_quyen_hop_phap.pdf",
                    isCustom: false
                });
            }
        }

        function toggleDocsByRole(role) {
            initDocsList(role);
            renderDocsTable();
        }

        function renderDocsTable() {
            const tbody = document.getElementById('claimDynamicDocsBody');
            if (!tbody) return;
            tbody.innerHTML = '';

            currentDocsList.forEach((doc, idx) => {
                const tr = document.createElement('tr');

                let nameHtml = '';
                if (doc.isCustom) {
                    nameHtml = '<input type="text" class="form-control" placeholder="Nhập tên tài liệu..." value="' + doc.name + '" oninput="updateCustomDocName(' + idx + ', this.value)">';
                } else {
                    nameHtml = '<strong>' + doc.name + '</strong>';
                    if (doc.required) {
                        nameHtml += ' <span class="badge badge-danger" style="background-color: #ef4444; color: white; border: none; font-size: 11px; padding: 2px 6px; margin-left: 6px;">Bắt buộc</span>';
                    }
                }

                let fileHtml = '';
                let actionsHtml = '';

                if (doc.file) {
                    fileHtml = `
                        <span class="file-name" style="font-weight: 600; color: #166534; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 250px; display: inline-flex; align-items: center;" title="${doc.file}">
                            <i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 6px;"></i>${doc.file}
                        </span>
                    `;
                    actionsHtml = `
                        <div style="display: flex; gap: 8px; justify-content: center; align-items: center; white-space: nowrap;">
                            <a href="javascript:void(0)" onclick="viewDocFile(${idx})" style="color: var(--secondary-color); font-weight: 600; text-decoration: none;" class="action-link"><i class="fa-regular fa-eye"></i> Xem file</a>
                            <span style="color: #cbd5e1;">|</span>
                            <a href="javascript:void(0)" onclick="${doc.isCustom ? `deleteDocRow(${idx})` : `clearDocFile(${idx})`}" style="color: var(--danger-color); font-weight: 600; text-decoration: none;" class="action-link"><i class="fa-solid fa-trash-can"></i> Xóa</a>
                        </div>
                    `;
                } else {
                    fileHtml = `
                        <div style="display: flex; align-items: center; width: 100%;">
                            <button class="btn-upload-rust" onclick="this.nextElementSibling.click()" style="height: 34px; padding: 4px 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;"><i class="fa-solid fa-cloud-arrow-up"></i> Chọn file</button>
                            <input type="file" style="display: none;" onchange="uploadDocFile(this, ${idx})">
                        </div>
                    `;
                    if (doc.isCustom) {
                        actionsHtml = `
                            <div style="display: flex; gap: 8px; justify-content: center; align-items: center; white-space: nowrap;">
                                <span style="font-weight: 600; opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-regular fa-eye"></i> Xem file</span>
                                <span style="color: #cbd5e1;">|</span>
                                <a href="javascript:void(0)" onclick="deleteDocRow(${idx})" style="color: var(--danger-color); font-weight: 600; text-decoration: none;" class="action-link"><i class="fa-solid fa-trash-can"></i> Xóa</a>
                            </div>
                        `;
                    } else {
                        actionsHtml = `
                            <div style="display: flex; gap: 8px; justify-content: center; align-items: center; opacity: 0.35; pointer-events: none; cursor: not-allowed; white-space: nowrap;">
                                <span style="font-weight: 600;"><i class="fa-regular fa-eye"></i> Xem file</span>
                                <span style="color: #cbd5e1;">|</span>
                                <span style="font-weight: 600;"><i class="fa-solid fa-trash-can"></i> Xóa</span>
                            </div>
                        `;
                    }
                }

                tr.innerHTML = `
                    <td style="text-align:center; vertical-align: middle;">${idx + 1}</td>
                    <td style="vertical-align: middle;">${nameHtml}</td>
                    <td style="vertical-align: middle;">${fileHtml}</td>
                    <td style="text-align:center; vertical-align: middle;">${actionsHtml}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        function updateCustomDocName(idx, val) {
            if (currentDocsList[idx]) {
                currentDocsList[idx].name = val;
            }
        }

        function uploadDocFile(input, idx) {
            if (input.files && input.files[0]) {
                const fileName = input.files[0].name;
                if (currentDocsList[idx]) {
                    currentDocsList[idx].file = fileName;
                    renderDocsTable();
                    showToast("Đã đính kèm tệp tin: " + fileName + " thành công!", "success");
                }
            }
        }

        function viewDocFile(idx) {
            const doc = currentDocsList[idx];
            if (!doc || !doc.file) return;

            const win = window.open("", "_blank");

            if (doc.file === "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf") {
                const cqNhan = document.getElementById('claimCqNhan').value || "Sở Tư pháp TP. Hà Nội";
                const role = document.getElementById('claimNYCRole').value || "Người bị thiệt hại";
                const name = document.getElementById('claimNYCName').value || "Nguyễn Văn A";
                const gender = document.getElementById('claimNYCGender').value || "Nam";
                const birth = document.getElementById('claimNYCBirth').value || "01/01/1990";
                const cardType = document.getElementById('claimNYCCardType').value || "CCCD";
                const cardNo = document.getElementById('claimNYCCardNo').value || "001090000123";
                const cardDate = document.getElementById('claimNYCCardDate').value || "01/01/2021";
                const cardPlace = document.getElementById('claimNYCCardPlace').value || "Cục CS QLHC";
                const phone = document.getElementById('claimNYCPhone').value || "0912345678";
                const email = document.getElementById('claimNYCEmail').value || "nva@gmail.com";
                const country = document.getElementById('claimNYCCountry').value || "Việt Nam";
                const city = country === 'Việt Nam' ? document.getElementById('claimNYCCity').value : document.getElementById('claimNYCCityText').value;
                const address = document.getElementById('claimNYCAddress').value || "Hà Nội";
                const hanhVi = document.getElementById('claimHanhVi').value || "Chưa có mô tả hành vi gây thiệt hại";
                const nhanQua = document.getElementById('claimNhanQua').value || "Chưa có mô tả mối quan hệ nhân quả";
                const docBase = document.getElementById('claimDocBase').value || "Chưa nhập văn bản làm căn cứ";

                let total = 0;
                let thietHaiRowsHtml = "";
                for (let i = 1; i <= 6; i++) {
                    const checked = document.getElementById(`claimThietHaiCb_${i}`).checked;
                    if (checked) {
                        const calc = document.getElementById(`claimThietHaiCalc_${i}`).value || "-";
                        const valEl = document.getElementById(`claimThietHaiVal_${i}`);
                        const cleanValStr = valEl.value.replace(/\./g, '');
                        const val = parseFloat(cleanValStr) || 0;
                        total += val;
                        thietHaiRowsHtml += `<tr>
                            <td style="border: 1px solid black; padding: 8px; text-align: center;">${i}</td>
                            <td style="border: 1px solid black; padding: 8px;">${thietHaiNames[i - 1]}</td>
                            <td style="border: 1px solid black; padding: 8px;">${calc}</td>
                            <td style="border: 1px solid black; padding: 8px; text-align: right; font-weight: bold;">${val.toLocaleString('vi-VN')} đ</td>
                        </tr>`;
                    }
                }
                if (thietHaiRowsHtml === "") {
                    thietHaiRowsHtml = `<tr><td colspan="4" style="border: 1px solid black; padding: 8px; text-align: center; font-style: italic;">Chưa khai báo mục thiệt hại nào</td></tr>`;
                }

                const needAdvance = document.getElementById('claimNeedAdvance').checked;
                const advTinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
                const advKhac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
                const advTotal = advTinhThan + advKhac;

                const needRestoreHonor = document.getElementById('claimNeedRestoreHonor').checked;
                const phddFormApology = document.getElementById('claimPhddFormApology').checked;
                const phddFormNews = document.getElementById('claimPhddFormNews').checked;

                const datePlace = document.getElementById('claimCreatePlace').value || "Hà Nội";
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();

                let html = `<html>
                <head>
                    <title>Mẫu số 01/BTNN: Đơn yêu cầu bồi thường</title>
                    <style>
                        body { font-family: 'Times New Roman', Times, serif; padding: 40px; background-color: #fff; color: #000; line-height: 1.5; font-size: 15px; }
                        .container { max-width: 800px; margin: 0 auto; }
                        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                        .header-left { text-align: center; width: 40%; font-weight: bold; }
                        .header-right { text-align: center; width: 55%; }
                        .motto { font-weight: bold; font-size: 14px; text-decoration: underline; margin-top: 4px; }
                        .title { text-align: center; font-weight: bold; font-size: 18px; margin-top: 40px; margin-bottom: 20px; }
                        .section-title { font-weight: bold; margin-top: 20px; text-transform: uppercase; text-decoration: underline; }
                        .field-label { font-weight: bold; }
                        .signature-section { display: flex; justify-content: flex-end; margin-top: 40px; }
                        .signature-box { text-align: center; width: 45%; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 10px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="header-left">
                                <div>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                                <div class="motto" style="text-decoration: none;">Độc lập - Tự do - Hạnh phúc</div>
                            </div>
                            <div class="header-right">
                                <div style="font-size: 13px; font-style: italic;">Mẫu số 01/BTNN (Ban hành kèm theo Thông tư số 04/2018/TT-BTP)</div>
                            </div>
                        </div>

                        <div class="title">
                            <div>ĐƠN YÊU CẦU BỒI THƯỜNG</div>
                            <div style="font-size: 14px; font-weight: normal; margin-top: 6px;">(Dành cho cá nhân, tổ chức bị thiệt hại)</div>
                        </div>

                        <div style="margin-left: 50px; margin-bottom: 25px;">
                            <span class="field-label">Kính gửi:</span> ${cqNhan}
                        </div>

                        <div class="section-title">I. Thông tin người yêu cầu bồi thường</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">1. Họ và tên người yêu cầu:</span> ${name}</div>
                            <div><span class="field-label">2. Ngày, tháng, năm sinh:</span> ${birth} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field-label">Giới tính:</span> ${gender}</div>
                            <div><span class="field-label">3. Tư cách yêu cầu bồi thường:</span> ${role}</div>
                            <div><span class="field-label">4. Giấy tờ thân nhân:</span> ${cardType} số ${cardNo} &nbsp;&nbsp;&nbsp; Ngày cấp: ${cardDate} &nbsp;&nbsp;&nbsp; Nơi cấp: ${cardPlace}</div>
                            <div><span class="field-label">5. Số điện thoại:</span> ${phone} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field-label">Email:</span> ${email}</div>
                            <div><span class="field-label">6. Địa chỉ cư trú/Trụ sở:</span> ${address}, Tỉnh/Thành: ${city}, Quốc gia: ${country}</div>
                        </div>

                        <div class="section-title">II. Hành vi gây thiệt hại và mối quan hệ nhân quả</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">1. Hành vi gây thiệt hại của người thi hành công vụ:</span></div>
                            <div style="margin-left: 15px; font-style: italic; background-color:#f8fafc; padding: 8px; border-radius:4px; border:1px solid #e2e8f0;">${hanhVi}</div>
                            
                            <div style="margin-top: 8px;"><span class="field-label">2. Mối quan hệ nhân quả giữa thiệt hại và hành vi trái pháp luật:</span></div>
                            <div style="margin-left: 15px; font-style: italic; background-color:#f8fafc; padding: 8px; border-radius:4px; border:1px solid #e2e8f0;">${nhanQua}</div>

                            <div style="margin-top: 8px;"><span class="field-label">3. Văn bản làm căn cứ yêu cầu bồi thường:</span> ${docBase}</div>
                        </div>

                        <div class="section-title">III. Các mục thiệt hại yêu cầu bồi thường</div>
                        <table>
                            <thead>
                                <tr>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9; width: 60px;">STT</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9;">Mục thiệt hại yêu cầu</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9;">Cách tính chi tiết</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9; width: 150px;">Số tiền (đồng)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${thietHaiRowsHtml}
                                <tr style="background-color: #f8fafc; font-weight: bold;">
                                    <td colspan="3" style="border: 1px solid black; padding: 8px; text-align: right;">TỔNG CỘNG TIỀN YÊU CẦU BỒI THƯỜNG:</td>
                                    <td style="border: 1px solid black; padding: 8px; text-align: right; color:#ef4444;">${total.toLocaleString('vi-VN')} đ</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="font-style: italic; margin-top: 4px;"><span class="field-label">Viết bằng chữ:</span> ${numberToVietnameseWords(total)}</div>

                        <div class="section-title">IV. Đề nghị tạm ứng kinh phí bồi thường</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">Đề nghị tạm ứng kinh phí:</span> ${needAdvance ? "CÓ" : "KHÔNG"}</div>
                            ${needAdvance ? `<div>- Số tiền đề nghị tạm ứng: <strong style="color:#1e3a8a;">${advTotal.toLocaleString('vi-VN')} đ</strong> (Viết bằng chữ: ${numberToVietnameseWords(advTotal)})</div>` : ''}
                        </div>

                        <div class="section-title">V. Yêu cầu phục hồi danh dự (Điều 57)</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">Yêu cầu Nhà nước tổ chức phục hồi danh dự:</span> ${needRestoreHonor ? "CÓ" : "KHÔNG"}</div>
                            ${needRestoreHonor ? `
                                <div style="margin-top: 4px; margin-left: 15px;">
                                    <div>- <span class="field-label">Hình thức đề nghị phục hồi danh dự mong muốn (Điều 56):</span> 
                                        ${[
                            phddFormApology ? "Trực tiếp xin lỗi và cải chính công khai tại nơi cư trú / trụ sở (Điều 58)" : "",
                            phddFormNews ? "Đăng báo xin lỗi và cải chính công khai (Điều 59)" : ""
                        ].filter(Boolean).join(" và ") || "Chưa lựa chọn"}
                                    </div>
                                </div>
                            ` : ""}
                        </div>

                        <div class="signature-section">
                            <div class="signature-box">
                                <div style="font-style: italic;">${datePlace}, ngày ${day} tháng ${month} năm ${year}</div>
                                <div style="font-weight: bold; margin-top: 8px;">NGƯỜI LÀM ĐƠN</div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">(Ký, ghi rõ họ tên hoặc điểm chỉ)</div>
                                <div style="margin-top: 60px; font-weight: bold; font-size:16px;">${name}</div>
                            </div>
                        </div>
                    </div>
                `;
                win.document.write(html);
                win.document.close();
            } else {
                let html = '<html><head><title>Xem tài liệu: ' + doc.file + '</title>';
                html += '<style>body { font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #f1f5f9; color: #1e293b; margin: 0; }';
                html += '.card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 500px; }';
                html += 'h1 { color: #0f766e; margin-bottom: 16px; font-size: 24px; }';
                html += 'p { color: #64748b; font-size: 15px; line-height: 1.6; }';
                html += '.btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; margin-top: 20px; }</style>';
                html += '</head><body><div class="card">';
                html += '<h1>Xem tài liệu mô phỏng</h1>';
                html += '<p>Tên tài liệu: <strong>' + doc.file + '</strong></p>';
                html += '<p>Thành phần hồ sơ: <strong>' + doc.name + '</strong></p>';
                html += '<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">';
                html += '<p style="font-size: 13px; font-style: italic;">Hệ thống đang mô phỏng xem tệp đính kèm. File thực tế sẽ được tải và hiển thị tại đây.</p>';
                html += '<button onclick="window.close()" class="btn">Đóng cửa sổ</button>';
                html += '</div>';
                win.document.write(html);
                win.document.close();
            }
        }

        function downloadDocFile(idx) {
            const doc = currentDocsList[idx];
            if (doc && doc.file) {
                const link = document.createElement("a");
                link.href = "#";
                link.setAttribute("download", doc.file);
                document.body.appendChild(link);
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }
        }

        function clearDocFile(idx) {
            if (currentDocsList[idx]) {
                const oldFile = currentDocsList[idx].file;
                showConfirmModal("Bạn có chắc chắn muốn xóa tệp đính kèm: " + oldFile + " không?", () => {
                    currentDocsList[idx].file = null;
                    renderDocsTable();
                });
            }
        }

        function deleteDocRow(idx) {
            if (currentDocsList[idx]) {
                const name = currentDocsList[idx].name || ("Tài liệu " + (idx + 1));
                showConfirmModal("Bạn có chắc chắn muốn xóa thành phần hồ sơ: " + name + " không?", () => {
                    currentDocsList.splice(idx, 1);
                    renderDocsTable();
                });
            }
        }

        function addNewDocRow() {
            currentDocsList.push({
                name: "",
                required: false,
                file: null,
                isCustom: true
            });
            renderDocsTable();
            //showToast("Đã thêm hàng tài liệu đính kèm mới!", "success");
        }

        function numberToVietnameseWords(number) {
            if (number === 0) return "Không";
            const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
            const unitsTen = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];

            function readThreeDigits(n, isFirst) {
                let hundreds = Math.floor(n / 100);
                let tens = Math.floor((n % 100) / 10);
                let ones = n % 10;
                let res = "";

                if (hundreds > 0 || !isFirst) {
                    res += units[hundreds] + " trăm ";
                }

                if (tens > 0) {
                    res += unitsTen[tens] + " ";
                } else if (hundreds > 0 && ones > 0) {
                    res += "lẻ ";
                }

                if (ones > 0) {
                    if (ones === 1 && tens > 1) {
                        res += "mốt";
                    } else if (ones === 5 && tens > 0) {
                        res += "lăm";
                    } else {
                        res += units[ones];
                    }
                }
                return res.trim();
            }

            const bigUnits = ["", "nghìn", "triệu", "tỷ"];
            let parts = [];
            let temp = number;
            while (temp > 0) {
                parts.push(temp % 1000);
                temp = Math.floor(temp / 1000);
            }

            let words = "";
            for (let i = parts.length - 1; i >= 0; i--) {
                if (parts[i] > 0) {
                    let partWords = readThreeDigits(parts[i], i === parts.length - 1);
                    words += partWords + " " + bigUnits[i % 4] + " ";
                }
            }

            words = words.trim();
            if (words.length > 0) {
                words = words.charAt(0).toUpperCase() + words.slice(1);
            }
            return words + " đồng";
        }

        function clearClaimValidation() {
            const form = document.getElementById('inlineClaimFormPanel');
            const inputs = form.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.classList.remove('is-invalid');
            });
            const errors = form.querySelectorAll('.error-message');
            errors.forEach(err => {
                err.style.display = 'none';
            });
        }

        function saveNewClaim(isDraft = false) {
            clearClaimValidation();

            const requestType = document.querySelector('input[name="claimRequestType"]:checked')
                ? document.querySelector('input[name="claimRequestType"]:checked').value
                : 'both';
            const victimAlive = document.querySelector('input[name="claimVictimAlive"]:checked')
                ? document.querySelector('input[name="claimVictimAlive"]:checked').value
                : 'yes';

            const nopKenh = document.getElementById('claimNopKenh').value;
            const fieldGroup = document.getElementById('claimFieldGroup').value;
            const cqNhan = document.getElementById('claimCqNhan').value.trim();
            const thulyVenue = document.getElementById('claimThulyVenue') ? document.getElementById('claimThulyVenue').value : 'cơ quan quản lý';
            const role = document.getElementById('claimNYCRole').value;

            const name = document.getElementById('claimNYCName').value.trim();
            const gender = document.getElementById('claimNYCGender').value;
            const birth = document.getElementById('claimNYCBirth').value.trim();
            const cardType = document.getElementById('claimNYCCardType').value;
            const cardNo = document.getElementById('claimNYCCardNo').value.trim();
            const cardDate = document.getElementById('claimNYCCardDate').value.trim();
            const cardPlace = document.getElementById('claimNYCCardPlace').value.trim();
            const phone = document.getElementById('claimNYCPhone').value.trim();
            const email = document.getElementById('claimNYCEmail').value.trim();
            const country = document.getElementById('claimNYCCountry').value;
            const city = country === 'Việt Nam' ? document.getElementById('claimNYCCity').value : document.getElementById('claimNYCCityText').value.trim();
            const address = document.getElementById('claimNYCAddress').value.trim();
            const hanhVi = document.getElementById('claimHanhVi').value.trim();
            const nhanQua = document.getElementById('claimNhanQua').value.trim();
            const docBase = document.getElementById('claimDocBase').value.trim();

            if (!isDraft) {
                let firstInvalid = null;

                if (!docBase) {
                    const el = document.getElementById('claimDocBase');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!name) {
                    const el = document.getElementById('claimNYCName');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!birth) {
                    const el = document.getElementById('claimNYCBirth');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!cardNo) {
                    const el = document.getElementById('claimNYCCardNo');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!cardDate) {
                    const el = document.getElementById('claimNYCCardDate');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!cardPlace) {
                    const el = document.getElementById('claimNYCCardPlace');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!phone) {
                    const el = document.getElementById('claimNYCPhone');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!city) {
                    const el = country === 'Việt Nam' ? document.getElementById('claimNYCCity') : document.getElementById('claimNYCCityText');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!address) {
                    const el = document.getElementById('claimNYCAddress');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!hanhVi) {
                    const el = document.getElementById('claimHanhVi');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }
                if (!nhanQua) {
                    const el = document.getElementById('claimNhanQua');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!firstInvalid) firstInvalid = el;
                }

                if (firstInvalid) {
                    firstInvalid.focus();
                    return;
                }
            }

            let total = 0;
            if (requestType !== 'honor') {
                for (let i = 1; i <= 6; i++) {
                    const checked = document.getElementById(`claimThietHaiCb_${i}`).checked;
                    if (checked) {
                        const calc = document.getElementById(`claimThietHaiCalc_${i}`).value.trim();
                        const valEl = document.getElementById(`claimThietHaiVal_${i}`);
                        const cleanValStr = valEl.value.replace(/\./g, '');
                        const val = parseFloat(cleanValStr) || 0;
                        if (!isDraft && (!calc || val <= 0)) {
                            showToast(`Thiếu cách tính hoặc số tiền cho mục thiệt hại được tích chọn!`, "error");
                            return;
                        }
                        total += val;
                    }
                }

                if (!isDraft && total === 0) {
                    showToast("Vui lòng tích chọn và nhập tối thiểu một loại thiệt hại!", "error");
                    return;
                }
            }

            // Tạm ứng validations
            let adv = 0;
            const needAdvance = document.getElementById('claimNeedAdvance').checked;
            if (requestType !== 'honor' && needAdvance) {
                const tinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
                const khac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
                adv = tinhThan + khac;
                if (!isDraft && adv > total) {
                    showToast("Tổng tiền đề nghị tạm ứng không được lớn hơn tổng tiền yêu cầu bồi thường!", "error");
                    return;
                }
            }

            // Recipient & Payment validations
            const recKenh = document.getElementById('claimRecKenh').value;
            const recName = document.getElementById('claimRecName').value.trim();
            const recCard = document.getElementById('claimRecCard').value.trim();
            const recAddress = document.getElementById('claimRecAddress').value.trim();
            const recReceiptNo = document.getElementById('claimRecReceiptNo').value.trim();
            const recBankUser = document.getElementById('claimRecBankUser').value.trim();
            const recBankAccount = document.getElementById('claimRecBankAccount').value.trim();
            const recBankName = document.getElementById('claimRecBankName').value.trim();
            const recBankBranch = document.getElementById('claimRecBankBranch').value.trim();

            let anyDamageChecked = false;
            if (requestType !== 'honor') {
                for (let i = 1; i <= 6; i++) {
                    if (document.getElementById(`claimThietHaiCb_${i}`).checked) {
                        anyDamageChecked = true;
                        break;
                    }
                }
            }

            if (!isDraft && (needAdvance || anyDamageChecked)) {
                let recInvalid = null;
                if (!recName) {
                    const el = document.getElementById('claimRecName');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!recInvalid) recInvalid = el;
                }
                if (!recCard) {
                    const el = document.getElementById('claimRecCard');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!recInvalid) recInvalid = el;
                }
                if (!recAddress) {
                    const el = document.getElementById('claimRecAddress');
                    el.classList.add('is-invalid');
                    el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                    if (!recInvalid) recInvalid = el;
                }

                if (recKenh === 'chuyen-khoan') {
                    if (!recBankUser) {
                        const el = document.getElementById('claimRecBankUser');
                        el.classList.add('is-invalid');
                        el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                        if (!recInvalid) recInvalid = el;
                    }
                    if (!recBankAccount) {
                        const el = document.getElementById('claimRecBankAccount');
                        el.classList.add('is-invalid');
                        el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                        if (!recInvalid) recInvalid = el;
                    }
                    if (!recBankName) {
                        const el = document.getElementById('claimRecBankName');
                        el.classList.add('is-invalid');
                        el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                        if (!recInvalid) recInvalid = el;
                    }
                    if (!recBankBranch) {
                        const el = document.getElementById('claimRecBankBranch');
                        el.classList.add('is-invalid');
                        el.closest('.form-group').querySelector('.error-message').style.display = 'block';
                        if (!recInvalid) recInvalid = el;
                    }
                }

                if (recInvalid) {
                    recInvalid.focus();
                    return;
                }
            }

            if (editingClaimId) {
                const claim = claimsList.find(c => c.id === editingClaimId);
                if (claim) {
                    claim.fieldGroup = fieldGroup;
                    claim.nyc = name || "(Chưa nhập)";
                    claim.cardType = cardType;
                    claim.cardNo = cardNo;
                    claim.address = address;
                    claim.phone = phone;
                    claim.role = role;
                    claim.docBase = docBase || "Chưa có căn cứ chính thức";
                    claim.hanhVi = hanhVi || "Hành vi gây thiệt hại chưa tóm tắt";
                    claim.nhanQua = nhanQua || "Mối quan hệ nhân quả chưa mô tả";
                    if (claim.status === 'Yêu cầu bổ sung') {
                        claim.status = isDraft ? 'Yêu cầu bổ sung' : 'Chờ tiếp nhận';
                        if (!isDraft) {
                            if (!claim.bosungLogs) claim.bosungLogs = [];
                            claim.bosungLogs.push({
                                date: new Date().toLocaleDateString('vi-VN'),
                                sender: "Người dân bổ sung",
                                content: "Người dân đã cập nhật lại thông tin chi tiết và đính kèm hồ sơ bổ sung trực tiếp trên biểu mẫu yêu cầu."
                            });

                            if (!claim.timeline) claim.timeline = [];
                            claim.timeline.push({
                                title: "Bổ sung hồ sơ",
                                date: new Date().toLocaleDateString('vi-VN'),
                                desc: "Người dân đã bổ sung hồ sơ. Trạng thái quay lại [Chờ tiếp nhận]",
                                status: "completed"
                            });
                        }
                    } else {
                        claim.status = isDraft ? "Lưu nháp" : "Chờ tiếp nhận";
                    }
                    claim.agency = cqNhan || "Chưa phân công";
                    claim.totalNum = total;
                    claim.advanceNum = adv;
                    claim.advanceRecName = recName;
                    claim.advanceRecCard = recCard;
                    claim.advanceRecAddress = recAddress;
                    claim.advanceRecKenh = recKenh;
                    claim.advanceReceiptNo = recReceiptNo;
                    claim.advanceBankUser = recBankUser;
                    claim.advanceBankAccount = recBankAccount;
                    claim.advanceBankName = recBankName;
                    claim.advanceBankBranch = recBankBranch;
                    claim.restoreHonor = requestType === 'honor' ? true : document.getElementById('claimNeedRestoreHonor').checked;
                    claim.phddFormApology = requestType === 'honor' ? document.getElementById('claimPhddFormApology').checked : (document.getElementById('claimNeedRestoreHonor').checked ? document.getElementById('claimPhddFormApology').checked : false);
                    claim.phddFormNews = requestType === 'honor' ? document.getElementById('claimPhddFormNews').checked : (document.getElementById('claimNeedRestoreHonor').checked ? document.getElementById('claimPhddFormNews').checked : false);
                    claim.requestType = requestType;
                    claim.victimAlive = victimAlive;

                    // Update thietHaiList
                    claim.thietHaiList = [];
                    if (requestType !== 'honor') {
                        for (let i = 1; i <= 6; i++) {
                            const checked = document.getElementById(`claimThietHaiCb_${i}`).checked;
                            if (checked) {
                                const calc = document.getElementById(`claimThietHaiCalc_${i}`).value.trim();
                                const valEl = document.getElementById(`claimThietHaiVal_${i}`);
                                const cleanValStr = valEl.value.replace(/\./g, '');
                                const val = parseFloat(cleanValStr) || 0;
                                claim.thietHaiList.push({ type: i, calc: calc, val: val });
                            }
                        }
                    }

                    // Files
                    claim.files = (() => {
                        const finalFiles = [];
                        currentDocsList.forEach(doc => {
                            if (doc.file) {
                                finalFiles.push({ name: doc.file, url: "#" });
                            }
                        });
                        if (finalFiles.length === 0) {
                            finalFiles.push({ name: "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf", url: "#" });
                        }
                        return finalFiles;
                    })();

                    showToast(isDraft ? `Cập nhật nháp hồ sơ ${claim.code} thành công!` : `Nộp hồ sơ bồi thường ${claim.code} thành công!`, "success");
                    editingClaimId = null;
                    saveClaimsToLocal();
                    closeInlineClaimForm();
                    renderClaimsTable();
                    return;
                }
            }

            const newId = "HS" + (claimsList.length + 1);
            const newCode = "BT-2026-0" + (claimsList.length + 1);
            const todayStr = new Date().toLocaleDateString('vi-VN');

            claimsList.unshift({
                id: newId,
                code: newCode,
                fieldGroup: fieldGroup,
                date: todayStr,
                nyc: name || "(Chưa nhập)",
                cardType: cardType,
                cardNo: cardNo,
                address: address,
                phone: phone,
                role: role,
                docBase: docBase || "Chưa có căn cứ chính thức",
                hanhVi: hanhVi || "Hành vi gây thiệt hại chưa tóm tắt",
                nhanQua: nhanQua || "Mối quan hệ nhân quả chưa mô tả",
                status: isDraft ? "Lưu nháp" : "Chờ tiếp nhận",
                agency: cqNhan || "Chưa phân công",
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
                totalNum: total,
                advanceNum: adv,
                advanceRecName: recName,
                advanceRecCard: recCard,
                advanceRecAddress: recAddress,
                advanceRecKenh: recKenh,
                advanceReceiptNo: recReceiptNo,
                advanceBankUser: recBankUser,
                advanceBankAccount: recBankAccount,
                advanceBankName: recBankName,
                advanceBankBranch: recBankBranch,
                restoreHonor: requestType === 'honor' ? true : document.getElementById('claimNeedRestoreHonor').checked,
                phddFormApology: requestType === 'honor' ? document.getElementById('claimPhddFormApology').checked : (document.getElementById('claimNeedRestoreHonor').checked ? document.getElementById('claimPhddFormApology').checked : false),
                phddFormNews: requestType === 'honor' ? document.getElementById('claimPhddFormNews').checked : (document.getElementById('claimNeedRestoreHonor').checked ? document.getElementById('claimPhddFormNews').checked : false),
                requestType: requestType,
                victimAlive: victimAlive,
                files: (() => {
                    const finalFiles = [];
                    currentDocsList.forEach(doc => {
                        if (doc.file) {
                            finalFiles.push({ name: doc.file, url: "#" });
                        }
                    });
                    if (finalFiles.length === 0) {
                        finalFiles.push({ name: "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf", url: "#" });
                    }
                    return finalFiles;
                })(),
                timeline: [
                    { title: "Nộp hồ sơ bồi thường", date: todayStr, desc: isDraft ? "Hồ sơ lưu nháp hệ thống" : "Đã nộp trực tiếp, chờ tiếp nhận", status: "active" }
                ]
            });

            showToast(isDraft ? `Lưu nháp hồ sơ bồi thường ${newCode} thành công!` : `Nộp hồ sơ bồi thường ${newCode} thành công!`, "success");
            saveClaimsToLocal();
            closeInlineClaimForm();
            renderClaimsTable();
        }

        // ==============================================
        // CASE DETAIL & EDIT TABS VIEW LOGIC
        // ==============================================
        function showCaseDetail(id, editMode = false, actionType = null) {
            selectedClaimId = id;
            isDetailEditMode = editMode;

            const claim = claimsList.find(c => c.id === id);
            if (!claim) return;

            if (editMode && (claim.status === 'Yêu cầu bổ sung' || claim.status === 'Từ chối thụ lý' || claim.status === 'Bị từ chối')) {
                openInlineClaimForm(id);
                return;
            }

            const selMain = document.getElementById('roleSelectorMain');
            const currentRole = selMain ? selMain.value : 'chuyen-vien';
            const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyễn Văn Chuyên Viên';
            const isAssignedToOther = (currentRole === 'chuyen-vien') && claim.assignedOfficer && (claim.assignedOfficer !== currentOfficer);

            if (isAssignedToOther && editMode) {
                editMode = false;
                isDetailEditMode = false;
                showToast(`Hồ sơ được giao cho cán bộ khác (${claim.assignedOfficer}). Bạn chỉ có quyền Xem.`, "error");
            }

            document.getElementById('subTabContentResolver').style.display = 'none';
            document.getElementById('inlineClaimFormPanel').style.display = 'none';

            const detailSec = document.getElementById('caseDetailSection');
            detailSec.style.display = 'block';

            document.getElementById('caseDetailTitle').innerHTML = editMode
                ? `<i class="fa-solid fa-pen-to-square"></i> CẬP NHẬT TIẾN TRÌNH HỒ SƠ: ${claim.code} - ${claim.nyc}`
                : `<i class="fa-solid fa-circle-info"></i> CHI TIẾT HỒ SƠ VÀ TIẾN TRÌNH GIẢI QUYẾT: ${claim.code} - ${claim.nyc}`;

            const badgeEl = document.getElementById('caseDetailStatusBadge');
            if (badgeEl) {
                let badgeClass = 'badge-info';
                if (claim.status === 'Hoàn thành') badgeClass = 'badge-success';
                else if (claim.status === 'Lưu nháp') badgeClass = 'badge-draft';
                else if (claim.status === 'Chờ tiếp nhận' || claim.status === 'Chờ thụ lý') badgeClass = 'badge-pending';
                else if (claim.status === 'Yêu cầu bổ sung' || claim.status === 'Chờ ban hành QĐ' || claim.status === 'Chờ thực thi') badgeClass = 'badge-warning';
                else if (claim.status === 'Bị từ chối' || claim.status === 'Từ chối tiếp nhận' || claim.status === 'Từ chối thụ lý' || claim.status === 'Thương lượng không thành công') badgeClass = 'badge-danger';
                
                badgeEl.className = 'badge ' + badgeClass;
                badgeEl.innerText = claim.status;
            }

            renderReadOnlyClaimInfo(claim);
            renderAccordions(claim);
            renderDetailActionBar(claim);

            const tab2Btn = document.getElementById('detailTab2Btn');
            if (claim.status === 'Lưu nháp') {
                if (tab2Btn) tab2Btn.style.display = 'none';
                switchDetailTab('chung');
            } else {
                if (tab2Btn) tab2Btn.style.display = 'inline-block';
                if (editMode) {
                    // Determine which tab and accordion to focus
                    const effectiveAction = actionType || (
                        claim.status === 'Yêu cầu bổ sung' ? 'bosung' :
                        claim.status === 'Đang xác minh thiệt hại' ? 'xacminh' :
                        claim.status === 'Đang thương lượng' ? 'thuongluong' :
                        claim.status === 'Chờ thực thi' ? 'thucthi' : 'chung'
                    );

                    if (effectiveAction === 'bosung') {
                        switchDetailTab('xu-ly');
                        forceOpenAccordion('bosung');
                        setTimeout(() => {
                            const el = document.getElementById('editBoSungContent');
                            if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                        }, 100);
                    } else if (effectiveAction === 'xacminh') {
                        switchDetailTab('xu-ly');
                        forceOpenAccordion('xacminh');
                        setTimeout(() => {
                            const el = document.getElementById('editXacMinhOtherRestore') || document.getElementById('editXacMinhMethod');
                            if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                        }, 100);
                    } else if (effectiveAction === 'thuongluong') {
                        switchDetailTab('xu-ly');
                        forceOpenAccordion('thuongluong');
                        setTimeout(() => {
                            const el = document.getElementById('editTlVenueExp') || document.getElementById('editTlMembersExp');
                            if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                        }, 100);
                    } else if (effectiveAction === 'thucthi') {
                        switchDetailTab('xu-ly');
                        forceOpenAccordion('thucthi');
                        setTimeout(() => {
                            const el = document.getElementById('thucthiNoteInput');
                            if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                        }, 100);
                    } else {
                        switchDetailTab('chung');
                    }
                } else {
                    switchDetailTab('xu-ly');
                    let defaultAcc = 'thuly';
                    if (claim.status === 'Đang xác minh thiệt hại') defaultAcc = 'xacminh';
                    else if (claim.status === 'Đang thương lượng' || claim.status === 'Thương lượng không thành công') defaultAcc = 'thuongluong';
                    else if (claim.status === 'Chờ ban hành QĐ') defaultAcc = 'quyetdinh';
                    else if (claim.status === 'Chờ thực thi' || claim.status === 'Hoàn thành') defaultAcc = 'thucthi';
                    forceOpenAccordion(defaultAcc);
                }
            }
        }

        function closeCaseDetail() {
            document.getElementById('caseDetailSection').style.display = 'none';
            document.getElementById('subTabContentResolver').style.display = 'block';
            renderClaimsTable();
        }

        function closeCaseDetailWithCheck() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (!claim) {
                closeCaseDetail();
                return;
            }

            let isEditing = false;
            if (isDetailEditMode) {
                const draftStatuses = ['Lưu nháp', 'Yêu cầu bổ sung', 'Đang xác minh thiệt hại', 'Đang thương lượng', 'Chờ thực thi'];
                if (draftStatuses.includes(claim.status)) {
                    isEditing = true;
                }
            }
            const phddButtons = document.getElementById('editPhddButtons');
            if (phddButtons && phddButtons.style.display === 'flex') {
                isEditing = true;
            }

            if (isEditing) {
                showConfirmModal(
                    "Thay đổi của bạn chưa được lưu. Bạn có chắc chắn muốn Đóng không?",
                    () => {
                        isDetailEditMode = false;
                        closeCaseDetail();
                    },
                    {
                        title: "Cảnh báo thay đổi chưa lưu",
                        btnYesText: "Có (Đóng)",
                        btnNoText: "Không (Quay lại)",
                        btnYesClass: "btn-danger"
                    }
                );
            } else {
                closeCaseDetail();
            }
        }

        function renderDetailActionBar(claim) {
            const bar = document.getElementById('detailActionBar');
            if (!bar) return;

            const selMain = document.getElementById('roleSelectorMain');
            const currentRole = selMain ? selMain.value : 'chuyen-vien';
            const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyễn Văn Chuyên Viên';
            const isAssignedToOther = (currentRole === 'chuyen-vien') && claim.assignedOfficer && (claim.assignedOfficer !== currentOfficer);

            // Close button (only shown in read-only mode)
            const closeBtnHtml = `<button class="btn btn-secondary" onclick="closeCaseDetailWithCheck()"><i class="fa-solid fa-xmark"></i> Đóng</button>`;
            
            // Cancel button (only shown in edit mode)
            const cancelBtnHtml = `<button class="btn btn-secondary" onclick="switchToReadOnlyMode()">Hủy bỏ</button>`;
            const cancelActionBtnHtml = `<button class="btn btn-secondary" onclick="cancelActionUpdate()">Hủy bỏ</button>`;

            // If assigned to someone else, can only view, so only show Close button
            if (isAssignedToOther) {
                bar.innerHTML = closeBtnHtml;
                return;
            }

            let buttonsHtml = '';
            let showCloseButton = true; // by default we show Close button in read-only

            switch (claim.status) {
                case 'Lưu nháp':
                    buttonsHtml = `
                        <button class="btn btn-primary" onclick="openInlineClaimForm('${claim.id}')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật</button>
                    `;
                    break;

                case 'Chờ tiếp nhận':
                    if (currentRole === 'chuyen-vien') {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="triggerAcceptClaim('${claim.id}')"><i class="fa-solid fa-square-check"></i> Tiếp nhận</button>
                            <button class="btn btn-warning" style="background-color: var(--warning-color); color: white;" onclick="triggerRequireAdditionClaim('${claim.id}')"><i class="fa-solid fa-circle-question"></i> Yêu cầu bổ sung</button>
                            <button class="btn btn-danger" onclick="triggerRejectClaim('${claim.id}', 'Từ chối tiếp nhận')"><i class="fa-solid fa-ban"></i> Từ chối tiếp nhận</button>
                        `;
                    }
                    break;

                case 'Yêu cầu bổ sung':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="submitBoSungUpdate()"><i class="fa-solid fa-circle-check"></i> Bổ sung hồ sơ</button>
                            ${cancelBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('bosung')"><i class="fa-solid fa-circle-check"></i> Bổ sung hồ sơ</button>
                        `;
                    }
                    break;

                case 'Chờ thụ lý':
                    if (currentRole === 'thu-truong') {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="triggerLeaderAcceptClaim('${claim.id}')"><i class="fa-solid fa-circle-check"></i> Thụ lý</button>
                            <button class="btn btn-danger" onclick="triggerRejectClaim('${claim.id}', 'Từ chối thụ lý')"><i class="fa-solid fa-ban"></i> Từ chối thụ lý</button>
                        `;
                    } else {
                        buttonsHtml = '';
                    }
                    break;
                    
                case 'Từ chối tiếp nhận':
                    // Only Close button
                    break;

                case 'Từ chối thụ lý':
                case 'Bị từ chối':
                    if (currentRole === 'chuyen-vien') {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('tuthoithuly')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật</button>
                        `;
                    }
                    break;

                case 'Đang xác minh thiệt hại':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="submitXacMinhUpdate()"><i class="fa-solid fa-circle-check"></i> Hoàn thành xác minh</button>
                            ${cancelActionBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('xacminh')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật xác minh</button>
                        `;
                    }
                    break;

                case 'Đang thương lượng':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-outline-primary" onclick="submitTlDraftUpdate()"><i class="fa-regular fa-bookmark"></i> Cập nhật</button>
                            <button class="btn btn-success" onclick="submitTlCompleteUpdate()"><i class="fa-solid fa-circle-check"></i> Hoàn thành thương lượng</button>
                            ${cancelActionBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('thuongluong')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật kết quả thương lượng</button>
                        `;
                    }
                    break;

                case 'Thương lượng không thành công':
                    buttonsHtml = `
                        <button class="btn btn-primary" onclick="claimRedoNegotiation('${claim.id}')"><i class="fa-solid fa-rotate-left"></i> Cập nhật lại kết quả thương lượng</button>
                    `;
                    break;

                case 'Chờ ban hành QĐ':
                    if (currentRole === 'thu-truong' && claim.decStatus === 'Chờ ký') {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="approveAndSignDecision('${claim.id}')"><i class="fa-solid fa-file-signature"></i> Duyệt ký số QĐ</button>
                            <button class="btn btn-secondary" onclick="closeCaseDetail()"><i class="fa-solid fa-circle-xmark"></i> Đóng</button>
                        `;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-secondary" onclick="closeCaseDetail()"><i class="fa-solid fa-circle-xmark"></i> Đóng</button>
                        `;
                    }
                    showCloseButton = false;
                    break;

                case 'Chờ thực thi':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="submitThucThiUpdate()"><i class="fa-solid fa-circle-check"></i> Hoàn thành thực thi</button>
                            ${cancelActionBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('thucthi')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật kết quả thực thi</button>
                        `;
                    }
                    break;

                case 'Hoàn thành':
                    // Only Close button
                    break;
            }

            bar.innerHTML = buttonsHtml + (showCloseButton ? closeBtnHtml : '');
        }

        function claimRedoNegotiation(id) {
            const claim = claimsList.find(c => c.id === id);
            if (claim) {
                claim.status = 'Đang thương lượng';
                saveClaimsToLocal();
                showToast("Đã thiết lập lại trạng thái hồ sơ về [Đang thương lượng] để cập nhật kết quả mới!", "success");
                showCaseDetail(id, true);
            }
        }

        function switchToEditMode(actionType = null) {
            if (actionType === 'tuthoithuly' || actionType === 'bosung') {
                openInlineClaimForm(selectedClaimId);
            } else {
                showCaseDetail(selectedClaimId, true, actionType);
            }
        }

        function switchDetailTab(tab) {
            activeDetailTab = tab;
            document.getElementById('detailTab1Btn').classList.toggle('active', tab === 'chung');
            document.getElementById('detailTab2Btn').classList.toggle('active', tab === 'xu-ly');

            document.getElementById('detailTabChung').style.display = tab === 'chung' ? 'block' : 'none';
            document.getElementById('detailTabXuLy').style.display = tab === 'xu-ly' ? 'block' : 'none';
        }

        function switchDetailSubTab(sub) {
            activeDetailSubTab = sub;
            document.getElementById('detailSubTab1Btn').classList.toggle('active', sub === 'kq-xl');
            document.getElementById('detailSubTab2Btn').classList.toggle('active', sub === 'phdd');

            document.getElementById('detailSubTabKqXl').style.display = sub === 'kq-xl' ? 'block' : 'none';
            document.getElementById('detailSubTabPhdd').style.display = sub === 'phdd' ? 'block' : 'none';
        }

                function renderReadOnlyClaimInfo(claim) {
            const container = document.getElementById('readOnlyClaimInfo');
            if (!container) return;

            // DRAFT EDIT MODE
            if (claim.status === 'Lưu nháp' && isDetailEditMode) {
                container.innerHTML = `
                    <div style="background:#FAF5FF; border:1px solid #E9D5FF; padding:20px; border-radius:8px; margin-bottom:16px; font-size:13px;">
                        <div style="font-weight:700; color:#7C3AED; font-size:14px; margin-bottom:15px; border-bottom:1px dashed #E9D5FF; padding-bottom:8px;">
                            <i class="fa-solid fa-pen-to-square"></i> ĐANG CHỈNH SỬA HỒ SƠ NHÁP: ${claim.code}
                        </div>
                        
                        <!-- I. THÔNG TIN HỒ SƠ YÊU CẦU -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px;">I. THÔNG TIN HỒ SƠ YÊU CẦU:</div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Hình thức tiếp nhận hồ sơ</span>
                                <select class="form-control" id="claimNopKenh_edit">
                                    <option value="truc-tiep" ${claim.claimNopKenh === 'truc-tiep' ? 'selected' : ''}>Tiếp nhận trực tiếp tại một cửa</option>
                                    <option value="buu-chinh" ${claim.claimNopKenh === 'buu-chinh' ? 'selected' : ''}>Nhận qua bưu điện/bưu chính</option>
                                    <option value="dvc" ${claim.claimNopKenh === 'dvc' ? 'selected' : ''}>Đồng bộ từ Cổng Dịch vụ công trực tuyến</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Lĩnh vực phát sinh thiệt hại</span>
                                <select class="form-control" id="claimFieldGroup_edit">
                                    <option value="hành chính" ${claim.fieldGroup === 'hành chính' ? 'selected' : ''}>TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH</option>
                                    <option value="hình sự" ${claim.fieldGroup === 'hình sự' ? 'selected' : ''}>TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ</option>
                                    <option value="dân sự" ${claim.fieldGroup === 'dân sự' ? 'selected' : ''}>TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ</option>
                                    <option value="tố tụng hành chính" ${claim.fieldGroup === 'tố tụng hành chính' ? 'selected' : ''}>TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH</option>
                                    <option value="thi hành án hình sự" ${claim.fieldGroup === 'thi hành án hình sự' ? 'selected' : ''}>TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ</option>
                                    <option value="thi hành án dân sự" ${claim.fieldGroup === 'thi hành án dân sự' ? 'selected' : ''}>TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Cơ quan giải quyết bồi thường</span>
                                <input type="text" class="form-control" id="claimCqNhan_edit" value="${claim.agency || ''}">
                            </div>
                        </div>
                        <div class="form-group" style="margin-top: 12px; margin-bottom: 16px;">
                            <span class="form-label">Văn bản làm căn cứ yêu cầu bồi thường *</span>
                            <input type="text" class="form-control" id="claimDocBase_edit" value="${claim.docBase || ''}">
                            <div class="error-message">Đây là trường bắt buộc</div>
                        </div>

                        <!-- II. THÔNG TIN CHI TIẾT NGƯỜI YÊU CẦU BỒI THƯỜNG -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">II. THÔNG TIN CHI TIẾT NGƯỜI YÊU CẦU BỒI THƯỜNG:</div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Họ và tên người yêu cầu bồi thường *</span>
                                <input type="text" class="form-control" id="claimNYCName_edit" value="${claim.nyc}">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Tư cách người yêu cầu *</span>
                                <select class="form-control" id="claimNYCRole_edit">
                                    <option value="Người bị thiệt hại" ${claim.nycRole === 'Người bị thiệt hại' ? 'selected' : ''}>Người bị thiệt hại</option>
                                    <option value="Người thừa kế của người bị thiệt hại" ${claim.nycRole === 'Người thừa kế của người bị thiệt hại' ? 'selected' : ''}>Người thừa kế của người bị thiệt hại</option>
                                    <option value="Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại" ${claim.nycRole === 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại' ? 'selected' : ''}>Tổ chức kế thừa quyền, nghĩa vụ...</option>
                                    <option value="Người đại diện theo pháp luật của người bị thiệt hại" ${claim.nycRole === 'Người đại diện theo pháp luật của người bị thiệt hại' ? 'selected' : ''}>Người đại diện theo pháp luật...</option>
                                    <option value="Cá nhân, pháp nhân được ủy quyền hợp pháp" ${claim.nycRole === 'Cá nhân, pháp nhân được ủy quyền hợp pháp' ? 'selected' : ''}>Cá nhân, pháp nhân được ủy quyền hợp pháp</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Giới tính *</span>
                                <select class="form-control" id="claimNYCGender_edit">
                                    <option value="Nam" ${claim.nycGender === 'Nam' ? 'selected' : ''}>Nam</option>
                                    <option value="Nữ" ${claim.nycGender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Ngày tháng năm sinh *</span>
                                <input type="text" class="form-control" id="claimNYCBirth_edit" value="${claim.nycBirth || ''}" placeholder="dd/mm/yyyy">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Trạng thái người bị thiệt hại *</span>
                                <div style="display: flex; gap: 20px; align-items: center; height: 38px; padding-left: 5px;">
                                    <label style="cursor:pointer; font-weight:normal; margin-bottom:0;"><input type="radio" name="claimVictimAlive_edit" value="yes" ${claim.victimAlive !== 'no' ? 'checked' : ''}> Còn sống</label>
                                    <label style="cursor:pointer; font-weight:normal; margin-bottom:0;"><input type="radio" name="claimVictimAlive_edit" value="no" ${claim.victimAlive === 'no' ? 'checked' : ''}> Đã mất</label>
                                </div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Số điện thoại liên hệ *</span>
                                <input type="text" class="form-control" id="claimNYCPhone_edit" value="${claim.nycPhone || ''}">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                        </div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Thư điện tử (Email)</span>
                                <input type="email" class="form-control" id="claimNYCEmail_edit" value="${claim.nycEmail || ''}">
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Loại giấy tờ thân nhân *</span>
                                <select class="form-control" id="claimNYCCardType_edit">
                                    <option value="CCCD" ${claim.nycCardType === 'CCCD' ? 'selected' : ''}>Căn cước công dân (CCCD)</option>
                                    <option value="CMND" ${claim.nycCardType === 'CMND' ? 'selected' : ''}>Chứng minh nhân dân (CMND)</option>
                                    <option value="HoChieu" ${claim.nycCardType === 'HoChieu' ? 'selected' : ''}>Hộ chiếu</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Số giấy tờ thân nhân *</span>
                                <input type="text" class="form-control" id="claimNYCCardNo_edit" value="${claim.nycCardNo || ''}">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                        </div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Ngày cấp *</span>
                                <input type="text" class="form-control" id="claimNYCCardDate_edit" value="${claim.nycCardDate || ''}" placeholder="dd/mm/yyyy">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Nơi cấp *</span>
                                <input type="text" class="form-control" id="claimNYCCardPlace_edit" value="${claim.nycCardPlace || ''}">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Quốc gia *</span>
                                <select class="form-control" id="claimNYCCountry_edit">
                                    <option value="Việt Nam" ${claim.nycCountry === 'Việt Nam' ? 'selected' : ''}>Việt Nam</option>
                                    <option value="Khác" ${claim.nycCountry !== 'Việt Nam' ? 'selected' : ''}>Quốc gia khác</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid-2-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Tỉnh / Thành phố *</span>
                                <input type="text" class="form-control" id="claimNYCCity_edit" value="${claim.nycTinhThanh || ''}">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Địa chỉ chi tiết *</span>
                                <input type="text" class="form-control" id="claimNYCAddressDetail_edit" value="${claim.nycAddressDetail || ''}">
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                        </div>

                        <!-- III. THÔNG TIN VỤ VIỆC GÂY THIỆT HẠI -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">III. THÔNG TIN VỤ VIỆC GÂY THIỆT HẠI:</div>
                        <div class="grid-2-cols" style="margin-bottom:16px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Hành vi gây thiệt hại của người thi hành công vụ *</span>
                                <textarea class="form-control" id="claimHanhVi_edit" rows="2">${claim.hanhVi || ''}</textarea>
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại *</span>
                                <textarea class="form-control" id="claimNhanQua_edit" rows="2">${claim.nhanQua || ''}</textarea>
                                <div class="error-message">Đây là trường bắt buộc</div>
                            </div>
                        </div>

                        <!-- IV. CHI TIẾT THIỆT HẠI YÊU CẦU BỒI THƯỜNG -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">IV. CHI TIẾT THIỆT HẠI YÊU CẦU BỒI THƯỜNG:</div>
                        <div class="table-container" style="margin-bottom:16px;">
                            <table class="custom-table">
                                <thead>
                                    <tr style="background-color: var(--table-header-bg);">
                                        <th style="width: 50px; text-align: center;">Chọn</th>
                                        <th style="width: 250px;">Mục thiệt hại yêu cầu bồi thường</th>
                                        <th style="min-width: 300px;">Cách tính / Diễn giải công thức áp dụng</th>
                                        <th style="width: 200px; text-align: right;">Số tiền yêu cầu bồi thường (đồng)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${(() => {
                                        let rowsHtml = '';
                                        const items = [
                                            "1. Tài sản bị xâm phạm",
                                            "2. Thu nhập thực tế bị mất/giảm sút",
                                            "3. Vật chất do người bị thiệt hại chết",
                                            "4. Vật chất do sức khỏe bị xâm phạm",
                                            "5. Thiệt hại về tinh thần",
                                            "6. Các chi phí hợp lý khác"
                                        ];
                                        items.forEach((itemText, idx) => {
                                            const typeNum = idx + 1;
                                            const found = claim.thietHaiList ? claim.thietHaiList.find(x => x.type === typeNum) : null;
                                            const isChecked = !!found;
                                            const calcVal = isChecked ? found.calc : '';
                                            const amountVal = isChecked ? found.val : 0;
                                            rowsHtml += `
                                                <tr>
                                                    <td style="text-align: center;">
                                                        <input type="checkbox" id="claimThietHaiCb_edit_${typeNum}" onchange="toggleDraftThietHaiRow(${typeNum})" ${isChecked ? 'checked' : ''}>
                                                    </td>
                                                    <td>${itemText}</td>
                                                    <td>
                                                        <textarea class="form-control" id="claimThietHaiCalc_edit_${typeNum}" rows="1" placeholder="Diễn giải..." ${isChecked ? '' : 'disabled'}>${calcVal}</textarea>
                                                    </td>
                                                    <td>
                                                        <input type="text" class="form-control" style="text-align: right;" id="claimThietHaiVal_edit_${typeNum}" value="${amountVal > 0 ? amountVal.toLocaleString('vi-VN') : '0'}" oninput="formatCurrencyInput(this); recalculateDraftTotal();" ${isChecked ? '' : 'disabled'}>
                                                    </td>
                                                </tr>
                                            `;
                                        });
                                        return rowsHtml;
                                    })()}
                                    <tr style="background-color: #F8FAFC; font-weight: 700;">
                                        <td colspan="3" style="text-align: right;">TỔNG CỘNG SỐ TIỀN YÊU CẦU BỒI THƯỜNG:</td>
                                        <td>
                                            <div style="display: flex; flex-direction: column; gap: 4px; text-align: right;">
                                                <div style="font-size: 15px; color: var(--danger-color);" id="claimTotalNumText_edit">${(claim.totalNum || 0).toLocaleString('vi-VN')} đồng</div>
                                                <div style="font-size: 11.5px; font-style: italic; font-weight: normal; color: var(--text-muted);" id="claimTotalWordText_edit">Viết bằng chữ: ${numberToVietnameseWords(claim.totalNum || 0)}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div style="margin-bottom:15px; padding-left: 5px;">
                            <label style="font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:8px;"><input type="checkbox" id="claimRestoreHonor_edit" ${claim.restoreHonor ? 'checked' : ''}> Có yêu cầu phục hồi danh dự</label>
                        </div>

                        <!-- V. ĐỀ NGHỊ TẠM ỨNG KINH PHÍ -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">V. ĐỀ NGHỊ TẠM ỨNG KINH PHÍ & THÔNG TIN CHI TRẢ:</div>
                        <div style="background-color: white; border: 1px solid #E9D5FF; padding: 16px; border-radius: 6px; margin-bottom:15px;">
                            <label style="font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size:13px;">
                                <input type="checkbox" id="claimNeedAdvance_edit" onchange="toggleDraftAdvancePanel(this.checked)" ${claim.advanceNum > 0 ? 'checked' : ''}> Có đề nghị tạm ứng kinh phí bồi thường (Điều 44)
                            </label>
                            
                            <div id="claimAdvancePanel_edit" style="display: ${claim.advanceNum > 0 ? 'block' : 'none'}; border-top: 1px dashed #D8B4FE; padding-top: 14px; margin-top: 12px;">
                                <div class="grid-2-cols" style="margin-bottom: 12px;">
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Tạm ứng Thiệt hại tinh thần (đồng)</span>
                                        <input type="text" class="form-control" style="text-align: right;" id="claimAdvanceTinhThan_edit" value="${(claim.advanceTinhThan || 0).toLocaleString('vi-VN')}" oninput="formatCurrencyInput(this); sumDraftAdvance();">
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Tạm ứng Thiệt hại khác (chọn loại ở trên)</span>
                                        <div style="display: flex; gap: 8px;">
                                            <select class="form-control" style="flex: 1.2;" id="claimAdvanceKhacName_edit">
                                                <option value="">-- Chọn mục thiệt hại --</option>
                                                <option value="1" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 1) ? '' : 'disabled'}>1. Tài sản bị xâm phạm</option>
                                                <option value="2" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 2) ? '' : 'disabled'}>2. Thu nhập thực tế bị mất/giảm sút</option>
                                                <option value="3" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 3) ? '' : 'disabled'}>3. Vật chất do người bị thiệt hại chết</option>
                                                <option value="4" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 4) ? '' : 'disabled'}>4. Vật chất do sức khỏe bị xâm phạm</option>
                                                <option value="6" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 6) ? '' : 'disabled'}>6. Các chi phí hợp lý khác</option>
                                            </select>
                                            <input type="text" class="form-control" style="flex: 1; text-align: right;" id="claimAdvanceKhacVal_edit" value="${(claim.advanceKhac || 0).toLocaleString('vi-VN')}" placeholder="Số tiền..." oninput="formatCurrencyInput(this); sumDraftAdvance();">
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="background-color: #FAF5FF; padding: 10px; border-radius: 4px; margin-bottom: 16px; border:1px solid #E9D5FF; font-size:12.5px;">
                                    <span style="font-weight: bold; color: var(--text-muted);">TỔNG SỐ TIỀN ĐỀ NGHỊ TẠM ỨNG:</span>
                                    <span id="claimAdvanceTotalText_edit" style="font-weight: 700; color: var(--primary-light); margin-left: 8px;">${(claim.advanceNum || 0).toLocaleString('vi-VN')} đồng</span>
                                </div>
                                
                                <div style="font-weight: 600; color: var(--primary-color); font-size: 13px; margin-bottom: 10px;">Thông tin người nhận và Phương thức chi trả:</div>
                                <div class="grid-3-cols" style="margin-bottom: 12px;">
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Họ và tên người nhận *</span>
                                        <input type="text" class="form-control" id="claimRecName_edit" value="${claim.advanceRecName || claim.nyc}">
                                        <div class="error-message">Đây là trường bắt buộc</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Giấy tờ thân nhân người nhận *</span>
                                        <input type="text" class="form-control" id="claimRecCard_edit" value="${claim.advanceRecCard || claim.nycCardNo}">
                                        <div class="error-message">Đây là trường bắt buộc</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Địa chỉ người nhận *</span>
                                        <input type="text" class="form-control" id="claimRecAddress_edit" value="${claim.advanceRecAddress || claim.nycAddressDetail}">
                                        <div class="error-message">Đây là trường bắt buộc</div>
                                    </div>
                                </div>
                                
                                <div class="form-group" style="margin-top:12px; margin-bottom: 12px; max-width: 300px;">
                                    <span class="form-label">Phương thức nhận tiền *</span>
                                    <select class="form-control" id="claimRecMethod_edit" onchange="toggleDraftRecMethod(this.value)">
                                        <option value="tien-mat" ${claim.advanceRecKenh === 'tien-mat' ? 'selected' : ''}>Nhận tiền mặt</option>
                                        <option value="chuyen-khoan" ${claim.advanceRecKenh === 'chuyen-khoan' ? 'selected' : ''}>Nhận qua chuyển khoản</option>
                                    </select>
                                </div>
                                
                                <div id="claimRecCashFields_edit" style="display: ${claim.advanceRecKenh !== 'chuyen-khoan' ? 'block' : 'none'}; max-width: 300px;" class="form-group" style="margin-bottom: 0;">
                                    <span class="form-label">Số biên lai nhận tiền mặt</span>
                                    <input type="text" class="form-control" id="claimRecReceiptNo_edit" value="${claim.advanceReceiptNo || ''}">
                                </div>
                                
                                <div id="claimRecBankFields_edit" style="display: ${claim.advanceRecKenh === 'chuyen-khoan' ? 'grid' : 'none'}; margin-bottom: 0;" class="grid-4-cols">
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Chủ tài khoản *</span>
                                        <input type="text" class="form-control" id="claimRecBankUser_edit" value="${claim.advanceBankUser || ''}">
                                        <div class="error-message">Đây là trường bắt buộc</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Số tài khoản *</span>
                                        <input type="text" class="form-control" id="claimRecBankAccount_edit" value="${claim.advanceBankAccount || ''}">
                                        <div class="error-message">Đây là trường bắt buộc</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Tên ngân hàng *</span>
                                        <input type="text" class="form-control" id="claimRecBankName_edit" value="${claim.advanceBankName || ''}">
                                        <div class="error-message">Đây là trường bắt buộc</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Chi nhánh *</span>
                                        <input type="text" class="form-control" id="claimRecBankBranch_edit" value="${claim.advanceBankBranch || ''}">
                                        <div class="error-message">Đây là trường bắt buộc</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SAVE & CANCEL BUTTONS -->
                    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                        <button class="btn btn-secondary" onclick="switchToReadOnlyMode()">Hủy bỏ</button>
                        <button class="btn btn-success" onclick="saveDraftChanges()">Lưu thay đổi</button>
                    </div>
                </div>
                `;
                return;
            }

            // READ-ONLY VIEW
            let thHtml = '';
            const items = [
                "1. Tài sản bị xâm phạm",
                "2. Thu nhập thực tế bị mất/giảm sút",
                "3. Vật chất do người bị thiệt hại chết",
                "4. Vật chất do sức khỏe bị xâm phạm",
                "5. Thiệt hại về tinh thần",
                "6. Các chi phí hợp lý khác"
            ];

            items.forEach((itemText, idx) => {
                const typeNum = idx + 1;
                const found = claim.thietHaiList ? claim.thietHaiList.find(x => x.type === typeNum) : null;
                const isChecked = !!found;
                const checkIcon = isChecked ? '<i class="fa-solid fa-square-check" style="color:var(--secondary-color); font-size:14px;"></i>' : '<i class="fa-regular fa-square" style="color:var(--text-muted); font-size:14px;"></i>';
                const calcText = isChecked ? found.calc : '<span style="color:var(--text-muted); font-style:italic;">Không yêu cầu</span>';
                const valText = isChecked ? found.val.toLocaleString('vi-VN') + ' đ' : '0 đ';
                const rowStyle = isChecked ? 'font-weight:600; background-color:#FAFBFD;' : 'color:var(--text-muted); opacity:0.85;';

                thHtml += `<tr style="${rowStyle}">
                        <td><strong>${itemText}</strong></td>
                        <td>${calcText}</td>
                        <td style="text-align:right; font-weight:600;">${valText}</td>
                    </tr>`;
            });

            let filesHtml = '';
            if (claim.files && claim.files.length > 0) {
                claim.files.forEach(f => {
                    filesHtml += `<div style="padding: 6px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; display:inline-flex; align-items:center; gap:8px; margin-right:8px; margin-top:4px;">
                        <i class="fa-solid fa-file-pdf" style="color:var(--danger-color);"></i>
                        <span>${f.name}</span>
                        <a href="${f.url || '#'}" target="_blank" class="action-link view-link">Xem file</a>
                    </div>`;
                });
            } else {
                filesHtml = `<span style="font-style:italic; color:var(--text-muted);">Không có tài liệu đính kèm</span>`;
            }

            let badgeClass = 'badge-info';
            if (claim.status === 'Hoàn thành') badgeClass = 'badge-success';
            else if (claim.status === 'Lưu nháp') badgeClass = 'badge-draft';
            else if (claim.status === 'Chờ tiếp nhận') badgeClass = 'badge-pending';
            else if (claim.status === 'Yêu cầu bổ sung') badgeClass = 'badge-warning';
            else if (claim.status === 'Chờ thụ lý') badgeClass = 'badge-pending';
            else if (claim.status === 'Bị từ chối') badgeClass = 'badge-danger';
            else if (claim.status === 'Thương lượng không thành công') badgeClass = 'badge-danger';
            else if (claim.status === 'Chờ ban hành QĐ') badgeClass = 'badge-warning';
            else if (claim.status === 'Chờ thực thi') badgeClass = 'badge-warning';

            // Payout channels & banking helper
            let advanceSectionHtml = '';
            if (claim.advanceNum > 0) {
                const recKenhText = claim.advanceRecKenh === 'chuyen-khoan' ? 'Chuyển khoản' : 'Tiền mặt';
                let payDetailsHtml = '';
                if (claim.advanceRecKenh === 'chuyen-khoan') {
                    payDetailsHtml = `
                        <div class="grid-4-cols" style="gap: 12px; font-size:12.5px; margin-top:8px; background:#F5F3FF; padding:10px; border-radius:6px; border:1px solid #E9D5FF;">
                            <div><strong>Chủ tài khoản:</strong> ${claim.advanceBankUser || '--'}</div>
                            <div><strong>Số tài khoản:</strong> ${claim.advanceBankAccount || '--'}</div>
                            <div><strong>Ngân hàng:</strong> ${claim.advanceBankName || '--'}</div>
                            <div><strong>Chi nhánh:</strong> ${claim.advanceBankBranch || '--'}</div>
                        </div>
                    `;
                } else {
                    payDetailsHtml = `
                        <div style="font-size:12.5px; margin-top:8px; background:#F5F3FF; padding:10px; border-radius:6px; border:1px solid #E9D5FF; display:inline-block;">
                            <strong>Số biên lai nhận tiền mặt:</strong> ${claim.advanceReceiptNo || '--'}
                        </div>
                    `;
                }

                advanceSectionHtml = `
                    <div style="margin-top: 15px; border-top: 1px dashed var(--border-color); padding-top: 15px;">
                        <span style="font-weight:700; color:var(--primary-color); display:block; margin-bottom:8px; font-size:13px;">
                            <i class="fa-solid fa-hand-holding-dollar"></i> IV. ĐỀ NGHỊ TẠM ỨNG KINH PHÍ BỒI THƯỜNG (ĐIỀU 44)
                        </span>
                        <div class="grid-3-cols" style="gap: 12px; font-size: 13px;">
                            <div><strong>Tạm ứng thiệt hại tinh thần:</strong> ${(claim.advanceTinhThan || 0).toLocaleString('vi-VN')} đ</div>
                            <div><strong>Tạm ứng thiệt hại khác:</strong> ${(claim.advanceKhac || 0).toLocaleString('vi-VN')} đ</div>
                            <div><strong>Tổng số tiền tạm ứng đề nghị:</strong> <span style="font-weight:700; color:var(--secondary-color);">${claim.advanceNum.toLocaleString('vi-VN')} đ</span></div>
                        </div>
                        <div style="font-size:11.5px; font-style:italic; margin-top:4px; color:var(--text-muted);">Viết bằng chữ: ${numberToVietnameseWords(claim.advanceNum)}</div>
                        
                        <div style="font-weight:700; color:var(--primary-color); font-size:12.5px; margin-top:12px;">V. THÔNG TIN NGƯỜI NHẬN & PHƯƠNG THỨC CHI TRẢ:</div>
                        <div class="grid-4-cols" style="gap: 10px; font-size: 13px; margin-top:4px;">
                            <div><strong>Họ và tên người nhận:</strong> ${claim.advanceRecName || claim.nyc}</div>
                            <div><strong>Số giấy tờ người nhận:</strong> ${claim.advanceRecCard || claim.nycCardNo}</div>
                            <div><strong>Địa chỉ người nhận:</strong> ${claim.advanceRecAddress || claim.address}</div>
                            <div><strong>Phương thức nhận tiền:</strong> <span class="badge badge-info" style="font-size:11px; padding:2px 6px;">${recKenhText}</span></div>
                        </div>
                        ${payDetailsHtml}
                    </div>
                `;
            } else {
                advanceSectionHtml = `
                    <div style="margin-top: 15px; border-top: 1px dashed var(--border-color); padding-top: 15px; font-size: 13px;">
                        <strong>IV. ĐỀ NGHỊ TẠM ỨNG KINH PHÍ BỒI THƯỜNG:</strong> <span style="color:var(--text-muted); font-style:italic;">Không đề nghị tạm ứng kinh phí</span>
                    </div>
                `;
            }

            const nopKenhText = claim.claimNopKenh === 'buu-chinh' ? 'Gửi qua bưu điện/bưu chính' : claim.claimNopKenh === 'dvc' ? 'Đồng bộ từ Cổng Dịch vụ công trực tuyến' : 'Tiếp nhận trực tiếp tại một cửa';

            container.innerHTML = `
                <!-- Top Status Header Block -->
                <div style="display:flex; justify-content:space-between; align-items:center; background:#FAFBFD; border:1px solid var(--border-color); padding:16px 20px; border-radius:8px; margin-bottom:20px; flex-wrap:wrap; gap:16px;">
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px;">Mã hồ sơ thụ lý</span>
                        <h4 style="font-size:18px; font-weight:800; color:var(--primary-color); margin:2px 0 0 0;">${claim.code}</h4>
                    </div>
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px;">Ngày nộp hồ sơ</span>
                        <div style="font-weight:600; color:var(--text-main); margin-top:2px;">${claim.date}</div>
                    </div>
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px;">Hạn giải quyết bồi thường</span>
                        <div style="font-weight:600; color:#b45309; margin-top:2px;">${claim.deadline || '--'}</div>
                    </div>
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px; display:block; margin-bottom:4px;">Trạng thái hồ sơ</span>
                        <span class="badge ${badgeClass}" style="font-size:12.5px; padding:6px 14px; font-weight:700;">${claim.status}</span>
                    </div>
                </div>

                <!-- Section 1: Thông tin người yêu cầu -->
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px;">
                    <div style="font-weight:700; color:var(--primary-color); font-size:13.5px; border-bottom:2.5px solid #F1F5F9; padding-bottom:8px; margin-bottom:12px;">
                        <i class="fa-solid fa-user-tie"></i> I. THÔNG TIN NGƯỜI YÊU CẦU BỒI THƯỜNG
                    </div>
                    <div class="grid-4-cols" style="gap: 12px 20px; font-size: 13px; line-height: 1.6;">
                        <div><strong style="color:var(--text-muted);">Họ và tên:</strong> <br><span style="text-transform:uppercase; font-weight:700; color:var(--text-main);">${claim.nyc}</span></div>
                        <div><strong style="color:var(--text-muted);">Tư cách người yêu cầu:</strong> <br><span style="font-weight:600; color:var(--secondary-color);">${claim.nycRole}</span></div>
                        <div><strong style="color:var(--text-muted);">Giới tính:</strong> <br>${claim.nycGender}</div>
                        <div><strong style="color:var(--text-muted);">Ngày sinh:</strong> <br>${claim.nycBirth}</div>
                        <div><strong style="color:var(--text-muted);">Trạng thái người bị hại:</strong> <br>${claim.victimAlive === 'no' ? '<span style="color:var(--danger-color); font-weight:600;">Đã mất</span>' : 'Còn sống'}</div>
                        <div><strong style="color:var(--text-muted);">Loại giấy tờ thân nhân:</strong> <br>${claim.nycCardType}</div>
                        <div><strong style="color:var(--text-muted);">Số giấy tờ thân nhân:</strong> <br>${claim.nycCardNo}</div>
                        <div><strong style="color:var(--text-muted);">Ngày cấp:</strong> <br>${claim.nycCardDate || '--'}</div>
                        <div><strong style="color:var(--text-muted);">Nơi cấp:</strong> <br>${claim.nycCardPlace || '--'}</div>
                        <div><strong style="color:var(--text-muted);">Số điện thoại:</strong> <br>${claim.nycPhone || '--'}</div>
                        <div><strong style="color:var(--text-muted);">Email:</strong> <br>${claim.nycEmail || '--'}</div>
                        <div><strong style="color:var(--text-muted);">Quốc gia:</strong> <br>${claim.nycCountry}</div>
                        <div><strong style="color:var(--text-muted);">Tỉnh / Thành phố:</strong> <br>${claim.nycTinhThanh}</div>
                        <div style="grid-column: span 3;"><strong style="color:var(--text-muted);">Địa chỉ chi tiết:</strong> <br>${claim.nycAddressDetail}</div>
                    </div>
                </div>

                <!-- Section 2: Thông tin vụ việc gây thiệt hại & Căn cứ -->
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px;">
                    <div style="font-weight:700; color:var(--primary-color); font-size:13.5px; border-bottom:2.5px solid #F1F5F9; padding-bottom:8px; margin-bottom:12px;">
                        <i class="fa-solid fa-circle-info"></i> II. THÔNG TIN VỤ VIỆC GÂY THIỆT HẠI & CĂN CỨ
                    </div>
                    <div class="grid-3-cols" style="gap: 12px 20px; font-size: 13px; line-height: 1.6;">
                        <div><strong style="color:var(--text-muted);">Hình thức tiếp nhận hồ sơ:</strong> <br>${nopKenhText}</div>
                        <div><strong style="color:var(--text-muted);">Lĩnh vực phát sinh thiệt hại:</strong> <br><span style="text-transform:uppercase; font-weight:600; font-size:11px; color:var(--primary-color);">TRONG HOẠT ĐỘNG ${claim.fieldGroup.toUpperCase()}</span></div>
                        <div><strong style="color:var(--text-muted);">Cơ quan giải quyết bồi thường:</strong> <br>${claim.agency || '--'}</div>
                        <div style="grid-column: span 3; background:#FAFBFD; border-left:3px solid var(--secondary-color); padding:10px; border-radius:4px; margin-top:4px;">
                            <strong style="color:var(--text-muted);">Văn bản làm căn cứ yêu cầu bồi thường:</strong> <br><span style="font-weight:600; color:var(--text-main);">${claim.docBase || 'Chưa cập nhật văn bản căn cứ'}</span>
                        </div>
                        <div style="grid-column: span 3;"><strong style="color:var(--text-muted);">Hành vi gây thiệt hại của người thi hành công vụ:</strong> <br><span style="color:var(--text-main); font-style:italic;">${claim.hanhVi}</span></div>
                        <div style="grid-column: span 3;"><strong style="color:var(--text-muted);">Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại:</strong> <br><span style="color:var(--text-main); font-style:italic;">${claim.nhanQua}</span></div>
                    </div>
                </div>

                <!-- Section 3: Thiệt hại & đề nghị bồi thường -->
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="font-weight:700; color:var(--primary-color); font-size:13.5px; border-bottom:2.5px solid #F1F5F9; padding-bottom:8px; margin-bottom:12px;">
                        <i class="fa-solid fa-money-check-dollar"></i> III. THIỆT HẠI YÊU CẦU BỒI THƯỜNG
                    </div>
                    
                    <div class="table-container" style="margin-bottom: 15px;">
                        <table class="custom-table">
                            <thead>
                                <tr style="background-color: var(--table-header-bg);">
                                    <th style="width: 280px;">Mục thiệt hại yêu cầu bồi thường</th>
                                    <th style="min-width: 300px;">Cách tính / Diễn giải công thức áp dụng</th>
                                    <th style="width: 220px; text-align: right;">Số tiền yêu cầu bồi thường (đồng)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${thHtml}
                                <tr style="background-color: #F8FAFC; font-weight: 700; font-size: 13.5px;">
                                    <td colspan="2" style="text-align: right; color:var(--text-main);">TỔNG CỘNG SỐ TIỀN YÊU CẦU BỒI THƯỜNG:</td>
                                    <td style="text-align: right; color: var(--danger-color); font-size: 15px;">
                                        ${(claim.totalNum || 0).toLocaleString('vi-VN')} đồng
                                    </td>
                                </tr>
                                <tr style="background-color: #F8FAFC; font-style: italic; font-size: 12.5px;">
                                    <td colspan="3" style="text-align: right; color: var(--text-muted); font-weight: normal;">
                                        Viết bằng chữ: ${numberToVietnameseWords(claim.totalNum || 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="grid-2-cols" style="gap: 16px; margin-bottom: 12px; font-size: 13px;">
                        <div>
                            <strong>Yêu cầu phục hồi danh dự:</strong> 
                            ${claim.restoreHonor ? '<span class="badge badge-success" style="font-size:10.5px; padding:3px 8px;">Có yêu cầu phục hồi danh dự</span>' : '<span style="color:var(--text-muted); font-style:italic;">Không yêu cầu</span>'}
                        </div>
                    </div>

                    <!-- Advance Payment and Recipient Blocks -->
                    ${advanceSectionHtml}

                    <div style="margin-top:15px; border-top:1px dashed #e2e8f0; padding-top:12px;">
                        <strong style="display:block; margin-bottom:6px; font-size:12.5px; color:var(--text-muted);">Hồ sơ tài liệu đính kèm kèm đơn yêu cầu:</strong>
                        ${filesHtml}
                    </div>
                </div>
            `;
        }

        // ==============================================
        // DRAFT EDIT EVENT HANDLERS
        // ==============================================
        window.toggleDraftThietHaiRow = function(typeNum) {
            const cb = document.getElementById(`claimThietHaiCb_edit_${typeNum}`);
            const calc = document.getElementById(`claimThietHaiCalc_edit_${typeNum}`);
            const val = document.getElementById(`claimThietHaiVal_edit_${typeNum}`);
            
            if (cb.checked) {
                calc.removeAttribute('disabled');
                val.removeAttribute('disabled');
            } else {
                calc.setAttribute('disabled', 'true');
                val.setAttribute('disabled', 'true');
                calc.value = '';
                val.value = '0';
            }
            recalculateDraftTotal();
        };

        window.recalculateDraftTotal = function() {
            let total = 0;
            for (let i = 1; i <= 6; i++) {
                const cb = document.getElementById(`claimThietHaiCb_edit_${i}`);
                if (cb && cb.checked) {
                    const valEl = document.getElementById(`claimThietHaiVal_edit_${i}`);
                    const val = parseFloat(valEl.value.replace(/\./g, '')) || 0;
                    total += val;
                }
            }
            
            const totalText = document.getElementById('claimTotalNumText_edit');
            const totalWord = document.getElementById('claimTotalWordText_edit');
            if (totalText) totalText.innerText = total.toLocaleString('vi-VN') + ' đồng';
            if (totalWord) totalWord.innerText = 'Viết bằng chữ: ' + numberToVietnameseWords(total);
        };

        window.toggleDraftAdvancePanel = function(checked) {
            const panel = document.getElementById('claimAdvancePanel_edit');
            if (panel) panel.style.display = checked ? 'block' : 'none';
        };

        window.sumDraftAdvance = function() {
            const tinhThanVal = parseFloat(document.getElementById('claimAdvanceTinhThan_edit').value.replace(/\./g, '')) || 0;
            const khacVal = parseFloat(document.getElementById('claimAdvanceKhacVal_edit').value.replace(/\./g, '')) || 0;
            const total = tinhThanVal + khacVal;
            
            const totalEl = document.getElementById('claimAdvanceTotalText_edit');
            if (totalEl) totalEl.innerText = total.toLocaleString('vi-VN') + ' đồng';
        };

        window.toggleDraftRecMethod = function(method) {
            const cashFields = document.getElementById('claimRecCashFields_edit');
            const bankFields = document.getElementById('claimRecBankFields_edit');
            if (cashFields) cashFields.style.display = method === 'tien-mat' ? 'block' : 'none';
            if (bankFields) bankFields.style.display = method === 'chuyen-khoan' ? 'grid' : 'none';
        };

        window.switchToReadOnlyMode = function() {
            isDetailEditMode = false;
            showCaseDetail(selectedClaimId, false);
        };

        window.saveDraftChanges = function(submit = false) {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (!claim) return;
            
            // Remove previous error states
            const inputs = document.querySelectorAll('#readOnlyClaimInfo .is-invalid');
            inputs.forEach(el => el.classList.remove('is-invalid'));
            
            if (submit) {
                let firstErrEl = null;
                function validateRequired(id) {
                    const el = document.getElementById(id);
                    if (el && !el.value.trim()) {
                        el.classList.add('is-invalid');
                        if (!firstErrEl) firstErrEl = el;
                        return false;
                    }
                    return true;
                }
                
                let isValid = true;
                if (!validateRequired('claimDocBase_edit')) isValid = false;
                if (!validateRequired('claimNYCName_edit')) isValid = false;
                if (!validateRequired('claimNYCBirth_edit')) isValid = false;
                if (!validateRequired('claimNYCPhone_edit')) isValid = false;
                if (!validateRequired('claimNYCCardNo_edit')) isValid = false;
                if (!validateRequired('claimNYCCardDate_edit')) isValid = false;
                if (!validateRequired('claimNYCCardPlace_edit')) isValid = false;
                if (!validateRequired('claimNYCCity_edit')) isValid = false;
                if (!validateRequired('claimNYCAddressDetail_edit')) isValid = false;
                if (!validateRequired('claimHanhVi_edit')) isValid = false;
                if (!validateRequired('claimNhanQua_edit')) isValid = false;
                
                const needAdvance = document.getElementById('claimNeedAdvance_edit').checked;
                if (needAdvance) {
                    if (!validateRequired('claimRecName_edit')) isValid = false;
                    if (!validateRequired('claimRecCard_edit')) isValid = false;
                    if (!validateRequired('claimRecAddress_edit')) isValid = false;
                    
                    const recMethod = document.getElementById('claimRecMethod_edit').value;
                    if (recMethod === 'chuyen-khoan') {
                        if (!validateRequired('claimRecBankUser_edit')) isValid = false;
                        if (!validateRequired('claimRecBankAccount_edit')) isValid = false;
                        if (!validateRequired('claimRecBankName_edit')) isValid = false;
                        if (!validateRequired('claimRecBankBranch_edit')) isValid = false;
                    }
                }
                
                if (!isValid) {
                    if (firstErrEl) firstErrEl.focus();
                    showToast("Vui lòng nhập đầy đủ các trường bắt buộc màu đỏ!", "error");
                    return;
                }
            }
            
            // Save data
            claim.claimNopKenh = document.getElementById('claimNopKenh_edit').value;
            claim.fieldGroup = document.getElementById('claimFieldGroup_edit').value;
            claim.agency = document.getElementById('claimCqNhan_edit').value;
            claim.docBase = document.getElementById('claimDocBase_edit').value;
            
            claim.nyc = document.getElementById('claimNYCName_edit').value;
            claim.nycRole = document.getElementById('claimNYCRole_edit').value;
            claim.role = claim.nycRole; // Sync role
            claim.nycGender = document.getElementById('claimNYCGender_edit').value;
            claim.nycBirth = document.getElementById('claimNYCBirth_edit').value;
            claim.victimAlive = document.querySelector('input[name="claimVictimAlive_edit"]:checked').value;
            claim.nycPhone = document.getElementById('claimNYCPhone_edit').value;
            claim.phone = claim.nycPhone; // Sync phone
            claim.nycEmail = document.getElementById('claimNYCEmail_edit').value;
            claim.nycCardType = document.getElementById('claimNYCCardType_edit').value;
            claim.cardType = claim.nycCardType; // Sync cardType
            claim.nycCardNo = document.getElementById('claimNYCCardNo_edit').value;
            claim.cardNo = claim.nycCardNo; // Sync cardNo
            claim.nycCardDate = document.getElementById('claimNYCCardDate_edit').value;
            claim.nycCardPlace = document.getElementById('claimNYCCardPlace_edit').value;
            claim.nycCountry = document.getElementById('claimNYCCountry_edit').value;
            claim.nycTinhThanh = document.getElementById('claimNYCCity_edit').value;
            claim.nycAddressDetail = document.getElementById('claimNYCAddressDetail_edit').value;
            claim.address = claim.nycAddressDetail; // Sync address
            
            claim.hanhVi = document.getElementById('claimHanhVi_edit').value;
            claim.nhanQua = document.getElementById('claimNhanQua_edit').value;
            
            claim.restoreHonor = document.getElementById('claimRestoreHonor_edit').checked;
            
            // Collect damages
            claim.thietHaiList = [];
            let total = 0;
            for (let i = 1; i <= 6; i++) {
                const cb = document.getElementById(`claimThietHaiCb_edit_${i}`);
                if (cb && cb.checked) {
                    const calc = document.getElementById(`claimThietHaiCalc_edit_${i}`).value;
                    const val = parseFloat(document.getElementById(`claimThietHaiVal_edit_${i}`).value.replace(/\./g, '')) || 0;
                    claim.thietHaiList.push({ type: i, calc: calc, val: val });
                    total += val;
                }
            }
            claim.totalNum = total;
            
            // Collect advance
            const needAdvance = document.getElementById('claimNeedAdvance_edit').checked;
            if (needAdvance) {
                claim.advanceTinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan_edit').value.replace(/\./g, '')) || 0;
                claim.advanceKhac = parseFloat(document.getElementById('claimAdvanceKhacVal_edit').value.replace(/\./g, '')) || 0;
                claim.advanceNum = claim.advanceTinhThan + claim.advanceKhac;
                
                claim.advanceRecName = document.getElementById('claimRecName_edit').value;
                claim.advanceRecCard = document.getElementById('claimRecCard_edit').value;
                claim.advanceRecAddress = document.getElementById('claimRecAddress_edit').value;
                claim.advanceRecKenh = document.getElementById('claimRecMethod_edit').value;
                
                if (claim.advanceRecKenh === 'chuyen-khoan') {
                    claim.advanceBankUser = document.getElementById('claimRecBankUser_edit').value;
                    claim.advanceBankAccount = document.getElementById('claimRecBankAccount_edit').value;
                    claim.advanceBankName = document.getElementById('claimRecBankName_edit').value;
                    claim.advanceBankBranch = document.getElementById('claimRecBankBranch_edit').value;
                    claim.advanceReceiptNo = '';
                } else {
                    claim.advanceReceiptNo = document.getElementById('claimRecReceiptNo_edit').value;
                    claim.advanceBankUser = '';
                    claim.advanceBankAccount = '';
                    claim.advanceBankName = '';
                    claim.advanceBankBranch = '';
                }
            } else {
                claim.advanceNum = 0;
                claim.advanceTinhThan = 0;
                claim.advanceKhac = 0;
            }
            
            if (submit) {
                claim.status = 'Chờ tiếp nhận';
                claim.timeline.push({
                    title: "Nộp hồ sơ bồi thường",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "Đã nộp hồ sơ bồi thường chính thức. Trạng thái chuyển sang [Chờ tiếp nhận]",
                    status: "completed"
                });
                showToast("Nộp hồ sơ bồi thường thành công!", "success");
            } else {
                showToast("Đã cập nhật thay đổi thông tin hồ sơ nháp thành công!", "success");
            }

            saveClaimsToLocal();
            switchToReadOnlyMode();
        };


        function toggleAccordion(accId) {
            const head = document.getElementById(`accHead_${accId}`);
            const body = document.getElementById(`accBody_${accId}`);
            const icon = document.getElementById(`accIcon_${accId}`);

            const isShown = body.classList.toggle('show');
            head.classList.toggle('active', isShown);
            icon.classList.toggle('rotated', isShown);
        }

        function forceOpenAccordion(accId) {
            const list = ['thuly', 'bosung', 'xacminh', 'thuongluong', 'quyetdinh', 'thucthi', 'kinhphi'];
            list.forEach(id => {
                const head = document.getElementById(`accHead_${id}`);
                const body = document.getElementById(`accBody_${id}`);
                const icon = document.getElementById(`accIcon_${id}`);
                if (id === accId) {
                    if (body) body.classList.add('show');
                    if (head) head.classList.add('active');
                    if (icon) icon.classList.add('rotated');
                } else {
                    if (body) body.classList.remove('show');
                    if (head) head.classList.remove('active');
                    if (icon) icon.classList.remove('rotated');
                }
            });
        }

        function forceCloseAccordion(accId) {
            const head = document.getElementById(`accHead_${accId}`);
            const body = document.getElementById(`accBody_${accId}`);
            const icon = document.getElementById(`accIcon_${accId}`);

            body.classList.remove('show');
            head.classList.remove('active');
            icon.classList.remove('rotated');
        }

        function renderAccordions(claim) {
            const subTabsContainer = document.getElementById('detailSubTabsContainer');
            const phddTabBtn = document.getElementById('detailSubTab2Btn');
            const kqxlTabBtn = document.getElementById('detailSubTab1Btn');

            const showPhdd = claim.restoreHonor && ['Chờ ban hành QĐ', 'Chờ thực thi', 'Hoàn thành'].includes(claim.status);
            if (showPhdd) {
                if (subTabsContainer) subTabsContainer.style.display = 'flex';
                if (phddTabBtn) phddTabBtn.style.display = 'inline-block';
                if (kqxlTabBtn) kqxlTabBtn.innerHTML = '<i class="fa-solid fa-scale-balanced"></i> Kết quả xử lý hồ sơ';
            } else {
                if (subTabsContainer) subTabsContainer.style.display = 'none';
                if (phddTabBtn) phddTabBtn.style.display = 'none';
                switchDetailSubTab('kq-xl');
            }

            // 1. Thụ lý
            document.getElementById('detThulyKenh').value = claim.fieldGroup === 'hành chính' ? 'Một cửa trực tiếp' : 'Đồng bộ hệ thống';
            document.getElementById('detThulyDate').value = claim.date;
            document.getElementById('detThulyHan').value = claim.deadline;
            document.getElementById('detThulyAgency').value = claim.agency;
            document.getElementById('detThulyOfficer').value = claim.assignedOfficer || "Chưa phân công";
            
            const isRejected = (claim.status === 'Bị từ chối' || claim.status === 'Từ chối tiếp nhận' || claim.status === 'Từ chối thụ lý');

            // Handle rejection block visibility and populate fields
            const rejectBlock = document.getElementById('detThulyRejectBlock');
            const thulyEditBlock = document.getElementById('thulyEditBlock');
            if (rejectBlock) {
                if (isRejected) {
                    rejectBlock.style.display = 'block';
                    const titleTextEl = document.getElementById('detThulyRejectTitleText');
                    if (titleTextEl) {
                        titleTextEl.innerText = claim.status === 'Từ chối tiếp nhận' 
                            ? "THÔNG TIN CHI TIẾT TỪ CHỐI TIẾP NHẬN HỒ SƠ" 
                            : "THÔNG TIN CHI TIẾT TỪ CHỐI THỤ LÝ HỒ SƠ";
                    }
                    document.getElementById('detThulyRejectOfficer').innerText = claim.rejectOfficer || (claim.status === 'Từ chối tiếp nhận' ? "Trần Thị Chuyên Viên (Cán bộ một cửa)" : "Nguyễn Văn Thủ Trưởng (Thủ trưởng cơ quan)");
                    document.getElementById('detThulyRejectDate').innerText = claim.rejectDate || claim.date || "14/05/2026";
                    document.getElementById('detThulyRejectReason').innerText = claim.rejectReason || "Hồ sơ bị từ chối tiếp nhận/thụ lý theo quy định.";

                    // Rejection history list rendering
                    const historyBlock = document.getElementById('detThulyHistoryBlock');
                    const historyList = document.getElementById('detThulyHistoryList');
                    if (historyBlock && historyList) {
                        if (claim.rejectionLog && claim.rejectionLog.length > 0) {
                            historyBlock.style.display = 'block';
                            let histHtml = '';
                            claim.rejectionLog.forEach(log => {
                                histHtml += `
                                    <div style="background: white; border: 1px solid #FEE2E2; padding: 8px; border-radius: 4px; font-size: 12px; margin-top: 4px;">
                                        <div style="font-weight: 700; color: #991B1B; display: flex; justify-content: space-between;">
                                            <span>${log.action}</span>
                                            <span style="font-weight: normal; color: var(--text-muted); font-size: 11px;">${log.date} - ${log.officer}</span>
                                        </div>
                                        <p style="margin: 4px 0 0 0; color: #374151; font-style: italic; font-size: 12px;">Nội dung: ${log.reason}</p>
                                    </div>
                                `;
                            });
                            historyList.innerHTML = histHtml;
                        } else {
                            historyBlock.style.display = 'none';
                        }
                    }
                } else {
                    rejectBlock.style.display = 'none';
                }
            }

            if (thulyEditBlock) {
                if (claim.status === 'Từ chối thụ lý' && isDetailEditMode) {
                    thulyEditBlock.style.display = 'block';
                    document.getElementById('editThulyExplanation').value = '';
                } else {
                    thulyEditBlock.style.display = 'none';
                }
            }

            // Hide or show accordions 2 to 7
            const accordionsToToggle = ['bosung', 'xacminh', 'thuongluong', 'quyetdinh', 'thucthi', 'kinhphi'];
            accordionsToToggle.forEach(accId => {
                const accHead = document.getElementById(`accHead_${accId}`);
                if (accHead) {
                    const accItem = accHead.closest('.accordion-item');
                    if (accItem) {
                        accItem.style.display = isRejected ? 'none' : 'block';
                    }
                }
            });

            // 2. Yêu cầu bổ sung
            const bsRead = document.getElementById('bosungReadBlock');
            const bsEdit = document.getElementById('bosungEditBlock');
            bsRead.innerHTML = '';
            bsEdit.style.display = 'none';

            if (claim.bosungLogs && claim.bosungLogs.length > 0) {
                let logHtml = '';
                claim.bosungLogs.forEach(l => {
                    logHtml += `<div style="font-size:12.5px; border-bottom:1px dashed #e2e8f0; padding-bottom:8px; margin-bottom:8px;">
                        <span style="color:var(--text-muted); font-size:11px;">[${l.date} - ${l.sender}]</span>
                        <p style="margin-top:2px;">${l.content}</p>
                    </div>`;
                });
                bsRead.innerHTML = logHtml;
            } else {
                bsRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Không có yêu cầu bổ sung hồ sơ</div>`;
            }

            // 3. Xác minh
            const xmRead = document.getElementById('xacminhReadBlock');
            const xmEdit = document.getElementById('xacminhEditBlock');
            xmRead.innerHTML = '';
            xmEdit.style.display = 'none';

            if (claim.status === 'Đang xác minh thiệt hại' && isDetailEditMode) {
                xmEdit.style.display = 'block';
                const xmTable = document.getElementById('editXacMinhTableBody');
                
                // Initialize files list
                xmSelectedFiles = claim.xmFiles ? [...claim.xmFiles] : [];
                renderXmFiles();

                // Populate other fields
                document.getElementById('editXacMinhOtherInfo').value = claim.xmOtherInfo || '';
                document.getElementById('editXacMinhOtherRestore').value = claim.otherRestore || '';
                document.getElementById('editXacMinhMethod').value = claim.xmMethod || 'chuyen-khoan';

                // Populate dynamic table
                let tableHtml = '';
                claim.thietHaiList.forEach((item, idx) => {
                    const claimedVal = item.val;
                    const verifiedVal = item.xmVal !== undefined ? item.xmVal : claimedVal;
                    const verifiedNote = item.xmNote || 'Xác minh đúng giá trị thực tế';
                    tableHtml += `
                        <tr>
                            <td>${idx + 1}</td>
                            <td>${getThietHaiName(item.type)}</td>
                            <td style="text-align:right;">${claimedVal.toLocaleString('vi-VN')} đ</td>
                            <td><input type="number" class="form-control" style="text-align:right; font-weight:600; font-size:13px;" id="editXmVal_${idx}" value="${verifiedVal}"></td>
                            <td><input type="text" class="form-control" style="font-size:13px;" id="editXmNote_${idx}" value="${verifiedNote}"></td>
                        </tr>
                    `;
                });
                xmTable.innerHTML = tableHtml;
            } else {
                if (claim.xmTotalAmount !== undefined || ['Đang thương lượng', 'Thương lượng không thành công', 'Chờ ban hành QĐ', 'Chờ thực thi', 'Hoàn thành'].includes(claim.status)) {
                    // Render comparison table
                    let comparisonRowsHtml = '';
                    let totalClaimed = 0;
                    let totalVerified = 0;
                    claim.thietHaiList.forEach((item, idx) => {
                        const claimedVal = item.val;
                        const verifiedVal = item.xmVal !== undefined ? item.xmVal : claimedVal;
                        const diff = verifiedVal - claimedVal;
                        const diffText = diff === 0 ? "0 đ" : (diff > 0 ? "+" : "") + diff.toLocaleString('vi-VN') + " đ";
                        const diffColor = diff < 0 ? "#ef4444" : (diff > 0 ? "#10b981" : "#64748b");
                        
                        totalClaimed += claimedVal;
                        totalVerified += verifiedVal;

                        comparisonRowsHtml += `
                            <tr>
                                <td style="text-align:center;">${idx + 1}</td>
                                <td>${getThietHaiName(item.type)}</td>
                                <td style="text-align:right; font-weight:500;">${claimedVal.toLocaleString('vi-VN')} đ</td>
                                <td style="text-align:right; font-weight:600; color:var(--primary-color);">${verifiedVal.toLocaleString('vi-VN')} đ</td>
                                <td style="text-align:right; font-weight:500; color:${diffColor};">${diffText}</td>
                                <td>${item.xmNote || 'Xác minh đúng thực tế'}</td>
                            </tr>
                        `;
                    });

                    const comparisonTableHtml = `
                        <div style="margin-top: 10px; margin-bottom: 15px;">
                            <span style="font-weight:700; font-size:12.5px; color:#1e293b; display:block; margin-bottom:6px;"><i class="fa-solid fa-list-check"></i> KẾT QUẢ ĐỐI SOÁT CHI TIẾT CÁC KHOẢN THIỆT HẠI:</span>
                            <table class="custom-table" style="background: white; width:100%; border-collapse:collapse; font-size:12.5px;">
                                <thead style="background-color:#f8fafc;">
                                    <tr>
                                        <th style="width:40px; text-align:center;">STT</th>
                                        <th>Khoản mục thiệt hại</th>
                                        <th style="text-align:right; width:130px;">Tiền yêu cầu (đ)</th>
                                        <th style="text-align:right; width:130px;">Tiền xác minh (đ)</th>
                                        <th style="text-align:right; width:110px;">Chênh lệch</th>
                                        <th>Ghi chú xác minh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${comparisonRowsHtml}
                                    <tr style="font-weight:700; background-color:#f1f5f9;">
                                        <td colspan="2" style="text-align:right;">TỔNG CỘNG:</td>
                                        <td style="text-align:right;">${totalClaimed.toLocaleString('vi-VN')} đ</td>
                                        <td style="text-align:right; color:var(--danger-color);">${totalVerified.toLocaleString('vi-VN')} đ</td>
                                        <td style="text-align:right; color:${(totalVerified - totalClaimed) < 0 ? '#ef4444' : ((totalVerified - totalClaimed) > 0 ? '#10b981' : '#64748b')};">
                                            ${(totalVerified - totalClaimed) === 0 ? "0 đ" : ((totalVerified - totalClaimed) > 0 ? "+" : "") + (totalVerified - totalClaimed).toLocaleString('vi-VN') + " đ"}
                                        </td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `;

                    let filesHtml = '';
                    if (claim.xmFiles && claim.xmFiles.length > 0) {
                        claim.xmFiles.forEach(file => {
                            filesHtml += `
                                <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                    <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                                    <a href="#" onclick="event.preventDefault(); viewPhddMockFile('${file.name}')" class="action-link view-link" style="font-weight:500;">${file.name}</a>
                                </div>
                            `;
                        });
                    } else {
                        filesHtml = '<span style="font-style:italic; color:#64748b;">Không có tệp báo cáo đính kèm</span>';
                    }

                    xmRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Tổng tiền bồi thường xác minh:</strong> <span style="font-weight:700; color:var(--danger-color); font-size:14px;">${(claim.xmTotalAmount || totalVerified).toLocaleString('vi-VN')} đ</span></p>
                            ${comparisonTableHtml}
                            <p style="margin-top:8px;"><strong>Thông tin xác minh thiệt hại khác:</strong> ${claim.xmOtherInfo || 'Không có'}</p>
                            <p><strong>Khôi phục quyền lợi khác:</strong> ${claim.otherRestore || 'Không có'}</p>
                            <p><strong>Phương thức chi trả xác định:</strong> ${claim.xmMethod === 'tien-mat' ? 'Nhận tiền mặt tại kho bạc' : 'Chuyển khoản ngân hàng'}</p>
                            <div style="margin-top: 8px;">
                                <strong>Báo cáo kết quả xác minh đính kèm:</strong>
                                <div style="margin-top: 4px; display:flex; flex-direction:column; gap:4px;">
                                    ${filesHtml}
                                </div>
                            </div>
                        </div>`;
                } else {
                    xmRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chưa tiến hành xác minh thiệt hại</div>`;
                }
            }

            // 4. Thương lượng
            const tlRead = document.getElementById('thuongluongReadBlock');
            const tlEdit = document.getElementById('thuongluongEditBlock');
            tlRead.innerHTML = '';
            tlEdit.style.display = 'none';

            if (claim.status === 'Đang thương lượng' && isDetailEditMode) {
                tlEdit.style.display = 'block';
                document.getElementById('editTlTimeExp').value = claim.tlTimeExp || "";
                document.getElementById('editTlVenueExp').value = claim.tlVenueExp || "";
                document.getElementById('editTlMembersExp').value = claim.tlMembersExp || "";
                document.getElementById('editTlTimeAct').value = new Date().toLocaleString('vi-VN');
                document.getElementById('editTlVenueAct').value = claim.tlVenueExp || "";
                document.getElementById('editTlMembersAct').value = claim.tlMembersExp || "";
                document.getElementById('editTlDesc').value = "";
                
                // Initialize files list
                tlSelectedFiles = claim.tlFiles ? [...claim.tlFiles] : [];
                renderTlFiles();
            } else {
                let tlHistoryHtml = '';
                if (claim.tlHistory && claim.tlHistory.length > 0) {
                    claim.tlHistory.forEach(hist => {
                        const isSuccess = hist.result === 'Thương lượng thành công';
                        const color = isSuccess ? 'var(--success-color)' : 'var(--danger-color)';
                        
                        let histFilesHtml = '';
                        if (hist.files && hist.files.length > 0) {
                            hist.files.forEach(f => {
                                histFilesHtml += `<div style="margin-top:2px;"><i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> <a href="#" onclick="event.preventDefault(); viewPhddMockFile('${f.name}')" class="action-link view-link">${f.name}</a></div>`;
                            });
                        }

                        tlHistoryHtml += `
                            <div style="margin-bottom: 12px; padding: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; font-size:12.5px;">
                                <div style="font-weight:700; color:${color}; margin-bottom: 4px;">Phiên họp thứ ${hist.sessionIndex}: ${hist.result}</div>
                                <div style="color:#475569; font-size:11.5px; margin-bottom: 4px;">
                                    <span><strong>Thời gian:</strong> ${hist.date}</span> | <span><strong>Địa điểm:</strong> ${hist.venue}</span>
                                </div>
                                ${hist.disputeProgress ? `<p style="margin:2px 0;"><strong>Diễn biến:</strong> ${hist.disputeProgress}</p>` : ''}
                                ${hist.disagreementReason ? `<p style="margin:2px 0;"><strong>Lý do không thành:</strong> ${hist.disagreementReason}</p>` : ''}
                                <div style="margin-top:4px;"><strong>Tài liệu đính kèm:</strong> ${histFilesHtml || 'Không có'}</div>
                            </div>
                        `;
                    });
                }

                if (claim.status === 'Thương lượng không thành công') {
                    let tlFilesHtml = '';
                    if (claim.tlFiles && claim.tlFiles.length > 0) {
                        claim.tlFiles.forEach(file => {
                            tlFilesHtml += `
                                <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                    <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                                    <a href="#" onclick="event.preventDefault(); viewPhddMockFile('${file.name}')" class="action-link view-link" style="font-weight:500;">${file.name}</a>
                                </div>
                            `;
                        });
                    } else {
                        tlFilesHtml = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                                <a href="#" onclick="event.preventDefault(); viewPhddMockFile('Bien_ban_thuong_luong_khong_thanh.pdf')" class="action-link view-link" style="font-weight:500;">Bien_ban_thuong_luong_khong_thanh.pdf</a>
                            </div>
                        `;
                    }

                    tlRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Kết quả họp thương lượng:</strong> <span style="font-weight:700; color:var(--danger-color);">Thương lượng không thành công</span></p>
                            <p><strong>Phiên họp thứ:</strong> Lần ${claim.tlSessionIndex || 1}</p>
                            <p><strong>Thời gian thực tế:</strong> ${claim.tlTimeAct || "02/07/2026 09:00"}</p>
                            <p><strong>Địa điểm thực tế:</strong> ${claim.tlVenueAct || "Phòng họp Tòa án"}</p>
                            <p><strong>Diễn biến tranh chấp:</strong> ${claim.tlDisputeProgress || "Hai bên không thống nhất được mức bồi thường."}</p>
                            <p><strong>Lý do không đạt thỏa thuận:</strong> ${claim.tlDisagreementReason || "Chênh lệch ý kiến về chi phí thiệt hại."}</p>
                            <div style="margin-top: 4px;">
                                <strong>Biên bản họp thương lượng không thành (có chữ ký số):</strong>
                                <div style="margin-top: 4px; display:flex; flex-direction:column; gap:4px;">
                                    ${tlFilesHtml}
                                </div>
                            </div>
                            ${tlHistoryHtml ? `<div style="margin-top:15px; border-top:1px solid #e2e8f0; padding-top:15px;"><strong>Lịch sử các phiên họp thương lượng trước đó:</strong>${tlHistoryHtml}</div>` : ''}
                        </div>`;
                } else if (claim.tlResult || ['Chờ ban hành QĐ', 'Chờ thực thi', 'Hoàn thành'].includes(claim.status)) {
                    let tlFilesHtml = '';
                    if (claim.tlFiles && claim.tlFiles.length > 0) {
                        claim.tlFiles.forEach(file => {
                            tlFilesHtml += `
                                <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                    <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                                    <a href="#" onclick="event.preventDefault(); viewPhddMockFile('${file.name}')" class="action-link view-link" style="font-weight:500;">${file.name}</a>
                                </div>
                            `;
                        });
                    } else {
                        tlFilesHtml = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                                <a href="#" onclick="event.preventDefault(); viewPhddMockFile('Bien_ban_thuong_luong_co_chu_ky.pdf')" class="action-link view-link" style="font-weight:500;">Bien_ban_thuong_luong_co_chu_ky.pdf</a>
                            </div>
                        `;
                    }

                    tlRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Kết quả họp thương lượng:</strong> <span style="font-weight:700; color:var(--success-color);">${claim.tlResult || "Thương lượng thành công"}</span></p>
                            <p><strong>Thời gian thực tế:</strong> ${claim.tlTimeAct || "08/07/2026 09:00"}</p>
                            <p><strong>Địa điểm thực tế:</strong> ${claim.tlVenueAct || "Phòng họp Sở Tư pháp"}</p>
                            <div style="margin-top: 4px;">
                                <strong>Biên bản họp thương lượng:</strong>
                                <div style="margin-top: 4px; display:flex; flex-direction:column; gap:4px;">
                                    ${tlFilesHtml}
                                </div>
                            </div>
                            ${tlHistoryHtml ? `<div style="margin-top:15px; border-top:1px solid #e2e8f0; padding-top:15px;"><strong>Lịch sử các phiên họp thương lượng trước đó:</strong>${tlHistoryHtml}</div>` : ''}
                        </div>`;
                } else {
                    tlRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chưa tiến hành họp thương lượng giải quyết</div>`;
                }
            }

            // 5. Quyết định bồi thường
            const qdRead = document.getElementById('quyetdinhReadBlock');
            const qdEdit = document.getElementById('quyetdinhEditBlock');
            qdRead.innerHTML = '';
            qdEdit.style.display = 'none';

            const decStatus = claim.decStatus || 'Chưa tạo';

            if (decStatus === 'Chưa tạo') {
                if (claim.status === 'Chờ ban hành QĐ') {
                    qdRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6; display:flex; flex-direction:column; gap:10px; padding: 15px; background-color:#f8fafc; border:1px dashed #cbd5e1; border-radius:6px; align-items:center; justify-content:center;">
                            <span style="font-style:italic; color:#64748b;"><i class="fa-solid fa-file-circle-exclamation" style="font-size:24px; color:#94a3b8; margin-bottom:8px; display:block; text-align:center;"></i> Chưa có quyết định giải quyết bồi thường liên kết với hồ sơ này.</span>
                            <button class="btn btn-primary btn-sm" id="btnCreateNewDecision" onclick="openCreateDecisionForm()"><i class="fa-solid fa-plus"></i> Thêm quyết định</button>
                        </div>
                    `;
                } else {
                    qdRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chưa ban hành Quyết định giải quyết bồi thường chính thức</div>`;
                }
            } else {
                // Kịch bản 2: Đã tạo Quyết định trước đó
                const isHoanThanh = decStatus === 'Hoàn thành';
                
                // Data Masking Rule
                const displayNo = isHoanThanh ? (claim.decNo || '--') : '--';
                const displayDate = isHoanThanh ? (claim.decDate || '--') : '--';
                const displayContent = isHoanThanh ? (claim.decContent || '--') : '--';
                
                const displayPublishDate = claim.decPublishDate || '--';
                const displayEffectiveDate = claim.decEffectiveDate || '--';
                const displaySigner = claim.decSigner || '--';
                
                let badgeClass = 'bg-secondary';
                if (decStatus === 'Lưu nháp') badgeClass = 'bg-secondary';
                else if (decStatus === 'Chờ ký') badgeClass = 'bg-warning';
                else if (decStatus === 'Bị từ chối') badgeClass = 'bg-danger';
                else if (decStatus === 'Hoàn thành') badgeClass = 'bg-success';
                
                qdRead.innerHTML = `
                    <div style="font-size:13px; line-height:1.6; display:grid; grid-template-columns:1fr 1fr; gap:12px 24px; padding:15px; background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:6px;">
                        <div>
                            <p style="margin:4px 0;"><strong>Số Quyết định:</strong> <span style="font-weight:700; color:var(--primary-color);">${displayNo}</span></p>
                            <p style="margin:4px 0;"><strong>Ngày Quyết định:</strong> ${displayDate}</p>
                            <p style="margin:4px 0;"><strong>Trích yếu nội dung:</strong> ${displayContent}</p>
                            <p style="margin:4px 0;"><strong>Trạng thái QĐ:</strong> <span class="badge ${badgeClass}" style="font-size:11px; padding:4px 8px; font-weight:500; color:#fff;">${decStatus}</span></p>
                        </div>
                        <div>
                            <p style="margin:4px 0;"><strong>Ngày ban hành:</strong> ${displayPublishDate}</p>
                            <p style="margin:4px 0;"><strong>Ngày hiệu lực:</strong> ${displayEffectiveDate}</p>
                            <p style="margin:4px 0;"><strong>Người ký duyệt:</strong> ${displaySigner}</p>
                            <p style="margin:4px 0;"><strong>Tài liệu đính kèm:</strong> 
                                ${isHoanThanh 
                                    ? `<a href="#" onclick="event.preventDefault(); viewPhddMockFile('Quyet_dinh_boi_thuong_chinh_thuc.pdf')" class="action-link view-link"><i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> Quyet_dinh_boi_thuong_chinh_thuc.pdf</a>`
                                    : `<span style="color:#94a3b8; font-style:italic;">(Chưa ban hành chính thức)</span>`
                                }
                            </p>
                        </div>
                    </div>
                `;
            }

            // 6. Thực thi Quyết định
            const ttRead = document.getElementById('thucthiReadBlock');
            const ttEdit = document.getElementById('thucthiEditBlock');
            ttRead.innerHTML = '';
            ttEdit.style.display = 'none';

            if (claim.status === 'Chờ thực thi' && isDetailEditMode) {
                ttEdit.style.display = 'block';
                document.getElementById('thucthiDateInput').value = new Date().toLocaleDateString('vi-VN');
                document.getElementById('thucthiNoteInput').value = '';
            } else {
                if (claim.status === 'Hoàn thành') {
                    ttRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Ngày chi trả thực tế:</strong> ${claim.thucthiDate || "20/07/2026"}</p>
                            <p><strong>Chứng từ thanh toán:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-receipt"></i> Chung_tu_chi_tien_uy_nhiem_chi.pdf</a></p>
                            <p><strong>Ghi chú:</strong> ${claim.thucthiNote || "Đã nhận tiền đầy đủ qua chuyển khoản ngân hàng."}</p>
                        </div>`;
                } else {
                    ttRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chưa thực thi chi trả bồi thường</div>`;
                }
            }

            // 7. Kinh phí bồi thường
            const kpRead = document.getElementById('kinhphiReadBlock');
            kpRead.innerHTML = '';
            if (claim.fundRequests && claim.fundRequests.length > 0) {
                let rowsHtml = '';
                claim.fundRequests.forEach(req => {
                    let statusBadge = '';
                    if (req.status === 'Hoàn thành') {
                        statusBadge = `<span class="badge bg-success" style="font-size:11px; padding:3px 8px; font-weight: 500;">Hoàn thành</span>`;
                    } else if (req.status === 'Chờ duyệt') {
                        statusBadge = `<span class="badge bg-warning" style="font-size:11px; padding:3px 8px; font-weight: 500;">Chờ duyệt</span>`;
                    } else if (req.status === 'Chờ chi trả') {
                        statusBadge = `<span class="badge bg-info" style="font-size:11px; padding:3px 8px; font-weight: 500;">Chờ chi trả</span>`;
                    } else {
                        statusBadge = `<span class="badge bg-secondary" style="font-size:11px; padding:3px 8px; font-weight: 500;">${req.status}</span>`;
                    }

                    rowsHtml += `
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 10px;">
                                <a href="javascript:void(0)" onclick="openFundRequestDetail('${req.code}')" style="font-weight: 700; color: #2563EB; text-decoration: underline;">
                                    ${req.code}
                                </a>
                            </td>
                            <td style="padding: 10px; font-weight: 500; color: #334155;">${req.type}</td>
                            <td style="padding: 10px; font-weight: 600; color: #1e293b;">${req.amount.toLocaleString('vi-VN')} đ</td>
                            <td style="padding: 10px; font-weight: 600; color: #0f766e;">${(req.approvedAmount || req.amount).toLocaleString('vi-VN')} đ</td>
                            <td style="padding: 10px; font-weight: 600; color: var(--danger-color);">${(req.payoutAmountReal || 0).toLocaleString('vi-VN')} đ</td>
                            <td style="padding: 10px; text-align: center;">${statusBadge}</td>
                        </tr>
                    `;
                });

                kpRead.innerHTML = `
                    <div style="background-color: #F0F9FF; border: 1px solid #BAE6FD; padding: 12px; border-radius: 6px; margin-bottom: 12px; font-size: 12.5px; color: #0369A1; line-height: 1.5; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-circle-info" style="font-size: 14px;"></i>
                        <span>Thông tin liên kết trực tuyến với <strong>Module Quản lý kinh phí bồi thường</strong>. Bấm vào mã yêu cầu để xem chi tiết chứng từ chi trả.</span>
                    </div>
                    <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background: white;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left;">
                            <thead>
                                <tr style="background-color: #F8FAFC; border-bottom: 1px solid var(--border-color); height: 38px;">
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Mã yêu cầu</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Loại yêu cầu</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Số tiền đề nghị</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Số tiền phê duyệt</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Thực tế chi trả</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569; text-align: center;">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                `;
            } else {
                kpRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Hồ sơ này không có đề nghị tạm ứng hoặc yêu cầu cấp kinh phí bồi thường.</div>`;
            }

            // Collapse all accordions by default
            forceCloseAccordion('thuly');
            forceCloseAccordion('bosung');
            forceCloseAccordion('xacminh');
            forceCloseAccordion('thuongluong');
            forceCloseAccordion('quyetdinh');
            forceCloseAccordion('thucthi');
            forceCloseAccordion('kinhphi');

            // Force open the one related to current edit/view state
            if (claim.status === 'Chờ tiếp nhận' || claim.status === 'Chờ thụ lý') {
                forceOpenAccordion('thuly');
            } else if (claim.status === 'Yêu cầu bổ sung') {
                forceOpenAccordion('bosung');
                if (isDetailEditMode) {
                    bsEdit.style.display = 'block';
                }
            } else if (claim.status === 'Đang xác minh thiệt hại') {
                forceOpenAccordion('xacminh');
            } else if (claim.status === 'Đang thương lượng') {
                forceOpenAccordion('thuongluong');
            } else if (claim.status === 'Chờ ban hành QĐ') {
                forceOpenAccordion('quyetdinh');
            } else if (claim.status === 'Chờ thực thi') {
                forceOpenAccordion('thucthi');
            } else if (claim.status === 'Hoàn thành') {
                forceOpenAccordion('thucthi');
                forceOpenAccordion('quyetdinh');
            }

            renderReadOnlyClaimInfo(claim);
            renderHonorRestorationTab(claim);
        }

        // Global object to track file names for the 4 steps
        let phddStepFileNames = { 1: null, 2: null, 3: null, 4: null };

        function handlePhddStepFile(step, input) {
            if (input.files && input.files.length > 0) {
                const fileName = input.files[0].name;
                phddStepFileNames[step] = fileName;
                setPhddStepFile(step, fileName);

            }
        }

        function setPhddStepFile(step, fileName) {
            phddStepFileNames[step] = fileName;
            // const wrapper = document.getElementById(`phddStep${step}FileWrapper`);
            const wrapper = document.getElementById(`phddStep${step}FileWrapper`);

            if (!wrapper) return;

            // Check if edit mode is active to show upload/delete buttons
            const isEdit = isDetailEditMode && (
                document.getElementById('editPhddButtons').style.display === 'flex' ||
                document.getElementById('editPhddButtons').style.display === ''
            );

            if (fileName) {
                let html = `<span style="font-size: 13px; font-weight: 600; color: #0f172a;"><i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i> ${fileName}</span>`;
                html += ` <a href="javascript:void(0)" class="action-link" style="color: var(--primary-color); font-size: 12.5px; font-weight: 600; margin-left: 8px;" onclick="viewPhddMockFile('${fileName}')">Xem file</a>`;
                if (isEdit) {
                    html += ` <span style="color: #cbd5e1; margin: 0 4px;">|</span>`;
                    html += ` <a href="javascript:void(0)" class="action-link" style="color: #ef4444; font-size: 12.5px; font-weight: 600;" onclick="removePhddStepFile(${step})">Xóa</a>`;
                }
                wrapper.innerHTML = html;
            } else {
                if (isEdit) {
                    wrapper.innerHTML = `
                        <label class="btn-brown" style="cursor: pointer; padding: 6px 12px; font-size: 13px; margin: 0;">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Chọn tệp đính kèm
                            <input type="file" style="display: none;" onchange="handlePhddStepFile(${step}, this)">
                        </label>
                        <span style="font-size: 13px; color: #64748b; font-style: italic;">Chưa có tệp đính kèm</span>
                    `;
                } else {
                    wrapper.innerHTML = `<span style="font-size: 13px; color: #94a3b8; font-style: italic;">Không có tài liệu đính kèm</span>`;
                }
            }
        }

        function removePhddStepFile(step) {
            showConfirmModal("Bạn có chắc chắn muốn gỡ tệp đính kèm này không?", () => {
                setPhddStepFile(step, null);
            });
        }

        function viewPhddMockFile(fileName) {
            const win = window.open("", "_blank");
            win.document.write(`<html><head><title>Xem tài liệu: ${fileName}</title>
            <style>body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f1f5f9; margin: 0; }
            .card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 500px; }</style>
            </head><body><div class="card">
            <h1 style="color: #0f766e; font-size: 22px;">Xem tài liệu đính kèm</h1>
            <p>Tên tài liệu: <strong>${fileName}</strong></p>
            <p style="font-style: italic; color: #64748b; font-size: 13px; line-height:1.6;">Hệ thống đang mô phỏng xem tệp đính kèm. File thực tế sẽ được hiển thị tại đây.</p>
            <button onclick="window.close()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top:15px;">Đóng cửa sổ</button>
            </div>`);
            win.document.close();
        }

        function toggleStep3FormInputs(val) {
            const direct = document.getElementById('editPhddStep3DirectGroup');
            const news = document.getElementById('editPhddStep3NewsGroup');
            if (val === 'Trực tiếp xin lỗi') {
                direct.style.display = 'block';
                news.style.display = 'none';
            } else if (val === 'Đăng báo xin lỗi') {
                direct.style.display = 'none';
                news.style.display = 'block';
            } else {
                direct.style.display = 'block';
                news.style.display = 'block';
            }
        }

        function updatePhddFlowStatus(claim) {
            // Step 1 Badge
            const s1Badge = document.getElementById('phddStep1Badge');
            if (claim.phddStep1No && claim.phddStep1Date) {
                s1Badge.className = "badge bg-success";
                s1Badge.innerText = "Đã thông báo chủ động";
            } else {
                s1Badge.className = "badge bg-teal";
                s1Badge.innerText = "Đang thực hiện";
            }

            // Step 2 Badge
            const s2Badge = document.getElementById('phddStep2Badge');
            if (claim.victimAlive === 'no') {
                s2Badge.className = "badge bg-warning";
                s2Badge.innerText = "Bỏ qua (Do đối tượng đã mất)";
            } else if (claim.phddStep2Opinion) {
                s2Badge.className = "badge bg-success";
                s2Badge.innerText = "Đã phản hồi: " + claim.phddStep2Opinion;
            } else {
                s2Badge.className = "badge bg-secondary";
                s2Badge.innerText = "Chờ cập nhật ý kiến";
            }

            // Step 3 Badge
            const s3Badge = document.getElementById('phddStep3Badge');
            if (claim.phddStep3No && claim.phddStep3Date) {
                s3Badge.className = "badge bg-success";
                s3Badge.innerText = "Đã thông báo tổ chức";
            } else {
                s3Badge.className = "badge bg-secondary";
                s3Badge.innerText = "Chờ cập nhật lịch";
            }

            // Step 4 Badge
            const s4Badge = document.getElementById('phddStep4Badge');
            if (claim.phddStep4DateAct) {
                s4Badge.className = "badge bg-success";
                s4Badge.innerText = "Hoàn thành thực thi";
            } else {
                s4Badge.className = "badge bg-secondary";
                s4Badge.innerText = "Chờ cập nhật kết quả";
            }
        }

        function setPhddInputsDisabled(disabled) {
            document.getElementById('editPhddStep1No').disabled = disabled;
            document.getElementById('editPhddStep1Date').disabled = disabled;
            document.getElementById('editPhddStep1Signer').disabled = disabled;

            const step2Radios = document.getElementsByName('editPhddStep2Opinion');
            step2Radios.forEach(radio => radio.disabled = disabled);
            document.getElementById('editPhddStep2OpinionText').disabled = disabled;

            document.getElementById('editPhddStep3No').disabled = disabled;
            document.getElementById('editPhddStep3Date').disabled = disabled;
            document.getElementById('editPhddStep3Type').disabled = disabled;
            document.getElementById('editPhddStep3DateExp').disabled = disabled;

            document.getElementById('editPhddStep3DirectVenue').disabled = disabled;
            document.getElementById('editPhddStep3DirectMembers').disabled = disabled;
            document.getElementById('editPhddStep3DirectContent').disabled = disabled;

            document.getElementById('editPhddStep3NewsCentral').disabled = disabled;
            document.getElementById('editPhddStep3NewsLocal').disabled = disabled;
            document.getElementById('editPhddStep3NewsUrl').disabled = disabled;

            document.getElementById('editPhddStep4DateAct').disabled = disabled;
            document.getElementById('editPhddStep4NewsNumbers').disabled = disabled;
            document.getElementById('editPhddStep4CommuneDate').disabled = disabled;
            document.getElementById('editPhddStep4CommuneReceiver').disabled = disabled;
            document.getElementById('editPhddStep4ResultDesc').disabled = disabled;
        }

        function updateStep4FieldsVisibility(step3Type, isDeceased) {
            const step4DirectSec = document.getElementById('step4DirectSection');
            const step4NewsSec = document.getElementById('step4NewsSection');

            const showDirect = !isDeceased && (step3Type === 'Trực tiếp xin lỗi' || step3Type === 'Cả hai hình thức');
            const showNews = isDeceased || (step3Type === 'Đăng báo xin lỗi' || step3Type === 'Cả hai hình thức');

            if (step4DirectSec) step4DirectSec.style.display = showDirect ? 'block' : 'none';
            if (step4NewsSec) step4NewsSec.style.display = showNews ? 'block' : 'none';

            const directDateLabel = document.getElementById('lblPhddStep4DateAct');
            if (directDateLabel) {
                directDateLabel.innerText = showDirect ? "Ngày tổ chức xin lỗi trực tiếp thực tế *" : "Ngày thực hiện đăng báo thực tế *";
            }
            const directFileLabel = document.getElementById('lblPhddStep4NewsFile');
            if (directFileLabel) {
                if (isDeceased) {
                    directFileLabel.innerText = "Biên nhận gửi báo giấy cho thân nhân & Biên bản niêm yết công khai *";
                } else {
                    directFileLabel.innerText = "Tệp scan Biên bản họp xin lỗi / Biên nhận gửi báo & Biên bản niêm yết *";
                }
            }
        }

        function renderHonorRestorationTab(claim) {
            const demandBox = document.getElementById('phddRequesterDemandBox');

            // Citizen demand pre-fill
            if (claim.restoreHonor) {
                if (demandBox) {
                    demandBox.style.display = 'block';
                    document.getElementById('phddDemandStatus').innerHTML = '<span class="badge bg-success">CÓ ĐỀ NGHỊ PHDD</span>';

                    const forms = [];
                    if (claim.phddFormApology !== false) forms.push("Trực tiếp xin lỗi (Điều 58)");
                    if (claim.phddFormNews) forms.push("Đăng báo xin lỗi (Điều 59)");
                    document.getElementById('phddDemandFormsText').innerText = forms.join(" và ") || "Chưa lựa chọn hình thức";
                }
            } else {
                if (demandBox) {
                    demandBox.style.display = 'block';
                    document.getElementById('phddDemandStatus').innerHTML = '<span class="badge bg-secondary">KHÔNG ĐỀ NGHỊ PHDD</span>';
                    document.getElementById('phddDemandFormsText').innerText = "--";
                }
            }

            // Step 1 values (UC434)
            document.getElementById('editPhddStep1No').value = claim.phddStep1No || "";
            document.getElementById('editPhddStep1Date').value = claim.phddStep1Date || "";
            document.getElementById('editPhddStep1Signer').value = claim.phddStep1Signer || "";
            phddStepFileNames[1] = claim.phddStep1File || null;

            // Step 2 values (UC436) - handle deceased bypass dynamically
            const isDeceased = (claim.victimAlive === 'no');
            
            const step2OpinionEl = document.getElementsByName('editPhddStep2Opinion')[0];
            const step2RadioContainer = step2OpinionEl ? step2OpinionEl.closest('.form-group') : null;
            const step2TextContainer = document.getElementById('editPhddStep2OpinionText') ? document.getElementById('editPhddStep2OpinionText').closest('.form-group') : null;
            const step2FileContainer = document.getElementById('phddStep2FileWrapper') ? document.getElementById('phddStep2FileWrapper').closest('.form-group') : null;
            
            let bypassNotice = document.getElementById('phddStep2BypassNotice');
            if (step2RadioContainer && !bypassNotice) {
                bypassNotice = document.createElement('div');
                bypassNotice.id = 'phddStep2BypassNotice';
                bypassNotice.className = 'form-alert warning';
                bypassNotice.style.display = 'flex';
                bypassNotice.style.alignItems = 'center';
                bypassNotice.style.gap = '8px';
                bypassNotice.style.padding = '10px 14px';
                bypassNotice.style.backgroundColor = '#FFFBEB';
                bypassNotice.style.border = '1px solid #FBBF24';
                bypassNotice.style.borderRadius = '6px';
                bypassNotice.style.color = '#B45309';
                bypassNotice.style.fontSize = '13px';
                bypassNotice.style.marginBottom = '12px';
                bypassNotice.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>Người bị thiệt hại đã chết. Theo quy định tại Điều 57.6 Luật TNBTCNN, bỏ qua bước lấy ý kiến phản hồi và thực hiện hình thức Đăng báo xin lỗi cải chính công khai.</span>';
                step2RadioContainer.parentNode.insertBefore(bypassNotice, step2RadioContainer);
            }

            if (isDeceased) {
                if (step2RadioContainer) step2RadioContainer.style.display = 'none';
                if (step2TextContainer) step2TextContainer.style.display = 'none';
                if (step2FileContainer) step2FileContainer.style.display = 'none';
                if (bypassNotice) bypassNotice.style.display = 'flex';
                phddStepFileNames[2] = null;
            } else {
                if (step2RadioContainer) step2RadioContainer.style.display = 'block';
                if (step2TextContainer) step2TextContainer.style.display = 'block';
                if (step2FileContainer) step2FileContainer.style.display = 'block';
                if (bypassNotice) bypassNotice.style.display = 'none';

                const step2Opinion = claim.phddStep2Opinion || "Đồng ý";
                const step2Radios = document.getElementsByName('editPhddStep2Opinion');
                step2Radios.forEach(radio => {
                    radio.checked = (radio.value === step2Opinion);
                });
                document.getElementById('editPhddStep2OpinionText').value = claim.phddStep2OpinionText || "";
                phddStepFileNames[2] = claim.phddStep2File || null;
            }

            // Step 3 values (UC435)
            document.getElementById('editPhddStep3No').value = claim.phddStep3No || "";
            document.getElementById('editPhddStep3Date').value = claim.phddStep3Date || "";

            let suggestedType = "Trực tiếp xin lỗi";
            if (claim.phddFormApology !== false && claim.phddFormNews) {
                suggestedType = "Cả hai hình thức";
            } else if (claim.phddFormNews) {
                suggestedType = "Đăng báo xin lỗi";
            }
            let step3Type = claim.phddStep3Type || suggestedType;

            const editButtons = document.getElementById('editPhddButtons');
            const canEdit = isDetailEditMode && (claim.status === 'Chờ thực thi' || claim.status === 'Đang thương lượng' || claim.status === 'Đang xác minh thiệt hại' || claim.status === 'Chờ thụ lý');

            if (isDeceased) {
                step3Type = "Đăng báo xin lỗi";
                document.getElementById('editPhddStep3Type').value = "Đăng báo xin lỗi";
                document.getElementById('editPhddStep3Type').disabled = true;
            } else {
                document.getElementById('editPhddStep3Type').value = step3Type;
                document.getElementById('editPhddStep3Type').disabled = canEdit ? false : true;
            }
            
            document.getElementById('editPhddStep3DateExp').value = claim.phddStep3DateExp || "";

            // Direct Step 3
            document.getElementById('editPhddStep3DirectVenue').value = claim.phddStep3DirectVenue || "";
            document.getElementById('editPhddStep3DirectMembers').value = claim.phddStep3DirectMembers || "";
            document.getElementById('editPhddStep3DirectContent').value = claim.phddStep3DirectContent || "";

            // News Step 3
            document.getElementById('editPhddStep3NewsCentral').value = claim.phddStep3NewsCentral || "";
            document.getElementById('editPhddStep3NewsLocal').value = claim.phddStep3NewsLocal || "";
            document.getElementById('editPhddStep3NewsUrl').value = claim.phddStep3NewsUrl || "";

            toggleStep3FormInputs(step3Type);
            phddStepFileNames[3] = claim.phddStep3File || null;

            // Step 4 values (UC437)
            document.getElementById('editPhddStep4DateAct').value = claim.phddStep4DateAct || "";
            document.getElementById('editPhddStep4VenueAct').value = claim.phddStep4VenueAct || "";
            document.getElementById('editPhddStep4MembersAct').value = claim.phddStep4MembersAct || "";
            
            document.getElementById('editPhddStep4NewsCentralAct').value = claim.phddStep4NewsCentralAct || "";
            document.getElementById('editPhddStep4NewsLocalAct').value = claim.phddStep4NewsLocalAct || "";
            document.getElementById('editPhddStep4NewsNumbers').value = claim.phddStep4NewsNumbers || "";
            document.getElementById('editPhddStep4NewsUrl').value = claim.phddStep4NewsUrl || "";
            
            document.getElementById('editPhddStep4CommuneDate').value = claim.phddStep4CommuneDate || "";
            document.getElementById('editPhddStep4CommuneReceiver').value = claim.phddStep4CommuneReceiver || "";
            document.getElementById('editPhddStep4ResultDesc').value = claim.phddStep4ResultDesc || "";
            phddStepFileNames[4] = claim.phddStep4File || null;

            // Render buttons before rendering attachment display blocks
            if (canEdit) {
                editButtons.style.display = 'flex';
                setPhddInputsDisabled(false);
                if (isDeceased) {
                    document.getElementById('editPhddStep3Type').disabled = true;
                }
            } else {
                editButtons.style.display = 'none';
                setPhddInputsDisabled(true);
            }

            // Dynamically show/hide Step 4 fields based on apology type and deceased state
            updateStep4FieldsVisibility(step3Type, isDeceased);

            // Now display files with correct permissions
            for (let s = 1; s <= 4; s++) {
                setPhddStepFile(s, phddStepFileNames[s]);
            }

            updatePhddFlowStatus(claim);
        }

        function cancelActionUpdate() {
            showCaseDetail(selectedClaimId, false);
        }

        function submitBoSungUpdate() {
            const content = document.getElementById('editBoSungContent').value.trim();
            if (!content) {
                showToast("Vui lòng nhập nội dung đã bổ sung!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.status = 'Chờ tiếp nhận';
                if (!claim.bosungLogs) claim.bosungLogs = [];
                claim.bosungLogs.push({
                    date: new Date().toLocaleDateString('vi-VN'),
                    sender: "Người dân bổ sung",
                    content: "Bổ sung hồ sơ thành công: " + content
                });

                claim.timeline.push({
                    title: "Bổ sung hồ sơ",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "Người dân đã bổ sung hồ sơ. Trạng thái quay lại [Chờ tiếp nhận]",
                    status: "completed"
                });

                showToast("Đã cập nhật kết quả bổ sung. Hồ sơ chuyển sang [Chờ tiếp nhận]!", "success");
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitXacMinhUpdate() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                let calculatedTotal = 0;
                claim.thietHaiList.forEach((item, idx) => {
                    const inputVal = parseFloat(document.getElementById(`editXmVal_${idx}`).value) || 0;
                    const inputNote = document.getElementById(`editXmNote_${idx}`).value.trim();
                    item.xmVal = inputVal;
                    item.xmNote = inputNote;
                    calculatedTotal += inputVal;
                });

                claim.status = 'Đang thương lượng';
                claim.xmTotalAmount = calculatedTotal;
                claim.xmOtherInfo = document.getElementById('editXacMinhOtherInfo').value.trim();
                claim.otherRestore = document.getElementById('editXacMinhOtherRestore').value.trim();
                claim.xmMethod = document.getElementById('editXacMinhMethod').value;
                claim.xmFiles = [...xmSelectedFiles];

                claim.timeline.push({
                    title: "Xác minh thiệt hại",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: `Hoàn thành báo cáo xác minh thiệt hại thực tế. Tổng số tiền xác minh: ${calculatedTotal.toLocaleString('vi-VN')} đ.`,
                    status: "completed"
                });

                claim.tlTimeExp = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString('vi-VN');
                claim.tlVenueExp = "Phòng họp cơ quan giải quyết bồi thường";
                claim.tlMembersExp = "Đại diện cơ quan, ông/bà " + claim.nyc;

                showToast("Hoàn thành xác minh thiệt hại. Hồ sơ chuyển sang [Đang thương lượng]!", "success");
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitTlDraftUpdate() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.tlTimeExp = document.getElementById('editTlTimeExp').value;
                claim.tlVenueExp = document.getElementById('editTlVenueExp').value;
                claim.tlMembersExp = document.getElementById('editTlMembersExp').value;
                claim.tlFiles = [...tlSelectedFiles];

                showToast("Đã lưu nháp thông tin dự kiến phiên thương lượng!", "success");
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitTlCompleteUpdate() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                const time = document.getElementById('editTlTimeAct').value.trim();
                const venue = document.getElementById('editTlVenueAct').value.trim();
                const members = document.getElementById('editTlMembersAct').value.trim();
                const result = document.getElementById('editTlResult').value;
                const desc = document.getElementById('editTlDesc').value.trim();

                if (!time || !venue || !members) {
                    showToast("Vui lòng điền đủ các thông tin thực tế họp thương lượng có dấu *!", "error");
                    return;
                }

                claim.tlTimeAct = time;
                claim.tlVenueAct = venue;
                claim.tlMembersAct = members;
                claim.tlResult = result;
                claim.tlFiles = [...tlSelectedFiles];

                claim.tlSessionIndex = (claim.tlSessionIndex || 0) + 1;
                claim.tlDisputeProgress = desc || "Hai bên không thống nhất được mức bồi thường.";
                claim.tlDisagreementReason = desc || "Chênh lệch ý kiến về chi phí thiệt hại.";

                if (!claim.tlHistory) claim.tlHistory = [];
                claim.tlHistory.push({
                    sessionIndex: claim.tlSessionIndex,
                    date: time,
                    venue: venue,
                    members: members,
                    result: result,
                    disputeProgress: claim.tlDisputeProgress,
                    disagreementReason: result === 'Thương lượng không thành công' ? claim.tlDisagreementReason : '',
                    files: [...tlSelectedFiles]
                });

                if (result === 'Thương lượng thành công') {
                    claim.status = 'Chờ ban hành QĐ';
                    claim.timeline.push({
                        title: `Thương lượng bồi thường (Phiên ${claim.tlSessionIndex})`,
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: `Thương lượng bồi thường thành công tại phiên thứ ${claim.tlSessionIndex}. Chuyển hồ sơ sang [Chờ ban hành QĐ]`,
                        status: "completed"
                    });
                    showToast("Thương lượng thành công! Hồ sơ chuyển sang [Chờ ban hành QĐ]!", "success");
                } else {
                    claim.status = 'Thương lượng không thành công';
                    claim.timeline.push({
                        title: `Thương lượng bồi thường (Phiên ${claim.tlSessionIndex})`,
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: `Thương lượng bồi thường không thành công tại phiên thứ ${claim.tlSessionIndex}.`,
                        status: "completed"
                    });
                    showToast("Thương lượng thất bại. Hồ sơ chuyển sang [Thương lượng không thành công]!", "success");
                }

                saveClaimsToLocal();
                showCaseDetail(selectedClaimId, false);
            }
        }

        function claimRedoNegotiation(id) {
            const claim = claimsList.find(c => c.id === id);
            if (claim) {
                claim.status = 'Đang thương lượng';
                claim.tlTimeAct = '';
                claim.tlVenueAct = '';
                claim.tlMembersAct = '';
                claim.tlResult = 'Thương lượng thành công';
                claim.tlFiles = [];
                
                saveClaimsToLocal();
                renderClaimsTable();
                showCaseDetail(id, true);
                showToast("Đã thiết lập lại trạng thái Đang thương lượng để tổ chức phiên tiếp theo!", "success");
            }
        }

        function approveAndSignDecision(id) {
            const claim = claimsList.find(c => c.id === id);
            if (claim) {
                showConfirmModal("Bạn có chắc chắn muốn duyệt ký số quyết định bồi thường này không?", () => {
                    const todayStr = new Date().toLocaleDateString('vi-VN');
                    
                    claim.decStatus = 'Hoàn thành';
                    claim.status = 'Chờ thực thi';
                    
                    claim.decPublishDate = todayStr;
                    claim.decEffectiveDate = todayStr;
                    claim.decSigner = "Lãnh đạo Cơ quan giải quyết bồi thường";
                    
                    claim.timeline.push({
                        title: "Duyệt ký số quyết định",
                        date: todayStr,
                        desc: `Lãnh đạo phê duyệt và ký số Quyết định bồi thường số ${claim.decNo || '104/QĐ-BT'}. Hồ sơ chuyển sang [Chờ thực thi]`,
                        status: "completed"
                    });
                    
                    saveClaimsToLocal();
                    renderClaimsTable();
                    showCaseDetail(id, false);
                    showToast("Duyệt ký số Quyết định thành công! Hồ sơ đã chuyển sang Chờ thực thi.", "success");
                });
            }
        }

        function openCreateDecisionForm() {
            document.getElementById('decisionFormInputs').style.display = 'block';
            document.getElementById('btnCreateNewDecision').style.display = 'none';
        }

        function closeCreateDecisionForm() {
            document.getElementById('decisionFormInputs').style.display = 'none';
            document.getElementById('btnCreateNewDecision').style.display = 'inline-flex';
        }

        function saveDecisionStatus(decStatus) {
            let invalidEl = null;
            const fields = [
                { id: 'decNoInput', msg: 'Đây là trường bắt buộc' },
                { id: 'decDateInput', msg: 'Đây là trường bắt buộc' },
                { id: 'decAmountInput', msg: 'Đây là trường bắt buộc' }
            ];

            fields.forEach(f => {
                const el = document.getElementById(f.id);
                if (el) {
                    el.classList.remove('is-invalid');
                    let grp = el.closest('.form-group');
                    let err = grp.querySelector('.error-message');
                    if (err) err.style.display = 'none';

                    const val = el.value.trim();
                    if (!val || (f.id === 'decAmountInput' && parseFloat(val) <= 0)) {
                        el.classList.add('is-invalid');
                        if (!err) {
                            err = document.createElement('div');
                            err.className = 'error-message';
                            err.style.color = '#ef4444';
                            err.style.fontSize = '12px';
                            err.style.marginTop = '4px';
                            err.innerText = f.msg;
                            grp.appendChild(err);
                        }
                        err.style.display = 'block';
                        if (!invalidEl) invalidEl = el;
                    }
                }
            });

            if (invalidEl) {
                invalidEl.focus();
                return;
            }

            const no = document.getElementById('decNoInput').value.trim();
            const date = document.getElementById('decDateInput').value.trim();
            const amount = parseFloat(document.getElementById('decAmountInput').value) || 0;
            const content = document.getElementById('decContentInput').value.trim();

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.decNo = no;
                claim.decDate = date;
                claim.decAmount = amount;
                claim.decContent = content;
                claim.decStatus = decStatus;

                if (decStatus === 'Chờ ký') {
                    claim.timeline.push({
                        title: "Trình ký quyết định bồi thường",
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: `Trình ký quyết định giải quyết bồi thường số ${no}. Số tiền: ${amount.toLocaleString('vi-VN')}đ`,
                        status: "completed"
                    });
                    showToast("Quyết định đã được trình ký thành công. Đang chờ lãnh đạo phê duyệt duyệt ký số!", "success");
                } else {
                    showToast("Đã lưu nháp dự thảo Quyết định giải quyết bồi thường!", "success");
                }

                closeCreateDecisionForm();
                saveClaimsToLocal();
                renderClaimsTable();
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitThucThiUpdate() {
            const time = document.getElementById('thucthiDateInput').value.trim();
            const note = document.getElementById('thucthiNoteInput').value.trim();

            if (!time) {
                showToast("Vui lòng điền ngày chi trả thực tế!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                if (claim.restoreHonor) {
                    if (claim.status !== 'Hoàn thành') {
                        showToast("Vui lòng hoàn tất các bước phục hồi danh dự (Section 1, 2, 3) trước khi Hoàn thành thực thi.", "error");
                        // Switch tab to Tab 2
                        switchDetailTab('xu-ly');
                        // Switch sub-tab to PHDD
                        switchDetailSubTab('phdd');
                        return;
                    }
                }

                claim.status = 'Hoàn thành';
                claim.thucthiDate = time;
                claim.thucthiNote = note || "Đã hoàn thành thực thi chi trả bồi thường.";

                claim.timeline.push({
                    title: "Thực thi giải quyết bồi thường",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "Đã hoàn thành chi trả tiền bồi thường.",
                    status: "completed"
                });

                showToast("Đã hoàn thành thực thi hồ sơ bồi thường!", "success");
                showCaseDetail(selectedClaimId, false);
            }
        }

        function validatePhddInput(elId, isError) {
            const el = document.getElementById(elId);
            if (!el) return;
            const parent = el.closest('.form-group');
            if (!parent) return;

            // Remove old error message
            const oldErr = parent.querySelector('.phdd-error-msg');
            if (oldErr) oldErr.remove();

            if (isError) {
                el.classList.add('is-invalid');
                const errMsg = document.createElement('div');
                errMsg.className = 'phdd-error-msg';
                errMsg.style.color = 'red';
                errMsg.style.fontSize = '11.5px';
                errMsg.style.marginTop = '4px';
                errMsg.style.fontWeight = 'bold';
                errMsg.innerText = 'Đây là trường bắt buộc';
                parent.appendChild(errMsg);
            } else {
                el.classList.remove('is-invalid');
            }
        }

        function validatePhddFile(step, isError) {
            const wrapper = document.getElementById(`phddStep${step}FileWrapper`);
            if (!wrapper) return;
            const parent = wrapper.closest('.form-group');
            if (!parent) return;

            const oldErr = parent.querySelector('.phdd-error-msg');
            if (oldErr) oldErr.remove();

            if (isError) {
                wrapper.style.border = '1px solid red';
                wrapper.style.padding = '6px';
                wrapper.style.borderRadius = '4px';
                const errMsg = document.createElement('div');
                errMsg.className = 'phdd-error-msg';
                errMsg.style.color = 'red';
                errMsg.style.fontSize = '11.5px';
                errMsg.style.marginTop = '4px';
                errMsg.style.fontWeight = 'bold';
                errMsg.innerText = 'Đây là trường bắt buộc';
                parent.appendChild(errMsg);
            } else {
                wrapper.style.border = 'none';
                wrapper.style.padding = '0';
            }
        }

        function submitHonorUpdate() {
            // Clear previous validation highlights
            const allPhddInputs = [
                'editPhddStep1No', 'editPhddStep1Date', 'editPhddStep1Signer',
                'editPhddStep3No', 'editPhddStep3Date', 'editPhddStep3DateExp',
                'editPhddStep3DirectVenue', 'editPhddStep3DirectMembers',
                'editPhddStep3NewsCentral', 'editPhddStep3NewsLocal',
                'editPhddStep4DateAct', 'editPhddStep4VenueAct', 'editPhddStep4MembersAct',
                'editPhddStep4NewsCentralAct', 'editPhddStep4NewsLocalAct',
                'editPhddStep4NewsNumbers', 'editPhddStep4NewsUrl',
                'editPhddStep4CommuneDate', 'editPhddStep4CommuneReceiver'
            ];
            allPhddInputs.forEach(id => {
                const el = document.getElementById(id);
                if (el) validatePhddInput(id, false);
            });
            for (let s = 1; s <= 4; s++) validatePhddFile(s, false);

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (!claim) return;

            // Read all field values
            const s1No = document.getElementById('editPhddStep1No').value.trim();
            const s1Date = document.getElementById('editPhddStep1Date').value.trim();
            const s1Signer = document.getElementById('editPhddStep1Signer').value.trim();
            const s1File = phddStepFileNames[1];

            const isDeceased = (claim.victimAlive === 'no');

            const s2Opinion = document.querySelector('input[name="editPhddStep2Opinion"]:checked') ? document.querySelector('input[name="editPhddStep2Opinion"]:checked').value : 'Đồng ý';
            const s2Text = document.getElementById('editPhddStep2OpinionText').value.trim();
            const s2File = phddStepFileNames[2];

            const s3No = document.getElementById('editPhddStep3No').value.trim();
            const s3Date = document.getElementById('editPhddStep3Date').value.trim();
            const s3Type = document.getElementById('editPhddStep3Type').value;
            const s3DateExp = document.getElementById('editPhddStep3DateExp').value.trim();
            const s3DirectVenue = document.getElementById('editPhddStep3DirectVenue').value.trim();
            const s3DirectMembers = document.getElementById('editPhddStep3DirectMembers').value.trim();
            const s3DirectContent = document.getElementById('editPhddStep3DirectContent').value.trim();
            const s3NewsCentral = document.getElementById('editPhddStep3NewsCentral').value.trim();
            const s3NewsLocal = document.getElementById('editPhddStep3NewsLocal').value.trim();
            const s3NewsUrl = document.getElementById('editPhddStep3NewsUrl').value.trim();
            const s3File = phddStepFileNames[3];

            const s4DateAct = document.getElementById('editPhddStep4DateAct').value.trim();
            const s4VenueAct = document.getElementById('editPhddStep4VenueAct').value.trim();
            const s4MembersAct = document.getElementById('editPhddStep4MembersAct').value.trim();
            
            const s4NewsCentralAct = document.getElementById('editPhddStep4NewsCentralAct').value.trim();
            const s4NewsLocalAct = document.getElementById('editPhddStep4NewsLocalAct').value.trim();
            const s4NewsNumbers = document.getElementById('editPhddStep4NewsNumbers').value.trim();
            const s4NewsUrl = document.getElementById('editPhddStep4NewsUrl').value.trim();
            
            const s4CommuneDate = document.getElementById('editPhddStep4CommuneDate').value.trim();
            const s4CommuneReceiver = document.getElementById('editPhddStep4CommuneReceiver').value.trim();
            const s4ResultDesc = document.getElementById('editPhddStep4ResultDesc').value.trim();
            const s4File = phddStepFileNames[4];

            // Validate based on what has been filled
            let hasS1 = s1No || s1Date || s1Signer || s1File;
            let hasS2 = isDeceased ? false : (s2Text || s2File);
            let hasS3 = s3No || s3Date || s3DateExp || s3DirectVenue || s3DirectMembers || s3NewsCentral || s3NewsLocal || s3File;
            let hasS4 = s4DateAct || s4VenueAct || s4MembersAct || s4NewsCentralAct || s4NewsLocalAct || s4NewsNumbers || s4NewsUrl || s4CommuneDate || s4CommuneReceiver || s4ResultDesc || s4File;

            let firstInvalid = null;

            // If Step 4 is filled, steps 1, 2, 3 must also be started
            if (hasS4) {
                hasS3 = true;
                hasS2 = isDeceased ? false : true;
                hasS1 = true;
            }
            if (hasS3) {
                hasS2 = isDeceased ? false : true;
                hasS1 = true;
            }
            if (hasS2) {
                hasS1 = true;
            }

            // Determine if direct and news fields should be validated in Step 4
            const showDirect = !isDeceased && (s3Type === 'Trực tiếp xin lỗi' || s3Type === 'Cả hai hình thức');
            const showNews = isDeceased || (s3Type === 'Đăng báo xin lỗi' || s3Type === 'Cả hai hình thức');

            // Validate Step 4 if active
            if (hasS4) {
                if (!s4DateAct) {
                    validatePhddInput('editPhddStep4DateAct', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4DateAct');
                }
                if (showDirect) {
                    if (!s4VenueAct) {
                        validatePhddInput('editPhddStep4VenueAct', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4VenueAct');
                    }
                    if (!s4MembersAct) {
                        validatePhddInput('editPhddStep4MembersAct', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4MembersAct');
                    }
                }
                if (showNews) {
                    if (!s4NewsCentralAct && !s4NewsLocalAct) {
                        validatePhddInput('editPhddStep4NewsCentralAct', true);
                        validatePhddInput('editPhddStep4NewsLocalAct', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4NewsCentralAct');
                    }
                    if (!s4NewsNumbers) {
                        validatePhddInput('editPhddStep4NewsNumbers', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4NewsNumbers');
                    }
                    if (!s4CommuneDate) {
                        validatePhddInput('editPhddStep4CommuneDate', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4CommuneDate');
                    }
                    if (!s4CommuneReceiver) {
                        validatePhddInput('editPhddStep4CommuneReceiver', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4CommuneReceiver');
                    }
                }
                if (!s4File) {
                    validatePhddFile(4, true);
                    if (!firstInvalid) firstInvalid = document.getElementById('phddStep4FileWrapper');
                }
            }

            // Validate Step 3 if active
            if (hasS3) {
                if (!s3No) {
                    validatePhddInput('editPhddStep3No', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3No');
                }
                if (!s3Date) {
                    validatePhddInput('editPhddStep3Date', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3Date');
                }
                if (!s3DateExp) {
                    validatePhddInput('editPhddStep3DateExp', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3DateExp');
                }
                if (s3Type === 'Trực tiếp xin lỗi' || s3Type === 'Cả hai hình thức') {
                    if (!s3DirectVenue) {
                        validatePhddInput('editPhddStep3DirectVenue', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3DirectVenue');
                    }
                    if (!s3DirectMembers) {
                        validatePhddInput('editPhddStep3DirectMembers', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3DirectMembers');
                    }
                }
                if (s3Type === 'Đăng báo xin lỗi' || s3Type === 'Cả hai hình thức') {
                    if (!s3NewsCentral && !s3NewsLocal) {
                        validatePhddInput('editPhddStep3NewsCentral', true);
                        validatePhddInput('editPhddStep3NewsLocal', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3NewsCentral');
                    }
                }
                if (!s3File) {
                    validatePhddFile(3, true);
                    if (!firstInvalid) firstInvalid = document.getElementById('phddStep3FileWrapper');
                }
            }

            // Validate Step 2 if active (only if not deceased)
            if (hasS2 && !isDeceased) {
                if (!s2File) {
                    validatePhddFile(2, true);
                    if (!firstInvalid) firstInvalid = document.getElementById('phddStep2FileWrapper');
                }
            }

            // Validate Step 1 if active
            if (hasS1) {
                if (!s1No) {
                    validatePhddInput('editPhddStep1No', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep1No');
                }
                if (!s1Date) {
                    validatePhddInput('editPhddStep1Date', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep1Date');
                }
                if (!s1Signer) {
                    validatePhddInput('editPhddStep1Signer', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep1Signer');
                }
                if (!s1File) {
                    validatePhddFile(1, true);
                    if (!firstInvalid) firstInvalid = document.getElementById('phddStep1FileWrapper');
                }
            }

            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
                return;
            }

            // Save variables to claim
            claim.phddStep1No = s1No || null;
            claim.phddStep1Date = s1Date || null;
            claim.phddStep1Signer = s1Signer || null;
            claim.phddStep1File = s1File || null;

            claim.phddStep2Opinion = isDeceased ? null : (s2Opinion || null);
            claim.phddStep2OpinionText = isDeceased ? null : (s2Text || null);
            claim.phddStep2File = isDeceased ? null : (s2File || null);

            claim.phddStep3No = s3No || null;
            claim.phddStep3Date = s3Date || null;
            claim.phddStep3Type = s3Type || null;
            claim.phddStep3DateExp = s3DateExp || null;
            claim.phddStep3DirectVenue = s3DirectVenue || null;
            claim.phddStep3DirectMembers = s3DirectMembers || null;
            claim.phddStep3DirectContent = s3DirectContent || null;
            claim.phddStep3NewsCentral = s3NewsCentral || null;
            claim.phddStep3NewsLocal = s3NewsLocal || null;
            claim.phddStep3NewsUrl = s3NewsUrl || null;
            claim.phddStep3File = s3File || null;

            claim.phddDateAct = s4DateAct || null;
            claim.phddStep4DateAct = s4DateAct || null;
            claim.phddStep4VenueAct = s4VenueAct || null;
            claim.phddStep4MembersAct = s4MembersAct || null;
            claim.phddStep4NewsCentralAct = s4NewsCentralAct || null;
            claim.phddStep4NewsLocalAct = s4NewsLocalAct || null;
            claim.phddNewsNumbers = s4NewsNumbers || null;
            claim.phddStep4NewsNumbers = s4NewsNumbers || null;
            claim.phddStep4NewsUrl = s4NewsUrl || null;
            claim.phddCommuneDate = s4CommuneDate || null;
            claim.phddStep4CommuneDate = s4CommuneDate || null;
            claim.phddCommuneReceiver = s4CommuneReceiver || null;
            claim.phddStep4CommuneReceiver = s4CommuneReceiver || null;
            claim.phddResultDesc = s4ResultDesc || null;
            claim.phddStep4ResultDesc = s4ResultDesc || null;
            claim.phddStep4File = s4File || null;

            showToast("Lưu thông tin phục hồi danh dự thành công!", "success");
            showCaseDetail(selectedClaimId, false);
        }

        function exportExcelB() {
            showToast("Kết xuất dữ liệu thống kê ra file Excel thành công!", "success");
        }

        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.className = 'toast-notif';
            toast.classList.add(type);
            toast.querySelector('span').innerText = message;

            const icon = toast.querySelector('i');
            icon.className = 'fa-solid';
            if (type === 'success') icon.classList.add('fa-circle-check');
            else if (type === 'error') icon.classList.add('fa-circle-xmark');
            else icon.classList.add('fa-circle-info');

            toast.classList.add('visible');
            setTimeout(() => {
                toast.classList.remove('visible');
            }, 3000);
        }

        function triggerFileInput(id) {
            document.getElementById(id).click();
        }

        function handleFileSelected(inputId, infoDivId) {
            const inp = document.getElementById(inputId);
            const info = document.getElementById(infoDivId);
            if (inp.files && inp.files[0]) {
                const name = inp.files[0].name;
                info.style.display = 'flex';
                info.querySelector('.file-name').innerText = name;
                showToast("Tải tệp đính kèm lên thành công!", "success");
            }
        }

        function removeAttachedFile(inputId, infoDivId) {
            document.getElementById(inputId).value = '';
            document.getElementById(infoDivId).style.display = 'none';
        }

        let xmSelectedFiles = [];

        function renderXmFiles() {
            const listDiv = document.getElementById('editXmFilesList');
            if (!listDiv) return;
            listDiv.innerHTML = '';
            xmSelectedFiles.forEach((file, idx) => {
                const item = document.createElement('div');
                item.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 13px;";
                item.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                        <span class="file-name" style="font-weight: 500; color: #334155;">${file.name}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <a href="#" onclick="event.preventDefault(); viewPhddMockFile('${file.name}')" style="color: var(--primary-light); font-weight: 500;">Xem file</a>
                        <span style="color: #cbd5e1;">|</span>
                        <a href="#" onclick="event.preventDefault(); removeXmFile(${idx})" style="color: #ef4444; font-weight: 500;">Xóa</a>
                    </div>
                `;
                listDiv.appendChild(item);
            });
        }

        function handleXmFilesSelected() {
            const input = document.getElementById('editXmFilesInput');
            if (input && input.files) {
                for (let i = 0; i < input.files.length; i++) {
                    xmSelectedFiles.push({ name: input.files[i].name, url: '#' });
                }
                renderXmFiles();
                showToast("Tải tệp đính kèm lên thành công!", "success");
            }
        }

        function removeXmFile(idx) {
            showConfirmModal("Bạn có chắc chắn muốn gỡ tệp đính kèm này không?", () => {
                xmSelectedFiles.splice(idx, 1);
                renderXmFiles();
            });
        }

        let tlSelectedFiles = [];

        function renderTlFiles() {
            const listDiv = document.getElementById('editTlFilesList');
            if (!listDiv) return;
            listDiv.innerHTML = '';
            tlSelectedFiles.forEach((file, idx) => {
                const item = document.createElement('div');
                item.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 13px;";
                item.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                        <span class="file-name" style="font-weight: 500; color: #334155;">${file.name}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <a href="#" onclick="event.preventDefault(); viewPhddMockFile('${file.name}')" style="color: var(--primary-light); font-weight: 500;">Xem file</a>
                        <span style="color: #cbd5e1;">|</span>
                        <a href="#" onclick="event.preventDefault(); removeTlFile(${idx})" style="color: #ef4444; font-weight: 500;">Xóa</a>
                    </div>
                `;
                listDiv.appendChild(item);
            });
        }

        function handleTlFilesSelected() {
            const input = document.getElementById('editTlFilesInput');
            if (input && input.files) {
                for (let i = 0; i < input.files.length; i++) {
                    tlSelectedFiles.push({ name: input.files[i].name, url: '#' });
                }
                renderTlFiles();
                showToast("Tải tệp đính kèm lên thành công!", "success");
            }
        }

        function removeTlFile(idx) {
            showConfirmModal("Bạn có chắc chắn muốn gỡ tệp đính kèm này không?", () => {
                tlSelectedFiles.splice(idx, 1);
                renderTlFiles();
            });
        }

        // Custom Confirmation Modal Helper
        let confirmCallback = null;

        function showConfirmModal(message, callback, options = {}) {
            const overlay = document.getElementById('customConfirmOverlay');
            document.getElementById('customConfirmMessage').innerText = message;
            confirmCallback = callback;

            const titleEl = document.getElementById('customConfirmTitle');
            if (titleEl) titleEl.innerText = options.title || "Xác nhận xóa";

            const btnYes = document.getElementById('customConfirmBtnYes');
            if (btnYes) {
                btnYes.innerText = options.btnYesText || "Đồng ý";
                if (options.btnYesClass) {
                    btnYes.className = `btn btn-sm ${options.btnYesClass}`;
                } else {
                    btnYes.className = "btn btn-danger btn-sm";
                }
            }

            const btnNo = document.getElementById('customConfirmBtnNo');
            if (btnNo) btnNo.innerText = options.btnNoText || "Hủy bỏ";

            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.classList.add('visible');
            }, 10);
        }

        function closeConfirmModal(result) {
            const overlay = document.getElementById('customConfirmOverlay');
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.style.display = 'none';
                // Restore defaults
                const titleEl = document.getElementById('customConfirmTitle');
                if (titleEl) titleEl.innerText = "Xác nhận xóa";
                const btnYes = document.getElementById('customConfirmBtnYes');
                if (btnYes) {
                    btnYes.innerText = "Đồng ý";
                    btnYes.className = "btn btn-danger btn-sm";
                }
                const btnNo = document.getElementById('customConfirmBtnNo');
                if (btnNo) btnNo.innerText = "Hủy bỏ";
            }, 200);

            if (result && confirmCallback) {
                confirmCallback();
            }
            confirmCallback = null;
        }

        const mockOfficers = [
            { code: "CB001", name: "Nguyễn Văn Chuyên Viên", role: "Chuyên viên thụ lý", dept: "Phòng bồi thường nhà nước" },
            { code: "CB002", name: "Trần Thị Chuyên Viên", role: "Chuyên viên nghiệp vụ", dept: "Phòng bồi thường nhà nước" },
            { code: "CB003", name: "Lê Văn Chuyên Viên", role: "Chuyên viên kiểm tra", dept: "Phòng bồi thường nhà nước" },
            { code: "CB004", name: "Phạm Hoàng Hải", role: "Chuyên viên thụ lý", dept: "Phòng quản lý thi hành án" },
            { code: "CB005", name: "Đỗ Minh Trí", role: "Chuyên viên thụ lý", dept: "Văn phòng Cơ quan giải quyết" }
        ];

        let officerSelectCallback = null;
        let officerSelectId = null;

        function renderModalOfficers(list) {
            const tbody = document.getElementById('modalOfficerTableBody');
            if (!tbody) return;
            tbody.innerHTML = '';
            list.forEach((off, idx) => {
                const tr = document.createElement('tr');
                tr.style.cursor = 'pointer';
                tr.onclick = () => {
                    const r = tr.querySelector('input[type="radio"]');
                    if (r) r.checked = true;
                };
                tr.innerHTML = `
                    <td style="text-align: center; padding: 10px;">
                        <input type="radio" name="modalOfficerRadio" value="${off.name}" ${idx === 0 ? 'checked' : ''}>
                    </td>
                    <td style="padding: 10px; font-weight: 500; color: #1e293b;">${off.code}</td>
                    <td style="padding: 10px; color: #334155;">${off.name}</td>
                    <td style="padding: 10px; color: #64748b;">${off.dept}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        function filterModalOfficers() {
            const query = document.getElementById('modalOfficerSearchInput').value.toLowerCase().trim();
            const filtered = mockOfficers.filter(off => 
                off.code.toLowerCase().includes(query) || 
                off.name.toLowerCase().includes(query) ||
                off.dept.toLowerCase().includes(query)
            );
            renderModalOfficers(filtered);
        }

        function getThietHaiName(type) {
            if (type >= 1 && type <= 6) {
                return thietHaiNames[type - 1];
            }
            return "Thiệt hại yêu cầu";
        }

        function showOfficerSelectModal(id, callback) {
            officerSelectId = id;
            officerSelectCallback = callback;
            
            // Reset search input and table
            const searchInput = document.getElementById('modalOfficerSearchInput');
            if (searchInput) searchInput.value = '';
            renderModalOfficers(mockOfficers);

            const overlay = document.getElementById('officerSelectOverlay');
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.classList.add('visible');
            }, 10);
        }

        function closeOfficerSelectModal(success) {
            const overlay = document.getElementById('officerSelectOverlay');
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 200);

            if (success && officerSelectCallback) {
                const radios = document.getElementsByName('modalOfficerRadio');
                let selectedOfficer = 'Nguyễn Văn Chuyên Viên';
                for (const r of radios) {
                    if (r.checked) {
                        selectedOfficer = r.value;
                        break;
                    }
                }
                officerSelectCallback(officerSelectId, selectedOfficer);
            }
            officerSelectCallback = null;
            officerSelectId = null;
        }

        let rejectionSelectId = null;
        let rejectionSelectType = '';
        let rejectionCallback = null;

        function showRejectionModal(id, rejectType, callback) {
            rejectionSelectId = id;
            rejectionSelectType = rejectType;
            rejectionCallback = callback;

            const isAddition = (rejectType === 'Yêu cầu bổ sung');
            const iconEl = document.getElementById('rejectionModalIcon');
            const headerEl = document.getElementById('rejectionModalHeader');
            const confirmBtn = document.getElementById('rejectionModalConfirmBtn');
            const textarea = document.getElementById('rejectionReasonTextarea');

            if (isAddition) {
                headerEl.style.color = '#d97706';
                iconEl.className = 'fa-solid fa-circle-question';
                document.getElementById('rejectionModalTitle').innerText = 'Yêu cầu bổ sung hồ sơ';
                document.getElementById('rejectionModalLabel').innerText = 'Nội dung yêu cầu bổ sung hồ sơ *:';
                textarea.placeholder = 'Nhập danh sách tài liệu hoặc lý do cần bổ sung hồ sơ chi tiết tại đây...';
                confirmBtn.innerText = 'Gửi yêu cầu';
                confirmBtn.style.backgroundColor = 'var(--primary-color)';
            } else {
                headerEl.style.color = 'var(--danger-color)';
                iconEl.className = 'fa-solid fa-ban';
                document.getElementById('rejectionModalTitle').innerText = rejectType === 'Từ chối tiếp nhận' ? 'Yêu cầu nhập lý do từ chối tiếp nhận' : 'Yêu cầu nhập lý do từ chối thụ lý';
                document.getElementById('rejectionModalLabel').innerText = rejectType === 'Từ chối tiếp nhận' ? 'Nội dung lý do từ chối tiếp nhận *:' : 'Nội dung lý do từ chối thụ lý *:';
                textarea.placeholder = rejectType === 'Từ chối tiếp nhận' ? 'Nhập lý do từ chối tiếp nhận chi tiết tại đây...' : 'Nhập lý do từ chối thụ lý chi tiết tại đây...';
                confirmBtn.innerText = 'Xác nhận từ chối';
                confirmBtn.style.backgroundColor = 'var(--danger-color)';
            }
            textarea.value = '';
            textarea.classList.remove('is-invalid');
            document.getElementById('rejectionReasonError').style.display = 'none';

            const overlay = document.getElementById('rejectionReasonOverlay');
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.classList.add('visible');
                textarea.focus();
            }, 10);
        }

        function closeRejectionModal(success) {
            if (success) {
                const textarea = document.getElementById('rejectionReasonTextarea');
                const val = textarea.value.trim();
                if (!val) {
                    textarea.classList.add('is-invalid');
                    document.getElementById('rejectionReasonError').style.display = 'block';
                    textarea.focus();
                    return; // prevent closing
                }

                const overlay = document.getElementById('rejectionReasonOverlay');
                overlay.classList.remove('visible');
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 200);

                if (rejectionCallback) {
                    rejectionCallback(rejectionSelectId, rejectionSelectType, val);
                }
                rejectionSelectId = null;
                rejectionSelectType = '';
                rejectionCallback = null;
            } else {
                const overlay = document.getElementById('rejectionReasonOverlay');
                overlay.classList.remove('visible');
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 200);
                rejectionSelectId = null;
                rejectionSelectType = '';
                rejectionCallback = null;
            }
        }

        function openFundRequestDetail(code) {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (!claim || !claim.fundRequests) return;
            const req = claim.fundRequests.find(r => r.code === code);
            if (!req) return;

            const modal = document.getElementById('fundRequestDetailOverlay');
            const iframe = document.getElementById('frModalIframe');
            const titleSpan = document.getElementById('frModalTitle');
            const badgeSpan = document.getElementById('frModalStatusBadge');

            titleSpan.innerHTML = `<i class="fa-solid fa-circle-info"></i> CHI TIẾT ĐỀ NGHỊ KINH PHÍ: ${req.code}`;

            // Style and set the status badge
            let statusClass = 'badge-draft';
            if (req.status === 'Chờ duyệt') statusClass = 'badge-pending';
            else if (req.status === 'Hoàn thành' || req.status === 'Đã cấp kinh phí') statusClass = 'badge-success';
            else if (req.status === 'Từ chối') statusClass = 'badge-danger';
            else if (req.status === 'Chờ chi trả') statusClass = 'badge-info';

            badgeSpan.className = 'badge ' + statusClass;
            badgeSpan.innerText = req.status;

            if (iframe) {
                iframe.src = `quan_ly_kinh_phi_boi_thuong.html?viewCode=${code}&embed=true`;
            }

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('visible');
            }, 10);
        }

        function closeFundRequestDetailModal() {
            const overlay = document.getElementById('fundRequestDetailOverlay');
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.style.display = 'none';
                const iframe = document.getElementById('frModalIframe');
                if (iframe) iframe.src = 'about:blank';
            }, 200);
        }

// ======== NEW LOGIC FOR VERDICT (BẢN ÁN) ========
function toggleVerdictFields(isChecked) {
    const verdictBlock = document.getElementById('verdictFieldsBlock');
    const docBaseBlock = document.getElementById('docBaseBlock');
    const advanceSection = document.getElementById('advancePaymentSection');
    const labels1 = document.querySelectorAll('.verdict-group-label');
    const labels2 = document.querySelectorAll('.verdict-sub-label');
    
    if (isChecked) {
        if(verdictBlock) verdictBlock.style.display = 'block';
        if(docBaseBlock) docBaseBlock.style.display = 'none';
        if(advanceSection) advanceSection.style.display = 'none';
        
        labels1.forEach(l => l.style.display = 'inline');
        labels2.forEach(l => l.style.display = 'inline');
        
        addVerdictDocumentRow();
    } else {
        if(verdictBlock) verdictBlock.style.display = 'none';
        if(docBaseBlock) docBaseBlock.style.display = 'block';
        if(advanceSection) advanceSection.style.display = 'block';
        
        labels1.forEach(l => l.style.display = 'none');
        labels2.forEach(l => l.style.display = 'none');
        
        removeVerdictDocumentRow();
    }
}

function toggleVerdictSource(source) {
    const originGroup = document.getElementById('verdictOriginClaimGroup');
    if (source === 'Điều 52') {
        if(originGroup) originGroup.style.display = 'block';
    } else {
        if(originGroup) originGroup.style.display = 'none';
    }
}

function handleVerdictOriginChange(value) {
    if (value && value.includes('Đang thực thi theo bản án')) {
        showToast("Đã liên kết với Hồ sơ gốc. Hồ sơ gốc sẽ được cập nhật trạng thái 'Đang thực thi theo bản án' khi lưu.", "info");
        
        let linkWrapper = document.getElementById('mockOriginLinkWrapper');
        if (!linkWrapper) {
            linkWrapper = document.createElement('div');
            linkWrapper.id = 'mockOriginLinkWrapper';
            linkWrapper.style.marginTop = '8px';
            const originInput = document.getElementById('verdictOriginClaim');
            originInput.parentNode.appendChild(linkWrapper);
        }
        linkWrapper.innerHTML = `<a href="#" onclick="openMockOriginClaim(); return false;" style="font-size: 13px; color: var(--primary-color); text-decoration: underline;"><i class="fa-solid fa-up-right-from-square"></i> Xem chi tiết hồ sơ gốc đã liên kết</a>`;
    } else {
        const linkWrapper = document.getElementById('mockOriginLinkWrapper');
        if (linkWrapper) linkWrapper.innerHTML = '';
    }
}

function openMockOriginClaim() {
    alert("Giả lập: Mở popup hoặc tab chi tiết cho Hồ sơ gốc HS-2023-001 ở trạng thái Đang thực thi theo bản án.");
}

function addVerdictDocumentRow() {
    const tableBody = document.getElementById('claimDocsTableBody');
    if (!tableBody) return;
    
    // Check if exists
    if(document.getElementById('docRowVerdict')) return;
    
    const tr = document.createElement('tr');
    tr.id = 'docRowVerdict';
    tr.innerHTML = `
        <td style="text-align: center;">V</td>
        <td>
            <strong>Bản án/Quyết định của Tòa án <span class="required">*</span></strong><br>
            <span style="font-size: 12px; color: var(--text-muted);">Bản sao y, bản trích lục (cho phép tải nhiều tệp)</span>
        </td>
        <td><span class="badge badge-draft">Chưa có tệp</span></td>
        <td style="text-align: center;">
            <div class="upload-wrapper" style="display: inline-block;">
                <input type="file" id="uploadVerdict" multiple style="display:none" onchange="handleVerdictDocUpload(this)">
                <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('uploadVerdict').click()">
                    <i class="fa-solid fa-cloud-arrow-up"></i> Tải lên
                </button>
            </div>
            <div id="verdictFilesContainer" style="margin-top: 5px; text-align: left;"></div>
        </td>
    `;
    tableBody.insertBefore(tr, tableBody.firstChild);
}

function removeVerdictDocumentRow() {
    const row = document.getElementById('docRowVerdict');
    if(row) row.remove();
}

function handleVerdictDocUpload(input) {
    const container = document.getElementById('verdictFilesContainer');
    const files = input.files;
    if(files.length === 0) return;
    
    const tr = document.getElementById('docRowVerdict');
    if(tr) tr.querySelector('.badge').className = 'badge badge-success';
    if(tr) tr.querySelector('.badge').innerText = files.length + ' tệp đính kèm';
    
    let html = '';
    for(let i=0; i<files.length; i++) {
        html += \`<div style="font-size: 12px; margin-top: 3px;">
            <i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> \${files[i].name} 
            <a href="#" style="color:var(--primary-color); margin-left: 5px;">Xem file</a>
            <a href="#" style="color:var(--danger-color); margin-left: 5px;" onclick="this.parentElement.remove(); return false;">Xóa</a>
        </div>\`;
    }
    container.innerHTML = html;
    showToast("Đã tải lên tệp tin bản án thành công!", "success");
}
// --- OFFICER CRUD LOGIC CHO QUAN_LY_BOI_THUONG ---
let activeOfficerTableId = 'claimOfficerTableBody'; // cÃ³ thá»ƒ lÃ  'claimOfficerTableBody' hoáº·c 'xmOfficerTableBody'

function renderClaimOfficerTable() {
    activeOfficerTableId = 'claimOfficerTableBody';
    _renderAnyOfficerTable('claimOfficerTableBody');
}

function renderXmOfficerTable() {
    activeOfficerTableId = 'xmOfficerTableBody';
    _renderAnyOfficerTable('xmOfficerTableBody');
}

function _renderAnyOfficerTable(tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    
    if (currentClaimOfficers.length === 0) {
        tbody.innerHTML = <tr><td colspan="6" style="text-align: center; color: var(--text-muted); font-style: italic;">ChÆ°a cÃ³ dá»¯ liá»‡u cÃ¡n bá»™.</td></tr>;
        return;
    }
    
    let html = '';
    currentClaimOfficers.forEach((off, idx) => {
        html += 
        <tr>
            <td style="text-align: center;">+${idx + 1}+</td>
            <td style="font-weight: 600;">+${off.name}+</td>
            <td>+${off.position}+</td>
            <td>+${off.agency}+</td>
            <td>
                +${off.status}+
                +${off.status === 'ÄÃ£ chuyá»ƒn cÃ´ng tÃ¡c' && off.currentAgency ? <br><span style="font-size: 11px; color: var(--text-muted);">(Hiá»‡n táº¡i: )</span> : ''}+
            </td>
            <td style="text-align: center;">
                <button type="button" class="icon-btn edit" onclick="editClaimOfficer(+${idx}+)" title="Sá»­a"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="icon-btn delete" onclick="confirmDeleteClaimOfficer(+${idx}+)" title="XÃ³a"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        ;
    });
    tbody.innerHTML = html;
}

function openClaimOfficerModal() {
    activeOfficerTableId = 'claimOfficerTableBody';
    _openOfficerModal();
}

function openEditXmOfficerModal() {
    activeOfficerTableId = 'xmOfficerTableBody';
    _openOfficerModal();
}

function _openOfficerModal() {
    document.getElementById('modalClaimOfficerId').value = '';
    document.getElementById('modalClaimOfficerName').value = '';
    document.getElementById('modalClaimOfficerPosition').value = '';
    document.getElementById('modalClaimOfficerAgency').value = '';
    document.getElementById('modalClaimOfficerStatus').value = 'Váº«n cÃ´ng tÃ¡c táº¡i Ä‘Æ¡n vá»‹ cÅ©';
    document.getElementById('modalClaimOfficerCurrentAgency').value = '';
    document.getElementById('modalClaimOfficerCurrentPosition').value = '';
    toggleModalClaimOfficerStatus();
    
    document.getElementById('claimOfficerModal').style.display = 'flex';
}

function editClaimOfficer(index) {
    const off = currentClaimOfficers[index];
    document.getElementById('modalClaimOfficerId').value = index;
    document.getElementById('modalClaimOfficerName').value = off.name;
    document.getElementById('modalClaimOfficerPosition').value = off.position;
    document.getElementById('modalClaimOfficerAgency').value = off.agency;
    document.getElementById('modalClaimOfficerStatus').value = off.status;
    document.getElementById('modalClaimOfficerCurrentAgency').value = off.currentAgency || '';
    document.getElementById('modalClaimOfficerCurrentPosition').value = off.currentPosition || '';
    toggleModalClaimOfficerStatus();
    
    document.getElementById('claimOfficerModal').style.display = 'flex';
}

function closeClaimOfficerModal() {
    document.getElementById('claimOfficerModal').style.display = 'none';
}

function toggleModalClaimOfficerStatus() {
    const status = document.getElementById('modalClaimOfficerStatus').value;
    const group = document.getElementById('modalClaimOfficerCurrentGroup');
    if (status === 'ÄÃ£ chuyá»ƒn cÃ´ng tÃ¡c') {
        group.style.display = 'grid';
    } else {
        group.style.display = 'none';
        document.getElementById('modalClaimOfficerCurrentAgency').value = '';
        document.getElementById('modalClaimOfficerCurrentPosition').value = '';
    }
}

function saveClaimOfficerModal() {
    const name = document.getElementById('modalClaimOfficerName').value.trim();
    const position = document.getElementById('modalClaimOfficerPosition').value.trim();
    const agency = document.getElementById('modalClaimOfficerAgency').value.trim();
    const status = document.getElementById('modalClaimOfficerStatus').value;
    const currentAgency = document.getElementById('modalClaimOfficerCurrentAgency').value.trim();
    const currentPosition = document.getElementById('modalClaimOfficerCurrentPosition').value.trim();
    
    if (!name) {
        showToast("Vui lÃ²ng nháº­p Há» vÃ  tÃªn cÃ¡n bá»™!", "error");
        return;
    }
    
    const off = { name, position, agency, status, currentAgency, currentPosition };
    const idx = document.getElementById('modalClaimOfficerId').value;
    
    if (idx !== '') {
        currentClaimOfficers[parseInt(idx)] = off;
    } else {
        currentClaimOfficers.push(off);
    }
    
    _renderAnyOfficerTable(activeOfficerTableId);
    closeClaimOfficerModal();
}

let claimOfficerToDelete = -1;
function confirmDeleteClaimOfficer(index) {
    claimOfficerToDelete = index;
    document.getElementById('customConfirmMessage').innerText = "Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xÃ³a cÃ¡n bá»™ nÃ y khá»i danh sÃ¡ch?";
    document.getElementById('customConfirmOverlay').style.display = 'flex';
    
    if (!window.originalCloseConfirmModal) window.originalCloseConfirmModal = window.closeConfirmModal;
    window.closeConfirmModal = function(confirmed) {
        document.getElementById('customConfirmOverlay').style.display = 'none';
        if (confirmed && claimOfficerToDelete > -1) {
            currentClaimOfficers.splice(claimOfficerToDelete, 1);
            _renderAnyOfficerTable(activeOfficerTableId);
            showToast("ÄÃ£ xÃ³a cÃ¡n bá»™ thÃ nh cÃ´ng", "success");
        }
        claimOfficerToDelete = -1;
        window.closeConfirmModal = window.originalCloseConfirmModal;
    };
}