// 03_Giai_quyet_YCBT.md - so buoc khop Bang cac buoc (1 - 22)
SPECS.push({
  id: '03_2_cu_nguoi_xac_minh', title: 'QT3.2. Giải quyết YCBT - cử người, xác minh, thương lượng, Quyết định, chi trả',
  lanes: [{ name: 'Cán bộ chủ trì / cán bộ được cử', cols: 2 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ khác', cols: 1 }],
  nodes: [
    { id: 'a', lane: 0, col: 0, row: 0, type: 'offpage', text: 'Từ QT3.1: Cử người giải quyết bồi thường' },
    { id: 'n6', lane: 0, col: 0, row: 1, type: 'step', num: 8, text: 'Cử người giải quyết, trình Quyết định Mẫu 06/BTNN' },
    { id: 'up', lane: 0, col: 1, row: 2, type: 'step', num: 7, text: 'Cập nhật hồ sơ Bị trả lại, trình lại' },
    { id: 'n7', lane: 0, col: 0, row: 3, type: 'step', num: 9, text: 'Cập nhật kết quả xác minh, Hoàn thành xác minh', status: 'Thương lượng' },
    { id: 'n8', lane: 0, col: 0, row: 4, type: 'step', num: 10, text: 'Cập nhật kết quả thương lượng, Lưu', status: 'Chờ ban hành QĐ' },
    { id: 'n9', lane: 0, col: 0, row: 5, type: 'step', num: 11, text: 'Lập, trình Quyết định GQBT', status: 'Chờ chi trả' },
    { id: 'n10', lane: 0, col: 0, row: 6, type: 'step', num: 12, text: 'Chi trả đủ tại phân hệ Kinh phí', status: 'Hoàn thành' },
    { id: 'n11', lane: 0, col: 1, row: 4, type: 'step', num: 13, text: 'Chuyển CQGQBT (Thao tác khác)', status: 'Đã chuyển CQGQBT' },
    { id: 'dL', lane: 1, row: 1, type: 'decision', text: 'Ký duyệt? (như bước 6)' },
    { id: 's3', lane: 2, row: 2, type: 'step', text: 'Ban hành Quyết định cử người', status: 'Xác minh thiệt hại', hl: true },
    { id: 'sP', lane: 2, row: 3, type: 'step', text: 'Chỉ yêu cầu phục hồi danh dự', status: 'Đang phục hồi danh dự', hl: true },
    { id: 'oP', lane: 3, row: 3, type: 'offpage', text: 'QT3.4 Phục hồi danh dự' },
    { id: 'oT', lane: 3, row: 4, type: 'offpage', text: 'QT1.2 tại cơ quan nhận' },
    { id: 'oQ', lane: 3, row: 5, type: 'offpage', text: 'QT4.1 Quyết định GQBT' },
    { id: 'oK', lane: 3, row: 6, type: 'offpage', text: 'QT5.1 Chi trả tiền bồi thường' }
  ],
  edges: [
    { from: 'a', to: 'n6' },
    { from: 'n6', to: 'dL', label: 'Ký số' },
    { from: 'n6', to: 's3', label: 'Ký ngoài', fs: 'B' },
    { from: 'dL', to: 's3', label: 'Cấp cuối Ký duyệt' },
    { from: 'dL', to: 'up', label: 'Từ chối' },
    { from: 'up', to: 'n6', label: 'Trình lại' },
    { from: 's3', to: 'n7' },
    { from: 's3', to: 'sP', label: 'Chỉ PHDD' },
    { from: 'sP', to: 'oP' },
    { from: 'n7', to: 'n8' }, { from: 'n8', to: 'n9' }, { from: 'n9', to: 'n10' },
    { from: 'n9', to: 'oQ', dashed: true }, { from: 'n10', to: 'oK', dashed: true },
    { from: 'n8', to: 'n11', label: 'Thao tác khác', dashed: true },
    { from: 'n11', to: 'oT', label: 'Cấp cuối duyệt' }
  ]
});
SPECS.push({
  id: '03_4_phuc_hoi_danh_du', title: 'QT3.4. Nhánh Phục hồi danh dự và hồ sơ cán bộ chủ động phục hồi danh dự',
  lanes: [{ name: 'Cán bộ xử lý', cols: 2 }, { name: 'Lãnh đạo', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ khác', cols: 1 }],
  nodes: [
    { id: 'n21', lane: 0, col: 0, row: 0, type: 'step', num: 23, text: 'Tạo yêu cầu: Cán bộ chủ động phục hồi danh dự, Trình Lãnh đạo' },
    { id: 'n17', lane: 0, col: 0, row: 2, type: 'step', num: 19, text: 'Trình ký Thông báo tổ chức thực hiện (Mẫu 26/BTNN)' },
    { id: 'n18', lane: 0, col: 0, row: 3, type: 'step', num: 20, text: 'Nhập ý kiến phản hồi của người bị thiệt hại' },
    { id: 'dY', lane: 0, col: 0, row: 4, type: 'decision', text: 'Đồng ý / ý kiến khác / điều chỉnh?' },
    { id: 'dY2', lane: 0, col: 1, row: 4, type: 'decision', text: 'Đề nghị chưa thực hiện?' },
    { id: 'n19', lane: 0, col: 0, row: 5, type: 'step', num: 21, text: 'Thực hiện xin lỗi / đăng báo, Hoàn thành phục hồi danh dự', status: 'Hoàn thành' },
    { id: 'n20', lane: 0, col: 1, row: 6, type: 'step', num: 22, text: 'Tiếp tục thực hiện phục hồi danh dự' },
    { id: 'dL', lane: 1, row: 0, type: 'decision', text: 'Ký duyệt?' },
    { id: 'n22', lane: 1, row: 1, type: 'step', num: 24, text: 'Cử người phục hồi danh dự: Chuyển đơn vị / Phân công cán bộ', status: 'Đang phục hồi danh dự' },
    { id: 'tb', lane: 1, row: 2, type: 'step', text: 'Ký duyệt Thông báo (như bước 6)' },
    { id: 's0', lane: 2, row: 0, type: 'note', text: 'Bị trả lại: Cập nhật / Xóa (chỉ người tạo)' },
    { id: 'sH', lane: 2, row: 4, type: 'step', text: 'Hoãn phục hồi danh dự', hl: true },
    { id: 'sT', lane: 2, row: 5, type: 'step', text: 'Từ chối quyền: Trạng thái PHDD Hoàn thành, bắt buộc tài liệu', hl: true },
    { id: 'a', lane: 3, row: 2, type: 'offpage', text: 'Từ QT3.2: vụ việc có yêu cầu PHDD sau cử người' }
  ],
  edges: [
    { from: 'n21', to: 'dL' },
    { from: 'dL', to: 'n22', label: 'Có' },
    { from: 'dL', to: 's0', label: 'Từ chối' },
    { from: 'n22', to: 'n17' },
    { from: 'a', to: 'n17', ts: 'B' },
    { from: 'n17', to: 'tb' },
    { from: 'tb', to: 'n18', label: 'Thông báo ban hành' },
    { from: 'n18', to: 'dY' },
    { from: 'dY', to: 'n19', label: 'Có', fs: 'B' },
    { from: 'dY', to: 'dY2', label: 'Không', fs: 'R' },
    { from: 'dY2', to: 'sH', label: 'Có', fs: 'R' },
    { from: 'dY2', to: 'sT', label: 'Không: từ chối quyền', fs: 'B' },
    { from: 'sH', to: 'n20', fs: 'B', ts: 'R' },
    { from: 'n20', to: 'n18', label: 'Về bước trước khi hoãn', fs: 'L', ts: 'L' }
  ]
});
