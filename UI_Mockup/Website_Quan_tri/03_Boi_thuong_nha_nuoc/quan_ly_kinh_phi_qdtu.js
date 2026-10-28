/*
 * Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Luồng Tạo Quyết định tạm ứng kinh phí bồi thường (Mẫu 07/BTNN)
 * - Thanh công cụ MH01: nút "Tạo QĐ tạm ứng" -> Màn hình Tạo Quyết định tạm ứng kinh phí (bố cục như Tạo Quyết định GQBT):
 *   chọn Mã vụ việc (Tìm kiếm / Tìm kiếm nâng cao); chỉ vụ việc GQ YCBT trạng thái
 *   Xác minh thiệt hại, Thương lượng, Chờ ban hành QĐ; thông tin mặc định theo hồ sơ vụ việc, cho phép sửa.
 * - Tiếp tục -> Popup Trình ký Quyết định tạm ứng kinh phí (Ký số 02 bước / Ký ngoài Ban hành văn bản).
 * - Trình (Ký số) -> bản ghi Loại "Cấp tạm ứng" (Đề nghị tạm ứng) "Chờ duyệt", Loại trình "Quyết định tạm ứng kinh phí";
 *   Lãnh đạo được giao Ký duyệt theo luồng; cấp cuối ký số -> "Chờ chi trả"; Từ chối -> "Bị trả lại" (Cập nhật -> trình lại).
 *   Ký ngoài: Ban hành văn bản -> "Chờ chi trả". Chờ chi trả -> Cập nhật chi trả (MH03 sẵn có) -> "Hoàn thành".
 * - Điều 2 (người nhận tạm ứng) chỉ có khi Người nhận khác Người yêu cầu; không có Điều 2 thì đánh số lại Điều 3->2, 4->3, 5->4
 *   và Nơi nhận "Như Điều 5" -> "Như Điều 4".
 * Id/hàm prefix qdtu. Mockup tĩnh: chỉ kiểm tra trống trường bắt buộc.
 */
// CSS popup (sao chép bố cục popup Trình ký Quyết định GQBT / Thông báo chi trả, tiền tố qdtu-)
const QDTU_CSS = `
.qdtu-modal { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); display: none; align-items: center; justify-content: center; z-index: 5500; }
.qdtu-modal.open { display: flex; }
.qdtu-modal-box { background: #fff; border-radius: 8px; width: 760px; min-width: 650px; max-width: 850px; display: flex; flex-direction: column; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); overflow: hidden; }
.qdtu-modal-head { position: sticky; top: 0; padding: 16px 24px; border-bottom: 1px solid var(--border-color); background: #FAFBFD; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 15px; color: var(--primary-light); }
.qdtu-modal-head .qd-close { cursor: pointer; font-size: 20px; color: #64748b; background: none; border: 0; }
.qdtu-modal-body { padding: 24px; max-height: 80vh; overflow-y: auto; }
.qdtu-modal-foot { position: sticky; bottom: 0; padding: 14px 24px; border-top: 1px solid var(--border-color); background: #FAFBFD; display: flex; justify-content: flex-end; gap: 8px; }
@media (max-width: 700px) { .qdtu-modal-box { min-width: 0; width: 96vw; } }
.qdtu-qs-box { width: 850px; min-width: 0; max-width: 96vw; max-height: 94vh; border-radius: 10px; box-shadow: 0 20px 45px rgba(0,0,0,0.3); }
.qdtu-qs-box.qdtu-qs-wide { width: 100vw; max-width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; }
.qdtu-qs-head { background: #f8fafc; border-bottom: 1px solid var(--border-color); padding: 18px 24px; display: flex; justify-content: space-between; align-items: flex-start; flex-shrink: 0; }
.qdtu-qs-head-title { font-size: 16.5px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.qdtu-qs-head-ico { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: #dbeafe; color: #1d4ed8; font-size: 14px; }
.qdtu-qs-sub { font-size: 12.5px; color: #64748b; margin-top: 4px; padding-left: 38px; }
.qdtu-qs-sub .qdtu-qs-dot { margin: 0 6px; }
.qdtu-qs-head-close { border: none; background: transparent; font-size: 22px; color: #94a3b8; cursor: pointer; line-height: 1; padding: 4px; }
.qdtu-qs-body { overflow-y: auto; flex: 1; }
.qdtu-qs-field { margin-bottom: 12px; }
.qdtu-qs-field .form-label { font-weight: 600; font-size: 13px; color: #334155; margin-bottom: 6px; display: block; }
.qdtu-qs-field .form-control { font-family: inherit; font-size: 13px; width: 100%; box-sizing: border-box; }
.qdtu-qs-field textarea.form-control { line-height: 1.55; resize: vertical; }
.qdtu-qs-err { display: none; color: #dc2626; font-size: 12px; margin-top: 4px; }
.qdtu-qs-meta { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; }
.qdtu-qs-meta-title { font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.qdtu-qs-meta-title > i { color: #2563eb; }
.qdtu-qs-meta .qdtu-gqx-grid2 { margin-bottom: 14px; }
.qdtu-qs-label-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 6px; }
.qdtu-qs-label-row .form-label { margin-bottom: 0 !important; }
.qdtu-qs-label-row > span { font-size: 11.5px; color: #64748b; }
.qdtu-qs-foot-btns { display: flex; gap: 10px; margin-left: auto; }
.qdtu-gqx-body { padding: 24px; background: #f8fafc; }
.qdtu-gqx-sec { background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:16px 18px; margin-bottom:14px; }
.qdtu-gqx-sec:last-child { margin-bottom:0; }
.qdtu-gqx-sec-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; letter-spacing:.2px; margin:0 0 14px; padding-bottom:10px; border-bottom:1px solid #f1f5f9; }
.qdtu-gqx-sec-title > i { color:#2563eb; width:16px; text-align:center; }
.qdtu-gqx-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:0 16px; }
.qdtu-gqx-field { margin-bottom:14px; }
.qdtu-gqx-field:last-child, .qdtu-gqx-grid2 .qdtu-gqx-field { margin-bottom:0; }
.qdtu-gqx-body .form-label { font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block; }
.qdtu-gqx-req { color:#dc2626; margin-left:3px; }
.qdtu-gqx-sec-title .qdtu-gqx-req, .qdtu-gqx-docfile-head .qdtu-gqx-req { margin-left:-5px; }
.qdtu-gqx-body .form-control { font-family:inherit; font-size:13px; height:38px; width:100%; box-sizing:border-box; }
.qdtu-gqx-body textarea.form-control { height:auto; line-height:1.55; resize:vertical; }
.qdtu-gqx-body select.form-control { padding:0 10px; cursor:pointer; }
.qdtu-gqx-date { position:relative; }
.qdtu-gqx-date .form-control { padding-right:36px; cursor:pointer; background:#fff; }
.qdtu-gqx-date > i { position:absolute; right:12px; top:50%; transform:translateY(-50%); color:#2563eb; cursor:pointer; font-size:15px; }
.qdtu-gqx-hint { font-size:12px; color:#64748b; margin-top:5px; }
.qdtu-gqx-err { display:none; color:#dc2626; font-size:12px; margin-top:4px; }
.qdtu-sign-cards-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:10px; align-items:stretch; }
.qdtu-sign-card { position:relative; display:flex; align-items:center; justify-content:space-between; padding:10px 12px; min-height:58px; height:100%; box-sizing:border-box; border:1.5px solid #cbd5e1; border-radius:8px; background:#ffffff; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:0 1px 2px rgba(0,0,0,0.03); margin:0; }
.qdtu-sign-card:hover { border-color:#93c5fd; background:#f8fafc; }
.qdtu-sign-card.active { border-color:#2563eb; background:#eff6ff; box-shadow:0 2px 6px rgba(37,99,235,0.1); }
.qdtu-sign-card input[type="radio"] { position:absolute; opacity:0; pointer-events:none; }
.qdtu-sign-card-content { display:flex; align-items:center; gap:8px; flex:1; min-width:0; }
.qdtu-sign-card-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; background:#dbeafe; color:#1d4ed8; transition:all 0.2s; }
.qdtu-sign-card-icon.offline { background:#fef3c7; color:#b45309; }
.qdtu-sign-card.active .qdtu-sign-card-icon { transform:scale(1.05); }
.qdtu-sign-card-text { flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; gap:2px; }
.qdtu-sign-card-title { font-size:13px; font-weight:700; color:#1e293b; margin-bottom:0; line-height:1.35; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.qdtu-sign-card-desc { font-size:12px; font-weight:400; color:#64748b; line-height:1.4; text-wrap:balance; }
.qdtu-sign-card.active .qdtu-sign-card-title { color:#1d4ed8; }
.qdtu-sign-card-check { font-size:15px; color:#cbd5e1; margin-left:8px; flex-shrink:0; transition:all 0.2s; }
.qdtu-sign-card.active .qdtu-sign-card-check { color:#2563eb; }
@media (max-width: 640px) { .qdtu-sign-cards-grid { grid-template-columns:1fr; } }
.qdtu-gqx-docfile { margin-top:16px; border:1.5px dashed #60a5fa; background:linear-gradient(180deg, #eff6ff 0%, #f8fbff 100%); border-radius:10px; padding:14px 16px; }
.qdtu-gqx-docfile.signed { border-color:#fbbf24; background:linear-gradient(180deg, #fffbeb 0%, #fffdf7 100%); }
.qdtu-gqx-docfile-head { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e40af; margin-bottom:10px; }
.qdtu-gqx-docfile.signed .qdtu-gqx-docfile-head { color:#92400e; }
.qdtu-gqx-file-empty { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.qdtu-gqx-file-hint { font-size:12.5px; color:#475569; display:flex; align-items:center; }
.qdtu-gqx-file-actions { display:flex; gap:8px; flex-wrap:wrap; }
.qdtu-gqx-file-ready { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #bfdbfe; border-radius:8px; padding:10px 12px; }
.qdtu-gqx-file-ico { font-size:28px; color:#2563eb; flex-shrink:0; }
.qdtu-gqx-file-info { flex:1; min-width:0; }
.qdtu-gqx-file-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }
.qdtu-gqx-file-meta { font-size:12px; color:#64748b; margin-top:3px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.qdtu-gqx-file-btns { display:flex; gap:6px; flex-shrink:0; }
.qdtu-gqx-danger { color:#dc2626 !important; }
.qdtu-gqx-note { margin-top:10px; font-size:12px; color:#92400e; background:#fef3c7; border-radius:6px; padding:8px 10px; line-height:1.5; }
.qdtu-gqx-gen-preview-box { display:flex; align-items:center; justify-content:space-between; gap:12px; border:1px solid #cbd5e1; background:#ffffff; border-radius:8px; padding:10px 16px; margin-top:12px; box-sizing:border-box; }
.qdtu-gqx-gen-preview-hint { display:flex; align-items:center; gap:8px; font-size:13px; color:#334155; font-weight:500; }
.qdtu-gqx-gen-preview-hint i { color:#2563eb; font-size:16px; flex-shrink:0; }
.qdtu-btn-preview { display:inline-flex; align-items:center; gap:6px; background:#eff6ff; color:#2563eb !important; border:1px solid #3b82f6; padding:6px 14px; font-size:12.5px; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.04); transition:all 0.2s ease; white-space:nowrap; }
.qdtu-btn-preview:hover { background:#dbeafe; border-color:#2563eb; color:#1d4ed8 !important; box-shadow:0 2px 6px rgba(37,99,235,0.12); }
.qdtu-btn-preview:active { background:#bfdbfe; transform:translateY(0); }
.qdtu-doc-src-segmented { display:flex; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:8px; padding:4px; gap:4px; margin-bottom:14px; box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.05); }
.qdtu-doc-src-seg-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; color:#475569; background:transparent; border:none; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); user-select:none; }
.qdtu-doc-src-seg-btn:hover { color:#0f172a; background:rgba(255, 255, 255, 0.6); }
.qdtu-doc-src-seg-btn.active { background:#2563eb; color:#ffffff !important; font-weight:700; box-shadow:0 2px 8px rgba(37, 99, 235, 0.35); }
.qdtu-doc-src-seg-btn i { font-size:14px; color:#64748b; transition:color 0.2s ease; }
.qdtu-doc-src-seg-btn.active i { color:#ffffff !important; }
.qdtu-stepper-fullwidth { display:flex; align-items:center; justify-content:center; gap:14px; width:100%; padding:12px 24px; background:#f8fafc; border-bottom:1px solid #e2e8f0; flex-shrink:0; box-sizing:border-box; }
.qdtu-step-tab { display:flex; align-items:center; gap:8px; cursor:pointer; user-select:none; }
.qdtu-step-tab .qdtu-step-badge { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#ffffff; border:2px solid #cbd5e1; color:#64748b; font-size:12px; font-weight:700; flex-shrink:0; transition:all 0.2s ease; }
.qdtu-step-tab.active .qdtu-step-badge { background:#2563eb; border-color:#2563eb; color:#ffffff; }
.qdtu-step-tab.completed .qdtu-step-badge { background:#10b981; border-color:#10b981; color:#ffffff; }
.qdtu-step-tab .qdtu-step-title { font-size:13.5px; font-weight:600; color:#64748b; }
.qdtu-step-tab.active .qdtu-step-title { color:#1d4ed8; font-weight:700; }
.qdtu-step-tab.completed .qdtu-step-title { color:#047857; }
.qdtu-stepper-sep { width:80px; height:2px; background:#cbd5e1; font-size:0; }
.qdtu-btn-upload { display:inline-flex; align-items:center; gap:7px; background:#ffffff; color:#1d4ed8 !important; border:1.5px solid #2563eb; padding:7px 16px; font-size:13px; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 2px 5px rgba(37,99,235,0.12); transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
.qdtu-btn-upload:hover { background:#2563eb; color:#ffffff !important; border-color:#2563eb; box-shadow:0 4px 12px rgba(37,99,235,0.3); transform:translateY(-1px); }
.qdtu-btn-upload:active { transform:translateY(0); box-shadow:0 2px 4px rgba(37,99,235,0.15); }
.qdtu-qs-step2 { display: none; flex: 1; min-height: 0; overflow: hidden; }
.qdtu-qs-preview { flex: 1; background: #334155; overflow: auto; padding: 18px; }
.qdtu-qs-a4 { position: relative; background: #fff; width: 794px; min-height: 1123px; margin: 0 auto; padding: 50px 60px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,.3); }
.qdtu-qs-side { width: 420px; flex-shrink: 0; background: #f8fafc; border-left: 1px solid #e2e8f0; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.qdtu-qs-card { background: #fff; border: 1px solid #bfdbfe; border-left: 4px solid #1d4ed8; border-radius: 8px; padding: 12px; }
.qdtu-qs-card.last { border-color: #fecaca; border-left-color: #b91c1c; }
.qdtu-qs-card-head { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; font-size: 12.5px; font-weight: 700; color: #1d4ed8; }
.qdtu-qs-card.last .qdtu-qs-card-head { color: #b91c1c; }
.qdtu-qs-sig { position: absolute; border: 2px dashed #2563eb; background: rgba(239,246,255,.92); border-radius: 6px; padding: 6px 8px; font: 11px Inter, sans-serif; color: #1e3a8a; cursor: move; user-select: none; box-sizing: border-box; }
.qdtu-qs-sig.last { border-color: #dc2626; background: rgba(254,242,242,.92); color: #991b1b; }
.qdtu-qs-foot { padding: 16px 28px 18px; background: #f8fafc; flex-shrink: 0; }
/* Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn mượt */
#qdtuSgStepper { height:51px; overflow:hidden; transition:height .22s ease, padding .22s ease, opacity .18s ease, border-color .22s ease; }
#qdtuSgStepper.is-collapsed { height:0; padding-top:0; padding-bottom:0; opacity:0; border-bottom-color:transparent; border-bottom-width:0; pointer-events:none; }
/* Sinh văn bản: ghi chú + nút Xem trước văn bản cùng 1 dòng */
.qdtu-gen-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:nowrap; border:1px solid #cbd5e1; background:#fff; border-radius:8px; padding:10px 16px; box-sizing:border-box; }
.qdtu-gen-hint { display:flex; align-items:center; gap:8px; flex:1; min-width:0; font-size:13px; color:#334155; font-weight:500; }
.qdtu-gen-hint i { color:#2563eb; font-size:16px; flex-shrink:0; }
.qdtu-gen-row .qdtu-btn-preview { flex-shrink:0; }
/* Vùng kéo thả tệp / đang chuyển đổi sang PDF / File Card */
.qdtu-drop { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; min-height:96px; box-sizing:border-box; padding:14px 16px; border:1.5px dashed #93c5fd; border-radius:10px; background:#f8fbff; text-align:center; cursor:pointer; transition:border-color .15s, background .15s; }
.qdtu-drop:hover, .qdtu-drop.drag-over { border-color:#2563eb; background:#eff6ff; }
.qdtu-drop:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
.qdtu-drop.is-error { border-color:#dc2626; background:#fef2f2; }
.qdtu-drop-ico { font-size:22px; color:#2563eb; }
.qdtu-drop-main { font-size:13px; color:#334155; }
.qdtu-drop-main a { color:#2563eb; font-weight:700; text-decoration:underline; cursor:pointer; }
.qdtu-drop-sub { font-size:12px; color:#64748b; }
.qdtu-converting { display:flex; align-items:center; justify-content:center; gap:10px; min-height:96px; box-sizing:border-box; border:1.5px dashed #93c5fd; border-radius:10px; background:#eff6ff; font-size:13px; font-weight:600; color:#1d4ed8; }
.qdtu-spinner { width:18px; height:18px; border:2.5px solid #bfdbfe; border-top-color:#2563eb; border-radius:50%; animation:qdtuSpin .8s linear infinite; }
@keyframes qdtuSpin { to { transform:rotate(360deg); } }
.qdtu-fcard { display:flex; align-items:center; gap:12px; min-height:96px; box-sizing:border-box; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:12px 14px; }
.qdtu-fcard-ico { font-size:30px; flex-shrink:0; width:32px; text-align:center; }
.qdtu-fcard-ico.pdf { color:#dc2626; } .qdtu-fcard-ico.word { color:#2563eb; }
.qdtu-fcard-info { flex:1; min-width:0; }
.qdtu-fcard-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }
.qdtu-fcard-meta { font-size:12px; color:#64748b; margin-top:3px; }
.qdtu-fcard-btns { display:flex; gap:6px; flex-shrink:0; }
.qdtu-fcard-btns .btn { min-width:84px; justify-content:center; }
.qdtu-status-note { margin-top:12px; font-size:12.5px; color:#1e3a8a; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:9px 12px; line-height:1.55; }
@media (max-width: 640px) { .qdtu-fcard, .qdtu-gen-row { flex-wrap:wrap; } }
`;
const QDTU_LD_CSS = `
.qdtuld-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: flex; align-items: stretch; justify-content: center; z-index: 5600; }
.qdtuld-modal { background: #fff; width: 100vw; height: 100vh; display: flex; flex-direction: column; font-family: Inter, system-ui, sans-serif; }
.qdtuld-head { padding: 14px 22px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.qdtuld-head h3 { margin: 0; font-size: 16px; color: #1e3a8a; display: flex; gap: 8px; align-items: center; }
.qdtuld-x { cursor: pointer; font-size: 22px; color: #64748b; background: none; border: none; }
.qdtuld-body { flex: 1; display: flex; gap: 18px; min-height: 0; overflow: hidden; }
.qdtuld-preview { flex: 1; background: #334155; padding: 18px; display: flex; flex-direction: column; min-height: 0; }
.qdtuld-doc-bar { display: flex; justify-content: space-between; gap: 12px; color: #e2e8f0; font-size: 12.5px; margin-bottom: 8px; }
.qdtuld-doc-bar a { color: #bfdbfe; }
.qdtuld-frame { flex: 1; width: 100%; min-height: 420px; border: 0; background: #e5e7eb; border-radius: 4px; }
.qdtuld-uploaded { background: #fff; border-radius: 4px; padding: 40px; text-align: center; color: #334155; font-size: 14px; }
.qdtuld-right { width: 480px; flex-shrink: 0; overflow-y: auto; padding: 16px 20px 16px 0; font-size: 13.5px; color: #1e293b; }
.qdtuld-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #fff; }
.qdtuld-box.hist { background: #f8fafc; }
.qdtuld-box-title { font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px; }
.qdtuld-row { display: grid; grid-template-columns: 130px 1fr; gap: 8px; font-size: 13px; padding: 3px 0; }
.qdtuld-row > span:first-child { color: #64748b; }
.qdtuld-hv { display: flex; gap: 10px; }
.qdtuld-hv-step { width: 22px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding-top: 8px; }
.qdtuld-hv-step > i { font-size: 18px; line-height: 20px; background: #f8fafc; border-radius: 50%; }
.qdtuld-hv-step::after { content: ""; flex: 1; width: 2px; margin-top: 3px; background: #22c55e; }
.qdtuld-hv:last-child .qdtuld-hv-step::after { display: none; }
.qdtuld-hv.done .qdtuld-hv-step > i { color: #22c55e; } .qdtuld-hv.no .qdtuld-hv-step > i { color: #dc2626; } .qdtuld-hv.wait .qdtuld-hv-step > i { color: #f59e0b; } .qdtuld-hv.todo .qdtuld-hv-step > i { color: #cbd5e1; }
.qdtuld-hv.todo .qdtuld-hv-step::after { background: #e2e8f0; }
.qdtuld-hv-av { width: 36px; height: 36px; border-radius: 50%; background: #eef2f7; color: #475569; font-size: 11.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 6px; }
.qdtuld-hv-main { flex: 1; min-width: 0; padding: 8px 0 14px; }
.qdtuld-hv-head { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }
.qdtuld-hv-name { font-weight: 600; color: #0f172a; }
.qdtuld-hv-time { color: #94a3b8; font-size: 12px; white-space: nowrap; }
.qdtuld-hv-sub { color: #64748b; font-size: 12px; }
.qdtuld-hv-act { font-size: 13px; margin-top: 2px; color: #2563eb; }
.qdtuld-hv-act.ok { color: #16a34a; } .qdtuld-hv-act.no { color: #dc2626; } .qdtuld-hv-act.wait { color: #d97706; }
.qdtuld-hv-msg { margin-top: 6px; background: #f1f5f9; border-radius: 6px; padding: 8px 10px; font-size: 13px; white-space: pre-wrap; }
.qdtuld-group { margin-bottom: 14px; }
.qdtuld-label { display: block; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #334155; }
.qdtuld-req { color: #dc2626; margin-left: 2px; }
.qdtuld-input { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font: inherit; font-size: 13.5px; }
.qdtuld-input.is-invalid { border-color: #dc2626; background: #fef2f2; }
.qdtuld-err { color: #dc2626; font-size: 12px; margin-top: 4px; display: none; }
.qdtuld-hint { color: #64748b; font-size: 12px; margin-top: 4px; }
.qdtuld-sign { background: #EFF6FF; border: 1px solid #BFDBFE; border-left: 4px solid #2563EB; border-radius: 6px; padding: 10px 12px; margin-bottom: 12px; font-size: 13px; color: #1E3A8A; }
.qdtuld-foot { padding: 12px 22px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; background: #f8fafc; }
@media (max-width: 900px) { .qdtuld-body { flex-direction: column; overflow-y: auto; } .qdtuld-right { width: auto; padding: 16px; } .qdtuld-preview { flex: none; } }
`;

const QDTU_EXTRA_CSS = [
    '.qdtu-modal .form-control { border:1px solid #cbd5e1; border-radius:6px; padding:0 10px; }',
    '.qdtu-modal textarea.form-control { padding:8px 10px; }',
    '.qdtu-modal .form-control.is-invalid, .qdtuld-input.is-invalid { border-color:#dc2626 !important; background:#fef2f2; }',
    '.qdtu-modal-box { max-height:94vh; }',
    '.qdtu-dtl-sec { border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:14px; background:#fff; }',
    '.qdtu-dtl-title { font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; margin-bottom:10px; display:flex; gap:8px; align-items:center; }',
    '.qdtu-dtl-title > i { color:#2563eb; }',
    '.qdtu-dtl-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:10px 18px; }',
    '.qdtu-dtl-item .k { font-size:12px; color:#64748b; margin-bottom:2px; }',
    '.qdtu-dtl-item .v { font-size:13.5px; font-weight:600; color:#0f172a; overflow-wrap:anywhere; }',
    '.qdtu-hist-row { display:grid; grid-template-columns:130px 160px 1fr; gap:10px; font-size:12.5px; padding:6px 0; border-bottom:1px dashed #e2e8f0; }',
    '.qdtu-sub { display:block; font-size:11px; color:#64748b; margin-top:3px; font-weight:500; }',
    '@media (max-width: 700px) { .qdtu-dtl-grid, .qdtu-gqx-grid2 { grid-template-columns:1fr; } .qdtu-hist-row { grid-template-columns:1fr; } }'
].join('\n');
const QDTU_TYPE = 'Cấp tạm ứng';
const QDTU_KIND = 'QĐ tạm ứng kinh phí'; // Loại trình (phân hệ chỉ gồm "Thông báo chi trả", "QĐ tạm ứng kinh phí")
const QDTU_ST = { REVIEW: 'Chờ duyệt', REJECT: 'Bị trả lại', PAY: 'Chờ chi trả', DONE: 'Hoàn thành' };
// Trạng thái vụ việc (17 Trạng thái vụ việc GQ YCBT) được phép Tạo Quyết định tạm ứng
const QDTU_ELIGIBLE = ['Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ'];
// Chuẩn hóa trạng thái cũ trong localStorage -> tên mới (chỉ dùng khi đọc dữ liệu)
const QDTU_LEGACY_STATUS = {
    'chờ thụ lý': 'Cử người giải quyết bồi thường', 'chờ kiểm tra': 'Cử người giải quyết bồi thường',
    'đang xác minh thiệt hại': 'Xác minh thiệt hại', 'đang thương lượng': 'Thương lượng',
    'thương lượng thành công': 'Chờ ban hành QĐ', 'thương lượng không thành công': 'Chờ ban hành QĐ'
};
// Đề nghị tạm ứng còn hiệu lực của vụ việc: không cho Tạo Quyết định tạm ứng mới
const QDTU_EFFECTIVE = ['Chờ duyệt', 'Chờ chi trả', 'Hoàn thành', 'Trả lại ngân sách nhà nước', 'Chờ thu hồi'];
const QDTU_CASH = 'Nhận tiền mặt';
const QDTU_TRANSFER = 'Nhận qua chuyển khoản';
const QDTU_MAX_FILE = 50 * 1024 * 1024;
const QDTU_DEFAULT_RATE = 75;
const QDTU_CAN_CU_DEFAULT = [
    'Căn cứ Điều 44 Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 đã được sửa đổi, bổ sung bởi Luật số 81/2025/QH15 và Luật số 15/2026/QH16;',
    'Căn cứ…………………………….(4)…………………………………….;',
    'Căn cứ Văn bản yêu cầu bồi thường ngày .../.../... của Ông/Bà….(5)….;'
];
// Vụ việc mẫu (dự phòng khi trình duyệt chưa có claimsList đủ trạng thái)
const QDTU_SEED_CLAIMS = [
    { code: 'BT-2026-171', nyc: 'Lê Thị Minh Thu', nycType: 'Cá nhân', nbth: 'Lê Thị Minh Thu', status: 'Cử người giải quyết bồi thường', agency: 'Sở Tư pháp Thành phố Hà Nội',
        nycCardNo: '001189004512', nycCardDate: '12/05/2021', nycCardPlace: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', nycAddressDetail: 'Số 17 ngõ 92 Nguyễn Khánh Toàn', nycPhuongXa: '00157 - Phường Nghĩa Đô', nycTinhThanh: 'Thành phố Hà Nội', nycCountry: 'Việt Nam',
        advanceNum: 60000000, advanceTinhThan: 40000000, advanceKhac: 20000000, advanceRecKenh: 'chuyen-khoan', advanceBankUser: 'Lê Thị Minh Thu', advanceBankAccount: '0011002233445', advanceBankName: 'Vietcombank', advanceBankBranch: 'Chi nhánh Thành Công',
        officerName: 'Nguyễn Văn Cán Bộ', date: '02/10/2026' },
    { code: 'BT-2026-172', nyc: 'Công ty TNHH Thương mại Phú Thịnh', nycType: 'Tổ chức', nycOrgCode: '0105566778', nbth: 'Công ty TNHH Thương mại Phú Thịnh', status: 'Xác minh thiệt hại', agency: 'Sở Tư pháp Thành phố Hà Nội',
        nycAddressDetail: 'Tầng 3, số 25 phố Láng Hạ', nycPhuongXa: 'Phường Láng', nycTinhThanh: 'Thành phố Hà Nội', nycCountry: 'Việt Nam',
        advanceNum: 120000000, advanceTinhThan: 0, advanceKhac: 120000000, advanceRecKenh: 'chuyen-khoan', advanceBankUser: 'Công ty TNHH Thương mại Phú Thịnh', advanceBankAccount: '1903366778899', advanceBankName: 'Techcombank', advanceBankBranch: 'Chi nhánh Đống Đa',
        officerName: 'Trần Thị Thu Hà', date: '28/09/2026' },
    { code: 'BT-2026-173', nyc: 'Trịnh Văn Hải', nycType: 'Cá nhân', nbth: 'Trịnh Văn Hải', status: 'Thương lượng', agency: 'Sở Tư pháp Thành phố Hà Nội',
        nycCardNo: '001082003377', nycCardDate: '20/03/2022', nycCardPlace: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', nycAddressDetail: 'Số 9 phố Hàng Chuối', nycPhuongXa: 'Phường Hai Bà Trưng', nycTinhThanh: 'Thành phố Hà Nội', nycCountry: 'Việt Nam',
        advanceNum: 80000000, advanceTinhThan: 50000000, advanceKhac: 30000000,
        advanceRecName: 'Trịnh Thị Hoa', advanceRecCard: '001195008866', advanceRecAddress: 'Số 9 phố Hàng Chuối, Phường Hai Bà Trưng, Thành phố Hà Nội, Việt Nam', advanceRecKenh: 'tien-mat',
        officerName: 'Phạm Minh Đức', date: '25/09/2026' },
    { code: 'BT-2026-174', nyc: 'Đặng Văn Sơn', nycType: 'Cá nhân', nbth: 'Đặng Văn Sơn', status: 'Chờ ban hành QĐ', agency: 'Sở Tư pháp Thành phố Hà Nội',
        nycCardNo: '001079006611', nycCardDate: '08/08/2021', nycCardPlace: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', nycAddressDetail: 'Số 40 phố Đội Cấn', nycPhuongXa: 'Phường Ba Đình', nycTinhThanh: 'Thành phố Hà Nội', nycCountry: 'Việt Nam',
        advanceNum: 50000000, advanceTinhThan: 30000000, advanceKhac: 20000000, advanceRecKenh: 'tien-mat',
        officerName: 'Nguyễn Văn Cán Bộ', date: '20/09/2026' }
];

function qdtuW() { return window.BTNN_WF || null; }
function qdtuEl(id) { return document.getElementById(id); }
function qdtuEsc(v) { return kpEsc(v); }
function qdtuFmt(n) { return (Number(n) || 0).toLocaleString('vi-VN'); }
function qdtuNum(v) { return parseFloat(String(v == null ? '' : v).replace(/\D/g, '')) || 0; }
// Viết bằng chữ: dùng hàm sẵn có của màn hình, bỏ "Không trăm (lẻ)" ở nhóm số đầu
function qdtuBangChu(n) {
    const s = String(docTienBangChu(Number(n) || 0)).replace(/^không trăm (lẻ )?/i, '');
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function qdtuRateText(r) { return (Number(r) || 0).toLocaleString('vi-VN', { maximumFractionDigits: 2 }); }
function qdtuMe() { const W = qdtuW(); return W ? W.getCurrentUserId() : ''; }
function qdtuUserName(id) { const W = qdtuW(); return id ? (W ? W.userName(id) : id) : ''; }
function qdtuUserLabel(id) { const W = qdtuW(); return id ? (W ? W.userLabel(id) : id) : ''; }
function qdtuUnitName(id) { const W = qdtuW(); return id && W ? W.unitName(id) : ''; }
function qdtuNow() { const W = qdtuW(); return W ? W.nowText() : formatCurrentDateTime(); }
function qdtuToday() { const W = qdtuW(); return W ? W.dateText() : formatDateViGlobal(new Date()); }
function qdtuFileSize(b) { return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
function qdtuIs(item) { return !!item && kpIsAdv(item) && !!item.qdtu; }
function qdtuFind(id) { return proposalsList.find(p => p.id === id) || null; }
function qdtuLines(v) { return String(v || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); }
function qdtuReadJson(key, fb) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
function qdtuHist(item, action, note, userId) {
    if (!Array.isArray(item.qdtuHistory)) item.qdtuHistory = [];
    const uid = userId === undefined ? qdtuMe() : userId;
    item.qdtuHistory.push({ at: qdtuNow(), userId: uid || '', userName: uid ? qdtuUserName(uid) : 'Hệ thống', action, note: note || '' });
}
function qdtuMark(id, on) {
    const el = qdtuEl(id);
    if (el) el.classList.toggle('is-invalid', !!on);
    const er = qdtuEl(id + 'Err');
    if (er) er.style.display = on ? 'block' : 'none';
}
function qdtuErrDiv(id) { return `<div class="qdtu-gqx-err" id="${id}Err">Đây là trường bắt buộc</div>`; }

// ---------------- Dữ liệu vụ việc (claimsList do màn Giải quyết yêu cầu bồi thường ghi) ----------------
function qdtuNormStatus(s) {
    const t = String(s || '').trim();
    if (!t) return '';
    return QDTU_LEGACY_STATUS[t.toLowerCase()] || t;
}
function qdtuAllClaims() {
    const raw = qdtuReadJson('claimsList', []);
    const list = (Array.isArray(raw) ? raw : []).filter(c => c && c.code);
    const has = code => list.some(c => c.code === code);
    QDTU_SEED_CLAIMS.forEach(c => { if (!has(c.code)) list.push(Object.assign({}, c)); });
    (typeof mockClaims !== 'undefined' && Array.isArray(mockClaims) ? mockClaims : []).forEach(c => {
        if (!c || !c.code || has(c.code)) return;
        list.push({ code: c.code, nyc: c.nyc, nycType: c.nycType || 'Cá nhân', nbth: c.nbth || c.nyc, status: c.status, agency: c.agency, nycCardNo: c.cardNo, nycCardDate: c.cardDate, nycCardPlace: c.cardPlace,
            address: c.address, advanceNum: c.suggestedAdvance, advanceTinhThan: c.advanceTinhThan, advanceKhac: c.advanceKhac, advanceRecKenh: c.advanceRecKenh,
            advanceBankUser: c.advanceBankUser, advanceBankAccount: c.advanceBankAccount, advanceBankName: c.advanceBankName, advanceBankBranch: c.advanceBankBranch, role: c.role });
    });
    return list;
}
function qdtuClaimByCode(code) { return qdtuAllClaims().find(c => c.code === code) || null; }
function qdtuIsMoneyClaim(c) { return !!c && !/^PHDD-/i.test(String(c.code || '')) && c.requestType !== 'honor'; }
function qdtuHasEffective(code, exceptId) {
    return proposalsList.some(p => p && kpIsAdv(p) && p.ycbtCode === code && p.id !== exceptId
        && (QDTU_EFFECTIVE.includes(kpNormStatus(p.status)) || (qdtuIs(p) && p.status === QDTU_ST.REJECT)));
}
// Hồ sơ GQBT có tích chọn Tạm ứng ("Có đề nghị tạm ứng kinh phí bồi thường"): có số tiền đề nghị tạm ứng > 0
function kpcdHasAdvance(c) { return !!c && (c.needAdvance === true || (qdtuNum(c.advanceNum) + qdtuNum(c.advanceTinhThan) + qdtuNum(c.advanceKhac)) > 0); }
// Danh sách chọn (ô tìm nhanh + Tìm kiếm nâng cao): hồ sơ GQBT có tích chọn Tạm ứng VÀ trạng thái thuộc QDTU_ELIGIBLE.
// Trùng QĐ tạm ứng không loại khỏi danh sách: kiểm tra và chặn khi bấm Tiếp tục (kpcdQdtuDup).
function qdtuEligibleClaims() {
    return qdtuAllClaims().filter(c => qdtuIsMoneyClaim(c) && kpcdHasAdvance(c) && QDTU_ELIGIBLE.includes(qdtuNormStatus(c.status)));
}
// Cập nhật QĐ tạm ứng Bị trả lại: vụ việc phải còn ở trạng thái QDTU_ELIGIBLE (không tìm thấy hồ sơ thì không chặn)
const QDTU_MSG_NOT_ELIGIBLE = 'Vụ việc không còn ở trạng thái được phép tạo Quyết định tạm ứng.';
function qdtuClaimStillEligible(code) {
    const c = qdtuAllClaims().find(x => x && x.code === code);
    return !c || QDTU_ELIGIBLE.includes(qdtuNormStatus(c.status));
}
// Chặn trùng: vụ việc đã có QĐ tạm ứng (Loại trình "QĐ tạm ứng kinh phí") ở trạng thái Chờ duyệt, Chờ chi trả hoặc Hoàn thành
const KPCD_QDTU_DUP_ST = ['Chờ duyệt', 'Chờ chi trả', 'Hoàn thành'];
function kpcdVv(code) { const W = qdtuW(); try { return (W && W.vuViecOf && W.vuViecOf(code, { create: false })) || ''; } catch (e) { return ''; } }
function kpcdQdtuDup(code, exceptId) {
    const vv = kpcdVv(code);
    return proposalsList.find(p => p && kpIsAdv(p) && p.id !== exceptId && KPCD_QDTU_DUP_ST.includes(kpNormStatus(p.status))
        && (p.ycbtCode === code || (vv && kpcdVv(p.ycbtCode) === vv))) || null;
}
function qdtuVv(code) { const W = qdtuW(); try { return (W && W.vuViecOf && W.vuViecOf(code)) || ''; } catch (e) { return ''; } }
function qdtuFindEligible(val) {
    const v = String(val || '').trim().split(/\s+/)[0].toLowerCase();
    if (!v) return null;
    return qdtuEligibleClaims().find(c => c.code.toLowerCase() === v || String(qdtuVv(c.code)).toLowerCase() === v) || null;
}
function qdtuClaimName(c) { return (c && (c.nyc || c.nycName)) || ''; }
function qdtuClaimNbth(c) { return (c && (c.nbth || c.nbthName || c.victimName)) || qdtuClaimName(c); }
function qdtuClaimIsOrg(c) { return !!c && (c.nycType === 'Tổ chức' || (!!c.nycOrgCode && !c.nycCardNo)); }
function qdtuClaimIdNo(c) { return !c ? '' : (qdtuClaimIsOrg(c) ? (c.nycOrgCode || c.nycOrgDocNo || '') : (c.nycCardNo || c.cardNo || c.idNo || '')); }
// Địa chỉ: ghép Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia (bỏ mã đơn vị hành chính, không lặp phần đã có)
function qdtuClaimAddress(c) {
    if (!c) return '';
    const parts = [];
    const push = p => {
        p = String(p || '').replace(/^\s*\d+\s*-\s*/, '').trim();
        if (p && !parts.some(x => x.toLowerCase().indexOf(p.toLowerCase()) > -1)) parts.push(p);
    };
    push(c.nycAddressDetail); push(c.nycPhuongXa); push(c.nycTinhThanh);
    if (!parts.length) push(c.address);
    if (parts.length) push(c.nycCountry);
    return parts.join(', ');
}
function qdtuClaimUnit(c) {
    const W = qdtuW(); if (!W || !c) return '';
    const rec = W.getRecord(c.code);
    if (rec && rec.rootUnitId) return rec.rootUnitId;
    const byName = W.resolveAgencyUnit ? W.resolveAgencyUnit(c.agency) : '';
    if (byName) return byName;
    const u = W.getCurrentUser();
    return u ? (W.getRootId(u.unitId) || u.unitId) : '';
}
// (6) Họ tên cán bộ giải quyết bồi thường được cử của vụ việc (hệ thống tự lấy; không có thì để dòng chấm trên văn bản)
function qdtuClaimOfficer(c) {
    if (c && c.officerName) return c.officerName;
    if (c && Array.isArray(c.officers) && c.officers[0] && c.officers[0].name) return c.officers[0].name;
    return '';
}
// Tài khoản thuộc Nhóm lãnh đạo trong Cấu hình luồng xử lý
function qdtuIsLeaderAcc(uid) {
    const W = qdtuW(); if (!W || !uid) return false;
    const cfg = W.getFlowConfig() || {};
    return Object.keys(cfg).some(root => Object.values(cfg[root] || {}).some(n => (n && n.leaders || []).includes(uid)));
}

// (3) Chức vụ của người đứng đầu CQGQBT = chức vụ đầu tiên của Loại cơ quan trong Danh mục Chức vụ [DM_58] + tên cơ quan
function qdtuLoaiOfUnit(name) {
    const n = String(name || '').trim();
    if (/^Sở\s/i.test(n)) return 'LDV_35';
    if (/^(UBND|Ủy ban nhân dân)\s/i.test(n)) return /^(UBND|Ủy ban nhân dân)\s+(phường|xã)\b/i.test(n) ? 'LDV_37' : 'LDV_36';
    if (/^Bộ\s/i.test(n)) return 'LDV_01';
    if (/^Cục\s/i.test(n)) return 'LDV_06';
    return '';
}
function qdtuHeadTitle(unitId) {
    const W = qdtuW();
    const root = W ? (W.getRootId(unitId) || unitId) : unitId;
    const name = qdtuUnitName(root) || '';
    const loai = qdtuLoaiOfUnit(name);
    const fallback = { LDV_35: 'Giám đốc Sở', LDV_36: 'Chủ tịch UBND', LDV_37: 'Chủ tịch UBND', LDV_01: 'Bộ trưởng', LDV_06: 'Cục trưởng' };
    let cv = '';
    try { if (loai && window.DM_LCQ) { const l = window.DM_LCQ.chucVuOf(loai); cv = l && l[0] ? l[0].name : ''; } } catch (e) { cv = ''; }
    cv = cv || fallback[loai] || '';
    if (!cv) return name ? 'Thủ trưởng ' + name : 'Thủ trưởng cơ quan giải quyết bồi thường';
    const last = cv.split(/\s+/).pop();
    return name.toLowerCase().indexOf(last.toLowerCase() + ' ') === 0 ? cv.slice(0, cv.length - last.length) + name : cv + ' ' + name;
}

// ---------------- Luồng phê duyệt (theo Cấu hình luồng xử lý, như Quyết định GQBT) ----------------
function qdtuRecLike(code) {
    const W = qdtuW();
    const rec = W ? W.getRecord(code) : null;
    if (rec && rec.chuTri) return rec;
    const me = qdtuMe();
    const cb = me && !qdtuIsLeaderAcc(me) ? me : 'canbonv';
    return { chuTri: cb, createdBy: cb, routes: rec ? rec.routes || [] : [] };
}
function qdtuLevels(code) {
    const W = qdtuW(); if (!W) return [];
    const rl = qdtuRecLike(code);
    const path = W.computeApprovalPath(rl) || [];
    const ft = W.flowTypeOf ? W.flowTypeOf(rl.loaiYeuCau, rl.rootUnitId) : undefined;
    return path.map((u, i) => ({ unitId: u, leaders: i === 0 ? W.firstLevelLeaders(rl) : W.getLeaders(u, ft) }));
}
function qdtuIsLast(a) { return !!a && a.level >= (a.path || []).length - 1; }
// Chỉ Lãnh đạo được giao tại cấp hiện hành (cấp chưa giao đích danh: Nhóm lãnh đạo của cấp) thấy Ký duyệt / Từ chối
function qdtuCanAct(item) {
    if (!qdtuIs(item) || item.status !== QDTU_ST.REVIEW || kpRole() !== 'lanh-dao') return false;
    const a = item.qdtuApproval;
    if (!a || !a.pending) return false;
    const me = qdtuMe();
    const assignee = (a.assignees || [])[a.level];
    if (assignee) return assignee === me;
    const W = qdtuW();
    return !!W && W.isLeaderOf(me, a.path[a.level]);
}
function qdtuLeaderHandled(item) {
    const me = qdtuMe();
    return (item.qdtuHistory || []).some(h => h.userId === me && /^(Ký duyệt|Từ chối)/.test(h.action || ''));
}

// CSS riêng của màn hình Tạo Quyết định tạm ứng (thẻ thông tin như màn hình Tạo Quyết định GQBT)
const QDTU_PAGE_CSS = [
    '#qdtuPanel .qdtu-card { border:1px solid var(--border-color); border-radius:8px; background:#fff; margin-bottom:16px; overflow:hidden; }',
    '#qdtuPanel .qdtu-card-head { background:#F1F5F9; border-bottom:1px solid var(--border-color); padding:10px 16px; font-size:12.5px; font-weight:700; letter-spacing:.3px; text-transform:uppercase; color:var(--primary-light); display:flex; align-items:center; gap:8px; }',
    '#qdtuPanel .qdtu-card-body { padding:16px; }',
    '#qdtuPanel .qdtu-grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:14px 20px; }',
    '#qdtuPanel .qdtu-grid.c3 { grid-template-columns:repeat(3, minmax(0,1fr)); }',
    '#qdtuPanel .qdtu-full { grid-column:1/-1; }',
    '#qdtuPanel .form-group { margin-bottom:0; }',
    '#qdtuPanel .form-control.is-invalid { border-color:#dc2626 !important; background:#fef2f2; }',
    '#qdtuPanel .qdtu-ro { background:#F1F5F9; border:1px solid var(--border-color); border-radius:6px; padding:8px 12px; min-height:20px; font-weight:600; color:var(--text-main); }',
    '#qdtuPanel .qdtu-words { font-style:italic; color:var(--text-muted); font-size:12.5px; margin-top:4px; }',
    '#qdtuPanel .qdtu-hint { font-size:12px; color:#64748b; margin-top:6px; }',
    '#qdtuPanel .qdtu-note { background:#EFF6FF; border:1px solid #BFDBFE; border-left:4px solid #2563EB; border-radius:6px; padding:8px 12px; font-size:12.5px; color:#1E3A8A; margin-top:12px; }',
    '#qdtuPanel .qdtu-empty { color:#64748b; font-size:13px; padding:12px 16px; border:1px dashed var(--border-color); border-radius:8px; background:#fff; margin-bottom:16px; }',
    '.qdtu-lk-table { width:100%; border-collapse:collapse; font-size:13px; }',
    '.qdtu-lk-table th, .qdtu-lk-table td { border-bottom:1px solid #e2e8f0; padding:8px; text-align:left; vertical-align:middle; }',
    '.qdtu-lk-table th { background:#f8fafc; font-weight:700; color:#334155; }',
    '.qdtu-lk-pages { display:flex; gap:4px; justify-content:flex-end; margin-top:10px; }',
    '.qdtu-lk-pages span { border:1px solid #cbd5e1; border-radius:4px; padding:3px 9px; cursor:pointer; font-size:12px; }',
    '.qdtu-lk-pages span.active { background:#2563eb; color:#fff; border-color:#2563eb; }',
    '@media (max-width: 760px) { #qdtuPanel .qdtu-grid, #qdtuPanel .qdtu-grid.c3 { grid-template-columns:1fr; } }'
].join('\n');
function qdtuInjectCss() {
    if (qdtuEl('qdtuCss')) return;
    const st = document.createElement('style');
    st.id = 'qdtuCss';
    st.textContent = QDTU_CSS + '\n' + QDTU_LD_CSS + '\n' + QDTU_EXTRA_CSS + '\n' + QDTU_PAGE_CSS;
    document.head.appendChild(st);
}
function qdtuFrameFull(on) {
    try {
        const fe = window.frameElement; if (!fe) return;
        if (on) { if (fe.dataset.qdtuPrev === undefined) fe.dataset.qdtuPrev = fe.getAttribute('style') || ''; fe.setAttribute('style', fe.dataset.qdtuPrev + ';position:fixed;inset:0;width:100vw;height:100vh;z-index:99999;border:0;'); }
        else if (fe.dataset.qdtuPrev !== undefined) { fe.setAttribute('style', fe.dataset.qdtuPrev); delete fe.dataset.qdtuPrev; }
    } catch (e) { /* khác nguồn: bỏ qua */ }
}

// =====================================================================================
// MÀN HÌNH TẠO QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ (bố cục như Tạo Quyết định GQBT)
// =====================================================================================
let qdtuState = { id: null, claimCode: '', unitId: '', isOrg: false, nycRole: '' };
function qdtuFld(id, label, req, control, extraCls) {
    return `<div class="form-group${extraCls ? ' ' + extraCls : ''}"><span class="form-label">${label}${req ? '<span class="required">*</span>' : ''}</span>${control}${req ? qdtuErrDiv(id) : ''}</div>`;
}
function qdtuInput(id, max, ph, extra) { return `<input type="text" class="form-control" id="${id}" maxlength="${max}" placeholder="${ph || ''}" oninput="qdtuMark('${id}', false)" ${extra || ''}>`; }
function qdtuEnsurePage() {
    qdtuInjectCss();
    if (qdtuEl('qdtuPanel')) return;
    const p = document.createElement('div');
    p.id = 'qdtuPanel';
    p.className = 'inline-form-panel';
    const money = (id, label, req) => qdtuFld(id, label, req, `<input type="text" class="form-control" id="${id}" maxlength="20" style="text-align:right;" placeholder="0" oninput="formatNumberInput(this); qdtuMark('${id}', false); qdtuRecalc('${id}')">`);
    p.innerHTML = `<div class="inline-form-header"><span class="inline-form-title" id="qdtuPageTitle"><i class="fa-solid fa-file-invoice"></i> TẠO QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ</span></div>
    <div class="inline-form-body" style="background:#F8FAFC; max-height:none;">
        <div id="qdtuReturnedBlock" style="display:none; background:#FEF2F2; border:1px solid #FECACA; border-left:4px solid #DC2626; border-radius:8px; padding:14px 16px; margin-bottom:16px;"></div>
        <div class="qdtu-card" id="qdtuClaimCard">
            <div class="qdtu-card-head"><i class="fa-solid fa-folder-open"></i> Hồ sơ</div>
            <div class="qdtu-card-body"><div class="qdtu-grid">
                <div class="form-group"><span class="form-label">Mã hồ sơ<span class="required">*</span></span>
                    <div style="display:flex; gap:8px; align-items:center;">
                        <input type="text" class="form-control" id="qdtuClaimInput" list="qdtuClaimDatalist" autocomplete="off" placeholder="Nhập hoặc chọn mã hồ sơ..." style="flex:1;" oninput="qdtuMark('qdtuClaimInput', false)" onchange="qdtuOnClaimPick(this.value)"><datalist id="qdtuClaimDatalist"></datalist>
                        <button type="button" class="btn btn-primary" id="qdtuBtnSearch" onclick="qdtuSearchClaim()" style="height:38px; padding:0 16px; font-weight:600; display:inline-flex; align-items:center; gap:6px; white-space:nowrap;"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                        <button type="button" class="btn btn-secondary" id="qdtuBtnAdv" onclick="qdtuOpenLookup()" style="height:38px; padding:0 16px; font-weight:600; display:inline-flex; align-items:center; gap:6px; white-space:nowrap;"><i class="fa-solid fa-magnifying-glass-plus"></i> Tìm kiếm nâng cao</button>
                    </div>
                    <div class="qdtu-gqx-err" id="qdtuClaimInputErr">Đây là trường bắt buộc</div>
                    <div id="qdtuClaimBadge" style="display:none; margin-top:8px;"><span class="badge badge-pending" id="qdtuClaimBadgeText" style="font-size:12.5px; padding:6px 12px; border-radius:6px;"></span></div>
                </div>
                <div class="form-group" id="qdtuUnitGroup" style="display:none;"><span class="form-label">Cơ quan giải quyết</span><div class="qdtu-ro" id="qdtuUnitText">--</div></div>
            </div></div>
        </div>
        <div class="qdtu-empty" id="qdtuEmptyHint"><i class="fa-solid fa-circle-info"></i> Chọn Mã hồ sơ để hệ thống tự động điền thông tin theo hồ sơ vụ việc.</div>
        <div id="qdtuInfoCards" style="display:none;">
            <div class="qdtu-card">
                <div class="qdtu-card-head"><i class="fa-solid fa-user"></i> Thông tin người yêu cầu</div>
                <div class="qdtu-card-body"><div class="qdtu-grid">
                    ${qdtuFld('qdtuNycName', 'Họ và tên/Tên tổ chức', true, qdtuInput('qdtuNycName', 255, 'Nhập họ và tên/tên tổ chức'))}
                    ${qdtuFld('qdtuNycIdNo', 'Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế/Mã số của tổ chức', true, qdtuInput('qdtuNycIdNo', 50, 'Nhập số giấy tờ/mã số tổ chức', 'onchange="qdtuSyncRecNote()"'))}
                    ${qdtuFld('qdtuNycAddress', 'Địa chỉ', true, qdtuInput('qdtuNycAddress', 1000, 'Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia'), 'qdtu-full')}
                </div></div>
            </div>
            <div class="qdtu-card">
                <div class="qdtu-card-head"><i class="fa-solid fa-coins"></i> Số tiền tạm ứng kinh phí</div>
                <div class="qdtu-card-body">
                    <div class="qdtu-grid">
                        ${money('qdtuAmtTinhThan', 'Thiệt hại về tinh thần (đồng)', false)}
                        ${money('qdtuAmtKhac', 'Thiệt hại khác có thể tính được ngay mà không cần xác minh (đồng)', false)}
                        ${qdtuFld('qdtuRate', 'Tỷ lệ tạm ứng trên tổng số tiền thiệt hại (%)', true, `<input type="number" class="form-control" id="qdtuRate" min="0" max="100" step="0.01" style="text-align:right;" oninput="qdtuMark('qdtuRate', false); qdtuRecalc('qdtuRate')" onchange="if (this.value !== '') { this.value = Math.round(parseFloat(this.value) * 100) / 100; qdtuRecalc('qdtuRate'); }">`)}
                        <div class="form-group"><span class="form-label">Số tiền tạm ứng kinh phí (đồng)<span class="required">*</span></span>
                            <input type="text" class="form-control" id="qdtuAmount" maxlength="20" style="text-align:right; font-weight:700;" placeholder="0" oninput="formatNumberInput(this); qdtuMark('qdtuAmount', false); qdtuRecalc('qdtuAmount')">
                            ${qdtuErrDiv('qdtuAmount')}
                            <div class="qdtu-words" id="qdtuAmountWords"></div>
                        </div>
                    </div>
                    <div class="qdtu-hint" id="qdtuTotalHint"></div>
                </div>
            </div>
            <div class="qdtu-card">
                <div class="qdtu-card-head"><i class="fa-solid fa-hand-holding-dollar"></i> Thông tin người nhận tạm ứng</div>
                <div class="qdtu-card-body"><div class="qdtu-grid">
                    ${qdtuFld('qdtuRecName', 'Họ và tên người nhận tạm ứng kinh phí', true, qdtuInput('qdtuRecName', 255, 'Nhập họ và tên người nhận', 'onchange="qdtuSyncRecNote()"'))}
                    ${qdtuFld('qdtuRecIdNo', 'Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế', true, qdtuInput('qdtuRecIdNo', 50, 'Nhập số giấy tờ', 'onchange="qdtuSyncRecNote()"'))}
                    ${qdtuFld('qdtuRecAddress', 'Địa chỉ', true, qdtuInput('qdtuRecAddress', 1000, 'Địa chỉ nơi cư trú của người nhận'), 'qdtu-full')}
                </div>
                <div class="qdtu-note" id="qdtuRecNote"></div></div>
            </div>
            <div class="qdtu-card">
                <div class="qdtu-card-head"><i class="fa-solid fa-money-bill-transfer"></i> Phương thức chi trả tiền tạm ứng</div>
                <div class="qdtu-card-body">
                    <div class="form-group" style="margin-bottom:14px; max-width:320px;"><span class="form-label">Phương thức nhận tiền<span class="required">*</span></span>
                        <select class="form-control" id="qdtuPayMethod" onchange="qdtuOnPayMethod(this.value)"><option value="${QDTU_TRANSFER}">${QDTU_TRANSFER}</option><option value="${QDTU_CASH}">${QDTU_CASH}</option></select></div>
                    <div class="qdtu-grid" id="qdtuTransferGroup">
                        ${qdtuFld('qdtuAccHolder', 'Chủ tài khoản', true, qdtuInput('qdtuAccHolder', 255, 'Nhập họ và tên chủ tài khoản...'))}
                        ${qdtuFld('qdtuAccount', 'Số tài khoản ngân hàng', true, qdtuInput('qdtuAccount', 50, 'Nhập số tài khoản...'))}
                        ${qdtuFld('qdtuBank', 'Tên ngân hàng', true, qdtuInput('qdtuBank', 255, 'Nhập tên ngân hàng...'))}
                        ${qdtuFld('qdtuBranch', 'Chi nhánh ngân hàng', false, qdtuInput('qdtuBranch', 255, 'Nhập chi nhánh...'))}
                    </div>
                    <div class="qdtu-grid" id="qdtuCashGroup" style="display:none;">
                        ${qdtuFld('qdtuCashPlace', 'Cơ quan chi trả tiền mặt', true, qdtuInput('qdtuCashPlace', 255, 'Tên cơ quan giải quyết'))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="inline-form-footer" style="display:flex; justify-content:flex-end; gap:8px;">
        <button type="button" class="btn btn-secondary" onclick="qdtuClosePage()">Hủy bỏ</button>
        <button type="button" class="btn btn-primary" onclick="qdtuContinue()" style="font-weight:600;">Tiếp tục <i class="fa-solid fa-arrow-right"></i></button>
    </div>`;
    const list = qdtuEl('contentListProposals');
    list.parentNode.insertBefore(p, list.nextSibling);
}
const QDTU_FIELD_IDS = ['qdtuNycName', 'qdtuNycIdNo', 'qdtuNycAddress', 'qdtuAmtTinhThan', 'qdtuAmtKhac', 'qdtuRate', 'qdtuAmount', 'qdtuRecName', 'qdtuRecIdNo', 'qdtuRecAddress', 'qdtuAccHolder', 'qdtuAccount', 'qdtuBank', 'qdtuBranch', 'qdtuCashPlace'];
function qdtuSetVal(id, v) { const el = qdtuEl(id); if (el) { el.value = v == null ? '' : v; if (el._flatpickr && v) el._flatpickr.setDate(v, false, 'd/m/Y'); } }
function qdtuFillClaimDatalist() {
    const dl = qdtuEl('qdtuClaimDatalist'); if (!dl) return;
    dl.innerHTML = qdtuEligibleClaims().map(c => `<option value="${qdtuEsc(c.code)}">${qdtuEsc(qdtuVv(c.code) || '-')} - ${qdtuEsc(qdtuClaimName(c))}</option>`).join('');
}
function qdtuShowPage(on) {
    const panel = qdtuEl('qdtuPanel');
    ['contentListProposals', 'dashboardStats'].forEach(id => { const el = qdtuEl(id); if (el) el.style.display = on ? 'none' : (id === 'dashboardStats' ? 'grid' : 'block'); });
    const inl = qdtuEl('inlineProposalFormPanel'); if (on && inl) inl.style.display = 'none';
    if (panel) panel.style.display = on ? 'flex' : 'none';
    window.scrollTo(0, 0);
}
// Mở màn hình: id rỗng = Tạo mới; id = Cập nhật Quyết định tạm ứng Bị trả lại
function qdtuOpenPage(id) {
    qdtuEnsurePage();
    const item = id ? qdtuFind(id) : null;
    if (id && (!qdtuIs(item) || item.status !== QDTU_ST.REJECT)) return;
    if (item && !qdtuClaimStillEligible(item.ycbtCode)) { showToast(QDTU_MSG_NOT_ELIGIBLE, 'error'); return; }
    qdtuState = { id: item ? item.id : null, claimCode: '', unitId: '', isOrg: false, nycRole: '' };
    QDTU_FIELD_IDS.concat(['qdtuClaimInput']).forEach(x => { qdtuSetVal(x, ''); qdtuMark(x, false); });
    qdtuEl('qdtuClaimBadge').style.display = 'none';
    qdtuEl('qdtuUnitGroup').style.display = 'none';
    qdtuEl('qdtuInfoCards').style.display = 'none';
    qdtuEl('qdtuEmptyHint').style.display = '';
    qdtuEl('qdtuPayMethod').value = QDTU_TRANSFER;
    qdtuOnPayMethod(QDTU_TRANSFER);
    const lock = !!item;
    qdtuEl('qdtuClaimInput').readOnly = lock;
    qdtuEl('qdtuClaimInput').style.background = lock ? '#F1F5F9' : '';
    qdtuEl('qdtuBtnSearch').style.display = lock ? 'none' : 'inline-flex';
    qdtuEl('qdtuBtnAdv').style.display = lock ? 'none' : 'inline-flex';
    qdtuEl('qdtuPageTitle').innerHTML = item ? `<i class="fa-solid fa-pen-to-square"></i> CẬP NHẬT QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ: ${qdtuEsc(item.code)}` : '<i class="fa-solid fa-file-invoice"></i> TẠO QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ';
    const rb = qdtuEl('qdtuReturnedBlock');
    if (item && item.qdtuReturned) {
        rb.style.display = 'block';
        rb.innerHTML = `<div style="font-weight:700; color:#B91C1C; margin-bottom:6px;"><i class="fa-solid fa-triangle-exclamation"></i> Lý do bị từ chối</div><div style="font-size:13px;">${qdtuEsc(qdtuUserName(item.qdtuReturned.by))} - ${qdtuEsc(item.qdtuReturned.at)}</div><div style="font-size:13px; margin-top:4px; white-space:pre-wrap;">${qdtuEsc(item.qdtuReturned.reason)}</div>`;
    } else { rb.style.display = 'none'; rb.innerHTML = ''; }
    qdtuFillClaimDatalist();
    if (item) qdtuLoadForm(item.qdtu);
    qdtuShowPage(true);
}
function qdtuClosePage() {
    qdtuShowPage(false);
    renderProposalsTable();
}
function qdtuSearchClaim() {
    const val = qdtuEl('qdtuClaimInput').value.trim();
    const er = qdtuEl('qdtuClaimInputErr');
    if (!val) { er.innerText = 'Đây là trường bắt buộc'; qdtuMark('qdtuClaimInput', true); qdtuEl('qdtuClaimInput').focus(); return; }
    const c = qdtuFindEligible(val);
    if (!c) { er.innerText = 'Không tìm thấy hồ sơ đủ điều kiện tạo Quyết định tạm ứng.'; qdtuMark('qdtuClaimInput', true); qdtuEl('qdtuClaimInput').focus(); return; }
    qdtuSelectClaim(c.code);
}
function qdtuOnClaimPick(val) { if (qdtuFindEligible(val)) qdtuSearchClaim(); }
function qdtuShowClaim(c, unitId) {
    const vv = qdtuVv(c.code);
    qdtuEl('qdtuClaimInput').value = c.code;
    qdtuMark('qdtuClaimInput', false);
    qdtuEl('qdtuClaimBadge').style.display = 'block';
    qdtuEl('qdtuClaimBadgeText').innerText = `Mã hồ sơ ${c.code}${vv ? ' - Mã vụ việc ' + vv : ''} - ${qdtuClaimName(c)} - ${qdtuNormStatus(c.status) || '-'}`;
    qdtuEl('qdtuUnitGroup').style.display = '';
    qdtuEl('qdtuUnitText').innerText = qdtuUnitName(unitId) || c.agency || '--';
    qdtuEl('qdtuInfoCards').style.display = '';
    qdtuEl('qdtuEmptyHint').style.display = 'none';
}
// Chọn vụ việc: toàn bộ thông tin mặc định lấy theo hồ sơ vụ việc, cho phép sửa
function qdtuSelectClaim(code) {
    const c = qdtuClaimByCode(code); if (!c) return;
    const unitId = qdtuClaimUnit(c);
    const isOrg = qdtuClaimIsOrg(c);
    qdtuState.claimCode = c.code; qdtuState.unitId = unitId; qdtuState.isOrg = isOrg; qdtuState.nycRole = c.nycRole || c.role || 'Người bị thiệt hại';
    qdtuShowClaim(c, unitId);
    const name = qdtuClaimName(c), idNo = qdtuClaimIdNo(c), addr = qdtuClaimAddress(c);
    qdtuSetVal('qdtuNycName', name); qdtuSetVal('qdtuNycIdNo', idNo); qdtuSetVal('qdtuNycAddress', addr);
    let tt = qdtuNum(c.advanceTinhThan), kh = qdtuNum(c.advanceKhac);
    if (!tt && !kh) kh = qdtuNum(c.advanceNum);
    qdtuSetVal('qdtuAmtTinhThan', qdtuFmt(tt)); qdtuSetVal('qdtuAmtKhac', qdtuFmt(kh)); qdtuSetVal('qdtuRate', QDTU_DEFAULT_RATE);
    qdtuRecalc('qdtuRate');
    const recName = c.advanceRecName || name;
    qdtuSetVal('qdtuRecName', recName);
    qdtuSetVal('qdtuRecIdNo', c.advanceRecCard || idNo);
    qdtuSetVal('qdtuRecAddress', c.advanceRecAddress || addr);
    const kenh = String(c.advanceRecKenh || c.payoutMethod || '');
    const cash = /tien-mat|tiền mặt/i.test(kenh);
    qdtuEl('qdtuPayMethod').value = cash ? QDTU_CASH : QDTU_TRANSFER;
    qdtuOnPayMethod(qdtuEl('qdtuPayMethod').value);
    qdtuSetVal('qdtuAccHolder', c.advanceBankUser || c.payoutRecName || recName);
    qdtuSetVal('qdtuAccount', c.advanceBankAccount || c.payoutBankAccount || '');
    qdtuSetVal('qdtuBank', c.advanceBankName || c.payoutBankName || '');
    qdtuSetVal('qdtuBranch', c.advanceBankBranch || c.payoutBankBranch || '');
    qdtuSetVal('qdtuCashPlace', qdtuUnitName(qdtuW() ? (qdtuW().getRootId(unitId) || unitId) : unitId) || c.agency || '');
    QDTU_FIELD_IDS.forEach(x => qdtuMark(x, false));
    qdtuSyncRecNote();
}
// Nạp lại dữ liệu đã lưu (Cập nhật Quyết định tạm ứng Bị trả lại)
function qdtuLoadForm(f) {
    if (!f) return;
    const c = qdtuClaimByCode(f.claimCode) || { code: f.claimCode, nyc: f.nycName, status: '' };
    qdtuState.claimCode = f.claimCode; qdtuState.unitId = f.unitId; qdtuState.isOrg = !!f.isOrg; qdtuState.nycRole = f.nycRole || '';
    qdtuShowClaim(c, f.unitId);
    qdtuSetVal('qdtuNycName', f.nycName); qdtuSetVal('qdtuNycIdNo', f.nycIdNo); qdtuSetVal('qdtuNycAddress', f.nycAddress);
    qdtuSetVal('qdtuAmtTinhThan', qdtuFmt(f.tinhThan)); qdtuSetVal('qdtuAmtKhac', qdtuFmt(f.khac)); qdtuSetVal('qdtuRate', f.rate); qdtuSetVal('qdtuAmount', qdtuFmt(f.amount));
    qdtuRecalc('none');
    qdtuSetVal('qdtuRecName', f.recName); qdtuSetVal('qdtuRecIdNo', f.recIdNo); qdtuSetVal('qdtuRecAddress', f.recAddress);
    qdtuEl('qdtuPayMethod').value = f.payMethod === QDTU_CASH ? QDTU_CASH : QDTU_TRANSFER;
    qdtuOnPayMethod(qdtuEl('qdtuPayMethod').value);
    qdtuSetVal('qdtuAccHolder', f.accHolder); qdtuSetVal('qdtuAccount', f.account); qdtuSetVal('qdtuBank', f.bank); qdtuSetVal('qdtuBranch', f.branch); qdtuSetVal('qdtuCashPlace', f.cashPlace);
    qdtuSyncRecNote();
}
// Số tiền tạm ứng = (Thiệt hại về tinh thần + Thiệt hại khác) x Tỷ lệ % / 100, làm tròn đến đồng.
// Sửa Số tiền tạm ứng: Tỷ lệ % = Số tiền tạm ứng / (Thiệt hại về tinh thần + Thiệt hại khác) x 100, làm tròn 02 chữ số thập phân (bỏ số 0 thừa);
// tổng 02 khoản = 0 thì giữ nguyên Tỷ lệ %. Không kiểm tra mức tạm ứng tối thiểu.
function qdtuRecalc(src) {
    const tt = qdtuNum(qdtuEl('qdtuAmtTinhThan').value), kh = qdtuNum(qdtuEl('qdtuAmtKhac').value);
    const total = tt + kh;
    const rateEl = qdtuEl('qdtuRate'), amtEl = qdtuEl('qdtuAmount');
    if (src === 'qdtuAmount') {
        const amt = qdtuNum(amtEl.value);
        if (total > 0) rateEl.value = Math.round(amt / total * 10000) / 100;
    } else if (src !== 'none') {
        const rate = parseFloat(rateEl.value);
        amtEl.value = isNaN(rate) ? '' : qdtuFmt(Math.round(total * rate / 100));
    }
    const amount = qdtuNum(amtEl.value);
    qdtuEl('qdtuAmountWords').innerText = amtEl.value.trim() ? 'Viết bằng chữ: ' + qdtuBangChu(amount) : '';
    qdtuEl('qdtuTotalHint').innerText = `Tổng số tiền tạm ứng được tính theo các thiệt hại: ${qdtuFmt(total)} đồng.`;
}
function qdtuOnPayMethod(v) {
    const cash = v === QDTU_CASH;
    qdtuEl('qdtuTransferGroup').style.display = cash ? 'none' : '';
    qdtuEl('qdtuCashGroup').style.display = cash ? '' : 'none';
    ['qdtuAccHolder', 'qdtuAccount', 'qdtuBank', 'qdtuCashPlace'].forEach(x => qdtuMark(x, false));
}
// Người nhận tạm ứng khác Người yêu cầu: khác Họ và tên hoặc khác Số định danh (không phân biệt hoa thường, bỏ khoảng trắng thừa)
function qdtuDiffRecipient(f) {
    const n = s => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase();
    return n(f.recName) !== n(f.nycName) || n(f.recIdNo) !== n(f.nycIdNo);
}
function qdtuSyncRecNote() {
    const el = qdtuEl('qdtuRecNote'); if (!el) return;
    const diff = qdtuDiffRecipient({ recName: qdtuEl('qdtuRecName').value, recIdNo: qdtuEl('qdtuRecIdNo').value, nycName: qdtuEl('qdtuNycName').value, nycIdNo: qdtuEl('qdtuNycIdNo').value });
    el.innerHTML = diff
        ? '<i class="fa-solid fa-circle-info"></i> Người nhận tạm ứng khác Người yêu cầu: Quyết định tạm ứng có Điều 2 (thông tin người nhận tạm ứng kinh phí).'
        : '<i class="fa-solid fa-circle-info"></i> Người nhận tạm ứng là Người yêu cầu: Quyết định tạm ứng không có Điều 2; các Điều sau được đánh số lại.';
}
function qdtuFormData() {
    const v = id => (qdtuEl(id) ? qdtuEl(id).value.trim() : '');
    const W = qdtuW();
    const root = W ? (W.getRootId(qdtuState.unitId) || qdtuState.unitId) : qdtuState.unitId;
    return {
        claimCode: qdtuState.claimCode, unitId: root, unitName: qdtuUnitName(root), isOrg: qdtuState.isOrg, nycRole: qdtuState.nycRole,
        nycName: v('qdtuNycName'), nycIdNo: v('qdtuNycIdNo'), nycAddress: v('qdtuNycAddress'),
        tinhThan: qdtuNum(v('qdtuAmtTinhThan')), khac: qdtuNum(v('qdtuAmtKhac')), rate: v('qdtuRate') === '' ? '' : parseFloat(v('qdtuRate')), amount: qdtuNum(v('qdtuAmount')),
        recName: v('qdtuRecName'), recIdNo: v('qdtuRecIdNo'), recAddress: v('qdtuRecAddress'),
        officer: qdtuClaimOfficer(qdtuClaimByCode(qdtuState.claimCode)),
        payMethod: v('qdtuPayMethod'), accHolder: v('qdtuAccHolder'), account: v('qdtuAccount'), bank: v('qdtuBank'), branch: v('qdtuBranch'), cashPlace: v('qdtuCashPlace')
    };
}
// Tiếp tục: chỉ kiểm tra trống trường bắt buộc -> mở Popup Trình ký Quyết định tạm ứng kinh phí
function qdtuContinue() {
    if (!qdtuState.claimCode) { qdtuEl('qdtuClaimInputErr').innerText = 'Đây là trường bắt buộc'; qdtuMark('qdtuClaimInput', true); qdtuEl('qdtuClaimInput').focus(); return; }
    const cash = qdtuEl('qdtuPayMethod').value === QDTU_CASH;
    const req = ['qdtuNycName', 'qdtuNycIdNo', 'qdtuNycAddress', 'qdtuRate', 'qdtuAmount', 'qdtuRecName', 'qdtuRecIdNo', 'qdtuRecAddress'].concat(cash ? ['qdtuCashPlace'] : ['qdtuAccHolder', 'qdtuAccount', 'qdtuBank']);
    const bad = req.filter(id => !String(qdtuEl(id).value || '').trim());
    req.forEach(id => qdtuMark(id, bad.includes(id)));
    if (bad.length) { qdtuEl(bad[0]).focus(); qdtuEl(bad[0]).scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    // Cập nhật QĐ tạm ứng Bị trả lại: chặn khi vụ việc đã chuyển khỏi trạng thái QDTU_ELIGIBLE
    if (qdtuState.id && !qdtuClaimStillEligible(qdtuState.claimCode)) { showToast(QDTU_MSG_NOT_ELIGIBLE, 'error'); return; }
    // Chặn trùng QĐ tạm ứng của vụ việc (Chờ duyệt / Chờ chi trả / Hoàn thành) - MSG-ERR-BTNN-KP-012
    const dup = kpcdQdtuDup(qdtuState.claimCode, qdtuState.id);
    if (dup) { showToast(`Vụ việc ${kpcdVv(dup.ycbtCode) || dup.ycbtCode} đã có Quyết định tạm ứng kinh phí ${dup.code} ở trạng thái ${kpNormStatus(dup.status)}. Không thể tạo Quyết định tạm ứng mới.`, 'error'); return; }
    qdtuOpenSign(qdtuFormData());
}

// ---------------- MH Tìm kiếm nâng cao vụ việc (như MH02a Quyết định GQBT) ----------------
let qdtuLkPage = 1;
function qdtuOpenLookup() {
    qdtuInjectCss();
    qdtuCloseLookup();
    const m = document.createElement('div');
    m.className = 'qdtu-modal open'; m.id = 'qdtuLkModal';
    const f = (id, label) => `<div class="qdtu-gqx-field"><label class="form-label" for="${id}">${label}</label><input type="text" class="form-control" id="${id}" onkeydown="if(event.key==='Enter') qdtuRenderLookup()"></div>`;
    m.innerHTML = `<div class="qdtu-modal-box qdtu-qs-box" style="width:1000px;">
        <div class="qdtu-qs-head"><div><div class="qdtu-qs-head-title"><span class="qdtu-qs-head-ico"><i class="fa-solid fa-magnifying-glass-plus"></i></span><span>TÌM KIẾM NÂNG CAO MÃ HỒ SƠ</span></div>
            <div class="qdtu-qs-sub">Hồ sơ có đề nghị tạm ứng, trạng thái: ${QDTU_ELIGIBLE.map(qdtuEsc).join(', ')}</div></div>
            <button type="button" class="qdtu-qs-head-close" onclick="qdtuCloseLookup()" title="Đóng">&times;</button></div>
        <div class="qdtu-qs-body qdtu-gqx-body">
            <div class="qdtu-gqx-sec">
                <div class="qdtu-gqx-grid2" style="grid-template-columns:repeat(4,1fr);">${f('qdtuLkVv', 'Mã vụ việc')}${f('qdtuLkCode', 'Mã hồ sơ')}${f('qdtuLkNyc', 'Tên cá nhân/Tổ chức yêu cầu')}${f('qdtuLkNbth', 'Tên cá nhân/Tổ chức bị thiệt hại')}</div>
                <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:12px;"><button type="button" class="btn btn-secondary btn-sm" onclick="['qdtuLkVv','qdtuLkCode','qdtuLkNyc','qdtuLkNbth'].forEach(function(x){document.getElementById(x).value='';}); qdtuRenderLookup();"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button><button type="button" class="btn btn-primary btn-sm" onclick="qdtuRenderLookup()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button></div>
            </div>
            <div class="qdtu-gqx-sec"><div style="overflow-x:auto;"><table class="qdtu-lk-table"><thead><tr><th style="text-align:center; width:48px;">STT</th><th>Mã vụ việc</th><th>Mã hồ sơ GQBT</th><th>Tên cá nhân/Tổ chức yêu cầu</th><th>Tên cá nhân/Tổ chức bị thiệt hại</th><th style="text-align:right;">Số tiền đề nghị tạm ứng (VNĐ)</th><th style="text-align:center;">Trạng thái</th><th style="text-align:center;">Thao tác</th></tr></thead><tbody id="qdtuLkBody"></tbody></table></div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:12.5px;"><span>Tổng số: <b id="qdtuLkTotal">0</b> bản ghi</span><div class="qdtu-lk-pages" id="qdtuLkPages"></div></div></div>
        </div>
        <div class="qdtu-modal-foot qdtu-qs-foot"><div class="qdtu-qs-foot-btns"><button type="button" class="btn btn-secondary" onclick="qdtuCloseLookup()">Đóng</button></div></div>
    </div>`;
    document.body.appendChild(m);
    qdtuLkPage = 1;
    qdtuRenderLookup();
}
function qdtuCloseLookup() { const m = qdtuEl('qdtuLkModal'); if (m) m.remove(); }
function qdtuRenderLookup(keep) {
    if (!keep) qdtuLkPage = 1;
    const q = id => qdtuEl(id).value.trim().toLowerCase();
    const vvq = q('qdtuLkVv'), code = q('qdtuLkCode'), nyc = q('qdtuLkNyc'), nbth = q('qdtuLkNbth');
    const list = qdtuEligibleClaims().filter(c => {
        if (vvq && !String(qdtuVv(c.code)).toLowerCase().includes(vvq)) return false;
        if (code && !c.code.toLowerCase().includes(code)) return false;
        if (nyc && !qdtuClaimName(c).toLowerCase().includes(nyc)) return false;
        if (nbth && !qdtuClaimNbth(c).toLowerCase().includes(nbth)) return false;
        return true;
    });
    const size = 10, max = Math.max(1, Math.ceil(list.length / size));
    if (qdtuLkPage > max) qdtuLkPage = max;
    const page = list.slice((qdtuLkPage - 1) * size, qdtuLkPage * size);
    qdtuEl('qdtuLkTotal').innerText = list.length;
    let pages = '';
    for (let i = 1; i <= max; i++) pages += `<span class="${i === qdtuLkPage ? 'active' : ''}" onclick="qdtuLkPage=${i}; qdtuRenderLookup(true);">${i}</span>`;
    qdtuEl('qdtuLkPages').innerHTML = pages;
    qdtuEl('qdtuLkBody').innerHTML = page.length ? page.map((c, i) => {
        const amt = qdtuNum(c.advanceTinhThan) + qdtuNum(c.advanceKhac) || qdtuNum(c.advanceNum);
        return `<tr><td style="text-align:center;">${(qdtuLkPage - 1) * size + i + 1}</td><td style="font-weight:600;">${qdtuEsc(qdtuVv(c.code) || '-')}</td>
            <td><a href="javascript:void(0)" style="font-weight:700; color:var(--primary-light); text-decoration:underline;" onclick="kpcdOpenClaim('${qdtuEsc(c.code)}')">${qdtuEsc(c.code)}</a></td>
            <td style="font-weight:600;">${qdtuEsc(qdtuClaimName(c))}</td><td>${qdtuEsc(qdtuClaimNbth(c))}</td>
            <td style="text-align:right; font-weight:600;">${qdtuFmt(amt)}</td><td style="text-align:center;"><span class="badge badge-info">${qdtuEsc(qdtuNormStatus(c.status))}</span></td>
            <td style="text-align:center;"><button type="button" class="btn btn-primary btn-sm" onclick="qdtuSelectClaim('${qdtuEsc(c.code)}'); qdtuCloseLookup();"><i class="fa-solid fa-check"></i> Chọn</button></td></tr>`;
    }).join('') : '<tr><td colspan="8" style="text-align:center; padding:20px; font-style:italic; color:#64748b;">Không tìm thấy hồ sơ phù hợp với điều kiện tìm kiếm.</td></tr>';
}
// HyperLink Mã hồ sơ GQBT: mở Chi tiết hồ sơ tại Giải quyết yêu cầu bồi thường (tab mới, chỉ xem)
function kpcdOpenClaim(code) {
    const url = `quan_ly_boi_thuong.html?id=${encodeURIComponent(code)}&from=kinh_phi&returnUrl=${encodeURIComponent('quan_ly_kinh_phi_boi_thuong.html?v=1&menu=' + kpMenu())}`;
    window.open(url, '_blank');
}

// =====================================================================================
// VĂN BẢN QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ BỒI THƯỜNG - MẪU 07/BTNN
// Điều 2 chỉ có khi Người nhận tạm ứng khác Người yêu cầu bồi thường; không có Điều 2 thì đánh số lại
// Điều 3->2, 4->3, 5->4 và Nơi nhận "Như Điều 5" -> "Như Điều 4".
// =====================================================================================
function qdtuPayText(f) {
    if (f.payMethod === QDTU_CASH) return `chi trực tiếp bằng tiền mặt cho người nhận tạm ứng kinh phí bồi thường tại trụ sở ${qdtuEsc(f.cashPlace || f.unitName || '……')}`;
    return `chi qua chuyển khoản vào tài khoản số ${qdtuEsc(f.account || '……')}, chủ tài khoản: ${qdtuEsc(f.accHolder || '……')}, nơi mở tài khoản: ${qdtuEsc([f.bank, f.branch].filter(Boolean).join(' - ') || '……')}`;
}
function qdtuBuildDocHtml(f, s, opt) {
    f = f || {}; s = s || {}; opt = opt || {};
    const W = qdtuW();
    const header = W && W.docHeaderHtml ? W.docHeaderHtml(f.unitId, 'Mẫu 07/BTNN', 'QĐ', { soKyHieu: s.docNo, ngay: s.docDate }) : '';
    const p = (x, extra) => `<p style="margin:4pt 0; text-align:justify; text-indent:1cm;${extra || ''}">${x}</p>`;
    const sub = x => `<p style="margin:2pt 0; text-align:justify; text-indent:1cm;">${x}</p>`;
    const diff = qdtuDiffRecipient(f);
    const ong = f.isOrg ? '' : 'Ông/Bà ';
    const no = diff ? { pay: 3, eff: 4, exec: 5 } : { pay: 2, eff: 3, exec: 4 };
    const canCu = qdtuLines(s.canCu).map(x => p('<i>' + qdtuEsc(x.replace(/[;,.]\s*$/, '')) + ';</i>')).join('');
    const idText = f.recIdNo || '……';
    const noiNhan = qdtuLines(s.noiNhan).map(x => qdtuEsc(diff ? x : x.replace(/Như Điều 5/gi, 'Như Điều 4'))).join('<br>');
    const signer = opt.signerId && W ? W.getUser(opt.signerId) : null;
    const ds = opt.digitalSign;
    return `<div style="font-family:'Times New Roman',serif; font-size:14pt; line-height:1.5; color:#000;">
        ${header}
        <p style="text-align:center; margin:14pt 0 2pt;"><b>QUYẾT ĐỊNH</b><br><b>Tạm ứng kinh phí bồi thường</b></p>
        <p style="text-align:center; margin:8pt 0 10pt;"><b>${qdtuEsc(qdtuHeadTitle(f.unitId).toUpperCase())}</b></p>
        ${canCu}
        ${p(`<i>Xét đề nghị của Ông/Bà ${qdtuEsc(f.officer || '……')},</i>`)}
        <p style="text-align:center; margin:10pt 0 6pt;"><b>QUYẾT ĐỊNH:</b></p>
        ${p(`<b>Điều 1.</b> Tạm ứng kinh phí bồi thường thiệt hại cho ${ong}${qdtuEsc(f.nycName || '……')}`)}
        ${sub(`Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế/Mã số của tổ chức: ${qdtuEsc(f.nycIdNo || '……')}`)}
        ${sub(`Địa chỉ: ${qdtuEsc(f.nycAddress || '……')}`)}
        ${sub(`Số tiền tạm ứng kinh phí bồi thường: ${qdtuFmt(f.amount)} đồng.`)}
        ${sub(`(Viết bằng chữ: ${qdtuEsc(qdtuBangChu(Number(f.amount) || 0))})`)}
        ${sub(`Tương ứng ${qdtuRateText(f.rate)}% trên tổng số tiền tạm ứng được tính theo các thiệt hại dưới đây:`)}
        ${sub(`- Thiệt hại về tinh thần: ${qdtuFmt(f.tinhThan)} đồng;`)}
        ${sub(`- Thiệt hại khác có thể tính được ngay mà không cần xác minh: ${qdtuFmt(f.khac)} đồng.`)}
        ${diff ? p('<b>Điều 2.</b>') + sub(`- Họ và tên người nhận tạm ứng kinh phí bồi thường: ${qdtuEsc(f.recName || '……')}`) + sub(`- Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế: ${qdtuEsc(idText)}`) + sub(`- Địa chỉ: ${qdtuEsc(f.recAddress || '……')}`) : ''}
        ${p(`<b>Điều ${no.pay}.</b> Số tiền tạm ứng kinh phí bồi thường được chi theo phương thức ${qdtuPayText(f)}.`)}
        ${p(`<b>Điều ${no.eff}.</b> Quyết định này có hiệu lực kể từ ngày ký.`)}
        ${p(`<b>Điều ${no.exec}.</b> ${ong}${qdtuEsc(f.nycName || '……')}${diff ? ', Ông/Bà ' + qdtuEsc(f.recName) : ''} và cơ quan, tổ chức, cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này./.`)}
        <table style="width:100%; border-collapse:collapse; margin-top:16pt;"><tr>
            <td style="width:50%; vertical-align:top; font-size:12pt; line-height:1.4;"><b><i>Nơi nhận:</i></b><br>${noiNhan || '- Lưu: VT, HSVV.'}</td>
            <td style="text-align:center; vertical-align:top;"><b>THỦ TRƯỞNG CƠ QUAN</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i><br>
                ${ds ? `<div style="display:inline-block; margin:10pt 0; padding:6pt 10pt; border:1.5px solid #1d4ed8; color:#1d4ed8; font-size:11pt; text-align:left;">Ký số bởi: ${qdtuEsc(qdtuUserName(ds.by))}<br>Thời gian ký: ${qdtuEsc(ds.at)}</div><br>` : '<br><br><br><br>'}
                <b>${qdtuEsc(signer ? signer.name : '')}</b></td>
        </tr></table>
    </div>`;
}
function qdtuDocBaseName(code) { return `Mau_07_BTNN_Quyet_dinh_tam_ung_${qdtuVv(code) || code}`; }
function qdtuSignerOf(item) {
    const a = item.qdtuApproval || {}; const s = (item.qdtu || {}).sign || {};
    return (s.assignees || a.assignees || [])[((a.path || s.assignees || []).length || 1) - 1] || '';
}
function qdtuViewDoc(id) {
    const item = qdtuFind(id); if (!qdtuIs(item)) return;
    const s = item.qdtu.sign || {};
    if (s.method === 'Ký ngoài' || (s.docFile && !s.docFile.generated)) { showToast('Giả lập mở tệp: ' + (s.signedFile || (s.docFile || {}).name || ''), 'info'); return; }
    const W = qdtuW();
    const html = qdtuBuildDocHtml(item.qdtu, s, { signerId: qdtuSignerOf(item), digitalSign: s.digitalSign });
    const name = qdtuDocBaseName(item.ycbtCode) + (s.digitalSign ? '_ky_so' : '');
    if (W && W.openDocTab) W.openDocTab(html, name); else kpOpenDocViewer(html, name);
}

// =====================================================================================
// POPUP TRÌNH KÝ QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ (bố cục như Trình ký Quyết định GQBT)
// =====================================================================================
const QDTU_SIG = { w: 230, h: 90 };
let qdtuSg = null;
function qdtuEnsureSignModal() {
    qdtuInjectCss();
    if (qdtuEl('qdtuSignModal')) return;
    const m = document.createElement('div');
    m.className = 'qdtu-modal';
    m.id = 'qdtuSignModal';
    const fld = (id, label, req, control, hint) => `<div class="qdtu-gqx-field"><label class="form-label" for="${id}">${label}${req ? '<span class="qdtu-gqx-req">*</span>' : ''}</label>${control}${req ? qdtuErrDiv(id) : ''}${hint || ''}</div>`;
    const date = id => `<div class="qdtu-gqx-date"><input type="text" class="form-control" id="${id}" placeholder="dd/mm/yyyy" readonly onchange="qdtuMark('${id}', false)"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById('${id}'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i></div>`;
    m.innerHTML = `<div class="qdtu-modal-box qdtu-qs-box" id="qdtuSgBox">
        <div class="qdtu-qs-head">
            <div>
                <div class="qdtu-qs-head-title"><span class="qdtu-qs-head-ico"><i class="fa-solid fa-file-signature"></i></span><span>TRÌNH KÝ QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ</span></div>
                <div class="qdtu-qs-sub">Mã vụ việc: <strong id="qdtuSgSubCode" style="color:var(--primary-color);">--</strong><span class="qdtu-qs-dot">•</span> Người yêu cầu: <span id="qdtuSgSubNyc" style="font-weight:600; color:#334155;">--</span><span class="qdtu-qs-dot">•</span> Đơn vị: <span id="qdtuSgSubUnit" style="font-weight:500; color:#475569;">--</span></div>
            </div>
            <button type="button" class="qdtu-qs-head-close" onclick="qdtuCloseSign()" title="Đóng">&times;</button>
        </div>
        <div class="qdtu-stepper-fullwidth" id="qdtuSgStepper">
            <div class="qdtu-step-tab active" id="qdtuSgTab1" onclick="if (qdtuSg && qdtuSg.step === 2) qdtuSgGoStep(1);"><span class="qdtu-step-badge" id="qdtuSgTab1Badge">1</span><span class="qdtu-step-title">Nhập thông tin</span></div>
            <div class="qdtu-stepper-sep"></div>
            <div class="qdtu-step-tab" id="qdtuSgTab2" onclick="if (qdtuSg && qdtuSg.step === 1) qdtuSgNext();"><span class="qdtu-step-badge">2</span><span class="qdtu-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div>
        </div>
        <div class="qdtu-qs-body qdtu-gqx-body" id="qdtuSgStep1">
            <div class="qdtu-gqx-sec">
                <div class="qdtu-gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="qdtu-gqx-req">*</span></div>
                <div class="qdtu-sign-cards-grid">
                    <label class="qdtu-sign-card active" id="qdtuSgCardOn" for="qdtuSgMethodOn">
                        <input type="radio" name="qdtuSgMethod" id="qdtuSgMethodOn" value="Ký số" checked onchange="qdtuSgSetMethod(this.value)">
                        <div class="qdtu-sign-card-content"><div class="qdtu-sign-card-icon"><i class="fa-solid fa-file-signature"></i></div><div class="qdtu-sign-card-text"><div class="qdtu-sign-card-title">Ký số trên hệ thống</div><div class="qdtu-sign-card-desc">Trình Lãnh đạo ký duyệt trên phần mềm</div></div></div>
                        <div class="qdtu-sign-card-check"><i class="fa-solid fa-circle-check"></i></div>
                    </label>
                    <label class="qdtu-sign-card" id="qdtuSgCardOff" for="qdtuSgMethodOff">
                        <input type="radio" name="qdtuSgMethod" id="qdtuSgMethodOff" value="Ký ngoài" onchange="qdtuSgSetMethod(this.value)">
                        <div class="qdtu-sign-card-content"><div class="qdtu-sign-card-icon offline"><i class="fa-solid fa-stamp"></i></div><div class="qdtu-sign-card-text"><div class="qdtu-sign-card-title">Ký ngoài (Ban hành trực tiếp)</div><div class="qdtu-sign-card-desc">Tải lên văn bản PDF đã ký và đóng dấu</div></div></div>
                        <div class="qdtu-sign-card-check"><i class="fa-regular fa-circle"></i></div>
                    </label>
                </div>
            </div>
            <div class="qdtu-gqx-sec">
                <div class="qdtu-gqx-sec-title"><i class="fa-solid fa-file-signature"></i> <span id="qdtuSgDocSecText">Tệp văn bản trình ký</span><span class="qdtu-gqx-req">*</span></div>
                <div id="qdtuSgDocSrcGroup">
                    <div class="qdtu-doc-src-segmented">
                        <button type="button" class="qdtu-doc-src-seg-btn active" id="qdtuSgSegGen" onclick="qdtuSgSetDocSrc('gen')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 07/BTNN</span></button>
                        <button type="button" class="qdtu-doc-src-seg-btn" id="qdtuSgSegUpload" onclick="qdtuSgSetDocSrc('upload')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button>
                    </div>
                </div>
                <div class="qdtu-qs-meta" id="qdtuSgMeta">
                    <div class="qdtu-qs-meta-title"><i class="fa-solid fa-sliders"></i> Thông tin điền vào Mẫu 07/BTNN</div>
                    <div class="qdtu-gqx-grid2">
                        ${fld('qdtuSgDocNo', 'Số, ký hiệu văn bản', true, `<input type="text" class="form-control" id="qdtuSgDocNo" maxlength="100" placeholder="Nhập số, ký hiệu văn bản" oninput="qdtuMark('qdtuSgDocNo', false)">`)}
                        ${fld('qdtuSgDocDate', 'Ngày văn bản', true, date('qdtuSgDocDate'))}
                    </div>
                    <div class="qdtu-gqx-field"><div class="qdtu-qs-label-row"><label class="form-label" for="qdtuSgCanCu">Căn cứ</label><span><i class="fa-solid fa-circle-info"></i> Mỗi căn cứ trên 01 dòng</span></div>
                        <textarea class="form-control" id="qdtuSgCanCu" rows="4" maxlength="4000" style="font-size:12.5px;" placeholder="Nhập căn cứ, mỗi căn cứ 01 dòng"></textarea></div>
                    <div class="qdtu-gqx-field" style="margin-bottom:0;"><div class="qdtu-qs-label-row"><label class="form-label" for="qdtuSgNoiNhan">Nơi nhận</label><span><i class="fa-solid fa-circle-info"></i> Mỗi nơi nhận trên 01 dòng</span></div>
                        <textarea class="form-control" id="qdtuSgNoiNhan" rows="4" maxlength="2000" style="font-size:12.5px;" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng"></textarea>
                        <div class="qdtu-gqx-hint" id="qdtuSgDieu2Hint"></div></div>
                </div>
                <div id="qdtuSgOnline">
                    <input type="file" id="qdtuSgDocInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="qdtuSgUploadDoc(this)">
                    <div id="qdtuSgDocBox"></div>
                    <div class="qdtu-gqx-err" id="qdtuSgDocErr">Đây là trường bắt buộc</div>
                </div>
                <div id="qdtuSgOffSec" style="display:none;">
                    <div class="qdtu-gqx-grid2" style="margin-bottom:14px;">
                        ${fld('qdtuSgOffNo', 'Số quyết định', true, `<input type="text" class="form-control" id="qdtuSgOffNo" maxlength="100" placeholder="Nhập số quyết định" oninput="qdtuMark('qdtuSgOffNo', false)">`)}
                        ${fld('qdtuSgOffDate', 'Ngày quyết định', true, date('qdtuSgOffDate'))}
                    </div>
                    <div class="qdtu-gqx-grid2" style="margin-bottom:14px;">
                        ${fld('qdtuSgOffSigner', 'Người ký', true, `<select class="form-control" id="qdtuSgOffSigner" onchange="qdtuMark('qdtuSgOffSigner', false)"></select>`)}
                    </div>
                    <div class="qdtu-gqx-field" style="margin-bottom:0;">
                        <label class="form-label">Tệp văn bản PDF đã ký &amp; đóng dấu<span class="qdtu-gqx-req">*</span></label>
                        <input type="file" id="qdtuSgOffInput" accept=".pdf" style="display:none;" onchange="qdtuSgUploadOff(this)">
                        <div id="qdtuSgOffBox"></div>
                        <div class="qdtu-gqx-err" id="qdtuSgOffErr">Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.</div>
                    </div>
                    <div class="qdtu-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, Quyết định tạm ứng được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và đề nghị tạm ứng chuyển sang trạng thái <strong>Chờ chi trả</strong>.</div>
                </div>
            </div>
            <div id="qdtuSgTlkt"></div>
        </div>
        <div class="qdtu-qs-step2" id="qdtuSgStep2">
            <div class="qdtu-qs-preview"><div class="qdtu-qs-a4" id="qdtuSgA4"></div></div>
            <div class="qdtu-qs-side">
                <div style="font-size:13px; font-weight:700; color:#1e293b;"><i class="fa-solid fa-stamp" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; KÍCH THƯỚC CHỮ KÝ</div>
                <div id="qdtuSgLevels" style="display:flex; flex-direction:column; gap:12px;"></div>
                <div style="font-size:11.5px; color:#64748b;">Bấm <b>Đặt chữ ký</b> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí.</div>
                <div class="qdtu-qs-field" style="margin-bottom:0;">
                    <label class="form-label" for="qdtuSgContent">Nội dung trình</label>
                    <textarea class="form-control" id="qdtuSgContent" rows="4" maxlength="2000" placeholder="Nhập nội dung trình Lãnh đạo..."></textarea>
                </div>
            </div>
        </div>
        <div class="qdtu-modal-foot qdtu-qs-foot">
            <div class="qdtu-qs-foot-btns">
                <button type="button" class="btn btn-secondary" onclick="qdtuCloseSign()">Hủy bỏ</button>
                <button type="button" class="btn btn-secondary" id="qdtuSgBtnBack" onclick="qdtuSgGoStep(1)" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
                <button type="button" class="btn btn-primary" id="qdtuSgBtnNext" onclick="qdtuSgNext()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>
                <button type="button" class="btn btn-primary" id="qdtuSgBtnSubmit" onclick="qdtuSgSubmit()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>
                <button type="button" class="btn btn-primary" id="qdtuSgBtnIssue" onclick="qdtuSgIssueOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>
            </div>
        </div>
    </div>`;
    document.body.appendChild(m);
}
function qdtuNoiNhanDefault(f) {
    return ['- Như Điều ' + (qdtuDiffRecipient(f) ? 5 : 4) + ';', '- ……….;', '- Lưu: VT, HSVV.'].join('\n');
}
function qdtuOpenSign(form) {
    qdtuEnsureSignModal();
    const levels = qdtuLevels(form.claimCode);
    const item = qdtuState.id ? qdtuFind(qdtuState.id) : null;
    const prev = (item && item.qdtu && item.qdtu.sign) || {};
    const claim = qdtuClaimByCode(form.claimCode);
    qdtuSg = { form, method: 'Ký số', docSrc: 'gen', step: 1, levels, assignees: levels.map((lv, i) => (prev.assignees && prev.assignees[i]) || lv.leaders[0] || ''), placed: {}, coords: {}, docFile: null, offFile: null };
    qdtuEl('qdtuSgSubCode').innerText = qdtuVv(form.claimCode) || form.claimCode || '--';
    qdtuEl('qdtuSgSubNyc').innerText = form.nycName || '--';
    qdtuEl('qdtuSgSubUnit').innerText = form.unitName || '--';
    qdtuEl('qdtuSgMethodOn').checked = true;
    qdtuEl('qdtuSgDocNo').value = prev.docNo || '     /QĐ-';
    qdtuEl('qdtuSgDocDate').value = prev.docDate || qdtuToday();
    qdtuEl('qdtuSgCanCu').value = prev.canCu || QDTU_CAN_CU_DEFAULT.join('\n');
    qdtuEl('qdtuSgNoiNhan').value = prev.noiNhan || qdtuNoiNhanDefault(form);
    qdtuEl('qdtuSgDieu2Hint').innerText = qdtuDiffRecipient(form)
        ? 'Người nhận tạm ứng khác Người yêu cầu: văn bản có Điều 2.'
        : 'Người nhận tạm ứng là Người yêu cầu: văn bản không có Điều 2, các Điều sau đánh số lại; "Như Điều 5" tự đổi thành "Như Điều 4".';
    qdtuEl('qdtuSgOffNo').value = ''; qdtuEl('qdtuSgOffDate').value = '';
    const leaders = [];
    levels.forEach(lv => lv.leaders.forEach(u => { if (!leaders.includes(u)) leaders.push(u); }));
    qdtuEl('qdtuSgOffSigner').innerHTML = '<option value="">-- Chọn Người ký --</option>' + leaders.map(u => `<option value="${qdtuEsc(u)}">${qdtuEsc(qdtuUserLabel(u))}</option>`).join('');
    qdtuEl('qdtuSgContent').value = '';
    ['qdtuSgDocNo', 'qdtuSgDocDate', 'qdtuSgOffNo', 'qdtuSgOffDate', 'qdtuSgOffSigner'].forEach(x => qdtuMark(x, false));
    document.querySelectorAll('#qdtuSignModal .qdtu-qs-err, #qdtuSignModal .qdtu-gqx-err').forEach(e => { e.style.display = 'none'; });
    if (window.flatpickr) {
        ['qdtuSgDocDate', 'qdtuSgOffDate'].forEach(x => { if (!qdtuEl(x)._flatpickr) flatpickr('#' + x, { dateFormat: 'd/m/Y', allowInput: true }); });
        const fp = qdtuEl('qdtuSgDocDate')._flatpickr; if (fp) fp.setDate(qdtuEl('qdtuSgDocDate').value, false, 'd/m/Y');
        const fo = qdtuEl('qdtuSgOffDate')._flatpickr; if (fo) fo.clear();
    }
    qdtuSgRenderOff();
    qdtuSgSetDocSrc('gen');
    // Trình lại (Bị trả lại): nguồn tệp, tệp văn bản trình ký, vị trí ô ký, Nội dung trình, Tài liệu kèm theo của lần trình trước
    if (prev.method === 'Ký số') {
        if (prev.docSrc && prev.docSrc !== 'gen') {
            qdtuSgSetDocSrc(prev.docSrc);
            const m = prev.docFile || {};
            if (m.name && !m.generated) { qdtuSg.docFile = { name: m.name, size: m.size || '', note: m.note || '', generated: false, raw: (typeof tlktBlob === 'function' && tlktBlob(m.keepId)) || undefined, tlktId: m.keepId || '' }; qdtuSgRenderDoc(); }
        }
        if (prev.sigCoords) { qdtuSg.coords = JSON.parse(JSON.stringify(prev.sigCoords)); Object.keys(qdtuSg.coords).forEach(k => { qdtuSg.placed[k] = true; }); }
        if (prev.content) qdtuEl('qdtuSgContent').value = prev.content;
    }
    if (typeof tlktMount === 'function') tlktMount('qdtuSg', 'qdtuSgTlkt', { required: false, rows: prev.attachments || [], secClass: 'qdtu-gqx-sec', titleClass: 'qdtu-gqx-sec-title' });
    qdtuSgSetMethod('Ký số');
    qdtuSgGoStep(1);
    qdtuFrameFull(true);
    qdtuEl('qdtuSignModal').classList.add('open');
}
function qdtuCloseSign() {
    if (qdtuSg) qdtuSgCancelConvert();
    const m = qdtuEl('qdtuSignModal'); if (m) m.classList.remove('open');
    const b = qdtuEl('qdtuSgBox'); if (b) b.classList.remove('qdtu-qs-wide');
    qdtuFrameFull(false);
}
function qdtuSgSetMethod(m) {
    qdtuSg.method = m;
    const on = m === 'Ký số';
    [['qdtuSgCardOn', on], ['qdtuSgCardOff', !on]].forEach(([id, act]) => {
        const card = qdtuEl(id); card.classList.toggle('active', act);
        const ico = card.querySelector('.qdtu-sign-card-check i'); if (ico) ico.className = act ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    qdtuEl('qdtuSgDocSecText').innerText = on ? 'Tệp văn bản trình ký' : 'Văn bản ban hành';
    qdtuEl('qdtuSgDocSrcGroup').style.display = on ? '' : 'none';
    qdtuEl('qdtuSgOnline').style.display = on ? '' : 'none';
    qdtuEl('qdtuSgOffSec').style.display = on ? 'none' : '';
    // Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn (ẩn hẳn)
    const bar = qdtuEl('qdtuSgStepper');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !on); bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    if (typeof tlktShow === 'function') tlktShow('qdtuSg', on);
    qdtuSgApplyMeta();
    qdtuSgGoStep(1);
}
// Thông tin điền vào Mẫu 07/BTNN: chỉ hiển thị khi Ký số + Sinh văn bản theo mẫu
function qdtuSgApplyMeta() { qdtuEl('qdtuSgMeta').style.display = qdtuSg.method === 'Ký số' && qdtuSg.docSrc === 'gen' ? '' : 'none'; }
function qdtuSgSetDocSrc(src) {
    qdtuSg.docSrc = src;
    qdtuEl('qdtuSgSegGen').classList.toggle('active', src === 'gen');
    qdtuEl('qdtuSgSegUpload').classList.toggle('active', src !== 'gen');
    qdtuSgCancelConvert();
    qdtuSg.docFile = null;
    qdtuEl('qdtuSgDocErr').style.display = 'none';
    qdtuSgApplyMeta();
    qdtuSgRenderDoc();
}
function qdtuSgGoStep(n) {
    qdtuSg.step = n;
    qdtuEl('qdtuSgStep1').style.display = n === 1 ? '' : 'none';
    qdtuEl('qdtuSgStep2').style.display = n === 2 ? 'flex' : 'none';
    qdtuEl('qdtuSgBox').classList.toggle('qdtu-qs-wide', n === 2);
    qdtuEl('qdtuSgTab1').className = 'qdtu-step-tab ' + (n === 1 ? 'active' : 'completed');
    qdtuEl('qdtuSgTab1Badge').innerHTML = n === 1 ? '1' : '<i class="fa-solid fa-check"></i>';
    qdtuEl('qdtuSgTab2').className = 'qdtu-step-tab' + (n === 2 ? ' active' : '');
    qdtuEl('qdtuSgBtnBack').style.display = n === 2 ? '' : 'none';
    qdtuEl('qdtuSgBtnNext').style.display = n === 1 && qdtuSg.method === 'Ký số' ? '' : 'none';
    qdtuEl('qdtuSgBtnSubmit').style.display = n === 2 ? '' : 'none';
    qdtuEl('qdtuSgBtnIssue').style.display = n === 1 && qdtuSg.method === 'Ký ngoài' ? '' : 'none';
}
function qdtuSgData() {
    return {
        docNo: qdtuEl('qdtuSgDocNo').value.trim(), docDate: qdtuEl('qdtuSgDocDate').value.trim(),
        canCu: qdtuEl('qdtuSgCanCu').value, noiNhan: qdtuEl('qdtuSgNoiNhan').value
    };
}
function qdtuSgRenderDoc() {
    const f = qdtuSg.docFile;
    if (qdtuSg.docSrc === 'gen') {
        qdtuEl('qdtuSgDocBox').innerHTML = `<div class="qdtu-gen-row"><div class="qdtu-gen-hint"><i class="fa-solid fa-file-circle-check"></i><span>Hệ thống tự động sinh Quyết định theo Mẫu 07/BTNN từ thông tin đang nhập.</span></div><button type="button" class="qdtu-btn-preview" onclick="if (qdtuSgGenerate()) qdtuSgViewDoc();"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div>`;
        return;
    }
    // Tải lên từ máy: vùng kéo thả (chưa có tệp) / đang chuyển đổi sang PDF / File Card (đã có tệp)
    if (qdtuSg.converting) { qdtuEl('qdtuSgDocBox').innerHTML = '<div class="qdtu-converting"><span class="qdtu-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    qdtuEl('qdtuSgDocBox').innerHTML = !f
        ? qdtuDropHtml('qdtuSgDocInput', 'qdtuSgUploadDoc', 'Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a>', 'Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)')
        : qdtuFileCardHtml(f.name, f.size, f.note, 'qdtuSgViewDoc()', 'qdtuSg.docFile = null; qdtuSgRenderDoc();');
}
// ---------- Tiện ích dùng chung: vùng kéo thả / File Card / chuyển đổi sang PDF ----------
function qdtuDropHtml(inputId, uploadFn, main, sub) {
    return `<div class="qdtu-drop" tabindex="0" role="button" onclick="document.getElementById('${inputId}').click()" onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.click(); }" ondragover="qdtuDragOver(event)" ondragleave="qdtuDragLeave(event)" ondrop="qdtuDropFile(event, ${uploadFn})"><i class="fa-solid fa-cloud-arrow-up qdtu-drop-ico"></i><div class="qdtu-drop-main">${main}</div><div class="qdtu-drop-sub">${sub}</div></div>`;
}
// File Card: icon định dạng + tên + dung lượng | Xem file (mở tệp tại tab mới), Xóa
function qdtuFileCardHtml(name, size, note, viewJs, removeJs) {
    const isPdf = /\.pdf$/i.test(name || '');
    return `<div class="qdtu-fcard"><i class="fa-solid ${isPdf ? 'fa-file-pdf pdf' : 'fa-file-word word'} qdtu-fcard-ico"></i><div class="qdtu-fcard-info"><div class="qdtu-fcard-name">${qdtuEsc(name || '')}</div><div class="qdtu-fcard-meta">${qdtuEsc(size || '')}${note ? ' · ' + qdtuEsc(note) : ''}</div></div><div class="qdtu-fcard-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="${viewJs}"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm qdtu-gqx-danger" onclick="${removeJs}"><i class="fa-solid fa-trash"></i> Xóa</button></div></div>`;
}
function qdtuDragOver(e) { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; e.currentTarget.classList.add('drag-over'); }
function qdtuDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function qdtuDropFile(e, uploadFn) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    const files = e.dataTransfer && e.dataTransfer.files;
    if (files && files.length) uploadFn({ files: [files[0]], value: '' });
}
// Khóa nút Tiếp tục khi đang chuyển đổi .doc/.docx sang PDF
function qdtuSgSetBusy(busy) {
    const btn = qdtuEl('qdtuSgBtnNext'); if (!btn) return;
    btn.disabled = !!busy; btn.style.opacity = busy ? '0.55' : ''; btn.style.cursor = busy ? 'not-allowed' : '';
    btn.title = busy ? 'Đang chuyển đổi tệp sang PDF, vui lòng chờ' : '';
}
function qdtuSgCancelConvert() { if (qdtuSg) { qdtuSg.converting = false; qdtuSg.convToken = (qdtuSg.convToken || 0) + 1; } qdtuSgSetBusy(false); }
// Popup xác nhận Ban hành văn bản (Ký ngoài), hiển thị trên popup trình ký
function qdtuConfirmIssue(message, onOk) {
    const ov = document.getElementById('customConfirmOverlay');
    const okBtn = ov ? ov.querySelector('.confirm-modal-footer .btn-danger') : null;
    const prev = { z: ov ? ov.style.zIndex : '', text: okBtn ? okBtn.innerHTML : '', bg: okBtn ? okBtn.style.backgroundColor : '' };
    const restore = () => { if (ov) ov.style.zIndex = prev.z; if (okBtn) { okBtn.innerHTML = prev.text; okBtn.style.backgroundColor = prev.bg; } };
    showConfirmModal(message, () => { restore(); onOk(); }, 'Xác nhận ban hành văn bản');
    if (ov) ov.style.zIndex = '10050';
    if (okBtn) { okBtn.innerHTML = 'Ban hành'; okBtn.style.backgroundColor = '#16a34a'; }
    const noBtn = ov ? ov.querySelector('.confirm-modal-footer .btn-secondary') : null;
    if (noBtn) noBtn.addEventListener('click', restore, { once: true });
}
// Sinh văn bản Mẫu 07/BTNN; chỉ kiểm tra trống Số, ký hiệu văn bản và Ngày văn bản
function qdtuSgGenerate() {
    const ids = ['qdtuSgDocNo', 'qdtuSgDocDate'];
    const bad = ids.filter(id => !qdtuEl(id).value.trim());
    ids.forEach(id => qdtuMark(id, bad.includes(id)));
    if (bad.length) { qdtuEl(bad[0]).focus(); return false; }
    qdtuSg.docFile = { name: qdtuDocBaseName(qdtuSg.form.claimCode) + '.doc', generated: true, html: qdtuBuildDocHtml(qdtuSg.form, qdtuSgData(), { signerId: qdtuSg.assignees[qdtuSg.levels.length - 1] || '' }) };
    qdtuEl('qdtuSgDocErr').style.display = 'none';
    return true;
}
function qdtuSgViewDoc() {
    const f = qdtuSg.docFile; if (!f) return;
    const W = qdtuW();
    if (f.generated) { if (W && W.openDocTab) W.openDocTab(f.html, f.name.replace(/\.doc$/, '')); else kpOpenDocViewer(f.html, f.name.replace(/\.doc$/, '')); }
    else if (!f.raw && f.tlktId && typeof tlktOpenFile === 'function') tlktOpenFile({ id: f.tlktId, name: f.name });
    else btnnOpenUploadedFile(f);
}
function qdtuSgUploadDoc(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    if (!/\.(docx|doc|pdf)$/i.test(f.name)) { showToast('Tệp không đúng định dạng (chỉ chấp nhận .docx, .doc, .pdf).', 'error'); return; }
    if (f.size > QDTU_MAX_FILE) { showToast('Tệp vượt quá dung lượng tối đa 50MB.', 'error'); return; }
    qdtuEl('qdtuSgDocErr').style.display = 'none';
    const size = qdtuFileSize(f.size);
    if (/\.docx?$/i.test(f.name)) {
        // .doc/.docx: chuyển đổi sang PDF (~1,2s), khóa nút Tiếp tục trong lúc chuyển đổi
        qdtuSg.docFile = null; qdtuSg.converting = true;
        const st = qdtuSg; const token = st.convToken = (st.convToken || 0) + 1;
        qdtuSgSetBusy(true); qdtuSgRenderDoc();
        setTimeout(() => {
            if (!st.converting || st.convToken !== token) return;
            st.converting = false; qdtuSgSetBusy(false);
            st.docFile = { name: f.name.replace(/\.docx?$/i, '.pdf'), size, note: 'Đã chuyển đổi từ ' + f.name, generated: false, raw: f };
            if (qdtuSg === st) qdtuSgRenderDoc();
        }, 1200);
        return;
    }
    qdtuSg.docFile = { name: f.name, size, generated: false, raw: f };
    qdtuSgRenderDoc();
}
function qdtuSgRenderOff() {
    const f = qdtuSg.offFile;
    qdtuEl('qdtuSgOffBox').innerHTML = !f
        ? qdtuDropHtml('qdtuSgOffInput', 'qdtuSgUploadOff', 'Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a>', '(Chỉ chấp nhận .pdf, tối đa 50MB)')
        : qdtuFileCardHtml(f.name, f.size, '', 'btnnOpenUploadedFile(qdtuSg.offFile)', 'qdtuSg.offFile = null; qdtuSgRenderOff();');
}
function qdtuSgUploadOff(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    if (!/\.pdf$/i.test(f.name)) { showToast('Tệp không đúng định dạng (chỉ chấp nhận .pdf).', 'error'); return; }
    if (f.size > QDTU_MAX_FILE) { showToast('Tệp vượt quá dung lượng tối đa 50MB.', 'error'); return; }
    qdtuSg.offFile = { name: f.name, size: qdtuFileSize(f.size), raw: f };
    qdtuEl('qdtuSgOffErr').style.display = 'none';
    qdtuSgRenderOff();
}
function qdtuSgNext() {
    if (!qdtuSg.levels.length) { showToast('Chưa xác định được cấp phê duyệt. Vui lòng liên hệ Quản trị hệ thống.', 'error'); return; }
    const okTlkt = typeof tlktValidate !== 'function' || tlktValidate('qdtuSg');
    if (qdtuSg.docSrc === 'gen') { if (!qdtuSgGenerate()) return; }
    else if (!qdtuSg.docFile) { qdtuEl('qdtuSgDocErr').style.display = 'block'; return; }
    if (!okTlkt) return;
    const f = qdtuSg.docFile;
    qdtuEl('qdtuSgA4').innerHTML = f.generated ? f.html : `<div style="text-align:center; color:#64748b; padding-top:300px; font:14px Inter, sans-serif;"><i class="fa-solid fa-file-lines" style="font-size:48px;"></i><br><br>${qdtuEsc(f.name)}<br>(Văn bản tải lên)</div>`;
    qdtuSgRenderLevels();
    qdtuSgGoStep(2);
    qdtuSg.levels.forEach((lv, i) => { if (qdtuSg.placed[i]) qdtuSgDrawBox(i); });
}
function qdtuSgRenderLevels() {
    const n = qdtuSg.levels.length;
    qdtuEl('qdtuSgLevels').innerHTML = qdtuSg.levels.map((lv, i) => {
        const last = i === n - 1;
        const opts = lv.leaders.map(id => `<option value="${qdtuEsc(id)}" ${qdtuSg.assignees[i] === id ? 'selected' : ''}>${qdtuEsc(qdtuUserLabel(id))}</option>`).join('');
        return `<div class="qdtu-qs-card${last ? ' last' : ''}"><div class="qdtu-qs-card-head"><span>Cấp ${i + 1} - ${qdtuEsc(qdtuUnitName(lv.unitId))}</span>${lv.unitId && window.BTNN_WF && BTNN_WF.isKyNhayUnit && BTNN_WF.isKyNhayUnit(lv.unitId) ? '<span class="badge" style="font-size:10.5px;">Ký nháy</span>' : ''}</div>
            <select class="form-control" id="qdtuSgLeader${i}" style="font-size:13px; height:36px;" onchange="qdtuSg.assignees[${i}] = this.value; qdtuMark('qdtuSgLeader${i}', false); qdtuSgSyncBox(${i});"><option value="">-- Chọn Lãnh đạo --</option>${opts}</select>
            <div class="qdtu-qs-err" id="qdtuSgLeader${i}Err">Đây là trường bắt buộc</div>
            <div style="margin-top:8px;">${qdtuSg.placed[i]
                ? `<span style="display:flex; gap:4px; flex-wrap:wrap;"><button type="button" class="btn btn-secondary btn-sm" onclick="qdtuSgResize(${i},180,75)">Nhỏ</button><button type="button" class="btn btn-secondary btn-sm" onclick="qdtuSgResize(${i},230,90)">Vừa</button><button type="button" class="btn btn-secondary btn-sm" onclick="qdtuSgResize(${i},290,115)">Lớn</button><button type="button" class="btn btn-secondary btn-sm" onclick="qdtuSgResetBox(${i})"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button></span>`
                : `<button type="button" class="btn btn-secondary btn-sm" onclick="qdtuSgPlace(${i})"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button><div class="qdtu-qs-err" id="qdtuSgPlace${i}Err">Chưa đặt chữ ký</div>`}</div></div>`;
    }).join('');
}
function qdtuSgDefaultCoord(i) {
    const a4 = qdtuEl('qdtuSgA4'); const h = Math.max(a4.scrollHeight, 1123); const last = i === qdtuSg.levels.length - 1;
    return { x: last ? 470 : 60, y: h - 230, w: QDTU_SIG.w, h: QDTU_SIG.h };
}
function qdtuSgPlace(i) { qdtuSg.placed[i] = true; qdtuSg.coords[i] = qdtuSg.coords[i] || qdtuSgDefaultCoord(i); qdtuSgRenderLevels(); qdtuSgDrawBox(i); const b = qdtuEl('qdtuSgSig' + i); if (b) b.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
function qdtuSgResetBox(i) { qdtuSg.coords[i] = qdtuSgDefaultCoord(i); qdtuSgDrawBox(i); }
function qdtuSgResize(i, w, h) { Object.assign(qdtuSg.coords[i], { w, h }); qdtuSgDrawBox(i); }
function qdtuSgSyncBox(i) { if (qdtuSg.placed[i]) qdtuSgDrawBox(i); }
function qdtuSgDrawBox(i) {
    let b = qdtuEl('qdtuSgSig' + i);
    const last = i === qdtuSg.levels.length - 1;
    if (!b) {
        b = document.createElement('div'); b.id = 'qdtuSgSig' + i; b.className = 'qdtu-qs-sig' + (last ? ' last' : '');
        qdtuEl('qdtuSgA4').appendChild(b);
        b.addEventListener('mousedown', ev => {
            const c = qdtuSg.coords[i]; const sx = ev.clientX, sy = ev.clientY, ox = c.x, oy = c.y;
            const mv = e => { c.x = Math.max(0, ox + e.clientX - sx); c.y = Math.max(0, oy + e.clientY - sy); b.style.left = c.x + 'px'; b.style.top = c.y + 'px'; };
            const up = () => { document.removeEventListener('mousemove', mv); document.removeEventListener('mouseup', up); };
            document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up); ev.preventDefault();
        });
    }
    const c = qdtuSg.coords[i];
    Object.assign(b.style, { left: c.x + 'px', top: c.y + 'px', width: c.w + 'px', height: c.h + 'px' });
    const who = qdtuSg.assignees[i] ? qdtuUserName(qdtuSg.assignees[i]) : '';
    b.innerHTML = `<b>${last ? 'KÝ SỐ &amp; CON DẤU' : 'KÝ NHÁY'}</b><br>Cấp ${i + 1}${who ? ' - ' + qdtuEsc(who) : ''}`;
}
// Tạo / cập nhật bản ghi Đề nghị tạm ứng (Loại "Cấp tạm ứng") theo Quyết định tạm ứng
function qdtuUpsertRecord(form, sign) {
    const me = qdtuMe();
    let item = qdtuState.id ? qdtuFind(qdtuState.id) : null;
    const isNew = !item;
    if (isNew) {
        let nid = 'P_QDTU_' + Date.now();
        while (qdtuFind(nid)) nid += '_1';
        item = { id: nid, code: nextKinhPhiCode(), type: QDTU_TYPE, origin: 'Tạo QĐ tạm ứng', date: qdtuToday(), files: [], notes: '', source: '', cqCap: '', qdtuHistory: [] };
        proposalsList.unshift(item);
    }
    Object.assign(item, {
        ycbtCode: form.claimCode, nycName: form.nycName, nycRole: form.nycRole || 'Người bị thiệt hại', amount: form.amount, agency: form.unitName,
        advApproveTinhThan: form.tinhThan, advApproveKhac: form.khac,
        payoutMethod: form.payMethod === QDTU_CASH ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản',
        signMethod: sign.method, docNo: sign.docNo || '', docDate: sign.docDate || '', draftDoc: qdtuDocBaseName(form.claimCode) + '.doc',
        signedFile: null, digitalSign: null, approvedDate: '', approvedLeader: '', approvedLeaderId: '', leaderOpinion: '', user: qdtuUserName(me)
    });
    item.qdtu = Object.assign({}, form, { sign });
    item.qdtuReturned = null;
    if (isNew) qdtuHist(item, 'Tạo Quyết định tạm ứng', `Mã vụ việc ${qdtuVv(form.claimCode) || form.claimCode}; số tiền tạm ứng ${qdtuFmt(form.amount)} đồng.`);
    qdtuEnsureMockClaim(item);
    return item;
}
// Trình Lãnh đạo: mỗi cấp chọn Lãnh đạo và đặt chữ ký -> "Chờ duyệt", Loại trình "Quyết định tạm ứng kinh phí"
function qdtuSgSubmit() {
    let ok = true; let first = null;
    qdtuSg.levels.forEach((lv, i) => {
        const bad = !qdtuEl('qdtuSgLeader' + i).value; qdtuMark('qdtuSgLeader' + i, bad); if (bad) { ok = false; first = first || qdtuEl('qdtuSgLeader' + i); }
        const pe = qdtuEl('qdtuSgPlace' + i + 'Err'); if (!qdtuSg.placed[i]) { if (pe) pe.style.display = 'block'; ok = false; }
    });
    if (!ok) { if (first) first.focus(); return; }
    const me = qdtuMe();
    const f = qdtuSg.docFile;
    const data = qdtuSgData();
    const content = qdtuEl('qdtuSgContent').value.trim();
    const path = qdtuSg.levels.map(l => l.unitId);
    const keepId = f.generated ? '' : (f.tlktId || (typeof tlktKeep === 'function' ? tlktKeep(f.raw) : ''));
    const attachments = typeof tlktGet === 'function' ? tlktGet('qdtuSg') : [];
    const sign = Object.assign({ method: 'Ký số' }, f.generated ? data : {}, { docSrc: qdtuSg.docSrc, docFile: { name: f.name, generated: !!f.generated, size: f.size || '', note: f.note || '', keepId }, assignees: qdtuSg.assignees.slice(), sigCoords: JSON.parse(JSON.stringify(qdtuSg.coords)), content, attachments });
    const item = qdtuUpsertRecord(qdtuSg.form, sign);
    item.qdtuApproval = { kind: QDTU_KIND, path, assignees: qdtuSg.assignees.slice(), level: 0, steps: [], content, submittedBy: me, submittedAt: qdtuNow(), pending: true };
    item.status = QDTU_ST.REVIEW;
    const nextText = path.length > 1 ? ' Lãnh đạo cấp tiếp theo: ' + path.slice(1).map((u, i) => `${qdtuUserName(qdtuSg.assignees[i + 1])} - ${qdtuUnitName(u)}`).join('; ') + '.' : '';
    qdtuHist(item, 'Trình ký', `${QDTU_KIND}. Trình ${qdtuUserName(qdtuSg.assignees[0])} - ${qdtuUnitName(path[0])}.${nextText}${content ? ' Nội dung: ' + content : ''}`);
    if (attachments.length) item.qdtuHistory[item.qdtuHistory.length - 1].attachments = attachments;
    saveProposalsToLocal();
    qdtuCloseSign();
    qdtuShowPage(false);
    showToast(`Đã trình ${qdtuUserLabel(qdtuSg.assignees[0])} ký duyệt Quyết định tạm ứng. Đề nghị tạm ứng ${item.code} chuyển [${QDTU_ST.REVIEW}].`, 'success');
    qdtuAfterChange();
}
// Ký ngoài: ban hành trực tiếp, không trình Lãnh đạo -> "Chờ chi trả"
function qdtuSgIssueOffline(confirmed) {
    const ids = ['qdtuSgOffNo', 'qdtuSgOffDate', 'qdtuSgOffSigner'];
    const bad = ids.filter(id => !qdtuEl(id).value.trim());
    ids.forEach(id => qdtuMark(id, bad.includes(id)));
    if (!qdtuSg.offFile) {
        qdtuEl('qdtuSgOffErr').style.display = 'block';
        const dz = qdtuEl('qdtuSgOffBox').querySelector('.qdtu-drop'); if (dz) dz.classList.add('is-error');
    }
    if (bad.length) { qdtuEl(bad[0]).focus(); return; }
    if (!qdtuSg.offFile) return;
    if (confirmed !== true) {
        qdtuConfirmIssue(`Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Đề nghị tạm ứng sẽ chuyển sang trạng thái "${QDTU_ST.PAY}". Bạn có chắc chắn muốn ban hành văn bản?`, () => qdtuSgIssueOffline(true));
        return;
    }
    const me = qdtuMe();
    const signer = qdtuEl('qdtuSgOffSigner').value;
    const sign = { method: 'Ký ngoài', docNo: qdtuEl('qdtuSgOffNo').value.trim(), docDate: qdtuEl('qdtuSgOffDate').value.trim(), offSigner: signer, signedFile: qdtuSg.offFile.name, issuedAt: qdtuNow(), issuedBy: me, attachments: typeof tlktGet === 'function' ? tlktGet('qdtuSg') : [] }; // Ký ngoài: Tài liệu ban hành kèm theo
    const item = qdtuUpsertRecord(qdtuSg.form, sign);
    item.qdtuApproval = null;
    item.status = QDTU_ST.PAY;
    item.signedFile = qdtuSg.offFile.name;
    item.signedUploadedAt = qdtuNow();
    item.approvedDate = qdtuNow(); item.approvedLeader = qdtuUserName(signer); item.approvedLeaderId = signer;
    qdtuHist(item, 'Ban hành Quyết định tạm ứng (Ký ngoài)', `Số quyết định ${sign.docNo} ngày ${sign.docDate}; Người ký ${qdtuUserName(signer)}; tệp đã ký: ${sign.signedFile}.`);
    saveProposalsToLocal();
    qdtuCloseSign();
    qdtuShowPage(false);
    showToast(`Đã ban hành Quyết định tạm ứng (Ký ngoài). Đề nghị tạm ứng ${item.code} chuyển [${QDTU_ST.PAY}].`, 'success');
    qdtuAfterChange();
}
function qdtuAfterChange() {
    qdtuCloseView();
    renderProposalsTable();
    updateBudgetStats();
}

// =====================================================================================
// LÃNH ĐẠO KÝ DUYỆT / TỪ CHỐI QUYẾT ĐỊNH TẠM ỨNG (toàn màn hình, như Quyết định GQBT)
// =====================================================================================
let qdtuLd = null;
function qdtuLdHistoryHtml(item) {
    const a = item.qdtuApproval || {};
    const W = qdtuW();
    const initials = n => String(n || '').trim().split(/\s+/).slice(-3).map(w => w[0] || '').join('').toUpperCase();
    const sub = uid => { const u = W && uid ? W.getUser(uid) : null; return u ? [u.title, W.unitName(u.unitId)].filter(Boolean).join(' - ') : ''; };
    const stepIcon = { done: 'fa-solid fa-circle-check', no: 'fa-solid fa-circle-xmark', wait: 'fa-regular fa-clock', todo: 'fa-regular fa-circle' };
    const row = (st, uid, name, at, cls, icon, act, msg, docs) => `<div class="qdtuld-hv ${st}"><div class="qdtuld-hv-step"><i class="${stepIcon[st]}"></i></div><div class="qdtuld-hv-av">${qdtuEsc(initials(name))}</div><div class="qdtuld-hv-main">`
        + `<div class="qdtuld-hv-head"><span class="qdtuld-hv-name">${qdtuEsc(name || '--')}</span>${at ? `<span class="qdtuld-hv-time"><i class="fa-regular fa-clock"></i> ${qdtuEsc(at)}</span>` : ''}</div>`
        + (sub(uid) ? `<div class="qdtuld-hv-sub">${qdtuEsc(sub(uid))}</div>` : '')
        + (act ? `<div class="qdtuld-hv-act ${cls}"><i class="${icon}"></i> ${act}</div>` : '')
        + (msg ? `<div class="qdtuld-hv-msg">${qdtuEsc(msg)}</div>` : '') + (docs && typeof tlktInlineHtml === 'function' ? tlktInlineHtml(docs) : '') + `</div></div>`;
    const pick = (re, s) => { const m = re.exec(s || ''); return m ? m[1].trim() : ''; };
    const items = [];
    (item.qdtuHistory || []).filter(h => /^(Trình ký|Ký duyệt|Từ chối)/.test(h.action || '')).forEach(h => {
        if (/^Trình ký/.test(h.action)) items.push(row('done', h.userId, h.userName, h.at, '', 'fa-solid fa-circle-arrow-right', `Trình ký ${qdtuEsc(QDTU_KIND)}`, pick(/Nội dung: (.*)$/, h.note), h.attachments));
        else if (/^Từ chối/.test(h.action)) items.push(row('no', h.userId, h.userName, h.at, 'no', 'fa-solid fa-ban', 'Từ chối - trả lại cán bộ trình', pick(/Lý do: (.*)$/, h.note)));
        else {
            const to = pick(/; chuyển ([^.]+)\./, h.note);
            items.push(to ? row('done', h.userId, h.userName, h.at, '', 'fa-solid fa-circle-arrow-right', `Ký duyệt và chuyển xử lý đến <strong>${qdtuEsc(to)}</strong>`, pick(/Ý kiến: (.*)$/, h.note))
                : row('done', h.userId, h.userName, h.at, 'ok', 'fa-regular fa-circle-check', 'Ký duyệt', pick(/Ý kiến: (.*)$/, h.note)));
        }
    });
    if (a.pending) {
        for (let lv = a.level; lv < (a.path || []).length; lv++) {
            const uid = (a.assignees || [])[lv] || '';
            const nm = uid ? qdtuUserName(uid) : qdtuUnitName(a.path[lv]);
            items.push(lv === a.level ? row('wait', uid, nm, '', 'wait', 'fa-solid fa-hourglass-half', 'Chờ ký duyệt', '') : row('todo', uid, nm, '', '', '', '', ''));
        }
    }
    return `<div class="qdtuld-box hist"><div class="qdtuld-box-title"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử trình ký</div>${items.reverse().join('') || '<div style="color:#64748b;">Chưa có lịch sử.</div>'}</div>`;
}
function qdtuLdOpen(id, mode) {
    const item = qdtuFind(id);
    if (!qdtuCanAct(item)) { showToast('Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách.', 'error'); renderProposalsTable(); return; }
    qdtuInjectCss();
    const W = qdtuW();
    const a = item.qdtuApproval;
    const approve = mode !== 'reject';
    const last = qdtuIsLast(a);
    const nextUnitId = (a.path || [])[a.level + 1];
    // Lãnh đạo các cấp do cán bộ chọn khi trình: không chọn Lãnh đạo cấp tiếp theo tại màn Ký duyệt
    const preset = (a.assignees || [])[a.level + 1] || '';
    const s = item.qdtu.sign || {};
    const generated = !s.docFile || s.docFile.generated;
    const docName = (s.docFile && s.docFile.name) || (qdtuDocBaseName(item.ycbtCode) + '.doc');
    qdtuLd = { id, approve };
    const hint = approve ? (last ? `Cấp phê duyệt cuối cùng. Sau khi ký duyệt, hệ thống ký số Quyết định tạm ứng và đề nghị tạm ứng chuyển [${QDTU_ST.PAY}].` : `Sau khi ký duyệt, hồ sơ tự động chuyển ${preset ? qdtuUserName(preset) + ' - ' : ''}${qdtuUnitName(nextUnitId)} (Lãnh đạo cấp tiếp theo đã chọn khi trình) ký duyệt.`) : `Sau khi từ chối, đề nghị tạm ứng chuyển [${QDTU_ST.REJECT}] cho cán bộ trình.`;
    const row = (k, v) => `<div class="qdtuld-row"><span>${k}</span><span>${v}</span></div>`;
    const summary = `<div class="qdtuld-box"><div class="qdtuld-box-title"><i class="fa-solid fa-circle-info"></i> Thông tin tổng quan</div>`
        + row('Mã đề nghị', `<strong>${qdtuEsc(item.code)}</strong>`)
        + row('Mã hồ sơ', qdtuEsc(item.ycbtCode))
        + row('Mã vụ việc', qdtuEsc(qdtuVv(item.ycbtCode) || '--'))
        + row('Loại trình', qdtuEsc(QDTU_KIND))
        + row('Số tiền tạm ứng', `${qdtuFmt(item.amount)} đồng`)
        + row('Cán bộ trình', `${qdtuEsc(qdtuUserName(a.submittedBy) || '--')}${a.submittedAt ? ` <span style="color:#64748b;">- ${qdtuEsc(a.submittedAt)}</span>` : ''}`)
        + `</div>`;
    const signBox = approve ? `<div class="qdtuld-sign"><b>Hình thức ký:</b> Ký số trên hệ thống<br>${last ? `Cấp ký duyệt cuối cùng: hệ thống ký số Quyết định tạm ứng bằng chứng thư số của <b>${qdtuEsc(qdtuUserLabel(qdtuMe()))}</b> (giả lập).` : 'Ký duyệt cấp hiện tại; Lãnh đạo cấp cuối ký số Quyết định tạm ứng.'}</div>` : '';
    const preview = `<div class="qdtuld-doc-bar"><span><i class="fa-solid fa-file-word"></i> ${qdtuEsc(docName)}</span><a href="javascript:void(0)" onclick="qdtuViewDoc('${item.id}')"><i class="fa-solid fa-up-right-from-square"></i> Mở xem văn bản</a></div>`
        + (generated ? '<iframe class="qdtuld-frame" id="qdtuLdFrame" title="Văn bản trình ký"></iframe>' : `<div class="qdtuld-uploaded"><i class="fa-solid fa-file-pdf" style="font-size:36px; color:#dc2626;"></i><p>Văn bản do cán bộ tải lên: <b>${qdtuEsc(docName)}</b></p><p style="color:#64748b;">(Giả lập xem tệp)</p></div>`);
    qdtuLdClose();
    const ov = document.createElement('div');
    ov.className = 'qdtuld-overlay';
    ov.id = 'qdtuLdOverlay';
    ov.innerHTML = `<div class="qdtuld-modal" role="dialog" aria-modal="true" aria-labelledby="qdtuLdTitle">
        <div class="qdtuld-head"><h3 id="qdtuLdTitle">${approve ? '<i class="fa-solid fa-file-signature"></i> Ký duyệt' : '<i class="fa-solid fa-circle-xmark" style="color:#dc2626;"></i> Từ chối'} - ${qdtuEsc(QDTU_KIND)} - ${qdtuEsc(item.ycbtCode)}</h3><button type="button" class="qdtuld-x" aria-label="Đóng" onclick="qdtuLdClose()">&times;</button></div>
        <div class="qdtuld-body">
            <div class="qdtuld-preview">${preview}</div>
            <div class="qdtuld-right">
                ${summary}
                ${typeof tlktViewHtml === 'function' ? tlktViewHtml(s.attachments, { boxClass: 'qdtuld-box', titleClass: 'qdtuld-box-title' }) : ''}
                ${qdtuLdHistoryHtml(item)}
                <div class="qdtuld-group"><label class="qdtuld-label" for="qdtuLdNote">${approve ? 'Ý kiến' : 'Lý do từ chối<span class="qdtuld-req">*</span>'}</label>
                    <textarea id="qdtuLdNote" class="qdtuld-input" rows="4" maxlength="2000" placeholder="${approve ? 'Nhập ý kiến (không bắt buộc)...' : 'Nhập lý do từ chối...'}" oninput="qdtuMark('qdtuLdNote', false)"></textarea>
                    <div class="qdtuld-err" id="qdtuLdNoteErr">Đây là trường bắt buộc</div></div>
            </div>
        </div>
        <div class="qdtuld-foot"><button type="button" class="btn btn-secondary" onclick="qdtuLdClose()">Hủy bỏ</button>${approve
            ? `<button type="button" class="btn btn-primary" onclick="qdtuLdSubmit()"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>`
            : '<button type="button" class="btn btn-danger" onclick="qdtuLdSubmit()"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button>'}</div>
    </div>`;
    document.body.appendChild(ov);
    qdtuFrameFull(true);
    const fr = qdtuEl('qdtuLdFrame');
    if (fr && W) fr.srcdoc = W.docPageHtml(qdtuBuildDocHtml(item.qdtu, s, { signerId: qdtuSignerOf(item) }), docName.replace(/\.[a-z]+$/i, ''), false);
}
function qdtuLdClose() { const el = qdtuEl('qdtuLdOverlay'); if (el) { el.remove(); qdtuFrameFull(false); } }
function qdtuLdSubmit() {
    const c = qdtuLd; if (!c) return;
    const item = qdtuFind(c.id);
    if (!qdtuCanAct(item)) { qdtuLdClose(); showToast('Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách.', 'error'); renderProposalsTable(); return; }
    const noteEl = qdtuEl('qdtuLdNote');
    const note = noteEl ? noteEl.value.trim() : '';
    const errs = [];
    if (!c.approve && !note) errs.push('qdtuLdNote');
    ['qdtuLdNote'].forEach(x => qdtuMark(x, errs.includes(x)));
    if (errs.length) { const f = qdtuEl(errs[0]); if (f) f.focus(); return; }
    const a = item.qdtuApproval;
    // Lãnh đạo cấp tiếp theo: lấy theo lựa chọn của cán bộ khi trình
    const next = (a.assignees || [])[a.level + 1] || '';
    const me = qdtuMe();
    const at = qdtuNow();
    const unitId = a.path[a.level];
    const last = qdtuIsLast(a);
    let msg;
    if (c.approve) {
        const fullNote = note;
        a.steps.push({ userId: me, unitId, at, note: fullNote });
        if (!last) {
            if (next) a.assignees[a.level + 1] = next;
            a.level += 1;
            qdtuHist(item, 'Ký duyệt', `${QDTU_KIND}: ký duyệt cấp ${qdtuUnitName(unitId)}; chuyển ${next ? qdtuUserLabel(next) : qdtuUnitName(a.path[a.level])}.${fullNote ? ' Ý kiến: ' + fullNote : ''}`);
            msg = `Đã ký duyệt ${QDTU_KIND}, chuyển ${next ? qdtuUserLabel(next) : 'cấp tiếp theo'} ký duyệt.`;
        } else {
            a.pending = false;
            item.status = QDTU_ST.PAY;
            const s = item.qdtu.sign = item.qdtu.sign || {};
            s.digitalSign = { by: me, at, cert: `Chứng thư số ${qdtuUserName(me)} - Ban Cơ yếu Chính phủ (giả lập)` };
            s.signedFile = qdtuDocBaseName(item.ycbtCode) + '_ky_so.pdf';
            item.signedFile = s.signedFile;
            item.digitalSign = { by: qdtuUserName(me), at, cert: s.digitalSign.cert };
            item.approvedDate = at; item.approvedLeader = qdtuUserName(me); item.approvedLeaderId = me; item.leaderOpinion = fullNote;
            qdtuHist(item, 'Ký duyệt', `${QDTU_KIND}: ký duyệt cấp ${qdtuUnitName(unitId)}.${fullNote ? ' Ý kiến: ' + fullNote : ''}`);
            qdtuHist(item, 'Ký số', `Ký số Quyết định tạm ứng kinh phí. ${s.digitalSign.cert}.`);
            msg = `Đã ký duyệt ${QDTU_KIND}. Đề nghị tạm ứng chuyển [${QDTU_ST.PAY}].`;
        }
    } else {
        a.pending = false;
        item.status = QDTU_ST.REJECT;
        item.qdtuReturned = { by: me, at, reason: note };
        item.leaderOpinion = note; item.approvedDate = at; item.approvedLeader = qdtuUserName(me); item.approvedLeaderId = me;
        if (!Array.isArray(item.rejectHistory)) item.rejectHistory = [];
        item.rejectHistory.unshift({ date: at, leader: qdtuUserName(me), opinion: note });
        qdtuHist(item, 'Từ chối', `${QDTU_KIND}: từ chối tại cấp ${qdtuUnitName(unitId)}. Lý do: ${note}`);
        msg = `Đã từ chối ${QDTU_KIND}, trả lại cán bộ trình. Đề nghị tạm ứng chuyển [${QDTU_ST.REJECT}].`;
    }
    saveProposalsToLocal();
    qdtuLdClose();
    showToast(msg, 'success');
    qdtuAfterChange();
}

// =====================================================================================
// XEM CHI TIẾT ĐỀ NGHỊ TẠM ỨNG THEO QUYẾT ĐỊNH TẠM ỨNG (Row click)
// =====================================================================================
function qdtuCloseView() { const m = qdtuEl('qdtuViewModal'); if (m) m.remove(); }
function qdtuView(id) {
    const item = qdtuFind(id); if (!qdtuIs(item)) return;
    qdtuInjectCss();
    qdtuCloseView();
    const f = item.qdtu; const s = f.sign || {};
    const it = (k, v) => `<div class="qdtu-dtl-item"><div class="k">${k}</div><div class="v">${v === '' || v == null ? '-' : v}</div></div>`;
    const sec = (icon, title, body) => `<div class="qdtu-dtl-sec"><div class="qdtu-dtl-title"><i class="fa-solid ${icon}"></i> ${title}</div>${body}</div>`;
    const grid = x => `<div class="qdtu-dtl-grid">${x}</div>`;
    const cash = f.payMethod === QDTU_CASH;
    const general = grid(it('Mã đề nghị', qdtuEsc(item.code)) + it('Loại đề nghị', 'Đề nghị tạm ứng') + it('Trạng thái', `<span class="badge badge-info">${qdtuEsc(item.status)}</span>${item.status === QDTU_ST.REVIEW ? `<span class="qdtu-sub">${qdtuEsc(QDTU_KIND)}</span>` : ''}`)
        + it('Mã hồ sơ', qdtuEsc(item.ycbtCode)) + it('Mã vụ việc', qdtuEsc(qdtuVv(item.ycbtCode))) + it('Cơ quan giải quyết', qdtuEsc(f.unitName)) + it('Ngày đề nghị', qdtuEsc(item.date)) + it('Cán bộ xử lý', qdtuEsc(item.user)));
    const rej = item.status === QDTU_ST.REJECT && item.qdtuReturned ? grid(it('Người từ chối', qdtuEsc(qdtuUserName(item.qdtuReturned.by))) + it('Thời điểm', qdtuEsc(item.qdtuReturned.at)) + it('Lý do từ chối', qdtuEsc(item.qdtuReturned.reason))) : '';
    const nyc = grid(it('Họ và tên/Tên tổ chức', qdtuEsc(f.nycName)) + it('Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế/Mã số của tổ chức', qdtuEsc(f.nycIdNo)) + it('Địa chỉ', qdtuEsc(f.nycAddress)));
    const money = grid(it('Thiệt hại về tinh thần', qdtuFmt(f.tinhThan) + ' đồng') + it('Thiệt hại khác có thể tính được ngay mà không cần xác minh', qdtuFmt(f.khac) + ' đồng') + it('Tỷ lệ tạm ứng', qdtuRateText(f.rate) + '%')
        + it('Số tiền tạm ứng kinh phí', qdtuFmt(f.amount) + ' đồng') + it('Viết bằng chữ', qdtuEsc(qdtuBangChu(Number(f.amount) || 0))));
    const rec = grid(it('Họ và tên người nhận tạm ứng kinh phí', qdtuEsc(f.recName)) + it('Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế', qdtuEsc(f.recIdNo)) + it('Địa chỉ', qdtuEsc(f.recAddress)));
    const pay = grid(it('Phương thức nhận tiền', qdtuEsc(f.payMethod)) + (cash ? it('Cơ quan chi trả tiền mặt', qdtuEsc(f.cashPlace)) : it('Chủ tài khoản', qdtuEsc(f.accHolder)) + it('Số tài khoản ngân hàng', qdtuEsc(f.account)) + it('Ngân hàng', qdtuEsc([f.bank, f.branch].filter(Boolean).join(' - ')))));
    const docLink = s.method === 'Ký ngoài' ? qdtuEsc(s.signedFile) : `<a href="javascript:void(0)" onclick="qdtuViewDoc('${item.id}')">${qdtuEsc(s.signedFile || (s.docFile || {}).name || qdtuDocBaseName(item.ycbtCode) + '.doc')}</a>`;
    const dec = grid(it('Hình thức ký', s.method === 'Ký ngoài' ? 'Ký ngoài' : 'Ký số trên hệ thống') + it(s.method === 'Ký ngoài' ? 'Số quyết định' : 'Số, ký hiệu văn bản', qdtuEsc(s.docNo)) + it(s.method === 'Ký ngoài' ? 'Ngày quyết định' : 'Ngày văn bản', qdtuEsc(s.docDate))
        + (s.method === 'Ký ngoài' ? it('Người ký', qdtuEsc(qdtuUserName(s.offSigner))) : '') + it('Văn bản', docLink) + (s.digitalSign ? it('Ký số', `${qdtuEsc(qdtuUserName(s.digitalSign.by))} - ${qdtuEsc(s.digitalSign.at)}`) : ''))
        // Tài liệu ban hành kèm theo / không ban hành kèm theo của Quyết định tạm ứng (khối rỗng / không có quyền xem thì không hiển thị)
        + (typeof tlktViewHtml === 'function' ? tlktViewHtml(s.attachments || [], { boxClass: 'tlkt-view', titleClass: 'tlkt-sec-title' }) : '');
    const paid = item.status === QDTU_ST.DONE ? grid(it('Ngày chi trả', qdtuEsc(item.payoutDate)) + it('Số tiền chi trả', qdtuFmt(item.payoutAmountReal) + ' đồng') + it('Phương thức chi trả', qdtuEsc(item.payoutMethod)) + it('Người nhận', qdtuEsc(item.payoutRecName))) : '';
    const hist = (item.qdtuHistory || []).slice().reverse().map(h => `<div class="qdtu-hist-row"><span style="color:#64748b;">${qdtuEsc(h.at)}</span><span style="font-weight:600;">${qdtuEsc(h.userName)}</span><span><b>${qdtuEsc(h.action)}</b>${h.note ? ': ' + qdtuEsc(h.note) : ''}</span></div>`).join('');
    let btns = '';
    if (kpRole() === 'lanh-dao') {
        if (qdtuCanAct(item)) btns = `<button type="button" class="btn btn-danger" onclick="qdtuLdOpen('${item.id}','reject')" style="background:#ef4444; color:#fff; border:none;"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button><button type="button" class="btn btn-primary" onclick="qdtuLdOpen('${item.id}','approve')"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>`;
    } else {
        if (item.status === QDTU_ST.REJECT) btns += `<button type="button" class="btn btn-primary" onclick="qdtuCloseView(); qdtuOpenPage('${item.id}')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật Quyết định tạm ứng</button>`;
        if (item.status === QDTU_ST.PAY) btns += `<button type="button" class="btn btn-success" onclick="qdtuCloseView(); payProposalDirect('${item.id}')"><i class="fa-solid fa-hand-holding-dollar"></i> Cập nhật chi trả</button>`;
    }
    const m = document.createElement('div');
    m.className = 'qdtu-modal open'; m.id = 'qdtuViewModal';
    m.innerHTML = `<div class="qdtu-modal-box qdtu-qs-box" style="width:980px;">
        <div class="qdtu-qs-head"><div><div class="qdtu-qs-head-title"><span class="qdtu-qs-head-ico"><i class="fa-solid fa-file-invoice-dollar"></i></span><span>CHI TIẾT QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ</span></div>
            <div class="qdtu-qs-sub">Mã đề nghị: <strong style="color:var(--primary-color);">${qdtuEsc(item.code)}</strong><span class="qdtu-qs-dot">•</span> Người yêu cầu: <span style="font-weight:600; color:#334155;">${qdtuEsc(item.nycName)}</span></div></div>
            <button type="button" class="qdtu-qs-head-close" onclick="qdtuCloseView()" title="Đóng">&times;</button></div>
        <div class="qdtu-qs-body qdtu-gqx-body">
            ${sec('fa-circle-info', 'Thông tin chung', general)}
            ${rej ? sec('fa-triangle-exclamation', 'Lý do bị từ chối', rej) : ''}
            ${sec('fa-user', 'Thông tin người yêu cầu', nyc)}
            ${sec('fa-coins', 'Số tiền tạm ứng kinh phí', money)}
            ${sec('fa-hand-holding-dollar', 'Thông tin người nhận tạm ứng', rec)}
            ${sec('fa-money-bill-transfer', 'Phương thức chi trả tiền tạm ứng', pay)}
            ${sec('fa-file-signature', 'Quyết định tạm ứng kinh phí', dec)}
            ${item.qdtuApproval ? qdtuLdHistoryHtml(item) : ''}
            ${paid ? sec('fa-receipt', 'Kết quả chi trả', paid) : ''}
            ${sec('fa-clock-rotate-left', 'Lịch sử xử lý', hist || '<div style="color:#64748b;">Chưa có lịch sử.</div>')}
        </div>
        <div class="qdtu-modal-foot qdtu-qs-foot"><div class="qdtu-qs-foot-btns">${btns}<button type="button" class="btn btn-secondary" onclick="qdtuCloseView()">Đóng</button></div></div>
    </div>`;
    document.body.appendChild(m);
}

// =====================================================================================
// LIÊN THÔNG LUỒNG "CẤP TẠM ỨNG" SẴN CÓ (Chờ chi trả -> Cập nhật chi trả (MH03) -> Hoàn thành)
// =====================================================================================
// MH03 lấy thông tin vụ việc từ mockClaims: bổ sung vụ việc của Quyết định tạm ứng nếu chưa có
function qdtuEnsureMockClaim(item) {
    if (!qdtuIs(item) || typeof mockClaims === 'undefined' || mockClaims.some(c => c.code === item.ycbtCode)) return;
    const f = item.qdtu;
    mockClaims.push({ code: item.ycbtCode, nyc: f.nycName, role: f.nycRole || 'Người bị thiệt hại', cardType: 'CCCD', cardNo: f.nycIdNo, address: f.nycAddress, agency: f.unitName, field: 'Lĩnh vực khác', amount: f.amount, status: 'Xác minh thiệt hại',
        suggestedAdvance: f.amount, advanceTinhThan: f.tinhThan, advanceKhac: f.khac, advanceRecKenh: f.payMethod === QDTU_CASH ? 'tien-mat' : 'chuyen-khoan', advanceBankUser: f.accHolder, advanceBankAccount: f.account, advanceBankName: f.bank, advanceBankBranch: f.branch });
}
// Cập nhật chi trả: điền sẵn người nhận, phương thức chi trả theo Quyết định tạm ứng
function qdtuFillPayout(item) {
    const f = item.qdtu; const set = (id, v) => { const el = qdtuEl(id); if (el) el.value = v || ''; };
    set('payoutRecName', f.recName); set('payoutRecAddress', f.recAddress);
    const cash = f.payMethod === QDTU_CASH;
    const rc = qdtuEl('payoutMethod_Cash'), rt = qdtuEl('payoutMethod_Transfer');
    if (rc) rc.checked = cash; if (rt) rt.checked = !cash;
    if (typeof handlePayoutMethodChange === 'function') handlePayoutMethodChange(cash ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản');
    if (!cash) { set('payoutBankUser', f.accHolder); set('payoutBankAccount', f.account); set('payoutBankName', f.bank); set('payoutBankBranch', f.branch); }
    set('payoutAmountReal', qdtuFmt(item.amount));
}
// Hoàn thành chi trả tạm ứng không kết thúc vụ việc: giữ nguyên trạng thái vụ việc trong claimsList
let qdtuPayGuard = null;
function qdtuRestoreClaim(g) {
    try {
        const list = JSON.parse(localStorage.getItem('claimsList') || '[]');
        const c = Array.isArray(list) ? list.find(x => x && x.code === g.code) : null;
        if (c) {
            c.status = g.status; c.moneyPaid = g.moneyPaid; c.thucthiDate = g.thucthiDate; c.thucthiNote = g.thucthiNote;
            if (Array.isArray(c.timeline) && c.timeline.length > g.tl) c.timeline.splice(g.tl);
            localStorage.setItem('claimsList', JSON.stringify(list));
        }
        if (!g.hadPaidKey) localStorage.removeItem('claimPayoutCompleted_' + g.code);
    } catch (e) { /* bỏ qua */ }
    const item = qdtuFind(g.id);
    if (item && item.status === QDTU_ST.DONE) {
        qdtuHist(item, 'Cập nhật chi trả', `Ngày chi trả ${item.payoutDate || '-'}; số tiền ${qdtuFmt(item.payoutAmountReal)} đồng; ${item.payoutMethod || ''}.`);
        saveProposalsToLocal();
    }
}

// ---------------- Dữ liệu mẫu: 01 Quyết định tạm ứng Chờ duyệt ----------------
function qdtuSeed() {
    if (proposalsList.some(p => p && p.id === 'P_QDTU_S1')) return false;
    const c = QDTU_SEED_CLAIMS[3];
    const unitId = qdtuClaimUnit(c);
    const W = qdtuW();
    const root = W ? (W.getRootId(unitId) || unitId) : unitId;
    const form = { claimCode: c.code, unitId: root, unitName: qdtuUnitName(root), isOrg: false, nycRole: 'Người bị thiệt hại', nycName: c.nyc, nycIdNo: c.nycCardNo, nycAddress: qdtuClaimAddress(c),
        tinhThan: c.advanceTinhThan, khac: c.advanceKhac, rate: 50, amount: 25000000, recName: c.nyc, recIdNo: c.nycCardNo, recAddress: qdtuClaimAddress(c), officer: c.officerName,
        payMethod: QDTU_CASH, accHolder: '', account: '', bank: '', branch: '', cashPlace: qdtuUnitName(root) };
    const levels = qdtuLevels(c.code);
    if (!levels.length) return false;
    const assignees = levels.map(lv => lv.leaders[0] || '');
    const sign = { method: 'Ký số', docNo: '     /QĐ-STP', docDate: '21/10/2026', canCu: QDTU_CAN_CU_DEFAULT.join('\n'), noiNhan: qdtuNoiNhanDefault(form),
        docFile: { name: qdtuDocBaseName(c.code) + '.doc', generated: true }, assignees };
    const item = { id: 'P_QDTU_S1', code: nextKinhPhiCode(), type: QDTU_TYPE, origin: 'Tạo QĐ tạm ứng', date: '21/10/2026', files: [], notes: '', source: '', cqCap: '',
        ycbtCode: c.code, nycName: c.nyc, nycRole: 'Người bị thiệt hại', amount: form.amount, agency: form.unitName, advApproveTinhThan: form.tinhThan, advApproveKhac: form.khac,
        payoutMethod: 'Nhận tiền mặt', signMethod: 'Ký số', docNo: sign.docNo, docDate: sign.docDate, draftDoc: sign.docFile.name, signedFile: null, digitalSign: null,
        user: 'Nguyễn Văn Cán Bộ', status: QDTU_ST.REVIEW, qdtu: Object.assign({}, form, { sign }),
        qdtuApproval: { kind: QDTU_KIND, path: levels.map(l => l.unitId), assignees, level: 0, steps: [], content: 'Kính trình Lãnh đạo ký Quyết định tạm ứng kinh phí.', submittedBy: 'canbonv', submittedAt: '09:30 21/10/2026', pending: true },
        qdtuHistory: [
            { at: '09:20 21/10/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Tạo Quyết định tạm ứng', note: `Mã hồ sơ ${c.code}; số tiền tạm ứng 25.000.000 đồng.` },
            { at: '09:30 21/10/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Trình ký', note: `${QDTU_KIND}. Trình ${qdtuUserName(assignees[0])} - ${qdtuUnitName(levels[0].unitId)}. Nội dung: Kính trình Lãnh đạo ký Quyết định tạm ứng kinh phí.` }
        ] };
    proposalsList.unshift(item);
    return true;
}
function qdtuImportAndSeed() {
    if (qdtuSeed()) saveProposalsToLocal();
    proposalsList.forEach(qdtuEnsureMockClaim);
}

// ---------------- Danh sách: nút Tạo QĐ tạm ứng, Loại trình, thao tác Lãnh đạo ----------------
function qdtuLeaderActionsHtml(item) {
    const off = 'opacity: 0.35; pointer-events: none; cursor: not-allowed;';
    // Icon chuẩn Ký duyệt / Từ chối (đồng nhất màn Xác định cơ quan GQBT)
    if (!qdtuCanAct(item)) return `<button class="icon-btn accept sign" data-admin-icon-normalized="1" style="${off}" title="Ký duyệt"><i class="fa-solid fa-file-signature"></i></button> <button class="icon-btn delete reject" data-admin-icon-normalized="1" style="${off}" title="Từ chối"><i class="fa-solid fa-ban"></i></button>`;
    return `<button class="icon-btn accept sign" data-admin-icon-normalized="1" title="Ký duyệt" onclick="event.stopPropagation(); qdtuLdOpen('${item.id}','approve')"><i class="fa-solid fa-file-signature"></i></button> <button class="icon-btn delete reject" data-admin-icon-normalized="1" title="Từ chối" onclick="event.stopPropagation(); qdtuLdOpen('${item.id}','reject')"><i class="fa-solid fa-ban"></i></button>`;
}
function qdtuDecorateTable() {
    const tbody = qdtuEl('proposalsTableBody'); if (!tbody) return;
    const isLeader = kpRole() === 'lanh-dao';
    Array.from(tbody.rows).forEach(tr => {
        if (tr.cells.length < 10) return; // Lưới MH01 10 cột (đã bỏ cột Loại kinh phí khi tách menu): Trạng thái = cột kề cuối, Thao tác = cột cuối
        const stCell = tr.cells[tr.cells.length - 2], actCell = tr.cells[tr.cells.length - 1];
        const code = tr.cells[1].innerText.trim();
        const item = proposalsList.find(p => p.code === code && qdtuIs(p));
        if (!item) return;
        // Dòng phụ Loại trình dưới badge (Chờ duyệt / Bị trả lại), đồng bộ màn Quyết định GQBT
        if (item.status === QDTU_ST.REVIEW || item.status === QDTU_ST.REJECT) stCell.insertAdjacentHTML('beforeend', `<div class="wf-sub${item.status === QDTU_ST.REJECT ? ' returned' : ''}">${qdtuEsc(QDTU_KIND)}</div>`);
        if (isLeader) { const box = actCell.querySelector('.action-flex'); if (box) box.innerHTML = qdtuLeaderActionsHtml(item); }
    });
}
function qdtuEnsureToolbarButton() {
    const ref = qdtuEl('btnCreateProposalTop');
    let btn = qdtuEl('btnQdtuCreateTop');
    if (!btn && ref) {
        btn = document.createElement('button');
        btn.className = 'btn btn-primary'; btn.id = 'btnQdtuCreateTop'; btn.type = 'button';
        btn.style.cssText = 'height: 32px; padding: 0 12px; font-size: 12.5px;';
        btn.innerHTML = '<i class="fa-solid fa-file-signature"></i> Tạo QĐ tạm ứng';
        btn.onclick = () => qdtuOpenPage();
        ref.parentNode.insertBefore(btn, ref.nextSibling);
    }
    // Tạo QĐ tạm ứng: chỉ menu Tạm ứng kinh phí, tab Chờ xử lý, Cán bộ xử lý (Tạo thông báo chi trả: menu Chi trả tiền bồi thường)
    if (btn) btn.style.setProperty('display', (kpActiveTab === 'pending' && kpRole() !== 'lanh-dao' && (typeof kpMenu !== 'function' || kpMenu() === 'tam-ung')) ? 'inline-flex' : 'none', 'important');
}

// ---------------- Bọc các chức năng sẵn có của màn hình ----------------
(function () {
    const origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () { const r = origSync.apply(this, arguments); qdtuImportAndSeed(); return r; };
    const origInTab = kpInTab;
    kpInTab = function (tab, item) {
        if (!qdtuIs(item) || kpRole() !== 'lanh-dao') return origInTab.apply(this, arguments);
        return tab === 'pending' ? qdtuCanAct(item) : (qdtuLeaderHandled(item) && !qdtuCanAct(item));
    };
    const origSpec = kpSpecialistActions;
    kpSpecialistActions = function (item, b) {
        if (!qdtuIs(item)) return origSpec.apply(this, arguments);
        const upd = item.status === QDTU_ST.REJECT
            ? `<button class="icon-btn edit" title="Cập nhật Quyết định tạm ứng" onclick="event.stopPropagation(); qdtuOpenPage('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`
            : b.updateBtn;
        return origSpec.call(this, item, Object.assign({}, b, { updateBtn: upd }));
    };
    const origRefresh = kpRefreshTabUi;
    kpRefreshTabUi = function () { const r = origRefresh.apply(this, arguments); qdtuEnsureToolbarButton(); return r; };
    const origRender = renderProposalsTable;
    renderProposalsTable = function () { const r = origRender.apply(this, arguments); qdtuDecorateTable(); return r; };
    const origView = viewProposalDetail;
    viewProposalDetail = function (id) { if (qdtuIs(qdtuFind(id))) { qdtuView(id); return; } return origView.apply(this, arguments); };
    const origUpd = updateProposalDirect;
    updateProposalDirect = function (id) { if (qdtuIs(qdtuFind(id))) { qdtuOpenPage(id); return; } return origUpd.apply(this, arguments); };
    const origApprove = openApproveModal;
    openApproveModal = function (id) { if (qdtuIs(qdtuFind(id))) { qdtuLdOpen(id, 'approve'); return; } return origApprove.apply(this, arguments); };
    const origReject = openRejectModal;
    openRejectModal = function (id) { if (qdtuIs(qdtuFind(id))) { qdtuLdOpen(id, 'reject'); return; } return origReject.apply(this, arguments); };
    const origPay = payProposalDirect;
    payProposalDirect = function (id) {
        const item = qdtuFind(id);
        if (qdtuIs(item)) qdtuEnsureMockClaim(item);
        const r = origPay.apply(this, arguments);
        if (qdtuIs(item) && item.status === QDTU_ST.PAY) qdtuFillPayout(item);
        return r;
    };
    const origSubmitPay = submitPayoutReal;
    submitPayoutReal = function () {
        const item = qdtuFind(selectedProposalId);
        if (!qdtuIs(item)) return origSubmitPay.apply(this, arguments);
        let snap = { id: item.id, code: item.ycbtCode, status: undefined, moneyPaid: undefined, thucthiDate: undefined, thucthiNote: undefined, tl: 0, hadPaidKey: false };
        try {
            const list = JSON.parse(localStorage.getItem('claimsList') || '[]');
            const c = Array.isArray(list) ? list.find(x => x && x.code === item.ycbtCode) : null;
            if (c) Object.assign(snap, { status: c.status, moneyPaid: c.moneyPaid, thucthiDate: c.thucthiDate, thucthiNote: c.thucthiNote, tl: Array.isArray(c.timeline) ? c.timeline.length : 0 });
            snap.hadPaidKey = localStorage.getItem('claimPayoutCompleted_' + item.ycbtCode) !== null;
        } catch (e) { /* bỏ qua */ }
        qdtuPayGuard = snap;
        try { return origSubmitPay.apply(this, arguments); } finally { qdtuPayGuard = null; }
    };
    const origConfirm = showConfirmModal;
    showConfirmModal = function (message, callback, title) {
        const g = qdtuPayGuard;
        if (g && typeof callback === 'function') {
            const cb = callback;
            return origConfirm.call(this, message, function () { const r = cb.apply(this, arguments); qdtuRestoreClaim(g); return r; }, title);
        }
        return origConfirm.apply(this, arguments);
    };
})();
function btnnOpenUploadedFile(f) { if (!f) return; const b = (typeof Blob !== "undefined" && f instanceof Blob) ? f : f.raw; if (b) { if (!f.__url) f.__url = URL.createObjectURL(b); window.open(f.__url, "_blank"); return; } (typeof showToast === "function" ? showToast : alert)("Tệp mẫu [" + f.name + "] không có nội dung để mở xem.", "info"); }
