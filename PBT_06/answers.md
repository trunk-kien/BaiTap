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