document.addEventListener("DOMContentLoaded", function() {
    const hooksSection = document.getElementById("hooks");
    const categoryDropdown = document.getElementById("category");
    const sourceDropdown = document.getElementById("source");
    const searchInput = document.getElementById("search");
    const hooksModal = document.getElementById("hookModal");
    const hooksModalTitle = document.getElementById("hookModalTitle");
    const hooksModalCategory = document.getElementById("hookModalCategory");
    const hooksModalSource = document.getElementById("hookModalSource");
    const hooksModalDescription = document.getElementById("hookModalDescription");
    const hooksModalCreatedBy = document.getElementById("hookModalCreatedBy");
    const hooksModalLink = document.getElementById("hookModalLink");

    
    let hooksData = []; // Store the original hooks data
    
    // Fetch hooks data and render initially
    fetchHooksData();

    // Add event listeners to the dropdowns and search input
    categoryDropdown.addEventListener("change", filterHooks);
    sourceDropdown.addEventListener("change", filterHooks);
    searchInput.addEventListener("input", filterHooks);

    function fetchHooksData() {
        fetch("hook-data.json")
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

        const sourceElement = document.createElement("p");
        sourceElement.textContent = "Source: " + hook.source;
        sourceElement.classList.add("source");
        hookElement.appendChild(sourceElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = hook.description;
        descriptionElement.classList.add("description");
        hookElement.appendChild(descriptionElement);

        const created_byElement = document.createElement("p");
        created_byElement.textContent = "Created by: " + hook.created_by;
        created_byElement.classList.add("created_by");
        hookElement.appendChild(created_byElement);
        
        const linkElement = document.createElement("a");
        linkElement.href = hook.github;
        linkElement.textContent = "View on Github";
        hookElement.appendChild(linkElement);

        return hookElement;
    }

    function filterHooks() {
        const selectedCategory = categoryDropdown.value;
        const selectedSource = sourceDropdown.value;
        const searchQuery = searchInput.value.toLowerCase();

        const filteredHooks = hooksData.filter(hook => {
            const matchesCategory = !selectedCategory || hook.category.includes(selectedCategory);
            const matchesSource = !selectedSource || hook.source === selectedSource;
            const matchesSearch = !searchQuery || hook.title.toLowerCase().includes(searchQuery) || hook.description.toLowerCase().includes(searchQuery);
            
            return matchesCategory && matchesSource && matchesSearch;
        });

        renderHooks(filteredHooks);
    }

    function displayHookModal(hook) {
        hooksModalTitle.textContent = hook.title;
        hooksModalCreatedBy.textContent = hook.created_by;
        hooksModalCategory.textContent = "Category: " + hook.category.join(", ");
        hooksModalSource.textContent = "Source: " + hook.source;
        hooksModalDescription.textContent = hook.description;
        hooksModalLink.href = hook.github;

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
