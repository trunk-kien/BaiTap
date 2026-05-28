### PHÂN A
Câu A1:
// Đoạn 1
undefined
Giải thích:
-   Khai báo biến với `var x` sẽ được đẩy lên đầu phạm vi chạy, nhưng phần gán giá trị (`= 5`) thì không. Do đó, tại thời điểm gọi lệnh `console.log(x)`, máy tính hiểu là biến `x` đã tồn tại nhưng chưa có giá trị, nên nó trả về `undefined`.

// Đoạn 2
ReferenceError: Cannot access 'y' before initialization
Giải thích:
-   chúng bị đưa vào một trạng thái gọi là Temporal Dead Zone (TDZ) Vùng chết tạm thời. Bạn không thể truy cập vào biến `y` trước khi dòng code gán giá trị thực sự được chạy.

// Đoạn 3:
TypeError: Assignment to constant variable.
Giải thích:
-   `const` (constant) là dùng để khai báo hằng số. Khi đã khởi tạo `const z = 15;`, không thể gán lại cho nó một giá trị mới (`z = 20;`).

// Đoạn 4:
[1, 2, 3, 4]
Giải thích:
-   `const` chỉ ngăn cản việc gán lại (re-assign) một địa chỉ bộ nhớ mới cho biến.
-   Vì `arr` là một kiểu dữ liệu tham chiếu (Array/Object), không thể gán `arr = [5, 6]` nhưng hoàn toàn có thể "thay đổi phần tử bên trong" (mutate) mảng đó bằng các hàm như .push(), .pop(),....

// Đoạn 5:
Trong block: 2
Ngoài block: 1
Giải thích:
-   Biến `let a = 2;` được khai báo bên trong khối lệnh hoàn toàn tách biệt và sẽ che khuất (shadow) biến `let a = 1;` ở bên ngoài. Khi ra khỏi cặp ngoặc nhọn `{ }`, biến a bên trong bị hủy, và `console.log` cuối cùng sẽ gọi đến biến `a = 1` ở phạm vi ngoài cùng.

Câu A2:
console.log(typeof null);        // "object" 
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number"
console.log("5" + 3);            // "53"
console.log("5" - 3);            // 2
console.log("5" * "3");          // 15
console.log(true + true);        // 2
console.log([] + []);            // "" (chuỗi rỗng)
console.log([] + {});            // "[object Object]"
console.log({} + []);            // "[object Object]"

-   sự khác biệt giữa "5" + 3 và "5" - 3:
-   `"5" + 3` ra `"53"`: Toán tử `+` trong JavaScript có hai tác dụng: cộng số học và nối chuỗi. Khi sử dụng toán tử + mà một trong hai toán hạng là chuỗi (String), JavaScript sẽ ưu tiên hành vi nối chuỗi. Do đó, số `3` bị ép kiểu ngầm định thành chuỗi `"3"`, và `"5" + "3"` kết hợp lại thành `"53"`.
-   `"5" - 3` ra `2`: Khác với `+`, toán tử `- `(cũng như `*`, `/`, `%`) chỉ dành cho các phép tính toán học. Khi thấy toán tử này, JavaScript hiểu rằng bạn muốn làm toán, nên nó sẽ cố gắng ép kiểu chuỗi `"5"` về dạng số (Number) là `5`. Sau đó thực hiện phép trừ `5 - 3`, kết quả là `2`

Câu A3:
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true

Quy tắc: Từ giờ trở đi, bạn nên dùng `==` hay `===`? Tại sao?
1.  Tránh lỗi ngầm (Bug) khó tìm: Cơ chế tự động ép kiểu của == rất dễ gây ra những kết quả phi logic (như ở ví dụ "" == false hay 0 == false). Trong các dự án thực tế, điều này dễ dẫn đến việc logic chạy sai mà không hề có cảnh báo lỗi (crash) nào.

2.  Code tường minh, dễ đọc: Khi viết ===, khẳng định chắc chắn rằng: "Tôi muốn hai giá trị này phải giống nhau cả về giá trị lẫn kiểu dữ liệu". Người khác đọc code sẽ hiểu ngay logic mà không cần đoán xem JavaScript có đang tự ép kiểu hay không

3.  Hiệu năng tốt hơn (dù rất nhỏ): Toán tử === không phải tốn thêm bước kiểm tra và chuyển đổi kiểu dữ liệu như == nếu hai vế khác kiểu.

Câu A4:
if ("0") console.log("A");           // In
if ("") console.log("B");            // Không in
if ([]) console.log("C");            // In
if ({}) console.log("D");            // In
if (null) console.log("E");          // Không in
if (0) console.log("F");             // Không in
if (-1) console.log("G");            // In
if (" ") console.log("H");           // In

Câu A5:
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
```
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

### PHẦN C
Câu C1:
Lỗi 1: Gán giá trị trong câu lệnh điều kiện (Critical Bug)
-   Code lỗi: `if (giaSauGiam = 0)`

-   Giải thích: Thay vì so sánh, code lại sử dụng toán tử gán `=`. Lệnh này sẽ gán biến `giaSauGiam` thành `0` (là một giá trị falsy). Khối lệnh `if` sẽ không bao giờ được thực thi, đồng thời làm sai luôn kết quả `return` cuối cùng của hàm (hàm luôn trả về 0 nếu chạy đến đây).

-   Cách sửa:   Sử dụng toán tử so sánh tuyệt đối `===`. `if (giaSauGiam === 0)`

Lỗi 2: Truyền sai kiểu dữ liệu (Type Coercion Risk)
-   Code lỗi: `tinhGiaGiamGia("100000", 20)`

-   Giải thích: Việc truyền chuỗi `"100000"` vào làm phép toán có thể hoạt động do cơ chế ép kiểu ngầm định (implicit coercion) của JS, nhưng đây là một thói quen cực kỳ rủi ro trong môi trường thực tế, dễ dẫn đến các lỗi như cộng dồn chuỗi (ví dụ: `"100000" + 20`thành `"10000020"`).

-   Cách sửa:   Truyền đúng kiểu số nguyên (Number). `tinhGiaGiamGia(100000, 20)`

Lỗi 3: Kiểu dữ liệu trả về không đồng nhất (Inconsistent Return Type)
-   Code lỗi: Hàm trả về `String` (`"Phần trăm giảm không hợp lệ"`) khi lỗi, và trả về `Number` (`giaSauGiam`) khi chạy đúng.

-   Giải thích: Ở phần test `gia2`, nếu input sai, hàm trả về một chuỗi. Nếu hệ thống tiếp tục mang `gia2` đi tính toán thì sẽ sinh ra lỗi `NaN` lan truyền khắp ứng dụng

-   Cách sửa:   Khi có lỗi input, ném ra ngoại lệ (Exception) để ngắt luồng thực thi thay vì return string. `throw new Error("Phần trăm giảm không hợp lệ")`

Lỗi 4 & 5: Quản lý scope kém với var và biến có thể thay đổi
-   Code lỗi:   `var giamGia = ... và let giaSauGiam = ...`

-   Giải thích: `var` có function scope, dễ gây rò rỉ biến và hoisting ngoài ý muốn. Cả `giamGia` và `giaSauGiam` đều không bị gán lại trong suốt quá trình chạy (sau khi đã fix Lỗi 1), do đó việc dùng `var` hay `let` là không tối ưu.
-   Cách sửa:   Đổi sang dùng `const` để đảm bảo tính bất biến (immutability) cho dữ liệu. `const giamGia = ... và const giaSauGiam = ...`

Lỗi 6: Thiếu dấu chấm phẩy (;)
-   Code lỗi: Hầu hết các dòng lệnh đều thiếu `;` ở cuối.

-   Cách sửa:   Thêm `;` vào cuối tất cả các câu lệnh khai báo, thực thi hoặc return.

Lỗi "ẩn" với var trong vòng lặp
-   Hiện tượng: Hiện tượng: Thay vì in ra từ `Item 0` đến `Item 4`, console sẽ in ra `Item 5` lặp lại 5 lần sau 1 giây. 

-   Giải thích: 
    -   Biến khai báo bằng `var` có phạm vi function (function scope) hoặc toàn cục, không có phạm vi khối (block scope). Do đó, chỉ có duy nhất một biến `i` tồn tại trong bộ nhớ.
    -   Hàm `setTimeout` là bất đồng bộ. Vòng lặp `for` chạy rất nhanh và kết thúc (lúc này `i` đã tăng lên `5`) trước khi các hàm callback trong `setTimeout` kịp thực thi.
    -   Khi các `callback` chạy, chúng đều trỏ đến cùng một biến `i` duy nhất trong bộ nhớ (lúc này đang mang giá trị là 5).

-   Cách sửa bằng `let`:    thay `var` bằng `let`