// Form Validator - Real-time validation
const form = document.querySelector("#registerForm");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");
const submitBtn = document.querySelector("#submitBtn");

const validators = {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// Validate full name
fullNameInput.addEventListener("input", () => {
    const value = fullNameInput.value.trim();
    const nameError = document.querySelector("#nameError");
    const nameSuccess = document.querySelector("#nameSuccess");

    if (value.length < 2) {
        nameError.textContent = "Tên phải có ít nhất 2 ký tự";
        nameError.classList.add("show");
        nameSuccess.classList.remove("show");
        fullNameInput.classList.remove("valid");
        fullNameInput.classList.add("invalid");
        validators.fullName = false;
    } else if (value.length > 50) {
        nameError.textContent = "Tên không được quá 50 ký tự";
        nameError.classList.add("show");
        nameSuccess.classList.remove("show");
        fullNameInput.classList.remove("valid");
        fullNameInput.classList.add("invalid");
        validators.fullName = false;
    } else {
        nameError.classList.remove("show");
        nameSuccess.classList.add("show");
        fullNameInput.classList.add("valid");
        fullNameInput.classList.remove("invalid");
        validators.fullName = true;
    }

    checkAllValid();
});

// Validate email
emailInput.addEventListener("input", () => {
    const value = emailInput.value.trim();
    const emailError = document.querySelector("#emailError");
    const emailSuccess = document.querySelector("#emailSuccess");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
        emailError.textContent = "Email không được để trống";
        emailError.classList.add("show");
        emailSuccess.classList.remove("show");
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        validators.email = false;
    } else if (!emailRegex.test(value)) {
        emailError.textContent = "Email không hợp lệ";
        emailError.classList.add("show");
        emailSuccess.classList.remove("show");
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        validators.email = false;
    } else {
        emailError.classList.remove("show");
        emailSuccess.classList.add("show");
        emailInput.classList.add("valid");
        emailInput.classList.remove("invalid");
        validators.email = true;
    }

    checkAllValid();
});

// Validate password
passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    const passwordError = document.querySelector("#passwordError");
    const strengthMeter = document.querySelector("#strengthMeter");
    const strengthText = document.querySelector("#strengthText");

    // Check password strength
    let strength = "weak";
    strengthMeter.className = "strength-meter-fill";
    
    if (value.length >= 8) {
        const hasLower = /[a-z]/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*]/.test(value);

        if (hasLower && hasUpper && hasNumber && hasSpecial) {
            strength = "strong";
            strengthText.textContent = "Mật khẩu mạnh ✅";
        } else if ((hasLower || hasUpper) && hasNumber) {
            strength = "medium";
            strengthText.textContent = "Mật khẩu trung bình ⚠️";
        } else {
            strength = "weak";
            strengthText.textContent = "Mật khẩu yếu ❌";
        }
    } else if (value.length > 0) {
        strengthText.textContent = "Mật khẩu yếu ❌";
    }

    strengthMeter.classList.add(strength);
    strengthText.classList.add(strength);

    // Validate
    if (value.length < 8) {
        passwordError.textContent = "Mật khẩu phải có ít nhất 8 ký tự";
        passwordError.classList.add("show");
        passwordInput.classList.remove("valid");
        passwordInput.classList.add("invalid");
        validators.password = false;
    } else {
        passwordError.classList.remove("show");
        passwordInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
        validators.password = true;
    }

    validateConfirmPassword();
    checkAllValid();
});

// Validate confirm password
confirmInput.addEventListener("input", validateConfirmPassword);

function validateConfirmPassword() {
    const confirmError = document.querySelector("#confirmError");
    const confirmSuccess = document.querySelector("#confirmSuccess");

    if (passwordInput.value !== confirmInput.value) {
        confirmError.textContent = "Mật khẩu không khớp";
        confirmError.classList.add("show");
        confirmSuccess.classList.remove("show");
        confirmInput.classList.remove("valid");
        confirmInput.classList.add("invalid");
        validators.confirmPassword = false;
    } else if (confirmInput.value) {
        confirmError.classList.remove("show");
        confirmSuccess.classList.add("show");
        confirmInput.classList.add("valid");
        confirmInput.classList.remove("invalid");
        validators.confirmPassword = true;
    } else {
        confirmError.classList.remove("show");
        confirmSuccess.classList.remove("show");
        validators.confirmPassword = false;
    }

    checkAllValid();
}

// Validate phone
phoneInput.addEventListener("input", () => {
    let value = phoneInput.value.replace(/\D/g, "");
    const phoneError = document.querySelector("#phoneError");
    const phoneSuccess = document.querySelector("#phoneSuccess");

    // Format phone: 0901-234-567
    if (value.length > 0) {
        if (value.length > 10) value = value.slice(0, 10);
        
        let formatted = value;
        if (value.length > 3 && value.length <= 6) {
            formatted = value.slice(0, 3) + "-" + value.slice(3);
        } else if (value.length > 6) {
            formatted = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
        }
        
        phoneInput.value = formatted;
    }

    if (value.length !== 10) {
        phoneError.textContent = "Số điện thoại phải có 10 chữ số";
        phoneError.classList.add("show");
        phoneSuccess.classList.remove("show");
        phoneInput.classList.remove("valid");
        phoneInput.classList.add("invalid");
        validators.phone = false;
    } else {
        phoneError.classList.remove("show");
        phoneSuccess.classList.add("show");
        phoneInput.classList.add("valid");
        phoneInput.classList.remove("invalid");
        validators.phone = true;
    }

    checkAllValid();
});

// Check all valid
function checkAllValid() {
    const allValid = Object.values(validators).every(v => v === true);
    submitBtn.disabled = !allValid;

    const formStatus = document.querySelector("#formStatus");
    if (allValid) {
        formStatus.textContent = "✅ Tất cả trường đều hợp lệ!";
        formStatus.style.color = "#51cf66";
    } else {
        formStatus.textContent = "⚠️ Vui lòng điền đầy đủ thông tin";
        formStatus.style.color = "#ff6b6b";
    }
}

// Submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!Object.values(validators).every(v => v === true)) {
        alert("Vui lòng điền đầy đủ và hợp lệ tất cả trường!");
        return;
    }

    // Show success modal
    const modal = document.querySelector("#successModal");
    const successInfo = document.querySelector("#successInfo");
    
    successInfo.innerHTML = `
        <p><strong>Họ và tên:</strong> ${fullNameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>Số điện thoại:</strong> ${phoneInput.value}</p>
        <p><strong>Ngày đăng ký:</strong> ${new Date().toLocaleString('vi-VN')}</p>
    `;
    
    modal.classList.remove("hidden");
    
    // Reset form
    form.reset();
    Object.keys(validators).forEach(key => validators[key] = false);
    document.querySelectorAll(".error-message").forEach(el => el.classList.remove("show"));
    document.querySelectorAll(".success-icon").forEach(el => el.classList.remove("show"));
    document.querySelectorAll("input").forEach(el => {
        el.classList.remove("valid", "invalid");
    });
    submitBtn.disabled = true;
});

// Close modal
function closeModal() {
    document.querySelector("#successModal").classList.add("hidden");
}

// Initial state
checkAllValid();
