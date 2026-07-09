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
                case 'hÃ nh chÃ­nh': return 'TRONG HOáº T Äá»˜NG QUáº¢N LÃ HÃ€NH CHÃNH';
                case 'hÃ¬nh sá»±': return 'TRONG HOáº T Äá»˜NG Tá» Tá»¤NG HÃŒNH Sá»°';
                case 'dÃ¢n sá»±': return 'TRONG HOáº T Äá»˜NG Tá» Tá»¤NG DÃ‚N Sá»°';
                case 'tá»‘ tá»¥ng hÃ nh chÃ­nh': return 'TRONG HOáº T Äá»˜NG Tá» Tá»¤NG HÃ€NH CHÃNH';
                case 'thi hÃ nh Ã¡n hÃ¬nh sá»±': return 'TRONG HOáº T Äá»˜NG THI HÃ€NH ÃN HÃŒNH Sá»°';
                case 'thi hÃ nh Ã¡n dÃ¢n sá»±': return 'TRONG HOáº T Äá»˜NG THI HÃ€NH ÃN DÃ‚N Sá»°';
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
                nycName: "Nguyá»…n VÄƒn Nam",
                nycRole: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                nycGender: "Nam",
                nycBirth: "12/05/1988",
                nycCardType: "CCCD",
                nycCardNo: "001088002934",
                nycCardDate: "15/08/2021",
                nycCardPlace: "Cá»¥c Cáº£nh sÃ¡t QLHC vá» TTXH",
                nycPhone: "0915223344",
                nycEmail: "namnv@example.com",
                nycCountry: "Viá»‡t Nam",
                nycTinhThanh: "HÃ  Ná»™i",
                nycAddressDetail: "Sá»‘ 20 Tráº§n HÆ°ng Äáº¡o, HoÃ n Kiáº¿m",
                hanhVi: "UBND PhÆ°á»ng Ä‘Ã£ thá»±c hiá»‡n láº­p biÃªn báº£n pháº¡t hÃ nh chÃ­nh sai tháº©m quyá»n Ä‘á»‘i vá»›i há»™ kinh doanh.",
                procTargetAgency: "Sá»Ÿ TÆ° phÃ¡p TP. HÃ  Ná»™i",
                fieldGroup: "hÃ nh chÃ­nh"
            },
            {
                code: "XD-2026-002",
                nycName: "LÃª HoÃ ng Háº£i",
                nycRole: "CÃ¡ nhÃ¢n, phÃ¡p nhÃ¢n Ä‘Æ°á»£c á»§y quyá»n há»£p phÃ¡p",
                nycGender: "Nam",
                nycBirth: "20/10/1990",
                nycCardType: "CCCD",
                nycCardNo: "001090008812",
                nycCardDate: "10/02/2023",
                nycCardPlace: "Cá»¥c Cáº£nh sÃ¡t QLHC vá» TTXH",
                nycPhone: "0988776655",
                nycEmail: "haile@example.com",
                nycCountry: "Viá»‡t Nam",
                nycTinhThanh: "Háº£i PhÃ²ng",
                nycAddressDetail: "Sá»‘ 45 LÃª Lá»£i, NgÃ´ Quyá»n",
                hanhVi: "Báº¯t táº¡m giam kháº©n cáº¥p khÃ´ng phÃª chuáº©n cá»§a Viá»‡n kiá»ƒm sÃ¡t.",
                procTargetAgency: "TÃ²a Ã¡n nhÃ¢n dÃ¢n TP. HÃ  Ná»™i",
                fieldGroup: "hÃ¬nh sá»±"
            }
        ];

        const thietHaiNames = [
            "TÃ i sáº£n bá»‹ xÃ¢m pháº¡m",
            "Thu nháº­p thá»±c táº¿ bá»‹ máº¥t/giáº£m sÃºt",
            "Váº­t cháº¥t do ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t",
            "Váº­t cháº¥t do sá»©c khá»e bá»‹ xÃ¢m pháº¡m",
            "Thiá»‡t háº¡i vá» tinh tháº§n",
            "CÃ¡c chi phÃ­ há»£p lÃ½ khÃ¡c"
        ];

        // Claim Mock Data
        let claimsList = [
            {
                id: "HS1",
                assignedOfficer: "Nguyá»…n VÄƒn ChuyÃªn ViÃªn",
                code: "BT-2026-001",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "12/06/2026",
                nyc: "Nguyá»…n VÄƒn A",
                victimAlive: "yes",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001085002934",
                address: "Sá»‘ 15 Ä‘Æ°á»ng Tráº§n HÆ°ng Äáº¡o, HoÃ n Kiáº¿m, HÃ  Ná»™i",
                phone: "0912345678",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh xá»­ pháº¡t trÃ¡i luáº­t sá»‘ 12/QD-XPVHC ngÃ y 10/02/2026 cá»§a UBND quáº­n Cáº§u Giáº¥y",
                hanhVi: "CÆ°á»¡ng cháº¿ thÃ¡o dá»¡ nhÃ  á»Ÿ khi chÆ°a cÃ³ quyáº¿t Ä‘á»‹nh hÃ nh chÃ­nh cÃ³ hiá»‡u lá»±c phÃ¡p luáº­t.",
                nhanQua: "Viá»‡c Ä‘áº­p phÃ¡ cÃ´ng trÃ¬nh gÃ¢y sá»¥p Ä‘á»• cÄƒn nhÃ  vÃ  hÆ° há»ng toÃ n bá»™ tÃ i sáº£n bÃªn trong.",
                status: "Äang thÆ°Æ¡ng lÆ°á»£ng",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                totalNum: 150000000,
                advanceNum: 30000000,
                advanceRec: "Nguyá»…n VÄƒn A",
                advanceRecCard: "001085002934",
                advanceRecAddress: "Sá»‘ 15 Ä‘Æ°á»ng Tráº§n HÆ°ng Äáº¡o, HoÃ n Kiáº¿m, HÃ  Ná»™i",
                advanceRecKenh: "tien-mat",
                advanceRecBank: "",
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Äang thÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng (háº¡n cÃ²n 5 ngÃ y)",
                restoreHonor: true,
                agency: "Sá»Ÿ TÆ° phÃ¡p HÃ  Ná»™i",
                deadline: "20/08/2026",
                files: [
                    { name: "ÄÆ¡n yÃªu cáº§u bá»“i thÆ°á»ng Máº«u 01.pdf", url: "#" },
                    { name: "BiÃªn báº£n hiá»‡n tráº¡ng thÃ¡o dá»¡ cÃ´ng trÃ¬nh.pdf", url: "#" }
                ],
                thietHaiList: [
                    { type: 1, calc: "Thiá»‡t háº¡i do tÃ i sáº£n bá»‹ xÃ¢m pháº¡m hoáº·c tiÃªu há»§y: 75.000.000 Ä‘", val: 75000000, xmVal: 70000000, xmNote: "XÃ¡c Ä‘á»‹nh theo Ä‘Æ¡n giÃ¡ bá»“i thÆ°á»ng cá»§a UBND Tá»‰nh" },
                    { type: 2, calc: "Thu nháº­p thá»±c táº¿ bá»‹ máº¥t/giáº£m sÃºt trong thá»i gian Ä‘Ã¬nh chá»‰: 45.000.000 Ä‘", val: 45000000, xmVal: 40000000, xmNote: "XÃ¡c minh theo sá»• sÃ¡ch doanh thu thá»±c táº¿" },
                    { type: 6, calc: "CÃ¡c chi phÃ­ há»£p lÃ½ khÃ¡c phÃ¡t sinh trá»±c tiáº¿p: 30.000.000 Ä‘", val: 30000000, xmVal: 30000000, xmNote: "XÃ¡c minh theo hÃ³a Ä‘Æ¡n chá»©ng tá»« há»£p lá»‡" }
                ],
                xmTotalAmount: 140000000,
                xmOtherInfo: "CÆ¡ quan giáº£i quyáº¿t Ä‘Ã£ tiáº¿n hÃ nh Ä‘o Ä‘áº¡c trá»±c tiáº¿p, kiá»ƒm kÃª hiá»‡n tráº¡ng tÃ i sáº£n thiá»‡t háº¡i vÃ  tháº©m Ä‘á»‹nh giÃ¡ Ä‘á»™c láº­p.",
                xmMethod: "tien-mat",
                xmFiles: [
                    { name: "Bien_ban_kiem_ke_va_dinh_gia_BT-2026-001.pdf", url: "#" },
                    { name: "Bao_cao_ket_qua_xac_minh_so_15.pdf", url: "#" }
                ],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "12/06/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p tá»« Nguyá»…n VÄƒn A", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "15/06/2026", desc: "Há»“ sÆ¡ há»£p lá»‡, Ä‘á»§ thÃ nh pháº§n.", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "17/06/2026", desc: "Quyáº¿t Ä‘á»‹nh thá»¥ lÃ½ sá»‘ 104/QÄ-TLHS cá»§a Sá»Ÿ TÆ° phÃ¡p.", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "02/07/2026", desc: "HoÃ n thÃ nh bÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i thá»±c táº¿.", status: "completed" },
                    { title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng", date: "08/07/2026", desc: "Äang tiáº¿n hÃ nh phiÃªn thÆ°Æ¡ng lÆ°á»£ng láº§n thá»© 1.", status: "active" }
                ],
                tlTimeExp: "08/07/2026 09:00",
                tlVenueExp: "PhÃ²ng há»p sá»‘ 3, Sá»Ÿ TÆ° phÃ¡p",
                tlMembersExp: "Äáº¡i diá»‡n Sá»Ÿ, Ã´ng Nguyá»…n VÄƒn A vÃ  chuyÃªn viÃªn xÃ¡c minh LÃª VÄƒn B.",
                phddStep1No: "12/TB-STP",
                phddStep1Date: "20/06/2026",
                phddStep1Signer: "Nguyá»…n VÄƒn Hoáº¡t (GiÃ¡m Ä‘á»‘c Sá»Ÿ)",
                phddStep1File: "Thong_bao_chuyen_PHDD.pdf",
                phddStep2Opinion: "Äá»“ng Ã½",
                phddStep2OpinionText: "Äá»“ng Ã½ thá»±c hiá»‡n phá»¥c há»“i danh dá»± báº±ng hÃ¬nh thá»©c xin lá»—i cÃ´ng khai vÃ  Ä‘Äƒng táº£i bÃ¡o chÃ­.",
                phddStep2File: "Y_kien_dong_y_nguoi_bi_hai.pdf",
                fundRequests: [
                    {
                        code: "KP-2026-008",
                        type: "Cáº¥p táº¡m á»©ng",
                        amount: 30000000,
                        approvedAmount: 30000000,
                        date: "15/06/2026",
                        status: "HoÃ n thÃ nh",
                        source: "Táº¡m á»©ng kinh phÃ­ Bá»™ TÃ i chÃ­nh",
                        cqCap: "Sá»Ÿ TÆ° phÃ¡p HÃ  Ná»™i",
                        payoutDate: "18/06/2026",
                        payoutAmountReal: 30000000,
                        payoutMethod: "Tiá»n máº·t trá»±c tiáº¿p táº¡i Kho báº¡c",
                        payoutRecName: "Nguyá»…n VÄƒn A",
                        notes: "Cáº¥p táº¡m á»©ng bá»“i thÆ°á»ng thiá»‡t háº¡i tinh tháº§n cho Ã´ng Nguyá»…n VÄƒn A theo há»“ sÆ¡ BT-2026-001."
                    }
                ]
            },
            {
                id: "HS2",
                assignedOfficer: "Nguyá»…n VÄƒn ChuyÃªn ViÃªn",
                code: "BT-2026-002",
                fieldGroup: "hÃ¬nh sá»±",
                date: "14/06/2026",
                nyc: "Tráº§n Thá»‹ B",
                victimAlive: "no",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "002092003845",
                address: "Sá»‘ 88 Ä‘Æ°á»ng Láº¡ch Tray, NgÃ´ Quyá»n, Háº£i PhÃ²ng",
                phone: "0904888999",
                role: "NgÆ°á»i thá»«a káº¿ cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Báº£n Ã¡n hÃ¬nh sá»± oan sai sá»‘ 15/2026/HS-ST ngÃ y 28/02/2026 cá»§a TAND tá»‰nh LÃ¢m Äá»“ng",
                hanhVi: "Báº¯t giam giá»¯ oan sai trong thá»i gian 3 thÃ¡ng liÃªn tiáº¿p.",
                nhanQua: "GÃ¢y tá»•n thÆ°Æ¡ng sá»©c khá»e vÃ  tinh tháº§n nghiÃªm trá»ng trong thá»i gian giam giá»¯ trÃ¡i luáº­t.",
                status: "Äang xÃ¡c minh thiá»‡t háº¡i",
                thulyVenue: "tÃ²a Ã¡n tá»‘ tá»¥ng",
                totalNum: 350000000,
                advanceNum: 0,
                slaDays: 12,
                slaStatus: "normal",
                slaText: "Äang tiáº¿n hÃ nh xÃ¡c minh thiá»‡t háº¡i",
                restoreHonor: true,
                agency: "TÃ²a Ã¡n nhÃ¢n dÃ¢n TP. HÃ  Ná»™i",
                deadline: "30/08/2026",
                files: [
                    { name: "ÄÆ¡n yÃªu cáº§u bá»“i thÆ°á»ng Máº«u 01.pdf", url: "#" },
                    { name: "Báº£n Ã¡n oan sai sá»‘ 15.pdf", url: "#" }
                ],
                thietHaiList: [
                    { type: 1, calc: "Thiá»‡t háº¡i do tÃ i sáº£n bá»‹ xÃ¢m pháº¡m, tiÃªu há»§y hoáº·c bá»‹ máº¥t", val: 50000000 },
                    { type: 2, calc: "Thu nháº­p thá»±c táº¿ bá»‹ máº¥t hoáº·c bá»‹ giáº£m sÃºt", val: 60000000 },
                    { type: 3, calc: "Thiá»‡t háº¡i do khÃ´ng sá»­ dá»¥ng, khai thÃ¡c Ä‘Æ°á»£c tÃ i sáº£n", val: 40000000 },
                    { type: 4, calc: "Thiá»‡t háº¡i vá» sá»©c khá»e do bá»‹ báº¯t giá»¯ oan sai", val: 80000000 },
                    { type: 5, calc: "Thiá»‡t háº¡i vá» tinh tháº§n do bá»‹ táº¡m giam 3 thÃ¡ng", val: 90000000 },
                    { type: 6, calc: "Chi phÃ­ thuÃª ngÆ°á»i bÃ o chá»¯a & chi phÃ­ Ä‘i láº¡i", val: 30000000 }
                ],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "14/06/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n thÃ´ng qua DVC trá»±c tuyáº¿n", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "16/06/2026", desc: "Há»“ sÆ¡ há»£p lá»‡.", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "18/06/2026", desc: "Quyáº¿t Ä‘á»‹nh thá»¥ lÃ½ sá»‘ 105/QÄ-TLHS.", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "Äang tiáº¿n hÃ nh", desc: "ChuyÃªn viÃªn Ä‘ang thu tháº­p tÃ i liá»‡u Ä‘á»‹nh giÃ¡ thiá»‡t háº¡i.", status: "active" }
                ]
            },
            {
                id: "HS3",
                assignedOfficer: "LÃª VÄƒn ChuyÃªn ViÃªn",
                code: "BT-2026-003",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "05/01/2023",
                nyc: "CÃ´ng ty Háº£i PhÃ¡t",
                victimAlive: "yes",
                cardType: "Tá»• chá»©c",
                cardNo: "0102030405",
                address: "Khu Ä‘Ã´ thá»‹ má»›i An HÆ°ng, HÃ  ÄÃ´ng, HÃ  Ná»™i",
                phone: "0243556677",
                role: "Tá»• chá»©c káº¿ thá»«a quyá»n, nghÄ©a vá»¥ cá»§a tá»• chá»©c bá»‹ thiá»‡t háº¡i Ä‘Ã£ cháº¥m dá»©t tá»“n táº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh thu há»“i Ä‘áº¥t trÃ¡i phÃ¡p luáº­t sá»‘ 888/QD-UBND ngÃ y 20/12/2022 cá»§a UBND thÃ nh phá»‘",
                hanhVi: "Thu há»“i Ä‘áº¥t dá»± Ã¡n xÃ¢y dá»±ng trÃ¡i tháº©m quyá»n lÃ m ngÆ°ng trá»‡ thi cÃ´ng.",
                nhanQua: "LÃ m phÃ¡t sinh chi phÃ­ pháº¡t há»£p Ä‘á»“ng tháº§u phá»¥ vÃ  kháº¥u hao thiáº¿t bá»‹ dá»«ng thi cÃ´ng vÃ´ lÃ½.",
                status: "HoÃ n thÃ nh",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                totalNum: 4800000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "ÄÃ£ chi tráº£ bá»“i thÆ°á»ng hoÃ n táº¥t",
                restoreHonor: true,
                phddFormApology: true,
                phddFormNews: false,
                phddStep1No: "12/TB-STP",
                phddStep1Date: "12/01/2023",
                phddStep1Signer: "Nguyá»…n VÄƒn ChuyÃªn (GiÃ¡m Ä‘á»‘c)",
                phddStep1File: "Thong_bao_to_chuc_PHDD.pdf",
                phddStep2Opinion: "Äá»“ng Ã½",
                phddStep2OpinionText: "Äá»“ng Ã½ thá»i gian vÃ  Ä‘á»‹a Ä‘iá»ƒm tá»• chá»©c buá»•i xin lá»—i trá»±c tiáº¿p táº¡i trá»¥ sá»Ÿ cÃ´ng ty.",
                phddStep2File: "Bien_ban_y_kien_PHDD.pdf",
                phddStep3No: "45/QÄ-PHDD",
                phddStep3Date: "20/01/2023",
                phddStep3Type: "Trá»±c tiáº¿p xin lá»—i",
                phddStep3DateExp: "25/01/2023",
                phddStep3DirectVenue: "Trá»¥ sá»Ÿ CÃ´ng ty Háº£i PhÃ¡t, Khu Ä‘Ã´ thá»‹ An HÆ°ng, HÃ  ÄÃ´ng, HÃ  Ná»™i",
                phddStep3DirectMembers: "Äáº¡i diá»‡n Sá»Ÿ TÆ° phÃ¡p HÃ  Ná»™i, Ä‘áº¡i diá»‡n UBND quáº­n HÃ  ÄÃ´ng, Ä‘áº¡i diá»‡n CÃ´ng ty Háº£i PhÃ¡t.",
                phddStep3DirectContent: "Tá»• chá»©c buá»•i xin lá»—i trá»±c tiáº¿p vÃ  cáº£i chÃ­nh cÃ´ng khai táº¡i trá»¥ sá»Ÿ CÃ´ng ty Háº£i PhÃ¡t.",
                phddStep3File: "Quyet_dinh_to_chuc_PHDD.pdf",
                phddStep4DateAct: "25/01/2023",
                phddStep4VenueAct: "Trá»¥ sá»Ÿ CÃ´ng ty Háº£i PhÃ¡t, Khu Ä‘Ã´ thá»‹ An HÆ°ng, HÃ  ÄÃ´ng, HÃ  Ná»™i",
                phddStep4MembersAct: "Äáº¡i diá»‡n Sá»Ÿ TÆ° phÃ¡p HÃ  Ná»™i, Ä‘áº¡i diá»‡n UBND quáº­n HÃ  ÄÃ´ng, Ä‘áº¡i diá»‡n CÃ´ng ty Háº£i PhÃ¡t.",
                phddStep4ResultDesc: "ÄÃ£ tá»• chá»©c thÃ nh cÃ´ng buá»•i xin lá»—i trá»±c tiáº¿p vÃ  cáº£i chÃ­nh cÃ´ng khai, ghi nháº­n sá»± chá»©ng kiáº¿n cá»§a cÃ¡c cÆ¡ quan há»¯u quan vÃ  cÃ´ng bá»‘ cÃ´ng khai táº¡i trá»¥ sá»Ÿ doanh nghiá»‡p.",
                phddStep4File: "Bien_ban_ket_qua_PHDD.pdf",
                agency: "UBND Quáº­n Cáº§u Giáº¥y",
                deadline: "10/05/2023",
                files: [{ name: "Há»“ sÆ¡ thÃ¡o dá»¡ cÃ´ng trÃ¬nh Háº£i PhÃ¡t.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "05/01/2023", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "10/01/2023", desc: "Thá»¥ lÃ½ giáº£i quyáº¿t bá»“i thÆ°á»ng", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "15/02/2023", desc: "ÄÃ£ ban hÃ nh bÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i", status: "completed" },
                    { title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng", date: "28/02/2023", desc: "ThÆ°Æ¡ng lÆ°á»£ng thÃ nh cÃ´ng", status: "completed" },
                    { title: "Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t bá»“i thÆ°á»ng", date: "10/03/2023", desc: "Ban hÃ nh quyáº¿t Ä‘á»‹nh bá»“i thÆ°á»ng sá»‘ 45/QÄ-BT", status: "completed" },
                    { title: "Thá»±c thi giáº£i quyáº¿t bá»“i thÆ°á»ng", date: "10/05/2023", desc: "ÄÃ£ hoÃ n thÃ nh thá»±c thi chi tráº£ 4,8 tá»· Ä‘á»“ng", status: "completed" }
                ],
                thucthiDate: "10/05/2023",
                thucthiNote: "ÄÃ£ chuyá»ƒn khoáº£n Ä‘á»§ sá»‘ tiá»n 4.800.000.000Ä‘ sang tÃ i khoáº£n CÃ´ng ty Háº£i PhÃ¡t.",
                fundRequests: [
                    {
                        code: "KP-2023-010",
                        type: "Cáº¥p kinh phÃ­ bá»“i thÆ°á»ng",
                        amount: 4800000000,
                        approvedAmount: 4800000000,
                        date: "12/03/2023",
                        status: "HoÃ n thÃ nh",
                        source: "NgÃ¢n sÃ¡ch Trung Æ°Æ¡ng",
                        cqCap: "Bá»™ TÃ i chÃ­nh",
                        payoutDate: "10/05/2023",
                        payoutAmountReal: 4800000000,
                        payoutMethod: "Chuyá»ƒn khoáº£n qua ngÃ¢n hÃ ng",
                        payoutRecName: "CÃ´ng ty Háº£i PhÃ¡t (Äáº¡i diá»‡n phÃ¡p luáº­t)",
                        payoutBankUser: "CÃ”NG TY Háº¢I PHÃT",
                        payoutBankAccount: "1100223344",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhÃ¡nh HÃ  TÃ¢y",
                        notes: "TrÃ¬nh duyá»‡t chi tráº£ kinh phÃ­ bá»“i thÆ°á»ng cho CÃ´ng ty Háº£i PhÃ¡t theo QÄ sá»‘ 45/QÄ-BT."
                    }
                ]
            },
            {
                id: "HS4",
                code: "BT-2026-004",
                fieldGroup: "dÃ¢n sá»±",
                date: "04/04/2026",
                nyc: "Tráº§n Minh T",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001094002934",
                address: "Sá»‘ 9 HÃ ng Trá»‘ng, HoÃ n Kiáº¿m, HÃ  Ná»™i",
                phone: "0901223344",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh Ã¡p dá»¥ng kháº©n cáº¥p táº¡m thá»i phong tá»a tÃ i khoáº£n sai luáº­t sá»‘ 02/QD-BPKCTT",
                hanhVi: "KÃª biÃªn tÃ i sáº£n quÃ¡ má»©c thiá»‡t háº¡i cáº§n báº£o Ä‘áº£m.",
                nhanQua: "Thiá»‡t háº¡i doanh thu bÃ¡n hÃ ng thá»±c táº¿ do phong tá»a tÃ i sáº£n.",
                status: "YÃªu cáº§u bá»• sung",
                thulyVenue: "tÃ²a Ã¡n dÃ¢n sá»± A",
                totalNum: 75000000,
                advanceNum: 0,
                slaDays: 4,
                slaStatus: "warning",
                slaText: "Chá» ngÆ°á»i dÃ¢n bá»• sung há»“ sÆ¡",
                restoreHonor: false,
                agency: "TÃ²a Ã¡n nhÃ¢n dÃ¢n quáº­n HoÃ n Kiáº¿m",
                deadline: "28/08/2026",
                files: [{ name: "ÄÆ¡n yÃªu cáº§u bá»“i thÆ°á»ng.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "04/04/2026", desc: "Há»“ sÆ¡ má»›i tiáº¿p nháº­n", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "08/04/2026", desc: "YÃªu cáº§u bá»• sung BiÃªn báº£n Ä‘á»‘i soÃ¡t ngÃ¢n hÃ ng.", status: "active" }
                ],
                bosungLogs: [
                    { date: "08/04/2026", sender: "ChuyÃªn viÃªn LÃª VÄƒn A", content: "YÃªu cáº§u bá»• sung BiÃªn báº£n Ä‘á»‘i soÃ¡t sao kÃª tÃ i khoáº£n ngÃ¢n hÃ ng Ä‘á»ƒ chá»©ng minh thiá»‡t háº¡i thá»±c táº¿." }
                ]
            },
            {
                id: "HS5",
                code: "BT-2026-005",
                fieldGroup: "tá»‘ tá»¥ng hÃ nh chÃ­nh",
                date: "10/02/2026",
                nyc: "LÃª VÄƒn D",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001089004823",
                address: "Sá»‘ 234 LÃ¡ng Háº¡, Äá»‘ng Äa, HÃ  Ná»™i",
                phone: "0911556677",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Báº£n Ã¡n hÃ nh chÃ­nh sá»‘ 02/2026/HC-ST",
                hanhVi: "KhÃ´ng cáº¥p giáº¥y phÃ©p xÃ¢y dá»±ng trÃ¡i luáº­t.",
                nhanQua: "NguyÃªn váº­t liá»‡u hÆ° há»ng do cháº­m khá»Ÿi cÃ´ng.",
                status: "Chá» thá»±c thi",
                thulyVenue: "tÃ²a Ã¡n tá»‘ tá»¥ng",
                totalNum: 250000000,
                advanceNum: 0,
                slaDays: 20,
                slaStatus: "normal",
                restoreHonor: true,
                agency: "Sá»Ÿ TÆ° phÃ¡p Háº£i PhÃ²ng",
                deadline: "05/09/2026",
                files: [{ name: "Báº£n Ã¡n hÃ nh chÃ­nh sá»‘ 02.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "10/02/2026", desc: "Äá»“ng bá»™ tá»« vá»¥ Ã¡n hÃ nh chÃ­nh", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "12/02/2026", desc: "Há»£p lá»‡", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "15/02/2026", desc: "Thá»¥ lÃ½ giáº£i quyáº¿t bá»“i thÆ°á»ng", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "12/03/2026", desc: "BÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i hoÃ n thÃ nh", status: "completed" },
                    { title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng", date: "20/03/2026", desc: "ThÆ°Æ¡ng lÆ°á»£ng thÃ nh cÃ´ng", status: "completed" },
                    { title: "Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t bá»“i thÆ°á»ng", date: "02/04/2026", desc: "ÄÃ£ ban hÃ nh quyáº¿t Ä‘á»‹nh sá»‘ 104/QÄ-BT", status: "completed" }
                ],
                decNo: "104/QÄ-BT",
                decDate: "02/04/2026",
                decAmount: 250000000,
                decContent: "Äá»“ng Ã½ bá»“i thÆ°á»ng thiá»‡t háº¡i váº­t cháº¥t 250.000.000Ä‘ cho Ã´ng LÃª VÄƒn D vÃ  tá»• chá»©c cáº£i chÃ­nh danh dá»± cÃ´ng khai.",
                phddType: "Trá»±c tiáº¿p xin lá»—i",
                phddDateExp: "10/07/2026",
                phddDirectVenue: "NhÃ  vÄƒn hÃ³a tá»• dÃ¢n phá»‘ 12, LÃ¡ng Háº¡",
                phddDirectMembers: "Äáº¡i diá»‡n Sá»Ÿ TÆ° phÃ¡p, Ä‘áº¡i diá»‡n UBND PhÆ°á»ng LÃ¡ng Háº¡ vÃ  ngÆ°á»i bá»‹ thiá»‡t háº¡i LÃª VÄƒn D.",
                phddDirectContent: "Buá»•i xin lá»—i trá»±c tiáº¿p cÃ´ng khai diá»…n giáº£i lá»i xin lá»—i chÃ¢n thÃ nh tá»« phÃ­a cÆ¡ quan quáº£n lÃ½ hÃ nh chÃ­nh.",
                fundRequests: [
                    {
                        code: "KP-2026-001",
                        type: "Cáº¥p kinh phÃ­ bá»“i thÆ°á»ng",
                        amount: 250000000,
                        approvedAmount: 250000000,
                        date: "02/05/2026",
                        status: "HoÃ n thÃ nh",
                        source: "NgÃ¢n sÃ¡ch Ä‘á»‹a phÆ°Æ¡ng (Dá»± phÃ²ng)",
                        cqCap: "Sá»Ÿ TÃ i chÃ­nh HÃ  Ná»™i",
                        payoutDate: "05/05/2026",
                        payoutAmountReal: 250000000,
                        payoutMethod: "Chuyá»ƒn khoáº£n qua ngÃ¢n hÃ ng",
                        payoutRecName: "LÃª VÄƒn D",
                        payoutBankUser: "LÃŠ VÄ‚N D",
                        payoutBankAccount: "123456789012",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhÃ¡nh Äá»‘ng Äa",
                        notes: "TrÃ¬nh duyá»‡t chi tráº£ kinh phÃ­ bá»“i thÆ°á»ng cho vá»¥ viá»‡c cá»§a Ã´ng LÃª VÄƒn D."
                    }
                ]
            },
            {
                id: "HS6",
                code: "BT-2026-006",
                fieldGroup: "thi hÃ nh Ã¡n dÃ¢n sá»±",
                date: "18/06/2026",
                nyc: "Pháº¡m Minh K",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001092008745",
                address: "Sá»‘ 45 LÃª Lá»£i, NgÃ´ Quyá»n, Háº£i PhÃ²ng",
                phone: "0904123456",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh hoÃ£n thi hÃ nh Ã¡n dÃ¢n sá»± trÃ¡i luáº­t sá»‘ 12/QD-HTHA",
                hanhVi: "HoÃ£n thi hÃ nh Ã¡n dÃ¢n sá»± dáº«n Ä‘áº¿n táº©u tÃ¡n tÃ i sáº£n.",
                nhanQua: "KhÃ´ng thu há»“i Ä‘Æ°á»£c khoáº£n ná»£ 420 triá»‡u.",
                status: "LÆ°u nhÃ¡p",
                thulyVenue: "tÃ²a Ã¡n dÃ¢n sá»± B",
                totalNum: 420000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "draft",
                slaText: "Äang lÆ°u nhÃ¡p, chÆ°a gá»­i tiáº¿p nháº­n",
                restoreHonor: false,
                agency: "Sá»Ÿ TÆ° phÃ¡p Háº£i PhÃ²ng",
                deadline: "30/09/2026",
                files: [{ name: "BiÃªn báº£n cÆ°á»¡ng cháº¿ bá»‹ há»§y.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "18/06/2026", desc: "Há»“ sÆ¡ Ä‘Æ°á»£c táº¡o dÆ°á»›i dáº¡ng lÆ°u nhÃ¡p.", status: "active" }
                ]
            },
            {
                id: "HS7",
                code: "BT-2026-007",
                fieldGroup: "thi hÃ nh Ã¡n dÃ¢n sá»±",
                date: "15/06/2026",
                nyc: "VÅ© VÄƒn L",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001091008743",
                address: "PhÆ°á»ng Quang Trung, TP. ThÃ¡i BÃ¬nh",
                phone: "0982345678",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh cÆ°á»¡ng cháº¿ thi hÃ nh Ã¡n sai Ä‘á»‘i tÆ°á»£ng",
                hanhVi: "CÆ°á»¡ng cháº¿ kÃª biÃªn nhÃ  Ä‘áº¥t cá»§a bÃªn thá»© ba khÃ´ng cÃ³ nghÄ©a vá»¥.",
                nhanQua: "Máº¥t tá»± do vÃ  tá»•n thÆ°Æ¡ng danh dá»±.",
                status: "Chá» tiáº¿p nháº­n",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                totalNum: 180000000,
                advanceNum: 80000000,
                advanceTinhThan: 50000000,
                advanceKhac: 30000000,
                advanceRecKenh: "chuyen-khoan",
                advanceBankUser: "VÅ¨ VÄ‚N L",
                advanceBankAccount: "1023456789",
                advanceBankName: "Vietcombank",
                advanceBankBranch: "Chi nhÃ¡nh ThÃ¡i BÃ¬nh",
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Má»›i gá»­i tiáº¿p nháº­n",
                restoreHonor: false,
                agency: "Cá»¥c Thi hÃ nh Ã¡n dÃ¢n sá»± TP. Háº£i PhÃ²ng",
                deadline: "15/09/2026",
                files: [{ name: "Quyáº¿t Ä‘á»‹nh kÃª biÃªn tÃ i sáº£n.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "15/06/2026", desc: "ÄÃ£ ná»™p trá»±c tuyáº¿n, chá» tiáº¿p nháº­n.", status: "active" }
                ]
            },
            {
                id: "HS8",
                code: "BT-2026-008",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "18/06/2026",
                nyc: "HoÃ ng Thá»‹ M",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001096008742",
                address: "PhÆ°á»ng Báº¡ch Äáº±ng, Hai BÃ  TrÆ°ng, HÃ  Ná»™i",
                phone: "0977665544",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh cÆ°á»¡ng cháº¿ thÃ¡o dá»¡ cÃ´ng trÃ¬nh phá»¥ sá»‘ 14/QD-CC",
                hanhVi: "Ãp dá»¥ng biá»‡n phÃ¡p kháº©n cáº¥p phong tá»a tÃ i khoáº£n ngÃ¢n hÃ ng trÃ¡i luáº­t.",
                nhanQua: "Thiá»‡t háº¡i tiá»n lÃ£i phÃ¡t sinh vÃ  pháº¡t cháº­m thanh toÃ¡n.",
                status: "Chá» thá»¥ lÃ½",
                thulyVenue: "tÃ²a Ã¡n tá»‘ tá»¥ng",
                totalNum: 90000000,
                advanceNum: 0,
                slaDays: 3,
                slaStatus: "normal",
                slaText: "Chá» thá»¥ lÃ½ giáº£i quyáº¿t bá»“i thÆ°á»ng",
                restoreHonor: false,
                agency: "UBND Tá»‰nh LÃ¢m Äá»“ng",
                deadline: "18/09/2026",
                files: [{ name: "Quyáº¿t Ä‘á»‹nh cÆ°á»¡ng cháº¿ thÃ¡o dá»¡.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "18/06/2026", desc: "Há»“ sÆ¡ Ä‘Ã£ Ä‘Æ°á»£c tiáº¿p nháº­n.", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "20/06/2026", desc: "Há»“ sÆ¡ há»£p lá»‡, Ä‘ang trÃ¬nh thá»¥ lÃ½.", status: "active" }
                ]
            },
            {
                id: "HS9",
                code: "BT-2026-009",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "10/05/2026",
                nyc: "Nguyá»…n VÄƒn E",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001090002934",
                address: "Sá»‘ 4 HÃ ng Báº¡c, HoÃ n Kiáº¿m, HÃ  Ná»™i",
                phone: "0911223344",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh xá»­ pháº¡t sá»‘ 14/QD-XP",
                hanhVi: "CÆ°á»¡ng cháº¿ tá»‹ch thu phÆ°Æ¡ng tiá»‡n váº­n táº£i sai quy trÃ¬nh.",
                nhanQua: "Máº¥t doanh thu kinh doanh váº­n táº£i trong 30 ngÃ y.",
                status: "Tá»« chá»‘i thá»¥ lÃ½",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                rejectType: "Tá»« chá»‘i thá»¥ lÃ½",
                rejectReason: "Há»“ sÆ¡ bá»‹ tá»« chá»‘i thá»¥ lÃ½ do háº¿t thá»i hiá»‡u yÃªu cáº§u bá»“i thÆ°á»ng theo quy Ä‘á»‹nh táº¡i Äiá»u 6 Luáº­t TrÃ¡ch nhiá»‡m bá»“i thÆ°á»ng cá»§a NhÃ  nÆ°á»›c (Ä‘Ã£ quÃ¡ 03 nÄƒm ká»ƒ tá»« ngÃ y ngÆ°á»i bá»‹ thiá»‡t háº¡i nháº­n Ä‘Æ°á»£c vÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng).",
                rejectDate: "14/05/2026 10:30",
                rejectOfficer: "Nguyá»…n VÄƒn Thá»§ TrÆ°á»Ÿng (Thá»§ trÆ°á»Ÿng cÆ¡ quan)",
                rejectionLog: [
                    {
                        date: "10/05/2026 14:00",
                        officer: "Nguyá»…n VÄƒn Thá»§ TrÆ°á»Ÿng (Thá»§ trÆ°á»Ÿng cÆ¡ quan)",
                        action: "Tá»« chá»‘i thá»¥ lÃ½",
                        reason: "Há»“ sÆ¡ chÆ°a Ä‘Ã­nh kÃ¨m Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t khiáº¿u náº¡i lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng."
                    },
                    {
                        date: "11/05/2026 09:30",
                        officer: "Nguyá»…n VÄƒn ChuyÃªn ViÃªn (CÃ¡n bá»™ thá»¥ lÃ½)",
                        action: "Giáº£i trÃ¬nh & TrÃ¬nh láº¡i",
                        reason: "CÃ¡n bá»™ Ä‘Ã£ liÃªn há»‡ ngÆ°á»i yÃªu cáº§u vÃ  Ä‘Ã­nh kÃ¨m bá»• sung Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t khiáº¿u náº¡i sá»‘ 14/QÄ-GQKN."
                    },
                    {
                        date: "12/05/2026 16:00",
                        officer: "Nguyá»…n VÄƒn Thá»§ TrÆ°á»Ÿng (Thá»§ trÆ°á»Ÿng cÆ¡ quan)",
                        action: "Tá»« chá»‘i thá»¥ lÃ½",
                        reason: "Báº£n sao Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t khiáº¿u náº¡i Ä‘Ã­nh kÃ¨m khÃ´ng cÃ³ chá»©ng thá»±c hoáº·c Ä‘á»‘i chiáº¿u báº£n chÃ­nh. YÃªu cáº§u Ä‘Ã­nh kÃ¨m báº£n quÃ©t mÃ u tá»« báº£n chÃ­nh."
                    },
                    {
                        date: "13/05/2026 10:15",
                        officer: "Nguyá»…n VÄƒn ChuyÃªn ViÃªn (CÃ¡n bá»™ thá»¥ lÃ½)",
                        action: "Giáº£i trÃ¬nh & TrÃ¬nh láº¡i",
                        reason: "ÄÃ£ cáº­p nháº­t tá»‡p quÃ©t mÃ u tá»« báº£n gá»‘c cá»§a Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t khiáº¿u náº¡i."
                    },
                    {
                        date: "14/05/2026 10:30",
                        officer: "Nguyá»…n VÄƒn Thá»§ TrÆ°á»Ÿng (Thá»§ trÆ°á»Ÿng cÆ¡ quan)",
                        action: "Tá»« chá»‘i thá»¥ lÃ½",
                        reason: "Há»“ sÆ¡ bá»‹ tá»« chá»‘i thá»¥ lÃ½ do háº¿t thá»i hiá»‡u yÃªu cáº§u bá»“i thÆ°á»ng theo quy Ä‘á»‹nh táº¡i Äiá»u 6 Luáº­t TrÃ¡ch nhiá»‡m bá»“i thÆ°á»ng cá»§a NhÃ  nÆ°á»›c (Ä‘Ã£ quÃ¡ 03 nÄƒm ká»ƒ tá»« ngÃ y ngÆ°á»i bá»‹ thiá»‡t háº¡i nháº­n Ä‘Æ°á»£c vÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng)."
                    }
                ],
                totalNum: 60000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Há»“ sÆ¡ bá»‹ tá»« chá»‘i do háº¿t thá»i hiá»‡u",
                restoreHonor: false,
                agency: "UBND Quáº­n Äá»‘ng Äa",
                deadline: "10/08/2026",
                files: [{ name: "Quyet dinh tu choi thu ly.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "10/05/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "14/05/2026", desc: "Tá»« chá»‘i thá»¥ lÃ½ do háº¿t thá»i hiá»‡u yÃªu cáº§u bá»“i thÆ°á»ng (Äiá»u 6).", status: "completed" }
                ]
            },
            {
                id: "HS10",
                code: "BT-2026-010",
                fieldGroup: "hÃ¬nh sá»±",
                date: "15/05/2026",
                nyc: "Nguyá»…n VÄƒn F",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001092003842",
                address: "PhÆ°á»ng NghÄ©a ÄÃ´, Cáº§u Giáº¥y, HÃ  Ná»™i",
                phone: "0988665544",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh táº¡m Ä‘Ã¬nh chá»‰ Ä‘iá»u tra bá»‹ can oan sai",
                hanhVi: "Giam giá»¯ oan sai 45 ngÃ y do sai sÃ³t Ä‘iá»u tra.",
                nhanQua: "Máº¥t tá»± do, áº£nh hÆ°á»Ÿng tÃ¢m lÃ½ vÃ  danh dá»± tráº§m trá»ng.",
                status: "ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng",
                thulyVenue: "tÃ²a Ã¡n tá»‘ tá»¥ng",
                totalNum: 120000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "ThÆ°Æ¡ng lÆ°á»£ng tháº¥t báº¡i, káº¿t thÃºc luá»“ng hÃ nh chÃ­nh",
                restoreHonor: false,
                agency: "TÃ²a Ã¡n nhÃ¢n dÃ¢n Tá»‰nh LÃ¢m Äá»“ng",
                deadline: "15/08/2026",
                files: [{ name: "BiÃªn báº£n thÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "15/05/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tuyáº¿n", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "18/05/2026", desc: "ÄÃ£ thá»¥ lÃ½ giáº£i quyáº¿t bá»“i thÆ°á»ng", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "15/06/2026", desc: "ÄÃ£ ban hÃ nh bÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i", status: "completed" },
                    { title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng", date: "02/07/2026", desc: "ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng do khÃ´ng thá»‘ng nháº¥t má»©c tiá»n bá»“i thÆ°á»ng.", status: "completed" }
                ]
            },
            {
                id: "HS11",
                code: "BT-2026-011",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "12/06/2026",
                nyc: "Tráº§n Thá»‹ G",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001095002934",
                address: "PhÆ°á»ng TrÃ ng Tiá»n, HoÃ n Kiáº¿m, HÃ  Ná»™i",
                phone: "0904556677",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh thu há»“i Ä‘áº¥t sai luáº­t sá»‘ 05/QD-TH",
                hanhVi: "KÃª biÃªn giáº£i phÃ³ng máº·t báº±ng sai diá»‡n tÃ­ch Ä‘áº¥t thá»±c táº¿.",
                nhanQua: "Giáº£m sÃºt diá»‡n tÃ­ch máº·t báº±ng kinh doanh buÃ´n bÃ¡n.",
                status: "Chá» ban hÃ nh QÄ",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                totalNum: 300000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Chá» ban hÃ nh quyáº¿t Ä‘á»‹nh bá»“i thÆ°á»ng chÃ­nh thá»©c",
                restoreHonor: false,
                agency: "Sá»Ÿ TÆ° phÃ¡p HÃ  Ná»™i",
                deadline: "12/09/2026",
                files: [{ name: "BiÃªn báº£n thÆ°Æ¡ng lÆ°á»£ng thÃ nh.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "12/06/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "16/06/2026", desc: "Thá»¥ lÃ½ giáº£i quyáº¿t bá»“i thÆ°á»ng", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "02/07/2026", desc: "Ban hÃ nh bÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i thá»±c táº¿", status: "completed" },
                    { title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng", date: "05/07/2026", desc: "ThÆ°Æ¡ng lÆ°á»£ng thÃ nh cÃ´ng, kÃ½ biÃªn báº£n thá»a thuáº­n bá»“i thÆ°á»ng.", status: "completed" }
                ]
            },
            {
                id: "HS12",
                code: "BT-2026-012",
                fieldGroup: "thi hÃ nh Ã¡n dÃ¢n sá»±",
                date: "25/05/2026",
                nyc: "LÃª VÄƒn H",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001091002934",
                address: "LÃª Äáº¡i HÃ nh, Hai BÃ  TrÆ°ng, HÃ  Ná»™i",
                phone: "0912233445",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh xá»­ lÃ½ tÃ i sáº£n kÃª biÃªn sai quy trÃ¬nh sá»‘ 15/QD-THADS",
                hanhVi: "BÃ¡n Ä‘áº¥u giÃ¡ tÃ i sáº£n kÃª biÃªn trÃ¡i quy Ä‘á»‹nh.",
                nhanQua: "Máº¥t tÃ i sáº£n sáº£n xuáº¥t kinh doanh gÃ¢y ngá»«ng trá»‡ nhÃ  xÆ°á»Ÿng.",
                status: "HoÃ n thÃ nh",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                totalNum: 850000000,
                advanceNum: 100000000,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "HoÃ n thÃ nh chi tráº£ bá»“i thÆ°á»ng",
                restoreHonor: true,
                phddFormApology: false,
                phddFormNews: true,
                phddStep1No: "25/TB-THA",
                phddStep1Date: "28/05/2026",
                phddStep1Signer: "Pháº¡m HoÃ ng Háº£i (Cá»¥c trÆ°á»Ÿng)",
                phddStep1File: "Thong_bao_PHDD_HS12.pdf",
                phddStep2Opinion: "Äá»“ng Ã½",
                phddStep2OpinionText: "NgÆ°á»i bá»‹ thiá»‡t háº¡i LÃª VÄƒn H thá»‘ng nháº¥t hÃ¬nh thá»©c Ä‘Äƒng bÃ¡o xin lá»—i vÃ  cáº£i chÃ­nh cÃ´ng khai.",
                phddStep2File: "Y_kien_phuc_hoi_danh_du_HS12.pdf",
                phddStep3No: "88/QÄ-THA",
                phddStep3Date: "05/06/2026",
                phddStep3Type: "ÄÄƒng bÃ¡o xin lá»—i",
                phddStep3DateExp: "12/06/2026",
                phddStep3NewsCentral: "BÃ¡o NhÃ¢n DÃ¢n",
                phddStep3NewsLocal: "BÃ¡o Háº£i PhÃ²ng",
                phddStep3NewsUrl: "https://nhandan.vn",
                phddStep3File: "Quyet_dinh_dang_bao_HS12.pdf",
                phddStep4DateAct: "12/06/2026",
                phddStep4NewsCentralAct: "BÃ¡o NhÃ¢n DÃ¢n",
                phddStep4NewsLocalAct: "BÃ¡o Háº£i PhÃ²ng",
                phddStep4NewsNumbers: "Sá»‘ bÃ¡o 25412 phÃ¡t hÃ nh ngÃ y 12/06/2026",
                phddStep4NewsUrl: "https://nhandan.vn/tin-tuc-cai-chinh-hs12",
                phddStep4CommuneDate: "15/06/2026",
                phddStep4CommuneReceiver: "UBND PhÆ°á»ng LÃª Äáº¡i HÃ nh, HÃ  Ná»™i",
                phddStep4ResultDesc: "ÄÃ£ hoÃ n thÃ nh viá»‡c Ä‘Äƒng xin lá»—i vÃ  cáº£i chÃ­nh cÃ´ng khai trÃªn 03 sá»‘ bÃ¡o liÃªn tiáº¿p cá»§a BÃ¡o NhÃ¢n DÃ¢n vÃ  BÃ¡o Háº£i PhÃ²ng, Ä‘á»“ng thá»i gá»­i thÃ´ng tin káº¿t quáº£ tá»›i UBND cáº¥p xÃ£ nÆ¡i cÆ° trÃº.",
                phddStep4File: "Minh_chung_dang_bao_PHDD.pdf",
                agency: "Cá»¥c Thi hÃ nh Ã¡n dÃ¢n sá»± HÃ  Ná»™i",
                deadline: "25/08/2026",
                files: [{ name: "Quyet dinh ban hanh gia quyet boi thuong.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "25/05/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "28/05/2026", desc: "Quyáº¿t Ä‘á»‹nh thá»¥ lÃ½ bá»“i thÆ°á»ng", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "20/06/2026", desc: "HoÃ n thÃ nh bÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i", status: "completed" },
                    { title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng", date: "30/06/2026", desc: "ThÆ°Æ¡ng lÆ°á»£ng thÃ nh cÃ´ng", status: "completed" },
                    { title: "Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t bá»“i thÆ°á»ng", date: "05/07/2026", desc: "Ban hÃ nh quyáº¿t Ä‘á»‹nh sá»‘ 56/QD-BT", status: "completed" },
                    { title: "Thá»±c thi giáº£i quyáº¿t bá»“i thÆ°á»ng", date: "20/07/2026", desc: "ÄÃ£ chi tráº£ xong 850 triá»‡u Ä‘á»“ng cho Ã´ng LÃª VÄƒn H", status: "completed" }
                ],
                thucthiDate: "20/07/2026",
                thucthiNote: "ÄÃ£ chi tráº£ Ä‘á»§ qua chuyá»ƒn khoáº£n, kháº¥u trá»« 100 triá»‡u Ä‘á»“ng Ä‘Ã£ táº¡m á»©ng trÆ°á»›c Ä‘Ã³.",
                fundRequests: [
                    {
                        code: "KP-2026-088",
                        type: "Cáº¥p táº¡m á»©ng",
                        amount: 100000000,
                        approvedAmount: 100000000,
                        date: "30/05/2026",
                        status: "HoÃ n thÃ nh",
                        source: "Táº¡m á»©ng kinh phÃ­ Bá»™ TÃ i chÃ­nh",
                        cqCap: "Cá»¥c Thi hÃ nh Ã¡n dÃ¢n sá»± HÃ  Ná»™i",
                        payoutDate: "05/06/2026",
                        payoutAmountReal: 100000000,
                        payoutMethod: "Chuyá»ƒn khoáº£n qua ngÃ¢n hÃ ng",
                        payoutRecName: "LÃª VÄƒn H",
                        payoutBankUser: "LÃŠ VÄ‚N H",
                        payoutBankAccount: "001100293421",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhÃ¡nh HÃ  Ná»™i",
                        notes: "Táº¡m á»©ng bá»“i thÆ°á»ng chi phÃ­ tinh tháº§n cho Ã´ng LÃª VÄƒn H."
                    },
                    {
                        code: "KP-2026-092",
                        type: "Cáº¥p kinh phÃ­ bá»“i thÆ°á»ng",
                        amount: 750000000,
                        approvedAmount: 750000000,
                        date: "06/07/2026",
                        status: "HoÃ n thÃ nh",
                        source: "NgÃ¢n sÃ¡ch Ä‘á»‹a phÆ°Æ¡ng (Dá»± phÃ²ng)",
                        cqCap: "Sá»Ÿ TÃ i chÃ­nh HÃ  Ná»™i",
                        payoutDate: "20/07/2026",
                        payoutAmountReal: 750000000,
                        payoutMethod: "Chuyá»ƒn khoáº£n qua ngÃ¢n hÃ ng",
                        payoutRecName: "LÃª VÄƒn H",
                        payoutBankUser: "LÃŠ VÄ‚N H",
                        payoutBankAccount: "001100293421",
                        payoutBankName: "Vietcombank",
                        payoutBankBranch: "Chi nhÃ¡nh HÃ  Ná»™i",
                        notes: "Cáº¥p kinh phÃ­ bá»“i thÆ°á»ng cÃ²n láº¡i (Tá»•ng 850 triá»‡u trá»« 100 triá»‡u táº¡m á»©ng)."
                    }
                ]
            },
            {
                id: "HS13",
                code: "BT-2026-013",
                fieldGroup: "hÃ¬nh sá»±",
                date: "02/06/2026",
                nyc: "Tráº§n VÄƒn T",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001095003921",
                address: "PhÆ°á»ng Nguyá»…n Du, Hai BÃ  TrÆ°ng, HÃ  Ná»™i",
                phone: "0904998877",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh há»§y bá» biá»‡n phÃ¡p ngÄƒn cháº·n oan sai",
                hanhVi: "Ãp dá»¥ng biá»‡n phÃ¡p cáº¥m Ä‘i khá»i nÆ¡i cÆ° trÃº trÃ¡i phÃ¡p luáº­t.",
                nhanQua: "KhÃ´ng thá»ƒ Ä‘i lÃ m vÃ  thá»±c hiá»‡n giao dá»‹ch kinh táº¿ Ä‘Ã£ kÃ½.",
                status: "Tá»« chá»‘i tiáº¿p nháº­n",
                totalNum: 45000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Tá»« chá»‘i tiáº¿p nháº­n há»“ sÆ¡",
                restoreHonor: false,
                agency: "Viá»‡n kiá»ƒm sÃ¡t nhÃ¢n dÃ¢n Tá»‘i cao",
                deadline: "02/09/2026",
                files: [{ name: "Quyet_dinh_oan_sai.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "02/06/2026", desc: "Há»“ sÆ¡ ná»™p trá»±c tuyáº¿n", status: "completed" },
                    { title: "Tiáº¿p nháº­n há»“ sÆ¡", date: "05/06/2026", desc: "Tá»« chá»‘i tiáº¿p nháº­n há»“ sÆ¡ do hÃ nh vi gÃ¢y thiá»‡t háº¡i xáº£y ra ngoÃ i pháº¡m vi Ä‘iá»u chá»‰nh.", status: "completed" }
                ],
                rejectType: "Tá»« chá»‘i tiáº¿p nháº­n",
                rejectReason: "Há»“ sÆ¡ khÃ´ng Ä‘áº§y Ä‘á»§ thÃ nh pháº§n hoáº·c khÃ´ng thuá»™c tháº©m quyá»n tiáº¿p nháº­n theo quy Ä‘á»‹nh.",
                rejectDate: "05/06/2026 09:30",
                rejectOfficer: "Tráº§n Thá»‹ ChuyÃªn ViÃªn",
                rejectionLog: [
                    {
                        date: "05/06/2026 09:30",
                        officer: "Tráº§n Thá»‹ ChuyÃªn ViÃªn",
                        action: "Tá»« chá»‘i tiáº¿p nháº­n",
                        reason: "Há»“ sÆ¡ khÃ´ng Ä‘áº§y Ä‘á»§ thÃ nh pháº§n hoáº·c khÃ´ng thuá»™c tháº©m quyá»n tiáº¿p nháº­n theo quy Ä‘á»‹nh."
                    }
                ]
            },
            {
                id: "HS14",
                code: "BT-2026-014",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "04/06/2026",
                nyc: "Pháº¡m VÄƒn K",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001095004123",
                address: "PhÆ°á»ng LÃ¡ng Háº¡, Äá»‘ng Äa, HÃ  Ná»™i",
                phone: "0904321321",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh xá»­ lÃ½ ká»· luáº­t cÃ´ng chá»©c trÃ¡i tháº©m quyá»n",
                hanhVi: "Ká»· luáº­t háº¡ báº­c lÆ°Æ¡ng sai quy Ä‘á»‹nh phÃ¡p luáº­t.",
                nhanQua: "Bá»‹ tá»•n tháº¥t thu nháº­p vÃ  danh dá»± uy tÃ­n táº¡i Ä‘Æ¡n vá»‹ cÃ´ng tÃ¡c.",
                status: "Tá»« chá»‘i tiáº¿p nháº­n",
                totalNum: 35000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Tá»« chá»‘i tiáº¿p nháº­n há»“ sÆ¡",
                restoreHonor: false,
                agency: "UBND ThÃ nh phá»‘ HÃ  Ná»™i",
                deadline: "04/09/2026",
                files: [{ name: "Don_yeu_cau_boi_thuong_k.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "04/06/2026", desc: "Há»“ sÆ¡ ná»™p qua Cá»•ng dá»‹ch vá»¥ cÃ´ng trá»±c tuyáº¿n", status: "completed" },
                    { title: "Tiáº¿p nháº­n há»“ sÆ¡", date: "08/06/2026", desc: "Tá»« chá»‘i tiáº¿p nháº­n há»“ sÆ¡ do khÃ´ng thuá»™c pháº¡m vi bá»“i thÆ°á»ng nhÃ  nÆ°á»›c.", status: "completed" }
                ],
                rejectType: "Tá»« chá»‘i tiáº¿p nháº­n",
                rejectReason: "Há»“ sÆ¡ khÃ´ng thuá»™c pháº¡m vi giáº£i quyáº¿t bá»“i thÆ°á»ng cá»§a nhÃ  nÆ°á»›c theo quy Ä‘á»‹nh cá»§a Luáº­t TrÃ¡ch nhiá»‡m bá»“i thÆ°á»ng cá»§a NhÃ  nÆ°á»›c.",
                rejectDate: "08/06/2026 14:15",
                rejectOfficer: "Tráº§n Thá»‹ ChuyÃªn ViÃªn",
                rejectionLog: [
                    {
                        date: "08/06/2026 14:15",
                        officer: "Tráº§n Thá»‹ ChuyÃªn ViÃªn",
                        action: "Tá»« chá»‘i tiáº¿p nháº­n",
                        reason: "Há»“ sÆ¡ khÃ´ng thuá»™c pháº¡m vi giáº£i quyáº¿t bá»“i thÆ°á»ng cá»§a nhÃ  nÆ°á»›c theo quy Ä‘á»‹nh cá»§a Luáº­t TrÃ¡ch nhiá»‡m bá»“i thÆ°á»ng cá»§a NhÃ  nÆ°á»›c."
                    }
                ]
            },
            {
                id: "HS15",
                code: "BT-2026-015",
                fieldGroup: "hÃ¬nh sá»±",
                date: "06/06/2026",
                nyc: "VÅ© Thá»‹ L",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001096009874",
                address: "PhÆ°á»ng Báº¿n NghÃ©, Quáº­n 1, TP Há»“ ChÃ­ Minh",
                phone: "0987123456",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Báº£n Ã¡n hÃ¬nh sá»± tuyÃªn vÃ´ tá»™i",
                hanhVi: "Báº¯t giá»¯ kháº©n cáº¥p khÃ´ng cÃ³ phÃª duyá»‡t cá»§a Viá»‡n kiá»ƒm sÃ¡t.",
                nhanQua: "Bá»‹ giam giá»¯ trÃ¡i phÃ¡p luáº­t trong thá»i gian 3 ngÃ y.",
                status: "Tá»« chá»‘i tiáº¿p nháº­n",
                totalNum: 25000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Tá»« chá»‘i tiáº¿p nháº­n há»“ sÆ¡",
                restoreHonor: false,
                agency: "Viá»‡n kiá»ƒm sÃ¡t nhÃ¢n dÃ¢n Quáº­n 1",
                deadline: "06/09/2026",
                files: [{ name: "Ban_an_tuyen_vo_toi.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "06/06/2026", desc: "Há»“ sÆ¡ ná»™p trá»±c tiáº¿p táº¡i bá»™ pháº­n má»™t cá»­a", status: "completed" },
                    { title: "Tiáº¿p nháº­n há»“ sÆ¡", date: "10/06/2026", desc: "Tá»« chá»‘i tiáº¿p nháº­n do thiáº¿u giáº¥y tá» chá»©ng minh thiá»‡t háº¡i thá»±c táº¿.", status: "completed" }
                ],
                rejectType: "Tá»« chá»‘i tiáº¿p nháº­n",
                rejectReason: "Há»“ sÆ¡ thiáº¿u cÃ¡c vÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng theo Ä‘Ãºng quy Ä‘á»‹nh táº¡i Äiá»u 52 Luáº­t TrÃ¡ch nhiá»‡m bá»“i thÆ°á»ng cá»§a NhÃ  nÆ°á»›c.",
                rejectDate: "10/06/2026 16:30",
                rejectOfficer: "LÃª VÄƒn ChuyÃªn ViÃªn",
                rejectionLog: [
                    {
                        date: "10/06/2026 16:30",
                        officer: "LÃª VÄƒn ChuyÃªn ViÃªn",
                        action: "Tá»« chá»‘i tiáº¿p nháº­n",
                        reason: "Há»“ sÆ¡ thiáº¿u cÃ¡c vÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng theo Ä‘Ãºng quy Ä‘á»‹nh táº¡i Äiá»u 52 Luáº­t TrÃ¡ch nhiá»‡m bá»“i thÆ°á»ng cá»§a NhÃ  nÆ°á»›c."
                    }
                ]
            },
            {
                id: "HS16",
                code: "BT-2026-016",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "12/05/2026",
                nyc: "Tráº§n VÄƒn M",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001090008892",
                address: "PhÆ°á»ng VÄ©nh Tuy, Hai BÃ  TrÆ°ng, HÃ  Ná»™i",
                phone: "0915667788",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh xá»­ lÃ½ vi pháº¡m hÃ nh chÃ­nh sai luáº­t sá»‘ 09/QD-XP",
                hanhVi: "CÆ°á»¡ng cháº¿ Ä‘Ã¬nh chá»‰ hoáº¡t Ä‘á»™ng kinh doanh nhÃ  hÃ ng Äƒn uá»‘ng sai tháº©m quyá»n.",
                nhanQua: "Thiá»‡t háº¡i doanh thu vÃ  chi phÃ­ máº·t báº±ng phÃ¡t sinh trong 15 ngÃ y Ä‘Ã³ng cá»­a.",
                status: "Tá»« chá»‘i thá»¥ lÃ½",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                rejectType: "Tá»« chá»‘i thá»¥ lÃ½",
                rejectReason: "Há»“ sÆ¡ bá»‹ tá»« chá»‘i thá»¥ lÃ½ do ngÆ°á»i yÃªu cáº§u bá»“i thÆ°á»ng khÃ´ng bá»• sung há»“ sÆ¡ Ä‘Ãºng háº¡n theo thÃ´ng bÃ¡o sá»‘ 44/TB-STP ngÃ y 15/05/2026.",
                rejectDate: "28/05/2026 11:00",
                rejectOfficer: "Nguyá»…n VÄƒn Thá»¥ LÃ½ (CÃ¡n bá»™ thá»¥ lÃ½)",
                rejectionLog: [
                    {
                        date: "28/05/2026 11:00",
                        officer: "Nguyá»…n VÄƒn Thá»¥ LÃ½ (CÃ¡n bá»™ thá»¥ lÃ½)",
                        action: "Tá»« chá»‘i thá»¥ lÃ½",
                        reason: "Há»“ sÆ¡ bá»‹ tá»« chá»‘i thá»¥ lÃ½ do ngÆ°á»i yÃªu cáº§u bá»“i thÆ°á»ng khÃ´ng bá»• sung há»“ sÆ¡ Ä‘Ãºng háº¡n theo thÃ´ng bÃ¡o sá»‘ 44/TB-STP ngÃ y 15/05/2026."
                    }
                ],
                totalNum: 80000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Tá»« chá»‘i thá»¥ lÃ½ do quÃ¡ háº¡n bá»• sung",
                restoreHonor: false,
                agency: "Sá»Ÿ TÆ° phÃ¡p HÃ  Ná»™i",
                deadline: "12/08/2026",
                files: [{ name: "Quyet_dinh_tu_choi_thu_ly_16.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "12/05/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p", status: "completed" },
                    { title: "YÃªu cáº§u bá»• sung há»“ sÆ¡", date: "15/05/2026", desc: "YÃªu cáº§u bá»• sung BiÃªn báº£n kiá»ƒm toÃ¡n doanh thu.", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "28/05/2026", desc: "Tá»« chá»‘i thá»¥ lÃ½ do khÃ´ng bá»• sung há»“ sÆ¡ Ä‘Ãºng thá»i háº¡n luáº­t Ä‘á»‹nh.", status: "completed" }
                ]
            },
            {
                id: "HS17",
                code: "BT-2026-017",
                fieldGroup: "thi hÃ nh Ã¡n dÃ¢n sá»±",
                date: "14/05/2026",
                nyc: "Pháº¡m Há»“ng N",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001091007788",
                address: "PhÆ°á»ng An Láº¡c, BÃ¬nh TÃ¢n, TP Há»“ ChÃ­ Minh",
                phone: "0903889900",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh Ä‘Ã¬nh chá»‰ thi hÃ nh Ã¡n sá»‘ 22/QD-CCTHA",
                hanhVi: "KÃª biÃªn tÃ i sáº£n cá»§a ngÆ°á»i khÃ´ng cÃ³ nghÄ©a vá»¥ thi hÃ nh Ã¡n.",
                nhanQua: "Thiá»‡t háº¡i do tÃ i sáº£n bá»‹ phong tá»a gÃ¢y cháº­m trá»… tiáº¿n Ä‘á»™ bÃ n giao.",
                status: "Tá»« chá»‘i thá»¥ lÃ½",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                rejectType: "Tá»« chá»‘i thá»¥ lÃ½",
                rejectReason: "Há»“ sÆ¡ bá»‹ tá»« chá»‘i thá»¥ lÃ½ do vá»¥ viá»‡c Ä‘Ã£ Ä‘Æ°á»£c giáº£i quyáº¿t báº±ng báº£n Ã¡n cÃ³ hiá»‡u lá»±c phÃ¡p luáº­t cá»§a TÃ²a Ã¡n nhÃ¢n dÃ¢n quáº­n BÃ¬nh TÃ¢n.",
                rejectDate: "20/05/2026 15:45",
                rejectOfficer: "LÃª VÄƒn Thá»¥ LÃ½ (CÃ¡n bá»™ thá»¥ lÃ½)",
                rejectionLog: [
                    {
                        date: "20/05/2026 15:45",
                        officer: "LÃª VÄƒn Thá»¥ LÃ½ (CÃ¡n bá»™ thá»¥ lÃ½)",
                        action: "Tá»« chá»‘i thá»¥ lÃ½",
                        reason: "Há»“ sÆ¡ bá»‹ tá»« chá»‘i thá»¥ lÃ½ do vá»¥ viá»‡c Ä‘Ã£ Ä‘Æ°á»£c giáº£i quyáº¿t báº±ng báº£n Ã¡n cÃ³ hiá»‡u lá»±c phÃ¡p luáº­t cá»§a TÃ²a Ã¡n nhÃ¢n dÃ¢n quáº­n BÃ¬nh TÃ¢n."
                    }
                ],
                totalNum: 180000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "Tá»« chá»‘i thá»¥ lÃ½ do Ä‘Ã£ giáº£i quyáº¿t táº¡i TÃ²a",
                restoreHonor: false,
                agency: "Chi cá»¥c Thi hÃ nh Ã¡n dÃ¢n sá»± BÃ¬nh TÃ¢n",
                deadline: "14/08/2026",
                files: [{ name: "Quyet_dinh_tu_choi_thu_ly_17.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "14/05/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "20/05/2026", desc: "Tá»« chá»‘i thá»¥ lÃ½ do sá»± viá»‡c Ä‘Ã£ Ä‘Æ°á»£c giáº£i quyáº¿t bá»Ÿi cÆ¡ quan tÃ²a Ã¡n.", status: "completed" }
                ]
            },
            {
                id: "HS18",
                code: "BT-2026-018",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "20/06/2026",
                nyc: "Tráº§n Thu O",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001095007721",
                address: "PhÆ°á»ng LÃª Lá»£i, TP Quy NhÆ¡n, BÃ¬nh Äá»‹nh",
                phone: "0905123456",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh xá»­ pháº¡t vi pháº¡m hÃ nh chÃ­nh sai luáº­t sá»‘ 08/QD-XP",
                hanhVi: "Tá»‹ch thu phÆ°Æ¡ng tiá»‡n ghe Ä‘Ã¡nh báº¯t cÃ¡ trÃ¡i phÃ©p khi chÆ°a cÃ³ chá»©ng cá»©.",
                nhanQua: "Thiá»‡t háº¡i do máº¥t thu nháº­p tá»« Ä‘Ã¡nh báº¯t thá»§y sáº£n trong 20 ngÃ y táº¡m giá»¯.",
                status: "Chá» thá»¥ lÃ½",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
                totalNum: 70000000,
                advanceNum: 0,
                slaDays: 4,
                slaStatus: "normal",
                slaText: "Chá» thá»¥ lÃ½ giáº£i quyáº¿t bá»“i thÆ°á»ng",
                restoreHonor: false,
                agency: "Chi cá»¥c Thá»§y sáº£n BÃ¬nh Äá»‹nh",
                deadline: "20/09/2026",
                files: [{ name: "Giáº¥y tá» ghe tÃ u Ä‘Äƒng kÃ½.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "20/06/2026", desc: "Há»“ sÆ¡ Ä‘Ã£ Ä‘Æ°á»£c cÃ¡n bá»™ má»™t cá»­a tiáº¿p nháº­n.", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "24/06/2026", desc: "Há»“ sÆ¡ há»£p lá»‡, Ä‘ang chá» phÃª duyá»‡t thá»¥ lÃ½.", status: "active" }
                ]
            },
            {
                id: "HS19",
                code: "BT-2026-019",
                fieldGroup: "hÃ¬nh sá»±",
                date: "22/06/2026",
                nyc: "Pháº¡m VÄƒn P",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001093006677",
                address: "PhÆ°á»ng HÃ²a Minh, LiÃªn Chiá»ƒu, ÄÃ  Náºµng",
                phone: "0914112233",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh Ä‘Ã¬nh chá»‰ vá»¥ Ã¡n Ä‘á»‘i vá»›i bá»‹ can",
                hanhVi: "Khá»Ÿi tá»‘ oan sai hÃ nh vi trá»™m cáº¯p tÃ i sáº£n.",
                nhanQua: "Bá»‹ giam giá»¯ oan sai 30 ngÃ y vÃ  táº¡m Ä‘Ã¬nh chá»‰ cÃ´ng tÃ¡c táº¡i cÆ¡ quan.",
                status: "Chá» thá»¥ lÃ½",
                thulyVenue: "tÃ²a Ã¡n tá»‘ tá»¥ng",
                totalNum: 55000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Chá» thá»¥ lÃ½ giáº£i quyáº¿t bá»“i thÆ°á»ng",
                restoreHonor: true,
                agency: "TÃ²a Ã¡n nhÃ¢n dÃ¢n Quáº­n LiÃªn Chiá»ƒu",
                deadline: "22/09/2026",
                files: [{ name: "Quyet_dinh_dinh_chi_vu_an.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "22/06/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p tá»« ngÆ°á»i yÃªu cáº§u.", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "26/06/2026", desc: "Há»“ sÆ¡ Ä‘Ã£ qua bÆ°á»›c tháº©m Ä‘á»‹nh thÃ nh pháº§n, chá» Thá»§ trÆ°á»Ÿng phÃª duyá»‡t thá»¥ lÃ½.", status: "active" }
                ]
            },
            {
                id: "HS20",
                code: "BT-2026-020",
                fieldGroup: "thi hÃ nh Ã¡n dÃ¢n sá»±",
                date: "24/06/2026",
                nyc: "Tráº§n VÄƒn Q",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001095009988",
                address: "PhÆ°á»ng NghÄ©a TÃ¢n, Cáº§u Giáº¥y, HÃ  Ná»™i",
                phone: "0904123987",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh thu há»“i Ä‘áº¥t Ä‘ai cá»§a cÆ¡ quan THADS",
                hanhVi: "KÃª biÃªn tÃ i sáº£n quÃ¡ thá»i háº¡n khÃ´ng giáº£i tá»a gÃ¢y Ä‘Ã¬nh trá»‡ sáº£n xuáº¥t.",
                nhanQua: "MÃ¡y mÃ³c sáº£n xuáº¥t bá»‹ rá»‰ sÃ©t hÆ° há»ng vÃ  máº¥t há»£p Ä‘á»“ng thÆ°Æ¡ng máº¡i.",
                status: "Chá» tiáº¿p nháº­n",
                totalNum: 140000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Chá» tiáº¿p nháº­n há»“ sÆ¡ bá»“i thÆ°á»ng",
                restoreHonor: false,
                agency: "Chi cá»¥c Thi hÃ nh Ã¡n dÃ¢n sá»± Cáº§u Giáº¥y",
                deadline: "24/09/2026",
                files: [{ name: "Giáº¥y Ä‘á» nghá»‹ bá»“i thÆ°á»ng máº«u 01.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "24/06/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tuyáº¿n qua cá»•ng dá»‹ch vá»¥ cÃ´ng.", status: "completed" }
                ]
            },
            {
                id: "HS21",
                code: "BT-2026-021",
                fieldGroup: "hÃ¬nh sá»±",
                date: "26/06/2026",
                nyc: "HoÃ ng VÄƒn R",
                cardType: "CÃ¡ nhÃ¢n",
                cardNo: "001096001122",
                address: "PhÆ°á»ng Lá»™c Thá», Nha Trang, KhÃ¡nh HÃ²a",
                phone: "0915998822",
                role: "NgÆ°á»i bá»‹ thiá»‡t háº¡i",
                docBase: "Quyáº¿t Ä‘á»‹nh Ä‘Ã¬nh chá»‰ Ä‘iá»u tra do hÃ nh vi khÃ´ng cáº¥u thÃ nh tá»™i pháº¡m",
                hanhVi: "Khá»Ÿi tá»‘ oan sai hÃ nh vi cá»‘ Ã½ gÃ¢y thÆ°Æ¡ng tÃ­ch.",
                nhanQua: "Bá»‹ táº¡m giam oan sai 20 ngÃ y vÃ  bá»‹ sa tháº£i táº¡i cÃ´ng ty cÅ©.",
                status: "Chá» tiáº¿p nháº­n",
                totalNum: 65000000,
                advanceNum: 0,
                slaDays: 6,
                slaStatus: "normal",
                slaText: "Chá» tiáº¿p nháº­n há»“ sÆ¡ bá»“i thÆ°á»ng",
                restoreHonor: true,
                agency: "TÃ²a Ã¡n nhÃ¢n dÃ¢n ThÃ nh phá»‘ Nha Trang",
                deadline: "26/09/2026",
                files: [{ name: "Giáº¥y tá» chá»©ng minh oan sai.pdf", url: "#" }],
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "26/06/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n trá»±c tiáº¿p tá»« ngÆ°á»i ná»™p.", status: "completed" }
                ]
            }
        ];

        // Dynamically initialize thietHaiList and verification details for mock claims
        claimsList.forEach(claim => {
            if (!claim.thietHaiList && claim.totalNum > 0) {
                if (claim.fieldGroup === 'hÃ¬nh sá»±') {
                    claim.thietHaiList = [
                        { type: 4, calc: thietHaiNames[3] + ": " + (claim.totalNum * 0.2).toLocaleString('vi-VN') + " Ä‘", val: claim.totalNum * 0.2 },
                        { type: 5, calc: thietHaiNames[4] + ": " + (claim.totalNum * 0.6).toLocaleString('vi-VN') + " Ä‘", val: claim.totalNum * 0.6 },
                        { type: 6, calc: thietHaiNames[5] + ": " + (claim.totalNum * 0.2).toLocaleString('vi-VN') + " Ä‘", val: claim.totalNum * 0.2 }
                    ];
                } else {
                    claim.thietHaiList = [
                        { type: 1, calc: thietHaiNames[0] + ": " + (claim.totalNum * 0.5).toLocaleString('vi-VN') + " Ä‘", val: claim.totalNum * 0.5 },
                        { type: 2, calc: thietHaiNames[1] + ": " + (claim.totalNum * 0.3).toLocaleString('vi-VN') + " Ä‘", val: claim.totalNum * 0.3 },
                        { type: 6, calc: thietHaiNames[5] + ": " + (claim.totalNum * 0.2).toLocaleString('vi-VN') + " Ä‘", val: claim.totalNum * 0.2 }
                    ];
                }
            }

            // Populate verification details if state is post-verification
            const isPostVerification = ['Äang thÆ°Æ¡ng lÆ°á»£ng', 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng', 'Chá» ban hÃ nh QÄ', 'Chá» thá»±c thi', 'HoÃ n thÃ nh'].includes(claim.status);
            if (isPostVerification) {
                if (claim.thietHaiList) {
                    claim.thietHaiList.forEach(item => {
                        if (item.xmVal === undefined) item.xmVal = item.val;
                        if (!item.xmNote) item.xmNote = "XÃ¡c minh Ä‘Ãºng giÃ¡ trá»‹ thá»±c táº¿ yÃªu cáº§u";
                    });
                }
                if (claim.xmTotalAmount === undefined) {
                    claim.xmTotalAmount = claim.totalNum;
                }
                if (!claim.xmOtherInfo) {
                    claim.xmOtherInfo = "CÆ¡ quan giáº£i quyáº¿t Ä‘Ã£ tiáº¿n hÃ nh Ä‘o Ä‘áº¡c trá»±c tiáº¿p, kiá»ƒm kÃª hiá»‡n tráº¡ng tÃ i sáº£n thiá»‡t háº¡i vÃ  tháº©m Ä‘á»‹nh giÃ¡ Ä‘á»™c láº­p.";
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
            if (num === 0) return "KhÃ´ng Ä‘á»“ng";
            const units = ["", "má»™t", "hai", "ba", "bá»‘n", "nÄƒm", "sÃ¡u", "báº£y", "tÃ¡m", "chÃ­n"];
            const thousands = ["", "ngÃ n", "triá»‡u", "tá»·"];

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
                        chunkWords += units[hundreds] + " trÄƒm ";
                    } else if (words !== "") {
                        chunkWords += "khÃ´ng trÄƒm ";
                    }

                    if (tens > 1) {
                        chunkWords += units[tens] + " mÆ°Æ¡i ";
                        if (ones === 1) chunkWords += "má»‘t";
                        else if (ones === 5) chunkWords += "lÄƒm";
                        else if (ones > 0) chunkWords += units[ones];
                    } else if (tens === 1) {
                        chunkWords += "mÆ°á»i ";
                        if (ones === 5) chunkWords += "lÄƒm";
                        else if (ones > 0) chunkWords += units[ones];
                    } else {
                        if (ones > 0) {
                            if (hundreds > 0 || words !== "") chunkWords += "láº» ";
                            chunkWords += units[ones];
                        }
                    }
                    chunkWords += " " + thousands[i] + " ";
                    words = chunkWords + words;
                }
                tempNum = Math.floor(tempNum / 1000);
                i++;
            }
            return words.trim().replace(/\s+/g, ' ') + " Ä‘á»“ng";
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
                tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:var(--text-muted); padding:30px;">KhÃ´ng tÃ¬m tháº¥y há»“ sÆ¡ nÃ o phÃ¹ há»£p</td></tr>`;
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
                if (item.status === 'HoÃ n thÃ nh') badgeClass = 'badge-success';
                else if (item.status === 'LÆ°u nhÃ¡p') badgeClass = 'badge-draft';
                else if (item.status === 'Chá» tiáº¿p nháº­n') badgeClass = 'badge-pending';
                else if (item.status === 'YÃªu cáº§u bá»• sung') badgeClass = 'badge-warning';
                else if (item.status === 'Chá» thá»¥ lÃ½') badgeClass = 'badge-pending';
                else if (item.status === 'Bá»‹ tá»« chá»‘i' || item.status === 'Tá»« chá»‘i tiáº¿p nháº­n' || item.status === 'Tá»« chá»‘i thá»¥ lÃ½') badgeClass = 'badge-danger';
                else if (item.status === 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng') badgeClass = 'badge-danger';
                else if (item.status === 'Chá» ban hÃ nh QÄ') badgeClass = 'badge-warning';
                else if (item.status === 'Chá» thá»±c thi') badgeClass = 'badge-warning';

                // Fixed slots
                const isDraft = item.status === 'LÆ°u nhÃ¡p';
                const isPending = item.status === 'Chá» tiáº¿p nháº­n';
                const hasUpdateRights = ['LÆ°u nhÃ¡p', 'YÃªu cáº§u bá»• sung', 'Äang xÃ¡c minh thiá»‡t háº¡i', 'Äang thÆ°Æ¡ng lÆ°á»£ng', 'Chá» ban hÃ nh QÄ', 'Chá» thá»±c thi', 'Tá»« chá»‘i thá»¥ lÃ½'].includes(item.status);

                const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn';
                const isAssignedToOther = (currentRole === 'chuyen-vien') && item.assignedOfficer && (item.assignedOfficer !== currentOfficer);

                const viewBtn = `<button class="icon-btn view" title="Xem chi tiáº¿t" onclick="event.stopPropagation(); showCaseDetail('${item.id}', false)"><i class="fa-solid fa-eye"></i></button>`;

                let updateBtn = `<button class="icon-btn edit" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="KhÃ´ng Ä‘Æ°á»£c cáº­p nháº­t á»Ÿ tráº¡ng thÃ¡i nÃ y"><i class="fa-solid fa-pen-to-square"></i></button>`;
                if (hasUpdateRights) {
                    if (isAssignedToOther) {
                        updateBtn = `<button class="icon-btn edit" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Há»“ sÆ¡ Ä‘Æ°á»£c giao cho cÃ¡n bá»™ ${item.assignedOfficer}. Báº¡n chá»‰ cÃ³ quyá»n Xem."><i class="fa-solid fa-pen-to-square"></i></button>`;
                    } else {
                        if (isDraft) {
                            updateBtn = `<button class="icon-btn edit" title="Cáº­p nháº­t há»“ sÆ¡ nhÃ¡p" onclick="event.stopPropagation(); openInlineClaimForm('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                        } else {
                            updateBtn = `<button class="icon-btn edit" title="Cáº­p nháº­t há»“ sÆ¡" onclick="event.stopPropagation(); showCaseDetail('${item.id}', true)"><i class="fa-solid fa-pen-to-square"></i></button>`;
                        }
                    }
                }

                let deleteBtn = `<button class="icon-btn delete" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ Ä‘Æ°á»£c xÃ³a há»“ sÆ¡ LÆ°u nhÃ¡p"><i class="fa-solid fa-trash-can"></i></button>`;
                if (isDraft) {
                    if (isAssignedToOther) {
                        deleteBtn = `<button class="icon-btn delete" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Há»“ sÆ¡ Ä‘Æ°á»£c giao cho cÃ¡n bá»™ ${item.assignedOfficer}. Báº¡n chá»‰ cÃ³ quyá»n Xem."><i class="fa-solid fa-trash-can"></i></button>`;
                    } else {
                        deleteBtn = `<button class="icon-btn delete" title="XÃ³a yÃªu cáº§u" onclick="event.stopPropagation(); deleteClaim('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>`;
                    }
                }

                let acceptBtn = `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ tiáº¿p nháº­n khi á»Ÿ tráº¡ng thÃ¡i Chá» tiáº¿p nháº­n"><i class="fa-solid fa-square-check"></i></button>`;
                if (isPending) {
                    if (isAssignedToOther) {
                        acceptBtn = `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Há»“ sÆ¡ Ä‘Æ°á»£c giao cho cÃ¡n bá»™ ${item.assignedOfficer}. Báº¡n chá»‰ cÃ³ quyá»n Xem."><i class="fa-solid fa-square-check"></i></button>`;
                    } else {
                        acceptBtn = `<button class="icon-btn accept" title="Tiáº¿p nháº­n há»“ sÆ¡" onclick="event.stopPropagation(); triggerAcceptClaim('${item.id}')"><i class="fa-solid fa-square-check"></i></button>`;
                    }
                }

                let suppBtn = `<button class="icon-btn supplement" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ yÃªu cáº§u bá»• sung khi á»Ÿ tráº¡ng thÃ¡i Chá» tiáº¿p nháº­n"><i class="fa-solid fa-circle-question"></i></button>`;
                if (isPending) {
                    if (isAssignedToOther) {
                        suppBtn = `<button class="icon-btn supplement" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Há»“ sÆ¡ Ä‘Æ°á»£c giao cho cÃ¡n bá»™ ${item.assignedOfficer}. Báº¡n chá»‰ cÃ³ quyá»n Xem."><i class="fa-solid fa-circle-question"></i></button>`;
                    } else {
                        suppBtn = `<button class="icon-btn supplement" title="YÃªu cáº§u bá»• sung" onclick="event.stopPropagation(); triggerRequireAdditionClaim('${item.id}')"><i class="fa-solid fa-circle-question"></i></button>`;
                    }
                }

                let denyBtn = `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ tá»« chá»‘i tiáº¿p nháº­n khi á»Ÿ tráº¡ng thÃ¡i Chá» tiáº¿p nháº­n"><i class="fa-solid fa-ban"></i></button>`;
                if (isPending) {
                    if (isAssignedToOther) {
                        denyBtn = `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Há»“ sÆ¡ Ä‘Æ°á»£c giao cho cÃ¡n bá»™ ${item.assignedOfficer}. Báº¡n chá»‰ cÃ³ quyá»n Xem."><i class="fa-solid fa-ban"></i></button>`;
                    } else {
                        denyBtn = `<button class="icon-btn reject" title="Tá»« chá»‘i tiáº¿p nháº­n" onclick="event.stopPropagation(); triggerRejectClaim('${item.id}', 'Tá»« chá»‘i tiáº¿p nháº­n')"><i class="fa-solid fa-ban"></i></button>`;
                    }
                }

                let actionsHtml = '';
                if (currentRole === 'thu-truong') {
                    const isChoThuly = item.status === 'Chá» thá»¥ lÃ½';
                    const lThuLyBtn = isChoThuly 
                        ? `<button class="icon-btn accept" title="Thá»¥ lÃ½ há»“ sÆ¡" onclick="event.stopPropagation(); triggerLeaderAcceptClaim('${item.id}')"><i class="fa-solid fa-square-check"></i></button>`
                        : `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ thá»¥ lÃ½ khi há»“ sÆ¡ á»Ÿ tráº¡ng thÃ¡i Chá» thá»¥ lÃ½"><i class="fa-solid fa-square-check"></i></button>`;
                    
                    const lTuChoiBtn = isChoThuly
                        ? `<button class="icon-btn reject" title="Tá»« chá»‘i thá»¥ lÃ½" onclick="event.stopPropagation(); triggerRejectClaim('${item.id}', 'Tá»« chá»‘i thá»¥ lÃ½')"><i class="fa-solid fa-ban"></i></button>`
                        : `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ tá»« chá»‘i thá»¥ lÃ½ khi há»“ sÆ¡ á»Ÿ tráº¡ng thÃ¡i Chá» thá»¥ lÃ½"><i class="fa-solid fa-ban"></i></button>`;

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
                    <td style="font-size:12px; color:var(--text-muted);">${item.agency || "ChÆ°a phÃ¢n cÃ´ng"}</td>
                    <td style="font-size:12px; color:var(--text-muted); font-weight: 500;">${item.assignedOfficer || '<span style="color:#94a3b8; font-style:italic;">ChÆ°a phÃ¢n cÃ´ng</span>'}</td>
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
                changeStatus(id, 'Chá» thá»¥ lÃ½', `ÄÃ£ tiáº¿p nháº­n há»“ sÆ¡ bá»“i thÆ°á»ng thÃ nh cÃ´ng!`);
                
                // Auto-generate budget proposal if claim has advance request (advanceNum > 0)
                if (claim.advanceNum > 0) {
                    const localProposals = JSON.parse(localStorage.getItem('proposalsList')) || [];
                    // Check if a proposal for this claim already exists to avoid duplicates
                    const exists = localProposals.some(p => p.ycbtCode === claim.code && (p.type === 'Äá» nghá»‹ táº¡m á»©ng' || p.type === 'Cáº¥p táº¡m á»©ng'));
                    if (!exists) {
                        const codeNum = localProposals.length + 1;
                        const newProposal = {
                            id: "P_" + Date.now(),
                            code: `KP-2026-0${codeNum}`,
                            type: "Äá» nghá»‹ táº¡m á»©ng",
                            ycbtCode: claim.code,
                            nycName: claim.nyc,
                            amount: claim.advanceNum,
                            user: claim.assignedOfficer || "ChuyÃªn viÃªn má»™t cá»­a",
                            date: new Date().toLocaleDateString('vi-VN'),
                            status: "Chá» láº­p Ä‘á» nghá»‹",
                            source: "Táº¡m á»©ng kinh phÃ­ Bá»™ TÃ i chÃ­nh",
                            cqCap: claim.agency || "Sá»Ÿ TÆ° phÃ¡p HÃ  Ná»™i",
                            notes: `Tá»± Ä‘á»™ng khá»Ÿi táº¡o tá»« Há»“ sÆ¡ bá»“i thÆ°á»ng liÃªn káº¿t ${claim.code} cÃ³ yÃªu cáº§u táº¡m á»©ng.`,
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
                    changeStatus(claimId, 'Äang xÃ¡c minh thiá»‡t háº¡i', `ÄÃ£ thá»¥ lÃ½ há»“ sÆ¡ giáº£i quyáº¿t bá»“i thÆ°á»ng vÃ  phÃ¢n cÃ´ng cho CÃ¡n bá»™ ${officer}!`);
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

        function triggerRejectClaim(id, rejectType = 'Tá»« chá»‘i tiáº¿p nháº­n') {
            showRejectionModal(id, rejectType, (claimId, type, reason) => {
                const claim = claimsList.find(c => c.id === claimId);
                if (claim) {
                    const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : (type === 'Tá»« chá»‘i tiáº¿p nháº­n' ? "Tráº§n Thá»‹ ChuyÃªn ViÃªn (CÃ¡n bá»™ má»™t cá»­a)" : "Nguyá»…n VÄƒn Thá»§ TrÆ°á»Ÿng (Thá»§ trÆ°á»Ÿng cÆ¡ quan)");
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

                    changeStatus(claimId, type, `ÄÃ£ chuyá»ƒn há»“ sÆ¡ sang tráº¡ng thÃ¡i [${type}]!`);
                }
            });
        }

        function triggerRequireAdditionClaim(id) {
            showRejectionModal(id, 'YÃªu cáº§u bá»• sung', (claimId, type, reason) => {
                const claim = claimsList.find(c => c.id === claimId);
                if (claim) {
                    const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : "Tráº§n Thá»‹ ChuyÃªn ViÃªn (CÃ¡n bá»™ má»™t cá»­a)";
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

                    changeStatus(claimId, type, `ÄÃ£ chuyá»ƒn há»“ sÆ¡ sang tráº¡ng thÃ¡i [YÃªu cáº§u bá»• sung]!`);
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
                const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn';
                const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

                if (!claim.rejectionLog) claim.rejectionLog = [];
                // Save adjustment to history log
                claim.rejectionLog.push({
                    date: todayStr,
                    officer: currentOfficer,
                    action: "TrÃ¬nh láº¡i LÃ£nh Ä‘áº¡o",
                    reason: explanation
                });

                // Clear active reject details since we are submitting again
                claim.rejectReason = '';
                claim.rejectDate = '';
                claim.rejectOfficer = '';
                claim.rejectType = '';

                changeStatus(selectedClaimId, 'Chá» thá»¥ lÃ½', 'ÄÃ£ cáº­p nháº­t há»“ sÆ¡ vÃ  trÃ¬nh láº¡i cho LÃ£nh Ä‘áº¡o xÃ©t duyá»‡t!');
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
                            showToast(`Thiáº¿u cÃ¡ch tÃ­nh hoáº·c sá»‘ tiá»n cho má»¥c thiá»‡t háº¡i Ä‘Æ°á»£c tÃ­ch chá»n!`, "error");
                            return;
                        }
                        total += val;
                    }
                }
                if (total === 0) {
                    showToast("Vui lÃ²ng tÃ­ch chá»n vÃ  nháº­p tá»‘i thiá»ƒu má»™t loáº¡i thiá»‡t háº¡i!", "error");
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
            claim.agency = cqNhan || "ChÆ°a phÃ¢n cÃ´ng";
            claim.totalNum = total;

            const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn (CÃ¡n bá»™ thá»¥ lÃ½)';
            const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

            if (!claim.rejectionLog) claim.rejectionLog = [];
            claim.rejectionLog.push({
                date: todayStr,
                officer: currentOfficer,
                action: "TrÃ¬nh láº¡i LÃ£nh Ä‘áº¡o",
                reason: explanation
            });

            claim.rejectReason = '';
            claim.rejectDate = '';
            claim.rejectOfficer = '';
            claim.rejectType = '';
            claim.status = 'Chá» thá»¥ lÃ½';

            saveClaimsToLocal();
            closeInlineClaimForm();
            renderClaimsTable();
            showToast(`ÄÃ£ cáº­p nháº­t há»“ sÆ¡ vÃ  trÃ¬nh láº¡i cho LÃ£nh Ä‘áº¡o xÃ©t duyá»‡t!`, "success");
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

            showRejectionModal(claim.id, 'Tá»« chá»‘i tiáº¿p nháº­n', (claimId, type, reason) => {
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
                claim.agency = cqNhan || "ChÆ°a phÃ¢n cÃ´ng";
                claim.totalNum = total;

                const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn (CÃ¡n bá»™ má»™t cá»­a)';
                const todayStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

                claim.rejectType = type;
                claim.rejectReason = reason;
                claim.rejectDate = todayStr;
                claim.rejectOfficer = currentOfficer;

                if (!claim.rejectionLog) claim.rejectionLog = [];
                claim.rejectionLog.push({
                    date: todayStr,
                    officer: currentOfficer,
                    action: "Giáº£i trÃ¬nh Ä‘iá»u chá»‰nh",
                    reason: explanation
                });
                claim.rejectionLog.push({
                    date: todayStr,
                    officer: currentOfficer,
                    action: type,
                    reason: reason
                });

                claim.status = 'Tá»« chá»‘i tiáº¿p nháº­n';

                saveClaimsToLocal();
                closeInlineClaimForm();
                renderClaimsTable();
                showToast(`CÃ¡n bá»™ Ä‘Ã£ chuyá»ƒn há»“ sÆ¡ sang tráº¡ng thÃ¡i Tá»« chá»‘i tiáº¿p nháº­n!`, "success");
            });
        }

        function submitTuChoiThulyTuChoiTiepNhan() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                showRejectionModal(claim.id, 'Tá»« chá»‘i tiáº¿p nháº­n', (claimId, type, reason) => {
                    const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn (CÃ¡n bá»™ má»™t cá»­a)';
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

                    changeStatus(selectedClaimId, 'Tá»« chá»‘i tiáº¿p nháº­n', 'CÃ¡n bá»™ Ä‘Ã£ chuyá»ƒn há»“ sÆ¡ sang tráº¡ng thÃ¡i Tá»« chá»‘i tiáº¿p nháº­n!');
                });
            }
        }

        function deleteClaim(id) {
            const index = claimsList.findIndex(c => c.id === id);
            if (index !== -1) {
                showConfirmModal("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xÃ³a há»“ sÆ¡ lÆ°u nhÃ¡p nÃ y khÃ´ng?", () => {
                    claimsList.splice(index, 1);
                    showToast("ÄÃ£ xÃ³a vÄ©nh viá»…n há»“ sÆ¡ lÆ°u nhÃ¡p!", "success");
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
                formTitle.innerHTML = id ? `<i class="fa-solid fa-pen-to-square"></i> Cáº¬P NHáº¬T YÃŠU Cáº¦U GIáº¢I QUYáº¾T Bá»’I THÆ¯á»œNG` : `<i class="fa-solid fa-plus"></i> TIáº¾P NHáº¬N Há»’ SÆ  YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG Má»šI (MáºªU 01/BTNN)`;
            }

            const claim = id ? claimsList.find(c => c.id === id) : null;

            if (claim) {
                if (claim.status === 'Tá»« chá»‘i thá»¥ lÃ½') {
                    document.getElementById('editFormThulyRejectBlock').style.display = 'block';
                    document.getElementById('editFormRejectReasonText').innerText = claim.rejectReason || 'KhÃ´ng cÃ³ lÃ½ do.';
                    const explArea = document.getElementById('editFormExplanationTextarea');
                    explArea.value = '';
                    explArea.classList.remove('is-invalid');
                    document.getElementById('editFormExplanationError').style.display = 'none';

                    document.getElementById('rejectFlowButtonsContainer').style.display = 'flex';
                    document.getElementById('defaultFormButtons').style.display = 'none';
                } else {
                    document.getElementById('editFormThulyRejectBlock').style.display = 'none';
                    document.getElementById('rejectFlowButtonsContainer').style.display = 'none';
                    document.getElementById('defaultFormButtons').style.display = 'flex';
                }

                // Populate form inputs from claim
                document.getElementById('claimNYCName').value = claim.nyc || '';
                document.getElementById('claimFieldGroup').value = claim.fieldGroup || 'hÃ nh chÃ­nh';
                document.getElementById('claimNYCBirth').value = claim.nycBirth || '';
                document.getElementById('claimNYCCardType').value = claim.cardType || 'CÃ¡ nhÃ¢n';
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
                    r.checked = (r.value === (claim.phddStep2Opinion || 'Äá»“ng Ã½'));
                });
                document.getElementById('claimRestoreHonorDesc').value = claim.phddStep2OpinionText || '';

                // Docs files checklist
                currentDocsList = [];
                if (claim.files && claim.files.length > 0) {
                    claim.files.forEach(f => {
                        currentDocsList.push({
                            name: "TÃ i liá»‡u chá»©ng minh",
                            req: true,
                            file: f.name
                        });
                    });
                }
                renderDocsList();

            } else {
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

                document.getElementById('claimTotalNumText').innerText = "0 Ä‘á»“ng";
                document.getElementById('claimTotalWordText').innerText = "Viáº¿t báº±ng chá»¯: KhÃ´ng Ä‘á»“ng";
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
                toggleDocsByRole("NgÆ°á»i bá»‹ thiá»‡t háº¡i");
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
                showToast("KhÃ´ng tÃ¬m tháº¥y Há»“ sÆ¡ xÃ¡c Ä‘á»‹nh cÆ¡ quan bá»“i thÆ°á»ng nÃ o phÃ¹ há»£p!", "error");
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
            if (found.nycCountry === 'Viá»‡t Nam') {
                document.getElementById('claimNYCCity').value = found.nycTinhThanh;
            } else {
                document.getElementById('claimNYCCityText').value = found.nycTinhThanh;
            }
            document.getElementById('claimNYCAddress').value = found.nycAddressDetail;
            document.getElementById('claimHanhVi').value = found.hanhVi;

            document.getElementById('claimDocBase').value = `VÄƒn báº£n xÃ¡c Ä‘á»‹nh tháº©m quyá»n sá»‘ 02/QÄ-XÄCQ ban hÃ nh ngÃ y 01/07/2026`;

            initDocsList();
            toggleDocsByRole(found.nycRole);

            showToast("ÄÃ£ Ä‘iá»n nhanh toÃ n bá»™ thÃ´ng tin tá»« há»“ sÆ¡ xÃ¡c minh cÆ¡ quan bá»“i thÆ°á»ng!", "success");
        }

        // Toggles Country selections
        function toggleClaimCountrySelect(val) {
            const drop = document.getElementById('claimCityDropdownWrapper');
            const inp = document.getElementById('claimCityInputWrapper');
            if (val === 'Viá»‡t Nam') {
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
            document.getElementById('claimTotalNumText').innerText = `${total.toLocaleString('vi-VN')} Ä‘á»“ng`;
            document.getElementById('claimTotalWordText').innerText = `Viáº¿t báº±ng chá»¯: ${numberToVietnameseWords(total)}`;

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

            document.getElementById('claimAdvanceTotalText').innerText = `${total.toLocaleString('vi-VN')} Ä‘á»“ng (Viáº¿t báº±ng chá»¯: ${numberToVietnameseWords(total)})`;
        }

        function initDocsList(role = "NgÆ°á»i bá»‹ thiá»‡t háº¡i") {
            currentDocsList = [];

            // 1. Giáº¥y tá» chá»©ng minh nhÃ¢n thÃ¢n cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i (Chá»‰ hiá»ƒn thá»‹ khi TÆ° cÃ¡ch ngÆ°á»i yÃªu cáº§u = "NgÆ°á»i bá»‹ thiá»‡t háº¡i")
            if (role === "NgÆ°á»i bá»‹ thiá»‡t háº¡i") {
                currentDocsList.push({
                    name: "Giáº¥y tá» chá»©ng minh nhÃ¢n thÃ¢n cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i",
                    required: true,
                    file: "Giay_to_chung_minh_nhan_than_bi_thiet_hai.pdf",
                    isCustom: false
                });
            }

            // 2. TÃ i liá»‡u, chá»©ng cá»© cÃ³ liÃªn quan tá»›i yÃªu cáº§u bá»“i thÆ°á»ng (náº¿u cÃ³)
            currentDocsList.push({
                name: "TÃ i liá»‡u, chá»©ng cá»© cÃ³ liÃªn quan tá»›i yÃªu cáº§u bá»“i thÆ°á»ng (náº¿u cÃ³)",
                required: false,
                file: "Tai_lieu_chung_cu_kem_theo.pdf",
                isCustom: false
            });

            // 3. VÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng, trá»« trÆ°á»ng há»£p ngÆ°á»i bá»‹ thiá»‡t háº¡i khÃ´ng Ä‘Æ°á»£c gá»­i hoáº·c khÃ´ng thá»ƒ cÃ³ vÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng
            currentDocsList.push({
                name: "VÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng, trá»« trÆ°á»ng há»£p ngÆ°á»i bá»‹ thiá»‡t háº¡i khÃ´ng Ä‘Æ°á»£c gá»­i hoáº·c khÃ´ng thá»ƒ cÃ³ vÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng",
                required: true,
                file: "Van_ban_lam_can_cu_yeu_cau_boi_thuong.pdf",
                isCustom: false
            });

            // 4. VÄƒn báº£n yÃªu cáº§u bá»“i thÆ°á»ng (Há»‡ thá»‘ng tá»± Ä‘á»™ng gen ra theo Máº«u 01/BTNN)
            currentDocsList.push({
                name: "VÄƒn báº£n yÃªu cáº§u bá»“i thÆ°á»ng (Há»‡ thá»‘ng tá»± Ä‘á»™ng gen ra theo Máº«u 01/BTNN)",
                required: true,
                file: "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf",
                isCustom: false
            });

            // 5. Giáº¥y tá» chá»©ng minh nhÃ¢n thÃ¢n cá»§a ngÆ°á»i thá»«a káº¿, ngÆ°á»i Ä‘áº¡i diá»‡n cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i
            if (role === "NgÆ°á»i thá»«a káº¿ cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i" ||
                role === "NgÆ°á»i Ä‘áº¡i diá»‡n theo phÃ¡p luáº­t cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i" ||
                role === "CÃ¡ nhÃ¢n, phÃ¡p nhÃ¢n Ä‘Æ°á»£c á»§y quyá»n há»£p phÃ¡p") {
                currentDocsList.push({
                    name: "Giáº¥y tá» chá»©ng minh nhÃ¢n thÃ¢n cá»§a ngÆ°á»i thá»«a káº¿, ngÆ°á»i Ä‘áº¡i diá»‡n cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i",
                    required: true,
                    file: "Chung_minh_nhan_than_nguoi_dai_dien_thua_ke.pdf",
                    isCustom: false
                });
            }

            // 6. TrÆ°á»ng há»£p ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t mÃ  cÃ³ di chÃºc thÃ¬ ngÆ°á»i yÃªu cáº§u bá»“i thÆ°á»ng pháº£i cung cáº¥p di chÃºc, trÆ°á»ng há»£p khÃ´ng cÃ³ di chÃºc thÃ¬ pháº£i cÃ³ vÄƒn báº£n há»£p phÃ¡p vá» quyá»n thá»«a káº¿
            if (role === "NgÆ°á»i thá»«a káº¿ cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i") {
                currentDocsList.push({
                    name: "TrÆ°á»ng há»£p ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t mÃ  cÃ³ di chÃºc thÃ¬ ngÆ°á»i yÃªu cáº§u bá»“i thÆ°á»ng pháº£i cung cáº¥p di chÃºc, trÆ°á»ng há»£p khÃ´ng cÃ³ di chÃºc thÃ¬ pháº£i cÃ³ vÄƒn báº£n há»£p phÃ¡p vá» quyá»n thá»«a káº¿",
                    required: true,
                    file: "Di_chuc_hoac_van_ban_thua_ke_hop_phap.pdf",
                    isCustom: false
                });
            }

            // 7. VÄƒn báº£n á»§y quyá»n há»£p phÃ¡p trong trÆ°á»ng há»£p Ä‘áº¡i diá»‡n theo á»§y quyá»n
            if (role === "CÃ¡ nhÃ¢n, phÃ¡p nhÃ¢n Ä‘Æ°á»£c á»§y quyá»n há»£p phÃ¡p") {
                currentDocsList.push({
                    name: "VÄƒn báº£n á»§y quyá»n há»£p phÃ¡p trong trÆ°á»ng há»£p Ä‘áº¡i diá»‡n theo á»§y quyá»n",
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
                    nameHtml = '<input type="text" class="form-control" placeholder="Nháº­p tÃªn tÃ i liá»‡u..." value="' + doc.name + '" oninput="updateCustomDocName(' + idx + ', this.value)">';
                } else {
                    nameHtml = '<strong>' + doc.name + '</strong>';
                    if (doc.required) {
                        nameHtml += ' <span class="badge badge-danger" style="background-color: #ef4444; color: white; border: none; font-size: 11px; padding: 2px 6px; margin-left: 6px;">Báº¯t buá»™c</span>';
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
                            <a href="javascript:void(0)" onclick="${doc.isCustom ? `deleteDocRow(${idx})` : `clearDocFile(${idx})`}" style="color: var(--danger-color); font-weight: 600; text-decoration: none;" class="action-link"><i class="fa-solid fa-trash-can"></i> XÃ³a</a>
                        </div>
                    `;
                } else {
                    fileHtml = `
                        <div style="display: flex; align-items: center; width: 100%;">
                            <button class="btn-upload-rust" onclick="this.nextElementSibling.click()" style="height: 34px; padding: 4px 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;"><i class="fa-solid fa-cloud-arrow-up"></i> Chá»n file</button>
                            <input type="file" style="display: none;" onchange="uploadDocFile(this, ${idx})">
                        </div>
                    `;
                    if (doc.isCustom) {
                        actionsHtml = `
                            <div style="display: flex; gap: 8px; justify-content: center; align-items: center; white-space: nowrap;">
                                <span style="font-weight: 600; opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-regular fa-eye"></i> Xem file</span>
                                <span style="color: #cbd5e1;">|</span>
                                <a href="javascript:void(0)" onclick="deleteDocRow(${idx})" style="color: var(--danger-color); font-weight: 600; text-decoration: none;" class="action-link"><i class="fa-solid fa-trash-can"></i> XÃ³a</a>
                            </div>
                        `;
                    } else {
                        actionsHtml = `
                            <div style="display: flex; gap: 8px; justify-content: center; align-items: center; opacity: 0.35; pointer-events: none; cursor: not-allowed; white-space: nowrap;">
                                <span style="font-weight: 600;"><i class="fa-regular fa-eye"></i> Xem file</span>
                                <span style="color: #cbd5e1;">|</span>
                                <span style="font-weight: 600;"><i class="fa-solid fa-trash-can"></i> XÃ³a</span>
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
                    showToast("ÄÃ£ Ä‘Ã­nh kÃ¨m tá»‡p tin: " + fileName + " thÃ nh cÃ´ng!", "success");
                }
            }
        }

        function viewDocFile(idx) {
            const doc = currentDocsList[idx];
            if (!doc || !doc.file) return;

            const win = window.open("", "_blank");

            if (doc.file === "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf") {
                const cqNhan = document.getElementById('claimCqNhan').value || "Sá»Ÿ TÆ° phÃ¡p TP. HÃ  Ná»™i";
                const role = document.getElementById('claimNYCRole').value || "NgÆ°á»i bá»‹ thiá»‡t háº¡i";
                const name = document.getElementById('claimNYCName').value || "Nguyá»…n VÄƒn A";
                const gender = document.getElementById('claimNYCGender').value || "Nam";
                const birth = document.getElementById('claimNYCBirth').value || "01/01/1990";
                const cardType = document.getElementById('claimNYCCardType').value || "CCCD";
                const cardNo = document.getElementById('claimNYCCardNo').value || "001090000123";
                const cardDate = document.getElementById('claimNYCCardDate').value || "01/01/2021";
                const cardPlace = document.getElementById('claimNYCCardPlace').value || "Cá»¥c CS QLHC";
                const phone = document.getElementById('claimNYCPhone').value || "0912345678";
                const email = document.getElementById('claimNYCEmail').value || "nva@gmail.com";
                const country = document.getElementById('claimNYCCountry').value || "Viá»‡t Nam";
                const city = country === 'Viá»‡t Nam' ? document.getElementById('claimNYCCity').value : document.getElementById('claimNYCCityText').value;
                const address = document.getElementById('claimNYCAddress').value || "HÃ  Ná»™i";
                const hanhVi = document.getElementById('claimHanhVi').value || "ChÆ°a cÃ³ mÃ´ táº£ hÃ nh vi gÃ¢y thiá»‡t háº¡i";
                const nhanQua = document.getElementById('claimNhanQua').value || "ChÆ°a cÃ³ mÃ´ táº£ má»‘i quan há»‡ nhÃ¢n quáº£";
                const docBase = document.getElementById('claimDocBase').value || "ChÆ°a nháº­p vÄƒn báº£n lÃ m cÄƒn cá»©";

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
                            <td style="border: 1px solid black; padding: 8px; text-align: right; font-weight: bold;">${val.toLocaleString('vi-VN')} Ä‘</td>
                        </tr>`;
                    }
                }
                if (thietHaiRowsHtml === "") {
                    thietHaiRowsHtml = `<tr><td colspan="4" style="border: 1px solid black; padding: 8px; text-align: center; font-style: italic;">ChÆ°a khai bÃ¡o má»¥c thiá»‡t háº¡i nÃ o</td></tr>`;
                }

                const needAdvance = document.getElementById('claimNeedAdvance').checked;
                const advTinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
                const advKhac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
                const advTotal = advTinhThan + advKhac;

                const needRestoreHonor = document.getElementById('claimNeedRestoreHonor').checked;
                const phddFormApology = document.getElementById('claimPhddFormApology').checked;
                const phddFormNews = document.getElementById('claimPhddFormNews').checked;

                const datePlace = document.getElementById('claimCreatePlace').value || "HÃ  Ná»™i";
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();

                let html = `<html>
                <head>
                    <title>Máº«u sá»‘ 01/BTNN: ÄÆ¡n yÃªu cáº§u bá»“i thÆ°á»ng</title>
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
                                <div>Cá»˜NG HÃ’A XÃƒ Há»˜I CHá»¦ NGHÄ¨A VIá»†T NAM</div>
                                <div class="motto" style="text-decoration: none;">Äá»™c láº­p - Tá»± do - Háº¡nh phÃºc</div>
                            </div>
                            <div class="header-right">
                                <div style="font-size: 13px; font-style: italic;">Máº«u sá»‘ 01/BTNN (Ban hÃ nh kÃ¨m theo ThÃ´ng tÆ° sá»‘ 04/2018/TT-BTP)</div>
                            </div>
                        </div>

                        <div class="title">
                            <div>ÄÆ N YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG</div>
                            <div style="font-size: 14px; font-weight: normal; margin-top: 6px;">(DÃ nh cho cÃ¡ nhÃ¢n, tá»• chá»©c bá»‹ thiá»‡t háº¡i)</div>
                        </div>

                        <div style="margin-left: 50px; margin-bottom: 25px;">
                            <span class="field-label">KÃ­nh gá»­i:</span> ${cqNhan}
                        </div>

                        <div class="section-title">I. ThÃ´ng tin ngÆ°á»i yÃªu cáº§u bá»“i thÆ°á»ng</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">1. Há» vÃ  tÃªn ngÆ°á»i yÃªu cáº§u:</span> ${name}</div>
                            <div><span class="field-label">2. NgÃ y, thÃ¡ng, nÄƒm sinh:</span> ${birth} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field-label">Giá»›i tÃ­nh:</span> ${gender}</div>
                            <div><span class="field-label">3. TÆ° cÃ¡ch yÃªu cáº§u bá»“i thÆ°á»ng:</span> ${role}</div>
                            <div><span class="field-label">4. Giáº¥y tá» thÃ¢n nhÃ¢n:</span> ${cardType} sá»‘ ${cardNo} &nbsp;&nbsp;&nbsp; NgÃ y cáº¥p: ${cardDate} &nbsp;&nbsp;&nbsp; NÆ¡i cáº¥p: ${cardPlace}</div>
                            <div><span class="field-label">5. Sá»‘ Ä‘iá»‡n thoáº¡i:</span> ${phone} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field-label">Email:</span> ${email}</div>
                            <div><span class="field-label">6. Äá»‹a chá»‰ cÆ° trÃº/Trá»¥ sá»Ÿ:</span> ${address}, Tá»‰nh/ThÃ nh: ${city}, Quá»‘c gia: ${country}</div>
                        </div>

                        <div class="section-title">II. HÃ nh vi gÃ¢y thiá»‡t háº¡i vÃ  má»‘i quan há»‡ nhÃ¢n quáº£</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">1. HÃ nh vi gÃ¢y thiá»‡t háº¡i cá»§a ngÆ°á»i thi hÃ nh cÃ´ng vá»¥:</span></div>
                            <div style="margin-left: 15px; font-style: italic; background-color:#f8fafc; padding: 8px; border-radius:4px; border:1px solid #e2e8f0;">${hanhVi}</div>
                            
                            <div style="margin-top: 8px;"><span class="field-label">2. Má»‘i quan há»‡ nhÃ¢n quáº£ giá»¯a thiá»‡t háº¡i vÃ  hÃ nh vi trÃ¡i phÃ¡p luáº­t:</span></div>
                            <div style="margin-left: 15px; font-style: italic; background-color:#f8fafc; padding: 8px; border-radius:4px; border:1px solid #e2e8f0;">${nhanQua}</div>

                            <div style="margin-top: 8px;"><span class="field-label">3. VÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng:</span> ${docBase}</div>
                        </div>

                        <div class="section-title">III. CÃ¡c má»¥c thiá»‡t háº¡i yÃªu cáº§u bá»“i thÆ°á»ng</div>
                        <table>
                            <thead>
                                <tr>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9; width: 60px;">STT</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9;">Má»¥c thiá»‡t háº¡i yÃªu cáº§u</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9;">CÃ¡ch tÃ­nh chi tiáº¿t</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9; width: 150px;">Sá»‘ tiá»n (Ä‘á»“ng)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${thietHaiRowsHtml}
                                <tr style="background-color: #f8fafc; font-weight: bold;">
                                    <td colspan="3" style="border: 1px solid black; padding: 8px; text-align: right;">Tá»”NG Cá»˜NG TIá»€N YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG:</td>
                                    <td style="border: 1px solid black; padding: 8px; text-align: right; color:#ef4444;">${total.toLocaleString('vi-VN')} Ä‘</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="font-style: italic; margin-top: 4px;"><span class="field-label">Viáº¿t báº±ng chá»¯:</span> ${numberToVietnameseWords(total)}</div>

                        <div class="section-title">IV. Äá» nghá»‹ táº¡m á»©ng kinh phÃ­ bá»“i thÆ°á»ng</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">Äá» nghá»‹ táº¡m á»©ng kinh phÃ­:</span> ${needAdvance ? "CÃ“" : "KHÃ”NG"}</div>
                            ${needAdvance ? `<div>- Sá»‘ tiá»n Ä‘á» nghá»‹ táº¡m á»©ng: <strong style="color:#1e3a8a;">${advTotal.toLocaleString('vi-VN')} Ä‘</strong> (Viáº¿t báº±ng chá»¯: ${numberToVietnameseWords(advTotal)})</div>` : ''}
                        </div>

                        <div class="section-title">V. YÃªu cáº§u phá»¥c há»“i danh dá»± (Äiá»u 57)</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">YÃªu cáº§u NhÃ  nÆ°á»›c tá»• chá»©c phá»¥c há»“i danh dá»±:</span> ${needRestoreHonor ? "CÃ“" : "KHÃ”NG"}</div>
                            ${needRestoreHonor ? `
                                <div style="margin-top: 4px; margin-left: 15px;">
                                    <div>- <span class="field-label">HÃ¬nh thá»©c Ä‘á» nghá»‹ phá»¥c há»“i danh dá»± mong muá»‘n (Äiá»u 56):</span> 
                                        ${[
                            phddFormApology ? "Trá»±c tiáº¿p xin lá»—i vÃ  cáº£i chÃ­nh cÃ´ng khai táº¡i nÆ¡i cÆ° trÃº / trá»¥ sá»Ÿ (Äiá»u 58)" : "",
                            phddFormNews ? "ÄÄƒng bÃ¡o xin lá»—i vÃ  cáº£i chÃ­nh cÃ´ng khai (Äiá»u 59)" : ""
                        ].filter(Boolean).join(" vÃ  ") || "ChÆ°a lá»±a chá»n"}
                                    </div>
                                </div>
                            ` : ""}
                        </div>

                        <div class="signature-section">
                            <div class="signature-box">
                                <div style="font-style: italic;">${datePlace}, ngÃ y ${day} thÃ¡ng ${month} nÄƒm ${year}</div>
                                <div style="font-weight: bold; margin-top: 8px;">NGÆ¯á»œI LÃ€M ÄÆ N</div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">(KÃ½, ghi rÃµ há» tÃªn hoáº·c Ä‘iá»ƒm chá»‰)</div>
                                <div style="margin-top: 60px; font-weight: bold; font-size:16px;">${name}</div>
                            </div>
                        </div>
                    </div>
                `;
                win.document.write(html);
                win.document.close();
            } else {
                let html = '<html><head><title>Xem tÃ i liá»‡u: ' + doc.file + '</title>';
                html += '<style>body { font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #f1f5f9; color: #1e293b; margin: 0; }';
                html += '.card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 500px; }';
                html += 'h1 { color: #0f766e; margin-bottom: 16px; font-size: 24px; }';
                html += 'p { color: #64748b; font-size: 15px; line-height: 1.6; }';
                html += '.btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; margin-top: 20px; }</style>';
                html += '</head><body><div class="card">';
                html += '<h1>Xem tÃ i liá»‡u mÃ´ phá»ng</h1>';
                html += '<p>TÃªn tÃ i liá»‡u: <strong>' + doc.file + '</strong></p>';
                html += '<p>ThÃ nh pháº§n há»“ sÆ¡: <strong>' + doc.name + '</strong></p>';
                html += '<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">';
                html += '<p style="font-size: 13px; font-style: italic;">Há»‡ thá»‘ng Ä‘ang mÃ´ phá»ng xem tá»‡p Ä‘Ã­nh kÃ¨m. File thá»±c táº¿ sáº½ Ä‘Æ°á»£c táº£i vÃ  hiá»ƒn thá»‹ táº¡i Ä‘Ã¢y.</p>';
                html += '<button onclick="window.close()" class="btn">ÄÃ³ng cá»­a sá»•</button>';
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
                showConfirmModal("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xÃ³a tá»‡p Ä‘Ã­nh kÃ¨m: " + oldFile + " khÃ´ng?", () => {
                    currentDocsList[idx].file = null;
                    renderDocsTable();
                });
            }
        }

        function deleteDocRow(idx) {
            if (currentDocsList[idx]) {
                const name = currentDocsList[idx].name || ("TÃ i liá»‡u " + (idx + 1));
                showConfirmModal("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xÃ³a thÃ nh pháº§n há»“ sÆ¡: " + name + " khÃ´ng?", () => {
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
            //showToast("ÄÃ£ thÃªm hÃ ng tÃ i liá»‡u Ä‘Ã­nh kÃ¨m má»›i!", "success");
        }

        function numberToVietnameseWords(number) {
            if (number === 0) return "KhÃ´ng";
            const units = ["", "má»™t", "hai", "ba", "bá»‘n", "nÄƒm", "sÃ¡u", "báº£y", "tÃ¡m", "chÃ­n"];
            const unitsTen = ["", "mÆ°á»i", "hai mÆ°Æ¡i", "ba mÆ°Æ¡i", "bá»‘n mÆ°Æ¡i", "nÄƒm mÆ°Æ¡i", "sÃ¡u mÆ°Æ¡i", "báº£y mÆ°Æ¡i", "tÃ¡m mÆ°Æ¡i", "chÃ­n mÆ°Æ¡i"];

            function readThreeDigits(n, isFirst) {
                let hundreds = Math.floor(n / 100);
                let tens = Math.floor((n % 100) / 10);
                let ones = n % 10;
                let res = "";

                if (hundreds > 0 || !isFirst) {
                    res += units[hundreds] + " trÄƒm ";
                }

                if (tens > 0) {
                    res += unitsTen[tens] + " ";
                } else if (hundreds > 0 && ones > 0) {
                    res += "láº» ";
                }

                if (ones > 0) {
                    if (ones === 1 && tens > 1) {
                        res += "má»‘t";
                    } else if (ones === 5 && tens > 0) {
                        res += "lÄƒm";
                    } else {
                        res += units[ones];
                    }
                }
                return res.trim();
            }

            const bigUnits = ["", "nghÃ¬n", "triá»‡u", "tá»·"];
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
            return words + " Ä‘á»“ng";
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
            const thulyVenue = document.getElementById('claimThulyVenue') ? document.getElementById('claimThulyVenue').value : 'cÆ¡ quan quáº£n lÃ½';
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
            const city = country === 'Viá»‡t Nam' ? document.getElementById('claimNYCCity').value : document.getElementById('claimNYCCityText').value.trim();
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
                    const el = country === 'Viá»‡t Nam' ? document.getElementById('claimNYCCity') : document.getElementById('claimNYCCityText');
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
                            showToast(`Thiáº¿u cÃ¡ch tÃ­nh hoáº·c sá»‘ tiá»n cho má»¥c thiá»‡t háº¡i Ä‘Æ°á»£c tÃ­ch chá»n!`, "error");
                            return;
                        }
                        total += val;
                    }
                }

                if (!isDraft && total === 0) {
                    showToast("Vui lÃ²ng tÃ­ch chá»n vÃ  nháº­p tá»‘i thiá»ƒu má»™t loáº¡i thiá»‡t háº¡i!", "error");
                    return;
                }
            }

            // Táº¡m á»©ng validations
            let adv = 0;
            const needAdvance = document.getElementById('claimNeedAdvance').checked;
            if (requestType !== 'honor' && needAdvance) {
                const tinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
                const khac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
                adv = tinhThan + khac;
                if (!isDraft && adv > total) {
                    showToast("Tá»•ng tiá»n Ä‘á» nghá»‹ táº¡m á»©ng khÃ´ng Ä‘Æ°á»£c lá»›n hÆ¡n tá»•ng tiá»n yÃªu cáº§u bá»“i thÆ°á»ng!", "error");
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
                    claim.nyc = name || "(ChÆ°a nháº­p)";
                    claim.cardType = cardType;
                    claim.cardNo = cardNo;
                    claim.address = address;
                    claim.phone = phone;
                    claim.role = role;
                    claim.docBase = docBase || "ChÆ°a cÃ³ cÄƒn cá»© chÃ­nh thá»©c";
                    claim.hanhVi = hanhVi || "HÃ nh vi gÃ¢y thiá»‡t háº¡i chÆ°a tÃ³m táº¯t";
                    claim.nhanQua = nhanQua || "Má»‘i quan há»‡ nhÃ¢n quáº£ chÆ°a mÃ´ táº£";
                    claim.status = isDraft ? "LÆ°u nhÃ¡p" : "Chá» tiáº¿p nháº­n";
                    claim.agency = cqNhan || "ChÆ°a phÃ¢n cÃ´ng";
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

                    showToast(isDraft ? `Cáº­p nháº­t nhÃ¡p há»“ sÆ¡ ${claim.code} thÃ nh cÃ´ng!` : `Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng ${claim.code} thÃ nh cÃ´ng!`, "success");
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
                nyc: name || "(ChÆ°a nháº­p)",
                cardType: cardType,
                cardNo: cardNo,
                address: address,
                phone: phone,
                role: role,
                docBase: docBase || "ChÆ°a cÃ³ cÄƒn cá»© chÃ­nh thá»©c",
                hanhVi: hanhVi || "HÃ nh vi gÃ¢y thiá»‡t háº¡i chÆ°a tÃ³m táº¯t",
                nhanQua: nhanQua || "Má»‘i quan há»‡ nhÃ¢n quáº£ chÆ°a mÃ´ táº£",
                status: isDraft ? "LÆ°u nhÃ¡p" : "Chá» tiáº¿p nháº­n",
                agency: cqNhan || "ChÆ°a phÃ¢n cÃ´ng",
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
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: todayStr, desc: isDraft ? "Há»“ sÆ¡ lÆ°u nhÃ¡p há»‡ thá»‘ng" : "ÄÃ£ ná»™p trá»±c tiáº¿p, chá» tiáº¿p nháº­n", status: "active" }
                ]
            });

            showToast(isDraft ? `LÆ°u nhÃ¡p há»“ sÆ¡ bá»“i thÆ°á»ng ${newCode} thÃ nh cÃ´ng!` : `Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng ${newCode} thÃ nh cÃ´ng!`, "success");
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

            const selMain = document.getElementById('roleSelectorMain');
            const currentRole = selMain ? selMain.value : 'chuyen-vien';
            const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn';
            const isAssignedToOther = (currentRole === 'chuyen-vien') && claim.assignedOfficer && (claim.assignedOfficer !== currentOfficer);

            if (isAssignedToOther && editMode) {
                editMode = false;
                isDetailEditMode = false;
                showToast(`Há»“ sÆ¡ Ä‘Æ°á»£c giao cho cÃ¡n bá»™ khÃ¡c (${claim.assignedOfficer}). Báº¡n chá»‰ cÃ³ quyá»n Xem.`, "error");
            }

            document.getElementById('subTabContentResolver').style.display = 'none';
            document.getElementById('inlineClaimFormPanel').style.display = 'none';

            const detailSec = document.getElementById('caseDetailSection');
            detailSec.style.display = 'block';

            document.getElementById('caseDetailTitle').innerHTML = editMode
                ? `<i class="fa-solid fa-pen-to-square"></i> Cáº¬P NHáº¬T TIáº¾N TRÃŒNH Há»’ SÆ : ${claim.code} - ${claim.nyc}`
                : `<i class="fa-solid fa-circle-info"></i> CHI TIáº¾T Há»’ SÆ  VÃ€ TIáº¾N TRÃŒNH GIáº¢I QUYáº¾T: ${claim.code} - ${claim.nyc}`;

            const badgeEl = document.getElementById('caseDetailStatusBadge');
            if (badgeEl) {
                let badgeClass = 'badge-info';
                if (claim.status === 'HoÃ n thÃ nh') badgeClass = 'badge-success';
                else if (claim.status === 'LÆ°u nhÃ¡p') badgeClass = 'badge-draft';
                else if (claim.status === 'Chá» tiáº¿p nháº­n' || claim.status === 'Chá» thá»¥ lÃ½') badgeClass = 'badge-pending';
                else if (claim.status === 'YÃªu cáº§u bá»• sung' || claim.status === 'Chá» ban hÃ nh QÄ' || claim.status === 'Chá» thá»±c thi') badgeClass = 'badge-warning';
                else if (claim.status === 'Bá»‹ tá»« chá»‘i' || claim.status === 'Tá»« chá»‘i tiáº¿p nháº­n' || claim.status === 'Tá»« chá»‘i thá»¥ lÃ½' || claim.status === 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng') badgeClass = 'badge-danger';
                
                badgeEl.className = 'badge ' + badgeClass;
                badgeEl.innerText = claim.status;
            }

            renderReadOnlyClaimInfo(claim);
            renderAccordions(claim);
            renderDetailActionBar(claim);

            const tab2Btn = document.getElementById('detailTab2Btn');
            if (claim.status === 'LÆ°u nhÃ¡p') {
                if (tab2Btn) tab2Btn.style.display = 'none';
                switchDetailTab('chung');
            } else {
                if (tab2Btn) tab2Btn.style.display = 'inline-block';
                if (editMode) {
                    // Determine which tab and accordion to focus
                    const effectiveAction = actionType || (
                        claim.status === 'YÃªu cáº§u bá»• sung' ? 'bosung' :
                        claim.status === 'Äang xÃ¡c minh thiá»‡t háº¡i' ? 'xacminh' :
                        claim.status === 'Äang thÆ°Æ¡ng lÆ°á»£ng' ? 'thuongluong' :
                        claim.status === 'Chá» thá»±c thi' ? 'thucthi' : 'chung'
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
                    if (claim.status === 'Äang xÃ¡c minh thiá»‡t háº¡i') defaultAcc = 'xacminh';
                    else if (claim.status === 'Äang thÆ°Æ¡ng lÆ°á»£ng' || claim.status === 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng') defaultAcc = 'thuongluong';
                    else if (claim.status === 'Chá» ban hÃ nh QÄ') defaultAcc = 'quyetdinh';
                    else if (claim.status === 'Chá» thá»±c thi' || claim.status === 'HoÃ n thÃ nh') defaultAcc = 'thucthi';
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
                const draftStatuses = ['LÆ°u nhÃ¡p', 'YÃªu cáº§u bá»• sung', 'Äang xÃ¡c minh thiá»‡t háº¡i', 'Äang thÆ°Æ¡ng lÆ°á»£ng', 'Chá» thá»±c thi'];
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
                    "Thay Ä‘á»•i cá»§a báº¡n chÆ°a Ä‘Æ°á»£c lÆ°u. Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n ÄÃ³ng khÃ´ng?",
                    () => {
                        isDetailEditMode = false;
                        closeCaseDetail();
                    },
                    {
                        title: "Cáº£nh bÃ¡o thay Ä‘á»•i chÆ°a lÆ°u",
                        btnYesText: "CÃ³ (ÄÃ³ng)",
                        btnNoText: "KhÃ´ng (Quay láº¡i)",
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
            const currentOfficer = document.getElementById('currentOfficerSelector') ? document.getElementById('currentOfficerSelector').value : 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn';
            const isAssignedToOther = (currentRole === 'chuyen-vien') && claim.assignedOfficer && (claim.assignedOfficer !== currentOfficer);

            // Close button (only shown in read-only mode)
            const closeBtnHtml = `<button class="btn btn-secondary" onclick="closeCaseDetailWithCheck()"><i class="fa-solid fa-xmark"></i> ÄÃ³ng</button>`;
            
            // Cancel button (only shown in edit mode)
            const cancelBtnHtml = `<button class="btn btn-secondary" onclick="switchToReadOnlyMode()">Há»§y bá»</button>`;
            const cancelActionBtnHtml = `<button class="btn btn-secondary" onclick="cancelActionUpdate()">Há»§y bá»</button>`;

            // If assigned to someone else, can only view, so only show Close button
            if (isAssignedToOther) {
                bar.innerHTML = closeBtnHtml;
                return;
            }

            let buttonsHtml = '';
            let showCloseButton = true; // by default we show Close button in read-only

            switch (claim.status) {
                case 'LÆ°u nhÃ¡p':
                    buttonsHtml = `
                        <button class="btn btn-primary" onclick="openInlineClaimForm('${claim.id}')"><i class="fa-solid fa-pen-to-square"></i> Cáº­p nháº­t</button>
                    `;
                    break;

                case 'Chá» tiáº¿p nháº­n':
                    if (currentRole === 'chuyen-vien') {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="triggerAcceptClaim('${claim.id}')"><i class="fa-solid fa-square-check"></i> Tiáº¿p nháº­n</button>
                            <button class="btn btn-warning" style="background-color: var(--warning-color); color: white;" onclick="triggerRequireAdditionClaim('${claim.id}')"><i class="fa-solid fa-circle-question"></i> YÃªu cáº§u bá»• sung</button>
                            <button class="btn btn-danger" onclick="triggerRejectClaim('${claim.id}', 'Tá»« chá»‘i tiáº¿p nháº­n')"><i class="fa-solid fa-ban"></i> Tá»« chá»‘i tiáº¿p nháº­n</button>
                        `;
                    }
                    break;

                case 'YÃªu cáº§u bá»• sung':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="submitBoSungUpdate()"><i class="fa-solid fa-circle-check"></i> Bá»• sung há»“ sÆ¡</button>
                            ${cancelBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('bosung')"><i class="fa-solid fa-circle-check"></i> Bá»• sung há»“ sÆ¡</button>
                        `;
                    }
                    break;

                case 'Chá» thá»¥ lÃ½':
                    if (currentRole === 'thu-truong') {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="triggerLeaderAcceptClaim('${claim.id}')"><i class="fa-solid fa-circle-check"></i> Thá»¥ lÃ½</button>
                            <button class="btn btn-danger" onclick="triggerRejectClaim('${claim.id}', 'Tá»« chá»‘i thá»¥ lÃ½')"><i class="fa-solid fa-ban"></i> Tá»« chá»‘i thá»¥ lÃ½</button>
                        `;
                    } else {
                        buttonsHtml = '';
                    }
                    break;
                    
                case 'Tá»« chá»‘i tiáº¿p nháº­n':
                case 'Bá»‹ tá»« chá»‘i':
                    // Only Close button
                    break;

                case 'Tá»« chá»‘i thá»¥ lÃ½':
                    if (currentRole === 'chuyen-vien') {
                        if (isDetailEditMode) {
                            buttonsHtml = `
                                <button class="btn btn-success" onclick="submitTuChoiThulyTrinhLai()"><i class="fa-solid fa-paper-plane"></i> TrÃ¬nh láº¡i LÃ£nh Ä‘áº¡o</button>
                                <button class="btn btn-danger" onclick="submitTuChoiThulyTuChoiTiepNhan()"><i class="fa-solid fa-ban"></i> Tá»« chá»‘i tiáº¿p nháº­n</button>
                                ${cancelActionBtnHtml}
                            `;
                            showCloseButton = false;
                        } else {
                            buttonsHtml = `
                                <button class="btn btn-primary" onclick="switchToEditMode('tuthoithuly')"><i class="fa-solid fa-pen-to-square"></i> Cáº­p nháº­t</button>
                            `;
                        }
                    }
                    break;

                case 'Äang xÃ¡c minh thiá»‡t háº¡i':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="submitXacMinhUpdate()"><i class="fa-solid fa-circle-check"></i> HoÃ n thÃ nh xÃ¡c minh</button>
                            ${cancelActionBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('xacminh')"><i class="fa-solid fa-pen-to-square"></i> Cáº­p nháº­t xÃ¡c minh</button>
                        `;
                    }
                    break;

                case 'Äang thÆ°Æ¡ng lÆ°á»£ng':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-outline-primary" onclick="submitTlDraftUpdate()"><i class="fa-regular fa-bookmark"></i> Cáº­p nháº­t</button>
                            <button class="btn btn-success" onclick="submitTlCompleteUpdate()"><i class="fa-solid fa-circle-check"></i> HoÃ n thÃ nh thÆ°Æ¡ng lÆ°á»£ng</button>
                            ${cancelActionBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('thuongluong')"><i class="fa-solid fa-pen-to-square"></i> Cáº­p nháº­t káº¿t quáº£ thÆ°Æ¡ng lÆ°á»£ng</button>
                        `;
                    }
                    break;

                case 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng':
                    buttonsHtml = `
                        <button class="btn btn-primary" onclick="claimRedoNegotiation('${claim.id}')"><i class="fa-solid fa-rotate-left"></i> Cáº­p nháº­t láº¡i KQ thÆ°Æ¡ng lÆ°á»£ng</button>
                    `;
                    break;

                case 'Chá» ban hÃ nh QÄ':
                    buttonsHtml = `
                        <button class="btn btn-outline-primary" onclick="saveDecisionStatus('LÆ°u nhÃ¡p')"><i class="fa-regular fa-bookmark"></i> LÆ°u nhÃ¡p QÄ</button>
                        <button class="btn btn-success" onclick="saveDecisionStatus('Chá» kÃ½')"><i class="fa-solid fa-paper-plane"></i> Gá»­i duyá»‡t kÃ½ sá»‘</button>
                        <button class="btn btn-secondary" onclick="closeCreateDecisionForm()">Há»§y bá»</button>
                    `;
                    showCloseButton = false;
                    break;

                case 'Chá» thá»±c thi':
                    if (isDetailEditMode) {
                        buttonsHtml = `
                            <button class="btn btn-success" onclick="submitThucThiUpdate()"><i class="fa-solid fa-circle-check"></i> HoÃ n thÃ nh thá»±c thi</button>
                            ${cancelActionBtnHtml}
                        `;
                        showCloseButton = false;
                    } else {
                        buttonsHtml = `
                            <button class="btn btn-primary" onclick="switchToEditMode('thucthi')"><i class="fa-solid fa-pen-to-square"></i> Cáº­p nháº­t káº¿t quáº£ thá»±c thi</button>
                        `;
                    }
                    break;

                case 'HoÃ n thÃ nh':
                    // Only Close button
                    break;
            }

            bar.innerHTML = buttonsHtml + (showCloseButton ? closeBtnHtml : '');
        }

        function claimRedoNegotiation(id) {
            const claim = claimsList.find(c => c.id === id);
            if (claim) {
                claim.status = 'Äang thÆ°Æ¡ng lÆ°á»£ng';
                saveClaimsToLocal();
                showToast("ÄÃ£ thiáº¿t láº­p láº¡i tráº¡ng thÃ¡i há»“ sÆ¡ vá» [Äang thÆ°Æ¡ng lÆ°á»£ng] Ä‘á»ƒ cáº­p nháº­t káº¿t quáº£ má»›i!", "success");
                showCaseDetail(id, true);
            }
        }

        function switchToEditMode(actionType = null) {
            if (actionType === 'tuthoithuly') {
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
            if (claim.status === 'LÆ°u nhÃ¡p' && isDetailEditMode) {
                container.innerHTML = `
                    <div style="background:#FAF5FF; border:1px solid #E9D5FF; padding:20px; border-radius:8px; margin-bottom:16px; font-size:13px;">
                        <div style="font-weight:700; color:#7C3AED; font-size:14px; margin-bottom:15px; border-bottom:1px dashed #E9D5FF; padding-bottom:8px;">
                            <i class="fa-solid fa-pen-to-square"></i> ÄANG CHá»ˆNH Sá»¬A Há»’ SÆ  NHÃP: ${claim.code}
                        </div>
                        
                        <!-- I. THÃ”NG TIN Há»’ SÆ  YÃŠU Cáº¦U -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px;">I. THÃ”NG TIN Há»’ SÆ  YÃŠU Cáº¦U:</div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">HÃ¬nh thá»©c tiáº¿p nháº­n há»“ sÆ¡</span>
                                <select class="form-control" id="claimNopKenh_edit">
                                    <option value="truc-tiep" ${claim.claimNopKenh === 'truc-tiep' ? 'selected' : ''}>Tiáº¿p nháº­n trá»±c tiáº¿p táº¡i má»™t cá»­a</option>
                                    <option value="buu-chinh" ${claim.claimNopKenh === 'buu-chinh' ? 'selected' : ''}>Nháº­n qua bÆ°u Ä‘iá»‡n/bÆ°u chÃ­nh</option>
                                    <option value="dvc" ${claim.claimNopKenh === 'dvc' ? 'selected' : ''}>Äá»“ng bá»™ tá»« Cá»•ng Dá»‹ch vá»¥ cÃ´ng trá»±c tuyáº¿n</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">LÄ©nh vá»±c phÃ¡t sinh thiá»‡t háº¡i</span>
                                <select class="form-control" id="claimFieldGroup_edit">
                                    <option value="hÃ nh chÃ­nh" ${claim.fieldGroup === 'hÃ nh chÃ­nh' ? 'selected' : ''}>TRONG HOáº T Äá»˜NG QUáº¢N LÃ HÃ€NH CHÃNH</option>
                                    <option value="hÃ¬nh sá»±" ${claim.fieldGroup === 'hÃ¬nh sá»±' ? 'selected' : ''}>TRONG HOáº T Äá»˜NG Tá» Tá»¤NG HÃŒNH Sá»°</option>
                                    <option value="dÃ¢n sá»±" ${claim.fieldGroup === 'dÃ¢n sá»±' ? 'selected' : ''}>TRONG HOáº T Äá»˜NG Tá» Tá»¤NG DÃ‚N Sá»°</option>
                                    <option value="tá»‘ tá»¥ng hÃ nh chÃ­nh" ${claim.fieldGroup === 'tá»‘ tá»¥ng hÃ nh chÃ­nh' ? 'selected' : ''}>TRONG HOáº T Äá»˜NG Tá» Tá»¤NG HÃ€NH CHÃNH</option>
                                    <option value="thi hÃ nh Ã¡n hÃ¬nh sá»±" ${claim.fieldGroup === 'thi hÃ nh Ã¡n hÃ¬nh sá»±' ? 'selected' : ''}>TRONG HOáº T Äá»˜NG THI HÃ€NH ÃN HÃŒNH Sá»°</option>
                                    <option value="thi hÃ nh Ã¡n dÃ¢n sá»±" ${claim.fieldGroup === 'thi hÃ nh Ã¡n dÃ¢n sá»±' ? 'selected' : ''}>TRONG HOáº T Äá»˜NG THI HÃ€NH ÃN DÃ‚N Sá»°</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">CÆ¡ quan giáº£i quyáº¿t bá»“i thÆ°á»ng</span>
                                <input type="text" class="form-control" id="claimCqNhan_edit" value="${claim.agency || ''}">
                            </div>
                        </div>
                        <div class="form-group" style="margin-top: 12px; margin-bottom: 16px;">
                            <span class="form-label">VÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng *</span>
                            <input type="text" class="form-control" id="claimDocBase_edit" value="${claim.docBase || ''}">
                            <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                        </div>

                        <!-- II. THÃ”NG TIN CHI TIáº¾T NGÆ¯á»œI YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">II. THÃ”NG TIN CHI TIáº¾T NGÆ¯á»œI YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG:</div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Há» vÃ  tÃªn ngÆ°á»i yÃªu cáº§u bá»“i thÆ°á»ng *</span>
                                <input type="text" class="form-control" id="claimNYCName_edit" value="${claim.nyc}">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">TÆ° cÃ¡ch ngÆ°á»i yÃªu cáº§u *</span>
                                <select class="form-control" id="claimNYCRole_edit">
                                    <option value="NgÆ°á»i bá»‹ thiá»‡t háº¡i" ${claim.nycRole === 'NgÆ°á»i bá»‹ thiá»‡t háº¡i' ? 'selected' : ''}>NgÆ°á»i bá»‹ thiá»‡t háº¡i</option>
                                    <option value="NgÆ°á»i thá»«a káº¿ cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i" ${claim.nycRole === 'NgÆ°á»i thá»«a káº¿ cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i' ? 'selected' : ''}>NgÆ°á»i thá»«a káº¿ cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i</option>
                                    <option value="Tá»• chá»©c káº¿ thá»«a quyá»n, nghÄ©a vá»¥ cá»§a tá»• chá»©c bá»‹ thiá»‡t háº¡i Ä‘Ã£ cháº¥m dá»©t tá»“n táº¡i" ${claim.nycRole === 'Tá»• chá»©c káº¿ thá»«a quyá»n, nghÄ©a vá»¥ cá»§a tá»• chá»©c bá»‹ thiá»‡t háº¡i Ä‘Ã£ cháº¥m dá»©t tá»“n táº¡i' ? 'selected' : ''}>Tá»• chá»©c káº¿ thá»«a quyá»n, nghÄ©a vá»¥...</option>
                                    <option value="NgÆ°á»i Ä‘áº¡i diá»‡n theo phÃ¡p luáº­t cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i" ${claim.nycRole === 'NgÆ°á»i Ä‘áº¡i diá»‡n theo phÃ¡p luáº­t cá»§a ngÆ°á»i bá»‹ thiá»‡t háº¡i' ? 'selected' : ''}>NgÆ°á»i Ä‘áº¡i diá»‡n theo phÃ¡p luáº­t...</option>
                                    <option value="CÃ¡ nhÃ¢n, phÃ¡p nhÃ¢n Ä‘Æ°á»£c á»§y quyá»n há»£p phÃ¡p" ${claim.nycRole === 'CÃ¡ nhÃ¢n, phÃ¡p nhÃ¢n Ä‘Æ°á»£c á»§y quyá»n há»£p phÃ¡p' ? 'selected' : ''}>CÃ¡ nhÃ¢n, phÃ¡p nhÃ¢n Ä‘Æ°á»£c á»§y quyá»n há»£p phÃ¡p</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Giá»›i tÃ­nh *</span>
                                <select class="form-control" id="claimNYCGender_edit">
                                    <option value="Nam" ${claim.nycGender === 'Nam' ? 'selected' : ''}>Nam</option>
                                    <option value="Ná»¯" ${claim.nycGender === 'Ná»¯' ? 'selected' : ''}>Ná»¯</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">NgÃ y thÃ¡ng nÄƒm sinh *</span>
                                <input type="text" class="form-control" id="claimNYCBirth_edit" value="${claim.nycBirth || ''}" placeholder="dd/mm/yyyy">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Tráº¡ng thÃ¡i ngÆ°á»i bá»‹ thiá»‡t háº¡i *</span>
                                <div style="display: flex; gap: 20px; align-items: center; height: 38px; padding-left: 5px;">
                                    <label style="cursor:pointer; font-weight:normal; margin-bottom:0;"><input type="radio" name="claimVictimAlive_edit" value="yes" ${claim.victimAlive !== 'no' ? 'checked' : ''}> CÃ²n sá»‘ng</label>
                                    <label style="cursor:pointer; font-weight:normal; margin-bottom:0;"><input type="radio" name="claimVictimAlive_edit" value="no" ${claim.victimAlive === 'no' ? 'checked' : ''}> ÄÃ£ máº¥t</label>
                                </div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Sá»‘ Ä‘iá»‡n thoáº¡i liÃªn há»‡ *</span>
                                <input type="text" class="form-control" id="claimNYCPhone_edit" value="${claim.nycPhone || ''}">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                        </div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">ThÆ° Ä‘iá»‡n tá»­ (Email)</span>
                                <input type="email" class="form-control" id="claimNYCEmail_edit" value="${claim.nycEmail || ''}">
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Loáº¡i giáº¥y tá» thÃ¢n nhÃ¢n *</span>
                                <select class="form-control" id="claimNYCCardType_edit">
                                    <option value="CCCD" ${claim.nycCardType === 'CCCD' ? 'selected' : ''}>CÄƒn cÆ°á»›c cÃ´ng dÃ¢n (CCCD)</option>
                                    <option value="CMND" ${claim.nycCardType === 'CMND' ? 'selected' : ''}>Chá»©ng minh nhÃ¢n dÃ¢n (CMND)</option>
                                    <option value="HoChieu" ${claim.nycCardType === 'HoChieu' ? 'selected' : ''}>Há»™ chiáº¿u</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Sá»‘ giáº¥y tá» thÃ¢n nhÃ¢n *</span>
                                <input type="text" class="form-control" id="claimNYCCardNo_edit" value="${claim.nycCardNo || ''}">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                        </div>
                        <div class="grid-3-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">NgÃ y cáº¥p *</span>
                                <input type="text" class="form-control" id="claimNYCCardDate_edit" value="${claim.nycCardDate || ''}" placeholder="dd/mm/yyyy">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">NÆ¡i cáº¥p *</span>
                                <input type="text" class="form-control" id="claimNYCCardPlace_edit" value="${claim.nycCardPlace || ''}">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Quá»‘c gia *</span>
                                <select class="form-control" id="claimNYCCountry_edit">
                                    <option value="Viá»‡t Nam" ${claim.nycCountry === 'Viá»‡t Nam' ? 'selected' : ''}>Viá»‡t Nam</option>
                                    <option value="KhÃ¡c" ${claim.nycCountry !== 'Viá»‡t Nam' ? 'selected' : ''}>Quá»‘c gia khÃ¡c</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid-2-cols" style="margin-bottom:12px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Tá»‰nh / ThÃ nh phá»‘ *</span>
                                <input type="text" class="form-control" id="claimNYCCity_edit" value="${claim.nycTinhThanh || ''}">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Äá»‹a chá»‰ chi tiáº¿t *</span>
                                <input type="text" class="form-control" id="claimNYCAddressDetail_edit" value="${claim.nycAddressDetail || ''}">
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                        </div>

                        <!-- III. THÃ”NG TIN Vá»¤ VIá»†C GÃ‚Y THIá»†T Háº I -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">III. THÃ”NG TIN Vá»¤ VIá»†C GÃ‚Y THIá»†T Háº I:</div>
                        <div class="grid-2-cols" style="margin-bottom:16px;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">HÃ nh vi gÃ¢y thiá»‡t háº¡i cá»§a ngÆ°á»i thi hÃ nh cÃ´ng vá»¥ *</span>
                                <textarea class="form-control" id="claimHanhVi_edit" rows="2">${claim.hanhVi || ''}</textarea>
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <span class="form-label">Má»‘i quan há»‡ nhÃ¢n quáº£ giá»¯a thiá»‡t háº¡i thá»±c táº¿ xáº£y ra vÃ  hÃ nh vi gÃ¢y thiá»‡t háº¡i *</span>
                                <textarea class="form-control" id="claimNhanQua_edit" rows="2">${claim.nhanQua || ''}</textarea>
                                <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                            </div>
                        </div>

                        <!-- IV. CHI TIáº¾T THIá»†T Háº I YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">IV. CHI TIáº¾T THIá»†T Háº I YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG:</div>
                        <div class="table-container" style="margin-bottom:16px;">
                            <table class="custom-table">
                                <thead>
                                    <tr style="background-color: var(--table-header-bg);">
                                        <th style="width: 50px; text-align: center;">Chá»n</th>
                                        <th style="width: 250px;">Má»¥c thiá»‡t háº¡i yÃªu cáº§u bá»“i thÆ°á»ng</th>
                                        <th style="min-width: 300px;">CÃ¡ch tÃ­nh / Diá»…n giáº£i cÃ´ng thá»©c Ã¡p dá»¥ng</th>
                                        <th style="width: 200px; text-align: right;">Sá»‘ tiá»n yÃªu cáº§u bá»“i thÆ°á»ng (Ä‘á»“ng)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${(() => {
                                        let rowsHtml = '';
                                        const items = [
                                            "1. TÃ i sáº£n bá»‹ xÃ¢m pháº¡m",
                                            "2. Thu nháº­p thá»±c táº¿ bá»‹ máº¥t/giáº£m sÃºt",
                                            "3. Váº­t cháº¥t do ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t",
                                            "4. Váº­t cháº¥t do sá»©c khá»e bá»‹ xÃ¢m pháº¡m",
                                            "5. Thiá»‡t háº¡i vá» tinh tháº§n",
                                            "6. CÃ¡c chi phÃ­ há»£p lÃ½ khÃ¡c"
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
                                                        <textarea class="form-control" id="claimThietHaiCalc_edit_${typeNum}" rows="1" placeholder="Diá»…n giáº£i..." ${isChecked ? '' : 'disabled'}>${calcVal}</textarea>
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
                                        <td colspan="3" style="text-align: right;">Tá»”NG Cá»˜NG Sá» TIá»€N YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG:</td>
                                        <td>
                                            <div style="display: flex; flex-direction: column; gap: 4px; text-align: right;">
                                                <div style="font-size: 15px; color: var(--danger-color);" id="claimTotalNumText_edit">${(claim.totalNum || 0).toLocaleString('vi-VN')} Ä‘á»“ng</div>
                                                <div style="font-size: 11.5px; font-style: italic; font-weight: normal; color: var(--text-muted);" id="claimTotalWordText_edit">Viáº¿t báº±ng chá»¯: ${numberToVietnameseWords(claim.totalNum || 0)}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div style="margin-bottom:15px; padding-left: 5px;">
                            <label style="font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:8px;"><input type="checkbox" id="claimRestoreHonor_edit" ${claim.restoreHonor ? 'checked' : ''}> CÃ³ yÃªu cáº§u phá»¥c há»“i danh dá»±</label>
                        </div>

                        <!-- V. Äá»€ NGHá»Š Táº M á»¨NG KINH PHÃ -->
                        <div style="font-weight:700; color:var(--primary-color); font-size:13px; margin-bottom:10px; margin-top:15px;">V. Äá»€ NGHá»Š Táº M á»¨NG KINH PHÃ & THÃ”NG TIN CHI TRáº¢:</div>
                        <div style="background-color: white; border: 1px solid #E9D5FF; padding: 16px; border-radius: 6px; margin-bottom:15px;">
                            <label style="font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size:13px;">
                                <input type="checkbox" id="claimNeedAdvance_edit" onchange="toggleDraftAdvancePanel(this.checked)" ${claim.advanceNum > 0 ? 'checked' : ''}> CÃ³ Ä‘á» nghá»‹ táº¡m á»©ng kinh phÃ­ bá»“i thÆ°á»ng (Äiá»u 44)
                            </label>
                            
                            <div id="claimAdvancePanel_edit" style="display: ${claim.advanceNum > 0 ? 'block' : 'none'}; border-top: 1px dashed #D8B4FE; padding-top: 14px; margin-top: 12px;">
                                <div class="grid-2-cols" style="margin-bottom: 12px;">
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Táº¡m á»©ng Thiá»‡t háº¡i tinh tháº§n (Ä‘á»“ng)</span>
                                        <input type="text" class="form-control" style="text-align: right;" id="claimAdvanceTinhThan_edit" value="${(claim.advanceTinhThan || 0).toLocaleString('vi-VN')}" oninput="formatCurrencyInput(this); sumDraftAdvance();">
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Táº¡m á»©ng Thiá»‡t háº¡i khÃ¡c (chá»n loáº¡i á»Ÿ trÃªn)</span>
                                        <div style="display: flex; gap: 8px;">
                                            <select class="form-control" style="flex: 1.2;" id="claimAdvanceKhacName_edit">
                                                <option value="">-- Chá»n má»¥c thiá»‡t háº¡i --</option>
                                                <option value="1" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 1) ? '' : 'disabled'}>1. TÃ i sáº£n bá»‹ xÃ¢m pháº¡m</option>
                                                <option value="2" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 2) ? '' : 'disabled'}>2. Thu nháº­p thá»±c táº¿ bá»‹ máº¥t/giáº£m sÃºt</option>
                                                <option value="3" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 3) ? '' : 'disabled'}>3. Váº­t cháº¥t do ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t</option>
                                                <option value="4" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 4) ? '' : 'disabled'}>4. Váº­t cháº¥t do sá»©c khá»e bá»‹ xÃ¢m pháº¡m</option>
                                                <option value="6" ${claim.thietHaiList && claim.thietHaiList.some(x => x.type === 6) ? '' : 'disabled'}>6. CÃ¡c chi phÃ­ há»£p lÃ½ khÃ¡c</option>
                                            </select>
                                            <input type="text" class="form-control" style="flex: 1; text-align: right;" id="claimAdvanceKhacVal_edit" value="${(claim.advanceKhac || 0).toLocaleString('vi-VN')}" placeholder="Sá»‘ tiá»n..." oninput="formatCurrencyInput(this); sumDraftAdvance();">
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="background-color: #FAF5FF; padding: 10px; border-radius: 4px; margin-bottom: 16px; border:1px solid #E9D5FF; font-size:12.5px;">
                                    <span style="font-weight: bold; color: var(--text-muted);">Tá»”NG Sá» TIá»€N Äá»€ NGHá»Š Táº M á»¨NG:</span>
                                    <span id="claimAdvanceTotalText_edit" style="font-weight: 700; color: var(--primary-light); margin-left: 8px;">${(claim.advanceNum || 0).toLocaleString('vi-VN')} Ä‘á»“ng</span>
                                </div>
                                
                                <div style="font-weight: 600; color: var(--primary-color); font-size: 13px; margin-bottom: 10px;">ThÃ´ng tin ngÆ°á»i nháº­n vÃ  PhÆ°Æ¡ng thá»©c chi tráº£:</div>
                                <div class="grid-3-cols" style="margin-bottom: 12px;">
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Há» vÃ  tÃªn ngÆ°á»i nháº­n *</span>
                                        <input type="text" class="form-control" id="claimRecName_edit" value="${claim.advanceRecName || claim.nyc}">
                                        <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Giáº¥y tá» thÃ¢n nhÃ¢n ngÆ°á»i nháº­n *</span>
                                        <input type="text" class="form-control" id="claimRecCard_edit" value="${claim.advanceRecCard || claim.nycCardNo}">
                                        <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Äá»‹a chá»‰ ngÆ°á»i nháº­n *</span>
                                        <input type="text" class="form-control" id="claimRecAddress_edit" value="${claim.advanceRecAddress || claim.nycAddressDetail}">
                                        <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                                    </div>
                                </div>
                                
                                <div class="form-group" style="margin-top:12px; margin-bottom: 12px; max-width: 300px;">
                                    <span class="form-label">PhÆ°Æ¡ng thá»©c nháº­n tiá»n *</span>
                                    <select class="form-control" id="claimRecMethod_edit" onchange="toggleDraftRecMethod(this.value)">
                                        <option value="tien-mat" ${claim.advanceRecKenh === 'tien-mat' ? 'selected' : ''}>Nháº­n tiá»n máº·t</option>
                                        <option value="chuyen-khoan" ${claim.advanceRecKenh === 'chuyen-khoan' ? 'selected' : ''}>Nháº­n qua chuyá»ƒn khoáº£n</option>
                                    </select>
                                </div>
                                
                                <div id="claimRecCashFields_edit" style="display: ${claim.advanceRecKenh !== 'chuyen-khoan' ? 'block' : 'none'}; max-width: 300px;" class="form-group" style="margin-bottom: 0;">
                                    <span class="form-label">Sá»‘ biÃªn lai nháº­n tiá»n máº·t</span>
                                    <input type="text" class="form-control" id="claimRecReceiptNo_edit" value="${claim.advanceReceiptNo || ''}">
                                </div>
                                
                                <div id="claimRecBankFields_edit" style="display: ${claim.advanceRecKenh === 'chuyen-khoan' ? 'grid' : 'none'}; margin-bottom: 0;" class="grid-4-cols">
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Chá»§ tÃ i khoáº£n *</span>
                                        <input type="text" class="form-control" id="claimRecBankUser_edit" value="${claim.advanceBankUser || ''}">
                                        <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Sá»‘ tÃ i khoáº£n *</span>
                                        <input type="text" class="form-control" id="claimRecBankAccount_edit" value="${claim.advanceBankAccount || ''}">
                                        <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">TÃªn ngÃ¢n hÃ ng *</span>
                                        <input type="text" class="form-control" id="claimRecBankName_edit" value="${claim.advanceBankName || ''}">
                                        <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;">
                                        <span class="form-label">Chi nhÃ¡nh *</span>
                                        <input type="text" class="form-control" id="claimRecBankBranch_edit" value="${claim.advanceBankBranch || ''}">
                                        <div class="error-message">ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SAVE & CANCEL BUTTONS -->
                    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                        <button class="btn btn-secondary" onclick="switchToReadOnlyMode()">Há»§y bá»</button>
                        <button class="btn btn-success" onclick="saveDraftChanges()">LÆ°u thay Ä‘á»•i</button>
                    </div>
                </div>
                `;
                return;
            }

            // READ-ONLY VIEW
            let thHtml = '';
            const items = [
                "1. TÃ i sáº£n bá»‹ xÃ¢m pháº¡m",
                "2. Thu nháº­p thá»±c táº¿ bá»‹ máº¥t/giáº£m sÃºt",
                "3. Váº­t cháº¥t do ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t",
                "4. Váº­t cháº¥t do sá»©c khá»e bá»‹ xÃ¢m pháº¡m",
                "5. Thiá»‡t háº¡i vá» tinh tháº§n",
                "6. CÃ¡c chi phÃ­ há»£p lÃ½ khÃ¡c"
            ];

            items.forEach((itemText, idx) => {
                const typeNum = idx + 1;
                const found = claim.thietHaiList ? claim.thietHaiList.find(x => x.type === typeNum) : null;
                const isChecked = !!found;
                const checkIcon = isChecked ? '<i class="fa-solid fa-square-check" style="color:var(--secondary-color); font-size:14px;"></i>' : '<i class="fa-regular fa-square" style="color:var(--text-muted); font-size:14px;"></i>';
                const calcText = isChecked ? found.calc : '<span style="color:var(--text-muted); font-style:italic;">KhÃ´ng yÃªu cáº§u</span>';
                const valText = isChecked ? found.val.toLocaleString('vi-VN') + ' Ä‘' : '0 Ä‘';
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
                filesHtml = `<span style="font-style:italic; color:var(--text-muted);">KhÃ´ng cÃ³ tÃ i liá»‡u Ä‘Ã­nh kÃ¨m</span>`;
            }

            let badgeClass = 'badge-info';
            if (claim.status === 'HoÃ n thÃ nh') badgeClass = 'badge-success';
            else if (claim.status === 'LÆ°u nhÃ¡p') badgeClass = 'badge-draft';
            else if (claim.status === 'Chá» tiáº¿p nháº­n') badgeClass = 'badge-pending';
            else if (claim.status === 'YÃªu cáº§u bá»• sung') badgeClass = 'badge-warning';
            else if (claim.status === 'Chá» thá»¥ lÃ½') badgeClass = 'badge-pending';
            else if (claim.status === 'Bá»‹ tá»« chá»‘i') badgeClass = 'badge-danger';
            else if (claim.status === 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng') badgeClass = 'badge-danger';
            else if (claim.status === 'Chá» ban hÃ nh QÄ') badgeClass = 'badge-warning';
            else if (claim.status === 'Chá» thá»±c thi') badgeClass = 'badge-warning';

            // Payout channels & banking helper
            let advanceSectionHtml = '';
            if (claim.advanceNum > 0) {
                const recKenhText = claim.advanceRecKenh === 'chuyen-khoan' ? 'Chuyá»ƒn khoáº£n' : 'Tiá»n máº·t';
                let payDetailsHtml = '';
                if (claim.advanceRecKenh === 'chuyen-khoan') {
                    payDetailsHtml = `
                        <div class="grid-4-cols" style="gap: 12px; font-size:12.5px; margin-top:8px; background:#F5F3FF; padding:10px; border-radius:6px; border:1px solid #E9D5FF;">
                            <div><strong>Chá»§ tÃ i khoáº£n:</strong> ${claim.advanceBankUser || '--'}</div>
                            <div><strong>Sá»‘ tÃ i khoáº£n:</strong> ${claim.advanceBankAccount || '--'}</div>
                            <div><strong>NgÃ¢n hÃ ng:</strong> ${claim.advanceBankName || '--'}</div>
                            <div><strong>Chi nhÃ¡nh:</strong> ${claim.advanceBankBranch || '--'}</div>
                        </div>
                    `;
                } else {
                    payDetailsHtml = `
                        <div style="font-size:12.5px; margin-top:8px; background:#F5F3FF; padding:10px; border-radius:6px; border:1px solid #E9D5FF; display:inline-block;">
                            <strong>Sá»‘ biÃªn lai nháº­n tiá»n máº·t:</strong> ${claim.advanceReceiptNo || '--'}
                        </div>
                    `;
                }

                advanceSectionHtml = `
                    <div style="margin-top: 15px; border-top: 1px dashed var(--border-color); padding-top: 15px;">
                        <span style="font-weight:700; color:var(--primary-color); display:block; margin-bottom:8px; font-size:13px;">
                            <i class="fa-solid fa-hand-holding-dollar"></i> IV. Äá»€ NGHá»Š Táº M á»¨NG KINH PHÃ Bá»’I THÆ¯á»œNG (ÄIá»€U 44)
                        </span>
                        <div class="grid-3-cols" style="gap: 12px; font-size: 13px;">
                            <div><strong>Táº¡m á»©ng thiá»‡t háº¡i tinh tháº§n:</strong> ${(claim.advanceTinhThan || 0).toLocaleString('vi-VN')} Ä‘</div>
                            <div><strong>Táº¡m á»©ng thiá»‡t háº¡i khÃ¡c:</strong> ${(claim.advanceKhac || 0).toLocaleString('vi-VN')} Ä‘</div>
                            <div><strong>Tá»•ng sá»‘ tiá»n táº¡m á»©ng Ä‘á» nghá»‹:</strong> <span style="font-weight:700; color:var(--secondary-color);">${claim.advanceNum.toLocaleString('vi-VN')} Ä‘</span></div>
                        </div>
                        <div style="font-size:11.5px; font-style:italic; margin-top:4px; color:var(--text-muted);">Viáº¿t báº±ng chá»¯: ${numberToVietnameseWords(claim.advanceNum)}</div>
                        
                        <div style="font-weight:700; color:var(--primary-color); font-size:12.5px; margin-top:12px;">V. THÃ”NG TIN NGÆ¯á»œI NHáº¬N & PHÆ¯Æ NG THá»¨C CHI TRáº¢:</div>
                        <div class="grid-4-cols" style="gap: 10px; font-size: 13px; margin-top:4px;">
                            <div><strong>Há» vÃ  tÃªn ngÆ°á»i nháº­n:</strong> ${claim.advanceRecName || claim.nyc}</div>
                            <div><strong>Sá»‘ giáº¥y tá» ngÆ°á»i nháº­n:</strong> ${claim.advanceRecCard || claim.nycCardNo}</div>
                            <div><strong>Äá»‹a chá»‰ ngÆ°á»i nháº­n:</strong> ${claim.advanceRecAddress || claim.address}</div>
                            <div><strong>PhÆ°Æ¡ng thá»©c nháº­n tiá»n:</strong> <span class="badge badge-info" style="font-size:11px; padding:2px 6px;">${recKenhText}</span></div>
                        </div>
                        ${payDetailsHtml}
                    </div>
                `;
            } else {
                advanceSectionHtml = `
                    <div style="margin-top: 15px; border-top: 1px dashed var(--border-color); padding-top: 15px; font-size: 13px;">
                        <strong>IV. Äá»€ NGHá»Š Táº M á»¨NG KINH PHÃ Bá»’I THÆ¯á»œNG:</strong> <span style="color:var(--text-muted); font-style:italic;">KhÃ´ng Ä‘á» nghá»‹ táº¡m á»©ng kinh phÃ­</span>
                    </div>
                `;
            }

            const nopKenhText = claim.claimNopKenh === 'buu-chinh' ? 'Gá»­i qua bÆ°u Ä‘iá»‡n/bÆ°u chÃ­nh' : claim.claimNopKenh === 'dvc' ? 'Äá»“ng bá»™ tá»« Cá»•ng Dá»‹ch vá»¥ cÃ´ng trá»±c tuyáº¿n' : 'Tiáº¿p nháº­n trá»±c tiáº¿p táº¡i má»™t cá»­a';

            container.innerHTML = `
                <!-- Top Status Header Block -->
                <div style="display:flex; justify-content:space-between; align-items:center; background:#FAFBFD; border:1px solid var(--border-color); padding:16px 20px; border-radius:8px; margin-bottom:20px; flex-wrap:wrap; gap:16px;">
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px;">MÃ£ há»“ sÆ¡ thá»¥ lÃ½</span>
                        <h4 style="font-size:18px; font-weight:800; color:var(--primary-color); margin:2px 0 0 0;">${claim.code}</h4>
                    </div>
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px;">NgÃ y ná»™p há»“ sÆ¡</span>
                        <div style="font-weight:600; color:var(--text-main); margin-top:2px;">${claim.date}</div>
                    </div>
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px;">Háº¡n giáº£i quyáº¿t bá»“i thÆ°á»ng</span>
                        <div style="font-weight:600; color:#b45309; margin-top:2px;">${claim.deadline || '--'}</div>
                    </div>
                    <div>
                        <span style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.5px; display:block; margin-bottom:4px;">Tráº¡ng thÃ¡i há»“ sÆ¡</span>
                        <span class="badge ${badgeClass}" style="font-size:12.5px; padding:6px 14px; font-weight:700;">${claim.status}</span>
                    </div>
                </div>

                <!-- Section 1: ThÃ´ng tin ngÆ°á»i yÃªu cáº§u -->
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px;">
                    <div style="font-weight:700; color:var(--primary-color); font-size:13.5px; border-bottom:2.5px solid #F1F5F9; padding-bottom:8px; margin-bottom:12px;">
                        <i class="fa-solid fa-user-tie"></i> I. THÃ”NG TIN NGÆ¯á»œI YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG
                    </div>
                    <div class="grid-4-cols" style="gap: 12px 20px; font-size: 13px; line-height: 1.6;">
                        <div><strong style="color:var(--text-muted);">Há» vÃ  tÃªn:</strong> <br><span style="text-transform:uppercase; font-weight:700; color:var(--text-main);">${claim.nyc}</span></div>
                        <div><strong style="color:var(--text-muted);">TÆ° cÃ¡ch ngÆ°á»i yÃªu cáº§u:</strong> <br><span style="font-weight:600; color:var(--secondary-color);">${claim.nycRole}</span></div>
                        <div><strong style="color:var(--text-muted);">Giá»›i tÃ­nh:</strong> <br>${claim.nycGender}</div>
                        <div><strong style="color:var(--text-muted);">NgÃ y sinh:</strong> <br>${claim.nycBirth}</div>
                        <div><strong style="color:var(--text-muted);">Tráº¡ng thÃ¡i ngÆ°á»i bá»‹ háº¡i:</strong> <br>${claim.victimAlive === 'no' ? '<span style="color:var(--danger-color); font-weight:600;">ÄÃ£ máº¥t</span>' : 'CÃ²n sá»‘ng'}</div>
                        <div><strong style="color:var(--text-muted);">Loáº¡i giáº¥y tá» thÃ¢n nhÃ¢n:</strong> <br>${claim.nycCardType}</div>
                        <div><strong style="color:var(--text-muted);">Sá»‘ giáº¥y tá» thÃ¢n nhÃ¢n:</strong> <br>${claim.nycCardNo}</div>
                        <div><strong style="color:var(--text-muted);">NgÃ y cáº¥p:</strong> <br>${claim.nycCardDate || '--'}</div>
                        <div><strong style="color:var(--text-muted);">NÆ¡i cáº¥p:</strong> <br>${claim.nycCardPlace || '--'}</div>
                        <div><strong style="color:var(--text-muted);">Sá»‘ Ä‘iá»‡n thoáº¡i:</strong> <br>${claim.nycPhone || '--'}</div>
                        <div><strong style="color:var(--text-muted);">Email:</strong> <br>${claim.nycEmail || '--'}</div>
                        <div><strong style="color:var(--text-muted);">Quá»‘c gia:</strong> <br>${claim.nycCountry}</div>
                        <div><strong style="color:var(--text-muted);">Tá»‰nh / ThÃ nh phá»‘:</strong> <br>${claim.nycTinhThanh}</div>
                        <div style="grid-column: span 3;"><strong style="color:var(--text-muted);">Äá»‹a chá»‰ chi tiáº¿t:</strong> <br>${claim.nycAddressDetail}</div>
                    </div>
                </div>

                <!-- Section 2: ThÃ´ng tin vá»¥ viá»‡c gÃ¢y thiá»‡t háº¡i & CÄƒn cá»© -->
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px;">
                    <div style="font-weight:700; color:var(--primary-color); font-size:13.5px; border-bottom:2.5px solid #F1F5F9; padding-bottom:8px; margin-bottom:12px;">
                        <i class="fa-solid fa-circle-info"></i> II. THÃ”NG TIN Vá»¤ VIá»†C GÃ‚Y THIá»†T Háº I & CÄ‚N Cá»¨
                    </div>
                    <div class="grid-3-cols" style="gap: 12px 20px; font-size: 13px; line-height: 1.6;">
                        <div><strong style="color:var(--text-muted);">HÃ¬nh thá»©c tiáº¿p nháº­n há»“ sÆ¡:</strong> <br>${nopKenhText}</div>
                        <div><strong style="color:var(--text-muted);">LÄ©nh vá»±c phÃ¡t sinh thiá»‡t háº¡i:</strong> <br><span style="text-transform:uppercase; font-weight:600; font-size:11px; color:var(--primary-color);">TRONG HOáº T Äá»˜NG ${claim.fieldGroup.toUpperCase()}</span></div>
                        <div><strong style="color:var(--text-muted);">CÆ¡ quan giáº£i quyáº¿t bá»“i thÆ°á»ng:</strong> <br>${claim.agency || '--'}</div>
                        <div style="grid-column: span 3; background:#FAFBFD; border-left:3px solid var(--secondary-color); padding:10px; border-radius:4px; margin-top:4px;">
                            <strong style="color:var(--text-muted);">VÄƒn báº£n lÃ m cÄƒn cá»© yÃªu cáº§u bá»“i thÆ°á»ng:</strong> <br><span style="font-weight:600; color:var(--text-main);">${claim.docBase || 'ChÆ°a cáº­p nháº­t vÄƒn báº£n cÄƒn cá»©'}</span>
                        </div>
                        <div style="grid-column: span 3;"><strong style="color:var(--text-muted);">HÃ nh vi gÃ¢y thiá»‡t háº¡i cá»§a ngÆ°á»i thi hÃ nh cÃ´ng vá»¥:</strong> <br><span style="color:var(--text-main); font-style:italic;">${claim.hanhVi}</span></div>
                        <div style="grid-column: span 3;"><strong style="color:var(--text-muted);">Má»‘i quan há»‡ nhÃ¢n quáº£ giá»¯a thiá»‡t háº¡i thá»±c táº¿ xáº£y ra vÃ  hÃ nh vi gÃ¢y thiá»‡t háº¡i:</strong> <br><span style="color:var(--text-main); font-style:italic;">${claim.nhanQua}</span></div>
                    </div>
                </div>

                <!-- Section 3: Thiá»‡t háº¡i & Ä‘á» nghá»‹ bá»“i thÆ°á»ng -->
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="font-weight:700; color:var(--primary-color); font-size:13.5px; border-bottom:2.5px solid #F1F5F9; padding-bottom:8px; margin-bottom:12px;">
                        <i class="fa-solid fa-money-check-dollar"></i> III. THIá»†T Háº I YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG
                    </div>
                    
                    <div class="table-container" style="margin-bottom: 15px;">
                        <table class="custom-table">
                            <thead>
                                <tr style="background-color: var(--table-header-bg);">
                                    <th style="width: 280px;">Má»¥c thiá»‡t háº¡i yÃªu cáº§u bá»“i thÆ°á»ng</th>
                                    <th style="min-width: 300px;">CÃ¡ch tÃ­nh / Diá»…n giáº£i cÃ´ng thá»©c Ã¡p dá»¥ng</th>
                                    <th style="width: 220px; text-align: right;">Sá»‘ tiá»n yÃªu cáº§u bá»“i thÆ°á»ng (Ä‘á»“ng)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${thHtml}
                                <tr style="background-color: #F8FAFC; font-weight: 700; font-size: 13.5px;">
                                    <td colspan="2" style="text-align: right; color:var(--text-main);">Tá»”NG Cá»˜NG Sá» TIá»€N YÃŠU Cáº¦U Bá»’I THÆ¯á»œNG:</td>
                                    <td style="text-align: right; color: var(--danger-color); font-size: 15px;">
                                        ${(claim.totalNum || 0).toLocaleString('vi-VN')} Ä‘á»“ng
                                    </td>
                                </tr>
                                <tr style="background-color: #F8FAFC; font-style: italic; font-size: 12.5px;">
                                    <td colspan="3" style="text-align: right; color: var(--text-muted); font-weight: normal;">
                                        Viáº¿t báº±ng chá»¯: ${numberToVietnameseWords(claim.totalNum || 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="grid-2-cols" style="gap: 16px; margin-bottom: 12px; font-size: 13px;">
                        <div>
                            <strong>YÃªu cáº§u phá»¥c há»“i danh dá»±:</strong> 
                            ${claim.restoreHonor ? '<span class="badge badge-success" style="font-size:10.5px; padding:3px 8px;">CÃ³ yÃªu cáº§u phá»¥c há»“i danh dá»±</span>' : '<span style="color:var(--text-muted); font-style:italic;">KhÃ´ng yÃªu cáº§u</span>'}
                        </div>
                    </div>

                    <!-- Advance Payment and Recipient Blocks -->
                    ${advanceSectionHtml}

                    <div style="margin-top:15px; border-top:1px dashed #e2e8f0; padding-top:12px;">
                        <strong style="display:block; margin-bottom:6px; font-size:12.5px; color:var(--text-muted);">Há»“ sÆ¡ tÃ i liá»‡u Ä‘Ã­nh kÃ¨m kÃ¨m Ä‘Æ¡n yÃªu cáº§u:</strong>
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
            if (totalText) totalText.innerText = total.toLocaleString('vi-VN') + ' Ä‘á»“ng';
            if (totalWord) totalWord.innerText = 'Viáº¿t báº±ng chá»¯: ' + numberToVietnameseWords(total);
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
            if (totalEl) totalEl.innerText = total.toLocaleString('vi-VN') + ' Ä‘á»“ng';
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
                    showToast("Vui lÃ²ng nháº­p Ä‘áº§y Ä‘á»§ cÃ¡c trÆ°á»ng báº¯t buá»™c mÃ u Ä‘á»!", "error");
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
                claim.status = 'Chá» tiáº¿p nháº­n';
                claim.timeline.push({
                    title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "ÄÃ£ ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng chÃ­nh thá»©c. Tráº¡ng thÃ¡i chuyá»ƒn sang [Chá» tiáº¿p nháº­n]",
                    status: "completed"
                });
                showToast("Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng thÃ nh cÃ´ng!", "success");
            } else {
                showToast("ÄÃ£ cáº­p nháº­t thay Ä‘á»•i thÃ´ng tin há»“ sÆ¡ nhÃ¡p thÃ nh cÃ´ng!", "success");
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

            if (claim.restoreHonor) {
                if (subTabsContainer) subTabsContainer.style.display = 'flex';
                if (phddTabBtn) phddTabBtn.style.display = 'inline-block';
                if (kqxlTabBtn) kqxlTabBtn.innerHTML = '<i class="fa-solid fa-scale-balanced"></i> Káº¿t quáº£ xá»­ lÃ½ há»“ sÆ¡';
            } else {
                if (subTabsContainer) subTabsContainer.style.display = 'none';
                if (phddTabBtn) phddTabBtn.style.display = 'none';
                switchDetailSubTab('kq-xl');
            }

            // 1. Thá»¥ lÃ½
            document.getElementById('detThulyKenh').value = claim.fieldGroup === 'hÃ nh chÃ­nh' ? 'Má»™t cá»­a trá»±c tiáº¿p' : 'Äá»“ng bá»™ há»‡ thá»‘ng';
            document.getElementById('detThulyDate').value = claim.date;
            document.getElementById('detThulyHan').value = claim.deadline;
            document.getElementById('detThulyAgency').value = claim.agency;
            document.getElementById('detThulyOfficer').value = claim.assignedOfficer || "ChÆ°a phÃ¢n cÃ´ng";
            
            const isRejected = (claim.status === 'Bá»‹ tá»« chá»‘i' || claim.status === 'Tá»« chá»‘i tiáº¿p nháº­n' || claim.status === 'Tá»« chá»‘i thá»¥ lÃ½');

            // Handle rejection block visibility and populate fields
            const rejectBlock = document.getElementById('detThulyRejectBlock');
            const thulyEditBlock = document.getElementById('thulyEditBlock');
            if (rejectBlock) {
                if (isRejected) {
                    rejectBlock.style.display = 'block';
                    const titleTextEl = document.getElementById('detThulyRejectTitleText');
                    if (titleTextEl) {
                        titleTextEl.innerText = claim.status === 'Tá»« chá»‘i tiáº¿p nháº­n' 
                            ? "THÃ”NG TIN CHI TIáº¾T Tá»ª CHá»I TIáº¾P NHáº¬N Há»’ SÆ " 
                            : "THÃ”NG TIN CHI TIáº¾T Tá»ª CHá»I THá»¤ LÃ Há»’ SÆ ";
                    }
                    document.getElementById('detThulyRejectOfficer').innerText = claim.rejectOfficer || (claim.status === 'Tá»« chá»‘i tiáº¿p nháº­n' ? "Tráº§n Thá»‹ ChuyÃªn ViÃªn (CÃ¡n bá»™ má»™t cá»­a)" : "Nguyá»…n VÄƒn Thá»§ TrÆ°á»Ÿng (Thá»§ trÆ°á»Ÿng cÆ¡ quan)");
                    document.getElementById('detThulyRejectDate').innerText = claim.rejectDate || claim.date || "14/05/2026";
                    document.getElementById('detThulyRejectReason').innerText = claim.rejectReason || "Há»“ sÆ¡ bá»‹ tá»« chá»‘i tiáº¿p nháº­n/thá»¥ lÃ½ theo quy Ä‘á»‹nh.";

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
                                        <p style="margin: 4px 0 0 0; color: #374151; font-style: italic; font-size: 12px;">Ná»™i dung: ${log.reason}</p>
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
                if (claim.status === 'Tá»« chá»‘i thá»¥ lÃ½' && isDetailEditMode) {
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

            // 2. YÃªu cáº§u bá»• sung
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
                bsRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">KhÃ´ng cÃ³ yÃªu cáº§u bá»• sung há»“ sÆ¡</div>`;
            }

            // 3. XÃ¡c minh
            const xmRead = document.getElementById('xacminhReadBlock');
            const xmEdit = document.getElementById('xacminhEditBlock');
            xmRead.innerHTML = '';
            xmEdit.style.display = 'none';

            if (claim.status === 'Äang xÃ¡c minh thiá»‡t háº¡i' && isDetailEditMode) {
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
                    const verifiedNote = item.xmNote || 'XÃ¡c minh Ä‘Ãºng giÃ¡ trá»‹ thá»±c táº¿';
                    tableHtml += `
                        <tr>
                            <td>${idx + 1}</td>
                            <td>${getThietHaiName(item.type)}</td>
                            <td style="text-align:right;">${claimedVal.toLocaleString('vi-VN')} Ä‘</td>
                            <td><input type="number" class="form-control" style="text-align:right; font-weight:600; font-size:13px;" id="editXmVal_${idx}" value="${verifiedVal}"></td>
                            <td><input type="text" class="form-control" style="font-size:13px;" id="editXmNote_${idx}" value="${verifiedNote}"></td>
                        </tr>
                    `;
                });
                xmTable.innerHTML = tableHtml;
            } else {
                if (claim.xmTotalAmount !== undefined || ['Äang thÆ°Æ¡ng lÆ°á»£ng', 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng', 'Chá» ban hÃ nh QÄ', 'Chá» thá»±c thi', 'HoÃ n thÃ nh'].includes(claim.status)) {
                    // Render comparison table
                    let comparisonRowsHtml = '';
                    let totalClaimed = 0;
                    let totalVerified = 0;
                    claim.thietHaiList.forEach((item, idx) => {
                        const claimedVal = item.val;
                        const verifiedVal = item.xmVal !== undefined ? item.xmVal : claimedVal;
                        const diff = verifiedVal - claimedVal;
                        const diffText = diff === 0 ? "0 Ä‘" : (diff > 0 ? "+" : "") + diff.toLocaleString('vi-VN') + " Ä‘";
                        const diffColor = diff < 0 ? "#ef4444" : (diff > 0 ? "#10b981" : "#64748b");
                        
                        totalClaimed += claimedVal;
                        totalVerified += verifiedVal;

                        comparisonRowsHtml += `
                            <tr>
                                <td style="text-align:center;">${idx + 1}</td>
                                <td>${getThietHaiName(item.type)}</td>
                                <td style="text-align:right; font-weight:500;">${claimedVal.toLocaleString('vi-VN')} Ä‘</td>
                                <td style="text-align:right; font-weight:600; color:var(--primary-color);">${verifiedVal.toLocaleString('vi-VN')} Ä‘</td>
                                <td style="text-align:right; font-weight:500; color:${diffColor};">${diffText}</td>
                                <td>${item.xmNote || 'XÃ¡c minh Ä‘Ãºng thá»±c táº¿'}</td>
                            </tr>
                        `;
                    });

                    const comparisonTableHtml = `
                        <div style="margin-top: 10px; margin-bottom: 15px;">
                            <span style="font-weight:700; font-size:12.5px; color:#1e293b; display:block; margin-bottom:6px;"><i class="fa-solid fa-list-check"></i> Káº¾T QUáº¢ Äá»I SOÃT CHI TIáº¾T CÃC KHOáº¢N THIá»†T Háº I:</span>
                            <table class="custom-table" style="background: white; width:100%; border-collapse:collapse; font-size:12.5px;">
                                <thead style="background-color:#f8fafc;">
                                    <tr>
                                        <th style="width:40px; text-align:center;">STT</th>
                                        <th>Khoáº£n má»¥c thiá»‡t háº¡i</th>
                                        <th style="text-align:right; width:130px;">Tiá»n yÃªu cáº§u (Ä‘)</th>
                                        <th style="text-align:right; width:130px;">Tiá»n xÃ¡c minh (Ä‘)</th>
                                        <th style="text-align:right; width:110px;">ChÃªnh lá»‡ch</th>
                                        <th>Ghi chÃº xÃ¡c minh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${comparisonRowsHtml}
                                    <tr style="font-weight:700; background-color:#f1f5f9;">
                                        <td colspan="2" style="text-align:right;">Tá»”NG Cá»˜NG:</td>
                                        <td style="text-align:right;">${totalClaimed.toLocaleString('vi-VN')} Ä‘</td>
                                        <td style="text-align:right; color:var(--danger-color);">${totalVerified.toLocaleString('vi-VN')} Ä‘</td>
                                        <td style="text-align:right; color:${(totalVerified - totalClaimed) < 0 ? '#ef4444' : ((totalVerified - totalClaimed) > 0 ? '#10b981' : '#64748b')};">
                                            ${(totalVerified - totalClaimed) === 0 ? "0 Ä‘" : ((totalVerified - totalClaimed) > 0 ? "+" : "") + (totalVerified - totalClaimed).toLocaleString('vi-VN') + " Ä‘"}
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
                        filesHtml = '<span style="font-style:italic; color:#64748b;">KhÃ´ng cÃ³ tá»‡p bÃ¡o cÃ¡o Ä‘Ã­nh kÃ¨m</span>';
                    }

                    xmRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Tá»•ng tiá»n bá»“i thÆ°á»ng xÃ¡c minh:</strong> <span style="font-weight:700; color:var(--danger-color); font-size:14px;">${(claim.xmTotalAmount || totalVerified).toLocaleString('vi-VN')} Ä‘</span></p>
                            ${comparisonTableHtml}
                            <p style="margin-top:8px;"><strong>ThÃ´ng tin xÃ¡c minh thiá»‡t háº¡i khÃ¡c:</strong> ${claim.xmOtherInfo || 'KhÃ´ng cÃ³'}</p>
                            <p><strong>KhÃ´i phá»¥c quyá»n lá»£i khÃ¡c:</strong> ${claim.otherRestore || 'KhÃ´ng cÃ³'}</p>
                            <p><strong>PhÆ°Æ¡ng thá»©c chi tráº£ xÃ¡c Ä‘á»‹nh:</strong> ${claim.xmMethod === 'tien-mat' ? 'Nháº­n tiá»n máº·t táº¡i kho báº¡c' : 'Chuyá»ƒn khoáº£n ngÃ¢n hÃ ng'}</p>
                            <div style="margin-top: 8px;">
                                <strong>BÃ¡o cÃ¡o káº¿t quáº£ xÃ¡c minh Ä‘Ã­nh kÃ¨m:</strong>
                                <div style="margin-top: 4px; display:flex; flex-direction:column; gap:4px;">
                                    ${filesHtml}
                                </div>
                            </div>
                        </div>`;
                } else {
                    xmRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">ChÆ°a tiáº¿n hÃ nh xÃ¡c minh thiá»‡t háº¡i</div>`;
                }
            }

            // 4. ThÆ°Æ¡ng lÆ°á»£ng
            const tlRead = document.getElementById('thuongluongReadBlock');
            const tlEdit = document.getElementById('thuongluongEditBlock');
            tlRead.innerHTML = '';
            tlEdit.style.display = 'none';

            if (claim.status === 'Äang thÆ°Æ¡ng lÆ°á»£ng' && isDetailEditMode) {
                tlEdit.style.display = 'block';
                document.getElementById('editTlTimeExp').value = claim.tlTimeExp || "";
                document.getElementById('editTlVenueExp').value = claim.tlVenueExp || "";
                document.getElementById('editTlMembersExp').value = claim.tlMembersExp || "";
                document.getElementById('editTlTimeAct').value = new Date().toLocaleString('vi-VN');
                document.getElementById('editTlVenueAct').value = claim.tlVenueExp || "";
                document.getElementById('editTlMembersAct').value = claim.tlMembersExp || "";
                document.getElementById('editTlDesc').value = "";
            } else {
                if (claim.tlResult || ['Chá» ban hÃ nh QÄ', 'Chá» thá»±c thi', 'HoÃ n thÃ nh'].includes(claim.status)) {
                    tlRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Káº¿t quáº£ há»p thÆ°Æ¡ng lÆ°á»£ng:</strong> <span style="font-weight:700; color:var(--success-color);">${claim.tlResult || "ThÆ°Æ¡ng lÆ°á»£ng thÃ nh cÃ´ng"}</span></p>
                            <p><strong>Thá»i gian thá»±c táº¿:</strong> ${claim.tlTimeAct || "08/07/2026 09:00"}</p>
                            <p><strong>Äá»‹a Ä‘iá»ƒm thá»±c táº¿:</strong> ${claim.tlVenueAct || "PhÃ²ng há»p Sá»Ÿ TÆ° phÃ¡p"}</p>
                            <p><strong>BiÃªn báº£n há»p thÆ°Æ¡ng lÆ°á»£ng:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-file-pdf"></i> Bien_ban_thuong_luong_co_chu_ky.pdf</a></p>
                        </div>`;
                } else {
                    tlRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">ChÆ°a tiáº¿n hÃ nh há»p thÆ°Æ¡ng lÆ°á»£ng giáº£i quyáº¿t</div>`;
                }
            }

            // 5. Quyáº¿t Ä‘á»‹nh bá»“i thÆ°á»ng
            const qdRead = document.getElementById('quyetdinhReadBlock');
            const qdEdit = document.getElementById('quyetdinhEditBlock');
            qdRead.innerHTML = '';
            qdEdit.style.display = 'none';

            if (claim.status === 'Chá» ban hÃ nh QÄ' && isDetailEditMode) {
                qdEdit.style.display = 'block';
                document.getElementById('decAmountInput').value = claim.xmTotalAmount || claim.totalNum;
                document.getElementById('decDateInput').value = new Date().toLocaleDateString('vi-VN');
                document.getElementById('decNoInput').value = '';
                document.getElementById('decContentInput').value = `Quyáº¿t Ä‘á»‹nh bá»“i thÆ°á»ng thiá»‡t háº¡i váº­t cháº¥t sá»‘ tiá»n ${(claim.xmTotalAmount || claim.totalNum).toLocaleString('vi-VN')}Ä‘ cho Ã´ng/bÃ  ${claim.nyc}`;
            } else {
                if (claim.decNo || ['Chá» thá»±c thi', 'HoÃ n thÃ nh'].includes(claim.status)) {
                    qdRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Sá»‘ Quyáº¿t Ä‘á»‹nh bá»“i thÆ°á»ng:</strong> <span style="font-weight:700; color:var(--primary-hover);">${claim.decNo || "104/QÄ-BT"}</span></p>
                            <p><strong>NgÃ y ban hÃ nh:</strong> ${claim.decDate || "02/04/2026"}</p>
                            <p><strong>Sá»‘ tiá»n quyáº¿t Ä‘á»‹nh bá»“i thÆ°á»ng:</strong> <span style="font-weight:700; color:var(--danger-color);">${(claim.decAmount || claim.totalNum).toLocaleString('vi-VN')} Ä‘</span></p>
                            <p><strong>TÃ i liá»‡u Quyáº¿t Ä‘á»‹nh gá»‘c:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-file-pdf"></i> Quyet_dinh_boi_thuong_da_ky.pdf</a></p>
                        </div>`;
                } else {
                    qdRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">ChÆ°a ban hÃ nh Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t bá»“i thÆ°á»ng chÃ­nh thá»©c</div>`;
                }
            }

            // 6. Thá»±c thi Quyáº¿t Ä‘á»‹nh
            const ttRead = document.getElementById('thucthiReadBlock');
            const ttEdit = document.getElementById('thucthiEditBlock');
            ttRead.innerHTML = '';
            ttEdit.style.display = 'none';

            if (claim.status === 'Chá» thá»±c thi' && isDetailEditMode) {
                ttEdit.style.display = 'block';
                document.getElementById('thucthiDateInput').value = new Date().toLocaleDateString('vi-VN');
                document.getElementById('thucthiNoteInput').value = '';
            } else {
                if (claim.status === 'HoÃ n thÃ nh') {
                    ttRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>NgÃ y chi tráº£ thá»±c táº¿:</strong> ${claim.thucthiDate || "20/07/2026"}</p>
                            <p><strong>Chá»©ng tá»« thanh toÃ¡n:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-receipt"></i> Chung_tu_chi_tien_uy_nhiem_chi.pdf</a></p>
                            <p><strong>Ghi chÃº:</strong> ${claim.thucthiNote || "ÄÃ£ nháº­n tiá»n Ä‘áº§y Ä‘á»§ qua chuyá»ƒn khoáº£n ngÃ¢n hÃ ng."}</p>
                        </div>`;
                } else {
                    ttRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">ChÆ°a thá»±c thi chi tráº£ bá»“i thÆ°á»ng</div>`;
                }
            }

            // 7. Kinh phÃ­ bá»“i thÆ°á»ng
            const kpRead = document.getElementById('kinhphiReadBlock');
            kpRead.innerHTML = '';
            if (claim.fundRequests && claim.fundRequests.length > 0) {
                let rowsHtml = '';
                claim.fundRequests.forEach(req => {
                    let statusBadge = '';
                    if (req.status === 'HoÃ n thÃ nh') {
                        statusBadge = `<span class="badge bg-success" style="font-size:11px; padding:3px 8px; font-weight: 500;">HoÃ n thÃ nh</span>`;
                    } else if (req.status === 'Chá» duyá»‡t') {
                        statusBadge = `<span class="badge bg-warning" style="font-size:11px; padding:3px 8px; font-weight: 500;">Chá» duyá»‡t</span>`;
                    } else if (req.status === 'Chá» chi tráº£') {
                        statusBadge = `<span class="badge bg-info" style="font-size:11px; padding:3px 8px; font-weight: 500;">Chá» chi tráº£</span>`;
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
                            <td style="padding: 10px; font-weight: 600; color: #1e293b;">${req.amount.toLocaleString('vi-VN')} Ä‘</td>
                            <td style="padding: 10px; font-weight: 600; color: #0f766e;">${(req.approvedAmount || req.amount).toLocaleString('vi-VN')} Ä‘</td>
                            <td style="padding: 10px; font-weight: 600; color: var(--danger-color);">${(req.payoutAmountReal || 0).toLocaleString('vi-VN')} Ä‘</td>
                            <td style="padding: 10px; text-align: center;">${statusBadge}</td>
                        </tr>
                    `;
                });

                kpRead.innerHTML = `
                    <div style="background-color: #F0F9FF; border: 1px solid #BAE6FD; padding: 12px; border-radius: 6px; margin-bottom: 12px; font-size: 12.5px; color: #0369A1; line-height: 1.5; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-circle-info" style="font-size: 14px;"></i>
                        <span>ThÃ´ng tin liÃªn káº¿t trá»±c tuyáº¿n vá»›i <strong>Module Quáº£n lÃ½ kinh phÃ­ bá»“i thÆ°á»ng</strong>. Báº¥m vÃ o mÃ£ yÃªu cáº§u Ä‘á»ƒ xem chi tiáº¿t chá»©ng tá»« chi tráº£.</span>
                    </div>
                    <div style="border: 1px solid var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; background: white;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left;">
                            <thead>
                                <tr style="background-color: #F8FAFC; border-bottom: 1px solid var(--border-color); height: 38px;">
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">MÃ£ yÃªu cáº§u</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Loáº¡i yÃªu cáº§u</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Sá»‘ tiá»n Ä‘á» nghá»‹</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Sá»‘ tiá»n phÃª duyá»‡t</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569;">Thá»±c táº¿ chi tráº£</th>
                                    <th style="padding: 10px; font-weight: 600; color: #475569; text-align: center;">Tráº¡ng thÃ¡i</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                `;
            } else {
                kpRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Há»“ sÆ¡ nÃ y khÃ´ng cÃ³ Ä‘á» nghá»‹ táº¡m á»©ng hoáº·c yÃªu cáº§u cáº¥p kinh phÃ­ bá»“i thÆ°á»ng.</div>`;
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
            if (claim.status === 'Chá» tiáº¿p nháº­n' || claim.status === 'Chá» thá»¥ lÃ½') {
                forceOpenAccordion('thuly');
            } else if (claim.status === 'YÃªu cáº§u bá»• sung') {
                forceOpenAccordion('bosung');
                if (isDetailEditMode) {
                    bsEdit.style.display = 'block';
                }
            } else if (claim.status === 'Äang xÃ¡c minh thiá»‡t háº¡i') {
                forceOpenAccordion('xacminh');
            } else if (claim.status === 'Äang thÆ°Æ¡ng lÆ°á»£ng') {
                forceOpenAccordion('thuongluong');
            } else if (claim.status === 'Chá» ban hÃ nh QÄ') {
                forceOpenAccordion('quyetdinh');
            } else if (claim.status === 'Chá» thá»±c thi') {
                forceOpenAccordion('thucthi');
            } else if (claim.status === 'HoÃ n thÃ nh') {
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
                    html += ` <a href="javascript:void(0)" class="action-link" style="color: #ef4444; font-size: 12.5px; font-weight: 600;" onclick="removePhddStepFile(${step})">XÃ³a</a>`;
                }
                wrapper.innerHTML = html;
            } else {
                if (isEdit) {
                    wrapper.innerHTML = `
                        <label class="btn-brown" style="cursor: pointer; padding: 6px 12px; font-size: 13px; margin: 0;">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Chá»n tá»‡p Ä‘Ã­nh kÃ¨m
                            <input type="file" style="display: none;" onchange="handlePhddStepFile(${step}, this)">
                        </label>
                        <span style="font-size: 13px; color: #64748b; font-style: italic;">ChÆ°a cÃ³ tá»‡p Ä‘Ã­nh kÃ¨m</span>
                    `;
                } else {
                    wrapper.innerHTML = `<span style="font-size: 13px; color: #94a3b8; font-style: italic;">KhÃ´ng cÃ³ tÃ i liá»‡u Ä‘Ã­nh kÃ¨m</span>`;
                }
            }
        }

        function removePhddStepFile(step) {
            showConfirmModal("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n gá»¡ tá»‡p Ä‘Ã­nh kÃ¨m nÃ y khÃ´ng?", () => {
                setPhddStepFile(step, null);
            });
        }

        function viewPhddMockFile(fileName) {
            const win = window.open("", "_blank");
            win.document.write(`<html><head><title>Xem tÃ i liá»‡u: ${fileName}</title>
            <style>body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f1f5f9; margin: 0; }
            .card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 500px; }</style>
            </head><body><div class="card">
            <h1 style="color: #0f766e; font-size: 22px;">Xem tÃ i liá»‡u Ä‘Ã­nh kÃ¨m</h1>
            <p>TÃªn tÃ i liá»‡u: <strong>${fileName}</strong></p>
            <p style="font-style: italic; color: #64748b; font-size: 13px; line-height:1.6;">Há»‡ thá»‘ng Ä‘ang mÃ´ phá»ng xem tá»‡p Ä‘Ã­nh kÃ¨m. File thá»±c táº¿ sáº½ Ä‘Æ°á»£c hiá»ƒn thá»‹ táº¡i Ä‘Ã¢y.</p>
            <button onclick="window.close()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top:15px;">ÄÃ³ng cá»­a sá»•</button>
            </div>`);
            win.document.close();
        }

        function toggleStep3FormInputs(val) {
            const direct = document.getElementById('editPhddStep3DirectGroup');
            const news = document.getElementById('editPhddStep3NewsGroup');
            if (val === 'Trá»±c tiáº¿p xin lá»—i') {
                direct.style.display = 'block';
                news.style.display = 'none';
            } else if (val === 'ÄÄƒng bÃ¡o xin lá»—i') {
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
                s1Badge.innerText = "ÄÃ£ thÃ´ng bÃ¡o chá»§ Ä‘á»™ng";
            } else {
                s1Badge.className = "badge bg-teal";
                s1Badge.innerText = "Äang thá»±c hiá»‡n";
            }

            // Step 2 Badge
            const s2Badge = document.getElementById('phddStep2Badge');
            if (claim.victimAlive === 'no') {
                s2Badge.className = "badge bg-warning";
                s2Badge.innerText = "Bá» qua (Do Ä‘á»‘i tÆ°á»£ng Ä‘Ã£ máº¥t)";
            } else if (claim.phddStep2Opinion) {
                s2Badge.className = "badge bg-success";
                s2Badge.innerText = "ÄÃ£ pháº£n há»“i: " + claim.phddStep2Opinion;
            } else {
                s2Badge.className = "badge bg-secondary";
                s2Badge.innerText = "Chá» cáº­p nháº­t Ã½ kiáº¿n";
            }

            // Step 3 Badge
            const s3Badge = document.getElementById('phddStep3Badge');
            if (claim.phddStep3No && claim.phddStep3Date) {
                s3Badge.className = "badge bg-success";
                s3Badge.innerText = "ÄÃ£ thÃ´ng bÃ¡o tá»• chá»©c";
            } else {
                s3Badge.className = "badge bg-secondary";
                s3Badge.innerText = "Chá» cáº­p nháº­t lá»‹ch";
            }

            // Step 4 Badge
            const s4Badge = document.getElementById('phddStep4Badge');
            if (claim.phddStep4DateAct) {
                s4Badge.className = "badge bg-success";
                s4Badge.innerText = "HoÃ n thÃ nh thá»±c thi";
            } else {
                s4Badge.className = "badge bg-secondary";
                s4Badge.innerText = "Chá» cáº­p nháº­t káº¿t quáº£";
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

            const showDirect = !isDeceased && (step3Type === 'Trá»±c tiáº¿p xin lá»—i' || step3Type === 'Cáº£ hai hÃ¬nh thá»©c');
            const showNews = isDeceased || (step3Type === 'ÄÄƒng bÃ¡o xin lá»—i' || step3Type === 'Cáº£ hai hÃ¬nh thá»©c');

            if (step4DirectSec) step4DirectSec.style.display = showDirect ? 'block' : 'none';
            if (step4NewsSec) step4NewsSec.style.display = showNews ? 'block' : 'none';

            const directDateLabel = document.getElementById('lblPhddStep4DateAct');
            if (directDateLabel) {
                directDateLabel.innerText = showDirect ? "NgÃ y tá»• chá»©c xin lá»—i trá»±c tiáº¿p thá»±c táº¿ *" : "NgÃ y thá»±c hiá»‡n Ä‘Äƒng bÃ¡o thá»±c táº¿ *";
            }
            const directFileLabel = document.getElementById('lblPhddStep4NewsFile');
            if (directFileLabel) {
                if (isDeceased) {
                    directFileLabel.innerText = "BiÃªn nháº­n gá»­i bÃ¡o giáº¥y cho thÃ¢n nhÃ¢n & BiÃªn báº£n niÃªm yáº¿t cÃ´ng khai *";
                } else {
                    directFileLabel.innerText = "Tá»‡p scan BiÃªn báº£n há»p xin lá»—i / BiÃªn nháº­n gá»­i bÃ¡o & BiÃªn báº£n niÃªm yáº¿t *";
                }
            }
        }

        function renderHonorRestorationTab(claim) {
            const demandBox = document.getElementById('phddRequesterDemandBox');

            // Citizen demand pre-fill
            if (claim.restoreHonor) {
                if (demandBox) {
                    demandBox.style.display = 'block';
                    document.getElementById('phddDemandStatus').innerHTML = '<span class="badge bg-success">CÃ“ Äá»€ NGHá»Š PHDD</span>';

                    const forms = [];
                    if (claim.phddFormApology !== false) forms.push("Trá»±c tiáº¿p xin lá»—i (Äiá»u 58)");
                    if (claim.phddFormNews) forms.push("ÄÄƒng bÃ¡o xin lá»—i (Äiá»u 59)");
                    document.getElementById('phddDemandFormsText').innerText = forms.join(" vÃ  ") || "ChÆ°a lá»±a chá»n hÃ¬nh thá»©c";
                }
            } else {
                if (demandBox) {
                    demandBox.style.display = 'block';
                    document.getElementById('phddDemandStatus').innerHTML = '<span class="badge bg-secondary">KHÃ”NG Äá»€ NGHá»Š PHDD</span>';
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
                bypassNotice.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>NgÆ°á»i bá»‹ thiá»‡t háº¡i Ä‘Ã£ cháº¿t. Theo quy Ä‘á»‹nh táº¡i Äiá»u 57.6 Luáº­t TNBTCNN, bá» qua bÆ°á»›c láº¥y Ã½ kiáº¿n pháº£n há»“i vÃ  thá»±c hiá»‡n hÃ¬nh thá»©c ÄÄƒng bÃ¡o xin lá»—i cáº£i chÃ­nh cÃ´ng khai.</span>';
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

                const step2Opinion = claim.phddStep2Opinion || "Äá»“ng Ã½";
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

            let suggestedType = "Trá»±c tiáº¿p xin lá»—i";
            if (claim.phddFormApology !== false && claim.phddFormNews) {
                suggestedType = "Cáº£ hai hÃ¬nh thá»©c";
            } else if (claim.phddFormNews) {
                suggestedType = "ÄÄƒng bÃ¡o xin lá»—i";
            }
            let step3Type = claim.phddStep3Type || suggestedType;

            const editButtons = document.getElementById('editPhddButtons');
            const canEdit = isDetailEditMode && (claim.status === 'Chá» thá»±c thi' || claim.status === 'Äang thÆ°Æ¡ng lÆ°á»£ng' || claim.status === 'Äang xÃ¡c minh thiá»‡t háº¡i' || claim.status === 'Chá» thá»¥ lÃ½');

            if (isDeceased) {
                step3Type = "ÄÄƒng bÃ¡o xin lá»—i";
                document.getElementById('editPhddStep3Type').value = "ÄÄƒng bÃ¡o xin lá»—i";
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
                showToast("Vui lÃ²ng nháº­p ná»™i dung Ä‘Ã£ bá»• sung!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.status = 'Chá» tiáº¿p nháº­n';
                if (!claim.bosungLogs) claim.bosungLogs = [];
                claim.bosungLogs.push({
                    date: new Date().toLocaleDateString('vi-VN'),
                    sender: "NgÆ°á»i dÃ¢n bá»• sung",
                    content: "Bá»• sung há»“ sÆ¡ thÃ nh cÃ´ng: " + content
                });

                claim.timeline.push({
                    title: "Bá»• sung há»“ sÆ¡",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "NgÆ°á»i dÃ¢n Ä‘Ã£ bá»• sung há»“ sÆ¡. Tráº¡ng thÃ¡i quay láº¡i [Chá» tiáº¿p nháº­n]",
                    status: "completed"
                });

                showToast("ÄÃ£ cáº­p nháº­t káº¿t quáº£ bá»• sung. Há»“ sÆ¡ chuyá»ƒn sang [Chá» tiáº¿p nháº­n]!", "success");
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

                claim.status = 'Äang thÆ°Æ¡ng lÆ°á»£ng';
                claim.xmTotalAmount = calculatedTotal;
                claim.xmOtherInfo = document.getElementById('editXacMinhOtherInfo').value.trim();
                claim.otherRestore = document.getElementById('editXacMinhOtherRestore').value.trim();
                claim.xmMethod = document.getElementById('editXacMinhMethod').value;
                claim.xmFiles = [...xmSelectedFiles];

                claim.timeline.push({
                    title: "XÃ¡c minh thiá»‡t háº¡i",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: `HoÃ n thÃ nh bÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i thá»±c táº¿. Tá»•ng sá»‘ tiá»n xÃ¡c minh: ${calculatedTotal.toLocaleString('vi-VN')} Ä‘.`,
                    status: "completed"
                });

                claim.tlTimeExp = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString('vi-VN');
                claim.tlVenueExp = "PhÃ²ng há»p cÆ¡ quan giáº£i quyáº¿t bá»“i thÆ°á»ng";
                claim.tlMembersExp = "Äáº¡i diá»‡n cÆ¡ quan, Ã´ng/bÃ  " + claim.nyc;

                showToast("HoÃ n thÃ nh xÃ¡c minh thiá»‡t háº¡i. Há»“ sÆ¡ chuyá»ƒn sang [Äang thÆ°Æ¡ng lÆ°á»£ng]!", "success");
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitTlDraftUpdate() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.tlTimeExp = document.getElementById('editTlTimeExp').value;
                claim.tlVenueExp = document.getElementById('editTlVenueExp').value;
                claim.tlMembersExp = document.getElementById('editTlMembersExp').value;

                showToast("ÄÃ£ lÆ°u nhÃ¡p thÃ´ng tin dá»± kiáº¿n phiÃªn thÆ°Æ¡ng lÆ°á»£ng!", "success");
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

                if (!time || !venue || !members) {
                    showToast("Vui lÃ²ng Ä‘iá»n Ä‘á»§ cÃ¡c thÃ´ng tin thá»±c táº¿ há»p thÆ°Æ¡ng lÆ°á»£ng cÃ³ dáº¥u *!", "error");
                    return;
                }

                claim.tlTimeAct = time;
                claim.tlVenueAct = venue;
                claim.tlMembersAct = members;
                claim.tlResult = result;

                if (result === 'ThÆ°Æ¡ng lÆ°á»£ng thÃ nh cÃ´ng') {
                    claim.status = 'Chá» ban hÃ nh QÄ';
                    claim.timeline.push({
                        title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng",
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng thÃ nh cÃ´ng. Chuyá»ƒn há»“ sÆ¡ sang [Chá» ban hÃ nh QÄ]",
                        status: "completed"
                    });
                    showToast("ThÆ°Æ¡ng lÆ°á»£ng thÃ nh cÃ´ng! Há»“ sÆ¡ chuyá»ƒn sang [Chá» ban hÃ nh QÄ]!", "success");
                } else {
                    claim.status = 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng';
                    claim.timeline.push({
                        title: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng",
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: "ThÆ°Æ¡ng lÆ°á»£ng bá»“i thÆ°á»ng khÃ´ng thÃ nh cÃ´ng. Káº¿t thÃºc luá»“ng giáº£i quyáº¿t hÃ nh chÃ­nh.",
                        status: "completed"
                    });
                    showToast("ThÆ°Æ¡ng lÆ°á»£ng tháº¥t báº¡i. Há»“ sÆ¡ chuyá»ƒn sang [ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng]!", "success");
                }

                showCaseDetail(selectedClaimId, false);
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
            const no = document.getElementById('decNoInput').value.trim();
            const date = document.getElementById('decDateInput').value.trim();
            const amount = parseFloat(document.getElementById('decAmountInput').value) || 0;
            const content = document.getElementById('decContentInput').value.trim();

            if (!no || !date || amount <= 0) {
                showToast("Vui lÃ²ng nháº­p Ä‘áº§y Ä‘á»§ Sá»‘ QÄ, NgÃ y QÄ vÃ  Sá»‘ tiá»n!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.decNo = no;
                claim.decDate = date;
                claim.decAmount = amount;
                claim.decContent = content;

                if (decStatus === 'Chá» kÃ½') {
                    claim.status = 'Chá» thá»±c thi';
                    claim.timeline.push({
                        title: "Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t bá»“i thÆ°á»ng",
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: `KÃ½ duyá»‡t vÃ  ban hÃ nh QÄ giáº£i quyáº¿t bá»“i thÆ°á»ng sá»‘ ${no}. Sá»‘ tiá»n: ${amount.toLocaleString('vi-VN')}Ä‘`,
                        status: "completed"
                    });
                    showToast("Quyáº¿t Ä‘á»‹nh Ä‘Ã£ Ä‘Æ°á»£c duyá»‡t kÃ½ sá»‘ thÃ nh cÃ´ng. Há»“ sÆ¡ chuyá»ƒn sang [Chá» thá»±c thi]!", "success");
                } else {
                    showToast("ÄÃ£ lÆ°u nhÃ¡p dá»± tháº£o Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t bá»“i thÆ°á»ng!", "success");
                }

                closeCreateDecisionForm();
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitThucThiUpdate() {
            const time = document.getElementById('thucthiDateInput').value.trim();
            const note = document.getElementById('thucthiNoteInput').value.trim();

            if (!time) {
                showToast("Vui lÃ²ng Ä‘iá»n ngÃ y chi tráº£ thá»±c táº¿!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                if (claim.restoreHonor) {
                    const isDeceased = (claim.victimAlive === 'no');
                    const s3Type = claim.phddStep3Type;
                    
                    const hasS1 = claim.phddStep1No && claim.phddStep1Date && claim.phddStep1Signer && claim.phddStep1File;
                    const hasS2 = isDeceased ? true : (claim.phddStep2Opinion && claim.phddStep2OpinionText && claim.phddStep2File);
                    const hasS3 = claim.phddStep3No && claim.phddStep3Date && claim.phddStep3DateExp && s3Type && claim.phddStep3File;
                    
                    let s3Specific = false;
                    if (hasS3) {
                        if (s3Type === 'Trá»±c tiáº¿p xin lá»—i') {
                            s3Specific = !!(claim.phddStep3DirectVenue && claim.phddStep3DirectMembers);
                        } else if (s3Type === 'ÄÄƒng bÃ¡o xin lá»—i') {
                            s3Specific = !!(claim.phddStep3NewsCentral || claim.phddStep3NewsLocal);
                        } else { // Cáº£ hai
                            s3Specific = !!(claim.phddStep3DirectVenue && claim.phddStep3DirectMembers && (claim.phddStep3NewsCentral || claim.phddStep3NewsLocal));
                        }
                    }

                    const hasS4 = claim.phddStep4DateAct && claim.phddStep4File;
                    let s4Specific = false;
                    if (hasS4 && s3Type) {
                        if (s3Type === 'Trá»±c tiáº¿p xin lá»—i') {
                            s4Specific = !!(claim.phddStep4VenueAct && claim.phddStep4MembersAct);
                        } else if (s3Type === 'ÄÄƒng bÃ¡o xin lá»—i') {
                            s4Specific = !!((claim.phddStep4NewsCentralAct || claim.phddStep4NewsLocalAct) && claim.phddStep4NewsNumbers && claim.phddStep4CommuneDate && claim.phddStep4CommuneReceiver);
                        } else { // Cáº£ hai
                            s4Specific = !!(claim.phddStep4VenueAct && claim.phddStep4MembersAct && (claim.phddStep4NewsCentralAct || claim.phddStep4NewsLocalAct) && claim.phddStep4NewsNumbers && claim.phddStep4CommuneDate && claim.phddStep4CommuneReceiver);
                        }
                    }

                    if (!hasS1 || !hasS2 || !hasS3 || !s3Specific || !hasS4 || !s4Specific) {
                        showToast("Há»“ sÆ¡ yÃªu cáº§u Phá»¥c há»“i danh dá»± chÆ°a nháº­p Ä‘á»§ thÃ´ng tin! Vui lÃ²ng hoÃ n táº¥t Ä‘á»§ 4 bÆ°á»›c phá»¥c há»“i danh dá»± trÆ°á»›c khi HoÃ n thÃ nh thá»±c thi.", "error");
                        
                        // Switch tab to Tab 2
                        switchDetailTab('xu-ly');
                        // Switch sub-tab to PHDD
                        switchDetailSubTab('phdd');
                        return;
                    }
                }

                claim.status = 'HoÃ n thÃ nh';
                claim.thucthiDate = time;
                claim.thucthiNote = note || "ÄÃ£ hoÃ n thÃ nh thá»±c thi chi tráº£ bá»“i thÆ°á»ng.";

                claim.timeline.push({
                    title: "Thá»±c thi giáº£i quyáº¿t bá»“i thÆ°á»ng",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "ÄÃ£ hoÃ n thÃ nh chi tráº£ tiá»n bá»“i thÆ°á»ng.",
                    status: "completed"
                });

                showToast("ÄÃ£ hoÃ n thÃ nh thá»±c thi há»“ sÆ¡ bá»“i thÆ°á»ng!", "success");
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
                errMsg.innerText = 'ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c';
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
                errMsg.innerText = 'ÄÃ¢y lÃ  trÆ°á»ng báº¯t buá»™c';
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

            const s2Opinion = document.querySelector('input[name="editPhddStep2Opinion"]:checked') ? document.querySelector('input[name="editPhddStep2Opinion"]:checked').value : 'Äá»“ng Ã½';
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
            const showDirect = !isDeceased && (s3Type === 'Trá»±c tiáº¿p xin lá»—i' || s3Type === 'Cáº£ hai hÃ¬nh thá»©c');
            const showNews = isDeceased || (s3Type === 'ÄÄƒng bÃ¡o xin lá»—i' || s3Type === 'Cáº£ hai hÃ¬nh thá»©c');

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
                if (s3Type === 'Trá»±c tiáº¿p xin lá»—i' || s3Type === 'Cáº£ hai hÃ¬nh thá»©c') {
                    if (!s3DirectVenue) {
                        validatePhddInput('editPhddStep3DirectVenue', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3DirectVenue');
                    }
                    if (!s3DirectMembers) {
                        validatePhddInput('editPhddStep3DirectMembers', true);
                        if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep3DirectMembers');
                    }
                }
                if (s3Type === 'ÄÄƒng bÃ¡o xin lá»—i' || s3Type === 'Cáº£ hai hÃ¬nh thá»©c') {
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

            showToast("LÆ°u thÃ´ng tin phá»¥c há»“i danh dá»± thÃ nh cÃ´ng!", "success");
            showCaseDetail(selectedClaimId, false);
        }

        function exportExcelB() {
            showToast("Káº¿t xuáº¥t dá»¯ liá»‡u thá»‘ng kÃª ra file Excel thÃ nh cÃ´ng!", "success");
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
                showToast("Táº£i tá»‡p Ä‘Ã­nh kÃ¨m lÃªn thÃ nh cÃ´ng!", "success");
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
                        <a href="#" onclick="event.preventDefault(); removeXmFile(${idx})" style="color: #ef4444; font-weight: 500;">XÃ³a</a>
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
                showToast("Táº£i tá»‡p Ä‘Ã­nh kÃ¨m lÃªn thÃ nh cÃ´ng!", "success");
            }
        }

        function removeXmFile(idx) {
            showConfirmModal("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n gá»¡ tá»‡p Ä‘Ã­nh kÃ¨m nÃ y khÃ´ng?", () => {
                xmSelectedFiles.splice(idx, 1);
                renderXmFiles();
            });
        }

        // Custom Confirmation Modal Helper
        let confirmCallback = null;

        function showConfirmModal(message, callback, options = {}) {
            const overlay = document.getElementById('customConfirmOverlay');
            document.getElementById('customConfirmMessage').innerText = message;
            confirmCallback = callback;

            const titleEl = document.getElementById('customConfirmTitle');
            if (titleEl) titleEl.innerText = options.title || "XÃ¡c nháº­n xÃ³a";

            const btnYes = document.getElementById('customConfirmBtnYes');
            if (btnYes) {
                btnYes.innerText = options.btnYesText || "Äá»“ng Ã½";
                if (options.btnYesClass) {
                    btnYes.className = `btn btn-sm ${options.btnYesClass}`;
                } else {
                    btnYes.className = "btn btn-danger btn-sm";
                }
            }

            const btnNo = document.getElementById('customConfirmBtnNo');
            if (btnNo) btnNo.innerText = options.btnNoText || "Há»§y bá»";

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
                if (titleEl) titleEl.innerText = "XÃ¡c nháº­n xÃ³a";
                const btnYes = document.getElementById('customConfirmBtnYes');
                if (btnYes) {
                    btnYes.innerText = "Äá»“ng Ã½";
                    btnYes.className = "btn btn-danger btn-sm";
                }
                const btnNo = document.getElementById('customConfirmBtnNo');
                if (btnNo) btnNo.innerText = "Há»§y bá»";
            }, 200);

            if (result && confirmCallback) {
                confirmCallback();
            }
            confirmCallback = null;
        }

        const mockOfficers = [
            { code: "CB001", name: "Nguyá»…n VÄƒn ChuyÃªn ViÃªn", role: "ChuyÃªn viÃªn thá»¥ lÃ½", dept: "PhÃ²ng bá»“i thÆ°á»ng nhÃ  nÆ°á»›c" },
            { code: "CB002", name: "Tráº§n Thá»‹ ChuyÃªn ViÃªn", role: "ChuyÃªn viÃªn nghiá»‡p vá»¥", dept: "PhÃ²ng bá»“i thÆ°á»ng nhÃ  nÆ°á»›c" },
            { code: "CB003", name: "LÃª VÄƒn ChuyÃªn ViÃªn", role: "ChuyÃªn viÃªn kiá»ƒm tra", dept: "PhÃ²ng bá»“i thÆ°á»ng nhÃ  nÆ°á»›c" },
            { code: "CB004", name: "Pháº¡m HoÃ ng Háº£i", role: "ChuyÃªn viÃªn thá»¥ lÃ½", dept: "PhÃ²ng quáº£n lÃ½ thi hÃ nh Ã¡n" },
            { code: "CB005", name: "Äá»— Minh TrÃ­", role: "ChuyÃªn viÃªn thá»¥ lÃ½", dept: "VÄƒn phÃ²ng CÆ¡ quan giáº£i quyáº¿t" }
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
            return "Thiá»‡t háº¡i yÃªu cáº§u";
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
                let selectedOfficer = 'Nguyá»…n VÄƒn ChuyÃªn ViÃªn';
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

            const isAddition = (rejectType === 'YÃªu cáº§u bá»• sung');
            const iconEl = document.getElementById('rejectionModalIcon');
            const headerEl = document.getElementById('rejectionModalHeader');
            const confirmBtn = document.getElementById('rejectionModalConfirmBtn');
            const textarea = document.getElementById('rejectionReasonTextarea');

            if (isAddition) {
                headerEl.style.color = '#d97706';
                iconEl.className = 'fa-solid fa-circle-question';
                document.getElementById('rejectionModalTitle').innerText = 'YÃªu cáº§u bá»• sung há»“ sÆ¡';
                document.getElementById('rejectionModalLabel').innerText = 'Ná»™i dung yÃªu cáº§u bá»• sung há»“ sÆ¡ *:';
                textarea.placeholder = 'Nháº­p danh sÃ¡ch tÃ i liá»‡u hoáº·c lÃ½ do cáº§n bá»• sung há»“ sÆ¡ chi tiáº¿t táº¡i Ä‘Ã¢y...';
                confirmBtn.innerText = 'Gá»­i yÃªu cáº§u';
                confirmBtn.style.backgroundColor = 'var(--primary-color)';
            } else {
                headerEl.style.color = 'var(--danger-color)';
                iconEl.className = 'fa-solid fa-ban';
                document.getElementById('rejectionModalTitle').innerText = rejectType === 'Tá»« chá»‘i tiáº¿p nháº­n' ? 'YÃªu cáº§u nháº­p lÃ½ do tá»« chá»‘i tiáº¿p nháº­n' : 'YÃªu cáº§u nháº­p lÃ½ do tá»« chá»‘i thá»¥ lÃ½';
                document.getElementById('rejectionModalLabel').innerText = rejectType === 'Tá»« chá»‘i tiáº¿p nháº­n' ? 'Ná»™i dung lÃ½ do tá»« chá»‘i tiáº¿p nháº­n *:' : 'Ná»™i dung lÃ½ do tá»« chá»‘i thá»¥ lÃ½ *:';
                textarea.placeholder = rejectType === 'Tá»« chá»‘i tiáº¿p nháº­n' ? 'Nháº­p lÃ½ do tá»« chá»‘i tiáº¿p nháº­n chi tiáº¿t táº¡i Ä‘Ã¢y...' : 'Nháº­p lÃ½ do tá»« chá»‘i thá»¥ lÃ½ chi tiáº¿t táº¡i Ä‘Ã¢y...';
                confirmBtn.innerText = 'XÃ¡c nháº­n tá»« chá»‘i';
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

            titleSpan.innerHTML = `<i class="fa-solid fa-circle-info"></i> CHI TIáº¾T Äá»€ NGHá»Š KINH PHÃ: ${req.code}`;

            // Style and set the status badge
            let statusClass = 'badge-draft';
            if (req.status === 'Chá» duyá»‡t') statusClass = 'badge-pending';
            else if (req.status === 'HoÃ n thÃ nh' || req.status === 'ÄÃ£ cáº¥p kinh phÃ­') statusClass = 'badge-success';
            else if (req.status === 'Tá»« chá»‘i') statusClass = 'badge-danger';
            else if (req.status === 'Chá» chi tráº£') statusClass = 'badge-info';

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
    
