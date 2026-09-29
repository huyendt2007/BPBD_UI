/**
 * Tự nhận diện khối Bộ lọc tìm kiếm trên màn danh sách (dựa vào nút "Xóa bộ lọc") và gắn chức năng thu gọn/mở rộng.
 * - Mặc định hiển thị dạng mở rộng; cho phép thu gọn/mở rộng bằng nút "Thu gọn"/"Mở rộng" ở góc phải khối.
 * - Khi thu gọn, các giá trị lọc đã nhập được giữ nguyên.
 * - Không áp dụng cho khối lọc nằm trong popup/modal.
 * Phụ thuộc: bpbd_filter_toggle.js (BpbdFilterToggle).
 */
(function () {
    const MODAL_RE = /modal|popup|overlay|dialog/i;
    const inModal = el => {
        for (let e = el; e && e !== document.body; e = e.parentElement) {
            if (MODAL_RE.test((e.className && e.className.baseVal === undefined ? e.className : '') + ' ' + (e.id || ''))) return true;
            if (getComputedStyle(e).position === 'fixed') return true;
        }
        return false;
    };
    const hasInputs = el => !!el.querySelector('input:not([type=hidden]):not([type=checkbox]):not([type=radio]), select');

    // Khối lọc = phần tử tổ tiên cao nhất của nút "Xóa bộ lọc" có chứa trường lọc và không chứa bảng kết quả
    function findFilterBlock(btn) {
        let el = btn, best = null;
        while (el.parentElement && el.parentElement !== document.body) {
            const p = el.parentElement;
            if (p.querySelector('table') && !best) {
                // Ô lọc và nút nằm ngang hàng trong cùng thẻ với bảng kết quả: gom các phần tử ngang hàng liền trước có ô lọc
                const group = [el];
                let s = el.previousElementSibling;
                while (s && !s.querySelector('table') && hasInputs(s)) { group.unshift(s); s = s.previousElementSibling; }
                if (group.length > 1 || hasInputs(el)) {
                    const wrap = document.createElement('div');
                    group[0].parentNode.insertBefore(wrap, group[0]);
                    group.forEach(g => wrap.appendChild(g));
                    wrap.style.marginBottom = '12px';
                    return wrap;
                }
                break;
            }
            if (p.querySelector('table') || p.hasAttribute('data-bpbd-filter') || p.closest('[data-bpbd-filter]')) break;
            if (p.querySelectorAll('button').length && Array.from(p.querySelectorAll('button')).filter(b => /Xóa bộ lọc/.test(b.textContent)).length > 1) break;
            if (hasInputs(p)) best = p;
            el = p;
        }
        return best;
    }

    function wrapPreservingLayout(block) {
        if (block.querySelector(':scope > [data-bpbd-filter-body]')) return;
        const cs = getComputedStyle(block);
        const body = document.createElement('div');
        body.setAttribute('data-bpbd-filter-body', '');
        if (/grid|flex/.test(cs.display)) {
            // Giữ nguyên bố cục lưới/flex của khối lọc cho phần thân
            ['display', 'gridTemplateColumns', 'gridAutoFlow', 'gap', 'rowGap', 'columnGap', 'flexDirection', 'flexWrap', 'alignItems', 'justifyContent'].forEach(k => { body.style[k] = cs[k]; });
            block.style.display = 'block';
        }
        while (block.firstChild) body.appendChild(block.firstChild);
        block.appendChild(body);
    }

    function scan() {
        if (!window.BpbdFilterToggle) return;
        let found = false;
        Array.from(document.querySelectorAll('button, a.btn')).forEach(btn => {
            if (!/Xóa bộ lọc/.test(btn.textContent) || btn.closest('[data-bpbd-filter]') || inModal(btn)) return;
            const block = findFilterBlock(btn);
            if (!block || block.hasAttribute('data-bpbd-filter')) return;
            wrapPreservingLayout(block);
            block.setAttribute('data-bpbd-filter', '');
            found = true;
        });
        if (found) BpbdFilterToggle.autoAttach();
    }

    let timer = null;
    const schedule = () => { clearTimeout(timer); timer = setTimeout(scan, 150); };
    function start() {
        scan();
        setTimeout(scan, 600);
        new MutationObserver(muts => { if (muts.some(m => m.addedNodes.length)) schedule(); }).observe(document.body, { childList: true, subtree: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
    window.FilterToggleAuto = { scan };
})();
