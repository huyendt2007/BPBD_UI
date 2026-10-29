/*
 * Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường (Mẫu số 25/BTNN) - Giải quyết yêu cầu bồi thường (prefix dcgq)
 * Bố cục giống Popup Không thụ lý hồ sơ / Trình duyệt tiếp nhận hồ sơ:
 * - Hình thức ký (đầu form): Ký số trên hệ thống (02 bước: Nhập thông tin -> Kéo ô ký & chọn Lãnh đạo) | Ký ngoài (Ban hành trực tiếp)
 * - Thông tin đình chỉ: Căn cứ đình chỉ (6), Diễn giải; Quyết định tạm ứng (Điều 3, chỉ đọc)
 * - Thu hồi kinh phí bồi thường đã chi (Thu hồi | Không thu hồi, mặc định Thu hồi): luôn hiển thị; có lựa chọn khi vụ việc có khoản kinh phí đã chi
 *   hoặc bản ghi kinh phí đang hiệu lực (kho proposalsList, kho trống -> dữ liệu mẫu Kinh phí), không có -> dòng chú thích chỉ đọc;
 *   Không thu hồi -> Lý do không thu hồi (bắt buộc, tối đa 1000 ký tự). Lưu vào dinhChi / phiếu trình (thuHoi, thuHoiReason);
 *   liên thông Kinh phí theo lựa chọn (quan_ly_kinh_phi_kpdc.js)
 * - Tệp văn bản trình ký: Sinh văn bản theo mẫu 25/BTNN | Tải lên từ máy; Tài liệu đính kèm (chỉ Ký số, không bắt buộc)
 * - Trình Lãnh đạo: Loại trình "Đình chỉ giải quyết bồi thường" -> Chờ duyệt; Lãnh đạo Ký duyệt / Từ chối tại màn chung (gqld);
 *   cấp cuối ký duyệt -> "Đình chỉ giải quyết"; từ chối -> "Bị trả lại" (Cập nhật -> mở lại popup, điền lại toàn bộ dữ liệu lần trình trước)
 * - Ký ngoài: đính kèm PDF đã ký -> xác nhận -> Ban hành văn bản -> "Đình chỉ giải quyết"
 * Dùng các tiện ích sẵn có của quan_ly_boi_thuong.html (gqW, gqClaim, gqRecord, gqSubmit, gqSign*, ktlx*, tlktGqRestore, tlktGqExtra).
 */
var DCGQ_KIND = 'Đình chỉ giải quyết bồi thường'; // Loại trình: chỉ nhánh Giải quyết bồi thường thiệt hại, nhánh Phục hồi danh dự giữ nguyên
var DCGQ_FORM = 'Mẫu số 25/BTNN';
var DCGQ_RESULT = 'Đình chỉ giải quyết';
// Căn cứ đình chỉ (6): các trường hợp tại khoản 1 Điều 51 và trường hợp tại khoản 2 Điều 50 Luật TNBTCNN (danh sách cần user xác nhận)
var DCGQ_REASONS = [
    { code: 'DCGQ_01', name: 'Người yêu cầu bồi thường chết mà không có người thừa kế hoặc tổ chức yêu cầu bồi thường đã giải thể, phá sản mà không có cá nhân, tổ chức kế thừa quyền và nghĩa vụ (Điểm a Khoản 1 Điều 51)' },
    { code: 'DCGQ_02', name: 'Người yêu cầu bồi thường rút toàn bộ yêu cầu bồi thường (Điểm b Khoản 1 Điều 51)' },
    { code: 'DCGQ_03', name: 'Thuộc trường hợp quy định tại khoản 2 Điều 43 của Luật mà cơ quan giải quyết bồi thường đã thụ lý hồ sơ (Điểm c Khoản 1 Điều 51)' },
    { code: 'DCGQ_04', name: 'Văn bản được xem xét lại không còn là văn bản làm căn cứ yêu cầu bồi thường (Khoản 2 Điều 50)' }
];
var DCGQ_NOI_NHAN_DEFAULT = ['- Như Điều 4;', '- ……(7)..….;', '- …….(8).....;', '- …….(9).….;', '- Lưu: VT, HSVV.'];
var DCGQ_CONTENT_DEFAULT = 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ giải quyết yêu cầu bồi thường.';
var DCGQ_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
var dcgqClaim = null;
var dcgqDocSrc = 'gen';
var dcgqOnlineFile = null;
var dcgqOfflineFile = null;
var dcgqAdvance = null;

function dcgqEl(id) { return document.getElementById(id); }
function dcgqIsOffline() { var r = dcgqEl('dcgqSigningMethodOffline'); return !!(r && r.checked); }
function dcgqClearErr(id) { var el = dcgqEl(id); if (el) el.classList.remove('is-invalid'); var er = dcgqEl(id + 'Err'); if (er) er.style.display = 'none'; }
function dcgqSetErr(id, msg) { var el = dcgqEl(id); if (el) el.classList.add('is-invalid'); var er = dcgqEl(id + 'Err'); if (er) { if (msg) er.textContent = msg; er.style.display = 'block'; } return el; }

// ---------- Thu hồi kinh phí bồi thường đã chi (dùng chung: Đình chỉ giải quyết - prefix dcgq, Dừng giải quyết - prefix dgq) ----------
var DCGQ_TH_YES = 'Thu hồi';
var DCGQ_TH_NO = 'Không thu hồi';
var DCGQ_TH_MAX = 1000;
var gqthPaid = {};
function gqthEl(p, k) { return document.getElementById(p + k); }
function gqthSetErr(p, k) { var el = gqthEl(p, k); if (el) el.classList.add('is-invalid'); var er = gqthEl(p, k + 'Err'); if (er) er.style.display = 'block'; return el; }
function gqthClearErr(p, k) { var el = gqthEl(p, k); if (el) el.classList.remove('is-invalid'); var er = gqthEl(p, k + 'Err'); if (er) er.style.display = 'none'; }
// Khoản kinh phí tạm ứng/chi trả đã chi của vụ việc (Hoàn thành / có Số tiền đã chi), chưa ở trạng thái Đã hủy / Chờ thu hồi / Đã thu hồi / Trả lại ngân sách nhà nước
// Bản ghi kinh phí của vụ việc đang hiệu lực (chưa Đã hủy / Chờ thu hồi / Đã thu hồi / Trả lại ngân sách nhà nước, chưa ghi nhận Không thu hồi).
// Nguồn: kho 'proposalsList'; kho trống (chưa mở trang Kinh phí) -> dữ liệu mẫu mặc định của phân hệ Kinh phí (kpdcProposals)
function dcgqActiveList(claim) {
    var list = [];
    if (typeof kpdcProposals === 'function') list = kpdcProposals();
    else { try { list = JSON.parse(localStorage.getItem('proposalsList') || '[]') || []; } catch (e) { list = []; } }
    var keep = ['Đã hủy', 'Đã thu hồi', 'Chờ thu hồi', 'Trả lại ngân sách nhà nước', 'Đã sung quỹ', 'Sung quỹ nhà nước'];
    return (Array.isArray(list) ? list : []).filter(function (p) {
        return !!(p && claim && claim.code && p.ycbtCode === claim.code && keep.indexOf(p.status) < 0 && !p.kpdcNoRecover);
    });
}
function dcgqIsPaidItem(p) { return typeof kpdcIsPaid === 'function' ? kpdcIsPaid(p) : p.status === 'Hoàn thành'; }
function dcgqPaidList(claim) { return dcgqActiveList(claim).filter(dcgqIsPaidItem); }
// Khối trường (đặt cuối khối Thông tin đình chỉ / dừng giải quyết); luôn hiển thị:
// có khoản kinh phí đang hiệu lực -> lựa chọn Thu hồi / Không thu hồi; không có -> dòng chú thích chỉ đọc
var GQTH_NONE_MSG = 'Vụ việc chưa có khoản kinh phí đã chi, không phát sinh thu hồi.';
function gqthHtml(p) {
    return '<div id="' + p + 'ThuHoiBlock" class="gqx-field" style="margin:14px 0 0;"><label class="form-label">Thu hồi kinh phí bồi thường đã chi<span id="' + p + 'ThuHoiReq" class="gqx-req">*</span></label>'
        + '<div id="' + p + 'ThuHoiNone" style="display:none; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 12px; font-size:13px; color:#64748b; font-style:italic;">' + GQTH_NONE_MSG + '</div>'
        + '<div id="' + p + 'ThuHoiChoice"><div style="display:flex; gap:28px; align-items:center; font-size:13px;">'
        + '<label for="' + p + 'ThuHoiYes" style="display:inline-flex; align-items:center; gap:6px; cursor:pointer; margin:0;"><input type="radio" name="' + p + 'ThuHoi" id="' + p + 'ThuHoiYes" value="' + DCGQ_TH_YES + '" checked onchange="gqthToggle(\'' + p + '\')"> ' + DCGQ_TH_YES + '</label>'
        + '<label for="' + p + 'ThuHoiNo" style="display:inline-flex; align-items:center; gap:6px; cursor:pointer; margin:0;"><input type="radio" name="' + p + 'ThuHoi" id="' + p + 'ThuHoiNo" value="' + DCGQ_TH_NO + '" onchange="gqthToggle(\'' + p + '\')"> ' + DCGQ_TH_NO + '</label></div>'
        + '<div id="' + p + 'ThuHoiErr" class="gqx-err">Đây là trường bắt buộc</div>'
        + '<div id="' + p + 'ThuHoiPaid" style="font-size:12px; color:#64748b; margin-top:4px;"></div>'
        + '<div id="' + p + 'ThuHoiReasonGroup" style="display:none; margin-top:10px;"><label class="form-label" for="' + p + 'ThuHoiReason">Lý do không thu hồi<span class="gqx-req">*</span></label>'
        + '<textarea id="' + p + 'ThuHoiReason" class="form-control" rows="3" maxlength="' + DCGQ_TH_MAX + '" placeholder="Nhập lý do không thu hồi..." oninput="gqthClearErr(\'' + p + '\', \'ThuHoiReason\'); gqthCounter(\'' + p + '\')"></textarea>'
        + '<div id="' + p + 'ThuHoiReasonErr" class="gqx-err">Đây là trường bắt buộc</div><div id="' + p + 'ThuHoiReasonCount" class="ktlx-counter">0/' + DCGQ_TH_MAX + ' ký tự</div></div></div></div>';
}
// Có lựa chọn Thu hồi / Không thu hồi (vụ việc có khoản kinh phí đang hiệu lực)
function gqthShown(p) { var b = gqthEl(p, 'ThuHoiChoice'); return !!(b && b.style.display !== 'none'); }
function gqthVal(p) { var r = document.querySelector('input[name="' + p + 'ThuHoi"]:checked'); return r ? r.value : ''; }
function gqthCounter(p) { var t = gqthEl(p, 'ThuHoiReason'), c = gqthEl(p, 'ThuHoiReasonCount'); if (t && c) c.textContent = (t.value || '').length + '/' + DCGQ_TH_MAX + ' ký tự'; }
function gqthToggle(p) {
    var no = gqthVal(p) === DCGQ_TH_NO;
    gqthEl(p, 'ThuHoiReasonGroup').style.display = no ? '' : 'none';
    gqthClearErr(p, 'ThuHoi');
    if (!no) gqthClearErr(p, 'ThuHoiReason');
}
// Hiển thị trường theo bản ghi kinh phí của vụ việc; trình lại (Bị trả lại): điền lại lựa chọn + lý do lần trình trước
function gqthRender(p, claim, prevSd) {
    var act = dcgqActiveList(claim);
    var paid = gqthPaid[p] = act.filter(dcgqIsPaidItem);
    var unpaid = act.filter(function (x) { return !dcgqIsPaidItem(x); });
    var show = act.length > 0;
    gqthEl(p, 'ThuHoiBlock').style.display = '';
    gqthEl(p, 'ThuHoiChoice').style.display = show ? '' : 'none';
    gqthEl(p, 'ThuHoiNone').style.display = show ? 'none' : '';
    gqthEl(p, 'ThuHoiReq').style.display = show ? '' : 'none';
    var val = prevSd && prevSd.thuHoi === DCGQ_TH_NO ? DCGQ_TH_NO : DCGQ_TH_YES;
    gqthEl(p, 'ThuHoiYes').checked = val === DCGQ_TH_YES;
    gqthEl(p, 'ThuHoiNo').checked = val === DCGQ_TH_NO;
    gqthEl(p, 'ThuHoiReason').value = val === DCGQ_TH_NO ? (prevSd.thuHoiReason || '') : '';
    var codes = function (l, withAmt) {
        return l.map(function (x) {
            var amt = withAmt && typeof kpdcPaidAmount === 'function' ? kpdcPaidAmount(x) : 0;
            return '<b>' + gqE(x.code || '') + '</b>' + (amt ? ' (' + amt.toLocaleString('vi-VN') + ' đồng)' : '');
        }).join(', ');
    };
    gqthEl(p, 'ThuHoiPaid').innerHTML = !show ? ''
        : (paid.length ? 'Khoản kinh phí đã chi: ' + codes(paid, true) : 'Khoản kinh phí đã chi: chưa có')
          + (unpaid.length ? '<br>Khoản kinh phí chưa chi (tự hủy khi ban hành văn bản): ' + codes(unpaid, false) : '');
    gqthCounter(p);
    gqthToggle(p);
}
// Kiểm tra: Không thu hồi phải nhập Lý do không thu hồi; trả về ô lỗi
function gqthValidate(p) {
    if (!gqthShown(p)) return null;
    if (!gqthVal(p)) return gqthSetErr(p, 'ThuHoi') || gqthEl(p, 'ThuHoiYes');
    if (gqthVal(p) === DCGQ_TH_NO && !gqthEl(p, 'ThuHoiReason').value.trim()) return gqthSetErr(p, 'ThuHoiReason');
    gqthClearErr(p, 'ThuHoiReason');
    return null;
}
// Dữ liệu lưu: trường ẩn (không có khoản đã chi) -> thuHoi rỗng
function gqthData(p) {
    if (!gqthShown(p)) return { thuHoi: '', thuHoiReason: '' };
    var v = gqthVal(p) || DCGQ_TH_YES;
    return { thuHoi: v, thuHoiReason: v === DCGQ_TH_NO ? gqthEl(p, 'ThuHoiReason').value.trim() : '' };
}
function dcgqThuHoiText(th) {
    if (!th || !th.thuHoi) return '';
    return 'Thu hồi kinh phí bồi thường đã chi: ' + th.thuHoi + (th.thuHoi === DCGQ_TH_NO && th.thuHoiReason ? '. Lý do không thu hồi: ' + String(th.thuHoiReason).replace(/[.\s]+$/, '') : '') + '.';
}
// Đình chỉ giải quyết (prefix dcgq)
function dcgqRenderThuHoi(claim, prevSd) { gqthRender('dcgq', claim, prevSd); }
function dcgqValidateThuHoi() { return gqthValidate('dcgq'); }
function dcgqThuHoiData() { return gqthData('dcgq'); }

// ---------- Dữ liệu điền mẫu ----------
// (3) Chức vụ người đứng đầu cơ quan giải quyết bồi thường = chức vụ đầu tiên của Loại cơ quan trong DM_58 + tên cơ quan
function dcgqLoaiOfName(name) {
    var n = String(name || '').trim();
    if (/^Phòng\s/i.test(n)) return 'LDV_08';
    if (/^Sở\s/i.test(n)) return 'LDV_35';
    if (/^(UBND|Ủy ban nhân dân)\s+(phường|xã)\b/i.test(n)) return 'LDV_37';
    if (/^(UBND|Ủy ban nhân dân)\s/i.test(n)) return 'LDV_36';
    if (/^Bộ\s/i.test(n)) return 'LDV_01';
    if (/^(Văn phòng Chính phủ|Thanh tra Chính phủ)/i.test(n)) return 'LDV_02';
    if (/^Chi cục\s/i.test(n)) return 'LDV_07';
    if (/^Cục\s/i.test(n)) return 'LDV_06';
    if (/^Tòa án nhân dân tối cao/i.test(n)) return 'LDV_14';
    if (/^Tòa án nhân dân (tỉnh|thành phố)\s/i.test(n)) return 'LDV_17';
    if (/^Tòa án nhân dân\s/i.test(n)) return 'LDV_18';
    return '';
}
function dcgqHeadTitle(unitName) {
    var name = String(unitName || '').trim();
    var loai = dcgqLoaiOfName(name);
    var cv = '';
    try { if (loai && window.DM_LCQ) { var l = window.DM_LCQ.chucVuOf(loai); cv = l && l[0] ? l[0].name : ''; } } catch (e) { cv = ''; }
    if (!cv) return 'THỦ TRƯỞNG ' + name.toUpperCase();
    var last = cv.split(/\s+/).pop();
    var out = name.toLowerCase().indexOf(last.toLowerCase() + ' ') === 0 ? cv.slice(0, cv.length - last.length) + name : cv + ' ' + name;
    return out.toUpperCase();
}
// (8) Họ tên cán bộ giải quyết bồi thường được cử (cán bộ chủ trì của hồ sơ)
function dcgqOfficerName(claim) {
    var W = gqW(); var rec = gqRecord(claim);
    return (rec && rec.chuTri && W ? W.userName(rec.chuTri) : '') || claim.assignedOfficer || '';
}
// (9) Họ tên người thi hành công vụ gây thiệt hại theo hồ sơ
function dcgqOfficialNames(claim) {
    return (Array.isArray(claim.officers) ? claim.officers : []).map(function (o) { return o && o.name ? String(o.name).trim() : ''; }).filter(Boolean).join(', ');
}
// Điều 3: Quyết định tạm ứng kinh phí bồi thường đã ban hành của vụ việc (Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường)
function dcgqFindAdvance(claim) {
    var list = [];
    // Kho 'proposalsList'; kho trống (chưa mở trang Kinh phí) -> dữ liệu mẫu mặc định của phân hệ Kinh phí
    if (typeof kpdcProposals === 'function') list = kpdcProposals();
    else { try { list = JSON.parse(localStorage.getItem('proposalsList') || '[]') || []; } catch (e) { list = []; } }
    if (!Array.isArray(list)) list = [];
    var done = ['Chờ chi trả', 'Hoàn thành', 'Trả lại ngân sách nhà nước', 'Chờ thu hồi'];
    var hits = list.filter(function (p) { return p && p.ycbtCode === claim.code && (p.type === 'Cấp tạm ứng' || p.qdtu) && done.indexOf(p.status) >= 0 && (p.docNo || (p.qdtu && p.qdtu.sign && p.qdtu.sign.docNo)); });
    if (!hits.length) return null;
    var p = hits[hits.length - 1];
    var s = (p.qdtu && p.qdtu.sign) || {};
    return { docNo: String(p.docNo || s.docNo || '').trim(), docDate: String(p.docDate || s.docDate || '').trim(), code: p.code || '' };
}
function dcgqReasonText(code) {
    var r = DCGQ_REASONS.filter(function (x) { return x.code === code; })[0];
    return r ? r.name : '';
}
// (6) dùng trong Điều 1: nội dung căn cứ (bỏ phần điểm, khoản), chữ đầu viết thường; kèm Diễn giải nếu có
function dcgqReasonForDoc(code, detail) {
    var t = dcgqReasonText(code).replace(/\s*\([^)]*\)\s*$/, '').trim();
    if (t) t = t.charAt(0).toLowerCase() + t.slice(1);
    return t ? t + (detail ? ': ' + detail : '') : '';
}
function dcgqNoiNhanLines() { return (dcgqEl('dcgqNoiNhan').value || '').split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean); }
function dcgqNoiNhanDefault(claim) {
    var l = DCGQ_NOI_NHAN_DEFAULT.slice();
    var gq = dcgqOfficerName(claim); if (gq) l[2] = '- ' + gq + ';';
    var tv = dcgqOfficialNames(claim); if (tv) l[3] = '- ' + tv + ';';
    return l.join('\n');
}
function dcgqDocBaseName(claim) { return 'Mau_25_BTNN_Quyet_dinh_dinh_chi_' + ((typeof claimVvCode === 'function' && claimVvCode(claim)) || claim.code); }
// Văn bản Mẫu 25/BTNN sinh từ thông tin đang nhập
function dcgqBuildMau25(claim, x) {
    var p = gqDocParts(claim);
    var P = 'margin:6pt 0; text-align:justify; text-indent:1cm;';
    var dots = '................................................';
    var nyc = gqE(getClaimRequesterName(claim) || '........');
    var adv = x.advance;
    var soTu = adv && adv.docNo ? gqE(adv.docNo) : '…..';
    var ngTu = '… tháng … năm ….';
    var m = adv && adv.docDate ? String(adv.docDate).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/) : null;
    if (m) ngTu = m[1].padStart(2, '0') + ' tháng ' + m[2].padStart(2, '0') + ' năm ' + m[3];
    var nn = (x.noiNhan && x.noiNhan.length ? x.noiNhan : DCGQ_NOI_NHAN_DEFAULT).map(gqE).join('<br>');
    return p.W.docHeaderHtml(p.unitId, DCGQ_FORM, 'QĐ', { soKyHieu: x.docNumber, ngay: x.docDate })
        + '<p style="text-align:center; margin:18pt 0 6pt;"><b>QUYẾT ĐỊNH</b><br><b>Đình chỉ giải quyết yêu cầu bồi thường</b></p>'
        + '<p style="text-align:center; margin:6pt 0 12pt;"><b>' + gqE(dcgqHeadTitle(p.issuer)) + '</b></p>'
        + '<p style="' + P + '">Căn cứ Điều 51 Luật Trách nhiệm bồi thường của Nhà nước năm 2017 số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16),</p>'
        + '<p style="text-align:center; margin:10pt 0;"><b>QUYẾT ĐỊNH:</b></p>'
        + '<p style="' + P + '"><b>Điều 1.</b> Đình chỉ giải quyết yêu cầu bồi thường của Ông/Bà ' + nyc + '. Địa chỉ: ' + gqE(p.address || '........') + ' vì ' + (x.reasonDoc ? gqE(x.reasonDoc) : dots) + '.</p>'
        + '<p style="' + P + '"><b>Điều 2.</b> Sau khi có quyết định đình chỉ giải quyết yêu cầu bồi thường người yêu cầu bồi thường không có quyền yêu cầu cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại giải quyết bồi thường, trừ trường hợp người yêu cầu bồi thường chứng minh việc rút yêu cầu bồi thường do bị lừa dối, ép buộc.</p>'
        + '<p style="' + P + '"><b>Điều 3.</b> Ông/Bà ' + nyc + ' có trách nhiệm trả lại tiền đã được tạm ứng kinh phí bồi thường theo Quyết định tạm ứng kinh phí bồi thường số ' + soTu + ' ngày ' + ngTu + '.</p>'
        + '<p style="' + P + '"><b>Điều 4.</b> Quyết định này có hiệu lực kể từ ngày ký.</p>'
        + '<p style="' + P + '">Ông/Bà ' + nyc + ' và cơ quan, tổ chức, cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này./.</p>'
        + '<table style="width:100%; border-collapse:collapse; margin-top:18pt;"><tr>'
        + '<td style="width:50%; vertical-align:top; font-size:12pt;"><b><i>Nơi nhận:</i></b><br>' + nn + '</td>'
        + '<td style="text-align:center; vertical-align:top;"><b>THỦ TRƯỞNG CƠ QUAN</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i></td></tr></table>';
}
function dcgqFormData() {
    var code = dcgqEl('dcgqReason').value;
    var detail = dcgqEl('dcgqDetail').value.trim();
    return {
        reasonCode: code, reasonText: dcgqReasonText(code), detail: detail, reasonDoc: dcgqReasonForDoc(code, detail),
        docNumber: dcgqEl('dcgqDocNumber').value.trim(), docDate: dcgqEl('dcgqDocDate').value.trim(), noiNhan: dcgqNoiNhanLines(), advance: dcgqAdvance
    };
}
function dcgqBuildDoc() { return dcgqClaim ? { html: dcgqBuildMau25(dcgqClaim, dcgqFormData()), base: dcgqDocBaseName(dcgqClaim) } : null; }

// ---------- Giao diện ----------
function dcgqEnsureModal() {
    if (dcgqEl('modalDcgq')) return;
    var opts = DCGQ_REASONS.map(function (r) { return '<option value="' + r.code + '">' + gqE(r.name) + '</option>'; }).join('');
    var card = function (id, val, title, desc, ico, off, checked) {
        return '<label class="sign-card' + (checked ? ' active' : '') + '" id="' + id + '" for="dcgqSigningMethod' + (off ? 'Offline' : 'Online') + '">'
            + '<input type="radio" name="dcgqSigningMethod" id="dcgqSigningMethod' + (off ? 'Offline' : 'Online') + '" value="' + val + '"' + (checked ? ' checked' : '') + ' onchange="dcgqToggleSigningMethod(\'' + val + '\')">'
            + '<div class="sign-card-content"><div class="sign-card-icon' + (off ? ' offline' : '') + '"><i class="fa-solid ' + ico + '"></i></div><div class="sign-card-text"><div class="sign-card-title">' + title + '</div><div class="sign-card-desc">' + desc + '</div></div></div>'
            + '<div class="sign-card-check"><i class="' + (checked ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle') + '"></i></div></label>';
    };
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modalDcgq" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div id="modalDcgqContainer" class="sticky-modal-container" style="background:#fff; width:850px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3); transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">'
        // Header
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#fee2e2; color:#dc2626; font-size:14px;"><i class="fa-solid fa-circle-stop"></i></span><span>TRÌNH KÝ QUYẾT ĐỊNH ĐÌNH CHỈ GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Hồ sơ: <strong id="dcgqClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người yêu cầu: <span id="dcgqClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="dcgqClaimAgency" style="font-weight:500; color:#475569;">--</span></div>'
        + '</div><button type="button" onclick="closeDcgqModal()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        // Stepper
        + '<div id="dcgqStepperBar" class="ktl-stepper-fullwidth"><div id="dcgqStep1Tab" class="ktl-step-tab active" onclick="dcgqGoStep1()"><span class="ktl-step-badge" id="dcgqStep1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>'
        + '<div class="ktl-stepper-sep"><i class="fa-solid fa-chevron-right"></i></div><div id="dcgqStep2Tab" class="ktl-step-tab" onclick="dcgqGoStep2()"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
        // Bước 1
        + '<div id="dcgqStep1Body" class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div id="dcgqReturnedAlertBlock" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;"><div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> HỒ SƠ BỊ LÃNH ĐẠO TRẢ VỀ YÊU CẦU CHỈNH SỬA</div><div style="font-size:12.5px; color:#92400e; line-height:1.5;">Lý do trả về: <strong id="dcgqReturnedReason">--</strong><br>Người trả về: <span id="dcgqReturnedOfficer">--</span> • Thời điểm: <span id="dcgqReturnedDate">--</span></div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
        + card('dcgqCardSignOnline', 'online', 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', 'fa-file-signature', false, true)
        + card('dcgqCardSignOffline', 'offline', 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', 'fa-stamp', true, false)
        + '</div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-circle-stop"></i> Thông tin đình chỉ giải quyết</div>'
        + '<div class="gqx-field"><label class="form-label" for="dcgqReason">Căn cứ đình chỉ<span class="gqx-req">*</span></label><select id="dcgqReason" class="form-control" onchange="dcgqClearErr(\'dcgqReason\')"><option value="">-- Chọn căn cứ đình chỉ --</option>' + opts + '</select><div id="dcgqReasonErr" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div class="gqx-field"><label class="form-label" for="dcgqDetail">Diễn giải</label><textarea id="dcgqDetail" class="form-control" rows="3" maxlength="500" placeholder="Nhập nội dung diễn giải..." oninput="dcgqUpdateCounter()"></textarea><div id="dcgqDetailCount" class="ktlx-counter">0/500 ký tự</div></div>'
        + '<div class="gqx-field" style="margin-bottom:0;"><label class="form-label">Quyết định tạm ứng kinh phí bồi thường (Điều 3)</label><div id="dcgqAdvanceInfo" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 12px; font-size:13px; color:#334155;"></div></div>'
        // Thu hồi kinh phí bồi thường đã chi: chỉ hiển thị khi vụ việc có khoản kinh phí đã chi
        + gqthHtml('dcgq')
        + '</div>'
        + '<div class="gqx-sec" id="dcgqDocSection"><div class="gqx-sec-title" id="dcgqDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>'
        + '<div id="dcgqDocSrcGroup"><div class="doc-src-segmented"><button type="button" class="doc-src-seg-btn active" id="dcgqSegBtnGen" onclick="dcgqSetDocSrc(\'gen\')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 25/BTNN</span></button><button type="button" class="doc-src-seg-btn" id="dcgqSegBtnUpload" onclick="dcgqSetDocSrc(\'upload\')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button></div></div>'
        + '<div id="dcgqDocMetaGroup" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:12px;"><div style="font-size:12px; font-weight:700; color:#334155; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:10px; display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu 25/BTNN</div>'
        + '<div class="gqx-grid2" style="margin-bottom:10px;"><div class="gqx-field"><label class="form-label" for="dcgqDocNumber">Số, ký hiệu văn bản<span class="gqx-req">*</span></label><input type="text" id="dcgqDocNumber" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="dcgqClearErr(\'dcgqDocNumber\')"><div id="dcgqDocNumberErr" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div class="gqx-field"><label class="form-label" for="dcgqDocDate">Ngày văn bản<span class="gqx-req">*</span></label><div class="gqx-date"><input type="text" id="dcgqDocDate" class="form-control" placeholder="dd/mm/yyyy" readonly onchange="dcgqClearErr(\'dcgqDocDate\')"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById(\'dcgqDocDate\'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i></div><div id="dcgqDocDateErr" class="gqx-err">Đây là trường bắt buộc</div></div></div>'
        + '<div class="gqx-field" style="margin-bottom:0;"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;"><label class="form-label" for="dcgqNoiNhan" style="margin-bottom:0;">Nơi nhận</label><span style="font-size:11.5px; color:#64748b;"><i class="fa-solid fa-circle-info"></i> Mỗi nơi nhận trên 01 dòng</span></div><textarea id="dcgqNoiNhan" class="form-control" rows="5" style="font-size:12.5px; line-height:1.5; resize:vertical;" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng..."></textarea></div></div>'
        + '<div id="dcgqOnlineSection"><input type="file" id="dcgqOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="dcgqOnlineUpload(this)"><div id="dcgqDocFileBox"></div><div id="dcgqDocFileError" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div id="dcgqOfflineSection" style="display:none;"><input type="file" id="dcgqOfflineFileInput" accept=".pdf" style="display:none;" onchange="dcgqOfflineUpload(this)">'
        + '<div id="dcgqOfflineDrop" class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'dcgqOfflineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="dcgqDropOffline(event)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a></div><div class="ktlx-drop-sub">(Chỉ chấp nhận .pdf, tối đa 50MB)</div></div>'
        + '<div id="dcgqOfflineFileRow" style="display:none;"></div><div id="dcgqOfflineFileErr" class="gqx-err">' + DCGQ_OFF_MSG + '</div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang trạng thái <strong>Đình chỉ giải quyết</strong>.</div></div>'
        + '</div>'
        + '<div id="dcgqTlkt"></div>'
        + '</div>'
        // Bước 2
        + '<div id="dcgqStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative;">'
        + '<div style="flex:1; overflow-y:auto; overflow-x:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;"><div id="dcgqA4Page" class="a4-document-page"><div id="dcgqA4Content"></div></div></div>'
        + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; box-shadow:-4px 0 15px rgba(0,0,0,0.05); z-index:20;">'
        + '<div><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div><div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>'
        + '<div id="dcgqSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>'
        + '<div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>'
        + '<div class="form-group" style="margin-bottom:0;"><label class="form-label" for="dcgqSignContent" style="font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block;">Nội dung trình <span style="color:#dc2626;">*</span></label><textarea id="dcgqSignContent" class="form-control" rows="4" style="font-size:13px;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="this.classList.remove(\'is-invalid\'); var e=document.getElementById(\'dcgqSignContentErr\'); if(e) e.style.display=\'none\';"></textarea><div id="dcgqSignContentErr" class="error-message" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</div></div>'
        + '</div></div>'
        // Footer
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;"><div style="display:flex; gap:10px; margin-left:auto;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeDcgqModal()">Hủy bỏ</button>'
        + '<button id="dcgqBtnSubmitOffline" type="button" class="btn btn-primary" onclick="dcgqSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
        + '<button id="dcgqBtnNextStep" type="button" class="btn btn-primary" onclick="dcgqGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>'
        + '<button id="dcgqBtnBackStep1" type="button" class="btn btn-secondary" onclick="dcgqGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
        + '<button id="dcgqBtnSubmitOnline" type="button" class="btn btn-primary" onclick="dcgqSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; box-shadow:0 2px 6px rgba(22,163,74,0.3); font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>'
        + '</div></div></div></div>';
    document.body.appendChild(wrap.firstChild);
}
function dcgqUpdateCounter() { var t = dcgqEl('dcgqDetail'), c = dcgqEl('dcgqDetailCount'); if (t && c) c.textContent = (t.value || '').length + '/500 ký tự'; }
function dcgqRenderAdvance() {
    var box = dcgqEl('dcgqAdvanceInfo'); if (!box) return;
    var a = dcgqAdvance;
    box.innerHTML = a
        ? 'Quyết định tạm ứng số <b>' + gqE(a.docNo) + '</b>' + (a.docDate ? ' ngày <b>' + gqE(a.docDate) + '</b>' : '') + ' <span style="color:#64748b;">(tự động lấy theo vụ việc; điền vào Điều 3)</span>'
        : '<span style="color:#64748b; font-style:italic;">Vụ việc chưa có Quyết định tạm ứng kinh phí bồi thường: Số, ngày tại Điều 3 để dấu chấm.</span>';
}

// ---------- Mở / đóng ----------
// Mở từ thao tác "Đình chỉ giải quyết" (Thao tác khác) hoặc "Cập nhật" hồ sơ Bị trả lại có Loại trình "Đình chỉ giải quyết"
// Trạng thái Giải quyết YCBT được Đình chỉ giải quyết: ngoài các trạng thái này chặn mở popup (trừ Cập nhật hồ sơ Bị trả lại Loại trình Đình chỉ)
var DCGQ_SOURCE = ['Cử người giải quyết bồi thường', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ', 'Chờ chi trả', 'Hoàn thành'];
function openDcgqModal(claimId) {
    var claim = gqClaim(claimId);
    if (!claim) return;
    var rec0 = gqRecord(claim);
    var st0 = typeof gqldCaseStatus === 'function' ? gqldCaseStatus(claim) : claim.status;
    var isRet = !!(rec0 && rec0.status === 'Bị trả lại' && rec0.approval && rec0.approval.kind === DCGQ_KIND);
    if (!isRet && DCGQ_SOURCE.indexOf(st0) < 0) { showToast('Trạng thái hồ sơ hiện tại không cho phép Đình chỉ giải quyết.', 'error'); return; }
    dcgqEnsureModal();
    gqFrameFull(true);
    dcgqClaim = claim;
    dcgqOnlineFile = null;
    dcgqOfflineFile = null;
    var W = gqW();
    var rec = gqRecord(claim);
    var prev = rec && rec.status === 'Bị trả lại' && rec.approval && rec.approval.kind === DCGQ_KIND ? rec.approval : null;
    var sd = (prev && prev.signDoc) || {};
    var ret = prev ? (rec.returned || {}) : null;
    dcgqEl('dcgqReturnedAlertBlock').style.display = prev ? 'block' : 'none';
    if (prev) {
        dcgqEl('dcgqReturnedReason').innerText = ret.reason || '--';
        dcgqEl('dcgqReturnedOfficer').innerText = (ret.by && W ? W.userName(ret.by) : '') || '--';
        dcgqEl('dcgqReturnedDate').innerText = ret.at || '--';
    }
    dcgqEl('dcgqClaimCode').innerText = (typeof claimVvCode === 'function' && claimVvCode(claim)) || claim.code || '--';
    dcgqEl('dcgqClaimNYC').innerText = getClaimRequesterName(claim) || '--';
    dcgqEl('dcgqClaimAgency').innerText = claim.agency || '--';
    // Thông tin đình chỉ: lần trình trước (Bị trả lại) hoặc trống
    dcgqEl('dcgqReason').value = sd.reasonCode || '';
    dcgqEl('dcgqDetail').value = sd.detail || '';
    dcgqUpdateCounter();
    dcgqAdvance = dcgqFindAdvance(claim);
    dcgqRenderAdvance();
    dcgqRenderThuHoi(claim, prev ? sd : null);
    // Thông tin điền vào Mẫu 25/BTNN (mặc định), Nội dung trình, các cấp ký
    var d = new Date(); var p2 = function (n) { return String(n).padStart(2, '0'); };
    dcgqEl('dcgqDocNumber').value = '     /QĐ-';
    dcgqEl('dcgqDocDate').value = p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear();
    dcgqEl('dcgqNoiNhan').value = dcgqNoiNhanDefault(claim);
    ['dcgqReason', 'dcgqDocNumber', 'dcgqDocDate'].forEach(dcgqClearErr);
    if (typeof flatpickr !== 'undefined') flatpickr(dcgqEl('dcgqDocDate'), { dateFormat: 'd/m/Y', allowInput: true, defaultDate: dcgqEl('dcgqDocDate').value, onChange: function () { dcgqClearErr('dcgqDocDate'); } });
    dcgqEl('dcgqSignContent').value = DCGQ_CONTENT_DEFAULT;
    gqSignInit('dcgq', claim, prev && Array.isArray(prev.assignees) ? prev.assignees : null);
    dcgqOfflineRemove();
    dcgqSetDocSrc('gen');
    // Trình lại: nguồn tệp, tệp tải lên, Số/Ngày văn bản, Nơi nhận, ô ký, Nội dung trình, Tài liệu đính kèm của lần trình trước
    tlktGqRestore('dcgq', prev, {
        required: false,
        setSrc: function (src) { dcgqSetDocSrc(src); },
        setFile: function (f) { dcgqOnlineFile = f; dcgqRenderDocBox(); },
        fields: [['dcgqDocNumber', 'docNumber'], ['dcgqDocDate', 'docDate']]
    });
    if (prev && Array.isArray(sd.noiNhan) && sd.noiNhan.length) dcgqEl('dcgqNoiNhan').value = sd.noiNhan.join('\n');
    dcgqEl('dcgqSigningMethodOnline').checked = true;
    dcgqToggleSigningMethod('online');
    dcgqGoStep1();
    var modal = dcgqEl('modalDcgq');
    modal.style.display = 'flex'; modal.classList.add('active'); modal.classList.add('visible');
}
function closeDcgqModal() {
    gqFrameFull(false);
    ktlxCancelConvert('dcgq');
    var modal = dcgqEl('modalDcgq');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('active'); modal.classList.remove('visible'); }
    dcgqClaim = null;
}
function dcgqSetDocSrc(src) {
    dcgqDocSrc = src === 'upload' ? 'upload' : 'gen';
    var isGen = dcgqDocSrc === 'gen';
    dcgqEl('dcgqSegBtnGen').classList.toggle('active', isGen);
    dcgqEl('dcgqSegBtnUpload').classList.toggle('active', !isGen);
    dcgqOnlineFile = null;
    ktlxCancelConvert('dcgq');
    var fe = dcgqEl('dcgqDocFileError'); fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    dcgqApplyDocMeta();
    dcgqRenderDocBox();
}
function dcgqApplyDocMeta() { dcgqEl('dcgqDocMetaGroup').style.display = (!dcgqIsOffline() && dcgqDocSrc === 'gen') ? '' : 'none'; }
function dcgqToggleSigningMethod(method) {
    var isOnline = method === 'online';
    [['dcgqCardSignOnline', isOnline], ['dcgqCardSignOffline', !isOnline]].forEach(function (x) {
        var c = dcgqEl(x[0]); c.classList.toggle('active', x[1]);
        var ico = c.querySelector('.sign-card-check i'); if (ico) ico.className = x[1] ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    dcgqApplyDocMeta();
    if (!isOnline) ['dcgqDocNumber', 'dcgqDocDate'].forEach(dcgqClearErr);
    var bar = dcgqEl('dcgqStepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !isOnline); bar.setAttribute('aria-hidden', isOnline ? 'false' : 'true');
    var show = function (id, on, disp) { var el = dcgqEl(id); if (el) el.style.display = on ? (disp || 'block') : 'none'; };
    show('dcgqDocSrcGroup', isOnline);
    show('dcgqOnlineSection', isOnline);
    show('dcgqOfflineSection', !isOnline);
    show('dcgqBtnSubmitOffline', !isOnline, 'inline-flex');
    show('dcgqBtnNextStep', isOnline, 'inline-flex');
    if (typeof tlktShow === 'function') tlktShow('dcgq', isOnline);
    dcgqEl('dcgqDocSectionTitle').innerHTML = isOnline ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
}
function dcgqRenderDocBox() {
    var box = dcgqEl('dcgqDocFileBox'); if (!box) return;
    if (dcgqDocSrc === 'gen') {
        box.innerHTML = '<div class="gqx-file-empty"><div class="gqx-file-hint"><i class="fa-solid fa-file-circle-check" style="color:#2563eb; font-size:16px; margin-right:6px;"></i>Hệ thống tự động sinh Quyết định theo Mẫu 25/BTNN từ thông tin đang nhập.</div><div class="gqx-file-actions"><button type="button" class="btn-preview-doc" onclick="dcgqPreview()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div></div>';
        return;
    }
    if (ktlxConverting.dcgq) { box.innerHTML = '<div class="ktlx-converting"><span class="ktlx-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    var f = dcgqOnlineFile;
    box.innerHTML = !f
        ? '<div class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'dcgqOnlineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="dcgqDropOnline(event)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a></div><div class="ktlx-drop-sub">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)</div></div>'
        : ktlxFileCardHtml(f.name, f.size, f.note, 'dcgqOnlineView()', 'dcgqOnlineRemove()');
}
function dcgqDropOnline(e) { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); var fs = e.dataTransfer && e.dataTransfer.files; if (fs && fs.length) dcgqOnlineUpload({ files: [fs[0]], value: '' }); }
function dcgqDropOffline(e) { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); var fs = e.dataTransfer && e.dataTransfer.files; if (fs && fs.length) dcgqOfflineUpload({ files: [fs[0]], value: '' }); }
// Kiểm tra trường bắt buộc Bước 1 (Ký số); trả về ô lỗi đầu tiên
function dcgqValidateStep1() {
    var first = null;
    if (!dcgqEl('dcgqReason').value) first = dcgqSetErr('dcgqReason'); else dcgqClearErr('dcgqReason');
    var thErr = dcgqValidateThuHoi(); first = first || thErr;
    if (dcgqDocSrc === 'gen') {
        var no = dcgqEl('dcgqDocNumber').value.trim(), dt = dcgqEl('dcgqDocDate').value.trim();
        if (!no) first = first || dcgqSetErr('dcgqDocNumber'); else dcgqClearErr('dcgqDocNumber');
        if (!dt) first = first || dcgqSetErr('dcgqDocDate', 'Đây là trường bắt buộc');
        else if (typeof gqValidDateText === 'function' && !gqValidDateText(dt)) first = first || dcgqSetErr('dcgqDocDate', 'Ngày văn bản không hợp lệ (dd/mm/yyyy)');
        else dcgqClearErr('dcgqDocDate');
    }
    return first;
}
function dcgqPreview() {
    var bad = dcgqValidateStep1();
    if (bad) { bad.focus(); return; }
    var doc = dcgqBuildDoc();
    if (doc) gqW().openDocTab(doc.html, doc.base);
}
function dcgqOnlineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var fe = dcgqEl('dcgqDocFileError');
    var msg = ktlxCheckFile(file, ['.pdf', '.doc', '.docx']);
    if (msg) { fe.textContent = msg; fe.style.display = 'block'; showToast(msg, 'error'); return; }
    fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    var size = ktlxFmtSize(file.size);
    if (/\.docx?$/i.test(file.name)) {
        dcgqOnlineFile = null; ktlxConverting.dcgq = true; ktlxSetNextBusy('dcgq', true); dcgqRenderDocBox();
        var token = (ktlxConverting.dcgqToken = (ktlxConverting.dcgqToken || 0) + 1);
        setTimeout(function () {
            if (ktlxConverting.dcgqToken !== token || !ktlxConverting.dcgq) return;
            ktlxConverting.dcgq = false; ktlxSetNextBusy('dcgq', false);
            dcgqOnlineFile = { name: file.name.replace(/\.docx?$/i, '.pdf'), size: size, source: 'uploaded', raw: file, note: 'Đã chuyển đổi từ ' + file.name };
            dcgqRenderDocBox();
        }, 1200);
        return;
    }
    dcgqOnlineFile = { name: file.name, size: size, source: 'uploaded', raw: file };
    dcgqRenderDocBox();
}
function dcgqOnlineView() { var f = dcgqOnlineFile; if (!f) return; if (f.source === 'generated') gqW().openDocTab(f.bodyHtml, f.base); else gqOpenUploadedFile(f); }
function dcgqOnlineRemove() { dcgqOnlineFile = null; ktlxCancelConvert('dcgq'); dcgqRenderDocBox(); }
function dcgqOfflineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var err = dcgqEl('dcgqOfflineFileErr'), drop = dcgqEl('dcgqOfflineDrop');
    var msg = ktlxCheckFile(file, ['.pdf']);
    if (msg) { err.textContent = msg; err.style.display = 'block'; drop.classList.add('is-error'); showToast(msg, 'error'); return; }
    dcgqOfflineFile = { name: file.name, size: ktlxFmtSize(file.size), raw: file };
    var row = dcgqEl('dcgqOfflineFileRow');
    row.innerHTML = ktlxFileCardHtml(dcgqOfflineFile.name, dcgqOfflineFile.size, '', 'gqOpenUploadedFile(dcgqOfflineFile)', 'dcgqOfflineRemove()');
    row.style.display = 'block';
    drop.style.display = 'none'; drop.classList.remove('is-error');
    err.textContent = DCGQ_OFF_MSG; err.style.display = 'none';
}
function dcgqOfflineRemove() {
    dcgqOfflineFile = null;
    var row = dcgqEl('dcgqOfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    var drop = dcgqEl('dcgqOfflineDrop'); if (drop) { drop.style.display = ''; drop.classList.remove('is-error'); }
    var err = dcgqEl('dcgqOfflineFileErr'); if (err) { err.textContent = DCGQ_OFF_MSG; err.style.display = 'none'; }
}

// ---------- Bước ----------
function dcgqGoStep1() {
    var c = dcgqEl('modalDcgqContainer'); c.style.width = '850px'; c.style.maxWidth = '96%'; c.style.height = 'auto';
    dcgqEl('dcgqStep1Tab').className = 'ktl-step-tab active';
    dcgqEl('dcgqStep1Badge').innerHTML = '1';
    dcgqEl('dcgqStep2Tab').className = 'ktl-step-tab';
    dcgqEl('dcgqStep1Body').style.display = 'block';
    dcgqEl('dcgqStep2Body').style.display = 'none';
    var off = dcgqIsOffline();
    dcgqEl('dcgqBtnNextStep').style.display = off ? 'none' : 'inline-flex';
    dcgqEl('dcgqBtnSubmitOffline').style.display = off ? 'inline-flex' : 'none';
    dcgqEl('dcgqBtnBackStep1').style.display = 'none';
    dcgqEl('dcgqBtnSubmitOnline').style.display = 'none';
}
// Tiếp tục: kiểm tra Bước 1 (Căn cứ đình chỉ, Số/Ngày văn bản hoặc tệp tải lên, dòng Tài liệu đính kèm) -> Bước 2
function dcgqGoStep2() {
    if (!dcgqClaim || dcgqIsOffline()) return;
    if (ktlxConverting.dcgq) { showToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    var first = dcgqValidateStep1();
    if (dcgqDocSrc !== 'gen' && !dcgqOnlineFile) { dcgqEl('dcgqDocFileError').style.display = 'block'; first = first || dcgqEl('dcgqDocFileBox'); }
    var okT = typeof tlktValidate !== 'function' || tlktValidate('dcgq');
    if (first || !okT) {
        if (first && first.focus) first.focus();
        showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'warning');
        return;
    }
    var content = dcgqEl('dcgqA4Content');
    if (dcgqDocSrc === 'gen') {
        var doc = dcgqBuildDoc();
        dcgqOnlineFile = { name: doc.base + '.doc', size: Math.max(1, Math.round(doc.html.length / 1024)) + ' KB', source: 'generated', base: doc.base, bodyHtml: doc.html };
        content.innerHTML = doc.html;
    } else {
        content.innerHTML = '<div style="text-align:center; padding-top:320px; color:#475569;"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#94a3b8;"></i><div style="margin-top:12px; font-weight:700;">' + gqE(dcgqOnlineFile.name) + '</div><div style="font-size:12.5px;">Văn bản tải lên từ máy - Mẫu 25/BTNN - Quyết định đình chỉ giải quyết yêu cầu bồi thường</div></div>';
    }
    var c = dcgqEl('modalDcgqContainer'); c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh';
    dcgqEl('dcgqStep1Tab').className = 'ktl-step-tab completed';
    dcgqEl('dcgqStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    dcgqEl('dcgqStep2Tab').className = 'ktl-step-tab active';
    dcgqEl('dcgqStep1Body').style.display = 'none';
    dcgqEl('dcgqStep2Body').style.display = 'flex';
    dcgqEl('dcgqBtnNextStep').style.display = 'none';
    dcgqEl('dcgqBtnSubmitOffline').style.display = 'none';
    dcgqEl('dcgqBtnBackStep1').style.display = 'inline-flex';
    dcgqEl('dcgqBtnSubmitOnline').style.display = 'inline-flex';
    gqSignRefresh('dcgq');
}

// ---------- Trình / Ban hành ----------
// Trạng thái trước khi đình chỉ: trạng thái vụ việc lúc trình/ban hành (Cử người giải quyết bồi thường, Xác minh thiệt hại,
// Thương lượng, Chờ ban hành QĐ, Chờ chi trả, Hoàn thành; dữ liệu cũ: Yêu cầu bổ sung, Hoãn giải quyết); trình lại sau "Bị trả lại": giữ trạng thái trước của lần trình đầu
var DCGQ_STEP_SOURCE = ['Yêu cầu bổ sung', 'Cử người giải quyết bồi thường', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ', 'Chờ chi trả', 'Hoàn thành'];
function dcgqPrevStatus(claim) {
    var st = typeof gqldCaseStatus === 'function' ? gqldCaseStatus(claim) : claim.status;
    if (DCGQ_STEP_SOURCE.indexOf(st) >= 0 || st === 'Hoãn giải quyết') return st;
    return (claim.dinhChi && claim.dinhChi.previousStatus) || claim.hgqPrevStatus || '';
}
// Patch lưu kèm: previousStatus (dinhChi) + hgqPrevStatus (bước tiến trình, dùng chung Hoãn/Tạm đình chỉ; nguồn Hoãn giải quyết giữ bước trước khi hoãn)
function dcgqPrevPatch(claim, prevSt, patch) {
    patch.dinhChi.previousStatus = prevSt;
    if (DCGQ_STEP_SOURCE.indexOf(prevSt) >= 0) patch.hgqPrevStatus = prevSt;
    return patch;
}
// Ký số: trình Lãnh đạo Loại trình "Đình chỉ giải quyết" -> hồ sơ "Chờ duyệt"; cấp cuối ký duyệt -> "Đình chỉ giải quyết"
function dcgqSubmitOnline() {
    var claim = dcgqClaim;
    if (!claim || !dcgqOnlineFile) return;
    var sign = gqSignCollect('dcgq');
    if (!sign) return;
    var x = dcgqFormData();
    var prevSt = dcgqPrevStatus(claim);
    var gen = dcgqOnlineFile.source === 'generated';
    var fileName = dcgqOnlineFile.name;
    var reasonFull = x.reasonText + (x.detail ? ': ' + x.detail : '');
    var th = dcgqThuHoiData();
    var draftDoc = { source: gen ? 'generated' : 'uploaded', formNo: DCGQ_FORM, docTitle: 'Quyết định đình chỉ giải quyết yêu cầu bồi thường', generatedName: gen ? fileName : '', uploadedName: gen ? '' : fileName, bodyHtml: gen ? dcgqOnlineFile.bodyHtml : '' };
    var signDoc = Object.assign({
        method: 'Ký số', file: gen ? dcgqDocBaseName(claim) + '.pdf' : fileName, enableRoomSig: sign.enableNhay, sigCoords: sign.coords,
        reasonCode: x.reasonCode, reasonText: x.reasonText, detail: x.detail,
        docNumber: gen ? x.docNumber : '', docDate: gen ? x.docDate : '', noiNhan: gen ? x.noiNhan : [], advance: x.advance,
        thuHoi: th.thuHoi, thuHoiReason: th.thuHoiReason
    }, tlktGqExtra('dcgq', dcgqOnlineFile, dcgqDocSrc, sign.content));
    var res = gqSubmit(claim, DCGQ_KIND, sign.content, [], { assignee: sign.assignees[0] || '', assignees: sign.assignees, reason: reasonFull, resultStatus: DCGQ_RESULT, draftDoc: draftDoc, signDoc: signDoc });
    if (!res || res.ok === false) { showToast(res ? res.message : 'Không trình được hồ sơ.', 'error'); return; }
    dcgqTagHistory(claim, res.record, th);
    gqSaveData(claim, dcgqPrevPatch(claim, prevSt, { dinhChi: { reasonCode: x.reasonCode, reasonText: x.reasonText, detail: x.detail, docNumber: signDoc.docNumber, docDate: signDoc.docDate, noiNhan: signDoc.noiNhan, advance: x.advance, thuHoi: th.thuHoi, thuHoiReason: th.thuHoiReason, fileName: fileName, formNo: DCGQ_FORM, signingMethod: 'Ký số', submittedAt: gqNow() } }));
    closeDcgqModal();
    gqAfterSubmit(claim, DCGQ_KIND);
}
// Lịch sử xử lý / tiến trình: ghi kèm lựa chọn Thu hồi kinh phí bồi thường đã chi vào mục "Trình phê duyệt" vừa tạo (trước phần Nội dung trình)
function dcgqTagHistory(claim, rec, th) {
    var t = dcgqThuHoiText(th);
    if (!t) return;
    try {
        var h = rec && Array.isArray(rec.history) ? rec.history[rec.history.length - 1] : null;
        if (h && /^Trình/.test(h.action || '')) {
            var n = String(h.note || ''), i = n.indexOf(' Nội dung: ');
            h.note = i >= 0 ? n.slice(0, i) + ' ' + t + n.slice(i) : n + ' ' + t;
            var W = gqW(); if (W) W.upsertRecord(rec);
        }
    } catch (e) { /* mockup */ }
    var tl = Array.isArray(claim.timeline) ? claim.timeline[claim.timeline.length - 1] : null;
    if (tl && /^Trình Lãnh đạo/.test(tl.title || '')) tl.desc = String(tl.desc || '') + ' ' + t;
}
// Ký ngoài: kiểm tra Căn cứ đình chỉ + tệp PDF đã ký -> popup xác nhận -> ban hành trực tiếp
function dcgqSubmitOffline() {
    var claim = dcgqClaim;
    if (!claim) return;
    var first = null;
    if (!dcgqEl('dcgqReason').value) first = dcgqSetErr('dcgqReason');
    var thErr = dcgqValidateThuHoi(); first = first || thErr;
    if (!dcgqOfflineFile) {
        var fErr = dcgqEl('dcgqOfflineFileErr'); fErr.textContent = DCGQ_OFF_MSG; fErr.style.display = 'block';
        var drop = dcgqEl('dcgqOfflineDrop'); drop.classList.add('is-error'); first = first || drop;
    }
    if (first) { if (first.focus) first.focus(); return; }
    var overlay = dcgqEl('customConfirmOverlay'), btnYes = dcgqEl('customConfirmBtnYes'), btnNo = dcgqEl('customConfirmBtnNo');
    var prevZ = overlay ? overlay.style.zIndex : '';
    var restore = function () { if (overlay) overlay.style.zIndex = prevZ; if (btnYes) btnYes.style.backgroundColor = ''; };
    showConfirmModal('Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Hồ sơ sẽ chuyển sang trạng thái "' + DCGQ_RESULT + '". Bạn có chắc chắn muốn ban hành văn bản?',
        function () { restore(); dcgqIssueOffline(); },
        { title: 'Xác nhận ban hành văn bản', btnYesText: 'Ban hành', btnYesClass: 'btn-success', btnNoText: 'Hủy bỏ' });
    if (overlay) overlay.style.zIndex = '10050';
    if (btnYes) btnYes.style.backgroundColor = '#16a34a';
    if (btnNo) btnNo.addEventListener('click', restore, { once: true });
}
function dcgqIssueOffline() {
    var claim = dcgqClaim;
    if (!claim || !dcgqOfflineFile) return;
    var W = gqW();
    var x = dcgqFormData();
    var file = dcgqOfflineFile.name;
    var reasonFull = x.reasonText + (x.detail ? ': ' + x.detail : '');
    var th = dcgqThuHoiData();
    var thText = dcgqThuHoiText(th);
    var prevSt = dcgqPrevStatus(claim);
    claim.status = DCGQ_RESULT;
    claim.wfReturned = null;
    if (!Array.isArray(claim.timeline)) claim.timeline = [];
    claim.timeline.push({ title: 'Ban hành Quyết định đình chỉ giải quyết (Ký ngoài)', date: gqToday(), desc: 'Ban hành văn bản Mẫu 25/BTNN - Quyết định đình chỉ giải quyết yêu cầu bồi thường đã ký ngoài hệ thống (' + file + '). Căn cứ: ' + reasonFull + '.' + (thText ? ' ' + thText : '') + ' Hồ sơ chuyển sang trạng thái [' + DCGQ_RESULT + '].', status: 'completed' });
    try {
        var rec = gqEnsureRecord(claim) || gqRecord(claim);
        if (rec && W) { rec.status = DCGQ_RESULT; W.addHistory(rec, 'Ban hành Quyết định đình chỉ giải quyết (Ký ngoài)', 'Căn cứ: ' + reasonFull + '. Văn bản đã ký: ' + file + '.' + (thText ? ' ' + thText : '')); W.upsertRecord(rec); }
    } catch (e) { /* mockup: bỏ qua lỗi luồng */ }
    gqSaveData(claim, dcgqPrevPatch(claim, prevSt, { status: DCGQ_RESULT, dinhChi: { reasonCode: x.reasonCode, reasonText: x.reasonText, detail: x.detail, advance: x.advance, thuHoi: th.thuHoi, thuHoiReason: th.thuHoiReason, fileName: file, signedFile: file, formNo: DCGQ_FORM, signingMethod: 'Ký ngoài', issuedAt: gqNow(), attachments: typeof tlktGet === 'function' ? tlktGet('dcgq') : [] } }));
    closeDcgqModal();
    saveClaimsToLocal();
    renderClaimsTable();
    showToast('Đã ban hành Quyết định đình chỉ giải quyết (Ký ngoài) cho vụ việc ' + claimVvLabel(claim) + '. Hồ sơ chuyển sang trạng thái [' + DCGQ_RESULT + '].', 'success');
}
