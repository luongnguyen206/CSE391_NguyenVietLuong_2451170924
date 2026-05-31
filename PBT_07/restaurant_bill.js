// Câu C2: Tính hóa đơn nhà hàng

function tinhHoaDon(danhSachMon, isWednesday = false, tipPercent = 5) {
    // Bước 1: Tính tổng ban đầu
    let tongCong = 0;
    
    for (let i = 0; i < danhSachMon.length; i++) {
        const mon = danhSachMon[i];
        const thanhTien = mon.gia * mon.soLuong;
        tongCong += thanhTien;
    }
    
    // Bước 2: Áp dụng giảm giá theo tổng tiền
    let giamGia = 0;
    let phanTramGiamGia = 0;
    
    if (tongCong > 1000000) {
        phanTramGiamGia = 15;
        giamGia = tongCong * 0.15;
    } else if (tongCong > 500000) {
        phanTramGiamGia = 10;
        giamGia = tongCong * 0.10;
    }
    
    let tongSauGiam = tongCong - giamGia;
    
    // Bước 3: Giảm thêm 5% nếu là thứ 3
    let giamGiaThemThang = 0;
    if (isWednesday) {
        giamGiaThemThang = tongSauGiam * 0.05;
        tongSauGiam -= giamGiaThemThang;
    }
    
    // Bước 4: Tính VAT 8%
    const vat = tongSauGiam * 0.08;
    const tongSauVAT = tongSauGiam + vat;
    
    // Bước 5: Tính tip
    const tipTinh = tongSauVAT * (tipPercent / 100);
    const tongCuoiCung = tongSauVAT + tipTinh;
    
    // Bước 6: Trả về object chi tiết
    return {
        danhSachMon: danhSachMon,
        tongCong: tongCong,
        giamGiaTheoTongTien: giamGia,
        phanTramGiamGia: phanTramGiamGia,
        giamGiaThemThang: giamGiaThemThang,
        tongSauGiam: tongSauGiam,
        vat: vat,
        tipPercent: tipPercent,
        tip: tipTinh,
        tongCuoiCung: tongCuoiCung
    };
}

function inHoaDon(hoaDon, isWednesday = false) {
    console.log("╔══════════════════════════════════════════════════════╗");
    console.log("║              HÓA ĐƠN NHÀ HÀNG                        ║");
    console.log("╠══════════════════════════════════════════════════════╣");
    
    let stt = 1;
    for (let i = 0; i < hoaDon.danhSachMon.length; i++) {
        const mon = hoaDon.danhSachMon[i];
        const thanhTien = mon.gia * mon.soLuong;
        
        const tenMon = mon.ten.padEnd(15);
        const soLuong = ("x" + mon.soLuong).padStart(3);
        const donGia = ("@" + mon.gia + "k").padStart(8);
        const tongTien = ("= " + thanhTien + "k").padStart(10);
        
        console.log(`║ ${stt}. ${tenMon} ${soLuong}    ${donGia}  ${tongTien}     ║`);
        stt++;
    }
    
    console.log("╠══════════════════════════════════════════════════════╣");
    console.log(`║ Tổng cộng:                    ${hoaDon.tongCong.toString().padStart(13)}đ     ║`);
    
    if (hoaDon.giamGiaTheoTongTien > 0) {
        console.log(`║ Giảm giá (${hoaDon.phanTramGiamGia}%):                      ${hoaDon.giamGiaTheoTongTien.toFixed(0).toString().padStart(13)}đ     ║`);
    }
    
    if (hoaDon.giamGiaThemThang > 0) {
        console.log(`║ Giảm giá thêm (thứ 3):        ${hoaDon.giamGiaThemThang.toFixed(0).toString().padStart(13)}đ     ║`);
    }
    
    console.log(`║ VAT (8%):                     ${hoaDon.vat.toFixed(0).toString().padStart(13)}đ     ║`);
    
    if (hoaDon.tip > 0) {
        console.log(`║ Tip (${hoaDon.tipPercent}%):                       ${hoaDon.tip.toFixed(0).toString().padStart(13)}đ     ║`);
    }
    
    console.log("╠══════════════════════════════════════════════════════╣");
    console.log(`║ TỔNG TIỀN:                    ${hoaDon.tongCuoiCung.toFixed(0).toString().padStart(13)}đ     ║`);
    console.log("╚══════════════════════════════════════════════════════╝");
}

// TEST
const danhSachMon = [
    { ten: "Phở bò", gia: 65, soLuong: 2 },
    { ten: "Trà đá", gia: 5, soLuong: 3 },
    { ten: "Bún chả", gia: 55, soLuong: 1 },
    { ten: "Cơm tấm", gia: 45, soLuong: 2 }
];

console.log("╔════════════════════════════════════════════════════════╗");
console.log("║         HÓA ĐƠN THỨ THƯỜNG (NGÀY BÌNH THƯỜNG)        ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

const hoaDon1 = tinhHoaDon(danhSachMon, false, 5);
inHoaDon(hoaDon1);

console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║         HÓA ĐƠN NGÀY THỨ 3 (GIẢM THÊM 5%)            ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

const hoaDon2 = tinhHoaDon(danhSachMon, true, 5);
inHoaDon(hoaDon2);

console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║                CHI TIẾT TÍNH TOÁN                     ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("--- NGÀY THƯỜNG ---");
console.log(`Tổng ban đầu:        ${hoaDon1.tongCong}k`);
console.log(`Giảm giá (${hoaDon1.phanTramGiamGia}%):      ${hoaDon1.giamGiaTheoTongTien.toFixed(0)}k`);
console.log(`Tổng sau giảm:       ${hoaDon1.tongSauGiam.toFixed(0)}k`);
console.log(`VAT (8%):            ${hoaDon1.vat.toFixed(0)}k`);
console.log(`Tip (5%):            ${hoaDon1.tip.toFixed(0)}k`);
console.log(`📊 TỔNG CUỐI CÙNG:   ${hoaDon1.tongCuoiCung.toFixed(0)}k`);

console.log("\n--- NGÀY THỨ 3 (CÓ DISCOUNT THÊM) ---");
console.log(`Tổng ban đầu:        ${hoaDon2.tongCong}k`);
console.log(`Giảm giá (${hoaDon2.phanTramGiamGia}%):      ${hoaDon2.giamGiaTheoTongTien.toFixed(0)}k`);
console.log(`Giảm giá thêm (5%):  ${hoaDon2.giamGiaThemThang.toFixed(0)}k`);
console.log(`Tổng sau giảm:       ${hoaDon2.tongSauGiam.toFixed(0)}k`);
console.log(`VAT (8%):            ${hoaDon2.vat.toFixed(0)}k`);
console.log(`Tip (5%):            ${hoaDon2.tip.toFixed(0)}k`);
console.log(`📊 TỔNG CUỐI CÙNG:   ${hoaDon2.tongCuoiCung.toFixed(0)}k`);

console.log(`\n💰 Tiết kiệm ngày thứ 3: ${(hoaDon1.tongCuoiCung - hoaDon2.tongCuoiCung).toFixed(0)}k`);
