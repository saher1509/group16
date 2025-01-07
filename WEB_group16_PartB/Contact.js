// Wait until the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form"); // Get the form element
    const successMessage = document.getElementById("success-message"); // Get the success message element
    const homeButton = document.getElementById("home-button"); // Get the "Home" button element

    // Event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve values from form fields
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        // Reset error messages and remove error styling
        document.querySelectorAll(".error-message").forEach((msg) => (msg.textContent = ""));
        document.querySelectorAll("input, textarea").forEach((field) => field.classList.remove("error"));

        let isValid = true; // Flag to track form validation status

        // Validate name field
        if (!name) {
            showError("name", "Name is required.");
            isValid = false;
        }

        // Validate email field
        if (!email) {
            showError("email", "Email is required.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Regex to validate email format
            showError("email", "Invalid email address.");
            isValid = false;
        }

        // Validate phone field
        if (!phone) {
            showError("phone", "Phone is required.");
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phone) || phone[0] !== "0") { // Check phone length and starting digit
            showError("phone", "Phone number must be 10 digits and start with 0.");
            isValid = false;
        }

        // If form is invalid, exit the function
        if (!isValid) return;

        document.body.classList.add("submitted"); // Add a class to the body for styling

        // Hide the form and show the success message
        form.style.display = "none";
        successMessage.style.display = "block";
    });

    // Event listener for the "Home" button
    homeButton.addEventListener("click", () => {
        window.location.href = "HomePage.html"; // Redirect to the home page
    });

    // Function to display error messages and add error styling
    const showError = (fieldId, message) => {
        const errorElement = document.getElementById(`${fieldId}-error`); // Get the error message element
        const inputElement = document.getElementById(fieldId); // Get the input element

        if (errorElement) errorElement.textContent = message; // Set the error message text
        if (inputElement) inputElement.classList.add("error"); // Add error styling to the input
    }
});
