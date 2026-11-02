// 07_Theo_doi_vu_viec_Toa_an.md (buoc 1 - 7) va 08_Tra_cuu_vu_viec.md (buoc 1 - 5)
SPECS.push({
  id: '07_1_theo_doi_toa_an', title: 'QT7.1. Theo dõi vụ việc tại Tòa án',
  lanes: [{ name: 'Cán bộ cơ quan bị khởi kiện', cols: 2 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ Kinh phí', cols: 1 }],
  nodes: [
    { id: 'S', lane: 0, col: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n7', lane: 0, col: 1, row: 0, type: 'note', num: 7, text: 'Bộ Tư pháp: tra cứu vụ việc của mọi cơ quan' },
    { id: 'n1', lane: 0, col: 0, row: 1, type: 'step', num: 1, text: 'Thêm mới (MH02), Trạng thái mặc định Đã thụ lý' },
    { id: 'dLK', lane: 0, col: 0, row: 2, type: 'decision', text: 'Có vụ việc liên kết?' },
    { id: 'n2', lane: 0, col: 1, row: 2, type: 'step', num: 2, text: 'Tìm, chọn vụ việc liên kết' },
    { id: 'n3', lane: 0, col: 0, row: 3, type: 'step', num: 3, text: 'Lưu thông tin (Đã thụ lý / Đang giải quyết)' },
    { id: 'n4', lane: 0, col: 1, row: 5, type: 'step', num: 4, text: 'Cập nhật sang Đã có bản án/QĐ, nhập Số, Ngày, xác nhận' },
    { id: 'n5', lane: 0, col: 1, row: 6, type: 'step', num: 5, text: 'Cập nhật sang Trả lại đơn khởi kiện, xác nhận', status: 'Trả lại đơn khởi kiện (kết thúc)' },
    { id: 'n6', lane: 0, col: 0, row: 7, type: 'step', num: 6, text: 'Xóa vụ việc' },
    { id: 'dV', lane: 1, row: 3, type: 'decision', text: 'Dữ liệu hợp lệ?' },
    { id: 'err', lane: 1, row: 2, type: 'note', text: 'Khung báo lỗi, không lưu' },
    { id: 'sL', lane: 1, row: 4, type: 'step', text: 'Lưu, gán Mã vụ việc, Cơ quan bị khởi kiện', status: 'Đã thụ lý / Đang giải quyết', hl: true },
    { id: 'sK', lane: 1, row: 5, type: 'step', text: 'Tạo 01 bản ghi Chi trả', status: 'Đã có bản án/QĐ (kết thúc)', hl: true },
    { id: 'dX', lane: 1, row: 7, type: 'decision', text: 'Bản ghi kinh phí còn Chờ thông báo chi trả?' },
    { id: 'sX', lane: 1, row: 8, type: 'step', text: 'Xóa vụ việc và bản ghi kinh phí' },
    { id: 'eX', lane: 2, row: 7, type: 'note', text: 'Không cho xóa, báo trạng thái bản ghi' },
    { id: 'oK', lane: 2, row: 5, type: 'offpage', text: 'QT5.1 Chi trả tiền bồi thường' }
  ],
  edges: [
    { from: 'S', to: 'n1' }, { from: 'n1', to: 'dLK' },
    { from: 'dLK', to: 'n2', label: 'Có', fs: 'R' },
    { from: 'dLK', to: 'n3', label: 'Không', fs: 'B' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'dV' },
    { from: 'dV', to: 'err', label: 'Không', fs: 'T' },
    { from: 'dV', to: 'sL', label: 'Có', fs: 'B' },
    { from: 'sL', to: 'n4', label: 'Cập nhật', dashed: true },
    { from: 'sL', to: 'n5', label: 'Cập nhật', dashed: true },
    { from: 'n4', to: 'sK' },
    { from: 'sK', to: 'oK' },
    { from: 'n6', to: 'dX' },
    { from: 'dX', to: 'sX', label: 'Có / chưa có bản ghi', fs: 'B' },
    { from: 'dX', to: 'eX', label: 'Không', fs: 'R' }
  ]
});
SPECS.push({
  id: '08_1_tra_cuu', title: 'QT8.1. Tra cứu vụ việc',
  lanes: [{ name: 'Người dùng có quyền Tra cứu vụ việc', cols: 1 }, { name: 'Hệ thống', cols: 2 }],
  nodes: [
    { id: 'S', lane: 0, row: 0, type: 'start', text: 'Bắt đầu' },
    { id: 'n1', lane: 0, row: 1, type: 'step', num: 1, text: 'Nhập điều kiện, Tìm kiếm (MH01)' },
    { id: 'n2', lane: 0, row: 2, type: 'step', num: 2, text: 'Click Mã hồ sơ GQBT của cơ quan khác' },
    { id: 'n3', lane: 0, row: 3, type: 'step', num: 3, text: 'Sở Tư pháp: click hồ sơ cơ quan địa phương cùng tỉnh' },
    { id: 'n4', lane: 0, row: 4, type: 'step', num: 4, text: 'Bộ Tư pháp / Cục: click hồ sơ bất kỳ' },
    { id: 'n5', lane: 0, row: 5, type: 'step', num: 5, text: 'Kết xuất Excel' },
    { id: 'sDS', lane: 1, col: 0, row: 1, type: 'step', text: 'Danh sách mọi cơ quan, từ Chờ tiếp nhận trở đi', hl: true },
    { id: 'dQ', lane: 1, col: 0, row: 3, type: 'decision', text: 'Được xem chi tiết?' },
    { id: 'sO', lane: 1, col: 1, row: 3, type: 'step', text: 'Mở chi tiết toàn trình, chỉ xem', hl: true },
    { id: 'sT', lane: 1, col: 0, row: 4, type: 'step', text: 'Không mở; tooltip giới hạn quyền' },
    { id: 'sX', lane: 1, col: 0, row: 5, type: 'step', text: 'Tệp Excel theo bộ lọc hiện tại' }
  ],
  edges: [
    { from: 'S', to: 'n1' }, { from: 'n1', to: 'sDS' },
    { from: 'n2', to: 'dQ', ts: 'T' }, { from: 'n3', to: 'dQ', ts: 'L' }, { from: 'n4', to: 'dQ', ts: 'L' },
    { from: 'dQ', to: 'sO', label: 'Có', fs: 'R' },
    { from: 'dQ', to: 'sT', label: 'Không', fs: 'B' },
    { from: 'n5', to: 'sX' }
  ]
});
