# TÀI LIỆU HƯỚNG DẪN TÍCH HỢP API
## Kết nối Cổng Dịch vụ công Quốc gia với Hệ thống quản lý bồi thường nhà nước (BTNN)

| Mục | Nội dung |
| :--- | :--- |
| Phiên bản | 1.0 |
| Ngày | 27/10/2026 |
| Môi trường | Thử nghiệm (DEV) |
| Đối tác | Dịch vụ công (mã đối tác `DVC`) |
| Tài liệu nghiệp vụ liên quan | `EForm_DVC_YeuCauBoiThuong.md`, `Ket_noi_chia_se_Dich_vu_cong_BTNN.md` (cùng thư mục) |

---

## 1. Tổng quan

Hệ thống BTNN cung cấp cho Cổng Dịch vụ công (DVC) hai nhóm API:

1. **API chia sẻ danh mục** (chỉ đọc): DVC lấy các danh mục để dựng E-Form "Yêu cầu bồi thường nhà nước" - Quốc gia, Loại giấy tờ pháp lý, Địa bàn, Lĩnh vực phát sinh thiệt hại, Hình thức tiếp nhận, Tư cách người yêu cầu, Loại yêu cầu giải quyết bồi thường, Cơ quan giải quyết bồi thường.
2. **API nhận hồ sơ**: DVC gửi hồ sơ E-Form người dân/tổ chức đã nộp sang BTNN; hệ thống tạo hồ sơ ở màn **Tiếp nhận hồ sơ** của Cơ quan giải quyết bồi thường. DVC tra được trạng thái xử lý.

```
                 (1) Lấy token (client_credentials)
   Hệ thống DVC  -----------------------------------> Keycloak BTNN
        |
        | (2) Gọi API, kèm token + chữ ký HMAC
        v
   Cổng API đối tác BTNN (/api/share/v1)
        |-- GET  danh mục / địa bàn / cơ quan        -> trả dữ liệu
        |-- POST hồ sơ Yêu cầu bồi thường            -> trả số tiếp nhận (RECEIVED)
        |                                                  |
        |                         hệ thống tự chuyển hồ sơ vào màn Tiếp nhận (~1 phút)
        |-- GET  trạng thái hồ sơ                    -> ACCEPTED + mã hồ sơ BT-yyyy-nnn
```

Mọi dữ liệu trao đổi là JSON, mã hóa UTF-8, qua HTTPS.

---

## 2. Thông tin kết nối

| Thông tin | Giá trị |
| :--- | :--- |
| Địa chỉ cổng API (gốc) | `https://79.108.216.78:9982` |
| Tiền tố đường dẫn | `/api/share/v1` |
| Địa chỉ lấy token | `https://79.108.216.21/realms/bpbd-admin/protocol/openid-connect/token` |
| Mã đối tác (`X-Partner-Code`) | `DVC` |
| Client ID | `CLIENT_DVC` |
| Client secret | Gửi riêng qua kênh bảo mật (không ghi trong tài liệu) |
| Khóa ký HMAC | Gửi riêng qua kênh bảo mật (không ghi trong tài liệu) |
| IP được phép gọi | IP máy chủ DVC do DVC cung cấp; IP khác bị từ chối |
| Hạn mức | 100 lượt gọi/phút (theo cấu hình đối tác) |

> Hai bí mật (client secret và khóa HMAC) chỉ hiển thị một lần khi BTNN cấp. Lộ bí mật thì báo BTNN cấp lại; bí mật cũ hết hiệu lực ngay.

---

## 3. Các bước tích hợp

| Bước | Việc | Bên làm | Kết quả cần đạt |
| :--- | :--- | :--- | :--- |
| 1 | Chuẩn bị: DVC gửi IP máy chủ gọi API và đầu mối kỹ thuật. BTNN khai IP, cấp các mã API (mục 2 và 6), gửi client secret + khóa HMAC | Hai bên | DVC nhận đủ thông tin mục 2 |
| 2 | Lấy token Keycloak (mục 4) | DVC | Nhận được `access_token` |
| 3 | Ký gói tin và gọi thử `GET /api/share/v1/partner/ping` (mục 5) | DVC | HTTP 200. Lỗi thì đối chiếu bảng mục 8 |
| 4 | Đồng bộ danh mục lần đầu: gọi đủ các API ở mục 6.1, đi hết các trang, lưu `server_time` | DVC | Có đủ dữ liệu danh mục trên hệ thống DVC |
| 5 | Dựng E-Form theo `EForm_DVC_YeuCauBoiThuong.md`, gắn từng ô với danh mục tương ứng và áp đúng quy tắc lọc (mục 6.6) | DVC | E-Form hiển thị đúng giá trị, lọc đúng |
| 6 | Lập lịch đồng bộ định kỳ bằng `last_sync_time` (mục 6.5), đề xuất mỗi ngày 1 lần hoặc mỗi giờ | DVC | Danh mục DVC luôn khớp BTNN |
| 7 | Gửi hồ sơ thử (mục 7) theo bộ ca kiểm thử mục 9; BTNN đối chiếu hồ sơ trên màn Tiếp nhận | Hai bên | Mọi ca đạt kết quả mong đợi |
| 8 | Xử lý gửi lại / chống trùng và tra trạng thái (mục 7.7, 7.8) | DVC | Gửi lại không tạo hồ sơ trùng; hiển thị được trạng thái cho người nộp |
| 9 | Nghiệm thu trên môi trường thử nghiệm; khi chuyển chính thức BTNN gửi địa chỉ và bí mật mới | Hai bên | Biên bản nghiệm thu |

---

## 4. Lấy token từ Keycloak

API dùng chuẩn **OAuth 2.0 Client Credentials**. Mỗi lượt gọi cổng API phải kèm token còn hạn.

| Mục | Giá trị |
| :--- | :--- |
| Phương thức | `POST` |
| Địa chỉ | `https://79.108.216.21/realms/bpbd-admin/protocol/openid-connect/token` |
| Content-Type | `application/x-www-form-urlencoded` |
| Thân | `grant_type=client_credentials` |
| Gửi client | Cách 1: thêm `client_id=CLIENT_DVC&client_secret=<secret>` vào thân. Cách 2: header `Authorization: Basic base64("CLIENT_DVC:<secret>")`. Keycloak nhận cả hai |

**Ví dụ (curl):**

```bash
curl -X POST "https://79.108.216.21/realms/bpbd-admin/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=CLIENT_DVC" \
  -d "client_secret=<client secret>"
```

**Phản hồi:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIi...",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0,
  "scope": "profile email"
}
```

- Dùng token ở header `Authorization: Bearer <access_token>` của mọi lượt gọi cổng API.
- `expires_in` là số giây token còn hiệu lực (giá trị trên chỉ là ví dụ; đọc theo phản hồi thật). **Dùng lại token đến gần hết hạn** (vd còn dưới 30 giây) rồi mới xin token mới; không xin token cho từng lượt gọi.
- Token hết hạn: cổng trả 401, xin token mới rồi gọi lại.

| Lỗi Keycloak | Nguyên nhân |
| :--- | :--- |
| 401 `invalid_client` | Sai Client ID hoặc client secret, hoặc đối tác đang ngừng hoạt động (client bị khóa) |
| 400 `unauthorized_client` | Client không được phép dùng client_credentials - báo BTNN |
| 400 `unsupported_grant_type` | Thiếu hoặc sai `grant_type` |

---

## 5. Ký gói tin

### 5.1. Header bắt buộc

| Header | Nội dung |
| :--- | :--- |
| `Authorization` | `Bearer <access_token>` (mục 4) |
| `X-Partner-Code` | `DVC` |
| `X-Timestamp` | Thời điểm gọi, **giây** epoch UTC (vd `1793015400`). Lệch đồng hồ máy chủ BTNN tối đa 5 phút |
| `X-Nonce` | Chuỗi ngẫu nhiên 8-100 ký tự `A-Z a-z 0-9 _ -`, **mỗi lượt gọi một giá trị mới** (không dùng lại) |
| `X-Signature` | Chữ ký HMAC-SHA256 dạng hex chữ thường (mục 5.2) |
| `X-Idempotency-Key` | Tùy chọn, dùng khi gửi hồ sơ (mục 7.7) |
| `Content-Type` | `application/json` cho API POST |

### 5.2. Cách tạo chữ ký

Chuỗi cần ký gồm 5 dòng nối bằng ký tự xuống dòng `\n` (không có `\n` ở cuối):

```
METHOD
PATH
X-Timestamp
X-Nonce
hex(SHA-256(thân request))
```

- `METHOD`: `GET` hoặc `POST` (chữ hoa).
- `PATH`: đường dẫn **kể cả query string, đúng nguyên văn như gửi đi** (đã mã hóa URL), không gồm tên máy/cổng. Vd `/api/share/v1/areas?level=WARD&province_code=01`.
- Thân rỗng (GET): `hex(SHA-256(""))` = `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
- Thân POST: băm **chính mảng byte JSON sẽ gửi đi**; không tuần tự hóa lại JSON sau khi ký.
- `X-Signature` = `hex(HMAC-SHA256(khóa HMAC, chuỗi cần ký))`, khóa dùng nguyên văn chuỗi khóa BTNN cấp (UTF-8).

### 5.3. Ví dụ mã

**Java 17+:**

```java
import java.net.URI;
import java.net.http.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.UUID;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class BtnnClient {
    static final String BASE = "https://79.108.216.78:9982";

    static String sha256Hex(byte[] data) throws Exception {
        return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(data));
    }

    static String hmacHex(String key, String text) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        return HexFormat.of().formatHex(mac.doFinal(text.getBytes(StandardCharsets.UTF_8)));
    }

    static HttpResponse<String> call(String method, String path, byte[] body,
                                     String token, String hmacKey) throws Exception {
        String ts = String.valueOf(System.currentTimeMillis() / 1000);
        String nonce = UUID.randomUUID().toString().replace("-", "");
        String canonical = method + "\n" + path + "\n" + ts + "\n" + nonce + "\n" + sha256Hex(body);
        HttpRequest.Builder b = HttpRequest.newBuilder(URI.create(BASE + path))
                .header("Authorization", "Bearer " + token)
                .header("X-Partner-Code", "DVC")
                .header("X-Timestamp", ts)
                .header("X-Nonce", nonce)
                .header("X-Signature", hmacHex(hmacKey, canonical));
        if ("POST".equals(method)) {
            b.header("Content-Type", "application/json").POST(HttpRequest.BodyPublishers.ofByteArray(body));
        } else {
            b.GET();
        }
        return HttpClient.newHttpClient().send(b.build(), HttpResponse.BodyHandlers.ofString());
    }

    // Vd: call("GET", "/api/share/v1/partner/ping", new byte[0], token, key)
}
```

**C# (.NET 6+):**

```csharp
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;

static string Sha256Hex(byte[] data) => Convert.ToHexString(SHA256.HashData(data)).ToLowerInvariant();

static string HmacHex(string key, string text)
{
    using var h = new HMACSHA256(Encoding.UTF8.GetBytes(key));
    return Convert.ToHexString(h.ComputeHash(Encoding.UTF8.GetBytes(text))).ToLowerInvariant();
}

static async Task<HttpResponseMessage> CallAsync(HttpClient http, string method, string path,
                                                 byte[] body, string token, string hmacKey)
{
    var ts = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
    var nonce = Guid.NewGuid().ToString("N");
    var canonical = $"{method}\n{path}\n{ts}\n{nonce}\n{Sha256Hex(body)}";
    var req = new HttpRequestMessage(new HttpMethod(method), "https://79.108.216.78:9982" + path);
    req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
    req.Headers.Add("X-Partner-Code", "DVC");
    req.Headers.Add("X-Timestamp", ts);
    req.Headers.Add("X-Nonce", nonce);
    req.Headers.Add("X-Signature", HmacHex(hmacKey, canonical));
    if (method == "POST")
    {
        req.Content = new ByteArrayContent(body);
        req.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
    }
    return await http.SendAsync(req);
}
```

**Bash (curl + openssl), gọi thử kết nối:**

```bash
TOKEN="<access_token>"; KEY="<khoa HMAC>"; PATH_Q="/api/share/v1/partner/ping"
TS=$(date +%s); NONCE=$(openssl rand -hex 16)
BODY_HASH=$(printf '' | openssl dgst -sha256 -hex | awk '{print $NF}')
SIG=$(printf '%s\n%s\n%s\n%s\n%s' GET "$PATH_Q" "$TS" "$NONCE" "$BODY_HASH" \
      | openssl dgst -sha256 -hmac "$KEY" -hex | awk '{print $NF}')
curl "https://79.108.216.78:9982$PATH_Q" \
  -H "Authorization: Bearer $TOKEN" -H "X-Partner-Code: DVC" \
  -H "X-Timestamp: $TS" -H "X-Nonce: $NONCE" -H "X-Signature: $SIG"
```

### 5.4. Gọi thử kết nối

`GET /api/share/v1/partner/ping` - trả HTTP 200 khi token, chữ ký, IP và mã đối tác đều đúng. Đây là bước 3 của mục 3.

---

## 6. API chia sẻ danh mục (chỉ đọc)

Mỗi danh mục là một API riêng, có mã API riêng; DVC chỉ gọi được các API BTNN đã cấp.

### 6.1. Danh sách API DVC cần dùng

| Dữ liệu (theo tài liệu kết nối DVC) | Phương thức + đường dẫn | Mã API | Ghi chú |
| :--- | :--- | :--- | :--- |
| Danh sách loại danh mục được cấp | `GET /api/share/v1/catalog-types` | `SHARE_CATALOG_TYPES` | Chỉ trả các loại DVC được cấp; kèm định nghĩa thuộc tính bổ sung |
| Quốc tịch / Quốc gia [DM_09] | `GET /api/share/v1/catalogs/DM_09` | `SHARE_CATALOG_DM_09` | `code` là mã quốc gia ISO 3166, vd `VN` |
| Loại giấy tờ pháp lý [DM_10] | `GET /api/share/v1/catalogs/DM_10` | `SHARE_CATALOG_DM_10` | Chỉ hiện trên E-Form giá trị có `use_on_eform` = `true` |
| Lĩnh vực phát sinh thiệt hại [DM_22] | `GET /api/share/v1/catalogs/DM_22` | `SHARE_CATALOG_DM_22` | |
| Hình thức tiếp nhận hồ sơ bồi thường [DM_25] | `GET /api/share/v1/catalogs/DM_25` | `SHARE_CATALOG_DM_25` | Hồ sơ từ DVC luôn là `DICH_VU_CONG` |
| Tư cách người yêu cầu bồi thường [DM_26] | `GET /api/share/v1/catalogs/DM_26` | `SHARE_CATALOG_DM_26` | Lọc theo `for_individual` / `for_organization` |
| Loại yêu cầu giải quyết bồi thường | `GET /api/share/v1/catalogs/RESOLUTION_SCOPE` | `SHARE_CATALOG_RESOLUTION_SCOPE` | `CA_HAI`, `CHI_BOI_THUONG`, `CHI_PHUC_HOI` |
| Danh mục địa bàn | `GET /api/share/v1/areas` | `SHARE_AREA` | Tỉnh/Thành phố và Phường/Xã (mục 6.4) |
| Cơ quan giải quyết bồi thường | `GET /api/share/v1/org-units` | `SHARE_ORG_UNIT` | Lọc theo Tỉnh/Thành phố (mục 6.4) |

### 6.2. Tham số chung (đều không bắt buộc)

| Tham số | Ý nghĩa |
| :--- | :--- |
| `last_sync_time` | Mốc đồng bộ lần trước, ISO-8601 **có múi giờ**, vd `2026-10-26T09:00:00+07:00` (trong URL viết `%2B07:00`). Có mốc: chỉ trả bản ghi tạo/sửa từ mốc đó, **kèm bản ghi đã xóa (`is_deleted=true`) và ngừng hoạt động (`is_active=false`)**. Không có mốc: trả toàn bộ bản ghi còn hiệu lực |
| `include_inactive` | `true` = lấy cả bản ghi ngừng hoạt động. Mặc định `false`. Chỉ có nghĩa khi không có `last_sync_time` |
| `page` | Trang, bắt đầu từ 0 |
| `size` | Số bản ghi một trang, mặc định 500, tối đa 1000 |
| `keyword` | Tìm theo mã hoặc tên, không phân biệt hoa thường |
| `parent_code` / `parent_id` | Chỉ lấy con **trực tiếp** của bản ghi cha |
| `include_descendants` | `true` = lấy **cả nhánh con cháu** của cha (đi cùng `parent_code`/`parent_id`) |
| `root_only` | `true` = chỉ lấy cấp gốc (không có cha) |

Mỗi bản ghi có `parent_id`, `parent_code`, `depth` (độ sâu, cấp gốc = 0) và `has_children`. Sắp xếp cố định theo thời điểm thay đổi rồi `id`, nên đi hết các trang không sót, không trùng.

### 6.3. Khuôn phản hồi và ví dụ

```json
{
  "code": "SUCCESS",
  "message": null,
  "data": {
    "items": [ { "...": "..." } ],
    "server_time": "2026-10-27T10:00:00.123456+07:00",
    "page": 0,
    "size": 500,
    "total": 6,
    "has_more": false
  }
}
```

Ví dụ một bản ghi `GET /api/share/v1/catalogs/DM_26`. Thuộc tính bổ sung của danh mục là **trường riêng ngang hàng** `code`, `name_vi` (ở đây `for_individual`, `for_organization`):

```json
{
  "id": "01a13e49-0000-7000-8000-000000000001",
  "type_code": "DM_26",
  "code": "NGUOI_THUA_KE",
  "name_vi": "Người thừa kế của người bị thiệt hại",
  "name_en": null,
  "short_name": null, "short_name_en": null, "description": null,
  "parent_id": null, "parent_code": null, "depth": 0, "has_children": false,
  "sort_order": 2, "is_active": true, "is_deleted": false,
  "created_at": "2026-10-15T13:39:44+07:00", "updated_at": "2026-10-26T16:30:00+07:00",
  "for_individual": true,
  "for_organization": false
}
```

Trường chuẩn của bản ghi danh mục: `id, type_code, code, name_vi, name_en, short_name, short_name_en, description, parent_id, parent_code, depth, has_children, sort_order, is_active, is_deleted, created_at, updated_at`. Thời gian trả ở múi giờ +07:00.

### 6.4. Địa bàn và Cơ quan giải quyết

**Địa bàn** - `GET /api/share/v1/areas`:

| Tham số riêng | Ý nghĩa |
| :--- | :--- |
| `level` | `PROVINCE` (Tỉnh/Thành phố) hoặc `WARD` (Phường/Xã); bỏ trống = cả hai |
| `province_code` | Lọc Phường/Xã thuộc tỉnh đó |

Trường trả về: `id, code, name, level, province_code, unit_type, parent_id, parent_code, depth, has_children, is_active, is_deleted, created_at, updated_at` (Phường/Xã có `parent_code` = mã tỉnh).

```
GET /api/share/v1/areas?level=PROVINCE
GET /api/share/v1/areas?level=WARD&province_code=01
```

**Cơ quan giải quyết bồi thường** - `GET /api/share/v1/org-units?province_code=<mã tỉnh>`: danh sách đơn vị trong Cơ cấu tổ chức thuộc tỉnh đã chọn. `code` của đơn vị là giá trị gửi ở trường `agency.agency_code` khi nộp hồ sơ. Trường trả về: `id, code, name, short_name, parent_id, parent_code, depth, has_children, unit_type, unit_level, org_type, province_code, ward_code, address, phone, email, is_active, is_deleted, created_at, updated_at`.

### 6.5. Đồng bộ tăng dần

1. Lần đầu: gọi không có `last_sync_time`, đi hết các trang (`has_more=false` là hết). Giữ `server_time` của **trang đầu tiên**.
2. Các lần sau: gọi với `last_sync_time` = `server_time` đã giữ (nên lùi vài phút, vd 5 phút), đi hết các trang, **cập nhật/thêm theo `id`**; bản ghi `is_deleted=true` thì xóa, `is_active=false` thì ẩn khỏi E-Form.
3. Chỉ cập nhật mốc sau khi đi hết các trang thành công.

### 6.6. Quy tắc dùng danh mục trên E-Form

| Ô E-Form | Quy tắc |
| :--- | :--- |
| Loại giấy tờ thân nhân | Chỉ hiện giá trị DM_10 có `use_on_eform` = `true` (không có Mã số thuế) |
| Tư cách người yêu cầu | `Loại người yêu cầu` = Cá nhân: giá trị DM_26 có `for_individual` = `true`; = Tổ chức: có `for_organization` = `true` |
| Tỉnh/Thành phố | `areas?level=PROVINCE` |
| Phường/Xã | `areas?level=WARD&province_code=<tỉnh đã chọn>` |
| Cơ quan giải quyết bồi thường | `org-units?province_code=<Tỉnh/Thành phố cơ quan giải quyết>` |
| Hình thức tiếp nhận | Cố định `DICH_VU_CONG` |

---

## 7. API gửi hồ sơ Yêu cầu bồi thường

| API | Phương thức + đường dẫn | Mã API |
| :--- | :--- | :--- |
| Gửi hồ sơ | `POST /api/share/v1/compensation/claim-requests` | `DVC_CLAIM_REQUEST` |
| Tra trạng thái | `GET /api/share/v1/compensation/claim-requests?dvc_dossier_code=<mã hồ sơ DVC>` | `DVC_CLAIM_STATUS` |

### 7.1. Luồng xử lý

1. DVC gửi hồ sơ. Cổng kiểm hợp lệ toàn bộ; hợp lệ thì trả **số tiếp nhận** và trạng thái `RECEIVED`.
2. Trong khoảng 1 phút, hệ thống tự chuyển hồ sơ vào màn **Tiếp nhận hồ sơ** của Cơ quan giải quyết: Nguồn hồ sơ "Dịch vụ công quốc gia", Hình thức tiếp nhận "Dịch vụ công", trạng thái "Chờ phân công". Hồ sơ có mã `BT-yyyy-nnn`.
3. DVC tra trạng thái để biết hồ sơ đã vào hệ thống (`ACCEPTED`, kèm mã hồ sơ) hoặc bị từ chối (`REJECTED`, kèm lý do).

### 7.2. Thân request

JSON UTF-8, tên trường viết thường có gạch dưới (snake_case), giá trị danh mục là **mã** lấy từ API mục 6. Trường không có trong bảng dưới bị bỏ qua; chuỗi rỗng coi như không có.

Ngoài các trường E-Form, bắt buộc có:

| Trường | Ý nghĩa |
| :--- | :--- |
| `dvc_dossier_code` | Mã hồ sơ bên DVC (duy nhất), ký tự `A-Za-z0-9 . _ : / -`, tối đa 100 |
| `submitted_at` | Thời điểm người dân nộp, ISO-8601 có múi giờ, vd `2026-10-27T09:30:00+07:00` |

Giá trị mặc định khi không gửi: `requester_type` = `CA_NHAN`, `requester_role` = `NGUOI_BI_THIET_HAI`, `resolution_scope` = `CA_HAI`, `country_code` = `VN`.

### 7.3. Ánh xạ trường E-Form sang JSON

STT theo bảng II của `EForm_DVC_YeuCauBoiThuong.md`.

| STT | Trường E-Form | Trường JSON | Bắt buộc |
| :--- | :--- | :--- | :--- |
| 1 | Tỉnh/Thành phố cơ quan giải quyết | `agency.province_code` | Có |
| 2 | Cơ quan giải quyết bồi thường | `agency.agency_code` | Có |
| 3 | Loại yêu cầu giải quyết bồi thường | `overview.resolution_scope` | Không (mặc định `CA_HAI`) |
| - | Hình thức tiếp nhận [DM_25] | `overview.receipt_form` | Không; có thì phải là `DICH_VU_CONG` |
| 4 | Lĩnh vực phát sinh thiệt hại | `overview.damage_field` | Có |
| 5 | Hành vi gây thiệt hại của người thi hành công vụ (tối đa 2000) | `overview.damage_act` | Không |
| 6 | Loại người yêu cầu (`CA_NHAN` / `TO_CHUC`) | `requester.requester_type` | Không (mặc định `CA_NHAN`) |
| 7, 17 | Tư cách người yêu cầu | `requester.requester_role` | Không (mặc định `NGUOI_BI_THIET_HAI`) |
| 8 | Họ và tên (tối đa 255) - Cá nhân | `requester.full_name` | Có khi Cá nhân |
| 9 | Loại giấy tờ thân nhân - Cá nhân | `requester.id_doc_type` | Có khi Cá nhân |
| 10 | Số giấy tờ thân nhân (tối đa 50) - Cá nhân | `requester.id_doc_no` | Có khi Cá nhân |
| 18 | Tên tổ chức (tối đa 255) - Tổ chức | `requester.org_name` | Có khi Tổ chức |
| 19 | Mã số tổ chức (tối đa 50) - Tổ chức | `requester.org_code` | Có khi Tổ chức |
| 11, 20 | Số điện thoại | `requester.phone` | Có |
| 12, 21 | Email (tối đa 255) | `requester.email` | Không |
| 13, 22 | Quốc gia | `requester.country_code` | Không (mặc định `VN`) |
| 14, 23 | Tỉnh/Thành phố | `requester.province` | Có |
| 15, 24 | Phường/Xã | `requester.ward` | Có |
| 16, 25 | Địa chỉ chi tiết (tối đa 500) | `requester.address_detail` | Có |
| 26, 35 | Họ và tên người bị thiệt hại (tối đa 100) | `victim.full_name` | Không |
| 27, 36 | Ngày sinh (`yyyy-MM-dd`) | `victim.birth_date` | Không |
| 28, 37 | Loại giấy tờ thân nhân | `victim.id_doc_type` | Không |
| 29, 38 | Số giấy tờ thân nhân (tối đa 50) | `victim.id_doc_no` | Không |
| 30, 39 | Tỉnh/Thành phố (mã địa bàn) | `victim.province_code` | Không |
| 31, 40 | Phường/Xã (văn bản, tối đa 100) | `victim.ward_name` | Không |
| 32, 41 | Địa chỉ chi tiết (tối đa 500) | `victim.address_detail` | Không |
| 33 | Tên tổ chức bị thiệt hại (tối đa 255) - D1 | `victim.org_name` | Không |
| 34 | Mã số tổ chức (tối đa 50) - D1 | `victim.org_code` | Không |
| 43 | Tên văn bản, căn cứ (tối đa 255) | `basis_documents[].title` | Không |
| 44 | Tệp văn bản căn cứ (pdf, jpg, png; tối đa 20MB) | `basis_documents[].file` | Không |
| 48 | Tên tài liệu (tối đa 255) | `attachments[].title` | Không (tự lấy theo tên tệp) |
| 49 | Tệp đính kèm (pdf, doc, docx, jpg, png; tối đa 20MB) | `attachments[].file` | Không |

STT 42, 45, 46, 47, 50, 51 (STT dòng, Thao tác, Thêm dòng) là điều khiển giao diện, không có trong API; thứ tự dòng theo thứ tự mảng.

**Khối người bị thiệt hại (`victim`)** chỉ được nhận khi `requester_role` khác `NGUOI_BI_THIET_HAI`:

| Loại người yêu cầu + Tư cách | Trường `victim` dùng |
| :--- | :--- |
| `CA_NHAN` + tư cách khác Người bị thiệt hại | Khối D: `full_name`, `birth_date`, `id_doc_type`, `id_doc_no`, `province_code`, `ward_name`, `address_detail` |
| `TO_CHUC` + `TO_CHUC_KE_THUA` | Khối D1: `org_name`, `org_code` |
| `TO_CHUC` + `NGUOI_DUOC_UY_QUYEN` | Khối D2: như khối D |

Trường ngoài nhánh bị bỏ, không lưu.

### 7.4. Gửi tệp

Tệp gửi trong JSON dạng **base64**: `"file": { "file_name": "ban-an.pdf", "content_base64": "<base64 chuẩn>" }`.

- Tối đa 20MB mỗi tệp, 20 dòng mỗi bảng, cả gói tin tối đa 64MB (một tệp 20MB khoảng 27MB khi mã base64).
- Định dạng kiểm theo **nội dung tệp**, không theo đuôi: văn bản căn cứ nhận pdf, jpg, png; tài liệu đính kèm nhận thêm doc, docx.
- Dòng có tệp mà thiếu `title` thì lấy tên tệp bỏ phần mở rộng.
- Chữ ký (mục 5.2) băm **toàn bộ** thân JSON, kể cả chuỗi base64.

### 7.5. Ví dụ request

Cá nhân là người thừa kế của người bị thiệt hại (có khối người bị thiệt hại):

```json
{
  "dvc_dossier_code": "H48.12.2026.000123",
  "submitted_at": "2026-10-27T09:30:00+07:00",
  "agency": { "province_code": "01", "agency_code": "MA_CO_QUAN_GIAI_QUYET" },
  "overview": {
    "receipt_form": "DICH_VU_CONG",
    "resolution_scope": "CA_HAI",
    "damage_field": "QUAN_LY_HANH_CHINH",
    "damage_act": "Tóm tắt hành vi gây thiệt hại của người thi hành công vụ"
  },
  "requester": {
    "requester_type": "CA_NHAN",
    "requester_role": "NGUOI_THUA_KE",
    "full_name": "Nguyễn Văn A",
    "id_doc_type": "CCCD",
    "id_doc_no": "001090000001",
    "phone": "0912345678",
    "email": "a@example.com",
    "country_code": "VN",
    "province": "01",
    "ward": "00001",
    "address_detail": "Số 1 phố Huế"
  },
  "victim": {
    "full_name": "Nguyễn Văn B",
    "birth_date": "1960-05-20",
    "id_doc_type": "CCCD",
    "id_doc_no": "001060000002",
    "province_code": "01",
    "ward_name": "Phường Hàng Bài",
    "address_detail": "Số 2 phố Huế"
  },
  "basis_documents": [
    { "title": "Bản án số 12/2025", "file": { "file_name": "ban-an.pdf", "content_base64": "JVBERi0xLjQK..." } }
  ],
  "attachments": [
    { "title": "Giấy ủy quyền", "file": { "file_name": "uy-quyen.pdf", "content_base64": "JVBERi0xLjQK..." } }
  ]
}
```

Giá trị `MA_CO_QUAN_GIAI_QUYET`, `01`, `00001` là ví dụ: dùng mã thật lấy từ API mục 6. Người yêu cầu là tổ chức: `requester_type` = `TO_CHUC`, dùng `org_name`, `org_code` thay cho `full_name`, `id_doc_type`, `id_doc_no`.

### 7.6. Quy tắc kiểm hợp lệ

Mọi lỗi được gom và trả **một lượt**. Giá trị danh mục phải đang hoạt động.

| Trường | Quy tắc | Mã lỗi |
| :--- | :--- | :--- |
| Trường bắt buộc (theo khối và nhánh) | Thiếu hoặc rỗng | `REQUIRED` |
| Mọi chuỗi | Quá độ dài tối đa | `MAX_LENGTH` |
| Kiểu dữ liệu, ngày tháng | Sai kiểu, ngày không đúng ISO | `INVALID_FORMAT` |
| `requester.phone` | Đúng 10 chữ số, bắt đầu bằng 03, 05, 07, 08 hoặc 09 | `INVALID_PHONE` |
| `requester.email` | Có thì đúng định dạng email | `INVALID_EMAIL` |
| `requester.requester_role` | Có trong DM_26; Cá nhân chỉ nhận tư cách có `for_individual`, Tổ chức chỉ nhận tư cách có `for_organization` | `NOT_IN_CATALOG` / `NOT_ALLOWED` |
| `*.id_doc_type` | Có trong DM_10 và `use_on_eform` = `true` (không nhận `MA_SO_THUE`) | `NOT_IN_CATALOG` / `NOT_ALLOWED` |
| `requester.country_code` | Có trong DM_09 | `NOT_IN_CATALOG` |
| `requester.province`, `requester.ward` | Quốc gia `VN`: mã địa bàn và Phường/Xã thuộc Tỉnh/Thành phố đã chọn. Quốc gia khác: văn bản tự do (tối đa 100) | `NOT_IN_CATALOG` / `WARD_NOT_IN_PROVINCE` |
| `overview.damage_field`, `overview.resolution_scope` | Có trong DM_22 / RESOLUTION_SCOPE | `NOT_IN_CATALOG` |
| `overview.receipt_form` | Có thì phải là `DICH_VU_CONG` | `NOT_ALLOWED` |
| `agency.province_code` | Mã Tỉnh/Thành phố trong danh mục địa bàn | `NOT_IN_CATALOG` |
| `agency.agency_code` | Đơn vị còn hiệu lực, thuộc Tỉnh/Thành phố cơ quan giải quyết | `NOT_IN_CATALOG` / `AGENCY_NOT_IN_PROVINCE` |
| `victim.province_code` | Có thì là mã Tỉnh/Thành phố | `NOT_IN_CATALOG` |
| `*.file.content_base64` | Base64 hợp lệ, không rỗng | `INVALID_BASE64` |
| Tệp | Tối đa 20MB | `FILE_TOO_LARGE` |
| Tệp | Đúng định dạng cho phép | `INVALID_FILE_TYPE` |
| `basis_documents`, `attachments` | Tối đa 20 dòng | `TOO_MANY_ROWS` |

### 7.7. Phản hồi và chống trùng

**Nhận thành công (HTTP 200):**

```json
{
  "code": "SUCCESS",
  "message": "Đã tiếp nhận hồ sơ yêu cầu bồi thường từ Dịch vụ công",
  "data": {
    "dvc_dossier_code": "H48.12.2026.000123",
    "receipt_no": "API-20261027-000123",
    "status": "RECEIVED",
    "status_name": "Đã tiếp nhận, chờ chuyển vào màn Tiếp nhận",
    "dossier_code": null,
    "note": null,
    "received_time": "2026-10-27T09:30:05+07:00",
    "processed_time": null,
    "duplicate": false
  }
}
```

**Sai dữ liệu (HTTP 400, `VALIDATION_ERROR`)** - chi tiết từng trường ở `data.errors`:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Hồ sơ gửi lên có 2 trường không hợp lệ; chi tiết từng trường ở data.errors.",
  "data": {
    "errors": [
      { "field": "requester.phone", "code": "INVALID_PHONE",
        "message": "Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng 03, 05, 07, 08 hoặc 09." },
      { "field": "attachments[0].file.content_base64", "code": "INVALID_FILE_TYPE",
        "message": "Định dạng tệp không được chấp nhận; chỉ nhận pdf, doc, docx, jpg, png." }
    ]
  }
}
```

**Chống trùng.** Gửi lại cùng `dvc_dossier_code` (hoặc cùng `X-Idempotency-Key`) trả **kết quả cũ** (HTTP 200, `duplicate` = `true`), không tạo hồ sơ thứ hai và không kiểm lại nội dung. Vì vậy khi mất kết nối, DVC cứ gửi lại cùng mã. Hồ sơ đã bị từ chối vẫn giữ mã: nộp lại phải dùng mã hồ sơ DVC mới.

### 7.8. Tra trạng thái

`GET /api/share/v1/compensation/claim-requests?dvc_dossier_code=H48.12.2026.000123` (ký với `PATH` gồm cả query; thân rỗng).

| `status` | Ý nghĩa | Thông tin kèm |
| :--- | :--- | :--- |
| `RECEIVED` | Đã nhận, đang chờ chuyển vào màn Tiếp nhận | `note` có lý do nếu hệ thống chưa chuyển được |
| `ACCEPTED` | Đã vào màn Tiếp nhận hồ sơ, chờ cơ quan phân công xử lý | `dossier_code` = mã hồ sơ `BT-yyyy-nnn` |
| `REJECTED` | Bị từ chối | `note` là lý do |

Mã hồ sơ không có hoặc không phải của DVC: HTTP 404 `NOT_FOUND`. Thiếu tham số: 400 `VALIDATION_ERROR`.

---

## 8. Mã lỗi chung của cổng API

| HTTP | Mã | Nguyên nhân | Cách xử lý |
| :--- | :--- | :--- | :--- |
| 401 | (không có mã) | Thiếu token, token sai hoặc hết hạn | Xin token mới (mục 4) |
| 401 | `PARTNER_UNKNOWN` | Sai `X-Partner-Code` hoặc đối tác ngừng hoạt động | Kiểm mã `DVC`; liên hệ BTNN |
| 401 | `TIMESTAMP_INVALID` | `X-Timestamp` lệch quá 5 phút | Đồng bộ giờ máy chủ (NTP), dùng giây epoch |
| 401 | `INVALID_SIGNATURE` | Chữ ký sai | Kiểm chuỗi cần ký (mục 5.2): `PATH` gồm query, băm đúng byte thân, đúng khóa |
| 401 | `NONCE_REPLAY` | `X-Nonce` đã dùng | Mỗi lượt gọi một nonce mới |
| 403 | `CLIENT_MISMATCH` | Token không phải của `CLIENT_DVC` | Lấy token bằng đúng client của DVC |
| 403 | `IP_DENIED` | IP không nằm trong danh sách cho phép | Báo BTNN khai thêm IP |
| 403 | `API_FORBIDDEN` | DVC chưa được cấp mã API này | Báo BTNN cấp mã |
| 403 | `API_DISABLED` | API đang tạm tắt | Liên hệ BTNN |
| 400 | `VALIDATION_ERROR` | Tham số hoặc dữ liệu sai | Xem chi tiết trong phản hồi |
| 404 | `NOT_FOUND` | Không tìm thấy dữ liệu | |
| 413 | `BODY_TOO_LARGE` | Thân quá 64MB | Giảm dung lượng tệp |
| 429 | `RATE_LIMITED` | Vượt hạn mức lượt gọi/phút | Giãn nhịp gọi, thử lại sau |
| 5xx | | Lỗi máy chủ BTNN | Thử lại sau; kéo dài thì báo BTNN kèm thời điểm gọi |

---

## 9. Ca kiểm thử nghiệm thu

| STT | Ca kiểm | Kết quả mong đợi |
| :--- | :--- | :--- |
| 1 | Lấy token đúng client | Có `access_token` |
| 2 | Gọi `partner/ping` đủ header, ký đúng | HTTP 200 |
| 3 | Gọi `partner/ping` với chữ ký sai / nonce dùng lại / giờ lệch > 5 phút | 401 `INVALID_SIGNATURE` / `NONCE_REPLAY` / `TIMESTAMP_INVALID` |
| 4 | Đồng bộ lần đầu đủ các danh mục mục 6.1 | Đủ dữ liệu, `has_more=false` ở trang cuối |
| 5 | Đồng bộ lại với `last_sync_time` | Chỉ nhận bản ghi thay đổi (kể cả đã xóa/ngừng) |
| 6 | E-Form: ô Loại giấy tờ, Tư cách, Phường/Xã, Cơ quan giải quyết | Lọc đúng quy tắc mục 6.6 |
| 7 | Gửi hồ sơ Cá nhân - Người bị thiệt hại, có tệp | 200 `RECEIVED`; sau ~1 phút tra trạng thái `ACCEPTED` kèm mã `BT-...` |
| 8 | Gửi hồ sơ Cá nhân - Người thừa kế (khối D) | Hồ sơ có thông tin người bị thiệt hại |
| 9 | Gửi hồ sơ Tổ chức - Tổ chức kế thừa (khối D1) | Hồ sơ có tên, mã số tổ chức bị thiệt hại |
| 10 | Gửi hồ sơ Tổ chức - Được ủy quyền (khối D2) | Hồ sơ có thông tin người bị thiệt hại |
| 11 | Gửi hồ sơ sai số điện thoại, thiếu trường bắt buộc, Mã số thuế ở Loại giấy tờ, Phường không thuộc Tỉnh | 400, `data.errors` liệt kê đủ từng trường |
| 12 | Gửi tệp sai định dạng / quá 20MB | 400 `INVALID_FILE_TYPE` / `FILE_TOO_LARGE` |
| 13 | Gửi lại hồ sơ cùng `dvc_dossier_code` | 200, `duplicate=true`, cùng số tiếp nhận, không có hồ sơ thứ hai |
| 14 | Tra trạng thái mã không tồn tại | 404 |

---

## 10. Chuyển sang môi trường chính thức và liên hệ

- Môi trường chính thức có địa chỉ cổng API, địa chỉ Keycloak và bí mật **khác** môi trường thử nghiệm; BTNN gửi khi chuyển. Không dùng bí mật thử nghiệm ở môi trường chính thức.
- Đổi IP máy chủ, cần thêm API, hay nghi lộ bí mật: liên hệ đầu mối kỹ thuật BTNN để cập nhật trên màn Kết nối chia sẻ dữ liệu.
- Khi báo lỗi, gửi kèm: thời điểm gọi, đường dẫn, mã HTTP, nội dung phản hồi, giá trị `X-Nonce` (không gửi token, client secret, khóa HMAC).
