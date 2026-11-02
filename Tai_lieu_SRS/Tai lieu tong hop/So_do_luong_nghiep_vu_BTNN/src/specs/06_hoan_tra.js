// 06_Xem_xet_hoan_tra.md - buoc 1 - 10
SPECS.push({
  id: '06_2_thu_tien', title: 'QT6.2. Xem xét hoàn trả - thu tiền hoàn trả, miễn, giảm mức bổ sung',
  lanes: [{ name: 'Cơ quan trả lương / Đơn vị tạo Hội đồng / Sở Tư pháp', cols: 1 }, { name: 'Đơn vị ban hành QĐ hoàn trả', cols: 1 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }],
  nodes: [
    { id: 'a', lane: 0, row: 0, type: 'offpage', text: 'Từ QT6.1: cán bộ Thu tiền hoàn trả' },
    { id: 'n7', lane: 0, row: 1, type: 'step', num: 7, text: 'Ghi nhận nộp tiền (mỗi đợt không vượt số còn phải thu)' },
    { id: 'n9', lane: 0, row: 4, type: 'note', num: 9, text: 'Sở Tư pháp: xem, ghi nhận nộp tiền; không Đình chỉ, Miễn, Giảm' },
    { id: 'n8', lane: 1, row: 1, type: 'step', num: 8, text: 'Trình QĐ miễn / giảm mức hoàn trả bổ sung (chọn 01 hoặc nhiều cán bộ)' },
    { id: 'dL', lane: 2, row: 1, type: 'decision', text: 'Lãnh đạo ký duyệt?' },
    { id: 'tl', lane: 1, row: 2, type: 'step', text: 'Thu tiền hoàn trả - Bị trả lại: trình lại' },
    { id: 'dQ', lane: 3, row: 1, type: 'decision', text: 'Loại Quyết định?' },
    { id: 'sM', lane: 3, row: 0, type: 'step', text: 'Miễn hoàn trả (kết thúc)', hl: true },
    { id: 'dC', lane: 3, row: 3, type: 'decision', text: 'Còn phải thu bằng 0?' },
    { id: 'sT', lane: 3, row: 2, type: 'step', text: 'Thu tiền hoàn trả', hl: true },
    { id: 'sH', lane: 3, row: 4, type: 'step', text: 'Hoàn thành (kết thúc)', hl: true }
  ],
  edges: [
    { from: 'a', to: 'n7' }, { from: 'a', to: 'n8', fs: 'R', ts: 'T' },
    { from: 'n7', to: 'dC', label: 'Sau mỗi đợt nộp', ts: 'L' },
    { from: 'n8', to: 'dL', label: 'Ký số' },
    { from: 'dL', to: 'tl', label: 'Từ chối', fs: 'B' },
    { from: 'tl', to: 'n8' },
    { from: 'dL', to: 'dQ', label: 'Cấp cuối' },
    { from: 'dQ', to: 'sM', label: 'Miễn', fs: 'T' },
    { from: 'dQ', to: 'dC', label: 'Giảm: tính lại', fs: 'R', ts: 'R' },
    { from: 'dC', to: 'sH', label: 'Có', fs: 'B' },
    { from: 'dC', to: 'sT', label: 'Không', fs: 'T', ts: 'B' },
    { from: 'sT', to: 'n7', label: 'Đợt tiếp theo', dashed: true }
  ]
});
