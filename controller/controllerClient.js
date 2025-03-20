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


async function mostrarCotizaciones() {
    const container = document.getElementById("contenidoTemptlate");
    container.innerHTML = "";

    try {
        const ordersResponse = await fetch('http://localhost:4000/api/orders/orders');
        const orders = await ordersResponse.json();

        orders.forEach(order => {
            crearCardCliente(order, container);
        });
    } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
        alert("Hubo un error al obtener los datos.");
    }
}

function crearCardCliente(order, container) {
    const template = document.getElementById("CotizacionesTemplate");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".cardDescription").textContent = order.description;

    const creationDate = new Date(order.order_created_at);
    clone.querySelector(".creation-date").textContent = `Creación: ${creationDate.toLocaleString()}`;

    const deliveryDate = new Date(order.date_order);
    clone.querySelector(".delivery-date").textContent = `Entrega: ${deliveryDate.toLocaleString()}`;

    clone.querySelector(".direction").textContent = `Dirección: ${order.direction}`;
    clone.querySelector(".cardStatus").textContent = `Estado: ${order.status === 'en_proceso' ? 'En proceso' : 'Entregado'}`;

    // Botones con ID único
    clone.querySelector(".edit-button-client").setAttribute("data-id", order.id_order);


    container.appendChild(clone);
}

// *********** Editar Orden en Cliente *************
let currentOrderIdClient = null;

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-button-client')) {
        currentOrderIdClient = e.target.getAttribute('data-id');

        try {
            const response = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderIdClient}`);
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

// ********** Guardar Cambios en Orden Cliente ************
document.getElementById("saveChangesButtonClient").addEventListener("click", async () => {
    if (!currentOrderIdClient) return;

    try {
        // Obtener la orden actual antes de enviarla para no perder `id_client`
        const response = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderIdClient}`);
        if (!response.ok) throw new Error("Orden no encontrada");

        const existingOrder = await response.json(); // La orden actual con todos sus datos

        const updatedOrder = {
            description: document.getElementById("editDescriptionClient").value.trim(),
            direction: document.getElementById("editDirectionClient").value.trim(),
            date_order: document.getElementById("editDeliveryDateClient").value,
            id_client: existingOrder.id_client, // 🔹 Mantener el ID del cliente
            status: existingOrder.status // 🔹 También asegurarnos de no cambiar el estado
        };

        // Enviar la orden actualizada
        const updateResponse = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderIdClient}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
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
function mostrarNewSale() {
    const container = document.getElementById("contenidoTemptlate");
    container.innerHTML = "";  // Elimina cualquier contenido previo

    const template = document.getElementById("newSaleCliente");
    if (template) {
        const clone = document.importNode(template.content, true);
        container.appendChild(clone); // Añadir la plantilla al contenedor

        // Aquí asignamos automáticamente el ID del usuario logueado
        const idUser = obtenerIdUsuarioLogueado();  // Función que debes implementar para obtener el ID del cliente
        document.getElementById("id_user").value = idUser;

        // Ahora el botón existe, podemos añadir el eventListener
        const submitButton = document.getElementById("submitButton");
        if (submitButton) {
            submitButton.addEventListener("click", async (event) => {
                event.preventDefault();

                const id_user = document.getElementById("id_user").value;
                const date_order = document.getElementById("date_order").value;
                const direction = document.getElementById("direction").value;
                const description = document.getElementById("description").value;

                if (parseInt(id_user) < 1) {
                    alert("El ID de usuario debe ser un número positivo.");
                    return;
                }

                const status = "en_proceso";

                const orderData = {
                    id_user,
                    status,
                    date_order,
                    direction,
                    description
                };

                try {
                    const response = await fetch('http://localhost:4000/api/orders/orders/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderData),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        alert('¡Pedido creado correctamente!');
                        document.getElementById("orderForm").reset();
                    } else {
                        alert('Error al crear el pedido: ' + result.msg);
                    }
                } catch (error) {
                    console.error("Error al enviar el formulario:", error);
                    alert("Hubo un error al enviar los datos. Intenta nuevamente.");
                }
            });
        }
    }
}

// Función para obtener el ID del usuario logueado (esto depende de cómo lo manejes en tu sistema)
function obtenerIdUsuarioLogueado() {
    // Esto debe obtener el ID del usuario que está logueado, por ejemplo:
    // 1. Si está en el localStorage
    // 2. Si está en un token JWT
    // 3. Si está en una cookie
    // Para este ejemplo, asumimos que lo tienes guardado en el localStorage:
    const user = JSON.parse(localStorage.getItem("usuario_logueado"));
    return user ? user.id : null; // Asegúrate de que devuelvas el id correcto
}
