/**
 * gallery-scroll.js
 * Convertit le scroll vertical en scroll horizontal sur les galeries
 */

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.gallery-scroll').forEach(function (gallery) {

        // Scroll molette → horizontal
        gallery.addEventListener('wheel', function (e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                gallery.scrollLeft += e.deltaY * 2;
            }
        }, { passive: false });

        // Drag souris → horizontal
        let isDown = false;
        let startX;
        let scrollLeft;

        gallery.addEventListener('mousedown', function (e) {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('mouseleave', function () {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mouseup', function () {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });

        // Touch mobile → swipe horizontal natif déjà géré par le navigateur
        // On empêche juste le scroll vertical quand on swipe horizontalement
        let touchStartX = 0;
        let touchStartY = 0;

        gallery.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        gallery.addEventListener('touchmove', function (e) {
            const dx = Math.abs(e.touches[0].clientX - touchStartX);
            const dy = Math.abs(e.touches[0].clientY - touchStartY);
            if (dx > dy) {
                e.stopPropagation(); // swipe horizontal → on laisse la galerie gérer
            }
        }, { passive: true });

    });
});
