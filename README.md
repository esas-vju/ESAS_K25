# Lộ trình học tập NNTM&BV – K22, K23, K24, K25

Trang web giúp sinh viên các lớp **K22, K23, K24 và K25** ngành Nông nghiệp thông minh và bền vững (Trường ĐH Việt Nhật, ĐHQGHN) theo dõi tiến độ 165 tín chỉ. Bốn lớp này học chung một lộ trình (khung ESAS5 năm 2024, có 3 định hướng chuyên sâu). Lộ trình này khác với Khóa 2026.

Sinh viên đăng nhập bằng email `@st.vju.ac.vn` và chọn lớp của mình. Giảng viên được cấp quyền xem tiến độ theo từng lớp hoặc cả 4 lớp, và tải về dạng CSV.

| Tệp | Nội dung |
|---|---|
| `index.html` | Trang lộ trình: sơ đồ cây 5 khối, 8 học kỳ, cẩm nang tư vấn 3 định hướng, theo dõi lớp |
| `huong-dan.html` | Hướng dẫn cho sinh viên (gửi link này kèm link trang chính) |
| `firestore.rules` | Quy tắc bảo mật dữ liệu, dán vào Firebase. Dùng được cho cả trang K2026 |
| `HUONG-DAN-CAI-DAT-FIREBASE.md` | Hướng dẫn cài đặt chi tiết từng bước |

## Khác gì so với trang K2026

- **Khung chương trình:** 5 khối I–V (26 · 34 · 30 · 20 · 55 TC), 3 định hướng chuyên sâu V.2, mỗi hướng 14 TC: 1 · Nông nghiệp sinh thái, 2 · Nông nghiệp tiên tiến Nhật Bản, 3 · Tạo lập và quản trị doanh nghiệp nông nghiệp.
- **Chia lớp:** sinh viên chọn lớp K25, K24, K23 hoặc K22 khi nhập thông tin lần đầu, và đổi được ở mục *Lớp của bạn*. Mục *Theo 8 học kỳ* ghi năm học của từng học kỳ theo lớp và đánh dấu học kỳ đang học theo lịch dự kiến.
- **Theo dõi lớp (giảng viên):** có hàng nút *Chia lớp* (Tất cả · K25 · K24 · K23 · K22), mỗi nút ghi số sinh viên và TC trung bình. Bảng có cột *Lớp*, tệp CSV tải về theo lớp đang chọn.
- **Dữ liệu riêng:** tiến độ lưu ở bộ sưu tập `progress_k22_25`, không lẫn với `progress` của K2026.

---

## Cách 1 (khuyến nghị) · Dùng chung dự án Firebase với trang K2026

Nếu trang K2026 đã chạy với Firebase, bạn không cần tạo dự án mới:

1. **GitHub:** tạo repository mới, ví dụ `lo-trinh-nntmbv-k22-k25`, tải lên tất cả các tệp của thư mục này. Bật **Settings → Pages** (Branch `main`, thư mục `/ (root)`).
2. **Cấu hình:** mở `index.html` của trang K2026, chép nguyên khối `FIREBASE_CONFIG`, rồi dán đè khối `FIREBASE_CONFIG` trong `index.html` của trang này.
3. **Quy tắc bảo mật:** Firebase Console → Firestore → tab **Rules**. Xoá nội dung cũ, dán toàn bộ tệp `firestore.rules` của thư mục này, rồi bấm **Publish**. Tệp mới vẫn giữ nguyên quy tắc của K2026 và thêm phần cho K22–K25.
4. **Tên miền:** nếu hai repo cùng một tài khoản GitHub thì tên miền `<tên-tài-khoản>.github.io` đã có trong *Authorized domains*, không cần thêm.
5. **Giảng viên:** dùng chung danh sách `lecturers`. Giảng viên đã có quyền ở trang K2026 thì tự có quyền ở trang này.

## Cách 2 · Tạo dự án Firebase riêng

Làm theo `HUONG-DAN-CAI-DAT-FIREBASE.md`. Các bước giống trang K2026, chỉ khác tên repo và tên dự án.

Chưa điền `FIREBASE_CONFIG` thì trang chạy ở **chế độ thử**: dùng được đầy đủ, nhưng tiến độ chỉ lưu trên trình duyệt.

## Kiểm tra trước khi gửi sinh viên

- [ ] Đăng nhập bằng một email `@st.vju.ac.vn`, nhập MSSV, họ tên, **chọn lớp**, đánh dấu vài môn. Dòng trạng thái phải báo “Đã lưu lúc …” và ghi “Lớp K..”.
- [ ] Tải lại trang: các môn đã đánh dấu và lớp vẫn còn.
- [ ] Đăng nhập bằng Gmail cá nhân (không có trong `lecturers`): trang phải báo “Email chưa đúng”.
- [ ] Đăng nhập bằng email giảng viên, mở **Theo dõi lớp**: sinh viên thử hiện đúng lớp. Bấm nút lớp đó, rồi thử **Tải CSV**.
- [ ] (Cách 1) Mở lại trang K2026, kiểm tra sinh viên K2026 vẫn lưu được.
- [ ] Gửi sinh viên **link trang chính** và **link `huong-dan.html`**.

## Quyền truy cập dữ liệu

| Người dùng | Đọc | Ghi |
|---|---|---|
| Sinh viên `@st.vju.ac.vn` | Chỉ tiến độ của mình | Chỉ tiến độ của mình |
| Giảng viên trong `lecturers` | Tiến độ cả 4 lớp | Không |
| Email khác | Không | Không |

Không ai xoá được dữ liệu từ trang web. Quản trị viên xoá được trong Firebase Console (Firestore → Data → `progress_k22_25`).

## Lưu ý

- **Sinh viên phải mở bằng trình duyệt** (Chrome, Safari). Google chặn đăng nhập bên trong Zalo, Messenger và Facebook; trang tự nhắc khi phát hiện trường hợp này.
- **Năm học theo lớp:** trang tính năm nhập học = 2000 + số khóa (K25 → 2025). Học kỳ lẻ tính từ tháng 9 đến tháng 1, học kỳ chẵn từ tháng 2 đến tháng 8. Đây là lịch dự kiến, chỉ dùng để nhắc tiến độ.
- **Mã trùng:** khung ESAS5 ghi cùng mã `SAS3048` cho *Tài chính nông nghiệp* (V.1) và *Thương mại điện tử nông sản* (V.2.3). Trang gắn nhãn “trùng mã” cho môn thứ hai. Khi có mã chính thức, chỉ sửa tham số đầu tiên (mã hiển thị) trong `index.html` và giữ nguyên mã nội bộ `SAS3048-TMDT` ở tham số cuối, để tiến độ đã lưu không bị mất.
- **Cập nhật khung chương trình:** dữ liệu nằm trong `index.html`. Hằng `TREE` chứa cấu trúc 165 TC; `ROAD` chứa lộ trình 8 học kỳ; `TRK` chứa gợi ý cho 3 định hướng. Danh sách lớp nằm ở hằng `KHOAS`. Muốn thêm lớp, sửa `KHOAS` trong `index.html` và danh sách `['K22', 'K23', 'K24', 'K25']` trong `firestore.rules`.

Nguồn dữ liệu: ESAS5 – Khung chương trình đào tạo sau điều chỉnh (2024, Sheet1 và khối M2), ESAS1 – Quyển chương trình đào tạo (mục 5.2 Lộ trình đào tạo) và Cẩm nang tư vấn định hướng chuyên sâu NNTMBV.
