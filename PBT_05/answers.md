# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1: Viewport & Mobile-First

1. Thẻ `<meta viewport>` chuẩn:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích từng thuộc tính:
- `name="viewport"`: Chỉ định cho trình duyệt cách hiển thị trang trên mobile
- `content="width=device-width"`: Chiều rộng viewport = chiều rộng thiết bị, không zoom tự động
- `initial-scale=1.0`: Mức zoom ban đầu = 100%, không phóng to/thu nhỏ khi load

2. Nếu thiếu thẻ này, iPhone sẽ:
- Coi trang web như trang desktop
- Thu nhỏ xíu lại để hiển thị cả chiều rộng 980px
- Chữ nhỏ, nút bấm chồng lên nhau, phải zoom lên để đọc
- Phải scroll ngang liên tục

3. Mobile-First và Desktop-First:

Mobile-First:
```css
/* Mặc định cho mobile (màn hình nhỏ) */
.container {
    width: 100%;
}

.product-grid {
    grid-template-columns: 1fr;
}

/* Tablet trở lên */
@media (min-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
}
```

Desktop-First:
```css
/* Mặc định cho desktop */
.product-grid { grid-template-columns: repeat(4, 1fr); }

/* Tablet */
@media (max-width: 1023px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
}
```

Lý do Mobile-First được khuyên dùng là:
- Điện thoại tải ít CSS hơn nên khi sẽ tải nhanh hơn, nó chỉ tải CSS cần thiết
- Desktop thêm CSS để mở rộng layout = OK
- Ngược lại, Desktop-First sẽ bị phí tài nguyên
- SEO tốt hơn vì Google ưu tiên mobile-friendly hơn


## Câu A2: Breakpoints

| Breakpoint | Kích thước | Thiết bị | Grid sản phẩm |
|---|---|---|---|
| xs | < 576px | Điện thoại dọc (iPhone SE) | 1 cột |
| sm | 576px - 767px | Điện thoại ngang | 2 cột |
| md (Tablet) | 768px - 991px | iPad mini, iPad | 2 cột |
| lg (Desktop) | 992px - 1199px | Laptop nhỏ | 3-4 cột |
| xl (Desktop lớn) | ≥ 1200px | Màn hình 27" | 4-5 cột |


## Câu A3: Media Queries - Tính toán width

| Chiều rộng màn hình | `.container` width |
|---|---|
| 375px (iPhone SE) | 100% (không có min-width match) |
| 600px | 540px (match min-width: 576px) |
| 800px | 720px (match min-width: 768px) |
| 1000px | 960px (match min-width: 992px) |
| 1400px | 1140px (match min-width: 1200px) |


## Câu A4: SCSS Basics

### 4 tính năng chính của SCSS:

1. Variables - Biến CSS
```scss
$primary-color: #3182ce;
$secondary-color: #805ad5;
$font-size-base: 16px;
$spacing: 8px;

.btn { color: $primary-color; }
h1 { font-size: $font-size-base * 2; }
```
Lợi ích: Đổi 1 biến thì 100 chỗ dùng chung sẽ đổi theo. Quản lý màu sắc, font chung dễ.

2. Nesting - CSS lồng nhau
```scss
.navbar {
    background: #1a202c;

    ul {
        list-style: none;

        li {
            margin-right: 24px;

            a {

                color: white;

                &:hover {  // & = thẻ cha
                    color: $primary-color;
                }
            }
        }
    }
}
```
Lợi ích: Código rõ ràng hơn, dễ maintain, giảm lặp lại selector.

3. Mixins - Hàm CSS dùng chung
```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin responsive($breakpoint) {
    @if $breakpoint == tablet {
        @media (min-width: 768px) { @content; }
    }
}

.hero { @include flex-center; height: 100vh; }
.grid { @include responsive(tablet) { grid-template-columns: repeat(2, 1fr); } }
```
Lợi ích: DRY (Don't Repeat Yourself), tái sử dụng code CSS.

4. @extend / Inheritance - Kế thừa style
```scss
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    @extend .btn;
    background: $primary-color;
    color: white;
}

.btn-secondary {
    @extend .btn;
    background: $secondary-color;
    color: white;
}
```
Lợi ích: Tránh viết lại style cơ bản, giảm CSS lặp.

### Lý do trình duyệt không đọc file `.scss`:
- SCSS là ngôn ngữ lập trình, trình duyệt chỉ hiểu CSS thuần
- Cần compile SCSS → CSS trước khi dùng trên web

Cách compile:
- VS Code: Cài extension "Live Sass Compiler" → Click "Watch Sass"
- Terminal: `sass style.scss style.css --watch`
- Webpack/Vite: Tự động trong React/Vue project

# Phần B — THỰC HÀNH CODE

## BÀI B3 — SCSS Refactor

File structure đã tạo:
```
scss/
├── _variables.scss    (8 biến: color, font, spacing, breakpoint, radius, shadow, transition)
├── _mixins.scss       (7 mixins: respond-to, flex-center, card-shadow, smooth-transition, gradient-bg, truncate, btn-reset, absolute-center)
├── _components.scss   (Components: buttons, cards, forms, badges, grid, spacing utilities)
├── style.scss         (Main file - import tất cả)
└── style.css          (Compiled output)
```

Nesting example từ _components.scss:
```scss
.card {
    background-color: $bg-white;
    @include card-shadow;
    
    &__image {
        overflow: hidden;
        img {
            @include smooth-transition;
            &:hover { transform: scale(1.1); }
        }
    }
    
    &:hover {
        transform: translateY(-8px);
    }
}
```

Cách compile SCSS:
1. VS Code: Cài extension "Live Sass Compiler" → Click "Watch Sass" ở status bar
2. Terminal (nếu có npm/node):
   ```bash
   npm install -g sass
   cd d:\Nen\ tang\ phat\ trien\ Web\PBT_05
   sass scss/style.scss scss/style.css --watch
   ```
3. Online compiler: https://sass-lang.com/playground/

Kết quả: SCSS → CSS (loại bỏ @import, @mixin, v.v., tạo CSS thuần)

# PHẦN C — PHÂN TÍCH

## Câu C1: Phân tích trang web thực (Shopee)

### Phân tích Shopee trên 3 kích thước:

Mobile (375px):
- Navigation: Hamburger menu ☰ ở góc trái
- Logo + search bar chiếm toàn bộ width
- Danh mục sản phẩm: Slider ngang (1 category/slide), scroll ngang
- Product grid: 2 cột
- Sidebar filter: Ẩn (chuyển thành dropdown filter icon)
- Elements ẩn: Ads bar, quảng cáo bên phải
- Font size: Nhỏ (14px)

Tablet (768px):
- Navigation: Menu ngang hiển thị (Home, Danh mục, Deal, Dịch vụ)
- Search bar: Chiếm 60% width
- Product grid: 3 cột
- Sidebar filter: Hiển thị trên trái (chiều cao hạn chế)
- Font size: 15-16px

Desktop (1440px):
- Navigation: Menu ngang đầy đủ + dropdown categories
- Hero banner: Toàn bộ width
- Product grid: 5 cột
- Sidebar filter: Hiển thị đầy đủ bên trái
- Quảng cáo banner bên phải (320px fixed)
- Font size: 16px+

Media Queries tìm thấy:
1. `@media (max-width: 767px) { .navbar { display: none; } }`
2. `@media (min-width: 768px) and (max-width: 1023px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }`
3. `@media (min-width: 1024px) { .sidebar { width: 200px; } }`


## Câu C2: Thiết kế Responsive cho trang "Đặt bàn nhà hàng"

### Wireframe 3 kích thước:

Mobile (375px):
```
┌─────────────────────┐
│ ☰  NHÀ HÀNG ABC     │
├─────────────────────┤
│                     │
│    HERO IMAGE       │ (100% width, 200px height)
│   (Full width)      │
├─────────────────────┤
│  Grid ảnh món ăn    │ (1 cột, 150px height)
│  (1 cột)            │
├─────────────────────┤
│  FORM ĐẶT BÀN       │ (full width)
│  [Ngày] [Giờ]       │
│  [Số người] [Ghi]   │
│  [Đặt bàn]          │
├─────────────────────┤
│  Bản đồ Google      │
│  (full width)       │
├─────────────────────┤
│ Footer              │
└─────────────────────┘
```

Tablet (768px):
```
┌──────────────────────────────┐
│ ☰  NHÀ HÀNG ABC              │
├──────────────────────────────┤
│           HERO IMAGE (300px) │
├──────────────────────────────┤
│ Grid ảnh (2 cột, 150px)      │
├──────────────────────────────┤
│  FORM ĐẶT BÀN (2 cột input)  │
│  [Ngày input] [Giờ input]    │
│  [Số người] [Ghi chú]        │
│  [Đặt bàn]                   │
├──────────────────────────────┤
│ Bản đồ (full width)          │
├──────────────────────────────┤
│ Footer (2-3 cột)             │
└──────────────────────────────┘
```

Desktop (1024px+):
```
┌─────────────────────────────────────────┐
│ LOGO │ Menu: Trang chủ | Menu | Liên hệ │
├─────────────────────────────────────────┤
│                HERO BANNER (600px)      │
├──────────────────────┬──────────────────┤
│ Grid ảnh (3 cột)     │ FORM ĐẶT BÀN     │
│ 150px each           │ (Sidebar 300px)  │
│                      │                  │
├──────────────────────┴──────────────────┤
│ Bản đồ Google Maps (full width, 400px)  │
├─────────────────────────────────────────┤
│ Footer (4 cột)                          │
└─────────────────────────────────────────┘
```

### CSS Skeleton (Mobile-First):

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

body { font-family: Arial, sans-serif; }

/* Mobile: 1 cột, full width */
.header { display: flex; justify-content: space-between; padding: 16px; }
.hero { height: 200px; background-image: url(...); background-size: cover; }
.menu { display: none; }
.hamburger { display: block; }

.gallery { display: grid; grid-template-columns: 1fr; gap: 16px; padding: 20px; }
.gallery img { max-width: 100%; height: auto; }

.form { padding: 20px; }
.form input, .form select { width: 100%; padding: 10px; margin-bottom: 10px; }
.form button { width: 100%; padding: 12px; background: #ff6b6b; color: white; border: none; cursor: pointer; }

.map { width: 100%; height: 300px; }

.footer { background: #333; color: white; padding: 20px; text-align: center; }

/* Tablet: 768px */
@media (min-width: 768px) {
    .header { justify-content: space-around; }
    .menu { display: flex; }
    .hamburger { display: none; }
    .hero { height: 300px; }
    .gallery { grid-template-columns: repeat(2, 1fr); }
    
    .form-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
}

/* Desktop: 1024px */
@media (min-width: 1024px) {
    .container { display: grid; grid-template-columns: 1fr 300px; gap: 20px; }
    .gallery { grid-template-columns: repeat(3, 1fr); }
    .hero { height: 400px; }
    .footer { display: grid; grid-template-columns: repeat(4, 1fr); text-align: left; }
}
```

Elements ẩn trên Mobile:
- Menu ngang (chuyển thành hamburger)
- Sidebar quảng cáo
- Footer 4 cột (chuyển 1 cột stack)