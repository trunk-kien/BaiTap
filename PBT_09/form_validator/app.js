// --- DOM Elements ---
const form = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const nameIcon = document.getElementById('name-icon');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const passwordHint = document.getElementById('password-hint');
const confirmInput = document.getElementById('confirm-password');
const confirmError = document.getElementById('confirm-error');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

const modal = document.getElementById('successModal');
const modalData = document.getElementById('modal-data');
const closeModalBtn = document.getElementById('closeModal');

// --- State Validator ---
// Lưu trạng thái hợp lệ của từng trường
const isValid = {
    username: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// Hàm kiểm tra tổng thể để kích hoạt nút Submit
function checkFormValidity() {
    const allValid = Object.values(isValid).every(status => status === true);
    submitBtn.disabled = !allValid;
}

// --- 1. Validate Tên ---
usernameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        nameIcon.textContent = '✅';
        usernameInput.classList.add('valid');
        usernameInput.classList.remove('invalid');
        isValid.username = true;
    } else {
        nameIcon.textContent = val.length > 0 ? '❌' : '';
        usernameInput.classList.add('invalid');
        usernameInput.classList.remove('valid');
        isValid.username = false;
    }
    checkFormValidity();
});

// --- 2. Validate Email ---
emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    // Regex cơ bản check định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (val === '') {
        emailError.textContent = '';
        emailInput.classList.remove('invalid', 'valid');
        isValid.email = false;
    } else if (!emailRegex.test(val)) {
        emailError.textContent = 'Email không đúng định dạng (VD: abc@domain.com)';
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
        isValid.email = false;
    } else {
        emailError.textContent = '';
        emailInput.classList.add('valid');
        emailInput.classList.remove('invalid');
        isValid.email = true;
    }
    checkFormValidity();
});

// --- 3. Validate Password Strength ---
passwordInput.addEventListener('input', (e) => {
    const val = e.target.value;
    
    // Reset classes
    strengthBar.className = '';
    
    // Logic kiểm tra độ mạnh
    const hasLettersAndNumbers = /(?=.*[a-zA-Z])(?=.*\d)/.test(val);
    const isStrong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(val);

    if (val.length === 0) {
        passwordHint.textContent = '';
        isValid.password = false;
    } else if (val.length < 8) {
        strengthBar.classList.add('strength-weak');
        passwordHint.textContent = 'Yếu: Cần ít nhất 8 ký tự';
        isValid.password = false; // Tuỳ logic dự án, ở đây mặc định dưới 8 là false
    } else if (isStrong && val.length >= 8) {
        strengthBar.classList.add('strength-strong');
        passwordHint.textContent = 'Mạnh: Mật khẩu rất an toàn';
        isValid.password = true;
    } else if (hasLettersAndNumbers && val.length >= 8) {
        strengthBar.classList.add('strength-medium');
        passwordHint.textContent = 'Trung bình: Thêm chữ hoa và ký tự đặc biệt để an toàn hơn';
        isValid.password = true;
    } else {
        strengthBar.classList.add('strength-weak');
        passwordHint.textContent = 'Yếu: Cần có cả chữ và số';
        isValid.password = false;
    }

    // Khi password thay đổi, phải check lại confirm password
    triggerConfirmPasswordCheck(); 
    checkFormValidity();
});

// --- 4. Validate Confirm Password ---
function triggerConfirmPasswordCheck() {
    const confirmVal = confirmInput.value;
    if(confirmVal.length > 0) {
        // Tạo một event giả để kích hoạt lại logic kiểm tra
        confirmInput.dispatchEvent(new Event('input')); 
    }
}

confirmInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val === '') {
        confirmError.textContent = '';
        confirmInput.classList.remove('invalid', 'valid');
        isValid.confirm = false;
    } else if (val !== passwordInput.value) {
        confirmError.textContent = 'Mật khẩu xác nhận không khớp!';
        confirmInput.classList.add('invalid');
        confirmInput.classList.remove('valid');
        isValid.confirm = false;
    } else {
        confirmError.textContent = '';
        confirmInput.classList.add('valid');
        confirmInput.classList.remove('invalid');
        isValid.confirm = true;
    }
    checkFormValidity();
});

// --- 5. Format Phone Number ---
phoneInput.addEventListener('input', (e) => {
    // Chỉ lấy ra các số, loại bỏ chữ/ký tự đặc biệt do user cố tình gõ
    let numbers = e.target.value.replace(/\D/g, ''); 
    
    // Logic tự động thêm dấu gạch ngang
    let formatted = numbers;
    if (numbers.length > 4) {
        formatted = numbers.slice(0, 4) + '-' + numbers.slice(4);
    }
    if (numbers.length > 7) {
        formatted = numbers.slice(0, 4) + '-' + numbers.slice(4, 7) + '-' + numbers.slice(7, 10);
    }
    
    // Gán lại giá trị vào input
    e.target.value = formatted;

    // Kiểm tra hợp lệ (Đủ 10 số -> qua format sẽ thành 12 ký tự gồm 2 gạch)
    if (numbers.length === 10) {
        phoneInput.classList.add('valid');
        phoneInput.classList.remove('invalid');
        isValid.phone = true;
    } else {
        phoneInput.classList.add('invalid');
        phoneInput.classList.remove('valid');
        isValid.phone = false;
    }
    checkFormValidity();
});

// --- 6. Xử lý Submit & Modal ---
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    
    // Đổ dữ liệu vào modal
    modalData.innerHTML = `
        <p><strong>Tên:</strong> ${usernameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>SĐT:</strong> ${phoneInput.value}</p>
    `;
    
    // Hiện modal
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    form.reset(); // Reset form
    // Reset tất cả icon và class UI
    document.querySelectorAll('.valid, .invalid').forEach(el => el.classList.remove('valid', 'invalid'));
    nameIcon.textContent = '';
    strengthBar.className = '';
    passwordHint.textContent = '';
    
    // Reset state
    for(let key in isValid) isValid[key] = false;
    checkFormValidity();
});