const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cartItems');
const totalMRPElement = document.getElementById('totalMRP');
const totalAmountElement = document.getElementById('totalAmount');
const cartModal = document.getElementById('cartModal');
const closeModalBtn = document.querySelector('.close');
const cartBtn = document.getElementById('cartBtn');

let cart = [];

// Fetching products from Fake Store API
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>Rating: ${product.rating.rate} <i class="fa-solid fa-star" style="color:rgb(247, 247, 85);"></i> </p>
                    <p>₹${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    });

// Add item to cart
function addToCart(productId) {
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
        displayCart();
        showPopup("Product added to cart!");
    } else {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(product => {
                cart.push({ ...product, quantity: 1 });
                displayCart();
                showPopup("Product added to cart!");
            });
    }
    updatePriceDetails();
}
// Function to Show Popup
function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.textContent = message;
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // Hide popup after 2 seconds
}

// Display cart items in modal
function displayCart() {
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <h5>${item.title}</h5>
                <p style = "padding-left:7px" >₹${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="decreaseQuantity(${item.id})">-</button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItem;
    });
    updatePriceDetails();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

// Increase quantity of item
function increaseQuantity(productId) {
    const productInCart = cart.find(item => item.id === productId);
    productInCart.quantity += 1;
    displayCart();
}

// Decrease quantity of item
function decreaseQuantity(productId) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart.quantity > 1) {
        productInCart.quantity -= 1;
    } else {
        removeFromCart(productId);
    }
    displayCart();
}

// Update price details
function updatePriceDetails() {
    let totalMRP = 0;

    cart.forEach(item => {
        totalMRP += item.price * item.quantity;
    });

    const totalAmount = totalMRP - 50 + 10 + 20; // Including discount, platform fee, and shipping

    totalMRPElement.textContent = totalMRP;
    totalAmountElement.textContent = totalAmount;
}

// Place order
function placeOrder() {
    alert('Order placed successfully!');
    cart = [];
    displayCart();
    updatePriceDetails();
    cartModal.style.display = 'none';
}

// Modal open/close functionality
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    displayCart();
});

closeModalBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});