// 02_Xac_dinh_CQGQBT.md
SPECS.push({
  id: '02_1_tiep_nhan_tham_muu', title: 'QT2.1. Xác định CQGQBT - tiếp nhận, tham mưu, trình ký',
  lanes: [{ name: 'Cán bộ xử lý (Bộ Tư pháp / Sở Tư pháp)', cols: 2 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ khác', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, col: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, col: 0, row: 1, type: 'step', num: 1, text: 'Tạo hồ sơ (MH02), Lưu', status: 'Xác minh CQGQBT' },
    { id: 'n2', lane: 0, col: 1, row: 1, type: 'step', num: 2, text: 'Tiếp nhận, nhập MH02, Lưu', status: 'Xác minh CQGQBT' },
    { id: 'n3', lane: 0, col: 1, row: 2, type: 'step', num: 3, text: 'Yêu cầu bổ sung / Không thụ lý' },
    { id: 'n11', lane: 0, col: 1, row: 3, type: 'step', num: 11, text: 'Bổ sung hồ sơ, Lưu bổ sung', status: 'Xác minh CQGQBT' },
    { id: 'n4', lane: 0, col: 0, row: 3, type: 'step', num: 4, text: 'Tham mưu kết quả (MH03), chọn CQGQBT, Lưu và trình ký' },
    { id: 'd', lane: 0, col: 0, row: 4, type: 'decision', text: 'Hình thức ký?' },
    { id: 'n5', lane: 0, col: 0, row: 5, type: 'step', num: 5, text: 'Chọn 01 Lãnh đạo mỗi cấp, Trình Lãnh đạo', status: 'Chờ duyệt' },
    { id: 'n6', lane: 0, col: 1, row: 4, type: 'step', num: 6, text: 'Tải văn bản đã ký, Ban hành văn bản' },
    { id: 's1', lane: 1, row: 1, type: 'step', text: 'Hồ sơ được phân công', status: 'Chờ tiếp nhận', hl: true },
    { id: 'err', lane: 1, row: 5, type: 'note', text: 'Không xác định được cấp phê duyệt: chặn trình (LXL-006)' },
    { id: 'o2', lane: 1, row: 4, type: 'offpage', text: 'QT2.2: ban hành theo Loại trình' },
    { id: 'o1', lane: 1, row: 6, type: 'offpage', text: 'Sang QT2.2 Ký duyệt' },
    { id: 'a1', lane: 2, row: 0, type: 'offpage', text: 'Từ QT1.2: Lãnh đạo phân công cán bộ' },
    { id: 'a2', lane: 2, row: 1, type: 'offpage', text: 'Giải quyết YCBT: Không thụ lý, chuyển Bộ Tư pháp / Sở Tư pháp' },
    { id: 'a3', lane: 2, row: 3, type: 'offpage', text: 'Từ QT2.2: Yêu cầu bổ sung đã ban hành' }
  ],
  edges: [
    { from: 'S', to: 'n1' },
    { from: 'a1', to: 's1' }, { from: 'a2', to: 's1' },
    { from: 's1', to: 'n2' }, { from: 's1', to: 'n3' },
    { from: 'n1', to: 'n4' }, { from: 'n2', to: 'n4' },
    { from: 'a3', to: 'n11' }, { from: 'n11', to: 'n4' },
    { from: 'n3', to: 'd', ts: 'T' },
    { from: 'n4', to: 'd' },
    { from: 'd', to: 'n5', label: 'Ký số' },
    { from: 'd', to: 'n6', label: 'Ký ngoài', fs: 'R' },
    { from: 'n5', to: 'err', label: 'Không xác định cấp', dashed: true },
    { from: 'n5', to: 'o1' },
    { from: 'n6', to: 'o2' }
  ]
});
SPECS.push({
  id: '02_2_ky_duyet_ket_qua', title: 'QT2.2. Xác định CQGQBT - ký duyệt và kết quả',
  lanes: [{ name: 'Cán bộ xử lý', cols: 1 }, { name: 'Lãnh đạo được giao (Phòng, Cục / Sở, Bộ / UBND cấp tỉnh)', cols: 2 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ khác', cols: 1 }],
  nodes: [
    { id: 'a', lane: 0, row: 1, type: 'offpage', text: 'Từ QT2.1: hồ sơ Chờ duyệt' },
    { id: 'n13', lane: 0, row: 3, type: 'step', num: 13, text: 'Cập nhật hồ sơ Bị trả lại, trình lại từ cấp 1' },
    { id: 'dC', lane: 1, col: 0, row: 1, type: 'decision', text: 'Lãnh đạo đồng ý?' },
    { id: 'dF', lane: 1, col: 1, row: 1, type: 'decision', text: 'Cấp cuối?' },
    { id: 'n7', lane: 1, col: 1, row: 0, type: 'step', num: 7, text: 'Ký duyệt cấp trung gian, chuyển cấp tiếp theo', status: 'Chờ duyệt' },
    { id: 'n8', lane: 1, col: 1, row: 2, type: 'step', num: 8, text: 'Ký duyệt cấp cuối' },
    { id: 'n9', lane: 1, col: 0, row: 3, type: 'step', num: 9, text: 'Từ chối (bất kỳ cấp), nhập lý do', status: 'Bị trả lại' },
    { id: 'n10', lane: 1, col: 0, row: 0, type: 'step', num: 10, text: 'Thu hồi khi cấp tiếp theo chưa xử lý' },
    { id: 'n12', lane: 1, col: 1, row: 4, type: 'note', num: 12, text: 'UBND cấp tỉnh: xem hồ sơ của Sở Tư pháp trực thuộc' },
    { id: 'dT', lane: 2, row: 2, type: 'decision', text: 'Loại trình?' },
    { id: 's1', lane: 2, row: 1, type: 'step', text: 'Yêu cầu bổ sung', hl: true },
    { id: 's2', lane: 2, row: 3, type: 'step', text: 'Không thụ lý (kết thúc)', hl: true },
    { id: 's3', lane: 2, row: 4, type: 'step', text: 'Đã chuyển CQGQBT', hl: true },
    { id: 'o1', lane: 3, row: 1, type: 'offpage', text: 'QT2.1 bước 11 Bổ sung hồ sơ' },
    { id: 'o2', lane: 3, row: 4, type: 'offpage', text: 'Tự động chuyển CQGQBT: Tiếp nhận hồ sơ của CQGQBT (QT1.2)' }
  ],
  edges: [
    { from: 'a', to: 'dC' },
    { from: 'dC', to: 'dF', label: 'Có' },
    { from: 'dC', to: 'n9', label: 'Không' },
    { from: 'dF', to: 'n7', label: 'Chưa' },
    { from: 'dF', to: 'n8', label: 'Có' },
    { from: 'n7', to: 'dC', label: 'Cấp tiếp theo' },
    { from: 'n7', to: 'n10', label: 'Thu hồi', dashed: true },
    { from: 'n9', to: 'n13' },
    { from: 'n13', to: 'a', label: 'Trình lại' },
    { from: 'n8', to: 'dT' },
    { from: 'dT', to: 's1', label: 'Yêu cầu bổ sung' },
    { from: 'dT', to: 's2', label: 'Không thụ lý' },
    { from: 'dT', to: 's3', label: 'Kết quả xác định', fs: 'R' },
    { from: 's1', to: 'o1' },
    { from: 's3', to: 'o2', fs: 'B', ts: 'B' }
  ]
});
