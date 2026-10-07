/* Sinh tự động từ spec biểu mẫu Excel (bieumau_spec.json) - không sửa tay. */
window.NDL_SPEC = {
   "books" : [
      {
    "file":  "Mau_Nhan_du_lieu_BPBD_QSDD_TSGLVD.xlsx",
    "guideExtra":  [
                       "",
                       "5. Lưu ý riêng cho quyền sử dụng đất, tài sản gắn liền với đất (Theo Mẫu số 01a - Nghị định 99/2022/NĐ-CP)",
                       "- Người yêu cầu đăng ký: Chọn một trong 4 nhóm: Bên nhận bảo đảm; Bên bảo đảm; Quản tài viên /Doanh nghiệp quản lý, thanh lý tài sản; Chi nhánh của pháp nhân, người đại diện.",
                       "- Loại đăng ký gồm: Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký (không có Sửa chữa sai sót).",
                       "- Đăng ký lần đầu: nhập Số hợp đồng bảo đảm, Thời điểm có hiệu lực (hh:mm dd/mm/yyyy).",
                       "- Đăng ký thay đổi: nhập Số hồ sơ đăng ký thế chấp lần đầu, Nội dung thay đổi và thông tin Hợp đồng bảo đảm/Văn bản sửa đổi, bổ sung hợp đồng bảo đảm/Văn bản chuyển giao quyền đòi nợ, chuyển giao nghĩa vụ/Văn bản khác chứng minh có căn cứ đăng ký thay đổi (Tên văn bản, Số văn bản nếu có, Thời điểm có hiệu lực hoặc thời điểm ký); để trống Số hợp đồng bảo đảm, Thời điểm có hiệu lực.",
                       "- Mô tả tài sản bảo đảm gồm 5 nhóm theo chuẩn Mẫu số 01a:",
                       "  + 5.1. Quyền sử dụng đất: Thửa đất số, Tờ bản đồ số, Mục đích sử dụng đất, Thời hạn sử dụng đất, Địa chỉ thửa đất (bắt buộc), Giấy chứng nhận đối với quyền sử dụng đất (Tên, Số phát hành, Số vào sổ cấp giấy, Cơ quan cấp, Ngày cấp).",
                       "  + 5.2. Tài sản gắn liền với đất đã được chứng nhận quyền sở hữu: Giấy chứng nhận, Số của thửa đất nơi có tài sản, Tờ bản đồ số.",
                       "  + 5.3. Dự án đầu tư xây dựng nhà ở, dự án đầu tư xây dựng công trình không phải là nhà ở, dự án đầu tư nông nghiệp, dự án phát triển rừng, dự án khác có sử dụng đất: Giấy chứng nhận; Quyết định giao đất, cho thuê đất (đối với dự án đầu tư xây dựng nhà ở chưa được cấp Giấy chứng nhận); Số của thửa đất nơi có dự án, Tờ bản đồ số; Tên dự án, Căn cứ pháp lý xác lập dự án.",
                       "  + 5.4. Nhà ở hình thành trong tương lai, tài sản khác gắn liền với đất hình thành trong tương lai: 5.4.1 Bên bảo đảm đồng thời là người sử dụng đất (Giấy chứng nhận đối với quyền sử dụng đất, Số thửa, Tờ bản đồ, Mô tả); 5.4.2 Bên bảo đảm không đồng thời là người sử dụng đất (Số thửa, Tờ bản đồ, Mô tả).",
                       "  + 5.5. Tài sản gắn liền với đất đã hình thành không phải là nhà ở mà pháp luật không quy định phải đăng ký quyền sở hữu và cũng chưa được đăng ký quyền sở hữu theo yêu cầu: 5.5.1 Bên bảo đảm đồng thời là người sử dụng đất (Giấy chứng nhận đối với quyền sử dụng đất, Số thửa, Tờ bản đồ, Mô tả tài sản gắn liền với đất); 5.5.2 Bên bảo đảm không đồng thời là người sử dụng đất (Số thửa, Tờ bản đồ, Mô tả tài sản gắn liền với đất)."
                   ],
    "hoSo":  [
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Mã hồ sơ trong file",
                     "k":  "ma",
                     "note":  "Do đơn vị lập file tự đặt, không trùng trong file. VD: HS001. Dùng để liên kết các sheet.",
                     "req":  true,
                     "w":  16
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Cơ quan đăng ký",
                     "k":  "coQuan",
                     "list":  "CO_QUAN_DK",
                     "note":  "Chọn trong danh sách cơ quan đăng ký của Loại tài sản (sheet DANH_MUC). Loại tài sản chỉ có 01 cơ quan thì đã điền sẵn.",
                     "req":  true,
                     "w":  36
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Loại đăng ký",
                     "k":  "loaiDK",
                     "list":  "LOAI_DK",
                     "note":  "Chọn trong danh sách.",
                     "req":  true,
                     "w":  22
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Số hồ sơ đăng ký biến động",
                     "k":  "soDK",
                     "note":  "Số do cơ quan đăng ký cấp cho lần đăng ký này.",
                     "req":  true,
                     "w":  22
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Thời điểm đăng ký",
                     "k":  "thoiDiem",
                     "note":  "dd/mm/yyyy hh:mm (24 giờ). VD: 15/09/2026 09:30",
                     "req":  true,
                     "w":  20
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Số hồ sơ đăng ký thế chấp lần đầu",
                     "k":  "soDKLD",
                     "note":  "Bắt buộc nếu Loại đăng ký khác “Đăng ký lần đầu”.",
                     "req":  false,
                     "w":  22
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Người yêu cầu đăng ký",
                     "k":  "nycLoai",
                     "list":  "NGUOI_YEU_CAU",
                     "note":  "Chọn trong danh sách.",
                     "req":  true,
                     "w":  30
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Số hợp đồng bảo đảm",
                     "k":  "soHD",
                     "note":  "Bắt buộc với Đăng ký lần đầu.",
                     "req":  false,
                     "w":  20,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ]
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Thời điểm có hiệu lực",
                     "k":  "ngayHD",
                     "note":  "hh:mm dd/mm/yyyy (24 giờ). VD: 09:00 14/09/2026",
                     "req":  false,
                     "w":  18,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ],
                     "fmt":  "hh:mm dd/mm/yyyy"
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "sub":  "Hợp đồng bảo đảm/Văn bản sửa đổi, bổ sung hợp đồng bảo đảm/Văn bản chuyển giao quyền đòi nợ, chuyển giao nghĩa vụ/Văn bản khác chứng minh có căn cứ đăng ký thay đổi",
                     "h":  "Tên văn bản",
                     "k":  "tenVB",
                     "note":  "Bắt buộc với Đăng ký thay đổi.",
                     "only":  [
                                  "Đăng ký thay đổi"
                              ],
                     "reqFor":  [
                                    "Đăng ký thay đổi"
                                ],
                     "w":  30
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Số văn bản",
                     "k":  "soVB",
                     "note":  "Nếu có.",
                     "only":  [
                                  "Đăng ký thay đổi"
                              ],
                     "w":  18
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Thời điểm có hiệu lực hoặc thời điểm ký",
                     "k":  "ngayVB",
                     "note":  "dd/mm/yyyy. Bắt buộc với Đăng ký thay đổi.",
                     "only":  [
                                  "Đăng ký thay đổi"
                              ],
                     "reqFor":  [
                                    "Đăng ký thay đổi"
                                ],
                     "w":  20
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Nội dung thay đổi",
                     "k":  "noiDung",
                     "note":  "Bắt buộc với Đăng ký thay đổi. Tóm tắt nội dung thay đổi.",
                     "req":  false,
                     "w":  36
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Căn cứ xóa đăng ký",
                     "k":  "canCu",
                     "list":  "CAN_CU_XOA",
                     "note":  "Bắt buộc với Xóa đăng ký. Chọn trong danh sách.",
                     "req":  false,
                     "w":  30
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Tên file đính kèm",
                     "k":  "files",
                     "note":  "Tên file trong file .zip tải lên kèm, nhiều file cách nhau bởi dấu ;",
                     "req":  false,
                     "w":  30
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Ghi chú",
                     "k":  "ghiChu",
                     "note":  "",
                     "req":  false,
                     "w":  24
                 }
             ],
    "lists":  {
                  "LOAI_TS":  [
                                  "Quyền sử dụng đất",
                                  "Tài sản gắn liền với đất đã được chứng nhận quyền sở hữu",
                                  "Dự án đầu tư xây dựng nhà ở, dự án đầu tư xây dựng công trình không phải là nhà ở, dự án đầu tư nông nghiệp, dự án phát triển rừng, dự án khác có sử dụng đất",
                                  "Nhà ở hình thành trong tương lai, tài sản khác gắn liền với đất hình thành trong tương lai",
                                  "Tài sản gắn liền với đất đã hình thành không phải là nhà ở mà pháp luật không quy định phải đăng ký quyền sở hữu và cũng chưa được đăng ký quyền sở hữu theo yêu cầu"
                              ],
                  "NGUOI_YEU_CAU":  [
                                        "Bên nhận bảo đảm",
                                        "Bên bảo đảm",
                                        "Quản tài viên /Doanh nghiệp quản lý, thanh lý tài sản",
                                        "Chi nhánh của pháp nhân, người đại diện"
                                    ],
                  "QUAN_HE_DAT":  [
                                      "Bên bảo đảm đồng thời là người sử dụng đất",
                                      "Bên bảo đảm không đồng thời là người sử dụng đất"
                                  ],
                  "LOAI_DK":  [
                                  "Đăng ký lần đầu",
                                  "Đăng ký thay đổi",
                                  "Xóa đăng ký"
                              ]
              },
    "samples":  {
                    "BEN_BAO_DAM":  [
                                        {
                                            "r":  [
                                                      "VD01",
                                                      "1",
                                                      "Cá nhân trong nước",
                                                      "Nguyễn Văn Mẫu",
                                                      "Căn cước / Căn cước công dân",
                                                      "001088000001",
                                                      "10/05/2021",
                                                      "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
                                                      "Việt Nam",
                                                      "Số 12 ngõ 5 phố Mẫu, Phường Mẫu, Hà Nội, Việt Nam",
                                                      ""
                                                  ]
                                        },
                                        {
                                            "r":  [
                                                      "VD02",
                                                      "1",
                                                      "Cá nhân trong nước",
                                                      "Nguyễn Văn Mẫu",
                                                      "Căn cước / Căn cước công dân",
                                                      "001088000001",
                                                      "10/05/2021",
                                                      "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
                                                      "Việt Nam",
                                                      "Số 12 ngõ 5 phố Mẫu, Phường Mẫu, Hà Nội, Việt Nam",
                                                      ""
                                                  ]
                                        }
                                    ],
                    "BEN_NHAN_BAO_DAM":  [
                                             {
                                                 "r":  [
                                                           "VD01",
                                                           "1",
                                                           "Tổ chức trong nước",
                                                           "Ngân hàng TMCP Mẫu A",
                                                           "Mã số doanh nghiệp",
                                                           "0100000001",
                                                           "",
                                                           "",
                                                           "Việt Nam",
                                                           "Số 1 phố Mẫu, Phường Mẫu, Hà Nội, Việt Nam",
                                                           ""
                                                       ]
                                             },
                                             {
                                                 "r":  [
                                                           "VD02",
                                                           "1",
                                                           "Tổ chức trong nước",
                                                           "Ngân hàng TMCP Mẫu A",
                                                           "Mã số doanh nghiệp",
                                                           "0100000001",
                                                           "",
                                                           "",
                                                           "Việt Nam",
                                                           "Số 1 phố Mẫu, Phường Mẫu, Hà Nội, Việt Nam",
                                                           ""
                                                       ]
                                             }
                                         ],
                    "HO_SO":  [
                                  {
                                      "r":  [
                                                "VD01",
                                                "Văn phòng Đăng ký đất đai thành phố Hà Nội",
                                                "Đăng ký lần đầu",
                                                "01/2026/TC",
                                                "15/09/2026 09:30",
                                                "",
                                                "Bên nhận bảo đảm",
                                                "125/2026/HĐTC",
                                                "09:00 14/09/2026",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "VD01_phieu.pdf",
                                                ""
                                            ]
                                  },
                                  {
                                      "r":  [
                                                "VD02",
                                                "Văn phòng Đăng ký đất đai thành phố Hà Nội",
                                                "Đăng ký thay đổi",
                                                "02/2026/TĐ",
                                                "20/09/2026 14:00",
                                                "01/2026/TC",
                                                "Bên nhận bảo đảm",
                                                "",
                                                "",
                                                "Văn bản sửa đổi, bổ sung hợp đồng thế chấp số 125/2026/HĐTC",
                                                "125/2026/HĐTC-SĐ01",
                                                "19/09/2026",
                                                "Bổ sung tài sản gắn liền với đất là nhà ở",
                                                "",
                                                "",
                                                ""
                                            ]
                                  },
                                  {
                                      "r":  [
                                                "VD03",
                                                "Văn phòng Đăng ký đất đai thành phố Hà Nội",
                                                "Xóa đăng ký",
                                                "03/2026/XĐK",
                                                "30/09/2026 10:15",
                                                "01/2026/TC",
                                                "Bên nhận bảo đảm",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "Chấm dứt nghĩa vụ được bảo đảm",
                                                "VD03_van_ban.pdf",
                                                ""
                                            ]
                                  }
                              ],
                    "TAI_SAN":  [
                                    {
                                        "r":  [
                                                  "VD01",
                                                  "1",
                                                  "Quyền sử dụng đất",
                                                  "",
                                                  "125",
                                                  "18",
                                                  "Số 12 ngõ 5 phố Mẫu, Phường Mẫu, quận Cầu Giấy, Hà Nội",
                                                  "Đất ở tại đô thị",
                                                  "Lâu dài",
                                                  "Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất",
                                                  "AB 000001",
                                                  "CS 00001",
                                                  "Sở Tài nguyên và Môi trường thành phố Hà Nội",
                                                  "12/03/2020",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  ""
                                              ]
                                    },
                                    {
                                        "r":  [
                                                  "VD02",
                                                  "1",
                                                  "Tài sản gắn liền với đất đã được chứng nhận quyền sở hữu",
                                                  "",
                                                  "125",
                                                  "18",
                                                  "Số 12 ngõ 5 phố Mẫu, Phường Mẫu, quận Cầu Giấy, Hà Nội",
                                                  "",
                                                  "",
                                                  "Giấy chứng nhận quyền sở hữu nhà ở",
                                                  "BD 000002",
                                                  "CS 00002",
                                                  "UBND thành phố Hà Nội",
                                                  "15/06/2021",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "Nhà ở riêng lẻ 4 tầng, diện tích xây dựng 80 m², diện tích sàn 320 m²"
                                              ]
                                    },
                                    {
                                        "r":  [
                                                  "VD02",
                                                  "2",
                                                  "Nhà ở hình thành trong tương lai, tài sản khác gắn liền với đất hình thành trong tương lai",
                                                  "Bên bảo đảm đồng thời là người sử dụng đất",
                                                  "126",
                                                  "18",
                                                  "Lô BT-05 KĐT Mẫu, Phường Mẫu, quận Cầu Giấy, Hà Nội",
                                                  "",
                                                  "",
                                                  "Giấy chứng nhận quyền sử dụng đất",
                                                  "CD 000003",
                                                  "CS 00003",
                                                  "Sở Tài nguyên và Môi trường thành phố Hà Nội",
                                                  "10/01/2024",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "",
                                                  "Căn biệt thự liền kề 3 tầng đang thi công phần móng và khung thô, diện tích xây dựng 120 m²"
                                              ]
                                    }
                                ]
                },
    "taiSan":  [
                   {
                       "h":  "Mã hồ sơ trong file",
                       "k":  "ma",
                       "note":  "Trùng với Mã hồ sơ ở sheet HO_SO.",
                       "req":  true,
                       "w":  16
                   },
                   {
                       "h":  "STT tài sản",
                       "k":  "stt",
                       "note":  "1, 2, 3... trong cùng hồ sơ.",
                       "req":  true,
                       "w":  10
                   },
                   {
                       "h":  "Loại tài sản",
                       "k":  "loaiTS",
                       "list":  "LOAI_TS",
                       "note":  "Chọn trong danh sách (xem sheet DANH_MUC).",
                       "req":  true,
                       "w":  32
                   },
                   {
                       "h":  "Quan hệ của Bên BD với đất",
                       "k":  "quanHe",
                       "list":  "QUAN_HE_DAT",
                       "note":  "Bắt buộc đối với loại 5.4, 5.5: Bên bảo đảm đồng thời là người sử dụng đất (5.4.1, 5.5.1) hoặc Bên bảo đảm không đồng thời là người sử dụng đất (5.4.2, 5.5.2).",
                       "req":  false,
                       "w":  30
                   },
                   {
                       "h":  "Thửa đất số",
                       "k":  "soThua",
                       "note":  "Số của thửa đất nơi có tài sản bảo đảm.",
                       "req":  true,
                       "w":  14
                   },
                   {
                       "h":  "Tờ bản đồ số",
                       "k":  "toBanDo",
                       "note":  "Tờ bản đồ số (nếu có).",
                       "req":  false,
                       "w":  14
                   },
                   {
                       "h":  "Địa chỉ thửa đất",
                       "k":  "diaChiThua",
                       "note":  "Bắt buộc với 5.1 Quyền sử dụng đất. Số nhà, tên đường, thôn/tổ dân phố, xã/phường, tỉnh/thành phố.",
                       "req":  false,
                       "w":  36
                   },
                   {
                       "h":  "Mục đích sử dụng đất",
                       "k":  "mucDich",
                       "note":  "Áp dụng cho 5.1 Quyền sử dụng đất. VD: Đất ở tại đô thị, Đất trồng cây lâu năm.",
                       "req":  false,
                       "w":  24
                   },
                   {
                       "h":  "Thời hạn sử dụng đất",
                       "k":  "thoiHan",
                       "note":  "Áp dụng cho 5.1 Quyền sử dụng đất. VD: Lâu dài, Đến 15/10/2065.",
                       "req":  false,
                       "w":  20
                   },
                   {
                       "h":  "Tên Giấy chứng nhận",
                       "k":  "tenGCN",
                       "note":  "Tên Giấy chứng nhận đối với quyền sử dụng đất hoặc quyền sở hữu tài sản.",
                       "req":  false,
                       "w":  30
                   },
                   {
                       "h":  "Số phát hành Giấy chứng nhận",
                       "k":  "soPhatHanhGCN",
                       "note":  "Số phát hành (sê-ri) Giấy chứng nhận.",
                       "req":  false,
                       "w":  20
                   },
                   {
                       "h":  "Số vào sổ cấp Giấy chứng nhận",
                       "k":  "soVaoSoGCN",
                       "note":  "Số vào sổ cấp Giấy chứng nhận.",
                       "req":  false,
                       "w":  20
                   },
                   {
                       "h":  "Cơ quan cấp Giấy chứng nhận",
                       "k":  "cqCapGCN",
                       "note":  "Cơ quan cấp Giấy chứng nhận (Sở TN\u0026MT, UBND...).",
                       "req":  false,
                       "w":  28
                   },
                   {
                       "h":  "Ngày cấp Giấy chứng nhận",
                       "k":  "ngayCapGCN",
                       "note":  "dd/mm/yyyy. Ngày cấp Giấy chứng nhận.",
                       "req":  false,
                       "w":  16
                   },
                   {
                       "h":  "Tên Quyết định giao/cho thuê đất",
                       "k":  "tenQD",
                       "note":  "Áp dụng cho mục 5.3 khi dự án chưa được cấp Giấy chứng nhận QSDĐ.",
                       "req":  false,
                       "w":  28
                   },
                   {
                       "h":  "Số Quyết định",
                       "k":  "soQD",
                       "note":  "Số Quyết định giao đất, cho thuê đất.",
                       "req":  false,
                       "w":  18
                   },
                   {
                       "h":  "Cơ quan cấp Quyết định",
                       "k":  "cqCapQD",
                       "note":  "Cơ quan ban hành Quyết định.",
                       "req":  false,
                       "w":  28
                   },
                   {
                       "h":  "Ngày cấp Quyết định",
                       "k":  "ngayCapQD",
                       "note":  "dd/mm/yyyy. Ngày ban hành Quyết định.",
                       "req":  false,
                       "w":  16
                   },
                   {
                       "h":  "Tên dự án",
                       "k":  "tenDuAn",
                       "note":  "Áp dụng cho mục 5.3: Tên dự án đầu tư xây dựng nhà ở/công trình/nông nghiệp/rừng...",
                       "req":  false,
                       "w":  30
                   },
                   {
                       "h":  "Căn cứ pháp lý xác lập dự án",
                       "k":  "canCuDuAn",
                       "note":  "Áp dụng cho mục 5.3: Căn cứ pháp lý xác lập dự án.",
                       "req":  false,
                       "w":  32
                   },
                   {
                       "h":  "Mô tả tài sản gắn liền với đất / tài sản tương lai",
                       "k":  "moTaTSGL",
                       "note":  "Mô tả nhà ở / tài sản khác gắn liền với đất hình thành trong tương lai (5.4) hoặc tài sản gắn liền chưa chứng nhận QSH (5.5).",
                       "req":  false,
                       "w":  40
                   }
               ],
    "title":  "BIỂU MẪU NHẬN DỮ LIỆU HỒ SƠ ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM BẰNG QUYỀN SỬ DỤNG ĐẤT, TÀI SẢN GẮN LIỀN VỚI ĐẤT"
},
      {
         "ben" : [
            {
               "h" : "Mã hồ sơ trong file",
               "k" : "ma",
               "note" : "Trùng với Mã hồ sơ ở sheet HO_SO.",
               "req" : true,
               "w" : 16
            },
            {
               "h" : "STT chủ thể",
               "k" : "stt",
               "note" : "1, 2, 3... trong cùng hồ sơ.",
               "req" : true,
               "w" : 10
            },
            {
               "h" : "Tên đầy đủ",
               "k" : "ten",
               "note" : "Full name. Viết chữ IN HOA.",
               "req" : true,
               "upper" : true,
               "w" : 32
            },
            {
               "h" : "Địa chỉ",
               "k" : "diaChi",
               "note" : "Address. Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia.",
               "req" : true,
               "w" : 44
            },
            {
               "h" : "Loại giấy tờ xác định tư cách pháp lý",
               "k" : "loaiGT",
               "list" : "LOAI_GIAY_TO",
               "note" : "Identification documents. Chọn trong danh sách.",
               "req" : true,
               "w" : 30
            },
            {
               "h" : "Số giấy tờ",
               "k" : "soGT",
               "note" : "No. Nhập dạng văn bản, giữ số 0 ở đầu.",
               "req" : true,
               "w" : 18
            },
            {
               "h" : "Cơ quan cấp",
               "k" : "cqCap",
               "note" : "Issued by.",
               "req" : false,
               "w" : 26
            },
            {
               "h" : "Ngày cấp",
               "k" : "ngayCap",
               "note" : "dd/mm/yyyy",
               "req" : false,
               "w" : 14
            },
            {
               "h" : "Số điện thoại",
               "k" : "sdt",
               "note" : "Tel, nếu có.",
               "req" : false,
               "w" : 16
            },
            {
               "h" : "Fax",
               "k" : "fax",
               "note" : "Nếu có.",
               "req" : false,
               "w" : 14
            },
            {
               "h" : "Thư điện tử",
               "k" : "email",
               "note" : "Email, nếu có.",
               "req" : false,
               "w" : 26
            },
            {
               "h" : "Ghi chú",
               "k" : "ghiChu",
               "note" : "",
               "req" : false,
               "w" : 20
            }
         ],
         "dropLists" : [
            "LOAI_CHU_THE"
         ],
         "file" : "Mau_Nhan_du_lieu_BPBD_Tau_bay.xlsx",
         "guide" : [
            "Phiên bản: Dự thảo đề xuất ngày 06/10/2026 - chưa được phê duyệt, cần xác nhận với khách hàng.",
            "Cấu trúc thông tin theo Phụ lục Nghị định 99/2022/NĐ-CP: Mẫu số 01b - Phiếu yêu cầu đăng ký biện pháp bảo đảm bằng tàu bay; Mẫu số 02b - Phiếu yêu cầu đăng ký thay đổi; Mẫu số 03b - Phiếu yêu cầu xóa đăng ký.",
            "",
            "1. Cấu trúc file",
            "- HO_SO: mỗi dòng là 01 lần đăng ký (lần đầu, thay đổi hoặc xóa đăng ký), gồm Loại đăng ký, Số đăng ký, Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Thời điểm đăng ký, Thời điểm có hiệu lực, Thông tin chung, Hợp đồng bảo đảm, Nghĩa vụ được bảo đảm, Nội dung thay đổi, Căn cứ xóa đăng ký, Giấy tờ kèm theo.",
            "- BEN_BAO_DAM (mục 3), BEN_NHAN_BAO_DAM (mục 4): mỗi dòng là 01 chủ thể; một hồ sơ có thể có nhiều dòng.",
            "- TAI_SAN (mục 6): mỗi dòng là 01 tàu bay; một hồ sơ có thể có nhiều dòng.",
            "- DANH_MUC: các giá trị được phép chọn. Không sửa sheet này.",
            "- Các sheet liên kết với nhau qua cột “Mã hồ sơ trong file”.",
            "",
            "2. Quy tắc nhập",
            "- Dòng 1 là tên cột, dòng 2 là hướng dẫn nhập; dữ liệu nhập từ dòng 3.",
            "- Cột có dấu (*) là bắt buộc. Cột có danh sách chọn chỉ nhận giá trị trong danh sách.",
            "- Ngày nhập dạng dd/mm/yyyy; thời điểm nhập dạng dd/mm/yyyy hh:mm (24 giờ).",
            "- Thời điểm có hiệu lực không nhỏ hơn Thời điểm đăng ký.",
            "- Họ và tên, tên tổ chức của Người yêu cầu đăng ký, Bên bảo đảm, Bên nhận bảo đảm viết chữ IN HOA.",
            "- Địa chỉ nhập dạng: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia (địa chỉ nước ngoài không có Phường/Xã).",
            "- Mã hồ sơ trong file do đơn vị lập file tự đặt (VD: HS001), không trùng nhau trong cùng một file.",
            "- Dòng có Mã hồ sơ bắt đầu bằng “VD” là dòng ví dụ (tô vàng), hệ thống bỏ qua khi nhận. Có thể xóa các dòng này.",
            "- Không đổi tên sheet; không thêm, xóa hoặc đổi thứ tự cột.",
            "- Cơ quan đăng ký nhập theo từng hồ sơ tại cột “Cơ quan đăng ký” của sheet HO_SO, chọn trong danh sách (sheet DANH_MUC). Loại tài sản chỉ có 01 cơ quan đăng ký thì cột đã điền sẵn.",
            "",
            "3. Nhập theo Loại đăng ký",
            "- Đăng ký lần đầu (Mẫu số 01b): để trống Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Nội dung thay đổi, Căn cứ xóa đăng ký; nhập Hợp đồng bảo đảm, Nghĩa vụ được bảo đảm; nhập đủ sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.",
            "- Đăng ký thay đổi (Mẫu số 02b): bắt buộc Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Loại hình đăng ký, Nội dung thay đổi; để trống Hợp đồng bảo đảm, Nghĩa vụ được bảo đảm; không nhập các sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.",
            "- Xóa đăng ký (Mẫu số 03b): bắt buộc Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Căn cứ xóa đăng ký; để trống Loại hình đăng ký, Hợp đồng bảo đảm, Nghĩa vụ được bảo đảm; không nhập các sheet chủ thể và tài sản.",
            "",
            "4. File đính kèm",
            "- File đính kèm của từng hồ sơ: ghi tên file vào cột “Tên file đính kèm” của sheet HO_SO, nhiều file cách nhau bởi dấu chấm phẩy (;).",
            "- Nén toàn bộ file đính kèm thành 01 file .zip, tải lên cùng file Excel. Tên file trong file .zip phải trùng với tên đã ghi trong cột.",
            "- Định dạng file đính kèm: .pdf, .jpg, .png.",
            "- Công văn gửi dữ liệu được đính kèm trực tiếp trên màn hình nhận dữ liệu, không ghi vào file Excel."
         ],
         "hoSo" : [
            {
               "g" : "Thông tin đăng ký",
               "h" : "Mã hồ sơ trong file",
               "k" : "ma",
               "note" : "Do đơn vị lập file tự đặt, không trùng trong file. VD: HS001. Dùng để liên kết các sheet.",
               "req" : true,
               "w" : 16
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Cơ quan đăng ký",
               "k" : "coQuan",
               "list" : "CO_QUAN_DK",
               "note" : "Chọn trong danh sách cơ quan đăng ký của Loại tài sản (sheet DANH_MUC). Loại tài sản chỉ có 01 cơ quan thì đã điền sẵn.",
               "req" : true,
               "w" : 36
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Loại đăng ký",
               "k" : "loaiDK",
               "list" : "LOAI_DK",
               "note" : "Chọn trong danh sách: Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký.",
               "req" : true,
               "w" : 20
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Số đăng ký",
               "k" : "soDK",
               "note" : "Số đăng ký do Cục Hàng không Việt Nam cấp cho lần đăng ký này.",
               "req" : true,
               "w" : 22
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp",
               "k" : "soDKLD",
               "note" : "2. Số Giấy chứng nhận đăng ký đã cấp (Mẫu 02b, 03b). Bắt buộc nếu Loại đăng ký khác Đăng ký lần đầu.",
               "req" : false,
               "w" : 22
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Thời điểm đăng ký",
               "k" : "thoiDiem",
               "note" : "dd/mm/yyyy hh:mm (24 giờ). VD: 15/09/2026 09:30",
               "req" : true,
               "w" : 20
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Thời điểm có hiệu lực",
               "k" : "thoiDiemHL",
               "note" : "dd/mm/yyyy hh:mm (24 giờ), không nhỏ hơn Thời điểm đăng ký.",
               "req" : true,
               "w" : 20
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Loại hình đăng ký",
               "k" : "loaiBP",
               "list" : "LOAI_BP",
               "note" : "1.1 Registration type. Chọn trong danh sách. Để trống với Xóa đăng ký.",
               "only" : ["Đăng ký lần đầu", "Đăng ký thay đổi"],
               "req" : true,
               "w" : 22
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Nội dung thay đổi",
               "k" : "noiDung",
               "note" : "5. Change of particulars (Mẫu 02b). Bắt buộc với Đăng ký thay đổi: căn cứ và nội dung yêu cầu thay đổi.",
               "req" : false,
               "w" : 36
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Căn cứ xóa đăng ký",
               "k" : "canCu",
               "list" : "CAN_CU_XOA",
               "note" : "4. Bases of deregistration (Mẫu 03b). Bắt buộc với Xóa đăng ký. Chọn trong danh sách.",
               "req" : false,
               "w" : 30
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Người yêu cầu đăng ký",
               "k" : "nycLoai",
               "list" : "LOAI_NYC",
               "note" : "1.2 Applicant. Chọn trong danh sách.",
               "req" : true,
               "w" : 30
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Họ và tên / Tên tổ chức",
               "k" : "nycTen",
               "note" : "Full name. Viết chữ IN HOA.",
               "req" : true,
               "upper" : true,
               "w" : 32
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Địa chỉ liên hệ",
               "k" : "nycDiaChi",
               "note" : "Address. Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia.",
               "req" : true,
               "w" : 44
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Loại giấy tờ",
               "k" : "nycLoaiGT",
               "list" : "LOAI_GIAY_TO",
               "note" : "Chọn trong danh sách.",
               "req" : true,
               "w" : 30
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Số giấy tờ",
               "k" : "nycSoGT",
               "note" : "No. Nhập dạng văn bản, giữ số 0 ở đầu.",
               "req" : true,
               "w" : 18
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Cơ quan cấp",
               "k" : "nycCQCap",
               "note" : "Issued by.",
               "req" : false,
               "w" : 26
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Ngày cấp",
               "k" : "nycNgayCap",
               "note" : "dd/mm/yyyy",
               "req" : false,
               "w" : 14
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Số điện thoại",
               "k" : "nycSDT",
               "note" : "Tel.",
               "req" : true,
               "w" : 16
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Fax",
               "k" : "nycFax",
               "note" : "Nếu có.",
               "req" : false,
               "w" : 14
            },
            {
               "g" : "Người yêu cầu đăng ký",
               "h" : "Thư điện tử",
               "k" : "nycEmail",
               "note" : "Email, nếu có.",
               "req" : false,
               "w" : 26
            },
            {
               "g" : "Hợp đồng bảo đảm, nghĩa vụ được bảo đảm",
               "h" : "Số hợp đồng bảo đảm",
               "k" : "soHD",
               "note" : "2. Aircraft security agreement - No. Chỉ nhập với Đăng ký lần đầu.",
               "only" : ["Đăng ký lần đầu"],
               "req" : true,
               "w" : 22
            },
            {
               "g" : "Hợp đồng bảo đảm, nghĩa vụ được bảo đảm",
               "h" : "Thời điểm có hiệu lực của hợp đồng",
               "k" : "hieuLucHD",
               "note" : "Effective date. dd/mm/yyyy. Chỉ nhập với Đăng ký lần đầu.",
               "only" : ["Đăng ký lần đầu"],
               "req" : true,
               "w" : 16
            },
            {
               "g" : "Hợp đồng bảo đảm, nghĩa vụ được bảo đảm",
               "h" : "Nghĩa vụ được bảo đảm",
               "k" : "nghiaVu",
               "note" : "5. Secured obligation. Chỉ nhập với Đăng ký lần đầu.",
               "only" : ["Đăng ký lần đầu"],
               "req" : true,
               "w" : 40
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Giấy tờ kèm theo",
               "k" : "giayToKem",
               "note" : "7. Attached documents. Liệt kê giấy tờ kèm theo Phiếu yêu cầu.",
               "req" : false,
               "w" : 36
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Tên file đính kèm",
               "k" : "files",
               "note" : "Tên file trong file .zip tải lên kèm, nhiều file cách nhau bởi dấu ;",
               "req" : false,
               "w" : 30
            },
            {
               "g" : "Thông tin đăng ký",
               "h" : "Ghi chú",
               "k" : "ghiChu",
               "note" : "",
               "req" : false,
               "w" : 24
            }
         ],
         "lists" : {
            "LOAI_BP" : [
               "Cầm cố",
               "Thế chấp",
               "Bảo lưu quyền sở hữu"
            ],
            "LOAI_GIAY_TO" : [
               "Chứng minh nhân dân, Căn cước công dân, Chứng minh quân đội",
               "Hộ chiếu",
               "Thẻ thường trú",
               "Mã số thuế"
            ],
            "LOAI_DK" : [
               "Đăng ký lần đầu",
               "Đăng ký thay đổi",
               "Xóa đăng ký"
            ],
            "LOAI_NYC" : [
               "Bên nhận bảo đảm",
               "Bên bảo đảm",
               "Quản tài viên; Doanh nghiệp quản lý, thanh lý tài sản",
               "Người đại diện"
            ]
         },
         "samples" : {
            "BEN_BAO_DAM" : [
               {
                  "r" : [
                     "VD01",
                     "1",
                     "CÔNG TY CỔ PHẦN HÀNG KHÔNG MẪU",
                     "Số 2 đường Mẫu, Phường Long Biên, Hà Nội, Việt Nam",
                     "Mã số thuế",
                     "0100000002",
                     "Cục Thuế thành phố Hà Nội",
                     "05/03/2010",
                     "02438888888",
                     "",
                     "info@hangkhongmau.vn",
                     ""
                  ]
               }
            ],
            "BEN_NHAN_BAO_DAM" : [
               {
                  "r" : [
                     "VD01",
                     "1",
                     "SAMPLE AVIATION FINANCE LIMITED",
                     "1 Sample Street, Dublin, Ireland",
                     "Mã số thuế",
                     "IE1234567T",
                     "Irish Revenue",
                     "01/06/2012",
                     "+35315550000",
                     "",
                     "contact@samplefinance.ie",
                     ""
                  ]
               }
            ],
            "HO_SO" : [
               {
                  "r" : [
                     "VD01",
                     "Cục Hàng không Việt Nam",
                     "Đăng ký lần đầu",
                     "TB-0001/2026",
                     "",
                     "15/09/2026 09:30",
                     "15/09/2026 09:30",
                     "Thế chấp",
                     "",
                     "",
                     "Bên nhận bảo đảm",
                     "SAMPLE AVIATION FINANCE LIMITED",
                     "1 Sample Street, Dublin, Ireland",
                     "Mã số thuế",
                     "IE1234567T",
                     "Irish Revenue",
                     "01/06/2012",
                     "+35315550000",
                     "",
                     "contact@samplefinance.ie",
                     "HĐTC-0001/2026",
                     "10/09/2026",
                     "Bảo đảm cho khoản vay 50.000.000 USD theo Hợp đồng tín dụng số 01/2026/HĐTD ngày 10/09/2026",
                     "Hợp đồng thế chấp tàu bay; Giấy chứng nhận đăng ký quốc tịch tàu bay",
                     "VD01_phieu.pdf",
                     ""
                  ]
               },
               {
                  "r" : [
                     "VD02",
                     "Cục Hàng không Việt Nam",
                     "Đăng ký thay đổi",
                     "TB-0002/2026",
                     "TB-0001/2026",
                     "25/09/2026 14:00",
                     "25/09/2026 14:00",
                     "Thế chấp",
                     "Bổ sung tài sản bảo đảm theo Phụ lục hợp đồng thế chấp số 01: tàu bay số hiệu VN-A009",
                     "",
                     "Bên nhận bảo đảm",
                     "SAMPLE AVIATION FINANCE LIMITED",
                     "1 Sample Street, Dublin, Ireland",
                     "Mã số thuế",
                     "IE1234567T",
                     "Irish Revenue",
                     "01/06/2012",
                     "+35315550000",
                     "",
                     "contact@samplefinance.ie",
                     "",
                     "",
                     "",
                     "Phụ lục hợp đồng thế chấp tàu bay số 01",
                     "",
                     ""
                  ]
               },
               {
                  "r" : [
                     "VD03",
                     "Cục Hàng không Việt Nam",
                     "Xóa đăng ký",
                     "TB-0003/2026",
                     "TB-0001/2026",
                     "28/09/2026 16:20",
                     "28/09/2026 16:20",
                     "",
                     "",
                     "Chấm dứt nghĩa vụ được bảo đảm",
                     "Bên nhận bảo đảm",
                     "SAMPLE AVIATION FINANCE LIMITED",
                     "1 Sample Street, Dublin, Ireland",
                     "Mã số thuế",
                     "IE1234567T",
                     "Irish Revenue",
                     "01/06/2012",
                     "+35315550000",
                     "",
                     "contact@samplefinance.ie",
                     "",
                     "",
                     "",
                     "Văn bản xác nhận hoàn thành nghĩa vụ trả nợ",
                     "",
                     ""
                  ]
               }
            ],
            "TAI_SAN" : [
               {
                  "r" : [
                     "VD01",
                     "1",
                     "VN-A000",
                     "Tàu bay vận tải hành khách",
                     "A321-200",
                     "Airbus",
                     "0000",
                     "2018",
                     "CFM56-5B",
                     "",
                     ""
                  ]
               }
            ]
         },
         "taiSan" : [
            {
               "h" : "Mã hồ sơ trong file",
               "k" : "ma",
               "note" : "Trùng với Mã hồ sơ ở sheet HO_SO.",
               "req" : true,
               "w" : 16
            },
            {
               "h" : "STT tài sản",
               "k" : "stt",
               "note" : "1, 2, 3... trong cùng hồ sơ.",
               "req" : true,
               "w" : 10
            },
            {
               "h" : "Số hiệu đăng ký",
               "k" : "soHieu",
               "note" : "Registration Mark. VD: VN-A000",
               "req" : true,
               "w" : 16
            },
            {
               "h" : "Loại tàu bay",
               "k" : "loaiTB",
               "note" : "Type of Aircraft.",
               "req" : true,
               "w" : 26
            },
            {
               "h" : "Kiểu tàu bay",
               "k" : "kieuTB",
               "note" : "Designation of Aircraft. VD: A321-200",
               "req" : true,
               "w" : 20
            },
            {
               "h" : "Nhà sản xuất",
               "k" : "nsx",
               "note" : "Manufacturer.",
               "req" : true,
               "w" : 20
            },
            {
               "h" : "Số xuất xưởng tàu bay",
               "k" : "serial",
               "note" : "Aircraft Serial Number.",
               "req" : true,
               "w" : 18
            },
            {
               "h" : "Năm xuất xưởng",
               "k" : "namXX",
               "note" : "Year of Delivery from the Manufacturer. yyyy",
               "req" : false,
               "w" : 12
            },
            {
               "h" : "Kiểu loại động cơ",
               "k" : "dongCo",
               "note" : "Designation of Engines.",
               "req" : false,
               "w" : 24
            },
            {
               "h" : "Thời điểm hình thành",
               "k" : "thoiDiemHT",
               "note" : "Time of Formation. dd/mm/yyyy, với tàu bay hình thành trong tương lai.",
               "req" : false,
               "w" : 16
            },
            {
               "h" : "Ghi chú",
               "k" : "ghiChu",
               "note" : "",
               "req" : false,
               "w" : 20
            }
         ],
         "title" : "BIỂU MẪU NHẬN DỮ LIỆU HỒ SƠ ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM BẰNG TÀU BAY"
      },
      {
    "ben":  [
                {
                    "h":  "Mã hồ sơ trong file",
                    "k":  "ma",
                    "note":  "Trùng với Mã hồ sơ ở sheet HO_SO.",
                    "req":  true,
                    "w":  16
                },
                {
                    "h":  "STT chủ thể",
                    "k":  "stt",
                    "note":  "1, 2, 3... trong cùng hồ sơ.",
                    "req":  true,
                    "w":  10
                },
                {
                    "h":  "Tên đầy đủ",
                    "k":  "ten",
                    "note":  "Viết chữ IN HOA.",
                    "req":  true,
                    "w":  32,
                    "upper":  true
                },
                {
                    "h":  "Địa chỉ",
                    "k":  "diaChi",
                    "note":  "Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia.",
                    "req":  true,
                    "w":  44
                },
                {
                    "h":  "Loại giấy tờ xác định tư cách pháp lý",
                    "k":  "loaiGT",
                    "note":  "Chọn trong danh sách.",
                    "req":  true,
                    "w":  30,
                    "list":  "LOAI_GIAY_TO"
                },
                {
                    "h":  "Số giấy tờ",
                    "k":  "soGT",
                    "note":  "Nhập dạng văn bản, giữ số 0 ở đầu.",
                    "req":  true,
                    "w":  18
                },
                {
                    "h":  "Cơ quan cấp",
                    "k":  "cqCap",
                    "note":  "",
                    "req":  false,
                    "w":  26
                },
                {
                    "h":  "Ngày cấp",
                    "k":  "ngayCap",
                    "note":  "dd/mm/yyyy",
                    "req":  false,
                    "w":  14
                },
                {
                    "h":  "Số điện thoại",
                    "k":  "sdt",
                    "note":  "Nếu có.",
                    "req":  false,
                    "w":  16
                },
                {
                    "h":  "Fax",
                    "k":  "fax",
                    "note":  "Nếu có.",
                    "req":  false,
                    "w":  14
                },
                {
                    "h":  "Thư điện tử",
                    "k":  "email",
                    "note":  "Nếu có.",
                    "req":  false,
                    "w":  26
                },
                {
                    "h":  "Ghi chú",
                    "k":  "ghiChu",
                    "note":  "",
                    "req":  false,
                    "w":  20
                }
            ],
    "dropLists":  [
                      "LOAI_CHU_THE"
                  ],
    "file":  "Mau_Nhan_du_lieu_BPBD_Tau_bien.xlsx",
    "guide":  [
                  "Phiên bản: Dự thảo đề xuất ngày 07/10/2026 - chưa được phê duyệt, cần xác nhận với khách hàng.",
                  "Cấu trúc thông tin theo Phiếu yêu cầu đăng ký biện pháp bảo đảm bằng tàu biển (Phụ lục Nghị định 99/2022/NĐ-CP).",
                  "",
                  "1. Cấu trúc file",
                  "- HO_SO: mỗi dòng là 01 lần đăng ký (lần đầu, thay đổi hoặc xóa đăng ký), gồm Thông tin đăng ký, Loại hình đăng ký, Người yêu cầu đăng ký, Hợp đồng bảo đảm, Nội dung thay đổi, Căn cứ xóa đăng ký.",
                  "- BEN_BAO_DAM, BEN_NHAN_BAO_DAM: mỗi dòng là 01 chủ thể; một hồ sơ có thể có nhiều dòng.",
                  "- TAI_SAN: mỗi dòng là 01 tàu biển; một hồ sơ có thể có nhiều dòng.",
                  "- DANH_MUC: các giá trị được phép chọn. Không sửa sheet này.",
                  "- Các sheet liên kết với nhau qua cột “Mã hồ sơ trong file”.",
                  "",
                  "2. Quy tắc nhập",
                  "- Dòng 1 là tên cột, dòng 2 là hướng dẫn nhập; dữ liệu nhập từ dòng 3.",
                  "- Cột có dấu (*) là bắt buộc. Cột có danh sách chọn chỉ nhận giá trị trong danh sách.",
                  "- Ngày nhập dạng dd/mm/yyyy; thời điểm nhập dạng dd/mm/yyyy hh:mm (24 giờ).",
                  "- Họ và tên, tên tổ chức của Người yêu cầu đăng ký, Bên bảo đảm, Bên nhận bảo đảm viết chữ IN HOA.",
                  "- Địa chỉ nhập dạng: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia (địa chỉ nước ngoài không có Phường/Xã).",
                  "- Mã hồ sơ trong file do đơn vị lập file tự đặt (VD: HS001), không trùng nhau trong cùng một file.",
                  "- Dòng có Mã hồ sơ bắt đầu bằng “VD” là dòng ví dụ (tô vàng), hệ thống bỏ qua khi nhận. Có thể xóa các dòng này.",
                  "- Không đổi tên sheet; không thêm, xóa hoặc đổi thứ tự cột.",
                  "- Cơ quan đăng ký nhập theo từng hồ sơ tại cột “Cơ quan đăng ký” của sheet HO_SO, chọn trong danh sách (sheet DANH_MUC). Loại tài sản chỉ có 01 cơ quan đăng ký thì cột đã điền sẵn.",
                  "",
                  "3. Nhập theo Loại đăng ký",
                  "- Đăng ký lần đầu: để trống Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Nội dung thay đổi, Căn cứ xóa đăng ký; nhập Hợp đồng bảo đảm; nhập đủ sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.",
                  "- Đăng ký thay đổi: bắt buộc Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Loại hình đăng ký, Nội dung thay đổi; để trống Hợp đồng bảo đảm; không nhập các sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.",
                  "- Xóa đăng ký: bắt buộc Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Căn cứ xóa đăng ký; để trống Loại hình đăng ký, Hợp đồng bảo đảm; không nhập các sheet chủ thể và tài sản.",
                  "",
                  "4. File đính kèm",
                  "- File đính kèm của từng hồ sơ: ghi tên file vào cột “Tên file đính kèm” của sheet HO_SO, nhiều file cách nhau bởi dấu chấm phẩy (;).",
                  "- Nén toàn bộ file đính kèm thành 01 file .zip, tải lên cùng file Excel. Tên file trong file .zip phải trùng với tên đã ghi trong cột.",
                  "- Định dạng file đính kèm: .pdf, .jpg, .png.",
                  "- Công văn gửi dữ liệu được đính kèm trực tiếp trên màn hình nhận dữ liệu, không ghi vào file Excel."
              ],
    "hoSo":  [
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Mã hồ sơ trong file",
                     "k":  "ma",
                     "note":  "Do đơn vị lập file tự đặt, không trùng trong file. VD: HS001. Dùng để liên kết các sheet.",
                     "req":  true,
                     "w":  16
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Cơ quan đăng ký",
                     "k":  "coQuan",
                     "note":  "Chọn trong danh sách cơ quan đăng ký của Loại tài sản (sheet DANH_MUC). Loại tài sản chỉ có 01 cơ quan thì đã điền sẵn.",
                     "req":  true,
                     "w":  36,
                     "list":  "CO_QUAN_DK"
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Loại đăng ký",
                     "k":  "loaiDK",
                     "note":  "Chọn trong danh sách: Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký.",
                     "req":  true,
                     "w":  22,
                     "list":  "LOAI_DK"
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Số đăng ký",
                     "k":  "soDK",
                     "note":  "Số đăng ký do cơ quan đăng ký cấp cho lần đăng ký này.",
                     "req":  true,
                     "w":  20
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp",
                     "k":  "soDKLD",
                     "note":  "Bắt buộc nếu Loại đăng ký khác Đăng ký lần đầu.",
                     "req":  false,
                     "w":  26
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Thời điểm đăng ký",
                     "k":  "thoiDiem",
                     "note":  "dd/mm/yyyy hh:mm (24 giờ). VD: 15/09/2026 09:30",
                     "req":  true,
                     "w":  20
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Loại hình đăng ký",
                     "k":  "loaiBP",
                     "note":  "Chọn trong danh sách: Thế chấp, Bảo lưu quyền sở hữu. Để trống với Xóa đăng ký.",
                     "req":  true,
                     "w":  20,
                     "list":  "LOAI_BP",
                     "only":  [
                                  "Đăng ký lần đầu",
                                  "Đăng ký thay đổi"
                              ]
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Nội dung thay đổi",
                     "k":  "noiDung",
                     "note":  "Bắt buộc với Đăng ký thay đổi.",
                     "req":  false,
                     "w":  40
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Căn cứ xóa đăng ký",
                     "k":  "canCu",
                     "note":  "Bắt buộc với Xóa đăng ký. Chọn trong danh sách.",
                     "req":  false,
                     "w":  30,
                     "list":  "CAN_CU_XOA"
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Người yêu cầu đăng ký",
                     "k":  "nycLoai",
                     "note":  "Chọn trong danh sách.",
                     "req":  true,
                     "w":  30,
                     "list":  "LOAI_NYC"
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Họ và tên / Tên tổ chức",
                     "k":  "nycTen",
                     "note":  "Họ và tên đầy đủ đối với cá nhân, tên đầy đủ đối với tổ chức. Viết chữ IN HOA.",
                     "req":  true,
                     "w":  32,
                     "upper":  true
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Địa chỉ liên hệ",
                     "k":  "nycDiaChi",
                     "note":  "Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia.",
                     "req":  true,
                     "w":  40
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Loại giấy tờ",
                     "k":  "nycLoaiGT",
                     "note":  "Chọn trong danh sách.",
                     "req":  true,
                     "w":  30,
                     "list":  "LOAI_GIAY_TO"
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Số giấy tờ",
                     "k":  "nycSoGT",
                     "note":  "Nhập dạng văn bản, giữ số 0 ở đầu.",
                     "req":  true,
                     "w":  18
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Cơ quan cấp",
                     "k":  "nycCQCap",
                     "note":  "Cơ quan cấp giấy tờ.",
                     "req":  false,
                     "w":  26
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Ngày cấp",
                     "k":  "nycNgayCap",
                     "note":  "dd/mm/yyyy",
                     "req":  false,
                     "w":  14
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Số điện thoại",
                     "k":  "nycSDT",
                     "note":  "Số điện thoại liên hệ.",
                     "req":  true,
                     "w":  16
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Fax",
                     "k":  "nycFax",
                     "note":  "Nếu có.",
                     "req":  false,
                     "w":  14
                 },
                 {
                     "g":  "Người yêu cầu đăng ký",
                     "h":  "Thư điện tử",
                     "k":  "nycEmail",
                     "note":  "Nếu có.",
                     "req":  false,
                     "w":  26
                 },
                 {
                     "g":  "Hợp đồng bảo đảm",
                     "h":  "Tên hợp đồng bảo đảm",
                     "k":  "tenHD",
                     "note":  "Chỉ nhập với Đăng ký lần đầu.",
                     "req":  false,
                     "w":  32,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ]
                 },
                 {
                     "g":  "Hợp đồng bảo đảm",
                     "h":  "Số hợp đồng bảo đảm",
                     "k":  "soHD",
                     "note":  "Chỉ nhập với Đăng ký lần đầu.",
                     "req":  true,
                     "w":  20,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ]
                 },
                 {
                     "g":  "Hợp đồng bảo đảm",
                     "h":  "Thời điểm có hiệu lực của hợp đồng",
                     "k":  "hieuLucHD",
                     "note":  "dd/mm/yyyy. Chỉ nhập với Đăng ký lần đầu.",
                     "req":  true,
                     "w":  18,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ]
                 },
                 {
                     "g":  "Hợp đồng bảo đảm",
                     "h":  "Số tiền được bảo đảm",
                     "k":  "soTien",
                     "note":  "Chỉ nhập với Đăng ký lần đầu.",
                     "req":  false,
                     "w":  22,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ]
                 },
                 {
                     "g":  "Hợp đồng bảo đảm",
                     "h":  "Lãi suất",
                     "k":  "laiSuat",
                     "note":  "Chỉ nhập với Đăng ký lần đầu.",
                     "req":  false,
                     "w":  14,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ]
                 },
                 {
                     "g":  "Hợp đồng bảo đảm",
                     "h":  "Thời hạn trả nợ",
                     "k":  "thoiHan",
                     "note":  "Chỉ nhập với Đăng ký lần đầu.",
                     "req":  false,
                     "w":  18,
                     "only":  [
                                  "Đăng ký lần đầu"
                              ]
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Tên file đính kèm",
                     "k":  "files",
                     "note":  "Tên file trong file .zip tải lên kèm, nhiều file cách nhau bởi dấu ;",
                     "req":  false,
                     "w":  30
                 },
                 {
                     "g":  "Thông tin đăng ký",
                     "h":  "Ghi chú",
                     "k":  "ghiChu",
                     "note":  "",
                     "req":  false,
                     "w":  30
                 }
             ],
    "lists":  {
                  "LOAI_GIAY_TO":  [
                                       "Chứng minh nhân dân, Căn cước công dân, Chứng minh quân đội",
                                       "Hộ chiếu",
                                       "Thẻ thường trú",
                                       "Mã số thuế"
                                   ],
                  "LOAI_BP":  [
                                  "Thế chấp",
                                  "Bảo lưu quyền sở hữu"
                              ],
                  "LOAI_NYC":  [
                                   "Bên nhận bảo đảm",
                                   "Bên bảo đảm",
                                   "Quản tài viên; Doanh nghiệp quản lý, thanh lý tài sản",
                                   "Người đại diện"
                               ],
                  "LOAI_DK":  [
                                  "Đăng ký lần đầu",
                                  "Đăng ký thay đổi",
                                  "Xóa đăng ký"
                              ]
              },
    "samples":  {
                    "HO_SO":  [
                                  {
                                      "r":  [
                                                "VD01",
                                                "Chi cục Hàng hải Việt Nam tại thành phố Hải Phòng",
                                                "Đăng ký lần đầu",
                                                "TBI-0001/2026",
                                                "",
                                                "15/09/2026 09:30",
                                                "Thế chấp",
                                                "",
                                                "",
                                                "Bên nhận bảo đảm",
                                                "NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN MẪU",
                                                "Số 1 đường Mẫu, Phường Hồng Bàng, Thành phố Hải Phòng, Việt Nam",
                                                "Mã số thuế",
                                                "0100000001",
                                                "Cục Thuế thành phố Hải Phòng",
                                                "01/06/2012",
                                                "02253000000",
                                                "",
                                                "lienhe@nganhangmau.vn",
                                                "Hợp đồng thế chấp tàu biển",
                                                "01/2026/HĐTC",
                                                "10/09/2026",
                                                "50.000.000.000 đồng",
                                                "9%/năm",
                                                "10/09/2031",
                                                "VD01_phieu.pdf",
                                                ""
                                            ]
                                  },
                                  {
                                      "r":  [
                                                "VD02",
                                                "Chi cục Hàng hải Việt Nam tại thành phố Hải Phòng",
                                                "Đăng ký thay đổi",
                                                "TBI-0001/2026-TĐ1",
                                                "TBI-0001/2026",
                                                "25/09/2026 14:00",
                                                "Thế chấp",
                                                "Thay đổi thông tin Bên nhận bảo đảm",
                                                "",
                                                "Bên nhận bảo đảm",
                                                "NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN MẪU",
                                                "Số 1 đường Mẫu, Phường Hồng Bàng, Thành phố Hải Phòng, Việt Nam",
                                                "Mã số thuế",
                                                "0100000001",
                                                "Cục Thuế thành phố Hải Phòng",
                                                "01/06/2012",
                                                "02253000000",
                                                "",
                                                "lienhe@nganhangmau.vn",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                ""
                                            ]
                                  },
                                  {
                                      "r":  [
                                                "VD03",
                                                "Chi cục Hàng hải Việt Nam tại thành phố Hải Phòng",
                                                "Xóa đăng ký",
                                                "TBI-0001/2026-XĐK",
                                                "TBI-0001/2026",
                                                "30/09/2026 10:15",
                                                "",
                                                "",
                                                "Chấm dứt nghĩa vụ được bảo đảm",
                                                "Bên nhận bảo đảm",
                                                "NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN MẪU",
                                                "Số 1 đường Mẫu, Phường Hồng Bàng, Thành phố Hải Phòng, Việt Nam",
                                                "Mã số thuế",
                                                "0100000001",
                                                "Cục Thuế thành phố Hải Phòng",
                                                "01/06/2012",
                                                "02253000000",
                                                "",
                                                "lienhe@nganhangmau.vn",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "VD03_van_ban.pdf",
                                                ""
                                            ]
                                  }
                              ],
                    "BEN_BAO_DAM":  [
                                        {
                                            "r":  [
                                                      "VD01",
                                                      "1",
                                                      "CÔNG TY CỔ PHẦN VẬN TẢI BIỂN MẪU",
                                                      "Số 2 đường Mẫu, Phường Ngô Quyền, Thành phố Hải Phòng, Việt Nam",
                                                      "Mã số thuế",
                                                      "0200000002",
                                                      "Cục Thuế thành phố Hải Phòng",
                                                      "05/03/2010",
                                                      "02253888888",
                                                      "",
                                                      "info@vantaibienmau.vn",
                                                      ""
                                                  ]
                                        }
                                    ],
                    "BEN_NHAN_BAO_DAM":  [
                                             {
                                                 "r":  [
                                                           "VD01",
                                                           "1",
                                                           "NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN MẪU",
                                                           "Số 1 đường Mẫu, Phường Hồng Bàng, Thành phố Hải Phòng, Việt Nam",
                                                           "Mã số thuế",
                                                           "0100000001",
                                                           "Cục Thuế thành phố Hải Phòng",
                                                           "01/06/2012",
                                                           "02253000000",
                                                           "",
                                                           "lienhe@nganhangmau.vn",
                                                           ""
                                                       ]
                                             }
                                         ],
                    "TAI_SAN":  [
                                    {
                                        "r":  [
                                                  "VD01",
                                                  "1",
                                                  "MẪU STAR",
                                                  "Việt Nam",
                                                  "3WAB9",
                                                  "9000001",
                                                  "Tàu hàng tổng hợp",
                                                  "CÔNG TY CỔ PHẦN VẬN TẢI BIỂN MẪU",
                                                  "2015",
                                                  "Việt Nam",
                                                  "8,5 m",
                                                  "3.200",
                                                  "120,5 m",
                                                  "20,2 m",
                                                  "12.500 tấn",
                                                  "7.800",
                                                  "Chi cục Hàng hải Việt Nam tại thành phố Hải Phòng",
                                                  "Cục Đăng kiểm Việt Nam",
                                                  "4.500 kW",
                                                  "VN-0001-TB",
                                                  "20/05/2015"
                                              ]
                                    }
                                ]
                },
    "taiSan":  [
                   {
                       "h":  "Mã hồ sơ trong file",
                       "k":  "ma",
                       "note":  "Trùng với Mã hồ sơ ở sheet HO_SO.",
                       "req":  true,
                       "w":  16
                   },
                   {
                       "h":  "STT tài sản",
                       "k":  "stt",
                       "note":  "1, 2, 3... trong cùng hồ sơ.",
                       "req":  true,
                       "w":  10
                   },
                   {
                       "h":  "Tên tàu",
                       "k":  "tenTau",
                       "note":  "",
                       "req":  true,
                       "w":  24
                   },
                   {
                       "h":  "Quốc tịch",
                       "k":  "quocTich",
                       "note":  "",
                       "req":  true,
                       "w":  16
                   },
                   {
                       "h":  "Hô hiệu",
                       "k":  "hoHieu",
                       "note":  "",
                       "req":  false,
                       "w":  14
                   },
                   {
                       "h":  "Số IMO",
                       "k":  "imo",
                       "note":  "Gồm 07 chữ số.",
                       "req":  false,
                       "w":  14
                   },
                   {
                       "h":  "Loại tàu",
                       "k":  "loaiTau",
                       "note":  "",
                       "req":  true,
                       "w":  20
                   },
                   {
                       "h":  "Chủ tàu",
                       "k":  "chuTau",
                       "note":  "",
                       "req":  true,
                       "w":  30
                   },
                   {
                       "h":  "Năm đóng",
                       "k":  "namDong",
                       "note":  "yyyy",
                       "req":  false,
                       "w":  12
                   },
                   {
                       "h":  "Nơi đóng",
                       "k":  "noiDong",
                       "note":  "",
                       "req":  false,
                       "w":  20
                   },
                   {
                       "h":  "Mớn nước",
                       "k":  "monNuoc",
                       "note":  "",
                       "req":  false,
                       "w":  12
                   },
                   {
                       "h":  "Dung tích thực dụng",
                       "k":  "nt",
                       "note":  "",
                       "req":  false,
                       "w":  16
                   },
                   {
                       "h":  "Chiều dài lớn nhất",
                       "k":  "loa",
                       "note":  "",
                       "req":  false,
                       "w":  16
                   },
                   {
                       "h":  "Chiều rộng",
                       "k":  "rong",
                       "note":  "",
                       "req":  false,
                       "w":  12
                   },
                   {
                       "h":  "Trọng tải toàn phần",
                       "k":  "dwt",
                       "note":  "",
                       "req":  false,
                       "w":  18
                   },
                   {
                       "h":  "Tổng dung tích",
                       "k":  "gt",
                       "note":  "",
                       "req":  false,
                       "w":  16
                   },
                   {
                       "h":  "Nơi đăng ký",
                       "k":  "noiDK",
                       "note":  "",
                       "req":  false,
                       "w":  24
                   },
                   {
                       "h":  "Tổ chức đăng kiểm",
                       "k":  "dangKiem",
                       "note":  "",
                       "req":  false,
                       "w":  24
                   },
                   {
                       "h":  "Tổng công suất máy chính",
                       "k":  "congSuat",
                       "note":  "",
                       "req":  false,
                       "w":  20
                   },
                   {
                       "h":  "Số đăng ký",
                       "k":  "soDKTau",
                       "note":  "",
                       "req":  true,
                       "w":  18
                   },
                   {
                       "h":  "Ngày đăng ký",
                       "k":  "ngayDK",
                       "note":  "dd/mm/yyyy",
                       "req":  false,
                       "w":  14
                   }
               ],
    "title":  "BIỂU MẪU NHẬN DỮ LIỆU HỒ SƠ ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM BẰNG TÀU BIỂN"
},
      {
         "file" : "Mau_Nhan_du_lieu_BPBD_Chung_khoan.xlsx",
         "guideExtra" : [
            "",
            "5. Lưu ý riêng cho chứng khoán đã lưu ký tập trung",
            "- Chưa xác định mẫu phiếu áp dụng (Phụ lục Nghị định 99/2022/NĐ-CP hay mẫu của Tổng công ty Lưu ký và Bù trừ chứng khoán). Danh sách cột là đề xuất, cần xác nhận.",
            "- Mỗi mã chứng khoán trên 01 tài khoản lưu ký là 01 dòng ở sheet TAI_SAN."
         ],
         "hoSoExtra" : [],
         "lists" : {
            "LOAI_BP" : [
               "Cầm cố",
               "Thế chấp"
            ],
            "LOAI_TS" : [
               "Cổ phiếu",
               "Trái phiếu",
               "Chứng chỉ quỹ",
               "Chứng quyền có bảo đảm",
               "Chứng khoán khác"
            ]
         },
         "samples" : {
            "BEN_BAO_DAM" : [
               {
                  "r" : [
                     "VD01",
                     "1",
                     "Cá nhân trong nước",
                     "Trần Thị Mẫu",
                     "Căn cước / Căn cước công dân",
                     "001190000002",
                     "20/06/2022",
                     "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
                     "Việt Nam",
                     "Số 8 phố Mẫu, Phường Mẫu, Hà Nội, Việt Nam",
                     ""
                  ]
               }
            ],
            "BEN_NHAN_BAO_DAM" : [
               {
                  "r" : [
                     "VD01",
                     "1",
                     "Tổ chức trong nước",
                     "Ngân hàng TMCP Mẫu A",
                     "Mã số doanh nghiệp",
                     "0100000001",
                     "",
                     "",
                     "Việt Nam",
                     "Số 1 phố Mẫu, Phường Mẫu, Hà Nội, Việt Nam",
                     ""
                  ]
               }
            ],
            "HO_SO" : [
               {
                  "r" : [
                     "VD01",
                     "Tổng công ty Lưu ký và Bù trừ chứng khoán Việt Nam",
                     "Đăng ký lần đầu",
                     "CK-0001/2026",
                     "15/09/2026 09:30",
                     "",
                     "Cầm cố",
                     "HĐCC-0003/2026",
                     "14/09/2026",
                     "",
                     "",
                     "VD01_xac_nhan.pdf",
                     ""
                  ]
               }
            ],
            "TAI_SAN" : [
               {
                  "r" : [
                     "VD01",
                     "1",
                     "VDA",
                     "Công ty Cổ phần Mẫu",
                     "Cổ phiếu",
                     "100000",
                     "10000",
                     "001C000001",
                     "Công ty Cổ phần Chứng khoán Mẫu",
                     ""
                  ]
               }
            ]
         },
         "taiSan" : [
            {
               "h" : "Mã hồ sơ trong file",
               "k" : "ma",
               "note" : "Trùng với Mã hồ sơ ở sheet HO_SO.",
               "req" : true,
               "w" : 16
            },
            {
               "h" : "STT tài sản",
               "k" : "stt",
               "note" : "1, 2, 3... trong cùng hồ sơ.",
               "req" : true,
               "w" : 10
            },
            {
               "h" : "Mã chứng khoán",
               "k" : "maCK",
               "note" : "",
               "req" : true,
               "w" : 14
            },
            {
               "h" : "Tên tổ chức phát hành",
               "k" : "tcph",
               "note" : "",
               "req" : true,
               "w" : 32
            },
            {
               "h" : "Loại chứng khoán",
               "k" : "loaiCK",
               "list" : "LOAI_TS",
               "note" : "Chọn trong danh sách.",
               "req" : true,
               "w" : 22
            },
            {
               "h" : "Số lượng",
               "k" : "soLuong",
               "note" : "Số nguyên, không có dấu phân cách.",
               "req" : true,
               "w" : 12
            },
            {
               "h" : "Mệnh giá (đồng)",
               "k" : "menhGia",
               "note" : "",
               "req" : false,
               "w" : 14
            },
            {
               "h" : "Số tài khoản lưu ký",
               "k" : "tkLuuKy",
               "note" : "",
               "req" : true,
               "w" : 18
            },
            {
               "h" : "Thành viên lưu ký",
               "k" : "tvLuuKy",
               "note" : "Tên công ty chứng khoán / ngân hàng lưu ký.",
               "req" : true,
               "w" : 30
            },
            {
               "h" : "Ghi chú",
               "k" : "ghiChu",
               "note" : "",
               "req" : false,
               "w" : 20
            }
         ],
         "title" : "BIỂU MẪU NHẬN DỮ LIỆU HỒ SƠ ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM BẰNG CHỨNG KHOÁN ĐÃ LƯU KÝ TẬP TRUNG"
      }
   ],
   "common" : {
      "ben" : [
         {
            "h" : "Mã hồ sơ trong file",
            "k" : "ma",
            "note" : "Trùng với Mã hồ sơ ở sheet HO_SO.",
            "req" : true,
            "w" : 16
         },
         {
            "h" : "STT chủ thể",
            "k" : "stt",
            "note" : "1, 2, 3... trong cùng hồ sơ.",
            "req" : true,
            "w" : 10
         },
         {
            "h" : "Loại chủ thể",
            "k" : "loai",
            "list" : "LOAI_CHU_THE",
            "note" : "Chọn trong danh sách.",
            "req" : true,
            "w" : 22
         },
         {
            "h" : "Tên chủ thể",
            "k" : "ten",
            "note" : "Họ tên cá nhân hoặc tên tổ chức.",
            "req" : true,
            "w" : 32
         },
         {
            "h" : "Loại giấy tờ",
            "k" : "loaiGT",
            "list" : "LOAI_GIAY_TO",
            "note" : "Chọn trong danh sách.",
            "req" : true,
            "w" : 22
         },
         {
            "h" : "Số giấy tờ",
            "k" : "soGT",
            "note" : "Nhập dạng văn bản, giữ số 0 ở đầu.",
            "req" : true,
            "w" : 18
         },
         {
            "h" : "Ngày cấp",
            "k" : "ngayCap",
            "note" : "dd/mm/yyyy",
            "req" : false,
            "w" : 14
         },
         {
            "h" : "Cơ quan cấp",
            "k" : "cqCap",
            "note" : "",
            "req" : false,
            "w" : 28
         },
         {
            "h" : "Quốc tịch / Quốc gia",
            "k" : "qt",
            "note" : "Bắt buộc với cá nhân, tổ chức nước ngoài.",
            "req" : false,
            "w" : 18
         },
         {
            "h" : "Địa chỉ",
            "k" : "diaChi",
            "note" : "Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia (VD: Số 1 phố Mẫu, Phường Cửa Nam, Hà Nội, Việt Nam).",
            "req" : true,
            "w" : 44
         },
         {
            "h" : "Ghi chú",
            "k" : "ghiChu",
            "note" : "",
            "req" : false,
            "w" : 20
         }
      ],
      "guideHead" : [
         "Phiên bản: Dự thảo đề xuất ngày 05/10/2026 - chưa được phê duyệt, cần xác nhận với khách hàng.",
         "",
         "1. Cấu trúc file",
         "- HO_SO: mỗi dòng là 01 hồ sơ đăng ký (01 Phiếu yêu cầu đã được cơ quan đăng ký ghi nhận).",
         "- BEN_BAO_DAM, BEN_NHAN_BAO_DAM: mỗi dòng là 01 chủ thể; một hồ sơ có thể có nhiều dòng.",
         "- TAI_SAN: mỗi dòng là 01 tài sản; một hồ sơ có thể có nhiều dòng.",
         "- DANH_MUC: các giá trị được phép chọn. Không sửa sheet này.",
         "- Các sheet liên kết với nhau qua cột “Mã hồ sơ trong file”.",
         "",
         "2. Quy tắc nhập",
         "- Dòng 1 là tên cột, dòng 2 là hướng dẫn nhập; dữ liệu nhập từ dòng 3.",
         "- Cột có dấu (*) là bắt buộc. Cột có danh sách chọn chỉ nhận giá trị trong danh sách.",
         "- Ngày nhập dạng dd/mm/yyyy; thời điểm nhập dạng dd/mm/yyyy hh:mm (24 giờ).",
         "- Mã hồ sơ trong file do đơn vị lập file tự đặt (VD: HS001), không trùng nhau trong cùng một file.",
         "- Dòng có Mã hồ sơ bắt đầu bằng “VD” là dòng ví dụ (tô vàng), hệ thống bỏ qua khi nhận. Có thể xóa các dòng này.",
         "- Không đổi tên sheet; không thêm, xóa hoặc đổi thứ tự cột.",
         "- Cơ quan đăng ký nhập theo từng hồ sơ tại cột “Cơ quan đăng ký” của sheet HO_SO, chọn trong danh sách (sheet DANH_MUC). Loại tài sản chỉ có 01 cơ quan đăng ký thì cột đã điền sẵn.",
         "",
         "3. Nhập theo Loại đăng ký",
         "- Đăng ký lần đầu: nhập đủ HO_SO, BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.",
         "- Đăng ký thay đổi, Sửa chữa sai sót: nhập Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Nội dung thay đổi; nhập đầy đủ toàn bộ nội dung sau thay đổi ở các sheet chủ thể và tài sản (không chỉ phần thay đổi).",
         "- Xóa đăng ký: chỉ cần nhập sheet HO_SO, bắt buộc Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp và Căn cứ xóa đăng ký.",
         "- Thông báo xử lý tài sản bảo đảm: chưa đưa vào biểu mẫu, chờ xác nhận với khách hàng.",
         "",
         "4. File đính kèm",
         "- File đính kèm của từng hồ sơ (bản scan Phiếu, văn bản chứng nhận...): ghi tên file vào cột “Tên file đính kèm” của sheet HO_SO, nhiều file cách nhau bởi dấu chấm phẩy (;).",
         "- Nén toàn bộ file đính kèm thành 01 file .zip, tải lên cùng file Excel. Tên file trong file .zip phải trùng với tên đã ghi trong cột.",
         "- Định dạng file đính kèm: .pdf, .jpg, .png.",
         "- Công văn gửi dữ liệu của cả lô được đính kèm trực tiếp trên màn hình nhận dữ liệu, không ghi vào file Excel."
      ],
      "hoSo" : [
         {
            "g" : "Thông tin đăng ký",
            "h" : "Mã hồ sơ trong file",
            "k" : "ma",
            "note" : "Do đơn vị lập file tự đặt, không trùng trong file. VD: HS001. Dùng để liên kết các sheet.",
            "req" : true,
            "w" : 16
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Cơ quan đăng ký",
            "k" : "coQuan",
            "list" : "CO_QUAN_DK",
            "note" : "Chọn trong danh sách cơ quan đăng ký của Loại tài sản (sheet DANH_MUC). Loại tài sản chỉ có 01 cơ quan thì đã điền sẵn.",
            "req" : true,
            "w" : 36
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Loại đăng ký",
            "k" : "loaiDK",
            "list" : "LOAI_DK",
            "note" : "Chọn trong danh sách.",
            "req" : true,
            "w" : 22
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Số đăng ký / Số vào sổ",
            "k" : "soDK",
            "note" : "Số do cơ quan đăng ký cấp cho lần đăng ký này.",
            "req" : true,
            "w" : 22
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Thời điểm đăng ký",
            "k" : "thoiDiem",
            "note" : "dd/mm/yyyy hh:mm (24 giờ). VD: 15/09/2026 09:30",
            "req" : true,
            "w" : 20
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp",
            "k" : "soDKLD",
            "note" : "Bắt buộc nếu Loại đăng ký khác “Đăng ký lần đầu”.",
            "req" : false,
            "w" : 22
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Loại biện pháp bảo đảm",
            "k" : "loaiBP",
            "list" : "LOAI_BP",
            "note" : "Chọn trong danh sách.",
            "req" : true,
            "w" : 18
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Số hợp đồng bảo đảm",
            "k" : "soHD",
            "note" : "Bắt buộc với Đăng ký lần đầu, Đăng ký thay đổi.",
            "req" : false,
            "w" : 20
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Ngày ký hợp đồng bảo đảm",
            "k" : "ngayHD",
            "note" : "dd/mm/yyyy",
            "req" : false,
            "w" : 16
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Nội dung thay đổi",
            "k" : "noiDung",
            "note" : "Bắt buộc với Đăng ký thay đổi, Sửa chữa sai sót. Tóm tắt nội dung thay đổi.",
            "req" : false,
            "w" : 36
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Căn cứ xóa đăng ký",
            "k" : "canCu",
            "list" : "CAN_CU_XOA",
            "note" : "Bắt buộc với Xóa đăng ký. Chọn trong danh sách.",
            "req" : false,
            "w" : 30
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Tên file đính kèm",
            "k" : "files",
            "note" : "Tên file trong file .zip tải lên kèm, nhiều file cách nhau bởi dấu ;",
            "req" : false,
            "w" : 30
         },
         {
            "g" : "Thông tin đăng ký",
            "h" : "Ghi chú",
            "k" : "ghiChu",
            "note" : "",
            "req" : false,
            "w" : 24
         }
      ],
      "lists" : {
         "CAN_CU_XOA" : [
            "Chấm dứt nghĩa vụ được bảo đảm",
            "Hủy bỏ hoặc thay thế biện pháp bảo đảm",
            "Tài sản bảo đảm đã được xử lý xong",
            "Theo bản án, quyết định của Tòa án hoặc cơ quan có thẩm quyền",
            "Bên nhận bảo đảm đồng ý xóa đăng ký",
            "Căn cứ khác"
         ],
         "LOAI_CHU_THE" : [
            "Cá nhân trong nước",
            "Cá nhân nước ngoài",
            "Tổ chức trong nước",
            "Tổ chức nước ngoài"
         ],
         "LOAI_DK" : [
            "Đăng ký lần đầu",
            "Đăng ký thay đổi",
            "Sửa chữa sai sót",
            "Xóa đăng ký"
         ],
         "LOAI_GIAY_TO" : [
            "Căn cước / Căn cước công dân",
            "Hộ chiếu",
            "Mã số doanh nghiệp",
            "Mã số thuế",
            "Quyết định thành lập",
            "Giấy tờ khác"
         ]
      }
   },
   "msgs" : {
      "errMsg" : "Vui lòng chọn giá trị trong danh sách (xem sheet DANH_MUC).",
      "errTitle" : "Giá trị không hợp lệ",
      "listHeader" : "Danh sách giá trị"
   },
}
;
