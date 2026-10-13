# Hướng dẫn thêm tin tuyển dụng vào mục “Cơ hội việc làm”

Tất cả tin tuyển dụng nằm trong **một tệp chữ thường: `viec-lam.txt`**. Trang web tự đọc tệp này, nên khi có tin mới bạn chỉ sửa tệp đó, **không cần sửa `index.html`**.

## Thêm tin mới (làm trên trình duyệt, khoảng 3 phút)

1. Mở repository trên GitHub, bấm vào tệp **`viec-lam.txt`**.
2. Bấm biểu tượng **bút chì** (Edit this file) ở góc phải.
3. Tìm dòng `# ===== TIN TUYỂN DỤNG =====`. Ngay bên dưới dòng đó, dán đoạn sau và sửa nội dung:

   ```
   Công ty: Tên công ty
   Website: https://...
   Vị trí: Thực tập sinh
   Hình thức: Hybrid – vừa online vừa onsite
   Địa điểm: Hà Nội
   Ngày đăng: 20/10/2026
   Hạn nộp: 30/11/2026
   Liên hệ: Cô ... – email@vju.ac.vn
   Nội dung:
   Mô tả công việc, yêu cầu, quyền lợi.
   Có thể viết nhiều dòng.
   ---
   ```

4. Bấm nút xanh **Commit changes…**, rồi bấm **Commit changes** lần nữa.
5. Đợi 1–2 phút, tải lại trang web, chọn **Cơ hội việc làm** để kiểm tra.

## Quy tắc cần nhớ

| Việc | Cách làm |
|---|---|
| Ngăn cách hai tin | Một dòng chỉ có ba dấu gạch `---` |
| Không có thông tin cho một dòng | Xoá dòng đó đi (ví dụ chưa có hạn nộp) |
| Viết ngày | `ngày/tháng/năm`, ví dụ `05/11/2026` |
| Tin mới lên đầu | Trang tự sắp xếp theo *Ngày đăng*, mới nhất ở trên |
| Nhãn “Mới” | Tự hiện với tin đăng trong vòng 30 ngày |
| Tin hết hạn | Tự chuyển xuống cuối, mờ đi, ghi “Đã hết hạn” |
| Tạm ẩn tin | Thêm dòng `Ẩn: có` vào tin đó |
| Xoá hẳn tin | Xoá từ dòng `Công ty:` đến dòng `---` của tin đó |
| Link, email | Viết thẳng vào, trang tự biến thành link bấm được |
| Ghi chú riêng | Dòng bắt đầu bằng `#` không hiện lên trang |

Sau dòng `Nội dung:` bạn viết tự do, kể cả các dòng có dấu hai chấm (ví dụ `Lịch làm việc: thứ 2–6`).

## Khi trang báo “Chưa tải được danh sách tin”

- Nếu mở tệp `index.html` trực tiếp trên máy (đường dẫn bắt đầu bằng `file://`), trình duyệt sẽ chặn đọc `viec-lam.txt`. Hãy xem trên link GitHub Pages.
- Kiểm tra tên tệp phải đúng là `viec-lam.txt` và nằm cùng thư mục với `index.html`.

## Ai xem được mục này?

Mục *Cơ hội việc làm* nằm trong trang lộ trình, nên chỉ sinh viên đã đăng nhập (và giảng viên) mới thấy. Tuy nhiên, tệp `viec-lam.txt` trong một repository công khai thì ai có link cũng đọc được. Vì vậy **không ghi số điện thoại cá nhân hay thông tin nội bộ** vào tệp này; hãy để sinh viên liên hệ qua email trường hoặc qua giảng viên.
