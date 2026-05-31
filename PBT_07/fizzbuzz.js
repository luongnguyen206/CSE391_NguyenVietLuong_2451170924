// Bài B4: FizzBuzz Nâng Cao

console.log("╔════════════════════════════════════════════════════════╗");
console.log("║         VERSION 1: CLASSIC FIZZBUZZ (1-100)           ║");
console.log("╚════════════════════════════════════════════════════════╝");

for (let i = 1; i <= 100; i++) {
    let output = "";
    
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    
    console.log(output || i);
}

// Version 2: Custom FizzBuzz
console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║         VERSION 2: CUSTOM FIZZBUZZ                   ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }
        
        console.log(output || i);
    }
}

// Test với rules: 3→Fizz, 5→Buzz, 7→Jazz
console.log("Test với 3→Fizz, 5→Buzz, 7→Jazz (1-35):\n");
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);

// Kiểm tra các số đặc biệt
console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║              CÁC SỐ ĐẶC BIỆT                          ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

function customFizzBuzzSingle(n, rules) {
    let output = "";
    for (let j = 0; j < rules.length; j++) {
        if (n % rules[j].divisor === 0) {
            output += rules[j].word;
        }
    }
    return output || n;
}

const testNumbers = [
    { num: 15, desc: "Chia hết 3 và 5" },
    { num: 21, desc: "Chia hết 3 và 7" },
    { num: 35, desc: "Chia hết 5 và 7" },
    { num: 105, desc: "Chia hết 3, 5, 7" }
];

const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

for (let i = 0; i < testNumbers.length; i++) {
    const test = testNumbers[i];
    const result = customFizzBuzzSingle(test.num, rules);
    console.log(`${test.num} → ${test.desc} → ${result}`);
}

console.log("\n✅ FizzBuzz hoàn thành!");
