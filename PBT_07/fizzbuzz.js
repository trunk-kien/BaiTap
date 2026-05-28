// =================================================================
// VERSION 1: CLASSIC FIZZBUZZ (1 - 100)
// =================================================================
console.log("--- VERSION 1: CLASSIC ---");

function classicFizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// Chạy thử bản Classic
classicFizzBuzz();


console.log("\n-------------------------------------------------\n");


// =================================================================
// VERSION 2: CUSTOM FIZZBUZZ (NÂNG CAO)
// =================================================================
console.log("--- VERSION 2: CUSTOM ---");

/**
 * Hàm FizzBuzz động - Tự động áp dụng bộ luật tùy biến
 * @param {number} n - Số giới hạn vòng lặp (chạy từ 1 đến n)
 * @param {Array} rules - Mảng các object chứa luật [{ divisor, word }]
 */
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = ""; // Chuỗi tích lũy từ ngữ cho mỗi số i

        // Duyệt qua từng luật trong bộ rules
        for (let j = 0; j < rules.length; j++) {
            let rule = rules[j];
            
            // Nếu số hiện tại chia hết cho divisor của luật đó -> cộng từ vào chuỗi
            if (i % rule.divisor === 0) {
                output += rule.word;
            }
        }

        // Nếu sau khi quét hết các luật mà chuỗi vẫn rỗng -> in chính số i đó
        if (output === "") {
            output = i;
        }

        console.log(`${i} = "${output}"`);
    }
}

// Bộ quy tắc kiểm thử (Test Rules)
const myRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

// Chạy thử nghiệm với giới hạn n = 30 giống đề bài yêu cầu
console.log("--- Test với n = 30 ---");
customFizzBuzz(30, myRules);

// Chạy thử thêm một đoạn dài hơn để kiểm chứng các mốc 35 và 105 của đề bài
console.log("\n--- Kiểm chứng mốc đặc biệt (31 - 105) ---");
customFizzBuzz(105, myRules); 
