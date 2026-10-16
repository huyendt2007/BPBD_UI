/**
 * Khối Bộ lọc tìm kiếm dạng thu gọn/mở rộng (Accordion) dùng chung cho các màn thuộc Module Biện pháp bảo đảm.
 * - Không hiển thị tiêu đề khối; chỉ hiển thị nút "Thu gọn"/"Mở rộng" ở góc phải khối.
 * - Mặc định hiển thị dạng mở rộng.
 * - Khi thu gọn chỉ ẩn phần thân khối, các giá trị lọc đã nhập được giữ nguyên.
 */
(function () {
    const STYLE_ID = 'bpbd-filter-toggle-style';
    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const st = document.createElement('style');
        st.id = STYLE_ID;
        st.textContent = `
            .bpbd-filter-toggle-bar { display:flex; justify-content:flex-end; align-items:center; gap:8px; margin:0 0 6px 0; }
            .bpbd-filter-toggle-btn { border:1px solid #CBD5E1 !important; background:#F8FAFC !important; color:#2563EB !important; font-size:12px !important; font-weight:500 !important; cursor:pointer !important; padding:3px 10px !important; height:26px !important; min-height:26px !important; max-height:26px !important; border-radius:5px !important; display:inline-flex !important; align-items:center !important; justify-content:center !important; gap:5px !important; line-height:1 !important; transition:all .15s ease !important; }
            .bpbd-filter-toggle-btn:hover { background:#EFF6FF !important; border-color:#93C5FD !important; color:#1D4ED8 !important; }
            .bpbd-filter-toggle-btn i { font-size:11px !important; }
            .bpbd-filter-collapsed { padding:4px 14px !important; margin-bottom:8px !important; min-height:auto !important; height:32px !important; box-sizing:border-box !important; background-color:#F8FAFC !important; border:1px solid #E2E8F0 !important; border-radius:6px !important; box-shadow:0 1px 2px rgba(0,0,0,0.03) !important; }
            .bpbd-filter-collapsed .bpbd-filter-body { display:none !important; }
            .bpbd-filter-collapsed .bpbd-filter-toggle-bar { margin:0 !important; width:100% !important; height:100% !important; justify-content:space-between !important; }
            .bpbd-filter-collapsed-label { display:none; }
            .bpbd-filter-collapsed .bpbd-filter-collapsed-label { display:inline-flex !important; align-items:center; gap:6px; font-size:12px; font-weight:600; color:#475569; }
            .bpbd-filter-collapsed .bpbd-filter-toggle-btn { background:#EFF6FF !important; border-color:#BFDBFE !important; color:#2563EB !important; font-weight:600 !important; }
        `;
        document.head.appendChild(st);
    }

    function render(section) {
        const collapsed = section.classList.contains('bpbd-filter-collapsed');
        section.querySelectorAll('.bpbd-filter-toggle-btn').forEach(btn => {
            btn.innerHTML = collapsed
                ? '<i class="fa-solid fa-chevron-down"></i> Mở rộng'
                : '<i class="fa-solid fa-chevron-up"></i> Thu gọn';
            btn.title = collapsed ? 'Mở rộng khối tìm kiếm' : 'Thu gọn khối tìm kiếm';
            btn.setAttribute('aria-expanded', String(!collapsed));
        });
    }

    function toggle(target) {
        const sec = (target && target.closest) ? target.closest('[data-bpbd-filter]') : document.querySelector('[data-bpbd-filter]');
        if (!sec) return;
        sec.classList.toggle('bpbd-filter-collapsed');
        render(sec);
    }

    /**
     * @param {HTMLElement} section Khối bao ngoài (card) của bộ lọc
     * @param {HTMLElement} body Phần thân chứa các trường lọc (sẽ bị ẩn khi thu gọn)
     * @param {{ extra?: HTMLElement }} [opts] Phần tử đặt cạnh nút (ví dụ nút Xóa bộ lọc có sẵn trên thanh tiêu đề)
     */
    function attach(section, body, opts) {
        if (!section || !body || section.dataset.bpbdFilterToggle) return;
        injectStyle();
        section.dataset.bpbdFilterToggle = '1';
        body.classList.add('bpbd-filter-body');
        const bar = document.createElement('div');
        bar.className = 'bpbd-filter-toggle-bar';
        if (opts && opts.extra) bar.appendChild(opts.extra);
        const label = document.createElement('span');
        label.className = 'bpbd-filter-collapsed-label';
        label.innerHTML = '<i class="fa-solid fa-filter" style="color:#2563EB;"></i> Bộ lọc tìm kiếm';
        bar.appendChild(label);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bpbd-filter-toggle-btn';
        btn.addEventListener('click', () => { section.classList.toggle('bpbd-filter-collapsed'); render(section); });
        bar.appendChild(btn);
        section.insertBefore(bar, section.firstChild);
        section.classList.remove('bpbd-filter-collapsed');
        render(section);
    }

    // Tự động gắn cho các khối được đánh dấu: <div data-bpbd-filter> ... <div data-bpbd-filter-body> ... </div></div>
    function autoAttach() {
        document.querySelectorAll('[data-bpbd-filter]').forEach(sec => {
            // Bỏ tiêu đề khối (ví dụ "Bộ lọc tìm kiếm")
            sec.querySelectorAll(':scope > [data-bpbd-filter-title]').forEach(t => t.remove());
            let body = sec.querySelector('[data-bpbd-filter-body]');
            if (!body) {
                // Tự bọc toàn bộ nội dung của khối vào phần thân
                body = document.createElement('div');
                body.setAttribute('data-bpbd-filter-body', '');
                while (sec.firstChild) body.appendChild(sec.firstChild);
                sec.appendChild(body);
            }
            const extraSel = sec.getAttribute('data-bpbd-filter-extra');
            const extra = extraSel ? sec.querySelector(extraSel) : null;
            attach(sec, body, { extra });
        });
    }

    window.BpbdFilterToggle = { attach, autoAttach, toggle };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoAttach);
    else autoAttach();
})();
