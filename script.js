const fs = require('fs');
const filePath = 'g:/My Drive/FIS/1. Giao dich dam bao_Ca nhan/Giao dich bao dam va BTNN_Project/UI_Mockups/Website_Quan_tri/UC431_to_UC466/quan_ly_boi_thuong.html';
let content = fs.readFileSync(filePath, 'utf8');

// The end of detailTabXuLy is right before <div class="card-section" id="caseDetailSection" style="display: none;"> is closed.
// Or just find the string that follows detailSubTabPhdd.
// Let's print out lines around line 2900
const lines = content.split('\n');
for (let i = 2850; i < 2950; i++) {
    if (lines[i].includes('</div>')) {
        console.log(i + ': ' + lines[i]);
    }
}
