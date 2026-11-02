// 00_Tong_quan_luong_BTNN.md - QT0.3 trang thai chinh cua vu viec
SPECS.push({
  id: '00_3_trang_thai_vu_viec', title: 'QT0.3. Trạng thái chính của vụ việc (Giải quyết YCBT)',
  lanes: [{ name: 'Tiếp nhận hồ sơ', cols: 1 }, { name: 'Giải quyết YCBT - thụ lý', cols: 3 }, { name: 'Giải quyết YCBT - giải quyết', cols: 1 }, { name: 'Quyết định GQBT / Kinh phí', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'pc', lane: 0, row: 1, type: 'step', text: 'Chờ phân công / Đang phân công' },
    { id: 'ctn', lane: 1, col: 1, row: 1, type: 'step', text: 'Chờ tiếp nhận' },
    { id: 'ycbs', lane: 1, col: 2, row: 1, type: 'step', text: 'Yêu cầu bổ sung' },
    { id: 'btl', lane: 1, col: 0, row: 2, type: 'step', text: 'Bị trả lại' },
    { id: 'cd', lane: 1, col: 1, row: 2, type: 'step', text: 'Chờ duyệt' },
    { id: 'ktl', lane: 1, col: 1, row: 4, type: 'step', text: 'Không thụ lý (kết thúc)', hl: true },
    { id: 'dc', lane: 1, col: 2, row: 4, type: 'step', text: 'Đã chuyển CQGQBT (kết thúc)', hl: true },
    { id: 'cn', lane: 2, row: 2, type: 'step', text: 'Cử người giải quyết bồi thường' },
    { id: 'xm', lane: 2, row: 3, type: 'step', text: 'Xác minh thiệt hại' },
    { id: 'tl', lane: 2, row: 4, type: 'step', text: 'Thương lượng' },
    { id: 'cbh', lane: 2, row: 5, type: 'step', text: 'Chờ ban hành QĐ' },
    { id: 'cct', lane: 3, row: 5, type: 'step', text: 'Chờ chi trả' },
    { id: 'hth', lane: 3, row: 6, type: 'step', text: 'Hoàn thành (kết thúc)', hl: true }
  ],
  edges: [
    { from: 'S', to: 'pc' },
    { from: 'pc', to: 'ctn', label: 'Phân công cán bộ' },
    { from: 'ctn', to: 'cd', label: 'Trình', fs: 'B', ts: 'T' },
    { from: 'cd', to: 'btl', label: 'Từ chối', fs: 'L', ts: 'R' },
    { from: 'btl', to: 'cd', label: 'Trình lại', fs: 'T', ts: 'T' },
    { from: 'cd', to: 'ycbs', label: 'Duyệt Yêu cầu bổ sung', fs: 'T', ts: 'B' },
    { from: 'ycbs', to: 'ctn', label: 'Tiếp nhận bổ sung', fs: 'L', ts: 'R' },
    { from: 'cd', to: 'ktl', label: 'Duyệt Không thụ lý', fs: 'B', ts: 'T' },
    { from: 'cd', to: 'dc', label: 'Không thuộc thẩm quyền / Chuyển CQGQBT', fs: 'B', ts: 'T' },
    { from: 'cd', to: 'cn', label: 'Duyệt Thông báo thụ lý', fs: 'R' },
    { from: 'cn', to: 'xm', label: 'Ban hành QĐ cử người' },
    { from: 'xm', to: 'tl', label: 'Hoàn thành xác minh' },
    { from: 'tl', to: 'cbh', label: 'Lưu kết quả thương lượng' },
    { from: 'cbh', to: 'cct', label: 'Ban hành QĐ GQBT' },
    { from: 'cct', to: 'hth', label: 'Chi đủ / Trả lại ngân sách' }
  ]
});
