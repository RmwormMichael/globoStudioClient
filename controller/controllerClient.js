



/* ****************************** pagina cliente ****************************/

// Obtener referencias a los elementos
const sidebar = document.getElementById("sidebar");
const profileButton = document.getElementById("profileButton"); // Asegúrate de que el botón existe

// Mostrar barra lateral
function mostrarSidebar() {
    sidebar.classList.add("active");
}

// Cerrar barra lateral
function cerrarSidebar() {
    sidebar.classList.remove("active");
}

// Cerrar la barra cuando se haga clic fuera de ella
document.addEventListener("click", function (event) {
    if (sidebar && profileButton && !sidebar.contains(event.target) && !profileButton.contains(event.target)) {
        cerrarSidebar();
    }
});


// Cerrar sesión
function cerrarSesion() {
    if (confirm("¿seguro que quieres cerrar sesion?")) {
        window.location.href="index.html"; // Regresa a la página anterior
    }
}

// Hacer accesible la función en el HTML
window.cerrarSesion = cerrarSesion;


/***************your profile¨**********************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM cargado correctamente");
});

function mostrarProfile() {
    let template = document.getElementById("yourProfileTemplate");
    let contenido = document.getElementById("contenidoTemptlate");

    if (template && contenido) {
        let clon = template.content.cloneNode(true);
        contenido.innerHTML = ""; // Limpiar contenido previo
        contenido.appendChild(clon);
    } else {
        console.error("Error: No se encontró el template o el contenedor.");
    }
}


/************************** Mis cotizaciones **********************************/
function mostrarCotizaciones() {
    let template = document.getElementById("cotizaciones");
    let contenido = document.getElementById("contenidoTemptlate"); // Asegúrate de que este ID existe en el HTML

    if (template && contenido) {
        let clon = template.content.cloneNode(true);
        contenido.innerHTML = ""; // Limpia el contenido anterior
        contenido.appendChild(clon);
    } else {
        console.error("Error: No se encontró el template o el contenedor.");
    }
}

/*****************************************Ajustes*********************************/
function mostrarSettings() {
    let template = document.getElementById("ajustes");
    let contenido = document.getElementById("contenidoTemptlate");

    if (template && contenido) {
        let clon = template.content.cloneNode(true);
        contenido.innerHTML = ""; // Limpia el contenido anterior
        contenido.appendChild(clon);
    } else {
        console.error("Error: No se encontró el template o el contenedor.");
    }
}
