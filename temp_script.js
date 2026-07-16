
                    function toggleClaimOfficerCurrentStatus() {
                        const status = document.getElementById('claimOfficerStatusForm').value;
                        const group = document.getElementById('claimOfficerCurrentGroupForm');
                        if (status === 'ÄÃ£ chuyá»ƒn cÃ´ng tÃ¡c') {
                            group.style.display = 'grid';
                        } else {
                            group.style.display = 'none';
                        }
                    }
                
