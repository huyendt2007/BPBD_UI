/*
 * Hỏi đáp nghiệp vụ - quy tắc dùng chung cho trang hoi_dap_nghiep_vu.html và Bàn làm việc Lãnh đạo (dashboard_lanh_dao_btnn.html).
 * Căn cứ: SRS_BTNN_HoiDap_NghiepVu.md (Quy tắc chung 1, 2, 3, 12, 13); quyền theo Ma trận phân quyền BTNN mục Hỏi đáp (05_Phan_quyen_he_thong_BTNN.md#pq-hoi-dap).
 * Nguyên tắc phân quyền 13/11/2026 (phương án B):
 * - Câu hỏi lưu "đơn vị đang xử lý câu hỏi" (q.handlerUnit). Ở bước giao cho nhóm (Chờ Lãnh đạo Phòng duyệt, Chờ Lãnh đạo Sở duyệt, Chờ Lãnh đạo Cục phân công),
 *   người xử lý hiện tại là tài khoản được phân quyền tương ứng có đơn vị công tác đúng bằng đơn vị đang xử lý (không tính đơn vị trực thuộc); người thao tác trước được ghi nhận.
 * - Luồng không xét Chức vụ, Nhóm Lãnh đạo hay tên vai trò. Tên trạng thái, nút, nhãn lịch sử, thông báo giữ nguyên (người dùng quyết định 13/11/2026).
 * - Giả lập (chỉ mockup): quyền chức năng của tài khoản = quyền của vai trò mẫu do Quản trị hệ thống gán theo cột ✓ của Ma trận (vaiTroMau).
 * Yêu cầu nạp trước: btnn_luong_xu_ly.js (BTNN_WF), btnn_pham_vi_don_vi.js (BTNN_PHAMVI).
 */
(function (global) {
    if (global.BTNN_HD) return;
    const W = () => global.BTNN_WF || null;
    const PV = () => global.BTNN_PHAMVI || null;
    const BTP = 'BTP-01';
    // Đơn vị nhận câu hỏi theo nghiệp vụ (quy tắc 3): Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước
    const CUC = 'CĐK-01';

    const ST = {
        WAIT_PHONG_SO: 'Chờ Lãnh đạo Phòng duyệt',
        WAIT_SO: 'Chờ Lãnh đạo Sở duyệt',
        RETURNED: 'Bị trả lại',
        WAIT_CUC: 'Chờ Lãnh đạo Cục phân công',
        WAIT_PHONG: 'Chờ Lãnh đạo Phòng phân công',
        ANSWERING: 'Đang trả lời',
        ANSWERED: 'Đã trả lời'
    };
    const STATUS_ORDER = [ST.WAIT_PHONG_SO, ST.WAIT_SO, ST.RETURNED, ST.WAIT_CUC, ST.WAIT_PHONG, ST.ANSWERING, ST.ANSWERED];
    const SENT = [ST.WAIT_CUC, ST.WAIT_PHONG, ST.ANSWERING, ST.ANSWERED];
    // Khóa lưu giữ nguyên (không đổi tên trạng thái); dữ liệu cũ thiếu đơn vị đang xử lý được bổ sung khi đọc (ensureFields)
    const KEY = 'btnn_hoi_dap_nghiep_vu', VERSION = 'v4';
    const MSG_DA_XU_LY = 'Câu hỏi đã được xử lý bởi người khác. Danh sách đã được tải lại.'; // [MSG-ERR-BTNN-HDNV-001]

    // ---------- Quyền chức năng (Ma trận phân quyền BTNN - Hỏi đáp nghiệp vụ, STT 6.1.1 - 6.1.7) ----------
    const Q = { XEM: 'xem', THEM: 'them', SUA: 'sua', DUYET: 'duyet', PHAN_CONG: 'phanCong', TRA_LOI: 'traLoi', CAP_NHAT_TL: 'capNhatTraLoi' };
    const Q_NAME = {
        xem: 'Xem danh sách, Tìm kiếm, Xem chi tiết, Xem file, Tải file, Kết xuất Excel', them: 'Thêm mới, Trình câu hỏi', sua: 'Sửa, Trình lại, Xóa câu hỏi',
        duyet: 'Duyệt / Trả lại câu hỏi', phanCong: 'Phân công trả lời', traLoi: 'Trả lời câu hỏi', capNhatTraLoi: 'Cập nhật câu trả lời'
    };
    // Giả lập: quyền Quản trị hệ thống gán cho vai trò mẫu (cột ✓ của Ma trận)
    const QUYEN_VAI_TRO_MAU = {
        'STP-CB': [Q.XEM, Q.THEM, Q.SUA], 'STP-LĐP': [Q.XEM, Q.DUYET], 'STP-LĐĐV': [Q.XEM, Q.DUYET],
        'BTP-CB': [Q.XEM], 'BTP-LĐP': [Q.XEM], 'BTP-LĐĐV': [Q.XEM],
        'CỤC-CB': [Q.XEM, Q.TRA_LOI, Q.CAP_NHAT_TL], 'CỤC-LĐP': [Q.XEM, Q.PHAN_CONG], 'CỤC-LĐĐV': [Q.XEM, Q.PHAN_CONG],
        'UBND-CB': [Q.XEM], 'UBND-LĐP': [Q.XEM], 'UBND-LĐĐV': [Q.XEM]
    };
    // Quyền cần có để thao tác trên câu hỏi theo trạng thái (dòng Nút thao tác tại MH03)
    const QUYEN_THEO_TRANG_THAI = {
        [ST.RETURNED]: Q.SUA, [ST.WAIT_PHONG_SO]: Q.DUYET, [ST.WAIT_SO]: Q.DUYET,
        [ST.WAIT_CUC]: Q.PHAN_CONG, [ST.WAIT_PHONG]: Q.PHAN_CONG, [ST.ANSWERING]: Q.TRA_LOI
    };

    const me = () => (W() ? W().getCurrentUser() : null) || { id: 'canbonv', name: 'Nguyễn Văn Cán Bộ', unitId: 'PLN-02', title: 'Chuyên viên' };
    const getUser = id => (W() && W().getUser ? W().getUser(id) : null);
    const userName = id => (W() && W().userName ? W().userName(id) : id) || id || '';
    const unitName = id => (PV() && PV().unitName(id)) || (W() && W().unitName ? W().unitName(id) : id) || '';
    const unitOf = id => ((getUser(id) || {}).unitId) || '';
    const dangHoatDong = u => !!u && u.trangThai !== 'Ngừng hoạt động';

    // Giả lập vai trò mẫu của tài khoản (Quản trị hệ thống gán tại Quản lý vai trò): xác định theo cây đơn vị và Nhóm Lãnh đạo.
    // Chỉ dùng để giả lập việc gán quyền; luồng xử lý chỉ đọc quyền chức năng (quyen / coQuyen).
    function vaiTroMau(u) {
        const w = W(), pv = PV();
        if (!u || !w || !pv) return '';
        const chain = w.getAncestors ? w.getAncestors(u.unitId) : [u.unitId];
        const root = chain[chain.length - 1] || u.unitId;
        let cap = '', goc = '';
        if (chain.includes(CUC)) { cap = 'CỤC'; goc = CUC; }
        else if (root === BTP) { cap = 'BTP'; goc = BTP; }
        else if (pv.stpOf(u.unitId)) { cap = 'STP'; goc = pv.stpOf(u.unitId); }
        else if (((w.getUnit && w.getUnit(root)) || {}).loaiCoQuan === 'UBND cấp Tỉnh/Thành phố' || pv.managedStps(root).length) { cap = 'UBND'; goc = root; }
        else return '';
        const lanhDao = w.isNhomLanhDaoUser ? w.isNhomLanhDaoUser(u.id) : false;
        return cap + '-' + (!lanhDao ? 'CB' : (u.unitId === goc ? 'LĐĐV' : 'LĐP'));
    }
    function quyen(u) { return QUYEN_VAI_TRO_MAU[vaiTroMau(u || me())] || []; }
    function coQuyen(q, u) { return quyen(u).includes(q); }
    // Người dùng chỉ có quyền xem (không có quyền thao tác nào của Hỏi đáp nghiệp vụ)
    function chiXem(u) { return !quyen(u).some(q => q !== Q.XEM); }
    // Tài khoản đang hoạt động được phân quyền perm, có đơn vị công tác thuộc danh sách unitIds (đúng đơn vị, không tính đơn vị trực thuộc)
    function nguoiCoQuyen(perm, unitIds) {
        return (W() ? W().USERS : []).filter(u => dangHoatDong(u) && unitIds.includes(u.unitId) && coQuyen(perm, u));
    }

    // ---------- Định dạng thời gian ----------
    const p2 = x => String(x).padStart(2, '0');
    const fmtDate = d => `${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}`;
    const fmtTime = d => `${p2(d.getHours())}:${p2(d.getMinutes())} ${fmtDate(d)}`;
    const ago = (days, h) => { const d = new Date(); d.setDate(d.getDate() - days); d.setHours(h || 9, 0, 0, 0); return d; };
    const H = (days, h, by, action, note) => ({ at: fmtTime(ago(days, h)), by, action, note: note || '' });

    // ---------- Dữ liệu mẫu ----------
    function buildSeed() {
        const y = new Date().getFullYear();
        return [
            {
                code: `HD-${y}-001`, unit: 'STP-HN', creator: 'cv_hn1', topic: 'Xác định cơ quan giải quyết bồi thường',
                title: 'Xác định cơ quan giải quyết bồi thường khi người thi hành công vụ đã chuyển công tác',
                content: 'Người thi hành công vụ gây thiệt hại đã chuyển công tác sang cơ quan khác trước khi có văn bản làm căn cứ yêu cầu bồi thường. Đề nghị Bộ Tư pháp hướng dẫn cơ quan nào là cơ quan giải quyết bồi thường trong trường hợp này.',
                legal: 'Điều 33 đến Điều 39 Luật Trách nhiệm bồi thường của Nhà nước', files: ['CV_STP_HN_de_nghi_huong_dan.pdf'],
                status: ST.ANSWERED, sentAt: fmtDate(ago(20)), phongLead: 'tpbt', officer: 'hatt',
                answer: { content: 'Cơ quan giải quyết bồi thường là cơ quan trực tiếp quản lý người thi hành công vụ tại thời điểm thực hiện hành vi gây thiệt hại. Trường hợp cơ quan đó đã giải thể hoặc sáp nhập thì xác định theo quy định về kế thừa quyền, nghĩa vụ.', files: ['CV_BTP_tra_loi_HD-001.pdf'], by: 'hatt', at: fmtTime(ago(8, 15)) },
                history: [H(21, 10, 'cv_hn1', 'Trình Lãnh đạo Phòng'), H(21, 15, 'tp_hctp_hn', 'Duyệt, trình Lãnh đạo Sở'), H(20, 14, 'gdso_hn', 'Duyệt, gửi Bộ Tư pháp'), H(19, 9, 'cuctruong', 'Phân công Lãnh đạo Phòng', 'Giao Trần Văn Bồi Thường'), H(18, 10, 'tpbt', 'Phân công Chuyên viên', 'Giao Trần Thị Thu Hà'), H(8, 15, 'hatt', 'Gửi trả lời')]
            },
            {
                code: `HD-${y}-002`, unit: 'STP-HCM', creator: 'cv_hcm1', topic: 'Kinh phí bồi thường',
                title: 'Tạm ứng kinh phí bồi thường khi chưa có quyết định giải quyết bồi thường',
                content: 'Người bị thiệt hại đề nghị tạm ứng kinh phí trong quá trình xác minh thiệt hại. Đề nghị hướng dẫn hồ sơ đề nghị tạm ứng và mức tạm ứng tối đa.',
                legal: 'Điều 44 Luật Trách nhiệm bồi thường của Nhà nước', files: [],
                status: ST.ANSWERING, sentAt: fmtDate(ago(6)), phongLead: 'tpbt', officer: 'canbonv',
                history: [H(7, 9, 'cv_hcm1', 'Trình Lãnh đạo Sở'), H(6, 11, 'gdso_hcm', 'Duyệt, gửi Bộ Tư pháp'), H(5, 9, 'cucpho', 'Phân công Lãnh đạo Phòng', 'Giao Trần Văn Bồi Thường'), H(4, 14, 'tpbt', 'Phân công Chuyên viên', 'Giao Nguyễn Văn Cán Bộ')]
            },
            {
                code: `HD-${y}-003`, unit: 'STP-HP', creator: 'cv_hp1', topic: 'Trách nhiệm hoàn trả',
                title: 'Xác định mức hoàn trả khi nhiều người thi hành công vụ cùng gây thiệt hại',
                content: 'Vụ việc có 03 người thi hành công vụ cùng gây thiệt hại với mức độ lỗi khác nhau. Đề nghị hướng dẫn cách xác định mức hoàn trả của từng người.',
                legal: 'Điều 65 Luật Trách nhiệm bồi thường của Nhà nước', files: ['Ho_so_vu_viec_HP.pdf'],
                status: ST.WAIT_PHONG, sentAt: fmtDate(ago(3)), phongLead: 'tpbt',
                history: [H(4, 9, 'cv_hp1', 'Trình Lãnh đạo Sở'), H(3, 10, 'gdso_hp', 'Duyệt, gửi Bộ Tư pháp'), H(2, 9, 'cuctruong', 'Phân công Lãnh đạo Phòng', 'Giao Trần Văn Bồi Thường')]
            },
            {
                code: `HD-${y}-004`, unit: 'STP-HN', creator: 'cv_hn2', topic: 'Báo cáo, thống kê',
                title: 'Cách thống kê vụ việc chuyển tiếp từ kỳ báo cáo trước',
                content: 'Đề nghị hướng dẫn cách thống kê các vụ việc đã thụ lý ở kỳ trước nhưng chưa giải quyết xong vào Mẫu số 03 kỳ này.',
                legal: '', files: [],
                status: ST.WAIT_CUC, sentAt: fmtDate(ago(1)),
                history: [H(3, 15, 'cv_hn2', 'Trình Lãnh đạo Phòng'), H(2, 9, 'tp_hctp_hn', 'Duyệt, trình Lãnh đạo Sở'), H(1, 9, 'gdso_hn', 'Duyệt, gửi Bộ Tư pháp')]
            },
            {
                code: `HD-${y}-005`, unit: 'STP-HN', creator: 'cv_hn1', topic: 'Tiếp nhận hồ sơ yêu cầu bồi thường',
                title: 'Tiếp nhận hồ sơ yêu cầu bồi thường gửi qua dịch vụ bưu chính thiếu thành phần',
                content: 'Hồ sơ gửi qua bưu chính thiếu bản sao văn bản làm căn cứ yêu cầu bồi thường. Sở có được trả lại hồ sơ hay phải tiếp nhận và yêu cầu bổ sung?',
                legal: 'Điều 41, Điều 42 Luật Trách nhiệm bồi thường của Nhà nước', files: [],
                status: ST.WAIT_SO, sentAt: '',
                history: [H(1, 8, 'cv_hn1', 'Trình Lãnh đạo Phòng'), H(0, 8, 'tp_hctp_hn', 'Duyệt, trình Lãnh đạo Sở')]
            },
            {
                code: `HD-${y}-006`, unit: 'STP-HN', creator: 'cv_hn1', topic: 'Phục hồi danh dự',
                title: 'Hình thức phục hồi danh dự khi người bị thiệt hại không yêu cầu',
                content: 'Người bị thiệt hại không có yêu cầu phục hồi danh dự. Cơ quan giải quyết bồi thường có phải chủ động tổ chức xin lỗi công khai không?',
                legal: '', files: [],
                status: ST.RETURNED, sentAt: '', returnReason: 'Bổ sung tình tiết vụ việc và căn cứ pháp lý trước khi gửi Bộ Tư pháp.',
                history: [H(4, 9, 'cv_hn1', 'Trình Lãnh đạo Phòng'), H(3, 14, 'tp_hctp_hn', 'Duyệt, trình Lãnh đạo Sở'), H(2, 16, 'gdso_hn', 'Trả lại', 'Bổ sung tình tiết vụ việc và căn cứ pháp lý trước khi gửi Bộ Tư pháp.')]
            },
            {
                code: `HD-${y}-007`, unit: 'STP-HN', creator: 'cv_hn1', topic: 'Khác',
                title: 'Lưu trữ hồ sơ giải quyết bồi thường sau khi hoàn thành chi trả',
                content: 'Thời hạn lưu trữ hồ sơ giải quyết bồi thường tại cơ quan giải quyết bồi thường là bao lâu?',
                legal: '', files: [],
                status: ST.WAIT_PHONG_SO, sentAt: '',
                history: [H(0, 10, 'cv_hn1', 'Trình Lãnh đạo Phòng')]
            },
            {
                code: `HD-${y}-008`, unit: 'STP-HN', creator: 'cv_hn2', topic: 'Giải quyết yêu cầu bồi thường',
                title: 'Thương lượng khi người yêu cầu bồi thường ủy quyền cho luật sư',
                content: 'Người yêu cầu bồi thường ủy quyền cho luật sư tham gia thương lượng. Biên bản thương lượng có cần chữ ký của người yêu cầu bồi thường không?',
                legal: 'Điều 46 Luật Trách nhiệm bồi thường của Nhà nước', files: [],
                status: ST.WAIT_PHONG_SO, sentAt: '',
                history: [H(0, 9, 'cv_hn2', 'Trình Lãnh đạo Phòng')]
            },
            // Câu hỏi đang giao Trần Thị Thu Hà trả lời (tab Chờ xử lý của người dùng giả lập mặc định không trống)
            {
                code: `HD-${y}-009`, unit: 'STP-HCM', creator: 'cv_hcm1', topic: 'Giải quyết yêu cầu bồi thường',
                title: 'Thời hạn xác minh thiệt hại khi phải trưng cầu giám định',
                content: 'Vụ việc phải trưng cầu giám định thương tật để xác định thiệt hại về sức khỏe. Thời gian chờ kết quả giám định có được tính vào thời hạn xác minh thiệt hại không?',
                legal: 'Điều 45 Luật Trách nhiệm bồi thường của Nhà nước', files: ['CV_STP_HCM_hoi_thoi_han_xac_minh.pdf'],
                status: ST.ANSWERING, sentAt: fmtDate(ago(5)), phongLead: 'tpbt', officer: 'hatt',
                history: [H(6, 9, 'cv_hcm1', 'Trình Lãnh đạo Sở'), H(5, 10, 'gdso_hcm', 'Duyệt, gửi Bộ Tư pháp'), H(4, 9, 'cuctruong', 'Phân công Lãnh đạo Phòng', 'Giao Trần Văn Bồi Thường'), H(3, 14, 'tpbt', 'Phân công Chuyên viên', 'Giao Trần Thị Thu Hà')]
            },
            {
                code: `HD-${y}-010`, unit: 'STP-HP', creator: 'cv_hp1', topic: 'Kinh phí bồi thường',
                title: 'Chi trả tiền bồi thường khi người được bồi thường đã chết',
                content: 'Người được bồi thường chết sau khi Quyết định giải quyết bồi thường có hiệu lực nhưng trước khi nhận tiền. Cơ quan giải quyết bồi thường chi trả cho ai và cần những giấy tờ gì?',
                legal: '', files: [],
                status: ST.ANSWERING, sentAt: fmtDate(ago(2)), phongLead: 'tpbt', officer: 'hatt',
                history: [H(3, 9, 'cv_hp1', 'Trình Lãnh đạo Sở'), H(2, 10, 'gdso_hp', 'Duyệt, gửi Bộ Tư pháp'), H(2, 15, 'cucpho', 'Phân công Lãnh đạo Phòng', 'Giao Trần Văn Bồi Thường'), H(1, 9, 'tpbt', 'Phân công Chuyên viên', 'Giao Trần Thị Thu Hà')]
            }
        ].map((q, i) => ensureFields(Object.assign({ id: i + 1, createdAt: q.history[0].at.split(' ')[1] }, q)));
    }

    // Bổ sung đơn vị đang xử lý cho câu hỏi chưa có (dữ liệu mẫu, dữ liệu đã lưu trước 13/11/2026): suy ra theo trạng thái
    function ensureFields(q) {
        if (q && !q.handlerUnit) {
            const m = {
                [ST.RETURNED]: unitOf(q.creator), [ST.WAIT_PHONG_SO]: unitOf(q.creator), [ST.WAIT_SO]: q.unit, [ST.WAIT_CUC]: CUC,
                [ST.WAIT_PHONG]: unitOf(q.phongLead), [ST.ANSWERING]: unitOf(q.officer)
            };
            q.handlerUnit = m[q.status] || '';
        }
        return q;
    }
    function load(opts) {
        let list = null;
        try { if (localStorage.getItem(KEY + '_version') === VERSION) list = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { list = null; }
        if (!Array.isArray(list) || !list.length) {
            list = buildSeed();
            if (!opts || opts.save !== false) save(list);
        }
        return list.map(ensureFields);
    }
    function save(list) {
        try { localStorage.setItem(KEY, JSON.stringify(list)); localStorage.setItem(KEY + '_version', VERSION); } catch (e) { /* mockup */ }
    }

    // ---------- Quy tắc 1: phạm vi xem ----------
    // Sở Tư pháp: câu hỏi của Sở mình (mọi trạng thái); Bộ Tư pháp, Cục: câu hỏi đã gửi của mọi Sở; UBND cấp tỉnh: câu hỏi đã gửi của Sở trực thuộc
    const coPhamVi = () => !!PV() && PV().level() !== 'OTHER';
    function canSee(q) {
        const pv = PV();
        if (!pv) return false;
        const lv = pv.level();
        if (lv === 'STP') return q.unit === pv.stpOf(me().unitId);
        if (lv === 'BTP') return SENT.includes(q.status);
        if (lv === 'UBND_TINH') return SENT.includes(q.status) && pv.managedStps(pv.root()).includes(q.unit);
        return false;
    }

    // ---------- Quy tắc 2: người xử lý hiện tại ----------
    function isMyTask(q, u) {
        u = u || me();
        switch (q.status) {
            case ST.RETURNED: return q.creator === u.id;
            case ST.WAIT_PHONG_SO:
            case ST.WAIT_SO: return coQuyen(Q.DUYET, u) && u.unitId === q.handlerUnit && u.id !== q.creator;
            case ST.WAIT_CUC: return coQuyen(Q.PHAN_CONG, u) && u.unitId === q.handlerUnit;
            case ST.WAIT_PHONG: return q.phongLead === u.id;
            case ST.ANSWERING: return q.officer === u.id;
            default: return false;
        }
    }
    // Được thao tác: câu hỏi chờ người dùng xử lý và người dùng được phân quyền thao tác của trạng thái
    function canAct(q) { return isMyTask(q) && coQuyen(QUYEN_THEO_TRANG_THAI[q.status]); }
    // Sửa, Xóa, Trình lại: câu hỏi Bị trả lại do người dùng tạo, người dùng được phân quyền Sửa, Trình lại, Xóa câu hỏi
    function canEdit(q) { return q.status === ST.RETURNED && q.creator === me().id && coQuyen(Q.SUA); }
    // Cập nhật trả lời: câu hỏi Đã trả lời; người đã gửi câu trả lời hoặc người được giao trả lời, được phân quyền Cập nhật câu trả lời
    function canUpdateAnswer(q) {
        const id = me().id;
        return q.status === ST.ANSWERED && !!q.answer && coQuyen(Q.CAP_NHAT_TL) && (q.answer.by === id || q.officer === id);
    }
    // Quy tắc 12: tab Đã xử lý
    function isDoneByMe(q) {
        if (isMyTask(q)) return false;
        const id = me().id;
        if (chiXem()) return true;
        return q.creator === id || (q.history || []).some(h => h.by === id) || !!(q.answer && (q.answer.by === id || q.answer.updatedBy === id));
    }
    // Cột Người xử lý hiện tại: bước giao cho nhóm hiển thị tên đơn vị đang xử lý câu hỏi
    function currentHandler(q) {
        switch (q.status) {
            case ST.RETURNED: return userName(q.creator);
            case ST.WAIT_PHONG_SO:
            case ST.WAIT_SO:
            case ST.WAIT_CUC: return unitName(q.handlerUnit) || '—';
            case ST.WAIT_PHONG: return userName(q.phongLead);
            case ST.ANSWERING: return userName(q.officer);
            default: return '—';
        }
    }

    // ---------- Quy tắc 3: trình câu hỏi, đơn vị đang xử lý ----------
    // Đơn vị công tác của người tạo là đơn vị trực thuộc Sở Tư pháp của câu hỏi và có tài khoản đang hoạt động (khác người tạo) được phân quyền Duyệt / Trả lại câu hỏi:
    // đơn vị đang xử lý là đơn vị đó, câu hỏi Chờ Lãnh đạo Phòng duyệt. Trường hợp còn lại: đơn vị đang xử lý là Sở Tư pháp của câu hỏi, câu hỏi Chờ Lãnh đạo Sở duyệt.
    function routeOnSubmit(q) {
        const pv = PV(), cu = unitOf(q.creator);
        const trucThuoc = !!cu && cu !== q.unit && !!pv && pv.stpOf(cu) === q.unit;
        if (trucThuoc && nguoiCoQuyen(Q.DUYET, [cu]).some(u => u.id !== q.creator)) return { status: ST.WAIT_PHONG_SO, unit: cu, label: 'Lãnh đạo Phòng' };
        return { status: ST.WAIT_SO, unit: q.unit, label: 'Lãnh đạo Sở' };
    }
    // Lần trình gần nhất có qua bước Chờ Lãnh đạo Phòng duyệt không (thanh Tiến trình xử lý)
    function quaDuyetPhong(q) {
        if (q.status === ST.WAIT_PHONG_SO) return true;
        const h = (q.history || []).slice().reverse().find(x => x.action === 'Trình Lãnh đạo Phòng' || x.action === 'Trình Lãnh đạo Sở');
        return !h || h.action === 'Trình Lãnh đạo Phòng';
    }

    // ---------- Popup Phân công: danh sách người được giao ----------
    // Chờ Lãnh đạo Cục phân công: tài khoản được phân quyền Phân công trả lời thuộc đơn vị trực thuộc cấp dưới trực tiếp của đơn vị đang xử lý câu hỏi.
    // Chờ Lãnh đạo Phòng phân công: tài khoản được phân quyền Trả lời câu hỏi thuộc đơn vị đang xử lý câu hỏi (đơn vị của người được giao phân công).
    function ungVien(q) {
        const w = W();
        if (!w) return [];
        if (q.status === ST.WAIT_CUC) return nguoiCoQuyen(Q.PHAN_CONG, w.getChildren(q.handlerUnit).map(x => x.id));
        if (q.status === ST.WAIT_PHONG) return nguoiCoQuyen(Q.TRA_LOI, [q.handlerUnit]);
        return [];
    }

    // ---------- Quy tắc 13: bộ lọc Trạng thái theo tab và quyền chức năng ----------
    const TAB_CHO = {
        [Q.THEM]: [ST.RETURNED], [Q.SUA]: [ST.RETURNED], [Q.DUYET]: [ST.WAIT_PHONG_SO, ST.WAIT_SO],
        [Q.PHAN_CONG]: [ST.WAIT_CUC, ST.WAIT_PHONG], [Q.TRA_LOI]: [ST.ANSWERING]
    };
    const TAB_DA = {
        [Q.THEM]: [ST.WAIT_PHONG_SO, ST.WAIT_SO, ST.WAIT_CUC, ST.WAIT_PHONG, ST.ANSWERING, ST.ANSWERED],
        [Q.SUA]: [ST.WAIT_PHONG_SO, ST.WAIT_SO, ST.WAIT_CUC, ST.WAIT_PHONG, ST.ANSWERING, ST.ANSWERED],
        [Q.DUYET]: STATUS_ORDER.slice(),
        [Q.PHAN_CONG]: [ST.WAIT_PHONG, ST.ANSWERING, ST.ANSWERED],
        [Q.TRA_LOI]: [ST.ANSWERED], [Q.CAP_NHAT_TL]: [ST.ANSWERED]
    };
    function tabStatuses(tab) {
        let list;
        if (chiXem()) list = tab === 'pending' ? [] : (PV() && PV().level() === 'STP' ? STATUS_ORDER : SENT);
        else list = [].concat(...quyen().map(k => (tab === 'pending' ? TAB_CHO : TAB_DA)[k] || []));
        return STATUS_ORDER.filter(s => list.includes(s));
    }

    global.BTNN_HD = {
        ST, STATUS_ORDER, SENT, CUC, KEY, VERSION, MSG_DA_XU_LY, Q, Q_NAME,
        me, userName, unitName, unitOf, fmtDate, fmtTime,
        vaiTroMau, quyen, coQuyen, chiXem, nguoiCoQuyen,
        buildSeed, ensureFields, load, save,
        coPhamVi, canSee, isMyTask, canAct, canEdit, canUpdateAnswer, isDoneByMe, currentHandler,
        routeOnSubmit, quaDuyetPhong, ungVien, tabStatuses
    };
})(window);
