# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1: DOM Tree

### 1. Vẽ DOM tree:
```
#app (div)
├── header
│   ├── h1 "Todo App"
│   └── nav
│       ├── a.active href="/" "Home"
│       ├── a href="/active" "Active"
│       └── a href="/completed" "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput (text input)
    │   └── button (submit)
    └── ul#todoList
        ├── li.todo-item "Todo 1"
        ├── li.todo-item "Todo 2"
        └── li.todo-item "Todo 3"
```

### 2. Các querySelector:

```javascript
// Chọn thẻ <h1>
document.querySelector("h1")
// hoặc
document.querySelector("#app h1")

// Chọn input trong form
document.querySelector("#todoForm input")
// hoặc
document.querySelector("input[type='text']")

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item")

// Chọn link đang active
document.querySelector("nav a.active")
// hoặc
document.querySelector("a[class='active']")

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li")
// hoặc
document.querySelector("#todoList li:first-child")

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a")
```

## Câu A2: innerHTML vs textContent

### Sự khác nhau:

**textContent:**
- Chỉ lấy/gán **text thuần** không có HTML
- An toàn với XSS vì nó không parse HTML
- Nó cũng lấy text của các element ẩn

**innerHTML:**
- Lấy/gán **cả HTML tags và text**
- Parse HTML → tạo elements thực tế
- Nhanh hơn textContent vì browser render trực tiếp
- **Nguy hiểm với XSS**

### Ví dụ:
```javascript
const el = document.querySelector("#result");

// Nếu user nhập: <img src=x onerror="alert('Hacked!')">

// Cách 1: NGUY HIỂM ❌
el.innerHTML = userInput;  
// → Browser parse HTML → script execute → Hack!

// Cách 2: AN TOÀN ✅
el.textContent = userInput;
// → Hiển thị y hệt chuỗi: "<img src=x onerror=...>"
// → Không execute script
```

### Khi dùng mỗi cái:
- Dùng **textContent** khi hiển thị user input (an toàn)
- Dùng **innerHTML** khi bạn viết HTML tĩnh, tin tưởng nguồn dữ liệu
- Luôn sanitize HTML trước nếu phải dùng innerHTML với user input

## Câu A3: Event Bubbling

### Dự đoán thứ tự console.log (không có stopPropagation):

```
Khi click vào button, sự kiện nổi bọt từ trong ra ngoài:
1. BUTTON    (event click trên button)
2. INNER     (event click nổi lên container #inner)
3. OUTER     (event click nổi lên container #outer)

Output:
BUTTON
INNER
OUTER
```

### Nếu uncomment `e.stopPropagation()`:

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();  // ← Dừng nổi bọt
});
```

Lúc này sự kiện **không nổi lên** nữa:

```
Output:
BUTTON
(chỉ vậy, INNER và OUTER không chạy)
```

**Giải thích:**
- Event bubbling: Click xuất phát từ element ngoài cùng → nổi bọt ra ngoài
- `stopPropagation()` cắt ngang chu trình nổi bọt ngay tại click element

---

# PHẦN C — DEBUG & PHÂN TÍCH

## Câu C1: Tìm và sửa lỗi

### Lỗi tìm được:

1. **Lỗi tại line `addEventListener("onclick", ...)`** 
   - "onclick" không phải event name, phải là "click"
   ```javascript
   // ❌ Sai
   document.querySelector("#decrementBtn").addEventListener("onclick", ...)
   // ✅ Đúng
   document.querySelector("#decrementBtn").addEventListener("click", ...)
   ```

2. **Lỗi `countDisplay = count`**
   - Gán giá trị count vào biến countDisplay, nên khi innerHTML không update
   ```javascript
   // ❌ Sai
   countDisplay = count;
   // ✅ Đúng
   countDisplay.textContent = count;
   ```

3. **Lỗi `historyList.innerHTML = null`**
   - Nên dùng `""` thay vì `null`
   ```javascript
   // ❌ Sai (hoạt động nhưng không chuẩn)
   historyList.innerHTML = null;
   // ✅ Đúng
   historyList.innerHTML = "";
   ```

4. **Lỗi `item.remove` thiếu `()`**
   - remove là method, phải gọi với dấu ngoặc
   ```javascript
   // ❌ Sai
   item.remove;
   // ✅ Đúng
   item.remove();
   ```

5. **Lỗi parseInt thiếu**
   - localStorage lưu string, phải convert sang number
   ```javascript
   // ❌ Sai
   count = localStorage.getItem("count");  // count = "5" (string)
   // ✅ Đúng
   count = parseInt(localStorage.getItem("count")) || 0;
   ```

6. **Không check element tồn tại**
   - Nếu querySelector không tìm thấy, sẽ error khi gọi method
   ```javascript
   // ❌ Sai (nếu #clearHistory không tồn tại → error)
   document.querySelector("#clearHistory").addEventListener("click", ...)
   // ✅ Đúng
   const clearBtn = document.querySelector("#clearHistory");
   if (clearBtn) {
       clearBtn.addEventListener("click", ...)
   }
   ```

7. **Lỗi tính count khi load từ localStorage**
   - Load count nhưng display lại là null → hiển thị "0" thay vì giá trị thực
   ```javascript
   // ❌ Sai
   window.addEventListener("load", () => {
       count = localStorage.getItem("count");
       countDisplay.textContent = count;  // Nếu localStorage trống → hiển thị "null"
   });
   // ✅ Đúng
   window.addEventListener("load", () => {
       count = parseInt(localStorage.getItem("count")) || 0;
       countDisplay.textContent = count;
   });
   ```

### Code sửa hoàn chỉnh:

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// Increment
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

// Decrement (sửa "onclick" → "click")
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

// Reset
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;  // Sửa: countDisplay = count
    historyList.innerHTML = "";         // Sửa: = null → = ""
});

// Delete history
function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all (Sửa: remove → remove())
const clearBtn = document.querySelector("#clearHistory");
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        const items = historyList.querySelectorAll("li");
        items.forEach(item => {
            item.remove();  // Sửa: thêm ()
        });
    });
}

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage (Sửa: thêm parseInt)
window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
});
```

## Câu C2: Performance

### 1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

**Vấn đề:**
- 1000 listeners = 1000 callback functions trong memory
- Mỗi listener gần 100 bytes → tổng 100KB memory thải
- Khi phần tử bị xóa, listener không tự xóa → memory leak
- Browser chậm hơn

**Event Delegation giải quyết thế nào:**
- Chỉ bind 1 listener trên **parent element** (container)
- Lắng nghe tất cả sự kiện từ children thông qua **event bubbling**
- Kiểm tra `event.target` để xác định click phần tử nào
- Tiết kiệm 1000× memory và tốc độ nhanh

```javascript
// ❌ BAD: 1000 listeners
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", handleClick);  // 1000 lần
});

// ✅ GOOD: Event Delegation (chỉ 1 listener)
const container = document.querySelector(".list");
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        handleClick(e.target);  // Gọi 1 lần cho container
    }
});
```

### 2. Refactor với DocumentFragment (chỉ 1 reflow):

```javascript
// ❌ BAD: 1000 lần reflow (CHẬM)
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);  // Mỗi lần append → reflow 1 lần
}
// Tổng: 1000 reflows

// ✅ GOOD: Chỉ 1 lần reflow (NHANH)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);  // Append vào fragment (không reflow)
}

document.body.appendChild(fragment);  // Chỉ append 1 lần → 1 reflow
```

**Giải thích tại sao nhanh hơn:**
- `appendChild` vào DOM thực tế → browser tính toán layout (reflow) ngay lập tức
- `appendChild` vào DocumentFragment (tạm thời trong memory) → không reflow
- Cuối cùng append fragment toàn bộ → browser render toàn bộ 1 lần
- Kết quả: từ 1000 reflows giảm xuống 1 reflow → tốc độ nhanh gấp 1000×

