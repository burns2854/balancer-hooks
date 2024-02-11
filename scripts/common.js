// Fetch and insert header
fetch('NavBar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('NavBar').innerHTML = data;
    });

// Fetch and insert footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });