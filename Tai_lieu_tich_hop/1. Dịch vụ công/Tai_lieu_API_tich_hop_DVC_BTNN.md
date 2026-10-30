# TÀI LIỆU HƯỚNG DẪN TÍCH HỢP API
## Kết nối Dịch vụ công với Hệ thống quản lý bồi thường nhà nước (BTNN)

| Mục | Nội dung |
| :--- | :--- |
| Phiên bản | 1.3 |
| Ngày | 30/10/2026 |
| Môi trường | Thử nghiệm (DEV) |
| Đối tác | Dịch vụ công (mã đối tác `DVC`) |
| Tài liệu nghiệp vụ liên quan | `EForm_DVC_YeuCauBoiThuong.md`, `Ket_noi_chia_se_Dich_vu_cong_BTNN.md` (cùng thư mục) |

**Lịch sử thay đổi**

| Phiên bản | Ngày | Nội dung |
| :--- | :--- | :--- |
| 1.0 | 27/10/2026 | Bản đầu |
| 1.1 | 29/10/2026 | Theo E-Form 83 trường: khối `dossier_components`, `advance`, `payee`, `honor_restoration`, `other_rights`, `damages`; bổ sung độ dài tối đa thực tế, mã lỗi `TOO_MANY_ROWS`, `SECRET_NOT_ISSUED`, `GATEWAY_NOT_CONFIGURED`, khuôn `X-Idempotency-Key`, điều kiện Luồng tiếp nhận |
| 1.2 | 29/10/2026 | `org-units`: `province_code` là tỉnh suy ra theo cây đơn vị, thêm tham số `claim_intake_only`, mặc định chỉ trả đơn vị còn hiệu lực; `ping` trả phong bì chuẩn kèm `data.server_time`; API tra trạng thái thêm khối `data.progress` (trạng thái hồ sơ và văn bản đã ban hành); thêm ca kiểm thử 16-18 |
| 1.3 | 30/10/2026 | Thêm mục 8 - API gửi kết quả xử lý hồ sơ về Dịch vụ công (16 bước, trạng thái vụ việc, thông tin văn bản, link tệp kết quả kèm mã băm SHA-256, gửi lại, chống trùng, nhật ký đồng bộ) và API tải tệp kết quả `DVC_RESULT_FILE`; mục Mã lỗi, Ca kiểm thử, Chuyển môi trường đánh số lại 9-11; thêm ca kiểm thử 19-26; `progress.claim_status` (mục 7.8) dùng bộ mã trạng thái vụ việc mục 8.2, bỏ tham chiếu DM_24 |

---

## 1. Tổng quan

Hệ thống BTNN kết nối với Cổng Dịch vụ công (DVC) qua ba nhóm API:

1. **API chia sẻ danh mục** (chỉ đọc): DVC lấy các danh mục để dựng E-Form "Yêu cầu bồi thường nhà nước" - Quốc gia, Loại giấy tờ pháp lý, Địa bàn, Lĩnh vực phát sinh thiệt hại, Hình thức tiếp nhận, Tư cách người yêu cầu, Loại thiệt hại yêu cầu bồi thường, Phương thức nhận tiền bồi thường/tạm ứng, Loại yêu cầu giải quyết bồi thường, Cơ quan giải quyết bồi thường.
2. **API nhận hồ sơ**: DVC gửi hồ sơ E-Form người dân/tổ chức đã nộp sang BTNN; hệ thống tạo hồ sơ ở màn **Tiếp nhận hồ sơ** của Cơ quan giải quyết bồi thường. DVC tra được trạng thái xử lý và tiến độ giải quyết (trạng thái hồ sơ, các văn bản đã ban hành).
3. **API gửi kết quả xử lý** (BTNN gọi DVC): BTNN gửi kết quả từng bước giải quyết hồ sơ nộp qua DVC (văn bản, trạng thái vụ việc, link tệp kết quả kèm mã băm) sang DVC (mục 8).

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

BTNN chủ động gửi kết quả xử lý sang DVC theo mục 8 (địa chỉ nhận và phương thức xác thực do DVC cung cấp); DVC vẫn tra được trạng thái và tiến độ qua API tra trạng thái (mục 7.8) để đối soát.

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
| Địa chỉ nhận kết quả xử lý (phía DVC) | DVC cung cấp, kèm phương thức xác thực (mục 8.1) |

> Hai bí mật (client secret và khóa HMAC) chỉ hiển thị một lần khi BTNN cấp. Lộ bí mật thì báo BTNN cấp lại; bí mật cũ hết hiệu lực ngay.

---

## 3. Các bước tích hợp

| Bước | Việc | Bên làm | Kết quả cần đạt |
| :--- | :--- | :--- | :--- |
| 1 | Chuẩn bị: DVC gửi IP máy chủ gọi API và đầu mối kỹ thuật. BTNN khai IP, cấp các mã API (mục 2 và 6), gửi client secret + khóa HMAC. Cơ quan đã có Luồng tiếp nhận hồ sơ "Giải quyết yêu cầu bồi thường" lấy bằng `org-units?claim_intake_only=true` (mục 6.4); cơ quan chưa có luồng thì hồ sơ dừng ở `RECEIVED` (mục 7.8). DVC gửi địa chỉ nhận kết quả và phương thức xác thực (mục 8.1) | Hai bên | DVC nhận đủ thông tin mục 2; BTNN nhận đủ thông tin mục 8.1 |
| 2 | Lấy token Keycloak (mục 4) | DVC | Nhận được `access_token` |
| 3 | Ký gói tin và gọi thử `GET /api/share/v1/partner/ping` (mục 5) | DVC | HTTP 200, có `data.server_time`. Lỗi thì đối chiếu bảng mục 9 |
| 4 | Đồng bộ danh mục lần đầu: gọi đủ các API ở mục 6.1, đi hết các trang, lưu `server_time` | DVC | Có đủ dữ liệu danh mục trên hệ thống DVC |
| 5 | Dựng E-Form theo `EForm_DVC_YeuCauBoiThuong.md`, gắn từng ô với danh mục tương ứng và áp đúng quy tắc lọc (mục 6.6); ô Cơ quan giải quyết dùng `province_code` + `claim_intake_only=true` | DVC | E-Form hiển thị đúng giá trị, lọc đúng |
| 6 | Lập lịch đồng bộ định kỳ bằng `last_sync_time` (mục 6.5), đề xuất mỗi ngày 1 lần hoặc mỗi giờ | DVC | Danh mục DVC luôn khớp BTNN |
| 7 | Gửi hồ sơ thử (mục 7) theo bộ ca kiểm thử mục 10; BTNN đối chiếu hồ sơ trên màn Tiếp nhận | Hai bên | Mọi ca đạt kết quả mong đợi |
| 8 | Xử lý gửi lại / chống trùng và tra trạng thái (mục 7.7, 7.8) | DVC | Gửi lại không tạo hồ sơ trùng; hiển thị được trạng thái và tiến độ (`data.progress`) cho người nộp |
| 9 | Nhận kết quả xử lý (mục 8): dựng API nhận, chống trùng theo `transaction_id`, tải tệp và kiểm mã băm (mục 8.5) | DVC | Nhận đủ 16 bước; gửi lại không tạo kết quả trùng |
| 10 | Nghiệm thu trên môi trường thử nghiệm; khi chuyển chính thức BTNN gửi địa chỉ và bí mật mới | Hai bên | Biên bản nghiệm thu |

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
| `X-Idempotency-Key` | Tùy chọn, dùng khi gửi hồ sơ (mục 7.7). Khuôn `A-Z a-z 0-9 . _ : -`, 1-100 ký tự; sai khuôn trả 400 `VALIDATION_ERROR` |
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

`GET /api/share/v1/partner/ping` - trả HTTP 200 khi token, chữ ký, IP và mã đối tác đều đúng. Đây là bước 3 của mục 3. Không cần được cấp mã API riêng. Phản hồi theo khuôn chuẩn của cổng (mục 6.3), `data.server_time` là giờ máy chủ BTNN (+07:00), dùng để đối chiếu giờ máy DVC (`X-Timestamp` lệch quá 5 phút bị 401 `TIMESTAMP_INVALID`):

```json
{ "code": "SUCCESS", "message": null, "data": { "server_time": "2026-10-29T10:00:00+07:00" } }
```

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
| Loại thiệt hại yêu cầu bồi thường [DM_27] | `GET /api/share/v1/catalogs/DM_27` | `SHARE_CATALOG_DM_27` | 02 cấp: nhóm (`depth` = 0), mục chi tiết (`depth` = 1, `parent_code` = mã nhóm); nhóm `TH_KHAC` không có mục |
| Phương thức nhận tiền bồi thường/tạm ứng [DM_28] | `GET /api/share/v1/catalogs/DM_28` | `SHARE_CATALOG_DM_28` | `TIEN_MAT`, `CHUYEN_KHOAN` |
| Loại yêu cầu giải quyết bồi thường | `GET /api/share/v1/catalogs/RESOLUTION_SCOPE` | `SHARE_CATALOG_RESOLUTION_SCOPE` | `CA_HAI`, `CHI_BOI_THUONG`, `CHI_PHUC_HOI` |
| Danh mục địa bàn | `GET /api/share/v1/areas` | `SHARE_AREA` | Tỉnh/Thành phố và Phường/Xã (mục 6.4) |
| Cơ quan giải quyết bồi thường | `GET /api/share/v1/org-units` | `SHARE_ORG_UNIT` | Lọc theo Tỉnh/Thành phố và chỉ lấy cơ quan đã có Luồng tiếp nhận (mục 6.4) |

### 6.2. Tham số chung (đều không bắt buộc)

| Tham số | Ý nghĩa |
| :--- | :--- |
| `last_sync_time` | Mốc đồng bộ lần trước, ISO-8601 **có múi giờ**, vd `2026-10-26T09:00:00+07:00` (trong URL viết `%2B07:00`). Có mốc: chỉ trả bản ghi tạo/sửa từ mốc đó, **kèm bản ghi đã xóa (`is_deleted=true`) và ngừng hoạt động (`is_active=false`)**. Không có mốc: trả toàn bộ bản ghi còn hiệu lực |
| `include_inactive` | `true` = lấy cả bản ghi ngừng hoạt động. Mặc định `false`. Chỉ có nghĩa khi không có `last_sync_time` |
| `page` | Trang, bắt đầu từ 0 |
| `size` | Số bản ghi một trang, mặc định 500, tối đa 1000. Ngoài khoảng 1-1000 trả 400 `VALIDATION_ERROR`, không tự cắt |
| `keyword` | Tìm theo mã hoặc tên, không phân biệt hoa thường |
| `parent_code` / `parent_id` | Chỉ lấy con **trực tiếp** của bản ghi cha |
| `include_descendants` | `true` = lấy **cả nhánh con cháu** của cha, tối đa 20 tầng (phải đi cùng `parent_code`/`parent_id`, không thì 400) |
| `root_only` | `true` = chỉ lấy cấp gốc (không có cha); không đi cùng `parent_code`/`parent_id` (không thì 400) |

Tham số sai kiểu hoặc sai giá trị (`page` âm, `size` ngoài khoảng, `true`/`false` sai, `last_sync_time` không đúng ISO-8601, `level` khác `PROVINCE`/`WARD`) trả 400 `VALIDATION_ERROR` kèm tên tham số.

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

Trường trả về: `id, code, name, level, province_code, unit_type, parent_id, parent_code, depth, has_children, established_date, dissolved_date, arrangement_status, legal_basis, is_active, is_deleted, created_at, updated_at` (Phường/Xã có `parent_code` = mã tỉnh). Bỏ `level` và có `province_code` thì kết quả gồm cả chính Tỉnh/Thành phố đó.

```
GET /api/share/v1/areas?level=PROVINCE
GET /api/share/v1/areas?level=WARD&province_code=01
```

**Cơ quan giải quyết bồi thường** - `GET /api/share/v1/org-units`: danh sách đơn vị trong Cơ cấu tổ chức. `code` của đơn vị là giá trị gửi ở trường `agency.agency_code` khi nộp hồ sơ. Để dựng ô Cơ quan giải quyết, DVC gọi với `province_code` + `claim_intake_only=true`:

```
GET /api/share/v1/org-units?province_code=01&claim_intake_only=true
```

| Tham số riêng | Ý nghĩa |
| :--- | :--- |
| `province_code` | Mã Tỉnh/Thành phố: chỉ lấy đơn vị thuộc tỉnh đó. Tỉnh của đơn vị là tỉnh **suy ra theo cây đơn vị**: tỉnh khai ở chính đơn vị, không có thì của đơn vị cha gần nhất (tối đa 20 tầng); cơ quan trung ương không khai tỉnh được tính là Hà Nội (`01`). Đây cũng là quy tắc kiểm `agency.province_code` / `agency.agency_code` khi nộp hồ sơ: đơn vị có trong danh sách của tỉnh X thì được nhận với `agency.province_code` = X, và ngược lại |
| `claim_intake_only` | `true` = chỉ đơn vị đã có Luồng tiếp nhận hồ sơ "Giải quyết yêu cầu bồi thường" (nhận được hồ sơ nộp qua DVC). Mặc định `false`; giá trị khác `true`/`false` trả 400 `VALIDATION_ERROR`. Khuyến nghị DVC luôn dùng `true` để hồ sơ nộp vào được chuyển ngay sang màn Tiếp nhận |
| `unit_level` | `CENTRAL`, `PROVINCE`, `WARD`, `DEPARTMENT`, `DISTRICT` |
| `unit_type` | `INTERNAL`, `EXTERNAL` |
| `org_type` | Loại cơ quan (mã danh mục DM_57) |

Không có `last_sync_time` và không `include_inactive`: chỉ trả đơn vị đang hoạt động và còn hiệu lực (`effective_to` trống hoặc chưa qua). Trường trả về: `id, code, name, short_name, parent_id, parent_code, depth, has_children, unit_type, unit_level, org_type, province_code, ward_code, address, phone, email, tax_code, sort_order, effective_from, effective_to, is_active, is_deleted, created_at, updated_at`; trong đó `province_code` là tỉnh suy ra như trên.

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
| Cơ quan giải quyết bồi thường | `org-units?province_code=<Tỉnh/Thành phố cơ quan giải quyết>&claim_intake_only=true` (chỉ cơ quan đã có Luồng tiếp nhận; tỉnh suy ra theo cây, mục 6.4) |
| Hình thức tiếp nhận | Cố định `DICH_VU_CONG` |
| Bảng thiệt hại yêu cầu bồi thường | Dựng bảng 02 cấp từ `DM_27` theo `parent_code`, thứ tự `sort_order`; nhóm `TH_KHAC` ở cuối, người nộp tự thêm dòng |
| Phương thức nhận tiền | Giá trị `DM_28` |

---

## 7. API gửi hồ sơ Yêu cầu bồi thường

| API | Phương thức + đường dẫn | Mã API |
| :--- | :--- | :--- |
| Gửi hồ sơ | `POST /api/share/v1/compensation/claim-requests` | `DVC_CLAIM_REQUEST` |
| Tra trạng thái | `GET /api/share/v1/compensation/claim-requests?dvc_dossier_code=<mã hồ sơ DVC>` | `DVC_CLAIM_STATUS` |

### 7.1. Luồng xử lý

1. DVC gửi hồ sơ. Cổng kiểm hợp lệ toàn bộ; hợp lệ thì trả **số tiếp nhận** và trạng thái `RECEIVED`.
2. Trong khoảng 1 phút, hệ thống tự chuyển hồ sơ vào màn **Tiếp nhận hồ sơ** của Cơ quan giải quyết: Nguồn hồ sơ "Dịch vụ công", Hình thức tiếp nhận "Dịch vụ công", trạng thái "Chờ phân công". Hồ sơ có mã `BT-yyyy-nnn`.
3. DVC tra trạng thái để biết hồ sơ đã vào hệ thống (`ACCEPTED`, kèm mã hồ sơ) hoặc bị từ chối (`REJECTED`, kèm lý do). Sau khi vào hệ thống, cùng API này trả thêm tiến độ giải quyết (`progress`: trạng thái hồ sơ và các văn bản đã ban hành).

### 7.2. Thân request

JSON UTF-8, tên trường viết thường có gạch dưới (snake_case), giá trị danh mục là **mã** lấy từ API mục 6. Trường không có trong bảng dưới bị bỏ qua; chuỗi rỗng coi như không có.

Ngoài các trường E-Form, bắt buộc có:

| Trường | Ý nghĩa |
| :--- | :--- |
| `dvc_dossier_code` | Mã hồ sơ bên DVC (duy nhất), ký tự `A-Za-z0-9 . _ : / -`, tối đa 100 |
| `submitted_at` | Thời điểm người dân nộp, ISO-8601 có múi giờ, vd `2026-10-27T09:30:00+07:00` |

Giá trị mặc định khi không gửi: `requester.requester_type` = `CA_NHAN`, `requester.requester_role` = `NGUOI_BI_THIET_HAI`, `overview.resolution_scope` = `CA_HAI`, `*.country_code` = `VN`.

Các trường sau E-Form có giá trị mặc định nhưng API **không** tự điền: `requester.victim_status` (E-Form: Còn sống), `victim.victim_type` (Cá nhân), `payee.payment_method` (Nhận tiền mặt). Hồ sơ thuộc nhánh cần các trường này mà không gửi thì bị `REQUIRED`. `honor_restoration.forms[]` không có mặc định (E-Form chọn sẵn `XIN_LOI_TRUC_TIEP`): API chỉ lưu các hình thức đã gửi. `advance.spiritual_amount`, `advance.other_amount` và `honor_restoration.forms[]` chỉ được nhận khi `requested` = `true`, ngược lại bị bỏ qua.

<a id="api-anh-xa-eform"></a>
### 7.3. Ánh xạ trường E-Form sang JSON

- STT theo bảng III của `EForm_DVC_YeuCauBoiThuong.md`.
- Độ dài tối đa (ký tự) theo kiểu dữ liệu tại E-Form, trừ các trường sau theo giới hạn thực tế của hệ thống: `payee.address` 500 (E-Form 1000); `submitted_at` 40; `agency.province_code`, `agency.agency_code`, `overview.resolution_scope`, `overview.damage_field`, `requester.requester_role`, `notification.method`, `payee.payment_method`, `damages[].item_code` 50; `requester.victim_status`, `*.requester_type`, `victim.victim_type` 20; `*.country_code` 10; `dossier_components.*.file_name` 255.
- Trường E-Form chỉ đọc, tự tính (STT 56, 63, 67) không gửi; Hệ thống BTNN tự tính.
- Số tiền là số JSON nguyên (không gửi dạng chuỗi); `damages` tối đa 100 dòng.

| STT | Trường E-Form | Trường JSON | Bắt buộc |
| :--- | :--- | :--- | :--- |
| 1 | Loại yêu cầu giải quyết bồi thường [RESOLUTION_SCOPE] | `overview.resolution_scope` | Không (mặc định `CA_HAI`) |
| - | Hình thức tiếp nhận [DM_25] | `overview.receipt_form` | Không; có thì phải là `DICH_VU_CONG` |
| 2 | Lĩnh vực phát sinh thiệt hại [DM_22] | `overview.damage_field` | Có |
| 3 | Ngày văn bản yêu cầu bồi thường (`yyyy-MM-dd`) | `overview.request_doc_date` | Có |
| 4 | Tỉnh/Thành phố (cơ quan giải quyết bồi thường) | `agency.province_code` | Có |
| 5 | Cơ quan giải quyết bồi thường | `agency.agency_code` | Có |
| 6 | Loại người yêu cầu (mục 7.3.1) | `requester.requester_type` | Không (mặc định `CA_NHAN`) |
| 7 | Tư cách người yêu cầu bồi thường [DM_26] | `requester.requester_role` | Không (mặc định `NGUOI_BI_THIET_HAI`) |
| 8 | Họ và tên - Cá nhân | `requester.full_name` | Có khi `CA_NHAN` |
| 8 | Tên tổ chức - Tổ chức | `requester.org_name` | Có khi `TO_CHUC` |
| 9 | Ngày sinh | `requester.birth_date` | Có khi `CA_NHAN` |
| 10 | Trạng thái người bị thiệt hại (mục 7.3.1) | `requester.victim_status` | Có khi người bị thiệt hại là cá nhân (xem STT 10 E-Form) |
| 11 | Số điện thoại | `requester.phone` | Có |
| 12 | Email | `requester.email` | Không |
| 13 | Loại giấy tờ thân nhân [DM_10] | `requester.id_doc_type` | Có khi `CA_NHAN` |
| 14 | Số giấy tờ thân nhân | `requester.id_doc_no` | Có khi `CA_NHAN` |
| 15 | Ngày cấp | `requester.id_doc_issue_date` | Không |
| 16 | Nơi cấp | `requester.id_doc_issue_place` | Không |
| 17 | Mã số tổ chức | `requester.org_code` | Có khi `TO_CHUC` |
| 18 | Số giấy tờ thành lập/đăng ký | `requester.org_reg_no` | Không |
| 19 | Ngày cấp | `requester.org_reg_issue_date` | Không |
| 20 | Nơi cấp | `requester.org_reg_issue_place` | Không |
| 21 | Họ và tên người đại diện theo pháp luật | `requester.legal_rep_name` | Có khi `TO_CHUC` |
| 22 | Chức vụ người đại diện | `requester.legal_rep_position` | Có khi `TO_CHUC` |
| 23 | Quốc gia [DM_09] | `requester.country_code` | Không (mặc định `VN`) |
| 24 | Tỉnh/Thành phố | `requester.province` | Có |
| 25 | Phường/Xã | `requester.ward` | Có |
| 26 | Địa chỉ chi tiết | `requester.address_detail` | Có |
| 27 | Loại người bị thiệt hại (mục 7.3.1) | `victim.victim_type` | Có khi thuộc nhánh nhận khối `victim` |
| 28 | Họ và tên - Cá nhân | `victim.full_name` | Có khi `victim_type` = `CA_NHAN` |
| 28 | Tên tổ chức - Tổ chức | `victim.org_name` | Có khi `victim_type` = `TO_CHUC` |
| 29 | Ngày sinh | `victim.birth_date` | Có khi `victim_type` = `CA_NHAN` |
| 30 | Số điện thoại | `victim.phone` | Có khi thuộc nhánh nhận khối `victim` |
| 31 | Email | `victim.email` | Không |
| 32 | Loại giấy tờ thân nhân [DM_10] | `victim.id_doc_type` | Có khi `victim_type` = `CA_NHAN` |
| 33 | Số giấy tờ thân nhân | `victim.id_doc_no` | Có khi `victim_type` = `CA_NHAN` |
| 34 | Ngày cấp | `victim.id_doc_issue_date` | Không |
| 35 | Nơi cấp | `victim.id_doc_issue_place` | Không |
| 36 | Mã số tổ chức | `victim.org_code` | Có khi `victim_type` = `TO_CHUC` |
| 37 | Số giấy tờ thành lập/đăng ký | `victim.org_reg_no` | Không |
| 38 | Ngày cấp | `victim.org_reg_issue_date` | Không |
| 39 | Nơi cấp | `victim.org_reg_issue_place` | Không |
| 40 | Họ và tên người đại diện theo pháp luật | `victim.legal_rep_name` | Có khi `victim_type` = `TO_CHUC` |
| 41 | Chức vụ người đại diện | `victim.legal_rep_position` | Có khi `victim_type` = `TO_CHUC` |
| 42 | Quốc gia [DM_09] | `victim.country_code` | Không (mặc định `VN`) |
| 43 | Tỉnh/Thành phố | `victim.province` | Có khi thuộc nhánh nhận khối `victim` |
| 44 | Phường/Xã | `victim.ward` | Có khi thuộc nhánh nhận khối `victim` |
| 45 | Địa chỉ chi tiết | `victim.address_detail` | Có khi thuộc nhánh nhận khối `victim` |
| 46 | Tên tổ chức bị thiệt hại | `dissolved_org.org_name` | Có khi thuộc nhánh nhận khối `dissolved_org` |
| 47 | Mã số tổ chức | `dissolved_org.org_code` | Không |
| 48 | Quốc gia [DM_09] | `dissolved_org.country_code` | Không (mặc định `VN`) |
| 49 | Tỉnh/Thành phố | `dissolved_org.province` | Có khi thuộc nhánh nhận khối `dissolved_org` |
| 50 | Phường/Xã | `dissolved_org.ward` | Có khi thuộc nhánh nhận khối `dissolved_org` |
| 51 | Địa chỉ chi tiết | `dissolved_org.address_detail` | Có khi thuộc nhánh nhận khối `dissolved_org` |
| 52 | Hành vi gây thiệt hại của người thi hành công vụ | `overview.damage_act` | Có |
| 53 | Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại | `overview.causal_relation` | Có |
| 54 | Phương thức nhận thông báo (mục 7.3.1) | `notification.method` | Có |
| 55 | Địa chỉ, đầu mối nhận thông báo | `notification.address` | Có |
| 57 | Mục thiệt hại được tích [DM_27] | `damages[].item_code` (mã mục chi tiết, vd `TH_TS_01`) | Có khi có khối `damages` |
| 58 | Cách tính / Diễn giải công thức áp dụng (mục chi tiết) | `damages[].calculation` | Có |
| 59 | Số tiền yêu cầu bồi thường (đồng) (mục chi tiết), số nguyên | `damages[].amount` | Có |
| 60 | Tên / nội dung thiệt hại (dòng thiệt hại khác, nhóm VII) | `damages[].item_code` = `TH_KHAC`, `damages[].other_name` | Có khi `item_code` = `TH_KHAC` |
| 61 | Cách tính / diễn giải (thiệt hại khác) | `damages[].calculation` | Có |
| 62 | Số tiền (thiệt hại khác) (đồng), số nguyên | `damages[].amount` | Có |
| 64 | Có đề nghị tạm ứng kinh phí bồi thường (Điều 44) | `advance.requested` (`true`/`false`) | Không (mặc định `false`) |
| 65 | Tạm ứng Thiệt hại tinh thần (đồng) | `advance.spiritual_amount` | Không |
| 66 | Tạm ứng Thiệt hại khác tính được ngay (đồng) | `advance.other_amount` | Không |
| 68 | Họ và tên người nhận | `payee.full_name` | Có khi thuộc nhánh nhận khối `payee` |
| 69 | Giấy tờ thân nhân | `payee.id_doc_no` | Có khi thuộc nhánh nhận khối `payee` |
| 70 | Địa chỉ chi tiết | `payee.address` | Có khi thuộc nhánh nhận khối `payee` |
| 71 | Phương thức nhận tiền [DM_28] | `payee.payment_method` | Có khi thuộc nhánh nhận khối `payee` |
| 72 | Chủ tài khoản | `payee.account_holder` | Có khi `payment_method` = `CHUYEN_KHOAN` |
| 73 | Số tài khoản | `payee.account_no` | Có khi `payment_method` = `CHUYEN_KHOAN` |
| 74 | Tên ngân hàng | `payee.bank_name` | Có khi `payment_method` = `CHUYEN_KHOAN` |
| 75 | Chi nhánh | `payee.bank_branch` | Không |
| 76 | Đề nghị cơ quan giải quyết chủ động tiến hành phục hồi danh dự (Điều 57) | `honor_restoration.requested` (`true`/`false`) | Không |
| 77 | Hình thức đề nghị phục hồi danh dự mong muốn (Điều 56) (mục 7.3.1) | `honor_restoration.forms[]` | Không |
| 78 | Yêu cầu khôi phục quyền và lợi ích hợp pháp khác (nếu có) | `other_rights.requested` (`true`/`false`) | Không |
| 79 | Nội dung yêu cầu khôi phục quyền và lợi ích hợp pháp khác | `other_rights.content` | Có khi `other_rights.requested` = `true` |
| 80 | Văn bản yêu cầu bồi thường | `dossier_components.VB_YEU_CAU_BT` | Có |
| 81 | Văn bản làm căn cứ yêu cầu bồi thường | `dossier_components.VB_CAN_CU_YCBT` | Không |
| 82 | Văn bản ủy quyền thực hiện yêu cầu bồi thường | `dossier_components.VB_UY_QUYEN_YCBT` | Có khi `requester_role` khác `NGUOI_BI_THIET_HAI` |
| 83 | Các tài liệu kèm theo khác | `dossier_components.TAI_LIEU_KHAC` | Không |

**Khối nhận theo điều kiện.** Khối không thuộc nhánh bị bỏ, không lưu:

| Khối JSON | Chỉ nhận khi | Khối E-Form |
| :--- | :--- | :--- |
| `victim` | `requester_role` khác `NGUOI_BI_THIET_HAI` và khác `TO_CHUC_KE_THUA` | C - Thông tin người bị thiệt hại |
| `dissolved_org` | `requester_role` = `TO_CHUC_KE_THUA` | D - Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại |
| `damages`, `advance`, `payee` | `resolution_scope` = `CA_HAI` hoặc `CHI_BOI_THUONG` | G - Thông tin bồi thường thiệt hại bằng tiền |
| `payee` | Thêm điều kiện: `advance.requested` = `true` hoặc `damages` có ít nhất 01 dòng | G.3 - Thông tin người nhận & phương thức chi trả |
| `honor_restoration` | `resolution_scope` = `CA_HAI` hoặc `CHI_PHUC_HOI` | H.1 - Yêu cầu cơ quan phục hồi danh dự |
| `dossier_components.VB_UY_QUYEN_YCBT` | `requester_role` khác `NGUOI_BI_THIET_HAI` | I - Thành phần hồ sơ |

- Khối thuộc nhánh nhận (`victim`, `dissolved_org`, `damages`, `payee`) là khối **bắt buộc**: thiếu khối thì lỗi `REQUIRED` tại chính tên khối. Các dòng "Có khi thuộc nhánh nhận khối ..." ở bảng trên chỉ áp dụng khi khối thuộc nhánh nhận.
- `requester.victim_status`: chỉ nhận khi người bị thiệt hại là cá nhân (`requester_type` = `CA_NHAN` và `requester_role` = `NGUOI_BI_THIET_HAI`, hoặc `victim.victim_type` = `CA_NHAN`); `requester_role` = `NGUOI_THUA_KE` hoặc `NGUOI_DAI_DIEN_THUA_KE`: luôn lưu `DA_MAT`.
- `damages`: khi khối được nhận, tối thiểu 01 dòng; mỗi `item_code` mục chi tiết xuất hiện tối đa 01 lần; `TH_KHAC` được lặp nhiều dòng, mỗi dòng 01 thiệt hại khác (`other_name`, `calculation`, `amount`).
- `resolution_scope` = `CHI_PHUC_HOI`: `honor_restoration.requested` luôn lưu `true`.
- `honor_restoration.forms[]`: nhận khi khối `honor_restoration` được nhận, không phụ thuộc `honor_restoration.requested`.

#### 7.3.1. Mã giá trị không có danh mục

| Trường JSON | Mã | Giá trị trên E-Form |
| :--- | :--- | :--- |
| `requester.requester_type`, `victim.victim_type` | `CA_NHAN` | Cá nhân |
|  | `TO_CHUC` | Tổ chức |
| `requester.victim_status` | `CON_SONG` | Còn sống |
|  | `DA_MAT` | Đã mất |
| `notification.method` | `TRUC_TIEP` | Trực tiếp |
|  | `BUU_CHINH` | Qua dịch vụ bưu chính |
|  | `THU_DIEN_TU` | Qua thư điện tử |
|  | `DVC_VNEID` | Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID) |
|  | `DIEN_TU_KHAC` | Qua phương tiện điện tử khác |
| `honor_restoration.forms[]` | `XIN_LOI_TRUC_TIEP` | Trực tiếp xin lỗi và cải chính công khai tại nơi cư trú / trụ sở (Điều 58) |
|  | `DANG_BAO` | Đăng báo xin lỗi và cải chính công khai (Điều 59) |

### 7.4. Gửi tệp (thành phần hồ sơ)

- `dossier_components` là đối tượng, khóa là mã thành phần, giá trị là **01 tệp**: `"VB_YEU_CAU_BT": { "file_name": "don-yeu-cau.pdf", "content_base64": "<base64 chuẩn>" }`.
- Mã thành phần: `VB_YEU_CAU_BT`, `VB_CAN_CU_YCBT`, `VB_UY_QUYEN_YCBT`, `TAI_LIEU_KHAC`; mã khác bị từ chối.
- Mỗi thành phần đúng 01 tệp; gửi mảng hoặc nhiều tệp cho 01 thành phần bị từ chối.
- Định dạng nhận: pdf, doc, docx, jpg, jpeg, png; kiểm theo **nội dung tệp**. Riêng docx và doc còn phải có đúng đuôi `.docx` / `.doc` (pdf, jpg, png không đòi đuôi).
- `file_name` bắt buộc, tối đa 255 ký tự; nếu chứa đường dẫn thì chỉ giữ phần tên tệp cuối.
- Tối đa 20MB mỗi tệp; cả gói tin tối đa 64MB (một tệp 20MB khoảng 27MB khi mã base64).
- Tên tài liệu lưu tại Hệ thống BTNN:
  - `VB_YEU_CAU_BT`: `Văn bản yêu cầu bồi thường`.
  - `VB_CAN_CU_YCBT`: `file_name` bỏ phần mở rộng (Tên văn bản căn cứ).
  - `VB_UY_QUYEN_YCBT`: `Văn bản ủy quyền thực hiện yêu cầu bồi thường`.
  - `TAI_LIEU_KHAC`: `Các tài liệu kèm theo khác`.
- Chữ ký (mục 5.2) băm **toàn bộ** thân JSON, kể cả chuỗi base64.

### 7.5. Ví dụ request

Cá nhân là người thừa kế của người bị thiệt hại (có khối người bị thiệt hại), yêu cầu cả bồi thường tiền và phục hồi danh dự:

```json
{
  "dvc_dossier_code": "H48.12.2026.000123",
  "submitted_at": "2026-10-27T09:30:00+07:00",
  "agency": { "province_code": "01", "agency_code": "H01.02" },
  "overview": {
    "receipt_form": "DICH_VU_CONG",
    "resolution_scope": "CA_HAI",
    "damage_field": "TO_TUNG_HINH_SU",
    "request_doc_date": "2026-10-20",
    "damage_act": "Tóm tắt hành vi gây thiệt hại của người thi hành công vụ",
    "causal_relation": "Giải trình mối quan hệ nhân quả"
  },
  "requester": {
    "requester_type": "CA_NHAN",
    "requester_role": "NGUOI_THUA_KE",
    "full_name": "Nguyễn Văn A",
    "birth_date": "1985-03-12",
    "victim_status": "DA_MAT",
    "phone": "0912345678",
    "email": "a@example.com",
    "id_doc_type": "CCCD",
    "id_doc_no": "001090000001",
    "country_code": "VN",
    "province": "01",
    "ward": "00008",
    "address_detail": "Số 1 phố Huế"
  },
  "victim": {
    "victim_type": "CA_NHAN",
    "full_name": "Nguyễn Văn B",
    "birth_date": "1960-05-20",
    "phone": "0987654321",
    "id_doc_type": "CCCD",
    "id_doc_no": "001060000002",
    "country_code": "VN",
    "province": "01",
    "ward": "00004",
    "address_detail": "Số 2 phố Huế"
  },
  "notification": { "method": "DVC_VNEID", "address": "001090000001" },
  "damages": [
    { "item_code": "TH_TT_04", "calculation": "Số ngày tạm giam x mức lương cơ sở", "amount": 120000000 },
    { "item_code": "TH_KHAC", "other_name": "Chi phí photo hồ sơ", "calculation": "Theo hóa đơn", "amount": 500000 },
    { "item_code": "TH_KHAC", "other_name": "Chi phí thuê xe", "calculation": "02 chuyến x 1.500.000", "amount": 3000000 }
  ],
  "advance": { "requested": true, "spiritual_amount": 50000000 },
  "payee": {
    "full_name": "Nguyễn Văn A",
    "id_doc_no": "001090000001",
    "address": "Số 1 phố Huế",
    "payment_method": "CHUYEN_KHOAN",
    "account_holder": "NGUYEN VAN A",
    "account_no": "0123456789",
    "bank_name": "Ngân hàng X"
  },
  "honor_restoration": { "requested": true, "forms": ["XIN_LOI_TRUC_TIEP"] },
  "dossier_components": {
    "VB_YEU_CAU_BT": { "file_name": "don-yeu-cau.pdf", "content_base64": "JVBERi0xLjQK..." },
    "VB_CAN_CU_YCBT": { "file_name": "Ban an so 12-2025.pdf", "content_base64": "JVBERi0xLjQK..." },
    "VB_UY_QUYEN_YCBT": { "file_name": "uy-quyen.pdf", "content_base64": "JVBERi0xLjQK..." }
  }
}
```

Giá trị `H01.02` (Sở Tư pháp Thành phố Hà Nội), `01`, `00008`, `00004` là mã có thật trên môi trường thử nghiệm; mã `TH_TT_04` theo danh mục DM_27 02 cấp (mục 6.1). Luôn dùng mã lấy từ API mục 6. Người yêu cầu là tổ chức: `requester_type` = `TO_CHUC`, dùng `org_name`, `org_code`, `legal_rep_name`, `legal_rep_position` thay cho `full_name`, `birth_date`, `id_doc_type`, `id_doc_no`.

### 7.6. Quy tắc kiểm hợp lệ

Mọi lỗi được gom và trả **một lượt**. Giá trị danh mục phải đang hoạt động.

| Trường | Quy tắc | Mã lỗi |
| :--- | :--- | :--- |
| Trường bắt buộc (theo khối và nhánh, mục 7.3) | Thiếu hoặc rỗng | `REQUIRED` |
| Mọi chuỗi | Quá độ dài tối đa | `MAX_LENGTH` |
| Kiểu dữ liệu, ngày tháng | Sai kiểu, ngày không đúng ISO `yyyy-MM-dd` | `INVALID_FORMAT` |
| `overview.request_doc_date`, `*.birth_date`, `*.id_doc_issue_date`, `*.org_reg_issue_date` | Không lớn hơn ngày hiện tại | `FUTURE_DATE` |
| `requester.phone`, `victim.phone` | Quốc gia `VN`: đúng 10 chữ số, bắt đầu bằng 03, 05, 07, 08 hoặc 09. Quốc gia khác: 8-15 chữ số, cho phép `+` ở đầu | `INVALID_PHONE` |
| `requester.email`, `victim.email` | Có thì đúng định dạng email | `INVALID_EMAIL` |
| `*.id_doc_no` | `id_doc_type` = `CCCD`: đúng 12 chữ số | `INVALID_ID_NO` |
| `requester.requester_role` | Có trong DM_26; Cá nhân chỉ nhận tư cách có `for_individual`, Tổ chức chỉ nhận tư cách có `for_organization` | `NOT_IN_CATALOG` / `NOT_ALLOWED` |
| `victim.victim_type` | `requester_role` = `NGUOI_THUA_KE` hoặc `NGUOI_DAI_DIEN_THUA_KE`: chỉ nhận `CA_NHAN` | `NOT_ALLOWED` |
| `*.id_doc_type` | Có trong DM_10 và `use_on_eform` = `true` (không nhận `MA_SO_THUE`) | `NOT_IN_CATALOG` / `NOT_ALLOWED` |
| `*.country_code` | Có trong DM_09 | `NOT_IN_CATALOG` |
| `*.province`, `*.ward` | Quốc gia `VN`: mã địa bàn và Phường/Xã thuộc Tỉnh/Thành phố đã chọn. Quốc gia khác: văn bản tự do (tối đa 100) | `NOT_IN_CATALOG` / `WARD_NOT_IN_PROVINCE` |
| `overview.damage_field`, `overview.resolution_scope` | Có trong DM_22 / RESOLUTION_SCOPE | `NOT_IN_CATALOG` |
| `notification.method`, `requester.victim_status`, `*.requester_type`, `victim.victim_type`, `honor_restoration.forms[]` | Có trong mục 7.3.1 | `NOT_IN_CATALOG` |
| `overview.receipt_form` | Có thì phải là `DICH_VU_CONG` | `NOT_ALLOWED` |
| `agency.province_code` | Mã Tỉnh/Thành phố trong danh mục địa bàn | `NOT_IN_CATALOG` |
| `agency.agency_code` | Đơn vị còn hiệu lực (đang hoạt động, chưa quá ngày hết hiệu lực `effective_to`), thuộc Tỉnh/Thành phố cơ quan giải quyết (tỉnh suy ra theo cây đơn vị như mục 6.4) | `NOT_IN_CATALOG` / `AGENCY_NOT_IN_PROVINCE` |
| `damages[].item_code` | Mã mục chi tiết DM_27 (`depth` = 1) hoặc `TH_KHAC`; mục chi tiết không lặp | `NOT_IN_CATALOG` / `DUPLICATE_ITEM` |
| `damages` | Khối được nhận mà không có dòng | `REQUIRED` |
| `damages` | Tối đa 100 dòng | `TOO_MANY_ROWS` |
| `damages[].amount`, `advance.spiritual_amount`, `advance.other_amount` | Số nguyên lớn hơn 0 | `INVALID_AMOUNT` |
| `advance.spiritual_amount` | Nhỏ hơn tổng `amount` các dòng thuộc nhóm `TH_TT`; không có dòng nhóm `TH_TT` thì không nhận | `ADVANCE_EXCEEDED` |
| `advance.other_amount` | Nhỏ hơn tổng `amount` các dòng không thuộc nhóm `TH_TT` | `ADVANCE_EXCEEDED` |
| `payee.payment_method` | Có trong DM_28 | `NOT_IN_CATALOG` |
| `dossier_components` | Khóa là mã thành phần mục 7.4; mỗi thành phần 01 tệp | `NOT_ALLOWED` / `TOO_MANY_FILES` |
| `dossier_components.*.content_base64` | Base64 hợp lệ, không rỗng | `INVALID_BASE64` |
| Tệp | Tối đa 20MB | `FILE_TOO_LARGE` |
| Tệp | Đúng định dạng cho phép | `INVALID_FILE_TYPE` |

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
    "duplicate": false,
    "progress": null
  }
}
```

**Sai dữ liệu (HTTP 400, `VALIDATION_ERROR`)** - chi tiết từng trường ở `data.errors`. Riêng thân rỗng, không phải JSON hoặc không phải đối tượng JSON, và `X-Idempotency-Key` sai khuôn: trả 400 `VALIDATION_ERROR` với `data` = `null`, không có `errors`:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Hồ sơ gửi lên có 2 trường không hợp lệ; chi tiết từng trường ở data.errors.",
  "data": {
    "errors": [
      { "field": "requester.phone", "code": "INVALID_PHONE",
        "message": "Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng 03, 05, 07, 08 hoặc 09." },
      { "field": "dossier_components.TAI_LIEU_KHAC.content_base64", "code": "INVALID_FILE_TYPE",
        "message": "Định dạng tệp không được chấp nhận; chỉ nhận pdf, doc, docx, jpg, jpeg, png." }
    ]
  }
}
```

**Chống trùng.** Gửi lại cùng `dvc_dossier_code` (hoặc cùng `X-Idempotency-Key`) trả **kết quả cũ** (HTTP 200, `duplicate` = `true`), không tạo hồ sơ thứ hai và không kiểm lại nội dung. Vì vậy khi mất kết nối, DVC cứ gửi lại cùng mã. Không gửi `X-Idempotency-Key` thì hệ thống dùng SHA-256 của thân làm khóa, nên gửi lại đúng nguyên byte cũ cũng trùng. Hồ sơ trả 400 (sai dữ liệu) **không** được ghi nhận nên không chiếm mã: sửa rồi gửi lại cùng `dvc_dossier_code` được. Hồ sơ đã bị từ chối (`REJECTED`) vẫn giữ mã: nộp lại phải dùng mã hồ sơ DVC mới.

### 7.8. Tra trạng thái

`GET /api/share/v1/compensation/claim-requests?dvc_dossier_code=H48.12.2026.000123` (ký với `PATH` gồm cả query; thân rỗng).

| `status` | Ý nghĩa | Thông tin kèm |
| :--- | :--- | :--- |
| `RECEIVED` | Đã nhận, đang chờ chuyển vào màn Tiếp nhận | `note` có lý do nếu hệ thống chưa chuyển được |
| `ACCEPTED` | Đã vào màn Tiếp nhận hồ sơ, chờ cơ quan phân công xử lý | `dossier_code` = mã hồ sơ `BT-yyyy-nnn`; `note` = "Đã chuyển vào màn Tiếp nhận của <cơ quan>, mã vụ việc VVBT-yyyy-nnn." |
| `REJECTED` | Bị từ chối | `note` là lý do |

`status_name` theo `status`: `RECEIVED` = "Đã tiếp nhận, chờ chuyển vào màn Tiếp nhận"; `ACCEPTED` = "Đã chuyển vào màn Tiếp nhận của Hệ thống quản lý bồi thường nhà nước"; `REJECTED` = "Bị từ chối".

**Tiến độ xử lý (`data.progress`).** Hồ sơ `ACCEPTED` có thêm khối `progress`; hồ sơ `RECEIVED`, `REJECTED` và phản hồi của lượt gửi hồ sơ (mục 7.7) có `progress` = `null`. Các trường khác không đổi.

| Trường | Kiểu | Ý nghĩa |
| :--- | :--- | :--- |
| `progress.claim_status` | Chuỗi | Mã trạng thái vụ việc hiện tại, cùng bộ mã `case_status` tại mục 8.2 (vd `CHO_PHAN_CONG`, `XAC_MINH_THIET_HAI`, `YEU_CAU_BO_SUNG`, `HOAN_THANH`) |
| `progress.claim_status_name` | Chuỗi | Tên trạng thái vụ việc theo bảng mã mục 8.2 |
| `progress.updated_time` | Thời điểm ISO-8601 (+07:00) | Lần cập nhật hồ sơ gần nhất |
| `progress.documents[]` | Mảng | Văn bản **đã ban hành**, cũ trước; rỗng nếu chưa có. Mỗi loại văn bản chỉ lấy lần ban hành mới nhất |
| `progress.documents[].type` | Chuỗi | `THONG_BAO_THU_LY`, `THONG_BAO_KHONG_THU_LY`, `YEU_CAU_BO_SUNG`, `DUNG_GIAI_QUYET`, `QUYET_DINH_GIAI_QUYET` |
| `progress.documents[].type_name` | Chuỗi | Tên loại: Thông báo thụ lý (Mẫu 04); Thông báo không thụ lý; Văn bản yêu cầu bổ sung hồ sơ; Văn bản dừng giải quyết; Quyết định giải quyết bồi thường |
| `progress.documents[].doc_no` | Chuỗi | Số văn bản |
| `progress.documents[].doc_date` | Ngày `yyyy-MM-dd` | Ngày văn bản |
| `progress.documents[].issued_time` | Thời điểm ISO-8601 (+07:00) | Thời điểm ban hành (cấp duyệt cuối; văn bản yêu cầu bổ sung: lúc phát hành) |

Chỉ trả những gì người yêu cầu được biết: văn bản yêu cầu bổ sung và Quyết định giải quyết chỉ khi đã phát hành; không có ý kiến nội bộ, người duyệt, phiếu chờ duyệt hay dự thảo. `claim_status` là trạng thái nội bộ của hồ sơ nên có thể là trạng thái trung gian (vd `CHO_PHAN_CONG`, `CHO_DUYET`).

Ví dụ phản hồi của hồ sơ đã được thụ lý:

```json
{
  "code": "SUCCESS",
  "message": null,
  "data": {
    "dvc_dossier_code": "H48.12.2026.000123",
    "receipt_no": "API-20261027-000123",
    "status": "ACCEPTED",
    "status_name": "Đã chuyển vào màn Tiếp nhận của Hệ thống quản lý bồi thường nhà nước",
    "dossier_code": "BT-2026-007",
    "note": "Đã chuyển vào màn Tiếp nhận của Tòa án nhân dân tối cao, mã vụ việc VVBT-2026-012.",
    "received_time": "2026-10-27T09:30:05+07:00",
    "processed_time": "2026-10-27T09:31:02+07:00",
    "duplicate": false,
    "progress": {
      "claim_status": "XAC_MINH_THIET_HAI",
      "claim_status_name": "Xác minh thiệt hại",
      "updated_time": "2026-10-29T08:15:30+07:00",
      "documents": [
        {
          "type": "THONG_BAO_THU_LY",
          "type_name": "Thông báo thụ lý (Mẫu 04)",
          "doc_no": "12/TB-TLBT",
          "doc_date": "2026-10-28",
          "issued_time": "2026-10-28T16:40:00+07:00"
        }
      ]
    }
  }
}
```

Mã hồ sơ không có hoặc không phải của DVC: HTTP 404 `NOT_FOUND`. Thiếu tham số: 400 `VALIDATION_ERROR`.

---

<a id="dvc-gui-ket-qua"></a>
## 8. API gửi kết quả xử lý hồ sơ về Dịch vụ công

BTNN **chủ động gửi** kết quả xử lý của hồ sơ nộp qua DVC sang hệ thống DVC tại các bước ở mục 8.2. Chiều gọi ngược với mục 6, 7: **BTNN là bên gọi, DVC là bên nhận**.

Bản tin gửi **link tệp kết quả kèm mã băm**, không chứa nội dung tệp. DVC tải tệp qua link (mục 8.5) và đối chiếu mã băm.

- Chỉ áp dụng cho hồ sơ có `Nguồn hồ sơ` = `Dịch vụ công` (hồ sơ nhận qua API mục 7, có `dvc_dossier_code`). Hồ sơ nguồn khác không gửi, kể cả hồ sơ đã chuyển sang cơ quan khác (tại cơ quan nhận có `Nguồn hồ sơ` = `Chuyển CQGQBT`).
- Gửi bất đồng bộ sau khi thao tác nghiệp vụ trên BTNN đã hoàn tất. Gửi lỗi không hoàn tác thao tác nghiệp vụ.
- API tra trạng thái (mục 7.8) giữ nguyên, DVC dùng để đối soát khi nghi thiếu bản tin.

| API | Phương thức + đường dẫn | Bên cung cấp | Mã API |
| :--- | :--- | :--- | :--- |
| Nhận kết quả xử lý | `POST <địa chỉ nhận kết quả do DVC cung cấp>` | DVC | - |
| Tải tệp kết quả | `GET /api/share/v1/compensation/result-files/{file_id}` | BTNN | `DVC_RESULT_FILE` |

### 8.1. Kết nối và xác thực

| Mục | Giá trị |
| :--- | :--- |
| Địa chỉ nhận kết quả | DVC cung cấp (môi trường thử nghiệm và chính thức), chỉ nhận HTTPS |
| Xác thực | Đề xuất: BTNN ký gói tin theo khuôn mục 5.2 (header `X-Partner-Code` = `BTNN`, `X-Timestamp`, `X-Nonce`, `X-Signature`) bằng khóa HMAC do DVC cấp; DVC có thể thay bằng phương thức khác và báo BTNN trước khi kết nối |
| Chống trùng | Header `X-Idempotency-Key` = `transaction_id` |
| Content-Type | `application/json`, UTF-8 |
| Thời gian chờ phản hồi | Đề xuất 30 giây; quá hạn coi là gửi không thành công |
| Thành công | HTTP 200 và `code` = `SUCCESS` |
| Ghi chú | Các giá trị ghi "Đề xuất" tại mục 8 (xác thực, thời gian chờ, lịch gửi lại, thuật toán băm, cách tải tệp): đề xuất, chốt với DVC khi kết nối |

<a id="dvc-gui-ket-qua-buoc"></a>
### 8.2. Các bước phải gửi

Mỗi bước gửi 01 bản tin. Thời điểm gửi:
- Quyết định, Thông báo: Lãnh đạo cấp cuối Ký duyệt (Ký số), hoặc cán bộ bấm `Ban hành văn bản` (Ký ngoài).
- Báo cáo xác minh thiệt hại: cán bộ xác nhận `Hoàn thành xác minh`.
- Biên bản kết quả thương lượng việc bồi thường: cán bộ `Lưu kết quả thương lượng` với `Tình trạng tham gia thương lượng` = `Đồng ý thương lượng`.

Link tệp kết quả gửi kèm mã băm:
- Ký số: link tệp PDF Lãnh đạo đã ký số.
- Ký ngoài: link tệp PDF đã ký, đóng dấu cán bộ tải lên khi Ban hành.
- Báo cáo xác minh thiệt hại, Biên bản kết quả thương lượng việc bồi thường: link tệp PDF tại trường tệp riêng của bước (01 tệp).
- Mỗi bước gửi link của 01 tệp kết quả chính; không gửi link `Tài liệu ban hành kèm theo`, `Tài liệu không ban hành kèm theo` và tài liệu đính kèm khác.

| Bước | `step_code` | Sự kiện kích hoạt | Văn bản kết quả (gửi link tệp và mã băm) | `case_status` gửi kèm |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `YEU_CAU_BO_SUNG` | Ký duyệt / Ban hành Thông báo yêu cầu bổ sung | Thông báo về việc yêu cầu bổ sung hồ sơ yêu cầu bồi thường (Mẫu 03/BTNN) | `YEU_CAU_BO_SUNG` |
| 2 | `THONG_BAO_KHONG_THU_LY` | Ký duyệt / Ban hành Thông báo không thụ lý | Thông báo không thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN) | `KHONG_THU_LY`; lý do "Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình": `DA_CHUYEN_CQGQBT` |
| 3 | `THONG_BAO_THU_LY` | Ký duyệt / Ban hành Thông báo thụ lý | Thông báo thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN) | `CU_NGUOI_GIAI_QUYET` |
| 4 | `QUYET_DINH_CU_NGUOI` | Ký duyệt / Ban hành Quyết định cử người giải quyết bồi thường | Quyết định cử người giải quyết bồi thường (Mẫu 06/BTNN) | `XAC_MINH_THIET_HAI` (vụ việc chỉ yêu cầu phục hồi danh dự: `DANG_PHUC_HOI_DANH_DU`) |
| 5 | `BAO_CAO_XAC_MINH` | Hoàn thành xác minh | Báo cáo xác minh thiệt hại | `THUONG_LUONG` |
| 6 | `BIEN_BAN_THUONG_LUONG` | Lưu kết quả thương lượng, `Đồng ý thương lượng` | Biên bản kết quả thương lượng việc bồi thường | `CHO_BAN_HANH_QD` |
| 7 | `QUYET_DINH_GIAI_QUYET` | Ký duyệt / Ban hành Quyết định giải quyết bồi thường | Quyết định giải quyết bồi thường (Mẫu 18/BTNN) | `CHO_CHI_TRA` |
| 8 | `QUYET_DINH_HUY` | Ký duyệt / Ban hành Quyết định hủy | Quyết định hủy quyết định giải quyết bồi thường (Mẫu 20/BTNN) | Trạng thái vụ việc hiện tại (Quyết định hủy không đổi trạng thái vụ việc) |
| 9 | `QUYET_DINH_SUA_DOI_BO_SUNG` | Ký duyệt / Ban hành Quyết định sửa chữa, bổ sung | Quyết định sửa chữa, bổ sung quyết định giải quyết bồi thường (Mẫu 21/BTNN) | Trạng thái vụ việc hiện hành (không đổi) |
| 10 | `QUYET_DINH_HOAN` | Ký duyệt / Ban hành Quyết định hoãn | Quyết định hoãn giải quyết bồi thường (Mẫu 22/BTNN) | `HOAN_GIAI_QUYET` |
| 11 | `QUYET_DINH_TIEP_TUC` | Ký duyệt / Ban hành Quyết định tiếp tục | Quyết định tiếp tục giải quyết bồi thường (Mẫu 23/BTNN) | Trạng thái trước khi hoãn / tạm đình chỉ |
| 12 | `QUYET_DINH_TAM_DINH_CHI` | Ký duyệt / Ban hành Quyết định tạm đình chỉ | Quyết định tạm đình chỉ giải quyết yêu cầu bồi thường (Mẫu 24/BTNN) | `TAM_DINH_CHI` |
| 13 | `QUYET_DINH_DINH_CHI` | Ký duyệt / Ban hành Quyết định đình chỉ | Quyết định đình chỉ giải quyết yêu cầu bồi thường (Mẫu 25/BTNN) | `DINH_CHI_GIAI_QUYET` |
| 14 | `THONG_BAO_DUNG_GIAI_QUYET` | Ký duyệt / Ban hành Thông báo dừng giải quyết | Thông báo về việc dừng giải quyết yêu cầu bồi thường (Mẫu 05/BTNN) | `DUNG_GIAI_QUYET` |
| 15 | `THONG_BAO_PHUC_HOI_DANH_DU` | Ký duyệt / Ban hành Thông báo tổ chức thực hiện phục hồi danh dự | Thông báo về việc tổ chức thực hiện phục hồi danh dự (Mẫu 26/BTNN) | Trạng thái vụ việc hiện hành (vụ việc chỉ yêu cầu phục hồi danh dự: `DANG_PHUC_HOI_DANH_DU`) |
| 16 | `THONG_BAO_CHI_TRA` | Ký duyệt / Ban hành Thông báo chi trả | Thông báo về việc chi trả tiền bồi thường (Mẫu 32/BTNN) | `CHO_CHI_TRA` |

Bước lặp lại (vd hoãn giải quyết nhiều lần) thì mỗi lần ban hành là 01 bản tin mới, `transaction_id` mới.

Không gửi:
- Hoàn thành phục hồi danh dự.
- Chuyển CQGQBT; hồ sơ tại cơ quan nhận (`Nguồn hồ sơ` = `Chuyển CQGQBT`) không gửi.
- Hoàn thành chi trả, Trả lại ngân sách nhà nước.
- Kết quả thương lượng có `Tình trạng tham gia thương lượng` khác `Đồng ý thương lượng` (không gửi tài liệu minh chứng).

**Mã trạng thái vụ việc (`case_status`)**: trạng thái vụ việc tổng hợp sau bước, theo Trạng thái vụ việc Giải quyết YCBT của BTNN. Đây là bộ mã trạng thái duy nhất, dùng chung cho `progress.claim_status` (mục 7.8). Vụ việc yêu cầu cả bồi thường thiệt hại và phục hồi danh dự: gửi 01 trạng thái tổng hợp.

| `case_status` | `case_status_name` |
| :--- | :--- |
| `CHO_PHAN_CONG` | Chờ phân công (hồ sơ tại màn Tiếp nhận hồ sơ; chỉ dùng tại mục 7.8) |
| `CHO_TIEP_NHAN` | Chờ tiếp nhận (chỉ dùng tại mục 7.8) |
| `CHO_DUYET` | Chờ duyệt (chỉ dùng tại mục 7.8) |
| `BI_TRA_LAI` | Bị trả lại (chỉ dùng tại mục 7.8) |
| `CU_NGUOI_PHUC_HOI_DANH_DU` | Cử người phục hồi danh dự (chỉ dùng tại mục 7.8) |
| `CU_NGUOI_GIAI_QUYET` | Cử người giải quyết bồi thường |
| `XAC_MINH_THIET_HAI` | Xác minh thiệt hại |
| `THUONG_LUONG` | Thương lượng |
| `CHO_BAN_HANH_QD` | Chờ ban hành QĐ |
| `CHO_CHI_TRA` | Chờ chi trả |
| `HOAN_THANH` | Hoàn thành |
| `DANG_PHUC_HOI_DANH_DU` | Đang phục hồi danh dự |
| `HOAN_PHUC_HOI_DANH_DU` | Hoãn phục hồi danh dự |
| `TU_CHOI_PHUC_HOI_DANH_DU` | Từ chối phục hồi danh dự |
| `HOAN_GIAI_QUYET` | Hoãn giải quyết |
| `TAM_DINH_CHI` | Tạm đình chỉ |
| `DINH_CHI_GIAI_QUYET` | Đình chỉ giải quyết |
| `DUNG_GIAI_QUYET` | Dừng giải quyết |
| `DA_CHUYEN_CQGQBT` | Đã chuyển CQGQBT |
| `KHONG_THU_LY` | Không thụ lý |
| `YEU_CAU_BO_SUNG` | Yêu cầu bổ sung |

### 8.3. Thân request

| Trường | Kiểu | Bắt buộc | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `transaction_id` | Chuỗi (tối đa 100) | Có | Mã giao dịch, duy nhất cho mỗi lần phát sinh kết quả; gửi lại giữ nguyên |
| `sent_at` | Thời điểm ISO-8601 (+07:00) | Có | Thời điểm gửi của lượt gửi này |
| `dvc_dossier_code` | Chuỗi | Có | Mã hồ sơ bên DVC (đã gửi ở mục 7.2) |
| `receipt_no` | Chuỗi | Có | Số tiếp nhận BTNN đã trả (mục 7.7) |
| `case_code` | Chuỗi | Có | Mã vụ việc `VVBT-yyyy-nnn` |
| `dossier_code` | Chuỗi | Có | Mã hồ sơ giải quyết `BT-yyyy-nnn` |
| `step_code` | Chuỗi | Có | Mã bước, mục 8.2 |
| `step_name` | Chuỗi | Có | Tên văn bản / bước, cột "Văn bản kết quả" mục 8.2 |
| `event_time` | Thời điểm ISO-8601 (+07:00) | Có | Thời điểm phát sinh kết quả (ký duyệt cấp cuối, ban hành, hoàn thành xác minh, lưu kết quả thương lượng) |
| `case_status` | Chuỗi | Có | Mã trạng thái vụ việc sau bước, mục 8.2 |
| `case_status_name` | Chuỗi | Có | Tên trạng thái vụ việc |
| `document.doc_no` | Chuỗi | Không | Số, ký hiệu văn bản; `null` nếu không có (Báo cáo xác minh, Biên bản thương lượng) |
| `document.doc_date` | Ngày `yyyy-MM-dd` | Không | Ngày ký / ngày văn bản |
| `document.issued_time` | Thời điểm ISO-8601 (+07:00) | Không | Thời điểm ban hành |
| `document.signing_method` | Chuỗi | Không | `KY_SO` (Ký số trên hệ thống) hoặc `KY_NGOAI`; `null` với Báo cáo xác minh, Biên bản thương lượng |
| `document.signer_name` | Chuỗi | Không | Người ký |
| `document.signer_position` | Chuỗi | Không | Chức vụ người ký |
| `file.file_id` | Chuỗi | Có | Mã tệp tại BTNN |
| `file.file_url` | Chuỗi | Có | Link tệp kết quả, tải qua cổng API BTNN (mục 8.5) |
| `file.file_size` | Số nguyên | Có | Dung lượng (byte) |
| `file.mime_type` | Chuỗi | Có | Định dạng tệp, `application/pdf` |
| `file.hash_algorithm` | Chuỗi | Có | Thuật toán băm, `SHA-256` (đề xuất) |
| `file.hash_value` | Chuỗi | Có | Mã băm của tệp, hex chữ thường (64 ký tự) |

Bản tin không có tên tệp. DVC cần tên để hiển thị thì dùng `step_name` (đề xuất, chốt với DVC khi kết nối).

Ví dụ:

```json
{
  "transaction_id": "KQ-BT-2026-007-THONG_BAO_THU_LY-001",
  "sent_at": "2026-10-28T16:40:20+07:00",
  "dvc_dossier_code": "H48.12.2026.000123",
  "receipt_no": "API-20261027-000123",
  "case_code": "VVBT-2026-012",
  "dossier_code": "BT-2026-007",
  "step_code": "THONG_BAO_THU_LY",
  "step_name": "Thông báo thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN)",
  "event_time": "2026-10-28T16:40:00+07:00",
  "case_status": "CU_NGUOI_GIAI_QUYET",
  "case_status_name": "Cử người giải quyết bồi thường",
  "document": {
    "doc_no": "12/TB-TLBT",
    "doc_date": "2026-10-28",
    "issued_time": "2026-10-28T16:40:00+07:00",
    "signing_method": "KY_SO",
    "signer_name": "Lê Hoàng Nam",
    "signer_position": "Cục trưởng"
  },
  "file": {
    "file_id": "f3b1c0de-0000-7000-8000-000000000001",
    "file_url": "https://79.108.216.78:9982/api/share/v1/compensation/result-files/f3b1c0de-0000-7000-8000-000000000001",
    "file_size": 245760,
    "mime_type": "application/pdf",
    "hash_algorithm": "SHA-256",
    "hash_value": "9f2c4e0b7a1d3c5e8f6a2b4c6d8e0f1a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e"
  }
}
```

<a id="dvc-nhat-ky-dong-bo"></a>
### 8.4. Phản hồi của DVC, gửi lại và chống trùng

DVC trả khuôn phản hồi như mục 6.3:

```json
{ "code": "SUCCESS", "message": null, "data": { "transaction_id": "KQ-BT-2026-007-THONG_BAO_THU_LY-001", "duplicate": false } }
```

| Kết quả DVC trả | BTNN xử lý |
| :--- | :--- |
| HTTP 200, `SUCCESS` | Ghi thành công |
| HTTP 200, `SUCCESS`, `duplicate` = `true` | Ghi thành công (DVC đã nhận trước đó) |
| Quá thời gian chờ, lỗi kết nối, HTTP 429, 5xx | Tự gửi lại |
| HTTP 400 (`VALIDATION_ERROR`), 401, 403, 404 (`NOT_FOUND` - không có `dvc_dossier_code`) | Không tự gửi lại; ghi `FAILED`, cán bộ kiểm tra rồi `Gửi lại` tại màn Nhật ký đồng bộ Dịch vụ công |

- **Gửi lại**: tối đa 05 lần sau lần đầu, cách nhau 1, 5, 15, 60, 240 phút (đề xuất, chốt với DVC khi kết nối). Hết số lần mà chưa thành công: ghi `FAILED`.
- **Gửi lại thủ công** (cán bộ bấm `Gửi lại` cho bản tin `FAILED`): giữ nguyên `transaction_id`. Vẫn lỗi tạm thời (quá thời gian chờ, lỗi kết nối, HTTP 429, 5xx): chuyển `RETRYING` và tự gửi lại theo lịch trên. Lỗi HTTP 400, 401, 403, 404: giữ `FAILED`.
- **Thứ tự**: các bản tin của cùng `dvc_dossier_code` gửi theo thứ tự `event_time`; bản tin sau chỉ gửi khi bản tin trước đã thành công hoặc `FAILED`.
- **Chống trùng (idempotent)**: gửi lại giữ nguyên `transaction_id`, `X-Idempotency-Key` và toàn bộ nội dung, chỉ đổi `sent_at`. DVC nhận `transaction_id` đã có: trả HTTP 200, `duplicate` = `true`, không xử lý lại.
- **Nhật ký đồng bộ**: BTNN ghi mỗi lượt gửi gồm `transaction_id`, `dvc_dossier_code`, `step_code`, số lần gửi, thời điểm gửi, HTTP, `code` và `message` phản hồi, trạng thái (`PENDING`, `RETRYING`, `SUCCESS`, `FAILED`). Xem và gửi lại tại [Nhật ký đồng bộ Dịch vụ công - Nhật ký đồng bộ Dịch vụ công - Quản trị hệ thống (Website Quản trị)](../../Tai_lieu_SRS/03_Website_Quan_tri/01_Quan_tri_he_thong/Nhat_ky_dong_bo_DVC.md).

### 8.5. Tải tệp kết quả

`GET /api/share/v1/compensation/result-files/{file_id}` - DVC gọi kèm token và chữ ký như mục 4, 5 (thân rỗng). Cần được cấp mã API `DVC_RESULT_FILE`. Cách tải tệp có xác thực là đề xuất, chốt với DVC khi kết nối.

- Thành công: HTTP 200, thân là nội dung tệp; `Content-Type` = `mime_type`; `Content-Disposition` có tên tệp do BTNN đặt.
- DVC tính SHA-256 của nội dung tải về và so với `hash_value`; khác nhau thì tải lại.
- `file_id` không có hoặc không thuộc hồ sơ nộp qua DVC: 404 `NOT_FOUND`. Lỗi khác theo mục 9.

---

## 9. Mã lỗi chung của cổng API

| HTTP | Mã | Nguyên nhân | Cách xử lý |
| :--- | :--- | :--- | :--- |
| 401 | (không có mã) | Thiếu token, token sai hoặc hết hạn | Xin token mới (mục 4) |
| 401 | `PARTNER_UNKNOWN` | Sai `X-Partner-Code` hoặc đối tác ngừng hoạt động | Kiểm mã `DVC`; liên hệ BTNN |
| 401 | `TIMESTAMP_INVALID` | `X-Timestamp` lệch quá 5 phút | Đồng bộ giờ máy chủ (NTP), dùng giây epoch |
| 401 | `INVALID_SIGNATURE` | Chữ ký sai | Kiểm chuỗi cần ký (mục 5.2): `PATH` gồm query, băm đúng byte thân, đúng khóa |
| 401 | `NONCE_REPLAY` | `X-Nonce` đã dùng hoặc sai khuôn (mục 5.1) | Mỗi lượt gọi một nonce mới, đúng khuôn |
| 401 | `SECRET_NOT_ISSUED` | BTNN chưa cấp khóa ký HMAC cho đối tác | Liên hệ BTNN |
| 403 | `CLIENT_MISMATCH` | Token không phải của `CLIENT_DVC` | Lấy token bằng đúng client của DVC |
| 403 | `IP_DENIED` | IP không nằm trong danh sách cho phép | Báo BTNN khai thêm IP |
| 403 | `API_FORBIDDEN` | DVC chưa được cấp mã API này | Báo BTNN cấp mã |
| 403 | `API_DISABLED` | API đang tạm tắt | Liên hệ BTNN |
| 400 | `VALIDATION_ERROR` | Tham số hoặc dữ liệu sai | Xem chi tiết trong phản hồi |
| 404 | `NOT_FOUND` | Không tìm thấy dữ liệu | |
| 413 | `BODY_TOO_LARGE` | Thân quá 64MB | Giảm dung lượng tệp |
| 429 | `RATE_LIMITED` | Vượt hạn mức lượt gọi/phút | Giãn nhịp gọi, thử lại sau |
| 503 | `GATEWAY_NOT_CONFIGURED` | Cổng API BTNN chưa cấu hình xong khóa mã hóa (lỗi phía BTNN) | Liên hệ BTNN |
| 5xx | | Lỗi máy chủ BTNN | Thử lại sau; kéo dài thì báo BTNN kèm thời điểm gọi |

---

## 10. Ca kiểm thử nghiệm thu

| STT | Ca kiểm | Kết quả mong đợi |
| :--- | :--- | :--- |
| 1 | Lấy token đúng client | Có `access_token` |
| 2 | Gọi `partner/ping` đủ header, ký đúng | HTTP 200, `data.server_time` là giờ máy chủ |
| 3 | Gọi `partner/ping` với chữ ký sai / nonce dùng lại / giờ lệch > 5 phút | 401 `INVALID_SIGNATURE` / `NONCE_REPLAY` / `TIMESTAMP_INVALID` |
| 4 | Đồng bộ lần đầu đủ các danh mục mục 6.1 | Đủ dữ liệu, `has_more=false` ở trang cuối |
| 5 | Đồng bộ lại với `last_sync_time` | Chỉ nhận bản ghi thay đổi (kể cả đã xóa/ngừng) |
| 6 | E-Form: ô Loại giấy tờ, Tư cách, Phường/Xã, Cơ quan giải quyết | Lọc đúng quy tắc mục 6.6 |
| 7 | Gửi hồ sơ Cá nhân - Người bị thiệt hại, `CHI_PHUC_HOI`, có `VB_YEU_CAU_BT` | 200 `RECEIVED`; sau ~1 phút tra trạng thái `ACCEPTED` kèm mã `BT-...` |
| 8 | Gửi hồ sơ Cá nhân - Người thừa kế (khối `victim`, có `VB_UY_QUYEN_YCBT`) | Hồ sơ có thông tin người bị thiệt hại, Trạng thái người bị thiệt hại `Đã mất` |
| 9 | Gửi hồ sơ Tổ chức - Tổ chức kế thừa (khối `dissolved_org`) | Hồ sơ có thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại |
| 10 | Gửi hồ sơ Tổ chức - Được ủy quyền, người bị thiệt hại là tổ chức (`victim.victim_type` = `TO_CHUC`) | Hồ sơ có thông tin tổ chức bị thiệt hại |
| 11 | Gửi hồ sơ `CA_HAI` có `damages` (mục DM_27 và `TH_KHAC`), `advance`, `payee` chuyển khoản, `honor_restoration` | Hồ sơ có bảng thiệt hại, tạm ứng, người nhận, hình thức phục hồi danh dự |
| 12 | Gửi hồ sơ sai số điện thoại, thiếu trường bắt buộc, Mã số thuế ở Loại giấy tờ, Phường không thuộc Tỉnh, tạm ứng vượt mức | 400, `data.errors` liệt kê đủ từng trường |
| 13 | Gửi tệp sai định dạng / quá 20MB / thiếu `VB_YEU_CAU_BT` / 02 tệp cho 01 thành phần | 400 `INVALID_FILE_TYPE` / `FILE_TOO_LARGE` / `REQUIRED` / `TOO_MANY_FILES` |
| 14 | Gửi lại hồ sơ cùng `dvc_dossier_code` | 200, `duplicate=true`, cùng số tiếp nhận, không có hồ sơ thứ hai |
| 15 | Tra trạng thái mã không tồn tại | 404 |
| 16 | Gọi `org-units` với `province_code` + `claim_intake_only=true`; gửi `claim_intake_only=abc` | Chỉ đơn vị thuộc tỉnh đó và đã có Luồng tiếp nhận, `province_code` mỗi dòng là tỉnh suy ra; giá trị sai: 400 `VALIDATION_ERROR` |
| 17 | Gửi hồ sơ tới cơ quan lấy từ ca 16, tra trạng thái trước và sau khi hồ sơ vào màn Tiếp nhận | `RECEIVED` với `progress` = `null`; sau ~1 phút `ACCEPTED` với `progress.claim_status`, `documents[]` (rỗng đến khi BTNN ban hành văn bản) |
| 18 | Sau khi BTNN ban hành Thông báo thụ lý, tra trạng thái | `progress.documents[]` có `type` = `THONG_BAO_THU_LY` kèm `doc_no`, `doc_date`, `issued_time` |
| 19 | BTNN Ký duyệt cấp cuối Thông báo thụ lý (bước 3) của hồ sơ ca 17 | DVC nhận 01 bản tin `step_code` = `THONG_BAO_THU_LY`, `case_status` = `CU_NGUOI_GIAI_QUYET`, đủ `document`, `file` |
| 20 | DVC tải tệp theo `file.file_url` (mục 8.5) | HTTP 200; SHA-256 nội dung tải về trùng `file.hash_value`; `file_size` đúng |
| 21 | DVC trả 5xx / quá 30 giây cho bản tin ca 19 | BTNN gửi lại cùng `transaction_id`; DVC trả `duplicate` = `true` từ lần thứ hai nhận được, không tạo kết quả trùng |
| 22 | Hoàn thành xác minh, Lưu kết quả thương lượng (Đồng ý thương lượng) của hồ sơ ca 17 (bước 5, 6) | DVC nhận `BAO_CAO_XAC_MINH`, `BIEN_BAN_THUONG_LUONG` kèm link tệp PDF và mã băm của trường tệp riêng |
| 23 | Ban hành văn bản của hồ sơ có `Nguồn hồ sơ` khác `Dịch vụ công` | Không có bản tin gửi DVC |
| 24 | Ký duyệt cấp cuối Quyết định cử người giải quyết bồi thường (bước 4), Thông báo dừng giải quyết (bước 14) của hồ sơ ca 17 | DVC nhận `QUYET_DINH_CU_NGUOI` (`XAC_MINH_THIET_HAI`), `THONG_BAO_DUNG_GIAI_QUYET` (`DUNG_GIAI_QUYET`) |
| 25 | Ban hành Quyết định hủy quyết định giải quyết bồi thường | DVC nhận `QUYET_DINH_HUY`, `case_status` = trạng thái vụ việc trước khi hủy |
| 26 | Chuyển CQGQBT hồ sơ ca 17, cơ quan nhận ban hành Thông báo thụ lý | Không có bản tin gửi DVC (hồ sơ tại cơ quan nhận có `Nguồn hồ sơ` = `Chuyển CQGQBT`) |

---

## 11. Chuyển sang môi trường chính thức và liên hệ

- Môi trường chính thức có địa chỉ cổng API, địa chỉ Keycloak và bí mật **khác** môi trường thử nghiệm; BTNN gửi khi chuyển. Không dùng bí mật thử nghiệm ở môi trường chính thức.
- Đổi IP máy chủ, cần thêm API, hay nghi lộ bí mật: liên hệ đầu mối kỹ thuật BTNN để cập nhật trên màn Kết nối chia sẻ dữ liệu.
- Khi báo lỗi, gửi kèm: thời điểm gọi, đường dẫn, mã HTTP, nội dung phản hồi, giá trị `X-Nonce` (không gửi token, client secret, khóa HMAC).
