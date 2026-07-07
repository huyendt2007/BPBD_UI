// Synchronize Role Selectors and update table
        function syncRole(el) {
            const val = el.value;
            const selMain = document.getElementById('roleSelectorMain');
            const selGiaLap = document.getElementById('roleSelectorGiaLap');
            if (selMain) selMain.value = val;
            if (selGiaLap) selGiaLap.value = val;
            renderClaimsTable();
        }

        // Get full uppercase name for fieldGroup
        function getFieldGroupName(val) {
            switch(val) {
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

        // Claim Mock Data
        let claimsList = [
            {
                id: "HS1",
                code: "BT-2026-001",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "12/06/2026",
                nyc: "Nguyá»…n VÄƒn A",
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
                phddStep2File: "Y_kien_dong_y_nguoi_bi_hai.pdf"
            },
            {
                id: "HS2",
                code: "BT-2026-002",
                fieldGroup: "hÃ¬nh sá»±",
                date: "14/06/2026",
                nyc: "Tráº§n Thá»‹ B",
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
                timeline: [
                    { title: "Ná»™p há»“ sÆ¡ bá»“i thÆ°á»ng", date: "14/06/2026", desc: "Há»“ sÆ¡ tiáº¿p nháº­n thÃ´ng qua DVC trá»±c tuyáº¿n", status: "completed" },
                    { title: "Kiá»ƒm tra há»“ sÆ¡ bá»• sung", date: "16/06/2026", desc: "Há»“ sÆ¡ há»£p lá»‡.", status: "completed" },
                    { title: "Thá»¥ lÃ½ há»“ sÆ¡ yÃªu cáº§u bá»“i thÆ°á»ng", date: "18/06/2026", desc: "Quyáº¿t Ä‘á»‹nh thá»¥ lÃ½ sá»‘ 105/QÄ-TLHS.", status: "completed" },
                    { title: "XÃ¡c minh thiá»‡t háº¡i", date: "Äang tiáº¿n hÃ nh", desc: "ChuyÃªn viÃªn Ä‘ang thu tháº­p tÃ i liá»‡u Ä‘á»‹nh giÃ¡ thiá»‡t háº¡i.", status: "active" }
                ]
            },
            {
                id: "HS3",
                code: "BT-2026-003",
                fieldGroup: "hÃ nh chÃ­nh",
                date: "05/01/2023",
                nyc: "CÃ´ng ty Háº£i PhÃ¡t",
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
                restoreHonor: false,
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
                thucthiNote: "ÄÃ£ chuyá»ƒn khoáº£n Ä‘á»§ sá»‘ tiá»n 4.800.000.000Ä‘ sang tÃ i khoáº£n CÃ´ng ty Háº£i PhÃ¡t."
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
                phddDirectContent: "Buá»•i xin lá»—i trá»±c tiáº¿p cÃ´ng khai diá»…n giáº£i lá»i xin lá»—i chÃ¢n thÃ nh tá»« phÃ­a cÆ¡ quan quáº£n lÃ½ hÃ nh chÃ­nh."
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
                advanceNum: 0,
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
                status: "Bá»‹ tá»« chá»‘i",
                thulyVenue: "cÆ¡ quan quáº£n lÃ½",
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
                restoreHonor: false,
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
                thucthiNote: "ÄÃ£ chi tráº£ Ä‘á»§ qua chuyá»ƒn khoáº£n, kháº¥u trá»« 100 triá»‡u Ä‘á»“ng Ä‘Ã£ táº¡m á»©ng trÆ°á»›c Ä‘Ã³."
            }
        ];

        // State variables
        let currentClaimsPage = 1;
        let claimsPageSize = 5;
        let selectedClaimId = null;
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

            // Dynamically assign mock dates in current month so they bypass the default date filters on load
            claimsList.forEach((claim, idx) => {
                const d = String((idx % 5) + 1).padStart(2, '0');
                const m = String(today.getMonth() + 1).padStart(2, '0');
                const y = today.getFullYear();
                claim.date = `${d}/${m}/${y}`;
                if (claim.timeline && claim.timeline.length > 0) {
                    claim.timeline.forEach((item) => {
                        item.date = `${d}/${m}/${y}`;
                    });
                }
            });

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
                tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; color:var(--text-muted); padding:30px;">KhÃ´ng tÃ¬m tháº¥y há»“ sÆ¡ nÃ o phÃ¹ há»£p</td></tr>`;
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
                else if (item.status === 'Bá»‹ tá»« chá»‘i') badgeClass = 'badge-danger';
                else if (item.status === 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng') badgeClass = 'badge-danger';
                else if (item.status === 'Chá» ban hÃ nh QÄ') badgeClass = 'badge-warning';
                else if (item.status === 'Chá» thá»±c thi') badgeClass = 'badge-warning';

                // Fixed slots
                const isDraft = item.status === 'LÆ°u nhÃ¡p';
                const isPending = item.status === 'Chá» tiáº¿p nháº­n';
                const hasUpdateRights = ['LÆ°u nhÃ¡p', 'YÃªu cáº§u bá»• sung', 'Äang xÃ¡c minh thiá»‡t háº¡i', 'Äang thÆ°Æ¡ng lÆ°á»£ng', 'Chá» ban hÃ nh QÄ', 'Chá» thá»±c thi'].includes(item.status);

                const viewBtn = `<button class="icon-btn view" title="Xem chi tiáº¿t" onclick="event.stopPropagation(); showCaseDetail('${item.id}', false)"><i class="fa-solid fa-eye"></i></button>`;

                let updateBtn = `<button class="icon-btn edit" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="KhÃ´ng Ä‘Æ°á»£c cáº­p nháº­t á»Ÿ tráº¡ng thÃ¡i nÃ y"><i class="fa-solid fa-pen-to-square"></i></button>`;
                if (hasUpdateRights) {
                    updateBtn = `<button class="icon-btn edit" title="Cáº­p nháº­t há»“ sÆ¡" onclick="event.stopPropagation(); showCaseDetail('${item.id}', true)"><i class="fa-solid fa-pen-to-square"></i></button>`;
                }

                let deleteBtn = `<button class="icon-btn delete" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ Ä‘Æ°á»£c xÃ³a há»“ sÆ¡ LÆ°u nhÃ¡p"><i class="fa-solid fa-trash-can"></i></button>`;
                if (isDraft) {
                    deleteBtn = `<button class="icon-btn delete" title="XÃ³a yÃªu cáº§u" onclick="event.stopPropagation(); deleteClaim('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>`;
                }

                let acceptBtn = `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ tiáº¿p nháº­n khi á»Ÿ tráº¡ng thÃ¡i Chá» tiáº¿p nháº­n"><i class="fa-solid fa-square-check"></i></button>`;
                if (isPending) {
                    acceptBtn = `<button class="icon-btn accept" title="Tiáº¿p nháº­n há»“ sÆ¡" onclick="event.stopPropagation(); changeStatus('${item.id}', 'Chá» thá»¥ lÃ½', 'ÄÃ£ tiáº¿p nháº­n há»“ sÆ¡ sang tráº¡ng thÃ¡i [Chá» thá»¥ lÃ½]!')"><i class="fa-solid fa-square-check"></i></button>`;
                }

                let suppBtn = `<button class="icon-btn supplement" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ yÃªu cáº§u bá»• sung khi á»Ÿ tráº¡ng thÃ¡i Chá» tiáº¿p nháº­n"><i class="fa-solid fa-circle-question"></i></button>`;
                if (isPending) {
                    suppBtn = `<button class="icon-btn supplement" title="YÃªu cáº§u bá»• sung" onclick="event.stopPropagation(); changeStatus('${item.id}', 'YÃªu cáº§u bá»• sung', 'ÄÃ£ chuyá»ƒn há»“ sÆ¡ sang tráº¡ng thÃ¡i [YÃªu cáº§u bá»• sung]!')"><i class="fa-solid fa-circle-question"></i></button>`;
                }

                let denyBtn = `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chá»‰ tá»« chá»‘i thá»¥ lÃ½ khi á»Ÿ tráº¡ng thÃ¡i Chá» tiáº¿p nháº­n"><i class="fa-solid fa-ban"></i></button>`;
                if (isPending) {
                    denyBtn = `<button class="icon-btn reject" title="Tá»« chá»‘i thá»¥ lÃ½" onclick="event.stopPropagation(); changeStatus('${item.id}', 'Bá»‹ tá»« chá»‘i', 'ÄÃ£ tá»« chá»‘i thá»¥ lÃ½ há»“ sÆ¡!')"><i class="fa-solid fa-ban"></i></button>`;
                }

                let actionsHtml = '';
                if (currentRole === 'thu-truong') {
                    actionsHtml = `
                        ${viewBtn}
                        ${acceptBtn}
                        ${denyBtn}
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
            showToast("ÄÃ£ xÃ³a bá»™ lá»c tÃ¬m kiáº¿m!", "info");
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

        // Action triggers from table
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
                renderClaimsTable();
            }
        }

        function deleteClaim(id) {
            const index = claimsList.findIndex(c => c.id === id);
            if (index !== -1) {
                showConfirmModal("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xÃ³a há»“ sÆ¡ lÆ°u nhÃ¡p nÃ y khÃ´ng?", () => {
                    claimsList.splice(index, 1);
                    showToast("ÄÃ£ xÃ³a vÄ©nh viá»…n há»“ sÆ¡ lÆ°u nhÃ¡p!", "success");
                    renderClaimsTable();
                });
            }
        }

        // UC438 INLINE FORM LOGIC
        function openInlineClaimForm() {
            document.getElementById('subTabContentResolver').style.display = 'none';
            document.getElementById('caseDetailSection').style.display = 'none';

            const formPanel = document.getElementById('inlineClaimFormPanel');
            formPanel.style.display = 'flex';

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
            document.getElementById('claimAdvanceRecName').value = '';
            document.getElementById('claimAdvanceRecCard').value = '';
            document.getElementById('claimAdvanceRecAddress').value = '';
            document.getElementById('claimAdvanceRecBank').value = '';
            document.getElementById('claimAdvanceRecKenh').value = 'tien-mat';
            document.getElementById('claimAdvanceRecBankWrapper').style.display = 'none';

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
            toggleAdvanceByLinhVuc(document.getElementById('claimFieldGroup').value);
        }

        function closeInlineClaimForm() {
            document.getElementById('inlineClaimFormPanel').style.display = 'none';
            document.getElementById('subTabContentResolver').style.display = 'block';
            renderClaimsTable();
        }

        // Toggle advance panel visibility by fieldGroup
        function toggleAdvanceByLinhVuc(linhVuc) {
            const section = document.getElementById('advancePaymentSection');
            if (linhVuc === 'hÃ nh chÃ­nh') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
                document.getElementById('claimNeedAdvance').checked = false;
                document.getElementById('claimAdvancePanel').style.display = 'none';
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

            document.getElementById('claimAdvanceRecName').value = name;
            document.getElementById('claimAdvanceRecCard').value = card;
            document.getElementById('claimAdvanceRecAddress').value = address;

            sumClaimAdvance();
        }

        function toggleClaimAdvancePanel(checked) {
            const panel = document.getElementById('claimAdvancePanel');
            panel.style.display = checked ? 'block' : 'none';
            if (checked) {
                syncAdvanceTinhThanState();
            }
        }

        function toggleClaimAdvanceRecKenh(val) {
            const wrapper = document.getElementById('claimAdvanceRecBankWrapper');
            wrapper.style.display = val === 'chuyen-khoan' ? 'block' : 'none';
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

            showToast("Äang xem tÃ i liá»‡u: " + doc.file, "info");
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
                const thietHaiNames = [
                    "TÃ i sáº£n bá»‹ xÃ¢m pháº¡m",
                    "Thu nháº­p thá»±c táº¿ bá»‹ máº¥t/giáº£m sÃºt",
                    "Váº­t cháº¥t do ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t",
                    "Váº­t cháº¥t do sá»©c khá»e bá»‹ xÃ¢m pháº¡m",
                    "Thiá»‡t háº¡i vá» tinh tháº§n",
                    "CÃ¡c chi phÃ­ há»£p lÃ½ khÃ¡c"
                ];
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
                showToast("Äang táº£i xuá»‘ng tÃ i liá»‡u: " + doc.file, "success");
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
                    showToast("ÄÃ£ gá»¡ bá» tá»‡p tin Ä‘Ã­nh kÃ¨m: " + oldFile, "info");
                });
            }
        }

        function deleteDocRow(idx) {
            if (currentDocsList[idx]) {
                const name = currentDocsList[idx].name || ("TÃ i liá»‡u " + (idx + 1));
                showConfirmModal("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n xÃ³a thÃ nh pháº§n há»“ sÆ¡: " + name + " khÃ´ng?", () => {
                    currentDocsList.splice(idx, 1);
                    renderDocsTable();
                    showToast("ÄÃ£ xÃ³a thÃ nh pháº§n há»“ sÆ¡: " + name, "info");
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
            showToast("ÄÃ£ thÃªm hÃ ng tÃ i liá»‡u Ä‘Ã­nh kÃ¨m má»›i!", "success");
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

            // Táº¡m á»©ng validations
            let adv = 0;
            if (document.getElementById('claimNeedAdvance').checked) {
                const tinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
                const khac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
                adv = tinhThan + khac;
                if (!isDraft && adv > total) {
                    showToast("Tá»•ng tiá»n Ä‘á» nghá»‹ táº¡m á»©ng khÃ´ng Ä‘Æ°á»£c lá»›n hÆ¡n tá»•ng tiá»n yÃªu cáº§u bá»“i thÆ°á»ng!", "error");
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
                advanceRecKenh: document.getElementById('claimAdvanceRecKenh').value,
                restoreHonor: document.getElementById('claimNeedRestoreHonor').checked,
                phddFormApology: document.getElementById('claimPhddFormApology').checked,
                phddFormNews: document.getElementById('claimPhddFormNews').checked,
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
            closeInlineClaimForm();
            renderClaimsTable();
        }

        // ==============================================
        // CASE DETAIL & EDIT TABS VIEW LOGIC
        // ==============================================
        function showCaseDetail(id, editMode = false) {
            selectedClaimId = id;
            isDetailEditMode = editMode;

            const claim = claimsList.find(c => c.id === id);
            if (!claim) return;

            document.getElementById('subTabContentResolver').style.display = 'none';
            document.getElementById('inlineClaimFormPanel').style.display = 'none';

            const detailSec = document.getElementById('caseDetailSection');
            detailSec.style.display = 'block';

            document.getElementById('caseDetailTitle').innerHTML = editMode
                ? `<i class="fa-solid fa-pen-to-square"></i> Cáº¬P NHáº¬T TIáº¾N TRÃŒNH Há»’ SÆ : ${claim.code} - ${claim.nyc}`
                : `<i class="fa-solid fa-circle-info"></i> CHI TIáº¾T Há»’ SÆ  VÃ€ TIáº¾N TRÃŒNH GIáº¢I QUYáº¾T: ${claim.code} - ${claim.nyc}`;

            const editBtn = document.getElementById('detailEditBtn');
            const hasUpdateRights = ['LÆ°u nhÃ¡p', 'YÃªu cáº§u bá»• sung', 'Äang xÃ¡c minh thiá»‡t háº¡i', 'Äang thÆ°Æ¡ng lÆ°á»£ng', 'Chá» ban hÃ nh QÄ', 'Chá» thá»±c thi'].includes(claim.status);

            if (hasUpdateRights && !editMode) {
                editBtn.style.display = 'inline-flex';
            } else {
                editBtn.style.display = 'none';
            }

            renderReadOnlyClaimInfo(claim);
            renderAccordions(claim);
            switchDetailTab('chung');
        }

        function closeCaseDetail() {
            document.getElementById('caseDetailSection').style.display = 'none';
            document.getElementById('subTabContentResolver').style.display = 'block';
            renderClaimsTable();
        }

        function switchToEditMode() {
            showCaseDetail(selectedClaimId, true);
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

            let thHtml = '';
            let index = 1;
            let total = 0;
            const items = [
                "1. TÃ i sáº£n bá»‹ xÃ¢m pháº¡m",
                "2. Thu nháº­p thá»±c táº¿ bá»‹ máº¥t/giáº£m sÃºt",
                "3. Váº­t cháº¥t do ngÆ°á»i bá»‹ thiá»‡t háº¡i cháº¿t",
                "4. Váº­t cháº¥t do sá»©c khá»e bá»‹ xÃ¢m pháº¡m",
                "5. Thiá»‡t háº¡i vá» tinh tháº§n",
                "6. CÃ¡c chi phÃ­ há»£p lÃ½ khÃ¡c"
            ];

            items.forEach((itemText, idx) => {
                let val = 0;
                let calc = "KhÃ´ng yÃªu cáº§u";
                if (idx === 0 && claim.totalNum > 0) {
                    val = claim.totalNum;
                    calc = "TÃ­nh theo báº£ng tá»± khai";
                }
                if (val > 0) {
                    thHtml += `<tr>
                            <td>${index++}</td>
                            <td><strong>${itemText}</strong></td>
                            <td>${calc}</td>
                            <td style="text-align:right; font-weight:600;">${val.toLocaleString('vi-VN')} Ä‘</td>
                        </tr>`;
                    total += val;
                }
            });

            let filesHtml = '';
            claim.files.forEach(f => {
                filesHtml += `<div style="padding: 6px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; display:inline-flex; align-items:center; gap:8px; margin-right:8px; margin-top:4px;">
                    <i class="fa-solid fa-file-pdf" style="color:var(--danger-color);"></i>
                    <span>${f.name}</span>
                    <a href="${f.url}" target="_blank" class="action-link view-link">Xem file</a>
                </div>`;
            });

            container.innerHTML = `
                <div class="grid-3-cols" style="margin-bottom: 16px;">
                    <div><strong>MÃ£ yÃªu cáº§u:</strong> ${claim.code}</div>
                    <div><strong>LÄ©nh vá»±c phÃ¡t sinh:</strong> ${claim.fieldGroup}</div>
                    <div><strong>ÄÆ¡n vá»‹ thá»¥ lÃ½:</strong> ${claim.agency}</div>
                </div>
                <div class="grid-3-cols" style="margin-bottom: 16px;">
                    <div><strong>Há» vÃ  tÃªn ngÆ°á»i yÃªu cáº§u:</strong> <span style="text-transform:uppercase; font-weight:600;">${claim.nyc}</span></div>
                    <div><strong>TÆ° cÃ¡ch tham gia:</strong> ${claim.role}</div>
                    <div><strong>Sá»‘ Ä‘iá»‡n thoáº¡i:</strong> ${claim.phone}</div>
                </div>
                <div style="margin-bottom: 16px;">
                    <strong>Äá»‹a chá»‰ liÃªn há»‡:</strong> ${claim.address}
                </div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
                    <p style="margin-bottom: 6px;"><strong>HÃ nh vi gÃ¢y thiá»‡t háº¡i:</strong> ${claim.hanhVi}</p>
                    <p><strong>Má»‘i quan há»‡ nhÃ¢n quáº£:</strong> ${claim.nhanQua}</p>
                </div>
                
                <div style="font-weight: 700; margin-bottom: 8px; color: var(--primary-light);">CÃC Má»¤C THIá»†T Háº I Äá»€ NGHá»Š Bá»’I THÆ¯á»œNG:</div>
                <table class="custom-table" style="margin-bottom: 16px; border: 1px solid var(--border-color);">
                    <thead>
                        <tr style="background-color:var(--table-header-bg);">
                            <th style="width: 50px;">STT</th>
                            <th>Má»¥c thiá»‡t háº¡i</th>
                            <th>CÃ¡ch tÃ­nh chi tiáº¿t</th>
                            <th style="width: 180px; text-align:right;">Sá»‘ tiá»n Ä‘á» nghá»‹</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${thHtml}
                        <tr style="font-weight:700; background:#f8fafc;">
                            <td colspan="3" style="text-align:right;">Tá»”NG Cá»˜NG:</td>
                            <td style="text-align:right; color:var(--danger-color); font-size:14px;">${total.toLocaleString('vi-VN')} Ä‘á»“ng</td>
                        </tr>
                    </tbody>
                </table>

                <div class="grid-2-cols" style="margin-bottom:16px;">
                    <div><strong>YÃªu cáº§u táº¡m á»©ng kinh phÃ­:</strong> ${claim.advanceNum > 0 ? `<span style="font-weight:600; color:var(--accent-hover);">${claim.advanceNum.toLocaleString('vi-VN')} Ä‘ (${claim.advanceRecKenh})</span>` : 'KhÃ´ng Ä‘á» nghá»‹'}</div>
                    <div><strong>YÃªu cáº§u Phá»¥c há»“i danh dá»±:</strong> ${claim.restoreHonor ? 'CÃ³ tÃ­ch chá»n yÃªu cáº§u phá»¥c há»“i danh dá»±' : 'KhÃ´ng'}</div>
                </div>
                
                <div style="margin-bottom: 12px;"><strong>TÃ i liá»‡u há»“ sÆ¡ Ä‘Ã­nh kÃ¨m:</strong></div>
                <div>${filesHtml}</div>`;
        }

        function toggleAccordion(accId) {
            const head = document.getElementById(`accHead_${accId}`);
            const body = document.getElementById(`accBody_${accId}`);
            const icon = document.getElementById(`accIcon_${accId}`);

            const isShown = body.classList.toggle('show');
            head.classList.toggle('active', isShown);
            icon.classList.toggle('rotated', isShown);
        }

        function forceOpenAccordion(accId) {
            const head = document.getElementById(`accHead_${accId}`);
            const body = document.getElementById(`accBody_${accId}`);
            const icon = document.getElementById(`accIcon_${accId}`);

            body.classList.add('show');
            head.classList.add('active');
            icon.classList.add('rotated');
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
            const phddTabBtn = document.getElementById('detailSubTab2Btn');
            if (claim.restoreHonor && (claim.status === 'Chá» thá»±c thi' || claim.status === 'HoÃ n thÃ nh')) {
                phddTabBtn.style.display = 'block';
            } else {
                phddTabBtn.style.display = 'none';
            }

            // 1. Thá»¥ lÃ½
            document.getElementById('detThulyKenh').value = claim.fieldGroup === 'hÃ nh chÃ­nh' ? 'Má»™t cá»­a trá»±c tiáº¿p' : 'Äá»“ng bá»™ há»‡ thá»‘ng';
            document.getElementById('detThulyDate').value = claim.date;
            document.getElementById('detThulyHan').value = claim.deadline;
            document.getElementById('detThulyAgency').value = claim.agency;
            document.getElementById('detThulyStatus').value = claim.status === 'LÆ°u nhÃ¡p' ? 'Äang lÆ°u nhÃ¡p' : 'ÄÃ£ thá»¥ lÃ½ chÃ­nh thá»©c';

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
                xmTable.innerHTML = `<tr>
                        <td>1</td>
                        <td>TÃ i sáº£n bá»‹ xÃ¢m pháº¡m</td>
                        <td style="text-align:right;">${claim.totalNum.toLocaleString('vi-VN')} Ä‘</td>
                        <td><input type="number" class="form-control" style="text-align:right; font-weight:600;" id="editXmVal1" value="${claim.totalNum}"></td>
                        <td><input type="text" class="form-control" id="editXmNote1" value="XÃ¡c minh Ä‘Ãºng giÃ¡ trá»‹ thá»±c táº¿"></td>
                    </tr>`;
                document.getElementById('editXacMinhOtherRestore').value = claim.otherRestore || '';
            } else {
                if (claim.xmTotalAmount !== undefined || ['Äang thÆ°Æ¡ng lÆ°á»£ng', 'ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng', 'Chá» ban hÃ nh QÄ', 'Chá» thá»±c thi', 'HoÃ n thÃ nh'].includes(claim.status)) {
                    xmRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Tá»•ng tiá»n bá»“i thÆ°á»ng xÃ¡c minh:</strong> <span style="font-weight:600; color:var(--danger-color);">${(claim.xmTotalAmount || claim.totalNum).toLocaleString('vi-VN')} Ä‘</span></p>
                            <p><strong>KhÃ´i phá»¥c quyá»n lá»£i khÃ¡c:</strong> ${claim.otherRestore || 'KhÃ´ng cÃ³'}</p>
                            <p><strong>PhÆ°Æ¡ng thá»©c chi tráº£ xÃ¡c Ä‘á»‹nh:</strong> ${claim.advanceRecKenh === 'tien-mat' ? 'Nháº­n tiá»n máº·t' : 'Chuyá»ƒn khoáº£n'}</p>
                            <p><strong>BÃ¡o cÃ¡o xÃ¡c minh:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-file-pdf"></i> Bao_cao_xac_minh_so_12.pdf</a></p>
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
            if (claim.advanceNum > 0) {
                kpRead.innerHTML = `
                    <div style="font-size:13px; line-height:1.6;">
                        <p><strong>Sá»‘ tiá»n Ä‘á» nghá»‹ táº¡m á»©ng tinh tháº§n:</strong> ${claim.advanceNum.toLocaleString('vi-VN')} Ä‘</p>
                        <p><strong>Tráº¡ng thÃ¡i táº¡m á»©ng:</strong> <span class="badge badge-success">ÄÃ£ cáº¥p phÃ¡t táº¡m á»©ng</span> (BiÃªn nháº­n chi: BiÃªn_lai_táº¡m_á»©ng.pdf)</p>
                    </div>`;
            } else {
                kpRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Há»“ sÆ¡ nÃ y khÃ´ng cÃ³ Ä‘á» nghá»‹ táº¡m á»©ng kinh phÃ­ bá»“i thÆ°á»ng</div>`;
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
                showToast("ÄÃ£ gá»¡ tá»‡p Ä‘Ã­nh kÃ¨m thÃ nh cÃ´ng!", "info");
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
            if (claim.phddStep2Opinion) {
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

            // Step 2 values (UC436)
            const step2Opinion = claim.phddStep2Opinion || "Äá»“ng Ã½";
            const step2Radios = document.getElementsByName('editPhddStep2Opinion');
            step2Radios.forEach(radio => {
                radio.checked = (radio.value === step2Opinion);
            });
            document.getElementById('editPhddStep2OpinionText').value = claim.phddStep2OpinionText || "";
            phddStepFileNames[2] = claim.phddStep2File || null;

            // Step 3 values (UC435)
            document.getElementById('editPhddStep3No').value = claim.phddStep3No || "";
            document.getElementById('editPhddStep3Date').value = claim.phddStep3Date || "";

            let suggestedType = "Trá»±c tiáº¿p xin lá»—i";
            if (claim.phddFormApology !== false && claim.phddFormNews) {
                suggestedType = "Cáº£ hai hÃ¬nh thá»©c";
            } else if (claim.phddFormNews) {
                suggestedType = "ÄÄƒng bÃ¡o xin lá»—i";
            }
            const step3Type = claim.phddStep3Type || suggestedType;
            document.getElementById('editPhddStep3Type').value = step3Type;
            document.getElementById('editPhddStep3DateExp').value = claim.phddStep3DateExp || "";

            // Direct
            document.getElementById('editPhddStep3DirectVenue').value = claim.phddStep3DirectVenue || "";
            document.getElementById('editPhddStep3DirectMembers').value = claim.phddStep3DirectMembers || "";
            document.getElementById('editPhddStep3DirectContent').value = claim.phddStep3DirectContent || "";

            // News
            document.getElementById('editPhddStep3NewsCentral').value = claim.phddStep3NewsCentral || "";
            document.getElementById('editPhddStep3NewsLocal').value = claim.phddStep3NewsLocal || "";
            document.getElementById('editPhddStep3NewsUrl').value = claim.phddStep3NewsUrl || "";

            toggleStep3FormInputs(step3Type);
            phddStepFileNames[3] = claim.phddStep3File || null;

            // Step 4 values (UC437)
            document.getElementById('editPhddStep4DateAct').value = claim.phddStep4DateAct || "";
            document.getElementById('editPhddStep4NewsNumbers').value = claim.phddStep4NewsNumbers || "";
            document.getElementById('editPhddStep4CommuneDate').value = claim.phddStep4CommuneDate || "";
            document.getElementById('editPhddStep4CommuneReceiver').value = claim.phddStep4CommuneReceiver || "";
            document.getElementById('editPhddStep4ResultDesc').value = claim.phddStep4ResultDesc || "";
            phddStepFileNames[4] = claim.phddStep4File || null;

            // Render buttons before rendering attachment display blocks
            const editButtons = document.getElementById('editPhddButtons');
            const canEdit = isDetailEditMode && (claim.status === 'Chá» thá»±c thi' || claim.status === 'Äang thÆ°Æ¡ng lÆ°á»£ng' || claim.status === 'Äang xÃ¡c minh thiá»‡t háº¡i' || claim.status === 'Chá» thá»¥ lÃ½');

            if (canEdit) {
                editButtons.style.display = 'flex';
                setPhddInputsDisabled(false);
            } else {
                editButtons.style.display = 'none';
                setPhddInputsDisabled(true);
            }

            // Now display files with correct permissions
            for (let s = 1; s <= 4; s++) {
                setPhddStepFile(s, phddStepFileNames[s]);
            }

            updatePhddFlowStatus(claim);
        }

        function cancelActionUpdate() {
            showCaseDetail(selectedClaimId, false);
            showToast("ÄÃ£ há»§y bá» cáº­p nháº­t thÃ´ng tin!", "info");
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
                const val = parseFloat(document.getElementById('editXmVal1').value) || 0;
                const note = document.getElementById('editXmNote1').value.trim();

                claim.status = 'Äang thÆ°Æ¡ng lÆ°á»£ng';
                claim.xmTotalAmount = val;
                claim.otherRestore = document.getElementById('editXacMinhOtherRestore').value;

                claim.timeline.push({
                    title: "XÃ¡c minh thiá»‡t háº¡i",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: `HoÃ n thÃ nh bÃ¡o cÃ¡o xÃ¡c minh thiá»‡t háº¡i thá»±c táº¿. Sá»‘ tiá»n xÃ¡c Ä‘á»‹nh: ${val.toLocaleString('vi-VN')}Ä‘. Ghi chÃº: ${note}`,
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
                    showToast("ThÆ°Æ¡ng lÆ°á»£ng tháº¥t báº¡i. Há»“ sÆ¡ chuyá»ƒn sang [ThÆ°Æ¡ng lÆ°á»£ng khÃ´ng thÃ nh cÃ´ng]!", "info");
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
                    showToast("ÄÃ£ lÆ°u nhÃ¡p dá»± tháº£o Quyáº¿t Ä‘á»‹nh giáº£i quyáº¿t bá»“i thÆ°á»ng!", "info");
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
                'editPhddStep4DateAct', 'editPhddStep4CommuneDate', 'editPhddStep4CommuneReceiver'
            ];
            allPhddInputs.forEach(id => validatePhddInput(id, false));
            for (let s = 1; s <= 4; s++) validatePhddFile(s, false);

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (!claim) return;

            // Read all field values
            const s1No = document.getElementById('editPhddStep1No').value.trim();
            const s1Date = document.getElementById('editPhddStep1Date').value.trim();
            const s1Signer = document.getElementById('editPhddStep1Signer').value.trim();
            const s1File = phddStepFileNames[1];

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
            const s4NewsNumbers = document.getElementById('editPhddStep4NewsNumbers').value.trim();
            const s4CommuneDate = document.getElementById('editPhddStep4CommuneDate').value.trim();
            const s4CommuneReceiver = document.getElementById('editPhddStep4CommuneReceiver').value.trim();
            const s4ResultDesc = document.getElementById('editPhddStep4ResultDesc').value.trim();
            const s4File = phddStepFileNames[4];

            // Validate based on what has been filled
            let hasS1 = s1No || s1Date || s1Signer || s1File;
            let hasS2 = s2Text || s2File;
            let hasS3 = s3No || s3Date || s3DateExp || s3DirectVenue || s3DirectMembers || s3NewsCentral || s3NewsLocal || s3File;
            let hasS4 = s4DateAct || s4NewsNumbers || s4CommuneDate || s4CommuneReceiver || s4ResultDesc || s4File;

            let firstInvalid = null;

            // If Step 4 is filled, steps 1, 2, 3 must also be started
            if (hasS4) {
                hasS3 = true;
                hasS2 = true;
                hasS1 = true;
            }
            if (hasS3) {
                hasS2 = true;
                hasS1 = true;
            }
            if (hasS2) {
                hasS1 = true;
            }

            // Validate Step 4 if active
            if (hasS4) {
                if (!s4DateAct) {
                    validatePhddInput('editPhddStep4DateAct', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4DateAct');
                }
                if (!s4CommuneDate) {
                    validatePhddInput('editPhddStep4CommuneDate', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4CommuneDate');
                }
                if (!s4CommuneReceiver) {
                    validatePhddInput('editPhddStep4CommuneReceiver', true);
                    if (!firstInvalid) firstInvalid = document.getElementById('editPhddStep4CommuneReceiver');
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
                if (!s3File) {
                    validatePhddFile(3, true);
                    if (!firstInvalid) firstInvalid = document.getElementById('phddStep3FileWrapper');
                }
            }

            // Validate Step 2 if active
            if (hasS2) {
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

            claim.phddStep2Opinion = s2Opinion || null;
            claim.phddStep2OpinionText = s2Text || null;
            claim.phddStep2File = s2File || null;

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
            claim.phddNewsNumbers = s4NewsNumbers || null;
            claim.phddStep4NewsNumbers = s4NewsNumbers || null;
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
            showToast("ÄÃ£ gá»¡ tá»‡p Ä‘Ã­nh kÃ¨m!", "info");
        }

        // Custom Confirmation Modal Helper
        let confirmCallback = null;

        function showConfirmModal(message, callback) {
            const overlay = document.getElementById('customConfirmOverlay');
            document.getElementById('customConfirmMessage').innerText = message;
            confirmCallback = callback;

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
            }, 200);

            if (result && confirmCallback) {
                confirmCallback();
            }
            confirmCallback = null;
        }
