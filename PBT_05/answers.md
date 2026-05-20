### Phần A
Câu A1:
1. Thẻ <meta viewport> chuẩn
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
-   Giải thích từng thuộc tính:
    -   name="viewport": Báo cho trình duyệt biết rằng thẻ meta này dùng để cấu hình viewport (vùng hiển thị nội dung của trang web trên màn hình)

    -   width=device-width: Thiết lập chiều rộng của viewport bằng đúng với chiều rộng thực tế của màn hình thiết bị (tính bằng CSS pixels). Nếu không có thuộc tính này, trang web sẽ không biết màn hình thiết bị rộng bao nhiêu để tự điều chỉnh

    -   initial-scale=1.0: Thiết lập mức độ thu phóng (zoom) ban đầu khi trang web vừa được tải xong là 100% (không phóng to hay thu nhỏ).
    
2. Nếu thiếu thẻ <meta viewport>, các trình duyệt trên thiết bị di động sẽ mặc định cho rằng trang web này được thiết kế dành cho màn hình Desktop

3. Mobile-First vs Desktop-First
-   Sự khác nhau:
    -   Mobile-First : Viết CSS mặc định cho các màn hình nhỏ (điện thoại) trước. Sau đó, dùng Media Query với thuộc tính min-width để bổ sung và mở rộng layout khi màn hình lớn dần lên (Tablet, Desktop). Đây là phương pháp "Progressive Enhancement" (nâng cấp dần).

    -   Desktop-First : Viết CSS mặc định cho các màn hình lớn (Desktop) trước. Sau đó, dùng Media Query với thuộc tính max-width để ghi đè, ẩn bớt hoặc bóp nhỏ các thành phần khi màn hình nhỏ lại. Đây là phương pháp "Graceful Degradation" (thoái hóa dần).

    VD CSS với breakpoint 768px:

    -   Cách 1: mobile-first

            .sidebar {
                display: none; /* Ẩn sidebar trên điện thoại cho gọn */
                width: 100%;
            }

            @media (min-width: 768px) {
                .sidebar {
                    display: block;
                    width: 250px;
                }
            }
        
    -   Cách 2: desktop-first

            .sidebar {
                display: block;
                width: 250px;
            }

            @media (max-width: 767px) {
                .sidebar {
                    display: none; /* Phải viết code để giấu đi */
                    width: 100%;
                }
            }

    Tại sao Mobile-First được khuyên dùng:
    -   Tối ưu hiệu suất (Performance): Các thiết bị di động thường có vi xử lý yếu hơn và mạng chậm hơn Desktop. Code Mobile-First giúp điện thoại chỉ phải đọc và tải những đoạn CSS cốt lõi, nhẹ nhàng nhất mà không phải tải nguyên một cục CSS nặng nề của Desktop rồi lại tốn công xử lý để "ghi đè/xóa bỏ" chúng

    -   Tối ưu UX (Trải nghiệm người dùng): Nó ép lập trình viên và designer phải tập trung vào những nội dung và tính năng quan trọng nhất ngay từ đầu trên một không gian chật hẹp. Việc "thêm mắm thêm muối" từ không gian nhỏ lên không gian lớn luôn dễ dàng và hợp lý hơn là cố gắng nhồi nhét một giao diện khổng lồ vào một cái màn hình nhỏ

Câu A2:
| Tên Breakpoint | Kích thước Pixel (min-width) | Thiết bị đại diện điển hình | Số cột lưới sản phẩm (Đề xuất) |
| :--- | :--- | :--- | :--- |
| **X-Small (xs)** | `< 576px` | Điện thoại di động cầm dọc (Mobile Portrait - iPhone, Android). | **1 cột** (hoặc 2 cột nếu là sản phẩm nhỏ/icon). Giúp ảnh và chữ đủ to để nhìn và chạm. |
| **Small (sm)** | `>= 576px` | Điện thoại màn hình lớn, điện thoại cầm ngang (Mobile Landscape). | **2 cột**. Không gian đã rộng hơn một chút, đủ để chia đôi hiển thị. |
| **Medium (md)** | `>= 768px` | Máy tính bảng (Tablet cầm dọc như iPad thường). | **3 cột** (hoặc 2 cột nếu thẻ sản phẩm chứa nhiều thông tin chi tiết). |
| **Large (lg)** | `>= 992px` | Máy tính xách tay (Laptop màn hình nhỏ), Tablet cầm ngang. | **3 - 4 cột**. Layout bắt đầu giống với chuẩn web desktop thông thường. |
| **Extra large (xl)** | `>= 1200px` | Màn hình máy tính để bàn (Desktop tiêu chuẩn). | **4 - 5 cột**. Màn hình rộng rãi, có thể hiển thị nhiều sản phẩm trên cùng một hàng. |
| **Extra extra large (xxl)** | `>= 1400px` | Màn hình lớn, màn hình siêu rộng (Ultrawide monitors). | **5 - 6 cột**. Khai thác tối đa không gian để người dùng không phải cuộn trang quá nhiều. |

Câu A3:
| Chiều rộng màn hình | `.container` width |
| :--- | :--- |
| **375px (iPhone SE)** | 100% |
| **600px** | 540px |
| **800px** | 720px |
| **1000px** | 960px |
| **1400px** | 1140px |

Câu A4:
1.  Giải thích 4 tính năng chíng của SCSS
    -   Variables:  SCSS cho phép bạn lưu trữ các giá trị (như mã màu, font chữ, kích thước...) vào một biến bắt đầu bằng dấu $. Điều này giúp tái sử dụng các giá trị này trên toàn bộ file. Khi cần thay đổi màu chủ đạo của cả trang web, chỉ cần đổi giá trị ở biến đó là xong.
    -   Ví dụ:

            $primary-color: #3b82f6;
            $font-stack: Helvetica, sans-serif;
            body {
            font-family: $font-stack;
            background-color: $primary-color;
            }

    -   Nesting:    SCSS cho phép viết các bộ chọn (selectors) lồng vào nhau theo đúng cấu trúc phân cấp của HTML. Điều này giúp mã nguồn dễ đọc hơn, trực quan hơn và giảm bớt việc phải lặp lại tên của thẻ cha nhiều lần như trong CSS thuần.
    -   Ví dụ:

            nav {
                background: #333;
                padding: 10px;
            ul {
                list-style: none;
                li {
                    display: inline-block;

                    a {
                        color: white;
                        text-decoration: none;

                            &:hover { 
                                color: $primary-color;
                            }
                        }
                    }
                } 
            }

    -   Mixins:     Mixin giống như một "hàm" (function) trong CSS. Nó cho phép bạn gộp một nhóm các thuộc tính CSS lại với nhau để sử dụng nhiều lần. Khác với biến chỉ lưu 1 giá trị, Mixin có thể lưu cả một khối code và thậm chí có thể truyền tham số (arguments) vào để thay đổi linh hoạt.
    -   Ví dụ:

            @mixin flex-center($direction: row) {
                display: flex;
                flex-direction: $direction;
                justify-content: center;
                align-items: center;
            }

            .hero-section {
                @include flex-center(column); 
                height: 100vh;
            }

    -   @extend /Interface: Tính năng này cho phép một class kế thừa (dùng chung) toàn bộ các thuộc tính CSS của một class khác. Khi biên dịch ra CSS, SCSS sẽ thông minh gộp chung các class có cùng thuộc tính lại với nhau bằng dấu phẩy
    -   Ví dụ:

            .btn-basic {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }

            .btn-primary {
                @extend .btn-basic; /* Kế thừa toàn bộ từ .btn-basic */
                background-color: blue;
                color: white;
            }

2.  Tại sao trình duyệt KHÔNG đọc được file .scss? Cần bước gì để chuyển SCSS → CSS?
    -   Trình duyệt (như Chrome, Safari, Edge) được lập trình để chỉ hiểu các tiêu chuẩn web cốt lõi là HTML, CSS và JavaScript. SCSS là một ngôn ngữ tiền xử lý (CSS Preprocessor) tự chế, sở hữu những cú pháp không tồn tại trong chuẩn CSS chính thức của W3C (như vòng lặp, biến $, viết lồng nhau). Do đó, nếu đưa trực tiếp file .scss vào HTML, trình duyệt sẽ không thể hiểu và bỏ qua nó.

    -   Các bước để chuyển SCSS -> CSS:
        -   Sử dụng một công cụ hoặc trình biên dịch (như Node Sass, Dart Sass, hoặc các extension như "Live Sass Compiler" trên VS Code) để máy tính đọc file .scss, xử lý các biến, mixin, lồng ghép... và sau đó tự động sinh ra (xuất ra) một file .css tiêu chuẩn. Cuối cùng, bạn nhúng file .css chuẩn đó vào file HTML để trình duyệt sử dụng.

### Phần C
Câu C1:
-   Navigation thay đổi thế nào?
    -   Desktop (1440px): Sidebar bên trái hiển thị trạng thái mở rộng đầy đủ gồm cả icon và text (Trang chủ, Shorts, Kênh đăng ký...). Top header có một thanh tìm kiếm (Search input) dài và lớn ở chính giữa.

    -   Tablet (768px): Sidebar bên trái đã bị ẩn đi hoàn toàn để nhường chỗ cho nội dung chính, người dùng phải bấm vào nút Hamburger (☰) góc trái trên cùng để mở menu ra dưới dạng dropdown/drawer. Thanh tìm kiếm trên top header vẫn còn nhưng bị thu ngắn lại.

    -   Mobile (375px): Nút Hamburger vẫn nằm ở góc trái. Tuy nhiên, ô nhập liệu tìm kiếm (Search box) ở giữa đã bị ẩn đi hoàn toàn, chỉ còn lại icon hình kính lúp (phải bấm vào mới hiện ra ô nhập text).

-   Lưới content (Grid) thay đổi mấy cột?
    -   Desktop (1440px): Lưới video hiển thị 3 cột lớn (với khung hình hiện tại). Phần kệ Shorts phía dưới hiển thị 5 item.

    -   Tablet (768px): Lưới video giảm xuống còn 2 cột. Phần kệ Shorts giảm xuống còn hiển thị 3 item.

    -   Mobile (375px): Lưới video chỉ còn 1 cột duy nhất, mỗi ảnh thumbnail của video được phóng to chiếm 100% chiều rộng màn hình.

-   Elements nào bị ẩn trên mobile?
    -   Toàn bộ thanh Sidebar điều hướng bên trái bị ẩn đi (gom vào nút Hamburger).

    -   Ô input nhập text để tìm kiếm bị ẩn (thay bằng icon).

    -   Thanh Filter chủ đề (Tất cả, Trò chơi, Trực tiếp...) bị che khuất phần lớn do thiếu diện tích, người dùng bắt buộc phải vuốt ngang (scroll-x) để xem các thẻ còn lại.

-   Font size có thay đổi không?
    -   Có. Dựa vào ảnh, font size tiêu đề video và tên kênh trên Mobile được điều chỉnh nhỏ hơn một chút so với bản Desktop để vừa vặn với kích thước màn hình hẹp, tránh việc text bị rớt quá nhiều dòng chiếm diện tích.

Câu C2:
1. Mobile 
    ```text
    +-------------------------+
    |   HEADER (Logo + SĐT)   |
    +-------------------------+
    |                         |
    |       HERO IMAGE        |
    |                         |
    +-------------------------+
    |      FORM ĐẶT BÀN       |
    |    (Ưu tiên hiển thị)   |
    +-------------------------+
    |         MÓN ĂN          |
    |  [Ảnh 1]   |  [Ảnh 2]   |
    |  [Ảnh 3]   |  [Ảnh 4]   |
    |  [Ảnh 5]   |  [Ảnh 6]   |
    +-------------------------+
    |         FOOTER          |
    +-------------------------+
    ```

2. Tablet
    ```text
    +-----------------------------------+
    |        HEADER (Logo + SĐT)        |
    +-----------------------------------+
    |                                   |
    |            HERO IMAGE             |
    |                                   |
    +-----------------+-----------------+
    |                 |                 |
    |  FORM ĐẶT BÀN   |  GOOGLE MAPS    |
    |                 |                 |
    +-----------------+-----------------+
    |              MÓN ĂN               |
    | [Ảnh 1]   |   [Ảnh 2]   | [Ảnh 3] |
    | [Ảnh 4]   |   [Ảnh 5]   | [Ảnh 6] |
    +-----------------------------------+
    |              FOOTER               |
    +-----------------------------------+
    ```
3. Desktop
    ```text
    +---------------------------------------------------+
    |               HEADER (Logo + SĐT)                 |
    +---------------------------------------------------+
    |                                                   |
    |                   HERO IMAGE                      |
    |                                                   |
    +---------------------------------+-----------------+
    |             MÓN ĂN              |                 |
    | [Ảnh 1]  |  [Ảnh 2]  |  [Ảnh 3] |   FORM ĐẶT BÀN  |
    | [Ảnh 4]  |  [Ảnh 5]  |  [Ảnh 6] |    (Sticky      |
    +---------------------------------+    Sidebar)     |
    |                                 |                 |
    |          GOOGLE MAPS            |                 |
    |                                 |                 |
    +---------------------------------+-----------------+
    |                     FOOTER                        |
    +---------------------------------------------------+
    ```

### CSS skeleton
1. MOBILE-FIRST 
```text
    .restaurant-page {
        display: grid;
        grid-template-columns: 1fr;
        
        grid-template-areas:
            "header"
            "hero"
            "booking-form"
            "food-grid"
            "footer";
        gap: 20px;
    }

    .header       { grid-area: header; }
    .hero         { grid-area: hero; }
    .booking-form { grid-area: booking-form; }
    .food-grid    { grid-area: food-grid; }
    .map          { grid-area: map; display: none; } 
    .footer       { grid-area: footer; }

    .food-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
```

2. TABLET BREAKPOINT 
```text
    @media (min-width: 768px) {
        
        .restaurant-page {
            grid-template-areas:
                "header"
                "hero"
                "booking-map-wrap" 
                "food-grid"
                "footer";
        }

        .map { 
            display: block; 
        }

        .booking-form {
        }

        .food-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
```

3. DESKTOP BREAKPOINT 
```text
    @media (min-width: 1024px) {
        
        .restaurant-page {
            grid-template-columns: 2fr 1fr; 
            
            grid-template-areas:
                "header       header"
                "hero         hero"
                "food-grid    booking-form"  
                "map          booking-form"
                "footer       footer";
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto; 
        }

        .booking-form {
            position: sticky;
            top: 20px;
            height: fit-content;
        }
        
        .food-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
```
