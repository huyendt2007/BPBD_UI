
        function switchMainTab(id, btn) {
            document.querySelectorAll('.card-section > .tabs .tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-person').classList.remove('active');
            document.getElementById('tab-org').classList.remove('active');
            document.getElementById('tab-' + id).classList.add('active');
        }

        function switchModalTab(id, btn) {
            document.querySelectorAll('#modalTabs .tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('mtab-info').classList.remove('active');
            document.getElementById('mtab-sub').classList.remove('active');
            document.getElementById('mtab-' + id).classList.add('active');
        }

        let currentOrgIsVNeID = true;

        function openModal(type, name, code, isVNeID = true) {
            const modal = document.getElementById('editModal');
            currentOrgIsVNeID = isVNeID;
            // Reset
            toggleAddForm(false);
            document.querySelectorAll('#modalTabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('#modalTabs .tab-btn:first-child').classList.add('active');
            document.getElementById('mtab-info').classList.add('active');
            document.getElementById('mtab-sub').classList.remove('active');

            if (type === 'PERSON') {
                document.getElementById('modalTitle').innerText = "Chi tiết Khách hàng Cá nhân";
                document.getElementById('modalTabs').style.display = 'none';
                document.getElementById('orgRepGroup').style.display = 'none';
                document.getElementById('permSubOrg').style.display = 'none';
                document.getElementById('inpName').value = "Nguyễn Văn An";
                document.getElementById('inpCode').value = "001090123456";
            } else {
                document.getElementById('modalTitle').innerText = "Chi tiết - " + name;
                document.getElementById('modalTabs').style.display = 'flex';
                document.getElementById('orgRepGroup').style.display = 'block';
                document.getElementById('permSubOrg').style.display = 'flex';
                document.getElementById('inpName').value = name;
                document.getElementById('inpCode').value = code;
                
                // Clear out mock sub-accounts if it's a branch for a cleaner demo
                const subTableBody = document.querySelector('#subTable tbody');
                if (code.includes('-')) {
                    subTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:20px;">Chi nhánh này chưa ủy quyền tài khoản con nào.</td></tr>';
                } else {
                    subTableBody.innerHTML = `
                        <tr id="row-sub-1"><td><strong>Trần Thị Bích</strong></td><td>001088998877</td><td>bich.tt@vietcombank.com</td><td>0912345678</td><td><span class="tag tag-active">Đã đồng bộ</span></td><td><button class="icon-btn" title="Sửa" onclick="editSubAccount('row-sub-1')"><i class="fas fa-edit"></i></button><button class="icon-btn" title="Đóng tài khoản"><i class="fas fa-lock"></i></button><button class="icon-btn" title="Xóa" style="color:var(--danger-color)" onclick="deleteSubAccount('row-sub-1','Trần Thị Bích')"><i class="fas fa-trash"></i></button></td></tr>
                        <tr id="row-sub-2"><td><strong>Nguyễn Hoàng Nam</strong></td><td>001095112233</td><td>nam.nh@vietcombank.com</td><td>0977554433</td><td><span class="tag tag-active">Đã đồng bộ</span></td><td><button class="icon-btn" title="Sửa" onclick="editSubAccount('row-sub-2')"><i class="fas fa-edit"></i></button><button class="icon-btn" title="Đóng tài khoản"><i class="fas fa-lock"></i></button><button class="icon-btn" title="Xóa" style="color:var(--danger-color)" onclick="deleteSubAccount('row-sub-2','Nguyễn Hoàng Nam')"><i class="fas fa-trash"></i></button></td></tr>
                    `;
                }
            }
            modal.classList.add('active');
        }

        function closeModal(id) { document.getElementById(id).classList.remove('active'); }

        function handleCountryChange() {
            const isVN = document.getElementById('selCountry').value === 'VN';
            document.getElementById('vnAddr').style.display = isVN ? 'contents' : 'none';
            document.getElementById('intAddr').style.display = isVN ? 'none' : 'block';
        }

        function toggleAddForm(show) {
            document.getElementById('divCreateSubVNeID').style.display = (show && currentOrgIsVNeID) ? 'block' : 'none';
            document.getElementById('divCreateSubInternal').style.display = (show && !currentOrgIsVNeID) ? 'block' : 'none';
            document.getElementById('btnAddSub').style.display = show ? 'none' : 'inline-flex';
            
            if (show) { 
                if (currentOrgIsVNeID) {
                    document.getElementById('subFormTitleVNeID').innerText = 'Thêm mới Tài khoản con (VNeID SSO)';
                    ['subCCCD_vneid','subName_vneid','subEmail_vneid','subPhone_vneid'].forEach(id => document.getElementById(id).value = '');
                } else {
                    document.getElementById('subFormTitleInternal').innerText = 'Thêm mới Tài khoản con (Tài khoản nội bộ)';
                    ['subUsername_int','subName_int','subEmail_int','subPhone_int'].forEach(id => document.getElementById(id).value = '');
                }
            }
        }

        function editSubAccount(rowId) {
            const row = document.getElementById(rowId);
            const cells = row.querySelectorAll('td');
            
            if (currentOrgIsVNeID) {
                document.getElementById('subCCCD_vneid').value = cells[1].innerText;
                document.getElementById('subName_vneid').value = cells[0].innerText;
                document.getElementById('subEmail_vneid').value = cells[2].innerText;
                document.getElementById('subPhone_vneid').value = cells[3].innerText;
                document.getElementById('subFormTitleVNeID').innerText = 'Chỉnh sửa Tài khoản: ' + cells[0].innerText;
                document.getElementById('divCreateSubVNeID').style.display = 'block';
            } else {
                document.getElementById('subUsername_int').value = cells[1].innerText;
                document.getElementById('subName_int').value = cells[0].innerText;
                document.getElementById('subEmail_int').value = cells[2].innerText;
                document.getElementById('subPhone_int').value = cells[3].innerText;
                document.getElementById('subFormTitleInternal').innerText = 'Chỉnh sửa Tài khoản: ' + cells[0].innerText;
                document.getElementById('divCreateSubInternal').style.display = 'block';
            }
            
            document.getElementById('btnAddSub').style.display = 'none';
        }

        function deleteSubAccount(rowId, name) {
            if (confirm('Bạn có chắc chắn muốn xóa tài khoản "' + name + '" không?\nHành động này sẽ thu hồi quyền đại diện tổ chức.')) {
                document.getElementById(rowId).remove();
                showToast('Đã xóa tài khoản "' + name + '" thành công!');
            }
        }

        function showToast(msg) {
            const t = document.getElementById('toastMsg');
            t.innerText = msg; t.classList.add('show');
            setTimeout(() => t.classList.remove('show'), 3000);
        }

        function openAddAccountModal() {
            if (document.getElementById('tab-person').classList.contains('active')) {
                document.getElementById('addAccType').value = 'PERSON';
            } else {
                document.getElementById('addAccType').value = 'ORG';
            }
            handleAddAccTypeChange();
            document.getElementById('addAccountModal').classList.add('active');
        }

        function handleAddAccTypeChange() {
            const type = document.getElementById('addAccType').value;
            document.getElementById('addAccPersonForm').style.display = type === 'PERSON' ? 'block' : 'none';
            document.getElementById('addAccOrgForm').style.display = type === 'ORG' ? 'block' : 'none';
        }
    
