// Câu A1: var / let / const

// Đoạn 1
console.log("=== Đoạn 1: var hoisting ===");
console.log(x);  // undefined (hoisting)
var x = 5;
console.log("x =", x);  // 5

// Đoạn 2
console.log("\n=== Đoạn 2: let Temporal Dead Zone ===");
try {
    console.log(y);  // ReferenceError
} catch (e) {
    console.log("Lỗi:", e.message);
}
let y = 10;
console.log("y =", y);  // 10

// Đoạn 3
console.log("\n=== Đoạn 3: const không thể ghi đè ===");
const z = 15;
try {
    z = 20;  // TypeError
} catch (e) {
    console.log("Lỗi:", e.message);
}
console.log("z =", z);  // 15

// Đoạn 4
console.log("\n=== Đoạn 4: const có thể modify nội dung ===");
const arr = [1, 2, 3];
arr.push(4);  // OK
console.log("arr =", arr);  // [1, 2, 3, 4]

// Đoạn 5
console.log("\n=== Đoạn 5: Block scope ===");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);  // 2
}
console.log("Ngoài block:", a);  // 1
