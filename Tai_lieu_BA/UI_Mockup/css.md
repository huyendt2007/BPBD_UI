# Quy chuẩn CSS (Design System) - Dự án Giao dịch bảo đảm & BTNN

Tài liệu này định nghĩa hệ thống biến màu sắc (CSS Variables), kiểu chữ (Typography) và các thành phần giao diện (UI Components) dùng chung cho toàn bộ dự án để đảm bảo tính đồng nhất, chuyên nghiệp và phù hợp với đặc thù của hệ thống cơ quan nhà nước.

## 1. Hệ thống màu sắc (Color Palette)

Màu sắc được thiết kế với tông Xanh Navy làm chủ đạo, thể hiện sự tin cậy, bảo mật và tính pháp lý cao.

```css
:root {
  /* Brand Colors */
  --primary-color: #1E3A8A; /* Xanh Navy đậm - Dùng cho Header, Nút bấm chính */
  --primary-hover: #1E40AF;
  --secondary-color: #3B82F6; /* Xanh nhạt hơn - Dùng cho các chi tiết phụ, hover */
  --accent-color: #F59E0B; /* Vàng hổ phách - Dùng cho cảnh báo, highlight quan trọng */

  /* Semantic Colors */
  --success-color: #10B981; /* Xanh lá - Thành công */
  --danger-color: #EF4444; /* Đỏ - Lỗi, Xóa, Cảnh báo nguy hiểm */
  --warning-color: #F59E0B; /* Vàng - Chú ý */
  --info-color: #3B82F6; /* Xanh lam - Cung cấp thông tin */

  /* Neutral/Grayscale */
  --bg-body: #F3F4F6; /* Nền trang web (Xám rất nhạt) */
  --bg-surface: #FFFFFF; /* Nền Form, Thẻ (Trắng tinh) */
  --text-main: #1E293B; /* Chữ phần thân (Xám đen) */
  --text-muted: #64748B; /* Chữ phụ, Ghi chú (Xám trung tính) */
  --border-color: #E2E8F0; /* Viền ô nhập liệu, Viền bảng */
  --table-header-bg: #F1F5F9; /* Nền tiêu đề bảng */
}
```

## 2. Typography & Spacing

Sử dụng Font chữ `Inter` (hoặc `Roboto`) - là các font chữ không chân (sans-serif) dễ đọc nhất trên màn hình kỹ thuật số.

```css
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --base-size: 14px; /* Kích thước chữ chuẩn cho form nhập liệu */
  --heading-size: 18px; /* Tiêu đề khối (Section) */
  
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --border-radius-sm: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px; /* Bo góc mềm mại nhưng không quá tròn */
  --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  
  /* Transition & Glassmorphism */
  --transition-speed: 0.25s;
  --transition-bezier: cubic-bezier(0.16, 1, 0.3, 1);
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-blur: blur(16px);
}
```

## 3. Form Control (Ô nhập liệu)

Các ô nhập liệu phải có viền rõ ràng, bo góc nhẹ và có hiệu ứng focus nổi bật để người dùng dễ nhận biết đang thao tác ở đâu.

```css
.form-control, .form-select {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  padding: 0.5rem 0.75rem;
  font-size: var(--base-size);
  color: var(--text-main);
  transition: all 0.2s ease-in-out;
  width: 100%;
}

.form-control:focus, .form-select:focus {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  outline: none;
}

.form-label {
  font-weight: 500;
  color: var(--text-main);
  margin-bottom: var(--spacing-sm);
  display: block;
}

.required-mark {
  color: var(--danger-color);
  margin-left: 4px;
}
```

## 4. Buttons (Nút bấm)

Nút bấm được phân cấp rõ ràng: Primary (Chính), Secondary (Phụ), Danger (Xóa/Hủy).

```css
.btn {
  font-weight: 500;
  border-radius: var(--border-radius-md);
  padding: 0.5rem 1rem;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  font-size: var(--base-size);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  box-shadow: var(--box-shadow);
}

.btn-outline-primary {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: white;
}
```

## 5. Table/Grid (Bảng dữ liệu động)

Bảng dữ liệu (để hiển thị Bên thế chấp, Tài sản) phải có giao diện gọn gàng, có hiệu ứng hover từng dòng.

```css
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--spacing-md);
}

.table th {
  background-color: var(--table-header-bg);
  color: var(--primary-color);
  font-weight: 600;
  font-size: 13px;
  padding: 12px;
  border-bottom: 2px solid var(--border-color);
  text-align: left;
}

.table td {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle;
}

.table tbody tr:hover {
  background-color: rgba(241, 245, 249, 0.5); /* Hover effect */
}
```

## 6. Layout & Cards (Bố cục)

Chia các khối nội dung thành các Card riêng biệt (Thông tin chung, Bên thế chấp...).

```css
.card-section {
  background-color: var(--bg-surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(0,0,0,0.05);
}

.section-title {
  color: var(--primary-color);
  font-size: var(--heading-size);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--border-color);
}

.grid-2-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.grid-3-cols {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--spacing-md);
}
```
