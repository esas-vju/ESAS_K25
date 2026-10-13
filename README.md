# Lộ trình học tập NNTM&BV – K22, K23, K24, K25, K26

Trang web giúp sinh viên các lớp **K22, K23, K24, K25 và K26** ngành Nông nghiệp thông minh và bền vững (Trường ĐH Việt Nhật, ĐHQGHN) theo dõi tiến độ 165 tín chỉ. Trang chứa **hai khung chương trình** và tự dùng khung theo lớp của sinh viên:

| | K22, K23, K24, K25 | K26 |
|---|---|---|
| Khung | ESAS5 (2024) | ESAS5, sheet ESAS2026 |
| Khối kiến thức | 5 khối I–V (26 · 34 · 30 · 20 · 55 TC) | 3 khối: Đại cương 41 · Cơ sở và cốt lõi ngành 109 · Thực tập và tốt nghiệp 15 |
| Định hướng chuyên sâu | 1 · Nông nghiệp sinh thái, 2 · Nông nghiệp tiên tiến Nhật Bản, 3 · Doanh nghiệp nông nghiệp (14 TC) | A · Nông nghiệp thông minh, B · Doanh nghiệp nông nghiệp (16 TC) |
| Quy tắc riêng | Tự chọn II.2 tối thiểu 7 TC (thực tế 8), V.3 tối thiểu 9 TC | Thế kỷ 21: 8 TC từ ít nhất 2 nhóm; tự chọn khác 12 TC; học phần mã tạm (SAS20xx, SAS30xx) |

Sinh viên đăng nhập bằng email `@st.vju.ac.vn` và chọn lớp của mình. Giảng viên được cấp quyền xem tiến độ theo từng lớp hoặc cả 5 lớp, và tải về dạng CSV.

| Tệp | Nội dung |
|---|---|
| `index.html` | Trang lộ trình: sơ đồ cây, 8 học kỳ, cẩm nang tư vấn, kết quả học tập, cơ hội việc làm, theo dõi lớp (cả hai khung) |
| `viec-lam.txt` | Danh sách tin tuyển dụng hiện ở mục *Cơ hội việc làm*. Sửa tệp này để thêm tin |
| `HUONG-DAN-THEM-VIEC-LAM.md` | Cách thêm, ẩn, xoá tin tuyển dụng ngay trên GitHub |
| `nhap-diem.html` | Trang nhập bảng điểm cho quản trị viên (kéo thả tệp “Bảng điểm theo lớp” .xls), nhận K22–K26 |
| `diem.js` | Đọc bảng điểm, quy đổi điểm, tính GPA; bảng đối chiếu mã học phần `ALIAS` |
| `huong-dan.html` | Hướng dẫn cho sinh viên (gửi link này kèm link trang chính) |
| `firestore.rules` | Quy tắc bảo mật dữ liệu, dán vào Firebase |
| `HUONG-DAN-CAI-DAT-FIREBASE.md` | Hướng dẫn cài đặt chi tiết từng bước |

## Trang đang chạy: các bước để mở cho K26

Trang K22–K25 đã chạy với Firebase thì chỉ cần 3 bước, không phải tạo gì mới:

1. **GitHub:** tải lên đè các tệp `index.html`, `huong-dan.html`, `nhap-diem.html`, `firestore.rules`, `README.md` của thư mục này.
2. **Quy tắc bảo mật (bắt buộc):** Firebase Console → Firestore → tab **Rules**. Xoá nội dung cũ, dán toàn bộ tệp `firestore.rules` mới, rồi bấm **Publish**. Tệp mới chỉ thêm `K26` vào danh sách lớp. Nếu bỏ qua bước này, sinh viên K26 không lưu được tiến độ (trang báo “Chưa lưu được vào tài khoản”).
3. **Gửi link:** sinh viên K26 dùng chung link trang chính và link `huong-dan.html`, chọn lớp **K26** khi nhập thông tin lần đầu.

Trang K2026 riêng (thư mục `github-lo-trinh-NNTMBV-K2026`) không còn cần thiết nữa.

## Cách trang xử lý hai khung

- **Chọn khung theo lớp:** lớp K26 dùng khung K26, các lớp còn lại dùng khung K22–K25. Sơ đồ cây, 8 học kỳ, cẩm nang, điều kiện tốt nghiệp, nút định hướng và chú thích đều đổi theo.
- **Đổi lớp sang khung khác:** trang hỏi lại (phải bấm lớp đó hai lần). Khi chuyển, học phần không có trong khung mới bị bỏ khỏi tiến độ và định hướng phải chọn lại. Học phần có ở cả hai khung (cùng mã) được giữ.
- **Dữ liệu:** tiến độ K26 lưu chung bộ sưu tập `progress_k22_25` (trường `khoa` = `K26`); bảng điểm K26 lưu chung `grades_k22_25`. Tên bộ sưu tập giữ nguyên để không mất dữ liệu đã có.
- **Theo dõi lớp (giảng viên):** hàng nút *Chia lớp* có thêm K26. Khi chọn một lớp, các cột khối kiến thức theo khung của lớp đó (I–V hoặc 3 khối của K26). Khi xem *Tất cả các lớp*, bảng chỉ hiện tổng TC; tệp CSV có cột khối của cả hai khung, để trống ở khung không áp dụng. Giảng viên cũng bấm được nút lớp ở trang chính để xem sơ đồ, lộ trình và cẩm nang của từng khung.
- **Bảng điểm:** mã trên bảng điểm được đối chiếu theo khung của sinh viên. K22–K25 dùng bảng `ALIAS` trong `diem.js` (ví dụ SAS2030 → SAS2001); K26 dùng mã mới như trên bảng điểm; học phần K26 đang có mã tạm được nhận theo tên học phần.

## Các tính năng chung

- **Chia lớp:** sinh viên chọn lớp khi nhập thông tin lần đầu, và đổi được ở mục *Lớp của bạn*. Mục *Theo 8 học kỳ* ghi năm học của từng học kỳ theo lớp và đánh dấu học kỳ đang học theo lịch dự kiến.
- **Theo dõi lớp (giảng viên):** có cột GPA tích lũy và TC tích lũy từ bảng điểm, sắp xếp “GPA thấp trước”, đếm số SV có GPA dưới 2,00; bấm vào một sinh viên để mở trang riêng giống mục *Kết quả học tập* của sinh viên (GPA từng học kỳ, biểu đồ, điểm từng môn, môn cần học lại) kèm tiến độ lộ trình, có nút chuyển sang sinh viên trước/sau; tệp CSV có thêm cột GPA từng học kỳ. Sinh viên đã có bảng điểm nhưng chưa đăng nhập trang vẫn hiện trong bảng.
- **Kết quả học tập:** quản trị viên tải bảng điểm lên ở `nhap-diem.html`. Sinh viên xem điểm từng học phần, GPA từng học kỳ, GPA tích lũy, tín chỉ tích lũy và học phần cần học lại; học phần đã đạt được tự đánh dấu trên sơ đồ. Cách tính đã đối chiếu với bảng điểm ESAS2024: 68/70 GPA học kỳ khớp tuyệt đối, 2 lệch 0,01 do làm tròn; GPA tích lũy khớp cột TBC TL.

---

## Cài đặt mới · Cách 1 · Dùng chung dự án Firebase với trang K2026

Nếu trang K2026 đã chạy với Firebase, bạn không cần tạo dự án mới:

1. **GitHub:** tạo repository mới, ví dụ `lo-trinh-nntmbv-k22-k25`, tải lên tất cả các tệp của thư mục này. Bật **Settings → Pages** (Branch `main`, thư mục `/ (root)`).
2. **Cấu hình:** mở `index.html` của trang K2026, chép nguyên khối `FIREBASE_CONFIG`, rồi dán đè khối `FIREBASE_CONFIG` trong `index.html` của trang này.
3. **Quy tắc bảo mật:** Firebase Console → Firestore → tab **Rules**. Xoá nội dung cũ, dán toàn bộ tệp `firestore.rules` của thư mục này, rồi bấm **Publish**. Tệp mới vẫn giữ nguyên quy tắc của K2026 và thêm phần cho K22–K26.
4. **Tên miền:** nếu hai repo cùng một tài khoản GitHub thì tên miền `<tên-tài-khoản>.github.io` đã có trong *Authorized domains*, không cần thêm.
5. **Giảng viên:** dùng chung danh sách `lecturers`. Giảng viên đã có quyền ở trang K2026 thì tự có quyền ở trang này.
6. **Quản trị bảng điểm:** tạo collection `admins`, mỗi document có ID là email (viết thường) của người được nhập điểm. Xem mục *Nhập bảng điểm mỗi học kỳ* trong `HUONG-DAN-CAI-DAT-FIREBASE.md`.

## Cài đặt mới · Cách 2 · Tạo dự án Firebase riêng

Làm theo `HUONG-DAN-CAI-DAT-FIREBASE.md`. Các bước giống trang K2026, chỉ khác tên repo và tên dự án.

Chưa điền `FIREBASE_CONFIG` thì trang chạy ở **chế độ thử**: dùng được đầy đủ, nhưng tiến độ chỉ lưu trên trình duyệt.

## Kiểm tra trước khi gửi sinh viên

- [ ] Đăng nhập bằng một email `@st.vju.ac.vn`, nhập MSSV, họ tên, **chọn lớp**, đánh dấu vài môn. Dòng trạng thái phải báo “Đã lưu lúc …” và ghi “Lớp K..”.
- [ ] Tải lại trang: các môn đã đánh dấu và lớp vẫn còn.
- [ ] Đăng nhập bằng Gmail cá nhân (không có trong `lecturers`): trang phải báo “Email chưa đúng”.
- [ ] Thử với một sinh viên lớp **K26**: sơ đồ phải có 3 khối (41 · 109 · 15 TC) và 2 định hướng A, B; dòng trạng thái báo “Đã lưu lúc …”.
- [ ] Đăng nhập bằng email giảng viên, mở **Theo dõi lớp**: sinh viên thử hiện đúng lớp. Bấm nút lớp đó (thử cả K26), rồi thử **Tải CSV**.
- [ ] (Cách 1) Mở lại trang K2026, kiểm tra sinh viên K2026 vẫn lưu được.
- [ ] Gửi sinh viên **link trang chính** và **link `huong-dan.html`**.

## Quyền truy cập dữ liệu

| Người dùng | Đọc | Ghi |
|---|---|---|
| Sinh viên `@st.vju.ac.vn` | Chỉ tiến độ của mình | Chỉ tiến độ của mình |
| Sinh viên `MSSV@st.vju.ac.vn` | Bảng điểm có đúng MSSV đó | Không |
| Giảng viên trong `lecturers` | Tiến độ và bảng điểm cả 5 lớp | Không |
| Quản trị viên trong `admins` | Bảng điểm cả 5 lớp | Nhập bảng điểm |
| Email khác | Không | Không |

Không ai xoá được dữ liệu từ trang web. Quản trị viên xoá được trong Firebase Console (Firestore → Data → `progress_k22_25`).

## Lưu ý

- **Sinh viên phải mở bằng trình duyệt** (Chrome, Safari). Google chặn đăng nhập bên trong Zalo, Messenger và Facebook; trang tự nhắc khi phát hiện trường hợp này.
- **Năm học theo lớp:** trang tính năm nhập học = 2000 + số khóa (K25 → 2025). Học kỳ lẻ tính từ tháng 9 đến tháng 1, học kỳ chẵn từ tháng 2 đến tháng 8. Đây là lịch dự kiến, chỉ dùng để nhắc tiến độ.
- **Mã tạm (K26):** các học phần `SAS20xx`, `SAS30xx` chưa có mã chính thức. Khi có mã, chỉ sửa tham số đầu tiên (mã hiển thị) trong khối `P26` của `index.html` và giữ nguyên mã nội bộ ở tham số cuối (ví dụ `SAS20xx-vimo`), để tiến độ đã lưu không bị mất.
- **Mã trùng (K22–K25):** khung ESAS5 ghi cùng mã `SAS3048` cho *Tài chính nông nghiệp* (V.1) và *Thương mại điện tử nông sản* (V.2.3). Trang gắn nhãn “trùng mã” cho môn thứ hai. Khi có mã chính thức, chỉ sửa tham số đầu tiên (mã hiển thị) trong `index.html` và giữ nguyên mã nội bộ `SAS3048-TMDT` ở tham số cuối, để tiến độ đã lưu không bị mất.
- **Cập nhật khung chương trình:** dữ liệu nằm trong `index.html`, khối `P22` (K22–K25) và `P26` (K26). Mỗi khối có `TREE` (cấu trúc 165 TC), `ROAD` (lộ trình 8 học kỳ), `TODO` (việc cần làm từng học kỳ) và `TRK` (gợi ý cho từng định hướng); cẩm nang của từng khung ở hàm `guide22`/`guide26`, điều kiện tốt nghiệp ở `checks22`/`checks26`. Danh sách lớp nằm ở hằng `KHOAS`, lớp nào dùng khung nào ở hàm `progOf`. Muốn thêm lớp, sửa hai chỗ này trong `index.html`, danh sách `KHOAS` trong `nhap-diem.html` và danh sách `['K22', 'K23', 'K24', 'K25', 'K26']` trong `firestore.rules`.

Nguồn dữ liệu: ESAS5 – Khung chương trình đào tạo sau điều chỉnh (2024, Sheet1 và khối M2; sheet ESAS2026 cho K26), ESAS1 – Quyển chương trình đào tạo (mục 5.2 Lộ trình đào tạo), Cẩm nang tư vấn định hướng chuyên sâu NNTMBV và Cẩm nang tư vấn lộ trình học tập K2026.
