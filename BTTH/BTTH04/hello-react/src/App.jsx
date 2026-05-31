import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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
  return (
    <div className="App">
      <UserProfile />
      <ProductInfo />
      <SimpleVariables />
      <TerrnaryDemo />
      <ListRendering />
    </div>
  )
}

export default App
