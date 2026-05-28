const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let countGioi = 0;
let countKha = 0;
let countTB = 0;
let countYeu = 0;

let maxAvg = -1;
let minAvg = 11;
let maxStudent = "";
let minStudent = "";

let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;

let totalAvgM = 0;
let countM = 0;
let totalAvgF = 0;
let countF = 0;

console.log("3. BẢNG KẾT QUẢ:");
console.log("| STT | Tên       | TB   | Xếp loại   |");
console.log("|-----|-----------|------|------------|");

for (let i = 0; i < students.length; i++) {
    let sv = students[i];

    // 1. Tính điểm trung bình (ĐTB) theo trọng số đề bài
    let avg = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;

    // 2. Xếp loại sinh viên bằng cấu trúc rẽ nhánh if/else if/else
    let xepLoai = "";
    if (avg >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (avg >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    // 3. Định dạng chuỗi hiển thị dòng dữ liệu trên bảng bằng .padEnd() để thẳng hàng
    let sttStr = (i + 1).toString().padEnd(3, " ");
    let nameStr = sv.name.padEnd(9, " ");
    let avgStr = avg.toFixed(1).padEnd(4, " ");
    let xepLoaiStr = xepLoai.padEnd(10, " ");
    
    console.log(`| ${sttStr} | ${nameStr} | ${avgStr} | ${xepLoaiStr} |`);

    // 5. Cập nhật thuật toán tìm kiếm Min/Max
    if (avg > maxAvg) {
        maxAvg = avg;
        maxStudent = sv.name;
    }
    if (avg < minAvg) {
        minAvg = avg;
        minStudent = sv.name;
    }

    // 6. Cộng dồn điểm các môn học để tính trung bình cả lớp sau vòng lặp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;

    // 7. Phân loại theo giới tính để cộng dồn (Bonus)
    if (sv.gender === "M") {
        totalAvgM += avg;
        countM++;
    } else if (sv.gender === "F") {
        totalAvgF += avg;
        countF++;
    }
}

console.log("----------------------------------------------\n");

// 4. In kết quả đếm số lượng sinh viên mỗi loại
console.log("4. Đếm số SV mỗi xếp loại:");
console.log(`- Giỏi: ${countGioi} sinh viên`);
console.log(`- Khá: ${countKha} sinh viên`);
console.log(`- Trung bình: ${countTB} sinh viên`);
console.log(`- Yếu: ${countYeu} sinh viên\n`);

// 5. In kết quả SV có điểm TB cao nhất và thấp nhất
console.log("5. Tìm kiếm học viên đặc biệt:");
console.log(`- Thủ khoa lớp (ĐTB cao nhất): ${maxStudent} (${maxAvg.toFixed(1)} điểm)`);
console.log(`- Á khoa ngược (ĐTB thấp nhất): ${minStudent} (${minAvg.toFixed(1)} điểm)\n`);

// 6. Tính toán và in điểm TB toàn lớp cho từng môn học
let totalStudents = students.length;
let classAvgMath = totalMath / totalStudents;
let classAvgPhysics = totalPhysics / totalStudents;
let classAvgCs = totalCs / totalStudents;

console.log("6. Điểm trung bình toàn lớp theo từng môn:");
console.log(`- Môn Toán (Math):    ${classAvgMath.toFixed(2)} điểm`);
console.log(`- Môn Vật lý (Physics): ${classAvgPhysics.toFixed(2)} điểm`);
console.log(`- Môn Tin học (CS):     ${classAvgCs.toFixed(2)} điểm\n`);

// 7. Bonus: Tính toán và hiển thị điểm TB theo giới tính
console.log("7. Bonus - Điểm trung bình theo giới tính:");
if (countM > 0) {
    console.log(`- Giới tính Nam (M): ${(totalAvgM / countM).toFixed(2)} điểm`);
}
if (countF > 0) {
    console.log(`- Giới tính Nữ (F):  ${(totalAvgF / countF).toFixed(2)} điểm`);
}