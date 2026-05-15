# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1:
| Position | Chiếm chỗ? | Mốc tọa độ | Cuộn theo trang | Use case |
|---|---|---|---|---|
| `static` | ✅ | Không dùng top/left | Theo flow | Mặc định |
| `relative` | ✅ | Chính nó | Không | Dịch nhẹ, làm mốc cho absolute |
| `absolute` | ❌ | Cha relative gần nhất | Không | Badge, dropdown, tooltip |
| `fixed` | ❌ | Viewport | Không | Chat button, modal overlay |
| `sticky` | ✅ → ❌ | Viewport (khi dính) | Có, dính khi scroll đến | Sticky header, sidebar |

- absolute tham chiếu body Khi không có cha nào có position khác static. Lúc đó element bay ra khỏi flow và căn dưới body.
- absolute tham chiếu parent? Khi parent (hoặc tổ tiên gần nhất) có position: relative; (hoặc absolute/fixed/sticky). Gọi là "nearest positioned ancestor".
- "Nearest positioned ancestor" là tổ tiên gần nhất có `position` không phải là static. Nó trở thành mốc tọa độ cho element con có `position: absolute`.

## Câu A2:
- Trường hợp 1: `display: flex; flex: 1;` (4 items)
┌─────────────────────────────────┐
│  Item1  │  Item2  │  Item3  │  Item4  │
└─────────────────────────────────┘
Có: 1 hàng, 4 cột đều nhau

- Trường hợp 2: `flex-wrap: wrap; width: 45%; margin: 2.5%;` (6 items)
```
┌────────────────────────────────┐
│  Item1 (45%)  │  Item2 (45%)  │
│  Item3 (45%)  │  Item4 (45%)  │
│  Item5 (45%)  │  Item6 (45%)  │
└────────────────────────────────┘
```
Có: 3 hàng, 2 cột

- Trường hợp 3: `justify-content: space-between; align-items: center;` (3 items)
```
┌────────────────────────────────┐
│ Item1        Item2        Item3 │
└────────────────────────────────┘
```
Có: 1 hàng, Item1 trái, Item2 giữa, Item3 phải, tất cả căn giữa dọc

- Trường hợp 4: `grid-template-columns: 200px 1fr 200px;` (3 items)
```
┌─────────┬──────────────┬─────────┐
│200px    │   flex       │  200px  │
│ Item1   │    Item2     │  Item3  │
└─────────┴──────────────┴─────────┘
```
Có: 1 hàng, 3 cột: cột 1 và 3 cố định 200px, cột 2 co giãn

- Trường hợp 5: `grid-template-columns: repeat(3, 1fr); gap: 10px;` (7 items)
```
┌───────────┬───────────┬───────────┐
│  Item1    │  Item2    │  Item3    │
├───────────┼───────────┼───────────┤
│  Item4    │  Item5    │  Item6    │
├───────────┼───────────┼───────────┤
│  Item7    │           │           │
└───────────┴───────────┴───────────┘
```
Có: 3 hàng, 3 cột (item cuối ở cột 1 hàng 3, hai ô còn lại trống)

# Phần C - SUY LUẬN
## Câu C1:
1. Navigation bar ngang: Flexbox

Lý do:
- Thanh điều hướng là layout một chiều (theo hàng ngang). Các phần tử thường cần:
+ căn giữa theo chiều dọc,
+ phân bố đều theo chiều ngang,
+ số lượng item cố định.
- Flexbox phù hợp vì nó được thiết kế để xử lý layout một chiều rất linh hoạt.

2. Lưới ảnh kiểu Instagram (3 cột): Grid

Lý do:
- Đây là layout hai chiều (hàng và cột).
- Số lượng ảnh có thể thay đổi nhưng số cột thường cố định.
- CSS Grid phù hợp hơn vì cho phép kiểm soát hàng và cột trực tiếp.

3. Layout blog: Header + Main + Sidebar + Footer: Grid

Lý do:
- Đây là một layout tổng thể gồm nhiều vùng: header, sidebar, nội dung chính, footer.
- Layout này mang tính hai chiều nên Grid thường trực quan và dễ quản lý hơn Flexbox.

4. Footer gồm 4 cột: Flexbox hoặc Grid

Cả hai đều phù hợp trong trường hợp này.

- Dùng Flexbox
Phù hợp khi:
+ chỉ cần các cột nằm ngang đơn giản,
+ nội dung không quá phức tạp.

- Dùng Grid
Phù hợp khi:
+ muốn kiểm soát kích thước cột rõ ràng,
+ cần layout đồng đều hơn.

Card sản phẩm (ảnh + mô tả + nút nằm đáy): Flexbox

Lý do:
- Card sản phẩm thường sắp xếp nội dung theo chiều dọc: ảnh, tiêu đề, mô tả, nút bấm.
- Đây là layout một chiều nên Flexbox rất phù hợp.
- Ngoài ra, Flexbox hỗ trợ đẩy nút xuống đáy bằng margin-top: auto.

## Câu C2:
Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
Nguyên nhân:
- `.card-container` dùng `flex-wrap: wrap` nhưng không có `align-items: stretch` hoặc `height` cố định
- Mỗi card có chiều cao khác nhau tùy content nên nút bị nhảy
Sửa:
```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}

.card {
    width: 30%;
    margin: 1.5%;
    display: flex;
    flex-direction: column;
}

.card .btn {
    margin-top: auto;
}
```

Lỗi 2: Items không nằm giữa trong container 100vh
Nguyên nhân:
- `.hero` dùng `display: flex` nhưng thiếu `justify-content: center` và `align-items: center`
- `.hero-content` chỉ dùng `text-align: center` chỉ căn ngang chữ, không căn container
Sửa:
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Lỗi 3: Sidebar bị co lại khi content quá dài
Nguyên nhân:
- `.sidebar` dùng `width: 250px` nhưng không có `flex-shrink: 0`
- Khi `.content` quá dài, flexbox co sidebar lại để lượt cho content
Sửa:
```css
.layout {
    display: flex;
    gap: 20px;
}

.sidebar {
    width: 250px;
    flex-shrink: 0;
    background: #f0f0f0;
    height: fit-content;
}

.content {
    flex: 1;
    min-width: 0;
}
```