Câu A1:
-   10 input types khác nhau trong HTML5:
       type="email" -> Ô nhập text bình thường, tự kiểm tra xem chuỗi có ký tự @ và định dạng tên miền hợp lệ không -> Dùng cho form đăng ký/đăng nhập tài khoản khách hàng.

        type="password" -> Ô nhập text nhưng các ký tự bị ẩn thành dấu chấm/sao, không có validation tự động -> Dùng để nhập mật khẩu bảo vệ tài khoản cá nhân.

        type="number" -> Ô chứa số kèm nút mũi tên tăng/giảm ở góc, chặn nhập chữ (trừ 'e') và tự validate theo giới hạn min/max -> Dùng để khách hàng điều chỉnh số lượng sản phẩm muốn mua trong giỏ hàng.

        type="tel" -> Ô nhập text (tự động mở bàn phím số trên mobile), không có validation bắt buộc cấu trúc số -> Dùng để nhập số điện thoại người nhận trong form địa chỉ giao hàng.

        type="search" -> Ô nhập text có thêm biểu tượng 'x' để xóa nhanh nội dung (trên một số trình duyệt), không có validation -> Dùng cho thanh tìm kiếm sản phẩm ở phần Header của ShopTLU.

        type="date" -> Hiển thị giao diện cuốn lịch (Datepicker) để chọn, tự động giới hạn chỉ nhập ngày tháng hợp lệ -> Dùng trong form thông tin cá nhân để khách hàng nhập ngày sinh (nhận ưu đãi sinh nhật).

        type="radio" -> Các nút tròn (chỉ được chọn 1 trong 1 nhóm), không validation tự động ngoài thuộc tính required -> Dùng để chọn phương thức vận chuyển (Giao nhanh / Giao tiêu chuẩn).

        type="checkbox" -> Ô vuông nhỏ để đánh dấu tick (có thể chọn nhiều), không có validation tự động -> Dùng để tick chọn hộp "Tôi đồng ý với điều khoản dịch vụ" trước khi thanh toán.

        type="color" -> Bảng bảng màu trực quan (Color Picker), mặc định luôn trả về một mã màu Hex hợp lệ -> Dùng cho các mặt hàng cho phép custom (ví dụ khách tự phối màu áo thun).

        type="file" -> Nút bấm "Choose File" mở thư mục trên máy tính/điện thoại, tự chặn các file không đúng định dạng nếu có thuộc tính accept -> Dùng để khách hàng tải ảnh sản phẩm thực tế lên phần bình luận, đánh giá. 

Câu A2:
-   Trường hợp 1: <input type="text" required value="">

        Dự đoán: Form không submit được. Trình duyệt sẽ hiển thị một popup cảnh báo tại ô nhập liệu này
    
        VÌ thuộc tính required bắt buộc người dùng không được bỏ trống ô này. Vì value="", trình duyệt sẽ chặn hành động gửi dữ liệu đi

-   Trường hợp 2: <input type="email" value="abc">

        Dự đoán: Form không submit được. Trình duyệt báo lỗi yêu cầu phải có ký tự @

        Vì thẻ type="email" có sẵn một bộ quy tắc ngầm để kiểm tra định dạng email cơ bản. Chuỗi "abc" thiếu ký tự @ nên bị đánh giá là không hợp lệ
    
-   Trường hợp 3: <input type="number" min="1" max="10" value="15">

        Dự đoán: Form không submit được. Trình duyệt báo lỗi giá trị phải nhỏ hơn hoặc bằng 10.

        Vì thuộc tính max="10" thiết lập giới hạn trên cho thẻ type="number". Giá trị người dùng nhập là 15 quá mức cho phép, form sẽ bị chặn lại

-   Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123">

        Dự đoán: Form không submit được. Trình duyệt báo lỗi dữ liệu không khớp với định dạng yêu cầu
    
        Vì thuộc tính pattern sử dụng biểu thức chính quy (Regex). Cụm [0-9]{10} yêu cầu chuỗi nhập vào phải hoàn toàn là số và có độ dài chính xác 10 ký tự. Chuỗi "abc123" vừa chứa chữ cái, vừa chỉ có 6 ký tự nên vi phạm quy tắc.

-   Trường hợp 5: <input type="password" minlength="8" value="123">

        Dự đoán: Form không submit được. Trình duyệt báo lỗi độ dài văn bản quá ngắn, yêu cầu ít nhất 8 ký tự.

        Vì Thuộc tính minlength="8" bắt buộc độ dài tối thiểu của chuỗi phải là 8. Mật khẩu "123" chỉ có 3 ký tự nên không vượt qua được bước kiểm tra.

Câu A3:
-   vì người khiếm thị sử dụng trình đọc màn hình (Screen Reader) để duyệt  web. Khi họ dùng phím Tab di chuyển vào một ô <input>, nếu không có sự liên kết, máy sẽ chỉ đọc là "Edit text" (Ô nhập chữ), họ sẽ không biết phải nhập gì. Thuộc tính for="email" (liên kết chính xác với id="email" của input) giúp báo cho trình duyệt biết nhãn này thuộc về ô nhập liệu nào. Lúc đó, máy sẽ đọc rõ ràng là "Email, Edit text"

-   Khi nào dùng <fieldset> + <legend>? 
        Khi chúng được sử dụng để gom nhóm các input có liên quan mật thiết với nhau thành một khối logic. Đặc biệt bắt buộc phải dùng khi bạn có một nhóm các lựa chọn dạng radio hoặc checkbox trả lời chung cho một câu hỏi. <fieldset> tạo ra cái khung bao quanh, còn <legend> đóng vai trò là câu hỏi/tiêu đề cho toàn bộ nhóm đó.

    VD: Chọn size áo trong Shop
        Nếu chỉ dùng <label> rời rạc, người dùng screen reader khi tab vào mục "Size M" sẽ chỉ nghe thấy "Size M, radio button". Họ không biết "Size M" này là của cái gì (size áo, size quần hay size giày?). Khi để trong <fieldset>, nó sẽ đọc đầy đủ: "Chọn kích cỡ áo: Size M, radio button"

-   aria-label dùng khi nào?
        Dùng khi một phần tử tương tác (như nút bấm, ô tìm kiếm) không có bất kỳ đoạn text hiển thị nào trên màn hình, mà chỉ dùng icon

-   Tại sao KHÔNG nên dùng khi đã có <label>
        Nếu trên màn hình đã có sẵn dòng chữ <label for="...">Email</label>, trình duyệt đã tự động cung cấp đủ thông tin cho screen reader
        cố tình nhét thêm aria-label vào, thuộc tính ARIA này sẽ override lên thẻ <label> hiển thị. Nếu nội dung hai bên không khớp nhau, nó sẽ gây nhầm lẫn giữa những gì hiển thị trên màn hình và những gì người dùng nghe được

Câu A4:
-   loading="lazy" là một kỹ thuật trì hoãn việc tải hình ảnh. Trình duyệt sẽ không tải các bức ảnh này ngay khi mới mở trang, mà chỉ bắt đầu tải chúng khi người dùng cuộn chuột đến gần vị trí của bức ảnh đó trên màn hình

-   Nó cải thiện gì?
        Trang web sẽ hiển thị nhanh hơn vì không phải chờ tải hàng chục/trăm bức ảnh cùng lúc.
        Tiết kiệm băng thông

-   Khi nào KHÔNG nên dùng?
        khi dùng cho các bức ảnh nằm ở màn hình đầu tiên ngay khi vừa vào trang

-   Tại sao nên cung cấp nhiều <source> trong thẻ <video>?
        Không phải mọi trình duyệt đều hỗ trợ giải mã cùng một định dạng video

        3 format video web phổ biến:
        MP4
        WebM
        Ogg

-   Thuộc tính alt trên thẻ <img>
    +)  Trình đọc màn hình sẽ đọc đoạn text này cho người khiếm thị nghe để họ biết ảnh đang vẽ gì
    +)  Nếu ảnh bị lỗi không tải được, đoạn text alt sẽ hiện ra để thay thế, giúp người dùng vẫn hiểu ngữ cảnh
    +)  Bot của Google sẽ dùng text trong alt để hiểu nội dung ảnh và xếp hạng trang web của bạn trên Google Images

-   VD cho 3 trường hợp:
    +)  Ảnh sản phẩm iPhone 16:
        <img src="..." alt="Điện thoại iPhone 16 màu Hồng, mặt lưng và cụm camera kép">

    +)  Ảnh trang trí (decorative):
        <img src="..." alt="">

    +) Ảnh biểu đồ doanh thu Q1/2026:
        <img src="..." alt="Biểu đồ cột thể hiện doanh thu Quý 1 năm 2026 đạt 50 tỷ đồng, tăng trưởng 15% so với cùng kỳ">

Câu A5:
-   Cách 1: Chỉ dùng thẻ <img> đơn thuần
        Sử dụng khi bức ảnh chỉ là một phần nội dung thông thường xen kẽ trong trang, trực quan, dễ hiểu và không cần một dòng chú thích văn bản hiển thị trên màn hình để giải thích thêm.

    VD:
        Ảnh đại diện (Avatar) của người dùng: <img src="avatar.jpg" alt="Avatar của khách hàng">
        Logo hoặc Icon

-   Cách 2: Dùng <figure> kết hợp <figcaption>
        Sử dụng khi bức ảnh đóng vai trò là một khối nội dung minh họa độc lập và có kèm theo một dòng chú thích để giải thích chi tiết ngữ cảnh

    VD:
        Ảnh minh họa trong bài Blog/Review
        Biểu đồ minh họa

Câu C1:
-       Lỗi 1: Dòng 1 – Thẻ <form> thiếu action và method, vi phạm best practices 
Sửa: <form action="#" method="POST">

-       Lỗi 2: Dòng 2 – Input "Tên" không có <label for="...">, chữ "Tên:" bị bỏ lơ lửng, thiếu id và namem, vi phạm accessibility
Sửa: <label for="fullname">Tên:</label> <input type="text" id="fullname" name="fullname" required>

-       Lỗi 3: Dòng 4 – Input "Email" lạm dụng placeholder thay cho label, thiếu id và name, vi phạm accessibility
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>

-       Lỗi 4: Dòng 6, 7 – Hai input "Mật khẩu" mắc lỗi tương tự dòng 4: Thiếu <label>, id và name.
Sửa:
<label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="pwd" required>
<label for="pwd_confirm">Nhập lại mật khẩu:</label> <input type="password" id="pwd_confirm" name="pwd_confirm" required>

-       Lỗi 5: Dòng 9 – Input "Phone" dùng sai kiểu dữ liệu (type="text" thay vì type="tel"), thiếu <label>, id , name, vi phạm best practice
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" placeholder="0901234567" pattern="[0-9]{10}">

-       Lỗi 6: Dòng 11 – Thẻ <select> không có <label> gắn kèm, thiếu id và name, vi phạm accessibility
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city" required>

-       Lỗi 7: Dòng 12, 13 – Các thẻ <option> thiếu thuộc tính value, vi phạm best practice
Sửa:
<option value="HN">Hà Nội</option>
<option value="HCM">TP.HCM</option>

-       Lỗi 8: Dòng 16, 17, 18 – Phần "Tôi đồng ý điều khoản" có thẻ <label> nhưng lại KHÔNG CÓ thẻ <input type="checkbox">, vi phạm accessibillity
Sửa:
<input type="checkbox" id="terms" name="terms" required>
<label for="terms">Tôi đồng ý điều khoản</label>

Câu C2:
-       1. Viết pattern regex cho CMND/CCCD và Số tài khoản:
        +)      CMND/CCCD (đúng 12 chữ số): pattern="^[0-9]{12}$"
        +)      Số tài khoản (10-15 chữ số): pattern="^[0-9]{10,15}$"

-       2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
        +)      KHÔNG. HTML5 validation hoàn toàn không đủ an toàn
        +)      HTML5 validation chỉ hoạt động ở phía Client nhằm mục đích chính là cải thiện trải nghiệm để báo lỗi nhanh cho người dùng ngay khi họ gõ sai. Người dùng có thể:
                >       Mở DevTools (F12) và xóa bỏ các thuộc tính required, pattern, maxlength thẳng trong mã HTML.

                >       Tắt hoàn toàn JavaScript và HTML validation trên trình duyệt.

-       3. Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JS):
        +)      Cross-field validation: So sánh chéo
        +)      Asynchronous validation: Kiểm tra tính tồn tại của dữ liệu
        +)      Kiểm tra định dạng phức tạp / logic nghiệp vụ

-       4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:
        +)      SQL Injection, XSS: hacker có thể cố tình gửi các đoạn mã độc (script) hoặc câu lệnh SQL phá hoại. Khi Backend lưu vào Database, hệ thống có thể bị đánh cắp toàn bộ thông tin hoặc bị xóa sạch dữ liệu

        +)      Business Logic Flaws: hacker có thể dùng Postman gửi một request giả mạo, ví dụ như thay đổi Số tiền chuyển khoản thành số âm (-5000000), hoặc sửa đổi tỷ giá, giá tiền sản phẩm thành 0đ. Nếu Backend không validate lại, hệ thống sẽ thực thi giao dịch với con số sai lệch, gây thiệt hại tài chính nặng nề