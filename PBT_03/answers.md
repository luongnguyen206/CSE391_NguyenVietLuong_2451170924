# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1: (Tài liệu: 08_introduction_css.md)
Có 3 cách để nhúng CSS:

1. Inline CSS (trong thẻ):
```html
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
```
- Ưu điểm: Nhanh, áp dụng ngay lập tức
- Nhược điểm: Khó tái sử dụng, specificity cao, vi phạm separation of concerns
- Khi dùng: Debug nhanh

2. Internal CSS (trong phần thẻ `<style>`):
```html
<head>
    <style>
        h1 {
            color: red;
            font-size: 24px;
        }
    </style>
</head>
```
- Ưu điểm: Tập trung CSS ở một nơi, áp dụng cho toàn trang
- Nhược điểm: Không tái sử dụng giữa các page, HTML file nặng
- Khi dùng: Prototype, single page

3. External CSS (file riêng):
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
- Ưu điểm: Tái sử dụng, browser cache, clean code, team collaboration
- Nhược điểm: HTTP request thêm
- Khi dùng: dùng được cho mọi dự án, muốn tái sử dụng nhiều

Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, Thì thứ tự ưu tiên là: Inline > Internal > External. Vì: Inline CSS có specificity cao nhất, được trình duyệt coi là ưu tiên cực cao. Internal và External cả hai đều là CSS bình thường, nếu cùng selector, thì cái nào được load sau sẽ thắng.

## Câu A2: (Tài liệu: 09_css_selectors.md)
1. `h1`                           → Chọn: "ShopTLU"
2. `.price`                       → Chọn: "25.990.000đ" và "45.990.000đ"
3. `#app header`
→ Chọn: 
```html
<header class="top-bar dark">
    <h1>ShopTLU</h1>
    <nav>
        <a href="/" class="active">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
    </nav>
</header>
```
4. `nav a:first-child`             → Chọn: `<a href="/" class="active">Home</a>`
5. `.product.featured h2`         → Chọn: `<h2>MacBook Pro</h2>`
6. `article > p`                  → Chọn: Tất cả `<p>` là CON TRỰC TIẾP của `<article>`
```html
        <article class="product">
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
```
7. `a[href="/"]`                  → Chọn: `<a href="/" class="active">Home</a>`
8. `.top-bar.dark h1`              → Chọn: `<h1>ShopTLU</h1>`

## Câu A3:
```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400 + (20×2) + (5×2) = 400 + 40 + 10 = 450px
→ Không gian chiếm trên trang = 450 + (10×2) = 450 + 20 = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400
→ Kích thước content thực tế = 400 - (20x2) - (5x2) = 350px
→ Không gian chiếm trên trang = 400 + (10x2) = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ Khi 2 margin dọc gặp nhau, không cộng lại mà lấy giá trị lớn nhất
```
Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách = 40 + (-10) = 30px

## Câu A4:
1. Tính specificity score:
- Rule A: (0, 0, 1)
- Rule B: (0, 1, 0)
- Rule C: (1, 0, 0)
- Rule D: (0, 1, 1)

2. Vì rule C có thứ tự ưu tiên cao nhất trong các rule trên nên Element sẽ có màu red.

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu cam vì với inline style có specificity 1000 cao hơn cả ID.

4. Nếu Rule A thêm `!important`, element có màu đen vì `!important` có ưu tiên cao nhất.

# PHẦN B — THỰC HÀNH CODE
## Câu B1:
Các loại selectors sử dụng:
- Adjacent Sibling
- Descendant

## Câu B2:
Hộp 1 (content-box): chiều rộng thực tế = 350px

Hộp 2 (border-box): chiều rộng thực tế = 300px

Giải thích sự khác biệt:
- Với content-box, width chỉ tính phần content, nên padding và border sẽ cộng thêm vào kích thước thực tế.
- Với border-box, width đã bao gồm cả padding và border, nên kích thước hiển thị không thay đổi.

## Câu B3:
Element cuối cùng hiển thị màu vàng.
hay đổi thứ tự rules trong CSS file. Kết quả không thay đổi vì CSS ưu tiên theo thứ tự: !important, Specificity, Source order (thứ tự).

# PHẦN C — DEBUG & SUY LUẬN
## Câu C1:
1. Tính chiều rộng THỰC TẾ (content-box):
Sidebar thực tế:

width: 300px
padding: 20px × 2 = 40px
border: 1px × 2 = 2px
Tổng = 300 + 40 + 2 = 342px
Content thực tế:

width: 660px
padding: 30px × 2 = 60px
border: 1px × 2 = 2px
Tổng = 660 + 60 + 2 = 722px
Tổng cộng: 342 + 722 = 1064px

2.CSS mặc định dùng `box-sizing: content-box`, nên `width` chỉ tính phần content, không gồm padding + border. Khi thêm padding + border, kích thước thực tế phình to và vượt khỏi container nên bị xé.

3.**2 cách sửa** khác nhau (1 cách dùng border-box, 1 cách không dùng):
- Cách 1:
```css
* {
    box-sizing: border-box;
}

.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

- Cách 2:
```css
.container {
    width: 960px;
    margin: 0 auto;
}

.sidebar {
    width: 280px;
    padding: 20px;
    border: 1px solid;
    float: left;
}
.content {
    width: 628px;
    padding: 30px;
    border: 1px solid;
    float: left;
}
```

## Câu C2:
1. "Sản phẩm A" (h2) có:
- `.title` được 20px từ `.card .title` selector → `font-size` = 20px 
- `color` = green:
+ `.card { color: blue; }` → h2 không kế thừa
+ `#featured .title { color: red; }` → Specificity 1,1,0 = 100
+ `.highlight { color: green !important; }` → Specificity 0,1,0 với !important nên `color` = green

2. color:
- `.card p { color: inherit; }` → kế thừa từ .card
- `.card { color: blue; }` không chỉ định cho p nhưng qua inherit
- **→ color = BLUE** kế thừa từ .card do inherit

3. font-size ANSWER:
- **→ font-size = 20px** (từ .card .title)

color ANSWER:
- `.card { color: blue; }` nhưng h2 không kế thừa color từ .card
- `body { color: #333; }` → h2 kế thừa từ body
- **→ color = #333** (từ body)

4. color ANSWER:
- `.highlight { color: green !important; }` ← Specificity ∞
- `.card p { color: inherit; }` ← Specificity 0,1,1
- `!important` thắng
- **→ color = GREEN**