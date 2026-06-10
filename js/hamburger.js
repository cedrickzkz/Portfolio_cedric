// Hamburger menu - à inclure sur toutes les pages
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const headerNav = document.querySelector(".header-nav");

    if (hamburger && headerNav) {
        hamburger.addEventListener("click", function(e) {
            e.preventDefault();
            hamburger.classList.toggle("active");
            headerNav.classList.toggle("active");
        });

        // Fermer le menu quand on clique sur un lien
        headerNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function() {
                hamburger.classList.remove("active");
                headerNav.classList.remove("active");
            });
        });

        // Fermer en cliquant en dehors
        document.addEventListener("click", function(e) {
            if (!hamburger.contains(e.target) && !headerNav.contains(e.target)) {
                hamburger.classList.remove("active");
                headerNav.classList.remove("active");
            }
        });
    }
});
