function ProductCard({ name, price, image }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            padding: "15px",
            margin: "10px",
            width: "250px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
            <img src={image} alt={name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
            <h3 style={{ fontSize: "18px" }}>{name}</h3>
            <p style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "16px" }}>{price}</p>
            <button style={{ 
                background: "#3498db", 
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%"
            }}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

export default ProductCard;