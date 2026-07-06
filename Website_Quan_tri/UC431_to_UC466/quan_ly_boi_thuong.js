        // Local simulation data for Quick-Fill
        const xdRequestList = [
            {
                code: "XD-2026-001",
                nycName: "Nguy?n Van Nam",
                nycRole: "Ngu?i b? thi?t h?i",
                nycGender: "Nam",
                nycBirth: "12/05/1988",
                nycCardType: "CCCD",
                nycCardNo: "001088002934",
                nycCardDate: "15/08/2021",
                nycCardPlace: "C?c C?nh s·t QLHC v? TTXH",
                nycPhone: "0915223344",
                nycEmail: "namnv@example.com",
                nycCountry: "Vi?t Nam",
                nycTinhThanh: "H‡ N?i",
                nycAddressDetail: "S? 20 Tr?n Hung –?o, Ho‡n Ki?m",
                hanhVi: "UBND Phu?ng d„ th?c hi?n l?p biÍn b?n ph?t h‡nh chÌnh sai th?m quy?n d?i v?i h? kinh doanh.",
                procTargetAgency: "S? Tu ph·p TP. H‡ N?i",
                fieldGroup: "h‡nh chÌnh"
            },
            {
                code: "XD-2026-002",
                nycName: "LÍ Ho‡ng H?i",
                nycRole: "C· nh‚n, ph·p nh‚n du?c ?y quy?n h?p ph·p",
                nycGender: "Nam",
                nycBirth: "20/10/1990",
                nycCardType: "CCCD",
                nycCardNo: "001090008812",
                nycCardDate: "10/02/2023",
                nycCardPlace: "C?c C?nh s·t QLHC v? TTXH",
                nycPhone: "0988776655",
                nycEmail: "haile@example.com",
                nycCountry: "Vi?t Nam",
                nycTinhThanh: "H?i PhÚng",
                nycAddressDetail: "S? 45 LÍ L?i, NgÙ Quy?n",
                hanhVi: "B?t t?m giam kh?n c?p khÙng phÍ chu?n c?a Vi?n ki?m s·t.",
                procTargetAgency: "TÚa ·n nh‚n d‚n TP. H‡ N?i",
                fieldGroup: "hÏnh s?"
            }
        ];

        // Claim Mock Data
        let claimsList = [
            {
                id: "HS1",
                code: "BT-2026-001",
                fieldGroup: "h‡nh chÌnh",
                date: "12/06/2026",
                nyc: "Nguy?n Van A",
                cardType: "C· nh‚n",
                cardNo: "001085002934",
                address: "S? 15 du?ng Tr?n Hung –?o, Ho‡n Ki?m, H‡ N?i",
                phone: "0912345678",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh x? ph?t tr·i lu?t s? 12/QD-XPVHC ng‡y 10/02/2026 c?a UBND qu?n C?u Gi?y",
                hanhVi: "Cu?ng ch? th·o d? nh‡ ? khi chua cÛ quy?t d?nh h‡nh chÌnh cÛ hi?u l?c ph·p lu?t.",
                nhanQua: "Vi?c d?p ph· cÙng trÏnh g‚y s?p d? can nh‡ v‡ hu h?ng to‡n b? t‡i s?n bÍn trong.",
                status: "–ang thuong lu?ng",
                thulyVenue: "co quan qu?n l˝",
                totalNum: 150000000,
                advanceNum: 30000000,
                advanceRec: "Nguy?n Van A",
                advanceRecCard: "001085002934",
                advanceRecAddress: "S? 15 du?ng Tr?n Hung –?o, Ho‡n Ki?m, H‡ N?i",
                advanceRecKenh: "tien-mat",
                advanceRecBank: "",
                slaDays: 5,
                slaStatus: "normal",
                slaText: "–ang thuong lu?ng b?i thu?ng (h?n cÚn 5 ng‡y)",
                restoreHonor: true,
                agency: "S? Tu ph·p H‡ N?i",
                deadline: "20/08/2026",
                files: [
                    { name: "–on yÍu c?u b?i thu?ng M?u 01.pdf", url: "#" },
                    { name: "BiÍn b?n hi?n tr?ng th·o d? cÙng trÏnh.pdf", url: "#" }
                ],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "12/06/2026", desc: "H? so ti?p nh?n tr?c ti?p t? Nguy?n Van A", status: "completed" },
                    { title: "Ki?m tra h? so b? sung", date: "15/06/2026", desc: "H? so h?p l?, d? th‡nh ph?n.", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "17/06/2026", desc: "Quy?t d?nh th? l˝ s? 104/Q–-TLHS c?a S? Tu ph·p.", status: "completed" },
                    { title: "X·c minh thi?t h?i", date: "02/07/2026", desc: "Ho‡n th‡nh b·o c·o x·c minh thi?t h?i th?c t?.", status: "completed" },
                    { title: "Thuong lu?ng b?i thu?ng", date: "08/07/2026", desc: "–ang ti?n h‡nh phiÍn thuong lu?ng l?n th? 1.", status: "active" }
                ],
                tlTimeExp: "08/07/2026 09:00",
                tlVenueExp: "PhÚng h?p s? 3, S? Tu ph·p",
                tlMembersExp: "–?i di?n S?, Ùng Nguy?n Van A v‡ chuyÍn viÍn x·c minh LÍ Van B.",
                phddStep1No: "12/TB-STP",
                phddStep1Date: "20/06/2026",
                phddStep1Signer: "Nguy?n Van Ho?t (Gi·m d?c S?)",
                phddStep1File: "Thong_bao_chuyen_PHDD.pdf",
                phddStep2Opinion: "–?ng ˝",
                phddStep2OpinionText: "–?ng ˝ th?c hi?n ph?c h?i danh d? b?ng hÏnh th?c xin l?i cÙng khai v‡ dang t?i b·o chÌ.",
                phddStep2File: "Y_kien_dong_y_nguoi_bi_hai.pdf"
            },
            {
                id: "HS2",
                code: "BT-2026-002",
                fieldGroup: "hÏnh s?",
                date: "14/06/2026",
                nyc: "Tr?n Th? B",
                cardType: "C· nh‚n",
                cardNo: "002092003845",
                address: "S? 88 du?ng L?ch Tray, NgÙ Quy?n, H?i PhÚng",
                phone: "0904888999",
                role: "Ngu?i th?a k? c?a ngu?i b? thi?t h?i",
                docBase: "B?n ·n hÏnh s? oan sai s? 15/2026/HS-ST ng‡y 28/02/2026 c?a TAND t?nh L‚m –?ng",
                hanhVi: "B?t giam gi? oan sai trong th?i gian 3 th·ng liÍn ti?p.",
                nhanQua: "G‚y t?n thuong s?c kh?e v‡ tinh th?n nghiÍm tr?ng trong th?i gian giam gi? tr·i lu?t.",
                status: "–ang x·c minh thi?t h?i",
                thulyVenue: "tÚa ·n t? t?ng",
                totalNum: 350000000,
                advanceNum: 0,
                slaDays: 12,
                slaStatus: "normal",
                slaText: "–ang ti?n h‡nh x·c minh thi?t h?i",
                restoreHonor: true,
                agency: "TÚa ·n nh‚n d‚n TP. H‡ N?i",
                deadline: "30/08/2026",
                files: [
                    { name: "–on yÍu c?u b?i thu?ng M?u 01.pdf", url: "#" },
                    { name: "B?n ·n oan sai s? 15.pdf", url: "#" }
                ],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "14/06/2026", desc: "H? so ti?p nh?n thÙng qua DVC tr?c tuy?n", status: "completed" },
                    { title: "Ki?m tra h? so b? sung", date: "16/06/2026", desc: "H? so h?p l?.", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "18/06/2026", desc: "Quy?t d?nh th? l˝ s? 105/Q–-TLHS.", status: "completed" },
                    { title: "X·c minh thi?t h?i", date: "–ang ti?n h‡nh", desc: "ChuyÍn viÍn dang thu th?p t‡i li?u d?nh gi· thi?t h?i.", status: "active" }
                ]
            },
            {
                id: "HS3",
                code: "BT-2026-003",
                fieldGroup: "h‡nh chÌnh",
                date: "05/01/2023",
                nyc: "CÙng ty H?i Ph·t",
                cardType: "T? ch?c",
                cardNo: "0102030405",
                address: "Khu dÙ th? m?i An Hung, H‡ –Ùng, H‡ N?i",
                phone: "0243556677",
                role: "T? ch?c k? th?a quy?n, nghia v? c?a t? ch?c b? thi?t h?i d„ ch?m d?t t?n t?i",
                docBase: "Quy?t d?nh thu h?i d?t tr·i ph·p lu?t s? 888/QD-UBND ng‡y 20/12/2022 c?a UBND th‡nh ph?",
                hanhVi: "Thu h?i d?t d? ·n x‚y d?ng tr·i th?m quy?n l‡m ngung tr? thi cÙng.",
                nhanQua: "L‡m ph·t sinh chi phÌ ph?t h?p d?ng th?u ph? v‡ kh?u hao thi?t b? d?ng thi cÙng vÙ l˝.",
                status: "Ho‡n th‡nh",
                thulyVenue: "co quan qu?n l˝",
                totalNum: 4800000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "–„ chi tr? b?i thu?ng ho‡n t?t",
                restoreHonor: false,
                agency: "UBND Qu?n C?u Gi?y",
                deadline: "10/05/2023",
                files: [{ name: "H? so th·o d? cÙng trÏnh H?i Ph·t.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "05/01/2023", desc: "H? so ti?p nh?n tr?c ti?p", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "10/01/2023", desc: "Th? l˝ gi?i quy?t b?i thu?ng", status: "completed" },
                    { title: "X·c minh thi?t h?i", date: "15/02/2023", desc: "–„ ban h‡nh b·o c·o x·c minh thi?t h?i", status: "completed" },
                    { title: "Thuong lu?ng b?i thu?ng", date: "28/02/2023", desc: "Thuong lu?ng th‡nh cÙng", status: "completed" },
                    { title: "Quy?t d?nh gi?i quy?t b?i thu?ng", date: "10/03/2023", desc: "Ban h‡nh quy?t d?nh b?i thu?ng s? 45/Q–-BT", status: "completed" },
                    { title: "Th?c thi gi?i quy?t b?i thu?ng", date: "10/05/2023", desc: "–„ ho‡n th‡nh th?c thi chi tr? 4,8 t? d?ng", status: "completed" }
                ],
                thucthiDate: "10/05/2023",
                thucthiNote: "–„ chuy?n kho?n d? s? ti?n 4.800.000.000d sang t‡i kho?n CÙng ty H?i Ph·t."
            },
            {
                id: "HS4",
                code: "BT-2026-004",
                fieldGroup: "d‚n s?",
                date: "04/04/2026",
                nyc: "Tr?n Minh T",
                cardType: "C· nh‚n",
                cardNo: "001094002934",
                address: "S? 9 H‡ng Tr?ng, Ho‡n Ki?m, H‡ N?i",
                phone: "0901223344",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh ·p d?ng kh?n c?p t?m th?i phong t?a t‡i kho?n sai lu?t s? 02/QD-BPKCTT",
                hanhVi: "KÍ biÍn t‡i s?n qu· m?c thi?t h?i c?n b?o d?m.",
                nhanQua: "Thi?t h?i doanh thu b·n h‡ng th?c t? do phong t?a t‡i s?n.",
                status: "YÍu c?u b? sung",
                thulyVenue: "tÚa ·n d‚n s? A",
                totalNum: 75000000,
                advanceNum: 0,
                slaDays: 4,
                slaStatus: "warning",
                slaText: "Ch? ngu?i d‚n b? sung h? so",
                restoreHonor: false,
                agency: "TÚa ·n nh‚n d‚n qu?n Ho‡n Ki?m",
                deadline: "28/08/2026",
                files: [{ name: "–on yÍu c?u b?i thu?ng.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "04/04/2026", desc: "H? so m?i ti?p nh?n", status: "completed" },
                    { title: "Ki?m tra h? so b? sung", date: "08/04/2026", desc: "YÍu c?u b? sung BiÍn b?n d?i so·t ng‚n h‡ng.", status: "active" }
                ],
                bosungLogs: [
                    { date: "08/04/2026", sender: "ChuyÍn viÍn LÍ Van A", content: "YÍu c?u b? sung BiÍn b?n d?i so·t sao kÍ t‡i kho?n ng‚n h‡ng d? ch?ng minh thi?t h?i th?c t?." }
                ]
            },
            {
                id: "HS5",
                code: "BT-2026-005",
                fieldGroup: "t? t?ng h‡nh chÌnh",
                date: "10/02/2026",
                nyc: "LÍ Van D",
                cardType: "C· nh‚n",
                cardNo: "001089004823",
                address: "S? 234 L·ng H?, –?ng –a, H‡ N?i",
                phone: "0911556677",
                role: "Ngu?i b? thi?t h?i",
                docBase: "B?n ·n h‡nh chÌnh s? 02/2026/HC-ST",
                hanhVi: "KhÙng c?p gi?y phÈp x‚y d?ng tr·i lu?t.",
                nhanQua: "NguyÍn v?t li?u hu h?ng do ch?m kh?i cÙng.",
                status: "Ch? th?c thi",
                thulyVenue: "tÚa ·n t? t?ng",
                totalNum: 250000000,
                advanceNum: 0,
                slaDays: 20,
                slaStatus: "normal",
                restoreHonor: true,
                agency: "S? Tu ph·p H?i PhÚng",
                deadline: "05/09/2026",
                files: [{ name: "B?n ·n h‡nh chÌnh s? 02.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "10/02/2026", desc: "–?ng b? t? v? ·n h‡nh chÌnh", status: "completed" },
                    { title: "Ki?m tra h? so b? sung", date: "12/02/2026", desc: "H?p l?", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "15/02/2026", desc: "Th? l˝ gi?i quy?t b?i thu?ng", status: "completed" },
                    { title: "X·c minh thi?t h?i", date: "12/03/2026", desc: "B·o c·o x·c minh thi?t h?i ho‡n th‡nh", status: "completed" },
                    { title: "Thuong lu?ng b?i thu?ng", date: "20/03/2026", desc: "Thuong lu?ng th‡nh cÙng", status: "completed" },
                    { title: "Quy?t d?nh gi?i quy?t b?i thu?ng", date: "02/04/2026", desc: "–„ ban h‡nh quy?t d?nh s? 104/Q–-BT", status: "completed" }
                ],
                decNo: "104/Q–-BT",
                decDate: "02/04/2026",
                decAmount: 250000000,
                decContent: "–?ng ˝ b?i thu?ng thi?t h?i v?t ch?t 250.000.000d cho Ùng LÍ Van D v‡ t? ch?c c?i chÌnh danh d? cÙng khai.",
                phddType: "Tr?c ti?p xin l?i",
                phddDateExp: "10/07/2026",
                phddDirectVenue: "Nh‡ van hÛa t? d‚n ph? 12, L·ng H?",
                phddDirectMembers: "–?i di?n S? Tu ph·p, d?i di?n UBND Phu?ng L·ng H? v‡ ngu?i b? thi?t h?i LÍ Van D.",
                phddDirectContent: "Bu?i xin l?i tr?c ti?p cÙng khai di?n gi?i l?i xin l?i ch‚n th‡nh t? phÌa co quan qu?n l˝ h‡nh chÌnh."
            },
            {
                id: "HS6",
                code: "BT-2026-006",
                fieldGroup: "thi h‡nh ·n d‚n s?",
                date: "18/06/2026",
                nyc: "Ph?m Minh K",
                cardType: "C· nh‚n",
                cardNo: "001092008745",
                address: "S? 45 LÍ L?i, NgÙ Quy?n, H?i PhÚng",
                phone: "0904123456",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh ho„n thi h‡nh ·n d‚n s? tr·i lu?t s? 12/QD-HTHA",
                hanhVi: "Ho„n thi h‡nh ·n d‚n s? d?n d?n t?u t·n t‡i s?n.",
                nhanQua: "KhÙng thu h?i du?c kho?n n? 420 tri?u.",
                status: "Luu nh·p",
                thulyVenue: "tÚa ·n d‚n s? B",
                totalNum: 420000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "draft",
                slaText: "–ang luu nh·p, chua g?i ti?p nh?n",
                restoreHonor: false,
                agency: "S? Tu ph·p H?i PhÚng",
                deadline: "30/09/2026",
                files: [{ name: "BiÍn b?n cu?ng ch? b? h?y.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "18/06/2026", desc: "H? so du?c t?o du?i d?ng luu nh·p.", status: "active" }
                ]
            },
            {
                id: "HS7",
                code: "BT-2026-007",
                fieldGroup: "thi h‡nh ·n d‚n s?",
                date: "15/06/2026",
                nyc: "Vu Van L",
                cardType: "C· nh‚n",
                cardNo: "001091008743",
                address: "Phu?ng Quang Trung, TP. Th·i BÏnh",
                phone: "0982345678",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh cu?ng ch? thi h‡nh ·n sai d?i tu?ng",
                hanhVi: "Cu?ng ch? kÍ biÍn nh‡ d?t c?a bÍn th? ba khÙng cÛ nghia v?.",
                nhanQua: "M?t t? do v‡ t?n thuong danh d?.",
                status: "Ch? ti?p nh?n",
                thulyVenue: "co quan qu?n l˝",
                totalNum: 180000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "M?i g?i ti?p nh?n",
                restoreHonor: false,
                agency: "C?c Thi h‡nh ·n d‚n s? TP. H?i PhÚng",
                deadline: "15/09/2026",
                files: [{ name: "Quy?t d?nh kÍ biÍn t‡i s?n.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "15/06/2026", desc: "–„ n?p tr?c tuy?n, ch? ti?p nh?n.", status: "active" }
                ]
            },
            {
                id: "HS8",
                code: "BT-2026-008",
                fieldGroup: "h‡nh chÌnh",
                date: "18/06/2026",
                nyc: "Ho‡ng Th? M",
                cardType: "C· nh‚n",
                cardNo: "001096008742",
                address: "Phu?ng B?ch –?ng, Hai B‡ Trung, H‡ N?i",
                phone: "0977665544",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh cu?ng ch? th·o d? cÙng trÏnh ph? s? 14/QD-CC",
                hanhVi: "¡p d?ng bi?n ph·p kh?n c?p phong t?a t‡i kho?n ng‚n h‡ng tr·i lu?t.",
                nhanQua: "Thi?t h?i ti?n l„i ph·t sinh v‡ ph?t ch?m thanh to·n.",
                status: "Ch? th? l˝",
                thulyVenue: "tÚa ·n t? t?ng",
                totalNum: 90000000,
                advanceNum: 0,
                slaDays: 3,
                slaStatus: "normal",
                slaText: "Ch? th? l˝ gi?i quy?t b?i thu?ng",
                restoreHonor: false,
                agency: "UBND T?nh L‚m –?ng",
                deadline: "18/09/2026",
                files: [{ name: "Quy?t d?nh cu?ng ch? th·o d?.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "18/06/2026", desc: "H? so d„ du?c ti?p nh?n.", status: "completed" },
                    { title: "Ki?m tra h? so b? sung", date: "20/06/2026", desc: "H? so h?p l?, dang trÏnh th? l˝.", status: "active" }
                ]
            },
            {
                id: "HS9",
                code: "BT-2026-009",
                fieldGroup: "h‡nh chÌnh",
                date: "10/05/2026",
                nyc: "Nguy?n Van E",
                cardType: "C· nh‚n",
                cardNo: "001090002934",
                address: "S? 4 H‡ng B?c, Ho‡n Ki?m, H‡ N?i",
                phone: "0911223344",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh x? ph?t s? 14/QD-XP",
                hanhVi: "Cu?ng ch? t?ch thu phuong ti?n v?n t?i sai quy trÏnh.",
                nhanQua: "M?t doanh thu kinh doanh v?n t?i trong 30 ng‡y.",
                status: "B? t? ch?i",
                thulyVenue: "co quan qu?n l˝",
                totalNum: 60000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "danger",
                slaText: "H? so b? t? ch?i do h?t th?i hi?u",
                restoreHonor: false,
                agency: "UBND Qu?n –?ng –a",
                deadline: "10/08/2026",
                files: [{ name: "Quyet dinh tu choi thu ly.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "10/05/2026", desc: "H? so ti?p nh?n tr?c ti?p", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "14/05/2026", desc: "T? ch?i th? l˝ do h?t th?i hi?u yÍu c?u b?i thu?ng (–i?u 6).", status: "completed" }
                ]
            },
            {
                id: "HS10",
                code: "BT-2026-010",
                fieldGroup: "hÏnh s?",
                date: "15/05/2026",
                nyc: "Nguy?n Van F",
                cardType: "C· nh‚n",
                cardNo: "001092003842",
                address: "Phu?ng Nghia –Ù, C?u Gi?y, H‡ N?i",
                phone: "0988665544",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh t?m dÏnh ch? di?u tra b? can oan sai",
                hanhVi: "Giam gi? oan sai 45 ng‡y do sai sÛt di?u tra.",
                nhanQua: "M?t t? do, ?nh hu?ng t‚m l˝ v‡ danh d? tr?m tr?ng.",
                status: "Thuong lu?ng khÙng th‡nh cÙng",
                thulyVenue: "tÚa ·n t? t?ng",
                totalNum: 120000000,
                advanceNum: 0,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "Thuong lu?ng th?t b?i, k?t th˙c lu?ng h‡nh chÌnh",
                restoreHonor: false,
                agency: "TÚa ·n nh‚n d‚n T?nh L‚m –?ng",
                deadline: "15/08/2026",
                files: [{ name: "BiÍn b?n thuong lu?ng khÙng th‡nh.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "15/05/2026", desc: "H? so ti?p nh?n tr?c tuy?n", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "18/05/2026", desc: "–„ th? l˝ gi?i quy?t b?i thu?ng", status: "completed" },
                    { title: "X·c minh thi?t h?i", date: "15/06/2026", desc: "–„ ban h‡nh b·o c·o x·c minh thi?t h?i", status: "completed" },
                    { title: "Thuong lu?ng b?i thu?ng", date: "02/07/2026", desc: "Thuong lu?ng khÙng th‡nh cÙng do khÙng th?ng nh?t m?c ti?n b?i thu?ng.", status: "completed" }
                ]
            },
            {
                id: "HS11",
                code: "BT-2026-011",
                fieldGroup: "h‡nh chÌnh",
                date: "12/06/2026",
                nyc: "Tr?n Th? G",
                cardType: "C· nh‚n",
                cardNo: "001095002934",
                address: "Phu?ng Tr‡ng Ti?n, Ho‡n Ki?m, H‡ N?i",
                phone: "0904556677",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh thu h?i d?t sai lu?t s? 05/QD-TH",
                hanhVi: "KÍ biÍn gi?i phÛng m?t b?ng sai di?n tÌch d?t th?c t?.",
                nhanQua: "Gi?m s˙t di?n tÌch m?t b?ng kinh doanh buÙn b·n.",
                status: "Ch? ban h‡nh Q–",
                thulyVenue: "co quan qu?n l˝",
                totalNum: 300000000,
                advanceNum: 0,
                slaDays: 5,
                slaStatus: "normal",
                slaText: "Ch? ban h‡nh quy?t d?nh b?i thu?ng chÌnh th?c",
                restoreHonor: false,
                agency: "S? Tu ph·p H‡ N?i",
                deadline: "12/09/2026",
                files: [{ name: "BiÍn b?n thuong lu?ng th‡nh.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "12/06/2026", desc: "H? so ti?p nh?n tr?c ti?p", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "16/06/2026", desc: "Th? l˝ gi?i quy?t b?i thu?ng", status: "completed" },
                    { title: "X·c minh thi?t h?i", date: "02/07/2026", desc: "Ban h‡nh b·o c·o x·c minh thi?t h?i th?c t?", status: "completed" },
                    { title: "Thuong lu?ng b?i thu?ng", date: "05/07/2026", desc: "Thuong lu?ng th‡nh cÙng, k˝ biÍn b?n th?a thu?n b?i thu?ng.", status: "completed" }
                ]
            },
            {
                id: "HS12",
                code: "BT-2026-012",
                fieldGroup: "thi h‡nh ·n d‚n s?",
                date: "25/05/2026",
                nyc: "LÍ Van H",
                cardType: "C· nh‚n",
                cardNo: "001091002934",
                address: "LÍ –?i H‡nh, Hai B‡ Trung, H‡ N?i",
                phone: "0912233445",
                role: "Ngu?i b? thi?t h?i",
                docBase: "Quy?t d?nh x? l˝ t‡i s?n kÍ biÍn sai quy trÏnh s? 15/QD-THADS",
                hanhVi: "B·n d?u gi· t‡i s?n kÍ biÍn tr·i quy d?nh.",
                nhanQua: "M?t t‡i s?n s?n xu?t kinh doanh g‚y ng?ng tr? nh‡ xu?ng.",
                status: "Ho‡n th‡nh",
                thulyVenue: "co quan qu?n l˝",
                totalNum: 850000000,
                advanceNum: 100000000,
                slaDays: 0,
                slaStatus: "normal",
                slaText: "Ho‡n th‡nh chi tr? b?i thu?ng",
                restoreHonor: false,
                agency: "C?c Thi h‡nh ·n d‚n s? H‡ N?i",
                deadline: "25/08/2026",
                files: [{ name: "Quyet dinh ban hanh gia quyet boi thuong.pdf", url: "#" }],
                timeline: [
                    { title: "N?p h? so b?i thu?ng", date: "25/05/2026", desc: "H? so ti?p nh?n tr?c ti?p", status: "completed" },
                    { title: "Th? l˝ h? so yÍu c?u b?i thu?ng", date: "28/05/2026", desc: "Quy?t d?nh th? l˝ b?i thu?ng", status: "completed" },
                    { title: "X·c minh thi?t h?i", date: "20/06/2026", desc: "Ho‡n th‡nh b·o c·o x·c minh thi?t h?i", status: "completed" },
                    { title: "Thuong lu?ng b?i thu?ng", date: "30/06/2026", desc: "Thuong lu?ng th‡nh cÙng", status: "completed" },
                    { title: "Quy?t d?nh gi?i quy?t b?i thu?ng", date: "05/07/2026", desc: "Ban h‡nh quy?t d?nh s? 56/QD-BT", status: "completed" },
                    { title: "Th?c thi gi?i quy?t b?i thu?ng", date: "20/07/2026", desc: "–„ chi tr? xong 850 tri?u d?ng cho Ùng LÍ Van H", status: "completed" }
                ],
                thucthiDate: "20/07/2026",
                thucthiNote: "–„ chi tr? d? qua chuy?n kho?n, kh?u tr? 100 tri?u d?ng d„ t?m ?ng tru?c dÛ."
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
            if (num === 0) return "KhÙng d?ng";
            const units = ["", "m?t", "hai", "ba", "b?n", "nam", "s·u", "b?y", "t·m", "chÌn"];
            const thousands = ["", "ng‡n", "tri?u", "t?"];

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
                        chunkWords += units[hundreds] + " tram ";
                    } else if (words !== "") {
                        chunkWords += "khÙng tram ";
                    }

                    if (tens > 1) {
                        chunkWords += units[tens] + " muoi ";
                        if (ones === 1) chunkWords += "m?t";
                        else if (ones === 5) chunkWords += "lam";
                        else if (ones > 0) chunkWords += units[ones];
                    } else if (tens === 1) {
                        chunkWords += "mu?i ";
                        if (ones === 5) chunkWords += "lam";
                        else if (ones > 0) chunkWords += units[ones];
                    } else {
                        if (ones > 0) {
                            if (hundreds > 0 || words !== "") chunkWords += "l? ";
                            chunkWords += units[ones];
                        }
                    }
                    chunkWords += " " + thousands[i] + " ";
                    words = chunkWords + words;
                }
                tempNum = Math.floor(tempNum / 1000);
                i++;
            }
            return words.trim().replace(/\s+/g, ' ') + " d?ng";
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
                tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:var(--text-muted); padding:30px;">KhÙng tÏm th?y h? so n‡o ph˘ h?p</td></tr>`;
                document.getElementById('claimsCurrentRange').innerText = "0-0";
                return;
            }

            document.getElementById('claimsCurrentRange').innerText = `${startIdx + 1}-${endIdx}`;
            const pageData = filtered.slice(startIdx, endIdx);

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
                if (item.status === 'Ho‡n th‡nh') badgeClass = 'badge-success';
                else if (item.status === 'Luu nh·p') badgeClass = 'badge-draft';
                else if (item.status === 'Ch? ti?p nh?n') badgeClass = 'badge-pending';
                else if (item.status === 'YÍu c?u b? sung') badgeClass = 'badge-warning';
                else if (item.status === 'Ch? th? l˝') badgeClass = 'badge-pending';
                else if (item.status === 'B? t? ch?i') badgeClass = 'badge-danger';
                else if (item.status === 'Thuong lu?ng khÙng th‡nh cÙng') badgeClass = 'badge-danger';
                else if (item.status === 'Ch? ban h‡nh Q–') badgeClass = 'badge-warning';
                else if (item.status === 'Ch? th?c thi') badgeClass = 'badge-warning';

                // Fixed 6-slot Action Column Alignment
                const isDraft = item.status === 'Luu nh·p';
                const isPending = item.status === 'Ch? ti?p nh?n';
                const hasUpdateRights = ['Luu nh·p', 'YÍu c?u b? sung', '–ang x·c minh thi?t h?i', '–ang thuong lu?ng', 'Ch? ban h‡nh Q–', 'Ch? th?c thi'].includes(item.status);

                const viewBtn = `<button class="icon-btn view" title="Xem chi ti?t" onclick="event.stopPropagation(); showCaseDetail('${item.id}', false)"><i class="fa-solid fa-eye"></i></button>`;

                let updateBtn = `<button class="icon-btn edit" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="KhÙng du?c c?p nh?t ? tr?ng th·i n‡y"><i class="fa-solid fa-pen-to-square"></i></button>`;
                if (hasUpdateRights) {
                    updateBtn = `<button class="icon-btn edit" title="C?p nh?t h? so" onclick="event.stopPropagation(); showCaseDetail('${item.id}', true)"><i class="fa-solid fa-pen-to-square"></i></button>`;
                }

                let deleteBtn = `<button class="icon-btn delete" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Ch? du?c xÛa h? so Luu nh·p"><i class="fa-solid fa-trash-can"></i></button>`;
                if (isDraft) {
                    deleteBtn = `<button class="icon-btn delete" title="XÛa yÍu c?u" onclick="event.stopPropagation(); deleteClaim('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>`;
                }

                let acceptBtn = `<button class="icon-btn accept" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Ch? ti?p nh?n khi ? tr?ng th·i Ch? ti?p nh?n"><i class="fa-solid fa-square-check"></i></button>`;
                if (isPending) {
                    acceptBtn = `<button class="icon-btn accept" title="Ti?p nh?n h? so" onclick="event.stopPropagation(); changeStatus('${item.id}', 'Ch? th? l˝', '–„ ti?p nh?n h? so sang tr?ng th·i [Ch? th? l˝]!')"><i class="fa-solid fa-square-check"></i></button>`;
                }

                let suppBtn = `<button class="icon-btn supplement" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Ch? yÍu c?u b? sung khi ? tr?ng th·i Ch? ti?p nh?n"><i class="fa-solid fa-circle-question"></i></button>`;
                if (isPending) {
                    suppBtn = `<button class="icon-btn supplement" title="YÍu c?u b? sung" onclick="event.stopPropagation(); changeStatus('${item.id}', 'YÍu c?u b? sung', '–„ chuy?n h? so sang tr?ng th·i [YÍu c?u b? sung]!')"><i class="fa-solid fa-circle-question"></i></button>`;
                }

                let denyBtn = `<button class="icon-btn reject" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Ch? t? ch?i th? l˝ khi ? tr?ng th·i Ch? ti?p nh?n"><i class="fa-solid fa-ban"></i></button>`;
                if (isPending) {
                    denyBtn = `<button class="icon-btn reject" title="T? ch?i th? l˝" onclick="event.stopPropagation(); changeStatus('${item.id}', 'B? t? ch?i', '–„ t? ch?i th? l˝ h? so!')"><i class="fa-solid fa-ban"></i></button>`;
                }

                const shortenedHanhVi = item.hanhVi.length > 35 ? item.hanhVi.slice(0, 35) + '...' : item.hanhVi;

                tr.innerHTML = `
                    <td style="text-align:center;"><input type="checkbox"></td>
                    <td style="text-align:center;">${startIdx + index + 1}</td>
                    <td style="text-align:center;"><strong>${item.code}</strong></td>
                    <td><strong>${item.nyc}</strong></td>
                    <td title="${item.hanhVi}">${shortenedHanhVi}</td>
                    <td style="font-size:12px; color:var(--text-muted);">${item.fieldGroup}</td>
                    <td style="font-size:12px; color:var(--text-muted);">${item.agency || "Chua ph‚n cÙng"}</td>
                    <td style="text-align:center;">${item.date}</td>
                    <td style="text-align:center; font-weight: 500; color: #b45309;">${item.deadline || "--"}</td>
                    <td style="text-align:center;"><span class="badge ${badgeClass}">${item.status}</span></td>
                    <td style="text-align:center;">
                        <div class="action-flex">
                            ${viewBtn}
                            ${updateBtn}
                            ${deleteBtn}
                            ${acceptBtn}
                            ${suppBtn}
                            ${denyBtn}
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
            showToast("–„ xÛa b? l?c tÏm ki?m!", "info");
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
                showConfirmModal("B?n cÛ ch?c ch?n mu?n xÛa h? so luu nh·p n‡y khÙng?", () => {
                    claimsList.splice(index, 1);
                    showToast("–„ xÛa vinh vi?n h? so luu nh·p!", "success");
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
                document.getElementById(`claimThietHaiCalc_${i}`).value = '';
                document.getElementById(`claimThietHaiCalc_${i}`).disabled = true;
                document.getElementById(`claimThietHaiVal_${i}`).value = '';
                document.getElementById(`claimThietHaiVal_${i}`).disabled = true;
            }

            document.getElementById('claimTotalNumText').innerText = "0 d?ng";
            document.getElementById('claimTotalWordText').innerText = "Vi?t b?ng ch?: KhÙng d?ng";
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
            toggleDocsByRole("Ngu?i b? thi?t h?i");
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
            if (linhVuc === 'h‡nh chÌnh') {
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
                showToast("KhÙng tÏm th?y H? so x·c d?nh co quan b?i thu?ng n‡o ph˘ h?p!", "error");
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
            if (found.nycCountry === 'Vi?t Nam') {
                document.getElementById('claimNYCCity').value = found.nycTinhThanh;
            } else {
                document.getElementById('claimNYCCityText').value = found.nycTinhThanh;
            }
            document.getElementById('claimNYCAddress').value = found.nycAddressDetail;
            document.getElementById('claimHanhVi').value = found.hanhVi;

            document.getElementById('claimDocBase').value = `Van b?n x·c d?nh th?m quy?n s? 02/Q–-X–CQ ban h‡nh ng‡y 01/07/2026`;

            initDocsList();
            toggleDocsByRole(found.nycRole);

            showToast("–„ di?n nhanh to‡n b? thÙng tin t? h? so x·c minh co quan b?i thu?ng!", "success");
        }

        // Toggles Country selections
        function toggleClaimCountrySelect(val) {
            const drop = document.getElementById('claimCityDropdownWrapper');
            const inp = document.getElementById('claimCityInputWrapper');
            if (val === 'Vi?t Nam') {
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
                const val = parseFloat(document.getElementById(`claimThietHaiVal_${i}`).value) || 0;
                total += val;
            }
            document.getElementById('claimTotalNumText').innerText = `${total.toLocaleString('vi-VN')} d?ng`;
            document.getElementById('claimTotalWordText').innerText = `Vi?t b?ng ch?: ${numberToVietnameseWords(total)}`;

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

            document.getElementById('claimAdvanceTotalText').innerText = `${total.toLocaleString('vi-VN')} d?ng (Vi?t b?ng ch?: ${numberToVietnameseWords(total)})`;
        }

        function initDocsList(role = "Ngu?i b? thi?t h?i") {
            currentDocsList = [
                {
                    name: "Gi?y t? ch?ng minh nh‚n th‚n c?a ngu?i b? thi?t h?i",
                    required: (role === "Ngu?i b? thi?t h?i"),
                    file: (role === "Ngu?i b? thi?t h?i") ? "Giay_to_chung_minh_nhan_than_bi_thiet_hai.pdf" : null,
                    isCustom: false
                },
                {
                    name: "T‡i li?u, ch?ng c? cÛ liÍn quan t?i yÍu c?u b?i thu?ng (n?u cÛ)",
                    required: false,
                    file: "Tai_lieu_chung_cu_kem_theo.pdf",
                    isCustom: false
                },
                {
                    name: "Van b?n l‡m can c? yÍu c?u b?i thu?ng, tr? tru?ng h?p ngu?i b? thi?t h?i khÙng du?c g?i ho?c khÙng th? cÛ van b?n l‡m can c? yÍu c?u b?i thu?ng",
                    required: true,
                    file: "Van_ban_lam_can_cu_yeu_cau_boi_thuong.pdf",
                    isCustom: false
                },
                {
                    name: "Van b?n yÍu c?u b?i thu?ng (H? th?ng t? d?ng gen ra theo M?u 01/BTNN)",
                    required: true,
                    file: "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf",
                    isCustom: false
                },
                {
                    name: "Gi?y t? ch?ng minh nh‚n th‚n c?a ngu?i th?a k?, ngu?i d?i di?n c?a ngu?i b? thi?t h?i",
                    required: (role === "Ngu?i th?a k? c?a ngu?i b? thi?t h?i" || role === "Ngu?i d?i di?n theo ph·p lu?t c?a ngu?i b? thi?t h?i" || role === "C· nh‚n, ph·p nh‚n du?c ?y quy?n h?p ph·p"),
                    file: (role === "Ngu?i th?a k? c?a ngu?i b? thi?t h?i" || role === "Ngu?i d?i di?n theo ph·p lu?t c?a ngu?i b? thi?t h?i" || role === "C· nh‚n, ph·p nh‚n du?c ?y quy?n h?p ph·p") ? "Chung_minh_nhan_than_nguoi_dai_dien_thua_ke.pdf" : null,
                    isCustom: false
                },
                {
                    name: "Tru?ng h?p ngu?i b? thi?t h?i ch?t m‡ cÛ di ch˙c thÏ ngu?i yÍu c?u b?i thu?ng ph?i cung c?p di ch˙c, tru?ng h?p khÙng cÛ di ch˙c thÏ ph?i cÛ van b?n h?p ph·p v? quy?n th?a k?",
                    required: (role === "Ngu?i th?a k? c?a ngu?i b? thi?t h?i"),
                    file: (role === "Ngu?i th?a k? c?a ngu?i b? thi?t h?i") ? "Di_chuc_hoac_van_ban_thua_ke_hop_phap.pdf" : null,
                    isCustom: false
                },
                {
                    name: "Van b?n ?y quy?n h?p ph·p trong tru?ng h?p d?i di?n theo ?y quy?n",
                    required: (role === "C· nh‚n, ph·p nh‚n du?c ?y quy?n h?p ph·p"),
                    file: (role === "C· nh‚n, ph·p nh‚n du?c ?y quy?n h?p ph·p") ? "Van_ban_uy_quyen_hop_phap.pdf" : null,
                    isCustom: false
                }
            ];
        }

        function toggleDocsByRole(role) {
            initDocsList(role);
            renderDocsTable();
        }

        function renderDocsTable() {
            const tbody = document.getElementById('claimDynamicDocsBody');
            tbody.innerHTML = '';

            currentDocsList.forEach((doc, idx) => {
                const tr = document.createElement('tr');

                let nameHtml = '';
                if (doc.isCustom) {
                    nameHtml = '<input type="text" class="form-control" placeholder="Nh?p tÍn th‡nh ph?n h? so..." value="' + doc.name + '" oninput="updateCustomDocName(' + idx + ', this.value)">';
                } else {
                    nameHtml = '<strong>' + doc.name + '</strong>';
                    if (doc.required) {
                        nameHtml += ' <span class="badge badge-danger" style="background-color: #ef4444; color: white; border: none; font-size: 11px; padding: 2px 6px; margin-left: 6px;">B?t bu?c</span>';
                    }
                }

                let fileHtml = '';
                if (doc.file) {
                    fileHtml = '<div class="attached-file-info" style="display: flex; align-items: center; gap: 8px;">' +
                        '<i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>' +
                        '<span class="file-name" style="font-weight: 600; color: #166534;">' + doc.file + '</span>' +
                        '<a href="#" onclick="viewDocFile(' + idx + '); return false;" style="margin-left: 10px; font-size: 12px; color: var(--secondary-color); text-decoration: underline;">Xem file</a>' +
                        '<a href="#" onclick="clearDocFile(' + idx + '); return false;" style="margin-left: 8px; font-size: 12px; color: #ef4444; text-decoration: underline;">XÛa</a>' +
                        '</div>';
                } else {
                    fileHtml = '<button class="btn-upload-rust" onclick="this.nextElementSibling.click()">Ch?n t?p dÌnh kËm +</button>' +
                        '<input type="file" style="display: none;" onchange="uploadDocFile(this, ' + idx + ')">';
                }

                let btnXem = '';
                let btnTaiXuong = '';
                let btnXoa = '';

                if (doc.file) {
                    btnXem = '<button class="icon-btn view" title="Xem chi ti?t" onclick="viewDocFile(' + idx + ')"><i class="fa-regular fa-eye"></i></button>';
                    btnTaiXuong = '<button class="icon-btn" title="T?i xu?ng" style="color: #3b82f6;" onclick="downloadDocFile(' + idx + ')"><i class="fa-solid fa-file-arrow-down"></i></button>';

                    if (doc.isCustom) {
                        btnXoa = '<button class="icon-btn delete" title="XÛa th‡nh ph?n h? so" onclick="deleteDocRow(' + idx + ')"><i class="fa-solid fa-trash-can"></i></button>';
                    } else {
                        btnXoa = '<button class="icon-btn delete" title="XÛa t?p dÌnh kËm" onclick="clearDocFile(' + idx + ')"><i class="fa-solid fa-trash-can"></i></button>';
                    }
                } else {
                    btnXem = '<button class="icon-btn view" title="Chua cÛ t?p dÌnh kËm d? xem" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-regular fa-eye"></i></button>';
                    btnTaiXuong = '<button class="icon-btn" title="Chua cÛ t?p dÌnh kËm d? t?i xu?ng" style="opacity: 0.35; pointer-events: none; cursor: not-allowed; color: #3b82f6;"><i class="fa-solid fa-file-arrow-down"></i></button>';

                    if (doc.isCustom) {
                        btnXoa = '<button class="icon-btn delete" title="XÛa th‡nh ph?n h? so" onclick="deleteDocRow(' + idx + ')"><i class="fa-solid fa-trash-can"></i></button>';
                    } else {
                        btnXoa = '<button class="icon-btn delete" title="KhÙng cÛ t?p d? xÛa" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-solid fa-trash-can"></i></button>';
                    }
                }

                const actionsHtml = '<div class="action-flex">' + btnXem + btnTaiXuong + btnXoa + '</div>';

                tr.innerHTML = '<td style="text-align:center; vertical-align: middle;">' + (idx + 1) + '</td>' +
                    '<td style="vertical-align: middle;">' + nameHtml + '</td>' +
                    '<td style="vertical-align: middle;">' + fileHtml + '</td>' +
                    '<td style="text-align:center; vertical-align: middle;">' + actionsHtml + '</td>';
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
                    showToast("–„ dÌnh kËm t?p tin: " + fileName + " th‡nh cÙng!", "success");
                }
            }
        }

        function viewDocFile(idx) {
            const doc = currentDocsList[idx];
            if (!doc || !doc.file) return;

            showToast("–ang xem t‡i li?u: " + doc.file, "info");
            const win = window.open("", "_blank");

            if (doc.file === "Mau_01_BTNN_He_Thong_Tu_Sinh.pdf") {
                const cqNhan = document.getElementById('claimCqNhan').value || "S? Tu ph·p TP. H‡ N?i";
                const role = document.getElementById('claimNYCRole').value || "Ngu?i b? thi?t h?i";
                const name = document.getElementById('claimNYCName').value || "Nguy?n Van A";
                const gender = document.getElementById('claimNYCGender').value || "Nam";
                const birth = document.getElementById('claimNYCBirth').value || "01/01/1990";
                const cardType = document.getElementById('claimNYCCardType').value || "CCCD";
                const cardNo = document.getElementById('claimNYCCardNo').value || "001090000123";
                const cardDate = document.getElementById('claimNYCCardDate').value || "01/01/2021";
                const cardPlace = document.getElementById('claimNYCCardPlace').value || "C?c CS QLHC";
                const phone = document.getElementById('claimNYCPhone').value || "0912345678";
                const email = document.getElementById('claimNYCEmail').value || "nva@gmail.com";
                const country = document.getElementById('claimNYCCountry').value || "Vi?t Nam";
                const city = country === 'Vi?t Nam' ? document.getElementById('claimNYCCity').value : document.getElementById('claimNYCCityText').value;
                const address = document.getElementById('claimNYCAddress').value || "H‡ N?i";
                const hanhVi = document.getElementById('claimHanhVi').value || "Chua cÛ mÙ t? h‡nh vi g‚y thi?t h?i";
                const nhanQua = document.getElementById('claimNhanQua').value || "Chua cÛ mÙ t? m?i quan h? nh‚n qu?";
                const docBase = document.getElementById('claimDocBase').value || "Chua nh?p van b?n l‡m can c?";

                let total = 0;
                let thietHaiRowsHtml = "";
                const thietHaiNames = [
                    "T‡i s?n b? x‚m ph?m",
                    "Thu nh?p th?c t? b? m?t/gi?m s˙t",
                    "V?t ch?t do ngu?i b? thi?t h?i ch?t",
                    "V?t ch?t do s?c kh?e b? x‚m ph?m",
                    "Thi?t h?i v? tinh th?n",
                    "C·c chi phÌ h?p l˝ kh·c"
                ];
                for (let i = 1; i <= 6; i++) {
                    const checked = document.getElementById(`claimThietHaiCb_${i}`).checked;
                    if (checked) {
                        const calc = document.getElementById(`claimThietHaiCalc_${i}`).value || "-";
                        const val = parseFloat(document.getElementById(`claimThietHaiVal_${i}`).value) || 0;
                        total += val;
                        thietHaiRowsHtml += `<tr>
                            <td style="border: 1px solid black; padding: 8px; text-align: center;">${i}</td>
                            <td style="border: 1px solid black; padding: 8px;">${thietHaiNames[i - 1]}</td>
                            <td style="border: 1px solid black; padding: 8px;">${calc}</td>
                            <td style="border: 1px solid black; padding: 8px; text-align: right; font-weight: bold;">${val.toLocaleString('vi-VN')} d</td>
                        </tr>`;
                    }
                }
                if (thietHaiRowsHtml === "") {
                    thietHaiRowsHtml = `<tr><td colspan="4" style="border: 1px solid black; padding: 8px; text-align: center; font-style: italic;">Chua khai b·o m?c thi?t h?i n‡o</td></tr>`;
                }

                const needAdvance = document.getElementById('claimNeedAdvance').checked;
                const advTinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
                const advKhac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
                const advTotal = advTinhThan + advKhac;

                const needRestoreHonor = document.getElementById('claimNeedRestoreHonor').checked;
                const phddFormApology = document.getElementById('claimPhddFormApology').checked;
                const phddFormNews = document.getElementById('claimPhddFormNews').checked;

                const datePlace = document.getElementById('claimCreatePlace').value || "H‡ N?i";
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();

                let html = `<html>
                <head>
                    <title>M?u s? 01/BTNN: –on yÍu c?u b?i thu?ng</title>
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
                                <div>C?NG H“A X√ H?I CH? NGHIA VI?T NAM</div>
                                <div class="motto" style="text-decoration: none;">–?c l?p - T? do - H?nh ph˙c</div>
                            </div>
                            <div class="header-right">
                                <div style="font-size: 13px; font-style: italic;">M?u s? 01/BTNN (Ban h‡nh kËm theo ThÙng tu s? 04/2018/TT-BTP)</div>
                            </div>
                        </div>

                        <div class="title">
                            <div>–ON Y U C?U B?I THU?NG</div>
                            <div style="font-size: 14px; font-weight: normal; margin-top: 6px;">(D‡nh cho c· nh‚n, t? ch?c b? thi?t h?i)</div>
                        </div>

                        <div style="margin-left: 50px; margin-bottom: 25px;">
                            <span class="field-label">KÌnh g?i:</span> ${cqNhan}
                        </div>

                        <div class="section-title">I. ThÙng tin ngu?i yÍu c?u b?i thu?ng</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">1. H? v‡ tÍn ngu?i yÍu c?u:</span> ${name}</div>
                            <div><span class="field-label">2. Ng‡y, th·ng, nam sinh:</span> ${birth} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field-label">Gi?i tÌnh:</span> ${gender}</div>
                            <div><span class="field-label">3. Tu c·ch yÍu c?u b?i thu?ng:</span> ${role}</div>
                            <div><span class="field-label">4. Gi?y t? th‚n nh‚n:</span> ${cardType} s? ${cardNo} &nbsp;&nbsp;&nbsp; Ng‡y c?p: ${cardDate} &nbsp;&nbsp;&nbsp; Noi c?p: ${cardPlace}</div>
                            <div><span class="field-label">5. S? di?n tho?i:</span> ${phone} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field-label">Email:</span> ${email}</div>
                            <div><span class="field-label">6. –?a ch? cu tr˙/Tr? s?:</span> ${address}, T?nh/Th‡nh: ${city}, Qu?c gia: ${country}</div>
                        </div>

                        <div class="section-title">II. H‡nh vi g‚y thi?t h?i v‡ m?i quan h? nh‚n qu?</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">1. H‡nh vi g‚y thi?t h?i c?a ngu?i thi h‡nh cÙng v?:</span></div>
                            <div style="margin-left: 15px; font-style: italic; background-color:#f8fafc; padding: 8px; border-radius:4px; border:1px solid #e2e8f0;">${hanhVi}</div>
                            
                            <div style="margin-top: 8px;"><span class="field-label">2. M?i quan h? nh‚n qu? gi?a thi?t h?i v‡ h‡nh vi tr·i ph·p lu?t:</span></div>
                            <div style="margin-left: 15px; font-style: italic; background-color:#f8fafc; padding: 8px; border-radius:4px; border:1px solid #e2e8f0;">${nhanQua}</div>

                            <div style="margin-top: 8px;"><span class="field-label">3. Van b?n l‡m can c? yÍu c?u b?i thu?ng:</span> ${docBase}</div>
                        </div>

                        <div class="section-title">III. C·c m?c thi?t h?i yÍu c?u b?i thu?ng</div>
                        <table>
                            <thead>
                                <tr>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9; width: 60px;">STT</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9;">M?c thi?t h?i yÍu c?u</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9;">C·ch tÌnh chi ti?t</th>
                                    <th style="border: 1px solid black; padding: 8px; background-color: #f1f5f9; width: 150px;">S? ti?n (d?ng)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${thietHaiRowsHtml}
                                <tr style="background-color: #f8fafc; font-weight: bold;">
                                    <td colspan="3" style="border: 1px solid black; padding: 8px; text-align: right;">T?NG C?NG TI?N Y U C?U B?I THU?NG:</td>
                                    <td style="border: 1px solid black; padding: 8px; text-align: right; color:#ef4444;">${total.toLocaleString('vi-VN')} d</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="font-style: italic; margin-top: 4px;"><span class="field-label">Vi?t b?ng ch?:</span> ${numberToVietnameseWords(total)}</div>

                        <div class="section-title">IV. –? ngh? t?m ?ng kinh phÌ b?i thu?ng</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">–? ngh? t?m ?ng kinh phÌ:</span> ${needAdvance ? "C”" : "KH‘NG"}</div>
                            ${needAdvance ? `<div>- S? ti?n d? ngh? t?m ?ng: <strong style="color:#1e3a8a;">${advTotal.toLocaleString('vi-VN')} d</strong> (Vi?t b?ng ch?: ${numberToVietnameseWords(advTotal)})</div>` : ''}
                        </div>

                        <div class="section-title">V. YÍu c?u ph?c h?i danh d? (–i?u 57)</div>
                        <div style="margin-top: 8px;">
                            <div><span class="field-label">YÍu c?u Nh‡ nu?c t? ch?c ph?c h?i danh d?:</span> ${needRestoreHonor ? "C”" : "KH‘NG"}</div>
                            ${needRestoreHonor ? `
                                <div style="margin-top: 4px; margin-left: 15px;">
                                    <div>- <span class="field-label">HÏnh th?c d? ngh? ph?c h?i danh d? mong mu?n (–i?u 56):</span> 
                                        ${[
                            phddFormApology ? "Tr?c ti?p xin l?i v‡ c?i chÌnh cÙng khai t?i noi cu tr˙ / tr? s? (–i?u 58)" : "",
                            phddFormNews ? "–ang b·o xin l?i v‡ c?i chÌnh cÙng khai (–i?u 59)" : ""
                        ].filter(Boolean).join(" v‡ ") || "Chua l?a ch?n"}
                                    </div>
                                </div>
                            ` : ""}
                        </div>

                        <div class="signature-section">
                            <div class="signature-box">
                                <div style="font-style: italic;">${datePlace}, ng‡y ${day} th·ng ${month} nam ${year}</div>
                                <div style="font-weight: bold; margin-top: 8px;">NGU?I L¿M –ON</div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">(K˝, ghi rı h? tÍn ho?c di?m ch?)</div>
                                <div style="margin-top: 60px; font-weight: bold; font-size:16px;">${name}</div>
                            </div>
                        </div>
                    </div>
                `;
                win.document.write(html);
                win.document.close();
            } else {
                let html = '<html><head><title>Xem t‡i li?u: ' + doc.file + '</title>';
                html += '<style>body { font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #f1f5f9; color: #1e293b; margin: 0; }';
                html += '.card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 500px; }';
                html += 'h1 { color: #0f766e; margin-bottom: 16px; font-size: 24px; }';
                html += 'p { color: #64748b; font-size: 15px; line-height: 1.6; }';
                html += '.btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; margin-top: 20px; }</style>';
                html += '</head><body><div class="card">';
                html += '<h1>Xem t‡i li?u mÙ ph?ng</h1>';
                html += '<p>TÍn t‡i li?u: <strong>' + doc.file + '</strong></p>';
                html += '<p>Th‡nh ph?n h? so: <strong>' + doc.name + '</strong></p>';
                html += '<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">';
                html += '<p style="font-size: 13px; font-style: italic;">H? th?ng dang mÙ ph?ng xem t?p dÌnh kËm. File th?c t? s? du?c t?i v‡ hi?n th? t?i d‚y.</p>';
                html += '<button onclick="window.close()" class="btn">–Ûng c?a s?</button>';
                html += '</div>';
                win.document.write(html);
                win.document.close();
            }
        }

        function downloadDocFile(idx) {
            const doc = currentDocsList[idx];
            if (doc && doc.file) {
                showToast("–ang t?i xu?ng t‡i li?u: " + doc.file, "success");
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
                showConfirmModal("B?n cÛ ch?c ch?n mu?n xÛa t?p dÌnh kËm: " + oldFile + " khÙng?", () => {
                    currentDocsList[idx].file = null;
                    renderDocsTable();
                    showToast("–„ g? b? t?p tin dÌnh kËm: " + oldFile, "info");
                });
            }
        }

        function deleteDocRow(idx) {
            if (currentDocsList[idx]) {
                const name = currentDocsList[idx].name || ("T‡i li?u " + (idx + 1));
                showConfirmModal("B?n cÛ ch?c ch?n mu?n xÛa th‡nh ph?n h? so: " + name + " khÙng?", () => {
                    currentDocsList.splice(idx, 1);
                    renderDocsTable();
                    showToast("–„ xÛa th‡nh ph?n h? so: " + name, "info");
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
            showToast("–„ thÍm h‡ng t‡i li?u dÌnh kËm m?i!", "success");
        }

        function numberToVietnameseWords(number) {
            if (number === 0) return "KhÙng";
            const units = ["", "m?t", "hai", "ba", "b?n", "nam", "s·u", "b?y", "t·m", "chÌn"];
            const unitsTen = ["", "mu?i", "hai muoi", "ba muoi", "b?n muoi", "nam muoi", "s·u muoi", "b?y muoi", "t·m muoi", "chÌn muoi"];

            function readThreeDigits(n, isFirst) {
                let hundreds = Math.floor(n / 100);
                let tens = Math.floor((n % 100) / 10);
                let ones = n % 10;
                let res = "";

                if (hundreds > 0 || !isFirst) {
                    res += units[hundreds] + " tram ";
                }

                if (tens > 0) {
                    res += unitsTen[tens] + " ";
                } else if (hundreds > 0 && ones > 0) {
                    res += "l? ";
                }

                if (ones > 0) {
                    if (ones === 1 && tens > 1) {
                        res += "m?t";
                    } else if (ones === 5 && tens > 0) {
                        res += "lam";
                    } else {
                        res += units[ones];
                    }
                }
                return res.trim();
            }

            const bigUnits = ["", "nghÏn", "tri?u", "t?"];
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
            return words + " d?ng";
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
            const thulyVenue = document.getElementById('claimThulyVenue').value;
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
            const city = country === 'Vi?t Nam' ? document.getElementById('claimNYCCity').value : document.getElementById('claimNYCCityText').value.trim();
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
                    const el = country === 'Vi?t Nam' ? document.getElementById('claimNYCCity') : document.getElementById('claimNYCCityText');
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
                    const val = parseFloat(document.getElementById(`claimThietHaiVal_${i}`).value) || 0;
                    if (!isDraft && (!calc || val <= 0)) {
                        showToast(`Thi?u c·ch tÌnh ho?c s? ti?n cho m?c thi?t h?i du?c tÌch ch?n!`, "error");
                        return;
                    }
                    total += val;
                }
            }

            if (!isDraft && total === 0) {
                showToast("Vui lÚng tÌch ch?n v‡ nh?p t?i thi?u m?t lo?i thi?t h?i!", "error");
                return;
            }

            // T?m ?ng validations
            let adv = 0;
            if (document.getElementById('claimNeedAdvance').checked) {
                const tinhThan = parseFloat(document.getElementById('claimAdvanceTinhThan').value) || 0;
                const khac = parseFloat(document.getElementById('claimAdvanceKhacVal').value) || 0;
                adv = tinhThan + khac;
                if (!isDraft && adv > total) {
                    showToast("T?ng ti?n d? ngh? t?m ?ng khÙng du?c l?n hon t?ng ti?n yÍu c?u b?i thu?ng!", "error");
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
                nyc: name || "(Chua nh?p)",
                cardType: cardType,
                cardNo: cardNo,
                address: address,
                phone: phone,
                role: role,
                docBase: docBase || "Chua cÛ can c? chÌnh th?c",
                hanhVi: hanhVi || "H‡nh vi g‚y thi?t h?i chua tÛm t?t",
                nhanQua: nhanQua || "M?i quan h? nh‚n qu? chua mÙ t?",
                status: isDraft ? "Luu nh·p" : "Ch? ti?p nh?n",
                agency: cqNhan || "Chua ph‚n cÙng",
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
                    { title: "N?p h? so b?i thu?ng", date: todayStr, desc: isDraft ? "H? so luu nh·p h? th?ng" : "–„ n?p tr?c ti?p, ch? ti?p nh?n", status: "active" }
                ]
            });

            showToast(isDraft ? `Luu nh·p h? so b?i thu?ng ${newCode} th‡nh cÙng!` : `N?p h? so b?i thu?ng ${newCode} th‡nh cÙng!`, "success");
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
                ? `<i class="fa-solid fa-pen-to-square"></i> C?P NH?T TI?N TRÃNH H? SO: ${claim.code} - ${claim.nyc}`
                : `<i class="fa-solid fa-circle-info"></i> CHI TI?T H? SO V¿ TI?N TRÃNH GI?I QUY?T: ${claim.code} - ${claim.nyc}`;

            const editBtn = document.getElementById('detailEditBtn');
            const hasUpdateRights = ['Luu nh·p', 'YÍu c?u b? sung', '–ang x·c minh thi?t h?i', '–ang thuong lu?ng', 'Ch? ban h‡nh Q–', 'Ch? th?c thi'].includes(claim.status);

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
                "1. T‡i s?n b? x‚m ph?m",
                "2. Thu nh?p th?c t? b? m?t/gi?m s˙t",
                "3. V?t ch?t do ngu?i b? thi?t h?i ch?t",
                "4. V?t ch?t do s?c kh?e b? x‚m ph?m",
                "5. Thi?t h?i v? tinh th?n",
                "6. C·c chi phÌ h?p l˝ kh·c"
            ];

            items.forEach((itemText, idx) => {
                let val = 0;
                let calc = "KhÙng yÍu c?u";
                if (idx === 0 && claim.totalNum > 0) {
                    val = claim.totalNum;
                    calc = "TÌnh theo b?ng t? khai";
                }
                if (val > 0) {
                    thHtml += `<tr>
                            <td>${index++}</td>
                            <td><strong>${itemText}</strong></td>
                            <td>${calc}</td>
                            <td style="text-align:right; font-weight:600;">${val.toLocaleString('vi-VN')} d</td>
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
                    <div><strong>M„ yÍu c?u:</strong> ${claim.code}</div>
                    <div><strong>Linh v?c ph·t sinh:</strong> ${claim.fieldGroup}</div>
                    <div><strong>–on v? th? l˝:</strong> ${claim.agency}</div>
                </div>
                <div class="grid-3-cols" style="margin-bottom: 16px;">
                    <div><strong>H? v‡ tÍn ngu?i yÍu c?u:</strong> <span style="text-transform:uppercase; font-weight:600;">${claim.nyc}</span></div>
                    <div><strong>Tu c·ch tham gia:</strong> ${claim.role}</div>
                    <div><strong>S? di?n tho?i:</strong> ${claim.phone}</div>
                </div>
                <div style="margin-bottom: 16px;">
                    <strong>–?a ch? liÍn h?:</strong> ${claim.address}
                </div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
                    <p style="margin-bottom: 6px;"><strong>H‡nh vi g‚y thi?t h?i:</strong> ${claim.hanhVi}</p>
                    <p><strong>M?i quan h? nh‚n qu?:</strong> ${claim.nhanQua}</p>
                </div>
                
                <div style="font-weight: 700; margin-bottom: 8px; color: var(--primary-light);">C¡C M?C THI?T H?I –? NGH? B?I THU?NG:</div>
                <table class="custom-table" style="margin-bottom: 16px; border: 1px solid var(--border-color);">
                    <thead>
                        <tr style="background-color:var(--table-header-bg);">
                            <th style="width: 50px;">STT</th>
                            <th>M?c thi?t h?i</th>
                            <th>C·ch tÌnh chi ti?t</th>
                            <th style="width: 180px; text-align:right;">S? ti?n d? ngh?</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${thHtml}
                        <tr style="font-weight:700; background:#f8fafc;">
                            <td colspan="3" style="text-align:right;">T?NG C?NG:</td>
                            <td style="text-align:right; color:var(--danger-color); font-size:14px;">${total.toLocaleString('vi-VN')} d?ng</td>
                        </tr>
                    </tbody>
                </table>

                <div class="grid-2-cols" style="margin-bottom:16px;">
                    <div><strong>YÍu c?u t?m ?ng kinh phÌ:</strong> ${claim.advanceNum > 0 ? `<span style="font-weight:600; color:var(--accent-hover);">${claim.advanceNum.toLocaleString('vi-VN')} d (${claim.advanceRecKenh})</span>` : 'KhÙng d? ngh?'}</div>
                    <div><strong>YÍu c?u Ph?c h?i danh d?:</strong> ${claim.restoreHonor ? 'CÛ tÌch ch?n yÍu c?u ph?c h?i danh d?' : 'KhÙng'}</div>
                </div>
                
                <div style="margin-bottom: 12px;"><strong>T‡i li?u h? so dÌnh kËm:</strong></div>
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
            if (claim.restoreHonor && (claim.status === 'Ch? th?c thi' || claim.status === 'Ho‡n th‡nh')) {
                phddTabBtn.style.display = 'block';
            } else {
                phddTabBtn.style.display = 'none';
            }

            // 1. Th? l˝
            document.getElementById('detThulyKenh').value = claim.fieldGroup === 'h‡nh chÌnh' ? 'M?t c?a tr?c ti?p' : '–?ng b? h? th?ng';
            document.getElementById('detThulyDate').value = claim.date;
            document.getElementById('detThulyHan').value = claim.deadline;
            document.getElementById('detThulyAgency').value = claim.agency;
            document.getElementById('detThulyStatus').value = claim.status === 'Luu nh·p' ? '–ang luu nh·p' : '–„ th? l˝ chÌnh th?c';

            // 2. YÍu c?u b? sung
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
                bsRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">KhÙng cÛ yÍu c?u b? sung h? so</div>`;
            }

            // 3. X·c minh
            const xmRead = document.getElementById('xacminhReadBlock');
            const xmEdit = document.getElementById('xacminhEditBlock');
            xmRead.innerHTML = '';
            xmEdit.style.display = 'none';

            if (claim.status === '–ang x·c minh thi?t h?i' && isDetailEditMode) {
                xmEdit.style.display = 'block';
                const xmTable = document.getElementById('editXacMinhTableBody');
                xmTable.innerHTML = `<tr>
                        <td>1</td>
                        <td>T‡i s?n b? x‚m ph?m</td>
                        <td style="text-align:right;">${claim.totalNum.toLocaleString('vi-VN')} d</td>
                        <td><input type="number" class="form-control" style="text-align:right; font-weight:600;" id="editXmVal1" value="${claim.totalNum}"></td>
                        <td><input type="text" class="form-control" id="editXmNote1" value="X·c minh d˙ng gi· tr? th?c t?"></td>
                    </tr>`;
                document.getElementById('editXacMinhOtherRestore').value = claim.otherRestore || '';
            } else {
                if (claim.xmTotalAmount !== undefined || ['–ang thuong lu?ng', 'Thuong lu?ng khÙng th‡nh cÙng', 'Ch? ban h‡nh Q–', 'Ch? th?c thi', 'Ho‡n th‡nh'].includes(claim.status)) {
                    xmRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>T?ng ti?n b?i thu?ng x·c minh:</strong> <span style="font-weight:600; color:var(--danger-color);">${(claim.xmTotalAmount || claim.totalNum).toLocaleString('vi-VN')} d</span></p>
                            <p><strong>KhÙi ph?c quy?n l?i kh·c:</strong> ${claim.otherRestore || 'KhÙng cÛ'}</p>
                            <p><strong>Phuong th?c chi tr? x·c d?nh:</strong> ${claim.advanceRecKenh === 'tien-mat' ? 'Nh?n ti?n m?t' : 'Chuy?n kho?n'}</p>
                            <p><strong>B·o c·o x·c minh:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-file-pdf"></i> Bao_cao_xac_minh_so_12.pdf</a></p>
                        </div>`;
                } else {
                    xmRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chua ti?n h‡nh x·c minh thi?t h?i</div>`;
                }
            }

            // 4. Thuong lu?ng
            const tlRead = document.getElementById('thuongluongReadBlock');
            const tlEdit = document.getElementById('thuongluongEditBlock');
            tlRead.innerHTML = '';
            tlEdit.style.display = 'none';

            if (claim.status === '–ang thuong lu?ng' && isDetailEditMode) {
                tlEdit.style.display = 'block';
                document.getElementById('editTlTimeExp').value = claim.tlTimeExp || "";
                document.getElementById('editTlVenueExp').value = claim.tlVenueExp || "";
                document.getElementById('editTlMembersExp').value = claim.tlMembersExp || "";
                document.getElementById('editTlTimeAct').value = new Date().toLocaleString('vi-VN');
                document.getElementById('editTlVenueAct').value = claim.tlVenueExp || "";
                document.getElementById('editTlMembersAct').value = claim.tlMembersExp || "";
                document.getElementById('editTlDesc').value = "";
            } else {
                if (claim.tlResult || ['Ch? ban h‡nh Q–', 'Ch? th?c thi', 'Ho‡n th‡nh'].includes(claim.status)) {
                    tlRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>K?t qu? h?p thuong lu?ng:</strong> <span style="font-weight:700; color:var(--success-color);">${claim.tlResult || "Thuong lu?ng th‡nh cÙng"}</span></p>
                            <p><strong>Th?i gian th?c t?:</strong> ${claim.tlTimeAct || "08/07/2026 09:00"}</p>
                            <p><strong>–?a di?m th?c t?:</strong> ${claim.tlVenueAct || "PhÚng h?p S? Tu ph·p"}</p>
                            <p><strong>BiÍn b?n h?p thuong lu?ng:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-file-pdf"></i> Bien_ban_thuong_luong_co_chu_ky.pdf</a></p>
                        </div>`;
                } else {
                    tlRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chua ti?n h‡nh h?p thuong lu?ng gi?i quy?t</div>`;
                }
            }

            // 5. Quy?t d?nh b?i thu?ng
            const qdRead = document.getElementById('quyetdinhReadBlock');
            const qdEdit = document.getElementById('quyetdinhEditBlock');
            qdRead.innerHTML = '';
            qdEdit.style.display = 'none';

            if (claim.status === 'Ch? ban h‡nh Q–' && isDetailEditMode) {
                qdEdit.style.display = 'block';
                document.getElementById('decAmountInput').value = claim.xmTotalAmount || claim.totalNum;
                document.getElementById('decDateInput').value = new Date().toLocaleDateString('vi-VN');
                document.getElementById('decNoInput').value = '';
                document.getElementById('decContentInput').value = `Quy?t d?nh b?i thu?ng thi?t h?i v?t ch?t s? ti?n ${(claim.xmTotalAmount || claim.totalNum).toLocaleString('vi-VN')}d cho Ùng/b‡ ${claim.nyc}`;
            } else {
                if (claim.decNo || ['Ch? th?c thi', 'Ho‡n th‡nh'].includes(claim.status)) {
                    qdRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>S? Quy?t d?nh b?i thu?ng:</strong> <span style="font-weight:700; color:var(--primary-hover);">${claim.decNo || "104/Q–-BT"}</span></p>
                            <p><strong>Ng‡y ban h‡nh:</strong> ${claim.decDate || "02/04/2026"}</p>
                            <p><strong>S? ti?n quy?t d?nh b?i thu?ng:</strong> <span style="font-weight:700; color:var(--danger-color);">${(claim.decAmount || claim.totalNum).toLocaleString('vi-VN')} d</span></p>
                            <p><strong>T‡i li?u Quy?t d?nh g?c:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-file-pdf"></i> Quyet_dinh_boi_thuong_da_ky.pdf</a></p>
                        </div>`;
                } else {
                    qdRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chua ban h‡nh Quy?t d?nh gi?i quy?t b?i thu?ng chÌnh th?c</div>`;
                }
            }

            // 6. Th?c thi Quy?t d?nh
            const ttRead = document.getElementById('thucthiReadBlock');
            const ttEdit = document.getElementById('thucthiEditBlock');
            ttRead.innerHTML = '';
            ttEdit.style.display = 'none';

            if (claim.status === 'Ch? th?c thi' && isDetailEditMode) {
                ttEdit.style.display = 'block';
                document.getElementById('thucthiDateInput').value = new Date().toLocaleDateString('vi-VN');
                document.getElementById('thucthiNoteInput').value = '';
            } else {
                if (claim.status === 'Ho‡n th‡nh') {
                    ttRead.innerHTML = `
                        <div style="font-size:13px; line-height:1.6;">
                            <p><strong>Ng‡y chi tr? th?c t?:</strong> ${claim.thucthiDate || "20/07/2026"}</p>
                            <p><strong>Ch?ng t? thanh to·n:</strong> <a href="#" target="_blank" class="action-link view-link"><i class="fa-solid fa-receipt"></i> Chung_tu_chi_tien_uy_nhiem_chi.pdf</a></p>
                            <p><strong>Ghi ch˙:</strong> ${claim.thucthiNote || "–„ nh?n ti?n d?y d? qua chuy?n kho?n ng‚n h‡ng."}</p>
                        </div>`;
                } else {
                    ttRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Chua th?c thi chi tr? b?i thu?ng</div>`;
                }
            }

            // 7. Kinh phÌ b?i thu?ng
            const kpRead = document.getElementById('kinhphiReadBlock');
            kpRead.innerHTML = '';
            if (claim.advanceNum > 0) {
                kpRead.innerHTML = `
                    <div style="font-size:13px; line-height:1.6;">
                        <p><strong>S? ti?n d? ngh? t?m ?ng tinh th?n:</strong> ${claim.advanceNum.toLocaleString('vi-VN')} d</p>
                        <p><strong>Tr?ng th·i t?m ?ng:</strong> <span class="badge badge-success">–„ c?p ph·t t?m ?ng</span> (BiÍn nh?n chi: BiÍn_lai_t?m_?ng.pdf)</p>
                    </div>`;
            } else {
                kpRead.innerHTML = `<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">H? so n‡y khÙng cÛ d? ngh? t?m ?ng kinh phÌ b?i thu?ng</div>`;
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
            if (claim.status === 'Ch? ti?p nh?n' || claim.status === 'Ch? th? l˝') {
                forceOpenAccordion('thuly');
            } else if (claim.status === 'YÍu c?u b? sung') {
                forceOpenAccordion('bosung');
                if (isDetailEditMode) {
                    bsEdit.style.display = 'block';
                }
            } else if (claim.status === '–ang x·c minh thi?t h?i') {
                forceOpenAccordion('xacminh');
            } else if (claim.status === '–ang thuong lu?ng') {
                forceOpenAccordion('thuongluong');
            } else if (claim.status === 'Ch? ban h‡nh Q–') {
                forceOpenAccordion('quyetdinh');
            } else if (claim.status === 'Ch? th?c thi') {
                forceOpenAccordion('thucthi');
            } else if (claim.status === 'Ho‡n th‡nh') {
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
                    html += ` <a href="javascript:void(0)" class="action-link" style="color: #ef4444; font-size: 12.5px; font-weight: 600;" onclick="removePhddStepFile(${step})">X√≥a</a>`;
                }
                wrapper.innerHTML = html;
            } else {
                if (isEdit) {
                    wrapper.innerHTML = `
                        <label class="btn-brown" style="cursor: pointer; padding: 6px 12px; font-size: 13px; margin: 0;">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Ch·ªçn t·ªáp ƒë√≠nh k√®m
                            <input type="file" style="display: none;" onchange="handlePhddStepFile(${step}, this)">
                        </label>
                        <span style="font-size: 13px; color: #64748b; font-style: italic;">Ch∆∞a c√≥ t·ªáp ƒë√≠nh k√®m</span>
                    `;
                } else {
                    wrapper.innerHTML = `<span style="font-size: 13px; color: #94a3b8; font-style: italic;">Kh√¥ng c√≥ t√†i li·ªáu ƒë√≠nh k√®m</span>`;
                }
            }
        }

        function removePhddStepFile(step) {
            showConfirmModal("B·∫°n c√≥ ch·∫Øc ch·∫Øn mu·ªën g·ª° t·ªáp ƒë√≠nh k√®m n√†y kh√¥ng?", () => {
                setPhddStepFile(step, null);
                showToast("ƒê√£ g·ª° t·ªáp ƒë√≠nh k√®m th√†nh c√¥ng!", "info");
            });
        }

        function viewPhddMockFile(fileName) {
            const win = window.open("", "_blank");
            win.document.write(`<html><head><title>Xem t√†i li·ªáu: ${fileName}</title>
            <style>body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f1f5f9; margin: 0; }
            .card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 500px; }</style>
            </head><body><div class="card">
            <h1 style="color: #0f766e; font-size: 22px;">Xem t√†i li·ªáu ƒë√≠nh k√®m</h1>
            <p>T√™n t√†i li·ªáu: <strong>${fileName}</strong></p>
            <p style="font-style: italic; color: #64748b; font-size: 13px; line-height:1.6;">H·ªá th·ªëng ƒëang m√¥ ph·ªèng xem t·ªáp ƒë√≠nh k√®m. File th·ª±c t·∫ø s·∫Ω ƒë∆∞·ª£c hi·ªÉn th·ªã t·∫°i ƒë√¢y.</p>
            <button onclick="window.close()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top:15px;">ƒê√≥ng c·ª≠a s·ªï</button>
            </div></body></html>`);
            win.document.close();
        }

        function toggleStep3FormInputs(val) {
            const direct = document.getElementById('editPhddStep3DirectGroup');
            const news = document.getElementById('editPhddStep3NewsGroup');
            if (val === 'Tr·ª±c ti·∫øp xin l·ªói') {
                direct.style.display = 'block';
                news.style.display = 'none';
            } else if (val === 'ƒêƒÉng b√°o xin l·ªói') {
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
                s1Badge.innerText = "ƒê√£ th√¥ng b√°o ch·ªß ƒë·ªông";
            } else {
                s1Badge.className = "badge bg-teal";
                s1Badge.innerText = "ƒêang th·ª±c hi·ªán";
            }

            // Step 2 Badge
            const s2Badge = document.getElementById('phddStep2Badge');
            if (claim.phddStep2Opinion) {
                s2Badge.className = "badge bg-success";
                s2Badge.innerText = "ƒê√£ ph·∫£n h·ªìi: " + claim.phddStep2Opinion;
            } else {
                s2Badge.className = "badge bg-secondary";
                s2Badge.innerText = "Ch·ªù c·∫≠p nh·∫≠t √Ω ki·∫øn";
            }

            // Step 3 Badge
            const s3Badge = document.getElementById('phddStep3Badge');
            if (claim.phddStep3No && claim.phddStep3Date) {
                s3Badge.className = "badge bg-success";
                s3Badge.innerText = "ƒê√£ th√¥ng b√°o t·ªï ch·ª©c";
            } else {
                s3Badge.className = "badge bg-secondary";
                s3Badge.innerText = "Ch·ªù c·∫≠p nh·∫≠t l·ªãch";
            }

            // Step 4 Badge
            const s4Badge = document.getElementById('phddStep4Badge');
            if (claim.phddStep4DateAct) {
                s4Badge.className = "badge bg-success";
                s4Badge.innerText = "Ho√†n th√†nh th·ª±c thi";
            } else {
                s4Badge.className = "badge bg-secondary";
                s4Badge.innerText = "Ch·ªù c·∫≠p nh·∫≠t k·∫øt qu·∫£";
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
                    document.getElementById('phddDemandStatus').innerHTML = '<span class="badge bg-success">C√ì ƒê·ªÄ NGH·ªä PHDD</span>';

                    const forms = [];
                    if (claim.phddFormApology !== false) forms.push("Tr·ª±c ti·∫øp xin l·ªói (ƒêi·ªÅu 58)");
                    if (claim.phddFormNews) forms.push("ƒêƒÉng b√°o xin l·ªói (ƒêi·ªÅu 59)");
                    document.getElementById('phddDemandFormsText').innerText = forms.join(" v√† ") || "Ch∆∞a l·ª±a ch·ªçn h√¨nh th·ª©c";
                }
            } else {
                if (demandBox) {
                    demandBox.style.display = 'block';
                    document.getElementById('phddDemandStatus').innerHTML = '<span class="badge bg-secondary">KH√îNG ƒê·ªÄ NGH·ªä PHDD</span>';
                    document.getElementById('phddDemandFormsText').innerText = "--";
                }
            }

            // Step 1 values (UC434)
            document.getElementById('editPhddStep1No').value = claim.phddStep1No || "";
            document.getElementById('editPhddStep1Date').value = claim.phddStep1Date || "";
            document.getElementById('editPhddStep1Signer').value = claim.phddStep1Signer || "";
            phddStepFileNames[1] = claim.phddStep1File || null;

            // Step 2 values (UC436)
            const step2Opinion = claim.phddStep2Opinion || "ƒê·ªìng √Ω";
            const step2Radios = document.getElementsByName('editPhddStep2Opinion');
            step2Radios.forEach(radio => {
                radio.checked = (radio.value === step2Opinion);
            });
            document.getElementById('editPhddStep2OpinionText').value = claim.phddStep2OpinionText || "";
            phddStepFileNames[2] = claim.phddStep2File || null;

            // Step 3 values (UC435)
            document.getElementById('editPhddStep3No').value = claim.phddStep3No || "";
            document.getElementById('editPhddStep3Date').value = claim.phddStep3Date || "";

            let suggestedType = "Tr·ª±c ti·∫øp xin l·ªói";
            if (claim.phddFormApology !== false && claim.phddFormNews) {
                suggestedType = "C·∫£ hai h√¨nh th·ª©c";
            } else if (claim.phddFormNews) {
                suggestedType = "ƒêƒÉng b√°o xin l·ªói";
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
            const canEdit = isDetailEditMode && (claim.status === 'Ch·ªù th·ª±c thi' || claim.status === 'ƒêang th∆∞∆°ng l∆∞·ª£ng' || claim.status === 'ƒêang x√°c minh thi·ªát h·∫°i' || claim.status === 'Ch·ªù th·ª• l√Ω');

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
            showToast("ƒê√£ h·ªßy b·ªè c·∫≠p nh·∫≠t th√¥ng tin!", "info");
        }

        function submitBoSungUpdate() {
            const content = document.getElementById('editBoSungContent').value.trim();
            if (!content) {
                showToast("Vui l√≤ng nh·∫≠p n·ªôi dung ƒë√£ b·ªï sung!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.status = 'Ch·ªù ti·∫øp nh·∫≠n';
                if (!claim.bosungLogs) claim.bosungLogs = [];
                claim.bosungLogs.push({
                    date: new Date().toLocaleDateString('vi-VN'),
                    sender: "Ng∆∞·ªùi d√¢n b·ªï sung",
                    content: "B·ªï sung h·ªì s∆° th√†nh c√¥ng: " + content
                });

                claim.timeline.push({
                    title: "B·ªï sung h·ªì s∆°",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "Ng∆∞·ªùi d√¢n ƒë√£ b·ªï sung h·ªì s∆°. Tr·∫°ng th√°i quay l·∫°i [Ch·ªù ti·∫øp nh·∫≠n]",
                    status: "completed"
                });

                showToast("ƒê√£ c·∫≠p nh·∫≠t k·∫øt qu·∫£ b·ªï sung. H·ªì s∆° chuy·ªÉn sang [Ch·ªù ti·∫øp nh·∫≠n]!", "success");
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitXacMinhUpdate() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                const val = parseFloat(document.getElementById('editXmVal1').value) || 0;
                const note = document.getElementById('editXmNote1').value.trim();

                claim.status = 'ƒêang th∆∞∆°ng l∆∞·ª£ng';
                claim.xmTotalAmount = val;
                claim.otherRestore = document.getElementById('editXacMinhOtherRestore').value;

                claim.timeline.push({
                    title: "X√°c minh thi·ªát h·∫°i",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: `Ho√†n th√†nh b√°o c√°o x√°c minh thi·ªát h·∫°i th·ª±c t·∫ø. S·ªë ti·ªÅn x√°c ƒë·ªãnh: ${val.toLocaleString('vi-VN')}ƒë. Ghi ch√∫: ${note}`,
                    status: "completed"
                });

                claim.tlTimeExp = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString('vi-VN');
                claim.tlVenueExp = "Ph√≤ng h·ªçp c∆° quan gi·∫£i quy·∫øt b·ªìi th∆∞·ªùng";
                claim.tlMembersExp = "ƒê·∫°i di·ªán c∆° quan, √¥ng/b√† " + claim.nyc;

                showToast("Ho√†n th√†nh x√°c minh thi·ªát h·∫°i. H·ªì s∆° chuy·ªÉn sang [ƒêang th∆∞∆°ng l∆∞·ª£ng]!", "success");
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitTlDraftUpdate() {
            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.tlTimeExp = document.getElementById('editTlTimeExp').value;
                claim.tlVenueExp = document.getElementById('editTlVenueExp').value;
                claim.tlMembersExp = document.getElementById('editTlMembersExp').value;

                showToast("ƒê√£ l∆∞u nh√°p th√¥ng tin d·ª± ki·∫øn phi√™n th∆∞∆°ng l∆∞·ª£ng!", "success");
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
                    showToast("Vui l√≤ng ƒëi·ªÅn ƒë·ªß c√°c th√¥ng tin th·ª±c t·∫ø h·ªçp th∆∞∆°ng l∆∞·ª£ng c√≥ d·∫•u *!", "error");
                    return;
                }

                claim.tlTimeAct = time;
                claim.tlVenueAct = venue;
                claim.tlMembersAct = members;
                claim.tlResult = result;

                if (result === 'Th∆∞∆°ng l∆∞·ª£ng th√†nh c√¥ng') {
                    claim.status = 'Ch·ªù ban h√†nh Qƒê';
                    claim.timeline.push({
                        title: "Th∆∞∆°ng l∆∞·ª£ng b·ªìi th∆∞·ªùng",
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: "Th∆∞∆°ng l∆∞·ª£ng b·ªìi th∆∞·ªùng th√†nh c√¥ng. Chuy·ªÉn h·ªì s∆° sang [Ch·ªù ban h√†nh Qƒê]",
                        status: "completed"
                    });
                    showToast("Th∆∞∆°ng l∆∞·ª£ng th√†nh c√¥ng! H·ªì s∆° chuy·ªÉn sang [Ch·ªù ban h√†nh Qƒê]!", "success");
                } else {
                    claim.status = 'Th∆∞∆°ng l∆∞·ª£ng kh√¥ng th√†nh c√¥ng';
                    claim.timeline.push({
                        title: "Th∆∞∆°ng l∆∞·ª£ng b·ªìi th∆∞·ªùng",
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: "Th∆∞∆°ng l∆∞·ª£ng b·ªìi th∆∞·ªùng kh√¥ng th√†nh c√¥ng. K·∫øt th√∫c lu·ªìng gi·∫£i quy·∫øt h√†nh ch√≠nh.",
                        status: "completed"
                    });
                    showToast("Th∆∞∆°ng l∆∞·ª£ng th·∫•t b·∫°i. H·ªì s∆° chuy·ªÉn sang [Th∆∞∆°ng l∆∞·ª£ng kh√¥ng th√†nh c√¥ng]!", "info");
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
                showToast("Vui l√≤ng nh·∫≠p ƒë·∫ßy ƒë·ªß S·ªë Qƒê, Ng√†y Qƒê v√† S·ªë ti·ªÅn!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.decNo = no;
                claim.decDate = date;
                claim.decAmount = amount;
                claim.decContent = content;

                if (decStatus === 'Ch·ªù k√Ω') {
                    claim.status = 'Ch·ªù th·ª±c thi';
                    claim.timeline.push({
                        title: "Quy·∫øt ƒë·ªãnh gi·∫£i quy·∫øt b·ªìi th∆∞·ªùng",
                        date: new Date().toLocaleDateString('vi-VN'),
                        desc: `K√Ω duy·ªát v√† ban h√†nh Qƒê gi·∫£i quy·∫øt b·ªìi th∆∞·ªùng s·ªë ${no}. S·ªë ti·ªÅn: ${amount.toLocaleString('vi-VN')}ƒë`,
                        status: "completed"
                    });
                    showToast("Quy·∫øt ƒë·ªãnh ƒë√£ ƒë∆∞·ª£c duy·ªát k√Ω s·ªë th√†nh c√¥ng. H·ªì s∆° chuy·ªÉn sang [Ch·ªù th·ª±c thi]!", "success");
                } else {
                    showToast("ƒê√£ l∆∞u nh√°p d·ª± th·∫£o Quy·∫øt ƒë·ªãnh gi·∫£i quy·∫øt b·ªìi th∆∞·ªùng!", "info");
                }

                closeCreateDecisionForm();
                showCaseDetail(selectedClaimId, false);
            }
        }

        function submitThucThiUpdate() {
            const time = document.getElementById('thucthiDateInput').value.trim();
            const note = document.getElementById('thucthiNoteInput').value.trim();

            if (!time) {
                showToast("Vui l√≤ng ƒëi·ªÅn ng√†y chi tr·∫£ th·ª±c t·∫ø!", "error");
                return;
            }

            const claim = claimsList.find(c => c.id === selectedClaimId);
            if (claim) {
                claim.status = 'Ho√†n th√†nh';
                claim.thucthiDate = time;
                claim.thucthiNote = note || "ƒê√£ ho√†n th√†nh th·ª±c thi chi tr·∫£ b·ªìi th∆∞·ªùng.";

                claim.timeline.push({
                    title: "Th·ª±c thi gi·∫£i quy·∫øt b·ªìi th∆∞·ªùng",
                    date: new Date().toLocaleDateString('vi-VN'),
                    desc: "ƒê√£ ho√†n th√†nh chi tr·∫£ ti·ªÅn b·ªìi th∆∞·ªùng.",
                    status: "completed"
                });

                showToast("ƒê√£ ho√†n th√†nh th·ª±c thi h·ªì s∆° b·ªìi th∆∞·ªùng!", "success");
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
                errMsg.innerText = 'ƒê√¢y l√† tr∆∞·ªùng b·∫Øt bu·ªôc';
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
                errMsg.innerText = 'ƒê√¢y l√† tr∆∞·ªùng b·∫Øt bu·ªôc';
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

            const s2Opinion = document.querySelector('input[name="editPhddStep2Opinion"]:checked') ? document.querySelector('input[name="editPhddStep2Opinion"]:checked').value : 'ƒê·ªìng √Ω';
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
                if (s3Type === 'Tr·ª±c ti·∫øp xin l·ªói' || s3Type === 'C·∫£ hai h√¨nh th·ª©c') {
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

            showToast("L∆∞u th√¥ng tin ph·ª•c h·ªìi danh d·ª± th√†nh c√¥ng!", "success");
            showCaseDetail(selectedClaimId, false);
        }

        function exportExcelB() {
            showToast("K?t xu?t d? li?u th?ng kÍ ra file Excel th‡nh cÙng!", "success");
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
                showToast("T?i t?p dÌnh kËm lÍn th‡nh cÙng!", "success");
            }
        }

        function removeAttachedFile(inputId, infoDivId) {
            document.getElementById(inputId).value = '';
            document.getElementById(infoDivId).style.display = 'none';
            showToast("–„ g? t?p dÌnh kËm!", "info");
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
