// 03_Giai_quyet_YCBT.md - QT3.3 (buoc 12 - 16)
SPECS.push({
  id: '03_3_hoan_dinh_chi', title: 'QT3.3. Giải quyết YCBT - hoãn, tạm đình chỉ, đình chỉ, dừng, tiếp tục giải quyết',
  lanes: [{ name: 'Cán bộ được cử (Thao tác khác MH01 / MH04)', cols: 1 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ khác', cols: 1 }],
  nodes: [
    { id: 'n12', lane: 0, row: 0, type: 'step', num: 14, text: 'Hoãn giải quyết (Mẫu 22/BTNN): khi Xác minh, Thương lượng' },
    { id: 'n13', lane: 0, row: 1, type: 'step', num: 15, text: 'Tạm đình chỉ (tải tệp): khi Xác minh, Thương lượng, Chờ ban hành QĐ' },
    { id: 'n14', lane: 0, row: 2, type: 'step', num: 16, text: 'Đình chỉ giải quyết (Mẫu 25/BTNN): từ Cử người GQBT đến Hoàn thành' },
    { id: 'n15', lane: 0, row: 3, type: 'step', num: 17, text: 'Dừng giải quyết (Mẫu 05/BTNN): từ Cử người GQBT đến Chờ ban hành QĐ' },
    { id: 'n16', lane: 0, row: 4, type: 'step', num: 18, text: 'Tiếp tục giải quyết (Mẫu 23/BTNN): khi Hoãn giải quyết, Tạm đình chỉ' },
    { id: 'nt', lane: 1, row: 5, type: 'note', w: 224, text: 'Mỗi thao tác: Ký số thì Lãnh đạo ký duyệt các cấp (như bước 6), Từ chối thì Bị trả lại, cập nhật trình lại (bước 7); Ký ngoài thì cán bộ ban hành ngay' },
    { id: 'r1', lane: 2, row: 0, type: 'step', text: 'Hoãn giải quyết', hl: true },
    { id: 'r2', lane: 2, row: 1, type: 'step', text: 'Tạm đình chỉ', hl: true },
    { id: 'r3', lane: 2, row: 2, type: 'step', text: 'Đình chỉ giải quyết (kết thúc)', hl: true },
    { id: 'r4', lane: 2, row: 3, type: 'step', text: 'Dừng giải quyết (kết thúc)', hl: true },
    { id: 'r5', lane: 2, row: 4, type: 'step', text: 'Về trạng thái trước khi hoãn / tạm đình chỉ', hl: true },
    { id: 'kp', lane: 3, row: 2, type: 'offpage', text: 'QT5.3 Kinh phí: chưa chi Đã hủy, đã chi Chờ thu hồi' }
  ],
  edges: [
    { from: 'n12', to: 'r1', label: 'Ban hành' },
    { from: 'n13', to: 'r2', label: 'Ban hành' },
    { from: 'n14', to: 'r3', label: 'Ban hành' },
    { from: 'n15', to: 'r4', label: 'Ban hành' },
    { from: 'n16', to: 'r5', label: 'Ban hành' },
    { from: 'r3', to: 'kp' }, { from: 'r4', to: 'kp' },
    { from: 'r1', to: 'n16', label: 'Tiếp tục', dashed: true, fs: 'R', ts: 'B' },
    { from: 'r2', to: 'n16', label: 'Tiếp tục', dashed: true, fs: 'R', ts: 'B' }
  ]
});
