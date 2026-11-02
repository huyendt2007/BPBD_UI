// 00_Tong_quan_luong_BTNN.md
SPECS.push({
  id: '00_1_ban_do_lien_phan_he', title: 'QT0.1. Bản đồ luồng liên phân hệ - cùng 01 Mã vụ việc VVBT',
  lanes: [{ name: 'Người yêu cầu / Cổng DVC', cols: 1 }, { name: 'Tiếp nhận và xác định cơ quan', cols: 1 }, { name: 'Giải quyết và quyết định', cols: 1 }, { name: 'Kinh phí và hoàn trả', cols: 1 }, { name: 'Phân hệ bên cạnh', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'dvc', lane: 0, row: 1, type: 'step', text: 'Nộp hồ sơ YCBT trên Cổng Dịch vụ công', hl: true },
    { id: 'tt', lane: 0, row: 2, type: 'step', text: 'Nộp trực tiếp / qua dịch vụ bưu chính' },
    { id: 'kq', lane: 0, row: 4, type: 'step', text: 'Nhận kết quả theo bước trên Cổng Dịch vụ công', hl: true },
    { id: 'tn', lane: 1, row: 1, type: 'step', text: '01 Tiếp nhận hồ sơ: Phiếu tiếp nhận, Phân công' },
    { id: 'xd', lane: 1, row: 3, type: 'step', text: '02 Xác định CQGQBT (Bộ Tư pháp / Sở Tư pháp)' },
    { id: 'gq', lane: 2, row: 1, type: 'step', text: '03 Giải quyết YCBT, nhánh Phục hồi danh dự' },
    { id: 'qd', lane: 2, row: 3, type: 'step', text: '04 Quyết định GQBT' },
    { id: 'kp', lane: 3, row: 3, type: 'step', text: '05 Kinh phí: Tạm ứng / Chi trả' },
    { id: 'ht', lane: 3, row: 5, type: 'step', text: '06 Xem xét trách nhiệm hoàn trả' },
    { id: 'E', lane: 3, row: 6, type: 'end', text: 'Kết thúc' },
    { id: 'tc', lane: 4, row: 0, type: 'step', text: '08 Tra cứu vụ việc (chỉ xem)' },
    { id: 'ta', lane: 4, row: 2, type: 'step', text: '07 Theo dõi vụ việc tại Tòa án' },
    { id: 'sup', lane: 4, row: 4, type: 'note', text: '09 - 11 Nghiệp vụ STP, dùng chung BTP và STP, BTP (ghi nhận độc lập)' },
    { id: 'rpt', lane: 4, row: 5, type: 'step', text: '12 - 14 Báo cáo, Chấm điểm, Dashboard, Cấu hình' }
  ],
  edges: [
    { from: 'S', to: 'dvc' }, { from: 'S', to: 'tt', fs: 'L', ts: 'L' },
    { from: 'dvc', to: 'tn' }, { from: 'tt', to: 'tn' },
    { from: 'tn', to: 'xd', label: 'Loại Xác định CQGQBT' },
    { from: 'tn', to: 'gq', label: 'Loại Giải quyết YCBT' },
    { from: 'xd', to: 'tn', label: 'Tự động chuyển CQGQBT', dashed: true, fs: 'L', ts: 'L' },
    { from: 'gq', to: 'qd', label: 'Chờ ban hành QĐ' },
    { from: 'qd', to: 'kp', label: 'Có hiệu lực' },
    { from: 'gq', to: 'kp', label: 'Tạo QĐ tạm ứng', dashed: true },
    { from: 'kp', to: 'ht', label: 'Đã hoàn tất chi trả' },
    { from: 'ht', to: 'E' },
    { from: 'ta', to: 'kp', label: 'Đã có bản án/QĐ' },
    { from: 'gq', to: 'kq', label: 'Gửi kết quả', dashed: true, fs: 'B', ts: 'R' },
    { from: 'gq', to: 'tc', label: 'Dữ liệu vụ việc', dashed: true },
    { from: 'kp', to: 'rpt', label: 'Số liệu', dashed: true }
  ]
});
SPECS.push({
  id: '00_2_ma_ho_so', title: 'QT0.2. Mã vụ việc và Mã hồ sơ qua các phân hệ',
  lanes: [{ name: 'Điểm vào vụ việc', cols: 1 }, { name: 'Xác định CQGQBT (XD-)', cols: 1 }, { name: 'Giải quyết YCBT (BT-)', cols: 1 }, { name: 'Xem xét hoàn trả (HT-)', cols: 1 }],
  nodes: [
    { id: 'v0', lane: 0, row: 0, type: 'step', text: 'Sinh Mã vụ việc VVBT: Tiếp nhận mới / Dịch vụ công / Thêm mới chọn Vụ việc mới', hl: true },
    { id: 'new', lane: 0, row: 3, type: 'note', text: 'Nộp lại sau Không thụ lý: vụ việc mới, Mã vụ việc mới' },
    { id: 'xd', lane: 1, row: 1, type: 'step', text: 'Hồ sơ XD-' },
    { id: 'xdn', lane: 1, row: 3, type: 'step', text: 'Hồ sơ XD- mới tại Bộ Tư pháp / Sở Tư pháp' },
    { id: 'bt', lane: 2, row: 1, type: 'step', text: 'Hồ sơ BT- (dùng cho cả 03 Loại yêu cầu)' },
    { id: 'btn', lane: 2, row: 3, type: 'step', text: 'Hồ sơ BT- mới tại cơ quan nhận', status: 'Hồ sơ cũ: Đã chuyển CQGQBT' },
    { id: 'ht', lane: 3, row: 2, type: 'step', text: 'Hồ sơ HT- (01 hồ sơ / vụ việc)' }
  ],
  edges: [
    { from: 'v0', to: 'xd' }, { from: 'v0', to: 'bt' },
    { from: 'xd', to: 'bt', label: 'Tự động chuyển CQGQBT' },
    { from: 'bt', to: 'btn', label: 'Chuyển CQGQBT / Không thụ lý: cơ quan khác' },
    { from: 'bt', to: 'xdn', label: 'Không thụ lý: Bộ Tư pháp / Sở Tư pháp', fs: 'B', ts: 'T' },
    { from: 'xdn', to: 'btn', label: 'Kết quả xác định' },
    { from: 'bt', to: 'ht', label: 'Đã hoàn tất chi trả' },
    { from: 'bt', to: 'new', label: 'Không thụ lý', dashed: true }
  ]
});
