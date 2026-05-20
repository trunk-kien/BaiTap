### Phần A:

Câu A1:
-   Inline CSS:
    -   VD:
        ```<p style="color: red; font-size: 16px;">Đoạn văn này có màu đỏ.</p>```
-   Ưu điểm:
        -   Cực kỳ nhanh chóng để áp dụng hoặc thử nghiệm một style trực tiếp.
        -   Có độ ưu tiên rất cao, dễ dàng ghi đè các style từ Internal hoặc External CSS.
-   Nhược điểm:
        -   Không thể tái sử dụng. Phải lặp lại code nếu muốn áp dụng cho nhiều thẻ giống nhau.
        -   Làm code HTML trở nên rối rắm, khó đọc và cực kỳ khó bảo trì khi dự án lớn lên.
        -   Phá vỡ nguyên tắc tách biệt giữa nội dung (HTML) và giao diện (CSS).
-   Khi nào nên dùng:
        -   Khi cần test nhanh/sửa lỗi nhanh giao diện của một element duy nhất.
        -   Khi code được render động bằng JavaScript và cần can thiệp style trực tiếp vào DOM.


-   Internal CSS:
    -   VD:
        ```text
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        p {
                    color: blue;
                    font-weight: bold;
                }
                    </style>
                </head>
                <body>
                    <p>Đoạn văn này có màu xanh và in đậm.</p>
                </body>
                </html>
        ```

-   Ưu điểm:
        -   Gom toàn bộ CSS về một chỗ (trong thẻ head), giúp HTML body sạch sẽ hơn so với Inline.
        -   Chỉ áp dụng cho trang HTML hiện tại, không ảnh hưởng đến các trang khác.
        -   Không tốn thêm request HTTP để tải file CSS bên ngoài.
-   Nhược điểm:
        -   Vẫn không tái sử dụng được cho các file HTML khác. Nếu có 10 trang web cần style giống nhau, phải copy/paste đoạn thẻ style này 10 lần.
        -   Làm tăng dung lượng của file HTML.
-   Khi nào nên dùng:
        -   Khi tạo 1 landing page đơn giản có 1 trang duy nhất
        -   Khi trang web có một số style đặc thù không thể chia sẻ với bất kỳ trang nào khác trong hệ thống.

-   External CSS:
    -   VD:
        ```text
        trong file index.html:
            <head>
                <link rel="stylesheet" href="styles.css">
            </head>
        trong file style.css:
            p {
                color: green;
                text-align: center;
            }
        ```
-   Ưu điểm:
        -   Tách biệt hoàn toàn giữa cấu trúc (HTML) và định dạng (CSS). Code cực kỳ gọn gàng.
        -   Khả năng tái sử dụng. Một file css có thể được liên kết và dùng cho hàng trăm file html khác nhau.
        -   TốI ưu hiệu suất. Trình duyệt sẽ lưu cache file css ở lần đầu tiên truy cập, giúp các lần chuyển trang sau or lần truy cập sau tải nhanh hơn.
-   Nhược điểm:
        -   Trình duyệt sẽ mất thêm 1 request Http để tải file css về trong lần truy cập đầu tiên.
-   Khi nào nên dùng:
        -   Luôn luôn nên dùng trong mọi dự án thực tế, từ nhỏ đến lớn. Đây là tiêu chuẩn (Best Practice) của ngành lập trình web.

-   Câu hỏi thêm:
    -   Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, Inline CSS sẽ "thắng"
    -   Vì:
        -   Trong CSS có một quy tắc gọi là Độ ưu tiên (Specificity). Các quy tắc CSS sẽ được trình duyệt tính điểm để xem cái nào mạnh hơn:
                -   Inline style (khai báo trực tiếp trong thẻ bằng thuộc tính style="...") có điểm số cao nhất. Nó áp đặt trực tiếp lên chính phần tử đó nên sẽ ghi đè mọi khai báo từ Internal và External.
                -   Đối với Internal và External CSS, chúng có độ ưu tiên bằng nhau (nếu dùng cùng bộ chọn - selector). Trình duyệt sẽ áp dụng quy tắc Cascading (Xếp tầng): cái nào được khai báo/nhúng sau cùng (nằm ở vị trí thấp hơn trong thẻ head) thì cái đó sẽ thắng và ghi đè cái trước nó.

Câu A2:
1. h1:
    -   Chọn: thẻ `h1`
    -   Text content: ShopTLU

2. .price:
    -   Chọn: Tất cả các thẻ có `class price`
    -   Text content: 25.990.000đ và 45.990.000đ

3. #app header:
    -   Chọn: Thẻ `header` nằm bên trong thẻ `div` có `id` là app
    -   Text content: Toàn bộ nội dung bên trong `header`, bao gồm chữ "ShopTLU" và các thẻ `link` "Home", "Products", "About"

4. nav a:first-child:
    -   Chọn: Thẻ `a` đầu tiên trong thẻ `nav`
    -   Text content: Home

5. .product.featured h2
    -   Chọn: Thẻ `h2` nằm bên trong thẻ `article` có `class` là `product` và `featured`
    -   Text content: MacBook Pro

6. article > p:
    -   Chọn: Tất cả các thẻ p nằm trong thẻ article
    -   Text content: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, và Mô tả sản phẩm...

7. a[href="/"]
    -   Chọn: Thẻ `a` có thuộc tính `href` chính xác bằng /.
    -   Text content: Home

8. .top-bar.dark h1
    -   Chọn: Thẻ `h1` nằm bên trong phần tử có đồng thời 2 `class` là top-bar và dark.

    -   Text content: ShopTLU

Câu A3:
-   TH1:
    -   Chiều rộng hiện thị = 450px
    -   Không gian chiến trên trang = 470px

-   TH2:
    -   Chiều rộng hiện thị = 400px
    -   Kích thước content thực tế = 350px
    -   Không gian chiếm trên trang = 420px

-   TH3:
    -   Khoảng ách giữa box-a và box-b = 40px
    -   Khi 2 khối block nằm liền kề nhau theo chiều dọc, khoảng cách margin giữa chúng không được cộng dồn. Trình duyệt sẽ lấy margin nào lớn hơn để làm khoảng cách chung.

Câu A4:
1.  Tính specificity score (a, b, c) cho mỗi rule:
    -   Rule A (p): (0, 0, 1) - có 1 thẻ HTML.
    -   Rule B (.price): (0, 1, 0) - có 1 class.
    -   Rule C (#main-price): (1, 0, 0) - có 1 ID.
    -   Rule D (p.price): (0, 1, 1) - có 1 thẻ HTML và 1 class.

2.  Element sẽ có màu đỏ
    -   Vì khi so sánh điểm specificity, Rule C (1, 0, 0) có điểm số cao nhất nên nó "thắng" tất cả các rule còn lại.

3.  Element sẽ có màu cam
    -   Vì Inline style có độ ưu tiên cao hơn tất cả các ID, Class hay Element selectors ở file CSS ngoài.

4.  Element sẽ có màu đen
    -   Vì `!important` có sức mạnh cao nhất trong CSS.Nó bỏ qua mọi quy tắc tính điểm specificity thông thường kể cả inline style và bắt buộc trình duyệt phải áp dụng giá trị đó

### Phần B:

Bài B2:
-   Phần 1:
    Hộp 1 (content-box): chiều rộng thực tế = 350 px 
    Hộp 2 (border-box): chiều rộng thực tế = 300 px
    Giải thích sự khác biệt:
    -   Ở Hộp 1 (`content-box`), thuộc tính `width: 300px` chỉ áp dụng cho phần nội dung (content). Do đó, chiều rộng thực tế = width (300) + padding trái/phải (20*2) + border trái/phải (5*2) = 350px.
    -   Ở Hộp 2 (`border-box`), thuộc tính `width: 300px` là tổng kích thước của cả hộp bao gồm content, padding và border. Trình duyệt sẽ tự động thu hẹp phần content bên trong lại để giữ nguyên tổng chiều rộng thực tế là 300px.

Bài B3:
### 1. Liệt kê 10 rules + specificity score (Sắp xếp từ thấp đến cao)
1. `p` -> Specificity: (0, 0, 1)
2. `body p` -> Specificity: (0, 0, 2)
3. `.text` -> Specificity: (0, 1, 0)
4. `p.text` -> Specificity: (0, 1, 1)
5. `body p.text` -> Specificity: (0, 1, 2)
6. `.text.highlight` -> Specificity: (0, 2, 0)
7. `p.text.highlight` -> Specificity: (0, 2, 1)
8. `#demo` -> Specificity: (1, 0, 0)
9. `p#demo` -> Specificity: (1, 0, 1)
10. `p#demo.text.highlight` -> Specificity: (1, 2, 1)

### 2. Element cuối cùng hiển thị màu gì? Tại sao?
- Element sẽ hiển thị màu: đỏ.
- Giải thích: Vì rule 10 (`p#demo.text.highlight`) có điểm Specificity score cao nhất (1, 2, 1) nhờ kết hợp cả 1 ID, 2 Classes và 1 Element selector. Trình duyệt luôn ưu tiên áp dụng rule có điểm cao nhất.

### 4. Thay đổi thứ tự các rules trong CSS file. Kết quả có đổi không? Giải thích.
- Kết quả: không đổi.
- Giải thích: Trong CSS, thứ tự viết trước/sau (quy tắc xếp tầng - Cascading) chỉ có tác dụng khi hai rule có điểm độ ưu tiên (Specificity) **bằng nhau**. Do 10 rules trên đã được thiết kế với các mức điểm khác nhau hoàn toàn, trình duyệt sẽ luôn chọn rule có điểm cao nhất bất kể nó nằm ở đầu file hay cuối file CSS.

### Phần C:

Câu C1:
1. Chiều rộng thực tế của sidebar và content (content-box!)
    -   Chiều rộng thực tế của .sidebar: 300px + 40px + 2px = 342px
    -   Chiều rộng thực tế của .content: 660px + 60px + 2px = 722px

2. Tại sao layout bị vỡ
    -   Tổng chiều không gian mà 2 khối này cần để đứng cạnh nhau là: 342px + 722px = 1064px
    -   thẻ .container chỉ có chiều rộng giới hạn là 960px
    -   Vì 1064px > 960px, không đủ chỗ chứa trên cùng một hàng, nên thuộc tính float: left sẽ tự động đẩy khối thứ hai (.content) rớt xuống dòng dưới

3. 2 Cách sửa khác nhau
    -   Cách 1: Dùng border-box
            Thêm box-sizing: border-box; vào cả hai class .sidebar và .content
    -   Cách 2: Không dùng border-box
            .sidebar sửa thành: width: 258px;
            .content sửa thành: width: 598px;

Câu C2:
1. "Sản phẩm A" `h2` có font-size = 20px và color = green
-   Giải thích:
        -   font-size: Phần tử này bị tác động bởi rule .card .title { font-size: 20px; }. Rule này target trực tiếp nên ghi đè các giá trị kế thừa từ .container (14px) hay body (16px)
        -   color: Có 3 rules ảnh hưởng đến màu là từ kế thừa của .card (blue), từ #featured .title (red), và .highlight (green !important). Mặc dù #featured .title có độ ưu tiên specificity cao hơn, nhưng rule .highlight có chứa cờ !important nên nó phá vỡ quy tắc xếp tầng (cascade) và giành quyền ưu tiên cao nhất, đổi màu thành green

2. "Mô tả sản phẩm" (p trong card featured) có color = blue
-   Giải thích: 
        -   Phần tử `p` này bị tác động trực tiếp bởi rule .card p { color: inherit; }. Thuộc tính inherit bắt buộc phần tử này phải kế thừa giá trị color từ thẻ cha gần nhất của nó. Thẻ cha bao ngoài của nó là `div class="card" id="featured"` mang màu blue (từ rule .card { color: blue; }). Do đó, thẻ `p` cũng có màu blue

3. "Sản phẩm B" (h2) có font-size = 20px và color = blue
-   Giải thích:
        -   font-size: Tương tự câu 1, nó nhận giá trị trực tiếp từ rule .card .title { font-size: 20px; }.
        -   color: Không có rule CSS nào target trực tiếp thuộc tính color của thẻ `h2` này. Do quy tắc kế thừa (inheritance), nó sẽ lấy giá trị màu từ thẻ cha gần nhất có khai báo màu. Thẻ cha là .card có màu blue, nên `h2` này kế thừa màu blue.

4. "Mô tả sản phẩm B" (p.highlight) có color = green
-   Giải thích: 
        -   Phần tử này bị target bởi 2 rules khai báo màu: .card p { color: inherit; } (độ ưu tiên 0,1,1) và .highlight { color: green !important; } (độ ưu tiên 0,1,0). Theo quy tắc cascade bình thường thì .card p sẽ thắng, nhưng vì rule .highlight có sử dụng !important, nó đè bẹp mọi tính toán specificity và ép phần tử hiển thị màu green.