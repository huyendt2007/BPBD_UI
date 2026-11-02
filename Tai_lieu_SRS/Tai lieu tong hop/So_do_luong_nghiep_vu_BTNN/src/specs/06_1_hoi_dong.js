// 06_Xem_xet_hoan_tra.md - QT6.1 (buoc 1 - 4, 6) va QT6.3 (buoc 5, 10)
SPECS.push({
  id: '06_1_hoi_dong_qd_hoan_tra', title: 'QT6.1. Xem xét hoàn trả - Hội đồng, ý kiến Hội đồng, Quyết định hoàn trả',
  lanes: [{ name: 'Đơn vị tạo Hội đồng', cols: 1 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 2 }, { name: 'Đơn vị ban hành QĐ hoàn trả', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, row: 1, type: 'step', num: 1, text: 'Lập hồ sơ hoàn trả mới, chọn vụ việc (MH01, MH02)' },
    { id: 'n2', lane: 0, row: 2, type: 'step', num: 2, text: 'Trình ký / ban hành QĐ thành lập Hội đồng' },
    { id: 'n4', lane: 0, row: 4, type: 'step', num: 4, text: 'Thêm người thi hành công vụ, Lưu ý kiến Hội đồng' },
    { id: 'n3', lane: 1, row: 2, type: 'step', num: 3, text: 'Ký duyệt / Từ chối Quyết định (mọi Loại trình)' },
    { id: 's0', lane: 2, col: 0, row: 1, type: 'step', text: 'Hồ sơ chưa thành lập Hội đồng', status: 'Chờ xử lý' },
    { id: 's3', lane: 2, col: 0, row: 3, type: 'step', text: 'Họp hội đồng', hl: true },
    { id: 'o3', lane: 2, col: 1, row: 3, type: 'offpage', text: 'QT6.3 Đình chỉ' },
    { id: 's5', lane: 2, col: 0, row: 4, type: 'step', text: 'Chia phần đơn vị', status: 'Chờ ban hành QĐ hoàn trả', hl: true },
    { id: 'dY', lane: 2, col: 0, row: 5, type: 'decision', text: 'Ý kiến Hội đồng với cán bộ?' },
    { id: 'sMien', lane: 2, col: 1, row: 5, type: 'step', text: 'Miễn hoàn trả (kết thúc)', hl: true },
    { id: 'sThu', lane: 2, col: 0, row: 6, type: 'step', text: 'Thu tiền hoàn trả (sang QT6.2)', hl: true },
    { id: 'n6', lane: 3, row: 4, type: 'step', num: 6, text: 'Trình ký / ban hành QĐ hoàn trả của phần đơn vị' }
  ],
  edges: [
    { from: 'S', to: 'n1' }, { from: 'n1', to: 's0' }, { from: 's0', to: 'n2', fs: 'B' },
    { from: 'n2', to: 'n3', label: 'Ký số' },
    { from: 'n3', to: 's3', label: 'Cấp cuối Ký duyệt', fs: 'B', ts: 'T' },
    { from: 'n3', to: 'n2', label: 'Từ chối: trình lại', fs: 'T', ts: 'T' },
    { from: 'n2', to: 's3', label: 'Ký ngoài', fs: 'B', ts: 'L' },
    { from: 's3', to: 'n4', fs: 'B', ts: 'T' },
    { from: 's3', to: 'o3', label: 'Đình chỉ', dashed: true },
    { from: 'n4', to: 's5' },
    { from: 's5', to: 'n6' },
    { from: 'n6', to: 'dY', label: 'Ban hành', ts: 'T' },
    { from: 'dY', to: 'sThu', label: 'Không giảm / Giảm mức', fs: 'B' },
    { from: 'dY', to: 'sMien', label: 'Miễn', fs: 'R' }
  ]
});
SPECS.push({
  id: '06_3_dinh_chi', title: 'QT6.3. Xem xét hoàn trả - đình chỉ hồ sơ / đình chỉ cán bộ',
  lanes: [{ name: 'Đơn vị tạo Hội đồng', cols: 1 }, { name: 'Đơn vị ban hành QĐ hoàn trả', cols: 1 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }],
  nodes: [
    { id: 'a', lane: 0, row: 0, type: 'offpage', text: 'Từ QT6.1: Chờ duyệt / Bị trả lại QĐ thành lập HĐ, Họp hội đồng' },
    { id: 'n5', lane: 0, row: 1, type: 'step', num: 5, text: 'Đình chỉ cả hồ sơ / một phần cán bộ, trình QĐ đình chỉ (Mẫu 39/BTNN)' },
    { id: 'b', lane: 1, row: 0, type: 'offpage', text: 'Từ QT6.1: phần đơn vị chưa ban hành QĐ hoàn trả' },
    { id: 'n10', lane: 1, row: 1, type: 'step', num: 10, text: 'Đình chỉ cấp cán bộ: chọn cán bộ, trình QĐ đình chỉ' },
    { id: 'dL', lane: 2, row: 2, type: 'decision', text: 'Ký duyệt? (Ký ngoài: ban hành ngay)' },
    { id: 'tl', lane: 2, row: 3, type: 'note', text: 'Từ chối: Bị trả lại (QĐ đình chỉ), trình ký lại' },
    { id: 'dP', lane: 3, row: 2, type: 'decision', text: 'Đình chỉ cả hồ sơ?' },
    { id: 'sDC', lane: 3, row: 1, type: 'step', text: 'Đình chỉ xem xét hoàn trả (kết thúc)', hl: true },
    { id: 'sDCcb', lane: 3, row: 3, type: 'step', text: 'Cán bộ được chọn: Đình chỉ hoàn trả (kết thúc)', hl: true }
  ],
  edges: [
    { from: 'a', to: 'n5' }, { from: 'b', to: 'n10' },
    { from: 'n5', to: 'dL', fs: 'B', ts: 'L' }, { from: 'n10', to: 'dL', fs: 'B', ts: 'T' },
    { from: 'dL', to: 'tl', label: 'Từ chối', fs: 'B' },
    { from: 'dL', to: 'dP', label: 'Ban hành', fs: 'R' },
    { from: 'dP', to: 'sDC', label: 'Có', fs: 'T' },
    { from: 'dP', to: 'sDCcb', label: 'Không', fs: 'B' }
  ]
});
