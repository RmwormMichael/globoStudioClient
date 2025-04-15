export default class GalleryView {
    static mostrarCategoria(nombreTemplate) {
        const contenedor = document.getElementById('mainCategory');
        contenedor.innerHTML = '';
        const template = document.getElementById(nombreTemplate);
        if (template) {
            const clon = template.content.cloneNode(true);
            contenedor.appendChild(clon);
        }
    }
}
