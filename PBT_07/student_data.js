// Bài B2: Xử lý dữ liệu sinh viên

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

// 1. Tính điểm trung bình và xếp loại
const studentResults = [];

for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
    
    let rank;
    if (average >= 8.0) {
        rank = "Giỏi";
    } else if (average >= 6.5) {
        rank = "Khá";
    } else if (average >= 5.0) {
        rank = "Trung bình";
    } else {
        rank = "Yếu";
    }
    
    studentResults.push({
        name: student.name,
        math: student.math,
        physics: student.physics,
        cs: student.cs,
        average: average.toFixed(2),
        rank: rank,
        gender: student.gender
    });
}

// 3. In bảng kết quả
console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║              BẢNG ĐIỂM SINH VIÊN                          ║");
console.log("╠════════════════════════════════════════════════════════════╣");
console.log("║ STT │  Tên  │ Toán │ Vật │  CNMT │  TB  │    Xếp loại    ║");
console.log("╠════════════════════════════════════════════════════════════╣");

for (let i = 0; i < studentResults.length; i++) {
    const sr = studentResults[i];
    const name = sr.name.padEnd(5);
    const rank = sr.rank.padEnd(14);
    console.log(`║ ${i + 1}  │ ${name} │ ${sr.math.toString().padEnd(4)} │ ${sr.physics.toString().padEnd(3)} │ ${sr.cs.toString().padEnd(5)} │ ${sr.average.padEnd(4)} │ ${rank} ║`);
}
console.log("╚════════════════════════════════════════════════════════════╝");

// 4. Đếm số SV mỗi xếp loại
let countGioi = 0, countKha = 0, countTrungBinh = 0, countYeu = 0;

for (let i = 0; i < studentResults.length; i++) {
    if (studentResults[i].rank === "Giỏi") countGioi++;
    else if (studentResults[i].rank === "Khá") countKha++;
    else if (studentResults[i].rank === "Trung bình") countTrungBinh++;
    else if (studentResults[i].rank === "Yếu") countYeu++;
}

console.log("\n📊 Thống kê theo xếp loại:");
console.log(`- Giỏi: ${countGioi} sinh viên`);
console.log(`- Khá: ${countKha} sinh viên`);
console.log(`- Trung bình: ${countTrungBinh} sinh viên`);
console.log(`- Yếu: ${countYeu} sinh viên`);

// 5. Tìm SV có điểm TB cao nhất và thấp nhất
let maxStudent = studentResults[0];
let minStudent = studentResults[0];

for (let i = 1; i < studentResults.length; i++) {
    if (parseFloat(studentResults[i].average) > parseFloat(maxStudent.average)) {
        maxStudent = studentResults[i];
    }
    if (parseFloat(studentResults[i].average) < parseFloat(minStudent.average)) {
        minStudent = studentResults[i];
    }
}

console.log(`\n🏆 Điểm TB cao nhất: ${maxStudent.name} (${maxStudent.average})`);
console.log(`📉 Điểm TB thấp nhất: ${minStudent.name} (${minStudent.average})`);

// 6. Tính điểm TB toàn lớp cho từng môn
let sumMath = 0, sumPhysics = 0, sumCS = 0;

for (let i = 0; i < students.length; i++) {
    sumMath += students[i].math;
    sumPhysics += students[i].physics;
    sumCS += students[i].cs;
}

const avgMath = (sumMath / students.length).toFixed(2);
const avgPhysics = (sumPhysics / students.length).toFixed(2);
const avgCS = (sumCS / students.length).toFixed(2);

console.log("\n📈 Điểm TB toàn lớp:");
console.log(`- Toán: ${avgMath}`);
console.log(`- Vật lý: ${avgPhysics}`);
console.log(`- CNMT: ${avgCS}`);

// 7. BONUS: Tính điểm TB theo giới tính
let sumMathM = 0, sumPhysicsM = 0, sumCSM = 0, countM = 0;
let sumMathF = 0, sumPhysicsF = 0, sumCSF = 0, countF = 0;

for (let i = 0; i < students.length; i++) {
    if (students[i].gender === "M") {
        sumMathM += students[i].math;
        sumPhysicsM += students[i].physics;
        sumCSM += students[i].cs;
        countM++;
    } else {
        sumMathF += students[i].math;
        sumPhysicsF += students[i].physics;
        sumCSF += students[i].cs;
        countF++;
    }
}

console.log("\n👥 Điểm TB theo giới tính (Nam):");
console.log(`- Toán: ${(sumMathM / countM).toFixed(2)}`);
console.log(`- Vật lý: ${(sumPhysicsM / countM).toFixed(2)}`);
console.log(`- CNMT: ${(sumCSM / countM).toFixed(2)}`);

console.log("\n👥 Điểm TB theo giới tính (Nữ):");
console.log(`- Toán: ${(sumMathF / countF).toFixed(2)}`);
console.log(`- Vật lý: ${(sumPhysicsF / countF).toFixed(2)}`);
console.log(`- CNMT: ${(sumCSF / countF).toFixed(2)}`);
