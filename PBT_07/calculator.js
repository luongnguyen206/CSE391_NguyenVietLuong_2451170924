// Bài B1: Máy tính đơn giản

function calculate(num1, operator, num2) {
    // Validate input - kiểm tra có phải số
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return "Lỗi: Input không phải số";
    }

    // Kiểm tra operator hợp lệ
    const validOperators = ["+", "-", "*", "/", "%", "**"];
    if (!validOperators.includes(operator)) {
        return `Lỗi: Operator '${operator}' không hợp lệ`;
    }

    // Xử lý từng operator
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 / num2;
        case "%":
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 % num2;
        case "**":
            return num1 ** num2;
        default:
            return "Lỗi: Operator không hợp lệ";
    }
}

// Test
console.log("calculate(10, '+', 5) =", calculate(10, "+", 5));              // → 15
console.log("calculate(10, '/', 0) =", calculate(10, "/", 0));            // → Lỗi
console.log("calculate(10, '^', 5) =", calculate(10, "^", 5));            // → Lỗi operator
console.log("calculate('abc', '+', 5) =", calculate("abc", "+", 5));      // → Lỗi input
console.log("calculate(2, '**', 10) =", calculate(2, "**", 10));          // → 1024
console.log("calculate(15, '-', 8) =", calculate(15, "-", 8));            // → 7
console.log("calculate(20, '%', 3) =", calculate(20, "%", 3));            // → 2
console.log("calculate(100, '/', 5) =", calculate(100, "/", 5));          // → 20
