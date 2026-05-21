### TRACK A -- BOOTSTRAP 5
### Phần A
Câu A1:
| Kích thước | `< 768px` | `768px - 991px` | `≥ 992px` |
| :--- | :--- | :--- | :--- |
| **Số cột** | 1 cột | 2 cột | 4 cột |
| **Box layout** | [Box 1]<br>[Box 2]<br>[Box 3]<br>[Box 4] | [Box 1] [Box 2]<br>[Box 3] [Box 4] | [Box 1] [Box 2] [Box 3] [Box 4] |

-   Câu hỏi thêm:
1.  `col-md-6` nghĩa là gì?
    -   Trong hệ thống lưới 12 phần (12-column grid), `col-md-6` chỉ định rằng từ màn hình kích thước trung bình (`md` - thường từ 768px trở lên), mỗi thẻ `div` sẽ chiếm 6 phần không gian (tương đương với 50% chiều rộng bề ngang). Kết quả là chúng ta sẽ có bố cục 2 hộp nằm trên cùng một hàng.

2.  Tại sao không cần viết `col-sm-12`?
    -   Các hệ thống Grid hiện đại (như Bootstrap) được xây dựng theo triết lý Mobile-First. Điều này có nghĩa là các rule CSS ở màn hình nhỏ sẽ tự động áp dụng (kế thừa) cho các màn hình lớn hơn nếu không có rule mới nào ghi đè.
    -   Khi khai báo `col-12` (mặc định cho màn hình nhỏ nhất), nó đã mang giá trị 100% chiều rộng. Trình duyệt sẽ tự động hiểu rằng trên kích thước `sm`, nó vẫn tiếp tục chiếm 12 cột. Việc này chỉ dừng lại khi màn hình đạt đến ngưỡng `768px` và gặp khai báo mới là `col-md-6`. Do đó, viết thêm `col-sm-12` là thao tác thừa, hệ thống đã tự động bao hàm ý nghĩa đó.

Câu A2:
1. Giải thích class `d-none d-md-block`
-   Bộ class này áp dụng tư duy Mobile-First của Bootstrap để điều khiển sự hiển thị (display) của phần tử:
    -   `d-none`: Đặt thuộc tính `display: none;` làm mặc định, nghĩa là ẩn phần tử trên tất cả các kích thước màn hình (bắt đầu từ thiết bị di động nhỏ nhất).
    -   `d-md-block`: Ghi đè thuộc tính trên thành `display: block;` bắt đầu từ điểm dừng `md` (Medium, $\ge$ 768px).
    -   Phần tử này sẽ bị ẩn trên điện thoại (kích thước < 768px) và sẽ hiển thị ra dưới dạng khối (block) trên máy tính bảng và desktop (kích thước $\ge$ 768px).

2. Liệt kê 5 Spacing Utilities (margin/padding) và giải thích
-   `mt-3`: Thêm `margin-top` ở mức 3 (thường tương đương `1rem` hoặc 16px). Giúp đẩy phần tử cách xa thành phần phía trên nó.

-   `px-4`: Thêm `padding-left` và `padding-right` ở mức 4 (thường tương đương `1.5rem` hoặc 24px). Giúp tạo khoảng trống bên trong phần tử dọc theo trục ngang (trái/phải).

-   `mb-auto`: Đặt `margin-bottom: auto;`. Thường được dùng kết hợp với Flexbox (flex-column) để tự động đẩy phần tử lấp đầy khoảng trống phía dưới hoặc ép các phần tử khác xuống sát đáy.

-   `mx-auto`: Đặt `margin-left: auto` và `margin-right: auto`. Đây là class kinh điển dùng để căn giữa một phần tử block (có giới hạn chiều rộng) theo chiều ngang trên trang.

-   `py-2`: Thêm `padding-top` và `padding-bottom` ở mức 2 (thường tương đương `0.5rem` hoặc 8px). Tạo khoảng đệm mỏng bên trong phần tử theo trục dọc (trên/dưới).

3.  Sự khác nhau giữa .container, .container-fluid, và .container-md
-   .container:
    -   Có chiều rộng tối đa (`max-width`) thay đổi "nhảy bậc" theo từng điểm dừng (breakpoints như `sm, md, lg, xl`).

    -   Nội dung luôn được căn giữa màn hình và sẽ có các khoảng trống (lề) ở hai bên trái/phải khi xem trên màn hình lớn.

-   .container-fluid:
    -   Luôn luôn chiếm 100% chiều rộng của màn hình (`width: 100%`) bất kể bạn đang dùng điện thoại hay màn hình Ultrawide khổng lồ.

-   .container-md:
    -   Ở các màn hình nhỏ hơn `md` (dưới 768px), nó hoạt động giống như .`container-fluid` (chiếm 100% chiều rộng, không có lề hai bên).

    -   Khi màn hình đạt mốc `md` (từ 768px trở lên), nó bắt đầu hoạt động giống như `.container` bình thường (có `max-width` và thu lại vào giữa trang). Bootstrap hỗ trợ tương tự cho các mốc khác như .container-sm, .container-lg...

### Phần C
Câu C1:
1.  Quy trình đổi màu `$primary` từ xanh mặc định sang `#E63946`
-   Các công cụ cần thiết
    -   Node.js & npm: Để cài đặt gói nguồn của Bootstrap (bootstrap).

    -   Trình biên dịch SASS (Sass Compiler): Có thể dùng Extension Live Sass Compiler trên VS Code hoặc công cụ dòng lệnh sass cài qua npm để biên dịch file .scss thành file .css.

    -   Mã nguồn Bootstrap: Được cài đặt vào thư mục dự án thông qua lệnh npm install bootstrap.

-   Quy trình các bước thực hiện:
```text
// Bước 1: Import các hàm cấu trúc của Bootstrap trước
@import "../node_modules/bootstrap/scss/functions";

// Bước 2: Định nghĩa lại biến $primary với mã màu mới theo yêu cầu
$primary: #E63946;

// Bước 3: Import toàn bộ phần còn lại của Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";
```

2.  Tại sao KHÔNG nên override trực tiếp `.btn-primary` mà nên dùng SASS variables?
-   Làm mất tính đồng bộ của toàn bộ hệ thống giao diện (Ecosystem)
-   Không tự động cập nhật các trạng thái (States) của phần tử
-   Khó bảo trì và nâng cấp (Maintainability)

Câu C2:
| Tiêu chí | CSS Thuần (Pure CSS) | Bootstrap |
| :--- | :--- | :--- |
| **Số dòng CSS cần viết** | **Nhiều.** Phải tự viết toàn bộ các rules, từ layout (Flexbox/Grid), typography cho đến các Media Queries để xử lý responsive cho Navbar và Card. | **Rất ít.** Chủ yếu viết class trực tiếp vào HTML (utility classes, component classes). Chỉ viết thêm CSS custom khi cần tinh chỉnh nhỏ. |
| **Thời gian phát triển** | **Lâu hơn.** Đòi hỏi thời gian căn chỉnh chi tiết, xử lý các luồng layout và tốn công test/debug cross-browser, cross-device từ con số 0. | **Rất nhanh.** Các component như Navbar, Card và hệ thống Grid đã được làm sẵn và test kỹ. Chỉ việc gọi class là có ngay giao diện chuẩn. |
| **Khả năng tùy biến** | **Mức tối đa (100%).** Hoàn toàn làm chủ từng pixel, dễ dàng hiện thực hóa các bản thiết kế UI/UX độc đáo, phức tạp mà không sợ bị xung đột style. | **Hạn chế hơn.** Mặc định giao diện mang nặng "hơi hướng Bootstrap". Việc ghi đè (override) CSS mặc định để làm giao diện hoàn toàn khác biệt đôi khi vất vả hơn cả viết từ đầu. |
| **Khi nào NÊN dùng** | - Khi dự án yêu cầu giao diện độc bản (pixel-perfect), animation phức tạp.<br>- Hệ thống lớn cần duy trì dài hạn, kiến trúc CSS riêng biệt.<br>- Cần tối ưu tối đa dung lượng tải trang, chỉ load những mã thực sự dùng. | - Cần ra mắt sản phẩm nhanh (MVP, Prototype).<br>- Xây dựng các trang Admin Dashboard, công cụ nội bộ không đòi hỏi UI quá đặc thù.<br>- Làm việc trong team cần một bộ quy chuẩn chung có sẵn. |
| **Khi nào KHÔNG NÊN dùng** | - Dự án có deadline ngắn, cần tốc độ ra sản phẩm nhanh.<br>- Khi team không có người chuyên sâu về cắt HTML/CSS (ví dụ: team thuần Backend/Fullstack cần làm UI gấp). | - Bản thiết kế (Figma/Sketch) đi ngược lại hoàn toàn với design system của Bootstrap.<br>- Ứng dụng yêu cầu khắt khe về performance, không chấp nhận việc tải file CSS đồ sộ chứa nhiều mã thừa (unused CSS). |

