### Phần A

Câu A1:
1. Sơ đồ cây DOM
```
div#app
 ├── header
 │    ├── h1
 │    │    └── "Todo App" (Text node)
 │    └── nav
 │         ├── a (class="active", href="#")
 │         │    └── "All" (Text node)
 │         ├── a (href="#")
 │         │    └── "Active" (Text node)
 │         └── a (href="#")
 │              └── "Completed" (Text node)
 └── main
      ├── form#todoForm
      │    ├── input#todoInput (type="text")
      │    └── button (type="submit")
      │         └── "Add" (Text node)
      └── ul#todoList
           ├── li (class="todo-item")
           │    └── "Learn HTML" (Text node)
           └── li (class="todo-item completed")
                └── "Learn CSS" (Text node)
```

2. Viết querySelector cho mỗi yêu cầu
-   Chọn thẻ `<h1>`:
```
document.querySelector('h1');
```

-   Chọn input trong form:
```
document.querySelector('#todoForm input');
```

-   Chọn tất cả `.todo-item`:
```
document.querySelectorAll('.todo-item');
```

-   Chọn link đang active:
```
document.querySelector('a.active');
```

-   Chọn `<li>`đầu tiên trong `#todoList`:
```
document.querySelector('#todoList li');
```

-   Chọn tất cả `<a>` bên trong `<nav>`:
```
document.querySelectorAll('nav a');
```

Câu A2:
### So sánh `innerHTML` và `textContent`

|  | `innerHTML` | `textContent` |
| :--- | :--- | :--- |
| **Mục đích** | Lấy hoặc thay đổi **cấu trúc HTML** bên trong phần tử. | Lấy hoặc thay đổi **nội dung văn bản thuần túy** (raw text). |
| **Xử lý HTML** | **Có biên dịch**. Trình duyệt parse chuỗi truyền vào thành các thẻ HTML thực sự. | **Không biên dịch**. Coi toàn bộ chuỗi là văn bản thô (tự động escape thẻ HTML). |
| **Bảo mật**| Rất dễ bị tấn công XSS nếu chèn dữ liệu trực tiếp từ người dùng. | Trình duyệt không thực thi bất kỳ mã script hay thẻ HTML nào. |
| **Hiệu năng** | Chậm hơn vì phải phân tích lại cú pháp và xây dựng lại cây DOM. | Nhanh hơn vì trình duyệt chỉ việc chèn trực tiếp chuỗi văn bản vào node. |
| **Khi nào dùng?** | Khi cần tạo ra các cấu trúc HTML mới và đảm bảo 100% nguồn dữ liệu đó an toàn. | Khi cần hiển thị văn bản, đặc biệt là dữ liệu do người dùng nhập vào (input). |

-   Câu hỏi bảo mât:
    -   Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi ứng dụng web nhận dữ liệu không đáng tin cậy từ người dùng và chèn thẳng vào giao diện mà không qua xử lý.

    -   Khi  gán một chuỗi vào thuộc tính innerHTML, trình duyệt sẽ cố gắng biên dịch chuỗi đó thành HTML. Ví dụ, trong quá trình phát triển các tính năng hiển thị sản phẩm hoặc ô tìm kiếm cho các dự án web như ShopTLU, nếu bạn cho phép hiển thị trực tiếp từ khóa tìm kiếm của người dùng bằng innerHTML, hacker có thể nhập vào các đoạn mã độc thay vì văn bản thông thường.

-   Ví dụ:
```
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// Cách sửa: Dùng textContent thay vì innerHTML
document.querySelector("#result").textContent = userInput; // <- An toàn tuyệt đối!
```

Câu A3:
1. Khi click vào button:ư
-   Thứ tự `console.log` sẽ in ra:
```
BUTTON
INNER
OUTER
```

2. Khi uncomment `e.stopPropagation()`:
-   Thứ tự `console.log` sẽ in ra:
```
BUTTON
```

### Phần C
Câu C1:
1. Sai tên sự kiện trong `addEventListener` (Dòng 20)

-   Lỗi: `addEventListener("onclick", ...)`

-   Sửa thành: `addEventListener("click", ...)`

2. Gán giá trị sai cho thẻ DOM và hằng số (Dòng 27)

-   Lỗi: countDisplay = count;

-   Sửa thành: `countDisplay.textContent = count;` 

3. Cách làm rỗng innerHTML chưa chuẩn (Dòng 28)

-   Lỗi: `historyList.innerHTML = null;`

-   Sửa thành: `historyList.innerHTML = "";`

4. Quên gọi hàm (Dòng 44)

-   Lỗi: `item.remove;`

-   Sửa thành: `item.remove();`

5. Lỗi kiểu dữ liệu khi lấy từ localStorage (Dòng 57)

-   Lỗi: `count = localStorage.getItem("count");`

-   Sửa thành: Bọc `parseIn`t để ép kiểu: `count = parseInt(localStorage.getItem("count")) || 0;`

6. Bỏ quên dữ liệu khi Load (Dòng 56-59)

-   Lỗi: lưu history vào localStorage (dòng 52), nhưng khi load lại trang thì lại quên lấy nó ra hiển thị, khiến lịch sử bị mất mỗi khi F5.

-   Sửa thành: Bổ sung `historyList.innerHTML = localStorage.getItem("history") || "";` vào bên trong khối sự kiện `"load"`.

7. Lỗi logic mất Event Listener khi dùng `innerHTML` 

-   Lỗi: Khi lưu `historyList.innerHTML` vào localStorage và load lại bằng cách gán `innerHTML = ...`, các thẻ `<li>` sẽ được vẽ lại dưới dạng HTML thuần túy. Điều này làm mất đi sự kiện `click` đã được gắn cho từng thẻ `<li>` trước đó (hàm deleteHistory). Sẽ không thể click để xoá lịch sử sau khi load lại trang.

-   Cách khắc phục: Cần áp dụng kỹ thuật Event Delegation (Ủy quyền sự kiện). Thay vì gắn sự kiện cho từng thẻ `<li>`, ta gắn một sự kiện duy nhất cho thẻ cha `#history` (tức là `historyList`). Khi click vào trong danh sách, ta kiểm tra xem mục tiêu bị click có phải là `<li>` không, nếu đúng thì xoá.

```
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// Tính năng History: Ghi lại lịch sử (dùng chung cho cả Tăng và Giảm)
function addHistoryRecord() {
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
}

// 1. Nút tăng
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    addHistoryRecord();
});

// 2. Nút giảm (Đã sửa lỗi "onclick")
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
    addHistoryRecord(); // Thêm lưu lịch sử cho nút giảm để logic đầy đủ hơn
});

// 3. Nút reset (Đã sửa lỗi gán hằng số và innerHTML = "")
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; 
    historyList.innerHTML = ""; 
});

// 4. Uỷ quyền sự kiện xoá History (Khắc phục lỗi 7: mất event khi load localStorage)
// Xoá hàm deleteHistory cũ, thay bằng:
historyList.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName === "LI") {
        e.target.remove();
    }
});

// 5. Nút xoá tất cả lịch sử (Đã sửa lỗi thiếu () ở hàm remove)
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); 
    });
});

// 6. Lưu vào localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// 7. Tải lên từ localStorage (Đã sửa lỗi parseInt và quên load History)
window.addEventListener("load", () => {
    // Ép kiểu về số, nếu không có thì mặc định là 0
    count = parseInt(localStorage.getItem("count")) || 0; 
    countDisplay.textContent = count;
    
    // Khôi phục lại HTML của lịch sử
    historyList.innerHTML = localStorage.getItem("history") || ""; 
});
```

Câu C2:
1.  Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?
-   Việc gắn `bind` sự kiện trực tiếp lên 1000 phần tử là một "bad practice" vì:
    -   Ngốn bộ nhớ : Mỗi lần gọi `addEventListener`, trình duyệt phải tạo ra một đối tượng (object) hàm mới trong bộ nhớ. 1000 elements đồng nghĩa với việc có 1000 hàm lắng nghe sự kiện tồn tại song song, làm tăng đáng kể mức tiêu thụ RAM của trình duyệt.
    -   Giảm hiệu năng khởi tạo: Quá trình duyệt qua 1000 phần tử và gắn sự kiện sẽ tiêu tốn thời gian xử lý của CPU, có thể gây giật lag (blocking the main thread) khi trang web vừa tải xong.
    -   Không hoạt động với phần tử động (Dynamic Elements): Nếu sau này thêm phần tử thứ 1001 vào DOM bằng JavaScript, phần tử mới đó sẽ KHÔNG có sự kiện. Sẽ lại phải viết code để gán sự kiện cho riêng nó.

-   Event Delegation giải quyết vấn đề này như thế nào?
    -   Event Delegation (Ủy quyền sự kiện) tận dụng cơ chế Event Bubbling (nổi bọt sự kiện).
    -   Thay vì gắn 1000 sự kiện cho 1000 thẻ con, chỉ cần gắn 1 sự kiện duy nhất cho thẻ cha bao bọc chúng. Khi click vào một thẻ con, sự kiện sẽ "nổi bọt" lên thẻ cha. Tại thẻ cha, dùng thuộc tính event.target để kiểm tra xem thẻ con nào vừa bị click và xử lý tương ứng.

2.  Refactor dùng DocumentFragment để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.
```
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Nối div vào fragment, KHÔNG nối thẳng vào document.body
    fragment.appendChild(div); 
}

// Sau khi vòng lặp kết thúc, nối toàn bộ fragment vào DOM trong 1 lần duy nhất
document.body.appendChild(fragment);
```
-   tại sao cách này nhanh hơn:
    -   code cũ: Hàm document.body.appendChild(div) nằm ngay trong vòng lặp. Cứ mỗi lần một div được thêm vào cây DOM thật, trình duyệt buộc phải tính toán lại kích thước, vị trí của toàn bộ trang web (gọi là Reflow) và vẽ lại giao diện (gọi là Repaint). Làm điều này 1000 lần liên tục sẽ khiến trình duyệt bị quá tải và trang web bị đơ.
    -   `DocumentFragment: DocumentFragment` giống như một chiếc hộp rỗng nằm hoàn toàn trong bộ nhớ RAM, tách biệt hoàn toàn với giao diện trang web đang hiển thị (DOM Tree).
    -   Khi `appendChild` 1000 cái `div` vào `fragment`, mọi thứ chỉ xảy ra âm thầm trong bộ nhớ, trình duyệt không hề bị kích hoạt Reflow hay Repaint.
    -   Đến cuối cùng, khi `fragment` đó đổ vào `document.body`, trình duyệt chỉ lấy các thẻ `div` bên trong ra và chèn vào giao diện. Quá trình này chỉ gây ra đúng 1 lần Reflow và Repaint duy nhất, giúp tối ưu hiệu năng render lên mức tối đa.