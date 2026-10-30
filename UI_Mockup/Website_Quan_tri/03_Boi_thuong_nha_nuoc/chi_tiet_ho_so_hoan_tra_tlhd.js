/*
 * Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả (tiền tố tlhd) - Màn hình Cập nhật / Xem chi tiết hồ sơ hoàn trả.
 * Bố cục như Popup Không thụ lý hồ sơ (quan_ly_boi_thuong.html - modalGqKtl):
 *   - Ký số trên hệ thống: Wizard 2 bước (1) Nhập thông tin ── (2) Kéo ô ký & chọn Lãnh đạo; văn bản sinh theo Mẫu 33/BTNN hoặc tải lên từ máy.
 *   - Ký ngoài: 01 bước, đính kèm PDF đã ký & đóng dấu, Ban hành văn bản trực tiếp.
 * Luồng trạng thái (chốt 23/10): hồ sơ chưa thành lập Hội đồng (mới khởi tạo, chưa có trạng thái) -> (Trình Lãnh đạo) Chờ duyệt [Thành lập hội đồng]
 *   -> Lãnh đạo các cấp ký duyệt (cấp cuối ký số) -> Họp hội đồng; Từ chối -> Bị trả lại thành lập HĐ; Ký ngoài -> Họp hội đồng.
 * Phụ thuộc: btnn_luong_xu_ly.js (BTNN_WF: cây đơn vị, cấu hình luồng), ../01_Quan_tri_he_thong/dm_loai_co_quan.js (DM_LCQ: DM_57/DM_58)
 * và các hàm sẵn có của chi_tiet_ho_so_hoan_tra.html (activeDossier, showToast, showCustomConfirm, switchSimulatorState...).
 */

const TLHD_MAX_FILE = 50 * 1024 * 1024;
const TLHD_SIGN_SIZES = { nhay: [[180, 75], [220, 90], [280, 110]], so: [[200, 85], [245, 110], [320, 130]] };
const TLHD_REQ_MSG = 'Đây là trường bắt buộc';
const TLHD_OFF_FILE_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
const TLHD_SO_QD_DEFAULT = '     /QĐ-';
const TLHD_OFF_TARGET = 'Họp hội đồng'; // Trạng thái hồ sơ sau khi Ban hành văn bản (Ký ngoài)
const TLHD_SIGN_CONTENT_DEFAULT ='Kính trình Lãnh đạo xem xét, ký duyệt Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả.';

let tlhdState = { method: 'online', docSrc: 'gen', members: [], onlineFile: null, offlineFile: null, step: 1 };
const tlhdSignState = {};
let tlhdConvertToken = 0; // Mã lượt chuyển đổi .doc/.docx sang PDF (bỏ kết quả của lượt đã hủy)

function tlhdW() { return window.BTNN_WF || null; }
function tlhdEl(id) { return document.getElementById(id); }
function tlhdE(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function tlhdToast(msg, type) { if (typeof showToast === 'function') showToast(msg, type || 'info'); }
function tlhdPad(n) { return String(n).padStart(2, '0'); }
function tlhdToday() { const d = new Date(); return `${tlhdPad(d.getDate())}/${tlhdPad(d.getMonth() + 1)}/${d.getFullYear()}`; }
function tlhdNow() { return typeof nowViShort === 'function' ? nowViShort() : new Date().toLocaleString('vi-VN'); }
function tlhdFold(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); }
function tlhdFileSize(b) { return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }

// ---------------- CSS (sao chép từ Popup Không thụ lý hồ sơ, giới hạn trong #tlhdModal) ----------------
const TLHD_CSS = [
    '#tlhdModal .gqx-body { padding:18px 24px; background:#f8fafc; }',
    '#tlhdModal .gqx-sec { background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:16px 18px; margin-bottom:14px; }',
    '#tlhdModal .gqx-sec:last-child { margin-bottom:0; }',
    '#tlhdModal .gqx-sec-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; letter-spacing:.2px; margin:0 0 14px; padding-bottom:10px; border-bottom:1px solid #f1f5f9; }',
    '#tlhdModal .gqx-sec-title > i { color:#2563eb; width:16px; text-align:center; }',
    '#tlhdModal .gqx-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:0 16px; }',
    '#tlhdModal .gqx-field { margin-bottom:14px; }',
    '#tlhdModal .gqx-grid2 .gqx-field { margin-bottom:0; }',
    '#tlhdModal .form-label { display:block; font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; }',
    '#tlhdModal .gqx-req { color:#dc2626; margin-left:3px; }',
    '#tlhdModal .gqx-sec-title .gqx-req, #tlhdModal .gqx-docfile-head .gqx-req { margin-left:-5px; }',
    '#tlhdModal .gqx-body .form-control { font-family:inherit; font-size:13px; height:38px; width:100%; box-sizing:border-box; }',
    '#tlhdModal textarea.form-control { height:auto !important; line-height:1.55; resize:vertical; }',
    '#tlhdModal select.form-control { padding:0 10px; cursor:pointer; }',
    '#tlhdModal .gqx-date { position:relative; }',
    '#tlhdModal .gqx-date .form-control { padding-right:36px; cursor:pointer; background:#fff; }',
    '#tlhdModal .gqx-date > i { position:absolute; right:12px; top:50%; transform:translateY(-50%); color:#2563eb; cursor:pointer; font-size:15px; }',
    '#tlhdModal .gqx-date input[type=date] { position:absolute; left:0; bottom:0; width:1px; height:1px; opacity:0; pointer-events:none; border:0; padding:0; }',
    '#tlhdModal .gqx-err { display:none; color:#dc2626; font-size:12px; margin-top:4px; }',
    '#tlhdModal .sign-cards-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:10px; align-items:stretch; }',
    '#tlhdModal .sign-card { position:relative; display:flex; align-items:center; justify-content:space-between; padding:10px 12px; min-height:58px; height:100%; box-sizing:border-box; border:1.5px solid #cbd5e1; border-radius:8px; background:#fff; cursor:pointer; transition:all .2s; box-shadow:0 1px 2px rgba(0,0,0,.03); margin:0; }',
    '#tlhdModal .sign-card:hover { border-color:#93c5fd; background:#f8fafc; }',
    '#tlhdModal .sign-card.active { border-color:#2563eb; background:#eff6ff; box-shadow:0 2px 6px rgba(37,99,235,.1); }',
    '#tlhdModal .sign-card input[type="radio"] { position:absolute; opacity:0; pointer-events:none; }',
    '#tlhdModal .sign-card-content { display:flex; align-items:center; gap:8px; flex:1; min-width:0; }',
    '#tlhdModal .sign-card-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; background:#dbeafe; color:#1d4ed8; }',
    '#tlhdModal .sign-card-icon.offline { background:#fef3c7; color:#b45309; }',
    '#tlhdModal .sign-card-text { flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; gap:2px; }',
    '#tlhdModal .sign-card-title { font-size:13px; font-weight:700; color:#1e293b; line-height:1.35; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }',
    '#tlhdModal .sign-card-desc { font-size:12px; font-weight:400; color:#64748b; line-height:1.4; text-wrap:balance; }',
    '#tlhdModal .sign-card.active .sign-card-title { color:#1d4ed8; }',
    '#tlhdModal .sign-card-check { font-size:15px; color:#cbd5e1; margin-left:8px; flex-shrink:0; }',
    '#tlhdModal .sign-card.active .sign-card-check { color:#2563eb; }',
    '#tlhdModal .doc-src-segmented { display:flex; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:8px; padding:4px; gap:4px; margin-bottom:14px; box-shadow:inset 0 1px 2px rgba(0,0,0,.05); }',
    '#tlhdModal .doc-src-seg-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; color:#475569; background:transparent; border:none; cursor:pointer; transition:all .2s; font-family:inherit; }',
    '#tlhdModal .doc-src-seg-btn:hover { color:#0f172a; background:rgba(255,255,255,.6); }',
    '#tlhdModal .doc-src-seg-btn.active { background:#2563eb; color:#fff !important; font-weight:700; box-shadow:0 2px 8px rgba(37,99,235,.35); }',
    '#tlhdModal .doc-src-seg-btn i { font-size:14px; color:#64748b; }',
    '#tlhdModal .doc-src-seg-btn.active i { color:#fff !important; }',
    '#tlhdModal .ktl-stepper-fullwidth { display:flex; align-items:center; justify-content:center; gap:14px; width:100%; padding:12px 24px; background:#f8fafc; border-bottom:1px solid #e2e8f0; flex-shrink:0; box-sizing:border-box; }',
    '#tlhdModal .ktl-step-tab { display:flex; align-items:center; gap:8px; cursor:pointer; user-select:none; }',
    '#tlhdModal .ktl-step-badge { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#fff; border:2px solid #cbd5e1; color:#64748b; font-size:12px; font-weight:700; flex-shrink:0; }',
    '#tlhdModal .ktl-step-tab.active .ktl-step-badge { background:#2563eb; border-color:#2563eb; color:#fff; }',
    '#tlhdModal .ktl-step-tab.completed .ktl-step-badge { background:#10b981; border-color:#10b981; color:#fff; }',
    '#tlhdModal .ktl-step-title { font-size:13.5px; font-weight:600; color:#64748b; }',
    '#tlhdModal .ktl-step-tab.active .ktl-step-title { color:#1d4ed8; font-weight:700; }',
    '#tlhdModal .ktl-step-tab.completed .ktl-step-title { color:#047857; }',
    '#tlhdModal .ktl-stepper-sep { width:80px; height:2px; background:#cbd5e1; }',
    // Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn mượt (không bật/tắt đột ngột)
    '#tlhdStepperBar { height:51px; box-sizing:border-box; overflow:hidden; transition:height .22s ease, padding .22s ease, opacity .18s ease, border-color .22s ease; }',
    '#tlhdStepperBar.is-collapsed { height:0; padding-top:0; padding-bottom:0; opacity:0; border-bottom-color:transparent; border-bottom-width:0; pointer-events:none; }',
    // Vùng kéo thả tệp / đang chuyển đổi sang PDF / File Card (sao từ .ktlx-* của Popup Không thụ lý; cùng min-height chống giật)
    '#tlhdModal .tlhd-drop { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; min-height:96px; box-sizing:border-box; padding:14px 16px; border:1.5px dashed #93c5fd; border-radius:10px; background:#f8fbff; text-align:center; cursor:pointer; transition:border-color .15s, background .15s; }',
    '#tlhdModal .tlhd-drop:hover, #tlhdModal .tlhd-drop.drag-over { border-color:#2563eb; background:#eff6ff; }',
    '#tlhdModal .tlhd-drop:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }',
    '#tlhdModal .tlhd-drop-ico { font-size:22px; color:#2563eb; }',
    '#tlhdModal .tlhd-drop-main { font-size:13px; color:#334155; }',
    '#tlhdModal .tlhd-drop-main a { color:#2563eb; font-weight:700; text-decoration:underline; cursor:pointer; }',
    '#tlhdModal .tlhd-drop-sub { font-size:12px; color:#64748b; }',
    '#tlhdModal .tlhd-drop.is-error { border-color:#dc2626; background:#fef2f2; }',
    '#tlhdModal .tlhd-converting { display:flex; align-items:center; justify-content:center; gap:10px; min-height:96px; box-sizing:border-box; border:1.5px dashed #93c5fd; border-radius:10px; background:#eff6ff; font-size:13px; font-weight:600; color:#1d4ed8; }',
    '#tlhdModal .tlhd-spinner { width:18px; height:18px; border:2.5px solid #bfdbfe; border-top-color:#2563eb; border-radius:50%; animation:tlhdSpin .8s linear infinite; }',
    '@keyframes tlhdSpin { to { transform:rotate(360deg); } }',
    '#tlhdModal .tlhd-card { display:flex; align-items:center; gap:12px; min-height:96px; box-sizing:border-box; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:12px 14px; }',
    '#tlhdModal .tlhd-card-ico { font-size:30px; flex-shrink:0; width:32px; text-align:center; }',
    '#tlhdModal .tlhd-card-ico.pdf { color:#dc2626; } #tlhdModal .tlhd-card-ico.word { color:#2563eb; }',
    '#tlhdModal .tlhd-card-info { flex:1; min-width:0; }',
    '#tlhdModal .tlhd-card-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }',
    '#tlhdModal .tlhd-card-meta { font-size:12px; color:#64748b; margin-top:3px; }',
    '#tlhdModal .tlhd-card-btns { display:flex; gap:6px; flex-shrink:0; }',
    '#tlhdModal .tlhd-card-btns .btn { min-width:84px; justify-content:center; }',
    '@media (max-width: 640px) { #tlhdModal .tlhd-card { flex-wrap:wrap; } }',
    '#tlhdModal .tlhd-status-note { margin-top:12px; font-size:12.5px; color:#1e3a8a; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:9px 12px; line-height:1.55; }',
    // Sinh văn bản: dòng mô tả + nút Xem trước văn bản trên cùng 1 dòng
    '#tlhdModal .tlhd-gen-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:nowrap; margin-top:4px; }',
    '#tlhdModal .tlhd-gen-row .gqx-file-hint { flex:1; min-width:0; }',
    '#tlhdModal .tlhd-gen-row .btn-preview-doc { flex-shrink:0; white-space:nowrap; }',
    '#tlhdModal .btn-upload-doc { display:inline-flex; align-items:center; gap:7px; background:#fff; color:#1d4ed8 !important; border:1.5px solid #2563eb; padding:7px 16px; font-size:13px; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 2px 5px rgba(37,99,235,.12); font-family:inherit; }',
    '#tlhdModal .btn-upload-doc:hover { background:#2563eb; color:#fff !important; }',
    '#tlhdModal .btn-preview-doc { display:inline-flex; align-items:center; gap:6px; background:#fff; color:#2563eb !important; border:1px solid #93c5fd; padding:6px 14px; font-size:12.5px; font-weight:600; border-radius:6px; cursor:pointer; font-family:inherit; }',
    '#tlhdModal .btn-preview-doc:hover { background:#eff6ff; border-color:#3b82f6; }',
    '#tlhdModal .gqx-docfile { margin-top:16px; border:1.5px dashed #60a5fa; background:linear-gradient(180deg,#eff6ff 0%,#f8fbff 100%); border-radius:10px; padding:14px 16px; }',
    '#tlhdModal .gqx-docfile.signed { border-color:#fbbf24; background:linear-gradient(180deg,#fffbeb 0%,#fffdf7 100%); margin-top:0; }',
    '#tlhdModal .gqx-docfile-head { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e40af; margin-bottom:10px; }',
    '#tlhdModal .gqx-docfile.signed .gqx-docfile-head { color:#92400e; }',
    '#tlhdModal .gqx-file-empty { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }',
    '#tlhdModal .gqx-file-hint { font-size:12.5px; color:#475569; display:flex; align-items:center; }',
    '#tlhdModal .gqx-file-actions { display:flex; gap:8px; flex-wrap:wrap; }',
    '#tlhdModal .gqx-file-ready { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #bfdbfe; border-radius:8px; padding:10px 12px; }',
    '#tlhdModal .gqx-file-ico { font-size:28px; color:#2563eb; flex-shrink:0; }',
    '#tlhdModal .gqx-file-info { flex:1; min-width:0; }',
    '#tlhdModal .gqx-file-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }',
    '#tlhdModal .gqx-file-meta { font-size:12px; color:#64748b; margin-top:3px; }',
    '#tlhdModal .gqx-file-btns { display:flex; gap:6px; flex-shrink:0; }',
    '#tlhdModal .gqx-danger { color:#dc2626 !important; }',
    '#tlhdModal .gqx-note { margin-top:10px; font-size:12px; color:#92400e; background:#fef3c7; border-radius:6px; padding:8px 10px; line-height:1.5; }',
    '#tlhdModal .tlhd-meta { background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:12px; }',
    '#tlhdModal .tlhd-meta-title { font-size:12px; font-weight:700; color:#334155; text-transform:uppercase; letter-spacing:.3px; margin-bottom:10px; display:flex; align-items:center; gap:6px; }',
    '#tlhdModal .tlhd-mem-head { display:flex; justify-content:space-between; align-items:center; margin:14px 0 6px; }',
    '#tlhdModal .tlhd-mem-table { width:100%; border-collapse:collapse; background:#fff; font-size:13px; table-layout:fixed; }',
    '#tlhdModal .tlhd-mem-table th { background:#f1f5f9; color:#334155; font-weight:700; font-size:12.5px; padding:8px 6px; border:1px solid #e2e8f0; text-align:left; }',
    '#tlhdModal .tlhd-mem-table td { padding:6px; border:1px solid #e2e8f0; vertical-align:top; }',
    '#tlhdModal .tlhd-mem-table .form-control { height:34px !important; font-size:12.5px !important; }',
    '#tlhdModal .tlhd-mem-table .wf-utree-display { min-height:34px; font-size:12.5px; padding:4px 8px; }',
    '#tlhdModal .tlhd-mem-table .wf-utree-panel { min-width:340px; }',
    '#tlhdModal .tlhd-stt { text-align:center; font-weight:600; padding-top:14px !important; }',
    '#tlhdModal .tlhd-del { border:1px solid #fecaca; background:#fff; color:#dc2626; border-radius:6px; width:30px; height:30px; cursor:pointer; margin-top:2px; }',
    '#tlhdModal .tlhd-del:disabled { opacity:.35; cursor:not-allowed; }',
    '#tlhdModal .wf-utree.is-invalid .wf-utree-display { border-color:#dc2626 !important; background:#fdf2f2; }',
    '#tlhdModal .a4-document-page { width:794px; min-height:1123px; background:#fff; box-shadow:0 10px 30px rgba(0,0,0,.3); position:relative; padding:50px 65px; font-family:"Times New Roman",Times,serif; font-size:14px; line-height:1.6; color:#111827; user-select:none; box-sizing:border-box; }',
    '#tlhdModal .sig-drag-box { position:absolute; border-radius:6px; cursor:move; user-select:none; display:flex; flex-direction:column; justify-content:space-between; padding:8px 10px; font-family:-apple-system,"Segoe UI",Roboto,sans-serif; box-sizing:border-box; min-width:140px; min-height:55px; }',
    '#tlhdModal .sig-drag-box.dragging { opacity:.92; z-index:99 !important; }',
    '#tlhdModal .sig-resize-handle { position:absolute; right:0; bottom:0; width:18px; height:18px; cursor:nwse-resize; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.08); border-top-left-radius:5px; border-bottom-right-radius:5px; }',
    '#tlhdModal .sig-resize-handle i { font-size:10px; transform:rotate(90deg); opacity:.8; }',
    '.tlhd-doc-table { width:100%; border-collapse:collapse; margin:6px 0 10px; font-size:13px; }',
    '.tlhd-doc-table th, .tlhd-doc-table td { border:1px solid #000; padding:4px 6px; vertical-align:top; }',
    '.tlhd-doc-table th { text-align:center; font-weight:bold; }',
    '#tlhdMembersView .tlhd-doc-table { font-family:inherit; }',
    '#tlhdMembersView .tlhd-doc-table th, #tlhdMembersView .tlhd-doc-table td { border-color:#e2e8f0; padding:8px 10px; }',
    // Bảng thành viên Hội đồng (màn xem): tiêu đề cột căn giữa; cột chữ căn trái, STT căn giữa (đè căn giữa ô cuối của admin-ui-standardizer)
    '#tlhdMembersView .tlhd-doc-table th { background:#f1f5f9; text-align:center !important; }',
    '#tlhdMembersView .tlhd-doc-table td { text-align:left !important; }',
    '#tlhdMembersView .tlhd-doc-table td:first-child { text-align:center !important; }',
    '#tlhdModal .tlhd-mem-table th { text-align:center !important; }',
    '#tlhdModal .tlhd-mem-table td { text-align:left !important; }',
    '#tlhdModal .tlhd-mem-table td:first-child, #tlhdModal .tlhd-mem-table td:last-child { text-align:center !important; }',
    '@media (max-width: 760px) { #tlhdModal .gqx-grid2, #tlhdModal .sign-cards-grid { grid-template-columns:1fr; } }'
].join('\n');

function tlhdInjectCss() {
    if (tlhdEl('tlhdCss')) return;
    const st = document.createElement('style');
    st.id = 'tlhdCss';
    st.textContent = TLHD_CSS;
    document.head.appendChild(st);
}

// ---------------- HTML popup ----------------
function tlhdModalHtml() {
    return `<div id="tlhdModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15,23,42,0.65); backdrop-filter:blur(2px); z-index:1050; justify-content:center; align-items:center;">
    <div id="tlhdContainer" style="background:#fff; width:960px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3);">
        <div style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;">
            <div>
                <div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;">
                    <span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#dbeafe; color:#2563eb; font-size:14px;"><i class="fa-solid fa-users-gear"></i></span>
                    <span>THÀNH LẬP HỘI ĐỒNG XEM XÉT TRÁCH NHIỆM HOÀN TRẢ</span>
                </div>
                <div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">
                    Hồ sơ: <strong id="tlhdHdrCode" style="color:var(--primary-color);">--</strong>
                    <span style="margin:0 6px;">•</span> Người yêu cầu bồi thường: <span id="tlhdHdrNyc" style="font-weight:600; color:#334155;">--</span>
                    <span style="margin:0 6px;">•</span> Đơn vị chi trả bồi thường: <span id="tlhdHdrAgency" style="font-weight:500; color:#475569;">--</span>
                </div>
            </div>
            <button type="button" onclick="tlhdClose()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button>
        </div>

        <div id="tlhdStepperBar" class="ktl-stepper-fullwidth">
            <div id="tlhdStep1Tab" class="ktl-step-tab active" onclick="tlhdGoStep1()"><span class="ktl-step-badge" id="tlhdStep1Badge">1</span><span class="ktl-step-title" id="tlhdStep1Title">Nhập thông tin</span></div>
            <div class="ktl-stepper-sep" id="tlhdStepperSep"></div>
            <div id="tlhdStep2Tab" class="ktl-step-tab" onclick="tlhdGoStep2()"><span class="ktl-step-badge" id="tlhdStep2Badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div>
        </div>

        <div id="tlhdStep1Body" class="gqx-body" style="overflow-y:auto; flex:1; padding:24px;">
            <div id="tlhdReturnedBlock" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;">
                <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> QUYẾT ĐỊNH THÀNH LẬP HỘI ĐỒNG BỊ LÃNH ĐẠO TRẢ LẠI</div>
                <div style="font-size:12.5px; color:#92400e; line-height:1.5;">Lý do bị trả lại: <strong id="tlhdReturnedReason">--</strong><br>Người từ chối: <span id="tlhdReturnedBy">--</span> • Thời điểm: <span id="tlhdReturnedAt">--</span></div>
            </div>

            <div class="gqx-sec">
                <div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div>
                <div class="sign-cards-grid">
                    <label class="sign-card active" id="tlhdCardOnline" for="tlhdMethodOnline">
                        <input type="radio" name="tlhdSignMethod" id="tlhdMethodOnline" value="online" checked onchange="tlhdSetMethod('online')">
                        <div class="sign-card-content"><div class="sign-card-icon"><i class="fa-solid fa-file-signature"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký số trên hệ thống</div><div class="sign-card-desc">Trình Lãnh đạo ký duyệt trên phần mềm</div></div></div>
                        <div class="sign-card-check"><i class="fa-solid fa-circle-check"></i></div>
                    </label>
                    <label class="sign-card" id="tlhdCardOffline" for="tlhdMethodOffline">
                        <input type="radio" name="tlhdSignMethod" id="tlhdMethodOffline" value="offline" onchange="tlhdSetMethod('offline')">
                        <div class="sign-card-content"><div class="sign-card-icon offline"><i class="fa-solid fa-stamp"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký ngoài (Ban hành trực tiếp)</div><div class="sign-card-desc">Tải lên văn bản PDF đã ký và đóng dấu</div></div></div>
                        <div class="sign-card-check"><i class="fa-regular fa-circle"></i></div>
                    </label>
                </div>
            </div>

            <div class="gqx-sec" id="tlhdDocSection">
                <div class="gqx-sec-title" id="tlhdDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>

                <div id="tlhdDocSrcGroup">
                    <div class="doc-src-segmented">
                        <button type="button" class="doc-src-seg-btn active" id="tlhdSegGen" onclick="tlhdSetDocSrc('gen')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 33/BTNN</span></button>
                        <button type="button" class="doc-src-seg-btn" id="tlhdSegUpload" onclick="tlhdSetDocSrc('upload')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button>
                    </div>
                </div>

                <div id="tlhdDocMetaGroup" class="tlhd-meta">
                    <div class="tlhd-meta-title"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu 33/BTNN</div>
                    <div class="gqx-grid2">
                        <div class="gqx-field">
                            <label class="form-label" for="tlhdSoQD">Số quyết định<span class="gqx-req">*</span></label>
                            <input type="text" id="tlhdSoQD" class="form-control" maxlength="50" placeholder="Nhập số quyết định..." oninput="tlhdClearErr('tlhdSoQD')">
                            <div id="tlhdSoQDErr" class="gqx-err">${TLHD_REQ_MSG}</div>
                        </div>
                        <div class="gqx-field">
                            <label class="form-label" for="tlhdNgayQD">Ngày quyết định<span class="gqx-req">*</span></label>
                            <div class="gqx-date">
                                <input type="text" id="tlhdNgayQD" class="form-control" placeholder="dd/mm/yyyy" readonly onclick="tlhdOpenDatePicker()">
                                <i class="fa-regular fa-calendar-days" onclick="tlhdOpenDatePicker()" title="Chọn ngày"></i>
                                <input type="date" id="tlhdNgayQDPicker" tabindex="-1" onchange="tlhdOnDatePicked(this.value)">
                            </div>
                            <div id="tlhdNgayQDErr" class="gqx-err">${TLHD_REQ_MSG}</div>
                        </div>
                    </div>
                    <div class="tlhd-mem-head">
                        <label class="form-label" style="margin:0;">Bảng danh sách thành viên trong hội đồng<span class="gqx-req">*</span></label>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="tlhdAddMember()"><i class="fa-solid fa-plus"></i> Thêm thành viên</button>
                    </div>
                    <table class="tlhd-mem-table">
                        <colgroup><col style="width:46px;"><col style="width:20%;"><col><col style="width:20%;"><col style="width:20%;"><col style="width:52px;"></colgroup>
                        <thead><tr><th style="text-align:center;">STT</th><th>Họ và tên<span class="gqx-req">*</span></th><th>Đơn vị công tác<span class="gqx-req">*</span></th><th>Chức vụ<span class="gqx-req">*</span></th><th>Chức danh trong hội đồng<span class="gqx-req">*</span></th><th style="text-align:center;">Xóa</th></tr></thead>
                        <tbody id="tlhdMemberBody"></tbody>
                    </table>
                </div>

                <div id="tlhdOnlineSection">
                    <input type="file" id="tlhdOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="tlhdOnOnlineFile(this)">
                    <div id="tlhdDocFileBox"></div>
                    <div id="tlhdDocFileErr" class="gqx-err">${TLHD_REQ_MSG}</div>
                </div>

                <div id="tlhdOfflineSection" style="display:none;">
                    <div class="gqx-grid2">
                        <div class="gqx-field"><label class="form-label" for="tlhdOffSo">Số, ký hiệu văn bản<span class="gqx-req">*</span></label><input type="text" id="tlhdOffSo" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="this.classList.remove('is-invalid'); tlhdEl('tlhdOffSoErr').style.display='none';"><div id="tlhdOffSoErr" class="gqx-err">Đây là trường bắt buộc</div></div>
                        <div class="gqx-field"><label class="form-label" for="tlhdOffNgay">Ngày văn bản<span class="gqx-req">*</span></label><input type="text" id="tlhdOffNgay" class="form-control" placeholder="dd/mm/yyyy" oninput="this.classList.remove('is-invalid'); tlhdEl('tlhdOffNgayErr').style.display='none';"><div id="tlhdOffNgayErr" class="gqx-err">Đây là trường bắt buộc</div></div>
                    </div>
                    <input type="file" id="tlhdOfflineFileInput" accept=".pdf" style="display:none;" onchange="tlhdOnOfflineFile(this)">
                    <div id="tlhdOfflineDrop" class="tlhd-drop" tabindex="0" role="button" onclick="tlhdEl('tlhdOfflineFileInput').click()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" ondragover="tlhdDragOver(event)" ondragleave="tlhdDragLeave(event)" ondrop="tlhdDropOffline(event)">
                        <i class="fa-solid fa-cloud-arrow-up tlhd-drop-ico"></i>
                        <div class="tlhd-drop-main">Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a></div>
                        <div class="tlhd-drop-sub">(Chỉ chấp nhận .pdf, tối đa 50MB)</div>
                    </div>
                    <div id="tlhdOfflineFileRow" style="display:none;"></div>
                    <div id="tlhdOfflineFileErr" class="gqx-err">${TLHD_OFF_FILE_MSG}</div>
                    <div id="tlhdOffStatusNote" class="tlhd-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang trạng thái <strong>${TLHD_OFF_TARGET}</strong>.</div>
                </div>
                <!-- Tài liệu ban hành kèm theo + Tài liệu không ban hành kèm theo (Ký số: 02 khối; Ký ngoài: chỉ khối ban hành kèm theo; không bắt buộc) -->
                <div id="tlhdTlkt" style="margin-top:14px;"></div>
            </div>
        </div>

        <div id="tlhdStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative; min-height:0;">
            <div style="flex:1; overflow:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;">
                <div id="tlhdA4Page" class="a4-document-page"></div>
            </div>
            <div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; z-index:20;">
                <div>
                    <div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div>
                    <div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div>
                </div>
                <div id="tlhdSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>
                <div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>
                <div>
                    <label class="form-label" for="tlhdSignContent">Nội dung trình<span class="gqx-req">*</span></label>
                    <textarea id="tlhdSignContent" class="form-control" rows="4" style="font-size:13px; font-family:inherit; width:100%; box-sizing:border-box;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="tlhdClearErr('tlhdSignContent')"></textarea>
                    <div id="tlhdSignContentErr" class="gqx-err">${TLHD_REQ_MSG}</div>
                </div>
            </div>
        </div>

        <div style="padding:16px 28px 18px; display:flex; justify-content:flex-end; align-items:center; background:#f8fafc; border-top:1px solid #e2e8f0; flex-shrink:0;">
            <div style="display:flex; gap:10px;">
                <button type="button" class="btn btn-secondary" onclick="tlhdClose()">Hủy bỏ</button>
                <button type="button" id="tlhdBtnIssue" class="btn btn-primary" onclick="tlhdSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>
                <button type="button" id="tlhdBtnNext" class="btn btn-primary" onclick="tlhdGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>
                <button type="button" id="tlhdBtnBack" class="btn btn-secondary" onclick="tlhdGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
                <button type="button" id="tlhdBtnSubmit" class="btn btn-primary" onclick="tlhdSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>
            </div>
        </div>
    </div>
</div>`;
}

function tlhdEnsureModal() {
    tlhdInjectCss();
    if (!tlhdEl('tlhdModal')) document.body.insertAdjacentHTML('beforeend', tlhdModalHtml());
}

// Trang mở trong khung (iframe) của Trang chủ: popup phủ toàn bộ cửa sổ trình duyệt
function tlhdFrameFull(on) {
    try {
        const fe = window.frameElement; if (!fe) return;
        if (on) { if (fe.dataset.tlhdPrev === undefined) fe.dataset.tlhdPrev = fe.getAttribute('style') || ''; fe.setAttribute('style', fe.dataset.tlhdPrev + ';position:fixed;inset:0;width:100vw;height:100vh;z-index:99999;border:0;'); }
        else if (fe.dataset.tlhdPrev !== undefined) { fe.setAttribute('style', fe.dataset.tlhdPrev); delete fe.dataset.tlhdPrev; }
    } catch (e) { /* khác nguồn: bỏ qua */ }
}

// ---------------- Dữ liệu hồ sơ: cơ quan, người yêu cầu, chức vụ người đứng đầu ----------------
function tlhdAgency() { return (activeDossier && activeDossier.agency) || 'Sở Tư pháp Hà Nội'; }
function tlhdNycName() {
    const code = activeDossier ? activeDossier.claimCode : '';
    try { if (typeof CLAIMANT_BY_CODE !== 'undefined' && CLAIMANT_BY_CODE[code]) return CLAIMANT_BY_CODE[code]; } catch (e) { /* bỏ qua */ }
    return (activeDossier && (activeDossier.claimantName || activeDossier.nyc)) || '';
}
// Cá nhân: tiền tố Ông/Bà; Tổ chức: không có tiền tố
function tlhdNycDisplay() {
    const n = tlhdNycName();
    if (!n) return 'Ông/Bà ……';
    return /^(công ty|cty|tổ chức|hợp tác xã|doanh nghiệp|ngân hàng)/i.test(n) ? n : 'Ông/Bà ' + n;
}
// Loại cơ quan [DM_57] theo tên đơn vị (dữ liệu mẫu chưa gắn Loại cơ quan cho từng đơn vị)
function tlhdLoaiOfName(name) {
    const n = String(name || '').trim();
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
    if (/^Viện kiểm sát nhân dân tối cao/i.test(n)) return 'LDV_25';
    if (/^Viện kiểm sát nhân dân (tỉnh|thành phố)\s/i.test(n)) return 'LDV_29';
    if (/^Viện kiểm sát nhân dân\s/i.test(n)) return 'LDV_30';
    return '';
}
function tlhdChucVuList(unitId) {
    const W = tlhdW();
    const name = W && unitId ? W.unitName(unitId) : '';
    const loai = tlhdLoaiOfName(name);
    try { return loai && window.DM_LCQ ? window.DM_LCQ.chucVuOf(loai) : []; } catch (e) { return []; }
}
// (3) Chức vụ người đứng đầu cơ quan đã chi trả tiền bồi thường = chức vụ đầu tiên của Loại cơ quan trong DM_58 + tên cơ quan
// Ô ký: chức vụ thật của người đứng đầu cơ quan (chức vụ đầu tiên DM_58 theo Loại cơ quan)
function tlhdSignerTitle() {
    const loai = tlhdLoaiOfName(tlhdAgency());
    let cv = '';
    try { if (loai && window.DM_LCQ) { const l = window.DM_LCQ.chucVuOf(loai); cv = l && l[0] ? l[0].name : ''; } } catch (e) { cv = ''; }
    return (cv || 'Thủ trưởng cơ quan').toUpperCase();
}
function tlhdHeadTitle() {
    const name = tlhdAgency();
    const loai = tlhdLoaiOfName(name);
    let cv = '';
    try { if (loai && window.DM_LCQ) { const l = window.DM_LCQ.chucVuOf(loai); cv = l && l[0] ? l[0].name : ''; } } catch (e) { cv = ''; }
    if (!cv) return 'THỦ TRƯỞNG ' + name.toUpperCase();
    const last = cv.split(/\s+/).pop();
    const out = name.toLowerCase().indexOf(last.toLowerCase() + ' ') === 0 ? cv.slice(0, cv.length - last.length) + name : cv + ' ' + name;
    return out.toUpperCase();
}
function tlhdDiaDanh() {
    const n = tlhdAgency();
    const m = n.match(/(Hà Nội|Hồ Chí Minh|Hải Phòng|Đà Nẵng|Lâm Đồng|Bình Định|Khánh Hòa|Cầu Giấy)/i);
    return m ? (m[1] === 'Cầu Giấy' ? 'Hà Nội' : m[1]) : '……';
}
function tlhdDateWords(dmy) {
    const p = String(dmy || '').split('/');
    return p.length === 3 ? `ngày ${p[0]} tháng ${p[1]} năm ${p[2]}` : 'ngày … tháng … năm …';
}

// ---------------- Luồng ký duyệt theo Cấu hình luồng xử lý ----------------
function tlhdRootUnitId() {
    const W = tlhdW(); if (!W) return '';
    const norm = s => tlhdFold(s).replace(/\b(thanh pho|tinh|tp\.?)\s+/g, '').replace(/uy ban nhan dan/g, 'ubnd').replace(/\s+/g, ' ').trim();
    const target = norm(tlhdAgency());
    const r = W.getRootUnits().find(u => norm(u.name) === target);
    return r ? r.id : '';
}
function tlhdLevels() {
    const W = tlhdW();
    const root = tlhdRootUnitId();
    try {
        if (W && root) {
            const cfg = W.getFlowConfig() || {};
            const nodes = cfg[root] || {};
            let officer = '';
            Object.keys(nodes).forEach(k => { const n = nodes[k]; if (!officer && n && n.officers && n.officers.length) officer = n.officers[0]; });
            if (!officer) { const u = W.usersInUnitTree(root).find(x => !W.isLeaderOf(x.id, x.unitId)); officer = u ? u.id : ''; }
            const path = officer ? (W.computeApprovalPath({ chuTri: officer, createdBy: officer, routes: [] }) || []) : [];
            if (path.length) return path.map(u => ({ unitId: u, unit: W.unitName(u), kyNhay: !!(W.isKyNhayUnit && W.isKyNhayUnit(u)), leaders: (W.getLeaders(u) || []).map(id => ({ id, label: W.userLabel(id) })) }));
        }
    } catch (e) { /* dùng luồng mặc định */ }
    // Luồng mặc định (giả lập): cấp 1 cấu hình Ký nháy
    return [
        { unitId: '', unit: 'Phòng chuyên môn', kyNhay: true, leaders: [{ id: 'ld_phong_1', label: 'Phạm Văn Hùng - Trưởng phòng' }, { id: 'ld_phong_2', label: 'Nguyễn Thị Mai - Phó Trưởng phòng' }] },
        { unitId: '', unit: tlhdAgency(), leaders: [{ id: 'ld_thutruong_1', label: 'Trần Văn Lãnh Đạo - Thủ trưởng cơ quan' }, { id: 'ld_thutruong_2', label: 'Lê Minh Châu - Phó Thủ trưởng cơ quan' }] }
    ];
}

// ---------------- Mở / đóng popup ----------------
function tlhdOpenModal() {
    if (typeof currentPerspective !== 'undefined' && currentPerspective === 'leader') {
        tlhdToast('Góc nhìn Lãnh đạo chỉ được xem và Ký duyệt/Từ chối hồ sơ trình.', 'warning');
        return;
    }
    tlhdEnsureModal();
    tlhdFrameFull(true);
    // Trình ký lại: điền sẵn dữ liệu lần trình gần nhất (hồ sơ mẫu Bị trả lại chưa có lần trình: dựng lần trình mẫu)
    const rejected = activeDossier.status === 'Bị trả lại thành lập HĐ' || activeDossier.status === 'Từ chối duyệt QĐ thành lập';
    const prev = activeDossier.tlhd || (rejected ? tlhdSeedRejected() : null);
    tlhdState = {
        method: prev && rejected ? prev.method : 'online',
        docSrc: prev && rejected ? prev.docSrc : 'gen',
        members: prev && rejected && prev.members ? JSON.parse(JSON.stringify(prev.members)) : [{ name: '', unitId: '', chucVu: '', chucDanh: '' }],
        onlineFile: null, offlineFile: null, step: 1
    };
    tlhdEl('tlhdHdrCode').innerText = activeDossier.code || '--';
    tlhdEl('tlhdHdrNyc').innerText = tlhdNycName() || '--';
    tlhdEl('tlhdHdrAgency').innerText = tlhdAgency();

    const rb = tlhdEl('tlhdReturnedBlock');
    if (rejected) {
        rb.style.display = 'block';
        tlhdEl('tlhdReturnedReason').innerText = activeDossier.councilRejectReason || '--';
        tlhdEl('tlhdReturnedBy').innerText = activeDossier.councilRejectActor || '--';
        tlhdEl('tlhdReturnedAt').innerText = activeDossier.councilRejectTime || '--';
    } else rb.style.display = 'none';

    tlhdEl('tlhdSoQD').value = prev && rejected && prev.soQD ? prev.soQD : TLHD_SO_QD_DEFAULT;
    tlhdEl('tlhdNgayQD').value = prev && rejected && prev.ngayQD ? prev.ngayQD : tlhdToday();
    tlhdEl('tlhdSignContent').value = prev && rejected && prev.content ? prev.content : TLHD_SIGN_CONTENT_DEFAULT;
    tlhdEl('tlhdModal').querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    tlhdEl('tlhdModal').querySelectorAll('.gqx-err').forEach(el => { el.style.display = 'none'; });

    tlhdSignInit(prev && rejected ? prev.assignees : null);
    tlhdRemoveFile('offline', true);
    tlhdRenderMembers();
    tlhdEl(tlhdState.method === 'offline' ? 'tlhdMethodOffline' : 'tlhdMethodOnline').checked = true;
    tlhdSetDocSrc(tlhdState.docSrc);
    // Tệp dự thảo tải lên ở lần trình trước (nguồn Tải lên từ máy)
    if (prev && rejected && prev.docSrc === 'upload' && prev.onlineFile) { tlhdState.onlineFile = prev.onlineFile; tlhdRenderDocBox(); }
    // Tài liệu ban hành kèm theo / không ban hành kèm theo; Trình lại: nạp đúng 02 khối của lần trình trước
    if (typeof tlktMount === 'function') tlktMount('tlhd', 'tlhdTlkt', { required: false, rows: prev && rejected && prev.attachments ? prev.attachments : [] });
    // Ký ngoài: Số, ký hiệu / Ngày văn bản đã ký (mặc định ngày hiện tại)
    ['tlhdOffSo', 'tlhdOffNgay'].forEach(id => { const i = tlhdEl(id); if (i) { i.classList.remove('is-invalid'); tlhdEl(id + 'Err').style.display = 'none'; } });
    if (tlhdEl('tlhdOffSo')) tlhdEl('tlhdOffSo').value = '';
    if (tlhdEl('tlhdOffNgay')) tlhdEl('tlhdOffNgay').value = tlhdToday();
    tlhdSetMethod(tlhdState.method);
    tlhdGoStep1();
    const m = tlhdEl('tlhdModal');
    m.style.display = 'flex';
}
// Dữ liệu mẫu: lần trình QĐ thành lập Hội đồng đã bị từ chối (hồ sơ mẫu chưa có thông tin lần trình)
function tlhdSeedRejected() {
    const levels = tlhdLevels();
    const root = tlhdRootUnitId();
    const cv = tlhdChucVuList(root);
    const code = i => (cv[Math.min(i, cv.length - 1)] || {}).code || '';
    const mk = (name, i, chucDanh) => ({ name, unitId: root, unitName: tlhdUnitName(root), chucVu: code(i), chucVuName: tlhdCvName(code(i)), chucDanh });
    activeDossier.tlhd = {
        method: 'online', docSrc: 'gen', soQD: '45/QĐ-STP', ngayQD: '25/08/2026',
        // Thành viên Hội đồng của lần trình trước: theo danh sách thành viên đang hiển thị của hồ sơ
        members: (activeDossier.council || []).length
            ? activeDossier.council.map((c, i) => mk(c.name, i, c.role || 'Thành viên'))
            : [mk('Lê Minh Châu', 0, 'Chủ tịch Hội đồng'), mk('Nguyễn Văn Bình', 1, 'Thành viên'), mk('Phạm Thị Thu', 2, 'Thư ký Hội đồng')],
        fileName: tlhdFileBase() + '.docx', levels, assignees: levels.map(l => (l.leaders[0] || {}).id || ''), enableNhay: true,
        content: 'Kính trình Lãnh đạo xem xét, ký duyệt dự thảo Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả.', level: 0
    };
    return activeDossier.tlhd;
}
function tlhdClose() {
    tlhdCancelConvert();
    const m = tlhdEl('tlhdModal');
    if (m) m.style.display = 'none';
    tlhdFrameFull(false);
}

// ---------------- Hình thức ký / Nguồn tệp ----------------
function tlhdSetMethod(method) {
    tlhdState.method = method === 'offline' ? 'offline' : 'online';
    const on = tlhdState.method === 'online';
    [['tlhdCardOnline', on], ['tlhdCardOffline', !on]].forEach(([id, act]) => {
        const c = tlhdEl(id); if (!c) return;
        c.classList.toggle('active', act);
        const ic = c.querySelector('.sign-card-check i'); if (ic) ic.className = act ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    // Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn (ẩn hẳn)
    tlhdEl('tlhdStepperBar').style.display = 'flex';
    tlhdRenderStepper(on);
    tlhdEl('tlhdDocSrcGroup').style.display = on ? 'block' : 'none';
    tlhdEl('tlhdOnlineSection').style.display = on ? 'block' : 'none';
    tlhdEl('tlhdOfflineSection').style.display = on ? 'none' : 'block';
    tlhdEl('tlhdDocSectionTitle').innerHTML = on
        ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>'
        : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
    if (typeof tlktShow === 'function') tlktShow('tlhd', on);
    tlhdApplyDocMeta();
    tlhdGoStep1();
}
function tlhdSetDocSrc(src) {
    tlhdState.docSrc = src === 'upload' ? 'upload' : 'gen';
    const gen = tlhdState.docSrc === 'gen';
    tlhdEl('tlhdSegGen').classList.toggle('active', gen);
    tlhdEl('tlhdSegUpload').classList.toggle('active', !gen);
    tlhdCancelConvert();
    tlhdState.onlineFile = null;
    const inp = tlhdEl('tlhdOnlineFileInput'); if (inp) inp.value = '';
    tlhdApplyDocMeta();
    tlhdRenderDocBox();
}
// Số quyết định / Ngày quyết định / Bảng danh sách thành viên: chỉ khi Ký số và Sinh văn bản theo mẫu 33/BTNN
function tlhdApplyDocMeta() {
    const show = tlhdState.method === 'online' && tlhdState.docSrc === 'gen';
    tlhdEl('tlhdDocMetaGroup').style.display = show ? '' : 'none';
}
function tlhdRenderDocBox() {
    const box = tlhdEl('tlhdDocFileBox'); if (!box) return;
    const err = tlhdEl('tlhdDocFileErr'); if (err) err.style.display = 'none';
    if (tlhdState.docSrc === 'gen') {
        // Dòng mô tả + nút Xem trước văn bản trên cùng 1 dòng
        box.innerHTML = `<div class="tlhd-gen-row"><div class="gqx-file-hint"><i class="fa-solid fa-file-circle-check" style="color:#2563eb; font-size:16px; margin-right:6px;"></i>Hệ thống tự động sinh Quyết định theo Mẫu 33/BTNN từ thông tin đang nhập.</div><button type="button" class="btn-preview-doc" onclick="tlhdPreviewDoc()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div>`;
        return;
    }
    // Tải lên từ máy: vùng kéo thả (chưa có tệp) / đang chuyển đổi sang PDF / File Card (đã có tệp)
    if (tlhdState.converting) {
        box.innerHTML = '<div class="tlhd-converting"><span class="tlhd-spinner"></span> Đang chuyển đổi sang PDF...</div>';
        return;
    }
    const f = tlhdState.onlineFile;
    box.innerHTML = !f
        ? `<div id="tlhdOnlineDrop" class="tlhd-drop" tabindex="0" role="button" onclick="tlhdEl('tlhdOnlineFileInput').click()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" ondragover="tlhdDragOver(event)" ondragleave="tlhdDragLeave(event)" ondrop="tlhdDropOnline(event)">
            <i class="fa-solid fa-cloud-arrow-up tlhd-drop-ico"></i>
            <div class="tlhd-drop-main">Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a></div>
            <div class="tlhd-drop-sub">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)</div>
        </div>`
        : tlhdFileCardHtml(f, `tlhdViewFile('online')`, `tlhdRemoveFile('online')`);
}
// File Card: icon định dạng + tên + dung lượng | Xem file, Xóa
function tlhdFileCardHtml(f, viewJs, removeJs) {
    const isPdf = /\.pdf$/i.test(f.name || '');
    return `<div class="tlhd-card">
        <i class="fa-solid ${isPdf ? 'fa-file-pdf pdf' : 'fa-file-word word'} tlhd-card-ico"></i>
        <div class="tlhd-card-info"><div class="tlhd-card-name">${tlhdE(f.name)}</div><div class="tlhd-card-meta">${tlhdE(f.size)}${f.note ? ' · ' + tlhdE(f.note) : ''}</div></div>
        <div class="tlhd-card-btns">
            <button type="button" class="btn btn-secondary btn-sm" onclick="${viewJs}"><i class="fa-solid fa-eye"></i> Xem file</button>
            <button type="button" class="btn btn-secondary btn-sm gqx-danger" onclick="${removeJs}"><i class="fa-solid fa-trash"></i> Xóa</button>
        </div>
    </div>`;
}
// Kiểm tra định dạng / dung lượng: trả về thông báo lỗi hoặc '' nếu hợp lệ
function tlhdCheckFile(file, exts) {
    if (!exts.test(file.name)) return 'Tệp không đúng định dạng cho phép.';
    if (file.size > TLHD_MAX_FILE) return 'Dung lượng tệp vượt quá 50MB cho phép.';
    return '';
}
function tlhdDragOver(e) { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; e.currentTarget.classList.add('drag-over'); }
function tlhdDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function tlhdDropOnline(e) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    const files = e.dataTransfer && e.dataTransfer.files;
    if (files && files.length) tlhdOnOnlineFile({ files: [files[0]], value: '' });
}
function tlhdDropOffline(e) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    const files = e.dataTransfer && e.dataTransfer.files;
    if (files && files.length) tlhdOnOfflineFile({ files: [files[0]], value: '' });
}
// Khóa nút Tiếp tục khi đang chuyển đổi .doc/.docx sang PDF
function tlhdSetNextBusy(busy) {
    const btn = tlhdEl('tlhdBtnNext'); if (!btn) return;
    btn.disabled = !!busy;
    btn.style.opacity = busy ? '0.55' : '';
    btn.style.cursor = busy ? 'not-allowed' : '';
    btn.title = busy ? 'Đang chuyển đổi tệp sang PDF, vui lòng chờ' : '';
}
// Hủy chuyển đổi đang chạy (đổi nguồn tệp / đóng popup)
function tlhdCancelConvert() {
    tlhdState.converting = false;
    tlhdConvertToken += 1;
    tlhdSetNextBusy(false);
}
function tlhdOnOnlineFile(input) {
    const f = input && input.files && input.files[0]; if (!f) return;
    input.value = '';
    const err = tlhdEl('tlhdDocFileErr');
    const msg = tlhdCheckFile(f, /\.(pdf|doc|docx)$/i);
    if (msg) {
        if (err) { err.textContent = msg; err.style.display = 'block'; }
        const d = tlhdEl('tlhdOnlineDrop'); if (d) d.classList.add('is-error');
        tlhdToast(msg, 'warning');
        return;
    }
    const size = tlhdFileSize(f.size);
    if (/\.docx?$/i.test(f.name)) {
        // .doc/.docx: giả lập chuyển đổi sang PDF (~1,2s), khóa nút Tiếp tục
        tlhdState.onlineFile = null;
        tlhdState.converting = true;
        tlhdSetNextBusy(true);
        tlhdRenderDocBox();
        const token = ++tlhdConvertToken;
        setTimeout(() => {
            if (tlhdConvertToken !== token || !tlhdState.converting) return;
            tlhdState.converting = false;
            tlhdSetNextBusy(false);
            tlhdState.onlineFile = { name: f.name.replace(/\.docx?$/i, '.pdf'), size, raw: f, note: 'Đã chuyển đổi từ ' + f.name };
            tlhdRenderDocBox();
        }, 1200);
        return;
    }
    tlhdState.onlineFile = { name: f.name, size, raw: f };
    tlhdRenderDocBox();
}
function tlhdOnOfflineFile(input) {
    const f = input && input.files && input.files[0]; if (!f) return;
    input.value = '';
    const err = tlhdEl('tlhdOfflineFileErr');
    const drop = tlhdEl('tlhdOfflineDrop');
    const msg = tlhdCheckFile(f, /\.pdf$/i);
    if (msg) {
        if (err) { err.textContent = msg; err.style.display = 'block'; }
        if (drop) drop.classList.add('is-error');
        tlhdToast(msg, 'warning');
        return;
    }
    tlhdState.offlineFile = { name: f.name, size: tlhdFileSize(f.size), raw: f };
    const row = tlhdEl('tlhdOfflineFileRow');
    row.innerHTML = tlhdFileCardHtml(tlhdState.offlineFile, `tlhdViewFile('offline')`, `tlhdRemoveFile('offline')`);
    row.style.display = 'block';
    if (drop) { drop.style.display = 'none'; drop.classList.remove('is-error'); }
    if (err) { err.textContent = TLHD_REQ_MSG; err.style.display = 'none'; }
}
function tlhdRemoveFile(kind, silent) {
    if (kind === 'online') {
        tlhdCancelConvert();
        tlhdState.onlineFile = null;
        const i = tlhdEl('tlhdOnlineFileInput'); if (i) i.value = '';
        tlhdRenderDocBox();
        const e = tlhdEl('tlhdDocFileErr'); if (e) e.textContent = TLHD_REQ_MSG;
        return;
    }
    tlhdState.offlineFile = null;
    const i = tlhdEl('tlhdOfflineFileInput'); if (i) i.value = '';
    const row = tlhdEl('tlhdOfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    const drop = tlhdEl('tlhdOfflineDrop'); if (drop) { drop.style.display = 'flex'; drop.classList.remove('is-error'); }
    if (!silent) { const e = tlhdEl('tlhdOfflineFileErr'); if (e) { e.textContent = TLHD_OFF_FILE_MSG; e.style.display = 'none'; } }
}
// Stepper 2 bước (Nhập thông tin → Kéo ô ký & chọn Lãnh đạo) chỉ hiển thị khi Ký số; Ký ngoài thu gọn ẩn hẳn
function tlhdRenderStepper(on) {
    const bar = tlhdEl('tlhdStepperBar');
    if (bar) { bar.classList.toggle('is-collapsed', !on); bar.setAttribute('aria-hidden', on ? 'false' : 'true'); }
}
function tlhdViewFile(kind) {
    const f = kind === 'online' ? tlhdState.onlineFile : tlhdState.offlineFile;
    btnnOpenUploadedFile(f);
}

// ---------------- Ngày quyết định (DatePicker) ----------------
function tlhdOpenDatePicker() {
    const p = tlhdEl('tlhdNgayQDPicker'); if (!p) return;
    const v = tlhdEl('tlhdNgayQD').value.split('/');
    if (v.length === 3) p.value = `${v[2]}-${v[1]}-${v[0]}`;
    try { if (p.showPicker) p.showPicker(); else p.click(); } catch (e) { p.click(); }
}
function tlhdOnDatePicked(val) {
    if (!val) return;
    const p = val.split('-');
    tlhdEl('tlhdNgayQD').value = `${p[2]}/${p[1]}/${p[0]}`;
    tlhdClearErr('tlhdNgayQD');
}
function tlhdClearErr(id) {
    const el = tlhdEl(id); if (el) el.classList.remove('is-invalid');
    const e = tlhdEl(id + 'Err'); if (e) e.style.display = 'none';
}

// ---------------- Bảng danh sách thành viên trong hội đồng ----------------
function tlhdAddMember() {
    tlhdState.members.push({ name: '', unitId: '', chucVu: '', chucDanh: '' });
    tlhdRenderMembers();
    const inp = tlhdEl('tlhdMemName' + (tlhdState.members.length - 1)); if (inp) inp.focus();
}
function tlhdRemoveMember(i) {
    if (tlhdState.members.length <= 1) { tlhdToast('Hội đồng phải có tối thiểu 01 thành viên.', 'warning'); return; }
    const doRemove = () => { tlhdState.members.splice(i, 1); tlhdRenderMembers(); };
    const m = tlhdState.members[i];
    if (m && (m.name || m.unitId || m.chucVu || m.chucDanh) && typeof showCustomConfirm === 'function') showCustomConfirm('Bạn có chắc chắn muốn xóa thành viên này khỏi danh sách thành viên trong hội đồng không?', doRemove);
    else doRemove();
}
function tlhdChucVuOptions(m) {
    if (!m.unitId) return '<option value="">-- Chọn Đơn vị công tác trước --</option>';
    const list = tlhdChucVuList(m.unitId);
    if (!list.length) return '<option value="">-- Loại cơ quan của đơn vị chưa có Chức vụ --</option>';
    return '<option value="">-- Chọn chức vụ --</option>' + list.map(c => `<option value="${tlhdE(c.code)}" ${c.code === m.chucVu ? 'selected' : ''}>${tlhdE(c.name)}</option>`).join('');
}
function tlhdRenderMembers() {
    const body = tlhdEl('tlhdMemberBody'); if (!body) return;
    const ms = tlhdState.members;
    body.innerHTML = ms.map((m, i) => `<tr>
        <td class="tlhd-stt">${i + 1}</td>
        <td><input type="text" id="tlhdMemName${i}" class="form-control" maxlength="255" placeholder="Nhập họ và tên..." value="${tlhdE(m.name)}" oninput="tlhdState.members[${i}].name=this.value; tlhdClearErr('tlhdMemName${i}')"><div id="tlhdMemName${i}Err" class="gqx-err">${TLHD_REQ_MSG}</div></td>
        <td><div id="tlhdMemUnit${i}"></div><div id="tlhdMemUnit${i}Err" class="gqx-err">${TLHD_REQ_MSG}</div></td>
        <td><select id="tlhdMemCv${i}" class="form-control" ${m.unitId ? '' : 'disabled'} onchange="tlhdState.members[${i}].chucVu=this.value; tlhdClearErr('tlhdMemCv${i}')">${tlhdChucVuOptions(m)}</select><div id="tlhdMemCv${i}Err" class="gqx-err">${TLHD_REQ_MSG}</div></td>
        <td><input type="text" id="tlhdMemCd${i}" class="form-control" maxlength="255" placeholder="Nhập chức danh trong hội đồng..." value="${tlhdE(m.chucDanh)}" oninput="tlhdState.members[${i}].chucDanh=this.value; tlhdClearErr('tlhdMemCd${i}')"><div id="tlhdMemCd${i}Err" class="gqx-err">${TLHD_REQ_MSG}</div></td>
        <td style="text-align:center;"><button type="button" class="tlhd-del" title="Xóa dòng" ${ms.length <= 1 ? 'disabled' : ''} onclick="tlhdRemoveMember(${i})"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`).join('');
    const W = tlhdW();
    ms.forEach((m, i) => {
        const host = tlhdEl('tlhdMemUnit' + i);
        if (!host) return;
        if (W && typeof W.mountUnitTree === 'function') {
            W.mountUnitTree(host, {
                value: m.unitId, placeholder: '-- Chọn đơn vị --',
                onChange: id => {
                    tlhdState.members[i].unitId = id; tlhdState.members[i].chucVu = '';
                    const e = tlhdEl('tlhdMemUnit' + i + 'Err'); if (e) e.style.display = 'none';
                    const sel = tlhdEl('tlhdMemCv' + i);
                    if (sel) { sel.innerHTML = tlhdChucVuOptions(tlhdState.members[i]); sel.disabled = !id; sel.classList.remove('is-invalid'); }
                }
            });
        } else {
            host.innerHTML = `<input type="text" class="form-control" placeholder="-- Chọn đơn vị --" value="${tlhdE(m.unitId)}" oninput="tlhdState.members[${i}].unitId=this.value">`;
        }
    });
}
function tlhdUnitName(id) { const W = tlhdW(); return W && id ? W.unitName(id) : (id || ''); }
function tlhdCvName(code) { try { return window.DM_LCQ ? window.DM_LCQ.chucVuName(code) || code : code; } catch (e) { return code; } }

// ---------------- Kiểm tra Bước 1 ----------------
function tlhdValidateStep1() {
    let first = null;
    const mark = (id, focusEl) => {
        const el = tlhdEl(id); if (el) el.classList.add('is-invalid');
        const e = tlhdEl(id + 'Err'); if (e) e.style.display = 'block';
        if (!first) first = focusEl || el;
    };
    if (tlhdState.docSrc === 'gen') {
        if (!tlhdEl('tlhdSoQD').value.trim()) mark('tlhdSoQD');
        if (!tlhdEl('tlhdNgayQD').value.trim()) mark('tlhdNgayQD');
        tlhdState.members.forEach((m, i) => {
            if (!String(m.name || '').trim()) mark('tlhdMemName' + i);
            if (!m.unitId) {
                const host = tlhdEl('tlhdMemUnit' + i);
                if (host) host.classList.add('is-invalid');
                const e = tlhdEl('tlhdMemUnit' + i + 'Err'); if (e) e.style.display = 'block';
                if (!first && host) first = host.querySelector('.wf-utree-display') || host;
            }
            if (!m.chucVu) mark('tlhdMemCv' + i);
            if (!String(m.chucDanh || '').trim()) mark('tlhdMemCd' + i);
        });
    } else if (!tlhdState.onlineFile) {
        const e = tlhdEl('tlhdDocFileErr'); if (e) e.style.display = 'block';
        const d = tlhdEl('tlhdOnlineDrop'); if (d) d.classList.add('is-error');
        if (!first) first = d;
    }
    const tlktOk = typeof tlktValidate !== 'function' || tlktValidate('tlhd');
    if (first) { if (first.focus) first.focus(); if (first.scrollIntoView) first.scrollIntoView({ block: 'center' }); return false; }
    return tlktOk;
}

// ---------------- Văn bản Mẫu 33/BTNN ----------------
function tlhdCollectDoc() {
    return {
        soQD: tlhdEl('tlhdSoQD').value.trim(),
        ngayQD: tlhdEl('tlhdNgayQD').value.trim(),
        members: tlhdState.members.map(m => ({ name: String(m.name || '').trim(), unitId: m.unitId, unitName: tlhdUnitName(m.unitId), chucVu: m.chucVu, chucVuName: tlhdCvName(m.chucVu), chucDanh: String(m.chucDanh || '').trim() }))
    };
}
// empty: giá trị hiển thị khi trống (văn bản Mẫu 33 dùng "……"; màn chi tiết dùng "---")
function tlhdMembersTableHtml(members, empty) {
    const e = empty || '……';
    const rows = (members || []).map((m, i) => `<tr><td style="text-align:center;">${i + 1}</td><td>${tlhdE(m.name) || e}</td><td>${tlhdE(m.unitName) || e}</td><td>${tlhdE(m.chucVuName) || e}</td><td>${tlhdE(m.chucDanh) || e}</td></tr>`).join('');
    return `<table class="tlhd-doc-table"><thead><tr><th style="width:40px;">STT</th><th>Họ và tên</th><th>Đơn vị công tác</th><th>Chức vụ</th><th>Chức danh trong hội đồng</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function tlhdDocHtml(d) {
    const so = d.soQD && !/^\s*\/QĐ-\s*$/.test(d.soQD) ? d.soQD : '……/QĐ-……';
    const p = 'text-indent:24px; margin:0 0 8px; text-align:justify;';
    return `<div style="text-align:right; font-weight:bold; font-size:13px;">Mẫu số 33/BTNN</div>
        <div style="text-align:center; font-style:italic; font-size:12px; margin-bottom:16px;">(Ban hành kèm theo Nghị định số ……/……/NĐ-CP ngày …/…/… của Chính phủ)</div>
        <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
            <div style="text-align:center; width:42%;">
                <div style="font-weight:bold; font-size:13px; text-transform:uppercase;">${tlhdE(tlhdAgency())}</div>
                <div style="border-bottom:1px solid #000; width:100px; margin:4px auto 6px;"></div>
                <div style="font-size:13px;">Số: ${tlhdE(so)}</div>
            </div>
            <div style="text-align:center; width:56%;">
                <div style="font-weight:bold; font-size:13px;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                <div style="font-weight:bold; font-size:13px;">Độc lập - Tự do - Hạnh phúc</div>
                <div style="border-bottom:1px solid #000; width:140px; margin:4px auto 6px;"></div>
                <div style="font-style:italic; font-size:13px;">${tlhdE(tlhdDiaDanh())}, ${tlhdDateWords(d.ngayQD)}</div>
            </div>
        </div>
        <div style="text-align:center; margin-bottom:14px;">
            <div style="font-weight:bold; font-size:15px;">QUYẾT ĐỊNH</div>
            <div style="font-weight:bold; font-size:14px;">Thành lập Hội đồng xem xét trách nhiệm hoàn trả</div>
            <div style="border-bottom:1px solid #000; width:120px; margin:4px auto 10px;"></div>
            <div style="font-weight:bold; font-size:14px;">${tlhdE(tlhdHeadTitle())}</div>
        </div>
        <p style="${p} font-style:italic;">Căn cứ khoản 1, 2 Điều 66 Luật Trách nhiệm bồi thường của Nhà nước năm 2017 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16);</p>
        <p style="${p} font-style:italic;">Căn cứ Nghị định số ……/……/NĐ-CP ngày …/…/… của Chính phủ quy định chi tiết một số điều và biện pháp thi hành Luật Trách nhiệm bồi thường của Nhà nước;</p>
        <p style="${p} font-style:italic;">Căn cứ vào việc đã chi trả xong tiền bồi thường đối với ${tlhdE(tlhdNycDisplay())},</p>
        <div style="text-align:center; font-weight:bold; margin:10px 0;">QUYẾT ĐỊNH:</div>
        <p style="${p}"><strong>Điều 1.</strong> Thành lập Hội đồng xem xét trách nhiệm hoàn trả gồm các Ông/Bà có tên sau đây:</p>
        ${tlhdMembersTableHtml(d.members)}
        <p style="${p}"><strong>Điều 2.</strong> Hội đồng có các nhiệm vụ, quyền hạn theo quy định của pháp luật.</p>
        <p style="${p}"><strong>Điều 3.</strong> Hội đồng giải thể theo quy định của pháp luật.</p>
        <p style="${p}"><strong>Điều 4.</strong> Quyết định này có hiệu lực kể từ ngày ký. Các Ông/Bà có tên tại Điều 1 chịu trách nhiệm thi hành Quyết định này./.</p>
        <div style="display:flex; justify-content:space-between; margin-top:24px; min-height:170px;">
            <div style="width:42%;">
                <div style="font-weight:bold; font-style:italic; font-size:12.5px;">Nơi nhận:</div>
                <div style="font-size:11.5px; line-height:1.5;">- Như Điều 1;<br>- Lưu: VT, HSVV.</div>
            </div>
            <div style="width:52%; text-align:center;">
                <div style="font-weight:bold; font-size:13.5px;">${tlhdE(tlhdSignerTitle())}</div>
                <div style="font-style:italic; font-size:12px;">(Ký, ghi rõ họ tên và đóng dấu)</div>
                <div style="height:92px;"></div>
                <div id="tlhdA4SignerName" style="font-weight:bold; font-size:14px; text-transform:uppercase;"></div>
            </div>
        </div>`;
}
function tlhdUploadDocHtml() {
    const f = tlhdState.onlineFile;
    return `<div style="text-align:center; margin-top:120px; color:#475569; font-family:Inter,system-ui,sans-serif;">
        <i class="fa-solid ${f && /\.pdf$/i.test(f.name) ? 'fa-file-pdf' : 'fa-file-word'}" style="font-size:56px; color:#2563eb;"></i>
        <div style="font-weight:700; font-size:15px; margin-top:12px; color:#1e293b;">${tlhdE(f ? f.name : '')}</div>
        <div style="font-size:12.5px; margin-top:6px;">Tệp văn bản trình ký tải lên từ máy. Kéo thả ô ký vào vị trí ký trên văn bản.</div>
    </div>
    <div style="position:absolute; left:65px; right:65px; bottom:60px; display:flex; justify-content:flex-end;"><div style="width:52%; text-align:center;"><div id="tlhdA4SignerName" style="font-weight:bold; font-size:14px; text-transform:uppercase;"></div></div></div>`;
}
function tlhdPreviewDoc() {
    const d = tlhdCollectDoc();
    const html = '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Mẫu 33/BTNN - Xem trước</title><style>body{background:#e2e8f0;margin:0;padding:24px;}' +
        '.page{width:794px;min-height:1123px;margin:0 auto;background:#fff;padding:50px 65px;box-sizing:border-box;font-family:"Times New Roman",serif;font-size:14px;line-height:1.6;color:#111827;}' +
        '.tlhd-doc-table{width:100%;border-collapse:collapse;margin:6px 0 10px;font-size:13px;}.tlhd-doc-table th,.tlhd-doc-table td{border:1px solid #000;padding:4px 6px;vertical-align:top;}.tlhd-doc-table th{text-align:center;}' +
        '</style></head><body><div class="page">' + tlhdDocHtml(d).replace('<div id="tlhdA4SignerName"', '<div') + '</div></body></html>';
    try {
        const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
        window.open(url, '_blank');
    } catch (e) { tlhdToast('Không mở được bản xem trước văn bản.', 'warning'); }
}

// ---------------- Chuyển bước ----------------
function tlhdGoStep1() {
    tlhdState.step = 1;
    const c = tlhdEl('tlhdContainer'); if (c) { c.style.width = '960px'; c.style.maxWidth = '96%'; c.style.height = 'auto'; }
    tlhdEl('tlhdStep1Tab').className = 'ktl-step-tab active';
    tlhdEl('tlhdStep1Badge').innerHTML = '1';
    tlhdEl('tlhdStep2Tab').className = 'ktl-step-tab';
    tlhdEl('tlhdStep1Body').style.display = 'block';
    tlhdEl('tlhdStep2Body').style.display = 'none';
    const off = tlhdState.method === 'offline';
    tlhdEl('tlhdBtnNext').style.display = off ? 'none' : 'inline-flex';
    tlhdEl('tlhdBtnIssue').style.display = off ? 'inline-flex' : 'none';
    tlhdEl('tlhdBtnBack').style.display = 'none';
    tlhdEl('tlhdBtnSubmit').style.display = 'none';
}
function tlhdGoStep2() {
    if (tlhdState.method !== 'online') return;
    if (tlhdState.step === 2) return;
    if (tlhdState.converting) { tlhdToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    if (!tlhdValidateStep1()) return;
    const page = tlhdEl('tlhdA4Page');
    page.querySelectorAll('.gq-sign-box').forEach(b => b.remove());
    page.innerHTML = tlhdState.docSrc === 'gen' ? tlhdDocHtml(tlhdCollectDoc()) : tlhdUploadDocHtml();
    tlhdState.step = 2;
    const c = tlhdEl('tlhdContainer'); if (c) { c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh'; }
    tlhdEl('tlhdStep1Tab').className = 'ktl-step-tab completed';
    tlhdEl('tlhdStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    tlhdEl('tlhdStep2Tab').className = 'ktl-step-tab active';
    tlhdEl('tlhdStep1Body').style.display = 'none';
    tlhdEl('tlhdStep2Body').style.display = 'flex';
    tlhdEl('tlhdBtnNext').style.display = 'none';
    tlhdEl('tlhdBtnIssue').style.display = 'none';
    tlhdEl('tlhdBtnBack').style.display = 'inline-flex';
    tlhdEl('tlhdBtnSubmit').style.display = 'inline-flex';
    tlhdSignRefresh();
}

// ---------------- Bước 2: Kéo ô ký & chọn Lãnh đạo (như gqSign* của Popup Không thụ lý) ----------------
function tlhdSignIsLast(i) { return i === tlhdSignState.levels.length - 1; }
function tlhdSignDefault(i) {
    const last = tlhdSignIsLast(i);
    const sz = TLHD_SIGN_SIZES[last ? 'so' : 'nhay'][1];
    return last ? { x: 480, y: 900, w: sz[0], h: sz[1] } : { x: 60, y: Math.max(600, 900 - i * 100), w: sz[0], h: sz[1] };
}
function tlhdSignCardHtml(lv, i, n, prevId) {
    const last = i === n - 1;
    const color = last ? '#b91c1c' : '#1d4ed8';
    const sz = TLHD_SIGN_SIZES[last ? 'so' : 'nhay'];
    const ids = lv.leaders.map(l => l.id);
    const sel = prevId && ids.includes(prevId) ? prevId : (ids[0] || '');
    const opts = lv.leaders.map(l => `<option value="${tlhdE(l.id)}" ${l.id === sel ? 'selected' : ''}>${tlhdE(l.label)}</option>`).join('');
    const mini = 'font-size:10px; padding:1px 6px;';
    return `<div id="tlhdSignCard${i}" style="background:#fff; border:1px solid ${last ? '#fecaca' : '#bfdbfe'}; border-left:4px solid ${color}; border-radius:8px; padding:12px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
            <span style="font-size:12.5px; font-weight:700; color:${color};">Cấp ${i + 1} - ${tlhdE(lv.unit)}</span>
            ${lv.kyNhay ? '<span class="badge" style="background:#dbeafe; color:#1e40af; font-size:10.5px; white-space:nowrap;">Ký nháy</span>' : ''}
        </div>
        <div style="margin-bottom:8px;">
            <select id="tlhdSignLeader${i}" class="form-control" style="font-size:13px; height:36px; width:100%;" onchange="tlhdClearErr('tlhdSignLeader${i}'); tlhdSignSyncNames()" ${lv.leaders.length ? '' : 'disabled'}><option value="">${lv.leaders.length ? '-- Chọn Lãnh đạo --' : 'Cấp này chưa cấu hình nhóm lãnh đạo'}</option>${opts}</select>
            <div id="tlhdSignLeader${i}Err" class="gqx-err">${TLHD_REQ_MSG}</div>
        </div>
        ${i === 0 && !last ? `<label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:12.5px; color:#1e40af; margin:0 0 6px 0;"><input type="checkbox" id="tlhdSignNhay" checked onchange="tlhdSignToggleNhay(this.checked)"><span>Áp dụng ký nháy Lãnh đạo cấp 1</span></label>` : ''}
        <button type="button" class="btn btn-secondary btn-sm" id="tlhdSignPlace${i}" onclick="tlhdSignPlace(${i})" style="font-size:12px;"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button>
        <div id="tlhdSignCtrls${i}" style="display:none;">
            <div style="font-size:11px; color:#94a3b8; margin-bottom:6px;" id="tlhdSignCoord${i}"></div>
            <div style="display:flex; gap:4px; align-items:center; flex-wrap:wrap;">
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="tlhdSignResize(${i}, ${sz[0][0]}, ${sz[0][1]})">Nhỏ</button>
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="tlhdSignResize(${i}, ${sz[1][0]}, ${sz[1][1]})">Vừa</button>
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="tlhdSignResize(${i}, ${sz[2][0]}, ${sz[2][1]})">Lớn</button>
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="tlhdSignReset(${i})"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button>
            </div>
        </div>
    </div>`;
}
function tlhdSignInit(prevAssignees) {
    const levels = tlhdLevels();
    tlhdSignState.levels = levels;
    tlhdSignState.placed = {};
    tlhdSignState.coords = {};
    tlhdSignState.enableNhay = true;
    levels.forEach((lv, i) => { tlhdSignState.coords[i] = tlhdSignDefault(i); });
    const prev = Array.isArray(prevAssignees) ? prevAssignees : [];
    const host = tlhdEl('tlhdSignLevels');
    if (host) host.innerHTML = levels.map((lv, i) => tlhdSignCardHtml(lv, i, levels.length, prev[i])).join('');
    const page = tlhdEl('tlhdA4Page');
    if (page) page.querySelectorAll('.gq-sign-box').forEach(b => b.remove());
}
function tlhdSignEnsureBox(i) {
    const page = tlhdEl('tlhdA4Page');
    if (!page) return null;
    let box = tlhdEl('tlhdSignBox' + i);
    if (box) return box;
    const last = tlhdSignIsLast(i);
    box = document.createElement('div');
    box.id = 'tlhdSignBox' + i;
    box.className = 'sig-drag-box gq-sign-box';
    box.style.cssText = last
        ? 'border:2px dashed #dc2626; background:rgba(254,242,242,0.94); box-shadow:0 4px 12px rgba(220,38,38,0.18); z-index:10;'
        : 'border:2px dashed #2563eb; background:rgba(239,246,255,0.94); box-shadow:0 4px 12px rgba(37,99,235,0.18); z-index:10;';
    box.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:10.5px; font-weight:700; color:${last ? '#991b1b' : '#1e40af'};"><i class="fa-solid ${last ? 'fa-stamp' : 'fa-pen-nib'}"></i> ${last ? 'KÝ SỐ &amp; CON DẤU' : 'KÝ NHÁY'}</span><span class="badge" style="background:${last ? '#dc2626' : '#2563eb'}; color:#fff; font-size:9.5px; padding:1px 5px;">Cấp ${i + 1}</span></div>
        <div style="text-align:center; font-weight:700; color:#1e293b; font-size:12px;" id="tlhdSignBoxName${i}"></div>
        <div style="display:flex; justify-content:space-between; font-size:10px; color:#64748b;"><span>${last ? 'Chữ ký số &amp; Con dấu' : 'Chữ ký nháy'}</span><span id="tlhdSignBoxXY${i}"></span></div>
        <div class="sig-resize-handle" title="Kéo chuột để co giãn khung chữ ký"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>`;
    page.appendChild(box);
    box.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        e.preventDefault(); e.stopPropagation();
        const c = tlhdSignState.coords[i];
        const resize = !!(e.target.closest && e.target.closest('.sig-resize-handle'));
        const sx = e.clientX, sy = e.clientY, ox = c.x, oy = c.y, ow = c.w, oh = c.h;
        box.classList.add('dragging');
        const move = ev => {
            if (resize) { c.w = Math.max(140, Math.round(ow + ev.clientX - sx)); c.h = Math.max(55, Math.round(oh + ev.clientY - sy)); }
            else {
                c.x = Math.max(0, Math.min(Math.round(ox + ev.clientX - sx), page.clientWidth - c.w));
                c.y = Math.max(0, Math.min(Math.round(oy + ev.clientY - sy), page.clientHeight - c.h));
            }
            tlhdSignApply(i);
        };
        const up = () => { box.classList.remove('dragging'); document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    });
    return box;
}
function tlhdSignApply(i) {
    const c = tlhdSignState.coords && tlhdSignState.coords[i];
    if (!c) return;
    const box = tlhdEl('tlhdSignBox' + i);
    if (box) { box.style.left = c.x + 'px'; box.style.top = c.y + 'px'; box.style.width = c.w + 'px'; box.style.height = c.h + 'px'; }
    const xy = tlhdEl('tlhdSignBoxXY' + i); if (xy) xy.textContent = `X: ${c.x}, Y: ${c.y}`;
    const pn = tlhdEl('tlhdSignCoord' + i); if (pn) pn.textContent = `Trang 1 • Tọa độ: (${c.x}, ${c.y}) • Cỡ: ${c.w} x ${c.h} px`;
}
function tlhdSignRefresh() {
    const st = tlhdSignState;
    if (!st.levels) return;
    st.levels.forEach((lv, i) => {
        const nhayOff = i === 0 && st.levels.length > 1 && !st.enableNhay;
        const on = !!st.placed[i] && !nhayOff;
        let box = tlhdEl('tlhdSignBox' + i);
        if (on && !box) box = tlhdSignEnsureBox(i);
        if (box) box.style.display = on ? 'flex' : 'none';
        const ctr = tlhdEl('tlhdSignCtrls' + i); if (ctr) ctr.style.display = on ? 'block' : 'none';
        const btn = tlhdEl('tlhdSignPlace' + i); if (btn) btn.style.display = (on || nhayOff) ? 'none' : '';
        if (on) tlhdSignApply(i);
    });
    tlhdSignSyncNames();
}
function tlhdSignPlace(i) {
    tlhdSignState.placed[i] = true;
    tlhdSignRefresh();
    const box = tlhdEl('tlhdSignBox' + i);
    if (box && box.scrollIntoView) box.scrollIntoView({ block: 'center' });
}
function tlhdSignResize(i, w, h) { const c = tlhdSignState.coords[i]; if (!c) return; c.w = w; c.h = h; tlhdSignApply(i); }
function tlhdSignReset(i) { tlhdSignState.coords[i] = tlhdSignDefault(i); tlhdSignApply(i); }
function tlhdSignToggleNhay(on) { tlhdSignState.enableNhay = !!on; tlhdSignRefresh(); }
function tlhdSignLeaderText(i) {
    const s = tlhdEl('tlhdSignLeader' + i);
    return s && s.value && s.selectedIndex >= 0 ? s.options[s.selectedIndex].text : '';
}
// Tên Lãnh đạo hiển thị trên ô ký; Lãnh đạo cấp cuối hiển thị tại dòng ký của văn bản
function tlhdSignSyncNames() {
    const st = tlhdSignState;
    if (!st.levels) return;
    st.levels.forEach((lv, i) => {
        const el = tlhdEl('tlhdSignBoxName' + i);
        if (el) el.textContent = tlhdSignLeaderText(i).split(' - ')[0].trim() || ('Cấp ' + (i + 1));
    });
    const nm = tlhdEl('tlhdA4SignerName');
    if (nm) nm.textContent = (tlhdSignLeaderText(st.levels.length - 1).split(' - ')[0] || '').trim().toUpperCase();
}
function tlhdSignCollect() {
    const st = tlhdSignState;
    let first = null;
    const assignees = st.levels.map((lv, i) => {
        const s = tlhdEl('tlhdSignLeader' + i);
        const v = s ? s.value : '';
        const bad = lv.leaders.length > 0 && !v;
        if (s) s.classList.toggle('is-invalid', bad);
        const er = tlhdEl('tlhdSignLeader' + i + 'Err'); if (er) er.style.display = bad ? 'block' : 'none';
        if (bad && !first) first = s;
        return v;
    });
    const ct = tlhdEl('tlhdSignContent');
    const content = ct ? ct.value.trim() : '';
    if (ct) ct.classList.toggle('is-invalid', !content);
    const ce = tlhdEl('tlhdSignContentErr'); if (ce) ce.style.display = content ? 'none' : 'block';
    if (!content && !first) first = ct;
    if (first) { if (first.focus) first.focus(); return null; }
    const coords = st.levels.map((lv, i) => Object.assign({ level: i + 1, unitId: lv.unitId, placed: !!st.placed[i] && !(i === 0 && st.levels.length > 1 && !st.enableNhay) }, st.coords[i]));
    return { assignees, content, enableNhay: st.enableNhay, coords };
}

// ---------------- Trình Lãnh đạo / Ban hành văn bản ----------------
function tlhdFileBase() {
    const vv = (activeDossier && (activeDossier.maVuViec || activeDossier.claimCode)) || '';
    return `Mau_33_BTNN_Quyet_dinh_thanh_lap_hoi_dong_${vv}`;
}
function tlhdLeaderLabelOf(levels, assignees, i) {
    const lv = levels[i]; if (!lv) return '';
    const l = lv.leaders.find(x => x.id === assignees[i]);
    return l ? l.label : '';
}
function tlhdSubmitOnline() {
    const sign = tlhdSignCollect();
    if (!sign) return;
    const d = tlhdState.docSrc === 'gen' ? tlhdCollectDoc() : { soQD: '', ngayQD: '', members: [] };
    const levels = tlhdSignState.levels;
    const fileName = tlhdState.docSrc === 'gen' ? tlhdFileBase() + '.docx' : tlhdState.onlineFile.name;
    activeDossier.tlhd = {
        method: 'online', docSrc: tlhdState.docSrc, soQD: d.soQD, ngayQD: d.ngayQD, members: tlhdState.docSrc === 'gen' ? d.members : [],
        fileName, onlineFile: tlhdState.docSrc === 'upload' ? tlhdState.onlineFile : null,
        levels, assignees: sign.assignees, coords: sign.coords, enableNhay: sign.enableNhay, content: sign.content, level: 0,
        attachments: typeof tlktGet === 'function' ? tlktGet('tlhd') : []
    };
    activeDossier.hdPublishType = 'digital';
    activeDossier.hdDecision = d.soQD || 'Chờ cấp số';
    activeDossier.hdDate = 'Chờ ký';
    activeDossier.hdSignDate = 'Chờ ký';
    activeDossier.hdFileName = fileName;
    activeDossier.hdLeader = tlhdLeaderLabelOf(levels, sign.assignees, levels.length - 1);
    activeDossier.hdSummary = 'Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả (Mẫu 33/BTNN).';
    activeDossier.status = 'Chờ duyệt QĐ thành lập';
    const now = tlhdNow();
    const lead1 = tlhdLeaderLabelOf(levels, sign.assignees, 0) || ('Lãnh đạo cấp 1 - ' + (levels[0] ? levels[0].unit : ''));
    if (typeof councilSignHistory !== 'undefined') councilSignHistory.unshift({ type: 'submit', actor: 'Cán bộ xử lý', time: now, detail: `Trình Lãnh đạo ${tlhdE(lead1)} ký duyệt Quyết định thành lập Hội đồng. Nội dung trình: "${tlhdE(sign.content)}"` });
    if (!activeDossier.timeline) activeDossier.timeline = [];
    activeDossier.timeline.unshift({ time: now, text: 'Trình Lãnh đạo ký duyệt Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả.' });
    tlhdClose();
    tlhdToast('Trình ký Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả thành công.', 'success');
    if (typeof switchSimulatorState === 'function') switchSimulatorState(1.2);
    tlhdPersistCreated();
}
// Hồ sơ chưa thành lập Hội đồng khởi tạo từ màn hình Danh sách (localStorage 'btnn_hoantra_created_v1'): cập nhật trạng thái sau khi trình / ban hành QĐ thành lập
function tlhdPersistCreated() {
    try {
        const k = 'btnn_hoantra_created_v1';
        const l = JSON.parse(localStorage.getItem(k) || '[]');
        const i = Array.isArray(l) ? l.findIndex(x => x && x.code === activeDossier.code) : -1;
        if (i < 0) return;
        l[i] = Object.assign(l[i], { status: activeDossier.status, hdDecision: activeDossier.hdDecision || '', hdDate: activeDossier.hdDate || '' });
        localStorage.setItem(k, JSON.stringify(l));
    } catch (e) { /* bỏ qua */ }
}
// Popup xác nhận dùng chung của trang (customConfirmModal): tạm đổi tiêu đề / nút thành "Ban hành", khôi phục khi đóng
function tlhdConfirmIssue(message, onYes) {
    const modal = tlhdEl('customConfirmModal');
    if (typeof showCustomConfirm !== 'function' || !modal) { if (window.confirm(message)) onYes(); return; }
    const title = modal.querySelector('.modal-title');
    const btn = tlhdEl('customConfirmBtn');
    const prev = { title: title ? title.innerHTML : '', color: title ? title.style.color : '', btn: btn ? btn.innerHTML : '', cls: btn ? btn.className : '', bg: btn ? btn.style.backgroundColor : '', z: modal.style.zIndex };
    if (title) { title.innerHTML = '<i class="fa-solid fa-circle-question"></i> Xác nhận ban hành văn bản'; title.style.color = '#1e293b'; }
    if (btn) { btn.innerHTML = 'Ban hành'; btn.className = 'btn btn-success'; btn.style.backgroundColor = '#16a34a'; }
    modal.style.zIndex = '10050';
    const restore = () => {
        if (title) { title.innerHTML = prev.title; title.style.color = prev.color; }
        if (btn) { btn.innerHTML = prev.btn; btn.className = prev.cls; btn.style.backgroundColor = prev.bg; }
        modal.style.zIndex = prev.z;
    };
    const ob = new MutationObserver(() => { if (!modal.classList.contains('visible')) { ob.disconnect(); restore(); } });
    showCustomConfirm(message, onYes);
    ob.observe(modal, { attributes: true, attributeFilter: ['class'] });
}
function tlhdSubmitOffline() {
    // Ký ngoài: Số, ký hiệu và Ngày văn bản đã ký bắt buộc
    let bad = null;
    [['tlhdOffSo', v => !!v], ['tlhdOffNgay', v => /^\d{2}\/\d{2}\/\d{4}$/.test(v)]].forEach(([id, ok]) => {
        const i = tlhdEl(id), e = tlhdEl(id + 'Err'), v = i ? i.value.trim() : '';
        if (i && !ok(v)) { i.classList.add('is-invalid'); e.textContent = v ? 'Ngày không đúng định dạng dd/mm/yyyy.' : 'Đây là trường bắt buộc'; e.style.display = 'block'; if (!bad) bad = i; }
    });
    if (bad) { bad.focus(); return; }
    if (typeof tlktValidate === 'function' && !tlktValidate('tlhd')) return;
    if (!tlhdState.offlineFile) {
        const e = tlhdEl('tlhdOfflineFileErr'); e.textContent = TLHD_OFF_FILE_MSG; e.style.display = 'block';
        const d = tlhdEl('tlhdOfflineDrop'); if (d) { d.classList.add('is-error'); d.focus(); }
        return;
    }
    // Popup xác nhận: ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống
    tlhdConfirmIssue(`Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Hồ sơ sẽ chuyển sang trạng thái "${TLHD_OFF_TARGET}". Bạn có chắc chắn muốn ban hành văn bản?`, tlhdIssueOffline);
}
// Thực thi ban hành văn bản Ký ngoài (sau khi xác nhận)
function tlhdIssueOffline() {
    if (!tlhdState.offlineFile) return;
    const offSo = (tlhdEl('tlhdOffSo') || {}).value ? tlhdEl('tlhdOffSo').value.trim() : '';
    const today = ((tlhdEl('tlhdOffNgay') || {}).value || '').trim() || tlhdToday();
    // Ký ngoài: Tài liệu ban hành kèm theo (chỉ khối ban hành kèm theo); Số, ngày theo văn bản đã ký
    activeDossier.tlhd = { method: 'offline', docSrc: '', soQD: offSo, ngayQD: today, members: [], fileName: tlhdState.offlineFile.name, levels: [], assignees: [], level: 0, attachments: typeof tlktGet === 'function' ? tlktGet('tlhd') : [] };
    activeDossier.hdPublishType = 'offline';
    activeDossier.hdDecision = offSo || 'Theo tệp văn bản đã ký';
    activeDossier.hdDate = today;
    activeDossier.hdSignDate = today;
    activeDossier.hdFileName = tlhdState.offlineFile.name;
    activeDossier.hdLeader = 'Ký ngoài hệ thống';
    activeDossier.status = TLHD_OFF_TARGET;
    const now = tlhdNow();
    if (typeof councilSignHistory !== 'undefined') councilSignHistory.unshift({ type: 'approve', actor: 'Cán bộ xử lý', time: now, detail: `Ban hành Quyết định thành lập Hội đồng ký ngoài hệ thống (tệp ${tlhdE(tlhdState.offlineFile.name)}).` });
    if (!activeDossier.timeline) activeDossier.timeline = [];
    activeDossier.timeline.unshift({ time: now, text: 'Ban hành Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả ký ngoài hệ thống.' });
    tlhdClose();
    tlhdToast('Ghi nhận Quyết định thành lập Hội đồng ký ngoài hệ thống thành công.', 'success');
    if (typeof switchSimulatorState === 'function') switchSimulatorState(2);
    tlhdPersistCreated();
}

// ---------------- Lãnh đạo được giao: Ký duyệt / Từ chối ----------------
// Hồ sơ dữ liệu mẫu ở trạng thái Chờ duyệt QĐ thành lập chưa có thông tin trình: dựng theo luồng đã cấu hình, Lãnh đạo đầu tiên của từng cấp
function tlhdEnsureApproval() {
    if (!activeDossier) return null;
    if (activeDossier.tlhd && activeDossier.tlhd.method === 'online' && activeDossier.tlhd.levels && activeDossier.tlhd.levels.length) return activeDossier.tlhd;
    const levels = tlhdLevels();
    const members = (activeDossier.council || []).map(c => ({ name: c.name, unitId: '', unitName: c.agency, chucVu: '', chucVuName: '', chucDanh: c.role }));
    activeDossier.tlhd = { method: 'online', docSrc: 'gen', soQD: activeDossier.hdDecision || TLHD_SO_QD_DEFAULT, ngayQD: '', members, fileName: tlhdFileBase() + '.docx', levels, assignees: levels.map(l => (l.leaders[0] || {}).id || ''), content: TLHD_SIGN_CONTENT_DEFAULT, level: 0 };
    return activeDossier.tlhd;
}
// Tài khoản Lãnh đạo đang đăng nhập: tham số ?ld= hoặc Người dùng giả lập (BTNN_WF) thuộc nhóm lãnh đạo của luồng;
// không xác định được thì giả lập là Lãnh đạo được giao của cấp hiện hành
function tlhdMe(a) {
    try { const p = new URLSearchParams(window.location.search).get('ld'); if (p) return p; } catch (e) { /* bỏ qua */ }
    const W = tlhdW();
    const cur = W ? W.getCurrentUserId() : '';
    const inFlow = a && a.levels && a.levels.some(l => l.leaders.some(x => x.id === cur));
    return inFlow ? cur : (a ? a.assignees[a.level] : '');
}
function tlhdCanAct() {
    if (typeof currentPerspective === 'undefined' || currentPerspective !== 'leader') return false;
    if (!activeDossier || activeDossier.status !== 'Chờ duyệt QĐ thành lập') return false;
    const a = tlhdEnsureApproval();
    if (!a) return false;
    const assignee = a.assignees[a.level];
    return !assignee || assignee === tlhdMe(a);
}
function tlhdLeaderApprove() {
    const a = tlhdEnsureApproval();
    if (!a || !tlhdCanAct()) { tlhdToast('Chỉ Lãnh đạo được giao mới được Ký duyệt Quyết định thành lập Hội đồng.', 'warning'); return; }
    // Mọi cấp: mở màn Ký duyệt dùng chung (xem văn bản trình ký); xác nhận tại màn -> tlhdApproveLevel (cấp trước) / ký số (cấp cuối)
    if (typeof openLeaderSignModal === 'function') { openLeaderSignModal('council'); return; }
    tlhdApproveLevel();
}
// Lãnh đạo cấp trước ký duyệt (ký nháy): chuyển Lãnh đạo cấp tiếp theo. Trả về false khi đang ở cấp cuối.
function tlhdApproveLevel(note) {
    const a = tlhdEnsureApproval();
    if (!a || a.level >= a.levels.length - 1) return false;
    const who = tlhdLeaderLabelOf(a.levels, a.assignees, a.level) || ('Lãnh đạo cấp ' + (a.level + 1));
    a.level += 1;
    const next = tlhdLeaderLabelOf(a.levels, a.assignees, a.level) || ('Lãnh đạo cấp ' + (a.level + 1));
    const now = tlhdNow();
    const y = String(note || '').trim();
    if (typeof councilSignHistory !== 'undefined') councilSignHistory.unshift({ type: 'approve', actor: who, time: now, detail: `Ký duyệt (ký nháy) Quyết định thành lập Hội đồng, chuyển Lãnh đạo ${tlhdE(next)} (Cấp ${a.level + 1}) ký số.` + (y ? ` Ý kiến: ${tlhdE(y)}` : '') });
    if (!activeDossier.timeline) activeDossier.timeline = [];
    activeDossier.timeline.unshift({ time: now, text: `Lãnh đạo ${who} ký duyệt Quyết định thành lập Hội đồng, chuyển Lãnh đạo cấp tiếp theo.` });
    tlhdToast('Ký duyệt thành công. Quyết định thành lập Hội đồng được chuyển Lãnh đạo cấp tiếp theo.', 'success');
    if (typeof renderStateLayout === 'function') renderStateLayout();
    return true;
}
function tlhdLeaderReject() {
    if (!tlhdCanAct()) { tlhdToast('Chỉ Lãnh đạo được giao mới được Từ chối Quyết định thành lập Hội đồng.', 'warning'); return; }
    if (typeof openRejectReasonModal === 'function') openRejectReasonModal('council');
}
// Thông tin Lãnh đạo được giao hiển thị tại khối Thông tin văn bản Quyết định thành lập
function tlhdAssigneeText() {
    const a = activeDossier && activeDossier.tlhd;
    if (!a || !a.levels || !a.levels.length) return '';
    const lab = tlhdLeaderLabelOf(a.levels, a.assignees, a.level) || '--';
    return `Cấp ${a.level + 1}/${a.levels.length} - ${a.levels[a.level].unit}: ${lab}`;
}

// ---------------- Khối Thông tin văn bản Quyết định thành lập (Bước 1): bổ sung danh sách thành viên ----------------
function tlhdRenderOfficialExtras() {
    const card = tlhdEl('s1OfficialCard');
    if (!card || card.style.display === 'none') return;
    if (activeDossier.status === 'Chờ duyệt QĐ thành lập') tlhdEnsureApproval();
    const a = activeDossier.tlhd;
    const pt = tlhdEl('s1OfficialPublishType');
    if (pt && a) pt.innerText = a.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống';
    let view = tlhdEl('tlhdMembersView');
    if (!view) {
        // Chèn sau lưới thông tin chung (Hình thức ban hành ... Lãnh đạo ký)
        const anchor = tlhdEl('s1OfficialGrid') || tlhdEl('s1LeaderSignContainer');
        if (!anchor) return;
        anchor.insertAdjacentHTML('afterend', '<div id="tlhdMembersView" class="form-group" style="margin-bottom:16px;"></div>');
        view = tlhdEl('tlhdMembersView');
    }
    const pending = activeDossier.status === 'Chờ duyệt QĐ thành lập';
    const members = a && a.members && a.members.length ? a.members : (activeDossier.council || []).map(c => ({ name: c.name, unitName: c.agency, chucVuName: '', chucDanh: c.role }));
    let html = '';
    if (pending && a && a.levels && a.levels.length) html += `<span class="form-label">Lãnh đạo được giao ký duyệt</span><div class="info-value" style="font-weight:600; margin-bottom:12px;">${tlhdE(tlhdAssigneeText())}</div>`;
    if (members.length) html += `<span class="form-label">Danh sách thành viên trong hội đồng</span>${tlhdMembersTableHtml(members, '<span class="ht-empty">---</span>')}`;
    view.innerHTML = html;
    view.style.display = html ? '' : 'none';
}

// Khởi tạo: chèn CSS và popup ngay khi tải trang
(function () {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tlhdEnsureModal);
    else tlhdEnsureModal();
})();
function btnnOpenUploadedFile(f) { if (!f) return; const b = (typeof Blob !== "undefined" && f instanceof Blob) ? f : f.raw; if (b) { if (!f.__url) f.__url = URL.createObjectURL(b); window.open(f.__url, "_blank"); return; } (typeof showToast === "function" ? showToast : alert)("Tệp mẫu [" + f.name + "] không có nội dung để mở xem.", "info"); }
