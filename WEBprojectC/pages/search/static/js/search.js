document.addEventListener("DOMContentLoaded", () => {
    // Select all necessary DOM elements
    const searchIcon = document.querySelector(".icon-search"); // Search icon button
    const modal = document.getElementById("search-modal"); // Modal for search
    const closeModal = document.querySelector(".close"); // Close button for the modal
    const searchInput = document.getElementById("search-input"); // Input field for search
    const searchButton = document.getElementById("search-button"); // Search button
    const searchResultsDiv = document.getElementById("search-results"); // Container to display search results
    const noResultsMessage = document.getElementById("no-results-message"); // Message displayed when no results are found
    const searchFilter = document.getElementById("search-filter"); // Dropdown filter for search categories

    // Array of products to search from
    const products = [
        {id: 1, name: "FT1 Inspire", slug: "FT1Inspire", category: "Strength", price: 10000},
        {id: 2, name: "X98 Cross", slug: "X98Cross", category: "Cardio", price: 2000},
        {id: 3, name: "Speeder F60", slug: "SpeederF60", category: "Cardio", price: 3000},
        {id: 4, name: "KETTLER KE3086d", slug: "KETTLERKE3086d", category: "Strength", price: 9000},
        {id: 5, name: "Squats Machine", slug: "SquatsMachine", category: "Strength", price: 3000},
        {id: 6, name: "Dumbbell 10 Kg", slug: "Dumbbell10Kg", category: "Strength", price: 100},
        {id: 7, name: "Curl Bar", slug: "CurlBar", category: "Strength", price: 300},
        {id: 8, name: "Weight Bench", slug: "WeightBench", category: "Strength", price: 1000},
    ];

    // Open the search modal when the search icon is clicked
    searchIcon.addEventListener("click", () => {
        event.preventDefault();
        modal.style.display = "block"; // Show the modal
        searchInput.focus(); // Focus on the input field
    });

    // Close the search modal when the close button is clicked
    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal
        searchResultsDiv.innerHTML = ""; // Clear search results
        searchInput.value = ""; // Clear the input field
        noResultsMessage.style.display = "none"; // Hide the no-results message
    });

    // Close the modal if the user clicks outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
            searchResultsDiv.innerHTML = ""; // Clear search results
            searchInput.value = ""; // Clear the input field
            noResultsMessage.style.display = "none"; // Hide the no-results message
        }
    });

    // Handle the search button click event
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase(); // Get the search query and normalize it
        const filter = searchFilter.value; // Get the selected search filter
        searchResultsDiv.innerHTML = ""; // Clear previous results
        noResultsMessage.style.display = "none"; // Hide the no-results message

        // If the query is empty, show a warning message
        if (!query) {
            noResultsMessage.style.display = "block"; // Show the message
            noResultsMessage.textContent = "Please enter a search query."; // Set the message content
            return;
        }

        // Filter products based on the query and the selected filter
        const results = products.filter((product) =>
            product[filter].toString().toLowerCase().includes(query)
        );

        // Display the results or show a "no results" message
        if (results.length === 0) {
            noResultsMessage.style.display = "block"; // Show the no-results message
            noResultsMessage.textContent = "Sorry, no results found!"; // Set the message content
        } else {

            searchResultsDiv.innerHTML = results
                .map(
                    (product) => `
            <div class="result-item">
              <a href="/shop/${product.slug}" class="search-result-link">
                        <h3>${product.name} - ${product.price} ₪</h3>
                        <p class="result-category">Category: ${product.category}</p>
                    </a>
            </div>`
                )
                .join("");
        }
    });

    // Trigger the search when the "Enter" key is pressed in the input field
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default form submission
            searchButton.click(); // Simulate a click on the search button
        }
    });
});


// document.addEventListener("DOMContentLoaded", () => {
//     // Select all necessary DOM elements
//     const searchIcon = document.querySelector(".icon-search"); // Search icon button
//     const modal = document.getElementById("search-modal"); // Modal for search
//     const closeModal = document.querySelector(".close"); // Close button for the modal
//     const searchInput = document.getElementById("search-input"); // Input field for search
//     const searchButton = document.getElementById("search-button"); // Search button
//     const searchResultsDiv = document.getElementById("search-results"); // Container to display search results
//     const noResultsMessage = document.getElementById("no-results-message"); // Message displayed when no results are found
//     const searchFilter = document.getElementById("search-filter"); // Dropdown filter for search categories
//
//     // Open the search modal when the search icon is clicked
//     searchIcon.addEventListener("click", (event) => {
//         event.preventDefault();
//         modal.style.display = "block"; // Show the modal
//         searchInput.focus(); // Focus on the input field
//     });
//
//     // Close the search modal when the close button is clicked
//     closeModal.addEventListener("click", () => {
//         modal.style.display = "none"; // Hide the modal
//         searchResultsDiv.innerHTML = ""; // Clear search results
//         searchInput.value = ""; // Clear the input field
//         noResultsMessage.style.display = "none"; // Hide the no-results message
//     });
//
//     // Close the modal if the user clicks outside the modal content
//     window.addEventListener("click", (event) => {
//         if (event.target === modal) {
//             modal.style.display = "none"; // Hide the modal
//             searchResultsDiv.innerHTML = ""; // Clear search results
//             searchInput.value = ""; // Clear the input field
//             noResultsMessage.style.display = "none"; // Hide the no-results message
//         }
//     });
//
//     // Handle the search button click event
//     searchButton.addEventListener("click", async () => {
//         const query = searchInput.value.trim().toLowerCase(); // Get the search query and normalize it
//         const filter = searchFilter.value; // Get the selected search filter
//         searchResultsDiv.innerHTML = ""; // Clear previous results
//         noResultsMessage.style.display = "none"; // Hide the no-results message
//
//
//
//         try {
//             const response = await fetch(`/search?q=${query}&filter=${filter}`);
//             const results = await response.json();
//
//             if (results.length === 0) {
//                 noResultsMessage.style.display = "block";
//                 noResultsMessage.textContent = "Sorry, no results found!";
//             } else {
//                 searchResultsDiv.innerHTML = results.map(product => `
//                     <div class="result-item">
//                         <a href="/shop/${product.slug}" class="search-result-link">
//                             <h3>${product.name} - ${product.price} ₪</h3>
//                             <p class="result-category">Category: ${product.category}</p>
//                         </a>
//                     </div>
//                 `).join("");
//             }
//         } catch (error) {
//             console.error("Error fetching search results:", error);
//             noResultsMessage.style.display = "block";
//             noResultsMessage.textContent = "Error loading search results.";
//         }
//     });
//
//     // Trigger the search when the "Enter" key is pressed in the input field
//     searchInput.addEventListener("keypress", (event) => {
//         if (event.key === "Enter") {
//             event.preventDefault(); // Prevent the default form submission
//             searchButton.click(); // Simulate a click on the search button
//         }
//     });
// });
