// Get the category dropdown button and dropdown content
const dropdownBtn = document.getElementById('category-dropdown-btn');
const dropdownContent = document.getElementById('category-dropdown');

// Toggle dropdown content visibility
dropdownBtn.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
});

// Close dropdown when clicking outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('#category-dropdown') && !event.target.matches('#category-dropdown-btn')) {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
});

// Add event listener to checkboxes to handle "Other" category input visibility
const otherCategoryInput = document.getElementById('other-category-input');
const checkboxes = document.querySelectorAll('#category-dropdown input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.value === 'Other' && this.checked) {
            otherCategoryInput.style.display = 'block';
        } else {
            otherCategoryInput.style.display = 'none';
        }
        // Prevent the dropdown from closing when selecting checkboxes
        event.stopPropagation();
    });
});
