// =======================
// GET CART DATA
// =======================

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const cartItems =
document.getElementById("cartItems");

const totalPrice =
document.getElementById("totalPrice");

// =======================
// SAVE CART
// =======================

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}

// =======================
// INCREASE QTY
// =======================

function increaseQty(id){

    const item =
    cart.find(
        product =>
        product.id === id
    );

    item.quantity++;

    saveCart();
}

// =======================
// DECREASE QTY
// =======================

function decreaseQty(id){

    const item =
    cart.find(
        product =>
        product.id === id
    );

    if(item.quantity > 1){

        item.quantity--;

    }else{

        cart =
        cart.filter(
            product =>
            product.id !== id
        );

    }

    saveCart();
}

// =======================
// REMOVE ITEM
// =======================

function removeItem(id){

    cart =
    cart.filter(
        product =>
        product.id !== id
    );

    saveCart();
}

// =======================
// RENDER CART
// =======================

function renderCart(){

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
        <div class="empty">
            <h2>🛒 Cart Is Empty</h2>
            <p>Add some products first.</p>
        </div>
        `;

        totalPrice.textContent = 0;
        return;
    }

    cart.forEach(item => {

        total +=
        item.price *
        item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>
                    ₹${item.price.toLocaleString()}
                </p>

            </div>

            <div class="quantity-box">

                <button
                onclick="decreaseQty(${item.id})">
                -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                onclick="increaseQty(${item.id})">
                +
                </button>

            </div>

            <button
            class="remove-btn"
            onclick="removeItem(${item.id})">

            Remove

            </button>

        </div>

        `;
    });

    totalPrice.textContent =
    total.toLocaleString();
}

// =======================
// INITIAL LOAD
// =======================

renderCart();