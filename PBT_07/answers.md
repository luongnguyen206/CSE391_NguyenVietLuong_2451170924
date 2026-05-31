# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1: var / let / const

### Dự đoán Output (Không chạy code):

```javascript
// Đoạn 1
console.log(x);
var x = 5;
```
undefined (hoisting: var x được khai báo nhưng giá trị undefined).

```javascript
// Đoạn 2
console.log(y);
let y = 10;
```
`let` cũng được hoisted nhưng không được khởi tạo, nằm trong Temporal Dead Zone (TDZ) từ đầu scope đến dòng khai báo → truy cập trước sẽ throw lỗi.

```javascript
// Đoạn 3
const z = 15;
z = 20;
console.log(z);
```
`const` không cho phép gán lại sau khi khởi tạo → lỗi ngay dòng `z = 20`, không bao giờ tới `console.log`.

```javascript
// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```
`const` chỉ khóa binding (không cho gán lại biến), không khóa nội dung của object/array. `.push()` thay đổi mảng tại chỗ → hợp lệ.

```javascript
// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);   // "Trong block: 2" (block scope)
}
console.log("Ngoài block:", a);       // "Ngoài block: 1" (var ngoài block)
```
let có block scope — a = 2 bên trong {} là biến hoàn toàn riêng biệt, không ảnh hưởng a = 1 bên ngoài.

## Câu A2: Data Types & Coercion

### Dự đoán Output:

```javascript
console.log(typeof null);              // "object" (bug lịch sử)
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);               // "number" (NaN là kiểu number!)

console.log("5" + 3);                  // "53" (string concatenation)
console.log("5" - 3);                  // 2 (type coercion: "5" → 5)
console.log("5" * "3");                // 15 (type coercion)
console.log(true + true);              // 2 (true = 1, 1 + 1 = 2)
console.log([] + []);                  // "" (rỗng)
console.log([] + {});                  // "[object Object]"
console.log({} + []);                  // "[object Object]" (hoặc NaN, tùy context)
```

### Giải thích sự khác nhau:
- **`"5" + 3`** → `"53"`: Khi một toán hạng là string, `+` thực hiện **concatenation**
- **`"5" - 3`** → `2`: Khi phép trừ, JavaScript **tự chuyển string → number**
- `-`, `*`, `/` luôn chuyển thành number, nhưng `+` có thể concatenate

## Câu A3: So sánh == vs ===

### Dự đoán:

```javascript
console.log(5 == "5");                 // true (loose: "5" → 5)
console.log(5 === "5");                // false (strict: type khác)
console.log(null == undefined);        // true (special case)
console.log(null === undefined);       // false (type khác)
console.log(NaN == NaN);               // false (quy tắc NaN)
console.log(0 == false);               // true (false → 0)
console.log(0 === false);              // false (type khác)
console.log("" == false);              // true ("" → 0, false → 0)
```

### Quy tắc:
**LUÔN dùng `===` và `!==`**
- `==` tự chuyển type → bẫy, khó debug
- `===` so sánh nghiêm ngặt (type + value) → an toàn, code review sẽ nhắc nhở

## Câu A4: Truthy & Falsy

### 6 giá trị FALSY:
1. `false`
2. `0` (số 0)
3. `""` (chuỗi rỗng)
4. `null`
5. `undefined`
6. `NaN`

### Dự đoán Output:

```javascript
if ("0") console.log("A");             // In "A" ("0" là string, truthy!)
if ("") console.log("B");              // Không in (chuỗi rỗng = falsy)
if ([]) console.log("C");              // In "C" (array luôn truthy)
if ({}) console.log("D");              // In "D" (object luôn truthy)
if (null) console.log("E");            // Không in (null = falsy)
if (0) console.log("F");               // Không in (0 = falsy)
if (-1) console.log("G");              // In "G" (-1 là số, truthy)
if (" ") console.log("H");             // In "H" (chuỗi space, truthy!)
```

## Câu A5: Template Literals

### 3 cách nối chuỗi viết lại bằng template literal:

```javascript
// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
// ↓ Template literal:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
// ↓ Template literal:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<button>" + buttonText + "</button>" +
    "</div>";
// ↓ Template literal:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <button>${buttonText}</button>
</div>`;
```

# PHẦN C — SUY LUẬN

## Câu C1: Debug JavaScript

### Code lỗi:
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        console.log("Lỗi: Phần trăm giảm giá phải từ 0-100");
        return;    // ← Lỗi 1: Không return giá trị, mặc định return undefined
    }
    const soTienGiam = giaBan * (phanTramGiam / 100);
    const giaSauGiam = giaBan - soTienGiam;
    return giaSauGiam  // ← Lỗi 2: Thiếu ;
}

// Test
const gia = tinhGiaGiamGia("100000", 20)  // ← Lỗi 3: Truyền string "100000" thay vì số
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)   // ← Lỗi 4: Truyền 110 vượt quá 100
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {             // ← Lỗi 5: Dùng var (function-scoped)
    setTimeout(function() {
        console.log(i);                   // ← Lỗi 6: In ra 5 năm lần (closure)
    }, 1000)
}
// Output: 5 5 5 5 5 (không phải 0 1 2 3 4!)
```

### Danh sách lỗi:

| Lỗi # | Vị trí | Vấn đề | Sửa |
|---|---|---|---|
| 1 | Dòng 3 | `return;` không trả giá trị → undefined | `return false;` hoặc throw Error |
| 2 | Dòng 7 | Thiếu `;` | Thêm `;` sau `giaSauGiam` |
| 3 | Dòng 10 | Truyền string `"100000"` thay vì number | `tinhGiaGiamGia(100000, 20)` |
| 4 | Dòng 13 | Truyền 110 > 100, nằm ngoài range | `tinhGiaGiamGia(50000, 10)` |
| 5 | Dòng 15 | Dùng `var` (function-scoped) | Dùng `let` (block-scoped) |
| 6 | Dòng 17 | `i` bị capture bởi closure, khi setTimeout chạy `i=5` | Dùng `let` hoặc IIFE |

### Code sửa đúng:

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Input validation
    if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
        throw new Error("Lỗi: Cả hai tham số phải là số");
    }
    
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        throw new Error("Lỗi: Phần trăm giảm giá phải từ 0-100");
    }
    
    const soTienGiam = giaBan * (phanTramGiam / 100);
    const giaSauGiam = giaBan - soTienGiam;
    return giaSauGiam;
}

// Test
try {
    const gia = tinhGiaGiamGia(100000, 20);
    console.log("Giá sau giảm: " + gia + "đ");
    
    const gia2 = tinhGiaGiamGia(50000, 10);
    console.log("Giá: " + gia2);
} catch (error) {
    console.error(error.message);
}

// Sửa var → let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);  // → 0 1 2 3 4 ✅
    }, 1000);
}
```

### Giải thích lỗi bị ẩn (var vs let):

**Vấn đề:** Khi dùng `var i`, biến `i` là function-scoped, không phải block-scoped.

- Vòng lặp chạy 5 lần: i = 0, 1, 2, 3, 4
- Mỗi lần lặp, `setTimeout` đăng ký 1 callback
- Sau khi vòng lặp kết thúc, `i = 5`
- Khi setTimeout trigger (1 giây sau), nó tìm `i` → lúc này `i = 5` → in 5 năm lần

**Sửa:**
- Dùng `let i` thay vì `var i` → mỗi vòng lặp có scope riêng
- Hoặc dùng IIFE: `(function(j) { setTimeout(..., j) })(i)`
