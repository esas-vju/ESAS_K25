# Hướng dẫn cài đặt trang Lộ trình NNTM&BV K22–K25 trên GitHub Pages + Firebase

> **Đã có Firebase cho trang K2026?** Không cần làm lại từ đầu. Xem *Cách 1* trong `README.md`: dùng chung dự án, chỉ cần chép `FIREBASE_CONFIG` và dán lại tệp `firestore.rules` mới. Hướng dẫn dưới đây dành cho trường hợp tạo dự án Firebase riêng.

Trang web chạy trên **GitHub Pages**. Phần đăng nhập email trường và lưu tiến độ chạy trên **Firebase**, dùng gói miễn phí **Spark**, không cần thẻ thanh toán.

Cần chuẩn bị:
- Tài khoản GitHub.
- Tài khoản Google, dùng làm chủ dự án Firebase.
- Các tệp trong thư mục `github-lo-trinh-NNTMBV-K22-K25`: `index.html`, `huong-dan.html`, `firestore.rules`, `README.md`, `HUONG-DAN-CAI-DAT-FIREBASE.md`.

> Giao diện Firebase thay đổi theo thời gian, tên nút có thể khác đôi chút so với hướng dẫn này. Hướng dẫn được viết theo giao diện Firebase Console năm 2026.

---

## Bước 1 · Đưa trang lên GitHub Pages

1. Đăng nhập [github.com](https://github.com) và bấm **New repository**. Đặt tên, ví dụ `lo-trinh-nntmbv-k22-k25`, chọn **Public**, rồi bấm **Create repository**.
2. Bấm **Add file → Upload files**, kéo tất cả các tệp vào và bấm **Commit changes**.
3. Vào **Settings → Pages**, chọn:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main`, thư mục `/ (root)`

   rồi bấm **Save**.
4. Sau 1–2 phút, trang có địa chỉ dạng `https://<tên-tài-khoản>.github.io/lo-trinh-nntmbv-k22-k25/`.

Ghi lại **`<tên-tài-khoản>.github.io`**, bước 2.3 sẽ cần đến.

Lúc này trang chạy ở **chế độ thử**: dùng được, nhưng chỉ lưu trên trình duyệt.

---

## Bước 2 · Tạo dự án Firebase

### 2.1. Tạo dự án
1. Mở [console.firebase.google.com](https://console.firebase.google.com) và đăng nhập bằng tài khoản Google.
2. Bấm **Create a project** (có thể ghi *Get started with a Firebase project* / *Add project*).
3. Đặt tên dự án, ví dụ `esas-k22-k25`, đồng ý điều khoản, bấm **Continue**.
4. Tắt **Gemini** và **Google Analytics** nếu được hỏi, rồi bấm **Create project**.
5. Đợi xong thì bấm **Continue** để vào trang tổng quan dự án.

Góc dưới bên trái phải hiện **Spark · No-cost ($0/month)**.

### 2.2. Bật đăng nhập bằng Google
1. Ở menu trái, chọn **Authentication** (trong *Project shortcuts* hoặc *Security*), rồi bấm **Get started**.
2. Mở tab **Sign-in method** và chọn **Google**.
3. Gạt **Enable** sang bật.
4. *Public-facing name*: nhập `Lộ trình NNTM&BV K22–K25`.
5. *Support email*: chọn email của bạn, rồi bấm **Save**.

**Kiểm tra:** dòng Google hiện **Enabled**.

### 2.3. Cho phép tên miền GitHub
1. Trong Authentication, mở tab **Settings**, chọn **Authorized domains**.
2. Bấm **Add domain** và nhập `<tên-tài-khoản>.github.io`, ví dụ `nguyenvan.github.io`.
   - Không nhập `https://`.
   - Không nhập tên repo và không có dấu `/`.
3. Bấm **Add**.

**Kiểm tra:** danh sách có `localhost`, `esas-k22-k25.firebaseapp.com` và tên miền GitHub của bạn.

### 2.4. Tạo cơ sở dữ liệu Firestore
1. Ở menu trái, chọn **Firestore** (trong *Project shortcuts* hoặc *Databases & Storage*).
2. Trang hiện chữ **Cloud Firestore** lớn với nút **Create database**. Đây là dấu hiệu database **chưa được tạo**. Bấm **Create database**.
3. **Edition:** chọn **Standard edition**.
   > ⚠️ Không chọn *Enterprise edition* (MongoDB compatibility). Bản này không có tab Rules và không chạy được với trang.
4. **Database ID:** giữ `(default)`. **Location:** chọn **asia-southeast1 (Singapore)**. Vị trí này không đổi được sau khi tạo.
5. **Security rules:** chọn **Start in production mode**, rồi bấm **Create**.
6. Đợi 30 giây đến 1 phút. Trang chuyển sang giao diện database, phía trên có các tab **Data · Rules · Indexes · …**

### 2.5. Dán quy tắc bảo mật
1. Mở tab **Rules**.
2. Xoá toàn bộ nội dung cũ (Cmd+A trên Mac hoặc Ctrl+A trên Windows, rồi Delete).
3. Mở tệp `firestore.rules`, chép toàn bộ nội dung và dán vào khung.
4. Bấm **Publish**.

**Kiểm tra:** không có báo lỗi đỏ, và có dòng thời gian vừa publish.

> Không thấy tab Rules? Hãy kiểm tra bước 2.4 đã hoàn tất chưa: trang không còn nút *Create database*. Kiểm tra thêm database là bản **Standard**. Bạn cũng có thể mở thẳng địa chỉ
> `https://console.firebase.google.com/project/<project-id>/firestore/databases/-default-/rules`

---

## Bước 3 · Gắn Firebase vào trang

### 3.1. Lấy cấu hình
1. Ở menu trái, bấm **Settings → General**. Trong giao diện mới, mục này thay cho *Project settings* trước đây.
2. Kéo xuống cuối trang, tới phần **Your apps**.
3. Bấm biểu tượng **`</>`** (Web). Nếu không thấy, bấm **Add app** rồi chọn **Web**.
4. *App nickname*: nhập `web-lotrinh`. **Không** đánh dấu *Also set up Firebase Hosting*. Bấm **Register app**.
5. Ở mục **Add Firebase SDK** có khối mã:
   ```js
   const firebaseConfig = {
     apiKey: "AIza…",
     authDomain: "esas-k22-k25.firebaseapp.com",
     projectId: "esas-k22-k25",
     storageBucket: "…",
     messagingSenderId: "…",
     appId: "1:…:web:…"
   };
   ```
   Chép 4 giá trị **apiKey**, **authDomain**, **projectId** và **appId**. Các giá trị khác không cần.
6. Bấm **Continue to console**.

> Xem lại cấu hình sau này: **Settings → General → Your apps →** chọn `web-lotrinh` **→ Config**.

### 3.2. Dán cấu hình vào index.html trên GitHub
1. Mở repo trên github.com, bấm vào tệp **index.html**, rồi bấm biểu tượng **bút chì ✏️** (Edit this file).
2. Nhấn Cmd+F (Ctrl+F trên Windows) và tìm `FIREBASE_CONFIG`. Khối cần sửa nằm ngay sau dòng `<script type="module">`.
3. Điền giá trị vào giữa các dấu ngoặc kép:
   ```js
   const FIREBASE_CONFIG={
     apiKey:"AIzaSy…",
     authDomain:"esas-k22-k25.firebaseapp.com",
     projectId:"esas-k22-k25",
     appId:"1:123456789:web:abc123…"
   };
   ```
   Giữ nguyên dấu ngoặc kép và dấu phẩy.
4. Bấm **Commit changes…**, rồi bấm **Commit changes** lần nữa.
5. Đợi 1–2 phút. Tab **Actions** của repo hiện dấu ✓ xanh là GitHub đã cập nhật xong.

**Kiểm tra:** mở trang và nhấn Cmd+Shift+R (Ctrl+Shift+R trên Windows) để tải lại hẳn. Dòng "Chế độ thử…" phải biến mất, thay bằng màn hình **Đăng nhập để theo dõi lộ trình**.

> `apiKey` của Firebase được phép để công khai trong mã trang web. Dữ liệu được bảo vệ bằng quy tắc ở bước 2.5.

---

## Bước 4 · Cấp quyền giảng viên

1. Mở **Firestore**, tab **Data**, rồi bấm **+ Start collection**.
2. *Collection ID*: nhập đúng `lecturers` (chữ thường, có chữ s). Bấm **Next**.
3. *Document ID*: **không bấm Auto-ID**. Gõ email Google giảng viên dùng để đăng nhập, **viết thường toàn bộ**, ví dụ `tengiangvien@gmail.com`.
4. Thêm một trường:

   | Field | Type | Value |
   |---|---|---|
   | `ten` | string | họ tên giảng viên |

5. Bấm **Save**.

Thêm giảng viên khác: chọn collection `lecturers`, bấm **+ Add document** và làm lại mục 3–5. Muốn thu hồi quyền, xoá document đó.

### 4b. Cấp quyền nhập bảng điểm (quản trị viên)

Làm giống bước 4 nhưng với collection **`admins`**: *Collection ID* `admins`, *Document ID* là email người được nhập điểm (viết thường), thêm trường `ten`. Chỉ người có trong `admins` mới lưu được bảng điểm. Một người có thể nằm ở cả `lecturers` và `admins`.

> Nếu bạn đã dán `firestore.rules` trước khi có tính năng bảng điểm, hãy **dán lại tệp `firestore.rules` mới** (bước 2.5) và bấm **Publish**.

---

## Bước 5 · Kiểm tra trước khi gửi sinh viên

Mở trang bằng **Chrome hoặc Safari**:

- [ ] **Giảng viên:** bấm dòng nhỏ *"đăng nhập bằng email giảng viên"* và chọn email đã thêm ở bước 4. Phải thấy nút **Theo dõi lớp**.
- [ ] **Sinh viên:** bấm **Đăng xuất**, rồi bấm **Đăng nhập bằng Google (email trường)** với một email `@st.vju.ac.vn`. Nhập MSSV, họ tên, **chọn lớp** (K22–K25) và đánh dấu vài môn. Dòng trạng thái phải báo **"Đã lưu lúc …"**.
- [ ] Tải lại trang: các môn đã đánh dấu vẫn còn.
- [ ] Đăng nhập lại bằng email giảng viên, mở **Theo dõi lớp**: sinh viên thử hiện trong bảng, đúng lớp đã chọn. Bấm nút lớp đó ở hàng *Chia lớp*, rồi thử **Tải CSV**.
- [ ] Đăng nhập bằng một Gmail cá nhân không có trong `lecturers`: trang báo **"Email chưa đúng"**.
- [ ] **Bảng điểm:** mở `…/nhap-diem.html`, đăng nhập bằng email trong `admins`, kéo thả tệp bảng điểm, kiểm tra cột *Kiểm tra GPA* gần như đều **khớp**, rồi bấm **Lưu lên hệ thống**. Đăng nhập trang chính bằng email sinh viên có trong tệp, mở **Kết quả học tập**: thấy điểm và GPA.

Khi cả 5 mục đều đạt, gửi sinh viên 2 đường link:
- Trang chính: `https://<tên-tài-khoản>.github.io/lo-trinh-nntmbv-k22-k25/`
- Hướng dẫn: `https://<tên-tài-khoản>.github.io/lo-trinh-nntmbv-k22-k25/huong-dan.html`

---

## Nhập bảng điểm mỗi học kỳ

1. Trên hệ thống đào tạo, xuất **Bảng điểm theo lớp** của lớp (ví dụ ESAS2024) cho học kỳ vừa xong. Tệp có đuôi `.xls`, không cần mở hay sửa.
2. Mở `https://<tên-tài-khoản>.github.io/lo-trinh-nntmbv-k22-k25/nhap-diem.html`, đăng nhập bằng email quản trị.
3. Kéo thả một hoặc nhiều tệp (nhiều lớp, nhiều học kỳ cùng lúc được). Trang đọc tên lớp, học kỳ, năm học từ tiêu đề tệp. Lớp ESAS2024 là K24, ESAS2023 là K23…
4. Xem phần **Kiểm tra**: GPA trang tính phải khớp cột *Điểm TBC* trong tệp (lệch 0,01 ở vài sinh viên là do làm tròn). Nếu có cảnh báo *ngoài khung*, đó là mã học phần mới chưa có trong trang lộ trình: điểm vẫn được lưu và tính GPA, nhưng không tự đánh dấu trên sơ đồ.
5. Bấm **Lưu lên hệ thống**. Bảng *Bảng điểm đang có trên hệ thống* cho biết lớp nào đã có học kỳ nào.

Tải lại cùng lớp và học kỳ (ví dụ sau khi có điểm thi lại) sẽ thay điểm học kỳ đó; học kỳ khác giữ nguyên.

**Mã học phần mới:** hệ thống đào tạo đang dùng vài mã khác khung ESAS5 (SAS2030 → SAS2001 Sinh lý thực vật, SAS2031 → SAS2004, SAS2032 → SAS2005, SAS2033 → SAS2006, SAS2034 → SAS2009). Bảng đối chiếu nằm ở `ALIAS` đầu tệp `diem.js`; gặp mã mới thì thêm một dòng vào đó.

---

## Xử lý lỗi thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| Không thấy tab **Rules** | Database chưa tạo xong hoặc tạo nhầm bản Enterprise. Làm lại bước 2.4. |
| Không thấy **Project settings** | Dùng **Settings → General** (bước 3.1). |
| Trang vẫn hiện "Chế độ thử" | `FIREBASE_CONFIG` chưa được lưu hoặc GitHub chưa cập nhật. Đợi thêm rồi nhấn Cmd/Ctrl+Shift+R. |
| "Địa chỉ trang chưa được khai báo trong Firebase" | Kiểm tra bước 2.3. Tên miền phải đúng `<tên-tài-khoản>.github.io`. |
| Trang nhập điểm báo "chưa có quyền nhập điểm" hoặc lưu bị `permission-denied` | Thêm email vào collection `admins` (bước 4b) và dán lại `firestore.rules` mới. |
| Trang nhập điểm báo "chưa có cấu hình Firebase" | Trang nhập điểm dùng chung `FIREBASE_CONFIG` trong `index.html`. Kiểm tra đã dán cấu hình vào `index.html` trên GitHub và đã tải `diem.js`, `nhap-diem.html` lên cùng thư mục. |
| "Firebase chưa bật đăng nhập bằng Google" | Làm lại bước 2.2 và bấm Save. |
| "auth/configuration-not-found" hoặc "Firebase chưa bật Authentication" | Dự án chưa bấm **Get started** trong Authentication, hoặc `FIREBASE_CONFIG` trong `index.html` là của dự án khác. Làm lại bước 2.2 và kiểm tra `projectId` trong `index.html` trùng với tên dự án ở góc trên Firebase Console. |
| Đăng nhập được nhưng "Chưa lưu được vào tài khoản" | Quy tắc chưa Publish hoặc dán thiếu. Làm lại bước 2.5. |
| Giảng viên bị báo "Email chưa đúng" | Document ID phải trùng hệt email và viết thường. Collection phải tên `lecturers`. |
| Email trường báo "Access blocked" hoặc "ứng dụng bị chặn" | Quản trị Google Workspace của trường đang chặn ứng dụng ngoài. Đề nghị phòng CNTT cho phép ứng dụng OAuth của dự án. Client ID xem tại Google Cloud Console → APIs & Services → Credentials. |
| Sinh viên báo Google "trình duyệt không được hỗ trợ" | Sinh viên đang mở trong Zalo hoặc Messenger. Hướng dẫn các em mở bằng Chrome hoặc Safari. |
