/*
 * [ptn] Tiếp nhận hồ sơ - Trình ký Phiếu tiếp nhận (Mẫu 02/BTNN - Giấy tiếp nhận yêu cầu bồi thường)
 * Thay thao tác "In Phiếu tiếp nhận" cũ. Nạp tại tiep_nhan_ycbt.html (cán bộ trình ký, màn chi tiết) và
 * viec_cho_lanh_dao_xu_ly.html (Lãnh đạo Ký duyệt / Từ chối).
 * - Điều kiện: hồ sơ Nguồn Tiếp nhận mới, Hình thức tiếp nhận Trực tiếp / Qua dịch vụ bưu chính; người thao tác là Cán bộ tiếp nhận hồ sơ;
 *   Phiếu tiếp nhận chưa trình hoặc Bị trả lại.
 * - Popup Trình ký Phiếu tiếp nhận (bố cục như Trình ký QĐ tạm ứng - Mẫu 07): Hình thức ký Ký số trên hệ thống (02 bước, trình Lãnh đạo
 *   các cấp theo luồng) / Ký ngoài (Ban hành văn bản ngay); Nguồn tệp Sinh văn bản theo mẫu 02/BTNN / Tải lên từ máy;
 *   Tài liệu đính kèm 02 khối (tlktMount).
 * - Trạng thái Phiếu tiếp nhận: Chờ duyệt / Bị trả lại / Đã ban hành. Không thay đổi trạng thái, luồng phân công của hồ sơ.
 * - Lưu localStorage "btnnPhieuTiepNhan_v1" theo Mã hồ sơ; lịch sử ghi trong phiếu, hiển thị gộp vào Lịch sử xử lý của màn chi tiết.
 * - Lãnh đạo: bổ sung công việc Loại trình "Phiếu tiếp nhận" vào BTNN_WF.getLeaderWork (source 'ptn').
 * - Dữ liệu mẫu: merge theo Mã hồ sơ, PTN_SEED_VER.
 * [tnd] Chốt 28/10 - Duyệt tiếp nhận (phiếu có flow 'tn'):
 * - Hồ sơ Nguồn Tiếp nhận mới + Hình thức Trực tiếp / Qua dịch vụ bưu chính: Lưu hồ sơ -> hệ thống sinh Phiếu tiếp nhận (Dự thảo, Mẫu 02/BTNN)
 *   từ khối "Thông tin Phiếu tiếp nhận" của form, tự trình Lãnh đạo các cấp theo luồng đã cấu hình (Ký số) -> hồ sơ "Chờ duyệt tiếp nhận".
 * - Cấp trung gian Ký duyệt -> cấp tiếp theo; cấp cuối Ký duyệt -> ký số, ban hành Phiếu tiếp nhận -> tạo hồ sơ luồng "Chờ phân công"
 *   tại đơn vị gốc (Lãnh đạo đơn vị phân công theo luồng). Từ chối (bắt buộc lý do) -> hồ sơ "Bị trả lại"; Cán bộ tiếp nhận Sửa, Lưu = Trình lại.
 * - Hồ sơ đang duyệt tiếp nhận chưa có hồ sơ luồng (phân hệ khác không thấy); trạng thái hồ sơ lấy theo phiếu (reconcile).
 * - Popup Trình ký Phiếu tiếp nhận (Ký số / Ký ngoài) không còn dùng cho hồ sơ mới (giữ mã nguồn, dữ liệu cũ vẫn xem được).
 * [ptnxd] Chốt 29/10 - Loại hồ sơ Xác định cơ quan giải quyết bồi thường: không sinh Phiếu tiếp nhận theo Mẫu 02/BTNN, không hiển thị khối
 *   Thông tin Phiếu tiếp nhận; Lưu hồ sơ mở Popup Trình ký như Xác định CQGQBT (Ký số: đính tệp, trình Lãnh đạo theo luồng -> Chờ duyệt tiếp nhận;
 *   Ký ngoài: tải lên PDF đã ký & đóng dấu, ban hành -> Chờ phân công); hồ sơ chỉ lưu khi Trình Lãnh đạo / Ban hành văn bản thành công.
 *   Loại hồ sơ Giải quyết yêu cầu bồi thường giữ nguyên (sinh Mẫu 02/BTNN, tự trình khi Lưu).
 * [ptnmh02] Chốt 29/10 - Bỏ khối "Thông tin Phiếu tiếp nhận (Mẫu 02/BTNN)" tại form MH02; bỏ tự trình khi Lưu. Hồ sơ thuộc diện Phiếu tiếp nhận
 *   (cả hai Loại hồ sơ): nút "Lưu và trình ký" mở Popup Trình ký (Giải quyết YCBT: popup Mẫu 02/BTNN; Xác định CQGQBT: popup như Không thụ lý);
 *   hồ sơ chỉ lưu khi Trình Lãnh đạo (Chờ duyệt tiếp nhận) / Ban hành văn bản (Chờ phân công) thành công; Hủy bỏ không lưu, giữ dữ liệu form.
 */
(function (global) {
'use strict';
const W = global.BTNN_WF;
if (!W) return;
const PTN_CSS = `
.ptn-modal { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); display: none; align-items: center; justify-content: center; z-index: 5500; }
.ptn-modal.open { display: flex; }
.ptn-modal-box { background: #fff; border-radius: 8px; width: 760px; min-width: 650px; max-width: 850px; display: flex; flex-direction: column; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); overflow: hidden; }
.ptn-modal-head { position: sticky; top: 0; padding: 16px 24px; border-bottom: 1px solid var(--border-color); background: #FAFBFD; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 15px; color: var(--primary-light); }
.ptn-modal-head .qd-close { cursor: pointer; font-size: 20px; color: #64748b; background: none; border: 0; }
.ptn-modal-body { padding: 24px; max-height: 80vh; overflow-y: auto; }
.ptn-modal-foot { position: sticky; bottom: 0; padding: 14px 24px; border-top: 1px solid var(--border-color); background: #FAFBFD; display: flex; justify-content: flex-end; gap: 8px; }
@media (max-width: 700px) { .ptn-modal-box { min-width: 0; width: 96vw; } }
.ptn-qs-box { width: 850px; min-width: 0; max-width: 96vw; max-height: 94vh; border-radius: 10px; box-shadow: 0 20px 45px rgba(0,0,0,0.3); }
.ptn-qs-box.ptn-qs-wide { width: 100vw; max-width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; }
.ptn-qs-head { background: #f8fafc; border-bottom: 1px solid var(--border-color); padding: 18px 24px; display: flex; justify-content: space-between; align-items: flex-start; flex-shrink: 0; }
.ptn-qs-head-title { font-size: 16.5px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.ptn-qs-head-ico { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: #dbeafe; color: #1d4ed8; font-size: 14px; }
.ptn-qs-sub { font-size: 12.5px; color: #64748b; margin-top: 4px; padding-left: 38px; }
.ptn-qs-sub .ptn-qs-dot { margin: 0 6px; }
.ptn-qs-head-close { border: none; background: transparent; font-size: 22px; color: #94a3b8; cursor: pointer; line-height: 1; padding: 4px; }
.ptn-qs-body { overflow-y: auto; flex: 1; }
.ptn-qs-field { margin-bottom: 12px; }
.ptn-qs-field .form-label { font-weight: 600; font-size: 13px; color: #334155; margin-bottom: 6px; display: block; }
.ptn-qs-field .form-control { font-family: inherit; font-size: 13px; width: 100%; box-sizing: border-box; }
.ptn-qs-field textarea.form-control { line-height: 1.55; resize: vertical; }
.ptn-qs-err { display: none; color: #dc2626; font-size: 12px; margin-top: 4px; }
.ptn-qs-meta { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; }
.ptn-qs-meta-title { font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.ptn-qs-meta-title > i { color: #2563eb; }
.ptn-qs-meta .ptn-gqx-grid2 { margin-bottom: 14px; }
.ptn-qs-label-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 6px; }
.ptn-qs-label-row .form-label { margin-bottom: 0 !important; }
.ptn-qs-label-row > span { font-size: 11.5px; color: #64748b; }
.ptn-qs-foot-btns { display: flex; gap: 10px; margin-left: auto; }
.ptn-gqx-body { padding: 24px; background: #f8fafc; }
.ptn-gqx-sec { background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:16px 18px; margin-bottom:14px; }
.ptn-gqx-sec:last-child { margin-bottom:0; }
.ptn-gqx-sec-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; letter-spacing:.2px; margin:0 0 14px; padding-bottom:10px; border-bottom:1px solid #f1f5f9; }
.ptn-gqx-sec-title > i { color:#2563eb; width:16px; text-align:center; }
.ptn-gqx-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:0 16px; }
.ptn-gqx-field { margin-bottom:14px; }
.ptn-gqx-field:last-child, .ptn-gqx-grid2 .ptn-gqx-field { margin-bottom:0; }
.ptn-gqx-body .form-label { font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block; }
.ptn-gqx-req { color:#dc2626; margin-left:3px; }
.ptn-gqx-sec-title .ptn-gqx-req, .ptn-gqx-docfile-head .ptn-gqx-req { margin-left:-5px; }
.ptn-gqx-body .form-control { font-family:inherit; font-size:13px; height:38px; width:100%; box-sizing:border-box; }
.ptn-gqx-body textarea.form-control { height:auto; line-height:1.55; resize:vertical; }
.ptn-gqx-body select.form-control { padding:0 10px; cursor:pointer; }
.ptn-gqx-date { position:relative; }
.ptn-gqx-date .form-control { padding-right:36px; cursor:pointer; background:#fff; }
.ptn-gqx-date > i { position:absolute; right:12px; top:50%; transform:translateY(-50%); color:#2563eb; cursor:pointer; font-size:15px; }
.ptn-gqx-hint { font-size:12px; color:#64748b; margin-top:5px; }
.ptn-gqx-err { display:none; color:#dc2626; font-size:12px; margin-top:4px; }
.ptn-sign-cards-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:10px; align-items:stretch; }
.ptn-sign-card { position:relative; display:flex; align-items:center; justify-content:space-between; padding:10px 12px; min-height:58px; height:100%; box-sizing:border-box; border:1.5px solid #cbd5e1; border-radius:8px; background:#ffffff; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:0 1px 2px rgba(0,0,0,0.03); margin:0; }
.ptn-sign-card:hover { border-color:#93c5fd; background:#f8fafc; }
.ptn-sign-card.active { border-color:#2563eb; background:#eff6ff; box-shadow:0 2px 6px rgba(37,99,235,0.1); }
.ptn-sign-card input[type="radio"] { position:absolute; opacity:0; pointer-events:none; }
.ptn-sign-card-content { display:flex; align-items:center; gap:8px; flex:1; min-width:0; }
.ptn-sign-card-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; background:#dbeafe; color:#1d4ed8; transition:all 0.2s; }
.ptn-sign-card-icon.offline { background:#fef3c7; color:#b45309; }
.ptn-sign-card.active .ptn-sign-card-icon { transform:scale(1.05); }
.ptn-sign-card-text { flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; gap:2px; }
.ptn-sign-card-title { font-size:13px; font-weight:700; color:#1e293b; margin-bottom:0; line-height:1.35; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ptn-sign-card-desc { font-size:12px; font-weight:400; color:#64748b; line-height:1.4; text-wrap:balance; }
.ptn-sign-card.active .ptn-sign-card-title { color:#1d4ed8; }
.ptn-sign-card-check { font-size:15px; color:#cbd5e1; margin-left:8px; flex-shrink:0; transition:all 0.2s; }
.ptn-sign-card.active .ptn-sign-card-check { color:#2563eb; }
@media (max-width: 640px) { .ptn-sign-cards-grid { grid-template-columns:1fr; } }
.ptn-gqx-docfile { margin-top:16px; border:1.5px dashed #60a5fa; background:linear-gradient(180deg, #eff6ff 0%, #f8fbff 100%); border-radius:10px; padding:14px 16px; }
.ptn-gqx-docfile.signed { border-color:#fbbf24; background:linear-gradient(180deg, #fffbeb 0%, #fffdf7 100%); }
.ptn-gqx-docfile-head { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e40af; margin-bottom:10px; }
.ptn-gqx-docfile.signed .ptn-gqx-docfile-head { color:#92400e; }
.ptn-gqx-file-empty { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.ptn-gqx-file-hint { font-size:12.5px; color:#475569; display:flex; align-items:center; }
.ptn-gqx-file-actions { display:flex; gap:8px; flex-wrap:wrap; }
.ptn-gqx-file-ready { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #bfdbfe; border-radius:8px; padding:10px 12px; }
.ptn-gqx-file-ico { font-size:28px; color:#2563eb; flex-shrink:0; }
.ptn-gqx-file-info { flex:1; min-width:0; }
.ptn-gqx-file-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }
.ptn-gqx-file-meta { font-size:12px; color:#64748b; margin-top:3px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.ptn-gqx-file-btns { display:flex; gap:6px; flex-shrink:0; }
.ptn-gqx-danger { color:#dc2626 !important; }
.ptn-gqx-note { margin-top:10px; font-size:12px; color:#92400e; background:#fef3c7; border-radius:6px; padding:8px 10px; line-height:1.5; }
.ptn-gqx-gen-preview-box { display:flex; align-items:center; justify-content:space-between; gap:12px; border:1px solid #cbd5e1; background:#ffffff; border-radius:8px; padding:10px 16px; margin-top:12px; box-sizing:border-box; }
.ptn-gqx-gen-preview-hint { display:flex; align-items:center; gap:8px; font-size:13px; color:#334155; font-weight:500; }
.ptn-gqx-gen-preview-hint i { color:#2563eb; font-size:16px; flex-shrink:0; }
.ptn-btn-preview { display:inline-flex; align-items:center; gap:6px; background:#eff6ff; color:#2563eb !important; border:1px solid #3b82f6; padding:6px 14px; font-size:12.5px; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.04); transition:all 0.2s ease; white-space:nowrap; }
.ptn-btn-preview:hover { background:#dbeafe; border-color:#2563eb; color:#1d4ed8 !important; box-shadow:0 2px 6px rgba(37,99,235,0.12); }
.ptn-btn-preview:active { background:#bfdbfe; transform:translateY(0); }
.ptn-doc-src-segmented { display:flex; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:8px; padding:4px; gap:4px; margin-bottom:14px; box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.05); }
.ptn-doc-src-seg-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; color:#475569; background:transparent; border:none; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); user-select:none; }
.ptn-doc-src-seg-btn:hover { color:#0f172a; background:rgba(255, 255, 255, 0.6); }
.ptn-doc-src-seg-btn.active { background:#2563eb; color:#ffffff !important; font-weight:700; box-shadow:0 2px 8px rgba(37, 99, 235, 0.35); }
.ptn-doc-src-seg-btn i { font-size:14px; color:#64748b; transition:color 0.2s ease; }
.ptn-doc-src-seg-btn.active i { color:#ffffff !important; }
.ptn-stepper-fullwidth { display:flex; align-items:center; justify-content:center; gap:14px; width:100%; padding:12px 24px; background:#f8fafc; border-bottom:1px solid #e2e8f0; flex-shrink:0; box-sizing:border-box; }
.ptn-step-tab { display:flex; align-items:center; gap:8px; cursor:pointer; user-select:none; }
.ptn-step-tab .ptn-step-badge { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#ffffff; border:2px solid #cbd5e1; color:#64748b; font-size:12px; font-weight:700; flex-shrink:0; transition:all 0.2s ease; }
.ptn-step-tab.active .ptn-step-badge { background:#2563eb; border-color:#2563eb; color:#ffffff; }
.ptn-step-tab.completed .ptn-step-badge { background:#10b981; border-color:#10b981; color:#ffffff; }
.ptn-step-tab .ptn-step-title { font-size:13.5px; font-weight:600; color:#64748b; }
.ptn-step-tab.active .ptn-step-title { color:#1d4ed8; font-weight:700; }
.ptn-step-tab.completed .ptn-step-title { color:#047857; }
.ptn-stepper-sep { width:80px; height:2px; background:#cbd5e1; font-size:0; }
.ptn-btn-upload { display:inline-flex; align-items:center; gap:7px; background:#ffffff; color:#1d4ed8 !important; border:1.5px solid #2563eb; padding:7px 16px; font-size:13px; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 2px 5px rgba(37,99,235,0.12); transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
.ptn-btn-upload:hover { background:#2563eb; color:#ffffff !important; border-color:#2563eb; box-shadow:0 4px 12px rgba(37,99,235,0.3); transform:translateY(-1px); }
.ptn-btn-upload:active { transform:translateY(0); box-shadow:0 2px 4px rgba(37,99,235,0.15); }
.ptn-qs-step2 { display: none; flex: 1; min-height: 0; overflow: hidden; }
.ptn-qs-preview { flex: 1; background: #334155; overflow: auto; padding: 18px; }
.ptn-qs-a4 { position: relative; background: #fff; width: 794px; min-height: 1123px; margin: 0 auto; padding: 50px 60px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,.3); }
.ptn-qs-side { width: 420px; flex-shrink: 0; background: #f8fafc; border-left: 1px solid #e2e8f0; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.ptn-qs-card { background: #fff; border: 1px solid #bfdbfe; border-left: 4px solid #1d4ed8; border-radius: 8px; padding: 12px; }
.ptn-qs-card.last { border-color: #fecaca; border-left-color: #b91c1c; }
.ptn-qs-card-head { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; font-size: 12.5px; font-weight: 700; color: #1d4ed8; }
.ptn-qs-card.last .ptn-qs-card-head { color: #b91c1c; }
.ptn-qs-sig { position: absolute; border: 2px dashed #2563eb; background: rgba(239,246,255,.92); border-radius: 6px; padding: 6px 8px; font: 11px Inter, sans-serif; color: #1e3a8a; cursor: move; user-select: none; box-sizing: border-box; }
.ptn-qs-sig.last { border-color: #dc2626; background: rgba(254,242,242,.92); color: #991b1b; }
.ptn-qs-foot { padding: 16px 28px 18px; background: #f8fafc; flex-shrink: 0; }
/* Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn mượt */
#ptnSgStepper { height:51px; overflow:hidden; transition:height .22s ease, padding .22s ease, opacity .18s ease, border-color .22s ease; }
#ptnSgStepper.is-collapsed { height:0; padding-top:0; padding-bottom:0; opacity:0; border-bottom-color:transparent; border-bottom-width:0; pointer-events:none; }
/* Sinh văn bản: ghi chú + nút Xem trước văn bản cùng 1 dòng */
.ptn-gen-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:nowrap; border:1px solid #cbd5e1; background:#fff; border-radius:8px; padding:10px 16px; box-sizing:border-box; }
.ptn-gen-hint { display:flex; align-items:center; gap:8px; flex:1; min-width:0; font-size:13px; color:#334155; font-weight:500; }
.ptn-gen-hint i { color:#2563eb; font-size:16px; flex-shrink:0; }
.ptn-gen-row .ptn-btn-preview { flex-shrink:0; }
/* Vùng kéo thả tệp / đang chuyển đổi sang PDF / File Card */
.ptn-drop { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; min-height:96px; box-sizing:border-box; padding:14px 16px; border:1.5px dashed #93c5fd; border-radius:10px; background:#f8fbff; text-align:center; cursor:pointer; transition:border-color .15s, background .15s; }
.ptn-drop:hover, .ptn-drop.drag-over { border-color:#2563eb; background:#eff6ff; }
.ptn-drop:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
.ptn-drop.is-error { border-color:#dc2626; background:#fef2f2; }
.ptn-drop-ico { font-size:22px; color:#2563eb; }
.ptn-drop-main { font-size:13px; color:#334155; }
.ptn-drop-main a { color:#2563eb; font-weight:700; text-decoration:underline; cursor:pointer; }
.ptn-drop-sub { font-size:12px; color:#64748b; }
.ptn-converting { display:flex; align-items:center; justify-content:center; gap:10px; min-height:96px; box-sizing:border-box; border:1.5px dashed #93c5fd; border-radius:10px; background:#eff6ff; font-size:13px; font-weight:600; color:#1d4ed8; }
.ptn-spinner { width:18px; height:18px; border:2.5px solid #bfdbfe; border-top-color:#2563eb; border-radius:50%; animation:ptnSpin .8s linear infinite; }
@keyframes ptnSpin { to { transform:rotate(360deg); } }
.ptn-fcard { display:flex; align-items:center; gap:12px; min-height:96px; box-sizing:border-box; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:12px 14px; }
.ptn-fcard-ico { font-size:30px; flex-shrink:0; width:32px; text-align:center; }
.ptn-fcard-ico.pdf { color:#dc2626; } .ptn-fcard-ico.word { color:#2563eb; }
.ptn-fcard-info { flex:1; min-width:0; }
.ptn-fcard-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }
.ptn-fcard-meta { font-size:12px; color:#64748b; margin-top:3px; }
.ptn-fcard-btns { display:flex; gap:6px; flex-shrink:0; }
.ptn-fcard-btns .btn { min-width:84px; justify-content:center; }
.ptn-status-note { margin-top:12px; font-size:12.5px; color:#1e3a8a; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:9px 12px; line-height:1.55; }
@media (max-width: 640px) { .ptn-fcard, .ptn-gen-row { flex-wrap:wrap; } }
`;
const PTN_LD_CSS = `
.ptnld-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: flex; align-items: stretch; justify-content: center; z-index: 5600; }
.ptnld-modal { background: #fff; width: 100vw; height: 100vh; display: flex; flex-direction: column; font-family: Inter, system-ui, sans-serif; }
.ptnld-head { padding: 14px 22px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.ptnld-head h3 { margin: 0; font-size: 16px; color: #1e3a8a; display: flex; gap: 8px; align-items: center; }
.ptnld-x { cursor: pointer; font-size: 22px; color: #64748b; background: none; border: none; }
.ptnld-body { flex: 1; display: flex; gap: 18px; min-height: 0; overflow: hidden; }
.ptnld-preview { flex: 1; background: #334155; padding: 18px; display: flex; flex-direction: column; min-height: 0; }
.ptnld-doc-bar { display: flex; justify-content: space-between; gap: 12px; color: #e2e8f0; font-size: 12.5px; margin-bottom: 8px; }
.ptnld-doc-bar a { color: #bfdbfe; }
.ptnld-frame { flex: 1; width: 100%; min-height: 420px; border: 0; background: #e5e7eb; border-radius: 4px; }
.ptnld-uploaded { background: #fff; border-radius: 4px; padding: 40px; text-align: center; color: #334155; font-size: 14px; }
.ptnld-right { width: 480px; flex-shrink: 0; overflow-y: auto; padding: 16px 20px 16px 0; font-size: 13.5px; color: #1e293b; }
.ptnld-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #fff; }
.ptnld-box.hist { background: #f8fafc; }
.ptnld-box-title { font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px; }
.ptnld-row { display: grid; grid-template-columns: 130px 1fr; gap: 8px; font-size: 13px; padding: 3px 0; }
.ptnld-row > span:first-child { color: #64748b; }
.ptnld-hv { display: flex; gap: 10px; }
.ptnld-hv-step { width: 22px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding-top: 8px; }
.ptnld-hv-step > i { font-size: 18px; line-height: 20px; background: #f8fafc; border-radius: 50%; }
.ptnld-hv-step::after { content: ""; flex: 1; width: 2px; margin-top: 3px; background: #22c55e; }
.ptnld-hv:last-child .ptnld-hv-step::after { display: none; }
.ptnld-hv.done .ptnld-hv-step > i { color: #22c55e; } .ptnld-hv.no .ptnld-hv-step > i { color: #dc2626; } .ptnld-hv.wait .ptnld-hv-step > i { color: #f59e0b; } .ptnld-hv.todo .ptnld-hv-step > i { color: #cbd5e1; }
.ptnld-hv.todo .ptnld-hv-step::after { background: #e2e8f0; }
.ptnld-hv-av { width: 36px; height: 36px; border-radius: 50%; background: #eef2f7; color: #475569; font-size: 11.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 6px; }
.ptnld-hv-main { flex: 1; min-width: 0; padding: 8px 0 14px; }
.ptnld-hv-head { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }
.ptnld-hv-name { font-weight: 600; color: #0f172a; }
.ptnld-hv-time { color: #94a3b8; font-size: 12px; white-space: nowrap; }
.ptnld-hv-sub { color: #64748b; font-size: 12px; }
.ptnld-hv-act { font-size: 13px; margin-top: 2px; color: #2563eb; }
.ptnld-hv-act.ok { color: #16a34a; } .ptnld-hv-act.no { color: #dc2626; } .ptnld-hv-act.wait { color: #d97706; }
.ptnld-hv-msg { margin-top: 6px; background: #f1f5f9; border-radius: 6px; padding: 8px 10px; font-size: 13px; white-space: pre-wrap; }
.ptnld-group { margin-bottom: 14px; }
.ptnld-label { display: block; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #334155; }
.ptnld-req { color: #dc2626; margin-left: 2px; }
.ptnld-input { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font: inherit; font-size: 13.5px; }
.ptnld-input.is-invalid { border-color: #dc2626; background: #fef2f2; }
.ptnld-err { color: #dc2626; font-size: 12px; margin-top: 4px; display: none; }
.ptnld-hint { color: #64748b; font-size: 12px; margin-top: 4px; }
.ptnld-sign { background: #EFF6FF; border: 1px solid #BFDBFE; border-left: 4px solid #2563EB; border-radius: 6px; padding: 10px 12px; margin-bottom: 12px; font-size: 13px; color: #1E3A8A; }
.ptnld-foot { padding: 12px 22px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; background: #f8fafc; }
@media (max-width: 900px) { .ptnld-body { flex-direction: column; overflow-y: auto; } .ptnld-right { width: auto; padding: 16px; } .ptnld-preview { flex: none; } }
`;

const PTN_EXTRA_CSS = [
    '.ptn-modal .form-control { border:1px solid #cbd5e1; border-radius:6px; padding:0 10px; }',
    '.ptn-modal textarea.form-control { padding:8px 10px; }',
    '.ptn-modal .form-control.is-invalid, .ptnld-input.is-invalid { border-color:#dc2626 !important; background:#fef2f2; }',
    '.ptn-modal-box { max-height:94vh; }',
    '.ptn-dtl-sec { border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:14px; background:#fff; }',
    '.ptn-dtl-title { font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; margin-bottom:10px; display:flex; gap:8px; align-items:center; }',
    '.ptn-dtl-title > i { color:#2563eb; }',
    '.ptn-dtl-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:10px 18px; }',
    '.ptn-dtl-item .k { font-size:12px; color:#64748b; margin-bottom:2px; }',
    '.ptn-dtl-item .v { font-size:13.5px; font-weight:600; color:#0f172a; overflow-wrap:anywhere; }',
    '.ptn-hist-row { display:grid; grid-template-columns:130px 160px 1fr; gap:10px; font-size:12.5px; padding:6px 0; border-bottom:1px dashed #e2e8f0; }',
    '.ptn-sub { display:block; font-size:11px; color:#64748b; margin-top:3px; font-weight:500; }',
    '@media (max-width: 700px) { .ptn-dtl-grid, .ptn-gqx-grid2 { grid-template-columns:1fr; } .ptn-hist-row { grid-template-columns:1fr; } }'
].join('\n');

// ======================= Hằng số, lưu trữ =======================
const KEY = 'btnnPhieuTiepNhan_v1';
const SEED_KEY = 'btnnPtnSeedVersion';
const PTN_SEED_VER = '20261029ptnxs1';
const KIND = 'Phiếu tiếp nhận'; // Loại trình tại màn Việc chờ Lãnh đạo xử lý
const ST = { REVIEW: 'Chờ duyệt', REJECT: 'Bị trả lại', DONE: 'Đã ban hành' };
// [tnd] Trạng thái hồ sơ tiếp nhận theo Phiếu tiếp nhận (phiếu flow 'tn')
const FLOW = 'tn';
const REC_ST = { REVIEW: 'Chờ duyệt tiếp nhận', REJECT: 'Bị trả lại', ASSIGN: 'Chờ phân công' };
const CLAIMS_KEY = 'receptionClaimsList_v2026';
const RM = W.RECEIVE_METHODS;
const METHODS = [RM.TRUC_TIEP, RM.BUU_CHINH];
const MSG_REQ = 'Đây là trường bắt buộc'; // MSG-ERR-VAL-001
const MAX_FILE = 50 * 1024 * 1024;
const SIG = { w: 230, h: 90 };
// [ptnxd] Loại hồ sơ Xác định cơ quan giải quyết bồi thường: Phiếu tiếp nhận không sinh theo Mẫu 02/BTNN; Lưu hồ sơ mở Popup Trình ký (đính tệp, Ký số / Ký ngoài) như phân hệ Xác định CQGQBT
const XD_TYPE = W.REQUEST_TYPE_XD || 'Xác định cơ quan giải quyết bồi thường';
function noTpl(c) { return !!c && (c.requestType || c.loaiYeuCau) === XD_TYPE; }
if (W.APPROVAL_KINDS && !W.APPROVAL_KINDS.TN) W.APPROVAL_KINDS.TN = [KIND];

const esc = v => W.esc(v);
const el = id => document.getElementById(id);
const me = () => W.getCurrentUserId();
function toast(msg, type) { if (typeof global.showToast === 'function') global.showToast(msg, type || 'success'); }
function loadAll() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
function saveAll(m) { try { localStorage.setItem(KEY, JSON.stringify(m)); } catch (e) { /* bỏ qua */ } }
function get(code) { return code ? (loadAll()[code] || null) : null; }
function put(p) { const m = loadAll(); m[p.code] = p; saveAll(m); }
function hist(p, action, note, userId) {
    const uid = userId || me();
    p.history = p.history || [];
    p.history.push({ action, userId: uid, userName: W.userName(uid), at: W.nowText(), note: note || '', ptn: true });
}
function toTime(s) {
    const m = String(s || '').match(/(\d{2}):(\d{2})\s+(\d{2})\/(\d{2})\/(\d{4})|(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/);
    if (!m) return 0;
    return m[1] ? new Date(+m[5], m[4] - 1, +m[3], +m[1], +m[2]).getTime() : new Date(+m[8], m[7] - 1, +m[6], +(m[9] || 0), +(m[10] || 0)).getTime();
}
function fileSize(b) { return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
function mark(id, bad) {
    const e = el(id); if (!e) return;
    e.classList.toggle('is-invalid', !!bad);
    const er = el(id + 'Err'); if (er) er.style.display = bad ? 'block' : 'none';
}

// ======================= CSS =======================
function injectCss() {
    if (el('ptn-css')) return;
    const s = document.createElement('style');
    s.id = 'ptn-css';
    s.textContent = PTN_CSS + PTN_LD_CSS + PTN_EXTRA_CSS
        + '\n.ptn-badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;border:1px solid transparent;}'
        + '\n.ptn-badge.review{background:#fef9c3;color:#a16207;border-color:#a1620733;} .ptn-badge.reject{background:#fef3c7;color:#b45309;border-color:#fde68a;} .ptn-badge.done{background:#dcfce7;color:#15803d;border-color:#15803d33;} .ptn-badge.none{background:#f1f5f9;color:#475569;border-color:#47556933;}'
        + '\n.ptn-ro-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;font-size:13px;} .ptn-ro-grid .k{color:#64748b;font-size:12px;} .ptn-ro-grid .v{font-weight:600;color:#0f172a;overflow-wrap:anywhere;}'
        + '\n#ptnDetailBlock .ptn-dtl{border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#fff;}'
        + '\n.ptn-confirm{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:10060;}'
        + '\n.ptn-confirm-box{background:#fff;border-radius:10px;width:480px;max-width:94vw;box-shadow:0 20px 45px rgba(0,0,0,.3);}'
        + '\n.ptn-confirm-head{padding:14px 18px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#1e293b;} .ptn-confirm-body{padding:16px 18px;font-size:13.5px;color:#334155;line-height:1.55;} .ptn-confirm-foot{padding:12px 18px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px;background:#f8fafc;border-radius:0 0 10px 10px;}';
    document.head.appendChild(s);
}
function statusBadge(st) {
    const c = st === ST.REVIEW ? 'review' : st === ST.REJECT ? 'reject' : st === ST.DONE ? 'done' : 'none';
    return `<span class="ptn-badge ${c}">${esc(st || 'Chưa trình ký')}</span>`;
}

// ======================= Điều kiện =======================
function sourceOf(item) {
    try { if (typeof global.getSourceOf === 'function') return global.getSourceOf(item); } catch (e) { /* bỏ qua */ }
    return (item && item.nguonHoSo) || W.SOURCES.TIEP_NHAN;
}
// Hồ sơ Nguồn Tiếp nhận mới, Hình thức tiếp nhận Trực tiếp / Qua dịch vụ bưu chính
function eligible(item) {
    return !!item && sourceOf(item) === W.SOURCES.TIEP_NHAN && METHODS.indexOf(item.nopKenh || RM.TRUC_TIEP) >= 0;
}
function isReceiver(item) {
    const u = W.getCurrentUser();
    return !!item && !!u && (item.receivedBy || '') === u.name;
}
// [ptnmh02] Không có nút Trình ký riêng: Popup Trình ký mở khi "Lưu và trình ký" tại form Thêm mới / Cập nhật hồ sơ Bị trả lại
function canSubmit(item) {
    return false;
}
// [tnd] Trình ký lại (popup Trình ký Phiếu tiếp nhận) từ form Cập nhật hồ sơ Bị trả lại: Cán bộ tiếp nhận hồ sơ
function canResubmit(item) {
    if (!eligible(item) || !isReceiver(item)) return false;
    const p = get(item.code);
    return !!p && p.flow === FLOW && p.status === ST.REJECT;
}
// Sau Trình ký lại / Ban hành (Ký ngoài) từ form Cập nhật: cập nhật hồ sơ tiếp nhận, đóng form
function afterResubmit(p, recStatus) {
    updateClaim(p.code, x => { x.status = recStatus; });
    try {
        const fv = el('formView');
        if (fv && fv.style.display !== 'none' && typeof global.closeReceptionForm === 'function') global.closeReceptionForm();
    } catch (e) { /* bỏ qua */ }
}
function flowExtras(c, prev) {
    let wfData = (prev && prev.wfData) || null;
    try { if (typeof global.buildWorkflowData === 'function') wfData = global.buildWorkflowData(c); } catch (e) { /* giữ dữ liệu cũ */ }
    return {
        flow: FLOW, wfData,
        returns: (prev.returns || []).concat([{ reason: prev.reason, by: prev.rejectedBy, at: prev.rejectedAt, level: prev.approval ? prev.approval.level : 0 }])
    };
}
function denyReason(item) {
    if (!eligible(item)) return 'Chỉ khả dụng với hồ sơ Nguồn Tiếp nhận mới, Hình thức tiếp nhận Trực tiếp hoặc Qua dịch vụ bưu chính';
    const p = get(item.code);
    if (p && p.status === ST.REVIEW) return 'Phiếu tiếp nhận đang chờ Lãnh đạo ký duyệt';
    if (p && p.status === ST.DONE) return 'Phiếu tiếp nhận đã ban hành';
    if (!isReceiver(item)) return 'Chỉ Cán bộ tiếp nhận hồ sơ được trình ký Phiếu tiếp nhận';
    return '';
}

// ======================= Luồng ký duyệt (như QĐ tạm ứng - Mẫu 07) =======================
// [tnd] Luồng ký duyệt theo Cấu hình luồng xử lý của Loại hồ sơ (Giải quyết YCBT / Xác định CQGQBT), từ đơn vị của Cán bộ tiếp nhận lên đơn vị gốc
function recLike(claim, userId) {
    const uid = userId || me();
    return { chuTri: uid, createdBy: uid, routes: [], loaiYeuCau: (claim && claim.requestType) || W.REQUEST_TYPE_YCBT, rootUnitId: claim ? claim.rootUnitId : '' };
}
function levelsOf(claim, userId) {
    const rl = recLike(claim, userId);
    const ft = W.flowTypeOf ? W.flowTypeOf(rl.loaiYeuCau, rl.rootUnitId) : undefined;
    const path = (W.computeApprovalPath && W.computeApprovalPath(rl)) || [];
    return path.map((u, i) => ({ unitId: u, leaders: i === 0 ? W.firstLevelLeaders(rl) : W.getLeaders(u, ft) }));
}
function canAct(p, uid) {
    if (!p || p.status !== ST.REVIEW || !p.approval) return false;
    const a = p.approval;
    const who = (a.assignees || [])[a.level];
    if (who) return who === uid;
    // [tnd] Phiếu tự trình: Lãnh đạo thuộc Nhóm lãnh đạo của cấp đang ký duyệt (theo luồng đã cấu hình)
    const grp = (a.leaders || [])[a.level];
    return Array.isArray(grp) ? grp.indexOf(uid) >= 0 : W.isLeaderOf(uid, a.path[a.level]);
}

// ======================= Văn bản Mẫu 02/BTNN =======================
function claimOf(id) {
    try { if (typeof global.getDetailItem === 'function') return global.getDetailItem(id); } catch (e) { /* bỏ qua */ }
    return null;
}
function addressOf(c) {
    try { if (typeof global.getReceiptAddress === 'function') return global.getReceiptAddress(c); } catch (e) { /* bỏ qua */ }
    return c.address || '';
}
function docNamesOf(c) {
    const names = [];
    let basis = [];
    try { if (typeof global.getBasisDocs === 'function') basis = global.getBasisDocs(c) || []; } catch (e) { basis = []; }
    (c.receptionDocs || []).concat(basis).forEach(d => {
        const n = String((d && (d.name || d.file)) || '').trim();
        if (n && names.indexOf(n) < 0) names.push(n);
    });
    return names;
}
// Sinh nội dung Mẫu 02/BTNN bằng hàm dựng sẵn của trang Tiếp nhận hồ sơ (không thay đổi bộ sinh văn bản)
// meta (Khối Thông tin điền vào Mẫu 02/BTNN): { docNo -> ##SoKyHieuVanBan##, docDate -> ##NgayThangNamBanHanh##, noiNhan -> ##NoiNhan##, signerId -> ##HoTenNguoiKy## }
// Điền vào nội dung do hàm dựng sẵn trả về (thay phần đầu văn bản, Nơi nhận, bổ sung họ tên người ký)
function buildDocHtml(c, meta) {
    let html = '';
    try { if (typeof global.buildReceiptForm02Html === 'function') html = global.buildReceiptForm02Html(c); } catch (e) { html = ''; }
    if (!html || !meta) return html;
    const root = c.rootUnitId || (W.getRootId ? W.getRootId(W.getCurrentUser().unitId) : '');
    const defHead = W.docHeaderHtml(root, '', 'TB');
    if (html.indexOf(defHead) >= 0) html = html.replace(defHead, W.docHeaderHtml(root, '', 'TB', { soKyHieu: meta.docNo || '', ngay: meta.docDate || '' }));
    const lines = String(meta.noiNhan || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    html = html.replace(/(<b><i>Nơi nhận:<\/i><\/b><br><span style="font-size:11pt;">)[\s\S]*?(<\/span>)/, (m, a, b) => a + lines.map(esc).join('<br>') + b);
    if (meta.signerId) html = html.replace('<i>(Ký, ghi rõ họ tên, đóng dấu)</i>', `<i>(Ký, ghi rõ họ tên, đóng dấu)</i><br><br><br><br><b>${esc(W.userName(meta.signerId))}</b>`);
    return html;
}
function noiNhanDefault(c) {
    const root = (c && c.rootUnitId) || '';
    return ['- Như trên;', `- ${W.unitName(root)} (để biết);`, '- Lưu: VT, HSVV.'].join('\n');
}
function metaData() {
    return { docNo: el('ptnSgDocNo').value.trim(), docDate: el('ptnSgDocDate').value.trim(), noiNhan: el('ptnSgNoiNhan').value, signerId: S.assignees[S.levels.length - 1] || '' };
}
function docBaseName(code) { return `Mau_02_BTNN_Giay_tiep_nhan_${code}`; }
function openDoc(p) {
    if (!p) return;
    const f = p.method === 'Ký ngoài' ? { name: p.signedFile, keepId: p.signedKeepId } : (p.docFile || {});
    if (p.method !== 'Ký ngoài' && f.generated && p.docHtml) { W.openDocTab(p.docHtml, (f.name || docBaseName(p.code)).replace(/\.(docx?|pdf)$/i, '')); return; }
    if (f.keepId && typeof global.tlktOpenFile === 'function' && global.tlktBlob && global.tlktBlob(f.keepId)) { global.tlktOpenFile({ id: f.keepId, name: f.name }); return; }
    toast(`Tệp mẫu [${f.name || ''}] không có nội dung để mở xem.`, 'info');
}

// ======================= Popup Trình ký Phiếu tiếp nhận =======================
let S = null;
function ensureModal() {
    injectCss();
    if (el('ptnSignModal')) return;
    const m = document.createElement('div');
    m.className = 'ptn-modal';
    m.id = 'ptnSignModal';
    const fld = (id, label, req, control) => `<div class="ptn-gqx-field"><label class="form-label" for="${id}">${label}${req ? '<span class="ptn-gqx-req">*</span>' : ''}</label>${control}${req ? `<div class="ptn-gqx-err" id="${id}Err">${MSG_REQ}</div>` : ''}</div>`;
    const date = id => `<div class="ptn-gqx-date"><input type="text" class="form-control" id="${id}" placeholder="dd/mm/yyyy" onchange="PTN._mark('${id}', false)" oninput="PTN._mark('${id}', false)"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById('${id}'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i></div>`;
    m.innerHTML = `<div class="ptn-modal-box ptn-qs-box" id="ptnSgBox">
        <div class="ptn-qs-head">
            <div>
                <div class="ptn-qs-head-title"><span class="ptn-qs-head-ico"><i class="fa-solid fa-file-signature"></i></span><span>TRÌNH KÝ PHIẾU TIẾP NHẬN HỒ SƠ</span></div>
                <div class="ptn-qs-sub">Mã vụ việc: <strong id="ptnSgSubCode" style="color:var(--primary-color);">--</strong><span class="ptn-qs-dot">•</span> Người yêu cầu: <span id="ptnSgSubNyc" style="font-weight:600; color:#334155;">--</span><span class="ptn-qs-dot">•</span> Hình thức tiếp nhận: <span id="ptnSgSubMethod" style="font-weight:500; color:#475569;">--</span></div>
            </div>
            <button type="button" class="ptn-qs-head-close" onclick="PTN.close()" title="Đóng">&times;</button>
        </div>
        <div class="ptn-stepper-fullwidth" id="ptnSgStepper">
            <div class="ptn-step-tab active" id="ptnSgTab1" onclick="if (PTN._s() && PTN._s().step === 2) PTN.goStep(1);"><span class="ptn-step-badge" id="ptnSgTab1Badge">1</span><span class="ptn-step-title">Nhập thông tin</span></div>
            <div class="ptn-stepper-sep"></div>
            <div class="ptn-step-tab" id="ptnSgTab2" onclick="if (PTN._s() && PTN._s().step === 1) PTN.next();"><span class="ptn-step-badge">2</span><span class="ptn-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div>
        </div>
        <div class="ptn-qs-body ptn-gqx-body" id="ptnSgStep1">
            <div class="ptn-gqx-sec" id="ptnSgReturn" style="display:none; border-color:#fecaca; background:#fff7f7;"></div>
            <div class="ptn-gqx-sec">
                <div class="ptn-gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="ptn-gqx-req">*</span></div>
                <div class="ptn-sign-cards-grid">
                    <label class="ptn-sign-card active" id="ptnSgCardOn" for="ptnSgMethodOn">
                        <input type="radio" name="ptnSgMethod" id="ptnSgMethodOn" value="Ký số" checked onchange="PTN.setMethod(this.value)">
                        <div class="ptn-sign-card-content"><div class="ptn-sign-card-icon"><i class="fa-solid fa-file-signature"></i></div><div class="ptn-sign-card-text"><div class="ptn-sign-card-title">Ký số trên hệ thống</div><div class="ptn-sign-card-desc">Trình Lãnh đạo ký duyệt trên phần mềm</div></div></div>
                        <div class="ptn-sign-card-check"><i class="fa-solid fa-circle-check"></i></div>
                    </label>
                    <label class="ptn-sign-card" id="ptnSgCardOff" for="ptnSgMethodOff">
                        <input type="radio" name="ptnSgMethod" id="ptnSgMethodOff" value="Ký ngoài" onchange="PTN.setMethod(this.value)">
                        <div class="ptn-sign-card-content"><div class="ptn-sign-card-icon offline"><i class="fa-solid fa-stamp"></i></div><div class="ptn-sign-card-text"><div class="ptn-sign-card-title">Ký ngoài (Ban hành trực tiếp)</div><div class="ptn-sign-card-desc">Tải lên văn bản PDF đã ký và đóng dấu</div></div></div>
                        <div class="ptn-sign-card-check"><i class="fa-regular fa-circle"></i></div>
                    </label>
                </div>
            </div>
            <div class="ptn-gqx-sec">
                <div class="ptn-gqx-sec-title"><i class="fa-solid fa-file-signature"></i> <span id="ptnSgDocSecText">Tệp văn bản trình ký</span><span class="ptn-gqx-req">*</span></div>
                <div id="ptnSgDocSrcGroup">
                    <div class="ptn-doc-src-segmented">
                        <button type="button" class="ptn-doc-src-seg-btn active" id="ptnSgSegGen" onclick="PTN.setDocSrc('gen')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 02/BTNN</span></button>
                        <button type="button" class="ptn-doc-src-seg-btn" id="ptnSgSegUpload" onclick="PTN.setDocSrc('upload')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button>
                    </div>
                </div>
                <div class="ptn-qs-meta" id="ptnSgMeta">
                    <div class="ptn-qs-meta-title"><i class="fa-solid fa-sliders"></i> Thông tin điền vào Mẫu 02/BTNN</div>
                    <div class="ptn-gqx-grid2">
                        ${fld('ptnSgDocNo', 'Số, ký hiệu văn bản', true, `<input type="text" class="form-control" id="ptnSgDocNo" maxlength="100" placeholder="Nhập số, ký hiệu văn bản" oninput="PTN._mark('ptnSgDocNo', false)">`)}
                        ${fld('ptnSgDocDate', 'Ngày văn bản', true, date('ptnSgDocDate'))}
                    </div>
                    <div class="ptn-gqx-field" style="margin-top:14px;"><div class="ptn-qs-label-row"><label class="form-label" for="ptnSgNoiNhan">Nơi nhận</label><span><i class="fa-solid fa-circle-info"></i> Mỗi nơi nhận trên 01 dòng</span></div>
                        <textarea class="form-control" id="ptnSgNoiNhan" rows="4" maxlength="2000" style="font-size:12.5px;" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng"></textarea></div>
                </div>
                <div id="ptnSgOnline">
                    <input type="file" id="ptnSgDocInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="PTN.uploadDoc(this)">
                    <div id="ptnSgDocBox"></div>
                    <div class="ptn-gqx-err" id="ptnSgDocErr">${MSG_REQ}</div>
                </div>
                <div id="ptnSgOffSec" style="display:none;">
                    <div class="ptn-gqx-field" style="margin-bottom:0;">
                        <label class="form-label">Tệp văn bản PDF đã ký &amp; đóng dấu<span class="ptn-gqx-req">*</span></label>
                        <input type="file" id="ptnSgOffInput" accept=".pdf" style="display:none;" onchange="PTN.uploadOff(this)">
                        <div id="ptnSgOffBox"></div>
                        <div class="ptn-gqx-err" id="ptnSgOffErr">${MSG_REQ}</div>
                    </div>
                    <div class="ptn-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, Phiếu tiếp nhận được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống), chuyển trạng thái <strong>Đã ban hành</strong>; hồ sơ chuyển <strong>Chờ phân công</strong>.</div>
                </div>
            </div>
            <div id="ptnSgTlkt"></div>
        </div>
        <div class="ptn-qs-step2" id="ptnSgStep2">
            <div class="ptn-qs-preview"><div class="ptn-qs-a4" id="ptnSgA4"></div></div>
            <div class="ptn-qs-side">
                <div style="font-size:13px; font-weight:700; color:#1e293b;"><i class="fa-solid fa-stamp" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; KÍCH THƯỚC CHỮ KÝ</div>
                <div id="ptnSgLevels" style="display:flex; flex-direction:column; gap:12px;"></div>
                <div style="font-size:11.5px; color:#64748b;">Bấm <b>Đặt chữ ký</b> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí.</div>
                <div class="ptn-qs-field" style="margin-bottom:0;">
                    <label class="form-label" for="ptnSgContent">Nội dung trình</label>
                    <textarea class="form-control" id="ptnSgContent" rows="4" maxlength="2000" placeholder="Nhập nội dung trình Lãnh đạo..."></textarea>
                </div>
            </div>
        </div>
        <div class="ptn-modal-foot ptn-qs-foot">
            <div class="ptn-qs-foot-btns">
                <button type="button" class="btn btn-secondary" onclick="PTN.close()">Hủy bỏ</button>
                <button type="button" class="btn btn-secondary" id="ptnSgBtnBack" onclick="PTN.goStep(1)" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
                <button type="button" class="btn btn-primary" id="ptnSgBtnNext" onclick="PTN.next()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>
                <button type="button" class="btn btn-primary" id="ptnSgBtnSubmit" onclick="PTN.submit()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>
                <button type="button" class="btn btn-primary" id="ptnSgBtnIssue" onclick="PTN.issue()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>
            </div>
        </div>
    </div>`;
    document.body.appendChild(m);
}
// Thông tin khác của Mẫu 02/BTNN (Kính gửi, Địa chỉ, Điện thoại, Ngày tiếp nhận, Hình thức, giấy tờ, Họ tên người ký):
// hệ thống tự lấy theo hồ sơ / Lãnh đạo cấp cuối khi sinh văn bản, không hiển thị trên form
function open(id) {
    const c = claimOf(id);
    if (!c) return;
    if (!canSubmit(c) && !canResubmit(c)) { const r = denyReason(c); if (r) toast(r + '.', 'error'); return; }
    openFor(id, c, null);
}
// [ptnxd] Thêm mới hồ sơ Loại hồ sơ Xác định CQGQBT: Lưu thông tin -> mở Popup Trình ký; hồ sơ chỉ lưu khi Trình Lãnh đạo / Ban hành văn bản thành công
// claim: hồ sơ chưa lưu; wfData: dữ liệu tạo hồ sơ luồng khi ban hành; onSaved(trạng thái hồ sơ): trang Tiếp nhận lưu hồ sơ, đóng form
function openNew(claim, wfData, onSaved) {
    if (!levelsOf(claim).length) { toast('Chưa xác định được cấp ký duyệt Phiếu tiếp nhận theo luồng đã cấu hình. Vui lòng liên hệ Quản trị hệ thống.', 'error'); return; }
    openFor(claim.id, claim, { wfData: wfData || null, onSaved });
}
// [ptnmh02] Cập nhật hồ sơ Bị trả lại: draft = bản sao hồ sơ đã gán dữ liệu form; onSaved(): trang Tiếp nhận ghi nhận dữ liệu form khi trình / ban hành thành công
function openResubmit(draft, onSaved) {
    if (!canResubmit(draft)) { const r = denyReason(draft); if (r) toast(r + '.', 'error'); return; }
    openFor(draft.id, draft, { resubmit: true, onSaved });
}
function openFor(id, c, nw) {
    // [ptnxs] Loại hồ sơ Xác định CQGQBT: Popup Trình ký như Không thụ lý - Xác định CQGQBT
    if (noTpl(c)) { ptxOpen(id, c, nw); return; }
    ensureModal();
    // [ptnmh02] nw.resubmit: trình lại hồ sơ Bị trả lại từ form Cập nhật (dữ liệu form chỉ ghi nhận khi Trình Lãnh đạo / Ban hành thành công)
    const isNew = !!nw && !nw.resubmit;
    const prev = isNew ? null : get(c.code);
    const re = prev && prev.status === ST.REJECT ? prev : null;
    const levels = levelsOf(c);
    S = { id, claim: c, code: c.code, method: 'Ký số', docSrc: 'gen', step: 1, levels, assignees: levels.map((lv, i) => (re && re.assignees && re.assignees[i]) || lv.leaders[0] || ''), placed: {}, coords: {}, docFile: null, offFile: null,
        noTpl: noTpl(c), isNew, wfData: isNew ? nw.wfData : null, onSaved: nw ? nw.onSaved : null };
    el('ptnSgSubCode').innerText = c.maVuViec || c.code || '--';
    el('ptnSgSubNyc').innerText = c.nyc || '--';
    el('ptnSgSubMethod').innerText = c.nopKenh || RM.TRUC_TIEP;
    el('ptnSgMethodOn').checked = true;
    el('ptnSgContent').value = '';
    // Thông tin điền vào Mẫu 02/BTNN: mặc định / trình lại theo lần trình trước
    const pm = (re && re.meta) || {};
    el('ptnSgDocNo').value = pm.docNo || '     /TB-';
    el('ptnSgDocDate').value = pm.docDate || (W.dateText ? W.dateText() : '');
    el('ptnSgNoiNhan').value = pm.noiNhan != null ? pm.noiNhan : noiNhanDefault(c);
    ['ptnSgDocNo', 'ptnSgDocDate'].forEach(x => mark(x, false));
    document.querySelectorAll('#ptnSignModal .ptn-qs-err, #ptnSignModal .ptn-gqx-err').forEach(e => { e.style.display = 'none'; });
    if (global.flatpickr) ['ptnSgDocDate'].forEach(x => { if (!el(x)._flatpickr) global.flatpickr('#' + x, { dateFormat: 'd/m/Y', allowInput: true }); });
    if (el('ptnSgDocDate')._flatpickr) el('ptnSgDocDate')._flatpickr.setDate(el('ptnSgDocDate').value, false, 'd/m/Y');
    renderOff();
    // [ptnxd] Loại hồ sơ Xác định CQGQBT: chỉ đính tệp (không sinh văn bản theo mẫu); Ký ngoài chỉ tải lên tệp PDF đã ký & đóng dấu
    setDocSrc(S.noTpl ? 'upload' : 'gen');
    // Trình lại (Bị trả lại): điền lại nguồn tệp, tệp trình ký, vị trí ô ký, Lãnh đạo, Nội dung trình, Tài liệu đính kèm của lần trình trước
    if (re) {
        if (re.docSrc && re.docSrc !== 'gen') {
            setDocSrc(re.docSrc);
            const f = re.docFile || {};
            if (f.name && !f.generated) { S.docFile = { name: f.name, size: f.size || '', note: f.note || '', generated: false, raw: (global.tlktBlob && global.tlktBlob(f.keepId)) || undefined, keepId: f.keepId || '' }; renderDoc(); }
        }
        if (re.sigCoords) { S.coords = JSON.parse(JSON.stringify(re.sigCoords)); Object.keys(S.coords).forEach(k => { S.placed[k] = true; }); }
        if (re.content) el('ptnSgContent').value = re.content;
    }
    if (typeof global.tlktMount === 'function') global.tlktMount('ptnSg', 'ptnSgTlkt', { required: false, rows: (re && re.attachments) || [], secClass: 'ptn-gqx-sec', titleClass: 'ptn-gqx-sec-title' });
    // [tnd] Trình ký lại hồ sơ Bị trả lại: hiển thị Lý do trả lại, Hình thức ký của lần trình trước
    const rb = el('ptnSgReturn');
    if (rb) {
        rb.style.display = re ? '' : 'none';
        rb.innerHTML = re ? `<div class="ptn-gqx-sec-title" style="color:#b45309;"><i class="fa-solid fa-rotate-left" style="color:#b45309;"></i> Lý do bị trả lại</div><div class="ptn-ro-grid"><div><div class="k">Lý do trả lại</div><div class="v">${esc(re.reason || '-')}</div></div><div><div class="k">Lãnh đạo trả lại</div><div class="v">${esc(W.userLabel(re.rejectedBy))}</div></div><div><div class="k">Thời điểm trả lại</div><div class="v">${esc(re.rejectedAt || '-')}</div></div></div>` : '';
    }
    // [ptnr2] Hình thức ký mặc định Ký số trên hệ thống (thêm mới và trình lại)
    setMethod('Ký số');
    el('ptnSignModal').classList.add('open');
}
function close() {
    if (S) { S.converting = false; S.convToken = (S.convToken || 0) + 1; }
    const m = el('ptnSignModal'); if (m) m.classList.remove('open');
    const b = el('ptnSgBox'); if (b) b.classList.remove('ptn-qs-wide');
}
function setMethod(m) {
    S.method = m;
    const on = m === 'Ký số';
    [['ptnSgCardOn', on], ['ptnSgCardOff', !on]].forEach(([id, act]) => {
        const card = el(id); card.classList.toggle('active', act);
        const ico = card.querySelector('.ptn-sign-card-check i'); if (ico) ico.className = act ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    el('ptnSgMethodOn').checked = on; el('ptnSgMethodOff').checked = !on;
    el('ptnSgDocSecText').innerText = on ? 'Tệp văn bản trình ký' : 'Văn bản ban hành';
    el('ptnSgDocSrcGroup').style.display = on && !S.noTpl ? '' : 'none';
    el('ptnSgOnline').style.display = on ? '' : 'none';
    el('ptnSgOffSec').style.display = on ? 'none' : '';
    const bar = el('ptnSgStepper');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !on); bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    if (typeof global.tlktShow === 'function') global.tlktShow('ptnSg', on);
    applyMeta();
    goStep(1);
}
// Thông tin điền vào Mẫu 02/BTNN: chỉ hiển thị khi Ký số + Sinh văn bản theo mẫu
function applyMeta() { el('ptnSgMeta').style.display = S.method === 'Ký số' && S.docSrc === 'gen' ? '' : 'none'; }
function setDocSrc(src) {
    S.docSrc = src;
    el('ptnSgSegGen').classList.toggle('active', src === 'gen');
    el('ptnSgSegUpload').classList.toggle('active', src !== 'gen');
    S.converting = false; S.convToken = (S.convToken || 0) + 1; setBusy(false);
    S.docFile = null;
    el('ptnSgDocErr').style.display = 'none';
    applyMeta();
    renderDoc();
}
function goStep(n) {
    S.step = n;
    el('ptnSgStep1').style.display = n === 1 ? '' : 'none';
    el('ptnSgStep2').style.display = n === 2 ? 'flex' : 'none';
    el('ptnSgBox').classList.toggle('ptn-qs-wide', n === 2);
    el('ptnSgTab1').className = 'ptn-step-tab ' + (n === 1 ? 'active' : 'completed');
    el('ptnSgTab1Badge').innerHTML = n === 1 ? '1' : '<i class="fa-solid fa-check"></i>';
    el('ptnSgTab2').className = 'ptn-step-tab' + (n === 2 ? ' active' : '');
    el('ptnSgBtnBack').style.display = n === 2 ? '' : 'none';
    el('ptnSgBtnNext').style.display = n === 1 && S.method === 'Ký số' ? '' : 'none';
    el('ptnSgBtnSubmit').style.display = n === 2 ? '' : 'none';
    el('ptnSgBtnIssue').style.display = n === 1 && S.method === 'Ký ngoài' ? '' : 'none';
}
function dropHtml(inputId, fn, main, sub) {
    return `<div class="ptn-drop" tabindex="0" role="button" onclick="document.getElementById('${inputId}').click()" onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.click(); }" ondragover="event.preventDefault(); this.classList.add('drag-over');" ondragleave="this.classList.remove('drag-over');" ondrop="event.preventDefault(); this.classList.remove('drag-over'); var f = event.dataTransfer && event.dataTransfer.files; if (f && f.length) PTN.${fn}({ files: [f[0]], value: '' });"><i class="fa-solid fa-cloud-arrow-up ptn-drop-ico"></i><div class="ptn-drop-main">${main}</div><div class="ptn-drop-sub">${sub}</div></div>`;
}
function fileCardHtml(name, size, note, viewJs, removeJs) {
    const isPdf = /\.pdf$/i.test(name || '');
    return `<div class="ptn-fcard"><i class="fa-solid ${isPdf ? 'fa-file-pdf pdf' : 'fa-file-word word'} ptn-fcard-ico"></i><div class="ptn-fcard-info"><div class="ptn-fcard-name">${esc(name || '')}</div><div class="ptn-fcard-meta">${esc(size || '')}${note ? ' · ' + esc(note) : ''}</div></div><div class="ptn-fcard-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="${viewJs}"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm ptn-gqx-danger" onclick="${removeJs}"><i class="fa-solid fa-trash"></i> Xóa</button></div></div>`;
}
function renderDoc() {
    const f = S.docFile;
    if (S.docSrc === 'gen') {
        el('ptnSgDocBox').innerHTML = `<div class="ptn-gen-row"><div class="ptn-gen-hint"><i class="fa-solid fa-file-circle-check"></i><span>Hệ thống tự động sinh Giấy tiếp nhận yêu cầu bồi thường theo Mẫu 02/BTNN từ thông tin hồ sơ tiếp nhận.</span></div><button type="button" class="ptn-btn-preview" onclick="if (PTN.generate()) PTN.viewDoc();"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div>`;
        return;
    }
    if (S.converting) { el('ptnSgDocBox').innerHTML = '<div class="ptn-converting"><span class="ptn-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    el('ptnSgDocBox').innerHTML = !f
        ? dropHtml('ptnSgDocInput', 'uploadDoc', 'Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a>', 'Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)')
        : fileCardHtml(f.name, f.size, f.note, 'PTN.viewDoc()', 'PTN._s().docFile = null; PTN._renderDoc();');
}
function setBusy(busy) {
    const btn = el('ptnSgBtnNext'); if (!btn) return;
    btn.disabled = !!busy; btn.style.opacity = busy ? '0.55' : ''; btn.style.cursor = busy ? 'not-allowed' : '';
    btn.title = busy ? 'Đang chuyển đổi tệp sang PDF, vui lòng chờ' : '';
}
// Sinh văn bản Mẫu 02/BTNN; kiểm tra trống Số, ký hiệu văn bản và Ngày văn bản
function generate() {
    const ids = ['ptnSgDocNo', 'ptnSgDocDate'];
    const bad = ids.filter(id => !el(id).value.trim());
    ids.forEach(id => mark(id, bad.indexOf(id) >= 0));
    if (bad.length) { el(bad[0]).focus(); return false; }
    S.docFile = { name: docBaseName(S.claim.maVuViec || S.code) + '.pdf', generated: true, html: buildDocHtml(S.claim, metaData()) };
    el('ptnSgDocErr').style.display = 'none';
    return true;
}
function openRaw(f) {
    const b = f && f.raw;
    if (b) { if (!f.__url) f.__url = URL.createObjectURL(b); global.open(f.__url, '_blank'); return; }
    if (f && f.keepId && global.tlktOpenFile) { global.tlktOpenFile({ id: f.keepId, name: f.name }); return; }
    toast(`Tệp mẫu [${(f && f.name) || ''}] không có nội dung để mở xem.`, 'info');
}
function viewDoc() {
    const f = S && S.docFile; if (!f) return;
    if (f.generated) W.openDocTab(f.html, f.name.replace(/\.(docx?|pdf)$/i, ''));
    else openRaw(f);
}
function uploadDoc(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    if (!/\.(docx|doc|pdf)$/i.test(f.name)) { toast('Tệp không đúng định dạng (chỉ chấp nhận .docx, .doc, .pdf).', 'error'); return; }
    if (f.size > MAX_FILE) { toast('Tệp vượt quá dung lượng tối đa 50MB.', 'error'); return; }
    el('ptnSgDocErr').style.display = 'none';
    const size = fileSize(f.size);
    if (/\.docx?$/i.test(f.name)) {
        S.docFile = null; S.converting = true;
        const st = S; const token = st.convToken = (st.convToken || 0) + 1;
        setBusy(true); renderDoc();
        setTimeout(() => {
            if (!st.converting || st.convToken !== token) return;
            st.converting = false; setBusy(false);
            st.docFile = { name: f.name.replace(/\.docx?$/i, '.pdf'), size, note: 'Đã chuyển đổi từ ' + f.name, generated: false, raw: f };
            if (S === st) renderDoc();
        }, 1200);
        return;
    }
    S.docFile = { name: f.name, size, generated: false, raw: f };
    renderDoc();
}
function renderOff() {
    const f = S.offFile;
    el('ptnSgOffBox').innerHTML = !f
        ? dropHtml('ptnSgOffInput', 'uploadOff', 'Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a>', '(Chỉ chấp nhận .pdf, tối đa 50MB)')
        : fileCardHtml(f.name, f.size, '', 'PTN._openOff()', 'PTN._s().offFile = null; PTN._renderOff();');
}
function uploadOff(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    if (!/\.pdf$/i.test(f.name)) { toast('Tệp không đúng định dạng (chỉ chấp nhận .pdf).', 'error'); return; }
    if (f.size > MAX_FILE) { toast('Tệp vượt quá dung lượng tối đa 50MB.', 'error'); return; }
    S.offFile = { name: f.name, size: fileSize(f.size), raw: f };
    el('ptnSgOffErr').style.display = 'none';
    renderOff();
}
function next() {
    if (!S.levels.length) { toast('Chưa xác định được cấp phê duyệt. Vui lòng liên hệ Quản trị hệ thống.', 'error'); return; }
    const okTlkt = typeof global.tlktValidate !== 'function' || global.tlktValidate('ptnSg');
    if (S.docSrc === 'gen') { if (!generate()) return; }
    else if (!S.docFile) {
        el('ptnSgDocErr').style.display = 'block';
        const dz = el('ptnSgDocBox').querySelector('.ptn-drop'); if (dz) { dz.classList.add('is-error'); dz.focus(); }
        return;
    }
    if (!okTlkt) return;
    const f = S.docFile;
    el('ptnSgA4').innerHTML = f.generated ? f.html : `<div style="text-align:center; color:#64748b; padding-top:300px; font:14px Inter, sans-serif;"><i class="fa-solid fa-file-lines" style="font-size:48px;"></i><br><br>${esc(f.name)}<br>(Văn bản tải lên)</div>`;
    renderLevels();
    goStep(2);
    S.levels.forEach((lv, i) => { if (S.placed[i]) drawBox(i); });
}
function renderLevels() {
    const n = S.levels.length;
    el('ptnSgLevels').innerHTML = S.levels.map((lv, i) => {
        const last = i === n - 1;
        const opts = lv.leaders.map(id => `<option value="${esc(id)}" ${S.assignees[i] === id ? 'selected' : ''}>${esc(W.userLabel(id))}</option>`).join('');
        return `<div class="ptn-qs-card${last ? ' last' : ''}"><div class="ptn-qs-card-head"><span>Cấp ${i + 1} - ${esc(W.unitName(lv.unitId))}</span>${W.isKyNhayUnit && W.isKyNhayUnit(lv.unitId) ? '<span class="badge" style="font-size:10.5px;">Ký nháy</span>' : ''}</div>
            <select class="form-control" id="ptnSgLeader${i}" style="font-size:13px; height:36px;" onchange="PTN._s().assignees[${i}] = this.value; PTN._mark('ptnSgLeader${i}', false); PTN._syncBox(${i});"><option value="">-- Chọn Lãnh đạo --</option>${opts}</select>
            <div class="ptn-qs-err" id="ptnSgLeader${i}Err">${MSG_REQ}</div>
            <div style="margin-top:8px;">${S.placed[i]
                ? `<span style="display:flex; gap:4px; flex-wrap:wrap;"><button type="button" class="btn btn-secondary btn-sm" onclick="PTN._resize(${i},180,75)">Nhỏ</button><button type="button" class="btn btn-secondary btn-sm" onclick="PTN._resize(${i},230,90)">Vừa</button><button type="button" class="btn btn-secondary btn-sm" onclick="PTN._resize(${i},290,115)">Lớn</button><button type="button" class="btn btn-secondary btn-sm" onclick="PTN._resetBox(${i})"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button></span>`
                : `<button type="button" class="btn btn-secondary btn-sm" onclick="PTN._place(${i})"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button><div class="ptn-qs-err" id="ptnSgPlace${i}Err">Chưa đặt chữ ký</div>`}</div></div>`;
    }).join('');
}
function defaultCoord(i) {
    const a4 = el('ptnSgA4'); const h = Math.max(a4.scrollHeight, 1123); const last = i === S.levels.length - 1;
    return { x: last ? 470 : 60, y: h - 230, w: SIG.w, h: SIG.h };
}
function place(i) { S.placed[i] = true; S.coords[i] = S.coords[i] || defaultCoord(i); renderLevels(); drawBox(i); }
function drawBox(i) {
    let b = el('ptnSgSig' + i);
    const last = i === S.levels.length - 1;
    if (!b) {
        b = document.createElement('div'); b.id = 'ptnSgSig' + i; b.className = 'ptn-qs-sig' + (last ? ' last' : '');
        el('ptnSgA4').appendChild(b);
        b.addEventListener('mousedown', ev => {
            const c = S.coords[i]; const sx = ev.clientX, sy = ev.clientY, ox = c.x, oy = c.y;
            const mv = e => { c.x = Math.max(0, ox + e.clientX - sx); c.y = Math.max(0, oy + e.clientY - sy); b.style.left = c.x + 'px'; b.style.top = c.y + 'px'; };
            const up = () => { document.removeEventListener('mousemove', mv); document.removeEventListener('mouseup', up); };
            document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up); ev.preventDefault();
        });
    }
    const c = S.coords[i];
    Object.assign(b.style, { left: c.x + 'px', top: c.y + 'px', width: c.w + 'px', height: c.h + 'px' });
    const who = S.assignees[i] ? W.userName(S.assignees[i]) : '';
    b.innerHTML = `<b>${last ? 'KÝ SỐ &amp; CON DẤU' : 'KÝ NHÁY'}</b><br>Cấp ${i + 1}${who ? ' - ' + esc(who) : ''}`;
}
function baseRecord(c, prev) {
    return {
        code: c.code, maVuViec: c.maVuViec || c.code, nycName: c.nyc || '', nopKenh: c.nopKenh || RM.TRUC_TIEP,
        loaiYeuCau: c.requestType || W.REQUEST_TYPE_YCBT, rootUnitId: c.rootUnitId || '',
        history: (prev && prev.history) || []
    };
}
function afterChange(code) {
    try { if (typeof global.renderReceptionTable === 'function') global.renderReceptionTable(); } catch (e) { /* bỏ qua */ }
    try {
        const fv = el('formView');
        if (fv && fv.style.display !== 'none' && (typeof isFormReadOnly !== 'undefined' && isFormReadOnly) && typeof global.openReceptionForm === 'function') {
            const cur = typeof editingId !== 'undefined' ? editingId : null;
            if (cur) global.openReceptionForm(cur, true);
        }
    } catch (e) { /* bỏ qua */ }
}
// Ký số: mỗi cấp chọn Lãnh đạo và đặt chữ ký -> Phiếu tiếp nhận "Chờ duyệt"
function submit() {
    let ok = true; let first = null;
    S.levels.forEach((lv, i) => {
        const bad = !el('ptnSgLeader' + i).value; mark('ptnSgLeader' + i, bad); if (bad) { ok = false; first = first || el('ptnSgLeader' + i); }
        const pe = el('ptnSgPlace' + i + 'Err'); if (!S.placed[i]) { if (pe) pe.style.display = 'block'; ok = false; }
    });
    if (!ok) { if (first) first.focus(); return; }
    const c = S.claim;
    const prev = get(c.code);
    const f = S.docFile;
    const content = el('ptnSgContent').value.trim();
    const path = S.levels.map(l => l.unitId);
    const keepId = f.generated ? '' : (f.keepId || (typeof global.tlktKeep === 'function' && f.raw ? global.tlktKeep(f.raw) : ''));
    const attachments = typeof global.tlktGet === 'function' ? global.tlktGet('ptnSg') : [];
    const p = Object.assign(baseRecord(c, prev), {
        status: ST.REVIEW, method: 'Ký số', docSrc: S.docSrc,
        docFile: { name: f.name, generated: !!f.generated, size: f.size || '', note: f.note || '', keepId },
        docHtml: f.generated ? buildDocHtml(c, metaData()) : '', meta: S.docSrc === 'gen' ? (({ signerId, ...m }) => m)(metaData()) : null, assignees: S.assignees.slice(), sigCoords: JSON.parse(JSON.stringify(S.coords)),
        content, attachments, submittedBy: me(), submittedAt: W.nowText(), reason: '',
        approval: { kind: KIND, path, assignees: S.assignees.slice(), level: 0, steps: [] }
    });
    const reFlow = isFlow(prev) && prev.status === ST.REJECT;
    if (reFlow) { Object.assign(p, flowExtras(c, prev)); p.approval.leaders = S.levels.map(l => l.leaders.slice()); }
    // [ptnxd] Thêm mới hồ sơ Xác định CQGQBT: phiếu thuộc luồng Duyệt tiếp nhận (hồ sơ Chờ duyệt tiếp nhận; cấp cuối Ký duyệt -> Chờ phân công)
    const nw = S.isNew;
    if (nw) Object.assign(p, { flow: FLOW, wfData: S.wfData, returns: [] }, { approval: Object.assign(p.approval, { leaders: S.levels.map(l => l.leaders.slice()) }) });
    if (S.noTpl) p.noTpl = true;
    const nextText = path.length > 1 ? ' Lãnh đạo cấp tiếp theo: ' + path.slice(1).map((u, i) => `${W.userName(S.assignees[i + 1])} - ${W.unitName(u)}`).join('; ') + '.' : '';
    hist(p, prev && prev.status === ST.REJECT ? 'Trình ký lại Phiếu tiếp nhận' : 'Trình ký Phiếu tiếp nhận', `Ký số trên hệ thống. Trình ${W.userName(S.assignees[0])} - ${W.unitName(path[0])}.${nextText}${content ? ' Nội dung: ' + content : ''}${nw ? ' Hồ sơ chuyển [' + REC_ST.REVIEW + '].' : ''}`);
    put(p);
    const st = S;
    close();
    if (typeof st.onSaved === 'function') st.onSaved(REC_ST.REVIEW);
    if (reFlow) afterResubmit(p, REC_ST.REVIEW);
    toast(`Đã trình ${W.userLabel(st.assignees[0])} ký duyệt Phiếu tiếp nhận hồ sơ ${p.maVuViec}. ${reFlow || nw ? 'Hồ sơ chuyển [' + REC_ST.REVIEW + '].' : 'Phiếu tiếp nhận chuyển [' + ST.REVIEW + '].'}`, 'success');
    afterChange(p.code);
}
function confirmBox(title, message, okText, onOk) {
    injectCss();
    const ov = document.createElement('div');
    ov.className = 'ptn-confirm'; ov.id = 'ptnConfirm';
    ov.innerHTML = `<div class="ptn-confirm-box"><div class="ptn-confirm-head"><i class="fa-solid fa-circle-exclamation" style="color:#d97706;"></i> ${esc(title)}</div><div class="ptn-confirm-body">${esc(message)}</div><div class="ptn-confirm-foot"><button type="button" class="btn btn-secondary btn-sm" data-act="no">Hủy bỏ</button><button type="button" class="btn btn-primary btn-sm" data-act="ok" style="background:#16a34a;border-color:#16a34a;">${esc(okText)}</button></div></div>`;
    ov.addEventListener('click', e => {
        const a = e.target.closest('[data-act]'); if (!a) return;
        ov.remove();
        if (a.getAttribute('data-act') === 'ok') onOk();
    });
    document.body.appendChild(ov);
}
// Ký ngoài: ban hành trực tiếp, không trình Lãnh đạo -> Phiếu tiếp nhận "Đã ban hành"
function issue(confirmed) {
    let firstEl = null;
    if (!S.offFile) {
        el('ptnSgOffErr').style.display = 'block';
        const dz = el('ptnSgOffBox').querySelector('.ptn-drop'); if (dz) { dz.classList.add('is-error'); firstEl = firstEl || dz; }
    }
    const okTlkt = typeof global.tlktValidate !== 'function' || global.tlktValidate('ptnSg');
    if (firstEl) { firstEl.focus(); return; }
    if (!okTlkt) return;
    if (confirmed !== true) {
        confirmBox('Xác nhận ban hành văn bản', 'Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Phiếu tiếp nhận sẽ chuyển sang trạng thái "Đã ban hành". Bạn có chắc chắn muốn ban hành văn bản?', 'Ban hành', () => issue(true));
        return;
    }
    const c = S.claim;
    const prev = get(c.code);
    const keepId = typeof global.tlktKeep === 'function' && S.offFile.raw ? global.tlktKeep(S.offFile.raw) : '';
    const p = Object.assign(baseRecord(c, prev), {
        status: ST.DONE, method: 'Ký ngoài',
        signedFile: S.offFile.name, signedKeepId: keepId, issuedAt: W.nowText(), issuedBy: me(),
        attachments: typeof global.tlktGet === 'function' ? global.tlktGet('ptnSg') : [], approval: null, reason: ''
    });
    const reFlow = isFlow(prev) && prev.status === ST.REJECT;
    if (reFlow) Object.assign(p, flowExtras(c, prev));
    // [ptnxd] Thêm mới hồ sơ Xác định CQGQBT: ban hành trực tiếp -> tạo hồ sơ luồng Chờ phân công tại đơn vị gốc
    const nw = S.isNew;
    if (nw) Object.assign(p, { flow: FLOW, wfData: S.wfData, returns: [] });
    if (S.noTpl) p.noTpl = true;
    hist(p, 'Ban hành Phiếu tiếp nhận (Ký ngoài)', `Tệp đã ký & đóng dấu: ${p.signedFile}.`);
    put(p);
    const st = S;
    close();
    let rel = null;
    if (typeof st.onSaved === 'function') st.onSaved(REC_ST.ASSIGN);
    if (reFlow || nw) { rel = release(p); if (reFlow) afterResubmit(p, (rel && rel.status) || REC_ST.ASSIGN); }
    toast(`Đã ban hành Phiếu tiếp nhận hồ sơ ${p.maVuViec} (Ký ngoài). ${reFlow || nw ? 'Hồ sơ chuyển [' + ((rel && rel.status) || REC_ST.ASSIGN) + '].' : 'Phiếu tiếp nhận chuyển [' + ST.DONE + '].'}`, 'success');
    afterChange(p.code);
}

// ======================= [tnd] Duyệt tiếp nhận: Lưu hồ sơ -> Chờ duyệt tiếp nhận -> Chờ phân công / Bị trả lại =======================
function isFlow(p) { return !!p && p.flow === FLOW; }
// Trạng thái hồ sơ tiếp nhận theo Phiếu tiếp nhận (flow 'tn'); '' nếu hồ sơ không thuộc luồng duyệt tiếp nhận
function recStatusOf(code) {
    const p = get(code);
    if (!isFlow(p)) return '';
    return p.status === ST.REVIEW ? REC_ST.REVIEW : p.status === ST.REJECT ? REC_ST.REJECT : REC_ST.ASSIGN;
}
// Hồ sơ đang duyệt tiếp nhận (Chờ duyệt tiếp nhận / Bị trả lại): chưa tạo hồ sơ luồng phân công
function holds(item) {
    const s = item ? recStatusOf(item.code) : '';
    return s === REC_ST.REVIEW || s === REC_ST.REJECT;
}
// Đồng bộ trạng thái hồ sơ tiếp nhận theo phiếu; true nếu hồ sơ đang duyệt tiếp nhận
function reconcile(item) {
    if (!holds(item)) return false;
    item.status = recStatusOf(item.code);
    return true;
}
function pageClaims() { return (typeof claimsList !== 'undefined' && Array.isArray(claimsList)) ? claimsList : null; }
function storeClaims() { try { return JSON.parse(localStorage.getItem(CLAIMS_KEY) || '[]') || []; } catch (e) { return []; } }
function findClaim(code) { return (pageClaims() || storeClaims()).find(x => x && x.code === code && !x.deleted) || null; }
// Cập nhật hồ sơ tiếp nhận: trang Tiếp nhận hồ sơ cập nhật danh sách đang mở (không ghi đè), trang khác cập nhật kho localStorage
function updateClaim(code, fn) {
    const list = pageClaims();
    if (list) {
        const c = list.find(x => x.code === code && !x.deleted);
        if (c) { fn(c); if (typeof saveClaims === 'function') saveClaims(); }
        return c || null;
    }
    const arr = storeClaims();
    const c = arr.find(x => x && x.code === code && !x.deleted);
    if (c) { fn(c); try { localStorage.setItem(CLAIMS_KEY, JSON.stringify(arr)); } catch (e) { /* bỏ qua */ } }
    return c || null;
}
function pathText(path) { return (path || []).map((u, i) => `Cấp ${i + 1} - ${W.unitName(u)}`).join('; '); }
// Ký số cấp cuối: bổ sung họ tên người ký vào văn bản (không phụ thuộc trang đang mở)
function signDoc(html, uid) {
    const mk = '<i>(Ký, ghi rõ họ tên, đóng dấu)</i>';
    if (!html || html.indexOf(mk) < 0 || html.indexOf(mk + '<br><br><br><br><b>') >= 0) return html;
    return html.replace(mk, `${mk}<br><span style="font-size:11pt; color:#1d4ed8;">(Đã ký số)</span><br><br><br><b>${esc(W.userName(uid))}</b>`);
}
// Cấp cuối ký duyệt: tạo hồ sơ luồng Chờ phân công tại đơn vị gốc (Lãnh đạo đơn vị phân công theo luồng đã cấu hình)
function release(p) {
    let rec = W.getRecord(p.code);
    const c = findClaim(p.code);
    if (!rec) {
        let data = null;
        if (c && pageClaims() && typeof global.buildWorkflowData === 'function') { try { data = global.buildWorkflowData(c); } catch (e) { data = null; } }
        data = data || p.wfData;
        if (data) rec = W.createPendingRecord(Object.assign({}, data, { historyNote: `Phiếu tiếp nhận đã được ký duyệt, ban hành. Chuyển lãnh đạo ${W.unitName(data.rootUnitId)} phân công xử lý.` }));
    }
    updateClaim(p.code, x => { x.status = rec ? rec.status : REC_ST.ASSIGN; if (rec) { x.currentUnitId = rec.currentUnitId; x.maVuViec = rec.maVuViec || x.maVuViec; } });
    return rec;
}
// Lãnh đạo đã Ký duyệt / Từ chối Phiếu tiếp nhận của hồ sơ
function leaderActed(code, uid) {
    const p = get(code);
    return !!p && (p.history || []).some(h => h.userId === uid && /^(Ký duyệt|Từ chối)/.test(h.action));
}
function canActCode(code, uid) { return canAct(get(code), uid || me()); }

// ---- MH02 (form Thêm mới / Sửa): nhãn nút lưu ----
// [ptnmh02] Chốt 29/10: bỏ khối "Thông tin Phiếu tiếp nhận (Mẫu 02/BTNN)" tại form; Số, ký hiệu văn bản / Ngày văn bản / Nơi nhận nhập tại Popup Trình ký
function renderFormSec() { syncSaveLabel(); }

// ======================= Màn chi tiết hồ sơ tiếp nhận (MH03): Lý do bị trả lại, Thông tin Phiếu tiếp nhận + Lịch sử xử lý =======================
// Tên tệp Phiếu tiếp nhận hiển thị thống nhất dạng PDF (Dự thảo đang trình / văn bản đã ký)
function pdfName(p) {
    const n = p.method === 'Ký ngoài' ? (p.signedFile || '') : ((p.docFile && p.docFile.name) || '');
    return n ? n.replace(/\.(docx?|html?)$/i, '.pdf') : '';
}
function dashv(v) { const s = String(v == null ? '' : v).trim(); return s ? esc(s) : '-'; }
function downloadIssued(code) {
    const p = get(code); if (!p) return;
    const f = p.method === 'Ký ngoài' ? { name: p.signedFile, keepId: p.signedKeepId } : (p.docFile || {});
    if (f.keepId && typeof global.tlktOpenFile === 'function' && global.tlktBlob && global.tlktBlob(f.keepId)) { global.tlktOpenFile({ id: f.keepId, name: f.name }); return; }
    toast(`Đã tải tệp ${pdfName(p)} (giả lập).`, 'info');
}
// [mh03ui] MH03 chỉ đọc: cặp Nhãn - Giá trị trong card, không có dữ liệu hiển thị "---"
function roDash(v) { const s = String(v == null ? '' : v).trim(); return s && s !== '-' && s !== '--' ? esc(s) : '<span class="ro-empty">---</span>'; }
const roItm = (k, v, cls) => `<div class="ro-f${cls ? ' ' + cls : ''}"><div class="ro-l">${esc(k)}</div><div class="ro-v">${v}</div></div>`;
// Tệp Phiếu tiếp nhận: khung tệp (icon PDF + tên tệp click mở xem) + nút Xem file / Tải file
function fileRowHtml(p, label) {
    const c = esc(p.code);
    const n = pdfName(p);
    const name = n ? `<a href="javascript:void(0)" class="ro-file" title="${esc(n)}" onclick="PTN.viewIssued('${c}')"><i class="fa-solid fa-file-pdf ro-ico-pdf"></i><span>${esc(n)}</span></a>` : `<span class="ro-file-none"><i class="fa-solid fa-file-pdf ro-ico-pdf"></i><span class="ro-empty">---</span></span>`;
    return roItm(label, `<div class="ro-filebox">${name}<span class="ro-acts"><button type="button" class="ro-ab" onclick="PTN.viewIssued('${c}')"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="ro-ab" onclick="PTN.downloadIssued('${c}')"><i class="fa-solid fa-download"></i> Tải file</button></span></div>`, 'ro-full');
}
// Khối "Thông tin Phiếu tiếp nhận": dòng 1 Trạng thái | Số, ký hiệu văn bản | Ngày văn bản; dòng 2 Tệp Phiếu tiếp nhận; sau đó Tài liệu ban hành / không ban hành kèm theo
function detailBlockHtml(c) {
    const p = get(c.code);
    if (!p) return '';
    const ky = p.method === 'Ký ngoài';
    const draft = p.status !== ST.DONE;
    const meta = p.meta || {};
    // [ptnxd] Phiếu tiếp nhận hồ sơ Xác định CQGQBT (tệp đính kèm, không sinh theo mẫu): không hiển thị Số, ký hiệu văn bản / Ngày văn bản
    const row1 = roItm('Trạng thái', `<span class="ptn-badge ${draft ? 'review' : 'done'}">${draft ? 'Dự thảo' : 'Đã ký duyệt, ban hành'}</span>`)
        + (p.noTpl || ky || !p.meta ? '' : roItm('Số, ký hiệu văn bản', roDash(meta.docNo))
        + roItm('Ngày văn bản', roDash(meta.docDate)));
    const row2 = fileRowHtml(p, draft ? 'Dự thảo Phiếu tiếp nhận' : 'Phiếu tiếp nhận đã ký duyệt');
    // Bảng tài liệu: bỏ qua căn lề tự động (grid_align) để cột File đính kèm căn trái
    const tl = typeof global.tlktViewHtml === 'function' ? global.tlktViewHtml(p.attachments || []).replace(/tlkt-view-box"/g, 'tlkt-view-box ga-skip"') : '';
    return `<div class="ro-grid ro-g3">${row1}</div><div class="ro-grid ro-g3">${row2}</div>${tl ? `<div class="ro-tlkt">${tl}</div>` : ''}`;
}
// Khối "Lý do bị trả lại": hồ sơ Bị trả lại
function rejectBlockHtml(p) {
    const a = p.approval || {};
    return `<div class="ro-grid ro-g4">${roItm('Lý do trả lại', roDash(p.reason), 'ro-full ro-area')}</div><div class="ro-grid ro-g4">${roItm('Lãnh đạo trả lại', roDash(W.userLabel(p.rejectedBy)))}${roItm('Thời điểm trả lại', roDash(p.rejectedAt))}${roItm('Cấp ký duyệt', a.path ? `Cấp ${(a.level || 0) + 1}/${a.path.length} - ${esc(W.unitName(a.path[a.level || 0]))}` : roDash(''), 'ro-span-2')}</div>`;
}
// Tài liệu ban hành / không ban hành kèm theo (tlktViewHtml): tên tệp click mở xem như nút Xem file của dòng
function linkTlktNames(root) {
    root.querySelectorAll('.tlkt-view-box tr[data-kdtc-tlkt-row]').forEach(tr => {
        const f = tr.querySelector('td.tlkt-fc .tlkt-file');
        const eye = tr.querySelector('button[title="Xem file"]');
        if (!f || !eye || f.classList.contains('ro-file')) return;
        f.classList.add('ro-file');
        f.setAttribute('role', 'link');
        f.setAttribute('tabindex', '0');
        f.addEventListener('click', () => eye.click());
        f.addEventListener('keydown', e => { if (e.key === 'Enter') eye.click(); });
    });
}
function renderDetail(id, isReadOnly) {
    const host = el('wfInfoBlock');
    if (!host) return;
    renderFormSec(id, isReadOnly);
    let blk = el('ptnDetailBlock');
    if (!blk) {
        blk = document.createElement('div');
        blk.id = 'ptnDetailBlock';
        host.parentNode.insertBefore(blk, host);
    }
    const c = isReadOnly && id ? claimOf(id) : null;
    const p0 = c ? get(c.code) : null;
    // [mh03btn] MH03: Ký duyệt / Từ chối chỉ hiển thị khi được phép (không hiển thị mờ)
    ldDetailButtons(c && isFlow(p0) ? c.code : '', !!isReadOnly && !!id && isLeaderMe());
    if (!c || !eligible(c) || !p0) { blk.style.display = 'none'; blk.innerHTML = ''; return; }
    injectCss();
    blk.style.display = '';
    const returned = p0.status === ST.REJECT;
    const rej = returned ? `<section id="ptnReturnBlock" class="ro-card ro-card-warn" tabindex="-1" style="outline:none;"><div class="ro-card-h">Lý do bị trả lại</div><div class="ro-card-b">${rejectBlockHtml(p0)}</div></section>` : '';
    // MH03 không hiển thị khối Thông tin trình ký; các bước trình ký xem tại Lịch sử xử lý
    blk.setAttribute('data-tlkt-skip', '1');
    blk.innerHTML = `${rej}<section class="ro-card"><div class="ro-card-h">Thông tin Phiếu tiếp nhận</div><div class="ro-card-b">${detailBlockHtml(c)}</div></section>`;
    linkTlktNames(blk);
    // Hồ sơ Bị trả lại: cuộn tới, focus và làm nổi khối Lý do bị trả lại
    if (returned) setTimeout(() => {
        const b = el('ptnReturnBlock'); if (!b) return;
        if (b.scrollIntoView) b.scrollIntoView({ behavior: 'smooth', block: 'center' });
        try { b.focus({ preventScroll: true }); } catch (e) { /* bỏ qua */ }
        b.style.boxShadow = '0 0 0 3px rgba(245,158,11,.35)';
        setTimeout(() => { b.style.boxShadow = ''; }, 2500);
    }, 250);
    // Lịch sử xử lý: gộp các bước Trình ký / Ký duyệt / Từ chối / Ban hành Phiếu tiếp nhận theo thời gian
    const p = p0;
    if (p && (p.history || []).length) {
        const rec = W.getRecord(c.code);
        const list = (isFlow(p) ? p.history.concat((rec && rec.history) || []) : ((rec && rec.history) || []).concat(p.history)).map((h, i) => ({ h, i })).sort((x, y) => (toTime(x.h.at) - toTime(y.h.at)) || (x.i - y.i)).map(x => x.h);
        const hh = el('wfHistory');
        if (hh) hh.innerHTML = W.renderHistoryHtml({ history: list });
        const ib = el('wfInfoBlock'); if (ib) ib.style.display = 'block';
    }
}
// MH03: nút Ký duyệt / Từ chối tại thanh thao tác; chỉ cho phép khi Lãnh đạo thuộc Nhóm lãnh đạo của cấp đang ký duyệt
// [mh03btn] MH03: chỉ hiển thị khi được phép; không đủ điều kiện thì không hiển thị (không hiển thị mờ / disabled)
const LD_DENY = ' - Chỉ khả dụng khi hồ sơ Chờ duyệt tiếp nhận và người dùng thuộc Nhóm lãnh đạo của cấp đang ký duyệt Phiếu tiếp nhận';
function isLeaderMe() { try { return !!(global.BTNN_LD && global.BTNN_LD.isLeaderUser(me())); } catch (e) { return false; } }
function setDetailBtn(b, visible, can, title) {
    b.style.display = visible ? 'inline-flex' : 'none';
    b.disabled = !can;
    b.classList.toggle('disabled-action', !can);
    b.style.opacity = can ? '' : '0.5';
    b.style.cursor = can ? '' : 'not-allowed';
    b.title = can ? title : title + LD_DENY;
}
function ldDetailButtons(code, show) {
    const back = el('btnFormBack');
    if (!back) return;
    let ok = el('ptnBtnApprove'), no = el('ptnBtnReject');
    if (!ok) {
        ok = document.createElement('button'); ok.id = 'ptnBtnApprove'; ok.className = 'btn btn-primary'; ok.style.display = 'none';
        ok.innerHTML = '<i class="fa-solid fa-file-signature"></i> Ký duyệt';
        no = document.createElement('button'); no.id = 'ptnBtnReject'; no.className = 'btn btn-danger'; no.style.cssText = 'display:none; background-color:#ef4444; color:#fff; border:none;';
        no.innerHTML = '<i class="fa-solid fa-ban"></i> Từ chối';
        back.parentNode.insertBefore(ok, back.nextSibling);
        back.parentNode.insertBefore(no, ok.nextSibling);
    }
    const can = !!code && canActCode(code);
    setDetailBtn(ok, can, can, 'Ký duyệt Phiếu tiếp nhận');
    setDetailBtn(no, can, can, 'Từ chối Phiếu tiếp nhận');
    ok.onclick = () => { if (can) ldOpen(code, 'approve', afterPageAction); };
    no.onclick = () => { if (can) ldOpen(code, 'reject', afterPageAction); };
}
// Sau khi Lãnh đạo Ký duyệt / Từ chối tại trang Tiếp nhận hồ sơ: tải lại danh sách và màn chi tiết đang mở
function afterPageAction() {
    const cur = typeof editingId !== 'undefined' ? editingId : null;
    const ro = typeof isFormReadOnly !== 'undefined' && isFormReadOnly;
    try { if (typeof global.afterLeaderAction === 'function') global.afterLeaderAction(); } catch (e) { /* bỏ qua */ }
    const fv = el('formView');
    if (cur && ro && fv && fv.style.display !== 'none' && typeof global.openReceptionForm === 'function') global.openReceptionForm(cur, true);
}
// Nút Ký duyệt / Từ chối trên lưới Tiếp nhận hồ sơ (giả lập Lãnh đạo, cả 02 tab)
// [tnld2] Luôn hiển thị, cố định vị trí; chỉ cho phép khi hồ sơ Chờ duyệt tiếp nhận và người dùng thuộc Nhóm lãnh đạo của cấp đang ký duyệt; trường hợp khác hiển thị mờ
function gridLeaderButtonsHtml(item, offStyle) {
    if (!item) return '';
    const can = canActCode(item.code);
    const off = offStyle || 'opacity:0.35; pointer-events:none; cursor:not-allowed;';
    const c = esc(String(item.code).replace(/'/g, "\\'"));
    const btn = (cls, act, label, icon) => `<button class="icon-btn ${cls}${can ? '' : ' disabled-action'}" data-ld="${act}" title="${esc(can ? label : label + LD_DENY)}" style="${can ? '' : off}" onclick="event.stopPropagation(); PTN.ldOpen('${c}','${act}', PTN._after)"><i class="fa-solid ${icon}"></i></button>`;
    return btn('accept', 'approve', 'Ký duyệt Phiếu tiếp nhận', 'fa-file-signature') + btn('delete', 'reject', 'Từ chối Phiếu tiếp nhận', 'fa-ban');
}
function viewIssued(code) { openDoc(get(code)); }
// Gắn vào trang Tiếp nhận hồ sơ: mở MH02/MH03 xong thì dựng khối Phiếu tiếp nhận
function hookReceptionPage() {
    const orig = global.openReceptionForm;
    if (typeof orig !== 'function' || orig.__ptn) return;
    const wrapped = function (id, isReadOnly) {
        const r = orig.apply(this, arguments);
        try { renderDetail(id, !!isReadOnly); } catch (e) { /* bỏ qua */ }
        return r;
    };
    wrapped.__ptn = true;
    global.openReceptionForm = wrapped;
    // Dữ liệu mẫu chưa có nội dung văn bản: sinh theo Mẫu 02/BTNN từ hồ sơ tiếp nhận
    const m = loadAll(); let dirty = false;
    Object.keys(m).forEach(code => {
        const p = m[code];
        if (p.method === 'Ký số' && p.docFile && p.docFile.generated && !p.docHtml) {
            const c = ((typeof claimsList !== 'undefined' && Array.isArray(claimsList)) ? claimsList : []).find(x => x.code === code && !x.deleted);
            if (c) { p.docHtml = buildDocHtml(c, p.meta ? Object.assign({ signerId: isFlow(p) ? (p.status === ST.DONE ? p.signedBy : '') : ((p.assignees || []).slice(-1)[0] || '') }, p.meta) : null); dirty = true; }
        }
    });
    if (dirty) saveAll(m);
}

// ======================= Lãnh đạo: Việc chờ Lãnh đạo xử lý =======================
function hookLeaderWork() {
    const orig = W.getLeaderWork;
    if (typeof orig !== 'function' || orig.__ptn) return;
    const wrapped = function (userId) {
        const res = orig.apply(this, arguments);
        const uid = userId || W.getCurrentUserId();
        const all = loadAll();
        Object.keys(all).forEach(code => {
            const p = all[code];
            const base = { source: 'ptn', code, caseCode: code, ptn: p, rec: W.getRecord(code) || null, loaiYeuCau: p.loaiYeuCau || W.REQUEST_TYPE_YCBT, nguonHoSo: W.SOURCES.TIEP_NHAN, nycName: p.nycName || '', status: isFlow(p) ? recStatusOf(code) : p.status, kind: KIND, type: W.WORK_TYPES.PHE_DUYET };
            if (canAct(p, uid)) {
                const a = p.approval;
                const step = a.steps[a.steps.length - 1];
                res.pending.push(Object.assign({}, base, { key: 'ptn:' + code, detail: `Ký duyệt: ${KIND} - cấp ${a.level + 1}/${a.path.length}`, who: step ? `${W.userName(step.userId)} (${W.unitName(step.unitId)})` : `${W.userName(p.submittedBy)} - Cán bộ tiếp nhận`, at: step ? step.at : p.submittedAt }));
            }
            (p.history || []).forEach((h, i) => {
                if (h.userId !== uid || !/^(Ký duyệt|Từ chối)/.test(h.action)) return;
                res.done.push(Object.assign({}, base, { key: `ptnh:${code}:${i}`, action: h.action, detail: `${h.action}${h.note ? ': ' + h.note : ''}`, who: h.userName, at: h.at, history: h }));
            });
        });
        res.pending.sort((a, b) => toTime(b.at) - toTime(a.at));
        res.done.sort((a, b) => toTime(b.at) - toTime(a.at));
        return res;
    };
    wrapped.__ptn = true;
    W.getLeaderWork = wrapped;
}
function ldActionsHtml(t) {
    const c = esc(t.code);
    return canAct(t.ptn, W.getCurrentUserId()) ? `<button class="act success" onclick="event.stopPropagation(); PTN.ldOpen('${c}','approve')"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button><button class="act danger" onclick="event.stopPropagation(); PTN.ldOpen('${c}','reject')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : '';
}
let LD = null;
function ldHistoryHtml(p) {
    const list = (p.history || []).slice().reverse();
    if (!list.length) return '<div class="ptnld-hint">Chưa có lịch sử.</div>';
    return list.map(h => {
        const cls = /^Từ chối/.test(h.action) ? 'no' : 'done';
        const ini = String(h.userName || '').split(' ').filter(Boolean).slice(-2).map(s => s[0]).join('').toUpperCase();
        return `<div class="ptnld-hv ${cls}"><div class="ptnld-hv-step"><i class="fa-solid ${cls === 'no' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i></div><div class="ptnld-hv-av">${esc(ini)}</div><div class="ptnld-hv-main"><div class="ptnld-hv-head"><span class="ptnld-hv-name">${esc(h.userName)}</span><span class="ptnld-hv-time">${esc(h.at)}</span></div><div class="ptnld-hv-act ${cls === 'no' ? 'no' : 'ok'}">${esc(h.action)}</div>${h.note ? `<div class="ptnld-hv-msg">${esc(h.note)}</div>` : ''}</div></div>`;
    }).join('');
}
// mode: approve | reject | view
function ldOpen(code, mode, cb) {
    injectCss();
    const p = get(code);
    const uid = W.getCurrentUserId();
    if (!p) return;
    if (mode !== 'view' && !canAct(p, uid)) { toast('Phiếu tiếp nhận đã được xử lý bởi người khác. Danh sách đã được tải lại.', 'error'); if (typeof global.renderAll === 'function') global.renderAll(); return; }
    // [ptnxs] Phiếu tiếp nhận hồ sơ Xác định CQGQBT: màn Ký duyệt / Từ chối như Xác định CQGQBT
    if (isXs(p)) { ptxLdOpen(code, mode, cb); return; }
    LD = { code, mode, cb };
    const old = el('ptnLdOverlay'); if (old) old.remove();
    const a = p.approval;
    const approve = mode === 'approve', reject = mode === 'reject';
    const last = a && a.level >= a.path.length - 1;
    const row = (k, v) => `<div class="ptnld-row"><span>${esc(k)}</span><span>${v}</span></div>`;
    const f = p.method === 'Ký ngoài' ? { name: p.signedFile } : (p.docFile || {});
    const preview = p.method !== 'Ký ngoài' && f.generated && p.docHtml
        ? `<div style="background:#fff; width:794px; max-width:100%; min-height:1060px; margin:0 auto; padding:56px 64px; box-sizing:border-box;">${p.docHtml}</div>`
        : `<div class="ptnld-uploaded"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#64748b;"></i><br><br>${esc(f.name || '--')}<br>(Văn bản tải lên)<br><br><button type="button" class="btn btn-secondary btn-sm" onclick="PTN.viewIssued('${esc(code)}')"><i class="fa-solid fa-eye"></i> Xem file</button></div>`;
    const tl = typeof global.tlktViewHtml === 'function' ? global.tlktViewHtml(p.attachments || [], { boxClass: 'ptnld-box', titleClass: 'ptnld-box-title' }) : '';
    const flow = isFlow(p);
    const nextWho = a && !last ? nextLevelText(a) : '';
    const signBox = approve ? `<div class="ptnld-sign"><b>Hình thức ký:</b> Ký số trên hệ thống<br>${last ? 'Cấp ký duyệt cuối cùng: hệ thống ký số Phiếu tiếp nhận bằng chứng thư số của <b>' + esc(W.userLabel(uid)) + '</b> (giả lập). Phiếu tiếp nhận chuyển [Đã ban hành].' + (flow ? ' Hồ sơ chuyển [' + REC_ST.ASSIGN + '], chuyển Lãnh đạo ' + esc(W.unitName(p.rootUnitId)) + ' phân công theo luồng đã cấu hình.' : '') : 'Ký duyệt cấp hiện tại; Phiếu tiếp nhận chuyển Lãnh đạo cấp tiếp theo: <b>' + esc(nextWho) + '</b>.'}</div>` : '';
    const input = approve
        ? `<div class="ptnld-group"><label class="ptnld-label" for="ptnLdNote">Ý kiến ký duyệt</label><textarea class="ptnld-input" id="ptnLdNote" rows="4" maxlength="2000" placeholder="Nhập ý kiến ký duyệt..."></textarea></div>`
        : reject ? `<div class="ptnld-group"><label class="ptnld-label" for="ptnLdNote">Lý do từ chối<span class="ptnld-req">*</span></label><textarea class="ptnld-input" id="ptnLdNote" rows="4" maxlength="2000" placeholder="Nhập lý do từ chối..." oninput="this.classList.remove('is-invalid'); document.getElementById('ptnLdNoteErr').style.display='none';"></textarea><div class="ptnld-err" id="ptnLdNoteErr">${MSG_REQ}</div><div class="ptnld-hint">${flow ? 'Sau khi từ chối, hồ sơ chuyển [' + REC_ST.REJECT + '] cho Cán bộ tiếp nhận cập nhật, trình lại.' : 'Sau khi từ chối, Phiếu tiếp nhận chuyển [Bị trả lại] cho Cán bộ tiếp nhận cập nhật, trình lại.'}</div></div>` : '';
    const can = canAct(p, uid);
    const foot = approve ? `<button type="button" class="btn btn-secondary" onclick="PTN.ldClose()">Hủy bỏ</button><button type="button" class="btn btn-primary" onclick="PTN.ldSubmit()"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>`
        : reject ? `<button type="button" class="btn btn-secondary" onclick="PTN.ldClose()">Hủy bỏ</button><button type="button" class="btn btn-danger" style="background:#ef4444; color:#fff; border:none;" onclick="PTN.ldSubmit()"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button>`
        : `<button type="button" class="btn btn-secondary" onclick="PTN.ldClose()">Đóng</button>${can && LD.cb !== 'done' ? `<button type="button" class="btn btn-danger" style="background:#ef4444; color:#fff; border:none;" onclick="PTN.ldOpen('${esc(code)}','reject')"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button><button type="button" class="btn btn-primary" onclick="PTN.ldOpen('${esc(code)}','approve')"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>` : ''}`;
    const ov = document.createElement('div');
    ov.className = 'ptnld-overlay'; ov.id = 'ptnLdOverlay';
    ov.innerHTML = `<div class="ptnld-modal">
        <div class="ptnld-head"><h3><i class="fa-solid fa-file-signature"></i> ${approve ? 'Ký duyệt' : reject ? 'Từ chối' : 'Chi tiết'} Phiếu tiếp nhận hồ sơ ${esc(p.maVuViec || code)}</h3><button type="button" class="ptnld-x" onclick="PTN.ldClose()">&times;</button></div>
        <div class="ptnld-body">
            <div class="ptnld-preview"><div class="ptnld-doc-bar"><span>${esc(f.name || '--')}</span></div><div style="flex:1; overflow:auto;">${preview}</div></div>
            <div class="ptnld-right">
                <div class="ptnld-box"><div class="ptnld-box-title">Thông tin trình ký</div>
                    ${row('Loại trình', esc(KIND))}
                    ${row('Mã vụ việc', `<b>${esc(p.maVuViec || code)}</b>`)}
                    ${row('Người yêu cầu', esc(p.nycName || '--'))}
                    ${row('Hình thức tiếp nhận', esc(p.nopKenh || '--'))}
                    ${flow ? row('Trạng thái hồ sơ', W.statusBadge(recStatusOf(code))) : row('Trạng thái', statusBadge(p.status))}
                    ${p.method === 'Ký số' ? row('Cán bộ trình', `${esc(W.userName(p.submittedBy))} - ${esc(p.submittedAt || '')}`) : ''}
                    ${a ? row('Cấp ký duyệt', `${a.level + 1}/${a.path.length} - ${esc(W.unitName(a.path[a.level]))}`) : ''}
                    ${p.content ? row('Nội dung trình', esc(p.content)) : ''}
                </div>
                ${tl}
                <div class="ptnld-box hist"><div class="ptnld-box-title">Lịch sử trình ký</div>${ldHistoryHtml(p)}</div>
                ${signBox}${input}
            </div>
        </div>
        <div class="ptnld-foot">${foot}</div>
    </div>`;
    document.body.appendChild(ov);
}
// Lãnh đạo của một cấp ký duyệt: Lãnh đạo được chọn khi trình (phiếu cũ) hoặc Nhóm lãnh đạo của cấp theo luồng đã cấu hình
function levelText(a, i) {
    const who = (a.assignees || [])[i];
    if (who) return W.userLabel(who);
    const grp = (a.leaders || [])[i] || W.getLeaders(a.path[i]);
    return `${grp.map(W.userName).join(', ')} - ${W.unitName(a.path[i])}`;
}
function nextLevelText(a) { return levelText(a, a.level + 1); }
function workStatusHtml(t) { return t && isFlow(t.ptn) ? W.statusBadge(recStatusOf(t.code)) : statusBadge(t && t.ptn ? t.ptn.status : ''); }
function ldClose() { const o = el('ptnLdOverlay'); if (o) o.remove(); }
function ldSubmit() {
    const p = get(LD.code);
    const uid = W.getCurrentUserId();
    if (!canAct(p, uid)) { ldClose(); toast('Phiếu tiếp nhận đã được xử lý bởi người khác. Danh sách đã được tải lại.', 'error'); ldDone(); return; }
    const noteEl = el('ptnLdNote');
    const note = noteEl ? noteEl.value.trim() : '';
    const a = p.approval;
    if (LD.mode === 'reject') {
        if (!note) { noteEl.classList.add('is-invalid'); el('ptnLdNoteErr').style.display = 'block'; noteEl.focus(); return; }
        p.status = ST.REJECT; p.reason = note; p.rejectedBy = uid; p.rejectedAt = W.nowText();
        a.steps.push({ level: a.level, unitId: a.path[a.level], userId: uid, at: p.rejectedAt, result: 'Từ chối', note });
        hist(p, 'Từ chối Phiếu tiếp nhận', `Cấp ${a.level + 1}/${a.path.length} - ${W.unitName(a.path[a.level])}. Lý do: ${note}`, uid);
        put(p); ldClose();
        if (isFlow(p)) updateClaim(p.code, x => { x.status = REC_ST.REJECT; });
        toast(`Đã từ chối Phiếu tiếp nhận hồ sơ ${p.maVuViec}. ${isFlow(p) ? 'Hồ sơ chuyển [' + REC_ST.REJECT + '].' : 'Phiếu tiếp nhận chuyển [' + ST.REJECT + '].'}`, 'success');
        ldDone(); return;
    }
    const at = W.nowText();
    a.steps.push({ level: a.level, unitId: a.path[a.level], userId: uid, at, result: 'Ký duyệt', note });
    const last = a.level >= a.path.length - 1;
    if (last) {
        p.status = ST.DONE; p.signedAt = at; p.signedBy = uid; p.issuedAt = at;
        p.digitalSign = { by: uid, at };
        if (isFlow(p)) p.docHtml = signDoc(p.docHtml, uid);
        hist(p, 'Ký duyệt Phiếu tiếp nhận', `Cấp ${a.level + 1}/${a.path.length} - ${W.unitName(a.path[a.level])}; ký số và ban hành.${note ? ' Ý kiến: ' + note : ''}`, uid);
    } else {
        hist(p, 'Ký duyệt Phiếu tiếp nhận', `Cấp ${a.level + 1}/${a.path.length} - ${W.unitName(a.path[a.level])}; chuyển ${nextLevelText(a)}.${note ? ' Ý kiến: ' + note : ''}`, uid);
        a.level += 1;
    }
    put(p); ldClose();
    const rel = last && isFlow(p) ? release(p) : null;
    toast(last ? `Đã ký duyệt Phiếu tiếp nhận hồ sơ ${p.maVuViec}. ${isFlow(p) ? 'Hồ sơ chuyển [' + ((rel && rel.status) || REC_ST.ASSIGN) + '], chuyển Lãnh đạo ' + W.unitName(p.rootUnitId) + ' phân công.' : 'Phiếu tiếp nhận chuyển [' + ST.DONE + '].'}` : `Đã ký duyệt Phiếu tiếp nhận hồ sơ ${p.maVuViec}, chuyển ${levelText(a, a.level)} ký duyệt.`, 'success');
    ldDone();
}
function ldDone() {
    if (LD && typeof LD.cb === 'function') LD.cb();
    else if (typeof global.renderAll === 'function') global.renderAll();
}
function ldOpenWork(t, tab) { ldOpen(t.code, 'view', tab === 'done' ? 'done' : null); }

// ======================= Dữ liệu mẫu (merge theo Mã hồ sơ) =======================
function seed() {
    let ver = '';
    try { ver = localStorage.getItem(SEED_KEY) || ''; } catch (e) { ver = ''; }
    if (ver === PTN_SEED_VER) return;
    const m = loadAll();
    const d = new Date();
    // Thời điểm mẫu = thời điểm khởi tạo dữ liệu (hồ sơ luồng mẫu cũng ghi nhận Tiếp nhận hồ sơ tại thời điểm khởi tạo) để Lịch sử xử lý đúng thứ tự
    const at = () => W.nowText(d);
    const day = () => (W.dateText ? W.dateText(d) : '');
    const H = (action, uid, t, note) => ({ action, userId: uid, userName: W.userName(uid), at: t, note, ptn: true });
    const SEED_NN = ['- Như trên;', '- Bộ Tư pháp (để biết);', '- Lưu: VT, HSVV.'].join('\n');
    const seeds = [
        // Qua dịch vụ bưu chính - Ký ngoài, Đã ban hành (dữ liệu trước Chốt 28/10)
        { code: 'VVBT-2026-003', maVuViec: 'VVBT-2026-003', nycName: 'Trần Minh Tuấn', nopKenh: RM.BUU_CHINH, loaiYeuCau: W.REQUEST_TYPE_YCBT, rootUnitId: 'BTP-01',
          status: ST.DONE, method: 'Ký ngoài', docNo: '15/TB-CĐK', docDate: day(2), offSigner: 'cuctruong', signedFile: 'Giay_tiep_nhan_VVBT-2026-003_da_ky.pdf', issuedAt: at(2, 14), issuedBy: 'canbonv', attachments: [], approval: null, reason: '',
          history: [H('Ban hành Phiếu tiếp nhận (Ký ngoài)', 'canbonv', at(2, 14), `Tệp đã ký & đóng dấu: Giay_tiep_nhan_VVBT-2026-003_da_ky.pdf.`)] }
    ].concat(tndSeedTickets(d));
    // [tnd] Phiếu mẫu cũ (Trình ký riêng, hồ sơ đã Chờ phân công) không còn phù hợp luồng Duyệt tiếp nhận: bỏ phiếu mẫu chưa bị người dùng thao tác thêm
    [['VVBT-2026-002', ST.REVIEW, 1], ['VVBT-2026-005', ST.REJECT, 2]].forEach(([code, st, n]) => {
        const x = m[code];
        if (x && !isFlow(x) && x.status === st && x.submittedBy === 'canbonv' && (x.history || []).length === n) delete m[code];
    });
    // Bản ghi mẫu đã có (phiên bản trước chưa có Thông tin điền vào Mẫu 02): bổ sung meta, sinh lại văn bản
    // [ptnxs] Phiếu mẫu Xác định CQGQBT phiên bản trước (chưa theo luồng Không thụ lý): thay bằng bản mới nếu chưa bị người dùng thao tác
    seeds.forEach(s => { const x = m[s.code]; if (s.xs && x && !x.xs && x.seed && (x.history || []).length <= 2) delete m[s.code]; });
    seeds.forEach(s => { if (!m[s.code]) m[s.code] = s; else if (s.meta && !m[s.code].meta && m[s.code].docSrc === 'gen') { m[s.code].meta = s.meta; m[s.code].docHtml = ''; } });
    saveAll(m);
    // Hồ sơ mẫu đã ký duyệt Phiếu tiếp nhận: tạo hồ sơ luồng Chờ phân công tại đơn vị gốc
    Object.keys(m).forEach(code => { const p = m[code]; if (isFlow(p) && p.status === ST.DONE && p.seed && !W.getRecord(code) && p.wfData) W.createPendingRecord(Object.assign({}, p.wfData, { historyNote: `Phiếu tiếp nhận đã được ký duyệt, ban hành. Chuyển lãnh đạo ${W.unitName(p.rootUnitId)} phân công xử lý.` })); });
    try { localStorage.setItem(SEED_KEY, PTN_SEED_VER); } catch (e) { /* bỏ qua */ }
}
// [tnd] Hồ sơ mẫu luồng Duyệt tiếp nhận (Cán bộ tiếp nhận Nguyễn Văn Cán Bộ - đơn vị gốc Bộ Tư pháp)
const TND_OFFICER = 'canbonv';
const TND_ROOT = 'BTP-01';
const TND_CASES = [
    { code: 'VVBT-2026-091', nyc: 'Phạm Thị Hồng Nhung', phone: '0915226688', method: RM.TRUC_TIEP, addr: 'Số 12 ngõ 45 Trần Duy Hưng', hanhVi: 'Ra quyết định xử phạt vi phạm hành chính không đúng thẩm quyền.', state: 'review1', docNo: '21/TB-BTP' },
    { code: 'VVBT-2026-092', nyc: 'Đặng Văn Quyết', phone: '0983114455', method: RM.BUU_CHINH, addr: 'Số 7 phố Hàng Bông', hanhVi: 'Tạm giữ phương tiện vi phạm hành chính quá thời hạn.', state: 'review2', docNo: '22/TB-BTP' },
    { code: 'VVBT-2026-093', nyc: 'Vũ Thị Mai Anh', phone: '0936778899', method: RM.TRUC_TIEP, addr: 'Số 3 ngõ 8 Nguyễn Khang', hanhVi: 'Cưỡng chế thi hành quyết định hành chính trái pháp luật.', state: 'reject', docNo: '23/TB-BTP' },
    { code: 'VVBT-2026-094', nyc: 'Bùi Quang Huy', phone: '0904332211', method: RM.TRUC_TIEP, addr: 'Số 25 Láng Hạ', hanhVi: 'Thu hồi giấy phép kinh doanh không đúng quy định.', state: 'done', docNo: '24/TB-BTP' },
    // [ptnxd] Loại hồ sơ Xác định CQGQBT: Phiếu tiếp nhận là tệp đính kèm (Ký số trên hệ thống), không sinh theo Mẫu 02/BTNN
    { code: 'VVBT-2026-095', nyc: 'Lê Thị Thu Hà', phone: '0912557799', method: RM.TRUC_TIEP, addr: 'Số 18 Nguyễn Chí Thanh', hanhVi: 'Chưa xác định được cơ quan quản lý người thi hành công vụ gây thiệt hại.', state: 'review1', xd: true },
    { code: 'VVBT-2026-096', nyc: 'Ngô Văn Thành', phone: '0977331155', method: RM.BUU_CHINH, addr: 'Số 9 phố Huế', hanhVi: 'Nhiều cơ quan cùng tham gia quản lý vụ việc gây thiệt hại.', state: 'reject', xd: true }
];
const TND_REJECT = 'Đề nghị bổ sung đầy đủ tên các giấy tờ đã tiếp nhận vào Phiếu tiếp nhận trước khi trình lại.';
function tndClaim(s, d) {
    const day = W.dateText ? W.dateText(d) : '';
    const doc = 'Văn bản yêu cầu bồi thường';
    const st = s.state === 'reject' ? REC_ST.REJECT : s.state === 'done' ? REC_ST.ASSIGN : REC_ST.REVIEW;
    return {
        id: 'TN_TND_' + s.code.slice(-3), code: s.code, maVuViec: s.code, nguonHoSo: W.SOURCES.TIEP_NHAN, requestType: s.xd ? XD_TYPE : W.REQUEST_TYPE_YCBT, requestKind: s.xd ? undefined : 'both',
        nyc: s.nyc, nycName: s.nyc, nycPhone: s.phone, nycRole: 'Người bị thiệt hại', nycType: 'Cá nhân', nycCountry: 'Việt Nam',
        rootUnitId: TND_ROOT, nopKenh: s.method, fieldGroup: 'hành chính', date: day, receivedAt: `${day} 08:30`, receivedBy: W.userName(TND_OFFICER),
        nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00007 - Phường Cầu Giấy', nycAddressDetail: s.addr, address: s.addr, vanBanCanCu: [], vuViecLienQuan: '', hanhVi: s.hanhVi,
        status: st, agency: W.unitName(TND_ROOT), totalNum: 0, advanceNum: 0, restoreHonor: false,
        receptionDocs: [{ name: doc, file: `Van_ban_yeu_cau_boi_thuong_${s.code}.pdf` }], files: [{ name: `Van_ban_yeu_cau_boi_thuong_${s.code}.pdf`, url: '#' }],
        timeline: [{ title: 'Tiếp nhận hồ sơ', date: day, desc: `Đã tiếp nhận thông tin ban đầu. Trạng thái: ${REC_ST.REVIEW}.`, status: 'completed' }]
    };
}
function tndWfData(c) {
    return {
        id: 'WF-' + c.code, code: c.code, loaiYeuCau: c.requestType, requestKind: c.requestKind, module: noTpl(c) ? 'XD' : 'YCBT', source: 'Tiếp nhận', nguonHoSo: W.SOURCES.TIEP_NHAN,
        maVuViec: c.maVuViec, vuViecLienQuan: '', hinhThucTiepNhan: c.nopKenh, rootUnitId: c.rootUnitId, receivedAt: W.nowText(), date: c.date,
        receivedBy: c.receivedBy, createdBy: TND_OFFICER, nycName: c.nyc, nycPhone: c.nycPhone, nycRole: c.nycRole, nycType: c.nycType, nycCountry: c.nycCountry,
        nycTinhThanh: c.nycTinhThanh, nycPhuongXa: c.nycPhuongXa, nycAddressDetail: c.nycAddressDetail, linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: c.hanhVi,
        hinhThucNhan: 'Phương thức điện tử', attachedDocs: c.receptionDocs.slice(), vanBanCanCu: [], procBasis: '', procTargetAgency: '', procReason: '', procDecisionFile: '', claimCode: '-'
    };
}
function tndSeedTickets(d) {
    const at = W.nowText(d);
    const H = (action, uid, note) => ({ action, userId: uid, userName: W.userName(uid), at, note, ptn: true });
    const NN = ['- Như trên;', `- ${W.unitName(TND_ROOT)} (để biết);`, '- Lưu: VT, HSVV.'].join('\n');
    return TND_CASES.map(s => {
        const c = tndClaim(s, d);
        const lv = levelsOf(c, TND_OFFICER);
        const path = lv.length ? lv.map(l => l.unitId) : ['PLN-02', 'CĐK-01'];
        const leaders = lv.length ? lv.map(l => l.leaders.slice()) : [['tpbt'], ['cuctruong', 'cucpho']];
        const l1 = leaders[0][0] || 'tpbt', l2 = (leaders[1] || [])[0] || 'cuctruong';
        const p = Object.assign(baseRecord({ code: c.code, maVuViec: c.code, nyc: c.nyc, nopKenh: c.nopKenh, requestType: c.requestType, rootUnitId: c.rootUnitId }, null), {
            flow: FLOW, seed: true, status: ST.REVIEW, method: 'Ký số', docSrc: 'gen', docFile: { name: docBaseName(c.code) + '.pdf', generated: true }, docHtml: '',
            meta: { docNo: s.docNo, docDate: c.date, noiNhan: NN }, assignees: [], content: '', attachments: [], submittedBy: TND_OFFICER, submittedAt: at, reason: '',
            wfData: tndWfData(c), returns: [], approval: { kind: KIND, path, assignees: [], leaders, level: 0, steps: [] },
            history: [H('Trình ký Phiếu tiếp nhận', TND_OFFICER, `Hệ thống sinh Phiếu tiếp nhận (Dự thảo) theo Mẫu 02/BTNN, trình Lãnh đạo ký duyệt theo luồng đã cấu hình: ${pathText(path)}. Hồ sơ chuyển [${REC_ST.REVIEW}].`)]
        });
        // [ptnxd] Hồ sơ Xác định CQGQBT: tệp Phiếu tiếp nhận đính kèm khi trình (Ký số trên hệ thống), không sinh theo Mẫu 02/BTNN
        // [ptnxs] Luồng trình như Không thụ lý - Xác định CQGQBT: Lãnh đạo cấp 1 / cấp cuối do cán bộ chọn, vị trí ô ký, lịch sử "Trình phê duyệt"
        if (s.xd) {
            const asg = path.map((u, i) => (i === 0 ? l1 : (i === path.length - 1 ? l2 : '')));
            const content = 'Kính trình Lãnh đạo ký duyệt Phiếu tiếp nhận hồ sơ xác định cơ quan giải quyết bồi thường.';
            const nextText = path.length > 1 ? ' Lãnh đạo cấp tiếp theo: ' + path.slice(1).map((u, i) => (asg[i + 1] ? W.userName(asg[i + 1]) + ' - ' : '') + W.unitName(u)).join('; ') + '.' : '';
            Object.assign(p, {
                xs: true, noTpl: true, docSrc: 'upload', docFile: { name: `Phieu_tiep_nhan_${c.code}.pdf`, generated: false, size: '245 KB', note: '', keepId: '' }, meta: null,
                enableRoomSig: true, sigCoords: PTX_SIG(), assignees: asg.slice(), content,
                history: [H('Trình phê duyệt', TND_OFFICER, `${KIND}. Trình ${W.userName(l1)} - ${W.unitName(path[0])}.${nextText} Nội dung: ${content}`)]
            });
            p.approval.assignees = asg.slice();
        }
        const a = p.approval;
        const sign = (uid, lvl, last) => {
            a.steps.push({ level: lvl, unitId: path[lvl], userId: uid, at, result: 'Ký duyệt', note: '' });
            p.history.push(H('Ký duyệt Phiếu tiếp nhận', uid, last ? `Cấp ${lvl + 1}/${path.length} - ${W.unitName(path[lvl])}; ký số và ban hành.` : `Cấp ${lvl + 1}/${path.length} - ${W.unitName(path[lvl])}; chuyển ${levelText(a, lvl + 1)}.`));
        };
        if (s.state === 'review2' || s.state === 'done') { sign(l1, 0, path.length === 1); a.level = Math.min(1, path.length - 1); }
        if (s.state === 'done') {
            if (path.length > 1) sign(l2, 1, true);
            Object.assign(p, { status: ST.DONE, signedAt: at, signedBy: path.length > 1 ? l2 : l1, issuedAt: at });
        }
        if (s.state === 'reject') {
            Object.assign(p, { status: ST.REJECT, reason: TND_REJECT, rejectedBy: l1, rejectedAt: at });
            a.steps.push({ level: 0, unitId: path[0], userId: l1, at, result: s.xd ? 'Từ chối phê duyệt' : 'Từ chối', note: TND_REJECT });
            p.history.push(s.xd ? H('Từ chối phê duyệt', l1, `Trả lại Cán bộ tiếp nhận. Lý do: ${TND_REJECT}`) : H('Từ chối Phiếu tiếp nhận', l1, `Cấp 1/${path.length} - ${W.unitName(path[0])}. Lý do: ${TND_REJECT}`));
        }
        return p;
    });
}
// Hồ sơ tiếp nhận mẫu tương ứng (trang Tiếp nhận hồ sơ bổ sung bản ghi mẫu còn thiếu theo Mã hồ sơ)
function tndSeedClaims() { const d = new Date(); return TND_CASES.map(s => tndClaim(s, d)); }

// ======================= [ptnxs] Loại hồ sơ Xác định CQGQBT: luồng trình Phiếu tiếp nhận như Không thụ lý - Xác định CQGQBT =======================
// Popup Trình ký (markup, class, 02 bước, Ký ngoài) và màn Ký duyệt / Từ chối theo xac_dinh_co_quan_boi_thuong (openSignSubmitModal / xsSubmit)
// và btnn_lanh_dao_actions (openXdDecision); bỏ "Lý do không thụ lý". CSS chép từ xac_dinh_co_quan_boi_thuong.css / btnn_lanh_dao_actions.js, giới hạn trong #ptxModal / #ptxLdOverlay.
// Trạng thái / kết quả theo Tiếp nhận: Trình Lãnh đạo -> Chờ duyệt tiếp nhận; cấp cuối Ký duyệt / Ban hành (Ký ngoài) -> Chờ phân công + hồ sơ luồng XD; Từ chối -> Bị trả lại.
const PTX_CSS = `#ptxModal { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.4); display: none; align-items: center; justify-content: center; z-index: 9999; }
#ptxModal.visible { display: flex; }
#ptxModal .ptx-x { cursor: pointer; font-size: 22px; color: #94a3b8; line-height: 1; }
#ptxModal .error-message { display: none; color: #dc2626; font-size: 12px; margin-top: 4px; }
#ptxModal .form-control.is-invalid { border-color: #dc2626 !important; background: #fef2f2; }
#ptxModal .xs-modal-box { width: 1050px; max-width: 96vw; max-height: 94vh; display: flex; flex-direction: column; padding: 0; overflow: hidden; background: #fff; border-radius: 10px; }
#ptxModal .xs-modal-box.xs-wide { width: 100vw; max-width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; }
#ptxModal .xs-head { flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; padding: 16px 24px 12px; background: #f8fafc; border-bottom: 1px solid var(--border-color); }
#ptxModal .xs-head-title { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 700; color: var(--primary-color); }
#ptxModal .xs-head-title i { color: #2563eb; font-size: 18px; }
#ptxModal .xs-head-sub { font-size: 12.5px; color: #64748b; margin-top: 3px; }
#ptxModal .xs-head-sub strong { color: #0f172a; }
#ptxModal .xs-stepper { flex-shrink: 0; background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 12px 24px; display: flex; justify-content: center; align-items: center; gap: 14px; width: 100%; box-sizing: border-box; }
#ptxModal .xs-step { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13.5px; font-weight: 700; color: #64748b; }
#ptxModal .xs-stepper-divider { flex: 0 0 80px; height: 2px; background: #cbd5e1; margin: 0; }
#ptxModal #ptxStepperBar { height: 51px; overflow: hidden; transition: height .22s ease, padding .22s ease, opacity .18s ease, border-color .22s ease; }
#ptxModal #ptxStepperBar.is-collapsed { height: 0; padding-top: 0; padding-bottom: 0; opacity: 0; border-bottom-color: transparent; border-bottom-width: 0; pointer-events: none; }
#ptxModal .xs-sec { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 18px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(15,23,42,0.04); }
#ptxModal .xs-sec-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: .2px; margin: 0 0 14px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
#ptxModal .xs-sec-title > i { color: #2563eb; width: 16px; text-align: center; }
#ptxModal .xs-req { color: #dc2626; margin-left: -5px; }
#ptxModal .xs-sign-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 10px; align-items: stretch; }
#ptxModal .xs-sign-card { position: relative; display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; min-height: 58px; height: 100%; box-sizing: border-box; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 1px 2px rgba(0,0,0,0.03); margin: 0; }
#ptxModal .xs-sign-card:hover { border-color: #93c5fd; background: #f8fafc; }
#ptxModal .xs-sign-card.active { border-color: #2563eb; background: #eff6ff; box-shadow: 0 2px 6px rgba(37,99,235,0.1); }
#ptxModal .xs-sign-card input[type="radio"] { position: absolute; opacity: 0; pointer-events: none; }
#ptxModal .xs-sign-card-content { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
#ptxModal .xs-sign-card-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; background: #dbeafe; color: #1d4ed8; transition: all 0.2s; }
#ptxModal .xs-sign-card-icon.offline { background: #fef3c7; color: #b45309; }
#ptxModal .xs-sign-card.active .xs-sign-card-icon { transform: scale(1.05); }
#ptxModal .xs-sign-card-text { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 2px; }
#ptxModal .xs-sign-card-title { font-size: 13px; font-weight: 700; color: #1e293b; line-height: 1.35; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#ptxModal .xs-sign-card-desc { font-size: 12px; font-weight: 400; color: #64748b; line-height: 1.4; text-wrap: balance; }
#ptxModal .xs-sign-card.active .xs-sign-card-title { color: #1d4ed8; }
#ptxModal .xs-sign-card-check { font-size: 15px; color: #cbd5e1; margin-left: 8px; flex-shrink: 0; transition: all 0.2s; }
#ptxModal .xs-sign-card.active .xs-sign-card-check { color: #2563eb; }
@media (max-width: 640px)  { #ptxModal .xs-sign-cards-grid { grid-template-columns: 1fr; } }
#ptxModal .xs-drop { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 96px; box-sizing: border-box; padding: 14px 16px; border: 1.5px dashed #93c5fd; border-radius: 10px; background: #f8fbff; text-align: center; cursor: pointer; transition: border-color .15s, background .15s; }
#ptxModal .xs-drop:hover, #ptxModal .xs-drop.drag-over { border-color: #2563eb; background: #eff6ff; }
#ptxModal .xs-drop:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
#ptxModal .xs-drop.is-error { border-color: #dc2626; background: #fef2f2; }
#ptxModal .xs-drop-ico { font-size: 22px; color: #2563eb; }
#ptxModal .xs-drop-main { font-size: 13px; color: #334155; }
#ptxModal .xs-drop-main a { color: #2563eb; font-weight: 700; text-decoration: underline; cursor: pointer; }
#ptxModal .xs-drop-sub { font-size: 12px; color: #64748b; }
#ptxModal .xs-converting { display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 96px; box-sizing: border-box; border: 1.5px dashed #93c5fd; border-radius: 10px; background: #eff6ff; font-size: 13px; font-weight: 600; color: #1d4ed8; }
#ptxModal .xs-spinner { width: 18px; height: 18px; border: 2.5px solid #bfdbfe; border-top-color: #2563eb; border-radius: 50%; animation: ptxSpin .8s linear infinite; }
@keyframes ptxSpin { to { transform: rotate(360deg); } }
#ptxModal .xs-fcard { display: flex; align-items: center; gap: 12px; min-height: 96px; box-sizing: border-box; background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px 14px; }
#ptxModal .xs-fcard-ico { font-size: 30px; flex-shrink: 0; width: 32px; text-align: center; }
#ptxModal .xs-fcard-ico.pdf { color: #dc2626; } .xs-fcard-ico.word { color: #2563eb; }
#ptxModal .xs-fcard-info { flex: 1; min-width: 0; }
#ptxModal .xs-fcard-name { font-weight: 700; font-size: 13.5px; color: #1e293b; overflow-wrap: anywhere; }
#ptxModal .xs-fcard-meta { font-size: 12px; color: #64748b; margin-top: 3px; }
#ptxModal .xs-fcard-btns { display: flex; gap: 6px; flex-shrink: 0; }
#ptxModal .xs-fcard-btns .btn { min-width: 84px; justify-content: center; }
@media (max-width: 640px)  { #ptxModal .xs-fcard { flex-wrap: wrap; } }
#ptxModal .xs-status-note { margin-top: 12px; font-size: 12.5px; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 9px 12px; line-height: 1.55; }
#ptxModal #ptxFileBox .error-message { margin-top: 6px; }
#ptxModal .require-step-badge { width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; background: #cbd5e1; }
#ptxModal .xs-body { padding: 22px 28px; overflow-y: auto; flex: 1 1 auto; min-height: 0; text-align: left; }
#ptxModal .xs-method-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; margin-bottom: 18px; }
#ptxModal .xs-method-title { display: block; font-weight: 700; color: #1e293b; font-size: 13.5px; margin-bottom: 8px; }
#ptxModal .xs-radio { display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 600; font-size: 13.5px; color: #0f172a; }
#ptxModal .doc-upload-highlight { border: 2px dashed #3b82f6; background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%); border-radius: 8px; padding: 16px; }
#ptxModal .doc-upload-highlight.offline { border-color: #f59e0b; background: #fffbeb; }
#ptxModal .doc-upload-highlight .error-message { margin-top: 8px; }
#ptxModal .xs-file-ready { display: none; background: #fff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px 16px; align-items: center; justify-content: space-between; gap: 12px; }
#ptxModal .xs-step2 { display: none; flex: 1 1 auto; min-height: 0; overflow: hidden; flex-direction: row; }
#ptxModal .xs-canvas { flex: 1; background: #334155; overflow: auto; display: flex; justify-content: center; padding: 30px 20px; }
#ptxModal .a4-document-page { width: 794px; min-width: 794px; min-height: 1123px; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative; padding: 50px 65px; font-family: 'Times New Roman', Times, serif; font-size: 14px; line-height: 1.6; color: #111827; user-select: none; box-sizing: border-box; }
#ptxModal .xs-a4-file { position: absolute; top: 12px; right: 16px; font-family: Inter, sans-serif; font-size: 11px; color: #64748b; background: #f1f5f9; border-radius: 4px; padding: 2px 8px; }
#ptxModal .xs-a4-file i { color: #ef4444; }
#ptxModal .sig-drag-box { position: absolute; border-radius: 6px; cursor: move; user-select: none; display: flex; flex-direction: column; justify-content: space-between; padding: 8px 10px; font-family: Inter, sans-serif; box-sizing: border-box; min-width: 140px; min-height: 55px; }
#ptxModal .sig-drag-box:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.25) !important; }
#ptxModal .sig-drag-box.dragging { opacity: 0.92; z-index: 99; }
#ptxModal .sig-drag-box .sig-resize-handle { position: absolute; right: 0; bottom: 0; width: 18px; height: 18px; cursor: nwse-resize; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.08); border-top-left-radius: 5px; border-bottom-right-radius: 5px; }
#ptxModal .sig-drag-box .sig-resize-handle i { font-size: 10px; transform: rotate(90deg); opacity: 0.8; }
#ptxModal .xs-side { width: 420px; min-width: 420px; background: #f8fafc; border-left: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; text-align: left; }
#ptxModal .xs-sig-card { background: #fff; border: 1px solid #fecaca; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
#ptxModal .xs-mini { font-size: 10px !important; padding: 1px 6px !important; }
#ptxModal .xs-guide { margin-top: auto; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px; font-size: 12px; color: #1e40af; line-height: 1.5; }
#ptxModal .xs-foot { flex-shrink: 0; display: flex; justify-content: flex-end; align-items: center; padding: 14px 24px; border-top: 1px solid var(--border-color); background: #f8fafc; }
@media (max-width: 760px)  { #ptxModal .xs-modal-box { width: calc(100vw - 32px); } #ptxModal .xs-side { display: none; } }
#ptxModal textarea, #ptxModal input, #ptxModal select { font-family: inherit; }
#ptxLdOverlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: none; align-items: center; justify-content: center; z-index: 9500; }
#ptxLdOverlay.open { display: flex; }
#ptxLdOverlay .ld-modal { background: #fff; border-radius: 10px; width: 720px; max-width: 95vw; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 12px 32px rgba(0,0,0,0.2); font-family: Inter, system-ui, sans-serif; }
#ptxLdOverlay .ld-modal-header { padding: 18px 22px 12px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
#ptxLdOverlay .ld-modal-header h3 { margin: 0; font-size: 16px; color: #1e3a8a; display: flex; gap: 8px; align-items: center; }
#ptxLdOverlay .ld-modal-body { padding: 18px 22px; overflow-y: auto; flex: 1; font-size: 13.5px; color: #1e293b; }
#ptxLdOverlay .ld-modal.ld-xd-wide { width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; border-radius: 0; }
#ptxLdOverlay .ld-xd-wide #ptxLdBody { display: flex; gap: 18px; padding: 0; overflow: hidden; min-height: 0; }
#ptxLdOverlay .ld-xd-wide #ptxLdPreview { flex: 1; background: #334155; overflow: auto; padding: 18px; }
#ptxLdOverlay .ld-xd-wide #ptxLdRight { width: 480px; flex-shrink: 0; overflow-y: auto; padding: 16px 20px 16px 0; }
#ptxLdOverlay .ld-a4 { position: relative; background: #fff; width: 794px; min-height: 1060px; margin: 0 auto; padding: 56px 64px; box-shadow: 0 4px 16px rgba(0,0,0,.35); font-family: 'Times New Roman', serif; font-size: 14px; color: #111; transform-origin: top center; }
#ptxLdOverlay .ld-sigbox { position: absolute; border: 2px dashed #2563eb; background: rgba(239,246,255,.9); border-radius: 4px; font-family: Inter, sans-serif; font-size: 11px; padding: 4px 6px; color: #1e3a8a; }
#ptxLdOverlay .ld-sigbox.agency { border-color: #dc2626; background: rgba(254,242,242,.9); color: #991b1b; }
#ptxLdOverlay .ld-sigbox.done { border-style: solid; }
#ptxLdOverlay .ld-hist { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #f8fafc; }
#ptxLdOverlay .ld-hist-title { font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px; }
#ptxLdOverlay .ld-hist-node { border-left: 2px solid #cbd5e1; padding: 2px 0 8px 12px; margin-left: 6px; position: relative; font-size: 12.5px; }
#ptxLdOverlay .ld-hist-node::before { content: ''; position: absolute; left: -6px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: #94a3b8; }
#ptxLdOverlay .ld-hist-node.root::before { background: #2563eb; } .ld-hist-node.ok::before { background: #16a34a; } .ld-hist-node.no::before { background: #dc2626; } .ld-hist-node.wait::before { background: #f59e0b; }
#ptxLdOverlay .ld-hist-child { margin-left: 18px; }
#ptxLdOverlay .ld-sum { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #fff; }
#ptxLdOverlay .ld-sum-row { display: grid; grid-template-columns: 110px 1fr; gap: 8px; font-size: 13px; padding: 3px 0; }
#ptxLdOverlay .ld-sum-row > span:first-child { color: #64748b; }
#ptxLdOverlay .ld-gate { display: flex; justify-content: space-between; gap: 8px; align-items: flex-start; }
#ptxLdOverlay .ld-gate-badge { font-size: 11px; font-weight: 600; padding: 1px 8px; border-radius: 10px; white-space: nowrap; }
#ptxLdOverlay .ld-gate-badge.ok { background: #dcfce7; color: #15803d; } .ld-gate-badge.no { background: #fee2e2; color: #b91c1c; } .ld-gate-badge.wait { background: #fef3c7; color: #b45309; } .ld-gate-badge.todo { background: #f1f5f9; color: #64748b; }
#ptxLdOverlay .ld-hist-node.todo::before { background: #e2e8f0; }
#ptxLdOverlay .ld-hv { display: flex; gap: 10px; padding: 0; }
#ptxLdOverlay .ld-hv-step { width: 22px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding-top: 8px; }
#ptxLdOverlay .ld-hv-step > i { font-size: 18px; line-height: 20px; background: #f8fafc; border-radius: 50%; }
#ptxLdOverlay .ld-hv-step::after { content: ''; flex: 1; width: 2px; margin-top: 3px; background: #22c55e; }
#ptxLdOverlay .ld-hv:last-child .ld-hv-step::after { display: none; }
#ptxLdOverlay .ld-hv.done .ld-hv-step > i { color: #22c55e; } .ld-hv.no .ld-hv-step > i { color: #dc2626; } .ld-hv.wait .ld-hv-step > i { color: #f59e0b; } .ld-hv.todo .ld-hv-step > i { color: #cbd5e1; }
#ptxLdOverlay .ld-hv.todo .ld-hv-step::after { background: #e2e8f0; }
#ptxLdOverlay .ld-hv > .ld-hv-av { margin-top: 6px; }
#ptxLdOverlay .ld-hv-main { padding: 8px 0 14px; }
#ptxLdOverlay .ld-hv-av { width: 36px; height: 36px; border-radius: 50%; background: #eef2f7; color: #475569; font-size: 11.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
#ptxLdOverlay .ld-hv-main { flex: 1; min-width: 0; }
#ptxLdOverlay .ld-hv-head { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }
#ptxLdOverlay .ld-hv-name { font-weight: 600; color: #0f172a; font-size: 13.5px; }
#ptxLdOverlay .ld-hv-time { color: #94a3b8; font-size: 12px; white-space: nowrap; }
#ptxLdOverlay .ld-hv-sub { color: #64748b; font-size: 12px; }
#ptxLdOverlay .ld-hv-act { font-size: 13px; margin-top: 2px; color: #2563eb; }
#ptxLdOverlay .ld-hv-act strong { color: #0f172a; font-weight: 500; }
#ptxLdOverlay .ld-hv-act.ok { color: #16a34a; } .ld-hv-act.no { color: #dc2626; } .ld-hv-act.wait { color: #d97706; } .ld-hv-act.todo { color: #94a3b8; }
#ptxLdOverlay .ld-hv-msg { margin-top: 6px; background: #f1f5f9; border-radius: 6px; padding: 8px 10px; font-size: 13px; color: #1e293b; white-space: pre-wrap; }
#ptxLdOverlay .ld-hv-round { display: flex; justify-content: space-between; align-items: center; margin: 8px 0 0; padding: 4px 8px; background: #f8fafc; border-radius: 6px; font-size: 12px; color: #475569; font-weight: 600; }
#ptxLdOverlay .ld-modal-footer { padding: 14px 22px 18px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; background: #f8fafc; border-radius: 0 0 10px 10px; }
#ptxLdOverlay .ld-close { cursor: pointer; font-size: 20px; color: #64748b; }
#ptxLdOverlay .ld-label { display: block; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #334155; }
#ptxLdOverlay .ld-req { color: #dc2626; margin-left: 2px; }
#ptxLdOverlay .ld-group { margin-bottom: 14px; }
#ptxLdOverlay .ld-input { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font: inherit; font-size: 13.5px; }
#ptxLdOverlay .ld-radio { display: flex; gap: 20px; margin: 6px 0 12px; }
#ptxLdOverlay .ld-radio label, #ptxLdOverlay .ld-check label { display: inline-flex; gap: 6px; align-items: center; cursor: pointer; font-weight: 500; }
#ptxLdOverlay .ld-check { display: flex; flex-direction: column; gap: 6px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; max-height: 180px; overflow-y: auto; }
#ptxLdOverlay .ld-err { color: #dc2626; font-size: 12px; margin-top: 4px; display: none; }
#ptxLdOverlay .ld-hint { color: #64748b; font-size: 12px; margin-top: 4px; }
#ptxLdOverlay .ld-muted { color: #64748b; font-size: 12.5px; }`;
const PTX_DOC_TITLE = 'PHIẾU TIẾP NHẬN HỒ SƠ YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG';
const PTX_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
const PTX_REQ_TOAST = 'Vui lòng nhập đầy đủ thông tin bắt buộc!';
const PTX_SIG = () => ({ room: { x: 60, y: 860, w: 220, h: 90 }, agency: { x: 480, y: 860, w: 245, h: 110 } });
function isXs(p) { return !!p && !!p.xs; }
let X = null;
function ptxCss() {
    injectCss();
    if (el('ptx-css')) return;
    const s = document.createElement('style'); s.id = 'ptx-css'; s.textContent = PTX_CSS; document.head.appendChild(s);
}
function ptxEnsure() {
    ptxCss();
    if (el('ptxModal')) return;
    const m = document.createElement('div');
    m.id = 'ptxModal';
    const card = (id, val, icon, off, title, desc, on) => `<label class="xs-sign-card${on ? ' active' : ''}" id="${id}"><input type="radio" name="ptxMethod" value="${val}"${on ? ' checked' : ''} onchange="PTN.x.setMethod('${val}')"><div class="xs-sign-card-content"><div class="xs-sign-card-icon${off ? ' offline' : ''}"><i class="fa-solid ${icon}"></i></div><div class="xs-sign-card-text"><div class="xs-sign-card-title">${title}</div><div class="xs-sign-card-desc">${desc}</div></div></div><div class="xs-sign-card-check"><i class="${on ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i></div></label>`;
    const lvCard = (k, K, border, left, color, placeLbl) => `<div id="ptxPanel${K}Card" style="background:#fff; border:1px solid ${border}; border-left:4px solid ${left}; border-radius:8px; padding:12px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;"><span style="font-size:12.5px; font-weight:700; color:${color};" id="ptxPanel${K}Unit"></span><span class="badge" id="ptx${K}KyNhayBadge" style="display:none; background:#dbeafe; color:#1e40af; font-size:10.5px; white-space:nowrap;">Ký nháy</span></div>
            <div class="form-group" style="margin-bottom:8px;" id="ptxOfficer${K}Group"><select id="ptxOfficer${K}Select" class="form-control" style="font-size:13px;" onchange="PTN.x.syncNames(); PTN.x.clearSel(this)"></select><div id="ptxOfficer${K}Error" class="error-message">Đây là trường bắt buộc</div></div>
            ${k === 'room' ? `<label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:12.5px; color:#1e40af; margin:0 0 6px 0;"><input type="checkbox" id="ptxEnableRoomSig" checked onchange="PTN.x.toggleRoom(this.checked)"><span>Áp dụng ký nháy Lãnh đạo cấp 1</span></label>` : ''}
            <button type="button" class="btn btn-secondary btn-sm" id="ptxBtnPlace${K}" onclick="PTN.x.place('${k}')" style="font-size:12px;"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button><div id="ptxPlace${K}Err" class="error-message">Chưa đặt chữ ký</div>
            <div id="ptxPanel${K}Ctrls" style="display:none;"><div style="font-size:11px; color:#94a3b8; margin-bottom:6px;" id="ptxPanel${K}Coord">Trang 1</div>
                <div style="display:flex; gap:4px; align-items:center;">${placeLbl}</div></div>
        </div>`;
    const sz = (k, a, b, c, x, y) => `<button type="button" class="btn btn-secondary btn-sm xs-mini" onclick="PTN.x.resize('${k}', ${a[0]}, ${a[1]})">Nhỏ</button><button type="button" class="btn btn-secondary btn-sm xs-mini" onclick="PTN.x.resize('${k}', ${b[0]}, ${b[1]})">Vừa</button><button type="button" class="btn btn-secondary btn-sm xs-mini" onclick="PTN.x.resize('${k}', ${c[0]}, ${c[1]})">Lớn</button><button type="button" class="btn btn-secondary btn-sm xs-mini" onclick="PTN.x.move('${k}', ${x}, ${y})"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button>`;
    m.innerHTML = `<div id="ptxContainer" class="xs-modal-box">
        <div class="xs-head"><div><div class="xs-head-title"><i class="fa-solid fa-file-signature"></i> <span>TRÌNH KÝ PHIẾU TIẾP NHẬN HỒ SƠ</span></div></div><span class="ptx-x" onclick="PTN.x.close()" title="Đóng">&times;</span></div>
        <div id="ptxStepperBar" class="xs-stepper"><div id="ptxStep1Tab" class="xs-step"><span class="require-step-badge" id="ptxStep1Badge">1</span><span>Nhập thông tin</span></div><div class="xs-stepper-divider"></div><div id="ptxStep2Tab" class="xs-step"><span class="require-step-badge" id="ptxStep2Badge">2</span><span>Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>
        <div id="ptxStep1Body" class="xs-body">
            <div id="ptxReturned" style="display:none; margin-bottom:16px; padding:14px 16px; background:#fffbeb; border:1px solid #fde68a; border-left:5px solid #f59e0b; border-radius:8px;"></div>
            <div class="xs-sec"><div class="xs-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="xs-req">*</span></div>
                <div class="xs-sign-cards-grid">${card('ptxCardOn', 'Ký số', 'fa-file-signature', false, 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', true)}${card('ptxCardOff', 'Ký ngoài', 'fa-stamp', true, 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', false)}</div></div>
            <div id="ptxFileBox" class="xs-sec"><div class="xs-sec-title" id="ptxFileTitle"></div><input type="file" id="ptxFileInput" style="display:none;" accept=".pdf,.doc,.docx" onchange="PTN.x.upload(this)"><div id="ptxFileArea"></div><div id="ptxFileError" class="error-message">Đây là trường bắt buộc</div><div id="ptxOffNote" class="xs-status-note" style="display:none;"></div></div>
            <div id="ptxTlkt"></div>
        </div>
        <div id="ptxStep2Body" class="xs-step2">
            <div class="xs-canvas"><div id="ptxA4Page" class="a4-document-page">
                <div class="xs-a4-file"><i class="fa-solid fa-file-pdf"></i> <span id="ptxA4File"></span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                    <div style="text-align:center; width:45%;"><div style="font-weight:bold; font-size:13px; text-transform:uppercase;" id="ptxA4Agency"></div><div style="font-weight:bold; font-size:12.5px; text-transform:uppercase;" id="ptxA4Unit"></div><div style="font-size:13px; margin-top:4px;">Số: ......</div><div style="border-bottom:1px solid #000; width:120px; margin:4px auto;"></div></div>
                    <div style="text-align:center; width:50%;"><div style="font-weight:bold; font-size:13.5px;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div style="font-weight:bold; font-size:13px;">Độc lập - Tự do - Hạnh phúc</div><div style="border-bottom:1px solid #000; width:150px; margin:4px auto;"></div><div style="font-style:italic; font-size:13.5px; margin-top:5px;">......, ngày ... tháng ... năm ${new Date().getFullYear()}</div></div>
                </div>
                <div style="text-align:center; margin:26px 0 18px 0;"><div style="font-weight:bold; font-size:14.5px; text-transform:uppercase;">${PTX_DOC_TITLE}</div></div>
                <div style="margin-bottom:14px; line-height:1.7;"><p style="margin:0 0 6px 0;"><strong>Kính gửi:</strong> <strong id="ptxA4NYC">--</strong></p><p style="margin:0 0 6px 0;"><strong>Địa chỉ:</strong> <span id="ptxA4Address">--</span></p></div>
                <div id="ptxA4Body" style="line-height:1.7; text-align:justify;"></div>
                <div style="display:flex; justify-content:space-between; margin-top:40px; min-height:200px; position:relative;">
                    <div style="width:45%; font-size:12.5px;"><div style="font-weight:bold; font-style:italic;">Nơi nhận:</div><div>- Như trên;</div><div>- Lưu: VT, Hồ sơ vụ việc.</div>
                        <div id="ptxA4RoomSigPlaceholder" style="margin-top:14px; border:1.5px dashed #93c5fd; background:#eff6ff; border-radius:5px; padding:6px 10px; width:220px; font-size:11.5px; color:#1e40af; text-align:center;"><i class="fa-solid fa-pen-nib"></i> Vị trí ký nháy của LĐ Phòng duyệt</div></div>
                    <div style="width:50%; text-align:center;" id="ptxA4SignerArea"><div style="font-weight:bold; text-transform:uppercase; font-size:13px;" id="ptxA4SignerTitle"></div><div style="font-style:italic; font-size:12.5px; color:#475569;">(Ký, ghi rõ họ tên và đóng dấu)</div><div style="height:80px;"></div><div style="font-weight:bold; font-size:13.5px; text-transform:uppercase;" id="ptxA4SignerName"></div></div>
                </div>
                <div id="ptxSigBoxRoom" class="sig-drag-box" style="left:60px; top:860px; width:220px; height:90px; border:2px dashed #2563eb; background:rgba(239, 246, 255, 0.94); box-shadow:0 4px 12px rgba(37,99,235,0.18);">
                    <div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:10.5px; font-weight:700; color:#1e40af;"><i class="fa-solid fa-pen-nib"></i> KÝ DUYỆT (LĐ PHÒNG)</span><span class="badge" style="background:#2563eb; color:#fff; font-size:9.5px; padding:1px 5px;">Cấp 1</span></div>
                    <div style="text-align:center; font-weight:700; color:#1e293b; font-size:12px;" id="ptxSigBoxRoomOfficer"></div>
                    <div style="display:flex; justify-content:space-between; font-size:10px; color:#64748b;"><span>Chữ ký nháy / Ý kiến</span><span id="ptxCoordRoomLabel">X: 60, Y: 860</span></div>
                    <div class="sig-resize-handle" title="Kéo chuột để co giãn khung chữ ký"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
                </div>
                <div id="ptxSigBoxAgency" class="sig-drag-box" style="left:480px; top:860px; width:245px; height:110px; border:2px dashed #dc2626; background:rgba(254, 242, 242, 0.94); box-shadow:0 4px 12px rgba(220,38,38,0.18);">
                    <div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:10.5px; font-weight:700; color:#991b1b;"><i class="fa-solid fa-stamp"></i> KÝ SỐ &amp; CON DẤU</span><span class="badge" style="background:#dc2626; color:#fff; font-size:9.5px; padding:1px 5px;">Cấp cuối (Ký số CA)</span></div>
                    <div style="text-align:center; margin:3px 0;"><div style="font-weight:700; color:#1e293b; font-size:12.5px;" id="ptxSigBoxAgencyOfficer"></div><div style="font-size:10.5px; color:#dc2626; font-style:italic;"><i class="fa-solid fa-certificate"></i> SmartCA / Token hợp lệ</div></div>
                    <div style="display:flex; justify-content:space-between; font-size:10px; color:#64748b;"><span>Chữ ký số &amp; Con dấu</span><span id="ptxCoordAgencyLabel">X: 480, Y: 860</span></div>
                    <div class="sig-resize-handle" title="Kéo chuột để co giãn khung chữ ký"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
                </div>
            </div></div>
            <div class="xs-side">
                <div><div style="font-weight:700; color:#0f172a; font-size:14.5px; margin-bottom:4px;"><i class="fa-solid fa-stamp" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; KÍCH THƯỚC CHỮ KÝ</div><div style="font-size:12px; color:#64748b;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    ${lvCard('room', 'Room', '#bfdbfe', '#1d4ed8', '#1d4ed8', sz('room', [180, 75], [220, 90], [280, 110], 60, 860))}
                    ${lvCard('agency', 'Agency', '#fecaca', '#b91c1c', '#b91c1c', sz('agency', [200, 85], [245, 110], [320, 130], 480, 860))}
                </div>
                <div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>
                <div class="form-group" style="margin-bottom:0;" id="ptxContentGroup"><span class="form-label">Nội dung trình</span><textarea class="form-control" id="ptxContent" rows="4" maxlength="2000" placeholder="Nhập nội dung trình Lãnh đạo..."></textarea></div>
            </div>
        </div>
        <div class="xs-foot"><div style="display:flex; gap:10px; align-items:center;">
            <button type="button" class="btn btn-secondary" onclick="PTN.x.close()">Hủy bỏ</button>
            <button id="ptxBtnBack" type="button" class="btn btn-secondary" onclick="PTN.x.step(1)" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
            <button id="ptxBtnNext" type="button" class="btn btn-primary" onclick="PTN.x.next()"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>
            <button id="ptxBtnSubmitOffline" type="button" class="btn btn-primary" onclick="PTN.x.submit()" style="display:none; background:#16a34a; border-color:#16a34a;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>
            <button id="ptxBtnSubmitOnline" type="button" class="btn btn-primary" onclick="PTN.x.submit()" style="display:none; background:#16a34a; border-color:#16a34a;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>
        </div></div>
    </div>`;
    document.body.appendChild(m);
    ptxBindDrag();
}
// Khối THÔNG TIN HỒ SƠ BỊ TRẢ LẠI (như Popup Trình ký - Xác định CQGQBT): các lần Lãnh đạo Từ chối Phiếu tiếp nhận
function ptxReturnList(p) {
    if (!p) return [];
    const list = (p.returns || []).filter(r => r && r.reason).map(r => ({ at: r.at, by: r.by, unitId: p.approval && p.approval.path ? p.approval.path[r.level || 0] : '', reason: r.reason }));
    if (p.status === ST.REJECT && p.reason) list.push({ at: p.rejectedAt, by: p.rejectedBy, unitId: p.approval && p.approval.path ? p.approval.path[p.approval.level || 0] : '', reason: p.reason });
    return list;
}
function ptxReturnedHtml(p) {
    // [ptnr3] Chỉ lần Từ chối gần nhất (như hồ sơ Giải quyết YCBT); toàn bộ lịch sử tại Lịch sử xử lý
    const list = ptxReturnList(p);
    if (!list.length) return '';
    const e = list[list.length - 1];
    return `<div style="font-weight:700; color:#b45309; font-size:14px; margin-bottom:8px;"><i class="fa-solid fa-rotate-left"></i> Lý do bị trả lại</div><div class="ptn-ro-grid"><div><div class="k">Lý do trả lại</div><div class="v">${esc(e.reason || '-')}</div></div><div><div class="k">Lãnh đạo trả lại</div><div class="v">${esc(W.userLabel(e.by))}</div></div><div><div class="k">Thời điểm trả lại</div><div class="v">${esc(e.at || '-')}</div></div></div>`;
}
function ptxFt() { return W.flowTypeOf ? W.flowTypeOf(X.claim.requestType || XD_TYPE, X.claim.rootUnitId) : undefined; }
// Lãnh đạo các cấp: cấp 1 = Lãnh đạo Phòng duyệt, cấp cuối = Lãnh đạo Đơn vị ký số (như fillTwoLeaderSelects - Xác định CQGQBT)
function ptxFillLeaders(prev) {
    const path = X.path, lv = X.levels, pv = Array.isArray(prev) ? prev : [];
    const one = path.length === 1;
    el('ptxOfficerRoomGroup').style.display = one ? 'none' : '';
    el('ptxPanelRoomCard').style.display = one ? 'none' : '';
    if (path.length) { el('ptxPanelRoomUnit').textContent = 'Cấp 1 - ' + W.unitName(path[0]); el('ptxPanelAgencyUnit').textContent = 'Cấp ' + path.length + ' - ' + W.unitName(path[path.length - 1]); }
    const kn = (id, u) => { el(id).style.display = u && W.isKyNhayUnit && W.isKyNhayUnit(u, ptxFt()) ? '' : 'none'; };
    kn('ptxRoomKyNhayBadge', path.length >= 2 ? path[0] : '');
    kn('ptxAgencyKyNhayBadge', path.length ? path[path.length - 1] : '');
    const pick = (list, w) => (w && list.indexOf(w) >= 0 ? w : (list[0] || ''));
    const fill = (id, list, ph, w) => { const s = el(id); s.innerHTML = list.length ? `<option value="">${ph}</option>` + list.map(u => `<option value="${esc(u)}">${esc(W.userLabel(u))}</option>`).join('') : ''; s.value = pick(list, w); };
    fill('ptxOfficerRoomSelect', one ? [] : ((lv[0] && lv[0].leaders) || []), '-- Chọn Lãnh đạo Phòng duyệt --', pv[0]);
    fill('ptxOfficerAgencySelect', (lv[lv.length - 1] && lv[lv.length - 1].leaders) || [], '-- Chọn Lãnh đạo Đơn vị ký số --', pv[path.length - 1]);
}
// Mở Popup Trình ký Phiếu tiếp nhận (hồ sơ Xác định CQGQBT): thêm mới (nw) / trình lại hồ sơ Bị trả lại
function ptxOpen(id, c, nw) {
    ptxEnsure();
    const isNew = !!nw && !nw.resubmit;
    const prev = isNew ? null : get(c.code);
    const re = prev && prev.status === ST.REJECT ? prev : null;
    const levels = levelsOf(c);
    const hasSig = !!(re && re.sigCoords && re.sigCoords.room);
    X = { id, claim: c, code: c.code, isNew, wfData: isNew ? nw.wfData : null, onSaved: nw ? nw.onSaved : null, prev, levels, path: levels.map(l => l.unitId),
        method: 'Ký số', file: '', fileObj: null, fileSize: '', fileNote: '', fileKeepId: '', step: 1, converting: false, convToken: 0,
        enableRoomSig: re && re.enableRoomSig !== undefined ? re.enableRoomSig : true,
        sigCoords: hasSig ? JSON.parse(JSON.stringify(re.sigCoords)) : PTX_SIG(), placed: hasSig ? { room: true, agency: true } : {} };
    // Trình lại: tệp văn bản trình ký, Lãnh đạo từng cấp, ký nháy, vị trí ô ký, Nội dung trình, Tài liệu đính kèm của lần trình trước
    const f = re && re.docFile;
    if (f && f.name && !f.generated) Object.assign(X, { file: f.name, fileKeepId: f.keepId || '', fileObj: (f.keepId && global.tlktBlob && global.tlktBlob(f.keepId)) || null, fileSize: f.size || '', fileNote: f.note || '' });
    el('ptxContent').value = re ? (re.content || '') : '';
    ptxClearValidation();
    ptxFillLeaders(re ? (re.assignees || (re.approval && re.approval.assignees)) : null);
    el('ptxEnableRoomSig').checked = X.enableRoomSig;
    ptxToggleRoom(X.enableRoomSig);
    const rb = el('ptxReturned'); const rh = ptxReturnedHtml(prev); rb.innerHTML = rh; rb.style.display = rh ? 'block' : 'none';
    document.querySelectorAll('input[name="ptxMethod"]').forEach(r => { r.checked = r.value === X.method; });
    if (typeof global.tlktMount === 'function') global.tlktMount('ptx', 'ptxTlkt', { required: false, rows: (re && re.attachments) || [], secClass: 'xs-sec', titleClass: 'xs-sec-title' });
    ptxRenderFile();
    ptxApplyMethod();
    ptxStep(1);
    el('ptxModal').classList.add('visible');
}
function ptxClose() { ptxCancelConvert(); const m = el('ptxModal'); if (m) m.classList.remove('visible'); const b = el('ptxContainer'); if (b) b.classList.remove('xs-wide'); }
function ptxSetMethod(m) {
    X.method = m;
    ptxCancelConvert();
    if (m === 'Ký ngoài' && X.file && !/\.pdf$/i.test(X.file)) Object.assign(X, { file: '', fileObj: null, fileKeepId: '' });
    ptxRenderFile();
    ptxApplyMethod();
}
function ptxApplyMethod() {
    const online = X.method !== 'Ký ngoài';
    const bar = el('ptxStepperBar'); bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !online); bar.setAttribute('aria-hidden', online ? 'false' : 'true');
    [['ptxCardOn', online], ['ptxCardOff', !online]].forEach(([id, on]) => { const c = el(id); c.classList.toggle('active', on); const i = c.querySelector('.xs-sign-card-check i'); if (i) i.className = on ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'; });
    el('ptxFileError').textContent = online ? MSG_REQ : PTX_OFF_MSG;
    const note = el('ptxOffNote');
    note.style.display = online ? 'none' : '';
    note.innerHTML = `<i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang trạng thái <strong>${REC_ST.ASSIGN}</strong>.`;
    if (typeof global.tlktShow === 'function') global.tlktShow('ptx', online);
    el('ptxFileTitle').innerHTML = online ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="xs-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="xs-req">*</span>';
    el('ptxFileInput').accept = online ? '.pdf,.doc,.docx' : '.pdf';
    ptxRenderFile();
    ptxStep(X.step === 2 && online ? 2 : 1);
}
function ptxSetBusy(b) { const n = el('ptxBtnNext'); if (!n) return; n.disabled = !!b; n.style.opacity = b ? '0.55' : ''; n.style.cursor = b ? 'not-allowed' : ''; n.title = b ? 'Đang chuyển đổi tệp sang PDF, vui lòng chờ' : ''; }
function ptxCancelConvert() { if (!X) return; X.converting = false; X.convToken = (X.convToken || 0) + 1; ptxSetBusy(false); }
// Ký số: .pdf, .doc, .docx (.doc/.docx chuyển đổi sang PDF); Ký ngoài: chỉ .pdf; tối đa 50MB
function ptxUpload(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    const off = X.method === 'Ký ngoài';
    const okExt = off ? /\.pdf$/i.test(f.name) : /\.(pdf|docx?)$/i.test(f.name);
    const msg = !okExt ? `Tệp không đúng định dạng. Chỉ chấp nhận ${off ? '.pdf' : '.pdf, .doc, .docx'}.` : (f.size > MAX_FILE ? 'Tệp vượt quá dung lượng cho phép (tối đa 50MB).' : '');
    const er = el('ptxFileError');
    if (msg) { er.textContent = msg; er.style.display = 'block'; toast(msg, 'error'); return; }
    er.textContent = off ? PTX_OFF_MSG : MSG_REQ; er.style.display = 'none';
    const size = fileSize(f.size);
    if (!off && /\.docx?$/i.test(f.name)) {
        Object.assign(X, { file: '', fileObj: null, fileKeepId: '', converting: true });
        const st = X; const token = st.convToken = (st.convToken || 0) + 1;
        ptxSetBusy(true); ptxRenderFile();
        setTimeout(() => {
            if (!st.converting || st.convToken !== token) return;
            Object.assign(st, { converting: false, file: f.name.replace(/\.docx?$/i, '.pdf'), fileObj: f, fileKeepId: '', fileSize: size, fileNote: 'Đã chuyển đổi từ ' + f.name });
            ptxSetBusy(false); if (X === st) ptxRenderFile();
        }, 1200);
        return;
    }
    Object.assign(X, { file: f.name, fileObj: f, fileKeepId: '', fileSize: size, fileNote: '' });
    ptxRenderFile();
}
function ptxRemoveFile() { if (!X.file) return; ptxCancelConvert(); Object.assign(X, { file: '', fileObj: null, fileKeepId: '' }); ptxRenderFile(); }
function ptxViewFile() { openRaw({ raw: X.fileObj, keepId: X.fileKeepId, name: X.file }); }
function ptxRenderFile() {
    const area = el('ptxFileArea'); if (!area) return;
    const off = X.method === 'Ký ngoài';
    if (X.converting) { area.innerHTML = '<div class="xs-converting"><span class="xs-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    if (!X.file) {
        area.innerHTML = `<div class="xs-drop" id="ptxDrop" tabindex="0" role="button" onclick="document.getElementById('ptxFileInput').click()" onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.click(); }" ondragover="event.preventDefault(); this.classList.add('drag-over');" ondragleave="this.classList.remove('drag-over');" ondrop="event.preventDefault(); this.classList.remove('drag-over'); var f = event.dataTransfer && event.dataTransfer.files; if (f && f.length) PTN.x.upload({ files: [f[0]], value: '' });">
            <i class="fa-solid fa-cloud-arrow-up xs-drop-ico"></i><div class="xs-drop-main">${off ? 'Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a>' : 'Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a>'}</div><div class="xs-drop-sub">${off ? '(Chỉ chấp nhận .pdf, tối đa 50MB)' : 'Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)'}</div></div>`;
        return;
    }
    const pdf = /\.pdf$/i.test(X.file);
    const meta = [X.fileSize, X.fileNote].filter(Boolean).join(' · ');
    area.innerHTML = `<div class="xs-fcard"><i class="fa-solid ${pdf ? 'fa-file-pdf pdf' : 'fa-file-word word'} xs-fcard-ico"></i><div class="xs-fcard-info"><div class="xs-fcard-name">${esc(X.file)}</div><div class="xs-fcard-meta">${esc(meta || (off ? 'Văn bản đã ký ngoài hệ thống & đóng dấu' : 'Văn bản trình Lãnh đạo ký số trên hệ thống'))}</div></div><div class="xs-fcard-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="PTN.x.viewFile()"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm" style="color:#dc2626;" onclick="PTN.x.removeFile()"><i class="fa-solid fa-trash"></i> Xóa</button></div></div>`;
    el('ptxFileError').style.display = 'none';
}
function ptxClearValidation() {
    document.querySelectorAll('#ptxModal .is-invalid').forEach(e => e.classList.remove('is-invalid'));
    ['ptxFileError', 'ptxOfficerRoomError', 'ptxOfficerAgencyError', 'ptxPlaceRoomErr', 'ptxPlaceAgencyErr'].forEach(id => { const e = el(id); if (e) e.style.display = 'none'; });
}
function ptxInvalid(e, first) { if (!e) return first; e.classList.add('is-invalid'); const g = e.closest('.form-group'); const er = g && g.querySelector('.error-message'); if (er) er.style.display = 'block'; return first || e; }
// Kiểm tra dữ liệu (như xsCollect - Xác định CQGQBT, không có Lý do); skipLeaders: kiểm tra Bước 1 khi bấm Tiếp tục
function ptxCollect(skipLeaders) {
    ptxClearValidation();
    let first = null;
    if (!X.file) {
        const er = el('ptxFileError'); er.textContent = X.method === 'Ký ngoài' ? PTX_OFF_MSG : MSG_REQ; er.style.display = 'block';
        const dz = el('ptxDrop'); if (dz) dz.classList.add('is-error');
        first = el('ptxFileBox');
    }
    if (X.method === 'Ký ngoài') {
        if (first) { toast(X.file ? PTX_REQ_TOAST : PTX_OFF_MSG, 'error'); if (first.scrollIntoView) first.scrollIntoView({ block: 'center' }); return null; }
        if (typeof global.tlktValidate === 'function' && !global.tlktValidate('ptx')) { toast(PTX_REQ_TOAST, 'error'); return null; }
        return { method: 'Ký ngoài' };
    }
    const content = el('ptxContent').value.trim();
    const roomEl = el('ptxOfficerRoomSelect');
    const roomOn = !skipLeaders && el('ptxOfficerRoomGroup').style.display !== 'none';
    const roomLeader = roomOn ? roomEl.value : '';
    if (roomOn && !roomLeader) first = ptxInvalid(roomEl, first);
    const agEl = skipLeaders ? null : el('ptxOfficerAgencySelect');
    const agencyLeader = agEl ? agEl.value : '';
    if (agEl && !agencyLeader) first = ptxInvalid(agEl, first);
    // [ptnr1] Bắt buộc đặt chữ ký từng cấp (cấp 1 khi áp dụng ký nháy Lãnh đạo cấp 1)
    if (!skipLeaders) [['room', 'Room', X.path.length > 1 && X.enableRoomSig], ['agency', 'Agency', true]].forEach(([k, K, need]) => { if (need && !X.placed[k]) { el('ptxPlace' + K + 'Err').style.display = 'block'; first = first || el('ptxBtnPlace' + K); } });
    if (typeof global.tlktValidate === 'function' && !global.tlktValidate('ptx') && !first) first = el('ptxTlkt');
    if (first) { toast(PTX_REQ_TOAST, 'error'); if (first.focus) first.focus(); if (first.scrollIntoView) first.scrollIntoView({ block: 'center' }); return null; }
    return { method: 'Ký số', content, roomLeader, agencyLeader };
}
function ptxStep(step) {
    X.step = step;
    const s2 = step === 2, online = X.method !== 'Ký ngoài';
    el('ptxStep1Body').style.display = s2 ? 'none' : 'block';
    el('ptxStep2Body').style.display = s2 ? 'flex' : 'none';
    el('ptxContainer').classList.toggle('xs-wide', s2);
    const b1 = el('ptxStep1Badge'), b2 = el('ptxStep2Badge');
    b1.innerHTML = s2 ? '<i class="fa-solid fa-check"></i>' : '1'; b1.style.background = s2 ? '#10b981' : '#2563eb';
    el('ptxStep1Tab').style.color = s2 ? '#10b981' : '#2563eb';
    b2.style.background = s2 ? '#2563eb' : '#cbd5e1'; b2.style.color = s2 ? '#fff' : '#475569';
    el('ptxStep2Tab').style.color = s2 ? '#2563eb' : '#64748b';
    el('ptxBtnNext').style.display = !s2 && online ? 'inline-flex' : 'none';
    el('ptxBtnSubmitOffline').style.display = !s2 && !online ? 'inline-flex' : 'none';
    el('ptxBtnBack').style.display = s2 ? 'inline-flex' : 'none';
    el('ptxBtnSubmitOnline').style.display = s2 ? 'inline-flex' : 'none';
}
// Bước 2: văn bản trình ký (mô phỏng trang A4) và ô ký Lãnh đạo Phòng / Lãnh đạo Đơn vị
function ptxNext() {
    if (!X.path.length) { toast('Chưa xác định được cấp ký duyệt Phiếu tiếp nhận theo luồng đã cấu hình. Vui lòng liên hệ Quản trị hệ thống.', 'error'); return; }
    const data = ptxCollect(true);
    if (!data) return;
    const c = X.claim, root = c.rootUnitId, last = X.path[X.path.length - 1];
    el('ptxA4Agency').textContent = W.unitName(root).toUpperCase();
    el('ptxA4Unit').textContent = last !== root ? W.unitName(last).toUpperCase() : '';
    el('ptxA4File').textContent = X.file;
    el('ptxA4NYC').textContent = c.nyc || c.nycName || '--';
    el('ptxA4Address').textContent = addressOf(c) || '--';
    el('ptxA4Body').innerHTML = `<p style="margin:0 0 8px 0; text-indent:24px;">Căn cứ Luật Trách nhiệm bồi thường của Nhà nước năm 2017;</p>
        <p style="margin:0 0 8px 0; text-indent:24px;">Xét yêu cầu xác định cơ quan giải quyết bồi thường của Ông/Bà (Mã vụ việc: <strong>${esc(c.maVuViec || c.code)}</strong>, tiếp nhận ngày ${esc(c.date || (W.dateText ? W.dateText() : '') || '--')}),</p>
        <p style="margin:0 0 8px 0; text-indent:24px;">${esc(W.unitName(root))} đã tiếp nhận hồ sơ yêu cầu xác định cơ quan giải quyết bồi thường của Ông/Bà.</p>`;
    const ag = el('ptxOfficerAgencySelect');
    const agText = ag.selectedIndex >= 0 ? ag.options[ag.selectedIndex].text : '';
    el('ptxA4SignerTitle').textContent = agText.includes('Cục trưởng') ? 'CỤC TRƯỞNG' : (agText.includes('Giám đốc') ? 'GIÁM ĐỐC SỞ' : 'THỦ TRƯỞNG CƠ QUAN');
    ptxSyncNames();
    ptxStep(2);
    ptxApplyCoords();
    ptxRefreshPlaced();
}
function ptxRefreshPlaced() {
    [['room', 'Room'], ['agency', 'Agency']].forEach(([k, K]) => {
        const on = !!X.placed[k] && (k !== 'room' || X.path.length > 1);
        el('ptxSigBox' + K).style.display = on ? 'flex' : 'none';
        el('ptxPanel' + K + 'Ctrls').style.display = on ? 'block' : 'none';
        el('ptxBtnPlace' + K).style.display = on ? 'none' : '';
    });
}
function ptxPlace(k) { X.placed[k] = true; const pe = el('ptxPlace' + (k === 'room' ? 'Room' : 'Agency') + 'Err'); if (pe) pe.style.display = 'none'; ptxRefreshPlaced(); const b = el(k === 'room' ? 'ptxSigBoxRoom' : 'ptxSigBoxAgency'); if (b && b.scrollIntoView) b.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
function ptxSyncNames() {
    const nm = id => { const s = el(id); return s && s.selectedIndex >= 0 && s.value ? s.options[s.selectedIndex].text.split('-')[0].trim() : ''; };
    const room = nm('ptxOfficerRoomSelect'), agency = nm('ptxOfficerAgencySelect');
    el('ptxSigBoxRoomOfficer').textContent = room ? 'Cấp 1 - ' + room : 'Cấp 1';
    el('ptxSigBoxAgencyOfficer').textContent = agency ? 'Cấp cuối - ' + agency : 'Cấp cuối';
    el('ptxA4SignerName').textContent = (agency || '').toUpperCase();
}
function ptxApplyCoords() {
    [['room', 'Room'], ['agency', 'Agency']].forEach(([k, K]) => {
        const b = el('ptxSigBox' + K), c = X.sigCoords[k]; if (!b || !c) return;
        Object.assign(b.style, { left: c.x + 'px', top: c.y + 'px', width: c.w + 'px', height: c.h + 'px' });
        el('ptxCoord' + K + 'Label').textContent = `X: ${c.x}, Y: ${c.y}`;
        el('ptxPanel' + K + 'Coord').textContent = `Tọa độ: (${c.x}, ${c.y})`;
    });
}
function ptxToggleRoom(on) { X.enableRoomSig = !!on; const ph = el('ptxA4RoomSigPlaceholder'); if (ph) ph.style.display = on ? 'block' : 'none'; }
let ptxDrag = null;
function ptxBindDrag() {
    [['ptxSigBoxRoom', 'room'], ['ptxSigBoxAgency', 'agency']].forEach(([id, key]) => {
        el(id).addEventListener('mousedown', e => {
            if (e.button !== 0 || !X) return;
            e.preventDefault();
            const box = el(id);
            if (e.target.closest('.sig-resize-handle')) { e.stopPropagation(); ptxDrag = { box, key, resize: true, sx: e.clientX, sy: e.clientY, w: X.sigCoords[key].w, h: X.sigCoords[key].h }; return; }
            const r = box.getBoundingClientRect();
            ptxDrag = { box, key, resize: false, ox: e.clientX - r.left, oy: e.clientY - r.top };
            box.classList.add('dragging');
        });
    });
    document.addEventListener('mousemove', e => {
        if (!ptxDrag || !X) return;
        const page = el('ptxA4Page'); const c = X.sigCoords[ptxDrag.key];
        if (ptxDrag.resize) {
            c.w = Math.max(140, Math.min(380, Math.round(ptxDrag.w + e.clientX - ptxDrag.sx)));
            c.h = Math.max(50, Math.min(180, Math.round(ptxDrag.h + e.clientY - ptxDrag.sy)));
        } else {
            const pr = page.getBoundingClientRect();
            c.x = Math.round(Math.max(10, Math.min(e.clientX - pr.left - ptxDrag.ox, page.clientWidth - ptxDrag.box.offsetWidth - 10)));
            c.y = Math.round(Math.max(10, Math.min(e.clientY - pr.top - ptxDrag.oy, page.clientHeight - ptxDrag.box.offsetHeight - 10)));
        }
        ptxApplyCoords();
    });
    document.addEventListener('mouseup', () => { if (ptxDrag) ptxDrag.box.classList.remove('dragging'); ptxDrag = null; });
}
// Trình Lãnh đạo (Ký số) / Ban hành văn bản (Ký ngoài), như xsSubmit - Xác định CQGQBT
function ptxSubmit(confirmed) {
    const data = ptxCollect(false);
    if (!data) return;
    const st = X, c = X.claim;
    if (st.method === 'Ký ngoài' && confirmed !== true) {
        confirmBox('Xác nhận ban hành văn bản', `Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống; hồ sơ chuyển sang trạng thái ${REC_ST.ASSIGN}. Bạn có chắc chắn muốn ban hành văn bản?`, 'Ban hành', () => ptxSubmit(true));
        return;
    }
    const prev = st.isNew ? null : get(c.code);
    const reFlow = isFlow(prev) && prev.status === ST.REJECT;
    const keepId = st.fileObj ? (st.fileKeepId || (typeof global.tlktKeep === 'function' ? global.tlktKeep(st.fileObj) : '')) : (st.fileKeepId || '');
    const attachments = typeof global.tlktGet === 'function' ? global.tlktGet('ptx') : [];
    const flowData = st.isNew ? { flow: FLOW, wfData: st.wfData, returns: [] } : (reFlow ? flowExtras(c, prev) : { flow: FLOW, wfData: (prev && prev.wfData) || null, returns: [] });
    if (st.method === 'Ký ngoài') {
        const p = Object.assign(baseRecord(c, prev), flowData, {
            xs: true, noTpl: true, status: ST.DONE, method: 'Ký ngoài', signedFile: st.file, signedKeepId: keepId, issuedAt: W.nowText(), issuedBy: me(),
            attachments: attachments.filter(d => !d.scope || d.scope === 'issued'), approval: null, reason: ''
        });
        hist(p, 'Ban hành Phiếu tiếp nhận (Ký ngoài)', `Văn bản đã ký ngoài: ${st.file}.`);
        put(p);
        ptxClose();
        if (typeof st.onSaved === 'function') st.onSaved(REC_ST.ASSIGN);
        const rel = release(p);
        if (!st.isNew) afterResubmit(p, (rel && rel.status) || REC_ST.ASSIGN);
        toast(`Đã ban hành Phiếu tiếp nhận (Ký ngoài) hồ sơ ${p.maVuViec}. Trạng thái: [${(rel && rel.status) || REC_ST.ASSIGN}].`, 'success');
        afterChange(p.code);
        return;
    }
    const path = st.path;
    const assignees = path.map((u, i) => (i === path.length - 1 ? data.agencyLeader : (i === 0 ? data.roomLeader : '')) || '');
    if (!assignees[0]) { toast('Vui lòng chọn Lãnh đạo phê duyệt.', 'error'); return; }
    const content = data.content || 'Kính trình Lãnh đạo xem xét, phê duyệt.';
    const p = Object.assign(baseRecord(c, prev), flowData, {
        xs: true, noTpl: true, status: ST.REVIEW, method: 'Ký số', docSrc: 'upload',
        docFile: { name: st.file, generated: false, size: st.fileSize || '', note: st.fileNote || '', keepId }, docHtml: '', meta: null,
        enableRoomSig: st.enableRoomSig, sigCoords: JSON.parse(JSON.stringify(st.sigCoords)), assignees: assignees.slice(), content, attachments,
        submittedBy: me(), submittedAt: W.nowText(), reason: '',
        approval: { kind: KIND, path: path.slice(), assignees: assignees.slice(), leaders: st.levels.map(l => l.leaders.slice()), level: 0, steps: [] }
    });
    const nextText = path.length > 1 ? ' Lãnh đạo cấp tiếp theo: ' + path.slice(1).map((u, i) => (assignees[i + 1] ? W.userName(assignees[i + 1]) + ' - ' : '') + W.unitName(u)).join('; ') + '.' : '';
    hist(p, 'Trình phê duyệt', `${KIND}. Trình ${W.userName(assignees[0])} - ${W.unitName(path[0])}.${nextText} Nội dung: ${content}`);
    if (attachments.length) p.history[p.history.length - 1].attachments = attachments;
    put(p);
    ptxClose();
    if (typeof st.onSaved === 'function') st.onSaved(REC_ST.REVIEW);
    if (!st.isNew) afterResubmit(p, REC_ST.REVIEW);
    toast(`Đã trình ký Lãnh đạo hồ sơ ${p.maVuViec}. Trạng thái: [${REC_ST.REVIEW}] - Loại trình: ${KIND}.`, 'success');
    afterChange(p.code);
}

// ---- Màn Ký duyệt / Từ chối (như openXdDecision - Xác định CQGQBT): xem trước văn bản (trái), Thông tin tổng quan + Lịch sử trình ký + Ý kiến / Lý do (phải) ----
let XL = null;
function ptxLdEnsure() {
    ptxCss();
    if (el('ptxLdOverlay')) return;
    const o = document.createElement('div');
    o.id = 'ptxLdOverlay';
    o.innerHTML = `<div class="ld-modal ld-xd-wide" id="ptxLdModal">
        <div class="ld-modal-header"><h3 id="ptxLdTitle"></h3><span class="ld-close" onclick="PTN.x.ldClose()">&times;</span></div>
        <div class="ld-modal-body" id="ptxLdBody"><div id="ptxLdPreview"></div><div id="ptxLdRight">
            <div id="ptxLdSummary"></div><div id="ptxLdHistory"></div>
            <div class="ld-group" id="ptxLdNoteGroup"><span class="ld-label" id="ptxLdLabel"></span><textarea id="ptxLdNote" class="ld-input" rows="4" maxlength="2000" oninput="document.getElementById('ptxLdErr').style.display='none';"></textarea><div class="ld-err" id="ptxLdErr">${MSG_REQ}</div></div>
        </div></div>
        <div class="ld-modal-footer" id="ptxLdFoot"></div>
    </div>`;
    document.body.appendChild(o);
}
function ptxLdPreview(p) {
    const a = p.approval || {}, sc = (p.sigCoords && p.sigCoords.room) ? p.sigCoords : PTX_SIG();
    const path = a.path || [], asg = a.assignees || [], steps = a.steps || [], root = p.rootUnitId;
    const box = (k, idx, cls, tag) => {
        const c = sc[k]; if (!c) return '';
        const uid = asg[idx] || ((a.leaders || [])[idx] || [])[0] || '';
        const done = steps.filter(s => s.result === 'Ký duyệt')[idx];
        return `<div class="ld-sigbox ${cls}${done ? ' done' : ''}" style="left:${c.x}px; top:${c.y}px; width:${c.w}px; height:${c.h}px;"><strong>${esc(tag)}</strong><br>Cấp ${idx + 1} - ${esc(uid ? W.userName(uid) : '')}${done ? `<br><span style="color:#16a34a;">✔ Đã ký duyệt ${esc(done.at || '')}</span>` : ''}</div>`;
    };
    const last = Math.max(path.length - 1, 0);
    const f = p.docFile || {};
    return `<div style="color:#e2e8f0; font-size:12px; margin-bottom:8px; display:flex; gap:10px; align-items:center;"><span><i class="fa-solid fa-file-pdf"></i> ${esc(f.name || 'Van_ban_trinh_ky.pdf')} · Trang 1/1</span><button type="button" class="ld-btn" style="padding:3px 10px;" onclick="PTN.viewIssued('${esc(p.code)}')"><i class="fa-solid fa-eye"></i> Xem file</button></div>
        <div class="ld-a4">
            <div style="display:flex; justify-content:space-between; text-align:center; font-size:13px;"><div><strong>${esc(W.unitName(root).toUpperCase())}</strong><br>Số: ......</div><div><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br><u>Độc lập - Tự do - Hạnh phúc</u></div></div>
            <div style="text-align:center; font-weight:bold; margin:28px 0 18px;">${esc(PTX_DOC_TITLE)}</div>
            <p><strong>Kính gửi:</strong> ${esc(p.nycName || '--')}</p>
            <p>Căn cứ Luật Trách nhiệm bồi thường của Nhà nước năm 2017; xét yêu cầu xác định cơ quan giải quyết bồi thường (Mã vụ việc: <strong>${esc(p.maVuViec || p.code)}</strong>),</p>
            <p>${esc(W.unitName(root))} đã tiếp nhận hồ sơ yêu cầu xác định cơ quan giải quyết bồi thường của Ông/Bà.</p>
            ${path.length > 1 && p.enableRoomSig !== false ? box('room', 0, '', 'KÝ NHÁY') : ''}
            ${box('agency', last, 'agency', 'KÝ SỐ & CON DẤU')}
        </div>`;
}
function ptxLdSummary(p) {
    const a = p.approval || {};
    const row = (k, v) => `<div class="ld-sum-row"><span>${k}</span><span>${v}</span></div>`;
    return `<div class="ld-sum"><div class="ld-hist-title"><i class="fa-solid fa-circle-info"></i> Thông tin tổng quan</div>`
        + row('Mã vụ việc', `<strong>${esc(p.maVuViec || p.code)}</strong>`)
        + row('Loại trình', esc(a.kind || KIND))
        + row('Cán bộ trình', `${esc(W.userName(p.submittedBy) || '--')}${p.submittedAt ? ` <span style="color:#64748b;">- ${esc(p.submittedAt)}</span>` : ''}`)
        + `</div>` + (typeof global.tlktViewHtml === 'function' ? global.tlktViewHtml(p.attachments || [], { boxClass: 'ld-sum tlkt-ld-sum', titleClass: 'ld-hist-title' }) : '');
}
// Lịch sử trình ký (như renderXdHistory): mỗi lượt trình và kết quả từng cấp, cấp đang chờ / chưa tới của lượt hiện hành
function ptxLdHistory(p) {
    const groups = [];
    (p.history || []).filter(h => /^Trình|^Ký duyệt|^Từ chối/.test(h.action || '')).forEach(h => {
        if (/^Trình/.test(h.action)) groups.push({ root: h, children: [] });
        else if (groups.length) groups[groups.length - 1].children.push(h);
    });
    const a = p.approval || {}, path = a.path || [];
    const initials = n => String(n || '').trim().split(/\s+/).slice(-3).map(w => w[0] || '').join('').toUpperCase();
    const sub = uid => { const u = W.getUser ? W.getUser(uid) : null; return u ? [u.title, W.unitName(u.unitId)].filter(Boolean).join(' - ') : ''; };
    const shortName = s => String(s || '').split(' - ')[0].trim();
    const pick = (re, s) => { const m = re.exec(s || ''); return m ? m[1].trim() : ''; };
    const icon = { done: 'fa-solid fa-circle-check', no: 'fa-solid fa-circle-xmark', wait: 'fa-regular fa-clock', todo: 'fa-regular fa-circle' };
    const item = (st, uid, name, at, cls, ic, act, msg, docs) => `<div class="ld-hv ${st}"><div class="ld-hv-step"><i class="${icon[st]}"></i></div><div class="ld-hv-av">${esc(initials(name))}</div><div class="ld-hv-main">`
        + `<div class="ld-hv-head"><span class="ld-hv-name">${esc(name || '--')}</span>${at ? `<span class="ld-hv-time"><i class="fa-regular fa-clock"></i> ${esc(at)}</span>` : ''}</div>`
        + (sub(uid) ? `<div class="ld-hv-sub">${esc(sub(uid))}</div>` : '') + (act ? `<div class="ld-hv-act ${cls}"><i class="${ic}"></i> ${act}</div>` : '')
        + (msg ? `<div class="ld-hv-msg">${esc(msg)}</div>` : '') + (docs && docs.length && typeof global.tlktInlineHtml === 'function' ? global.tlktInlineHtml(docs) : '') + `</div></div>`;
    let html = '';
    groups.forEach((g, gi) => {
        const current = gi === groups.length - 1 && p.status === ST.REVIEW;
        const items = [];
        const to = pick(/Trình ([^.]+)\./, g.root.note);
        items.push(item('done', g.root.userId, g.root.userName, g.root.at, '', 'fa-solid fa-circle-arrow-right', `Trình ký${to ? ` đến <strong>${esc(shortName(to))}</strong>` : ''}`, pick(/Nội dung: (.*)$/, g.root.note), g.root.attachments));
        g.children.forEach(h => {
            if (/^Từ chối/.test(h.action)) { items.push(item('no', h.userId, h.userName, h.at, 'no', 'fa-solid fa-ban', 'Từ chối - trả lại cán bộ trình', pick(/Lý do: (.*)$/, h.note))); return; }
            const nx = pick(/chuyển ([^.]+)\./, h.note);
            items.push(nx ? item('done', h.userId, h.userName, h.at, '', 'fa-solid fa-circle-arrow-right', `Ký duyệt và chuyển xử lý đến <strong>${esc(shortName(nx))}</strong>`, pick(/Ý kiến: (.*)$/, h.note))
                : item('done', h.userId, h.userName, h.at, 'ok', 'fa-regular fa-circle-check', `Ký duyệt${/ký số/.test(h.note || '') ? ' - đã ký số' : ''}`, pick(/Ý kiến: (.*)$/, h.note)));
        });
        if (current) for (let lv = g.children.length; lv < path.length; lv++) {
            const uid = (a.assignees || [])[lv] || ((a.leaders || [])[lv] || [])[0] || '';
            const nm = uid ? W.userName(uid) : W.unitName(path[lv]);
            items.push(lv === a.level ? item('wait', uid, nm, '', 'wait', 'fa-solid fa-hourglass-half', 'Chờ ký duyệt', '') : item('todo', uid, nm, '', '', '', '', ''));
        }
        html = items.reverse().join('') + html;
    });
    return `<div class="ld-hist"><div class="ld-hist-title"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử trình ký</div>${html || '<div style="color:#64748b;">Chưa có lịch sử.</div>'}</div>`;
}
// mode: approve | reject | view
function ptxLdOpen(code, mode, cb) {
    ptxLdEnsure();
    const p = get(code), uid = me();
    XL = { code, mode, cb };
    const approve = mode === 'approve', reject = mode === 'reject';
    const can = canAct(p, uid);
    el('ptxLdPreview').innerHTML = ptxLdPreview(p);
    el('ptxLdSummary').innerHTML = ptxLdSummary(p);
    el('ptxLdHistory').innerHTML = ptxLdHistory(p);
    const mv = esc(p.maVuViec || code);
    el('ptxLdTitle').innerHTML = approve ? `<i class="fa-solid fa-file-signature"></i> Ký duyệt hồ sơ ${mv}` : reject ? `<i class="fa-solid fa-circle-xmark" style="color:#dc2626;"></i> Từ chối phê duyệt hồ sơ ${mv}` : `<i class="fa-solid fa-file-signature"></i> Phiếu tiếp nhận hồ sơ ${mv}`;
    el('ptxLdNoteGroup').style.display = approve || reject ? '' : 'none';
    el('ptxLdLabel').innerHTML = approve ? 'Ý kiến' : 'Lý do từ chối<span class="ld-req">*</span>';
    const n = el('ptxLdNote'); n.placeholder = approve ? 'Nhập ý kiến (không bắt buộc)...' : 'Nhập lý do từ chối...'; n.value = '';
    el('ptxLdErr').style.display = 'none';
    const c = esc(code);
    el('ptxLdFoot').innerHTML = approve ? `<button class="ld-btn" onclick="PTN.x.ldClose()">Hủy bỏ</button><button class="ld-btn primary" onclick="PTN.x.ldSubmit()"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>`
        : reject ? `<button class="ld-btn" onclick="PTN.x.ldClose()">Hủy bỏ</button><button class="ld-btn danger" onclick="PTN.x.ldSubmit()"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button>`
        : `<button class="ld-btn" onclick="PTN.x.ldClose()">Đóng</button>${can && cb !== 'done' ? `<button class="ld-btn danger" onclick="PTN.ldOpen('${c}','reject')"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button><button class="ld-btn primary" onclick="PTN.ldOpen('${c}','approve')"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>` : ''}`;
    el('ptxLdOverlay').classList.add('open');
}
function ptxLdClose() { const o = el('ptxLdOverlay'); if (o) o.classList.remove('open'); }
// Ký duyệt / Từ chối (như WF.approve / WF.rejectApproval - Xác định CQGQBT); kết quả theo Tiếp nhận hồ sơ
function ptxLdSubmit() {
    const p = get(XL.code), uid = me();
    LD = XL;
    if (!canAct(p, uid)) { ptxLdClose(); toast('Phiếu tiếp nhận đã được xử lý bởi người khác. Danh sách đã được tải lại.', 'error'); ldDone(); return; }
    const note = el('ptxLdNote').value.trim();
    const a = p.approval, unitId = a.path[a.level], at = W.nowText();
    if (XL.mode === 'reject') {
        if (!note) { el('ptxLdErr').style.display = 'block'; el('ptxLdNote').focus(); return; }
        a.steps.push({ level: a.level, unitId, userId: uid, at, result: 'Từ chối phê duyệt', note });
        Object.assign(p, { status: ST.REJECT, reason: note, rejectedBy: uid, rejectedAt: at });
        hist(p, 'Từ chối phê duyệt', `Trả lại Cán bộ tiếp nhận. Lý do: ${note}`, uid);
        put(p); ptxLdClose();
        updateClaim(p.code, x => { x.status = REC_ST.REJECT; });
        toast(`Hồ sơ ${p.maVuViec}: [${REC_ST.REJECT}].`, 'success');
        ldDone(); return;
    }
    a.steps.push({ level: a.level, unitId, userId: uid, at, result: 'Ký duyệt', note });
    if (a.level < a.path.length - 1) {
        const nextLeaders = (a.leaders || [])[a.level + 1] || W.getLeaders(a.path[a.level + 1]) || [];
        const preset = (a.assignees || [])[a.level + 1];
        const nx = preset && (!nextLeaders.length || nextLeaders.indexOf(preset) >= 0) ? preset : (nextLeaders[0] || '');
        a.level += 1;
        a.assignees = a.assignees || []; a.assignees[a.level] = nx; p.assignees = a.assignees.slice();
        hist(p, 'Ký duyệt', `${KIND}: ký duyệt cấp ${W.unitName(unitId)}; chuyển ${nx ? W.userName(nx) + ' - ' : ''}${W.unitName(a.path[a.level])}.${note ? ' Ý kiến: ' + note : ''}`, uid);
        put(p); ptxLdClose();
        toast(`Hồ sơ ${p.maVuViec}: [${REC_ST.REVIEW}] - chuyển ${nx ? W.userName(nx) + ' - ' : ''}${W.unitName(a.path[a.level])}.`, 'success');
        ldDone(); return;
    }
    const signed = String((p.docFile && p.docFile.name) || `Phieu_tiep_nhan_${p.code}.pdf`).replace(/\.[^.]+$/, '') + '_da_ky.pdf';
    Object.assign(p, { status: ST.DONE, signedAt: at, signedBy: uid, issuedAt: at, digitalSign: { by: uid, at }, signedDocFile: signed });
    hist(p, 'Ký duyệt', `Ký duyệt cấp cuối (${W.unitName(unitId)}) - đã ký số văn bản: ${KIND}. Văn bản đã ký số: ${signed}. Hồ sơ chuyển [${REC_ST.ASSIGN}].${note ? ' Ý kiến: ' + note : ''}`, uid);
    put(p); ptxLdClose();
    const rel = release(p);
    toast(`Hồ sơ ${p.maVuViec}: [${(rel && rel.status) || REC_ST.ASSIGN}].`, 'success');
    ldDone();
}
// [ptnmh02] Nút lưu tại MH02 (Thêm mới / Cập nhật hồ sơ Bị trả lại): luôn "Lưu và trình ký"
function syncSaveLabel() {
    const sb = el('btnFormSave'); if (!sb) return;
    sb.innerHTML = '<i class="fa-solid fa-file-signature"></i> Lưu và trình ký';
}

// ======================= Khởi tạo =======================
seed();
hookLeaderWork();
// [tnd] Trang Tiếp nhận hồ sơ: bổ sung hồ sơ tiếp nhận mẫu của luồng Duyệt tiếp nhận (bản ghi mẫu còn thiếu theo Mã hồ sơ)
if (typeof global.buildSeedClaims === 'function' && !global.buildSeedClaims.__tnd) {
    const origSeedClaims = global.buildSeedClaims;
    const wrappedSeed = function () { return origSeedClaims.apply(this, arguments).concat(tndSeedClaims()); };
    wrappedSeed.__tnd = true;
    global.buildSeedClaims = wrappedSeed;
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hookReceptionPage); else hookReceptionPage();

global.PTN = {
    KIND, ST, eligible, canSubmit, get, statusBadge, open, close, openNew, openResubmit, noTemplate: noTpl, setMethod, setDocSrc, goStep, next, submit, issue,
    generate, viewDoc, uploadDoc, uploadOff, viewIssued, renderDetail,
    ldActionsHtml, ldOpen, ldClose, ldSubmit, ldOpenWork,
    REC_ST, isFlow, recStatusOf, holds, reconcile, release, leaderActed, canActCode, gridLeaderButtonsHtml, workStatusHtml,
    canResubmit, downloadIssued, _after: () => afterPageAction(),
    _s: () => S, _mark: mark, _renderDoc: () => renderDoc(), _renderOff: () => renderOff(), _openOff: () => openRaw(S.offFile),
    _place: place, _resize: (i, w, h) => { Object.assign(S.coords[i], { w, h }); drawBox(i); }, _resetBox: i => { S.coords[i] = defaultCoord(i); drawBox(i); }, _syncBox: i => { if (S.placed[i]) drawBox(i); },
    // [ptnxs] Popup Trình ký / màn Ký duyệt hồ sơ Xác định CQGQBT
    x: { setMethod: ptxSetMethod, upload: ptxUpload, viewFile: ptxViewFile, removeFile: ptxRemoveFile, next: ptxNext, step: ptxStep, submit: ptxSubmit, close: ptxClose,
        place: ptxPlace, syncNames: ptxSyncNames, toggleRoom: ptxToggleRoom, clearSel: e => { e.classList.remove('is-invalid'); const g = e.closest('.form-group'); const r = g && g.querySelector('.error-message'); if (r) r.style.display = 'none'; },
        resize: (k, w, h) => { Object.assign(X.sigCoords[k], { w, h }); ptxApplyCoords(); }, move: (k, x, y) => { Object.assign(X.sigCoords[k], { x, y }); ptxApplyCoords(); },
        ldClose: ptxLdClose, ldSubmit: ptxLdSubmit, s: () => X, syncLabel: () => syncSaveLabel() }
};
})(window);
