### 4.1.8. UC003 - Cap nhat thong tin tai khoan danh cho Khach hang

#### 4.1.8.1. Muc dich

- Cho phep khach hang cap nhat thong tin ho so tai khoan cua minh sau khi da dang nhap thanh cong.
- Dam bao ten truong thong tin ho so tai khoan tren Website Khach hang dong nhat voi phan Quan ly tai khoan khach hang tren Website quan tri.
- Kiem soat quyen sua thong tin theo **Nguon xac thuc** cua ho so tai khoan:
  - `VNeID`
  - `Noi bo`
  - `VNeID, Noi bo`
- Chuc nang nay chi xu ly thong tin ho so tai khoan. Block **Phuong thuc dang nhap** tren Website Khach hang thuc hien theo UC002, khong gop vao bang thong tin ho so cua UC003.
- Website Khach hang khong hien thi thong tin dinh danh ky thuat tren man hinh cap nhat thong tin tai khoan.

*a. Phan quyen*

- Khach hang da co tai khoan va dang nhap thanh cong, gom:
  - Khach hang ca nhan.
  - Tai khoan chinh cua To chuc.
  - Tai khoan phu truc thuoc To chuc.

*b. Dieu kien thuc hien*

- Khach hang da dang nhap thanh cong vao Website Khach hang.
- Ho so tai khoan khach hang dang o trang thai cho phep cap nhat thong tin.
- He thong hoat dong binh thuong.

#### 4.1.8.2. Quy dinh chung ve cap nhat thong tin ho so

- Cac truong `Nguon xac thuc`, `Loai khach hang`, `Loai tai khoan`, `Phan loai khach hang` luon hien thi/Read-only.
- Neu ho so co Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`, cac truong dinh danh ca nhan/to chuc khong cho phep sua (Read-only).
- Neu ho so co Nguon xac thuc la `Noi bo`, cac truong dinh danh duoc phep sua theo quy dinh tai tung man hinh.
- Truong `Email (Ten dang nhap)`:
  - Chi cho phep sua neu Nguon xac thuc la `VNeID`.
  - Khong cho phep sua neu Nguon xac thuc la `Noi bo` hoac `VNeID, Noi bo` vi Email dang la Ten dang nhap cua nguon xac thuc Noi bo.
- Cac truong dia chi/lien lac sau cho phep sua bat ke Nguon xac thuc, tru khi tung man hinh co quy dinh rieng:
  - `Tinh/TP`
  - `Dia chi chi tiet`
  - `So dien thoai`
- Quy tac `Tinh/TP`:
  - Neu `Quoc tich`/`Quoc gia` la `Viet Nam`: hien thi hop chon va cho phep chon tai Danh muc dung chung - Tinh/Thanh pho [DM_13].
  - Neu `Quoc tich`/`Quoc gia` khac `Viet Nam`: hien thi o nhap lieu dang van ban de nguoi dung tu nhap.
- Block **Phuong thuc dang nhap** tren Website Khach hang thuc hien theo [UC002 - Xem thong tin tai khoan](UC002_Xem_thong_tin_tai_khoan.md), gom cac chip/tag `VNeID`, `Noi bo (Email/Mat khau)`, nut `Thiet lap ngay` hoac `Doi mat khau` theo trang thai lien ket. UC003 khong xu ly thiet lap hoac doi phuong thuc dang nhap.

#### 4.1.8.3. UC003.MH01 - Man hinh Cap nhat tai khoan Ca nhan

##### 4.1.8.3.1. Man hinh

- Giao dien hien thi Form cap nhat thong tin ho so tai khoan ca nhan.
- Cac truong thong tin duoc tu dong dien san theo du lieu hien tai cua ho so tai khoan.
- Link anh man hinh: [UC003.MH01 - Cap nhat tai khoan Ca nhan](../images/UC003/UC003_MH01_Cap_nhat_tai_khoan_ca_nhan.png).

##### 4.1.8.3.2. Mo ta thong tin tren man hinh

| Truong thong tin | Kieu du lieu | Bat buoc | Mac dinh | Mo ta |
| :-- | :-- | :-- | :-- | :-- |
| Loai khach hang | Enum(String(50)) | - | Ca nhan | Control UI: Hien thi/Read-only. |
| Loai tai khoan | Enum(String(50)) | - | Tai khoan chinh | Control UI: Hien thi/Read-only. Khach hang ca nhan luon la `Tai khoan chinh`. |
| Nguon xac thuc | String(100) | - | Theo ho so | Control UI: Hien thi/Read-only.<br>Gom:<br>- VNeID<br>- Noi bo<br>- VNeID, Noi bo |
| Loai giay to | Enum(String(50)) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Hien thi hop chon va cho phep sua. Tham chieu Danh muc dung chung - Loai giay to phap ly [DM_10]. |
| So giay to | String(50) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. Kiem tra trung tren toan he thong doi voi cac tai khoan dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). |
| Ten khach hang | String(255) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. |
| Ngay sinh | Date | Khong | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. Phai nho hon ngay hien tai. |
| Gioi tinh | Enum(String(50)) | Khong | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Hien thi hop chon va cho phep sua. |
| Quoc tich | String(255) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua theo danh muc/quy tac nhap lieu hien hanh. |
| Phan loai khach hang | Enum(String(50)) | - | Theo Quoc tich | Control UI: Hien thi/Read-only.<br>Gom:<br>- Trong nuoc<br>- Nuoc ngoai |
| Tinh/TP | Enum(String(50)) hoac String(255) | Khong | Theo ho so | Cho phep sua. Control UI dong theo Quoc tich:<br>- Neu Quoc tich la `Viet Nam`: Hien thi hop chon va cho phep chon tai Danh muc dung chung - Tinh/Thanh pho [DM_13].<br>- Neu Quoc tich khac `Viet Nam`: Hien thi o nhap lieu dang van ban de nguoi dung tu nhap. |
| Dia chi chi tiet | String(500) | Khong | Theo ho so | Cho phep sua. Ghi thong tin dia chi chi tiet nhu so nha, duong pho, thon xom... |
| Email (Ten dang nhap) | String(255) | Co neu ho so co nguon xac thuc Noi bo | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID`: Cho phep sua Email vi Email chi la thong tin lien he, chua dung lam Ten dang nhap Noi bo.<br>- Neu Nguon xac thuc la `Noi bo` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only) vi Email la Ten dang nhap cua nguon xac thuc Noi bo. |
| So dien thoai | String(20) | Co | Theo ho so | Cho phep sua. Kiem tra dinh dang theo Quoc tich.<br>- Kiem tra trung tren toan he thong doi voi cac tai khoan dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). |
| Trung tam Dang ky mac dinh | Enum(String(100)) | Khong | Theo ho so | Control UI: Hop chon. Cho phep sua. Hien thi theo Ten viet tat cua Danh muc dung chung - [DM_08 - Trung tam giao dich bao dam](../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |

##### 4.1.8.3.3. Chuc nang tren man hinh

| STT | Ten chuc nang | Dinh dang | Mo ta |
| :-- | :-- | :-- | :-- |
| 1 | Cap nhat | Nut | Khi click, he thong validate du lieu tren form. |
| | | | - TH1 (Bo trong truong bat buoc): Vi pham [BR-VAL-001], highlight truong dau tien bi bo trong va hien thi [MSG-ERR-VAL-001]. |
| | | | - TH2 (Du lieu khong hop le): Kiem tra sai dinh dang, vuot qua do dai, ky tu khong hop le; hien thi thong bao loi tuong ung theo MessageList chung. |
| | | | - TH3 (Ngay sinh khong hop le): Neu Ngay sinh lon hon hoac bang ngay hien tai, vi pham [BR-VAL-008], hien thi [MSG-ERR-VAL-008]. |
| | | | - TH4 (Trung lap du lieu): Kiem tra trung Email (Ten dang nhap), So giay to, So dien thoai tren toan he thong doi voi cac tai khoan dang o trang thai `Dang hoat dong` va chi ap dung voi cac truong duoc phep cap nhat. Neu trung, hien thi [MSG-ERR-VAL-009]. |
| | | | - TH Hop le:<br>- Cap nhat thong tin ho so tai khoan ca nhan vao CSDL.<br>- Ghi nhan Audit Log.<br>- Hien thi [MSG-SUC-SYS-002] va chuyen ve man hinh Xem thong tin tai khoan ca nhan (UC002.MH01). |
| 2 | Huy | Nut | Quay lai man hinh Xem thong tin tai khoan ca nhan (UC002.MH01), khong luu thay doi. |

#### 4.1.8.4. UC003.MH02 - Man hinh Cap nhat tai khoan To chuc (Tai khoan chinh)

##### 4.1.8.4.1. Man hinh

- Giao dien cap nhat tai khoan chinh cua To chuc, gom:
  - Khoi Thong tin chung & lien lac cua To chuc.
  - Khoi Thong tin Nguoi dai dien.
- Cac truong thong tin duoc tu dong dien san theo du lieu hien tai cua ho so tai khoan.
- Link anh man hinh: [UC003.MH02 - Cap nhat tai khoan To chuc](../images/UC003/UC003_MH02_Cap_nhat_tai_khoan_to_chuc.png).

##### 4.1.8.4.2. Mo ta thong tin tren man hinh

| Truong thong tin | Kieu du lieu | Bat buoc | Mac dinh | Mo ta |
| :-- | :-- | :-- | :-- | :-- |
| **I. Thong tin chung & lien lac cua To chuc** | - | - | - | Khoi thong tin tai khoan chinh cua To chuc. |
| Loai khach hang | Enum(String(50)) | - | To chuc | Control UI: Hien thi/Read-only. |
| Loai tai khoan | Enum(String(50)) | - | Tai khoan chinh | Control UI: Hien thi/Read-only. |
| Nguon xac thuc | String(100) | - | Theo ho so | Control UI: Hien thi/Read-only.<br>Gom:<br>- VNeID<br>- Noi bo<br>- VNeID, Noi bo |
| Loai to chuc | Enum(String(100)) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Hien thi hop chon va cho phep sua.<br>Gom:<br>- To chuc co dang ky kinh doanh trong nuoc<br>- To chuc nuoc ngoai |
| Ma dinh danh to chuc | String(255) | Co khi Loai to chuc la To chuc co dang ky kinh doanh trong nuoc | Theo ho so | Chi hien thi khi Loai to chuc = `To chuc co dang ky kinh doanh trong nuoc`.<br>Control UI dong theo Nguon xac thuc:<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua va kiem tra trung tren toan he thong doi voi cac tai khoan chinh to chuc dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). |
| Ma so thue/So giay phep dau tu | String(255) | Co khi Loai to chuc la To chuc nuoc ngoai | Theo ho so | Chi hien thi khi Loai to chuc = `To chuc nuoc ngoai`.<br>Control UI dong theo Nguon xac thuc:<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua va kiem tra trung tren toan he thong doi voi cac tai khoan chinh to chuc dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). |
| Phan loai khach hang | Enum(String(50)) | - | Theo Loai to chuc | Control UI: Hien thi/Read-only.<br>- Tu dong la `Trong nuoc` neu Loai to chuc = `To chuc co dang ky kinh doanh trong nuoc`.<br>- Tu dong la `Nuoc ngoai` neu Loai to chuc = `To chuc nuoc ngoai`. |
| Ten to chuc | String(255) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. |
| Email to chuc (Ten dang nhap) | String(255) | Co neu ho so co nguon xac thuc Noi bo | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID`: Cho phep sua Email vi Email chi la thong tin lien he, chua dung lam Ten dang nhap Noi bo.<br>- Neu Nguon xac thuc la `Noi bo` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only) vi Email la Ten dang nhap cua nguon xac thuc Noi bo. |
| So dien thoai to chuc | String(20) | Khong | Theo ho so | Cho phep sua. Kiem tra dinh dang theo Quoc gia neu co nhap.<br>- Kiem tra trung tren toan he thong doi voi cac tai khoan dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). |
| Quoc gia | String(255) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Hien thi hop chon va cho phep sua theo Danh muc Quoc gia [DM_09]. |
| Tinh/TP | Enum(String(50)) hoac String(255) | Khong | Theo ho so | Cho phep sua. Control UI dong theo Quoc gia:<br>- Neu Quoc gia la `Viet Nam`: Hien thi hop chon va cho phep chon tai Danh muc dung chung - Tinh/Thanh pho [DM_13].<br>- Neu Quoc gia khac `Viet Nam`: Hien thi o nhap lieu dang van ban de nguoi dung tu nhap. |
| Dia chi chi tiet | String(500) | Khong | Theo ho so | Cho phep sua. Dia chi chi tiet tru so chinh cua To chuc. |
| Trung tam Dang ky mac dinh | Enum(String(100)) | Khong | Theo ho so | Control UI: Hop chon. Cho phep sua. Hien thi theo Ten viet tat cua Danh muc dung chung - [DM_08 - Trung tam giao dich bao dam](../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| **II. Thong tin Nguoi dai dien** | - | - | - | Khoi thong tin nguoi dai dien cua To chuc. |
| Ho va ten nguoi dai dien | String(255) | Khong | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. |
| Loai giay to nguoi dai dien | Enum(String(50)) | Khong | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Hien thi hop chon va cho phep sua. Tham chieu Danh muc dung chung - Loai giay to phap ly [DM_10]. |
| So giay to nguoi dai dien | String(50) | Khong | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. |

##### 4.1.8.4.3. Chuc nang tren man hinh

| STT | Ten chuc nang | Dinh dang | Mo ta |
| :-- | :-- | :-- | :-- |
| 1 | Cap nhat | Nut | Khi click, he thong validate du lieu tren form. |
| | | | - TH1 (Bo trong truong bat buoc): Vi pham [BR-VAL-001], highlight truong dau tien bi bo trong va hien thi [MSG-ERR-VAL-001]. |
| | | | - TH2 (Du lieu khong hop le): Kiem tra sai dinh dang, vuot qua do dai, ky tu khong hop le; hien thi thong bao loi tuong ung theo MessageList chung. |
| | | | - TH3 (Trung lap tai khoan chinh to chuc): Neu Nguon xac thuc la `Noi bo` va co cap nhat Ma dinh danh to chuc hoac Ma so thue/So giay phep dau tu, he thong kiem tra trung tren toan he thong doi voi cac tai khoan chinh to chuc dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). Neu trung, hien thi [MSG-ERR-VAL-009]. |
| | | | - TH4 (Trung lap thong tin lien he): Kiem tra trung Email to chuc (Ten dang nhap), So dien thoai to chuc tren toan he thong doi voi cac tai khoan dang o trang thai `Dang hoat dong` va chi ap dung voi cac truong duoc phep cap nhat. Neu trung, hien thi [MSG-ERR-VAL-009]. |
| | | | - TH Hop le:<br>- Cap nhat thong tin ho so tai khoan chinh cua To chuc vao CSDL.<br>- Ghi nhan Audit Log.<br>- Hien thi [MSG-SUC-SYS-002] va chuyen ve man hinh Xem thong tin tai khoan To chuc (UC002.MH02). |
| 2 | Huy | Nut | Quay lai man hinh Xem thong tin tai khoan To chuc (UC002.MH02), khong luu thay doi. |

#### 4.1.8.5. UC003.MH03 - Man hinh Cap nhat tai khoan phu truc thuoc To chuc

##### 4.1.8.5.1. Man hinh

- Giao dien hien thi Form cap nhat thong tin cua tai khoan phu truc thuoc To chuc khi nguoi dung tu sua ho so cua minh.
- Cac thong tin to chuc chu quan hien thi o che do chi doc.
- Website Khach hang khong hien thi thong tin Nhom nguoi dung, Vai tro, Cay phan quyen tren man hinh nay.
- Link anh man hinh: [UC003.MH03 - Cap nhat tai khoan phu truc thuoc To chuc](../images/UC003/UC003_MH03_Cap_nhat_tai_khoan_phu_truc_thuoc.png).

##### 4.1.8.5.2. Mo ta thong tin tren man hinh

| Truong thong tin | Kieu du lieu | Bat buoc | Mac dinh | Mo ta |
| :-- | :-- | :-- | :-- | :-- |
| **I. Thong tin To chuc chu quan** | - | - | - | Khoi thong tin To chuc so huu tai khoan phu. Hien thi/Read-only. |
| Ma khach hang (To chuc chu quan) | String(50) | - | Theo To chuc chu quan | Control UI: Hien thi/Read-only. |
| Ten to chuc | String(255) | - | Theo To chuc chu quan | Control UI: Hien thi/Read-only. |
| Email to chuc (Ten dang nhap) | String(255) | - | Theo To chuc chu quan | Control UI: Hien thi/Read-only. |
| So dien thoai to chuc | String(20) | - | Theo To chuc chu quan | Control UI: Hien thi/Read-only. |
| **II. Thong tin tai khoan phu** | - | - | - | Khoi thong tin cua tai khoan phu truc thuoc. |
| Loai khach hang | Enum(String(50)) | - | To chuc | Control UI: Hien thi/Read-only. |
| Loai tai khoan | Enum(String(50)) | - | Tai khoan phu | Control UI: Hien thi/Read-only. |
| Nguon xac thuc | String(100) | - | Theo ho so | Control UI: Hien thi/Read-only.<br>Gom:<br>- VNeID<br>- Noi bo<br>- VNeID, Noi bo |
| Ten khach hang | String(255) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. |
| Email (Ten dang nhap) | String(255) | Co neu ho so co nguon xac thuc Noi bo | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID`: Cho phep sua Email vi Email chi la thong tin lien he, chua dung lam Ten dang nhap Noi bo.<br>- Neu Nguon xac thuc la `Noi bo` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only) vi Email la Ten dang nhap cua nguon xac thuc Noi bo. |
| So dien thoai | String(20) | Khong | Theo ho so | Cho phep sua. Neu co nhap, kiem tra dinh dang theo Quoc gia va kiem tra trung tren toan he thong doi voi cac tai khoan dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). |
| Don vi | String(255) | Khong | Theo ho so | Cho phep sua. Don vi/phong ban/chi nhanh cua tai khoan phu trong To chuc. |
| Loai giay to | Enum(String(50)) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Hien thi hop chon va cho phep sua. Tham chieu Danh muc dung chung - Loai giay to phap ly [DM_10]. |
| So giay to | String(255) | Co | Theo ho so | Control UI dong theo Nguon xac thuc.<br>- Neu Nguon xac thuc la `VNeID` hoac `VNeID, Noi bo`: Khong cho phep sua (Read-only).<br>- Neu Nguon xac thuc la `Noi bo`: Cho phep sua. Kiem tra trung voi tat ca tai khoan phu khac tren toan he thong dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua). |
| Quoc gia | Enum(String(50)) | Co | Theo ho so | Control UI: Hop chon. Cho phep sua theo Danh muc Quoc gia [DM_09]. |
| Tinh/TP | Enum(String(50)) hoac String(255) | Co | Theo ho so | Cho phep sua. Control UI dong theo Quoc gia:<br>- Neu Quoc gia la `Viet Nam`: Hien thi hop chon va cho phep chon tai Danh muc dung chung - Tinh/Thanh pho [DM_13].<br>- Neu Quoc gia khac `Viet Nam`: Hien thi o nhap lieu dang van ban de nguoi dung tu nhap. |
| Dia chi chi tiet | String(500) | Co | Theo ho so | Cho phep sua. |

##### 4.1.8.5.3. Chuc nang tren man hinh

| STT | Ten chuc nang | Dinh dang | Mo ta |
| :-- | :-- | :-- | :-- |
| 1 | Cap nhat | Nut | Khi click, he thong validate du lieu tren form. |
| | | | - TH1 (Bo trong truong bat buoc): Vi pham [BR-VAL-001], highlight truong dau tien bi bo trong va hien thi [MSG-ERR-VAL-001]. |
| | | | - TH2 (Du lieu khong hop le): Kiem tra sai dinh dang, vuot qua do dai, ky tu khong hop le; hien thi thong bao loi tuong ung theo MessageList chung. |
| | | | - TH3 (Trung lap tai khoan phu): Kiem tra Email (Ten dang nhap) va So giay to tren toan he thong doi voi cac tai khoan phu dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua) va chi ap dung voi cac truong duoc phep cap nhat. Neu trung, hien thi [MSG-ERR-VAL-009]. |
| | | | - TH4 (Trung lap so dien thoai): Neu So dien thoai trung voi tai khoan khac dang o trang thai `Dang hoat dong` (ngoai tru ban ghi dang sua), hien thi [MSG-ERR-VAL-009]. |
| | | | - TH Hop le:<br>- Cap nhat thong tin ho so tai khoan phu vao CSDL.<br>- Ghi nhan Audit Log.<br>- Hien thi [MSG-SUC-SYS-002] va chuyen ve man hinh Xem thong tin tai khoan phu (UC002.MH03). |
| 2 | Huy | Nut | Quay lai man hinh Xem thong tin tai khoan phu (UC002.MH03), khong luu thay doi. |
