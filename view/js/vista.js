class Vista {
    constructor() {}
    mostrarPlantilla(temp, destino){
        //LIMPIA CONTENIDO
        let dest = document.getElementById(destino);
        dest.innerHTML = "";
        let template = document.getElementById(temp);
        if (template) {
            //si la plantilla existe...
            let clon = template.content.cloneNode(true);
            dest.appendChild(clon); //inserta
        }
    }
}


