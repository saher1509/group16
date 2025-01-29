document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (event) => {
        let isValid = true;

        // Reset previous error messages
        document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");
        document.querySelectorAll("input, textarea").forEach(field => field.classList.remove("error"));

        // Get form data
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        // Validate name
        if (!name) {
            showError("name", "Name is required.");
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
    });

    // Function to display error messages
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        if (errorElement) errorElement.textContent = message;
        if (inputElement) inputElement.classList.add("error");
    }
});
