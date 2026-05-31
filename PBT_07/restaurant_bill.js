const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });


function printReceipt(items, isWednesday = false, addTip = false) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let discountPercent = 0;
    if (subtotal > 1000000) {
        discountPercent = 15;
    } else if (subtotal > 500000) {
        discountPercent = 10;
    }

    if (isWednesday) {
        discountPercent += 5;
    }

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const afterDiscount = subtotal - discountAmount;
    
    const vatAmount = Math.round(afterDiscount * 0.08); 
    
    const tipAmount = addTip ? Math.round(subtotal * 0.05) : 0; 
    
    const finalTotal = afterDiscount + vatAmount + tipAmount;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const INNER_WIDTH = 31; // Độ rộng phần text bên trong khung
    const BORDER_TOP    = "╔" + "═".repeat(INNER_WIDTH + 2) + "╗";
    const BORDER_MIDDLE = "╠" + "═".repeat(INNER_WIDTH + 2) + "╣";
    const BORDER_BOTTOM = "╚" + "═".repeat(INNER_WIDTH + 2) + "╝";

    console.log("\n" + BORDER_TOP);
    console.log("║" + "HÓA ĐƠN NHÀ HÀNG".padStart(23, ' ').padEnd(INNER_WIDTH + 2, ' ') + "║");
    console.log(BORDER_MIDDLE);

    items.forEach((item, index) => {
        const totalItemPrice = item.price * item.quantity;
        
        const namePart = `${index + 1}. ${item.name}`;
        const qtyPart = `x${item.quantity}`;
        const pricePart = `@${item.price / 1000}k = ${totalItemPrice / 1000}k`;

        const col1 = namePart.padEnd(15, ' ');
        const col2 = qtyPart.padEnd(4, ' ');
        const col3 = pricePart.padEnd(10, ' ');
        
        const line = `${col1} ${col2} ${col3}`.padEnd(INNER_WIDTH, ' ');
        console.log(`║ ${line} ║`);
    });

    console.log(BORDER_MIDDLE);

    const printTotalLine = (label, value) => {
        const spacesNeeded = INNER_WIDTH - label.length - value.length;
        const spaceStr = " ".repeat(Math.max(0, spacesNeeded));
        console.log(`║ ${label}${spaceStr}${value} ║`);
    };

    printTotalLine("Tổng cộng:", `${formatCurrency(subtotal)}đ`);
    printTotalLine(`Giảm giá (${discountPercent}%):`, `${formatCurrency(discountAmount)}đ`);
    printTotalLine("VAT (8%):", `${formatCurrency(vatAmount)}đ`);
    printTotalLine("Tip (5%):", `${formatCurrency(tipAmount)}đ`);

    console.log(BORDER_MIDDLE);
    printTotalLine("THANH TOÁN:", `${formatCurrency(finalTotal)}đ`);
    console.log(BORDER_BOTTOM + "\n");
}

async function main() {
    const orderItems = [];
    console.log("=== NHẬP DỮ LIỆU HÓA ĐƠN ===");

    while (true) {
        const name = await rl.question('Nhập tên món ăn (hoặc gõ "xong" để kết thúc nhập món): ');
        
        if (name.toLowerCase() === 'xong') {
            break;
        }

        const priceStr = await rl.question(`Nhập giá tiền cho món "${name}": `);
        const price = parseInt(priceStr, 10);

        const quantityStr = await rl.question('Nhập số lượng: ');
        const quantity = parseInt(quantityStr, 10);

        orderItems.push({ name, price, quantity });
        console.log('--- Đã thêm món! ---\n');
    }

    console.log("\n--- TÙY CHỌN KHÁC ---");
    const isWednesdayStr = await rl.question('Hôm nay có phải Thứ 3 (Wednesday) không? (y/n): ');
    const isWednesday = (isWednesdayStr.toLowerCase() === 'y');

    const addTipStr = await rl.question('Bạn có muốn thêm 5% Tip không? (y/n): ');
    const addTip = (addTipStr.toLowerCase() === 'y');

    rl.close();

    printReceipt(orderItems, isWednesday, addTip);
}

main();