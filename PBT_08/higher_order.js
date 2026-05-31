
// 1. pipe() – Nối chuỗi functions (Chạy từ trái sang phải / trên xuống dưới)
function pipe(...fns) {
  return function(initialValue) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}

// 2. memoize() – Cache kết quả tính toán
function memoize(fn) {
  const cache = {}; 
  
  return function(...args) {
    const key = JSON.stringify(args); 
    
    if (cache[key] !== undefined) {
      return cache[key];
    }
    
    const result = fn.apply(this, args);
    cache[key] = result; 
    return result;
  };
}

// 3. debounce() – Chờ user ngừng thao tác (ví dụ: gõ phím) mới thực hiện
function debounce(fn, delay) {
  let timeoutId; 
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 4. retry() – Thử lại nếu hàm bất đồng bộ bị lỗi
async function retry(fn, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn(); 
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      console.log(`Lần thử ${attempt} thất bại. Đang thử lại...`);
    }
  }
}


// === TEST 1: PIPE ===
const process = pipe(
  x => x * 2,          // 5 -> 10
  x => x + 10,         // 10 -> 20
  x => x.toString(),   // 20 -> "20"
  x => "Kết quả: " + x
);
console.log("=== BÀI 1: PIPE ===");
console.log(process(5)); // -> "Kết quả: 20"

// === TEST 2: MEMOIZE ===
const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});
console.log("\n=== BÀI 2: MEMOIZE ===");
console.log(expensiveCalc(1000000)); // -> In ra "Đang tính..." rồi in kết quả
console.log(expensiveCalc(1000000)); // -> Không in "Đang tính...", lấy thẳng kết quả từ cache

// === TEST 3: DEBOUNCE ===
const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

console.log("\n=== BÀI 3: DEBOUNCE ===");
search("a");
search("ap");
search("app");
search("appl");
search("apple"); // Chỉ lần gọi cuối cùng này (apple) mới thực sự chạy sau 500ms

// === TEST 4: RETRY ===
console.log("\n=== BÀI 4: RETRY ===");
let failCount = 0;
const unstableAPI = async () => {
  failCount++;
  if (failCount < 3) throw new Error("Mạng chập chờn!");
  return "Lấy dữ liệu thành công!";
};

// Hàm này sẽ thất bại 2 lần đầu và thành công ở lần thứ 3
retry(unstableAPI, 3)
  .then(res => console.log(res))
  .catch(err => console.error(err.message));