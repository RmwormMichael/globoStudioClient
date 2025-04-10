let vista = null;

document.addEventListener("DOMContentLoaded", () => {
  vista = new Vista();
  mostrarArcos();
});

/* Galeria */

function mostrarArcos() {
  vista.mostrarPlantilla("arcos", "mainCategory");
}

function mostrarBouquets() {
  vista.mostrarPlantilla("bouquets", "mainCategory");
}

function mostrarDiseños() {
  vista.mostrarPlantilla("diseños", "mainCategory");
}
