import GalleryView from '../view/js/galleryView.js';

const navCategory = document.getElementById('navCategory');

export function initGallery() {
    navCategory.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-category]');
        if (!btn) return;
        const categoria = btn.getAttribute('data-category');
        GalleryView.mostrarCategoria(categoria);
    });

    // Mostrar 'arcos' por defecto al iniciar
    GalleryView.mostrarCategoria('arcos');
}

initGallery();
