// 1. Khai báo dữ liệu (12 sản phẩm - 4 danh mục)
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200x200?text=iPhone+16+Pro", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/200x200?text=S24+Ultra", rating: 4.7, inStock: true },
    { id: 3, name: "Xiaomi 14 Pro", price: 22990000, category: "phone", image: "https://placehold.co/200x200?text=Xiaomi+14", rating: 4.5, inStock: false },
    
    { id: 4, name: "ASUS TUF Dash F15 (2022)", price: 21990000, category: "laptop", image: "https://placehold.co/200x200?text=ASUS+TUF+F15", rating: 4.6, inStock: true },
    { id: 5, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200x200?text=MacBook+M3", rating: 4.9, inStock: true },
    { id: 6, name: "ThinkPad X1 Carbon", price: 35990000, category: "laptop", image: "https://placehold.co/200x200?text=ThinkPad", rating: 4.8, inStock: true },
    
    { id: 7, name: "Bàn phím cơ Custom Bsun Taichi", price: 3200000, category: "keyboard", image: "https://placehold.co/200x200?text=Bsun+Taichi", rating: 4.9, inStock: true },
    { id: 8, name: "Keychron Q1 Pro", price: 4500000, category: "keyboard", image: "https://placehold.co/200x200?text=Keychron+Q1", rating: 4.7, inStock: true },
    { id: 9, name: "Akko 3098B", price: 1800000, category: "keyboard", image: "https://placehold.co/200x200?text=Akko+3098B", rating: 4.4, inStock: true },
    
    { id: 10, name: "Tai nghe AirPods Pro 2", price: 5990000, category: "accessory", image: "https://placehold.co/200x200?text=AirPods+Pro", rating: 4.8, inStock: true },
    { id: 11, name: "Chuột Logitech G502 Hero", price: 990000, category: "accessory", image: "https://placehold.co/200x200?text=Logitech+G502", rating: 4.6, inStock: true },
    { id: 12, name: "Hub Ugreen 7-in-1", price: 750000, category: "accessory", image: "https://placehold.co/200x200?text=Hub+Ugreen", rating: 4.5, inStock: true },
];

// 2. Trạng thái ứng dụng (State)
let state = {
    cartItems: 0,
    searchQuery: "",
    category: "all",
    sortBy: "default"
};

// 3. Chọn các phần tử DOM cố định
const productListEl = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const filterContainer = document.getElementById("filters");
const sortSelect = document.getElementById("sort-select");
const cartBadge = document.getElementById("cart-badge");
const themeToggle = document.getElementById("theme-toggle");

// --- CÁC HÀM XỬ LÝ (LOGIC) ---

// Format tiền tệ VNĐ
const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// Lọc và Sắp xếp dữ liệu
function getProcessedProducts() {
    let result = [...products];

    // Lọc theo search
    if (state.searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(state.searchQuery.toLowerCase()));
    }

    // Lọc theo category
    if (state.category !== "all") {
        result = result.filter(p => p.category === state.category);
    }

    // Sắp xếp
    switch (state.sortBy) {
        case "price-asc": result.sort((a, b) => a.price - b.price); break;
        case "price-desc": result.sort((a, b) => b.price - a.price); break;
        case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
        case "rating-desc": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
}

// Render giao diện danh sách
function renderProducts() {
    const currentProducts = getProcessedProducts();
    productListEl.innerHTML = ""; // Xoá danh sách cũ
    
    if (currentProducts.length === 0) {
        productListEl.textContent = "Không tìm thấy sản phẩm nào.";
        return;
    }

    // Dùng DocumentFragment để tối ưu Reflow (như bài học trước)
    const fragment = document.createDocumentFragment();

    currentProducts.forEach(product => {
        // Tạo Card 
        const card = document.createElement("div");
        card.className = "card";
        
        // Bắt sự kiện mở Modal khi click vào card (Event Delegation ở cấp Card)
        card.addEventListener("click", (e) => {
            // Ngăn việc mở modal nếu user click vào nút "Thêm vào giỏ"
            if (!e.target.classList.contains("add-to-cart")) {
                openModal(product);
            }
        });

        // Tạo Image
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        // Tạo Title
        const title = document.createElement("h3");
        title.textContent = product.name;

        // Tạo Price
        const price = document.createElement("p");
        price.className = "price";
        price.textContent = formatPrice(product.price);

        // Tạo Nút Add to Cart
        const btn = document.createElement("button");
        btn.className = "add-to-cart";
        btn.textContent = product.inStock ? "Thêm vào giỏ" : "Hết hàng";
        btn.disabled = !product.inStock;
        
        btn.addEventListener("click", () => {
            state.cartItems++;
            cartBadge.textContent = state.cartItems;
        });

        // Ghép các thẻ vào Card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(btn);

        // Đưa Card vào Fragment
        fragment.appendChild(card);
    });

    // 1 lần append duy nhất
    productListEl.appendChild(fragment);
}

// Xây dựng Modal bằng DOM nguyên thuỷ
function openModal(product) {
    // Tạo Overlay
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    // Xử lý đóng modal khi click ra ngoài
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) document.body.removeChild(overlay);
    });

    // Tạo Nội dung Modal
    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", () => document.body.removeChild(overlay));

    const title = document.createElement("h2");
    title.textContent = product.name;

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";
    img.style.maxHeight = "300px";
    img.style.objectFit = "contain";

    const desc = document.createElement("p");
    desc.innerHTML = `
        <strong>Giá:</strong> ${formatPrice(product.price)} <br>
        <strong>Đánh giá:</strong> ${product.rating} ⭐ <br>
        <strong>Tình trạng:</strong> ${product.inStock ? "Còn hàng" : "Hết hàng"}
    `;

    // Ghép vào DOM
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(img);
    content.appendChild(desc);
    overlay.appendChild(content);

    document.body.appendChild(overlay);
}

// --- GẮN SỰ KIỆN (EVENT LISTENERS) ---

// 1. Search Realtime
searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    renderProducts();
});

// 2. Lọc Category (Dùng Event Delegation)
filterContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        // Cập nhật state
        state.category = e.target.dataset.category;
        
        // Cập nhật UI nút active
        filterContainer.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        
        renderProducts();
    }
});

// 3. Sắp xếp (Sort)
sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
});

// 4. Dark Mode Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Chạy lần đầu tiên
renderProducts();