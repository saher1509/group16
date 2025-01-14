if (!sessionStorage.getItem("cartInitialized")) {
    localStorage.removeItem("cartItems"); // Clear the cart only on first load
    sessionStorage.setItem("cartInitialized", "true"); // Mark the cart as initialized
}


// Example data of available products in your shop
const availableProducts = [
    {id: 7, name: "Curl Bar", price: 300, image: "product7.png"}
];

// Retrieve shopping cart from localStorage or initialize an empty cart
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
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to update the cart count display
const updateCartCount = () => {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartCount; // Update the cart count display
    }
}

// Function to initialize product page functionality
const initializeProductPage = () => {
    const addToCartButton = document.querySelector(".add-to-cart");
    const quantityInput = document.querySelector(".quantity input");

    if (addToCartButton && quantityInput) {
        addToCartButton.addEventListener("click", () => {
            const quantity = parseInt(quantityInput.value, 10);
            if (quantity > 0) {
                addToCart(7, quantity); // Replace "7" with the specific product ID

            }
        });
    }
}

// Run when the page loads
window.onload = function () {
    updateCartCount(); // Update the cart count on page load
    initializeProductPage(); // Initialize product page functionality
};
