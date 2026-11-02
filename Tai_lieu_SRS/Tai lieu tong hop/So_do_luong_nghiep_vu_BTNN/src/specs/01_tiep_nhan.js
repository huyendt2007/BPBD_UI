// 01_Tiep_nhan_ho_so.md - so buoc khop cot STT cua Bang cac buoc
SPECS.push({
  id: '01_1_tiep_nhan_moi', title: 'QT1.1. Tiếp nhận mới và trình ký Phiếu tiếp nhận',
  lanes: [{ name: 'Cán bộ tiếp nhận', cols: 2 }, { name: 'Lãnh đạo các cấp ký duyệt', cols: 1 }, { name: 'Hệ thống', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, col: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, col: 0, row: 1, type: 'step', num: 1, text: 'Bấm Tiếp nhận mới (MH01, tab Chờ xử lý)' },
    { id: 'n2', lane: 0, col: 0, row: 2, type: 'step', num: 2, text: 'Nhập hồ sơ tại MH02, bấm Lưu và trình ký' },
    { id: 'd1', lane: 0, col: 0, row: 3, type: 'decision', text: 'Dữ liệu hợp lệ?' },
    { id: 'd2', lane: 0, col: 0, row: 4, type: 'decision', text: 'Hình thức ký? (MH07)' },
    { id: 'n3', lane: 0, col: 0, row: 5, type: 'step', num: 3, text: 'Chọn Lãnh đạo từng cấp, Trình Lãnh đạo', status: 'Chờ duyệt tiếp nhận' },
    { id: 'n4', lane: 0, col: 1, row: 4, type: 'step', num: 4, text: 'Tải PDF đã ký, Ban hành văn bản' },
    { id: 'n7', lane: 0, col: 1, row: 6, type: 'step', num: 7, text: 'Sửa hồ sơ Bị trả lại, trình lại hoặc Xóa' },
    { id: 'n5', lane: 1, col: 0, row: 4, type: 'step', num: 5, text: 'Ký duyệt Phiếu tiếp nhận (MH04)' },
    { id: 'dL', lane: 1, col: 0, row: 5, type: 'decision', text: 'Đồng ý?' },
    { id: 'n6', lane: 1, col: 0, row: 6, type: 'step', num: 6, text: 'Từ chối, nhập lý do', status: 'Bị trả lại' },
    { id: 'dC', lane: 2, col: 0, row: 4, type: 'decision', text: 'Cấp cuối?' },
    { id: 's2', lane: 2, col: 0, row: 3, type: 'step', text: 'Ký số, ban hành Phiếu tiếp nhận', status: 'Chờ phân công', hl: true },
    { id: 'off', lane: 2, col: 0, row: 2, type: 'offpage', text: 'Sang QT1.2 Phân công' },
    { id: 's1', lane: 2, col: 0, row: 6, type: 'note', text: 'Không xác định được cấp ký: không lưu, báo liên hệ Quản trị' }
  ],
  edges: [
    { from: 'S', to: 'n1' }, { from: 'n1', to: 'n2' }, { from: 'n2', to: 'd1' },
    { from: 'd1', to: 'n2', label: 'Không', fs: 'R', ts: 'R' },
    { from: 'd1', to: 'd2', label: 'Có' },
    { from: 'd2', to: 'n3', label: 'Ký số' },
    { from: 'd2', to: 'n4', label: 'Ký ngoài' },
    { from: 'n3', to: 'dL' },
    { from: 'n3', to: 's1', label: 'Không xác định cấp', dashed: true },
    { from: 'dL', to: 'n5', label: 'Có' },
    { from: 'dL', to: 'n6', label: 'Không' },
    { from: 'n5', to: 'dC' },
    { from: 'dC', to: 'dL', label: 'Không: cấp tiếp theo' },
    { from: 'dC', to: 's2', label: 'Có' },
    { from: 'n4', to: 's2' },
    { from: 's2', to: 'off' },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'd2', label: 'Trình lại từ cấp 1' }
  ]
});
SPECS.push({
  id: '01_2_phan_cong', title: 'QT1.2. Nhận hồ sơ, Phân công và Thu hồi',
  lanes: [{ name: 'Hệ thống ngoài / Phân hệ khác', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Lãnh đạo đơn vị đang phân công', cols: 2 }, { name: 'Cán bộ chủ trì', cols: 1 }],
  nodes: [
    { id: 'a1', lane: 0, col: 0, row: 0, type: 'offpage', text: 'Dịch vụ công gửi hồ sơ' },
    { id: 'a2', lane: 0, col: 0, row: 1, type: 'offpage', text: 'Giải quyết YCBT: Chuyển CQGQBT / Không thụ lý không thuộc thẩm quyền' },
    { id: 'a3', lane: 0, col: 0, row: 2, type: 'offpage', text: 'Xác định CQGQBT: Kết quả xác định được ban hành' },
    { id: 'a4', lane: 0, col: 0, row: 3, type: 'offpage', text: 'Từ QT1.1: Phiếu tiếp nhận đã ban hành' },
    { id: 's1', lane: 1, col: 0, row: 1, type: 'step', text: 'Hồ sơ tại đơn vị gốc', status: 'Chờ phân công', hl: true },
    { id: 'dP', lane: 2, col: 0, row: 1, type: 'decision', text: 'Hình thức phân công? (MH05)' },
    { id: 'n8', lane: 2, col: 1, row: 1, type: 'step', num: 8, text: 'Chuyển đơn vị cấp dưới', status: 'Đang phân công' },
    { id: 'n9', lane: 2, col: 0, row: 2, type: 'step', num: 9, text: 'Phân công cán bộ chủ trì', status: 'Chờ tiếp nhận' },
    { id: 'n10', lane: 2, col: 1, row: 3, type: 'step', num: 10, text: 'Thu hồi lượt chuyển gần nhất (MH06)' },
    { id: 'dT', lane: 2, col: 1, row: 4, type: 'decision', text: 'Bên nhận đã xử lý?' },
    { id: 's3', lane: 1, col: 0, row: 3, type: 'step', text: 'Xóa lượt chuyển gần nhất', status: 'Đang phân công / Chờ phân công' },
    { id: 's4', lane: 1, col: 0, row: 4, type: 'note', text: 'Báo MSG-ERR-BTNN-LXL-004, tải lại danh sách' },
    { id: 'o1', lane: 3, col: 0, row: 2, type: 'offpage', text: 'Sang phân hệ xử lý theo Loại hồ sơ (QT2 / QT3)' }
  ],
  edges: [
    { from: 'a1', to: 's1' }, { from: 'a2', to: 's1' }, { from: 'a3', to: 's1' }, { from: 'a4', to: 's1' },
    { from: 's1', to: 'dP' },
    { from: 'dP', to: 'n8', label: 'Chuyển đơn vị' },
    { from: 'dP', to: 'n9', label: 'Phân công cán bộ' },
    { from: 'n8', to: 'dP', label: 'Lãnh đạo đơn vị nhận', fs: 'T', ts: 'T' },
    { from: 'n9', to: 'o1' },
    { from: 'n8', to: 'n10', label: 'Thu hồi', dashed: true },
    { from: 'n9', to: 'n10', label: 'Thu hồi', dashed: true },
    { from: 'n10', to: 'dT' },
    { from: 'dT', to: 's4', label: 'Có' },
    { from: 'dT', to: 's3', label: 'Không' },
    { from: 's3', to: 's1', label: 'Hồ sơ trở lại', ts: 'B' }
  ]
});
