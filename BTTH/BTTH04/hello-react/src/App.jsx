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

function App() {
  return (
    <div className="App">
      <UserProfile />
      <ProductInfo />
    </div>
  )
}

export default App
