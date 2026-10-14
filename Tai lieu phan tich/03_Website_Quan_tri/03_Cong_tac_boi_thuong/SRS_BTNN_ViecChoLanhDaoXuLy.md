### 4.3.3.29. Hồ sơ trình Lãnh đạo

#### 4.3.3.29.1. Mục đích

\- Cung cấp cho Lãnh đạo các đơn vị một màn hình tập trung các hồ sơ thuộc phân hệ Bồi thường nhà nước (BTNN) đang chờ lãnh đạo xử lý, gồm hồ sơ Loại yêu cầu "Xác định cơ quan giải quyết bồi thường" và "Yêu cầu bồi thường".

\- Gồm 06 chức năng:

\+ Tra cứu danh sách hồ sơ trình Lãnh đạo theo tab: Chờ phân công, Chờ duyệt, Đã xử lý.

\+ Xem chi tiết hồ sơ, quá trình phân công, trình phê duyệt (kèm Văn bản dự thảo trình Lãnh đạo, nếu lần trình có) và lịch sử xử lý.

\+ Phân công xử lý hồ sơ: chuyển đơn vị cấp dưới hoặc phân công cán bộ chủ trì, cán bộ phối hợp.

\+ Phê duyệt (ký duyệt) nội dung do cán bộ chủ trì trình; chọn Lãnh đạo phê duyệt cấp tiếp theo khi chưa phải cấp cuối.

\+ Từ chối phê duyệt nội dung do cán bộ chủ trì trình.

\+ Thu hồi hồ sơ đã chuyển, đã phân công hoặc kết quả phê duyệt đã chuyển cấp trên khi bên nhận chưa xử lý.

\- Hướng phân công và Nhóm lãnh đạo của từng đơn vị lấy theo [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).

*a. Phân quyền*

\- Menu "Hồ sơ trình Lãnh đạo" thuộc phân hệ Bồi thường nhà nước, đặt ngay dưới menu "Tiếp nhận yêu cầu".

\- Vai trò thực hiện: Lãnh đạo đơn vị, là tài khoản thuộc Nhóm lãnh đạo của đơn vị tại Cấu hình luồng xử lý.

\- Tab "Chờ duyệt" chỉ hiển thị hồ sơ mà người dùng là Lãnh đạo được giao đích danh phê duyệt ở cấp hiện tại (quy tắc 10 tại [Quy tắc chung](#vcld-quy-tac-chung)).

\- Tài khoản không thuộc Nhóm lãnh đạo của đơn vị nào vẫn mở được màn hình; tab "Chờ phân công" và "Chờ duyệt" không có hồ sơ.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập Website Quản trị và được phân quyền chức năng "Hồ sơ trình Lãnh đạo".

\- Đơn vị gốc của hồ sơ đã được cấu hình luồng xử lý.

---

<a id="vcld-quy-tac-chung"></a>
#### 4.3.3.29.2. Quy tắc chung

| STT | Nội dung | Quy tắc |
| :-- | :--- | :--- |
| 1 | Phạm vi theo Loại yêu cầu | Người dùng chỉ thấy hồ sơ có Loại yêu cầu áp dụng cho đơn vị của mình theo [Đơn vị áp dụng của Loại yêu cầu - Quản lý danh mục dùng chung - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md#dm-don-vi-ap-dung).<br>- Một Loại yêu cầu áp dụng cho người dùng khi Đơn vị áp dụng chứa đơn vị của người dùng hoặc một đơn vị cấp trên của đơn vị đó.<br>- Loại yêu cầu "Xác định cơ quan giải quyết bồi thường" chỉ áp dụng cho cơ quan có thẩm quyền Xác định cơ quan giải quyết bồi thường:<br>+ Bộ Tư pháp<br>+ Sở Tư pháp các tỉnh, thành phố trực thuộc Trung ương<br>+ Ủy ban nhân dân cấp tỉnh<br>- Lãnh đạo đơn vị khác không thấy hồ sơ loại này.<br>- Bộ lọc "Loại yêu cầu" chỉ hiển thị các Loại yêu cầu áp dụng cho người dùng. |
| 2 | Đơn vị gốc và đơn vị đang phân công | Đơn vị gốc là đơn vị cấp cao nhất trên cây Cơ cấu tổ chức chứa đơn vị của cán bộ tiếp nhận (hoặc cơ quan giải quyết bồi thường được chỉ định, với hồ sơ sinh ra khi Chuyển CQGQBT).<br>- Hồ sơ mới ở trạng thái "Chờ phân công" tại đơn vị gốc.<br>- Mỗi lần Chuyển đơn vị, "Đơn vị đang phân công" đổi thành đơn vị nhận và hồ sơ chuyển "Đang phân công". |
| 3 | Quyền thao tác | Phân công: bất kỳ tài khoản nào trong Nhóm lãnh đạo của đơn vị đang phân công đều được phân công hồ sơ; người thao tác trước xử lý hồ sơ, hồ sơ không còn trong tab "Chờ phân công" của các thành viên khác trong nhóm.<br>- Phê duyệt, Từ chối phê duyệt: chỉ Lãnh đạo được giao đích danh ở cấp phê duyệt hiện tại (quy tắc 10).<br>- Không có chức năng ủy quyền. |
| 4 | Hướng phân công | Chỉ dùng các hướng xử lý đã cấu hình cho đơn vị đang phân công:<br>- Chuyển đơn vị: chỉ chuyển đến đơn vị cấp dưới trực tiếp đã chọn tại cấu hình.<br>- Phân công cán bộ: chỉ chọn cán bộ đã chọn tại cấu hình.<br>- Không có thao tác "Trả lại" hồ sơ lên cấp trên; cấp trên dùng "Thu hồi". |
| 5 | Thời hạn | Không quy định thời hạn cho từng bước phân công, phê duyệt. |
| 6 | Lượt chuyển và tình trạng | Mỗi lần Chuyển đơn vị hoặc Phân công cán bộ tạo 01 lượt chuyển, Tình trạng ban đầu "Chưa xử lý".<br>- Lượt chuyển đến đơn vị chuyển "Đã xử lý" khi lãnh đạo đơn vị nhận chuyển tiếp hoặc phân công.<br>- Lượt chuyển đến cán bộ chuyển "Đã xử lý" khi cán bộ chủ trì thực hiện "Tiếp nhận" hồ sơ tại phân hệ xử lý.<br>- Khi bên nhận mở xem hồ sơ lần đầu (lãnh đạo đơn vị nhận mở chi tiết hoặc popup phân công; cán bộ chủ trì mở hồ sơ), hệ thống ghi thời điểm xem và hiển thị "Chưa xử lý - Đã xem lúc hh:mm dd/mm/yyyy". Chưa xem hiển thị "Chưa xử lý - Chưa xem".<br>- Việc xem hồ sơ không được tính là đã xử lý. |
| 7 | Thu hồi | Thu hồi lượt chuyển gần nhất khi đồng thời:<br>+ Người dùng thuộc Nhóm lãnh đạo của đơn vị đã chuyển.<br>+ Lượt chuyển gần nhất của hồ sơ có Tình trạng "Chưa xử lý" (đơn vị nhận chưa chuyển tiếp, chưa phân công; cán bộ chủ trì chưa tiếp nhận).<br>+ Hồ sơ đang ở "Đang phân công" tại đơn vị nhận (chuyển đơn vị) hoặc "Chờ tiếp nhận" (phân công cán bộ).<br>- Bên nhận đã mở xem hồ sơ vẫn được thu hồi.<br>- Kết quả: xóa lượt chuyển gần nhất; hồ sơ trở lại đơn vị đã chuyển, trạng thái "Chờ phân công" nếu đơn vị đó là đơn vị gốc, ngược lại "Đang phân công"; lượt chuyển liền trước trở lại "Chưa xử lý"; thu hồi phân công cán bộ thì xóa cán bộ chủ trì, cán bộ phối hợp.<br>- Thu hồi kết quả phê duyệt: khi hồ sơ "Chờ duyệt", Lãnh đạo vừa phê duyệt và chuyển cấp trên được thu hồi nếu cấp trên chưa phê duyệt hoặc từ chối phê duyệt. Hồ sơ quay lại chờ chính Lãnh đạo đã thu hồi phê duyệt tại cấp đó; Lãnh đạo cấp trên đã được giao không còn thấy hồ sơ. |
| 8 | Luồng phê duyệt nhiều cấp | Luồng phê duyệt đi ngược chiều luồng phân công thực tế của chính hồ sơ: lấy các đơn vị đã chuyển hoặc phân công theo thứ tự lượt chuyển, đảo ngược, bỏ đơn vị trùng.<br>- VD: Bộ Tư pháp → Cục → Phòng → Cán bộ thì luồng phê duyệt là Phòng (cấp 1) → Cục (cấp 2) → Bộ Tư pháp (cấp 3).<br>- Hồ sơ do cán bộ tạo trực tiếp tại phân hệ (không qua phân công): luồng phê duyệt đi từ đơn vị của cán bộ chủ trì lên đơn vị gốc, chỉ gồm các đơn vị có Nhóm lãnh đạo.<br>- Không xác định được cấp phê duyệt nào: chặn trình, hiển thị "Chưa xác định được cấp phê duyệt. Vui lòng liên hệ Quản trị hệ thống."<br>- Luồng phê duyệt được xác định khi cán bộ chủ trì trình và giữ nguyên cho lần trình đó; mỗi lần trình (kể cả trình lại) bắt đầu từ cấp 1. |
| 9 | Trạng thái "Chờ duyệt" và Nội dung trình | Khi cán bộ chủ trì trình thành công, hồ sơ chuyển trạng thái chung "Chờ duyệt". Loại việc Lãnh đạo cần duyệt lưu tại trường "Nội dung trình" của phiếu trình, không tạo trạng thái riêng cho từng loại việc.<br>- Mỗi hồ sơ có tối đa 01 phiếu trình đang chờ duyệt.<br>- Nội dung trình tại Xác định cơ quan giải quyết bồi thường:<br>+ Yêu cầu bổ sung<br>+ Từ chối<br>+ Kết quả xác định CQGQBT<br>- Nội dung trình tại Giải quyết yêu cầu bồi thường:<br>+ Tiếp nhận hồ sơ<br>+ Yêu cầu bổ sung<br>+ Không thụ lý<br>+ Chuyển CQGQBT<br>+ Quyết định GQBT<br>+ Hủy QĐ<br>+ Sửa chữa, đính chính QĐ<br>- Dưới badge trạng thái trên lưới và màn chi tiết hiển thị dòng phụ chỉ gồm tên "[Nội dung trình]", VD "Yêu cầu bổ sung"; không hiển thị cấp duyệt (Cấp i/n). Hồ sơ "Bị trả lại" hiển thị Nội dung trình của phiếu bị trả lại.<br>- Kết quả khi cấp cuối phê duyệt theo từng Nội dung trình: xem [Kết quả khi cấp cuối phê duyệt](#vcld-ket-qua-duyet). |
| 10 | Lãnh đạo phê duyệt đích danh | Khi trình, cán bộ chủ trì bắt buộc chọn "Lãnh đạo phê duyệt" là 01 thành viên Nhóm lãnh đạo của đơn vị phê duyệt cấp 1 (khi đơn vị cấp 1 có Nhóm lãnh đạo). Bỏ trống: "Vui lòng chọn Lãnh đạo phê duyệt."<br>- Lãnh đạo cấp n khi Phê duyệt mà chưa phải cấp cuối: bắt buộc chọn "Lãnh đạo phê duyệt cấp tiếp theo" là 01 thành viên Nhóm lãnh đạo của đơn vị cấp n+1 (khi đơn vị cấp n+1 có Nhóm lãnh đạo).<br>- Chỉ Lãnh đạo được giao mới thấy hồ sơ tại tab "Chờ duyệt" và được Phê duyệt, Từ chối phê duyệt. Các thành viên khác của Nhóm lãnh đạo cùng đơn vị không thấy hồ sơ tại tab "Chờ duyệt".<br>- Lãnh đạo được chọn phải thuộc Nhóm lãnh đạo của cấp tương ứng; hệ thống kiểm tra lại khi xác nhận.<br>- Bảng cấp phê duyệt hiển thị Lãnh đạo được giao ở cấp đang chờ: "(Giao: [Họ tên])". |
| 11 | Từ chối phê duyệt | Từ chối phê duyệt ở bất kỳ cấp nào: hồ sơ chuyển "Bị trả lại" về cán bộ chủ trì, giữ Nội dung trình của phiếu bị trả lại; lưu người trả lại, đơn vị, thời điểm, lý do.<br>- "Bị trả lại" là trạng thái chung cho mọi Nội dung trình.<br>- Cán bộ chủ trì trình lại thì luồng phê duyệt bắt đầu lại từ cấp phê duyệt đầu tiên; cán bộ chọn lại Lãnh đạo phê duyệt cấp 1.<br>- Lịch sử xử lý ghi thao tác "Từ chối phê duyệt" để phân biệt với "Từ chối" yêu cầu. |
| 12 | Ký duyệt và văn bản | "Phê duyệt" và "Từ chối phê duyệt" là thao tác ký duyệt của Lãnh đạo trên hệ thống (ghi kết quả, chuyển trạng thái, ghi lịch sử).<br>- Văn bản trình (dự thảo do hệ thống sinh theo mẫu hoặc tệp cán bộ tải lên) được đính kèm phiếu trình; Lãnh đạo xem văn bản trước khi xác nhận, không sửa văn bản trên màn hình này.<br>- Văn bản đã ký, đóng dấu được cán bộ chủ trì đính file tại bước Phát hành hoặc Ban hành của phân hệ xử lý. |
| 13 | Kiểm tra đồng thời | Mọi thao tác Phân công, Phê duyệt, Từ chối phê duyệt, Thu hồi đều kiểm tra lại trạng thái hồ sơ và quyền của người dùng tại máy chủ ngay khi xác nhận.<br>- Khi mở popup thao tác mà hồ sơ đã được xử lý: hiển thị "Hồ sơ đã được xử lý bởi người khác. Danh sách đã được tải lại." và tải lại danh sách.<br>- Khi xác nhận Phân công mà không còn hợp lệ: "Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phân công. Vui lòng tải lại danh sách."<br>- Khi xác nhận Phê duyệt, Từ chối phê duyệt mà không còn hợp lệ (đã được xử lý, đã bị thu hồi hoặc người dùng không còn là Lãnh đạo được giao): "Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách."<br>- Khi Thu hồi mà bên nhận đã xử lý: "Không thể thu hồi: bên nhận đã xử lý hồ sơ." |
| 14 | Lịch sử xử lý | Mỗi thao tác ghi 01 dòng lịch sử gồm Thao tác, Người thực hiện, Thời điểm, Nội dung. Thao tác tại màn hình này:<br>+ Chuyển đơn vị<br>+ Phân công cán bộ<br>+ Thu hồi<br>+ Phê duyệt<br>+ Từ chối phê duyệt<br>+ Thu hồi phê duyệt |
| 15 | Văn bản dự thảo trình Lãnh đạo | Lần trình có Văn bản dự thảo khi phân hệ xử lý trình kèm văn bản, VD:<br>+ Yêu cầu bổ sung, Từ chối tại Xác định cơ quan giải quyết bồi thường (tệp cán bộ tải lên)<br>+ Yêu cầu bổ sung tại Giải quyết yêu cầu bồi thường (Mẫu 03/BTNN do hệ thống sinh hoặc tệp tải lên)<br>+ Không thụ lý (Mẫu 04/BTNN do hệ thống sinh hoặc tệp tải lên)<br>+ Quyết định GQBT (Mẫu 18/BTNN do hệ thống sinh hoặc tệp tải lên)<br>- Khối Văn bản dự thảo hiển thị tên tệp sẽ trình Lãnh đạo, nhãn nguồn (hệ thống sinh theo mẫu hoặc bản cán bộ tải lên) và liên kết xem, tải file.<br>- Cách lập văn bản tại từng phân hệ mô tả tại [Xác định cơ quan giải quyết bồi thường - Xác định cơ quan giải quyết bồi thường - Bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md), [Giải quyết yêu cầu bồi thường - Giải quyết yêu cầu bồi thường - Bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md) và [Quyết định giải quyết bồi thường - Quyết định giải quyết bồi thường - Bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_QuyetDinh_GQBT.md).<br>- Lãnh đạo xem Văn bản dự thảo tại [MH02 - Popup Xem chi tiết hồ sơ](#vcld-mh02) hoặc [MH04 - Popup Phê duyệt / Từ chối phê duyệt](#vcld-mh04), sau đó thực hiện "Phê duyệt" hoặc "Từ chối phê duyệt". |

---

<a id="vcld-trang-thai"></a>
#### 4.3.3.29.3. Trạng thái hồ sơ liên quan

\- Luồng chính: Chờ phân công → Đang phân công → Chờ tiếp nhận → Đang thực hiện → Chờ duyệt → Bị trả lại hoặc trạng thái theo Nội dung trình khi cấp cuối phê duyệt. Chi tiết các bước của cán bộ chủ trì (Tiếp nhận, Trình phê duyệt, Phát hành, Ban hành, Chuyển CQGQBT) mô tả tại [Xác định cơ quan giải quyết bồi thường - Xác định cơ quan giải quyết bồi thường - Bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md) và [Giải quyết yêu cầu bồi thường - Giải quyết yêu cầu bồi thường - Bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md).

| Trạng thái | Ý nghĩa | Hiển thị tại màn hình này |
| :--- | :--- | :--- |
| Chờ phân công | Hồ sơ đang ở đơn vị gốc, chưa có lượt chuyển hoặc đã được thu hồi về đơn vị gốc. Gồm cả hồ sơ mới sinh ra ở cơ quan đích khi Chuyển CQGQBT. | Tab "Chờ phân công" của Nhóm lãnh đạo đơn vị gốc. |
| Đang phân công | Hồ sơ đã được chuyển đến đơn vị cấp dưới, chờ lãnh đạo đơn vị đó phân công. | Tab "Chờ phân công" của Nhóm lãnh đạo đơn vị đang phân công. |
| Chờ tiếp nhận | Hồ sơ đã được phân công cán bộ chủ trì, chờ cán bộ tiếp nhận tại phân hệ Xác định cơ quan giải quyết bồi thường hoặc Giải quyết yêu cầu bồi thường. | Tab "Đã xử lý" của lãnh đạo đã phân công. |
| Chờ duyệt | Cán bộ chủ trì đã trình, đang chờ Lãnh đạo được giao ở một cấp phê duyệt. Dòng phụ: "[Nội dung trình]" (chỉ hiển thị tên Nội dung trình, không hiển thị cấp duyệt). | Tab "Chờ duyệt" của Lãnh đạo được giao ở cấp hiện tại; tab "Đã xử lý" của Lãnh đạo đã phê duyệt cấp dưới. |
| Bị trả lại | Một cấp phê duyệt đã từ chối phê duyệt. Dòng phụ: "[Nội dung trình]". | Tab "Đã xử lý" của lãnh đạo đã thao tác. |
| Trạng thái sau khi cấp cuối phê duyệt | Theo Nội dung trình tại [Kết quả khi cấp cuối phê duyệt](#vcld-ket-qua-duyet). | Tab "Đã xử lý" của lãnh đạo đã thao tác. |

<a id="vcld-ket-qua-duyet"></a>
**Kết quả khi cấp cuối phê duyệt**

\- Khi Lãnh đạo cấp cuối phê duyệt, hồ sơ chuyển trạng thái theo Nội dung trình của phiếu trình:

| Nội dung trình | Phân hệ | Trạng thái sau khi duyệt cấp cuối |
| :--- | :--- | :--- |
| Yêu cầu bổ sung | Xác định cơ quan giải quyết bồi thường | Yêu cầu bổ sung |
| Từ chối | Xác định cơ quan giải quyết bồi thường | Bị từ chối |
| Kết quả xác định CQGQBT | Xác định cơ quan giải quyết bồi thường | Chờ chuyển CQGQBT |
| Tiếp nhận hồ sơ | Giải quyết yêu cầu bồi thường | Chờ thụ lý |
| Yêu cầu bổ sung | Giải quyết yêu cầu bồi thường | Chờ phát hành văn bản.<br>- Cán bộ chủ trì thực hiện "Phát hành" (bắt buộc đính văn bản đã ký, đóng dấu) thì hồ sơ chuyển "Yêu cầu bổ sung". |
| Không thụ lý | Giải quyết yêu cầu bồi thường | Không thụ lý (kết thúc xử lý).<br>- Trường hợp lý do KTL_01 có chọn Chuyển CQGQBT: Đã chuyển CQGQBT và tạo hồ sơ mới tại cơ quan tiếp nhận như Nội dung trình "Chuyển CQGQBT". |
| Chuyển CQGQBT | Giải quyết yêu cầu bồi thường | Đã chuyển CQGQBT (kết thúc xử lý tại đơn vị hiện tại).<br>- Hệ thống tạo hồ sơ Yêu cầu bồi thường mới (mã mới) tại cơ quan tiếp nhận, trạng thái "Chờ phân công", bắt đầu lại từ bước Tiếp nhận. |
| Quyết định GQBT | Giải quyết yêu cầu bồi thường - Quyết định giải quyết bồi thường | Chờ ban hành.<br>- Cán bộ chủ trì thực hiện "Ban hành" (đính file quyết định đã ký, nhập Số, Ngày quyết định) thì quyết định chuyển "Đã ban hành". |
| Hủy QĐ | Giải quyết yêu cầu bồi thường - Quyết định giải quyết bồi thường | Đã hủy |
| Sửa chữa, đính chính QĐ | Giải quyết yêu cầu bồi thường - Quyết định giải quyết bồi thường | Quyết định sửa chữa, đính chính có hiệu lực. |

\- Ví dụ Không thụ lý với lý do KTL_01 (Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình) và Chuyển CQGQBT:

\+ Hồ sơ BT-2026-015 do UBND quận Hoàng Mai giải quyết; luồng phân công: UBND quận Hoàng Mai → Phòng Tư pháp - UBND quận Hoàng Mai → cán bộ chủ trì.

\+ Cán bộ chủ trì chọn Lý do không thụ lý KTL_01, chọn Chuyển CQGQBT, Cơ quan tiếp nhận mới "Công an quận Thanh Xuân, Thành phố Hà Nội", nhập Nội dung/Căn cứ chuyển, chọn Lãnh đạo phê duyệt của Phòng Tư pháp và trình. Hồ sơ "Chờ duyệt", dòng phụ "Không thụ lý".

\+ Lãnh đạo Phòng Tư pháp được giao phê duyệt, chọn Lãnh đạo phê duyệt cấp tiếp theo của UBND quận Hoàng Mai. Dòng phụ vẫn là "Không thụ lý".

\+ Lãnh đạo UBND quận Hoàng Mai được giao phê duyệt (cấp cuối): hồ sơ BT-2026-015 chuyển "Đã chuyển CQGQBT"; hệ thống tạo hồ sơ mới (mã mới) tại Công an quận Thanh Xuân, trạng thái "Chờ phân công", hiển thị tại tab "Chờ phân công" của Nhóm lãnh đạo Công an quận Thanh Xuân. Hồ sơ mới lưu mã hồ sơ gốc, đơn vị chuyển, Nội dung chuyển xử lý và tài liệu chuyển; hồ sơ gốc lưu mã hồ sơ mới.

---

<a id="vcld-mh01"></a>
#### 4.3.3.29.4. MH01 - Màn hình Hồ sơ trình Lãnh đạo

##### 4.3.3.29.4.1. Màn hình

![MH01 - Tab Chờ phân công](images/VCLD_MH01_Tab_Cho_phan_cong.png)

![MH01 - Tab Chờ duyệt](images/VCLD_MH01_Tab_Cho_duyet.png)

![MH01 - Tab Đã xử lý](images/VCLD_MH01_Tab_Da_xu_ly.png)

##### 4.3.3.29.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Thanh tab nghiệp vụ** | Tab | - | `Chờ phân công` | Control UI: Thanh tab đặt trên cùng màn hình, phía trên khối bộ lọc (bố cục như màn Giải quyết yêu cầu bồi thường).<br>- Gồm 03 tab:<br>+ `Chờ phân công`<br>+ `Chờ duyệt`<br>+ `Đã xử lý`<br>- Mỗi tab hiển thị số hồ sơ của tab.<br>- Màn hình không hiển thị dòng thông tin đơn vị/vai trò của người dùng. |
| **I. Lọc, tìm kiếm thông tin** | - | - | - | Control UI: Khối bộ lọc; các điều kiện kết hợp theo điều kiện AND; áp dụng cho tab đang chọn. |
| Mã hồ sơ | String(50) | Không | Trống | Control UI: Input text, placeholder "Nhập mã hồ sơ...".<br>- Tìm gần đúng, không phân biệt hoa thường, không phân biệt dấu. |
| Họ và tên người yêu cầu | String(100) | Không | Trống | Control UI: Input text, placeholder "Nhập họ và tên người yêu cầu...".<br>- Tìm gần đúng, không phân biệt hoa thường, không phân biệt dấu. |
| Loại yêu cầu | Enum(String(100)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Gồm "Tất cả" và các giá trị Danh mục Loại yêu cầu [DM_54] áp dụng cho đơn vị của người dùng. |
| Nội dung trình | Enum(String(100)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Gồm:<br>+ Tất cả<br>+ Yêu cầu bổ sung<br>+ Từ chối<br>+ Kết quả xác định CQGQBT<br>+ Tiếp nhận hồ sơ<br>+ Không thụ lý<br>+ Chuyển CQGQBT<br>+ Quyết định GQBT<br>+ Hủy QĐ<br>+ Sửa chữa, đính chính QĐ<br>- "Yêu cầu bổ sung" dùng chung cho cả 02 phân hệ Xác định cơ quan giải quyết bồi thường và Giải quyết yêu cầu bồi thường (danh sách không lặp giá trị).<br>- So khớp với Nội dung trình của phiếu trình đang chờ duyệt (hồ sơ "Chờ duyệt"), của phiếu bị trả lại (hồ sơ "Bị trả lại") hoặc của phiếu trình gần nhất (hồ sơ ở trạng thái khác, tại tab Đã xử lý). |
| **II. Tab danh sách** | - | - | Chờ phân công | Control UI: 03 tab, mỗi tab có ô đếm số hồ sơ của tab (không phụ thuộc bộ lọc).<br>- Dòng ghi chú dưới tab thay đổi theo tab đang chọn. |
| Chờ phân công | Integer(10) | - | Theo dữ liệu | Hồ sơ ở "Chờ phân công" hoặc "Đang phân công" mà người dùng thuộc Nhóm lãnh đạo của đơn vị đang phân công.<br>- Ghi chú: "Hồ sơ đang chờ lãnh đạo đơn vị phân công: chuyển đơn vị cấp dưới hoặc phân công cán bộ chủ trì, phối hợp theo Cấu hình luồng xử lý." |
| Chờ duyệt | Integer(10) | - | Theo dữ liệu | Hồ sơ ở "Chờ duyệt" mà người dùng là Lãnh đạo được giao đích danh phê duyệt ở cấp hiện tại.<br>- Ghi chú: "Hồ sơ cán bộ chủ trì đã trình. Luồng phê duyệt đi ngược chiều luồng phân công; từ chối phê duyệt ở bất kỳ cấp nào thì hồ sơ chuyển [Bị trả lại]." |
| Đã xử lý | Integer(10) | - | Theo dữ liệu | Hồ sơ người dùng đã Chuyển đơn vị, Phân công cán bộ, Phê duyệt hoặc Từ chối phê duyệt; hiển thị với mọi trạng thái hiện tại.<br>- Ghi chú: "Hồ sơ đã phân công/phê duyệt. Được Thu hồi khi bên nhận chưa xử lý; việc bên nhận đã xem hồ sơ không ảnh hưởng đến quyền thu hồi." |
| **III. Bảng danh sách hồ sơ** | - | - | - | Control UI: Bảng.<br>- Không có dữ liệu: 01 dòng căn giữa, in nghiêng "Không có hồ sơ.". |
| STT | Integer(10) | - | Tự sinh | |
| Mã hồ sơ | String(50) | - | Theo dữ liệu | Chữ đậm, căn giữa. |
| Loại yêu cầu | String(100) | - | Theo dữ liệu | Tên Loại yêu cầu.<br>- Hồ sơ có Nguồn hồ sơ: dòng phụ "Nguồn: [Nguồn hồ sơ]" (VD "Nguồn: Xác định CQGQBT"). |
| Họ và tên người yêu cầu | String(100) | - | Theo dữ liệu | Chữ đậm. |
| Nội dung cần xử lý | String(1000) | - | Theo tab | Tab Chờ phân công: "Phân công xử lý tại [Đơn vị đang phân công]".<br>- Tab Chờ duyệt: "Phê duyệt: [Nội dung trình]".<br>- Tab Đã xử lý: thao tác gần nhất của người dùng trên hồ sơ, dạng "[Thao tác]: [Nội dung]". |
| Người chuyển/trình | String(255) | - | Theo tab | Tab Chờ duyệt: người phê duyệt cấp liền trước "[Họ tên] ([Đơn vị])"; chưa có cấp nào phê duyệt: "[Họ tên] - Cán bộ chủ trì".<br>- Tab còn lại: người thực hiện lượt chuyển gần nhất "[Họ tên] ([Đơn vị])"; hồ sơ chưa có lượt chuyển: "[Họ tên] - Cán bộ tiếp nhận" hoặc "[Họ tên] - Chuyển từ Xác định CQGQBT". |
| Thời điểm nhận | DateTime | - | Theo tab | Định dạng hh:mm dd/mm/yyyy.<br>- Tab Chờ duyệt: thời điểm phê duyệt cấp liền trước hoặc thời điểm trình.<br>- Tab còn lại: thời điểm lượt chuyển gần nhất; chưa có lượt chuyển: thời điểm tiếp nhận. |
| Trạng thái hồ sơ | String(50) | - | Theo dữ liệu | Control UI: Badge theo trạng thái hồ sơ.<br>- Dòng phụ dưới badge (chữ nhỏ, màu xám):<br>+ Hồ sơ "Chờ duyệt": "[Nội dung trình]", VD "Yêu cầu bổ sung" (không hiển thị cấp duyệt; các cấp duyệt xem tại bảng Trình phê duyệt của màn chi tiết)<br>+ Hồ sơ "Bị trả lại": "[Nội dung trình]" của phiếu bị trả lại<br>+ Trạng thái khác: không hiển thị dòng phụ |
| Thao tác | - | - | Theo tab | Tab Chờ phân công: nút "Phân công".<br>- Tab Chờ duyệt: nút "Phê duyệt", nút "Từ chối".<br>- Tab Đã xử lý: nút "Thu hồi", chỉ hiển thị khi hồ sơ thỏa điều kiện thu hồi tại [Quy tắc chung](#vcld-quy-tac-chung).<br>- Mọi tab có nút "Xem" mở [MH02 - Popup Xem chi tiết hồ sơ](#vcld-mh02). |

##### 4.3.3.29.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | - Lọc danh sách của tab đang chọn theo đồng thời các điều kiện. |
| 2 | Xóa bộ lọc | Nút | - Xóa các điều kiện lọc, đưa Loại yêu cầu và Nội dung trình về "Tất cả" và tải lại danh sách. |
| 3 | Chọn tab | Tab | - Hiển thị danh sách và dòng ghi chú của tab; giữ nguyên điều kiện lọc.<br>- Mở màn hình kèm tham số tab (Chờ phân công, Chờ duyệt, Đã xử lý) thì chọn sẵn tab tương ứng. |
| 4 | Click dòng dữ liệu / Xem | Row click / Nút | - Mở [MH02 - Popup Xem chi tiết hồ sơ](#vcld-mh02). Click vào nút tại cột Thao tác thì chỉ thực hiện thao tác đó. |
| 5 | Phân công | Nút | - Mở [MH03 - Popup Phân công xử lý hồ sơ](#vcld-mh03). |
| 6 | Phê duyệt | Nút | - Mở [MH04 - Popup Phê duyệt / Từ chối phê duyệt](#vcld-mh04) ở chế độ Phê duyệt. |
| 7 | Từ chối | Nút | - Mở [MH04 - Popup Phê duyệt / Từ chối phê duyệt](#vcld-mh04) ở chế độ Từ chối phê duyệt. |
| 8 | Thu hồi | Nút | - Mở [MH05 - Popup Xác nhận thu hồi](#vcld-mh05). |

---

<a id="vcld-mh02"></a>
#### 4.3.3.29.5. MH02 - Popup Xem chi tiết hồ sơ

##### 4.3.3.29.5.1. Màn hình

![MH02 - Chi tiết hồ sơ đang phân công, có Thu hồi](images/VCLD_MH02_Popup_Xem_chi_tiet_Qua_trinh_phan_cong.png)

![MH02 - Chi tiết hồ sơ chờ duyệt](images/VCLD_MH02_Popup_Xem_chi_tiet_Trinh_phe_duyet.png)

##### 4.3.3.29.5.2. Mô tả thông tin trên màn hình

\- Khi lãnh đạo là bên nhận của lượt chuyển gần nhất (hoặc Lãnh đạo được giao phê duyệt cấp hiện tại) mở popup lần đầu, hệ thống ghi thời điểm đã xem theo [Quy tắc chung](#vcld-quy-tac-chung).

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | - | "Chi tiết hồ sơ [Mã hồ sơ]". |
| **I. Thông tin hồ sơ** | - | - | - | Chỉ đọc. |
| Mã hồ sơ | String(50) | - | Theo dữ liệu | |
| Loại yêu cầu | String(100) | - | Theo dữ liệu | |
| Nguồn hồ sơ | String(100) | - | Theo dữ liệu | Chỉ hiển thị khi hồ sơ có Nguồn hồ sơ.<br>- Hồ sơ sinh ra từ Chuyển CQGQBT tại Xác định cơ quan giải quyết bồi thường: kèm "Hồ sơ Xác định CQGQBT [Mã]" dạng liên kết, mở chi tiết hồ sơ Xác định cơ quan giải quyết bồi thường ở chế độ chỉ xem. |
| Trạng thái | String(50) | - | Theo dữ liệu | Control UI: Badge. |
| Đơn vị gốc | String(255) | - | Theo dữ liệu | |
| Đơn vị đang phân công | String(255) | - | Theo dữ liệu | |
| Họ và tên người yêu cầu | String(100) | - | Theo dữ liệu | Kèm Tư cách người yêu cầu trong ngoặc. |
| Người bị thiệt hại | String(500) | - | Theo dữ liệu | Chỉ hiển thị khi có thông tin người bị thiệt hại: "[Họ và tên] - Ngày sinh: [dd/mm/yyyy] - [Loại giấy tờ]: [Số giấy tờ]". |
| Hành vi gây thiệt hại | Text | - | Theo dữ liệu | Không có dữ liệu: "--". |
| Nội dung chuyển xử lý | Text | - | Theo dữ liệu | Chỉ hiển thị với hồ sơ sinh ra từ Chuyển CQGQBT (từ Xác định cơ quan giải quyết bồi thường hoặc từ cơ quan giải quyết bồi thường khác); kèm danh sách tệp đính kèm. |
| Tài liệu đính kèm | List | - | Theo dữ liệu | "[Tên tài liệu] - [Tên tệp]"; không có: "Không có". |
| Cán bộ chủ trì | String(255) | - | Theo dữ liệu | "[Họ tên] - [Chức danh]"; chưa phân công: "Chưa phân công". |
| Cán bộ phối hợp | String(1000) | - | Theo dữ liệu | Danh sách họ tên; không có: "Không có". |
| **II. Trình phê duyệt** | - | - | - | Chỉ hiển thị khi hồ sơ đã được trình phê duyệt. |
| Văn bản dự thảo trình Lãnh đạo | Object | - | Ẩn | Control UI: Info box, hiển thị đầu khối Trình phê duyệt.<br>- Chỉ hiển thị khi lần trình có Văn bản dự thảo (quy tắc 15 tại [Quy tắc chung](#vcld-quy-tac-chung)).<br>- Hiển thị tên tệp sẽ trình Lãnh đạo kèm nhãn nguồn:<br>+ Hệ thống sinh theo mẫu (VD Mẫu 03/BTNN, Mẫu 04/BTNN, Mẫu 18/BTNN): liên kết "Xem dự thảo" và "Tải file"<br>+ Bản cán bộ tải lên: liên kết "Xem file" |
| Nội dung trình | String(1000) | - | Theo dữ liệu | "[Nội dung trình] - [Người trình] - [Thời điểm trình]" và Ý kiến trình. |
| Bảng cấp phê duyệt | Table | - | Theo dữ liệu | Cột: Cấp; Đơn vị phê duyệt; Nhóm lãnh đạo; Kết quả.<br>- Kết quả:<br>+ "Phê duyệt - [Người] - [Thời điểm] ([Ý kiến])"<br>+ "Từ chối phê duyệt - [Người] - [Thời điểm] ([Lý do])"<br>+ "Đang chờ phê duyệt (Giao: [Lãnh đạo được giao])"<br>+ "Đang chờ phê duyệt - Đã xem lúc hh:mm dd/mm/yyyy (Giao: [Lãnh đạo được giao])"<br>+ "Chưa đến lượt" |
| **III. Quá trình phân công** | - | - | - | Control UI: Bảng; chưa có lượt chuyển: "Chưa có lượt chuyển.". |
| STT | Integer(10) | - | Tự sinh | |
| Lượt chuyển | String(1000) | - | Theo dữ liệu | "[Người chuyển] ([Đơn vị chuyển]) chuyển [Đơn vị nhận]" hoặc "[Người chuyển] ([Đơn vị chuyển]) phân công chủ trì [Họ tên], phối hợp [Họ tên]"; kèm dòng "Ý kiến chỉ đạo: [Nội dung]" nếu có. |
| Thời điểm | DateTime | - | Theo dữ liệu | hh:mm dd/mm/yyyy. |
| Tình trạng | String(100) | - | Theo dữ liệu | Gồm:<br>+ "Đã xử lý"<br>+ "Chưa xử lý - Chưa xem"<br>+ "Chưa xử lý - Đã xem lúc hh:mm dd/mm/yyyy" |
| **IV. Lịch sử xử lý** | - | - | - | Danh sách thao tác, mới nhất ở trên: "[Thao tác] - [Người thực hiện] - [Thời điểm]" và Nội dung.<br>- Thao tác "Từ chối phê duyệt" có viền màu đỏ để phân biệt. |

##### 4.3.3.29.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Đóng / Đóng (x) | Nút / Icon | - Đóng popup. |
| 2 | Mở hồ sơ trong phân hệ | Nút | - Hiển thị khi hồ sơ Loại yêu cầu "Xác định cơ quan giải quyết bồi thường" không ở "Chờ phân công", "Đang phân công".<br>- Mở chi tiết hồ sơ tại [Xác định cơ quan giải quyết bồi thường - Xác định cơ quan giải quyết bồi thường - Bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md) ở chế độ chỉ xem. |
| 3 | Phân công | Nút | - Hiển thị khi người dùng được phân công hồ sơ (quy tắc 3 tại [Quy tắc chung](#vcld-quy-tac-chung)).<br>- Đóng popup, mở [MH03 - Popup Phân công xử lý hồ sơ](#vcld-mh03). |
| 4 | Từ chối | Nút | - Hiển thị khi người dùng là Lãnh đạo được giao phê duyệt cấp hiện tại.<br>- Đóng popup, mở [MH04 - Popup Phê duyệt / Từ chối phê duyệt](#vcld-mh04) ở chế độ Từ chối phê duyệt. |
| 5 | Phê duyệt | Nút | - Hiển thị khi người dùng là Lãnh đạo được giao phê duyệt cấp hiện tại.<br>- Đóng popup, mở [MH04 - Popup Phê duyệt / Từ chối phê duyệt](#vcld-mh04) ở chế độ Phê duyệt.<br>- Lãnh đạo xem chi tiết hồ sơ kèm Văn bản dự thảo (nếu có) rồi chọn "Phê duyệt" hoặc "Từ chối" (ký duyệt theo quy tắc 12 tại [Quy tắc chung](#vcld-quy-tac-chung)). |
| 6 | Thu hồi | Nút | - Hiển thị khi hồ sơ thỏa điều kiện thu hồi đối với người dùng.<br>- Đóng popup, mở [MH05 - Popup Xác nhận thu hồi](#vcld-mh05). |
| 7 | Xem dự thảo | Liên kết | - Hiển thị trong khối Văn bản dự thảo khi văn bản do hệ thống sinh theo mẫu.<br>- Mở văn bản dự thảo ở tab trình duyệt mới, dạng trang A4, có nút "Tải file (Word .doc)" và "In". |
| 8 | Tải file | Liên kết | - Hiển thị trong khối Văn bản dự thảo khi văn bản do hệ thống sinh theo mẫu.<br>- Tải về máy văn bản dự thảo định dạng Word (.doc). |
| 9 | Xem file | Liên kết | - Hiển thị khi văn bản trình là tệp cán bộ tải lên.<br>- Mở xem tệp văn bản trình Lãnh đạo. |

---

<a id="vcld-mh03"></a>
#### 4.3.3.29.6. MH03 - Popup Phân công xử lý hồ sơ

##### 4.3.3.29.6.1. Màn hình

![MH03 - Popup Phân công xử lý hồ sơ](images/VCLD_MH03_Popup_Phan_cong.png)

##### 4.3.3.29.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | - | "Phân công xử lý hồ sơ [Mã hồ sơ]". |
| Thông tin ngữ cảnh | String(500) | - | Theo hồ sơ | "Đơn vị đang phân công: [Tên đơn vị] - Người yêu cầu: [Họ và tên]". |
| Hình thức phân công | Enum(String(50)) | Có | Hình thức đầu tiên được cấu hình | Control UI: Radio.<br>- Chỉ hiển thị hình thức đã cấu hình cho đơn vị đang phân công và có dữ liệu:<br>+ Chuyển đơn vị<br>+ Phân công cán bộ<br>- Đơn vị chưa cấu hình hướng nào: hiển thị "Đơn vị chưa được cấu hình hướng xử lý." |
| Đơn vị nhận | Enum(String(255)) | Có (Chuyển đơn vị) | Trống | Control UI: Hộp chọn, placeholder "Chọn đơn vị nhận...".<br>- Chỉ hiển thị khi chọn "Chuyển đơn vị".<br>- Danh sách: các đơn vị cấp dưới trực tiếp đã chọn tại cấu hình của đơn vị đang phân công. |
| Cán bộ chủ trì | Enum(String(255)) | Có (Phân công cán bộ) | Trống | Control UI: Hộp chọn, chọn 01 cán bộ, placeholder "Chọn cán bộ chủ trì...".<br>- Chỉ hiển thị khi chọn "Phân công cán bộ".<br>- Danh sách: cán bộ đã chọn tại cấu hình của đơn vị đang phân công, hiển thị "[Họ tên] - [Chức danh]". |
| Cán bộ phối hợp | List(String) | Không | Trống | Control UI: Danh sách checkbox, chọn nhiều.<br>- Chỉ hiển thị khi chọn "Phân công cán bộ".<br>- Danh sách: cán bộ đã cấu hình, trừ cán bộ chủ trì đang chọn; không có: "Không có cán bộ khác."<br>- Dòng hướng dẫn: "Cán bộ phối hợp được xem hồ sơ và bổ sung tài liệu; không được trình phê duyệt." |
| Ý kiến chỉ đạo | Text(2000) | Không | Trống | Control UI: Textarea, placeholder "Nhập ý kiến chỉ đạo...". |

##### 4.3.3.29.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hình thức phân công | Radio | - Đổi hình thức: hiển thị trường Đơn vị nhận hoặc nhóm trường Cán bộ chủ trì, Cán bộ phối hợp. |
| 2 | Cán bộ chủ trì | Hộp chọn | - Đổi cán bộ chủ trì: tải lại danh sách Cán bộ phối hợp, loại cán bộ chủ trì. |
| 3 | Xác nhận phân công | Nút | - TH1 (Bỏ trống Đơn vị nhận hoặc Cán bộ chủ trì): hiển thị "Đây là trường bắt buộc" dưới trường, không lưu.<br>- TH2 (Hồ sơ không còn hợp lệ: đã được thành viên khác xử lý, đã bị thu hồi hoặc người dùng không còn thuộc Nhóm lãnh đạo): hiển thị "Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phân công. Vui lòng tải lại danh sách."<br>- TH3 (Đơn vị nhận không còn thuộc cấu hình của đơn vị đang phân công): "Đơn vị nhận không thuộc cấu hình luồng của đơn vị hiện tại."<br>- TH4 (Đơn vị đang phân công không còn được cấu hình phân công cán bộ): "Đơn vị hiện tại không được cấu hình phân công cán bộ."<br>- TH Hợp lệ - Chuyển đơn vị: lượt chuyển gần nhất (nếu có) chuyển "Đã xử lý"; tạo lượt chuyển mới "Chưa xử lý"; Đơn vị đang phân công = Đơn vị nhận; hồ sơ chuyển "Đang phân công"; ghi lịch sử "Chuyển đơn vị" với nội dung "Chuyển [Đơn vị nhận] phân công. Ý kiến chỉ đạo: [Nội dung]".<br>- TH Hợp lệ - Phân công cán bộ: lượt chuyển gần nhất (nếu có) chuyển "Đã xử lý"; tạo lượt chuyển mới "Chưa xử lý"; lưu Cán bộ chủ trì, Cán bộ phối hợp; hồ sơ chuyển "Chờ tiếp nhận" tại phân hệ tương ứng (Xác định cơ quan giải quyết bồi thường hoặc Giải quyết yêu cầu bồi thường); ghi lịch sử "Phân công cán bộ" với nội dung "Chủ trì: [Họ tên]; Phối hợp: [Họ tên]. Ý kiến chỉ đạo: [Nội dung]".<br>- Sau khi thành công: đóng popup, tải lại danh sách, hiển thị "Đã phân công hồ sơ [Mã hồ sơ]. Trạng thái: [Trạng thái]." |
| 4 | Hủy bỏ / Đóng (x) | Nút / Icon | - Đóng popup, không lưu. |

---

<a id="vcld-mh04"></a>
#### 4.3.3.29.7. MH04 - Popup Phê duyệt / Từ chối phê duyệt

##### 4.3.3.29.7.1. Màn hình

![MH04 - Popup Phê duyệt](images/VCLD_MH04_Popup_Phe_duyet.png)

![MH04 - Popup Từ chối phê duyệt](images/VCLD_MH04_Popup_Tu_choi_phe_duyet.png)

##### 4.3.3.29.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | Theo chế độ | Phê duyệt: "Phê duyệt hồ sơ [Mã hồ sơ]".<br>- Từ chối: "Từ chối phê duyệt hồ sơ [Mã hồ sơ]". |
| Văn bản dự thảo trình Lãnh đạo | Object | - | Ẩn | Control UI: Info box, hiển thị trên cùng phần thông tin của popup, ở cả chế độ Phê duyệt và Từ chối.<br>- Chỉ hiển thị khi lần trình có Văn bản dự thảo (quy tắc 15 tại [Quy tắc chung](#vcld-quy-tac-chung)).<br>- Nội dung và liên kết giống trường Văn bản dự thảo trình Lãnh đạo tại [MH02 - Popup Xem chi tiết hồ sơ](#vcld-mh02).<br>- Thao tác Phê duyệt / Từ chối phê duyệt không thay đổi Văn bản dự thảo. |
| Nội dung trình | String(1000) | - | Theo hồ sơ | Chỉ đọc: "[Nội dung trình] - [Cán bộ chủ trì]" và Ý kiến trình. |
| Cấp phê duyệt | String(255) | - | Theo hồ sơ | Chỉ đọc: "[i]/[n] - [Đơn vị phê duyệt cấp hiện tại]". |
| Hướng dẫn kết quả | String(500) | - | Theo chế độ | Phê duyệt, chưa phải cấp cuối: "Sau khi phê duyệt, hồ sơ chuyển [Đơn vị cấp tiếp theo] phê duyệt."<br>- Phê duyệt, cấp cuối: "Cấp phê duyệt cuối cùng. Sau khi phê duyệt, hồ sơ chuyển [Trạng thái theo Nội dung trình]." (theo [Kết quả khi cấp cuối phê duyệt](#vcld-ket-qua-duyet)).<br>- Từ chối: "Sau khi từ chối phê duyệt, hồ sơ chuyển [Bị trả lại] cho cán bộ chủ trì." |
| Lãnh đạo phê duyệt cấp tiếp theo | Enum(String(255)) | Có (khi hiển thị) | Trống | Control UI: Hộp chọn, chọn 01 Lãnh đạo, placeholder "Chọn Lãnh đạo [Đơn vị cấp tiếp theo]...".<br>- Chỉ hiển thị ở chế độ Phê duyệt khi đồng thời: cấp hiện tại chưa phải cấp cuối và đơn vị cấp tiếp theo có Nhóm lãnh đạo.<br>- Danh sách: thành viên Nhóm lãnh đạo của đơn vị phê duyệt cấp tiếp theo, hiển thị "[Họ tên] - [Chức danh]".<br>- Lãnh đạo được chọn là người duy nhất thấy và phê duyệt hồ sơ ở cấp tiếp theo. |
| Ý kiến phê duyệt | Text(2000) | Không | Trống | Control UI: Textarea, placeholder "Nhập ý kiến phê duyệt...".<br>- Chỉ có ở chế độ Phê duyệt. |
| Lý do từ chối phê duyệt | Text(2000) | Có | Trống | Control UI: Textarea, placeholder "Nhập lý do từ chối phê duyệt...".<br>- Chỉ có ở chế độ Từ chối. |

##### 4.3.3.29.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Phê duyệt | Nút (chế độ Phê duyệt) | - TH1 (Hiển thị trường Lãnh đạo phê duyệt cấp tiếp theo mà bỏ trống): hiển thị "Đây là trường bắt buộc" dưới trường, không lưu.<br>- TH2 (Hồ sơ không còn chờ cấp này phê duyệt hoặc người dùng không còn là Lãnh đạo được giao): "Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách."<br>- TH3 (Lãnh đạo cấp tiếp theo được chọn không còn thuộc Nhóm lãnh đạo của đơn vị cấp tiếp theo): "Lãnh đạo được chọn không thuộc nhóm lãnh đạo của cấp tiếp theo."<br>- TH4 (Chưa phải cấp cuối): ghi kết quả "Phê duyệt" của cấp hiện tại; giao hồ sơ cho Lãnh đạo cấp tiếp theo đã chọn; hồ sơ giữ "Chờ duyệt", dòng phụ giữ "[Nội dung trình]"; ghi lịch sử "Phê duyệt" với nội dung "[Nội dung trình]: phê duyệt cấp [Đơn vị]; chuyển [Lãnh đạo cấp tiếp theo] - [Đơn vị cấp tiếp theo]. Ý kiến: [Nội dung]"; hiển thị "Hồ sơ [Mã hồ sơ]: [Chờ duyệt] - chuyển [Lãnh đạo cấp tiếp theo] - [Đơn vị cấp tiếp theo]."<br>- TH5 (Cấp cuối): hồ sơ chuyển trạng thái theo Nội dung trình tại [Kết quả khi cấp cuối phê duyệt](#vcld-ket-qua-duyet); Nội dung trình "Chuyển CQGQBT" thì đồng thời tạo hồ sơ mới tại cơ quan tiếp nhận ở trạng thái "Chờ phân công"; ghi lịch sử "Phê duyệt" với nội dung "Phê duyệt cấp cuối ([Đơn vị]): [Nội dung trình]. Hồ sơ chuyển [Trạng thái]."; hiển thị "Hồ sơ [Mã hồ sơ]: [Trạng thái]."<br>- Phê duyệt là thao tác ký duyệt (quy tắc 12 tại [Quy tắc chung](#vcld-quy-tac-chung)).<br>- Sau khi xử lý: đóng popup, tải lại danh sách. |
| 2 | Từ chối phê duyệt | Nút (chế độ Từ chối) | - TH1 (Bỏ trống Lý do từ chối phê duyệt): hiển thị "Đây là trường bắt buộc" dưới trường, không lưu.<br>- TH2 (Hồ sơ không còn hợp lệ): "Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách."<br>- TH Hợp lệ: ghi kết quả "Từ chối phê duyệt" của cấp hiện tại; hồ sơ chuyển "Bị trả lại" về cán bộ chủ trì, giữ Nội dung trình của phiếu bị trả lại; lưu người trả lại, đơn vị, thời điểm, lý do; ghi lịch sử "Từ chối phê duyệt" với nội dung "Trả lại cán bộ chủ trì. Lý do: [Lý do]"; đóng popup, tải lại danh sách, hiển thị "Hồ sơ [Mã hồ sơ]: [Bị trả lại]." |
| 3 | Hủy bỏ / Đóng (x) | Nút / Icon | - Đóng popup, không lưu. |
| 4 | Xem dự thảo / Tải file / Xem file | Liên kết | - Hiển thị trong khối Văn bản dự thảo (khi lần trình có Văn bản dự thảo).<br>- Xử lý như chức năng cùng tên tại [MH02 - Popup Xem chi tiết hồ sơ](#vcld-mh02); giữ nguyên dữ liệu đang nhập trên popup Phê duyệt / Từ chối phê duyệt. |

---

<a id="vcld-mh05"></a>
#### 4.3.3.29.8. MH05 - Popup Xác nhận thu hồi

##### 4.3.3.29.8.1. Màn hình

![MH05 - Popup Xác nhận thu hồi](images/VCLD_MH05_Popup_Thu_hoi.png)

##### 4.3.3.29.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(50) | - | - | "Xác nhận". |
| Nội dung xác nhận | String(500) | - | Theo hồ sơ | "Bạn có chắc chắn muốn thu hồi hồ sơ [Mã hồ sơ]?"<br>- Thu hồi lượt chuyển mà bên nhận đã xem: thêm "Bên nhận đã xem lúc hh:mm dd/mm/yyyy." |

##### 4.3.3.29.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Thu hồi (trước khi mở popup) | Nút | - Hồ sơ không còn thỏa điều kiện thu hồi: hiển thị "Không thể thu hồi: bên nhận đã xử lý hồ sơ.", tải lại danh sách, không mở popup. |
| 2 | Đồng ý | Nút | - Kiểm tra lại điều kiện thu hồi. Không thỏa: "Không thể thu hồi: bên nhận đã xử lý hồ sơ."<br>- TH Thu hồi lượt chuyển: xử lý theo quy tắc Thu hồi tại [Quy tắc chung](#vcld-quy-tac-chung); ghi lịch sử "Thu hồi" với nội dung "Thu hồi hồ sơ đã chuyển [Đơn vị nhận]." hoặc "Thu hồi phân công cán bộ [Họ tên]."<br>- TH Thu hồi kết quả phê duyệt: xóa kết quả phê duyệt của cấp đã thu hồi, hồ sơ quay lại chờ Lãnh đạo đã thu hồi phê duyệt tại cấp đó; ghi lịch sử "Thu hồi phê duyệt" với nội dung "Thu hồi kết quả phê duyệt đã chuyển [Đơn vị cấp trên]."<br>- Sau khi thành công: đóng popup, tải lại danh sách, hiển thị "Đã thu hồi hồ sơ [Mã hồ sơ]. Trạng thái: [Trạng thái]." |
| 3 | Hủy bỏ / Đóng (x) | Nút / Icon | - Đóng popup, không thu hồi. |

---

#### 4.3.3.29.9. Ghi chú

\- Các quy tắc sau được áp dụng theo mặc định, chưa được xác nhận chính thức:

\+ Cán bộ phối hợp chỉ được xem hồ sơ và bổ sung tài liệu, không được trình phê duyệt.

\+ Hồ sơ do cán bộ tạo trực tiếp tại phân hệ Xác định cơ quan giải quyết bồi thường bỏ qua bước phân công, người tạo là cán bộ chủ trì; luồng phê duyệt theo cây đơn vị của người tạo.

\+ "Bị trả lại" là một trạng thái chung cho mọi Nội dung trình; Lãnh đạo phê duyệt được giao đích danh ở từng cấp; luồng phê duyệt đi hết đường ngược tới đơn vị gốc.

\- Thanh "Người dùng giả lập" trên mockup chỉ phục vụ minh họa phân quyền theo đơn vị, không thuộc phạm vi chức năng.
