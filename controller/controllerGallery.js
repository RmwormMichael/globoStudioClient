import GalleryView from '../view/js/galleryView.js';

<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
  vista = new Vista();
  mostrarArcos();
});
=======
const navCategory = document.getElementById('navCategory');
>>>>>>> 54f1cd0 (MVC todo el fronend)

export function initGallery() {
    navCategory.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-category]');
        if (!btn) return;
        const categoria = btn.getAttribute('data-category');
        GalleryView.mostrarCategoria(categoria);
    });

<<<<<<< HEAD
function mostrarArcos() {
  vista.mostrarPlantilla("arcos", "mainCategory");
}

function mostrarBouquets() {
  vista.mostrarPlantilla("bouquets", "mainCategory");
}

function mostrarDiseños() {
  vista.mostrarPlantilla("diseños", "mainCategory");
}
=======
    // Mostrar 'arcos' por defecto al iniciar
    GalleryView.mostrarCategoria('arcos');
}

initGallery();
>>>>>>> 54f1cd0 (MVC todo el fronend)
