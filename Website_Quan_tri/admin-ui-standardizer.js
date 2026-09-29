(function () {
    // Suppress benign browser extension message port / channel closing errors
    if (typeof window !== 'undefined') {
        window.addEventListener('unhandledrejection', function (event) {
            const reason = event.reason;
            const msg = typeof reason === 'string' ? reason : (reason && (reason.message || reason.stack) ? (reason.message || reason.stack) : '');
            if (msg && (
                msg.includes('message channel closed') ||
                msg.includes('listener indicated an asynchronous response') ||
                msg.includes('message port closed')
            )) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        });
    }

    const STYLE_ID = 'admin-ui-standardizer-style';
    const ROW_CLASS = 'admin-row-clickable';
    const COMPACT_FILTER_CLASS = 'admin-compact-filter';

    const actionIconMap = [
        { test: /nhap lieu|cap nhat|chinh sua|sua|xu ly ho so/i, icon: 'fa-solid fa-pen-to-square', cls: 'edit', title: 'Nhap lieu/Cap nhat ho so' },
        { test: /trinh ky|trinh lanh dao/i, icon: 'fa-solid fa-paper-plane', cls: 'submit', title: 'Trinh lanh dao ky' },
        { test: /ky so|phe duyet|duyet/i, icon: 'fa-solid fa-file-signature', cls: 'sign', title: 'Ky so phe duyet' },
        { test: /xac nhan|tra ket qua/i, icon: 'fa-solid fa-check', cls: 'sign', title: 'Xac nhan tra ket qua' },
        { test: /tu choi|tra lai|huy bo/i, icon: 'fa-solid fa-ban', cls: 'reject', title: 'Tu choi ho so' },
        { test: /xoa|go bo|xoa ho so|xoa yeu cau|xoa tai lieu|xoa file/i, icon: 'fa-solid fa-trash', cls: 'delete', title: 'Xoa' }
    ];

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            table tbody tr.${ROW_CLASS} {
                cursor: pointer;
                transition: background-color 0.2s;
            }
            table tbody tr.${ROW_CLASS}:hover {
                background-color: rgba(14, 116, 144, 0.04) !important;
            }
            .${COMPACT_FILTER_CLASS} {
                padding: 10px 16px 8px 16px !important;
                margin-bottom: 10px !important;
                background-color: #FFFFFF !important;
                border: 1px solid #E2E8F0 !important;
                border-radius: 8px !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
            }
            .${COMPACT_FILTER_CLASS}.bpbd-filter-collapsed {
                height: 32px !important;
                min-height: 32px !important;
                max-height: 32px !important;
                padding: 4px 14px !important;
                margin-bottom: 8px !important;
                background: #F8FAFC !important;
                overflow: hidden !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
            }
            .${COMPACT_FILTER_CLASS} .form-grid,
            .${COMPACT_FILTER_CLASS} .grid,
            .${COMPACT_FILTER_CLASS} .grid-2,
            .${COMPACT_FILTER_CLASS} .grid-3,
            .${COMPACT_FILTER_CLASS} .grid-4,
            .${COMPACT_FILTER_CLASS} .grid-3-cols,
            .${COMPACT_FILTER_CLASS} .grid-4-cols,
            .${COMPACT_FILTER_CLASS} .filter-grid {
                display: grid !important;
                grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
                gap: 8px 14px !important;
            }
            @media (max-width: 1200px) {
                .${COMPACT_FILTER_CLASS} .grid-4-cols,
                .${COMPACT_FILTER_CLASS} .grid-4,
                .${COMPACT_FILTER_CLASS} .filter-grid {
                    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                }
            }
            @media (max-width: 768px) {
                .${COMPACT_FILTER_CLASS} .grid-4-cols,
                .${COMPACT_FILTER_CLASS} .grid-4,
                .${COMPACT_FILTER_CLASS} .filter-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                }
            }
            @media (max-width: 480px) {
                .${COMPACT_FILTER_CLASS} .grid-4-cols,
                .${COMPACT_FILTER_CLASS} .grid-4,
                .${COMPACT_FILTER_CLASS} .filter-grid {
                    grid-template-columns: 1fr !important;
                }
            }
            .${COMPACT_FILTER_CLASS} .form-group {
                margin-bottom: 0 !important;
            }
            .${COMPACT_FILTER_CLASS} .form-label {
                font-size: 13px !important;
                font-weight: 500 !important;
                color: #334155 !important;
                margin-bottom: 3px !important;
                line-height: 1.3 !important;
                display: block !important;
            }
            .${COMPACT_FILTER_CLASS} input,
            .${COMPACT_FILTER_CLASS} select,
            .${COMPACT_FILTER_CLASS} .form-control,
            .${COMPACT_FILTER_CLASS} .form-select {
                min-height: 34px !important;
                height: 34px !important;
                font-size: 13px !important;
                padding: 4px 10px !important;
                border-radius: 6px !important;
                border: 1px solid #CBD5E1 !important;
                background-color: #FFFFFF !important;
                color: #0F172A !important;
                box-sizing: border-box !important;
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
            }
            .${COMPACT_FILTER_CLASS} input:focus,
            .${COMPACT_FILTER_CLASS} select:focus,
            .${COMPACT_FILTER_CLASS} .form-control:focus,
            .${COMPACT_FILTER_CLASS} .form-select:focus {
                border-color: #2563EB !important;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
                outline: none !important;
            }
            .${COMPACT_FILTER_CLASS} textarea {
                font-size: 13px !important;
                border-radius: 6px !important;
                border: 1px solid #CBD5E1 !important;
            }
            .date-filter-wrap {
                position: relative !important;
                display: flex !important;
                align-items: center !important;
            }
            .date-filter-wrap .fa-calendar-days,
            .date-filter-wrap .fa-calendar {
                position: absolute !important;
                right: 10px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                color: #64748b !important;
                font-size: 13px !important;
                pointer-events: none !important;
            }
            .date-filter-wrap input {
                padding-right: 34px !important;
            }
            .${COMPACT_FILTER_CLASS} .btn,
            .${COMPACT_FILTER_CLASS} button:not(.bpbd-filter-toggle-btn):not(.icon-btn) {
                min-height: 36px !important;
                height: 36px !important;
                font-size: 13px !important;
                font-weight: 500 !important;
                padding: 0 18px !important;
                border-radius: 6px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 6px !important;
                cursor: pointer !important;
                transition: all 0.15s ease-in-out !important;
            }
            .${COMPACT_FILTER_CLASS} > div[style*="text-align: right"],
            .${COMPACT_FILTER_CLASS} > div[style*="text-align:right"] {
                margin-top: 14px !important;
                margin-bottom: 0 !important;
                padding-top: 12px !important;
                border-top: 1px solid #F1F5F9 !important;
                display: flex !important;
                justify-content: flex-end !important;
                align-items: center !important;
                gap: 10px !important;
            }
            td.admin-actions-cell,
            th.admin-actions-cell {
                text-align: center !important;
                min-width: 100px !important;
                vertical-align: middle !important;
            }
            .icon-btn {
                width: 32px;
                height: 32px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                border: 1px solid #cbd5e1;
                background: #f8fafc;
                color: #334155;
                cursor: pointer;
                transition: all 0.18s ease;
                margin: 0 2px;
                padding: 0;
                font-size: 14px;
            }
            .icon-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
            }
            .icon-btn.edit { color: #047857; background: #ecfdf5; border-color: #a7f3d0; }
            .icon-btn.submit { color: #1d4ed8; background: #eff6ff; border-color: #bfdbfe; }
            .icon-btn.sign { color: #7c3aed; background: #f5f3ff; border-color: #ddd6fe; }
            .icon-btn.reject { color: #ea580c; background: #fff7ed; border-color: #fed7aa; }
            .icon-btn.delete { color: #dc2626; background: #fef2f2; border-color: #fecaca; }
            .icon-btn.disabled,
            .icon-btn:disabled {
                opacity: 0.35 !important;
                pointer-events: none !important;
                cursor: not-allowed !important;
            }
            .badge-guest,
            .badge-secondary.badge-guest {
                background: #f1f5f9 !important;
                color: #475569 !important;
                border: 1px solid #cbd5e1 !important;
                font-size: 12px !important;
                padding: 2px 8px !important;
                border-radius: 12px !important;
                font-weight: 500 !important;
                display: inline-flex;
                align-items: center;
                white-space: nowrap;
            }
        `;
        document.head.appendChild(style);
    }

    function normalizeText(value) {
        return (value || '').replace(/\s+/g, ' ').trim();
    }

    function normalizeKey(value) {
        return normalizeText(value)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd');
    }

    function getActionColumnIndex(table) {
        const headerRows = table.tHead ? Array.from(table.tHead.rows) : [];
        for (const row of headerRows.reverse()) {
            const cells = Array.from(row.cells);
            const index = cells.findIndex(cell => normalizeKey(cell.textContent).includes('thao tac'));
            if (index >= 0) return index;
        }
        return -1;
    }

    function isViewControl(control) {
        const text = normalizeText(control.textContent);
        const title = normalizeText(control.getAttribute('title') || control.getAttribute('aria-label'));
        const key = normalizeKey(`${text} ${title}`);
        if (/xem file|xem van ban|xem ho so goc|xem\/in|xem them/i.test(key)) return false;
        return control.classList.contains('view') ||
            /xem chi tiet|xem ho so giay/i.test(key) ||
            /^xem$/i.test(normalizeKey(text)) ||
            /^xem chi tiet$/i.test(normalizeKey(text));
    }

    function markGuestCustomer(cell) {
        const text = normalizeText(cell.textContent);
        const key = normalizeKey(text);
        if (!text || /^-|n\/a|null$/i.test(text) || /vang lai|vanglai|kh-vanglai/i.test(key)) {
            cell.innerHTML = '<span class="badge badge-secondary badge-guest">V&atilde;ng lai</span>';
        }
    }

    // usedIcons: tap hop icon da dung trong CUNG mot o Thao tac.
    // Khong bao gio ap dung mot anh xa lam sinh ra 2 icon giong nhau tren cung 1 ban ghi:
    // vi du "Sua" va "Cap nhat ket qua" cung khop luat dau tien va cung ra fa-pen-to-square.
    function normalizeActionButton(control, usedIcons) {
        if (control.dataset.adminIconNormalized === '1') return;
        const text = normalizeKey(control.textContent || control.getAttribute('title') || control.getAttribute('aria-label'));
        const map = actionIconMap.find(item => item.test.test(text));
        if (!map) {
            rememberExistingIcon(control, usedIcons);
            return;
        }
        if (usedIcons && usedIcons.has(map.icon)) {
            // Icon nay da co tren cung dong -> giu nguyen icon goc cua nut
            control.dataset.adminIconNormalized = '1';
            rememberExistingIcon(control, usedIcons);
            return;
        }

        control.dataset.adminIconNormalized = '1';
        control.classList.add('icon-btn', map.cls);
        control.setAttribute('title', control.getAttribute('title') || map.title);
        control.setAttribute('aria-label', control.getAttribute('aria-label') || map.title);
        control.innerHTML = `<i class="${map.icon}"></i>`;
        if (usedIcons) usedIcons.add(map.icon);
        if (control.disabled || control.getAttribute('aria-disabled') === 'true') control.classList.add('disabled');
    }

    // Ghi nhan icon san co cua nut de cac nut sau khong bi trung
    function rememberExistingIcon(control, usedIcons) {
        if (!usedIcons) return;
        const i = control.querySelector('i');
        if (!i) return;
        const cls = Array.from(i.classList).filter(c => c.indexOf('fa-') === 0).sort().join(' ');
        if (cls) usedIcons.add(cls);
    }

    function getCustomerColumnIndex(table) {
        const headerRows = table.tHead ? Array.from(table.tHead.rows) : [];
        for (const row of headerRows.reverse()) {
            const cells = Array.from(row.cells);
            const index = cells.findIndex(cell => normalizeKey(cell.textContent).includes('ma khach hang'));
            if (index >= 0) return index;
        }
        return -1;
    }

    function getDetailHandler(control) {
        const inlineHandler = control.onclick;
        return function () {
            if (typeof inlineHandler === 'function') {
                inlineHandler.call(control, new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                return;
            }
            control.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        };
    }

    function wireRows() {
        document.querySelectorAll('table').forEach(table => {
            const actionIndex = getActionColumnIndex(table);
            const customerIndex = getCustomerColumnIndex(table);

            if (actionIndex >= 0 && table.tHead) {
                Array.from(table.tHead.rows).forEach(row => {
                    if (row.cells[actionIndex]) row.cells[actionIndex].classList.add('admin-actions-cell');
                });
            }

            Array.from(table.tBodies).forEach(tbody => {
                Array.from(tbody.rows).forEach(row => {
                    if (row.cells.length <= 1 || row.querySelector('td[colspan]')) return;

                    if (customerIndex >= 0 && row.cells[customerIndex]) {
                        markGuestCustomer(row.cells[customerIndex]);
                    }

                    const actionCell = actionIndex >= 0 ? row.cells[actionIndex] : row.cells[row.cells.length - 1];
                    if (!actionCell) return;
                    actionCell.classList.add('admin-actions-cell');

                    const controls = Array.from(actionCell.querySelectorAll('button, a, [role="button"]'));
                    const viewControls = controls.filter(isViewControl);
                    const firstView = viewControls[0];

                    // Moi o Thao tac co mot tap icon rieng de tranh trung icon tren cung 1 dong
                    const usedIcons = new Set();
                    controls.forEach(control => {
                        control.addEventListener('click', event => event.stopPropagation());
                        if (!isViewControl(control)) normalizeActionButton(control, usedIcons);
                    });

                    if (firstView && !row.__adminViewHandler) {
                        row.__adminViewHandler = getDetailHandler(firstView);
                    }

                    viewControls.forEach(control => {
                        const wrapper = control.closest('.actions-dropdown');
                        if (wrapper && wrapper.children.length <= 2) {
                            wrapper.remove();
                        } else {
                            control.remove();
                        }
                    });

                    const hasExistingRowClick = row.getAttribute('onclick') || row.__adminViewHandler;
                    if (hasExistingRowClick && row.dataset.adminRowClickable !== '1') {
                        row.dataset.adminRowClickable = '1';
                        row.classList.add(ROW_CLASS);
                        row.addEventListener('click', function (event) {
                            if (event.target.closest('button, a, input, textarea, select, [role="button"], .dropdown, .actions-dropdown, .modal')) return;
                            if (row.__adminViewHandler) {
                                row.__adminViewHandler();
                            }
                        });
                    }
                });
            });
        });
    }

    function compactFilters() {
        const candidates = document.querySelectorAll('.card, .card-section, .filter-card, .filter-section, .search-panel, .search-box, .search-container, form');
        candidates.forEach(el => {
            if (el.classList.contains(COMPACT_FILTER_CLASS)) return;
            const fieldCount = el.querySelectorAll('input, select, textarea').length;
            const hasSearchAction = Array.from(el.querySelectorAll('button, .btn')).some(btn => /tim kiem|loc|xoa bo loc|tra cuu/i.test(normalizeKey(btn.textContent)));
            if (fieldCount >= 2 && hasSearchAction) el.classList.add(COMPACT_FILTER_CLASS);
        });
    }

    function run() {
        injectStyle();
        compactFilters();
        wireRows();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    let scheduled = false;
    const observer = new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(() => {
            scheduled = false;
            run();
        });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
