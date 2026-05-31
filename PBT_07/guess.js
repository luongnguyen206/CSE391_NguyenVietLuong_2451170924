let secretNumber;
let attempts = 7;
let guessedNumbers = [];

function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 7;
    guessedNumbers = [];
    document.getElementById("guessInput").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("message").className = "message";
    document.getElementById("historyMessage").textContent = "";
    document.getElementById("guessInput").disabled = false;
    updateDisplay();
    document.getElementById("guessInput").focus();
}

function makeGuess() {
    const input = document.getElementById("guessInput");
    const userGuess = parseInt(input.value);
    const messageDiv = document.getElementById("message");
    const historyDiv = document.getElementById("historyMessage");
    
    // Validate input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDiv.textContent = "❌ Vui lòng nhập số từ 1 đến 100";
        messageDiv.className = "message error-message";
        return;
    }
    
    // Kiểm tra đã đoán rồi
    if (guessedNumbers.includes(userGuess)) {
        messageDiv.textContent = `⚠️ Bạn đã đoán số ${userGuess} rồi!`;
        messageDiv.className = "message warning-message";
        return;
    }
    
    guessedNumbers.push(userGuess);
    attempts--;
    
    // Kiểm tra kết quả
    if (userGuess === secretNumber) {
        const guessCount = 7 - attempts;
        messageDiv.textContent = `🎉 Chúc mừng! Bạn đoán đúng sau ${guessCount} lần! Số đó là ${secretNumber}`;
        messageDiv.className = "message success-message";
        document.getElementById("guessInput").disabled = true;
        document.getElementById("guessInput").value = "";
        return;
    }
    
    if (attempts === 0) {
        messageDiv.textContent = `😢 Game Over! Bạn hết lượt. Số đúng là: ${secretNumber}`;
        messageDiv.className = "message error-message";
        document.getElementById("guessInput").disabled = true;
        document.getElementById("guessInput").value = "";
        return;
    }
    
    if (userGuess > secretNumber) {
        messageDiv.textContent = `📉 Số bạn đoán quá CAO`;
        messageDiv.className = "message info-message";
    } else {
        messageDiv.textContent = `📈 Số bạn đoán quá THẤP`;
        messageDiv.className = "message info-message";
    }
    
    historyDiv.textContent = `Các số đã đoán: ${guessedNumbers.join(", ")}`;
    
    updateDisplay();
    input.value = "";
    input.focus();
}

function updateDisplay() {
    document.getElementById("attempts").textContent = attempts;
}

function resetGame() {
    initGame();
}

// Bắt sự kiện Enter
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("guessInput");
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            makeGuess();
        }
    });
    
    initGame();
});
