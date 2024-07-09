// Fetch and insert header
fetch('NavBar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('NavBar').innerHTML = data;
    });