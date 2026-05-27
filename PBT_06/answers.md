# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1: Grid System

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

**Bảng Layout:**

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Breakpoint | xs | md | lg |
| Số cột trên 1 hàng | 1 cột | 2 cột | 4 cột |

**Box Layout:**

**Mobile (< 768px) — 1 cột:**
```
┌─────────────┐
│   Box 1     │
├─────────────┤
│   Box 2     │
├─────────────┤
│   Box 3     │
├─────────────┤
│   Box 4     │
└─────────────┘
```

**Tablet (768px - 991px) — 2 cột:**
```
┌──────────┬──────────┐
│  Box 1   │  Box 2   │
├──────────┼──────────┤
│  Box 3   │  Box 4   │
└──────────┴──────────┘
```

**Desktop (≥ 992px) — 4 cột:**
```
┌────┬────┬────┬────┐
│ B1 │ B2 │ B3 │ B4 │
└────┴────┴────┴────┘
```

**Giải thích chi tiết:**
- `col-md-6` = "Column Medium 6" — Trên màn hình ≥ 768px (tablet+), chiếm 6 cột trong 12 cột = 50% chiều rộng
- `md` là breakpoint Medium (≥ 768px)
- `6` là số cột Bootstrap (tổng 12 cột)

### Tại sao không cần viết `col-sm-12`?
**Quy tắc cascading của Bootstrap:**
- Nếu không chỉ định class cho breakpoint nhỏ hơn, nó sẽ mặc định chiếm **100% chiều rộng** (full width)
- Ví dụ: `col-12 col-md-6 col-lg-3` có nghĩa:
  - `col-12`: Trên xs (< 576px), chiếm 12 cột = 100%
  - `col-md-6`: Trên md (≥ 768px), chiếm 6 cột = 50%
  - `col-lg-3`: Trên lg (≥ 992px), chiếm 3 cột = 25%
- Breakpoints giữa (sm, không viết) sẽ tự động kế thừa từ lớp trước đó
- Do đó không cần viết `col-sm-12` vì nó đã là mặc định


## Câu A2: Utilities & Components

### 1. Class `d-none d-md-block` — Khi nào hiển thị, khi nào ẩn?

| Breakpoint | Kích thước | Trạng thái | Giải thích |
|------------|-----------|-----------|-----------|
| **xs** (Mobile) | < 576px | ❌ Ẩn | `d-none` = `display: none` |
| **sm** | 576px - 767px | ❌ Ẩn | Kế thừa từ xs, vẫn ẩn |
| **md** (Tablet) | 768px - 991px | ✅ Hiển thị | `d-md-block` = `display: block` |
| **lg** (Desktop) | 992px - 1199px | ✅ Hiển thị | Kế thừa từ md, vẫn hiển thị |
| **xl** + | ≥ 1200px | ✅ Hiển thị | Kế thừa từ lg, vẫn hiển thị |

**Use case thực tế:**
- Ẩn menu fullscreen trên mobile (thay bằng hamburger menu)
- Hiển thị sidebar riêng trên desktop
- Ẩn banner quảng cáo trên mobile để tiết kiệm không gian


### 2. Liệt kê 5 Spacing Utilities

| Utility | CSS tương đương | Giá trị | Use case |
|---------|-----------------|--------|----------|
| `mt-3` | `margin-top: 1rem` | 16px | Thêm khoảng cách từ trên |
| `px-4` | `padding-left: 1.5rem; padding-right: 1.5rem` | 24px (trái+phải) | Padding ngang (card, button) |
| `mb-auto` | `margin-bottom: auto` | auto | Đẩy element xuống đáy (flex layout) |
| `p-2` | `padding: 0.5rem` | 8px (all) | Padding toàn bộ (nhỏ) |
| `ms-5` | `margin-left: 3rem` | 48px | Margin trái (indent, sidebar) |

**Giải thích chi tiết:**
- `m` = margin (khoảng cách ngoài)
- `p` = padding (khoảng cách trong)
- Direction: `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (left+right), `y` (top+bottom)
- Size: `0-5` với `0=0`, `1=0.25rem`, `2=0.5rem`, `3=1rem`, `4=1.5rem`, `5=3rem`
- `auto` = auto (chỉ dùng với margin)

**Ví dụ kết hợp:**
```html
<!-- Card với padding và margin -->
<div class="card m-3 p-4">
  <h5 class="card-title mb-2">Tiêu đề</h5>
  <p class="card-text">Nội dung...</p>
</div>
```


### 3. Sự khác nhau: `.container` vs `.container-fluid` vs `.container-md`

| Container | Max-width | Responsive | Dùng khi | CSS |
|-----------|-----------|------------|----------|-----|
| **`.container`** | Cố định theo breakpoint | ✅ Có, tự động shrink | Nội dung chính, giữ content đơn | `@media (min-width: 1200px) { max-width: 1140px; }` |
| **`.container-fluid`** | 100% luôn | ✅ Có, luôn full width | Hero banner, footer, background tràn hết | `width: 100%` |
| **`.container-md`** | ≥ 768px mới có max-width | ✅ Có, từ md trở lên | Section muốn full width trên mobile | `@media (min-width: 768px) { max-width: 720px; }` |

**Max-width cụ thể của `.container`:**
```
xs (< 576px):   100% (full width)
sm (≥ 576px):   540px
md (≥ 768px):   720px
lg (≥ 992px):   960px
xl (≥ 1200px):  1140px
xxl (≥ 1400px): 1320px
```

**Ví dụ sử dụng:**
```html
<!-- Navbar: tràn hết màn hình -->
<nav class="navbar bg-dark">
  <div class="container-fluid">
    <span class="navbar-brand">Logo</span>
  </div>
</nav>

<!-- Hero section: full width -->
<section class="bg-primary text-white py-5">
  <div class="container-fluid">
    <h1>Welcome</h1>
  </div>
</section>

<!-- Main content: max-width hợp lý -->
<main class="container py-5">
  <div class="row">
    <div class="col-md-8">Article content...</div>
  </div>
</main>
```


# PHẦN C — SUY LUẬN

## Câu C1: Tùy biến Bootstrap

### 1. Quy trình đổi `$primary` từ xanh sang `#E63946`

**Bước 1: Chuẩn bị môi trường**
```bash
npm install bootstrap sass
```

**Bước 2: Tạo file `custom.scss`**
```scss
// custom.scss

// 1️⃣ Override variables TRƯỚC khi import Bootstrap
$primary: #E63946;  // Đổi từ xanh (#0d6efd) sang đỏ

// 2️⃣ Import Bootstrap (sẽ dùng $primary mới)
@import "bootstrap/scss/bootstrap";
```

**Bước 3: Cấu hình build (package.json)**
```json
{
  "scripts": {
    "sass": "sass custom.scss style.css",
    "sass:watch": "sass --watch custom.scss:style.css"
  }
}
```

**Bước 4: Build CSS**
```bash
npm run sass:watch
```

**Bước 5: Import vào HTML**
```html
<link rel="stylesheet" href="style.css">
```

**Kết quả:**
- `btn-primary` → Nền đỏ `#E63946`
- `text-primary` → Chữ đỏ
- `bg-primary` → Background đỏ
- Tất cả `.btn-primary`, `.bg-primary`, v.v. đổi thành `#E63946`

### 2. Tại sao KHÔNG override trực tiếp CSS?

❌ **Cách sai — Override CSS trực tiếp:**
```css
.btn-primary {
  background: red !important;
}
```

**Vấn đề:**
- Phải dùng `!important` (không tốt)
- Phải override từng component riêng (`.btn-primary`, `.bg-primary`, `.text-primary`, `.border-primary`, v.v.)
- Nếu tạo component mới, lại phải thêm CSS
- Khó maintain, dễ bị conflict
- Bundle size CSS lớn hơn

✅ **Cách đúng — Dùng SASS variables:**
```scss
$primary: #E63946;
@import "bootstrap/scss/bootstrap";
```

**Lợi ích:**
- Chỉ cần đổi **1 dòng** `$primary`
- Bootstrap tự động generate tất cả `.btn-primary`, `.bg-primary`, `.text-primary`, `.border-primary`, v.v. với màu mới
- Không cần `!important`
- Toàn bộ semantic — nếu sau này cần đổi lại, chỉ sửa variable
- Bundle size nhỏ hơn (Bootstrap compile tối ưu)


## Câu C2: So sánh CSS thuần vs Bootstrap

### Scenario: Viết Navbar responsive + Product Card

#### A. CSS Thuần

**HTML (Navbar):**
```html
<nav class="navbar">
  <div class="navbar-brand">Logo</div>
  <ul class="navbar-menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Products</a></li>
  </ul>
  <button class="hamburger">☰</button>
</nav>
```

**CSS (Navbar - Thuần):**
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  position: sticky;
  top: 0;
}

.navbar-brand {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-menu a:hover {
  color: #ffaa00;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: #333;
    padding: 1rem;
    gap: 0;
    width: 100%;
  }
  
  .hamburger {
    display: block;
  }
}
```
**CSS Lines: ~60 dòng**

**HTML (Product Card):**
```html
<div class="card">
  <img src="product.jpg" class="card-img" alt="Product">
  <div class="card-body">
    <h5 class="card-title">Product Name</h5>
    <p class="card-description">Description...</p>
    <div class="card-footer">
      <span class="price">$29.99</span>
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
```

**CSS (Product Card - Thuần):**
```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
  max-width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.card-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6600;
}

.btn-primary {
  background: #0066cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #0052a3;
}
```
**CSS Lines: ~50 dòng**

**Tổng CSS thuần: ~110 dòng**


#### B. Bootstrap

**HTML (Navbar):**
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Products</a></li>
      </ul>
    </div>
  </div>
</nav>
```
**CSS Lines: 0 (dùng toàn Bootstrap)**

**HTML (Product Card):**
```html
<div class="card shadow-sm">
  <img src="product.jpg" class="card-img-top" alt="Product">
  <div class="card-body">
    <h5 class="card-title">Product Name</h5>
    <p class="card-text">Description...</p>
    <div class="d-flex justify-content-between align-items-center">
      <span class="fs-5 fw-bold text-warning">$29.99</span>
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
```
**CSS Lines: 0 (dùng toàn Bootstrap)**

**Tổng CSS Bootstrap: 0 dòng (toàn utility classes)**


### Bảng So Sánh

| Tiêu chí | CSS Thuần | Bootstrap |
|----------|-----------|-----------|
| **Dòng CSS cần viết** | ~110 dòng | 0 dòng |
| **Thời gian phát triển** | 2-3 giờ | 20 phút |
| **Testing (responsive)** | Phải test thủ công | Bootstrap đã test sẵn |
| **Code reusability** | Phải tạo base classes mới | Có sẵn components |
| **Responsive implementation** | Phải viết media queries | Có sẵn breakpoints |
| **Browser compatibility** | Phải kiểm tra từng trình duyệt | Bootstrap xử lý sẵn |
| **Customization** | Dễ (toàn bộ quyền kiểm soát) | Khó (bị giới hạn design) |
| **UI consistency** | Phải đảm bảo thủ công | Tự động nhất quán |
| **Bundle size** | Nhỏ (chỉ CSS cần dùng) | Lớn (toàn Bootstrap: ~30KB gzip) |
| **Learning curve** | Cần hiểu CSS sâu | Dễ học, có documentation |



### KHI NÀO NÊN và KHÔNG NÊN Dùng Bootstrap?

#### ✅ NÊN DÙNG Bootstrap khi:

1. **Prototype/MVP nhanh:** Deadline gắt, cần demo nhanh
   - Admin dashboard, internal tools
   - Startup MVP

2. **Không có designer:** Team nhỏ, không có designer UI
   - Cần design "decent" (không lôi thôi)

3. **Team không giỏi CSS:** Focuson business logic hơn styling
   - Cần component phức tạp (Modal, Dropdown, Carousel)

4. **Cần components phức tạp:** Bootstrap đã built-in
   - Navbar responsive + hamburger menu
   - Modal dialogs
   - Form validation

5. **Cross-browser consistency:** Bắt buộc hoạt động trên mọi trình duyệt
   - Enterprise apps
   - Banking websites

**Ví dụ:** Admin dashboard, CMS, internal tools → dùng Bootstrap

#### ❌ KHÔNG NÊN DÙNG Bootstrap khi:

1. **Cần design độc đáo, khác biệt:**
   - Brand cạnh tranh (startup, design agency)
   - Customization sâu → lại phải override CSS → mất lợi ích

2. **Performance quan trọng:**
   - Mobile-first app (cần bundle size nhỏ)
   - Bootstrap CSS: 30KB+ gzip
   - Thay vào đó dùng **TailwindCSS** (CSS on-demand, 1-5KB)

3. **Dự án đơn giản:** Chỉ cần vài components
   - Cộng thêm toàn bộ Bootstrap lớn (overkill)
   - Viết CSS thuần còn nhanh hơn

4. **Muốn học CSS từ đầu:**
   - Bootstrap che phủ quá nhiều
   - Nên viết CSS thuần trước để hiểu cơ bản

5. **Web app phức tạp (React/Vue):**
   - Dùng component library specific: Material-UI, Ant Design
   - Không dùng chung Bootstrap + Framework JS

**Ví dụ:** Landing page portfolio, design agency, SPA phức tạp → không dùng Bootstrap


## Kết luận

**Bootstrap = LEGO:**
- ✅ Nhanh lắp ghép
- ❌ Design giống nhau
- ✅ Thích hợp Admin / MVP
- ❌ Thích hợp thương mại, brand

**CSS Thuần = Vẽ tay:**
- ✅ Design độc đáo
- ❌ Chậm phát triển
- ✅ Performance tốt
- ❌ Phức tạp maintain

**TailwindCSS = Hybrid:**
- ✅ Nhanh như Bootstrap
- ✅ Flexible như CSS thuần
- ✅ Bundle size nhỏ
- ❌ HTML dài

→ **Chọn dựa vào project requirements, không phải fashion**