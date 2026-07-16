 = 'g:\My Drive\FIS\1. Giao dich dam bao_Ca nhan\Giao dich bao dam va BTNN_Project\UI_Mockups\Website_Quan_tri\UC431_to_UC466\quan_ly_boi_thuong.html'
 = Get-Content  -Encoding UTF8
 = 2563
 = 0
for ($i = $start; $i -lt $lines.Length; $i++) {
     = []
     = ([regex]::Matches(, '<div').Count)
     = ([regex]::Matches(, '</div').Count)
     += 
     -= 
    if ( -eq 0 -and  -ne ) { Write-Host "End at line: "; break }
}
