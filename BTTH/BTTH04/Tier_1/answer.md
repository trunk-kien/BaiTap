### Bài 1.1:
1.  Tại sao component chỉ render 1 lần?
-   Bởi vì lúc này component mới chỉ được "gắn" (mount) lên màn hình lần đầu tiên. Code chạy từ trên xuống dưới, trả về giao diện HTML và dừng lại ở đó. Nó không có bất kỳ tín hiệu hay dữ liệu động nào thay đổi để kích hoạt việc vẽ lại.

2.  Khi nào nó sẽ render lại?
-   Nó sẽ render lại khi:
    -   Dữ liệu bên trong chính component đó (thường là State) bị thay đổi.

    -   Component "cha" chứa nó bị render lại, kéo theo các component "con" cũng được làm mới.

### Bài 1.2:
1.  Chạy `BadCounter` → nhấn nút → Console in ra số tăng dần nhưng màn hình UI không đổi
2.  Chạy `GoodCounter` → nhấn nút → Console in ra số và màn hình UI cũng tự động cập nhật số mới.
3.  Mở Console → Với 1GoodCounter1, mỗi lần bạn bấm nút, bạn sẽ thấy log "render" chạy thêm một lần.