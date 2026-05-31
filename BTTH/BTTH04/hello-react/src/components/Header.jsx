function Header() {
    return (
        <header style={{ background: "#2c3e50", color: "white", padding: "15px", textAlign: "center" }}>
            <h1>ShopTLU - Cửa hàng Công nghệ</h1>
            <nav>
                <a href="/" style={{ color: "white", margin: "0 10px" }}>Trang chủ</a>
                <a href="/cart" style={{ color: "white", margin: "0 10px" }}>Giỏ hàng</a>
            </nav>
        </header>
    );
}

export default Header;