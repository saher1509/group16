document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("order-form"); // Order form

    // Update the number of items in the cart in the header
    const updateCartCount = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cart-count").textContent = cartCount;
    };

    // Listen for form submission event
    form.addEventListener("submit", (event) => {
        let isValid = true;


        // Clear previous error messages
        document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");
        document.querySelectorAll("input, textarea").forEach(field => field.classList.remove("error"));


        // Get form data

        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const city = document.getElementById("city").value.trim();
        const street = document.getElementById("street-address").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();


        // Validation checks
        if (!firstName) {
            showError("first-name", "First name is required.");
            isValid = false;
        }
        if (!lastName) {
            showError("last-name", "Last name is required.");
            isValid = false;
        }
        if (!city) {
            showError("city", "City is required.");
            isValid = false;
        }
        if (!street) {
            showError("street-address", "Street address is required.");
            isValid = false;
        }
        // Validate email
        if (!email) {
            showError("email", "Email is required.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("email", "Invalid email address.");
            isValid = false;
        }

        // Validate phone number
        if (!phone) {
            showError("phone", "Phone is required.");
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phone) || phone[0] !== "0") {
            showError("phone", "Phone number must be 10 digits and start with 0.");
            isValid = false;
        }

        // Stop form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }


        // Prepares the order object
        const order = {
            firstName,
            lastName,
            city,
            street,
            phone,
            email,
            notes,
        };

        // Saves the order to localStorage and clears the cart
        localStorage.setItem("order", JSON.stringify(order));
        // Get cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Convert to JSON string and set in hidden input
        document.getElementById("cart-items").value = JSON.stringify(cartItems);

        // Clear the cart
        localStorage.removeItem("cartItems");

    });


    // Function to display error messages
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        if (errorElement) errorElement.textContent = message;
        if (inputElement) inputElement.classList.add("error");
    }

    // Render the order summary displaying the purchased products
    const renderOrderSummary = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const orderItemsContainer = document.getElementById("order-items");
        const orderSubtotalElement = document.getElementById("order-subtotal");

        let orderSubtotal = 0;
        orderItemsContainer.innerHTML = "";

        // Build the order summary table
        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            orderSubtotal += subtotal;

            orderItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name} × ${item.quantity}</td>
                    <td>${subtotal.toLocaleString()} ₪</td>
                </tr>
            `;
        });

        // Update total price
        orderSubtotalElement.textContent = `${orderSubtotal.toLocaleString()} ₪`;
    };

    // Initialize data when the page loads
    updateCartCount();
    renderOrderSummary();
});
