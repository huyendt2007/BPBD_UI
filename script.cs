using System;
using System.IO;
using System.Text.RegularExpressions;

class Program {
    static void Main() {
        string path = @"g:\My Drive\FIS\1. Giao dich dam bao_Ca nhan\Giao dich bao dam va BTNN_Project\UI_Mockups\Website_Quan_tri\UC431_to_UC466\quan_ly_boi_thuong.html";
        string content = File.ReadAllText(path);
        
        // Find Phdd block
        int startPhdd = content.IndexOf("<!-- SUB-TAB 2: PH?C H?I DANH D? -->");
        int endPhdd = content.IndexOf("<!-- TAB 2 END -->", startPhdd);
        // wait, we need to be precise. 
        // Let's just find the closing div of detailSubTabPhdd.
        int closingDivs = content.IndexOf("</div>\n\n            <!-- TAB 2 END -->", startPhdd);
        if(closingDivs == -1) closingDivs = content.IndexOf("</div>\r\n\r\n            <!-- TAB 2 END -->", startPhdd);
        
        Console.WriteLine("start: " + startPhdd + ", end: " + closingDivs);
    }
}
