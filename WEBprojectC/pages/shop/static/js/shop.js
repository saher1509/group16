if (!sessionStorage.getItem("cartInitialized")) {
    localStorage.removeItem("cartItems"); // Clear the cart only on first load
    sessionStorage.setItem("cartInitialized", "true"); // Mark the cart as initialized
}


// Example data of available products
const availableProducts = [
    {id: 1, name: "FT1 Inspire", price: 10000, image: "product1.png"},
    {id: 2, name: "X98 Cross", price: 2000, image: "product2.png"},
    {id: 3, name: "Speeder F60", price: 3000, image: "product3.png"},
    {id: 4, name: "KETTLER KE3086d", price: 9000, image: "product4.png"},
    {id: 5, name: "Squats Machine", price: 3000, image: "product5.png"},
    {id: 6, name: "Dumbbell 10 Kg", price: 100, image: "product6.png"},
    {id: 7, name: "Curl Bar", price: 300, image: "product7.png"},
    {id: 8, name: "Weight Bench", price: 1000, image: "product8.png"},
];

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to add a product to the cart
const addToCart = (productId, quantity = 1) => {
    const product = availableProducts.find(item => item.id === productId);
    if (product) {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity
        } else {
            cartItems.push({...product, quantity}); // Add new item
        }
        saveCart(); // Save cart to localStorage
        updateCartCount(); // Update the cart count immediately
    }
}

// Function to save the cart to localStorage
const saveCart = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cartItems to localStorage
}

// Function to update the cart count display
const updateCartCount = () => {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartCount; // Update the cart count display
    }
}

// Attach event listeners to all "Add to cart" buttons on the shop page
const initializeShop = () => {
    const buttons = document.querySelectorAll(".products .product button");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => addToCart(index + 1)); // Add product to cart
    });
}

// Run when the page loads
window.onload = function () {
    updateCartCount(); // Update the cart count on page load
    initializeShop(); // Attach event listeners to buttons
};