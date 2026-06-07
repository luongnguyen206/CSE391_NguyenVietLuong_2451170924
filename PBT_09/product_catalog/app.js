// Product Catalog - JavaScript

const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", emoji: "📱", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 22990000, category: "phone", emoji: "📱", rating: 4.7, inStock: true },
    { id: 3, name: "MacBook Pro", price: 48990000, category: "laptop", emoji: "💻", rating: 4.8, inStock: true },
    { id: 4, name: "Dell XPS 13", price: 32990000, category: "laptop", emoji: "💻", rating: 4.6, inStock: true },
    { id: 5, name: "iPad Air", price: 18990000, category: "tablet", emoji: "📲", rating: 4.4, inStock: true },
    { id: 6, name: "Samsung Galaxy Tab", price: 15990000, category: "tablet", emoji: "📲", rating: 4.3, inStock: false },
    { id: 7, name: "AirPods Pro", price: 7990000, category: "accessory", emoji: "🎧", rating: 4.6, inStock: true },
    { id: 8, name: "Apple Watch", price: 11990000, category: "accessory", emoji: "⌚", rating: 4.5, inStock: true },
    { id: 9, name: "Google Pixel 8", price: 21990000, category: "phone", emoji: "📱", rating: 4.7, inStock: true },
    { id: 10, name: "Lenovo ThinkPad", price: 28990000, category: "laptop", emoji: "💻", rating: 4.5, inStock: true },
    { id: 11, name: "OnePlus 12", price: 19990000, category: "phone", emoji: "📱", rating: 4.4, inStock: true },
    { id: 12, name: "USB-C Cable", price: 290000, category: "accessory", emoji: "🔌", rating: 4.2, inStock: true },
];

let filteredProducts = [...products];
let currentFilter = "all";
let cartCount = 0;

const productsGrid = document.querySelector("#productsGrid");
const searchInput = document.querySelector("#searchInput");
const categoryBtns = document.querySelectorAll(".category-btn");
const sortSelect = document.querySelector("#sortSelect");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modalBody");
const darkModeToggle = document.querySelector("#darkModeToggle");
const cartCountBadge = document.querySelector("#cartCount");

// Load dark mode preference
function loadDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Render products
function renderProducts() {
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Không tìm thấy sản phẩm</p>';
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString('vi-VN')}đ</div>
                <div class="product-rating">⭐ ${product.rating}</div>
                <div class="product-stock">${product.inStock ? '✅ Còn hàng' : '❌ Hết hàng'}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">🛒 Thêm giỏ</button>
            </div>
        </div>
    `).join("");

    // Add event listeners to cards and buttons
    document.querySelectorAll(".product-card").forEach(card => {
        const button = card.querySelector(".add-to-cart-btn");
        
        // Card click opens modal
        card.addEventListener("click", (e) => {
            if (e.target !== button) {
                const productId = parseInt(button.dataset.id);
                showProductDetail(productId);
            }
        });
        
        // Button click adds to cart
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        });
    });
}

// Show product detail in modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalBody.innerHTML = `
        <div class="modal-detail-image">${product.emoji}</div>
        <div class="modal-detail-name">${product.name}</div>
        <div class="modal-detail-price">${product.price.toLocaleString('vi-VN')}đ</div>
        <div class="modal-detail-category">Danh mục: ${product.category}</div>
        <div class="product-rating">⭐ ${product.rating} / 5.0</div>
        <div class="product-stock">${product.inStock ? '✅ Còn hàng' : '❌ Hết hàng'}</div>
        <button class="modal-detail-btn" onclick="addToCart(${productId})">Thêm vào giỏ hàng</button>
    `;
    
    modal.classList.remove("hidden");
}

// Add to cart
function addToCart(productId) {
    cartCount++;
    cartCountBadge.textContent = cartCount;
    modal.classList.add("hidden");
    alert("✅ Đã thêm vào giỏ hàng!");
}

// Search products
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterProducts();
    if (searchTerm.trim()) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
    }
    renderProducts();
});

// Filter by category
categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.category;
        filterProducts();
        renderProducts();
    });
});

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredProducts = products.filter(product => {
        const matchCategory = currentFilter === "all" || product.category === currentFilter;
        const matchSearch = product.name.toLowerCase().includes(searchTerm);
        return matchCategory && matchSearch;
    });
    
    sortProducts();
}

// Sort products
sortSelect.addEventListener("change", () => {
    sortProducts();
    renderProducts();
});

function sortProducts() {
    const sortType = sortSelect.value;
    
    switch(sortType) {
        case "price-asc":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "name-asc":
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "rating":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts = products.filter(p => {
                const matchCategory = currentFilter === "all" || p.category === currentFilter;
                return matchCategory;
            });
    }
}

// Close modal
document.querySelector(".modal-close").addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

// Keyboard: Escape to close modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.add("hidden");
    }
});

// Init
loadDarkMode();
renderProducts();
