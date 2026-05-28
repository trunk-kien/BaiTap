// 1. Máy tự động tạo 1 số ngẫu nhiên từ 1 đến 100
const targetNumber = Math.floor(Math.random() * 100) + 1;

const MAX_ATTEMPTS = 7; // Giới hạn 7 lần đoán
let attempts = 0;       // Số lần đã đoán hợp lệ
let guessedNumbers = []; // Mảng lưu lại các số đã đoán để kiểm tra trùng
let isWin = false;

alert("Chào mừng bạn đến với Mini Game Đoán Số!\nMáy đã chọn ngẫu nhiên một số từ 1 đến 100. Bạn có 7 lượt để đoán!");

// Vòng lặp trò chơi: Chạy đến khi hết lượt hoặc đoán đúng
while (attempts < MAX_ATTEMPTS) {
    let remainingTurns = MAX_ATTEMPTS - attempts;
    
    // Hiển thị hộp thoại nhập số kèm thông tin số lượt còn lại
    let userInput = prompt(`[Lượt ${attempts + 1}/${MAX_ATTEMPTS}] Nhập một số từ 1 đến 100:`);

    // Xử lý nếu người chơi bấm "Cancel" (Hủy bỏ) không muốn chơi nữa
    if (userInput === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }

    // Chuyển đổi dữ liệu nhập vào thành số nguyên
    let guess = parseInt(userInput.trim());

    // --- VALIDATE INPUT (Kiểm tra điều kiện hợp lệ) ---
    // Kiểm tra nếu không phải là số hoặc nằm ngoài khoảng 1-100
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Lỗi: Vui lòng chỉ nhập số hợp lệ trong khoảng từ 1 đến 100!");
        continue; // Bỏ qua đoạn code phía dưới, quay lại đầu vòng lặp (không mất lượt)
    }

    // Kiểm tra nếu user nhập cùng một số 2 lần trở lên
    if (guessedNumbers.includes(guess)) {
        alert(`Cảnh báo: Bạn đã đoán số ${guess} này rồi! Thử số khác nhé.`);
        continue; // Quay lại đầu vòng lặp và không bị trừ lượt
    }

    // Nếu vượt qua các tầng kiểm tra -> Lưu số này vào danh sách đã đoán và tính 1 lượt
    guessedNumbers.push(guess);
    attempts++;

    // --- SO SÁNH KẾT QUẢ ---
    if (guess === targetNumber) {
        alert(`Đúng rồi!\nBạn đoán đúng sau ${attempts} lần!`);
        isWin = true;
        break; // Đoán đúng thì thoát vòng lặp ngay lập tức
    } else if (guess < targetNumber) {
        alert("Cao hơn!"); // Số của máy cao hơn số bạn vừa đoán
    } else {
        alert("Thấp hơn!"); // Số của máy thấp hơn số bạn vừa đoán
    }
}

// 5. Nếu hết lượt 7 lần mà vẫn chưa đoán đúng -> Thua và hiện đáp án
if (!isWin && attempts === MAX_ATTEMPTS) {
    alert(`Hết lượt -> Bạn đã thua!\nĐáp án đúng của máy là: ${targetNumber}`);
}