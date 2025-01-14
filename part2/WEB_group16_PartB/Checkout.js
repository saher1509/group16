document.addEventListener("DOMContentLoaded", () => {
    // Updates the cart count displayed in the header by summing up item quantities from localStorage
    const updateCartCount = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cart-count").textContent = cartCount;
    }

    // Event listener for the order form submission
    document.getElementById("order-form").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        const formData = new FormData(event.target);
        const firstName = formData.get("first-name").trim();
        const lastName = formData.get("last-name").trim();
        const city = formData.get("city").trim();
        const street = formData.get("street-address").trim();
        const phone = formData.get("phone").trim();
        const email = formData.get("email").trim();
        const notes = formData.get("notes") || "None";

        // Clears previous error messages and input error classes
        document.querySelectorAll(".error-message").forEach((msg) => (msg.textContent = ""));
        document.querySelectorAll("input, textarea").forEach((input) => input.classList.remove("error"));

        let isValid = true;

        // Validates first name
        if (!firstName) {
            showError("first-name", "First name is required.");
            isValid = false;
        }

        // Validates last name
        if (!lastName) {
            showError("last-name", "Last name is required.");
            isValid = false;
        }

        // Validates city
        if (!city) {
            showError("city", "City is required.");
            isValid = false;
        }

        // Validates street address
        if (!street) {
            showError("street-address", "Street address is required.");
            isValid = false;
        }

        // Validates phone number
        if (!phone) {
            showError("phone", "This field is required.");
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phone) || phone[0] !== "0") {
            showError("phone", "Phone number must be 10 digits and start with 0.");
            isValid = false;
        }

        // Validates email
        if (!email) {
            showError("email", "This field is required.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("email", "Invalid email address.");
            isValid = false;
        }

        if (!isValid) {
            return; // Stops form submission if validation fails
        }

        // Marks the body as having placed an order (for styling purposes)
        document.body.classList.add("order-placed");

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
        localStorage.removeItem("cartItems");

        // Hides the form and shows the success message
        document.getElementById("order-form").style.display = "none";
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";
    });

    // Redirects to the homepage when the "Go Home" button is clicked
    document.getElementById("go-home-button").addEventListener("click", () => {
        window.location.href = "HomePage.html";
    });

    // Displays error messages for invalid fields
    const showError = (fieldId, message) => {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        if (errorElement) errorElement.textContent = message;
        if (inputElement) inputElement.classList.add("error");
    }

    // Renders the order summary table based on cart items from localStorage
    const renderOrderSummary = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const orderItemsContainer = document.getElementById("order-items");
        const orderSubtotalElement = document.getElementById("order-subtotal");

        let orderSubtotal = 0;
        orderItemsContainer.innerHTML = "";

        // Populates the order summary table
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

        // Updates the order subtotal
        orderSubtotalElement.textContent = `${orderSubtotal.toLocaleString()} ₪`;
    }

    // Initialize cart count and order summary on page load
    updateCartCount();
    renderOrderSummary();
});
