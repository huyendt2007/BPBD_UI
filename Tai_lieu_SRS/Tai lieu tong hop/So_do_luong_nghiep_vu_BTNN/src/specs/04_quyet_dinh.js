// 04_Quyet_dinh_GQBT.md - buoc 1 - 10
SPECS.push({
  id: '04_1_lap_ban_hanh', title: 'QT4.1. Quyết định GQBT - lập, trình ký, ban hành',
  lanes: [{ name: 'Cán bộ chủ trì', cols: 2 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ khác / Cổng DVC', cols: 1 }],
  nodes: [
    { id: 'n1', lane: 0, col: 0, row: 0, type: 'step', num: 1, text: 'Tạo mới, chọn Mã hồ sơ GQBT (MH01, MH02)' },
    { id: 'dH', lane: 0, col: 0, row: 3, type: 'decision', text: 'Hình thức ký? (MH02b)' },
    { id: 'n2', lane: 0, col: 0, row: 4, type: 'step', num: 2, text: 'Chọn Lãnh đạo, Trình Lãnh đạo', status: 'Chờ duyệt' },
    { id: 'n3', lane: 0, col: 1, row: 3, type: 'step', num: 3, text: 'Nhập Số, Ngày QĐ, Người ký, tệp đã ký, Ban hành văn bản' },
    { id: 'n5', lane: 0, col: 1, row: 5, type: 'step', num: 5, text: 'Sửa và trình lại / Xóa dự thảo', status: 'Bị trả lại' },
    { id: 'n4', lane: 1, row: 4, type: 'step', num: 4, text: 'Ký duyệt các cấp / Từ chối (MH07)' },
    { id: 'dK', lane: 2, row: 0, type: 'decision', text: 'Đồng ý thương lượng, có kết quả từng thiệt hại?' },
    { id: 'sA', lane: 2, row: 1, type: 'step', text: 'Kịch bản A: điền theo Kết quả xác minh thiệt hại' },
    { id: 'sB', lane: 2, row: 2, type: 'step', text: 'Kịch bản B: điền theo Kết quả thương lượng' },
    { id: 'sBH', lane: 2, row: 4, type: 'step', text: 'Quyết định Đã ban hành; vụ việc Chờ chi trả', hl: true },
    { id: 'a', lane: 3, row: 0, type: 'offpage', text: 'Từ QT3.2: vụ việc Chờ ban hành QĐ' },
    { id: 'o1', lane: 3, row: 4, type: 'offpage', text: 'Sang QT4.2 Cập nhật hiệu lực' },
    { id: 'dvc', lane: 3, row: 5, type: 'offpage', text: 'Cổng DVC: Mẫu 18/BTNN (Nguồn Dịch vụ công)' }
  ],
  edges: [
    { from: 'a', to: 'n1', fs: 'T', ts: 'T' },
    { from: 'n1', to: 'dK' },
    { from: 'dK', to: 'sA', label: 'Không', fs: 'B' },
    { from: 'dK', to: 'sB', label: 'Có', fs: 'R' },
    { from: 'sA', to: 'dH', ts: 'T' }, { from: 'sB', to: 'dH', ts: 'T' },
    { from: 'dH', to: 'n2', label: 'Ký số', fs: 'B' },
    { from: 'dH', to: 'n3', label: 'Ký ngoài', fs: 'R' },
    { from: 'n2', to: 'n4' },
    { from: 'n4', to: 'sBH', label: 'Cấp cuối Ký duyệt' },
    { from: 'n4', to: 'n5', label: 'Từ chối' },
    { from: 'n5', to: 'n2', label: 'Trình lại từ cấp 1' },
    { from: 'n3', to: 'sBH' },
    { from: 'sBH', to: 'o1' },
    { from: 'sBH', to: 'dvc', dashed: true, label: 'Gửi kết quả' }
  ]
});
SPECS.push({
  id: '04_2_hieu_luc_huy_sua', title: 'QT4.2. Quyết định GQBT - cập nhật hiệu lực, Hủy QĐ, Sửa chữa, bổ sung QĐ',
  lanes: [{ name: 'Cán bộ xử lý', cols: 2 }, { name: 'Lãnh đạo được giao', cols: 1 }, { name: 'Hệ thống', cols: 1 }, { name: 'Phân hệ Kinh phí', cols: 1 }],
  nodes: [
    { id: 'a', lane: 0, col: 0, row: 0, type: 'offpage', text: 'Từ QT4.1: Quyết định Đã ban hành' },
    { id: 'n6', lane: 0, col: 0, row: 1, type: 'step', num: 6, text: 'Cập nhật hiệu lực: Có hiệu lực (MH06)', status: 'Có hiệu lực' },
    { id: 'n7', lane: 0, col: 1, row: 1, type: 'step', num: 7, text: 'Cập nhật hiệu lực: Không có hiệu lực, nhập lý do', status: 'Không có hiệu lực (cuối)' },
    { id: 'n8', lane: 0, col: 0, row: 3, type: 'step', num: 8, text: 'Hủy QĐ (MH05, Mẫu 20/BTNN)' },
    { id: 'n9', lane: 0, col: 1, row: 3, type: 'step', num: 9, text: 'Sửa chữa, bổ sung QĐ (MH05c, MH05b, Mẫu 21/BTNN)' },
    { id: 'dH', lane: 0, col: 0, row: 4, type: 'decision', text: 'Hình thức ký?' },
    { id: 'n10', lane: 0, col: 1, row: 5, type: 'step', num: 10, text: 'Rút yêu cầu (Xóa) hoặc sửa, trình lại', status: 'Bị trả lại' },
    { id: 'dL', lane: 1, row: 4, type: 'decision', text: 'Lãnh đạo ký duyệt? (MH07)' },
    { id: 'dT', lane: 2, row: 4, type: 'decision', text: 'Nội dung trình?' },
    { id: 's6', lane: 2, row: 3, type: 'step', text: 'Hủy quyết định', hl: true },
    { id: 's7', lane: 2, row: 5, type: 'step', text: 'Về trạng thái trước khi trình, lưu lần sửa chữa, bổ sung', hl: true },
    { id: 'k1', lane: 3, row: 1, type: 'offpage', text: 'Tạo bản ghi Chi trả Chờ thông báo chi trả (QT5.1)' },
    { id: 'k3', lane: 3, row: 3, type: 'offpage', text: 'Kinh phí theo Bảng C (QT5.3)' },
    { id: 'k2', lane: 3, row: 5, type: 'offpage', text: 'Kinh phí theo Bảng A, B (QT5.3)' }
  ],
  edges: [
    { from: 'a', to: 'n6' }, { from: 'a', to: 'n7', fs: 'R', ts: 'R' },
    { from: 'n6', to: 'n7', label: 'Khi chưa chi trả', fs: 'R', ts: 'L' },
    { from: 'n6', to: 'k1', label: 'Tạo bản ghi', dashed: true, fs: 'T' },
    { from: 'n6', to: 'n8', label: 'Đã ban hành / Có hiệu lực', fs: 'B' },
    { from: 'n6', to: 'n9', fs: 'B', ts: 'T' },
    { from: 'n8', to: 'dH' }, { from: 'n9', to: 'dH', ts: 'T' },
    { from: 'dH', to: 'dL', label: 'Ký số', fs: 'R' },
    { from: 'dH', to: 'dT', label: 'Ký ngoài', fs: 'B', ts: 'B' },
    { from: 'dL', to: 'dT', label: 'Cấp cuối' },
    { from: 'dL', to: 'n10', label: 'Từ chối', fs: 'B' },
    { from: 'n10', to: 'dH', label: 'Trình lại', ts: 'L' },
    { from: 'dT', to: 's6', label: 'Hủy QĐ', fs: 'T' },
    { from: 'dT', to: 's7', label: 'Sửa chữa, bổ sung', fs: 'R' },
    { from: 's6', to: 'k3' }, { from: 's7', to: 'k2', fs: 'B', ts: 'B' }
  ]
});
