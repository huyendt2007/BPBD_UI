// 09 - 14: nghiep vu STP, dung chung, BTP, bao cao, cham diem, ho tro tu lieu, cau hinh
SPECS.push({
  id: '09_1_kien_nghi', title: 'QT9.1. Nghiệp vụ dùng cho STP - 04 chức năng kiến nghị, yêu cầu',
  lanes: [{ name: 'Cán bộ Sở Tư pháp', cols: 2 }, { name: 'Hệ thống', cols: 1 }, { name: 'Cơ quan nhận (ngoài hệ thống)', cols: 1 }, { name: 'Người dùng đơn vị khác', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, col: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, col: 0, row: 1, type: 'step', num: 1, text: 'Thêm mới, nhập văn bản đã gửi, Gửi kiến nghị / Gửi yêu cầu, xác nhận' },
    { id: 'n2', lane: 0, col: 1, row: 2, type: 'step', num: 2, text: 'Sửa / Xóa bản ghi Sở mình khi chưa có phản hồi' },
    { id: 'n3', lane: 0, col: 0, row: 3, type: 'step', num: 3, text: 'Cập nhật kết quả phản hồi (popup)' },
    { id: 's1', lane: 1, row: 1, type: 'step', text: 'Bản ghi', status: 'Đã gửi - Chờ phản hồi', hl: true },
    { id: 's3', lane: 1, row: 3, type: 'step', text: 'Kết quả', status: 'Đã có phản hồi / Đã thực hiện / Không thực hiện', hl: true },
    { id: 'e', lane: 2, row: 2, type: 'note', text: 'Văn bản ký, gửi và phản hồi ngoài hệ thống' },
    { id: 'n4', lane: 3, row: 0, type: 'note', num: 4, text: 'Sở Tư pháp khác: không thấy bản ghi' },
    { id: 'n5', lane: 3, row: 1, type: 'note', num: 5, text: 'Bộ Tư pháp / Cục: xem mọi Sở, không thao tác' },
    { id: 'n6', lane: 3, row: 2, type: 'note', num: 6, text: 'Đơn vị khác: thông báo ngoài phạm vi dữ liệu' }
  ],
  edges: [
    { from: 'S', to: 'n1' }, { from: 'n1', to: 's1' },
    { from: 's1', to: 'n2', label: 'Chưa phản hồi', dashed: true, fs: 'B', ts: 'R' },
    { from: 's1', to: 'e', dashed: true, fs: 'R', ts: 'T' },
    { from: 'e', to: 'n3', label: 'Nhận phản hồi', dashed: true, fs: 'B', ts: 'T' },
    { from: 'n3', to: 's3' }
  ]
});
SPECS.push({
  id: '09_2_ho_tro', title: 'QT9.2. Hỗ trợ, hướng dẫn người bị thiệt hại thực hiện thủ tục YCBT',
  lanes: [{ name: 'Cán bộ Sở Tư pháp', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Người dùng chỉ xem', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n7', lane: 0, row: 1, type: 'step', num: 7, text: 'Thêm mới / Sửa / Xóa bản ghi hỗ trợ' },
    { id: 's', lane: 1, row: 1, type: 'step', text: 'Bản ghi lưu ngay, không có trạng thái xử lý', hl: true },
    { id: 'v1', lane: 2, row: 0, type: 'note', text: 'Bộ Tư pháp, Cục: xem mọi Sở' },
    { id: 'v2', lane: 2, row: 2, type: 'note', text: 'UBND cấp tỉnh: xem Sở trực thuộc' }
  ],
  edges: [
    { from: 'S', to: 'n7' }, { from: 'n7', to: 's' },
    { from: 's', to: 'v1', dashed: true, label: 'Xem' }, { from: 's', to: 'v2', dashed: true, label: 'Xem' }
  ]
});
SPECS.push({
  id: '10_1_huong_dan_khieu_nai', title: 'QT10.1. Hướng dẫn nghiệp vụ; Giải quyết khiếu nại, tố cáo, xử lý vi phạm',
  lanes: [{ name: 'Cán bộ Bộ Tư pháp / Cục / Sở Tư pháp', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Người dùng chỉ xem', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, row: 1, type: 'step', num: 1, text: 'Hướng dẫn nghiệp vụ: Thêm mới, Lưu thông tin xử lý' },
    { id: 'n3', lane: 0, row: 2, type: 'step', num: 3, text: 'Khiếu nại, tố cáo: Thêm mới, Lưu và xử lý' },
    { id: 'n2', lane: 0, row: 3, type: 'step', num: 2, text: 'Cập nhật kết quả, Hoàn thành' },
    { id: 'sD', lane: 1, row: 2, type: 'step', text: 'Đang xử lý', hl: true },
    { id: 'sH', lane: 1, row: 3, type: 'step', text: 'Hoàn thành', hl: true },
    { id: 'vB', lane: 2, row: 1, type: 'note', text: 'Bộ Tư pháp, Cục: xem hồ sơ của Sở, không thao tác' },
    { id: 'n7', lane: 2, row: 2, type: 'note', num: 7, text: 'UBND cấp tỉnh: chỉ xem Sở trực thuộc' }
  ],
  edges: [
    { from: 'S', to: 'n1' },
    { from: 'n1', to: 'sD' }, { from: 'n3', to: 'sD' },
    { from: 'sD', to: 'n2', fs: 'B', ts: 'T' }, { from: 'n2', to: 'sH' }
  ]
});
SPECS.push({
  id: '10_2_theo_doi_don_doc', title: 'QT10.2. Theo dõi, đôn đốc công tác BTNN',
  lanes: [{ name: 'Cán bộ Bộ Tư pháp / Cục / Sở Tư pháp', cols: 2 }, { name: 'Hệ thống', cols: 1 }, { name: 'Cơ quan được yêu cầu (ngoài hệ thống)', cols: 1 }],
  nodes: [
    { id: 'n4', lane: 0, col: 0, row: 0, type: 'step', num: 4, text: 'Tab Theo dõi: Thêm mới, Lưu' },
    { id: 'n4b', lane: 0, col: 0, row: 1, type: 'step', text: 'Hoàn thành: nhập Kết quả theo dõi (bước 4)' },
    { id: 'n5', lane: 0, col: 1, row: 2, type: 'step', num: 5, text: 'Tab Yêu cầu báo cáo / Đôn đốc: nhập văn bản đã ban hành, Lưu' },
    { id: 'nR', lane: 0, col: 1, row: 3, type: 'step', text: 'Cập nhật phản hồi (bước 5)' },
    { id: 'nH', lane: 0, col: 1, row: 4, type: 'step', text: 'Hoàn thành (bước 5)' },
    { id: 's1', lane: 1, row: 0, type: 'step', text: 'Đang theo dõi', hl: true },
    { id: 's2', lane: 1, row: 2, type: 'step', text: 'Chờ phản hồi', hl: true },
    { id: 's3', lane: 1, row: 3, type: 'step', text: 'Đã có phản hồi', hl: true },
    { id: 'sH', lane: 1, row: 5, type: 'step', text: 'Hoàn thành', hl: true },
    { id: 'e', lane: 2, row: 2, type: 'note', text: 'Văn bản gửi, báo cáo / phản hồi nhận ngoài hệ thống' }
  ],
  edges: [
    { from: 'n4', to: 's1' }, { from: 's1', to: 'n4b' }, { from: 'n4b', to: 'sH', fs: 'B', ts: 'L' },
    { from: 'n5', to: 's2' }, { from: 's2', to: 'e', dashed: true },
    { from: 'e', to: 'nR', dashed: true, label: 'Nhận phản hồi', fs: 'B', ts: 'T' },
    { from: 'nR', to: 's3' }, { from: 's3', to: 'nH', fs: 'B', ts: 'R' }, { from: 'nH', to: 'sH', fs: 'B', ts: 'T' }
  ]
});
SPECS.push({
  id: '10_3_kiem_tra', title: 'QT10.3. Kiểm tra công tác BTNN',
  lanes: [{ name: 'Cán bộ Bộ Tư pháp / Cục / Sở Tư pháp', cols: 1 }, { name: 'Hệ thống', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n6', lane: 0, row: 1, type: 'step', num: 6, text: 'Lập kế hoạch kiểm tra (Khối I, Đoàn kiểm tra), Lưu kế hoạch' },
    { id: 'nS', lane: 0, row: 2, type: 'step', text: 'Sửa kế hoạch (bước 6)' },
    { id: 'nK', lane: 0, row: 3, type: 'step', text: 'Cập nhật kết quả (Khối II), tải biên bản, kết luận (bước 6)' },
    { id: 's1', lane: 1, row: 1, type: 'step', text: 'Chờ kiểm tra', hl: true },
    { id: 's2', lane: 1, row: 3, type: 'step', text: 'Đã kiểm tra', hl: true }
  ],
  edges: [
    { from: 'S', to: 'n6' }, { from: 'n6', to: 's1' },
    { from: 's1', to: 'nS', fs: 'B', ts: 'R' }, { from: 'nS', to: 's1', fs: 'R', ts: 'B' },
    { from: 's1', to: 'nK', fs: 'B', ts: 'R' }, { from: 'nK', to: 's2' }
  ]
});
SPECS.push({
  id: '11_1_nghiep_vu_btp', title: 'QT11.1. Nghiệp vụ dùng cho Bộ Tư pháp (07 chức năng ghi nhận)',
  lanes: [{ name: 'Cán bộ Bộ Tư pháp', cols: 1 }, { name: 'Hệ thống', cols: 2 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, row: 1, type: 'step', num: 1, text: 'Thêm mới / Sửa, Lưu thông tin' },
    { id: 'n2', lane: 0, row: 3, type: 'step', num: 2, text: 'Tiếp tục lưu tại popup cảnh báo trùng' },
    { id: 'n3', lane: 0, row: 5, type: 'step', num: 3, text: 'Xóa, xác nhận tại popup' },
    { id: 'dV', lane: 1, col: 0, row: 1, type: 'decision', text: 'Dữ liệu hợp lệ?' },
    { id: 'err', lane: 1, col: 1, row: 1, type: 'note', text: 'Báo lỗi dưới ô, không lưu' },
    { id: 'dT', lane: 1, col: 0, row: 2, type: 'decision', text: 'Trùng Số văn bản / Số, ký hiệu / Số điện thoại?' },
    { id: 'sL', lane: 1, col: 0, row: 4, type: 'step', text: 'Lưu, hiển thị trên danh sách', hl: true },
    { id: 'sX', lane: 1, col: 0, row: 5, type: 'step', text: 'Xóa bản ghi khỏi danh sách', hl: true }
  ],
  edges: [
    { from: 'S', to: 'n1' }, { from: 'n1', to: 'dV' },
    { from: 'dV', to: 'err', label: 'Không', fs: 'R' },
    { from: 'dV', to: 'dT', label: 'Có', fs: 'B' },
    { from: 'dT', to: 'n2', label: 'Có', fs: 'L' },
    { from: 'dT', to: 'sL', label: 'Không', fs: 'B' },
    { from: 'n2', to: 'sL' },
    { from: 'n3', to: 'sX' }
  ]
});
// 12_Bao_cao_cong_tac_BTNN.md - QT12.1 - QT12.3 (luong phan cong / yeu cau dieu chinh theo chot nghiep vu 02/11/2026)
SPECS.push({
  id: '12_1_bao_cao_so', title: 'QT12.1. Báo cáo Công tác BTNN - Sở Tư pháp lập và gửi báo cáo',
  lanes: [{ name: 'Cán bộ Sở Tư pháp', cols: 1 }, { name: 'Lãnh đạo Phòng / Lãnh đạo Sở', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Luồng khác', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, row: 1, type: 'step', num: 1, text: 'Tạo báo cáo: Năm, Loại kỳ (MH01, MH02)', status: 'Đang nhập liệu' },
    { id: 'n2', lane: 0, row: 2, type: 'step', num: 2, text: 'Nhập 04 tab; Tổng hợp Mẫu 43; Xem trước PDF' },
    { id: 'n3', lane: 0, row: 3, type: 'step', num: 3, text: 'Gửi phê duyệt (MH04)', status: 'Chờ duyệt' },
    { id: 'n5', lane: 0, row: 5, type: 'step', num: 5, text: 'Xem Lý do bị trả lại / Nội dung yêu cầu điều chỉnh, cập nhật, gửi lại', status: 'Bị trả lại' },
    { id: 'n4', lane: 1, row: 3, type: 'step', num: 4, text: 'Ký duyệt / Từ chối cả 04 biểu mẫu: Phòng ký nháy, Sở ký số (MH05)' },
    { id: 'sB', lane: 2, row: 3, type: 'step', text: 'Đã ban hành - Đã gửi Bộ Tư pháp', hl: true },
    { id: 'o1', lane: 3, row: 3, type: 'offpage', text: 'QT12.2. Phân công tại Bộ Tư pháp' },
    { id: 'i1', lane: 3, row: 5, type: 'offpage', text: 'Từ QT12.2: Bộ Tư pháp yêu cầu điều chỉnh' }
  ],
  edges: [
    { from: 'S', to: 'n1' }, { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4' },
    { from: 'n4', to: 'sB', label: 'Cấp cuối Ký duyệt' },
    { from: 'n4', to: 'n5', label: 'Từ chối', fs: 'B' },
    { from: 'n5', to: 'n3', label: 'Gửi lại', fs: 'L', ts: 'L' },
    { from: 'sB', to: 'o1' },
    { from: 'i1', to: 'n5', label: 'Bị trả lại' }
  ]
});
SPECS.push({
  id: '12_2_phan_cong_dieu_chinh', title: 'QT12.2. Báo cáo Công tác BTNN - phân công tại Bộ Tư pháp và yêu cầu điều chỉnh',
  lanes: [{ name: 'Lãnh đạo Cục', cols: 1 }, { name: 'Lãnh đạo Phòng (Cục)', cols: 1 }, { name: 'Chuyên viên (Cục)', cols: 2 }, { name: 'Hệ thống', cols: 1 }, { name: 'Luồng khác', cols: 1 }],
  nodes: [
    { id: 'i1', lane: 4, row: 0, type: 'offpage', text: 'Từ QT12.1: báo cáo Sở Đã ban hành' },
    { id: 'dK', lane: 3, row: 0, type: 'decision', text: 'Kỳ báo cáo đã phân công?' },
    { id: 'sC', lane: 3, row: 1, type: 'step', text: 'Kỳ báo cáo (Năm + Loại kỳ): Chờ phân công', hl: true },
    { id: 'n6', lane: 0, row: 2, type: 'step', num: 6, text: 'Phân công Lãnh đạo Phòng cho kỳ báo cáo', status: 'Chờ Lãnh đạo Phòng phân công' },
    { id: 'n7', lane: 1, row: 3, type: 'step', num: 7, text: 'Phân công Chuyên viên cho kỳ báo cáo', status: 'Đã phân công' },
    { id: 'n8', lane: 2, col: 0, row: 4, type: 'step', num: 8, text: 'Xem tình hình gửi, xem báo cáo các Sở (MH07, MH08)' },
    { id: 'nV', lane: 2, col: 1, row: 4, type: 'note', text: 'Chuyên viên khác: chỉ xem' },
    { id: 'dC', lane: 2, col: 0, row: 5, type: 'decision', text: 'Báo cáo của Sở cần điều chỉnh?' },
    { id: 'n9', lane: 2, col: 0, row: 6, type: 'step', num: 9, text: 'Nhập Nội dung yêu cầu điều chỉnh, trình', status: 'Chờ duyệt' },
    { id: 'nS', lane: 3, row: 6, type: 'note', text: 'Chờ duyệt yêu cầu: báo cáo Sở vẫn Đã ban hành' },
    { id: 'n10', lane: 1, row: 7, type: 'step', num: 10, text: 'Cấp 1: Duyệt / Từ chối yêu cầu điều chỉnh' },
    { id: 'n11', lane: 0, row: 8, type: 'step', num: 11, text: 'Cấp 2: Duyệt cấp cuối / Từ chối yêu cầu điều chỉnh' },
    { id: 'n12', lane: 2, col: 1, row: 8, type: 'step', num: 12, text: 'Sửa yêu cầu, xem Lý do bị trả lại, trình lại từ cấp 1', status: 'Bị trả lại' },
    { id: 'sG', lane: 3, row: 9, type: 'step', text: 'Gửi Sở: báo cáo Sở Bị trả lại - Bộ Tư pháp yêu cầu điều chỉnh; không tính Đã gửi', hl: true },
    { id: 'o3', lane: 4, row: 5, type: 'offpage', text: 'QT12.3. Báo cáo tổng hợp của Bộ' },
    { id: 'o1', lane: 4, row: 9, type: 'offpage', text: 'QT12.1 bước 5: Sở điều chỉnh, gửi lại' }
  ],
  edges: [
    { from: 'i1', to: 'dK' },
    { from: 'dK', to: 'sC', label: 'Không', fs: 'B' },
    { from: 'dK', to: 'n8', label: 'Có: Chuyên viên đã được phân công', fs: 'L', ts: 'T' },
    { from: 'sC', to: 'n6', fs: 'L', ts: 'T' },
    { from: 'n6', to: 'n7', fs: 'R', ts: 'T' },
    { from: 'n7', to: 'n8', fs: 'R', ts: 'L' },
    { from: 'n8', to: 'dC' },
    { from: 'dC', to: 'o3', label: 'Không', fs: 'R' },
    { from: 'dC', to: 'n9', label: 'Có', fs: 'B' },
    { from: 'n9', to: 'n10', fs: 'L', ts: 'T' },
    { from: 'n10', to: 'n11', label: 'Duyệt', fs: 'L', ts: 'T' },
    { from: 'n10', to: 'n12', label: 'Từ chối', fs: 'R', ts: 'T' },
    { from: 'n11', to: 'n12', label: 'Từ chối', fs: 'R', ts: 'L' },
    { from: 'n11', to: 'sG', label: 'Duyệt cấp cuối', fs: 'B', ts: 'L' },
    { from: 'n12', to: 'n9', label: 'Trình lại', dashed: true, fs: 'T', ts: 'R' },
    { from: 'sG', to: 'o1' }
  ]
});
SPECS.push({
  id: '12_3_bao_cao_bo', title: 'QT12.3. Báo cáo Công tác BTNN - báo cáo tổng hợp của Bộ Tư pháp',
  lanes: [{ name: 'Chuyên viên (Cục)', cols: 1 }, { name: 'Lãnh đạo Cục / Lãnh đạo Bộ', cols: 1 }, { name: 'Hệ thống', cols: 1 }],
  nodes: [
    { id: 'i1', lane: 0, row: 0, type: 'offpage', text: 'Từ QT12.2: Chuyên viên đã được phân công' },
    { id: 'n13', lane: 0, row: 1, type: 'step', num: 13, text: 'Lập / cập nhật báo cáo của Bộ (MH09), Gửi phê duyệt', status: 'Chờ duyệt' },
    { id: 'sT', lane: 2, row: 1, type: 'step', text: 'Tự tổng hợp từ báo cáo Đã ban hành của các Sở cùng kỳ', hl: true },
    { id: 'n15', lane: 0, row: 3, type: 'step', num: 15, text: 'Sửa, trình lại báo cáo của Bộ', status: 'Bị trả lại' },
    { id: 'n14', lane: 1, row: 2, type: 'step', num: 14, text: 'Ký duyệt / Từ chối: Cục ký nháy, Bộ ký số' },
    { id: 'sB', lane: 2, row: 2, type: 'step', text: 'Báo cáo của Bộ Đã ban hành', hl: true },
    { id: 'E', lane: 2, row: 3, type: 'end', text: 'Kết thúc' }
  ],
  edges: [
    { from: 'i1', to: 'n13' }, { from: 'sT', to: 'n13', label: 'Số liệu', dashed: true, fs: 'T', ts: 'T' },
    { from: 'n13', to: 'n14' },
    { from: 'n14', to: 'sB', label: 'Cấp cuối Ký duyệt' },
    { from: 'n14', to: 'n15', label: 'Từ chối', fs: 'B' },
    { from: 'n15', to: 'n13', label: 'Trình lại', fs: 'L', ts: 'L' },
    { from: 'sB', to: 'E' }
  ]
});
SPECS.push({
  id: '13_1_cham_diem', title: 'QT13.1. Quản lý chấm điểm công tác BTNN',
  lanes: [{ name: 'Cán bộ Bộ Tư pháp', cols: 1 }, { name: 'Cán bộ Sở Tư pháp', cols: 1 }, { name: 'Hệ thống', cols: 2 }],
  nodes: [
    { id: 'n1', lane: 0, row: 0, type: 'step', num: 1, text: 'Khởi tạo kỳ chấm điểm mới' },
    { id: 'n2', lane: 1, row: 1, type: 'step', num: 2, text: 'Mở bảng tự chấm (MH02)' },
    { id: 'n3', lane: 1, row: 2, type: 'step', num: 3, text: 'Tổng kết, cam đoan, Gửi Bộ Tư pháp duyệt' },
    { id: 'n4', lane: 0, row: 4, type: 'step', num: 4, text: 'Đánh giá, Hoàn thành đánh giá và xếp loại (MH03)' },
    { id: 's1', lane: 2, col: 0, row: 0, type: 'step', text: 'Chưa bắt đầu', hl: true },
    { id: 's2', lane: 2, col: 0, row: 1, type: 'step', text: 'Đang tự chấm (chưa lưu dữ liệu)', hl: true },
    { id: 'd', lane: 2, col: 0, row: 2, type: 'decision', text: 'Gửi trong thời hạn?' },
    { id: 's3', lane: 2, col: 0, row: 3, type: 'step', text: 'Đã gửi BTP', hl: true },
    { id: 's6', lane: 2, col: 1, row: 2, type: 'step', text: 'Không đánh giá', hl: true },
    { id: 's4', lane: 2, col: 0, row: 4, type: 'step', text: 'BTP đang đánh giá', hl: true },
    { id: 's5', lane: 2, col: 0, row: 5, type: 'step', text: 'Hoàn thành', hl: true }
  ],
  edges: [
    { from: 'n1', to: 's1' }, { from: 's1', to: 'n2' }, { from: 'n2', to: 's2' },
    { from: 's2', to: 'n3' }, { from: 'n3', to: 'd' },
    { from: 'd', to: 's3', label: 'Có', fs: 'B' },
    { from: 'd', to: 's6', label: 'Không', fs: 'R', dashed: true },
    { from: 's3', to: 'n4' },
    { from: 'n4', to: 's4', label: 'Mở đánh giá' },
    { from: 's4', to: 's5', label: 'Hoàn thành đánh giá' }
  ]
});
SPECS.push({
  id: '13_2_bao_cao_thong_ke', title: 'QT13.2. Báo cáo thống kê, Mẫu 01, Mẫu 03 và Dashboard',
  lanes: [{ name: 'Cán bộ nghiệp vụ / Lãnh đạo', cols: 1 }, { name: 'Hệ thống', cols: 2 }],
  nodes: [
    { id: 'n5', lane: 0, row: 0, type: 'step', num: 5, text: 'Báo cáo đánh giá xếp loại: lọc, Row click, Kết xuất' },
    { id: 'n6', lane: 0, row: 1, type: 'step', num: 6, text: 'Báo cáo quản lý BTNN: chọn kỳ, tra cứu, kết xuất' },
    { id: 'n7', lane: 0, row: 2, type: 'step', num: 7, text: 'Mẫu 01 / Mẫu 03: tổng hợp, hiệu chỉnh, kết xuất' },
    { id: 'n8', lane: 0, row: 3, type: 'step', num: 8, text: 'Dashboard: cấu hình hình thức hiển thị, xem phân tích' },
    { id: 'sT', lane: 1, col: 0, row: 1, type: 'step', text: 'Tổng hợp từ vụ việc, Quyết định, Kinh phí, Chấm điểm' },
    { id: 'dD', lane: 1, col: 0, row: 2, type: 'decision', text: 'Có dữ liệu?' },
    { id: 'sN', lane: 1, col: 1, row: 2, type: 'step', text: 'Thông báo không có dữ liệu' },
    { id: 'sY', lane: 1, col: 0, row: 3, type: 'step', text: 'Hiển thị bảng / biểu đồ, cho kết xuất', hl: true },
    { id: 'sM', lane: 1, col: 1, row: 1, type: 'note', text: 'Mẫu 03: kiểm tra công thức, cảnh báo ô lệch' }
  ],
  edges: [
    { from: 'n5', to: 'sT' }, { from: 'n6', to: 'sT' }, { from: 'n7', to: 'sT' }, { from: 'n8', to: 'sT' },
    { from: 'sT', to: 'dD' },
    { from: 'dD', to: 'sN', label: 'Không', fs: 'R' },
    { from: 'dD', to: 'sY', label: 'Có', fs: 'B' },
    { from: 'sT', to: 'sM', dashed: true, fs: 'R' }
  ]
});
SPECS.push({
  id: '14_1_faq_vbqppl', title: 'QT14.1. Hỗ trợ tư liệu - FAQ và VBQPPL',
  lanes: [{ name: 'Cán bộ nghiệp vụ', cols: 1 }, { name: 'Hệ thống', cols: 1 }],
  nodes: [
    { id: 'n1', lane: 0, row: 0, type: 'step', num: 1, text: 'FAQ: Thêm mới / Sửa, Lưu thông tin' },
    { id: 'n2', lane: 0, row: 1, type: 'step', num: 2, text: 'FAQ: Nhận Excel theo file mẫu' },
    { id: 'n3', lane: 0, row: 2, type: 'step', num: 3, text: 'VBQPPL: Thêm mới / Sửa / Xóa' },
    { id: 's', lane: 1, row: 1, type: 'step', text: 'Lưu, công khai / hiển thị ngay (không phê duyệt)', hl: true },
    { id: 'sX', lane: 1, row: 2, type: 'step', text: 'Xóa: popup xác nhận' }
  ],
  edges: [
    { from: 'n1', to: 's' }, { from: 'n2', to: 's' }, { from: 'n3', to: 's' },
    { from: 'n3', to: 'sX', label: 'Xóa', dashed: true }
  ]
});
SPECS.push({
  id: '14_2_cau_hinh_bao_cao', title: 'QT14.2. Cấu hình luồng báo cáo',
  lanes: [{ name: 'Cán bộ quản trị nghiệp vụ', cols: 1 }, { name: 'Hệ thống', cols: 2 }],
  nodes: [
    { id: 'n4', lane: 0, row: 0, type: 'step', num: 4, text: 'Tạo / Cập nhật cấu hình (MH02): biểu mẫu, đơn vị lập, đơn vị nhận, hiệu lực' },
    { id: 'n5', lane: 0, row: 2, type: 'step', num: 5, text: 'Đổi trạng thái cấu hình (MH01)' },
    { id: 'dT', lane: 1, col: 0, row: 0, type: 'decision', text: 'Trùng cấu hình?' },
    { id: 'err', lane: 1, col: 1, row: 0, type: 'note', text: 'Cảnh báo, không lưu' },
    { id: 'sL', lane: 1, col: 0, row: 1, type: 'step', text: 'Lưu cấu hình', hl: true },
    { id: 'sS', lane: 1, col: 0, row: 2, type: 'step', text: 'Hoạt động / Tạm ngưng', hl: true },
    { id: 'dK', lane: 1, col: 0, row: 3, type: 'decision', text: 'Khi tổng hợp kỳ: có cấu hình Hoạt động phù hợp?' },
    { id: 's1', lane: 1, col: 1, row: 3, type: 'step', text: 'Tổng hợp theo luồng động' },
    { id: 's2', lane: 1, col: 0, row: 4, type: 'step', text: 'Tổng hợp theo cây cấp đơn vị' }
  ],
  edges: [
    { from: 'n4', to: 'dT' },
    { from: 'dT', to: 'err', label: 'Có', fs: 'R' },
    { from: 'dT', to: 'sL', label: 'Không', fs: 'B' },
    { from: 'n5', to: 'sS' },
    { from: 'sS', to: 'dK', dashed: true },
    { from: 'dK', to: 's1', label: 'Có', fs: 'R' },
    { from: 'dK', to: 's2', label: 'Không', fs: 'B' }
  ]
});
