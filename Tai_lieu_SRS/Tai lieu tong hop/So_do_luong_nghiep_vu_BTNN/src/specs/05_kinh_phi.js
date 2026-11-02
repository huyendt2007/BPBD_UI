// 05_Kinh_phi_BT.md - buoc 1 - 12
SPECS.push({
  id: '05_1_chi_tra', title: 'QT5.1. Chi trả tiền bồi thường',
  lanes: [{ name: 'Cán bộ xử lý', cols: 2 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: "Phân hệ khác", cols: 1 }],
  nodes: [
    { id: 'a1', lane: 3, row: 0, type: 'offpage', text: 'QT4.2: Quyết định Có hiệu lực' },
    { id: 'a2', lane: 3, row: 1, type: 'offpage', text: 'QT7.1: vụ việc tại Tòa án Đã có bản án/QĐ' },
    { id: 'n1', lane: 0, col: 0, row: 1, type: 'step', num: 1, text: 'Mở bản ghi tự tạo (menu Chi trả, MH01)' },
    { id: 'n2', lane: 0, col: 1, row: 1, type: 'step', num: 2, text: 'Đề nghị cấp bổ sung kinh phí (MH08)', status: 'Đề nghị cấp bổ sung kinh phí' },
    { id: 'n3', lane: 0, col: 0, row: 2, type: 'step', num: 3, text: 'Trình thông báo chi trả Mẫu 32/BTNN (MH06 / MH24)' },
    { id: 'dH', lane: 0, col: 0, row: 3, type: 'decision', text: 'Hình thức ký?' },
    { id: 'n5', lane: 0, col: 0, row: 5, type: 'step', w: 190, num: 5, text: 'Nhập Số thông báo, Ngày nhận thông báo (01 lần)', status: 'Hạn nhận = ngày nhận + 03 năm' },
    { id: 'n6', lane: 0, col: 0, row: 6, type: 'step', num: 6, text: 'Cập nhật chi trả (MH03), có thể nhiều lần' },
    { id: 'dC', lane: 0, col: 0, row: 7, type: 'decision', text: 'Còn phải chi?' },
    { id: 'n7', lane: 0, col: 1, row: 6, type: 'step', w: 190, num: 7, text: 'Trả lại ngân sách nhà nước (MH04) khi quá hạn 03 năm', status: 'Trả lại ngân sách nhà nước' },
    { id: 'n4', lane: 1, row: 3, type: 'step', num: 4, text: 'Ký duyệt / Từ chối (MH07)', status: 'Chờ duyệt' },
    { id: 's1', lane: 2, row: 0, type: 'step', text: 'Tạo bản ghi Chi trả', status: 'Chờ thông báo chi trả', hl: true },
    { id: 'sC', lane: 2, row: 4, type: 'step', text: 'Ban hành Thông báo chi trả', status: 'Chờ chi trả', hl: true },
    { id: 'sH', lane: 2, row: 7, type: 'step', text: 'Bản ghi Hoàn thành; vụ việc Hoàn thành', hl: true }
  ],
  edges: [
    { from: 'a1', to: 's1' }, { from: 'a2', to: 's1' },
    { from: 's1', to: 'n1' },
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'dH' },
    { from: 'dH', to: 'n4', label: 'Ký số', fs: 'R' },
    { from: 'dH', to: 'sC', label: 'Ký ngoài', fs: 'B' },
    { from: 'n4', to: 'sC', label: 'Cấp cuối Ký duyệt' },
    { from: 'n4', to: 'n3', label: 'Từ chối: Bị trả lại', fs: 'T' },
    { from: 'sC', to: 'n5' },
    { from: 'n5', to: 'n6' }, { from: 'n6', to: 'dC' },
    { from: 'dC', to: 'n6', label: 'Lớn hơn 0', fs: 'L', ts: 'L' },
    { from: 'dC', to: 'sH', label: 'Bằng 0', fs: 'R' },
    { from: 'n5', to: 'n7', label: 'Quá hạn 03 năm', dashed: true }
  ]
});
SPECS.push({
  id: '05_2_tam_ung', title: 'QT5.2. Tạm ứng kinh phí (Quyết định tạm ứng Mẫu 07/BTNN)',
  lanes: [{ name: 'Cán bộ xử lý', cols: 2 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, col: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n8', lane: 0, col: 0, row: 1, type: 'step', num: 8, text: 'Tạo QĐ tạm ứng (MH20): hồ sơ có đề nghị tạm ứng, Xác minh / Thương lượng / Chờ ban hành QĐ' },
    { id: 'dV', lane: 0, col: 0, row: 2, type: 'decision', text: 'Đã có QĐ tạm ứng hiệu lực?' },
    { id: 'err', lane: 0, col: 1, row: 2, type: 'note', text: 'Chặn trùng: MSG-ERR-BTNN-KP-012' },
    { id: 'dH', lane: 0, col: 0, row: 3, type: 'decision', text: 'Hình thức ký? (MH21)' },
    { id: 'n12', lane: 0, col: 1, row: 4, type: 'step', num: 12, text: 'Cập nhật Quyết định tạm ứng (vụ việc còn ở trạng thái cho phép)', status: 'Bị trả lại' },
    { id: 'n11', lane: 0, col: 1, row: 5, type: 'step', num: 11, text: 'Cập nhật chi trả 01 lần (MH03), mặc định 100% số tiền đã duyệt' },
    { id: 'n9', lane: 1, row: 3, type: 'step', num: 9, text: 'Ký duyệt / Từ chối QĐ tạm ứng (MH22)', status: 'Chờ duyệt' },
    { id: 'sC', lane: 2, row: 4, type: 'step', text: 'Ban hành Quyết định tạm ứng', status: 'Chờ chi trả', hl: true },
    { id: 'sH', lane: 2, row: 5, type: 'step', text: 'Hoàn thành (không đổi trạng thái vụ việc)', hl: true }
  ],
  edges: [
    { from: 'S', to: 'n8' }, { from: 'n8', to: 'dV' },
    { from: 'dV', to: 'err', label: 'Có', fs: 'R' },
    { from: 'dV', to: 'dH', label: 'Không', fs: 'B' },
    { from: 'dH', to: 'n9', label: 'Ký số', fs: 'R' },
    { from: 'dH', to: 'sC', label: 'Ký ngoài', fs: 'B' },
    { from: 'n9', to: 'sC', label: 'Cấp cuối Ký duyệt' },
    { from: 'n9', to: 'n12', label: 'Từ chối' },
    { from: 'n12', to: 'dH', label: 'Trình lại', ts: 'L' },
    { from: 'sC', to: 'n11', ts: 'T' },
    { from: 'n11', to: 'sH' }
  ]
});
SPECS.push({
  id: '05_3_lien_thong_thu_hoi', title: 'QT5.3. Liên thông tự động và thu hồi kinh phí',
  lanes: [{ name: 'Phân hệ khác', cols: 1 }, { name: 'Hệ thống', cols: 2 }, { name: 'Cán bộ xử lý', cols: 1 }],
  nodes: [
    { id: 'e1', lane: 0, row: 1, type: 'offpage', text: 'QT3.3: Đình chỉ / Dừng giải quyết được ban hành' },
    { id: 'e2', lane: 0, row: 2, type: 'offpage', text: 'QT4.2: Hủy QĐ được ban hành (Bảng C)' },
    { id: 'e3', lane: 0, row: 4, type: 'offpage', text: 'QT4.2: Sửa chữa, bổ sung QĐ được ban hành (Bảng A, B)' },
    { id: 'dE', lane: 1, col: 0, row: 1, type: 'decision', text: 'Bản ghi đã chi?' },
    { id: 'sHuy', lane: 1, col: 0, row: 0, type: 'step', text: 'Bản ghi chưa chi: Đã hủy, hủy phiếu trình Chờ duyệt', hl: true },
    { id: 'dT', lane: 1, col: 1, row: 1, type: 'decision', text: 'Thu hồi kinh phí đã chi?' },
    { id: 'sK', lane: 1, col: 1, row: 0, type: 'note', text: 'Không thu hồi (Đình chỉ / Dừng): giữ trạng thái, ghi lịch sử' },
    { id: 'dS', lane: 1, col: 0, row: 4, type: 'decision', text: 'Chênh lệch số tiền?' },
    { id: 'sThieu', lane: 1, col: 0, row: 5, type: 'step', text: 'Thiếu tiền: cập nhật bản ghi chưa chi hoặc tạo bản ghi chi trả thêm', status: 'Chờ thông báo chi trả', hl: true },
    { id: 'sThua', lane: 1, col: 1, row: 4, type: 'step', text: 'Thừa tiền: hủy bản ghi chưa chi; giảm / Hoàn thành / thu hồi bản ghi đã chi', hl: true },
    { id: 'sCTH', lane: 1, col: 1, row: 3, type: 'step', text: 'Bản ghi đã chi', status: 'Chờ thu hồi', hl: true },
    { id: 'n10', lane: 2, row: 3, type: 'step', num: 10, text: 'Cập nhật thu hồi (MH23 / MH10), lưu nhiều lần' },
    { id: 'dL', lane: 2, row: 4, type: 'decision', text: 'Lũy kế bằng Số tiền phải thu hồi?' },
    { id: 'nH', lane: 2, row: 5, type: 'step', text: 'Hoàn thành thu hồi (bước 10)', status: 'Đã thu hồi' }
  ],
  edges: [
    { from: 'e1', to: 'dE', ts: 'L' }, { from: 'e2', to: 'dE', ts: 'B' },
    { from: 'dE', to: 'sHuy', label: 'Không', fs: 'T' },
    { from: 'dE', to: 'dT', label: 'Có', fs: 'R' },
    { from: 'dT', to: 'sCTH', label: 'Thu hồi (Hủy QĐ: luôn thu hồi)', fs: 'B', ts: 'T' },
    { from: 'dT', to: 'sK', label: 'Không thu hồi', fs: 'T' },
    { from: 'e3', to: 'dS' },
    { from: 'dS', to: 'sThieu', label: 'Thiếu', fs: 'B' },
    { from: 'dS', to: 'sThua', label: 'Thừa', fs: 'R' },
    { from: 'sThua', to: 'sCTH', label: 'Phần thừa đã chi' },
    { from: 'sCTH', to: 'n10' },
    { from: 'n10', to: 'dL' },
    { from: 'dL', to: 'n10', label: 'Chưa', fs: 'R', ts: 'R' },
    { from: 'dL', to: 'nH', label: 'Có', fs: 'B' }
  ]
});
