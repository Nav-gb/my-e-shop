let cart = [];

// Fetch products from Fake Store API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products);
}

// Display products in HTML
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}" style="width: 100px;" />
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                cart.push({ ...product, quantity: 1 });
                displayCart();
            });
    }
    displayCart();
}

// Display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h4>${item.title}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

// Increase item quantity in cart
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        displayCart();
    }
}

// Decrease item quantity in cart or remove it if quantity is 1
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(productId);
    }
    displayCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

// Search for products
function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts);
        });
}

// Initial fetch of products
fetchProducts();


// Display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h4>${item.title}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

// Increase item quantity in cart
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        displayCart();
    }
}

// Decrease item quantity in cart or remove it if quantity is 1
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(productId);
    }
    displayCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

// Search for products
function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts);
        });
}

// Initial fetch of products
fetchProducts();

// Display cart items with total bill
function displayCart() {
    const cartContainer = document.getElementById('cart');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    let total = 0;
    
    cartContainer.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <h4>${item.title}</h4>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');

    // Add total bill
    cartContainer.innerHTML += `
        <div class="total">
            <h3>Total Bill: $${total.toFixed(2)}</h3>
        </div>
    `;
}

