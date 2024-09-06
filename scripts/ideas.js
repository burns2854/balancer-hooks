document.addEventListener("DOMContentLoaded", function() {
    const hooksSection = document.getElementById("hooks");
    const categoryDropdown = document.getElementById("category");
    const searchInput = document.getElementById("search");
    const hooksModal = document.getElementById("hookModal");
    const hooksModalTitle = document.getElementById("hookModalTitle");
    const hooksModalCategory = document.getElementById("hookModalCategory");
    const hooksModalDescription = document.getElementById("hookModalDescription");

    
    let hooksData = []; // Store the original hooks data
    
    // Fetch hooks data and render initially
    fetchHooksData();

    // Add event listeners to the dropdowns and search input
    categoryDropdown.addEventListener("change", filterHooks);
    searchInput.addEventListener("input", filterHooks);

    function fetchHooksData() {
        fetch("ideas-data.json")
            .then(response => response.json())
            .then(data => {
                hooksData = data;
                renderHooks(hooksData);
            })
            .catch(error => console.error("Error fetching hooks data:", error));
    }

    function renderHooks(hooks) {
        hooksSection.innerHTML = ""; // Clear existing hooks
        
        hooks.forEach(hook => {
            const hookElement = createHookElement(hook);
            hooksSection.appendChild(hookElement);
            hookElement.addEventListener("click", () => displayHookModal(hook));
        });
    }

    function createHookElement(hook) {
        const hookElement = document.createElement("div");
        hookElement.classList.add("hook");

        const titleElement = document.createElement("hookh1");
        titleElement.textContent = hook.title;
        hookElement.appendChild(titleElement);

        const categoryElement = document.createElement("p");
        categoryElement.textContent = "Category: " + hook.category.join(", ");
        categoryElement.classList.add("category");
        hookElement.appendChild(categoryElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = hook.description;
        descriptionElement.classList.add("description");
        hookElement.appendChild(descriptionElement);
        
        if (hook.additional_link && hook.additional_link.trim() !== "") {
            const linkElement = document.createElement("a");
            linkElement.href = hook.additional_link;
            linkElement.textContent = "More Info";
            linkElement.target = "_blank";
            linkElement.classList.add("more-info-link"); 
            hookElement.appendChild(linkElement);
        }

        return hookElement;
    }

    function filterHooks() {
        const selectedCategory = categoryDropdown.value;
        const searchQuery = searchInput.value.toLowerCase();

        const filteredHooks = hooksData.filter(hook => {
            const matchesCategory = !selectedCategory || hook.category.includes(selectedCategory);
            const matchesSearch = !searchQuery || hook.title.toLowerCase().includes(searchQuery) || hook.description.toLowerCase().includes(searchQuery);
            
            return matchesCategory && matchesSearch;
        });

        renderHooks(filteredHooks);
    }

    function displayHookModal(hook) {
        hooksModalTitle.textContent = hook.title;
        hooksModalCategory.textContent = "Category: " + hook.category.join(", ");
        hooksModalDescription.textContent = hook.description;

        const hookModalLink = document.getElementById("hookModalLink");
        if (hook.additional_link && hook.additional_link.trim() !== "") {
            hookModalLink.textContent = "More Info";
            hookModalLink.href = hook.additional_link;
            hookModalLink.style.display = "block"; // Show the link
        } else {
            hookModalLink.style.display = "none"; // Hide the link
        }
        hooksModal.style.display = "block";
    
        // Close the modal when close button or outside the modal is clicked
        hooksModal.querySelector(".close").addEventListener("click", () => {
            hooksModal.style.display = "none";
        });
    
        window.addEventListener("click", (event) => {
            if (event.target === hooksModal) {
                hooksModal.style.display = "none";
            }
        });
    }

});
