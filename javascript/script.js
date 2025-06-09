const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const navLinks = document.querySelectorAll("#navMenu ul li a"); // Select all menu items

// Navbar Toggle
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open"); // Open/Close menu
    menuToggle.textContent = navMenu.classList.contains("open") ? "✖" : "☰"; // Toggle icon
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

// Close Menu on Item Click
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open"); // Close menu
        menuToggle.textContent = "☰"; // Reset icon
    });
});