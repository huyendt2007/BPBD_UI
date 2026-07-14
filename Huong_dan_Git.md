# HƯỚNG DẪN QUY TRÌNH LÀM VIỆC VỚI GIT (TRÊN VS CODE & DÒNG LỆNH)

Tài liệu này hướng dẫn chi tiết cách thực hiện các thao tác Git cơ bản thông qua **Giao diện VS Code (Source Control)** và **Dòng lệnh (Git Bash/Terminal)**.

---

## PHẦN I: HƯỚNG DẪN THAO TÁC TRÊN GIAO DIỆN VS CODE (GUI)

Bạn hãy mở công cụ **Source Control** của VS Code bằng cách click vào biểu tượng nhánh cây ở thanh bên trái (hoặc nhấn tổ hợp phím `Ctrl + Shift + G`).

### 1. Cập nhật code mới nhất từ Server (Pull)
Mỗi khi bắt đầu ngày làm việc mới, bạn cần lấy code mới nhất về máy:
1. Click vào biểu tượng **`...`** (ở góc trên thanh Source Control) hoặc click chuột phải vào tên Repository (`UI_Mockups`).
2. Chọn **Pull** để tải code mới nhất từ GitHub về.

### 2. Tạo nhánh làm việc mới (Create Branch)
Để tránh sửa trực tiếp lên nhánh `main`:
1. Click vào biểu tượng **`...`** -> Di chuột vào phần **Branch** -> Chọn **Create Branch...** (hoặc click vào tên nhánh hiện tại dưới góc trái màn hình VS Code).
2. Nhập tên nhánh mới của bạn (Ví dụ: `quan-ly-qd-boi-thuong`).
3. Nhấn **Enter**. VS Code sẽ tự động tạo và chuyển bạn sang nhánh mới này.

### 3. Lưu trữ thay đổi và Đẩy lên Server (Commit & Push)
Khi bạn đã chỉnh sửa file và muốn lưu lại:
1. Tại danh sách **Changes**, click vào dấu cộng **`+`** (Stage Changes) bên cạnh các file đã sửa đổi để đưa chúng vào hàng chờ commit.
2. Nhập nội dung mô tả công việc vào ô nhập văn bản *"Message (Ctrl+Enter to commit...)"*.
3. Click vào nút màu xanh **Commit** ở trên.
4. Click nút **Publish Branch** (nếu là nhánh mới tạo lần đầu) hoặc click **`...`** -> Chọn **Push** để đẩy code lên GitHub.

### 4. Ghép nhánh vào nhánh chính (Merge vào main)
Khi đã làm xong tính năng và muốn gộp vào nhánh chính:
1. Click vào tên nhánh hiện tại ở góc dưới cùng bên trái màn hình -> Chọn nhánh **`main`** từ danh sách để chuyển về nhánh `main`.
2. Thực hiện **Pull** (`...` -> **Pull**) để đảm bảo nhánh `main` ở máy của bạn là mới nhất.
3. Click biểu tượng **`...`** -> Di chuột vào **Branch** -> Chọn **Merge...**.
4. Chọn tên nhánh tính năng mà bạn muốn gộp vào `main` (Ví dụ: `quan-ly-qd-boi-thuong`).
5. Click **`...`** -> Chọn **Push** để đẩy nhánh `main` đã gộp lên GitHub.

---

## PHẦN II: HƯỚNG DẪN BẰNG DÒNG LỆNH (CLI)

Dành cho trường hợp bạn muốn thao tác nhanh bằng Terminal/Git Bash:

### 1. Lấy code mới nhất (Pull)
```bash
# Chuyển về main
git checkout main
# Cập nhật code mới nhất
git pull origin main
```

### 2. Tạo nhánh mới (Create Branch)
```bash
git checkout -b <ten-nhanh-moi>
# Ví dụ: git checkout -b quan-ly-qd-boi-thuong
```

### 3. Commit & Đẩy code lên nhánh (Push Branch)
```bash
# Đưa toàn bộ thay đổi vào hàng chờ
git add .
# Commit thay đổi
git commit -m "Mô tả nội dung công việc"
# Đẩy code lên nhánh trên server
git push origin <ten-nhanh-cua-ban>
```

### 4. Merge nhánh vào `main`
```bash
# Chuyển sang main
git checkout main
# Cập nhật main mới nhất từ server
git pull origin main
# Ghép nhánh tính năng vào main
git merge <ten-nhanh-cua-ban>
# Đẩy main đã ghép lên server
git push origin main
```
