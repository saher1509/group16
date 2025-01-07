if (!sessionStorage.getItem("cartInitialized")) {
    localStorage.removeItem("cartItems"); // Clear the cart only on first load
    sessionStorage.setItem("cartInitialized", "true"); // Mark the cart as initialized
}
// Example data of available products in the shop

const availableProducts = [
    {id: 1, name: "FT1 Inspire", price: 2000, image: "product1.png"},
    {id: 2, name: "X98 Cross", price: 2000, image: "product2.png"},
    {id: 3, name: "Speeder F60", price: 3000, image: "product3.png"},
    {id: 4, name: "KETTLER KE3086d", price: 9000, image: "product4.png"},
    {id: 5, name: "Squats Machine", price: 3000, image: "product5.png"},
    {id: 6, name: "Dumbbell 10 Kg", price: 100, image: "product6.png"},
    {id: 7, name: "Curl Bar", price: 300, image: "product7.png"},
    {id: 8, name: "Weight Bench", price: 1000, image: "product8.png"}
];

// Retrieve shopping cart from localStorage or initialize an empty cart
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];



const saveCart = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cartItems to localStorage
}

const loadCart = () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart); // Parse the saved cart
    } else {
        cartItems = []; // Initialize as empty if no saved cart
    }
}

// Function to calculate and display the total amount
const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('total-amount').textContent = `${total.toLocaleString()} ₪`; // Update total amount
}

// Function to render the cart
const renderCart = () => {
    const emptyCartSection = document.getElementById('empty-cart');
    const filledCartSection = document.getElementById('filled-cart');
    const cartItemsContainer = document.getElementById('cart-items');

    if (cartItems.length === 0) {
        emptyCartSection.style.display = 'block';
        filledCartSection.style.display = 'none';
    } else {
        emptyCartSection.style.display = 'none';
        filledCartSection.style.display = 'block';

        cartItemsContainer.innerHTML = ''; // Clear previous items
        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}" >
                        <span>${item.name}</span>
                    </td>
                    <td>${item.price} ₪</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" 
                            onchange="updateQuantity(${item.id}, this.value)">
                    </td>
                    <td>${subtotal.toLocaleString()} ₪</td>
                    <td>
                        <button class="remove-button" onclick="removeFromCart(${item.id})">X</button>
                    </td>
                </tr>
            `;
        });

        calculateTotal(); // Update the total amount
    }
}


// Function to update the quantity of an item
const removeFromCart = (productId) => {
    cartItems = cartItems.filter(item => item.id !== productId); // Remove item by ID
    saveCart(); // Save cart to localStorage
    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
}

const updateQuantity = (productId, quantity) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity, 10);
        saveCart(); // Save cart to localStorage
        renderCart(); // Re-render the cart
        updateCartCount(); // Update the cart count
    }
}

const updateCartCount = () => {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    document.getElementById('cart-count').textContent = cartCount; // Update the cart count display
}

window.onload = function () {
    loadCart(); // Load the cart from localStorage
    renderCart(); // Render the cart
    updateCartCount(); // Update the cart count
};



// Initialize the shop page and cart page
renderCart();
