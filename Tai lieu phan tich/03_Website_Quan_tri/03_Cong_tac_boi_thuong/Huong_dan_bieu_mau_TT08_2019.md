# Hướng dẫn Hệ thống Biểu mẫu và Thống kê nghiệp vụ Bồi thường Nhà nước
*(Theo Thông tư số 08/2019/TT-BTP ngày 10/12/2019 và Luật TNBTCNN năm 2017)*

Tài liệu này tổng hợp toàn bộ các biểu mẫu, chỉ tiêu thống kê và hướng dẫn chi tiết đi kèm ban hành tại **Thông tư số 08/2019/TT-BTP**, phục vụ việc phân tích thiết kế dữ liệu, lập trình tính toán báo cáo và các biểu mẫu động cho Hệ thống Quản lý Giao dịch bảo đảm và Bồi thường nhà nước.

---

## I. HỆ THỐNG BIỂU MẪU BAN HÀNH KÈM THEO THÔNG TƯ 08/2019/TT-BTP

Thông tư số 08/2019/TT-BTP ban hành kèm theo 05 biểu mẫu quản lý nhà nước về bồi thường:
1. **Biểu mẫu số 01**: Danh mục vụ việc giải quyết yêu cầu bồi thường (Quy định tại Điều 10).
2. **Biểu mẫu số 02**: Báo cáo việc thực hiện công tác bồi thường nhà nước (Quy định tại Điều 24).
3. **Biểu mẫu số 03**: Bảng tổng hợp tình hình yêu cầu bồi thường, giải quyết bồi thường và chi trả tiền bồi thường (Quy định tại Điều 24).
4. **Biểu mẫu số 04**: Bảng thống kê tình hình thực hiện trách nhiệm hoàn trả (Quy định tại Điều 24).
5. **Biểu mẫu số 05**: Sổ thụ lý hồ sơ yêu cầu bồi thường tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại.

---

## II. CHI TIẾT CÁC BIỂU MẪU & HƯỚNG DẪN THỐNG KÊ

### 1. BIỂU MẪU SỐ 01: Danh mục vụ việc giải quyết yêu cầu bồi thường
* **Mục đích**: Định kỳ hằng năm, các đơn vị quản lý (Tòa án tối cao, Viện kiểm sát tối cao, các Bộ, UBND cấp tỉnh) lập danh sách chi tiết các vụ việc thụ lý để theo dõi tiến độ xử lý và gửi báo cáo về Bộ Tư pháp.
* **Cấu trúc trường thông tin**:
  * STT
  * Mã hồ sơ / Số vụ việc
  * Họ tên, địa chỉ người yêu cầu bồi thường
  * Hành vi gây thiệt hại của người thi hành công vụ
  * Cơ quan giải quyết bồi thường / Cơ quan quản lý trực tiếp
  * Tình trạng giải quyết (Đang xác minh/ Đang thương lượng/ Đã có quyết định/ Tạm đình chỉ/ Đình chỉ)
  * Số tiền bồi thường theo yêu cầu và theo quyết định có hiệu lực

---

### 2. BIỂU MẪU SỐ 03: Tổng hợp tình hình yêu cầu bồi thường, giải quyết bồi thường và chi trả tiền bồi thường (26 Cột Chỉ tiêu)

Đây là bảng thống kê cốt lõi để tổng hợp số liệu báo cáo gửi Bộ Tư pháp. Số liệu được tổng hợp phân bổ theo 6 lĩnh vực hoạt động (Quản lý hành chính, Tố tụng hình sự, Tố tụng dân sự, Tố tụng hành chính, Thi hành án hình sự, Thi hành án dân sự).

#### A. Cấu trúc 26 Cột Thống kê:
* **STT** (Cột thứ nhất)
* **Lĩnh vực hoạt động phát sinh thiệt hại** (Cột thứ hai)
* **Nhóm 1: Thụ lý vụ việc (vụ việc) [Từ Cột 1 đến Cột 9]**:
  * **Cột 1**: Tổng số vụ việc thụ lý. Công thức: `Cột 1 = Cột 2 + Cột 3 + Cột 4 + Cột 5 + Cột 6 + Cột 7 + Cột 8 + Cột 9`.
  * **Số vụ việc thụ lý mới (Cột 2 đến Cột 5)**:
    * **Cột 2**: Thụ lý tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại (Theo Điều 41 Luật TNBTCNN 2017).
    * **Cột 3**: Thụ lý tại Tòa án - Khởi kiện vụ án dân sự theo điểm a khoản 1 Điều 52 (Sau khi có văn bản làm căn cứ mà chưa yêu cầu cơ quan quản lý giải quyết).
    * **Cột 4**: Thụ lý tại Tòa án - Khởi kiện vụ án dân sự theo điểm b khoản 1 và khoản 2 Điều 52 (Rút đơn trước khi xác minh hoặc không đồng ý thương lượng/quá hạn thương lượng).
    * **Cột 5**: Thụ lý tại Tòa án - Yêu cầu bồi thường kết hợp trong quá trình tố tụng hình sự, tố tụng hành chính (Theo Điều 55).
  * **Số vụ việc kỳ trước chuyển sang (Cột 6 đến Cột 9)**:
    * **Cột 6**: Kỳ trước chuyển sang - Tại cơ quan quản lý trực tiếp.
    * **Cột 7**: Kỳ trước chuyển sang - Tại Tòa án theo điểm a khoản 1 Điều 52.
    * **Cột 8**: Kỳ trước chuyển sang - Tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52.
    * **Cột 9**: Kỳ trước chuyển sang - Tại Tòa án trong quá trình tố tụng hình sự, tố tụng hành chính.
* **Nhóm 2: Tình hình giải quyết vụ việc [Từ Cột 10 đến Cột 22]**:
  * **Đã có văn bản giải quyết bồi thường có hiệu lực pháp luật (Cột 10 đến Cột 14)**:
    * **Cột 10**: Tổng số vụ việc đã giải quyết. Công thức: `Cột 10 = Cột 11 + Cột 12 + Cột 13 + Cột 14`.
    * **Cột 11**: Đã giải quyết tại cơ quan trực tiếp quản lý (Quyết định giải quyết bồi thường có hiệu lực).
    * **Cột 12**: Đã giải quyết tại Tòa án theo điểm a khoản 1 Điều 52.
    * **Cột 13**: Đã giải quyết tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52.
    * **Cột 14**: Đã giải quyết tại Tòa án kết hợp trong tố tụng hình sự, hành chính.
  * **Số tiền bồi thường (Cột 15)**:
    * **Cột 15**: Số tiền bồi thường theo văn bản có hiệu lực pháp luật (Đơn vị tính: Nghìn đồng).
  * **Đang giải quyết bồi thường (Cột 16 đến Cột 20)**:
    * **Cột 16**: Tổng số vụ việc đang giải quyết bồi thường (bao gồm cả các vụ việc hoãn, tạm đình chỉ). Công thức: `Cột 16 = Cột 17 + Cột 18 + Cột 19 + Cột 20`.
    * **Cột 17**: Đang giải quyết tại cơ quan trực tiếp quản lý.
    * **Cột 18**: Đang giải quyết tại Tòa án theo điểm a khoản 1 Điều 52.
    * **Cột 19**: Đang giải quyết tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52.
    * **Cột 20**: Đang giải quyết tại Tòa án theo thủ tục tố tụng (hình sự, hành chính).
  * **Số vụ việc đình chỉ giải quyết bồi thường (Cột 21 và Cột 22)**:
    * **Cột 21**: Đình chỉ tại cơ quan trực tiếp quản lý.
    * **Cột 22**: Đình chỉ theo thủ tục tố tụng tại Tòa án.
* **Nhóm 3: Chi trả tiền bồi thường [Từ Cột 23 đến Cột 25]**:
  * **Cột 23**: Số vụ việc đã thực hiện chi trả xong tiền bồi thường.
  * **Cột 24**: Số tiền đã chi trả theo quyết định có hiệu lực của cơ quan trực tiếp quản lý (Đơn vị: Nghìn đồng).
  * **Cột 25**: Số tiền đã chi trả theo bản án, quyết định có hiệu lực của Tòa án (Đơn vị: Nghìn đồng).

---

### 3. BIỂU MẪU SỐ 04: Tình hình thực hiện trách nhiệm hoàn trả

Biểu mẫu này dùng để thống kê số liệu xem xét trách nhiệm vật chất đối với người thi hành công vụ có hành vi sai phạm gây thiệt hại cho công dân/tổ chức.

* **Cấu trúc cột và công thức**:
  * **Cột 2**: Số tiền đã chi trả xong cho người yêu cầu bồi thường (làm căn cứ tính toán mức hoàn trả).
  * **Cột 3**: Tổng số vụ việc xem xét trách nhiệm hoàn trả. Công thức: `Cột 3 = Cột 4 + Cột 6`.
  * **Cột 4**: Số vụ việc có quyết định hoàn trả có hiệu lực và đã thực hiện hoàn trả.
  * **Cột 5**: Số tiền phải hoàn trả (Nghìn đồng).
  * **Cột 6**: Số vụ việc đang xem xét trách nhiệm hoàn trả.
  * **Cột 7**: Số vụ việc không xem xét trách nhiệm hoàn trả do người thi hành công vụ không có lỗi (không cố ý hoặc vô ý nghiêm trọng theo Luật định).
  * **Cột 8**: Số vụ việc không xem xét trách nhiệm hoàn trả do người thi hành công vụ chết trước khi ra quyết định hoàn trả.
  * **Cột 9**: Số vụ việc được giảm mức hoàn trả (do có hoàn cảnh khó khăn hoặc tự nguyện khắc phục một phần hậu quả).
  * **Cột 10**: Số tiền được giảm hoàn trả (Nghìn đồng).
  * **Cột 11**: Số vụ việc được hoãn thực hiện hoàn trả.
  * **Cột 12**: Tổng số tiền đã thu hồi hoàn trả. Công thức: `Cột 12 = Cột 13 + Cột 14`.
    * **Cột 13**: Số tiền đã hoàn trả thu hồi được trong kỳ báo cáo.
    * **Cột 14**: Số tiền đã hoàn trả kỳ trước chuyển sang tiếp tục thu hồi.
  * **Cột 15**: Số tiền còn phải hoàn trả chưa thu hồi xong.

---

### 4. BIỂU MẪU SỐ 05: Sổ thụ lý hồ sơ yêu cầu bồi thường (Sổ thụ lý)
Sổ thụ lý là công cụ ghi chép thường nhật của cán bộ một cửa / chuyên viên thụ lý giải quyết bồi thường tại cơ quan quản lý trực tiếp. Mỗi vụ việc là một dòng trong sổ.

* **Cấu trúc 14 cột nghiệp vụ và hướng dẫn điền chi tiết**:
  * **Cột 1 (STT)**: Số thứ tự tăng dần của các vụ việc thụ lý.
  * **Cột 2 (Ngày thụ lý)**: Ghi rõ ngày tháng năm thụ lý hồ sơ và ngày tháng năm ra thông báo thụ lý chính thức.
  * **Cột 3 (Họ tên, địa chỉ)**: Ghi rõ họ tên và địa chỉ của người yêu cầu bồi thường.
  * **Cột 4 (Văn bản làm căn cứ yêu cầu bồi thường)**: Ghi rõ số ký hiệu, ngày tháng năm ban hành văn bản làm căn cứ (Bản án oan sai, quyết định hành chính trái luật, báo cáo giám định...).
  * **Cột 5 (Cử người giải quyết bồi thường)**: Ghi rõ họ tên chuyên viên được giao giải quyết, chức vụ, số ký hiệu và ngày ban hành quyết định phân công cử người giải quyết bồi thường.
  * **Cột 6 (Tạm ứng kinh phí bồi thường)**: Ghi rõ số quyết định tạm ứng, ngày tháng năm tạm ứng và số tiền tạm ứng (nếu có).
  * **Cột 7 (Xác minh thiệt hại)**: Ghi rõ các biện pháp xác minh đã thực hiện (định giá tài sản, giám định sức khỏe, thẩm định thiệt hại...). Ngày tháng năm lập biên bản kéo dài thời gian xác minh (nếu có) và ngày ban hành Báo cáo kết quả xác minh thiệt hại.
  * **Cột 8 (Thương lượng việc bồi thường)**: Ghi rõ ngày tổ chức thương lượng (phiên 1, 2, 3...) và ngày ký biên bản kết quả thương lượng (Thành / Không thành).
  * **Cột 9 (Ra quyết định giải quyết bồi thường)**: Ghi rõ số quyết định giải quyết bồi thường, ngày ban hành và ngày thực hiện tống đạt quyết định đó cho người yêu cầu bồi thường.
  * **Cột 10 (Cấp kinh phí bồi thường)**: Ghi rõ số văn bản đề nghị và cấp kinh phí bồi thường của cơ quan tài chính có thẩm quyền.
  * **Cột 11 (Chi trả tiền bồi thường)**: Ghi rõ ngày ban hành thông báo nhận tiền và ngày thực hiện chi trả thực tế (tiền mặt / chuyển khoản).
  * **Cột 12 (Hoãn/ Tạm đình chỉ/ Đình chỉ)**: Ghi rõ ngày tháng năm, số quyết định hoãn/ tạm đình chỉ/ đình chỉ giải quyết yêu cầu bồi thường và lý do pháp lý tương ứng.
  * **Cột 13 (Khởi kiện yêu cầu Tòa án giải quyết)**: Ghi nhận thông tin người dân khởi kiện ra Tòa án dân sự do thương lượng không thành hoặc không đồng ý quyết định của cơ quan quản lý (ngày nộp đơn khởi kiện, ngày Tòa thụ lý nếu có thông tin).
  * **Cột 14 (Phục hồi danh dự)**: Ghi rõ ngày tháng năm, địa điểm tổ chức buổi xin lỗi và cải chính công khai trực tiếp; thông tin tên báo, số báo và ngày đăng tin xin lỗi trên 3 số báo liên tiếp.

---

## III. QUY TẮC THỜI HẠN & CÔNG THỨC ƯỚC TÍNH SỐ LIỆU BÁO CÁO

### 1. Thời hạn gửi số liệu
* **Báo cáo năm (số liệu ước tính)**: Số liệu thực tế tính từ ngày **01/01 đến hết ngày 31/10** hằng năm. Gửi báo cáo chậm nhất trước ngày **08/12** của năm báo cáo.
* **Số liệu thống kê năm chính thức**: Tính từ ngày **01/01 đến hết ngày 31/12** hằng năm. Gửi số liệu chính thức chậm nhất trước ngày **31/01** của năm tiếp theo.

### 2. Công thức ước tính số liệu
Hệ thống phần mềm cần hỗ trợ tự động tính toán số liệu ước tính cả năm trên cơ sở số liệu thực tế 10 tháng đầu năm:

$$\text{Số liệu ước tính} = \frac{\text{Tổng số liệu thực tế (10 tháng)} \times 12 \text{ (tháng)}}{\text{Số tháng lấy số liệu thực tế (10 tháng)}} = \text{Số liệu thực tế} \times 1.2$$

* **Quy tắc làm tròn số học**:
  * Nếu phần thập phân của kết quả tính toán $\ge 0.5$, làm tròn lên thành 1 đơn vị nguyên.
  * Nếu phần thập phân $< 0.5$, làm tròn xuống (giữ nguyên phần nguyên).
  * *Ví dụ*: $3217.56 \rightarrow 3218$, $3217.35 \rightarrow 3217$.
