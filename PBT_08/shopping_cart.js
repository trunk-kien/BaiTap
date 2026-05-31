function createCart() {
  let items = [];
  let discountCode = null; 

  return {
    addItem(product, quantity = 1) {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    removeItem(productId) {
      items = items.filter(item => item.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      if (newQuantity <= 0) {
        this.removeItem(productId); 
        return;
      }
      const item = items.find(item => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    },

    getSubTotal() {
      return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    getTotal() {
      let total = this.getSubTotal();
      
      if (discountCode === "SALE10") {
        total = total * 0.9;
      } else if (discountCode === "SALE20") {
        total = total * 0.8;
      } else if (discountCode === "FREESHIP") {
        total = total - 30000;
      }
      
      return total > 0 ? total : 0;
    },

    applyDiscount(code) {
      const validCodes = ["SALE10", "SALE20", "FREESHIP"];
      if (validCodes.includes(code)) {
        discountCode = code;
      } else {
        console.log("Mã giảm giá không hợp lệ!");
      }
    },

    printCart() {
      console.log("┌───────────────────────────────────────────────────────────┐");
      console.log("│ # │ Sản phẩm          │ SL │ Đơn giá      │ Tổng        │");
      console.log("├───────────────────────────────────────────────────────────┤");
      
      items.forEach((item, index) => {
        const indexStr = String(index + 1).padEnd(1, ' ');
        const nameStr = (item.name.length > 15 ? item.name.substring(0, 12) + "..." : item.name).padEnd(15, ' ');
        const qtyStr = String(item.quantity).padStart(2, ' ');
        const priceStr = (item.price.toLocaleString('vi-VN')).padStart(12, ' ');
        const lineTotalStr = ((item.price * item.quantity).toLocaleString('vi-VN')).padStart(11, ' ');
        
        console.log(`│ ${indexStr} │ ${nameStr} │ ${qtyStr} │ ${priceStr} │ ${lineTotalStr} │`);
      });
      
      console.log("├───────────────────────────────────────────────────────────┤");
      
      const subTotal = this.getSubTotal();
      const finalTotal = this.getTotal();
      
      if (subTotal !== finalTotal) {
        console.log(`│ Tạm tính:                         ${subTotal.toLocaleString('vi-VN').padStart(23, ' ')}đ │`);
        console.log(`│ Giảm giá (${discountCode}):       ${(finalTotal - subTotal).toLocaleString('vi-VN').padStart(23, ' ')}đ │`);
      }
      
      console.log(`│ Tổng cộng:                        ${finalTotal.toLocaleString('vi-VN').padStart(23, ' ')}đ │`);
      console.log("└───────────────────────────────────────────────────────────┘");
    },

    getItemCount() {
      return items.reduce((total, item) => total + item.quantity, 0);
    },

    clearCart() {
      items = [];
      discountCode = null;
    }
  };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); 

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); 
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); 