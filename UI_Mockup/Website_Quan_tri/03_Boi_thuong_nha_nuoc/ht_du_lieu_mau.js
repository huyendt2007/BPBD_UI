/*
 * Xem xét trách nhiệm hoàn trả - Dữ liệu mẫu bổ sung phủ các trạng thái của Ma trận chuyển trạng thái.
 * Dùng chung màn Danh sách (xem_xet_trach_nhiem_hoan_tra.html) và màn Chi tiết (chi_tiet_ho_so_hoan_tra.html).
 * - HT-2026-022: Hồ sơ chưa thành lập Hội đồng
 * - HT-2026-023: Chờ duyệt (QĐ đình chỉ) - đình chỉ cả hồ sơ tại Bước 2
 * - HT-2026-024: Bị trả lại (QĐ đình chỉ) - đình chỉ cả hồ sơ tại Bước 1
 * - HT-2026-025: Chờ ban hành QĐ hoàn trả, cán bộ Miễn / Giảm theo ý kiến Hội đồng (ban hành QĐ hoàn trả -> Miễn hoàn trả / Thu tiền hoàn trả) (đơn vị B)
 * - HT-2026-026: Thu tiền hoàn trả: nhiều đợt nộp, cán bộ Giảm / Miễn; chọn nhiều cán bộ trình QĐ miễn / giảm bổ sung (đơn vị A)
 * - SRS 05/11/2026 (chấm dứt việc xem xét trách nhiệm hoàn trả, người thi hành công vụ Đã chết, Mức độ lỗi Không có lỗi):
 *   + HT-2026-029: Chờ chấm dứt (Không xác định được người thi hành công vụ gây thiệt hại)
 *   + HT-2026-012: Chờ duyệt (QĐ chấm dứt); HT-2026-020: Bị trả lại (QĐ chấm dứt); HT-2026-011: Chấm dứt hoàn trả (trang Danh sách và Chi tiết)
 *   + HT-2026-030: cán bộ Đã chết đã Chấm dứt hoàn trả, cán bộ khác đang Thu tiền hoàn trả
 *   + HT-2026-031: cán bộ Không có lỗi (Không xem xét TNHT), cán bộ khác đang Thu tiền hoàn trả
 *   + HT-2026-021: tố tụng hình sự, phần đơn vị theo Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại (Cơ quan đang trả lương khác)
 * - 05/11/2026 (b23) - hồ sơ Bước 2 (Họp hội đồng, đã nhập sẵn danh sách người thi hành công vụ) theo cách xếp Cột 7, 8 Mẫu số 04 (TT 08/2019):
 *   + HT-2026-032: tất cả còn sống, không có lỗi (Cột 7)
 *   + HT-2026-033: tất cả đã chết (Cột 8)
 *   + HT-2026-034: còn sống không có lỗi + đã chết có lỗi (Cột 8)
 *   + HT-2026-035: còn sống không có lỗi + đã chết không có lỗi (Cột 7)
 *   + HT-2026-036: còn sống không có lỗi + đã chết có lỗi + đã chết không có lỗi (không tính Cột 7, 8)
 *   + HT-2026-037: có người còn sống và có lỗi (lưu ý kiến thì sang Bước 3, không tính Cột 7, 8)
 *   Bước 2 TH4: Lưu ý kiến hội đồng với HT-2026-032 đến HT-2026-036 thì hồ sơ chuyển Chờ chấm dứt.
 * - 05/11/2026 (b23) - hồ sơ Bước 3 (Chờ ban hành QĐ hoàn trả):
 *   + HT-2026-038: còn sống có lỗi + đã chết có lỗi + không có lỗi (Không xem xét TNHT)
 *   + HT-2026-039: 02 người còn sống có lỗi (có giảm mức hoàn trả theo ý kiến Hội đồng) + 01 người đã chết
 * - 05/11/2026 (dc1) - hồ sơ để thử Thêm người thi hành công vụ gây thiệt hại và đình chỉ người thi hành công vụ:
 *   + HT-2026-040 (Bước 2 - Họp hội đồng): chưa có người thi hành công vụ, thêm từ đầu
 *   + HT-2026-041 (Bước 2): 03 người còn sống có lỗi, thử đình chỉ cả hồ sơ tại Bước 2 (nút Đình chỉ ở thanh nút chân trang)
 *   + HT-2026-042 (Bước 2): 01 người còn sống không có lỗi + 02 người còn sống có lỗi
 *   + HT-2026-043 (Bước 2): 01 người đã chết có lỗi + 02 người còn sống có lỗi
 *   + HT-2026-044 (Bước 3 - Chờ ban hành QĐ hoàn trả): 03 người còn sống có lỗi, thử đình chỉ cả hồ sơ tại Bước 3
 * - 06/11/2026: bỏ đình chỉ một phần cán bộ (chốt với khách hàng); đình chỉ luôn áp dụng cả hồ sơ, tới trước khi có Quyết định hoàn trả được ban hành
 * Nạp sau khối dữ liệu của trang, trước các add-on xem_xet_hoan_tra_pham_vi.js / chi_tiet_ho_so_hoan_tra_ykhd.js / _qd.js.
 */
(function () {
    const U_CHU = 'UBND phường Việt Hưng', U_A = 'UBND Phường Bồ Đề', U_B = 'UBND phường Hải An';
    // Phiên bản dữ liệu mẫu: đổi phiên bản thì xóa dữ liệu thao tác đã lưu của các hồ sơ mẫu bổ sung để nạp lại theo mẫu mới
    // 28/10: giảm mức hoàn trả tối đa 30% (dữ liệu mẫu giảm), Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương (HT-2026-001), lĩnh vực tố tụng hình sự (HT-2026-021)
    // 28/10 (2): Miễn / Giảm theo ý kiến Hội đồng thể hiện trong QĐ hoàn trả (không QĐ miễn / giảm riêng); đình chỉ chỉ trước khi ban hành QĐ hoàn trả
    // 29/10: Đơn vị ban hành QĐ hoàn trả - tố tụng hình sự (HT-2026-021, HT-2026-027): theo Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương, mỗi đơn vị 01 QĐ; lĩnh vực khác: Đơn vị tạo Hội đồng, 01 QĐ cho toàn bộ cán bộ
    // 30/10: HT-2026-028 - tố tụng hình sự, 02 Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương: 01 đơn vị đã ban hành QĐ hoàn trả, 01 đơn vị chưa ban hành
    // 30/10 (xl1): dời ngày dữ liệu mẫu theo ngày hiện tại (htShiftDate) -> xóa trạng thái đã lưu có ngày cũ
    // 05/11 (tc1): tố tụng hình sự phân tách theo Cơ quan trực tiếp quản lý; chấm dứt việc xem xét trách nhiệm hoàn trả, cán bộ Đã chết / Không có lỗi
    // 05/11 (b23): thêm hồ sơ Bước 2 (HT-2026-032 đến 037) và Bước 3 (HT-2026-038, 039)
    // 05/11 (dc1): thêm hồ sơ thử thêm người và đình chỉ (HT-2026-040 đến 044)
    const SEED_VER = '20261105dc1', SEED_CODES = ['HT-2026-025', 'HT-2026-026', 'HT-2026-027', 'HT-2026-001', 'HT-2026-021', 'HT-2026-028', 'HT-2026-030', 'HT-2026-031', 'HT-2026-038', 'HT-2026-039', 'HT-2026-044'];
    // Hồ sơ chưa tách phần đơn vị đổi trạng thái mẫu: xóa trạng thái đã lưu của màn Chi tiết
    const STATUS_CODES = ['HT-2026-011', 'HT-2026-012', 'HT-2026-020', 'HT-2026-029', 'HT-2026-032', 'HT-2026-033', 'HT-2026-034', 'HT-2026-035', 'HT-2026-036', 'HT-2026-037', 'HT-2026-040', 'HT-2026-041', 'HT-2026-042', 'HT-2026-043'];
    try {
        if (localStorage.getItem('btnn_ht_seed_ver') !== SEED_VER) {
            const st = JSON.parse(localStorage.getItem('btnn_ht_units_v1') || '{}') || {};
            SEED_CODES.forEach(c => { delete st[c]; });
            localStorage.setItem('btnn_ht_units_v1', JSON.stringify(st));
            const hs = JSON.parse(localStorage.getItem('btnn_ht_status_v1') || '{}') || {};
            STATUS_CODES.forEach(c => { delete hs[c]; });
            localStorage.setItem('btnn_ht_status_v1', JSON.stringify(hs));
            localStorage.setItem('btnn_ht_seed_ver', SEED_VER);
        }
    } catch (e) { /* bỏ qua */ }
    // Dời ngày dữ liệu mẫu: mốc 05/09/2026 (mốc nghiệp vụ muộn nhất của hồ sơ mẫu, trừ hạn) dời về ngày hiện tại.
    // Chỉ dời ngày năm 2026 trở đi (giữ ngày văn bản pháp luật cũ); ngày dời qua hôm nay thì lấy hôm nay, trừ ngày hạn (keepFuture).
    if (!window.htShiftDate) {
        const today0 = new Date(); today0.setHours(0, 0, 0, 0);
        const shiftDays = Math.max(0, Math.round((today0 - new Date(2026, 8, 5)) / 86400000));
        const p2 = n => String(n).padStart(2, '0');
        window.HT_DATE_SHIFT_DAYS = shiftDays;
        window.htShiftDate = function (s, keepFuture) {
            if (typeof s !== 'string' || !shiftDays) return s;
            return s.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g, (m, d, mo, y) => {
                if (+y < 2026) return m;
                let t = new Date(+y, +mo - 1, +d + shiftDays);
                if (!keepFuture && t > today0) t = new Date(today0);
                return p2(t.getDate()) + '/' + p2(t.getMonth() + 1) + '/' + t.getFullYear();
            });
        };
    }
    const OF =(name, agency, role, loi, total, refundMethod) => ({ name, agency, role, loi, total, paid: 0, nextDate: '—', status: '', refundMethod, progressClass: 'primary', isPostponed: false });
    // Bước 2 (Họp hội đồng): người thi hành công vụ đã nhập, chưa lưu ý kiến hội đồng; DC = người đã chết
    const B2 = o => Object.assign(o, { status: 'Họp hội đồng', progressClass: 'info' });
    const DC = o => Object.assign(o, { daChet: true, trangThaiNguoi: 'Đã chết' });
    const B2YK = 'Hội đồng đã họp, xem xét hồ sơ và ý kiến của người thi hành công vụ gây thiệt hại; chờ lưu ý kiến của Hội đồng.';
    const CASES = [
        { id: 'HT-2026-022', claimCode: 'BT-2026-822', claimSummary: 'Thu giữ phương tiện vi phạm quá thời hạn tạm giữ theo quy định.', claimAmt: 40000000, status: 'Chờ thành lập hội đồng', hdDecision: '', hdDate: '', officers: [] },
        { id: 'HT-2026-023', claimCode: 'BT-2026-823', claimSummary: 'Ban hành quyết định xử phạt vi phạm hành chính sai đối tượng.', claimAmt: 60000000, status: 'Chờ duyệt QĐ đình chỉ', prev: 'Họp hội đồng', dcht: 'pending', hdDecision: '51/QĐ-TLHD', hdDate: '05/09/2026', officers: [OF('Lâm Văn Đình', U_A, 'Chuyên viên', 'Vô ý', 20000000, 'Một lần')] },
        { id: 'HT-2026-024', claimCode: 'BT-2026-824', claimSummary: 'Chậm cấp giấy chứng nhận quyền sử dụng đất gây thiệt hại.', claimAmt: 35000000, status: 'Bị trả lại QĐ đình chỉ', prev: 'Bị trả lại thành lập HĐ', dcht: 'rejected', hdDecision: '', hdDate: '', officers: [OF('Nghiêm Văn Tú', U_B, 'Chuyên viên', 'Vô ý', 12000000, 'Hoàn trả một lần')] },
        {
            id: 'HT-2026-025', claimCode: 'BT-2026-825', claimSummary: 'Cưỡng chế thu hồi đất không đúng trình tự, thủ tục.', claimAmt: 180000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '52/QĐ-TLHD', hdDate: '10/08/2026',
            officers: [OF('Trịnh Văn Miễn', U_B, 'Cán bộ địa chính', 'Vô ý', 12000000, ''), OF('Lý Thị Từ', U_B, 'Chuyên viên', 'Vô ý', 10000000, ''), OF('Mai Văn Giảm', U_B, 'Phó Trưởng phòng', 'Vô ý', 20000000, 'Nhiều lần'), OF('Đinh Thị Hạ', U_B, 'Chuyên viên', 'Vô ý', 16000000, 'Một lần')]
        },
        {
            id: 'HT-2026-026', claimCode: 'BT-2026-826', claimSummary: 'Ra quyết định tạm giữ hành chính trái pháp luật; văn bản làm căn cứ bị hủy bỏ một phần.', claimAmt: 120000000, status: 'Thu tiền hoàn trả', hdDecision: '53/QĐ-TLHD', hdDate: '15/07/2026',
            officers: [OF('Cao Văn Duyệt', U_A, 'Trưởng Công an phường', 'Vô ý', 15000000, 'Nhiều lần'), OF('Tạ Thị Chối', U_A, 'Cán bộ tư pháp', 'Vô ý', 8000000, 'Một lần'), OF('Phan Văn Trả', U_A, 'Phó Chủ tịch', 'Vô ý', 12000000, 'Nhiều lần'), OF('Kiều Văn Chỉ', U_A, 'Chuyên viên', 'Vô ý', 9000000, 'Nhiều lần'), OF('Hồ Văn Thừa', U_A, 'Kế toán', 'Vô ý', 10000000, 'Nhiều lần'), OF('Đỗ Văn Nộp', U_A, 'Công chức địa chính', 'Vô ý', 12000000, 'Nhiều lần'),
                OF('Lương Văn Giảm', U_A, 'Phó Trưởng phòng', 'Vô ý', 18000000, 'Nhiều lần'), OF('Phí Thị Miễn', U_A, 'Chuyên viên', 'Vô ý', 10000000, '')]
        },
        // Hồ sơ tố tụng hình sự nhiều đơn vị (03 phần đơn vị theo Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương): Đơn vị tạo Hội đồng đã ban hành, đang thu tiền; Đơn vị A Chờ duyệt QĐ hoàn trả; Đơn vị B đã ban hành, đang thu tiền
        {
            id: 'HT-2026-027', claimCode: 'BT-2026-827', claimSummary: 'Giải phóng mặt bằng sai quy hoạch, ban hành nhiều quyết định thu hồi đất trái pháp luật tại 03 địa bàn.', claimAmt: 260000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '54/QĐ-TLHD', hdDate: '01/08/2026',
            officers: [OF('Đoàn Văn Lâm', U_CHU, 'Trưởng phòng Tài nguyên và Môi trường', 'Vô ý', 40000000, 'Hoàn trả nhiều lần'), OF('Vương Thị Hằng', U_CHU, 'Chuyên viên', 'Vô ý', 20000000, 'Hoàn trả một lần'), OF('Mạc Văn Toàn', U_CHU, 'Cán bộ địa chính', 'Vô ý', 15000000, ''),
                OF('Lại Văn Phúc', U_A, 'Phó Chủ tịch phường', 'Cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội', 35000000, 'Hoàn trả nhiều lần'), OF('Hà Thị Ngân', U_B, 'Cán bộ địa chính', 'Vô ý', 25000000, 'Hoàn trả nhiều lần'), OF('Tô Văn Khải', U_B, 'Chuyên viên', 'Vô ý', 18000000, 'Hoàn trả một lần')]
        },
        // Hồ sơ tố tụng hình sự 02 phần đơn vị (theo Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương; mỗi đơn vị 01 QĐ hoàn trả cho toàn bộ cán bộ của đơn vị):
        // Đơn vị A đã ban hành QĐ hoàn trả, đang thu tiền; Đơn vị B chưa ban hành QĐ hoàn trả (Chờ ban hành QĐ hoàn trả)
        {
            id: 'HT-2026-028', claimCode: 'BT-2026-828', claimSummary: 'Tạm giữ, tạm giam trái pháp luật trong giai đoạn điều tra; người bị tạm giam được tuyên không phạm tội.', claimAmt: 150000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '55/QĐ-TLHD', hdDate: '05/08/2026',
            officers: [OF('Lã Văn Thành', U_A, 'Trưởng Công an phường', 'Vô ý', 24000000, 'Hoàn trả nhiều lần'), OF('Ông Thị Mai', U_A, 'Cán bộ điều tra', 'Vô ý', 16000000, 'Hoàn trả một lần'),
                OF('Giáp Văn Hùng', U_B, 'Phó Trưởng Công an xã', 'Vô ý', 20000000, ''), OF('Tôn Thị Hà', U_B, 'Cán bộ điều tra', 'Vô ý', 12000000, '')]
        },
        // Chờ chấm dứt: Hội đồng không xác định được người thi hành công vụ gây thiệt hại (không lưu danh sách cán bộ)
        {
            id: 'HT-2026-029', claimCode: 'BT-2026-829', claimSummary: 'Thu giữ tài sản trái pháp luật trong đợt kiểm tra liên ngành; biên bản thu giữ không ghi tên người thực hiện.', claimAmt: 45000000, status: 'Chờ chấm dứt', hdDecision: '56/QĐ-TLHD', hdDate: '12/08/2026', officers: [],
            extra: { ketQuaXacDinh: 'Không xác định được người thi hành công vụ gây thiệt hại', cdLyDo: 'Không xác định được người thi hành công vụ gây thiệt hại', conclusionDate: '20/08/2026', ht2YKienChung: 'Hội đồng không xác định được người thi hành công vụ gây thiệt hại do biên bản thu giữ không ghi tên người thực hiện và các thành viên đoàn kiểm tra đã chuyển công tác.' }
        },
        // Cán bộ Đã chết: ban hành QĐ hoàn trả thì chuyển Chấm dứt hoàn trả (không thu tiền); cán bộ khác đang Thu tiền hoàn trả
        {
            id: 'HT-2026-030', claimCode: 'BT-2026-830', claimSummary: 'Cưỡng chế tháo dỡ công trình khi quyết định cưỡng chế đã hết hiệu lực thi hành.', claimAmt: 90000000, status: 'Thu tiền hoàn trả', hdDecision: '57/QĐ-TLHD', hdDate: '18/07/2026',
            officers: [Object.assign(OF('Quách Văn Khuất', U_A, 'Phó Chủ tịch phường', 'Vô ý', 25000000, ''), { daChet: true, trangThaiNguoi: 'Đã chết' }), OF('Lê Thị Thanh', U_A, 'Công chức địa chính - xây dựng', 'Vô ý', 15000000, 'Nhiều lần')]
        },
        // Cán bộ có Mức độ lỗi Không có lỗi: Không xem xét TNHT (không đưa vào phần đơn vị); cán bộ khác đang Thu tiền hoàn trả
        {
            id: 'HT-2026-031', claimCode: 'BT-2026-831', claimSummary: 'Từ chối cấp giấy phép xây dựng trái pháp luật; Hội đồng xác định 01 cán bộ không có lỗi.', claimAmt: 70000000, status: 'Thu tiền hoàn trả', hdDecision: '58/QĐ-TLHD', hdDate: '22/07/2026',
            officers: [OF('Kim Văn Vô', U_B, 'Chuyên viên', 'Không có lỗi', 0, ''), OF('Nhữ Thị Ngọc', U_B, 'Trưởng phòng Quản lý đô thị', 'Vô ý', 18000000, 'Một lần'), OF('Đàm Văn Quý', U_B, 'Cán bộ cấp phép xây dựng', 'Cố ý nhưng không bị truy cứu trách nhiệm hình sự', 22000000, 'Nhiều lần')]
        },
        // ===== Bước 2 - Họp hội đồng (05/11/2026): các trường hợp xếp Cột 7, 8 Mẫu số 04 (TT 08/2019) =====
        // Tất cả còn sống, không có lỗi: Lưu ý kiến hội đồng -> Chờ chấm dứt; ban hành QĐ chấm dứt -> Cột 7
        {
            id: 'HT-2026-032', claimCode: 'BT-2026-832', claimSummary: 'Thu hồi giấy phép kinh doanh do văn bản hướng dẫn của cấp trên sai; công chức thực hiện đúng hướng dẫn.', claimAmt: 55000000, status: 'Họp hội đồng', hdDecision: '59/QĐ-TLHD', hdDate: '20/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(OF('Bạc Văn Đúng', U_A, 'Chuyên viên phòng Kinh tế', 'Không có lỗi', 0, '')), B2(OF('Cấn Thị Mẫn', U_A, 'Phó Trưởng phòng Kinh tế', 'Không có lỗi', 0, ''))]
        },
        // Tất cả đã chết: Lưu ý kiến hội đồng -> Chờ chấm dứt; ban hành QĐ chấm dứt -> Cột 8
        {
            id: 'HT-2026-033', claimCode: 'BT-2026-833', claimSummary: 'Cưỡng chế thu hồi đất trái pháp luật; hai người thi hành công vụ đã chết trước khi Hội đồng họp.', claimAmt: 85000000, status: 'Họp hội đồng', hdDecision: '60/QĐ-TLHD', hdDate: '21/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(DC(OF('Thân Văn Mất', U_B, 'Phó Chủ tịch phường', 'Vô ý', 30000000, ''))), B2(DC(OF('Vi Thị Lành', U_B, 'Công chức địa chính', 'Cố ý nhưng không bị truy cứu trách nhiệm hình sự', 25000000, '')))]
        },
        // Còn sống không có lỗi + đã chết có lỗi: Chờ chấm dứt -> Cột 8
        {
            id: 'HT-2026-034', claimCode: 'BT-2026-834', claimSummary: 'Xử phạt vi phạm hành chính không đúng thẩm quyền; người ký quyết định đã chết.', claimAmt: 48000000, status: 'Họp hội đồng', hdDecision: '61/QĐ-TLHD', hdDate: '22/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(OF('Ứng Văn Lành', U_A, 'Cán bộ tư pháp', 'Không có lỗi', 0, '')), B2(DC(OF('Khúc Văn Tạ', U_A, 'Chủ tịch phường', 'Vô ý', 20000000, '')))]
        },
        // Còn sống không có lỗi + đã chết không có lỗi: Chờ chấm dứt -> Cột 7
        {
            id: 'HT-2026-035', claimCode: 'BT-2026-835', claimSummary: 'Tạm giữ phương tiện quá thời hạn do lỗi hệ thống quản lý; Hội đồng kết luận cán bộ không có lỗi.', claimAmt: 32000000, status: 'Họp hội đồng', hdDecision: '62/QĐ-TLHD', hdDate: '23/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(OF('Lò Văn Ngay', U_B, 'Cảnh sát khu vực', 'Không có lỗi', 0, '')), B2(DC(OF('Mẫn Thị Hiền', U_B, 'Cán bộ quản lý kho tang vật', 'Không có lỗi', 0, '')))]
        },
        // Còn sống không có lỗi + đã chết có lỗi + đã chết không có lỗi: Chờ chấm dứt, không tính Cột 7, 8
        {
            id: 'HT-2026-036', claimCode: 'BT-2026-836', claimSummary: 'Phá dỡ công trình phụ không thuộc diện cưỡng chế; người chỉ đạo và người thực hiện đã chết.', claimAmt: 66000000, status: 'Họp hội đồng', hdDecision: '63/QĐ-TLHD', hdDate: '24/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(OF('Ninh Văn Thật', U_A, 'Công chức địa chính - xây dựng', 'Không có lỗi', 0, '')), B2(DC(OF('Ông Văn Chỉ', U_A, 'Phó Chủ tịch phường', 'Vô ý', 22000000, ''))),
                B2(DC(OF('Phó Thị Làm', U_A, 'Cán bộ đội trật tự đô thị', 'Không có lỗi', 0, '')))]
        },
        // Có người còn sống và có lỗi: Lưu ý kiến hội đồng -> Bước 3 (người không có lỗi: Không xem xét TNHT); không tính Cột 7, 8
        {
            id: 'HT-2026-037', claimCode: 'BT-2026-837', claimSummary: 'Chậm giải quyết hồ sơ cấp giấy chứng nhận quyền sử dụng đất quá thời hạn luật định.', claimAmt: 74000000, status: 'Họp hội đồng', hdDecision: '64/QĐ-TLHD', hdDate: '25/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(OF('Quan Văn Chậm', U_B, 'Chuyên viên Văn phòng đăng ký đất đai', 'Vô ý', 18000000, 'Một lần')), B2(OF('Sầm Thị Ngay', U_B, 'Cán bộ một cửa', 'Không có lỗi', 0, '')),
                B2(DC(OF('Tào Văn Khuất', U_B, 'Phó Giám đốc Chi nhánh đăng ký đất đai', 'Vô ý', 15000000, '')))]
        },
        // ===== Bước 3 - Chờ ban hành QĐ hoàn trả (05/11/2026) =====
        // Còn sống có lỗi + đã chết có lỗi (ban hành QĐ -> Chấm dứt hoàn trả) + không có lỗi (Không xem xét TNHT, không vào QĐ)
        {
            id: 'HT-2026-038', claimCode: 'BT-2026-838', claimSummary: 'Ra quyết định cưỡng chế thu hồi đất khi chưa ban hành quyết định thu hồi đất.', claimAmt: 140000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '65/QĐ-TLHD', hdDate: '05/08/2026',
            officers: [OF('Uông Văn Quyết', U_A, 'Phó Chủ tịch phường', 'Vô ý', 30000000, 'Nhiều lần'), DC(OF('Văn Thị Hương', U_A, 'Trưởng ban bồi thường giải phóng mặt bằng', 'Vô ý', 20000000, '')),
                OF('Xa Văn Đúng', U_A, 'Công chức địa chính', 'Không có lỗi', 0, '')]
        },
        // 02 người còn sống có lỗi (01 người Giảm mức hoàn trả theo ý kiến Hội đồng) + 01 người đã chết
        {
            id: 'HT-2026-039', claimCode: 'BT-2026-839', claimSummary: 'Đình chỉ hoạt động cơ sở kinh doanh không có căn cứ, gây thiệt hại thu nhập.', claimAmt: 110000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '66/QĐ-TLHD', hdDate: '06/08/2026',
            officers: [OF('Yên Văn Bảo', U_B, 'Chánh Thanh tra phường', 'Cố ý nhưng không bị truy cứu trách nhiệm hình sự', 35000000, 'Nhiều lần'), OF('Âu Thị Giảm', U_B, 'Thanh tra viên', 'Vô ý', 15000000, 'Một lần'),
                DC(OF('Bế Văn Tâm', U_B, 'Đội trưởng Đội quản lý thị trường', 'Vô ý', 18000000, ''))]
        },
        // ===== Thử Thêm người thi hành công vụ gây thiệt hại và đình chỉ (05/11/2026) =====
        // Bước 2 - Họp hội đồng, chưa có người thi hành công vụ: bấm Thêm người thi hành công vụ gây thiệt hại
        {
            id: 'HT-2026-040', claimCode: 'BT-2026-840', claimSummary: 'Niêm phong kho hàng của doanh nghiệp khi chưa có quyết định kiểm tra.', claimAmt: 72000000, status: 'Họp hội đồng', hdDecision: '67/QĐ-TLHD', hdDate: '26/08/2026', extra: { ht2YKienChung: B2YK }, officers: []
        },
        // Bước 2: 03 người còn sống có lỗi; bấm Đình chỉ ở thanh nút chân trang (đình chỉ cả hồ sơ)
        {
            id: 'HT-2026-041', claimCode: 'BT-2026-841', claimSummary: 'Thu hồi giấy chứng nhận quyền sử dụng đất dựa trên văn bản sau đó bị hủy bỏ một phần.', claimAmt: 96000000, status: 'Họp hội đồng', hdDecision: '68/QĐ-TLHD', hdDate: '27/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(OF('Đậu Văn Hòa', U_A, 'Phó Chủ tịch phường', 'Vô ý', 25000000, 'Nhiều lần')), B2(OF('Giang Thị Liễu', U_A, 'Công chức địa chính', 'Vô ý', 15000000, 'Một lần')),
                B2(OF('Hầu Văn Đạt', U_B, 'Chuyên viên Văn phòng đăng ký đất đai', 'Cố ý nhưng không bị truy cứu trách nhiệm hình sự', 30000000, 'Nhiều lần'))]
        },
        // Bước 2: 01 người không có lỗi + 02 người có lỗi
        {
            id: 'HT-2026-042', claimCode: 'BT-2026-842', claimSummary: 'Xử phạt vi phạm hành chính căn cứ biên bản lập sai; văn bản làm căn cứ sau đó bị thu hồi.', claimAmt: 58000000, status: 'Họp hội đồng', hdDecision: '69/QĐ-TLHD', hdDate: '28/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(OF('Khương Văn Ngay', U_B, 'Cán bộ tư pháp', 'Không có lỗi', 0, '')), B2(OF('La Thị Phạt', U_B, 'Phó Chủ tịch phường', 'Vô ý', 20000000, 'Một lần')),
                B2(OF('Mạc Văn Lập', U_B, 'Cảnh sát khu vực', 'Vô ý', 12000000, 'Một lần'))]
        },
        // Bước 2: 01 người đã chết có lỗi + 02 người còn sống có lỗi
        {
            id: 'HT-2026-043', claimCode: 'BT-2026-843', claimSummary: 'Kê biên tài sản không thuộc sở hữu của người phải thi hành; quyết định kê biên sau đó bị hủy bỏ.', claimAmt: 104000000, status: 'Họp hội đồng', hdDecision: '70/QĐ-TLHD', hdDate: '29/08/2026', extra: { ht2YKienChung: B2YK },
            officers: [B2(DC(OF('Nghiêm Văn Cố', U_A, 'Chấp hành viên', 'Vô ý', 28000000, ''))), B2(OF('Ôn Thị Kê', U_A, 'Thư ký thi hành án', 'Vô ý', 14000000, 'Một lần')),
                B2(OF('Phùng Văn Biên', U_A, 'Phó Chi cục trưởng', 'Vô ý', 18000000, 'Nhiều lần'))]
        },
        // Bước 3 - Chờ ban hành QĐ hoàn trả: bấm Đình chỉ ở thanh nút chân trang (đình chỉ cả hồ sơ, chưa có Quyết định hoàn trả được ban hành)
        {
            id: 'HT-2026-044', claimCode: 'BT-2026-844', claimSummary: 'Đình chỉ thi công công trình khi chưa có căn cứ vi phạm trật tự xây dựng.', claimAmt: 125000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '71/QĐ-TLHD', hdDate: '07/08/2026',
            officers: [OF('Quang Văn Dừng', U_B, 'Đội trưởng Đội trật tự đô thị', 'Vô ý', 22000000, 'Nhiều lần'), OF('Rơ Thị Thi', U_B, 'Công chức địa chính - xây dựng', 'Vô ý', 16000000, 'Một lần'),
                OF('Sử Văn Công', U_B, 'Phó Chủ tịch phường', 'Cố ý nhưng không bị truy cứu trách nhiệm hình sự', 30000000, 'Nhiều lần')]
        }
    ];
    // Trạng thái mẫu của cán bộ (màn Chi tiết, chi_tiet_ho_so_hoan_tra_qd.js): [ct, xl, giam, extra]
    window.HT_EXTRA_SEED = {
        'Trịnh Văn Miễn': ['CBH_HT', 'MIEN'],
        'Lý Thị Từ': ['CBH_HT', 'MIEN'],
        'Mai Văn Giảm': ['CBH_HT', 'GIAM', 14000000],
        'Đinh Thị Hạ': ['CBH_HT', 'GIAM', 12000000],
        'Cao Văn Duyệt': ['THU', 'HT', 0, { paid: 5000000 }],
        'Tạ Thị Chối': ['THU', 'HT'],
        'Phan Văn Trả': ['THU', 'HT', 0, { paid: 4000000 }],
        'Kiều Văn Chỉ': ['THU', 'HT', 0, { paid: 3000000 }],
        'Hồ Văn Thừa': ['THU', 'GIAM', 8000000, { paid: 6000000, total: 8000000 }],
        // Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại A: cán bộ đang thu tiền, còn phải nộp (demo Ghi nhận nộp tiền)
        'Đỗ Văn Nộp': ['THU', 'HT', 0, { paid: 3000000, pays: [['15/09/2026', 1000000], ['05/10/2026', 2000000]] }],
        // Xem chi tiết hoàn trả của cán bộ: Giảm theo ý kiến Hội đồng, đã nộp 02 đợt; Miễn hoàn trả
        'Lương Văn Giảm': ['THU', 'GIAM', 13000000, { paid: 4000000, total: 13000000, pays: [['10/10/2026', 2000000], ['20/10/2026', 2000000]] }],
        'Phí Thị Miễn': ['MIEN', 'MIEN', 0, { paid: 0, total: 0 }],
        // HT-2026-027 - phần của Đơn vị tạo Hội đồng (UBND phường Việt Hưng): đã ban hành QĐ hoàn trả
        'Đoàn Văn Lâm': ['THU', 'HT', 0, { paid: 32000000 }], 'Vương Thị Hằng': ['THU', 'GIAM', 14000000, { paid: 5000000, total: 14000000 }], 'Mạc Văn Toàn': ['MIEN', 'MIEN'],
        'Lại Văn Phúc': ['CD_HT', 'HT'],
        'Hà Thị Ngân': ['THU', 'HT', 0, { paid: 10000000 }], 'Tô Văn Khải': ['THU', 'HT', 0, { paid: 0 }],
        // HT-2026-028: Đơn vị A đã ban hành QĐ hoàn trả (Thu tiền hoàn trả); Đơn vị B chưa ban hành (Chờ ban hành QĐ hoàn trả)
        'Lã Văn Thành': ['THU', 'HT', 0, { paid: 6000000 }], 'Ông Thị Mai': ['THU', 'HT', 0, { paid: 0 }],
        'Giáp Văn Hùng': ['CBH_HT', 'HT'], 'Tôn Thị Hà': ['CBH_HT', 'HT'],
        // HT-2026-030: cán bộ Đã chết - Chấm dứt hoàn trả; HT-2026-031: cán bộ Không có lỗi - Không xem xét TNHT
        'Quách Văn Khuất': ['CHAMDUT', 'HT', 0, { total: 0 }], 'Lê Thị Thanh': ['THU', 'HT', 0, { paid: 5000000 }],
        'Kim Văn Vô': ['KXX', 'HT', 0, { total: 0 }], 'Nhữ Thị Ngọc': ['THU', 'HT', 0, { paid: 0 }], 'Đàm Văn Quý': ['THU', 'HT', 0, { paid: 7000000 }],
        // HT-2026-038, HT-2026-039 (Bước 3 - Chờ ban hành QĐ hoàn trả): người đã chết vẫn vào QĐ hoàn trả; người Không có lỗi: Không xem xét TNHT
        'Uông Văn Quyết': ['CBH_HT', 'HT'], 'Văn Thị Hương': ['CBH_HT', 'HT'], 'Xa Văn Đúng': ['KXX', 'HT', 0, { total: 0 }],
        'Yên Văn Bảo': ['CBH_HT', 'HT'], 'Âu Thị Giảm': ['CBH_HT', 'GIAM', 11000000], 'Bế Văn Tâm': ['CBH_HT', 'HT'],
        // HT-2026-044 (Bước 3): thử đình chỉ cả hồ sơ
        'Quang Văn Dừng': ['CBH_HT', 'HT'], 'Rơ Thị Thi': ['CBH_HT', 'HT'], 'Sử Văn Công': ['CBH_HT', 'HT']
    };
    // Phần đơn vị / cán bộ của hồ sơ đã chốt ý kiến Hội đồng (màn Danh sách, xem_xet_hoan_tra_pham_vi.js)
    const L = (name, unit, st, o) => Object.assign({ name, unit, st, xl: 'HT', hd: 0, giam: 0, paid: 0 }, o || {});
    window.HT_EXTRA_SPLIT = {
        'HT-2026-025': { owner: U_CHU, officers: [L('Trịnh Văn Miễn', U_B, 'CBH_HT', { xl: 'MIEN', hd: 12000000 }), L('Lý Thị Từ', U_B, 'CBH_HT', { xl: 'MIEN', hd: 10000000 }), L('Mai Văn Giảm', U_B, 'CBH_HT', { xl: 'GIAM', hd: 20000000, giam: 14000000 }), L('Đinh Thị Hạ', U_B, 'CBH_HT', { xl: 'GIAM', hd: 16000000, giam: 12000000 })] },
        'HT-2026-026': {
            owner: U_CHU, officers: [L('Cao Văn Duyệt', U_A, 'THU', { hd: 15000000, paid: 5000000 }), L('Tạ Thị Chối', U_A, 'THU', { hd: 8000000 }), L('Phan Văn Trả', U_A, 'THU', { hd: 12000000, paid: 4000000 }),
                L('Kiều Văn Chỉ', U_A, 'THU', { hd: 9000000, paid: 3000000 }), L('Hồ Văn Thừa', U_A, 'THU', { xl: 'GIAM', hd: 10000000, giam: 8000000, paid: 6000000, pt: 8000000 }),
                L('Đỗ Văn Nộp', U_A, 'THU', { hd: 12000000, paid: 3000000 }), L('Lương Văn Giảm', U_A, 'THU', { xl: 'GIAM', hd: 18000000, giam: 13000000, paid: 4000000, pt: 13000000 }),
                L('Phí Thị Miễn', U_A, 'MIEN', { xl: 'MIEN', hd: 10000000 })]
        },
        'HT-2026-027': {
            owner: U_CHU, officers: [L('Đoàn Văn Lâm', U_CHU, 'THU', { hd: 40000000, paid: 32000000 }), L('Vương Thị Hằng', U_CHU, 'THU', { xl: 'GIAM', hd: 20000000, giam: 14000000, paid: 5000000, pt: 14000000 }), L('Mạc Văn Toàn', U_CHU, 'MIEN', { xl: 'MIEN', hd: 15000000 }), L('Lại Văn Phúc', U_A, 'CD_HT', { hd: 35000000 }),
                L('Hà Thị Ngân', U_B, 'THU', { hd: 25000000, paid: 10000000 }), L('Tô Văn Khải', U_B, 'THU', { hd: 18000000 })]
        },
        'HT-2026-028': {
            owner: U_CHU, officers: [L('Lã Văn Thành', U_A, 'THU', { hd: 24000000, paid: 6000000 }), L('Ông Thị Mai', U_A, 'THU', { hd: 16000000 }),
                L('Giáp Văn Hùng', U_B, 'CBH_HT', { hd: 20000000 }), L('Tôn Thị Hà', U_B, 'CBH_HT', { hd: 12000000 })]
        },
        'HT-2026-030': { owner: U_CHU, officers: [L('Quách Văn Khuất', U_A, 'CHAMDUT', { hd: 25000000, chet: true }), L('Lê Thị Thanh', U_A, 'THU', { hd: 15000000, paid: 5000000 })] },
        'HT-2026-031': { owner: U_CHU, officers: [L('Kim Văn Vô', U_B, 'KXX', { hd: 0 }), L('Nhữ Thị Ngọc', U_B, 'THU', { hd: 18000000 }), L('Đàm Văn Quý', U_B, 'THU', { hd: 22000000, paid: 7000000 })] },
        'HT-2026-038': { owner: U_CHU, officers: [L('Uông Văn Quyết', U_A, 'CBH_HT', { hd: 30000000 }), L('Văn Thị Hương', U_A, 'CBH_HT', { hd: 20000000, chet: true }), L('Xa Văn Đúng', U_A, 'KXX', { hd: 0 })] },
        'HT-2026-039': { owner: U_CHU, officers: [L('Yên Văn Bảo', U_B, 'CBH_HT', { hd: 35000000 }), L('Âu Thị Giảm', U_B, 'CBH_HT', { xl: 'GIAM', hd: 15000000, giam: 11000000 }), L('Bế Văn Tâm', U_B, 'CBH_HT', { hd: 18000000, chet: true })] },
        'HT-2026-044': { owner: U_CHU, officers: [L('Quang Văn Dừng', U_B, 'CBH_HT', { hd: 22000000 }), L('Rơ Thị Thi', U_B, 'CBH_HT', { hd: 16000000 }), L('Sử Văn Công', U_B, 'CBH_HT', { hd: 30000000 })] }
    };

    // Nguồn lập hồ sơ hoàn trả mới (popup Chọn vụ việc bồi thường, màn Danh sách): vụ việc đã hoàn tất chi trả kinh phí bồi thường,
    // chưa có hồ sơ hoàn trả; agency = Đơn vị chi trả bồi thường (đơn vị tạo Hội đồng) dùng lọc phạm vi dữ liệu; officers = người thi hành công vụ gây thiệt hại.
    // Dữ liệu độc lập kho của Giải quyết YCBT / QĐ GQBT / Kinh phí để popup luôn có dữ liệu khi trình duyệt chưa mở các trang đó.
    const S = (claimCode, claimant, agency, claimAmt, paidDate, gqbtQdNo, gqbtQdDate, claimField, claimAct, claimSummary, officers) =>
        ({ claimCode, claimant, agency, claimAmt, paidDate, gqbtQdNo, gqbtQdDate, claimField, claimAct, claimSummary, officers: officers.map(o => ({ name: o[0], agency: o[1], role: o[2] })) });
    window.HT_SOURCE_CLAIMS = [
        S('BT-2026-101', 'Đặng Văn Hưng', U_CHU, 95000000, '05/08/2026', '45/QĐ-UBND', '10/07/2026', 'Quản lý hành chính đất đai', 'Ban hành quyết định thu hồi đất không đúng thẩm quyền',
            'Thu hồi đất nông nghiệp không đúng thẩm quyền, không bồi thường hỗ trợ theo quy định.', [['Phùng Văn Quang', U_CHU, 'Phó Trưởng phòng Tài nguyên và Môi trường'], ['Nông Thị Diệu', U_A, 'Cán bộ địa chính']]),
        S('BT-2026-102', 'Công ty TNHH Minh Khang', U_CHU, 240000000, '12/08/2026', '48/QĐ-UBND', '18/07/2026', 'Xử lý vi phạm hành chính', 'Ra quyết định đình chỉ hoạt động kinh doanh trái pháp luật',
            'Đình chỉ hoạt động kinh doanh của doanh nghiệp khi chưa đủ căn cứ vi phạm hành chính.', [['Quách Văn Bình', U_CHU, 'Chánh Thanh tra quận'], ['Lục Thị Yến', U_B, 'Thanh tra viên']]),
        S('BT-2026-103', 'Trịnh Thị Lan', U_CHU, 68000000, '20/08/2026', '51/QĐ-UBND', '25/07/2026', 'Quản lý trật tự xây dựng', 'Cưỡng chế phá dỡ công trình sai chỉ giới được cấp phép',
            'Cưỡng chế phá dỡ phần công trình xây dựng đúng giấy phép, gây thiệt hại tài sản.', [['Ông Văn Thắng', U_A, 'Phó Chủ tịch UBND phường']]),
        S('BT-2026-104', 'Hồ Minh Trí', U_CHU, 132000000, '28/08/2026', '53/QĐ-UBND', '02/08/2026', 'Thi hành án hành chính', 'Chậm thực hiện bản án hành chính đã có hiệu lực pháp luật',
            'Chậm thi hành bản án hành chính về cấp giấy chứng nhận quyền sử dụng đất, gây thiệt hại thu nhập.', [['Tăng Văn Lực', U_CHU, 'Chuyên viên Văn phòng HĐND - UBND'], ['Khổng Thị Mến', U_B, 'Công chức địa chính - xây dựng'], ['Âu Văn Sơn', U_A, 'Công chức tư pháp - hộ tịch']]),
        S('BT-2026-105', 'Lưu Thị Phương', U_CHU, 54000000, '03/09/2026', '56/QĐ-UBND', '08/08/2026', 'Quản lý hộ tịch', 'Từ chối đăng ký hộ tịch trái pháp luật',
            'Từ chối đăng ký khai sinh trái quy định làm phát sinh thiệt hại do không hưởng chế độ an sinh.', [['Yên Thị Hòa', U_B, 'Công chức tư pháp - hộ tịch']]),
        // Trả lại ngân sách nhà nước một phần (KP-2026-130: Số tiền theo Quyết định 90.000.000, trả lại 30.000.000): Số tiền bồi thường = Số tiền đã chi thực tế 60.000.000;
        // Ngày hoàn tất chi = Ngày trả lại ngân sách nhà nước
        S('BT-2023-063', 'Phùng Thị Xuân', U_CHU, 60000000, '22/10/2026', '63/QĐ-UBND', '20/06/2023', 'Quản lý hành chính đất đai', 'Thu hồi đất không đúng đối tượng',
            'Thu hồi đất ở của hộ gia đình không thuộc đối tượng thu hồi theo quy hoạch, gây thiệt hại tài sản trên đất.', [['Kiều Văn Tiến', U_CHU, 'Công chức địa chính - xây dựng']]),
        // Ngoài phạm vi dữ liệu của đơn vị giả lập (đơn vị chi trả khác): không hiển thị trong popup
        S('BT-2026-106', 'Tôn Văn Kiên', 'UBND phường Cầu Giấy', 77000000, '15/08/2026', '61/QĐ-UBND', '20/07/2026', 'Quản lý hành chính đất đai', 'Cấp giấy chứng nhận quyền sử dụng đất sai đối tượng',
            'Cấp giấy chứng nhận quyền sử dụng đất cho người không có quyền, gây thiệt hại cho chủ sử dụng hợp pháp.', [['Bạch Văn Hiếu', 'UBND phường Cầu Giấy', 'Chuyên viên phòng Tài nguyên và Môi trường']])
    ];
    // Họ và tên người yêu cầu theo Mã hồ sơ GQBT (định danh vụ việc "Mã vụ việc - Họ và tên" trên Danh sách / Chi tiết)
    try { if (typeof CLAIMANT_BY_CODE !== 'undefined') window.HT_SOURCE_CLAIMS.forEach(s => { if (!CLAIMANT_BY_CODE[s.claimCode]) CLAIMANT_BY_CODE[s.claimCode] = s.claimant; }); } catch (e) { /* bỏ qua */ }
    // Người yêu cầu của vụ việc nguồn (hồ sơ Giải quyết YCBT Hoàn thành - quan_ly_boi_thuong_seedht.js)
    const HT_CLAIMANTS = { 'BT-2026-801': 'Nguyễn Hữu Lâm', 'BT-2026-802': 'Đặng Thị Hoa', 'BT-2026-803': 'Trịnh Quốc Bảo', 'BT-2026-804': 'Công ty TNHH Xây dựng Phú Thịnh', 'BT-2026-805': 'Lò Văn Tâm', 'BT-2026-806': 'Hà Thị Liên', 'BT-2026-808': 'Vũ Ngọc Ánh', 'BT-2026-809': 'Phí Văn Đức', 'BT-2026-810': 'Tống Thị Hằng', 'BT-2026-811': 'Lưu Đình Nam', 'BT-2026-812': 'Mai Thị Thu', 'BT-2026-813': 'Cù Văn Hải', 'BT-2026-814': 'Đoàn Thị Vân', 'BT-2026-815': 'Lương Đức Mạnh', 'BT-2026-816': 'Nghiêm Thị Hà', 'BT-2026-817': 'Kiều Thị Thơ', 'BT-2026-818': 'Thái Văn Lộc', 'BT-2026-819': 'Ninh Văn Hiển', 'BT-2026-820': 'Âu Thị Phượng', 'BT-2026-821': 'Hứa Văn Kiên', 'BT-2026-822': 'Bế Văn Thuận', 'BT-2026-823': 'La Văn Sinh', 'BT-2026-824': 'Mông Thị Hiền', 'BT-2026-825': 'Quản Văn Tư', 'BT-2026-826': 'Công ty Cổ phần Thương mại An Phú', 'BT-2026-827': 'Viên Văn Trí', 'BT-2026-828': 'Đào Văn Chính', 'BT-2026-832': 'Công ty TNHH Dịch vụ Hưng Phát', 'BT-2026-833': 'Hoàng Văn Thái', 'BT-2026-834': 'Kha Thị Duyên', 'BT-2026-835': 'Lạc Văn Toàn', 'BT-2026-836': 'Mạch Thị Nga', 'BT-2026-837': 'Nguyễn Thị Thoa', 'BT-2026-838': 'Phương Văn Khôi', 'BT-2026-839': 'Hộ kinh doanh Quang Minh', 'BT-2026-840': 'Công ty Cổ phần Kho vận Bắc Hà', 'BT-2026-841': 'Đinh Văn Lực', 'BT-2026-842': 'Trương Thị Mai', 'BT-2026-843': 'Lý Văn Hậu', 'BT-2026-844': 'Công ty TNHH Xây dựng Thành Công' };
    try { if (typeof CLAIMANT_BY_CODE !== 'undefined') Object.keys(HT_CLAIMANTS).forEach(k => { CLAIMANT_BY_CODE[k] = HT_CLAIMANTS[k]; }); } catch (e) { /* bỏ qua */ }
    // Đơn vị của người dùng giả lập (thanh giả lập Hoàn trả): xác định phạm vi dữ liệu của nguồn lập hồ sơ
    window.htSourceInScope = function (src) {
        if (!src || !src.agency) return true;
        let sc = 'don_vi_chu';
        try { sc = sessionStorage.getItem('htMockScope') || sc; } catch (e) { /* bỏ qua */ }
        const unit = { don_vi_chu: U_CHU, don_vi_a: U_A, don_vi_b: U_B, stp: 'Sở Tư pháp Hà Nội' }[sc] || U_CHU;
        return src.agency === unit;
    };

    if (typeof dossiersList === 'undefined') return;
    const isDetail = typeof addMockDossier === 'function';
    CASES.forEach(c => {
        const base = {
            id: c.id, code: c.id, claimCode: c.claimCode, claimSummary: c.claimSummary, agency: 'Sở Tư pháp Hà Nội', claimAmt: c.claimAmt, claimDate: '20/06/2026',
            status: c.status, dateCreated: '01/07/2026', hdDecision: c.hdDecision, hdDate: c.hdDate, refundOfficers: c.officers.map(o => Object.assign({}, o)), payments: []
        };
        if (c.extra) Object.assign(base, c.extra);
        if (isDetail) {
            addMockDossier(Object.assign(base, { qdStatus: null, qdNo: '', qdDate: '', qdSigner: '', qdSummary: '', qdFileName: '', conclusionFile: '', timeline: [], refundTotal: c.officers.reduce((s, o) => s + o.total, 0) }));
        } else if (!dossiersList.some(d => d.id === c.id)) {
            dossiersList.push(Object.assign(base, {
                officerName: c.officers.map(o => o.name).join(', '), officerRole: c.officers.map(o => o.role).join(', '), deadlineDate: '', daysLeft: null,
                refundTotal: c.officers.reduce((s, o) => s + o.total, 0), refundMethod: '', refundMonthly: 0, qdDate: ''
            }));
        }
    });
    // Lĩnh vực tố tụng hình sự (SRS 05/11/2026): Đơn vị ban hành QĐ hoàn trả là Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại của từng cán bộ (mỗi đơn vị 01 QĐ)
    // HT-2026-021: 02 cán bộ khác Cơ quan trực tiếp quản lý (UBND Phường Bồ Đề, UBND phường Hải An) -> 02 QĐ hoàn trả;
    // Đặng Thị Lan do UBND Phường Bồ Đề trả lương (chỉ nhận Quyết định hoàn trả và thu tiền)
    const TTHS_CODES = ['HT-2026-021', 'HT-2026-027', 'HT-2026-028'];
    dossiersList.forEach(d => { if (TTHS_CODES.includes(d.code || d.id)) d.claimField = 'Trong hoạt động tố tụng hình sự'; });
    // HT-2026-008 (Họp hội đồng): thêm 01 cán bộ (trước dùng để demo đình chỉ một phần cán bộ; bỏ từ 06/11/2026)
    const d8 = dossiersList.find(d => d.id === 'HT-2026-008');
    if (d8 && Array.isArray(d8.refundOfficers) && !d8.refundOfficers.some(o => o.name === 'Nguyễn Thị Hoa')) {
        d8.refundOfficers.push(Object.assign(OF('Nguyễn Thị Hoa', U_A, 'Cán bộ tư pháp', 'Vô ý', 15000000, 'Hoàn trả nhiều lần'), { xl: 'Hoàn trả', status: 'Họp hội đồng' }));
    }
    // Dời ngày dữ liệu mẫu theo ngày hiện tại: mọi hồ sơ mẫu cùng 01 độ lệch (giữ thứ tự, khoảng cách giữa các hồ sơ và giữa các mốc trong hồ sơ)
    // để bộ lọc mặc định Từ ngày (đầu tháng) - Đến ngày (hôm nay) có hồ sơ. Không dời hồ sơ do người dùng lập (btnn_hoantra_created_v1).
    try {
        let createdCodes = [];
        try { createdCodes = (JSON.parse(localStorage.getItem('btnn_hoantra_created_v1') || '[]') || []).map(d => d && (d.code || d.id)); } catch (e) { createdCodes = []; }
        const isSeed = d => d && /^HT-2026-0(0[1-9]|[1-3]\d|4[0-4])$/.test(d.code || d.id || '') && !createdCodes.includes(d.code || d.id);
        const walk = (o, key) => {
            if (typeof o === 'string') return window.htShiftDate(o, /deadline|nextDate|^han[A-Z]/i.test(key || ''));
            if (Array.isArray(o)) { o.forEach((v, i) => { o[i] = walk(v, key); }); return o; }
            if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = walk(o[k], k); }); return o; }
            return o;
        };
        dossiersList.forEach(d => { if (isSeed(d) && !d._htDateShifted) { walk(d, ''); d._htDateShifted = true; } });
        if (window.HT_EXTRA_SEED && !window.__htExtraShifted) { walk(window.HT_EXTRA_SEED, ''); window.__htExtraShifted = true; }
        // Ngày khởi tạo hồ sơ mẫu (dateCreated - chỉ dùng cho bộ lọc Từ ngày / Đến ngày, không hiển thị): độ lệch chung ở trên không đưa được
        // hồ sơ mẫu khởi tạo từ tháng 5 - 9 vào khoảng mặc định (ngày đầu tháng - ngày hiện tại) -> danh sách mặc định gần như trống.
        // Dàn ngày khởi tạo của hồ sơ mẫu trong tháng hiện tại, giữ thứ tự ngày khởi tạo giữa các hồ sơ mẫu.
        if (!window.__htCreatedInMonth) {
            window.__htCreatedInMonth = true;
            const dn = s => { const m = String(s || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); return m ? (+m[3]) * 10000 + (+m[2]) * 100 + (+m[1]) : 0; };
            const p2 = n => String(n).padStart(2, '0'), now = new Date(), last = now.getDate(), my = p2(now.getMonth() + 1) + '/' + now.getFullYear();
            const seeds = dossiersList.filter(isSeed).sort((a, b) => dn(a.dateCreated) - dn(b.dateCreated));
            seeds.forEach((d, i) => { d.dateCreated = p2(seeds.length > 1 ? 1 + Math.round(i * (last - 1) / (seeds.length - 1)) : last) + '/' + my; });
        }
    } catch (e) { /* bỏ qua */ }
    if (!isDetail) return;

    // Màn Chi tiết: hồ sơ do người dùng khởi tạo từ màn Danh sách (localStorage 'btnn_hoantra_created_v1') mở lại được khi đã đóng phiên
    try {
        const created = JSON.parse(localStorage.getItem('btnn_hoantra_created_v1') || '[]');
        if (Array.isArray(created)) created.forEach(d => {
            if (!d || !d.id || dossiersList.some(x => x.id === d.id)) return;
            addMockDossier(Object.assign({ qdStatus: null, qdNo: '', qdDate: '', qdSigner: '', qdSummary: '', qdFileName: '', conclusionFile: '', timeline: [], payments: [] }, d));
        });
    } catch (e) { /* bỏ qua */ }
    // Bước 1 - Tài liệu liên quan: Quyết định giải quyết bồi thường của vụ việc nguồn
    window.addEventListener('DOMContentLoaded', () => {
        try {
            if (typeof activeDossier === 'undefined' || !activeDossier || !activeDossier.gqbtQdNo || typeof s1RelatedDocs === 'undefined') return;
            const no = activeDossier.gqbtQdNo;
            if (s1RelatedDocs.some(x => x.code === no)) return;
            s1RelatedDocs.splice(0, s1RelatedDocs.length, { title: 'Quyết định giải quyết bồi thường số ' + no, code: no, date: activeDossier.claimDate || '', fileName: 'Quyet_dinh_giai_quyet_boi_thuong_' + no.replace(/\//g, '_') + '.pdf' });
            if (typeof renderStep1 === 'function') renderStep1();
        } catch (e) { /* bỏ qua */ }
    });

    // Màn Chi tiết: lượt trình Quyết định chấm dứt việc xem xét trách nhiệm hoàn trả (Mẫu 39/BTNN chế độ chấm dứt) của hồ sơ mẫu
    const CD_SEED = { 'HT-2026-012': 'pending', 'HT-2026-020': 'rejected', 'HT-2026-011': 'done' };
    window.addEventListener('DOMContentLoaded', () => {
        const k = activeDossier && CD_SEED[activeDossier.id];
        if (!k || (activeDossier.dcht && activeDossier.dcht.mode === 'cd') || typeof tlhdLevels !== 'function') return;
        const levels = tlhdLevels();
        const r = {
            method: 'online', docSrc: 'gen', mode: 'cd', prevStatus: 'Chờ chấm dứt', so: k === 'done' ? '27/QĐ-UBND' : '', ngay: window.htShiftDate('22/09/2026'),
            canCu: typeof cdhtCanCuDefault === 'function' ? cdhtCanCuDefault() : '', vbCanCu: '', lyDo: activeDossier.cdLyDo || '', noiNhan: typeof dchtNoiNhanDefault === 'function' ? dchtNoiNhanDefault() : '',
            fileName: 'Mau_39_BTNN_Quyet_dinh_cham_dut_xem_xet_hoan_tra_' + activeDossier.code + '.docx', uploadMeta: null,
            attachments: [{ name: 'Văn bản kiến nghị của Hội đồng xem xét trách nhiệm hoàn trả', file: { id: '', name: 'Van_ban_kien_nghi_hoan_tra.pdf', size: 245760, type: 'application/pdf' } }],
            levels, assignees: levels.map(l => (l.leaders && l.leaders[0] ? l.leaders[0].id : '')), coords: [], enableNhay: true,
            content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định chấm dứt việc xem xét trách nhiệm hoàn trả.', level: k === 'done' ? levels.length : 0, submittedAt: window.htShiftDate('22/09/2026 09:00'),
            returned: k === 'rejected' ? { reason: 'Cần bổ sung giấy chứng tử của người thi hành công vụ gây thiệt hại vào hồ sơ trình ký.', by: 'Lãnh đạo cấp 1', at: window.htShiftDate('23/09/2026 10:30') } : null
        };
        if (k === 'done') { r.signedAt = window.htShiftDate('24/09/2026 15:00'); r.issuedAt = r.signedAt; }
        activeDossier.dcht = r;
        if (typeof renderStateLayout === 'function') renderStateLayout();
    });

    // Màn Chi tiết: lượt trình Quyết định đình chỉ cả hồ sơ (Chờ duyệt / Bị trả lại) cho HT-2026-023, HT-2026-024
    // window: chạy sau khối khởi tạo của trang (chọn hồ sơ theo id)
    window.addEventListener('DOMContentLoaded', () => {
        const c = CASES.find(x => activeDossier && x.id === activeDossier.id && x.dcht);
        if (!c || activeDossier.dcht || typeof tlhdLevels !== 'function') return;
        const levels = tlhdLevels();
        activeDossier.dcht = {
            method: 'online', docSrc: 'gen', prevStatus: c.prev, so: '', ngay: window.htShiftDate('20/09/2026'),
            canCu: typeof DCHT_CAN_CU_DEFAULT !== 'undefined' ? (Array.isArray(DCHT_CAN_CU_DEFAULT) ? DCHT_CAN_CU_DEFAULT.join('\n') : String(DCHT_CAN_CU_DEFAULT)) : '',
            vbCanCu: 'Quyết định số 15/QĐ-UBND ngày 02/03/2026 của Ủy ban nhân dân phường Việt Hưng', noiNhan: typeof dchtNoiNhanDefault === 'function' ? dchtNoiNhanDefault() : '',
            fileName: 'Mau_39_BTNN_Quyet_dinh_dinh_chi_xem_xet_hoan_tra_' + activeDossier.code + '.docx', uploadMeta: null, attachments: [{ name: 'Văn bản hủy bỏ văn bản làm căn cứ yêu cầu bồi thường', file: { id: '', name: 'Van_ban_huy_bo_can_cu_YCBT.pdf', size: 312320, type: 'application/pdf' } }],
            levels, assignees: levels.map(l => (l.leaders && l.leaders[0] ? l.leaders[0].id : '')), coords: [], enableNhay: true,
            content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả.', level: 0, submittedAt: window.htShiftDate('20/09/2026 09:00'),
            returned: c.dcht === 'rejected' ? { reason: 'Cần ghi rõ số, ngày văn bản hủy bỏ văn bản làm căn cứ yêu cầu bồi thường.', by: 'Lãnh đạo cấp 1', at: window.htShiftDate('21/09/2026 10:30') } : null
        };
        if (typeof renderStateLayout === 'function') renderStateLayout();
    });
})();
