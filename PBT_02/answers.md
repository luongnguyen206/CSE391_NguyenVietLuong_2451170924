## PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1: (Tài liệu: 07_forms_interactive.md)
1. `type="email"`
- Ô nhập text bình thường (máy tính desktop), bàn phím @/. (mobile); Validation: tự kiểm tra định dạng email (phải có @ và domain) → Dùng cho Form đăng ký, đăng nhập, quên mật khẩu.

2. `type="password"`
- Ô nhập text nhưng ẩn các ký tự thành dấu '•'; Validation: minlength, maxlength, pattern → Dùng cho Form đăng ký, đăng nhập tài khoản.

3. `type="tel"`
- Bàn phím số (mobile), text thường (máy tính desktop); Validation: pattern (kiểm tra định dạng) → Dùng cho Form đăng ký, thông tin giao hàng, liên hệ.

4. `type="number"`
- Ô nhập với nút +/- tăng giảm; Validation: min, max, step → Dùng để chọn số lượng sản phẩm, chiều cao cỡ áo,... .

5. `type="date"`
- Date picker (lịch pop-up); min, max (giới hạn khoảng ngày) → Dùng để chọn ngày sinh, ngày giao hàng mong muốn,... .

6. `type="color"`
- Bảng chọn màu pop-up; Validation: tự trả về hex color → Dùng để chọn màu sản phẩm (iPhone trắng/đen/vàng).

7. `type="file"`
- Nút "Chọn file", accept + multiple; Validation: accept (jpg, pdf...), multiple → Dùng để upload ảnh đánh giá, hóa đơn, avatar.

8. `type="range"`
- Slider kéo trái phải; Validation: min, max, step → Dùng để lọc giá (từ 1M - 50M), độ tuổi, đánh giá sao.

9. `type="search"`
- Ô tìm kiếm + nút X xóa; Validation: minlength, maxlength, pattern → Ô tìm kiếm sản phẩm, search bài viết blog,... .

10. `type="url"`
- Ô nhập text, bàn phím http://. (mobile); Validation: Tự kiểm tra URL hợp lệ (phải có http:// hoặc https://) → Website nhân viên, link social media, liên kết đối tác.

## Câu A2: (Tài liệu: 07_forms_interactive.md)
- Trường hợp 1: `<input type="text" required value="">`; User để trống
→ Dự đoán: Không cho submit. Hiển thị thông báo "Vui lòng điền trường này".
→ Vì required bắt buộc phải có giá trị, value="" là trống nên không hợp lệ.

- Trường hợp 2: `<input type="email" value="abc">`; User gõ "abc"
→ Dự đoán: Không cho submit. Hiển thị thông báo "Vui lòng nhập email hợp lệ" hoặc "Vui lòng điền @ trong địa chỉ email".
→ Vì type="email" kiểm tra định dạng. "abc" không có @ nên không hợp lệ.

- Trường hơp 3: `<input type="number" min="1" max="10" value="15">`; User gõ 15
→ Dự đoán: Không cho submit. Hiển thị thông báo "Vui lòng nhập số không vượt quá 10".
→ Vì max="10" giới hạn tối đa, value="15" vượt quá nên không hợp lệ.

- Trường hợp 4: `<input type="text" pattern="[0-9]{10}" value="abc123">`; User gõ "abc123"
→ Dự đoán: Không cho submit. Hiển thị thông báo "Vui lòng nhập đúng định dạng yêu cầu"
→ Vì `pattern="[0-9]{10}"` yêu cầu chính xác 10 chữ số. "abc123" = 6 ký tự + chữ cái nên Không đúng.

- Trường hợp 5: `<input type="password" minlength="8" value="123">`; User gõ "123"
→ Dự đoán: Không cho submit. Hiển thị thông báo "Tối thiểu 8 ký tự".
→ Vì minlength="8" yêu cầu tối thiểu 8 ký tự, value="123" chỉ có 3 nên không đủ.

## Câu A3: (Tài liệu: 07_forms_interactive.md)
1. Vì không có label, screen reader chỉ đọc "edit text box" nên người dùng mù không biết ô này để nhập gì còn có label thì screen reader sẽ đọc "Email, edit text" giúp người dùng biết đang điền gì. Với `<label for="email">` thì khi click vào chữ "Email:" cũng focus vào input của email.

2. Ta dùng `<fieldset>` + `<legend>`:
- Khi có nhiều input cùng một chủ đề, vd:
```html
<fieldset>
  <legend>Thông tin cá nhân</legend>

  <label for="name">Tên</label>
  <input id="name" type="text">

  <label for="email">Email</label>
  <input id="email" type="email">
</fieldset>
```
- Khi có câu hỏi + nhiều lựa chọn, vd:
```html
<fieldset>
  <legend>Bạn thích ngôn ngữ nào?</legend>

  <label><input type="radio" name="lang"> C++</label>
  <label><input type="radio" name="lang"> Java</label>
  <label><input type="radio" name="lang"> Python</label>
</fieldset>
```

3. Ta dùng `aria-label` khi:
- Input không có text label hiển thị, vd:
```html
<button aria-label="Đóng">
  ❌
</button>
```
- Khi cần mô tả bổ sung ngắn gọn, vd:
```html
<button aria-label="Xóa sản phẩm khỏi giỏ hàng">
  🗑️
</button>
```
Ta không dùng `aria-label` khi đã có `label` vì chính `label` đã cung cấp text cho screen reader rồi nên `aria-label` sẽ lại ghi đè và dư thừa.

## Câu A4:
1. `loading="lazy"` giúp trang không tải toàn bộ ảnh khi truy cập mà chỉ khi nào lướt tới thì ảnh mới được tải, giúp tốc độ tải trang nhanh hơn.
Không nên dùng `loading="lazy"` khi ảnh ở trên cùng trang và những ảnh quan trọng cho SEO.

2. Lý do nên cung cấp nhiều `<source>` trong `<video>`:
- Tương thích trình duyệt vì không phải trình duyệt nào cũng hỗ trợ tất cả format.
- Nếu có file source bị lỗi thì vẫn còn các source khác để dùng.
Format phổ biến được dùng:
- MP4
- WebM
- Ogg

3. `alt` là thuộc tính dùng để mô tả hình ảnh khi dùng screen reader hay khi ảnh không load được
- Ảnh sản phẩm iPhone 16:
`<img src="iphone.jpg" alt="iPhone 16 Pro Max 256GB màu Titan Grey">`
- Ảnh trang trí:
`<img src="decoration.jpg" alt="">`
- Ảnh biểu đồ doanh thu Q1/2026:
`<img src="chart.jpg" alt="Biểu đồ doanh thu Q1 2026: 50 tỉ Q1 (tăng 20% so với Q4 2025)">`

## Câu A5:
- `<img>`: chỉ là chèn hình ảnh (nội dung độc lập, không cần chú thích hiển thị)
- `<figure>`: dùng khi ảnh cần chú thích/caption là một “khối nội dung có ngữ nghĩa”

Ta dùng cách 1 khi:
- Ảnh đứng một mình
- Không cần chú thích hiển thị
- Thường là ảnh minh họa, UI, thumbnail
vd: Ảnh sản phẩm trong danh sách: `<img src="iphone.jpg" alt="iPhone 16 Pro Max">`

Ta dùng cách 2 khi:
- Có caption giải thích / bổ sung
- Ảnh + caption là một đơn vị nội dung
vd: Bài blog / tin tức có ảnh minh họa

## PHẦN B — THỰC HÀNH CODE
## Câu B1:
HTML không thể validate confirm password vì với mỗi input nó chỉ kiểm tra giá trị được nhập vào của chính input đó và không thể truy cập được vào input khác nên không thể so sánh và confirm.

## PHẦN C — PHÂN TÍCH & SUY LUẬN
## Câu C1:
- Lỗi 1: Dòng 2 - Input "Tên" không có `<label>`.
Sửa:
```html
<label for="name">`Tên:`</label>
<input type="text" id="name" name="name" required>
```

- Lỗi 2: Dòng 4 - Email không có label, input không có id.
Sửa: 
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required placeholder="Email của bạn">
```

- Lỗi 3: Dòng 6 - Password không có label, không có id, không có validation, không có pattern để kiểm tra mật khẩu đủ mạnh hay chưa.
Sửa: 
```html
<label for="pass">Mật khẩu:</label>
<input type="password" id="password" name="password" minlength="8" 
                   placeholder="Nhập password"
                   pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}" title="Ít nhất 8 ký tự, 1 chữ hoa và 1 số" required>
```

- Lỗi 4: Dòng 7 - Confirm password không có id, không có name, không validate.
Sửa:
```html
<label for="confirm">Xác nhận mật khẩu:</label>
<input type="password" id="confirm" name="confirm" minlength="8" required placeholder="Nhập lại mật khẩu">
```

- Lỗi 5: Dòng 8 - Phone không có label, input dùng `type="text"` thay vì `type="tel"`, không có pattern.
Sửa:
```html
<label for="phone">Số điện thoại:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required placeholder="0901234567">
```

- Lỗi 6: Dòng 10 - Select không có id, `<label>` không có for, không có name.
Sửa:
```html
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
  <option value="HaNoi">Hà Nội</option>
  <option value="TPHCM">TP.HCM</option>
```

- Lỗi 7: Dòng 15 - Checkbox label không có id, không có input, không có required.
Sửa:
```html
<label>
  <input type="checkbox" name="agree" required> Tôi đồng ý điều khoản
</label>
```

- Lỗi 8: Dòng 19 - Submit button dùng type="submit" value="Gửi" không có aria-label
Sửa:
```html
<button type="submit" aria-label="Gửi biểu mẫu">Gửi</button>
```

## Câu C2:
1. `pattern` regex cho CMND/CCCD và Số tài khoản:
- CMND/CCCD (12 chữ số):`pattern="^\d{12}$"`
- Số tài khoản (10–15 chữ số): `pattern="\d{10,15}$"`

2. HTML5 validation (như required, pattern, type="email") chỉ là cơ chế kiểm tra dữ liệu ngay trên trình duyệt để giúp người dùng nhập đúng định dạng và tránh gửi form sai. Tuy nhiên, nó không đủ an toàn cho các ứng dụng quan trọng như ngân hàng, vì toàn bộ quá trình này diễn ra ở phía client – nơi người dùng hoàn toàn có thể can thiệp. Chẳng hạn, họ có thể tắt validation, chỉnh sửa mã HTML bằng công cụ trình duyệt, hoặc gửi dữ liệu trực tiếp bằng các phần mềm như Postman để vượt qua mọi kiểm tra phía giao diện.

3. 3 loại validation HTML5 không thể làm được (phải dùng JavaScript):
- Kiểm tra 2 trường liên quan nhau
- Kiểm tra theo thời gian thực/dữ liệu động
- Kiểm tra logic phức tạp

4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:
- Hacker có thể gửi dữ liệu sai hoặc độc hại trực tiếp lên server
- Có thể dẫn đến các lỗ hổng như SQL Injection hoặc Cross-Site Scripting nếu backend không kiểm tra lại.