### Bài 0.1:
1.  File `.jsx` khác gì file `.js`?
-   `.jsx` (JavaScript XML) là một phần mở rộng cho phép viết cú pháp giống hệt HTML ngay bên trong code JavaScript. Nếu chỉ dùng .js, sẽ không thể viết <h1>Xin chào</h1> một cách trực tiếp mà phải dùng các hàm phức tạp của React

2.  Tại sao phải `export default App`?
-   Giống như việc đóng gói một sản phẩm để gửi đi, `export default` giúp component `App` có thể được gọi (import) và sử dụng ở các file khác

3.  Thử xóa export `default` → chuyện gì xảy ra?
-   Màn hình web sẽ trắng tinh hoặc báo lỗi đỏ. Ứng dụng Vite/React sẽ không biết lấy component nào để render ra giao diện vì nó không được "xuất" ra ngoài.