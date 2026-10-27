/*
 * Popup Trình ký Quyết định Đình chỉ việc xem xét trách nhiệm hoàn trả - Mẫu 39/BTNN (tiền tố dcht)
 * Màn hình Xem chi tiết / Cập nhật hồ sơ hoàn trả (chi_tiet_ho_so_hoan_tra.html).
 * Bố cục như Popup Không thụ lý hồ sơ / Popup Thành lập Hội đồng (tlhd):
 *   - Hình thức ký 02 thẻ đầu form; Stepper 2 bước chỉ hiển thị khi Ký số trên hệ thống.
 *   - Ký số: Bước 1 Nhập thông tin (Sinh văn bản theo mẫu 39/BTNN | Tải lên từ máy, Tài liệu kèm theo bắt buộc)
 *            Bước 2 Kéo ô ký & chọn Lãnh đạo -> Trình Lãnh đạo.
 *   - Ký ngoài: đính kèm PDF đã ký & đóng dấu, Ban hành văn bản (có xác nhận).
 * Luồng trạng thái (giả định, bổ sung vào luồng hiện có của module hoàn trả):
 *   Hồ sơ trước khi chốt ý kiến Hội đồng (Chờ duyệt / Bị từ chối QĐ thành lập, Họp hội đồng - xem DCHT_ALLOWED)
 *   -> Đình chỉ (Trình Lãnh đạo) -> Chờ duyệt QĐ đình chỉ -> Lãnh đạo các cấp Ký duyệt (cấp cuối ký số) -> Đình chỉ xem xét hoàn trả (kết thúc hồ sơ)
 *   -> Từ chối -> Bị từ chối QĐ đình chỉ (Trình ký lại, giữ dữ liệu lần trình trước)
 *   Ký ngoài: Ban hành văn bản -> Đình chỉ xem xét hoàn trả.
 * Phụ thuộc: chi_tiet_ho_so_hoan_tra_tlhd.js (CSS, tiện ích cơ quan / luồng ký / xác nhận), btnn_tai_lieu_kem_theo.js (tlkt),
 * các hàm sẵn có của trang (activeDossier, currentPerspective, renderStateLayout, renderPageHeaderActions, getDossierStatusBadge...).
 */

const DCHT_ST_PENDING = 'Chờ duyệt QĐ đình chỉ';
const DCHT_ST_REJECTED = 'Bị từ chối QĐ đình chỉ';
const DCHT_ST_DONE = 'Đình chỉ xem xét hoàn trả';
// Trạng thái hồ sơ cho phép Đình chỉ (chốt 23/10): Họp hội đồng, Chờ ban hành QĐ hoàn trả, Hoãn hoàn trả, Miễn hoàn trả, Thu hồi tiền hoàn trả
// Đình chỉ cả hồ sơ: Bước 1 (Chờ duyệt / Bị từ chối QĐ thành lập Hội đồng) và Bước 2 (Họp hội đồng); sau khi chốt ý kiến Hội đồng đình chỉ ở cấp cán bộ (chi_tiet_ho_so_hoan_tra_qd.js)
const DCHT_ALLOWED = ['Chờ duyệt QĐ thành lập', 'Bị từ chối thành lập HĐ', 'Từ chối duyệt QĐ thành lập', 'Họp hội đồng'];

// ---------------- Trạng thái hồ sơ hoàn trả (chốt 23/10): 9 giá trị hiển thị; Chờ duyệt / Bị từ chối kèm Loại trình ----------------
// Mã trạng thái nội bộ (điều khiển luồng) -> [Trạng thái hiển thị, Loại trình]
const HT_ST_MAP = {
    'Chờ duyệt QĐ thành lập': ['Chờ duyệt', 'Thành lập hội đồng'], 'Chờ duyệt thành lập hội đồng': ['Chờ duyệt', 'Thành lập hội đồng'],
    'Bị từ chối thành lập HĐ': ['Bị từ chối', 'Thành lập hội đồng'], 'Từ chối duyệt QĐ thành lập': ['Bị từ chối', 'Thành lập hội đồng'],
    'Chờ duyệt QĐ hoàn trả': ['Chờ duyệt', 'QĐ hoàn trả'], 'Bị từ chối QĐ hoàn trả': ['Bị từ chối', 'QĐ hoàn trả'],
    'Chờ duyệt QĐ đình chỉ': ['Chờ duyệt', 'QĐ đình chỉ'], 'Bị từ chối QĐ đình chỉ': ['Bị từ chối', 'QĐ đình chỉ'],
    'Đang họp hội đồng': ['Họp hội đồng', ''], 'Chờ ban hành QĐ': ['Chờ ban hành QĐ hoàn trả', ''], 'Đang thu hồi': ['Thu hồi tiền hoàn trả', ''], 'Hoàn tất': ['Hoàn thành', ''],
    // Chốt 23/10: bỏ 2 trạng thái, dữ liệu cũ quy về Đình chỉ xem xét hoàn trả
    'Không xem xét trách nhiệm hoàn trả': ['Đình chỉ xem xét hoàn trả', ''], 'Chấm dứt thu hồi': ['Đình chỉ xem xét hoàn trả', '']
};
// Hồ sơ nháp: mới khởi tạo, chưa trình/ban hành QĐ thành lập Hội đồng -> không có trạng thái (mã nội bộ giữ để điều khiển Bước 1)
const HT_ST_DRAFT = 'Chờ thành lập hội đồng';
const HT_LOAI_CODE = {
    'Chờ duyệt': { 'Thành lập hội đồng': 'Chờ duyệt QĐ thành lập', 'QĐ hoàn trả': 'Chờ duyệt QĐ hoàn trả', 'Đình chỉ xem xét hoàn trả': 'Chờ duyệt QĐ đình chỉ' },
    'Bị từ chối': { 'Thành lập hội đồng': 'Bị từ chối thành lập HĐ', 'QĐ hoàn trả': 'Bị từ chối QĐ hoàn trả', 'Đình chỉ xem xét hoàn trả': 'Bị từ chối QĐ đình chỉ' }
};
function htStView(code) { const m = HT_ST_MAP[code]; return m ? { name: m[0], loai: m[1] } : { name: code || '', loai: '' }; }
// Chuẩn hóa dữ liệu (dữ liệu cũ / dữ liệu theo tên mới kèm Loại trình) về mã trạng thái nội bộ
function htStCode(status, loai) {
    if (HT_LOAI_CODE[status]) return HT_LOAI_CODE[status][loai] || HT_LOAI_CODE[status]['Thành lập hội đồng'];
    const m = HT_ST_MAP[status];
    return m && !m[1] ? m[0] : status;
}
function htStNormalize(d) { if (d && d.status) { d.status = htStCode(d.status, d.loaiTrinh); d.loaiTrinh = htStView(d.status).loai; } return d; }
const HT_ST_STYLE = {
    // Đồng bộ màu badge màn Quyết định GQBT / Kinh phí: [nền, chữ, viền]
    'Chờ duyệt': ['#ede9fe', '#6d28d9', '#ddd6fe'],
    'Bị từ chối': ['#fef2f2', '#dc2626', '#fecaca'],
    'Họp hội đồng': ['#eff6ff', '#1d4ed8', '#bfdbfe'],
    'Chờ ban hành QĐ hoàn trả': ['#fffbeb', '#d97706', '#fde68a'],
    'Hoãn hoàn trả': ['#fef9c3', '#a16207', '#fde68a'],
    'Thu hồi tiền hoàn trả': ['#f0fdfa', '#0d9488', '#99f6e4'],
    'Miễn hoàn trả': ['#ecfdf5', '#059669', '#a7f3d0'],
    'Hoàn thành': ['#ecfdf5', '#059669', '#a7f3d0'],
    'Đình chỉ xem xét hoàn trả': ['#f1f5f9', '#475569', '#cbd5e1']
};
// Badge trạng thái (đồng bộ màn Quyết định GQBT): pill không icon; Chờ duyệt / Bị từ chối có dòng phụ Loại trình; hồ sơ nháp không hiển thị trạng thái
function htStBadgeHtml(code) {
    if (!code || code === HT_ST_DRAFT) return '<span style="color:#94a3b8;">—</span>';
    const v = htStView(code);
    const s = HT_ST_STYLE[v.name] || ['#f1f5f9', '#475569', '#cbd5e1'];
    const subColor = '#64748b'; // Dòng phụ Loại trình: chữ xám trung tính (đồng bộ mọi phân hệ BTNN)
    return `<span style="display:inline-flex; flex-direction:column; align-items:flex-start;"><span class="badge" style="display:inline-block; background:${s[0]}; color:${s[1]}; border:1px solid ${s[2]}; font-size:11px; font-weight:600; padding:3px 8px; border-radius:12px; text-align:center;">${v.name}</span>${v.loai ? `<span style="font-size:11.5px; color:${subColor}; font-weight:500; margin-top:4px;">${v.loai}</span>` : ''}</span>`;
}
const DCHT_REQ_MSG = 'Đây là trường bắt buộc';
const DCHT_OFF_FILE_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
const DCHT_SO_DEFAULT = '     /QĐ-';
const DCHT_SIGN_CONTENT_DEFAULT = 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả.';
const DCHT_CAN_CU_DEFAULT = [
    'Căn cứ khoản 2 Điều 69 của Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (đã được sửa đổi, bổ sung bởi Luật số 15/2026/QH16);',
    'Căn cứ ………………………………………………………………………………,'
].join('\n');
const DCHT_SIGN_SIZES = { nhay: [[180, 75], [220, 90], [280, 110]], so: [[200, 85], [245, 110], [320, 130]] };

let dchtState = { method: 'online', docSrc: 'gen', onlineFile: null, offlineFile: null, step: 1, converting: false };
const dchtSign = {};
let dchtConvToken = 0;

function dchtEl(id) { return document.getElementById(id); }
function dchtE(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function dchtToast(msg, type) { if (typeof showToast === 'function') showToast(msg, type || 'info'); }
function dchtToday() { return typeof tlhdToday === 'function' ? tlhdToday() : new Date().toLocaleDateString('vi-VN'); }
function dchtNow() { return typeof tlhdNow === 'function' ? tlhdNow() : new Date().toLocaleString('vi-VN'); }
function dchtSize(b) { return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
function dchtIsDchtStatus(s) { return s === DCHT_ST_PENDING || s === DCHT_ST_REJECTED || s === DCHT_ST_DONE; }

// ---------------- CSS: dùng lại CSS của Popup Thành lập Hội đồng (giới hạn trong #dchtModal) ----------------
function dchtInjectCss() {
    if (dchtEl('dchtCss')) return;
    const st = document.createElement('style');
    st.id = 'dchtCss';
    const base = typeof TLHD_CSS === 'string' ? TLHD_CSS.replace(/tlhd/g, 'dcht') : '';
    st.textContent = base + '\n' + [
        '#dchtModal .dcht-hint { font-size:11.5px; color:#64748b; }',
        '#dchtModal .dcht-label-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }',
        '#dchtModal .dcht-label-row .form-label { margin-bottom:0; }',
        '#dchtInfoCard { border-left:4px solid #b91c1c; margin-bottom:20px; }',
        '#dchtInfoCard .dcht-grid { display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:12px 18px; }',
        '#dchtInfoCard .dcht-k { font-size:12px; color:#64748b; margin-bottom:2px; }',
        '#dchtInfoCard .dcht-v { font-size:13.5px; font-weight:600; color:#0f172a; overflow-wrap:anywhere; }',
        '@media (max-width: 760px) { #dchtInfoCard .dcht-grid { grid-template-columns:1fr; } }'
    ].join('\n');
    document.head.appendChild(st);
}

// ---------------- HTML popup ----------------
function dchtModalHtml() {
    return `<div id="dchtModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15,23,42,0.65); backdrop-filter:blur(2px); z-index:1050; justify-content:center; align-items:center;">
    <div id="dchtContainer" style="background:#fff; width:960px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3);">
        <div style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;">
            <div>
                <div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;">
                    <span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#fee2e2; color:#b91c1c; font-size:14px;"><i class="fa-solid fa-circle-stop"></i></span>
                    <span>TRÌNH KÝ QUYẾT ĐỊNH ĐÌNH CHỈ VIỆC XEM XÉT TRÁCH NHIỆM HOÀN TRẢ</span>
                </div>
                <div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">
                    Hồ sơ: <strong id="dchtHdrCode" style="color:var(--primary-color);">--</strong>
                    <span style="margin:0 6px;">•</span> Người yêu cầu bồi thường: <span id="dchtHdrNyc" style="font-weight:600; color:#334155;">--</span>
                    <span style="margin:0 6px;">•</span> Đơn vị chi trả bồi thường: <span id="dchtHdrAgency" style="font-weight:500; color:#475569;">--</span>
                </div>
            </div>
            <button type="button" onclick="dchtClose()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button>
        </div>

        <div id="dchtStepperBar" class="ktl-stepper-fullwidth">
            <div id="dchtStep1Tab" class="ktl-step-tab active" onclick="dchtGoStep1()"><span class="ktl-step-badge" id="dchtStep1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>
            <div class="ktl-stepper-sep"></div>
            <div id="dchtStep2Tab" class="ktl-step-tab" onclick="dchtGoStep2()"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div>
        </div>

        <div id="dchtStep1Body" class="gqx-body" style="overflow-y:auto; flex:1; padding:24px;">
            <div id="dchtReturnedBlock" style="display:none; background:#fef2f2; border:1px solid #fecaca; border-left:4px solid #dc2626; border-radius:8px; padding:12px 16px; margin-bottom:14px;">
                <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b91c1c; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> QUYẾT ĐỊNH ĐÌNH CHỈ BỊ LÃNH ĐẠO TỪ CHỐI</div>
                <div style="font-size:12.5px; color:#7f1d1d; line-height:1.5;">Lý do từ chối: <strong id="dchtReturnedReason">--</strong><br>Người từ chối: <span id="dchtReturnedBy">--</span> • Thời điểm: <span id="dchtReturnedAt">--</span></div>
            </div>

            <div class="gqx-sec">
                <div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div>
                <div class="sign-cards-grid">
                    <label class="sign-card active" id="dchtCardOnline" for="dchtMethodOnline">
                        <input type="radio" name="dchtSignMethod" id="dchtMethodOnline" value="online" checked onchange="dchtSetMethod('online')">
                        <div class="sign-card-content"><div class="sign-card-icon"><i class="fa-solid fa-file-signature"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký số trên hệ thống</div><div class="sign-card-desc">Trình Lãnh đạo ký duyệt trên phần mềm</div></div></div>
                        <div class="sign-card-check"><i class="fa-solid fa-circle-check"></i></div>
                    </label>
                    <label class="sign-card" id="dchtCardOffline" for="dchtMethodOffline">
                        <input type="radio" name="dchtSignMethod" id="dchtMethodOffline" value="offline" onchange="dchtSetMethod('offline')">
                        <div class="sign-card-content"><div class="sign-card-icon offline"><i class="fa-solid fa-stamp"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký ngoài (Ban hành trực tiếp)</div><div class="sign-card-desc">Tải lên văn bản PDF đã ký và đóng dấu</div></div></div>
                        <div class="sign-card-check"><i class="fa-regular fa-circle"></i></div>
                    </label>
                </div>
            </div>

            <div class="gqx-sec" id="dchtDocSection">
                <div class="gqx-sec-title" id="dchtDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>

                <div id="dchtDocSrcGroup">
                    <div class="doc-src-segmented">
                        <button type="button" class="doc-src-seg-btn active" id="dchtSegGen" onclick="dchtSetDocSrc('gen')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 39/BTNN</span></button>
                        <button type="button" class="doc-src-seg-btn" id="dchtSegUpload" onclick="dchtSetDocSrc('upload')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button>
                    </div>
                </div>

                <div id="dchtDocMetaGroup" class="dcht-meta">
                    <div class="dcht-meta-title"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu 39/BTNN</div>
                    <div class="gqx-grid2" style="margin-bottom:14px;">
                        <div class="gqx-field">
                            <label class="form-label" for="dchtSo">Số, ký hiệu văn bản<span class="gqx-req">*</span></label>
                            <input type="text" id="dchtSo" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="dchtClearErr('dchtSo')">
                            <div id="dchtSoErr" class="gqx-err">${DCHT_REQ_MSG}</div>
                        </div>
                        <div class="gqx-field">
                            <label class="form-label" for="dchtNgay">Ngày văn bản<span class="gqx-req">*</span></label>
                            <div class="gqx-date">
                                <input type="text" id="dchtNgay" class="form-control" placeholder="dd/mm/yyyy" readonly onclick="dchtOpenDatePicker()">
                                <i class="fa-regular fa-calendar-days" onclick="dchtOpenDatePicker()" title="Chọn ngày"></i>
                                <input type="date" id="dchtNgayPicker" tabindex="-1" onchange="dchtOnDatePicked(this.value)">
                            </div>
                            <div id="dchtNgayErr" class="gqx-err">${DCHT_REQ_MSG}</div>
                        </div>
                    </div>
                    <div class="gqx-field">
                        <div class="dcht-label-row"><label class="form-label" for="dchtCanCu">Căn cứ</label><span class="dcht-hint"><i class="fa-solid fa-circle-info"></i> Mỗi căn cứ trên 01 dòng</span></div>
                        <textarea id="dchtCanCu" class="form-control" rows="4" maxlength="4000" style="font-size:12.5px;" placeholder="Nhập căn cứ, mỗi căn cứ 01 dòng"></textarea>
                        <div class="dcht-hint" style="margin-top:4px;">Ghi rõ tên, số, ngày ban hành văn bản thu hồi, thay thế, hủy bỏ văn bản làm căn cứ yêu cầu bồi thường.</div>
                    </div>
                    <div class="gqx-field">
                        <label class="form-label" for="dchtVbCanCu">Văn bản làm căn cứ yêu cầu bồi thường</label>
                        <textarea id="dchtVbCanCu" class="form-control" rows="2" maxlength="1000" style="font-size:12.5px;" placeholder="Nhập tên, số hiệu, ngày ban hành, cơ quan ban hành văn bản làm căn cứ yêu cầu bồi thường"></textarea>
                    </div>
                    <div class="gqx-field" style="margin-bottom:0;">
                        <div class="dcht-label-row"><label class="form-label" for="dchtNoiNhan">Nơi nhận</label><span class="dcht-hint"><i class="fa-solid fa-circle-info"></i> Mỗi nơi nhận trên 01 dòng</span></div>
                        <textarea id="dchtNoiNhan" class="form-control" rows="4" maxlength="2000" style="font-size:12.5px;" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng"></textarea>
                    </div>
                </div>

                <div id="dchtOnlineSection">
                    <input type="file" id="dchtOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="dchtOnOnlineFile(this)">
                    <div id="dchtDocFileBox"></div>
                    <div id="dchtDocFileErr" class="gqx-err">${DCHT_REQ_MSG}</div>
                </div>

                <div id="dchtOfflineSection" style="display:none;">
                    <input type="file" id="dchtOfflineFileInput" accept=".pdf" style="display:none;" onchange="dchtOnOfflineFile(this)">
                    <div id="dchtOfflineBox"></div>
                    <div id="dchtOfflineFileErr" class="gqx-err">${DCHT_OFF_FILE_MSG}</div>
                    <div class="dcht-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang trạng thái <strong>${DCHT_ST_DONE}</strong>.</div>
                </div>
            </div>

            <!-- Tài liệu kèm theo (bắt buộc khi Ký số trên hệ thống) -->
            <div id="dchtTlkt"></div>
        </div>

        <div id="dchtStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative; min-height:0;">
            <div style="flex:1; overflow:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;">
                <div id="dchtA4Page" class="a4-document-page"></div>
            </div>
            <div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; z-index:20;">
                <div>
                    <div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div>
                    <div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div>
                </div>
                <div id="dchtSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>
                <div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>
                <div>
                    <label class="form-label" for="dchtSignContent">Nội dung trình<span class="gqx-req">*</span></label>
                    <textarea id="dchtSignContent" class="form-control" rows="4" style="font-size:13px; font-family:inherit; width:100%; box-sizing:border-box;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="dchtClearErr('dchtSignContent')"></textarea>
                    <div id="dchtSignContentErr" class="gqx-err">${DCHT_REQ_MSG}</div>
                </div>
            </div>
        </div>

        <div style="padding:16px 28px 18px; display:flex; justify-content:flex-end; align-items:center; background:#f8fafc; border-top:1px solid #e2e8f0; flex-shrink:0;">
            <div style="display:flex; gap:10px;">
                <button type="button" class="btn btn-secondary" onclick="dchtClose()">Hủy bỏ</button>
                <button type="button" id="dchtBtnIssue" class="btn btn-primary" onclick="dchtSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>
                <button type="button" id="dchtBtnNext" class="btn btn-primary" onclick="dchtGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>
                <button type="button" id="dchtBtnBack" class="btn btn-secondary" onclick="dchtGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
                <button type="button" id="dchtBtnSubmit" class="btn btn-primary" onclick="dchtSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>
            </div>
        </div>
    </div>
</div>`;
}

function dchtEnsureModal() {
    dchtInjectCss();
    if (!dchtEl('dchtModal')) document.body.insertAdjacentHTML('beforeend', dchtModalHtml());
}

// ---------------- Dữ liệu hồ sơ ----------------
function dchtAgency() { return typeof tlhdAgency === 'function' ? tlhdAgency() : ((activeDossier && activeDossier.agency) || ''); }
function dchtNycName() { return typeof tlhdNycName === 'function' ? tlhdNycName() : ''; }
// (5) Tên cá nhân, tổ chức bị thiệt hại theo hồ sơ (Cá nhân: tiền tố Ông/Bà)
function dchtVictim() {
    let n = '';
    try {
        const W = window.BTNN_WF; const r = W && activeDossier ? W.getRecord(activeDossier.claimCode) : null;
        if (r) n = r.ntthName || r.nguoiBiThietHai || r.victimName || '';
    } catch (e) { n = ''; }
    n = n || dchtNycName();
    if (!n) return '……';
    return /^(công ty|cty|tổ chức|hợp tác xã|doanh nghiệp|ngân hàng)/i.test(n) ? n : 'Ông/Bà ' + n;
}
// (6) Văn bản làm căn cứ yêu cầu bồi thường theo hồ sơ (cho phép sửa trên popup)
function dchtVbCanCuDefault() {
    try {
        const W = window.BTNN_WF; const r = W && activeDossier ? W.getRecord(activeDossier.claimCode) : null;
        if (r) {
            const list = (r.vanBanCanCu || []).map(d => d && d.name).filter(Boolean);
            if (list.length) return list.join('; ');
            if (r.docBase || r.verdictNumber) return r.docBase || r.verdictNumber;
        }
    } catch (e) { /* bỏ qua */ }
    return '';
}
// (7) Tên người thi hành công vụ gây thiệt hại; (8) Cơ quan quản lý nhà nước về công tác bồi thường nhà nước
function dchtOfficers() { return ((activeDossier && activeDossier.refundOfficers) || []).map(o => o && o.name).filter(Boolean); }
function dchtQlnn() {
    const a = dchtAgency();
    if (/^(Bộ|Cục|Tòa án nhân dân tối cao|Viện kiểm sát nhân dân tối cao|Văn phòng Chính phủ|Thanh tra Chính phủ)/i.test(a)) return 'Cục Bồi thường nhà nước - Bộ Tư pháp';
    const dd = typeof tlhdDiaDanh === 'function' ? tlhdDiaDanh() : '';
    return dd && dd !== '……' ? 'Sở Tư pháp ' + (/(Hà Nội|Hồ Chí Minh|Hải Phòng|Đà Nẵng)/.test(dd) ? 'Thành phố ' : 'tỉnh ') + dd : 'Sở Tư pháp ……';
}
function dchtNoiNhanDefault() {
    const off = dchtOfficers();
    return [
        '- ' + (off.length ? off.join(', ') : '……(7)……') + ';',
        '- ' + dchtQlnn() + ';',
        '- …………….;',
        '- Lưu: VT, HSVV.'
    ].join('\n');
}
function dchtFileBase() {
    const vv = (activeDossier && (activeDossier.maVuViec || activeDossier.claimCode)) || '';
    return `Mau_39_BTNN_Quyet_dinh_dinh_chi_xem_xet_hoan_tra_${vv}`;
}

// ---------------- Mở / đóng popup ----------------
function dchtCanOpen() {
    if (typeof currentPerspective !== 'undefined' && currentPerspective === 'leader') return false;
    return !!activeDossier && (DCHT_ALLOWED.indexOf(activeDossier.status) >= 0 || activeDossier.status === DCHT_ST_REJECTED);
}
function dchtOpenModal() {
    if (!dchtCanOpen()) { dchtToast('Trạng thái hồ sơ không cho phép Đình chỉ việc xem xét trách nhiệm hoàn trả.', 'warning'); return; }
    dchtEnsureModal();
    if (typeof tlhdFrameFull === 'function') tlhdFrameFull(true);
    const rejected = activeDossier.status === DCHT_ST_REJECTED;
    const prev = rejected && activeDossier.dcht ? activeDossier.dcht : null;
    dchtState = { method: prev ? prev.method : 'online', docSrc: prev && prev.docSrc ? prev.docSrc : 'gen', onlineFile: null, offlineFile: null, step: 1, converting: false };
    if (prev && prev.docSrc === 'upload' && prev.uploadMeta) {
        const raw = typeof tlktBlob === 'function' ? tlktBlob(prev.uploadMeta.keepId) : null;
        dchtState.onlineFile = { name: prev.uploadMeta.name, size: prev.uploadMeta.size, note: prev.uploadMeta.note || '', raw, keepId: prev.uploadMeta.keepId };
    }
    dchtEl('dchtHdrCode').innerText = activeDossier.code || '--';
    dchtEl('dchtHdrNyc').innerText = dchtNycName() || '--';
    dchtEl('dchtHdrAgency').innerText = dchtAgency() || '--';
    const rb = dchtEl('dchtReturnedBlock');
    rb.style.display = prev && prev.returned ? 'block' : 'none';
    if (prev && prev.returned) {
        dchtEl('dchtReturnedReason').innerText = prev.returned.reason || '--';
        dchtEl('dchtReturnedBy').innerText = prev.returned.by || '--';
        dchtEl('dchtReturnedAt').innerText = prev.returned.at || '--';
    }
    dchtEl('dchtSo').value = prev && prev.so ? prev.so : DCHT_SO_DEFAULT;
    dchtEl('dchtNgay').value = prev && prev.ngay ? prev.ngay : dchtToday();
    dchtEl('dchtCanCu').value = prev && prev.canCu != null ? prev.canCu : DCHT_CAN_CU_DEFAULT;
    dchtEl('dchtVbCanCu').value = prev && prev.vbCanCu != null ? prev.vbCanCu : dchtVbCanCuDefault();
    dchtEl('dchtNoiNhan').value = prev && prev.noiNhan != null ? prev.noiNhan : dchtNoiNhanDefault();
    dchtEl('dchtSignContent').value = prev && prev.content ? prev.content : DCHT_SIGN_CONTENT_DEFAULT;
    dchtEl('dchtModal').querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    dchtEl('dchtModal').querySelectorAll('.gqx-err').forEach(el => { el.style.display = 'none'; });
    if (typeof tlktMount === 'function') tlktMount('dcht', 'dchtTlkt', { required: true, rows: prev && prev.attachments ? prev.attachments : [] });
    dchtSignInit(prev ? prev.assignees : null);
    dchtRenderOff();
    dchtEl(dchtState.method === 'offline' ? 'dchtMethodOffline' : 'dchtMethodOnline').checked = true;
    dchtSetDocSrc(dchtState.docSrc, true);
    dchtSetMethod(dchtState.method);
    dchtEl('dchtModal').style.display = 'flex';
}
function dchtClose() {
    dchtCancelConvert();
    const m = dchtEl('dchtModal'); if (m) m.style.display = 'none';
    if (typeof tlhdFrameFull === 'function') tlhdFrameFull(false);
}

// ---------------- Hình thức ký / Nguồn tệp ----------------
function dchtSetMethod(method) {
    dchtState.method = method === 'offline' ? 'offline' : 'online';
    const on = dchtState.method === 'online';
    [['dchtCardOnline', on], ['dchtCardOffline', !on]].forEach(([id, act]) => {
        const c = dchtEl(id); if (!c) return;
        c.classList.toggle('active', act);
        const ic = c.querySelector('.sign-card-check i'); if (ic) ic.className = act ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    // Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn (ẩn hẳn)
    const bar = dchtEl('dchtStepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !on); bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    dchtEl('dchtDocSrcGroup').style.display = on ? 'block' : 'none';
    dchtEl('dchtOnlineSection').style.display = on ? 'block' : 'none';
    dchtEl('dchtOfflineSection').style.display = on ? 'none' : 'block';
    dchtEl('dchtDocSectionTitle').innerHTML = on
        ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>'
        : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
    if (typeof tlktShow === 'function') tlktShow('dcht', on);
    dchtApplyDocMeta();
    dchtGoStep1();
}
function dchtSetDocSrc(src, keepFile) {
    dchtState.docSrc = src === 'upload' ? 'upload' : 'gen';
    const gen = dchtState.docSrc === 'gen';
    dchtEl('dchtSegGen').classList.toggle('active', gen);
    dchtEl('dchtSegUpload').classList.toggle('active', !gen);
    dchtCancelConvert();
    if (!keepFile) dchtState.onlineFile = null;
    const inp = dchtEl('dchtOnlineFileInput'); if (inp) inp.value = '';
    dchtApplyDocMeta();
    dchtRenderDocBox();
}
// Thông tin điền vào Mẫu 39/BTNN: chỉ khi Ký số và Sinh văn bản theo mẫu 39/BTNN
function dchtApplyDocMeta() { dchtEl('dchtDocMetaGroup').style.display = dchtState.method === 'online' && dchtState.docSrc === 'gen' ? '' : 'none'; }
function dchtDropHtml(inputId, main, sub, dropId) {
    return `<div id="${dropId}" class="dcht-drop" tabindex="0" role="button" onclick="dchtEl('${inputId}').click()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}" ondragover="dchtDragOver(event)" ondragleave="dchtDragLeave(event)" ondrop="dchtDrop(event, '${inputId}')"><i class="fa-solid fa-cloud-arrow-up dcht-drop-ico"></i><div class="dcht-drop-main">${main}</div><div class="dcht-drop-sub">${sub}</div></div>`;
}
function dchtCardHtml(f, viewJs, removeJs) {
    const isPdf = /\.pdf$/i.test(f.name || '');
    return `<div class="dcht-card"><i class="fa-solid ${isPdf ? 'fa-file-pdf pdf' : 'fa-file-word word'} dcht-card-ico"></i><div class="dcht-card-info"><div class="dcht-card-name">${dchtE(f.name)}</div><div class="dcht-card-meta">${dchtE(f.size || '')}${f.note ? ' · ' + dchtE(f.note) : ''}</div></div><div class="dcht-card-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="${viewJs}"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm gqx-danger" onclick="${removeJs}"><i class="fa-solid fa-trash"></i> Xóa</button></div></div>`;
}
function dchtRenderDocBox() {
    const box = dchtEl('dchtDocFileBox'); if (!box) return;
    if (dchtState.docSrc === 'gen') {
        box.innerHTML = `<div class="dcht-gen-row"><div class="gqx-file-hint"><i class="fa-solid fa-file-circle-check" style="color:#2563eb; font-size:16px; margin-right:6px;"></i>Hệ thống tự động sinh Quyết định theo Mẫu 39/BTNN từ thông tin đang nhập.</div><button type="button" class="btn-preview-doc" onclick="dchtPreviewDoc()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div>`;
        return;
    }
    if (dchtState.converting) { box.innerHTML = '<div class="dcht-converting"><span class="dcht-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    const f = dchtState.onlineFile;
    box.innerHTML = f ? dchtCardHtml(f, 'dchtViewFile(\'online\')', 'dchtRemoveFile(\'online\')')
        : dchtDropHtml('dchtOnlineFileInput', 'Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a>', 'Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)', 'dchtOnlineDrop');
}
function dchtRenderOff() {
    const box = dchtEl('dchtOfflineBox'); if (!box) return;
    const f = dchtState.offlineFile;
    box.innerHTML = f ? dchtCardHtml(f, 'dchtViewFile(\'offline\')', 'dchtRemoveFile(\'offline\')')
        : dchtDropHtml('dchtOfflineFileInput', 'Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a>', '(Chỉ chấp nhận .pdf, tối đa 50MB)', 'dchtOfflineDrop');
}
function dchtDragOver(e) { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; e.currentTarget.classList.add('drag-over'); }
function dchtDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function dchtDrop(e, inputId) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    const files = e.dataTransfer && e.dataTransfer.files; if (!files || !files.length) return;
    if (inputId === 'dchtOfflineFileInput') dchtOnOfflineFile({ files: [files[0]], value: '' }); else dchtOnOnlineFile({ files: [files[0]], value: '' });
}
function dchtSetBusy(busy) {
    const btn = dchtEl('dchtBtnNext'); if (!btn) return;
    btn.disabled = !!busy; btn.style.opacity = busy ? '0.55' : ''; btn.style.cursor = busy ? 'not-allowed' : '';
    btn.title = busy ? 'Đang chuyển đổi tệp sang PDF, vui lòng chờ' : '';
}
function dchtCancelConvert() { dchtState.converting = false; dchtConvToken += 1; dchtSetBusy(false); }
function dchtFileMsg(f, re, list) {
    if (!re.test(f.name || '')) return `Tệp không đúng định dạng. Chỉ chấp nhận ${list}.`;
    if (f.size > 50 * 1024 * 1024) return 'Tệp vượt quá dung lượng cho phép (tối đa 50MB).';
    return '';
}
function dchtOnOnlineFile(input) {
    const f = input && input.files && input.files[0]; if (!f) return;
    input.value = '';
    const err = dchtEl('dchtDocFileErr');
    const msg = dchtFileMsg(f, /\.(pdf|docx?)$/i, '.pdf, .doc, .docx');
    if (msg) { if (err) { err.textContent = msg; err.style.display = 'block'; } dchtToast(msg, 'error'); return; }
    if (err) { err.textContent = DCHT_REQ_MSG; err.style.display = 'none'; }
    const size = dchtSize(f.size);
    if (/\.docx?$/i.test(f.name)) {
        // .doc/.docx: chuyển đổi sang PDF (~1,2s), khóa nút Tiếp tục trong lúc chuyển đổi
        dchtState.onlineFile = null; dchtState.converting = true;
        const token = ++dchtConvToken;
        dchtSetBusy(true); dchtRenderDocBox();
        setTimeout(() => {
            if (dchtConvToken !== token || !dchtState.converting) return;
            dchtState.converting = false; dchtSetBusy(false);
            dchtState.onlineFile = { name: f.name.replace(/\.docx?$/i, '.pdf'), size, raw: f, note: 'Đã chuyển đổi từ ' + f.name };
            dchtRenderDocBox();
        }, 1200);
        return;
    }
    dchtState.onlineFile = { name: f.name, size, raw: f };
    dchtRenderDocBox();
}
function dchtOnOfflineFile(input) {
    const f = input && input.files && input.files[0]; if (!f) return;
    input.value = '';
    const err = dchtEl('dchtOfflineFileErr');
    const msg = dchtFileMsg(f, /\.pdf$/i, '.pdf');
    if (msg) { if (err) { err.textContent = msg; err.style.display = 'block'; } const d = dchtEl('dchtOfflineDrop'); if (d) d.classList.add('is-error'); dchtToast(msg, 'error'); return; }
    dchtState.offlineFile = { name: f.name, size: dchtSize(f.size), raw: f };
    if (err) { err.textContent = DCHT_OFF_FILE_MSG; err.style.display = 'none'; }
    dchtRenderOff();
}
// Xóa: gỡ tệp ngay, hiển thị lại vùng kéo thả
function dchtRemoveFile(kind) {
    if (kind === 'online') { dchtCancelConvert(); dchtState.onlineFile = null; dchtRenderDocBox(); return; }
    dchtState.offlineFile = null; dchtRenderOff();
}
// Xem file: mở chính tệp đã tải lên tại tab mới
function dchtViewFile(kind) {
    const f = kind === 'online' ? dchtState.onlineFile : dchtState.offlineFile;
    if (typeof btnnOpenUploadedFile === 'function') btnnOpenUploadedFile(f);
}
function dchtClearErr(id) {
    const el = dchtEl(id); if (el) el.classList.remove('is-invalid');
    const e = dchtEl(id + 'Err'); if (e) e.style.display = 'none';
}
function dchtOpenDatePicker() {
    const p = dchtEl('dchtNgayPicker'); if (!p) return;
    const v = dchtEl('dchtNgay').value.split('/');
    if (v.length === 3) p.value = `${v[2]}-${v[1]}-${v[0]}`;
    try { if (p.showPicker) p.showPicker(); else p.click(); } catch (e) { p.click(); }
}
function dchtOnDatePicked(val) {
    if (!val) return;
    const p = val.split('-');
    dchtEl('dchtNgay').value = `${p[2]}/${p[1]}/${p[0]}`;
    dchtClearErr('dchtNgay');
}

// ---------------- Kiểm tra Bước 1 / Văn bản Mẫu 39/BTNN ----------------
function dchtValidateStep1() {
    let first = null;
    const mark = id => { const el = dchtEl(id); if (el) el.classList.add('is-invalid'); const e = dchtEl(id + 'Err'); if (e) e.style.display = 'block'; if (!first) first = el; };
    if (dchtState.docSrc === 'gen') {
        if (!dchtEl('dchtSo').value.trim()) mark('dchtSo');
        if (!dchtEl('dchtNgay').value.trim()) mark('dchtNgay');
    } else if (!dchtState.onlineFile) {
        const e = dchtEl('dchtDocFileErr'); if (e) { e.textContent = DCHT_REQ_MSG; e.style.display = 'block'; }
        const d = dchtEl('dchtOnlineDrop'); if (d) d.classList.add('is-error');
        if (!first) first = d;
    }
    const tlktOk = typeof tlktValidate !== 'function' || tlktValidate('dcht');
    if (first) { if (first.focus) first.focus(); if (first.scrollIntoView) first.scrollIntoView({ block: 'center' }); return false; }
    return tlktOk;
}
function dchtLines(id) { return dchtEl(id).value.split('\n').map(s => s.trim()).filter(Boolean); }
function dchtCollectDoc() {
    return { so: dchtEl('dchtSo').value.trim(), ngay: dchtEl('dchtNgay').value.trim(), canCu: dchtEl('dchtCanCu').value, vbCanCu: dchtEl('dchtVbCanCu').value.trim(), noiNhan: dchtEl('dchtNoiNhan').value };
}
function dchtDocHtml(d) {
    const so = d.so && !/^\s*\/QĐ-\s*$/.test(d.so) ? d.so : '……/QĐ-……';
    const p = 'text-indent:24px; margin:0 0 8px; text-align:justify;';
    const canCu = String(d.canCu || '').split('\n').map(s => s.trim()).filter(Boolean).map(s => `<p style="${p} font-style:italic;">${dchtE(s)}</p>`).join('');
    const nn = String(d.noiNhan || '').split('\n').map(s => s.trim()).filter(Boolean).map(s => dchtE(s)).join('<br>');
    const dw = typeof tlhdDateWords === 'function' ? tlhdDateWords(d.ngay) : d.ngay;
    return `<div style="text-align:right; font-weight:bold; font-size:13px;">Mẫu số 39/BTNN</div>
        <div style="text-align:center; font-style:italic; font-size:12px; margin-bottom:16px;">(Ban hành kèm theo Nghị định số ……/……/NĐ-CP ngày …/…/… của Chính phủ)</div>
        <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
            <div style="text-align:center; width:42%;">
                <div style="font-weight:bold; font-size:13px; text-transform:uppercase;">${dchtE(dchtAgency())}</div>
                <div style="border-bottom:1px solid #000; width:100px; margin:4px auto 6px;"></div>
                <div style="font-size:13px;">Số: ${dchtE(so)}</div>
            </div>
            <div style="text-align:center; width:56%;">
                <div style="font-weight:bold; font-size:13px;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                <div style="font-weight:bold; font-size:13px;">Độc lập - Tự do - Hạnh phúc</div>
                <div style="border-bottom:1px solid #000; width:140px; margin:4px auto 6px;"></div>
                <div style="font-style:italic; font-size:13px;">${dchtE(typeof tlhdDiaDanh === 'function' ? tlhdDiaDanh() : '……')}, ${dw}</div>
            </div>
        </div>
        <div style="text-align:center; margin-bottom:14px;">
            <div style="font-weight:bold; font-size:15px;">QUYẾT ĐỊNH</div>
            <div style="font-weight:bold; font-size:14px;">Đình chỉ việc xem xét trách nhiệm hoàn trả</div>
            <div style="border-bottom:1px solid #000; width:120px; margin:4px auto 10px;"></div>
            <div style="font-weight:bold; font-size:14px;">${dchtE(typeof tlhdHeadTitle === 'function' ? tlhdHeadTitle() : 'THỦ TRƯỞNG CƠ QUAN')}</div>
        </div>
        ${canCu}
        <div style="text-align:center; font-weight:bold; margin:10px 0;">QUYẾT ĐỊNH:</div>
        <p style="${p}"><strong>Điều 1.</strong> Đình chỉ việc xác định trách nhiệm hoàn trả trong vụ việc yêu cầu bồi thường của ${dchtE(dchtVictim())} vì ${dchtE(d.vbCanCu || '……')} không còn là văn bản làm căn cứ yêu cầu bồi thường.</p>
        <p style="${p}"><strong>Điều 2.</strong> Quyết định này có hiệu lực kể từ ngày ký./.</p>
        <div style="display:flex; justify-content:space-between; margin-top:24px; min-height:170px;">
            <div style="width:42%;">
                <div style="font-weight:bold; font-style:italic; font-size:12.5px;">Nơi nhận:</div>
                <div style="font-size:11.5px; line-height:1.5;">${nn}</div>
            </div>
            <div style="width:52%; text-align:center;">
                <div style="font-weight:bold; font-size:13.5px;">${dchtE(typeof tlhdSignerTitle === 'function' ? tlhdSignerTitle() : 'THỦ TRƯỞNG CƠ QUAN')}</div>
                <div style="font-style:italic; font-size:12px;">(Ký, ghi rõ họ tên và đóng dấu)</div>
                <div style="height:92px;"></div>
                <div id="dchtA4SignerName" style="font-weight:bold; font-size:14px; text-transform:uppercase;"></div>
            </div>
        </div>`;
}
function dchtUploadDocHtml() {
    const f = dchtState.onlineFile;
    return `<div style="text-align:center; margin-top:120px; color:#475569; font-family:Inter,system-ui,sans-serif;">
        <i class="fa-solid ${f && /\.pdf$/i.test(f.name) ? 'fa-file-pdf' : 'fa-file-word'}" style="font-size:56px; color:#2563eb;"></i>
        <div style="font-weight:700; font-size:15px; margin-top:12px; color:#1e293b;">${dchtE(f ? f.name : '')}</div>
        <div style="font-size:12.5px; margin-top:6px;">Tệp văn bản trình ký tải lên từ máy. Kéo thả ô ký vào vị trí ký trên văn bản.</div>
    </div>
    <div style="position:absolute; left:65px; right:65px; bottom:60px; display:flex; justify-content:flex-end;"><div style="width:52%; text-align:center;"><div id="dchtA4SignerName" style="font-weight:bold; font-size:14px; text-transform:uppercase;"></div></div></div>`;
}
function dchtOpenDocTab(d) {
    const html = '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Mẫu 39/BTNN - Xem văn bản</title><style>body{background:#e2e8f0;margin:0;padding:24px;}' +
        '.page{width:794px;min-height:1123px;margin:0 auto;background:#fff;padding:50px 65px;box-sizing:border-box;font-family:"Times New Roman",serif;font-size:14px;line-height:1.6;color:#111827;}' +
        '</style></head><body><div class="page">' + dchtDocHtml(d).replace('<div id="dchtA4SignerName"', '<div') + '</div></body></html>';
    try { window.open(URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' })), '_blank'); }
    catch (e) { dchtToast('Không mở được văn bản.', 'warning'); }
}
function dchtPreviewDoc() { dchtOpenDocTab(dchtCollectDoc()); }

// ---------------- Chuyển bước ----------------
function dchtGoStep1() {
    dchtState.step = 1;
    const c = dchtEl('dchtContainer'); if (c) { c.style.width = '960px'; c.style.maxWidth = '96%'; c.style.height = 'auto'; }
    dchtEl('dchtStep1Tab').className = 'ktl-step-tab active';
    dchtEl('dchtStep1Badge').innerHTML = '1';
    dchtEl('dchtStep2Tab').className = 'ktl-step-tab';
    dchtEl('dchtStep1Body').style.display = 'block';
    dchtEl('dchtStep2Body').style.display = 'none';
    const off = dchtState.method === 'offline';
    dchtEl('dchtBtnNext').style.display = off ? 'none' : 'inline-flex';
    dchtEl('dchtBtnIssue').style.display = off ? 'inline-flex' : 'none';
    dchtEl('dchtBtnBack').style.display = 'none';
    dchtEl('dchtBtnSubmit').style.display = 'none';
}
function dchtGoStep2() {
    if (dchtState.method !== 'online' || dchtState.step === 2) return;
    if (dchtState.converting) { dchtToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    if (!dchtValidateStep1()) return;
    const page = dchtEl('dchtA4Page');
    page.innerHTML = dchtState.docSrc === 'gen' ? dchtDocHtml(dchtCollectDoc()) : dchtUploadDocHtml();
    dchtState.step = 2;
    const c = dchtEl('dchtContainer'); if (c) { c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh'; }
    dchtEl('dchtStep1Tab').className = 'ktl-step-tab completed';
    dchtEl('dchtStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    dchtEl('dchtStep2Tab').className = 'ktl-step-tab active';
    dchtEl('dchtStep1Body').style.display = 'none';
    dchtEl('dchtStep2Body').style.display = 'flex';
    dchtEl('dchtBtnNext').style.display = 'none';
    dchtEl('dchtBtnIssue').style.display = 'none';
    dchtEl('dchtBtnBack').style.display = 'inline-flex';
    dchtEl('dchtBtnSubmit').style.display = 'inline-flex';
    dchtSignRefresh();
}

// ---------------- Bước 2: Kéo ô ký & chọn Lãnh đạo ----------------
function dchtSignIsLast(i) { return i === dchtSign.levels.length - 1; }
function dchtSignDefault(i) {
    const last = dchtSignIsLast(i);
    const sz = DCHT_SIGN_SIZES[last ? 'so' : 'nhay'][1];
    return last ? { x: 480, y: 900, w: sz[0], h: sz[1] } : { x: 60, y: Math.max(600, 900 - i * 100), w: sz[0], h: sz[1] };
}
function dchtSignCardHtml(lv, i, n, prevId) {
    const last = i === n - 1;
    const color = last ? '#b91c1c' : '#1d4ed8';
    const sz = DCHT_SIGN_SIZES[last ? 'so' : 'nhay'];
    const ids = lv.leaders.map(l => l.id);
    const sel = prevId && ids.includes(prevId) ? prevId : (ids[0] || '');
    const opts = lv.leaders.map(l => `<option value="${dchtE(l.id)}" ${l.id === sel ? 'selected' : ''}>${dchtE(l.label)}</option>`).join('');
    const mini = 'font-size:10px; padding:1px 6px;';
    return `<div style="background:#fff; border:1px solid ${last ? '#fecaca' : '#bfdbfe'}; border-left:4px solid ${color}; border-radius:8px; padding:12px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
            <span style="font-size:12.5px; font-weight:700; color:${color};">Cấp ${i + 1} - ${dchtE(lv.unit)}</span>
            ${lv.kyNhay ? '<span class="badge" style="background:#dbeafe; color:#1e40af; font-size:10.5px; white-space:nowrap;">Ký nháy</span>' : ''}
        </div>
        <div style="margin-bottom:8px;">
            <select id="dchtSignLeader${i}" class="form-control" style="font-size:13px; height:36px; width:100%;" onchange="dchtClearErr('dchtSignLeader${i}'); dchtSignSyncNames()" ${lv.leaders.length ? '' : 'disabled'}><option value="">${lv.leaders.length ? '-- Chọn Lãnh đạo --' : 'Cấp này chưa cấu hình nhóm lãnh đạo'}</option>${opts}</select>
            <div id="dchtSignLeader${i}Err" class="gqx-err">${DCHT_REQ_MSG}</div>
        </div>
        ${i === 0 && !last ? `<label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:12.5px; color:#1e40af; margin:0 0 6px 0;"><input type="checkbox" id="dchtSignNhay" checked onchange="dchtSign.enableNhay = this.checked; dchtSignRefresh();"><span>Áp dụng ký nháy Lãnh đạo cấp 1</span></label>` : ''}
        <button type="button" class="btn btn-secondary btn-sm" id="dchtSignPlace${i}" onclick="dchtSignPlace(${i})" style="font-size:12px;"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button>
        <div id="dchtSignCtrls${i}" style="display:none;">
            <div style="font-size:11px; color:#94a3b8; margin-bottom:6px;" id="dchtSignCoord${i}"></div>
            <div style="display:flex; gap:4px; align-items:center; flex-wrap:wrap;">
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="dchtSignResize(${i}, ${sz[0][0]}, ${sz[0][1]})">Nhỏ</button>
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="dchtSignResize(${i}, ${sz[1][0]}, ${sz[1][1]})">Vừa</button>
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="dchtSignResize(${i}, ${sz[2][0]}, ${sz[2][1]})">Lớn</button>
                <button type="button" class="btn btn-secondary btn-sm" style="${mini}" onclick="dchtSignReset(${i})"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button>
            </div>
        </div>
    </div>`;
}
function dchtSignInit(prevAssignees) {
    const levels = typeof tlhdLevels === 'function' ? tlhdLevels() : [];
    dchtSign.levels = levels; dchtSign.placed = {}; dchtSign.coords = {}; dchtSign.enableNhay = true;
    levels.forEach((lv, i) => { dchtSign.coords[i] = dchtSignDefault(i); });
    const prev = Array.isArray(prevAssignees) ? prevAssignees : [];
    const host = dchtEl('dchtSignLevels');
    if (host) host.innerHTML = levels.map((lv, i) => dchtSignCardHtml(lv, i, levels.length, prev[i])).join('');
}
function dchtSignEnsureBox(i) {
    const page = dchtEl('dchtA4Page'); if (!page) return null;
    let box = dchtEl('dchtSignBox' + i); if (box) return box;
    const last = dchtSignIsLast(i);
    box = document.createElement('div');
    box.id = 'dchtSignBox' + i;
    box.className = 'sig-drag-box gq-sign-box';
    box.style.cssText = last ? 'border:2px dashed #dc2626; background:rgba(254,242,242,0.94); z-index:10;' : 'border:2px dashed #2563eb; background:rgba(239,246,255,0.94); z-index:10;';
    box.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:10.5px; font-weight:700; color:${last ? '#991b1b' : '#1e40af'};"><i class="fa-solid ${last ? 'fa-stamp' : 'fa-pen-nib'}"></i> ${last ? 'KÝ SỐ &amp; CON DẤU' : 'KÝ NHÁY'}</span><span class="badge" style="background:${last ? '#dc2626' : '#2563eb'}; color:#fff; font-size:9.5px; padding:1px 5px;">Cấp ${i + 1}</span></div>
        <div style="text-align:center; font-weight:700; color:#1e293b; font-size:12px;" id="dchtSignBoxName${i}"></div>
        <div style="display:flex; justify-content:space-between; font-size:10px; color:#64748b;"><span>${last ? 'Chữ ký số &amp; Con dấu' : 'Chữ ký nháy'}</span><span id="dchtSignBoxXY${i}"></span></div>
        <div class="sig-resize-handle" title="Kéo chuột để co giãn khung chữ ký"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>`;
    page.appendChild(box);
    box.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        e.preventDefault(); e.stopPropagation();
        const c = dchtSign.coords[i];
        const resize = !!(e.target.closest && e.target.closest('.sig-resize-handle'));
        const sx = e.clientX, sy = e.clientY, ox = c.x, oy = c.y, ow = c.w, oh = c.h;
        box.classList.add('dragging');
        const move = ev => {
            if (resize) { c.w = Math.max(140, Math.round(ow + ev.clientX - sx)); c.h = Math.max(55, Math.round(oh + ev.clientY - sy)); }
            else { c.x = Math.max(0, Math.min(Math.round(ox + ev.clientX - sx), page.clientWidth - c.w)); c.y = Math.max(0, Math.min(Math.round(oy + ev.clientY - sy), page.clientHeight - c.h)); }
            dchtSignApply(i);
        };
        const up = () => { box.classList.remove('dragging'); document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    });
    return box;
}
function dchtSignApply(i) {
    const c = dchtSign.coords && dchtSign.coords[i]; if (!c) return;
    const box = dchtEl('dchtSignBox' + i);
    if (box) { box.style.left = c.x + 'px'; box.style.top = c.y + 'px'; box.style.width = c.w + 'px'; box.style.height = c.h + 'px'; }
    const xy = dchtEl('dchtSignBoxXY' + i); if (xy) xy.textContent = `X: ${c.x}, Y: ${c.y}`;
    const pn = dchtEl('dchtSignCoord' + i); if (pn) pn.textContent = `Trang 1 • Tọa độ: (${c.x}, ${c.y}) • Cỡ: ${c.w} x ${c.h} px`;
}
function dchtSignRefresh() {
    const st = dchtSign; if (!st.levels) return;
    st.levels.forEach((lv, i) => {
        const nhayOff = i === 0 && st.levels.length > 1 && !st.enableNhay;
        const on = !!st.placed[i] && !nhayOff;
        let box = dchtEl('dchtSignBox' + i);
        if (on && !box) box = dchtSignEnsureBox(i);
        if (box) box.style.display = on ? 'flex' : 'none';
        const ctr = dchtEl('dchtSignCtrls' + i); if (ctr) ctr.style.display = on ? 'block' : 'none';
        const btn = dchtEl('dchtSignPlace' + i); if (btn) btn.style.display = (on || nhayOff) ? 'none' : '';
        if (on) dchtSignApply(i);
    });
    dchtSignSyncNames();
}
function dchtSignPlace(i) { dchtSign.placed[i] = true; dchtSignRefresh(); const b = dchtEl('dchtSignBox' + i); if (b && b.scrollIntoView) b.scrollIntoView({ block: 'center' }); }
function dchtSignResize(i, w, h) { const c = dchtSign.coords[i]; if (!c) return; c.w = w; c.h = h; dchtSignApply(i); }
function dchtSignReset(i) { dchtSign.coords[i] = dchtSignDefault(i); dchtSignApply(i); }
function dchtSignLeaderText(i) { const s = dchtEl('dchtSignLeader' + i); return s && s.value && s.selectedIndex >= 0 ? s.options[s.selectedIndex].text : ''; }
function dchtSignSyncNames() {
    const st = dchtSign; if (!st.levels) return;
    st.levels.forEach((lv, i) => { const el = dchtEl('dchtSignBoxName' + i); if (el) el.textContent = dchtSignLeaderText(i).split(' - ')[0].trim() || ('Cấp ' + (i + 1)); });
    const nm = dchtEl('dchtA4SignerName'); if (nm) nm.textContent = (dchtSignLeaderText(st.levels.length - 1).split(' - ')[0] || '').trim().toUpperCase();
}
function dchtSignCollect() {
    const st = dchtSign; let first = null;
    const assignees = st.levels.map((lv, i) => {
        const s = dchtEl('dchtSignLeader' + i); const v = s ? s.value : '';
        const bad = lv.leaders.length > 0 && !v;
        if (s) s.classList.toggle('is-invalid', bad);
        const er = dchtEl('dchtSignLeader' + i + 'Err'); if (er) er.style.display = bad ? 'block' : 'none';
        if (bad && !first) first = s;
        return v;
    });
    const ct = dchtEl('dchtSignContent'); const content = ct ? ct.value.trim() : '';
    if (ct) ct.classList.toggle('is-invalid', !content);
    const ce = dchtEl('dchtSignContentErr'); if (ce) ce.style.display = content ? 'none' : 'block';
    if (!content && !first) first = ct;
    if (first) { if (first.focus) first.focus(); return null; }
    const coords = st.levels.map((lv, i) => Object.assign({ level: i + 1, unitId: lv.unitId, placed: !!st.placed[i] && !(i === 0 && st.levels.length > 1 && !st.enableNhay) }, st.coords[i]));
    return { assignees, content, enableNhay: st.enableNhay, coords };
}
function dchtLeaderLabel(a, i) { const lv = a.levels[i]; if (!lv) return ''; const l = lv.leaders.find(x => x.id === a.assignees[i]); return l ? l.label : ''; }

// ---------------- Trình Lãnh đạo / Ban hành văn bản (Ký ngoài) ----------------
function dchtLog(text) {
    if (!activeDossier.timeline) activeDossier.timeline = [];
    activeDossier.timeline.unshift({ time: dchtNow(), text });
}
function dchtAfter() {
    if (typeof renderStateLayout === 'function') renderStateLayout();
    else if (typeof renderPageHeaderActions === 'function') renderPageHeaderActions();
}
function dchtSubmitOnline() {
    const sign = dchtSignCollect(); if (!sign) return;
    const gen = dchtState.docSrc === 'gen';
    const d = dchtCollectDoc();
    const f = dchtState.onlineFile;
    const prevStatus = activeDossier.status === DCHT_ST_REJECTED && activeDossier.dcht ? activeDossier.dcht.prevStatus : activeDossier.status;
    const keepId = !gen && f ? (f.keepId || (typeof tlktKeep === 'function' ? tlktKeep(f.raw) : '')) : '';
    activeDossier.dcht = Object.assign({ method: 'online', docSrc: dchtState.docSrc, prevStatus }, d, {
        fileName: gen ? dchtFileBase() + '.docx' : f.name,
        uploadMeta: gen ? null : { name: f.name, size: f.size, note: f.note || '', keepId },
        attachments: typeof tlktGet === 'function' ? tlktGet('dcht') : [],
        levels: dchtSign.levels, assignees: sign.assignees, coords: sign.coords, enableNhay: sign.enableNhay, content: sign.content, level: 0,
        submittedAt: dchtNow(), returned: null
    });
    activeDossier.status = DCHT_ST_PENDING;
    const lead1 = dchtLeaderLabel(activeDossier.dcht, 0) || 'Lãnh đạo cấp 1';
    dchtLog(`Trình Lãnh đạo ${lead1} ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả (Mẫu 39/BTNN).` + (typeof tlktNote === 'function' ? tlktNote(activeDossier.dcht.attachments) : ''));
    dchtClose();
    dchtToast(`Đã trình Lãnh đạo ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả. Hồ sơ chuyển sang trạng thái [Chờ duyệt (QĐ đình chỉ)].`, 'success');
    dchtAfter();
}
function dchtSubmitOffline() {
    if (!dchtState.offlineFile) {
        const e = dchtEl('dchtOfflineFileErr'); e.textContent = DCHT_OFF_FILE_MSG; e.style.display = 'block';
        const dz = dchtEl('dchtOfflineDrop'); if (dz) { dz.classList.add('is-error'); dz.focus(); }
        return;
    }
    const msg = `Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Hồ sơ sẽ chuyển sang trạng thái "${DCHT_ST_DONE}". Bạn có chắc chắn muốn ban hành văn bản?`;
    if (typeof tlhdConfirmIssue === 'function') tlhdConfirmIssue(msg, dchtIssueOffline); else if (window.confirm(msg)) dchtIssueOffline();
}
function dchtIssueOffline() {
    if (!dchtState.offlineFile) return;
    const prevStatus = activeDossier.status === DCHT_ST_REJECTED && activeDossier.dcht ? activeDossier.dcht.prevStatus : activeDossier.status;
    activeDossier.dcht = { method: 'offline', prevStatus, fileName: dchtState.offlineFile.name, offFile: dchtState.offlineFile, issuedAt: dchtNow(), attachments: typeof tlktGet === 'function' ? tlktGet('dcht') : [], levels: [], assignees: [], level: 0 };
    activeDossier.status = DCHT_ST_DONE;
    dchtLog(`Ban hành Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả ký ngoài hệ thống (tệp ${dchtState.offlineFile.name}). Hồ sơ chuyển sang trạng thái [${DCHT_ST_DONE}].`);
    dchtClose();
    dchtToast(`Đã ban hành Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả (Ký ngoài). Hồ sơ chuyển sang trạng thái [${DCHT_ST_DONE}].`, 'success');
    dchtAfter();
}

// ---------------- Lãnh đạo được giao: Ký duyệt / Từ chối ----------------
// Tái dùng màn Ký duyệt (leaderSignApprovalModal) và Từ chối (rejectReasonModal) sẵn có của Quyết định hoàn trả (target 'dcht')
function dchtCanAct() {
    if (typeof currentPerspective === 'undefined' || currentPerspective !== 'leader') return false;
    const a = activeDossier && activeDossier.dcht;
    if (!a || activeDossier.status !== DCHT_ST_PENDING || !a.levels || !a.levels.length) return false;
    const me = typeof tlhdMe === 'function' ? tlhdMe(a) : a.assignees[a.level];
    const assignee = a.assignees[a.level];
    return !assignee || assignee === me;
}
function dchtLeaderApprove() {
    const a = activeDossier.dcht;
    if (!dchtCanAct()) { dchtToast('Chỉ Lãnh đạo được giao mới được Ký duyệt Quyết định đình chỉ.', 'warning'); return; }
    // Mọi cấp: màn Ký duyệt dùng chung (xem văn bản trình ký); cấp trước -> dchtApproveLevel, cấp cuối -> dchtFinalSign
    if (typeof openLeaderSignModal === 'function') { openLeaderSignModal('dcht'); return; }
    if (!dchtApproveLevel()) dchtFinalSign();
}
// Lãnh đạo cấp trước ký duyệt (ký nháy): chuyển Lãnh đạo cấp tiếp theo. Trả về false khi đang ở cấp cuối.
function dchtApproveLevel() {
    const a = activeDossier && activeDossier.dcht;
    if (!a || !a.levels || a.level >= a.levels.length - 1) return false;
    const who = dchtLeaderLabel(a, a.level) || ('Lãnh đạo cấp ' + (a.level + 1));
    a.level += 1;
    dchtLog(`Lãnh đạo ${who} ký duyệt (ký nháy) Quyết định đình chỉ, chuyển Lãnh đạo cấp tiếp theo.`);
    dchtToast('Ký duyệt thành công. Quyết định đình chỉ được chuyển Lãnh đạo cấp tiếp theo.', 'success');
    dchtAfter();
    return true;
}
// Cấp cuối ký số xong (màn Ký duyệt dùng chung): hồ sơ chuyển Đình chỉ xem xét hoàn trả
function dchtFinalSign() {
    const a = activeDossier.dcht; if (!a) return;
    const who = dchtLeaderLabel(a, a.level) || ('Lãnh đạo cấp ' + (a.level + 1));
    a.signedAt = dchtNow();
    a.level = a.levels.length;
    activeDossier.status = DCHT_ST_DONE;
    dchtLog(`Lãnh đạo ${who} ký duyệt (ký số) Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả. Hồ sơ chuyển sang trạng thái [${DCHT_ST_DONE}].`);
    dchtToast(`Ký duyệt thành công. Hệ thống ký số Quyết định đình chỉ; hồ sơ chuyển sang trạng thái [${DCHT_ST_DONE}].`, 'success');
    dchtAfter();
}
function dchtLeaderReject() {
    if (!dchtCanAct()) { dchtToast('Chỉ Lãnh đạo được giao mới được Từ chối Quyết định đình chỉ.', 'warning'); return; }
    if (typeof openRejectReasonModal !== 'function') return;
    openRejectReasonModal('dcht');
    const t = dchtEl('rejectTlkt');
    if (t) t.innerHTML = typeof tlktViewHtml === 'function' ? tlktViewHtml(activeDossier.dcht.attachments) : '';
}
// Từ chối (màn Từ chối dùng chung): hồ sơ chuyển Bị từ chối QĐ đình chỉ, giữ dữ liệu lần trình để trình lại
function dchtApplyReject(reason) {
    const a = activeDossier.dcht; if (!a) return;
    const who = dchtLeaderLabel(a, a.level) || ('Lãnh đạo cấp ' + (a.level + 1));
    a.returned = { reason, by: who, at: dchtNow() };
    a.level = 0;
    activeDossier.status = DCHT_ST_REJECTED;
    dchtLog(`Lãnh đạo ${who} từ chối Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả. Lý do: ${reason}`);
    dchtToast(`Đã từ chối Quyết định đình chỉ. Hồ sơ chuyển sang trạng thái [Bị từ chối (QĐ đình chỉ)].`, 'success');
    dchtAfter();
}

// ---------------- Khối Quyết định đình chỉ trên màn hình chi tiết ----------------
function dchtViewDoc() {
    const a = activeDossier && activeDossier.dcht; if (!a) return;
    if (a.method === 'offline') { if (typeof btnnOpenUploadedFile === 'function') btnnOpenUploadedFile(a.offFile); return; }
    if (a.docSrc === 'upload') {
        const raw = a.uploadMeta && typeof tlktBlob === 'function' ? tlktBlob(a.uploadMeta.keepId) : null;
        if (typeof btnnOpenUploadedFile === 'function') btnnOpenUploadedFile({ name: a.fileName, raw });
        return;
    }
    dchtOpenDocTab(a);
}
function dchtRenderInfoCard() {
    const tracker = document.querySelector('.progress-tracker');
    let card = dchtEl('dchtInfoCard');
    const a = activeDossier && activeDossier.dcht;
    if (!a || !dchtIsDchtStatus(activeDossier.status)) { if (card) card.style.display = 'none'; return; }
    dchtInjectCss();
    if (!card) {
        if (!tracker) return;
        tracker.insertAdjacentHTML('beforebegin', '<div class="card" id="dchtInfoCard"></div>');
        card = dchtEl('dchtInfoCard');
    }
    const it = (k, v) => `<div><div class="dcht-k">${k}</div><div class="dcht-v">${v}</div></div>`;
    const pending = activeDossier.status === DCHT_ST_PENDING;
    const lead = pending && a.levels && a.levels.length ? `Cấp ${a.level + 1}/${a.levels.length} - ${dchtE(a.levels[a.level].unit)}: ${dchtE(dchtLeaderLabel(a, a.level) || '--')}` : '';
    let html = `<div class="card-header"><div class="card-title" style="margin-bottom:0; color:#b91c1c;"><i class="fa-solid fa-circle-stop"></i> Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả</div></div><div class="card-body"><div class="dcht-grid">`
        + it('Hình thức ký', a.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống')
        + it('Trạng thái hồ sơ', htStBadgeHtml(activeDossier.status))
        + it('Văn bản', `<a href="javascript:void(0)" onclick="dchtViewDoc()" style="color:#2563eb;">${dchtE(a.fileName || '')}</a>`)
        + (a.method === 'online' && a.docSrc === 'gen' ? it('Số, ký hiệu văn bản', dchtE(a.so || '--')) + it('Ngày văn bản', dchtE(a.ngay || '--')) : '')
        + (lead ? it('Lãnh đạo được giao ký duyệt', lead) : '')
        + (a.returned && activeDossier.status === DCHT_ST_REJECTED ? it('Lý do từ chối', dchtE(a.returned.reason) + `<div class="dcht-k" style="margin-top:2px;">${dchtE(a.returned.by)} • ${dchtE(a.returned.at)}</div>`) : '')
        + `</div>`;
    if (a.attachments && a.attachments.length && typeof tlktViewHtml === 'function') html += `<div style="margin-top:14px;">${tlktViewHtml(a.attachments)}</div>`;
    html += '</div>';
    card.innerHTML = html;
    card.style.display = '';
}

// ---------------- Gắn vào trang: trạng thái, thanh nút, khối thông tin ----------------
function dchtFooterButtons() {
    const st = activeDossier ? activeDossier.status : '';
    if (typeof currentPerspective !== 'undefined' && currentPerspective === 'leader') {
        return st === DCHT_ST_PENDING && dchtCanAct()
            ? (typeof htkdBarButtons === 'function' ? htkdBarButtons('dchtLeaderReject()', 'dchtLeaderApprove()') : '')
            : '';
    }
    if (st === DCHT_ST_REJECTED) return `<button type="button" class="btn btn-primary" onclick="dchtOpenModal()"><i class="fa-solid fa-paper-plane"></i> Trình ký lại</button>`;
    if (DCHT_ALLOWED.indexOf(st) >= 0) return `<button type="button" class="btn btn-danger" onclick="dchtOpenModal()" title="Đình chỉ việc xem xét trách nhiệm hoàn trả (Mẫu 39/BTNN)"><i class="fa-solid fa-circle-stop"></i> Đình chỉ</button>`;
    return '';
}
(function () {
    const wrap = (name, fn) => { const orig = window[name]; if (typeof orig === 'function') window[name] = fn(orig); };
    // Trạng thái Đình chỉ: tiến trình giữ theo bước trước khi đình chỉ
    wrap('getCurrentWorkflowStep', orig => function () {
        const a = activeDossier && activeDossier.dcht;
        if (a && a.prevStatus && dchtIsDchtStatus(activeDossier.status)) {
            const s = activeDossier.status; activeDossier.status = a.prevStatus;
            try { return orig.apply(this, arguments); } finally { activeDossier.status = s; }
        }
        return orig.apply(this, arguments);
    });
    wrap('isReadonlyStep', orig => function () {
        if (activeDossier && (activeDossier.status === DCHT_ST_PENDING || activeDossier.status === DCHT_ST_DONE)) return true;
        return orig.apply(this, arguments);
    });
    // Badge trạng thái hồ sơ: 9 trạng thái hiển thị, Chờ duyệt / Bị từ chối kèm nhãn Loại trình
    wrap('getDossierStatusBadge', orig => function (status) { return htStBadgeHtml(status); });
    // Thanh nút: thêm Đình chỉ / Trình ký lại (Cán bộ xử lý), Ký duyệt / Từ chối (Lãnh đạo được giao) trước nút Đóng
    wrap('renderPageHeaderActions', orig => function () {
        const r = orig.apply(this, arguments);
        try {
            const box = dchtEl('stickyFooterActionsContainer');
            const html = activeDossier ? dchtFooterButtons() : '';
            if (box && html) box.insertAdjacentHTML('afterbegin', html);
        } catch (e) { /* bỏ qua */ }
        return r;
    });
    // Màn Ký duyệt / Từ chối dùng chung với Quyết định hoàn trả: nội dung văn bản Quyết định đình chỉ khi target 'dcht'
    wrap('openLeaderSignModal', orig => function (target) {
        const r = orig.apply(this, arguments);
        if (target === 'dcht' && activeDossier && activeDossier.dcht) {
            const a = activeDossier.dcht;
            const t = dchtEl('m20DocTitle'); if (t) t.innerText = 'Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả (Mẫu số 39/BTNN)';
            const s = dchtEl('m20Summary'); if (s) s.innerText = a.content || DCHT_SIGN_CONTENT_DEFAULT;
            const k = dchtEl('m20Tlkt'); if (k) k.innerHTML = typeof tlktViewHtml === 'function' ? tlktViewHtml(a.attachments) : '';
        }
        return r;
    });
    wrap('openPreviewFromLeaderModal', orig => function () {
        if (typeof pendingLeaderSignTarget !== 'undefined' && pendingLeaderSignTarget === 'dcht') { dchtViewDoc(); return; }
        return orig.apply(this, arguments);
    });
    wrap('confirmLeaderDigitalSign', orig => function () {
        if (typeof pendingLeaderSignTarget === 'undefined' || pendingLeaderSignTarget !== 'dcht') return orig.apply(this, arguments);
        if (typeof closeLeaderSignModal === 'function') closeLeaderSignModal();
        if (!dchtApproveLevel()) dchtFinalSign();
    });
    wrap('submitRejectReason', orig => function () {
        if (typeof pendingRejectTarget === 'undefined' || pendingRejectTarget !== 'dcht') return orig.apply(this, arguments);
        const input = dchtEl('rejectReasonInput'), err = dchtEl('rejectReasonError');
        const reason = input ? input.value.trim() : '';
        if (!reason) { if (input) { input.classList.add('is-invalid'); input.focus(); } if (err) err.style.display = 'block'; return; }
        if (typeof closeRejectReasonModal === 'function') closeRejectReasonModal();
        dchtApplyReject(reason);
    });
    wrap('renderStateLayout', orig => function () {
        // Chuẩn hóa trạng thái hồ sơ (dữ liệu cũ / tên mới kèm Loại trình) về mã nội bộ trước khi hiển thị
        try { if (activeDossier) htStNormalize(activeDossier); } catch (e) { /* bỏ qua */ }
        const r = orig.apply(this, arguments);
        try { dchtRenderInfoCard(); } catch (e) { /* bỏ qua */ }
        return r;
    });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', dchtEnsureModal);
    else dchtEnsureModal();
})();
