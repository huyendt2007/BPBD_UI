/*
 * [ptn] Tiếp nhận hồ sơ - Trình ký Phiếu tiếp nhận (Mẫu 02/BTNN - Giấy tiếp nhận yêu cầu bồi thường)
 * Thay thao tác "In Phiếu tiếp nhận" cũ. Nạp tại tiep_nhan_ycbt.html (cán bộ trình ký, màn chi tiết) và
 * viec_cho_lanh_dao_xu_ly.html (Lãnh đạo Ký duyệt / Từ chối).
 * - Điều kiện: hồ sơ Nguồn Tiếp nhận mới, Hình thức tiếp nhận Trực tiếp / Qua dịch vụ bưu chính; người thao tác là Cán bộ tiếp nhận hồ sơ;
 *   Phiếu tiếp nhận chưa trình hoặc Bị từ chối.
 * - Popup Trình ký Phiếu tiếp nhận (bố cục như Trình ký QĐ tạm ứng - Mẫu 07): Hình thức ký Ký số trên hệ thống (02 bước, trình Lãnh đạo
 *   các cấp theo luồng) / Ký ngoài (Ban hành văn bản ngay); Nguồn tệp Sinh văn bản theo mẫu 02/BTNN / Tải lên từ máy;
 *   Tài liệu kèm theo 02 khối (tlktMount).
 * - Trạng thái Phiếu tiếp nhận: Chờ duyệt / Bị từ chối / Đã ban hành. Không thay đổi trạng thái, luồng phân công của hồ sơ.
 * - Lưu localStorage "btnnPhieuTiepNhan_v1" theo Mã hồ sơ; lịch sử ghi trong phiếu, hiển thị gộp vào Lịch sử xử lý của màn chi tiết.
 * - Lãnh đạo: bổ sung công việc Loại trình "Phiếu tiếp nhận" vào BTNN_WF.getLeaderWork (source 'ptn').
 * - Dữ liệu mẫu: merge theo Mã hồ sơ, PTN_SEED_VER.
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
const PTN_SEED_VER = '20261027ptn2';
const KIND = 'Phiếu tiếp nhận'; // Loại trình tại màn Việc chờ Lãnh đạo xử lý
const ST = { REVIEW: 'Chờ duyệt', REJECT: 'Bị từ chối', DONE: 'Đã ban hành' };
const RM = W.RECEIVE_METHODS;
const METHODS = [RM.TRUC_TIEP, RM.BUU_CHINH];
const MSG_REQ = 'Đây là trường bắt buộc'; // MSG-ERR-VAL-001
const MAX_FILE = 50 * 1024 * 1024;
const SIG = { w: 230, h: 90 };
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
        + '\n.ptn-badge.review{background:#fef9c3;color:#a16207;border-color:#a1620733;} .ptn-badge.reject{background:#fee2e2;color:#991b1b;border-color:#991b1b33;} .ptn-badge.done{background:#dcfce7;color:#15803d;border-color:#15803d33;} .ptn-badge.none{background:#f1f5f9;color:#475569;border-color:#47556933;}'
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
// Trình ký: Cán bộ tiếp nhận hồ sơ; Phiếu tiếp nhận chưa trình hoặc Bị từ chối
function canSubmit(item) {
    if (!eligible(item) || !isReceiver(item)) return false;
    const p = get(item.code);
    return !p || p.status === ST.REJECT;
}
function denyReason(item) {
    if (!eligible(item)) return 'Chỉ khả dụng với hồ sơ Nguồn Tiếp nhận mới, Hình thức tiếp nhận Trực tiếp hoặc Qua dịch vụ bưu chính';
    const p = get(item.code);
    if (p && p.status === ST.REVIEW) return 'Phiếu tiếp nhận đang chờ Lãnh đạo ký duyệt';
    if (p && p.status === ST.DONE) return 'Phiếu tiếp nhận đã ban hành';
    if (!isReceiver(item)) return 'Chỉ Cán bộ tiếp nhận hồ sơ được trình ký Phiếu tiếp nhận';
    return '';
}
// Nút cột Thao tác của Danh sách hồ sơ tiếp nhận
function gridButtonHtml(item, offStyle) {
    const ok = canSubmit(item);
    const p = item ? get(item.code) : null;
    const title = ok ? (p && p.status === ST.REJECT ? 'Trình ký lại Phiếu tiếp nhận (Bị từ chối)' : 'Trình ký Phiếu tiếp nhận') : denyReason(item);
    const id = String(item.id || '').replace(/'/g, "\\'");
    return `<button class="icon-btn print${ok ? '' : ' disabled-action'}" data-ptn="1" title="${esc(title)}" style="${ok ? '' : offStyle}" onclick="event.stopPropagation(); PTN.open('${esc(id)}')"><i class="fa-solid fa-file-signature"></i></button>`;
}

// ======================= Luồng ký duyệt (như QĐ tạm ứng - Mẫu 07) =======================
function recLike(claim) {
    const uid = me();
    return { chuTri: uid, createdBy: uid, routes: [], loaiYeuCau: W.REQUEST_TYPE_YCBT, rootUnitId: claim ? claim.rootUnitId : '' };
}
function levelsOf(claim) {
    const rl = recLike(claim);
    const path = (W.computeApprovalPath && W.computeApprovalPath(rl)) || [];
    return path.map((u, i) => ({ unitId: u, leaders: i === 0 ? W.firstLevelLeaders(rl) : W.getLeaders(u) }));
}
function canAct(p, uid) {
    if (!p || p.status !== ST.REVIEW || !p.approval) return false;
    const a = p.approval;
    const who = (a.assignees || [])[a.level];
    return who ? who === uid : W.isLeaderOf(uid, a.path[a.level]);
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
    if (p.method !== 'Ký ngoài' && f.generated && p.docHtml) { W.openDocTab(p.docHtml, (f.name || docBaseName(p.code)).replace(/\.doc$/, '')); return; }
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
                    <div class="ptn-gqx-grid2" style="margin-bottom:14px;">
                        ${fld('ptnSgOffNo', 'Số, ký hiệu văn bản', true, `<input type="text" class="form-control" id="ptnSgOffNo" maxlength="100" placeholder="Nhập số, ký hiệu văn bản" oninput="PTN._mark('ptnSgOffNo', false)">`)}
                        ${fld('ptnSgOffDate', 'Ngày văn bản', true, date('ptnSgOffDate'))}
                    </div>
                    <div class="ptn-gqx-grid2" style="margin-bottom:14px;">
                        ${fld('ptnSgOffSigner', 'Người ký', true, `<select class="form-control" id="ptnSgOffSigner" onchange="PTN._mark('ptnSgOffSigner', false)"></select>`)}
                    </div>
                    <div class="ptn-gqx-field" style="margin-bottom:0;">
                        <label class="form-label">Tệp văn bản PDF đã ký &amp; đóng dấu<span class="ptn-gqx-req">*</span></label>
                        <input type="file" id="ptnSgOffInput" accept=".pdf" style="display:none;" onchange="PTN.uploadOff(this)">
                        <div id="ptnSgOffBox"></div>
                        <div class="ptn-gqx-err" id="ptnSgOffErr">${MSG_REQ}</div>
                    </div>
                    <div class="ptn-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, Phiếu tiếp nhận được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống), chuyển trạng thái <strong>Đã ban hành</strong>. Trạng thái hồ sơ tiếp nhận không thay đổi.</div>
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
    if (!canSubmit(c)) { const r = denyReason(c); if (r) toast(r + '.', 'error'); return; }
    ensureModal();
    const prev = get(c.code);
    const re = prev && prev.status === ST.REJECT ? prev : null;
    const levels = levelsOf(c);
    S = { id, claim: c, code: c.code, method: 'Ký số', docSrc: 'gen', step: 1, levels, assignees: levels.map((lv, i) => (re && re.assignees && re.assignees[i]) || lv.leaders[0] || ''), placed: {}, coords: {}, docFile: null, offFile: null };
    el('ptnSgSubCode').innerText = c.maVuViec || c.code || '--';
    el('ptnSgSubNyc').innerText = c.nyc || '--';
    el('ptnSgSubMethod').innerText = c.nopKenh || RM.TRUC_TIEP;
    el('ptnSgMethodOn').checked = true;
    el('ptnSgOffNo').value = ''; el('ptnSgOffDate').value = '';
    const leaders = [];
    levels.forEach(lv => lv.leaders.forEach(u => { if (leaders.indexOf(u) < 0) leaders.push(u); }));
    el('ptnSgOffSigner').innerHTML = '<option value="">-- Chọn Người ký --</option>' + leaders.map(u => `<option value="${esc(u)}">${esc(W.userLabel(u))}</option>`).join('');
    el('ptnSgContent').value = '';
    // Thông tin điền vào Mẫu 02/BTNN: mặc định / trình lại theo lần trình trước
    const pm = (re && re.meta) || {};
    el('ptnSgDocNo').value = pm.docNo || '     /TB-';
    el('ptnSgDocDate').value = pm.docDate || (W.dateText ? W.dateText() : '');
    el('ptnSgNoiNhan').value = pm.noiNhan != null ? pm.noiNhan : noiNhanDefault(c);
    ['ptnSgOffNo', 'ptnSgOffDate', 'ptnSgOffSigner', 'ptnSgDocNo', 'ptnSgDocDate'].forEach(x => mark(x, false));
    document.querySelectorAll('#ptnSignModal .ptn-qs-err, #ptnSignModal .ptn-gqx-err').forEach(e => { e.style.display = 'none'; });
    if (global.flatpickr) ['ptnSgOffDate', 'ptnSgDocDate'].forEach(x => { if (!el(x)._flatpickr) global.flatpickr('#' + x, { dateFormat: 'd/m/Y', allowInput: true }); });
    if (el('ptnSgOffDate')._flatpickr) el('ptnSgOffDate')._flatpickr.clear();
    if (el('ptnSgDocDate')._flatpickr) el('ptnSgDocDate')._flatpickr.setDate(el('ptnSgDocDate').value, false, 'd/m/Y');
    renderOff();
    setDocSrc('gen');
    // Trình lại (Bị từ chối): điền lại nguồn tệp, tệp trình ký, vị trí ô ký, Lãnh đạo, Nội dung trình, Tài liệu kèm theo của lần trình trước
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
    el('ptnSgDocSrcGroup').style.display = on ? '' : 'none';
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
    S.docFile = { name: docBaseName(S.claim.maVuViec || S.code) + '.doc', generated: true, html: buildDocHtml(S.claim, metaData()) };
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
    if (f.generated) W.openDocTab(f.html, f.name.replace(/\.doc$/, ''));
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
    const nextText = path.length > 1 ? ' Lãnh đạo cấp tiếp theo: ' + path.slice(1).map((u, i) => `${W.userName(S.assignees[i + 1])} - ${W.unitName(u)}`).join('; ') + '.' : '';
    hist(p, prev && prev.status === ST.REJECT ? 'Trình ký lại Phiếu tiếp nhận' : 'Trình ký Phiếu tiếp nhận', `Ký số trên hệ thống. Trình ${W.userName(S.assignees[0])} - ${W.unitName(path[0])}.${nextText}${content ? ' Nội dung: ' + content : ''}`);
    put(p);
    close();
    toast(`Đã trình ${W.userLabel(S.assignees[0])} ký duyệt Phiếu tiếp nhận hồ sơ ${p.maVuViec}. Phiếu tiếp nhận chuyển [${ST.REVIEW}].`, 'success');
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
    const ids = ['ptnSgOffNo', 'ptnSgOffDate', 'ptnSgOffSigner'];
    const bad = ids.filter(id => !String(el(id).value || '').trim());
    ids.forEach(id => mark(id, bad.indexOf(id) >= 0));
    let firstEl = bad.length ? el(bad[0]) : null;
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
    const signer = el('ptnSgOffSigner').value;
    const keepId = typeof global.tlktKeep === 'function' && S.offFile.raw ? global.tlktKeep(S.offFile.raw) : '';
    const p = Object.assign(baseRecord(c, prev), {
        status: ST.DONE, method: 'Ký ngoài', docNo: el('ptnSgOffNo').value.trim(), docDate: el('ptnSgOffDate').value.trim(), offSigner: signer,
        signedFile: S.offFile.name, signedKeepId: keepId, issuedAt: W.nowText(), issuedBy: me(),
        attachments: typeof global.tlktGet === 'function' ? global.tlktGet('ptnSg') : [], approval: null, reason: ''
    });
    hist(p, 'Ban hành Phiếu tiếp nhận (Ký ngoài)', `Số, ký hiệu ${p.docNo} ngày ${p.docDate}; Người ký ${W.userName(signer)}; tệp đã ký: ${p.signedFile}.`);
    put(p);
    close();
    toast(`Đã ban hành Phiếu tiếp nhận hồ sơ ${p.maVuViec} (Ký ngoài). Phiếu tiếp nhận chuyển [${ST.DONE}].`, 'success');
    afterChange(p.code);
}

// ======================= Màn chi tiết hồ sơ tiếp nhận (MH03): khối Phiếu tiếp nhận + Lịch sử xử lý =======================
function detailBlockHtml(c) {
    const p = get(c.code);
    const it = (k, v) => `<div><div class="k">${esc(k)}</div><div class="v">${v}</div></div>`;
    if (!p) return `<div class="ptn-dtl"><div class="ptn-ro-grid">${it('Trạng thái', statusBadge(''))}</div></div>`;
    const ky = p.method === 'Ký ngoài';
    const docName = ky ? p.signedFile : ((p.docFile && p.docFile.name) || '');
    const a = p.approval;
    let rows = it('Trạng thái', statusBadge(p.status)) + it('Hình thức ký', ky ? 'Ký ngoài' : 'Ký số trên hệ thống');
    if (ky) rows += it('Số, ký hiệu văn bản', esc(p.docNo || '--')) + it('Ngày văn bản', esc(p.docDate || '--')) + it('Người ký', esc(W.userName(p.offSigner))) + it('Thời điểm ban hành', esc(p.issuedAt || '--'));
    else {
        rows += it('Cán bộ trình / Thời điểm trình', `${esc(W.userName(p.submittedBy))} - ${esc(p.submittedAt || '--')}`);
        if (a) rows += it('Lãnh đạo ký duyệt', a.path.map((u, i) => `Cấp ${i + 1}: ${esc(W.userName(a.assignees[i]))} - ${esc(W.unitName(u))}`).join('<br>'));
        if (p.status === ST.REVIEW && a) rows += it('Cấp đang ký duyệt', `Cấp ${a.level + 1}/${a.path.length} - ${esc(W.userName(a.assignees[a.level]))}`);
        if (p.status === ST.DONE && p.signedAt) rows += it('Ký số', `${esc(W.userName(p.signedBy))} - ${esc(p.signedAt)}`);
        if (p.status === ST.REJECT) rows += it('Lý do từ chối', `${esc(p.reason || '--')} <span style="font-weight:400;color:#64748b;">(${esc(W.userName(p.rejectedBy))} - ${esc(p.rejectedAt || '')})</span>`);
        if (p.content) rows += it('Nội dung trình', esc(p.content));
    }
    rows += `<div><div class="k">${p.status === ST.DONE ? 'Văn bản đã ban hành' : 'Văn bản trình ký'}</div><div class="v"><a href="javascript:void(0)" onclick="PTN.viewIssued('${esc(p.code)}')"><i class="fa-solid fa-file-lines"></i> ${esc(docName || '--')}</a></div></div>`;
    const tl = typeof global.tlktViewHtml === 'function' ? global.tlktViewHtml(p.attachments || []) : '';
    return `<div class="ptn-dtl"><div class="ptn-ro-grid">${rows}</div>${tl ? `<div style="margin-top:12px;">${tl}</div>` : ''}</div>`;
}
function renderDetail(id, isReadOnly) {
    const host = el('wfInfoBlock');
    if (!host) return;
    let blk = el('ptnDetailBlock');
    if (!blk) {
        blk = document.createElement('div');
        blk.id = 'ptnDetailBlock';
        host.parentNode.insertBefore(blk, host);
    }
    const c = isReadOnly && id ? claimOf(id) : null;
    if (!c || !eligible(c)) { blk.style.display = 'none'; blk.innerHTML = ''; return; }
    injectCss();
    blk.style.display = '';
    blk.innerHTML = `<div class="info-group-title">Phiếu tiếp nhận</div>${detailBlockHtml(c)}`;
    // Lịch sử xử lý: gộp các bước Trình ký / Ký duyệt / Từ chối / Ban hành Phiếu tiếp nhận theo thời gian
    const p = get(c.code);
    if (p && (p.history || []).length) {
        const rec = W.getRecord(c.code);
        const list = ((rec && rec.history) || []).concat(p.history).map((h, i) => ({ h, i })).sort((x, y) => (toTime(x.h.at) - toTime(y.h.at)) || (x.i - y.i)).map(x => x.h);
        const hh = el('wfHistory');
        if (hh) hh.innerHTML = W.renderHistoryHtml({ history: list });
        const ib = el('wfInfoBlock'); if (ib) ib.style.display = 'block';
    }
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
            if (c) { p.docHtml = buildDocHtml(c, p.meta ? Object.assign({ signerId: (p.assignees || []).slice(-1)[0] || '' }, p.meta) : null); dirty = true; }
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
            const base = { source: 'ptn', code, caseCode: code, ptn: p, rec: W.getRecord(code) || null, loaiYeuCau: p.loaiYeuCau || W.REQUEST_TYPE_YCBT, nguonHoSo: W.SOURCES.TIEP_NHAN, nycName: p.nycName || '', status: p.status, kind: KIND, type: W.WORK_TYPES.PHE_DUYET };
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
    const signBox = approve ? `<div class="ptnld-sign"><b>Hình thức ký:</b> Ký số trên hệ thống<br>${last ? 'Cấp ký duyệt cuối cùng: hệ thống ký số Phiếu tiếp nhận bằng chứng thư số của <b>' + esc(W.userLabel(uid)) + '</b> (giả lập). Phiếu tiếp nhận chuyển [Đã ban hành].' : 'Ký duyệt cấp hiện tại; Phiếu tiếp nhận chuyển Lãnh đạo cấp tiếp theo: <b>' + esc(W.userLabel(a.assignees[a.level + 1])) + '</b>.'}</div>` : '';
    const input = approve
        ? `<div class="ptnld-group"><label class="ptnld-label" for="ptnLdNote">Ý kiến ký duyệt</label><textarea class="ptnld-input" id="ptnLdNote" rows="4" maxlength="2000" placeholder="Nhập ý kiến ký duyệt..."></textarea></div>`
        : reject ? `<div class="ptnld-group"><label class="ptnld-label" for="ptnLdNote">Lý do từ chối<span class="ptnld-req">*</span></label><textarea class="ptnld-input" id="ptnLdNote" rows="4" maxlength="2000" placeholder="Nhập lý do từ chối..." oninput="this.classList.remove('is-invalid'); document.getElementById('ptnLdNoteErr').style.display='none';"></textarea><div class="ptnld-err" id="ptnLdNoteErr">${MSG_REQ}</div><div class="ptnld-hint">Sau khi từ chối, Phiếu tiếp nhận chuyển [Bị từ chối] cho Cán bộ tiếp nhận cập nhật, trình lại.</div></div>` : '';
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
                    ${row('Trạng thái', statusBadge(p.status))}
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
        toast(`Đã từ chối Phiếu tiếp nhận hồ sơ ${p.maVuViec}. Phiếu tiếp nhận chuyển [${ST.REJECT}].`, 'success');
        ldDone(); return;
    }
    const at = W.nowText();
    a.steps.push({ level: a.level, unitId: a.path[a.level], userId: uid, at, result: 'Ký duyệt', note });
    const last = a.level >= a.path.length - 1;
    if (last) {
        p.status = ST.DONE; p.signedAt = at; p.signedBy = uid; p.issuedAt = at;
        p.digitalSign = { by: uid, at };
        hist(p, 'Ký duyệt Phiếu tiếp nhận', `Cấp ${a.level + 1}/${a.path.length} - ${W.unitName(a.path[a.level])}; ký số và ban hành.${note ? ' Ý kiến: ' + note : ''}`, uid);
    } else {
        hist(p, 'Ký duyệt Phiếu tiếp nhận', `Cấp ${a.level + 1}/${a.path.length} - ${W.unitName(a.path[a.level])}; chuyển ${W.userName(a.assignees[a.level + 1])} - ${W.unitName(a.path[a.level + 1])}.${note ? ' Ý kiến: ' + note : ''}`, uid);
        a.level += 1;
    }
    put(p); ldClose();
    toast(last ? `Đã ký duyệt Phiếu tiếp nhận hồ sơ ${p.maVuViec}. Phiếu tiếp nhận chuyển [${ST.DONE}].` : `Đã ký duyệt Phiếu tiếp nhận hồ sơ ${p.maVuViec}, chuyển ${W.userLabel(a.assignees[a.level])} ký duyệt.`, 'success');
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
        // Trực tiếp - Ký số, Chờ duyệt tại cấp 1
        { code: 'VVBT-2026-002', maVuViec: 'VVBT-2026-002', nycName: 'Nguyễn Văn Bình', nopKenh: RM.TRUC_TIEP, loaiYeuCau: W.REQUEST_TYPE_YCBT, rootUnitId: 'BTP-01',
          status: ST.REVIEW, method: 'Ký số', docSrc: 'gen', docFile: { name: docBaseName('VVBT-2026-002') + '.doc', generated: true }, docHtml: '', meta: { docNo: '12/TB-CĐK', docDate: day(), noiNhan: SEED_NN },
          assignees: ['tpbt', 'cuctruong'], sigCoords: { 0: { x: 60, y: 893, w: 230, h: 90 }, 1: { x: 470, y: 893, w: 230, h: 90 } }, content: 'Kính trình Lãnh đạo ký Giấy tiếp nhận yêu cầu bồi thường.', attachments: [],
          submittedBy: 'canbonv', submittedAt: at(1, 9), reason: '', approval: { kind: KIND, path: ['PLN-02', 'CĐK-01'], assignees: ['tpbt', 'cuctruong'], level: 0, steps: [] },
          history: [H('Trình ký Phiếu tiếp nhận', 'canbonv', at(1, 9), 'Ký số trên hệ thống. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước. Lãnh đạo cấp tiếp theo: Nguyễn Văn Cục Trưởng - Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.')] },
        // Qua dịch vụ bưu chính - Ký ngoài, Đã ban hành
        { code: 'VVBT-2026-003', maVuViec: 'VVBT-2026-003', nycName: 'Trần Minh Tuấn', nopKenh: RM.BUU_CHINH, loaiYeuCau: W.REQUEST_TYPE_YCBT, rootUnitId: 'BTP-01',
          status: ST.DONE, method: 'Ký ngoài', docNo: '15/TB-CĐK', docDate: day(2), offSigner: 'cuctruong', signedFile: 'Giay_tiep_nhan_VVBT-2026-003_da_ky.pdf', issuedAt: at(2, 14), issuedBy: 'canbonv', attachments: [], approval: null, reason: '',
          history: [H('Ban hành Phiếu tiếp nhận (Ký ngoài)', 'canbonv', at(2, 14), `Số, ký hiệu 15/TB-CĐK ngày ${day(2)}; Người ký Nguyễn Văn Cục Trưởng; tệp đã ký: Giay_tiep_nhan_VVBT-2026-003_da_ky.pdf.`)] },
        // Trực tiếp - Ký số, Bị từ chối tại cấp 1
        { code: 'VVBT-2026-005', maVuViec: 'VVBT-2026-005', nycName: 'Hoàng Đức Thịnh', nopKenh: RM.TRUC_TIEP, loaiYeuCau: W.REQUEST_TYPE_YCBT, rootUnitId: 'BTP-01',
          status: ST.REJECT, method: 'Ký số', docSrc: 'gen', docFile: { name: docBaseName('VVBT-2026-005') + '.doc', generated: true }, docHtml: '', meta: { docNo: '10/TB-CĐK', docDate: day(), noiNhan: SEED_NN },
          assignees: ['tpbt', 'cuctruong'], sigCoords: { 0: { x: 60, y: 893, w: 230, h: 90 }, 1: { x: 470, y: 893, w: 230, h: 90 } }, content: 'Kính trình Lãnh đạo ký Giấy tiếp nhận yêu cầu bồi thường.', attachments: [],
          submittedBy: 'canbonv', submittedAt: at(3, 10), reason: 'Bổ sung đầy đủ danh sách giấy tờ đã tiếp nhận trước khi trình ký.', rejectedBy: 'tpbt', rejectedAt: at(3, 15),
          approval: { kind: KIND, path: ['PLN-02', 'CĐK-01'], assignees: ['tpbt', 'cuctruong'], level: 0, steps: [{ level: 0, unitId: 'PLN-02', userId: 'tpbt', at: at(3, 15), result: 'Từ chối', note: 'Bổ sung đầy đủ danh sách giấy tờ đã tiếp nhận trước khi trình ký.' }] },
          history: [H('Trình ký Phiếu tiếp nhận', 'canbonv', at(3, 10), 'Ký số trên hệ thống. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.'),
              H('Từ chối Phiếu tiếp nhận', 'tpbt', at(3, 15), 'Cấp 1/2 - Phòng Quản lý nghiệp vụ về bồi thường nhà nước. Lý do: Bổ sung đầy đủ danh sách giấy tờ đã tiếp nhận trước khi trình ký.')] }
    ];
    // Bản ghi mẫu đã có (phiên bản trước chưa có Thông tin điền vào Mẫu 02): bổ sung meta, sinh lại văn bản
    seeds.forEach(s => { if (!m[s.code]) m[s.code] = s; else if (s.meta && !m[s.code].meta && m[s.code].docSrc === 'gen') { m[s.code].meta = s.meta; m[s.code].docHtml = ''; } });
    saveAll(m);
    try { localStorage.setItem(SEED_KEY, PTN_SEED_VER); } catch (e) { /* bỏ qua */ }
}

// ======================= Khởi tạo =======================
seed();
hookLeaderWork();
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hookReceptionPage); else hookReceptionPage();

global.PTN = {
    KIND, ST, eligible, canSubmit, get, gridButtonHtml, statusBadge, open, close, setMethod, setDocSrc, goStep, next, submit, issue,
    generate, viewDoc, uploadDoc, uploadOff, viewIssued, renderDetail,
    ldActionsHtml, ldOpen, ldClose, ldSubmit, ldOpenWork,
    _s: () => S, _mark: mark, _renderDoc: () => renderDoc(), _renderOff: () => renderOff(), _openOff: () => openRaw(S.offFile),
    _place: place, _resize: (i, w, h) => { Object.assign(S.coords[i], { w, h }); drawBox(i); }, _resetBox: i => { S.coords[i] = defaultCoord(i); drawBox(i); }, _syncBox: i => { if (S.placed[i]) drawBox(i); }
};
})(window);
