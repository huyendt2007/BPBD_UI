/* nhan_du_lieu_bpbd.js - MH01 Danh sách dữ liệu đã nhận (04 tab theo Loại tài sản), MH02 Popup Nhận dữ liệu từ Excel */
const TYPE = NDL.typeFromUrl();
const T = NDL.TYPES[TYPE];
const { LDK } = NDL;
let st = NDL.load();
let filtered = [];
let page = 1;
const PAGE_SIZE = 10;
const selected = new Set(); // Mã bản ghi đang chọn để hủy nhiều bản ghi

// ---------- Khởi tạo ----------
document.title = 'Nhận dữ liệu BPBĐ - ' + T.label;
renderTypeTabs();
document.getElementById('impTemplateLink').href = NDL.templatePath(TYPE);
document.getElementById('fTSLabel').textContent = T.assetFilterLabel;
document.getElementById('fTS').placeholder = T.assetFilterPh;
// Loại tài sản có bộ lọc tài sản tách riêng từng trường: ẩn ô tìm gộp, thêm các ô lọc riêng
const AF = T.assetFilters || [];
if (AF.length) {
    const g = document.getElementById('fTS').closest('.form-group');
    g.insertAdjacentHTML('afterend', AF.map(a => `<div class="form-group"><label class="form-label" for="fA_${a.k}">${NDL.esc(a.label)}</label><input id="fA_${a.k}" class="form-control" placeholder="${NDL.esc(a.ph)}"></div>`).join(''));
    g.style.display = 'none';
}
const AF_IDS = AF.map(a => 'fA_' + a.k);
fillSelect('fLoaiDK', ['Tất cả'].concat(NDL.lists(TYPE).LOAI_DK || [LDK.LAN_DAU]), true);
// Biểu mẫu không có cột Loại đăng ký: ẩn bộ lọc Loại đăng ký
if (!NDL.hasCol(TYPE, 'HO_SO', 'loaiDK')) document.getElementById('fLoaiDK').closest('.form-group').style.display = 'none';
// Bộ lọc Cơ quan đăng ký theo cấu hình cơ quan đăng ký của Loại tài sản
fillSelect('fCoQuan', ['Tất cả'].concat(NDL.agencies(st, TYPE)), true);
applyFilter();

function fillSelect(id, values, firstEmpty) {
    document.getElementById(id).innerHTML = values.map((v, i) => `<option value="${i === 0 && firstEmpty ? '' : NDL.esc(v)}">${NDL.esc(v)}</option>`).join('');
}
/** 04 tab theo Loại tài sản (không icon, không badge) */
function renderTypeTabs() {
    document.getElementById('typeTabs').innerHTML = Object.keys(NDL.TYPES).map(k =>
        `<div class="nav-tab ${k === TYPE ? 'active' : ''}" onclick="location.href='nhan_du_lieu_bpbd.html?loai=${k}'">${NDL.esc(NDL.TYPES[k].label)}</div>`
    ).join('');
}
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function openModal(id) { document.getElementById(id).classList.add('active'); }
function goAdd() { location.href = `nhan_du_lieu_bpbd_form.html?loai=${TYPE}&mode=add`; }
function goDetail(id) { location.href = `nhan_du_lieu_bpbd_chi_tiet.html?loai=${TYPE}&id=${id}`; }
function goEdit(id) { location.href = `nhan_du_lieu_bpbd_form.html?loai=${TYPE}&mode=edit&id=${id}`; }

// ---------- MH01: Tìm kiếm ----------
function val(id) { return document.getElementById(id).value.trim(); }
function inRange(dt, from, to) {
    if (!dt) return !from && !to;
    const d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    if (from && d < new Date(from + 'T00:00:00')) return false;
    if (to && d > new Date(to + 'T00:00:00')) return false;
    return true;
}
function partyText(rows) { return rows.map(r => r.ten + ' ' + r.soGT).join(' '); }
function applyFilter() {
    const f = {
        soDK: NDL.norm(val('fSoDK')), loaiDK: val('fLoaiDK'), coQuan: val('fCoQuan'), bbd: NDL.norm(val('fBBD')), bnbd: NDL.norm(val('fBNBD')),
        ts: NDL.norm(val('fTS')), dkTu: val('fDKTu'), dkDen: val('fDKDen'),
        nguon: val('fNguon'), lo: NDL.norm(val('fLo')), trangThai: val('fTrangThai')
    };
    if (f.dkTu && f.dkDen && f.dkTu > f.dkDen) {
        NDL.toast('"Từ ngày" phải nhỏ hơn hoặc bằng "Đến ngày".', 'error'); return;
    }
    filtered = st.records.filter(r => r.loai === TYPE).filter(r => {
        if (f.soDK && NDL.norm(r.hs.soDK + ' ' + r.hs.soDKLD).indexOf(f.soDK) < 0) return false;
        if (f.loaiDK && NDL.loaiDK(r.hs) !== f.loaiDK) return false;
        if (f.coQuan && r.coQuan !== f.coQuan) return false;
        if (f.bbd && NDL.norm(partyText(r.bbd)).indexOf(f.bbd) < 0) return false;
        if (f.bnbd && NDL.norm(partyText(r.bnbd)).indexOf(f.bnbd) < 0) return false;
        if (f.ts && NDL.norm(r.ts.map(T.search).join(' ')).indexOf(f.ts) < 0) return false;
        // Mỗi ô lọc tài sản riêng: khớp gần đúng với trường tương ứng của bất kỳ tài sản nào của bản ghi
        if (AF.some(a => { const q = NDL.norm(val('fA_' + a.k)); return q && !r.ts.some(o => NDL.norm(o[a.k]).indexOf(q) >= 0); })) return false;
        if ((f.dkTu || f.dkDen) && !inRange(NDL.parseDT(r.hs.thoiDiem), f.dkTu, f.dkDen)) return false;
        if (f.nguon && r.nguon !== f.nguon) return false;
        if (f.lo && NDL.norm(r.loId).indexOf(f.lo) < 0) return false;
        if (f.trangThai && r.trangThai !== f.trangThai) return false;
        return true;
    }).sort((a, b) => (NDL.parseDT(b.ngayNhan) - NDL.parseDT(a.ngayNhan)) || (NDL.parseDT(b.hs.thoiDiem) - NDL.parseDT(a.hs.thoiDiem)));
    page = 1;
    selected.clear();
    renderRecords();
}
function resetFilter() {
    ['fSoDK', 'fBBD', 'fBNBD', 'fTS', 'fDKTu', 'fDKDen', 'fLo'].concat(AF_IDS).forEach(id => { document.getElementById(id).value = ''; });
    ['fLoaiDK', 'fCoQuan', 'fNguon'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('fTrangThai').value = 'Hiệu lực';
    applyFilter();
}
function partyCell(rows) {
    if (!rows.length) return '<span class="muted-sm">-</span>';
    const first = NDL.esc(rows[0].ten);
    return first + (rows.length > 1 ? ` <span class="muted-sm">(+${rows.length - 1})</span>` : '');
}
function renderRecords() {
    document.getElementById('recCount').textContent = `${filtered.length} bản ghi`;
    const body = document.getElementById('recBody');
    const start = (page - 1) * PAGE_SIZE;
    const rows = filtered.slice(start, start + PAGE_SIZE);
    if (!rows.length) {
        body.innerHTML = '<tr class="empty-row"><td colspan="13">Không có dữ liệu phù hợp với điều kiện tìm kiếm.</td></tr>'; // 13 cột gồm cột chọn
    } else {
        body.innerHTML = rows.map((r, i) => {
            const w = NDL.warnings(st, r);
            const cancelled = r.trangThai === 'Đã hủy';
            const ts = r.ts.length ? NDL.esc(T.summary(r.ts[0])) + (r.ts.length > 1 ? ` <span class="muted-sm">(+${r.ts.length - 1} tài sản)</span>` : '') : '<span class="muted-sm">-</span>';
            const btnEdit = cancelled
                ? `<button class="icon-btn edit" title="Bản ghi đã hủy không thể chỉnh sửa" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-solid fa-pen"></i></button>`
                : `<button class="icon-btn edit" title="Chỉnh sửa" onclick="goEdit('${r.id}')"><i class="fa-solid fa-pen"></i></button>`;
            const btnDelete = cancelled
                ? `<button class="icon-btn delete" title="Bản ghi đã ở trạng thái hủy" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-solid fa-ban"></i></button>`
                : `<button class="icon-btn delete" title="Hủy bản ghi" onclick="askCancelRecord('${r.id}')"><i class="fa-solid fa-ban"></i></button>`;

            return `<tr class="clickable ${cancelled ? 'row-cancelled' : ''}" title="Nhấn vào dòng để xem chi tiết" onclick="goDetail('${r.id}')">
                <td class="col-chk" onclick="event.stopPropagation()"><input type="checkbox" ${cancelled ? 'disabled title="Bản ghi đã hủy"' : ''} ${selected.has(r.id) ? 'checked' : ''} onchange="toggleSel('${r.id}', this.checked)"></td>
                <td>${start + i + 1}</td>
                <td class="cell-sodk"><a class="link-code">${NDL.esc(r.hs.soDK)}</a>${w.length ? `<i class="fa-solid fa-triangle-exclamation ndl-warn-ic" title="${NDL.esc(w.join('\n'))}"></i>` : ''}
                    ${NDL.loaiDK(r.hs) !== LDK.LAN_DAU ? `<div class="muted-sm">Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp: ${NDL.esc(r.hs.soDKLD)}</div>` : ''}</td>
                <td>${NDL.loaiDKBadge(NDL.loaiDK(r.hs))}</td>
                <td style="white-space:nowrap">${NDL.esc(r.hs.thoiDiem)}</td>
                <td style="min-width:180px">${NDL.esc(r.coQuan)}</td>
                <td class="cell-party">${partyCell(r.bbd)}</td>
                <td class="cell-party">${partyCell(r.bnbd)}</td>
                <td class="cell-asset">${ts}</td>
                <td style="white-space:nowrap">${NDL.esc(r.nguon)}${r.loId ? `<div class="muted-sm">${NDL.esc(r.loId)}</div>` : ''}</td>
                <td style="white-space:nowrap">${NDL.esc(r.ngayNhan)}</td>
                <td>${NDL.statusBadge(r.trangThai)}</td>
                <td class="col-actions" onclick="event.stopPropagation()">
                    ${btnEdit}
                    ${btnDelete}
                </td></tr>`;
        }).join('');
    }
    renderPager();
    renderSelection();
}
// ---------- Chọn nhiều bản ghi ----------
function pageRows() { return filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).filter(r => r.trangThai === 'Hiệu lực'); }
function toggleSel(id, on) { if (on) selected.add(id); else selected.delete(id); renderSelection(); }
function toggleAll(on) { pageRows().forEach(r => { if (on) selected.add(r.id); else selected.delete(r.id); }); renderRecords(); }
function renderSelection() {
    const rows = pageRows(), all = document.getElementById('chkAll');
    all.checked = rows.length > 0 && rows.every(r => selected.has(r.id));
    all.indeterminate = !all.checked && rows.some(r => selected.has(r.id));
    all.disabled = !rows.length;
    document.getElementById('selCount').textContent = selected.size;
    document.getElementById('btnBulkCancel').style.display = selected.size ? '' : 'none';
}
function renderPager() {
    const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const from = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0, to = Math.min(page * PAGE_SIZE, filtered.length);
    document.getElementById('recPageInfo').textContent = `Hiển thị ${from} - ${to} / ${filtered.length} bản ghi`;
    let h = `<button class="page-btn" ${page === 1 ? 'disabled' : ''} onclick="gotoPage(${page - 1})">&lsaquo;</button>`;
    for (let i = 1; i <= total; i++) h += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="gotoPage(${i})">${i}</button>`;
    h += `<button class="page-btn" ${page === total ? 'disabled' : ''} onclick="gotoPage(${page + 1})">&rsaquo;</button>`;
    document.getElementById('recPages').innerHTML = h;
}
function gotoPage(p) { page = p; renderRecords(); }
function resetFilterSilent() {
    ['fSoDK', 'fBBD', 'fBNBD', 'fTS', 'fDKTu', 'fDKDen', 'fLo', 'fLoaiDK', 'fCoQuan', 'fNguon'].concat(AF_IDS).forEach(id => { document.getElementById(id).value = ''; });
}

// ---------- Hủy bản ghi / Hủy nhiều bản ghi ----------
function confirmBox(title, msg, needReason, onOk) {
    document.getElementById('cfTitle').innerHTML = `<i class="fa-solid fa-circle-question"></i> ${NDL.esc(title)}`;
    document.getElementById('cfMsg').textContent = msg;
    document.getElementById('cfReasonWrap').style.display = needReason ? '' : 'none';
    document.getElementById('cfReason').value = '';
    document.getElementById('cfReasonErr').textContent = '';
    document.getElementById('cfOk').onclick = () => {
        const reason = document.getElementById('cfReason').value.trim();
        if (needReason && !reason) { document.getElementById('cfReasonErr').textContent = 'Trường này bắt buộc nhập.'; return; }
        closeModal('confirmModal'); onOk(reason);
    };
    openModal('confirmModal');
}
function blockingRecords(rec, excludeIds) {
    if (NDL.loaiDK(rec.hs) !== LDK.LAN_DAU) return [];
    return NDL.chainRecords(st, rec).filter(r => r.id !== rec.id && r.trangThai === 'Hiệu lực' && excludeIds.indexOf(r.id) < 0);
}
function askCancelRecord(id) {
    const rec = st.records.find(r => r.id === id);
    const blk = blockingRecords(rec, []);
    if (blk.length) { NDL.toast(`Không thể hủy do đã có bản ghi đăng ký thay đổi/xóa đăng ký còn hiệu lực liên kết (${blk.map(b => b.hs.soDK).join(', ')}). Vui lòng hủy các bản ghi đó trước.`, 'error'); return; }
    confirmBox('Hủy bản ghi', `Bản ghi ${rec.hs.soDK} sẽ chuyển sang trạng thái Đã hủy và không còn được sử dụng để tra cứu, báo cáo, cảnh báo trùng. Bạn có chắc chắn muốn hủy?`, true, reason => {
        rec.trangThai = 'Đã hủy'; rec.lyDoHuy = reason;
        rec.history.push({ t: NDL.nowStr(), user: NDL.USER, action: 'Hủy bản ghi', reason });
        NDL.save(st); applyFilter(); renderTypeTabs();
        NDL.toast('Hủy bản ghi thành công.', 'success');
    });
}
/** Hủy nhiều bản ghi đã chọn (thay cho Hủy lô): dùng khi nhận nhầm cả tệp - lọc theo Mã lô, chọn tất cả rồi hủy */
function askCancelSelected() {
    const recs = st.records.filter(r => selected.has(r.id) && r.trangThai === 'Hiệu lực');
    if (!recs.length) return;
    const ids = recs.map(r => r.id);
    const blk = recs.flatMap(r => blockingRecords(r, ids));
    if (blk.length) { NDL.toast(`Không thể hủy do đã có bản ghi đăng ký thay đổi/xóa đăng ký còn hiệu lực liên kết (${blk.map(b => b.hs.soDK).join(', ')}). Vui lòng hủy các bản ghi đó trước.`, 'error'); return; }
    confirmBox('Hủy bản ghi đã chọn', `${recs.length} bản ghi đã chọn sẽ chuyển sang trạng thái Đã hủy và không còn được sử dụng để tra cứu, báo cáo, cảnh báo trùng. Bạn có chắc chắn muốn hủy?`, true, reason => {
        const t = NDL.nowStr();
        recs.forEach(r => { r.trangThai = 'Đã hủy'; r.lyDoHuy = reason; r.history.push({ t, user: NDL.USER, action: 'Hủy bản ghi', reason }); });
        NDL.save(st); applyFilter(); renderTypeTabs();
        NDL.toast(`Hủy thành công ${recs.length} bản ghi.`, 'success');
    });
}

// ---------- Xuất Excel ----------
function exportExcel() {
    if (!filtered.length) { NDL.toast('Không có dữ liệu để xuất Excel.', 'warn'); return; }
    const aoa = [['STT', 'Số đăng ký', 'Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp', 'Loại đăng ký', 'Thời điểm đăng ký', 'Cơ quan đăng ký', 'Bên bảo đảm', 'Bên nhận bảo đảm', 'Tài sản', 'Nguồn nhận', 'Mã lô', 'Ngày nhận', 'Trạng thái', 'Cảnh báo']];
    filtered.forEach((r, i) => aoa.push([i + 1, r.hs.soDK, r.hs.soDKLD, NDL.loaiDK(r.hs), r.hs.thoiDiem, r.coQuan,
        r.bbd.map(x => x.ten).join('; '), r.bnbd.map(x => x.ten).join('; '), r.ts.map(T.summary).join('; '),
        r.nguon, r.loId, r.ngayNhan, r.trangThai, NDL.warnings(st, r).join(' ')]));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Du_lieu_da_nhan');
    XLSX.writeFile(wb, `Du_lieu_da_nhan_${T.code}.xlsx`);
}

// ---------- MH02: Nhận dữ liệu từ file ----------
const IMP = { file: null, zip: null, zipNames: null, zipList: [], cv: [], results: [], orphans: [], wb: null, head: null, sheets: null };
function openImport() {
    Object.assign(IMP, { file: null, zip: null, zipNames: null, zipList: [], cv: [], results: [], orphans: [], wb: null, head: null, sheets: null });
    document.getElementById('impTypeName').textContent = '- ' + T.label;
    document.getElementById('impFile').value = ''; document.getElementById('impZip').value = ''; document.getElementById('impCV').value = '';
    document.getElementById('impFileName').textContent = 'Chưa chọn tệp (.xls, .xlsx, tối đa 20MB)';
    document.getElementById('impZipName').textContent = 'Không bắt buộc (.zip, tối đa 100MB). Tên file trong tệp nén phải trùng cột "Tên file đính kèm" của sheet HO_SO.';
    document.getElementById('impGhiChu').value = '';
    renderCV(); clearImpErrors(); showStep(1);
    openModal('importModal');
}
function closeImport() { closeModal('importModal'); }
function clearImpErrors() { ['errFile', 'errZip', 'errCV'].forEach(id => { document.getElementById(id).textContent = ''; }); }
function showStep(n) {
    document.getElementById('step1').style.display = n === 1 ? '' : 'none';
    document.getElementById('step2').style.display = n === 2 ? '' : 'none';
    document.getElementById('impFooter1').style.display = n === 1 ? '' : 'none';
    document.getElementById('impFooter2').style.display = n === 2 ? '' : 'none';
    document.getElementById('step1Tab').className = 'step ' + (n === 1 ? 'active' : 'done');
    document.getElementById('step2Tab').className = 'step ' + (n === 2 ? 'active' : '');
}
function backToStep1() { showStep(1); }
function onPickFile(inp) {
    const f = inp.files[0]; document.getElementById('errFile').textContent = '';
    if (!f) return;
    if (!/\.(xls|xlsx)$/i.test(f.name)) { document.getElementById('errFile').textContent = 'Định dạng tệp không hợp lệ. Vui lòng tải lên tệp .xls hoặc .xlsx'; inp.value = ''; return; }
    if (f.size > 20 * 1024 * 1024) { document.getElementById('errFile').textContent = 'Tệp tải lên vượt quá dung lượng cho phép (Tối đa 20MB).'; inp.value = ''; return; }
    IMP.file = f; document.getElementById('impFileName').textContent = f.name;
}
function onPickZip(inp) {
    const f = inp.files[0]; document.getElementById('errZip').textContent = '';
    IMP.zip = null; IMP.zipNames = null; IMP.zipList = [];
    if (!f) return;
    if (!/\.zip$/i.test(f.name) || f.size > 100 * 1024 * 1024) { document.getElementById('errZip').textContent = 'Định dạng tệp nén không hợp lệ. Chỉ chấp nhận tệp .zip, dung lượng tối đa 100MB.'; inp.value = ''; return; }
    JSZip.loadAsync(f).then(z => {
        IMP.zip = f;
        IMP.zipList = Object.keys(z.files).filter(n => !z.files[n].dir).map(n => n.split('/').pop());
        IMP.zipNames = new Set(IMP.zipList.map(n => n.toLowerCase()));
        document.getElementById('impZipName').textContent = `${f.name} (${IMP.zipList.length} tệp)`;
    }).catch(() => { document.getElementById('errZip').textContent = 'Không đọc được tệp nén. Vui lòng kiểm tra lại tệp.'; inp.value = ''; });
}
function onPickCV(inp) {
    document.getElementById('errCV').textContent = '';
    Array.from(inp.files).forEach(f => {
        if (!/\.(pdf|jpe?g|png)$/i.test(f.name)) { document.getElementById('errCV').textContent = `Định dạng tệp tin ${f.name} không hợp lệ. Chỉ chấp nhận các định dạng .pdf, .jpg, .jpeg, .png.`; return; }
        if (f.size > 20 * 1024 * 1024) { document.getElementById('errCV').textContent = `Dung lượng tệp tin ${f.name} vượt quá 20MB. Vui lòng kiểm tra lại.`; return; }
        if (!IMP.cv.some(x => x.name === f.name)) IMP.cv.push({ name: f.name, size: f.size });
    });
    inp.value = ''; renderCV();
}
function renderCV() {
    document.getElementById('impCVList').innerHTML = IMP.cv.length
        ? IMP.cv.map((f, i) => `<span class="file-chip"><i class="fa-solid fa-paperclip"></i>${NDL.esc(f.name)}<button onclick="IMP.cv.splice(${i},1);renderCV()" aria-label="Xóa tệp">&times;</button></span>`).join('')
        : 'Không bắt buộc (.pdf, .jpg, .png, tối đa 20MB/tệp)';
}
function checkImport() {
    clearImpErrors();
    if (!IMP.file) { document.getElementById('errFile').textContent = 'Trường này bắt buộc nhập.'; return; }
    const reader = new FileReader();
    reader.onload = e => {
        let wb;
        try { wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' }); }
        catch (err) { NDL.toast('Cấu trúc file không đúng biểu mẫu. Vui lòng tải \'File mẫu\' để nhập dữ liệu.', 'error'); return; }
        IMP.wb = wb; IMP.head = {};
        const sheets = readSheets(wb);
        if (!sheets) { NDL.toast('Cấu trúc file không đúng biểu mẫu. Vui lòng tải \'File mẫu\' để nhập dữ liệu.', 'error'); return; }
        runCheck(sheets);
    };
    reader.readAsArrayBuffer(IMP.file);
}
/** Đọc 4 sheet dữ liệu; trả null nếu sai cấu trúc (thiếu sheet hoặc tiêu đề cột khác biểu mẫu) */
function readSheets(wb) {
    const out = {};
    for (const sh of NDL.SHEETS) {
        const ws = wb.Sheets[sh];
        if (!ws) return null;
        const aoa = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });
        const cols = NDL.cols(TYPE, sh);
        const head = (aoa[0] || []).map(x => String(x).trim());
        if (cols.some((c, i) => head[i] !== NDL.headerText(c))) return null; // Cột thừa phía sau (VD cột "Mô tả lỗi" của File kết quả) được bỏ qua
        if (IMP.head) IMP.head[sh] = [aoa[0] || [], aoa[1] || []].map(x => cols.map((c, j) => x[j] == null ? '' : x[j]));
        out[sh] = [];
        aoa.slice(2).forEach((row, i) => {
            const r = cols.map((c, j) => String(row[j] == null ? '' : row[j]).trim());
            // Dòng chỉ có Cơ quan đăng ký điền sẵn (các cột khác trống) được coi là dòng trống
            if (r.every((v, j) => !v || (sh === 'HO_SO' && cols[j].k === 'coQuan'))) return;
            if (/^VD/i.test(r[0])) return;
            out[sh].push({ o: NDL.toObj(TYPE, sh, r), line: i + 3, raw: cols.map((c, j) => row[j] == null ? '' : row[j]) });
        });
    }
    return out;
}
function useDemo() {
    clearImpErrors();
    // Dữ liệu mẫu để xem thử: hợp lệ, cảnh báo, trùng, lỗi
    const s = NDL.book(TYPE).samples, p = T.prefix + '-2026-';
    const hasLoaiDK = NDL.hasCol(TYPE, 'HO_SO', 'loaiDK');
    const obj = (sh, r) => NDL.toObj(TYPE, sh, r);
    const hs0 = obj('HO_SO', s.HO_SO[0].r), b0 = obj('BEN_BAO_DAM', s.BEN_BAO_DAM[0].r), n0 = obj('BEN_NHAN_BAO_DAM', s.BEN_NHAN_BAO_DAM[0].r), t0 = obj('TAI_SAN', s.TAI_SAN[0].r);
    const H = (ma, loai, so, ld, td, extra) => {
        const h = Object.assign({}, hs0, { ma, soDK: so, thoiDiem: td, files: '' });
        if (hasLoaiDK) Object.assign(h, { loaiDK: loai, soDKLD: ld, noiDung: '', canCu: '' });
        if ('thoiDiemHL' in h) h.thoiDiemHL = td;
        return Object.assign(h, extra || {});
    };
    const C = (o, ma, extra) => Object.assign({}, o, { ma }, extra || {});
    const hoSo = hasLoaiDK ? [
        H('HS101', LDK.LAN_DAU, p + '0201', '', '01/10/2026 09:00', { files: 'HS101_phieu.pdf' }),
        H('HS102', LDK.THAY_DOI, p + '0101-TĐ2', p + '0101', '02/10/2026 10:30', { noiDung: 'Thay đổi thông tin Bên bảo đảm' }),
        H('HS103', LDK.LAN_DAU, p + '0104', '', '29/09/2026 15:30'),
        H('HS104', LDK.LAN_DAU, p + '0202', '', '31/09/2026 08:00', { coQuan: 'Sở Tư pháp thành phố Hà Nội' }),
        H('HS105', LDK.THAY_DOI, p + '0077-TĐ1', p + '0077', '03/10/2026 14:00', { noiDung: 'Bổ sung tài sản' }),
        H('HS106', LDK.XOA, p + '0102-XĐK2', p + '0102', '04/10/2026 09:15', { soHD: '', ngayHD: '', canCu: 'Chấm dứt nghĩa vụ được bảo đảm' })
    ] : [
        H('HS101', LDK.LAN_DAU, p + '0201', '', '01/10/2026 09:00', { files: 'HS101_phieu.pdf' }),
        H('HS102', LDK.LAN_DAU, p + '0202', '', '02/10/2026 10:30'),
        H('HS103', LDK.LAN_DAU, p + '0104', '', '29/09/2026 15:30'),
        H('HS104', LDK.LAN_DAU, p + '0203', '', '31/09/2026 08:00'),
        H('HS105', LDK.LAN_DAU, p + '0204', '', '03/10/2026 14:00', { thoiDiemHL: '02/10/2026 08:00', nycTen: 'Sample Aviation Finance Limited' })
    ];
    // Chỉ tạo dòng chủ thể, tài sản cho hồ sơ có Loại đăng ký được nhập (VD: Tàu bay chỉ Đăng ký lần đầu); HS199 là dòng không xác định được hồ sơ
    const keep = m => { const h = hoSo.find(x => x.ma === m); return !h || NDL.hasChildren(TYPE, NDL.loaiDK(h)); };
    const sheets = {
        HO_SO: hoSo.map((o, i) => ({ o, line: i + 3 })),
        BEN_BAO_DAM: ['HS101', 'HS102', 'HS103', 'HS104', 'HS105'].filter(keep).map((m, i) => ({ o: C(b0, m), line: i + 3 })),
        BEN_NHAN_BAO_DAM: ['HS101', 'HS102', 'HS103', 'HS105', 'HS199'].filter(keep).map((m, i) => ({ o: C(n0, m), line: i + 3 })),
        TAI_SAN: [['HS101', 11], ['HS102', 0], ['HS103', 0], ['HS104', 12], ['HS105', 13]].filter(([m]) => keep(m)).map(([m, n], i) => ({ o: T.vary(C(t0, m), n), line: i + 3 }))
    };
    IMP.wb = null; IMP.head = null;
    IMP.file = { name: `Du_lieu_mau_${T.code}.xlsx` };
    IMP.zipList = ['HS101_phieu.pdf', 'Cong_van_kem_theo.pdf'];
    IMP.zipNames = new Set(IMP.zipList.map(n => n.toLowerCase()));
    IMP.zip = { name: 'Dinh_kem_mau.zip' };
    document.getElementById('impFileName').textContent = IMP.file.name + ' (dữ liệu mẫu)';
    document.getElementById('impZipName').textContent = IMP.zip.name + ' (2 tệp, dữ liệu mẫu)';
    runCheck(sheets);
}
/** Kiểm tra dữ liệu; Cơ quan đăng ký lấy theo từng dòng sheet HO_SO */
function runCheck(sheets) {
    const byMa = {}, results = [], orphans = [];
    const seen = {};
    sheets.HO_SO.forEach(x => {
        const ma = x.o.ma;
        const res = { ma, line: x.line, hs: x.o, bbd: [], bnbd: [], ts: [], errors: [], warnings: [], status: '' };
        if (ma && seen[ma]) res.errors.push({ sheet: 'HO_SO', line: x.line, col: 'Mã hồ sơ trong file', msg: `Mã hồ sơ trùng với dòng ${seen[ma]} trong cùng tệp.` });
        else if (ma) { seen[ma] = x.line; byMa[ma] = res; }
        results.push(res);
    });
    [['BEN_BAO_DAM', 'bbd'], ['BEN_NHAN_BAO_DAM', 'bnbd'], ['TAI_SAN', 'ts']].forEach(([sh, key]) => {
        sheets[sh].forEach(x => { const r = byMa[x.o.ma]; if (r) r[key].push(x); else orphans.push({ sheet: sh, line: x.line, ma: x.o.ma }); });
    });
    // Kiểm tra theo thứ tự: Đăng ký lần đầu trước, sau đó theo Thời điểm đăng ký
    const rank = h => NDL.loaiDK(h) === LDK.LAN_DAU ? 0 : 1;
    const order = results.slice().sort((a, b) => (rank(a.hs) - rank(b.hs)) || ((NDL.parseDT(a.hs.thoiDiem) || 0) - (NDL.parseDT(b.hs.thoiDiem) || 0)));
    const pending = [];
    order.forEach(res => {
        if (!res.errors.length) {
            const v = NDL.validate({ type: TYPE, coQuan: res.hs.coQuan, st, pending, zipNames: IMP.zipNames, source: 'file' }, { hs: res.hs, hsLine: res.line, bbd: res.bbd, bnbd: res.bnbd, ts: res.ts });
            res.errors = v.errors; res.warnings = v.warnings;
            res.status = v.errors.length ? 'Lỗi' : v.dup ? 'Trùng' : v.warnings.length ? 'Cảnh báo' : 'Hợp lệ';
        } else res.status = 'Lỗi';
        if (res.status === 'Hợp lệ' || res.status === 'Cảnh báo') { pending.push({ coQuan: res.hs.coQuan, hs: res.hs }); }
    });
    IMP.results = results; IMP.orphans = orphans; IMP.sheets = sheets;
    if (!results.length) { NDL.toast('Tệp không có dữ liệu hồ sơ để nhận.', 'error'); return; }
    renderCheck(); showStep(2);
}
// Hợp lệ: được ghi nhận (kể cả hồ sơ có cảnh báo); Lỗi: không ghi nhận (kể cả hồ sơ đã tồn tại trên hệ thống)
const isOkResult = r => r.status === 'Hợp lệ' || r.status === 'Cảnh báo';
function resultFileName() { return 'Ket_qua_' + IMP.file.name.replace(/\.xlsx?$/i, '') + '.xlsx'; }
function renderCheck() {
    const okN = IMP.results.filter(isOkResult).length, errN = IMP.results.length - okN;
    const chips = [['Tổng số bản ghi', IMP.results.length, ''], ['Tổng số hợp lệ', okN, 'sum-ok'], ['Tổng số lỗi', errN, 'sum-err']];
    document.getElementById('sumChips').innerHTML = chips.map(([l, n, c]) => `<div class="sum-chip ${c}"><div class="n">${n}</div><div class="l">${l}</div></div>`).join('');
    // File kết quả: chỉ hiển thị khi có dòng lỗi
    document.getElementById('resultFile').innerHTML = errN || IMP.orphans.length
        ? `<div class="result-file"><i class="fa-solid fa-file-excel rf-ic"></i><div class="rf-text"><div class="rf-title">File kết quả</div><div class="rf-sub">${NDL.esc(resultFileName())}</div></div><button class="btn btn-outline-danger" onclick="exportResultFile()"><i class="fa-solid fa-file-arrow-down"></i> Tải về</button></div>`
        : '';
    document.getElementById('btnCommit').innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Ghi nhận ${okN} hồ sơ`;
}
/** File kết quả: đúng mẫu Excel đã nhận, chỉ giữ các dòng của hồ sơ lỗi và dòng không xác định được hồ sơ, thêm cột "Mô tả lỗi" */
function exportResultFile() {
    const bad = IMP.results.filter(r => !isOkResult(r));
    const badLines = new Set(bad.map(r => r.line)), badMa = new Set(bad.map(r => r.ma).filter(Boolean));
    const orphanKeys = new Set(IMP.orphans.map(o => o.sheet + '#' + o.line));
    const msg = {}, add = (sh, line, m) => { (msg[sh + '#' + line] = msg[sh + '#' + line] || []).push(m); };
    bad.forEach(r => {
        r.errors.forEach(e => add(e.sheet, e.line, (e.col ? `Cột "${e.col}": ` : '') + e.msg));
        if (r.status === 'Trùng') r.warnings.forEach(w => add('HO_SO', r.line, w));
        const other = [...new Set(r.errors.filter(e => e.sheet !== 'HO_SO').map(e => e.sheet))];
        if (other.length) add('HO_SO', r.line, 'Hồ sơ có lỗi tại sheet ' + other.join(', ') + ' (xem cột "Mô tả lỗi" của sheet đó).');
    });
    IMP.orphans.forEach(o => add(o.sheet, o.line, 'Mã hồ sơ trong file không có trong sheet HO_SO.'));
    const dataSheet = sh => {
        const cols = NDL.cols(TYPE, sh);
        const head = IMP.head && IMP.head[sh] ? IMP.head[sh] : [cols.map(NDL.headerText), cols.map(c => c.note || '')];
        const aoa = [head[0].concat('Mô tả lỗi'), head[1].concat('Lỗi của dòng dữ liệu. Sửa dữ liệu theo nội dung này rồi nhận lại; hệ thống bỏ qua cột này khi nhận.')];
        IMP.sheets[sh].filter(x => sh === 'HO_SO' ? badLines.has(x.line) : badMa.has(x.o.ma) || orphanKeys.has(sh + '#' + x.line))
            .forEach(x => aoa.push((x.raw || NDL.toRow(TYPE, sh, x.o)).concat((msg[sh + '#' + x.line] || []).join('\n'))));
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        ws['!cols'] = cols.map(c => ({ wch: c.w || 18 })).concat({ wch: 60 });
        return ws;
    };
    const wb = XLSX.utils.book_new();
    const names = IMP.wb ? IMP.wb.SheetNames : ['HUONG_DAN'].concat(NDL.SHEETS, 'DANH_MUC');
    names.forEach(n => {
        if (NDL.SHEETS.indexOf(n) >= 0) XLSX.utils.book_append_sheet(wb, dataSheet(n), n);
        else if (IMP.wb) XLSX.utils.book_append_sheet(wb, IMP.wb.Sheets[n], n); // Giữ nguyên các sheet khác của tệp đã nhận
        else if (n === 'DANH_MUC') {
            const L = NDL.lists(TYPE), ks = Object.keys(L), aoa = [ks];
            for (let i = 0; i < Math.max(...ks.map(k => L[k].length)); i++) aoa.push(ks.map(k => L[k][i] || ''));
            XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), n);
        } else XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Hướng dẫn nhập liệu theo File mẫu nhận dữ liệu - ' + T.label]]), n);
    });
    XLSX.writeFile(wb, resultFileName());
}
function askCommit() {
    const ok = IMP.results.filter(isOkResult);
    if (!ok.length) { NDL.toast('Không có hồ sơ hợp lệ để ghi nhận.', 'error'); return; }
    confirmBox('Xác nhận ghi nhận dữ liệu', `Hệ thống sẽ ghi nhận ${ok.length} hồ sơ vào cơ sở dữ liệu. Các hồ sơ lỗi sẽ không được ghi nhận. Bạn có chắc chắn muốn tiếp tục?`, false, () => commit(ok));
}
function commit(ok) {
    const t = NDL.nowStr();
    const lot = {
        id: NDL.nextLotId(st), loai: TYPE, coQuan: [...new Set(ok.map(r => r.hs.coQuan))].join('; '), fileName: IMP.file.name, zipName: IMP.zip ? IMP.zip.name : '',
        congVan: IMP.cv.map(f => f.name), ghiChu: document.getElementById('impGhiChu').value.trim(), nguoiNhan: NDL.USER, thoiDiem: t,
        tong: IMP.results.length, ghiNhan: ok.length, loi: IMP.results.length - ok.length, trangThai: 'Hiệu lực'
    };
    st.lots.push(lot);
    ok.forEach(r => {
        const files = NDL.splitFiles(r.hs.files).map(n => ({ name: n, size: '-', nguon: 'Tệp nén kèm file dữ liệu' }));
        st.records.push({
            id: NDL.nextRecId(st), loai: TYPE, coQuan: r.hs.coQuan, hs: Object.assign({}, r.hs), bbd: r.bbd.map(x => x.o), bnbd: r.bnbd.map(x => x.o), ts: r.ts.map(x => x.o),
            files, nguon: 'Nhận từ file', loId: lot.id, nguoiNhan: NDL.USER, ngayNhan: t, trangThai: 'Hiệu lực', lyDoHuy: '',
            history: [{ t, user: NDL.USER, action: 'Nhận từ file (lô ' + lot.id + ')', reason: '' }]
        });
    });
    NDL.save(st);
    closeImport();
    resetFilterSilent(); document.getElementById('fTrangThai').value = 'Hiệu lực';
    applyFilter(); renderTypeTabs();
    NDL.toast(`Nhận dữ liệu thành công ${ok.length} hồ sơ. Mã lô: ${lot.id}.`, 'success');
}

// ---------- MH06: Cấu hình cơ quan đăng ký theo Loại tài sản ----------
let CFG = {};
function openCfg() {
    CFG = {}; Object.keys(NDL.TYPES).forEach(k => { CFG[k] = NDL.agencies(st, k); });
    renderCfg(); openModal('cfgModal');
}
function renderCfg() {
    document.getElementById('cfgBody').innerHTML = Object.keys(NDL.TYPES).map(k => {
        const chosen = CFG[k], rest = NDL.UNITS.filter(u => chosen.indexOf(u) < 0);
        return `<tr><td><b>${NDL.esc(NDL.TYPES[k].label)}</b></td><td>
            <div class="cfg-chips">${chosen.map((u, i) => `<span class="file-chip">${NDL.esc(u)}<button onclick="CFG['${k}'].splice(${i},1);renderCfg()" aria-label="Bỏ đơn vị">&times;</button></span>`).join('') || '<span class="err-text">Chưa có cơ quan đăng ký.</span>'}</div>
            <select class="form-select cfg-add" onchange="if(this.value){CFG['${k}'].push(this.value);renderCfg()}"><option value="">+ Chọn đơn vị từ Quản lý đơn vị...</option>${rest.map(u => `<option>${NDL.esc(u)}</option>`).join('')}</select></td></tr>`;
    }).join('');
}
function saveCfg() {
    const empty = Object.keys(CFG).filter(k => !CFG[k].length);
    if (empty.length) { NDL.toast(`Mỗi Loại tài sản phải có ít nhất 01 cơ quan đăng ký (đang thiếu: ${empty.map(k => NDL.TYPES[k].label).join(', ')}).`, 'error'); return; }
    st.cfgCoQuan = CFG; NDL.save(st);
    fillSelect('fCoQuan', ['Tất cả'].concat(NDL.agencies(st, TYPE)), true);
    closeModal('cfgModal');
    NDL.toast('Cập nhật cấu hình cơ quan đăng ký thành công.', 'success');
}

// Mở sẵn popup Nhận từ Excel khi truy cập kèm tham số popup=import
if (new URLSearchParams(location.search).get('popup') === 'import') openImport();
if (new URLSearchParams(location.search).get('popup') === 'import2') { openImport(); useDemo(); } // Bước 2 với dữ liệu mẫu
if (new URLSearchParams(location.search).get('popup') === 'cfg') openCfg();
