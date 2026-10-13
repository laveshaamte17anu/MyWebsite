// =========================
// ELEMENTS
// =========================

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");

const categoryButtons = document.querySelectorAll(".category");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const darkModeBtn = document.getElementById("darkModeBtn");
const toast = document.getElementById("toast");

// =========================
// LOCAL STORAGE
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// =========================
// TOAST
// =========================

function showToast(message) {
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// =========================
// PRODUCT RENDER
// =========================

function renderProducts(productList) {

    productsContainer.innerHTML = "";

    productList.forEach(product => {

        const stars = "⭐".repeat(Math.round(product.rating));

        productsContainer.innerHTML += `
        
        <div class="product-card">

            <div class="sale-badge">
                ${product.sale}
            </div>

            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>

            <div class="product-info">

                <div class="product-title">
                    ${product.title}
                </div>

                <div class="product-price">
                    ₹${product.price.toLocaleString()}
                </div>

                <div class="product-rating">
                    ${stars}
                </div>

                <div class="product-actions">

                    <button class="add-cart-btn"
                        onclick="addToCart(${product.id})">
                        Add To Cart
                    </button>

                    <button class="wishlist-btn"
                        onclick="addToWishlist(${product.id})">
                        ❤️
                    </button>

                </div>

            </div>

        </div>

        `;
    });
}

// =========================
// CART
// =========================

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity:1
        });

    }

    saveCart();

    renderCart();

    showToast("Product Added To Cart");
}

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-item-info">

                <div class="cart-item-title">
                    ${item.title}
                </div>

                <div class="cart-item-price">
                    ₹${item.price.toLocaleString()}
                </div>

                <div class="qty-controls">

                    <button onclick="decreaseQty(${item.id})">
                    -
                    </button>

                    <span>
                    ${item.quantity}
                    </span>

                    <button onclick="increaseQty(${item.id})">
                    +
                    </button>

                </div>

                <button class="remove-btn"
                onclick="removeItem(${item.id})">
                Remove
                </button>

            </div>

        </div>

        `;
    });

    cartTotal.innerText = total.toLocaleString();

    cartCount.innerText = cart.reduce(
        (sum,item)=>sum+item.quantity,
        0
    );
}

function increaseQty(id){

    const item = cart.find(p=>p.id===id);

    item.quantity++;

    saveCart();

    renderCart();
}

function decreaseQty(id){

    const item = cart.find(p=>p.id===id);

    if(item.quantity > 1){

        item.quantity--;

    }else{

        cart = cart.filter(
            p => p.id !== id
        );
    }

    saveCart();

    renderCart();
}

function removeItem(id){

    cart = cart.filter(
        p => p.id !== id
    );

    saveCart();

    renderCart();

    showToast("Item Removed");
}

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

// =========================
// WISHLIST
// =========================

function addToWishlist(id){

    if(!wishlist.includes(id)){

        wishlist.push(id);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        showToast("Added To Wishlist ❤️");

    } else {

        showToast("Already In Wishlist");
    }
}

// =========================
// SEARCH
// =========================

searchInput.addEventListener("keyup", () => {

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    products.filter(product =>
        product.title
        .toLowerCase()
        .includes(value)
    );

    renderProducts(filtered);
});

// =========================
// CATEGORY FILTER
// =========================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
        .querySelector(".category.active")
        ?.classList.remove("active");

        button.classList.add("active");

        const category =
        button.dataset.category;

        if(category === "all"){

            renderProducts(products);

        } else {

            const filtered =
            products.filter(
                product =>
                product.category === category
            );

            renderProducts(filtered);
        }

    });

});

// =========================
// CART SIDEBAR
// =========================

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    overlay.classList.add("active");
});

closeCart.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);

function closeSidebar(){

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");
}

// =========================
// DARK MODE
// =========================

if(localStorage.getItem("theme")
=== "dark"){

    document.body.classList.add("dark");
}

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(
        document.body.classList.contains("dark")
    ){

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );
    }

});

// =========================
// CHECKOUT BUTTON
// =========================

document
.querySelector(".checkout-btn")
.addEventListener("click", () => {

    if(cart.length === 0){

        alert("Cart is Empty!");

        return;
    }

    alert(
        "Checkout Feature Coming Soon 🚀"
    );
});

// =========================
// INIT
// =========================

renderProducts(products);

renderCart();