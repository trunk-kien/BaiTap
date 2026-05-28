/**
 * Hàm máy tính đơn giản
 * @param {number} num1 - Số thứ nhất
 * @param {string} operator - Toán tử (+, -, *, /, %, **)
 * @param {number} num2 - Số thứ hai
 * @returns {number|string} Kết quả phép tính hoặc thông báo lỗi
 */
function calculate(num1, operator, num2) {
    // 1. Kiểm tra input không phải số (hoặc giá trị NaN)
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // 2. Kiểm tra lỗi chia cho 0 (áp dụng cho cả chia lấy nguyên / và chia lấy dư %)
    if ((operator === '/' || operator === '%') && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    // 3. Xử lý các phép toán hợp lệ bằng switch-case
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        case "**":
            return num1 ** num2; // Phép lũy thừa (ES6)
        
        // 4. Nếu toán tử không khớp với các case trên -> không hợp lệ
        default:
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// ==========================================
// BỘ KIỂM THỬ (TEST CASES)
// ==========================================

console.log(calculate(10, "+", 5));       // -> 15
console.log(calculate(10, "/", 0));       // -> "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));       // -> "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5));    // -> "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));      // -> 1024

// Test thêm các toán tử khác để đảm bảo tính chính xác
console.log(calculate(10, "-", 3));       // -> 7
console.log(calculate(10, "%", 3));       // -> 1