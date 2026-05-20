### Phần A:
Câu A1:
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case phổ biến |
| :--- | :--- | :--- | :--- | :--- |
| `static` | **Có** | Normal document flow (Mặc định) | **Có** | Layout mặc định của hầu hết các thẻ HTML. |
| `relative` | **Có** | Vị trí ban đầu của chính nó | **Có** | Dịch chuyển vị trí phần tử một chút; hoặc quan trọng nhất là làm mốc (container) cho thẻ con `absolute`. |
| `absolute` | **Không** (Bị rút khỏi flow) | Nearest positioned ancestor | **Có** | Tạo nút đóng (X) ở góc thẻ, tooltip, dropdown menu, hoặc các nhãn "Sale" đè lên ảnh sản phẩm. |
| `fixed` | **Không** (Bị rút khỏi flow) | Viewport (Khung nhìn trình duyệt) | **Không** (Ghim cố định) | Thanh điều hướng (navbar/header) cố định trên cùng, nút "Back to top", icon chat góc dưới màn hình. |
| `sticky` | **Có** | Normal flow cho đến khi đạt ngưỡng cuộn (offset), sau đó tham chiếu theo container chứa nó. | **Lúc đầu có**, sau đó ghim lại khi chạm ngưỡng. | Cố định tiêu đề của bảng (table header) khi cuộn nội dung bảng dài, thanh sidebar mục lục bài viết. |

-   Câu hỏi thêm:
        1. Khi nào `absolute` tham chiếu `body`?
            Khi phần tử `absolute` quét dọc theo cây DOM từ trong ra ngoài nhưng **không tìm thấy bất kỳ thẻ tổ tiên nào** có thuộc tính `position` khác `static`. Khi đó, nó hết chỗ bám và buộc phải lấy mốc tọa độ gốc (0,0) của tài liệu (`initial containing block`, thường tương ứng với vị trí bao trọn khu vực hiển thị ban đầu)
        2. Khi nào 'absolute' tham chiếu 'parent'?
            khi thẻ cha đó được thiết lập một thuộc tính `position` khác `static` (cụ thể là `relative`, `absolute`, `fixed`, hoặc `sticky`).
        3. Giải thích khái niệm "nearest positioned ancestor"
            -   Positioned ancestor: Là bất kỳ thẻ bọc ngoài nào (cha, ông, cụ...) của phần tử hiện tại được gán thuộc tính `position` **khác `static`**.
            -   Trình duyệt không chỉ kiểm tra thẻ cha trực tiếp mà sẽ đi ngược lên cây DOM (từ trong ra ngoài). Nó gặp phần tử "positioned" nào **đầu tiên** thì sẽ dừng lại ngay lập tức và chọn phần tử đó làm mốc gốc tọa độ (0,0) cho các thuộc tính `top`, `bottom`, `left`, `right`, bất chấp việc các thẻ bọc ngoài xa hơn cũng có thể đang có `position`.

Câu A2:
-   Trường hợp 1:
```text
+---------------------------------------------------------------+
| +------------+  +------------+  +------------+  +-----------+ |
| |   Item 1   |  |   Item 2   |  |   Item 3   |  |   Item 4  | |
| | (25% width)|  | (25% width)|  | (25% width)|  |(25% width)| |
| +------------+  +------------+  +------------+  +-----------+ |
+---------------------------------------------------------------+
```

-   Trường hợp 2:
```text
+-------------------------------------------------------+
|    +--------------------+       +--------------------+    |
|    |       Item 1       |       |       Item 2       |    |
|    +--------------------+       +--------------------+    |
|                                                           |
|    +--------------------+       +--------------------+    |
|    |       Item 3       |       |       Item 4       |    |
|    +--------------------+       +--------------------+    |
|                                                           |
|    +--------------------+       +--------------------+    |
|    |       Item 5       |       |       Item 6       |    |
|    +--------------------+       +--------------------+    |
+-------------------------------------------------------+
```

-   Trường hợp 3:
```text
+---------------------------------------------------------------+
|                                                               |
|  +--------+                    +--------+           +--------+|
|  | Item 1 |                    | Item 2 |           | Item 3 ||
|  +--------+                    +--------+           +--------+|
|                                                               |
+---------------------------------------------------------------+
```

-   Trường hợp 4:
```text
+---------------------------------------------------------------+
| +-------+   +-----------------------------------+   +-------+ |
| | 200px |   |             1fr                   |   | 200px | |
| |Item 1 |gap|           Item 2                  |gap|Item 3 | |
| +-------+   +-----------------------------------+   +-------+ |
+---------------------------------------------------------------+
```

-   Trường hợp 5:
```text
+-------------------------------------------------------+
| +--------------+   +--------------+   +--------------+|
| |    Item 1    |   |    Item 2    |   |    Item 3    ||
| +--------------+   +--------------+   +--------------+|
|                                                       |
| +--------------+   +--------------+   +--------------+|
| |    Item 4    |   |    Item 5    |   |    Item 6    ||
| +--------------+   +--------------+   +--------------+|
|                                                       |
| +--------------+                                      |
| |    Item 7    |      (trống)            (trống)      |
| +--------------+                                      |
+-------------------------------------------------------+
```
### Phần C:
Câu C1:
1. Navigation bar ngang (logo + menu + buttons)
    Lựa chọn: Flexbox

    Giải thích: Flexbox được sinh ra để xử lý các layout 1 chiều. Nó cung cấp các công cụ hoàn hảo để căn giữa theo chiều dọc (align-items: center) và phân bổ khoảng trống linh hoạt giữa các nhóm phần tử (justify-content: space-between để đẩy logo và nút bấm ra hai bên).

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
    Lựa chọn: Grid

    Giải thích: Vì Grid kiểm soát lưới 2 chiều rất chặt chẽ. Bằng cách dùng grid-template-columns: repeat(3, 1fr), hệ thống sẽ tự động tạo ra 3 cột bằng nhau và tự động đẩy các ảnh tiếp theo xuống hàng dưới một cách ngay ngắn, bất kể có 5, 10 hay 100 bức ảnh.

3. Layout blog: main content + sidebar
    Lựa chọn: Grid

    Giải thích: Vì có thể dễ dàng kiểm soát kích thước chính xác giữa các phần

4. Footer với 4 cột thông tin
    Lựa chọn: Grid 

    Giải thích: Dùng Grid với cú pháp grid-template-columns: repeat(4, 1fr) là cách nhanh và sạch sẽ nhất để tạo 4 cột chia đều trang, đồng thời quản lý khoảng cách bằng gap.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
    Lựa chọn: Flexbox

    Giải thích: Vì dù nhìn giống một cột trong Grid, nhưng nội bộ một thẻ card xếp từ trên xuống dưới lại là layout 1 chiều dọc. Chỉ cần đặt Card là display: flex; flex-direction: column;, sau đó margin-top: auto; cho nút bấm. Flexbox sẽ tự động tính toán khoảng trống dư thừa ở giữa và đẩy nút dính chặt xuống viền dưới cùng của card, bất chấp đoạn text miêu tả dài hay ngắn.

Câu C2:
-   Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
        Nguyên nhân: Khung .card-container sử dụng Flexbox nên mặc định các thẻ .card có chiều cao bằng nhau (align-items: stretch). Bản thân nội dung bên trong .card (ảnh, h3, nút) lại tuân theo luồng hiển thị cơ bản (normal flow). Nếu tiêu đề <h3> của card này dài xuống 2 dòng, còn card kia chỉ 1 dòng, nút .btn bên dưới sẽ nằm ở các độ cao khác nhau

-   Lỗi 2: Muốn items nằm giữa ngang lẫn dọc trong 100vh, nhưng item vẫn dính góc trái
        Nguyên nhân: Khi thêm display: flex vào .hero, nó đã trở thành flex container. Theo mặc định, flexbox căn chỉnh các phần tử con theo trục chính (trái sang phải) ở vị trí flex-start (đầu) và trục phụ ở vị trí đầu. Việc dùng text-align: center ở thẻ con chỉ giúp căn giữa phần text ở bên trong cái hộp đó, chứ không rời được cái hộp ra giữa không gian của .hero.

-   Lỗi 3: Sidebar bị co lại khi content quá dài
        Nguyên nhân: Trong Flexbox, các flex items mặc định có thuộc tính flex-shrink: 1. Điều này có nghĩa là khi không gian của thẻ cha (.layout) không đủ rộng để chứa tất cả mọi thứ, các thẻ con sẽ bị ép co nhỏ lại để nhường chỗ. Nếu phần .content có nội dung quá rộng 