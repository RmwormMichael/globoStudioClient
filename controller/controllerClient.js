window.onload = () => {
    mostrarNewSale();
}
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

/***************your New sale **********************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM cargado correctamente");
});

function mostrarNewSale() {
    let template = document.getElementById("newSaleClient");
    let contenido = document.getElementById("contenidoTemptlate");

    if (template && contenido) {
        let clon = template.content.cloneNode(true);
        contenido.innerHTML = ""; // Limpiar contenido previo
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






/********************************** Ordenes Clliente**************/


/***************************************** MOSTRAR COTIZACIONES ***********************/
async function mostrarCotizaciones() {
    const container = document.getElementById("contenidoTemptlate");
    container.innerHTML = "";

    // 🔥 Obtener el token almacenado
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No hay token disponible.");
        alert("Error de autenticación. Debes iniciar sesión nuevamente.");
        return;
    }

    try {
        const ordersResponse = await fetch('http://localhost:4000/api/orders/orders/', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,  // 🔥 Agregar token en la solicitud
                "Content-Type": "application/json"
            }
        });

        if (!ordersResponse.ok) {
            const errorData = await ordersResponse.json();
            throw new Error(errorData.msg || "Error al obtener las órdenes");
        }

        const orders = await ordersResponse.json();

        if (!Array.isArray(orders)) {
            console.error("La respuesta no es un array:", orders);
            alert("No hay cotizaciones disponibles.");
            return;
        }

        orders.forEach(order => {
            crearCardCliente(order, container);
        });

    } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
        alert("Hubo un error al obtener los datos.");
    }
}

/***************************************** CREAR CARD CLIENTE ***********************/
function crearCardCliente(order, container) {
    const template = document.getElementById("CotizacionesTemplate");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".cardDescription").textContent = order.description;

    const creationDate = new Date(order.order_created_at);
    clone.querySelector(".creation-date").textContent = `Creación: ${creationDate.toLocaleString()}`;

    const deliveryDate = new Date(order.date_order);
    clone.querySelector(".delivery-date").textContent = `Entrega: ${deliveryDate.toLocaleString()}`;

    clone.querySelector(".direction").textContent = `Dirección: ${order.direction}`;
    clone.querySelector(".cardStatus").textContent = `Estado: ${order.status}`;

    // Botones con ID único
    clone.querySelector(".edit-button-client").setAttribute("data-id", order.id_order);

    container.appendChild(clone);
}

/***************************************** EDITAR ORDEN EN CLIENTE ***********************/
let currentOrderIdClient = null;

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-button-client')) {
        currentOrderIdClient = e.target.getAttribute('data-id');

        // 🔥 Obtener el token almacenado
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No hay token disponible.");
            alert("Error de autenticación. Debes iniciar sesión nuevamente.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderIdClient}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,  // 🔥 Agregar token aquí
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Orden no encontrada");

            const order = await response.json();

            document.getElementById('editDescriptionClient').value = order.description || '';
            document.getElementById('editDirectionClient').value = order.direction || '';
            document.getElementById('editDeliveryDateClient').value = new Date(order.date_order).toISOString().slice(0, 16);

            const modal = new bootstrap.Modal(document.getElementById('editModalClient'));
            modal.show();
        } catch (error) {
            console.error("Error al obtener la orden:", error);
            alert("No se pudo cargar la información de la orden.");
        }
    }
});

/***************************************** GUARDAR CAMBIOS EN ORDEN CLIENTE ***********************/
document.getElementById("saveChangesButtonClient").addEventListener("click", async () => {
    if (!currentOrderIdClient) return;

    // 🔥 Obtener el token almacenado
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No hay token disponible.");
        alert("Error de autenticación. Debes iniciar sesión nuevamente.");
        return;
    }

    try {
        // Obtener la orden actual antes de enviarla para no perder `id_client`
        const response = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderIdClient}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,  // 🔥 Token para obtener la orden actual
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Orden no encontrada");

        const existingOrder = await response.json();

        const updatedOrder = {
            description: document.getElementById("editDescriptionClient").value.trim(),
            direction: document.getElementById("editDirectionClient").value.trim(),
            date_order: document.getElementById("editDeliveryDateClient").value,
            id_client: existingOrder.id_client,  // 🔹 Mantener el ID del cliente
            status: existingOrder.status         // 🔹 Mantener el estado
        };

        // Enviar la orden actualizada
        const updateResponse = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderIdClient}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,  // 🔥 Token en la actualización
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedOrder)
        });

        if (!updateResponse.ok) throw new Error("Error al actualizar la orden.");

        bootstrap.Modal.getInstance(document.getElementById("editModalClient")).hide();
        alert("Orden actualizada con éxito.");
        mostrarCotizaciones();
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        alert("No se pudo actualizar la orden.");
    }
});




/*********************************** New Sale Client ************************** */
// Asegúrate de que la plantilla sea añadida al DOM antes de añadir el evento.
// Este es el código que ya tienes
function mostrarNewSale() {
    const container = document.getElementById("contenidoTemptlate");
    container.innerHTML = "";  // Limpiar el contenido previo

    const template = document.getElementById("newSaleCliente");
    if (template) {
        const clone = document.importNode(template.content, true);
        container.appendChild(clone);  // Añadir la plantilla al contenedor

        // Asignar automáticamente el ID del usuario logueado desde el token
        const idUser = obtenerIdUsuarioDesdeToken();
        console.log("ID del usuario logueado:", idUser);

        const idUserInput = container.querySelector("#id_user");
        if (idUserInput) {
            idUserInput.value = idUser;  // Asignar el ID al input oculto
        }

        // Agregar evento al botón (no al formulario)
        const submitButton = container.querySelector("#submitButton");

        if (submitButton) {
            submitButton.addEventListener("click", async () => {
                console.log("Botón clickeado");  // Verificación rápida

                // Obtener valores del formulario
                const dateOrder = container.querySelector("#date_order").value;
                const direction = container.querySelector("#direction").value;
                const description = container.querySelector("#description").value;

                if (!dateOrder || !direction || !description) {
                    alert("Por favor, completa todos los campos.");
                    return;
                }

                // Crear objeto de la orden
                const nuevaOrden = {
                    id_user: idUser,
                    date_order: dateOrder,
                    direction: direction,
                    description: description
                };

                console.log("Orden a enviar:", nuevaOrden);  // Verificar datos antes de enviar

                try {
                    const token = localStorage.getItem("token");  // Obtener el token

                    const response = await fetch("http://localhost:4000/api/orders/orders/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(nuevaOrden)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Orden creada con éxito.");
                        // Limpiar campos después de crear la orden
                        container.querySelector("#date_order").value = "";
                        container.querySelector("#direction").value = "";
                        container.querySelector("#description").value = "";
                    } else {
                        alert(`Error: ${data.message}`);
                    }
                } catch (error) {
                    console.error("Error al crear la orden:", error);
                    alert("Error al crear la orden.");
                }
            });
        } else {
            console.error("No se encontró el botón para enviar la orden.");
        }
    }
}

function obtenerIdUsuarioDesdeToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return null;

    const payload = JSON.parse(atob(tokenParts[1]));  // Decodifica el payload
    return payload.id;  // Retorna el ID del usuario
}

