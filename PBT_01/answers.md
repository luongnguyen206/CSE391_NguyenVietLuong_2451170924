# PHẦN A - KIỂM TRA ĐỌC HIỂU:

## Câu A1: (Tài liệu 01_instroduction_html_universe.md)
1. Thứ tự 5 bước khi gõ `https://shopee.vn`:
    - DNS: Trình duyệt tra cứu địa chỉ IP của trang web.
    - TCP: kết nối tới server
    - HTTP: gửi request đến với server
    - Server processing: Server xử lý request và trả về dữ liệu HTML/CSS
    - Reder: render dữ liệu HTML/CSS
2. Screenshots file `PBT01_A1-2.png`.

## Câu A2: (Tài liệu: 04_visible_part_html.md)
Web bị đánh giá thấp vì sử dụng quá nhiều thẻ div mà không có thẻ semantic nào để định hình bố cục của web.
Các lỗi semantic:
- `<div class="header">`
- `<div class="menu">`
- `<div class="main">`
- `<div class="footer">`
- `<div class="product">`
- `<div class="title">`
- `<div class="image">`
Nên thay thế thành:
- `<head>`
- `<nav>`
- `<main>`
- `<footer>`
- `<article>`
- `<h1>`
- `<figure>`

## Câu A3: (Tài liệu: 04_visible_part_html.md)
┌─────────────────────────┐
│ Hộp 1                   │
└─────────────────────────┘
Text A Text B
┌─────────────────────────┐
│ Hộp 2                   │
└─────────────────────────┘
Text C Text D
┌─────────────────────────┐
│ Hộp 3                   │
└─────────────────────────┘
- `<div>` là 1 thẻ thuộc Block element vì vậy khi kết thúc thẻ sẽ xuống 1 dòng mới.
- `<span>` và `<strong>` là 2 thẻ thuộc Inline element vì vậy khi kết thúc thẻ thì vẫn sẽ nằm trên dòng đó không xuống dòng mới.

## Câu A4:
- `<thead>` là tiêu đề của cột, vị trí xuất hiện trên cùng
- `<tbody>` là dữ liệu chính của bảng, vị trí xuất hiện ở giữa
- `<tfoot>` là tổng kết, vị trí xuất hiện ở dưới cùng
* Lý do không nên dùng `<table>` làm layout:
- Table không linh hoạt được như CSS Grid/Flexbox
- Code khi dùng với Table dễ rối hơn
- Table chỉ được thiết kế để hiển thị dữ liệu bảng, không phải layout trang nên các trình duyệt sẽ chỉ hiểu table là dữ liệu.

# PHẦN B - THỰC HÀNH CODE:

## Câu B3:
Các lỗi có trong bài là:
- `<!DOCTYPE>`ở dòng 136 thiếu html -> Sửa thành `<!DOCTYPE html>`.
- `<title>Trang web`ở dòng 139 thiếu thẻ đóng title -> Sửa thành `<title>Trang web</title>`.
- `<h1>Welcome to ShopTLU<h1>` ở dòng 143 thẻ đóng bị sai -> Sửa thành `<h1>Welcome to ShopTLU</h1>`.
- `<a href="home">Trang chủ<a>` ở dòng 147 thẻ đóng bị sai -> Sửa thành `<a href="home">Trang chủ</a>`.
- `<img src=iphone.jpg>` ở dòng 155 sau phần src= thiếu dấu ngoặc kép -> Sửa thành `<img src="iphone.jpg">.
- `<p>Giá: <b>25.990.000đ</p></b>` ở dòng 157 để sai vị trí thẻ đóng của thẻ `<b>` -> Sửa thành `<p>Giá: <b>25.990.000đ</b></p>`.
- Từ dòng 162 đến 170 Table nên sửa dụng 2 thẻ `<thead>` và `<tbody>`.
- `<td>` từ dòng 164 trong Table nên thay `<td>` thành `<th>`.

## Câu B4:
1. Với trang shopee, 3 thẻ semantic HTML5 được sử dụng:
    - `<html>` - Dòng 1 (thẻ gốc, có thuộc tính dir="ltr" lang="vi").
    - `<head>` - Dòng 2 (chứa metadata của trang, hiện đang collapsed).
    - `<body>` - Dòng 3 (chứa nội dung chính của trang).
 Hai thẻ KHÔNG dùng đúng semantic:
    - `<div id="main">` dòng 10 - Nên dùng thẻ `<main>` thay vì `<div id="main">` vì đây là nội dung chính của trang.
    - `<div id="modal">` - Nên dùng thẻ `<dialog>` thay vì `<div id="modal">` vì đây là hộp thoại/modal
2. Trong ảnh shopee không có `<table>` nào.
3. Trong ảnh shopee có input gồm:
<input 
    aria-label="Tìm sản phẩm, thương hiệu, và tên shop" 
    class="shopee-searchbar-input__input" 
    maxlength="128" 
    placeholder="Tìm sản phẩm, thương hiệu, và tên shop" 
    type="search" 
    autocomplete="off" 
    aria-autocomplete="list" 
    aria-controls="shopee-searchbar-listbox" 
    aria-expanded="false" 
    role="combobox" 
    value=""
>

# PHẦN C — SUY LUẬN

## Câu C1:
```html
<!-- Header thanh điều hướng chính -->
    <header>
        <nav>
            <a href="#">Trang chủ</a>
            <a href="#danh-muc">Danh mục</a>
            <a href="#gio-hang">Giỏ hàng</a>
        </nav>
    </header>

    <!-- Breadcrumb điều hướng -->
    <nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng -->
        <ol> <!-- ol vì breadcrumb có thứ tự -->
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#dien-thoai">Điện thoại</a></li>
            <li><a href="#iphone">iPhone</a></li>
            <li aria-current="page">iPhone 16 Pro Max</li>
        </ol>
    </nav>

    <!--Main nội dung chính của trang -->
    <main>
        <article> <!-- dùng article vì mỗi sản phẩm là một nội dung độc lập -->
            <h1>iPhone 16 Pro Max 256GB</h1>

            <!-- Hình ảnh sản phẩm -->
            <figure>
                <img src="https://placehold.co/300x200" alt="iPhone 16 Pro Max">
                <figcaption>iPhone 16 Pro Max</figcaption>
            </figure>

            <!-- Giá sản phẩm -->
            <div class="price">
                <span class="current">29.999.000₫</span>
                <span class="original">35.999.000₫</span>
                <span class="discount">-15%</span>
            </div>

            <!-- Mô tả sản phẩm -->
            <section>
                <h2>Mô tả</h2>
                <ul>
                    <li>Chip A18 Pro</li>
                    <li>Màn hình Super Retina XDR 6.7 inch</li>
                    <li>Camera 48MP</li>
                    <li>Pin 45W sạc nhanh</li>
                </ul>
            </section>

            <!-- lựa chọn số lượng và mua hàng -->
            <form method="POST" action="/gio-hang">
                <label for="qty">Số lượng:</label>
                <input type="number" id="qty" name="quantity" min="1" max="10" value="1">
                <button type="submit">Thêm vào giỏ</button>
                <button type="submit" name="buy-now">Mua ngay</button>
            </form>

            <!-- Bảng thông số kỹ thuật -->
            <section>
                <h2>Thông số</h2>
                <table>
                    <tr><td>Chip</td><td>Apple A18 Pro</td></tr>
                    <tr><td>RAM</td><td>8GB</td></tr>
                    <tr><td>Màn hình</td><td>6.7 inch</td></tr>
                </table>
            </section>
        </article>
    </main>

    <!-- Sidebar sản phẩm tương tự -->
    <aside>
        <h2>Sản phẩm tương tự</h2>
        <ul>
            <li>
                <article>
                    <figure>
                        <img src="https://placehold.co/300x200" alt="Samsung Galaxy S24">
                        <figcaption>Samsung Galaxy S24</figcaption>
                    </figure>
                    <p>24.999.000₫</p>
                    <a href="/samsung-s24">Xem chi tiết</a>
                </article>
            </li>
        </ul>
    </aside>
    <footer>
        <p>&copy; 2024 Shop Online</p>
        <a href="/privacy">Bảo mật</a> | <a href="/contact">Liên hệ</a>
    </footer>
```

## Câu C2:
    Ý kiến của đồng nghiệp nghe có vẻ nhanh gọn nhưng nó lại vô tình tạo ra một lỗ hỏng kỹ thuật trong các dự án lớn. Có 2 lý do chính để ta phản bác lại ý kiến này. Đầu tiên, về mặt SEO các bot tìm kiếm như Google sẽ dựa vào các thẻ semantic để phân biệt đâu là nội dung chính, đâu là phần bổ trợ; một trang web chỉ toàn <div> sẽ khiến cho bot khó tìm kiếm được những nội dung chính, làm giảm thứ hạng trang. Về Accessibility, người dùng khiếm thị khi sử dụng trình đọc màn hình sẽ hoàn toàn mất phương hướng nếu trang web không có các semantics như <nav> hay <main>, vì trình đọc không thể hiểu ý nghĩa của một khối <div>. Một ví dụ cụ thể là việc dùng <button> thay vì một khối <div> có class là .btn. Khi dùng thẻ <button>, trình duyệt tự động hỗ trợ các tương tác bằng phím Enter, Space. Nói vậy không có nghĩa <div> không quan trọng, nó là lựa chọn hoàn hảo khi ta cần một phần tử trung lập để bọc nội dung phục vụ mục đích dàn trang như Flexbox hay Grid mà không làm thay đổi cấu trúc ý nghĩa của tài liệu. Tóm lại, không nên chỉ sử dụng mỗi <div> mà ta nên kết hợp với các thẻ semantics khác để giúp cho trang web được chuyên nghiệp hơn.