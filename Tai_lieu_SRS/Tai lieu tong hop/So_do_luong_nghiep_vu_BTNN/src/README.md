# Nguồn sơ đồ swimlane

- Tạo lại toàn bộ ảnh: `bash src/build.sh` (chạy trong thư mục `So_do_luong_nghiep_vu_BTNN`, cần Microsoft Edge); chỉ một nhóm: `bash src/build.sh 03_` (lọc theo tiền tố id).
- `specs/*.js`: mỗi sơ đồ là 01 `SPECS.push({...})` gồm `lanes`, `nodes` (`lane`, `col`, `row`, `type` = step / decision / start / end / offpage / note, `num`, `text`, `status`, `hl`) và `edges` (`from`, `to`, `label`, `dashed`, `fs` / `ts` = cạnh L / R / T / B).
- `render.js`: bố cục lưới cố định, mũi tên vuông góc tự định tuyến tránh hộp; kết quả `images/<id>.svg` và `images/<id>.png` (2x, nền trắng). Cảnh báo chồng hộp / nhãn in ra khi build.
