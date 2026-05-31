### Phàn A
Câu A1:
1.  Function Declaration
```
function tinhThueBaoHiem(luong) {
  let thue = 0;
  
  if (luong > 11000000) {
    thue = luong * 0.1; // Thuế 10%
  }
  
  let thuc_nhan = luong - thue;
  
  return { thue, thuc_nhan };
}
```
2.  Function Expression
```
const tinhThueBaoHiem = function(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  const thuc_nhan = luong - thue;
  
  return { thue, thuc_nhan };
};
```

3.  Arrow Function
```
const tinhThueBaoHiem = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  const thuc_nhan = luong - thue;
  
  return { thue, thuc_nhan };
};
```

-   3 cách này có sự khác biệt rất lớn về cơ chế Hoisting
1.  Function Declaration
    -   Giải thích: Trong giai đoạn khởi tạo, JavaScript engine sẽ quét toàn bộ file và đưa toàn bộ định nghĩa hàm này vào bộ nhớ. Do đó, có thể gọi hàm ở bất kỳ vị trí nào, kể cả trước khi dòng khai báo hàm xuất hiện.
```
// CÓ THỂ GỌI TRƯỚC KHI KHAI BÁO
console.log(tinhThueDeclaration(15000000)); 
// Kết quả trả về bình thường: { thue: 1500000, thuc_nhan: 1350000 }

function tinhThueDeclaration(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
}
```

2.  Function Expression
    -   Giải thích: Khi dùng `const` hoặc `let`, biến đó sẽ bị đưa vào vùng gọi là Temporal Dead Zone (TDZ - Vùng chết tạm thời) trong giai đoạn khởi tạo. Không được phép truy cập hay gọi biến này trước khi dòng code gán giá trị cho nó được chạy qua.
```
// GỌI TRƯỚC KHI KHAI BÁO SẼ BỊ LỖI
console.log(tinhThueExpression(15000000)); 
// ❌ Lỗi hệ thống: ReferenceError: Cannot access 'tinhThueExpression' before initialization

const tinhThueExpression = function(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};
```

3.  Arrow Function
    -   Giải thích: Arrow Function là một giá trị hàm (hàm ẩn danh) được gán vào một biến. Do đó cơ chế hoisting của nó phụ thuộc 100% vào việc khai báo biến đó bằng từ khóa nào (const, let hay var). Khi dùng const, việc gọi trước khi khai báo cũng sẽ gây ra lỗi ReferenceError do cơ chế TDZ.
```
// GỌI TRƯỚC KHI KHAI BÁO SẼ BỊ LỖI
console.log(tinhThueArrow(15000000)); 
// ❌ Lỗi hệ thống: ReferenceError: Cannot access 'tinhThueArrow' before initialization

const tinhThueArrow = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};
```

Câu A2:
-   Dự đoán Output:
-   Đoạn 1:
```
1
2
3
2
2
```
-   Đoạn 2:
```
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```
-   Tại sao `var` và `let` cho kết quả khác nhau trong vòng lặp setTimeout?

1. Vòng lặp với `var`
-   Phạm vi : Khai báo `var` có phạm vi theo hàm (function scope) hoặc toàn cục (global scope). Nó không có phạm vi theo khối (block scope).

-   Điều gì xảy ra: Chỉ có duy nhất một biến `i` được tạo ra trong toàn bộ quá trình chạy vòng lặp thứ nhất.

-   Khi vòng lặp kết thúc, giá trị của biến `i` lúc này là `3` (điều kiện để thoát vòng lặp).

-   Đến khi 100ms trôi qua, 3 hàm callback của `setTimeout` mới bắt đầu chạy. Chúng nhìn ra ngoài để tìm biến `i`, và tất cả đều trỏ đến cùng một biến `i` duy nhất đó, lúc này đã mang giá trị là `3`.


2. Vòng lặp với `let`
-   Phạm vi : Khai báo `let` có phạm vi theo khối (block scope - những gì nằm giữa cặp ngoặc nhọn `{}`).

-   Điều gì xảy ra: Đây là một cơ chế đặc biệt của ES6 dành riêng cho `let` trong vòng lặp `for`. Với mỗi vòng lặp (mỗi iteration), JavaScript sẽ tạo ra một biến `j` hoàn toàn mới và riêng biệt (một block scope mới).

-   Khi `setTimeout` đăng ký hàm callback, mỗi hàm callback sẽ "bắt" (capture) lấy cái biến `j` riêng biệt của vòng lặp đó thông qua cơ chế Closure.

-   Kết quả là, mặc dù vòng lặp đã chạy xong, ta có 3 hàm callback trỏ đến 3 biến `j` khác nhau trong bộ nhớ: biến `j` của vòng 1 (giá trị 0), biến `j` của vòng 2 (giá trị 1), và biến `j` của vòng 3 (giá trị 2). Do đó, nó in ra `0`, `1`, `2` chính xác như kỳ vọng.

Câu A3:
```
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const bai1 = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const bai2 = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const bai3 = nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
const bai4 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const bai5 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const bai6 = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const bai7 = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
const bai8 = [...nums].reverse(); 
```

Câu A4:
1. Destructuring
```
console.log(name, price, ram, color); 
// Output: iPhone 16 25990000 8 Titan

console.log(specs); 
// Output: ❌ ReferenceError: specs is not defined
```

2.  Spread
```
console.log(updated.price); 
// Output: 23990000 (Ghi đè giá trị price cũ vì nó nằm sau ...product)

console.log(updated.sale); 
// Output: true (Thuộc tính mới được thêm vào)

console.log(product.price); 
// Output: 25990000 (Gốc KHÔNG đổi)
```

3. Spread gotcha
```
console.log(product.specs.ram); 
// Output: 16
```
### Phần C
Câu C1:
```
const processOrders = orders => orders
  .filter(({ status, total }) => status === "completed" && total > 100000)
  .map(({ id, customer, total }) => ({
    id, customer, total,
    discount: total * 0.1,
    finalTotal: total - (total * 0.1)
  }))
  .sort((a, b) => b.finalTotal - a.finalTotal);
```

Câu C2:
```
const miniArray = {
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }
    return result;
  },

  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  },

  reduce(arr, fn, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    if (initialValue === undefined) {
      if (arr.length === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      accumulator = arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      accumulator = fn(accumulator, arr[i], i, arr);
    }
    
    return accumulator;
  }
};

console.log(miniArray.map([1, 2, 3], x => x * 2));         // Output: [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));   // Output: [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // Output: 10