import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import './App.css'

//Bài 1:
function UserProfile() {
    return (
        <div className="profile"> 
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" /> 
            <table>
                <tbody> 
                    <tr>
                        <td>Họ tên:</td>
                        <td>Nguyễn Trung Kiên</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>trungkien@gmail.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


function ProductInfo() {
    return (
        <div className="product"> {/* Đổi class thành className */}
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p> {/* Đổi class thành className */}
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

//Bài 2.1:
function SimpleVariables() {
    const ten = "Kiên";
    const tuoi = 20;
    const queQuan = "Bắc Ninh";
    
    const gioHienTai = new Date().getHours();
    let loiChao = "Chào buổi tối";
    if (gioHienTai < 12) loiChao = "Chào buổi sáng";
    else if (gioHienTai < 18) loiChao = "Chào buổi chiều";

    const canNang = 55; // kg
    const chieuCao = 1.72; // mét
    const bmi = (canNang / (chieuCao * chieuCao)).toFixed(1);

    // BẮT ĐẦU HIỂN THỊ GIAO DIỆN
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Bài 2.1</h2>
            
            <p style={{ fontSize: "20px", color: "blue" }}>
                <strong>{loiChao}, {ten}!</strong>
            </p>
            
            <ul>
                <li><strong>Tuổi:</strong> {tuoi}</li>
                <li><strong>Quê quán:</strong> {queQuan}</li>
                <li><strong>Chỉ số BMI:</strong> {bmi}</li>
            </ul>
        </div>
    );
}

// Bài 2.2:
function TerrnaryDemo() {
  const [isOnline, setIsOnline] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const stock = 0; 

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Bài 2.2</h2>
            
            <div style={{ marginBottom: "30px" }}>
                <h3>1. Trạng thái hoạt động</h3>
                <p>
                    {isOnline ? "🟢 Đang hoạt động" : "🔴 Ngoại tuyến"}
                </p>
                <button onClick={() => setIsOnline(!isOnline)}>
                    Bật/Tắt Online
                </button>
            </div>

            <div style={{ marginBottom: "30px" }}>
                <h3>2. Trạng thái Đăng nhập</h3>
                <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                    {isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
                </button>
                
                {isLoggedIn && (
                    <ul style={{ background: "#f0f0f0", padding: "10px 30px", width: "200px" }}>
                        <li>Thông tin cá nhân</li>
                        <li>Đơn hàng của tôi</li>
                        <li>Cài đặt</li>
                    </ul>
                )}
            </div>

            <div style={{ marginBottom: "30px" }}>
                <h3>3. Trạng thái kho hàng</h3>
                <div style={{ padding: "10px", border: "1px solid black", width: "250px" }}>
                    <p><strong>Bàn phím cơ Bsun Taichi</strong></p>
                    
                    {stock === 0 ? (
                        <span style={{ color: "red", fontWeight: "bold" }}>Hết hàng</span>
                    ) : (
                        <span style={{ color: "green" }}>Còn {stock} sản phẩm</span>
                    )}
                </div>
            </div>
            
        </div>
    );
}

function ListRendering() {
  const products = [
        { id: 1, name: "iPhone 16 Pro", price: 28990000 },
        { id: 2, name: "Laptop ASUS TUF Dash F15", price: 22500000 },
        { id: 3, name: "Bàn phím cơ Bsun Taichi", price: 1850000 },
        { id: 4, name: "Chuột Gaming", price: 850000 },
        { id: 5, name: "Lót chuột cỡ lớn", price: 250000 }
    ];

    const tongTien = products.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Bài 2.3</h2>
            
            <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map((product) => (
                    
                    <li 
                        key={product.id} 
                        style={{ 
                            padding: "15px", 
                            margin: "10px 0", 
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            color: product.price > 1000000 ? "red" : "black" 
                        }}
                    >
                        <strong>{product.name}</strong> 
                        <br />
                        Giá: {product.price.toLocaleString("vi-VN")}đ
                    </li>
                    
                ))}
            </ul>
            
            <hr />
            
            <h3>
                Tổng giá trị kho hàng: <span style={{ color: "blue" }}>{tongTien.toLocaleString("vi-VN")}đ</span>
            </h3>
        </div>
    ); 
}
function App() {

//Tier3:
  const products = [
        { 
            id: 1, 
            name: "Laptop ASUS TUF Dash F15", 
            price: "22.500.000đ", 
            image: "https://placehold.co/200/000000/FFFFFF?text=ASUS+TUF" 
        },
        { 
            id: 2, 
            name: "Bàn phím cơ Bsun Taichi", 
            price: "1.850.000đ", 
            image: "https://placehold.co/200/FF0000/FFFFFF?text=Bsun+Taichi" 
        },
        { 
            id: 3, 
            name: "iPhone 16 Pro", 
            price: "28.990.000đ", 
            image: "https://placehold.co/200/CCCCCC/000000?text=iPhone+16+Pro" 
        }
    ];

//Tier 4:
// State Bài 4.1:
  const [count, setCount] = useState(0);

// State Bài 4.2:
  const [email, setEmail] = useState("");
    const maxChars = 100;

// State Bài 4.3:
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);


  return (
    <div className="App">
      <UserProfile />
      <ProductInfo />
      <SimpleVariables />
      <TerrnaryDemo />
      <ListRendering />

      <div style={{ fontFamily: "sans-serif" }}>
            <Header />

            <main style={{ padding: "20px" }}>
                <h2 style={{ textAlign: "center" }}>Sản phẩm nổi bật</h2>
                
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {/* Duyệt mảng và gọi ProductCard, đồng thời truyền Props */}
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>
            </main>
        </div>

        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
            <h1 style={{ textAlign: "center" }}>Tier 4: Thực hành useState</h1>

            <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <h2>Bài 4.1 </h2>
                <h3 style={{ color: count > 0 ? "green" : count < 0 ? "red" : "black" }}>
                    Giá trị: {count} ({count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Bằng 0"})
                </h3>
                
                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setCount(count + 1)}>+1</button>
                    <button onClick={() => setCount(count - 1)}>-1</button>
                    <button onClick={() => setCount(count + 5)}>+5</button> 
                    <button onClick={() => setCount(0)}>Reset</button>
                </div>
            </section>

            <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <h2>Bài 4.2 & 4.3</h2>
                
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                    <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email..."
                        style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
                        maxLength={maxChars}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", fontSize: "14px" }}>
                        <span style={{ color: email.includes("@") ? "green" : "red" }}>
                            {email.includes("@") ? "✅ Email hợp lệ" : "❌ Thiếu ký tự '@'"}
                        </span>
                        <span style={{ color: email.length >= maxChars ? "red" : "gray" }}>
                            {email.length}/{maxChars}
                        </span>
                    </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Mật khẩu:</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu..."
                            style={{ padding: "8px", flex: 1 }}
                        />
                        <button onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Ẩn" : "Hiện"}
                        </button>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <h2>Bài 4.3</h2>
                
                <div style={{ marginBottom: "20px", border: "1px solid #eee" }}>
                    <div 
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        style={{ padding: "10px", background: "#f5f5f5", cursor: "pointer", fontWeight: "bold" }}
                    >
                        {isAccordionOpen ? "🔽 Click để thu gọn" : "▶️ Click để mở rộng (Accordion)"}
                    </div>
                    {isAccordionOpen && (
                        <div style={{ padding: "15px", borderTop: "1px solid #eee" }}>
                            Đây là nội dung bị ẩn bên trong Accordion. Kỹ thuật này dùng nhiều trong các trang FAQ (Câu hỏi thường gặp).
                        </div>
                    )}
                </div>

                <div>
                    <h3>Bóng đèn</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span style={{ fontSize: "40px" }}>
                            {isLightOn ? "💡 (Sáng)" : "🔌 (Tắt)"}
                        </span>
                        <button onClick={() => setIsLightOn(!isLightOn)}>
                            Công tắc
                        </button>
                    </div>
                </div>
            </section>

        </div>
    </div>
    
  );
}

export default App
