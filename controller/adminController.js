let vista = null;


document.addEventListener("DOMContentLoaded", () => {
    vista = new Vista();
    mostrarSales();
});


/*********************************** ADMIN *****************************/   


function mostrarDashboard() {
    vista.mostrarPlantilla("dashboard", "mainAdmin")
}

function mostrarUsers() {
    vista.mostrarPlantilla("users", "mainAdmin"); // Cambia la plantilla

    // Esperar a que la plantilla se cargue antes de obtener los usuarios
    setTimeout(() => {
        obtenerUsuarios(); // Llamamos a la función para cargar la tabla
    }, 100); // Pequeño delay para asegurar que la plantilla se renderice
}



/*******************************************             USERS             ****************************************/


document.addEventListener("DOMContentLoaded", () => {
    const usersLink = document.querySelector("#usersLink"); // Asegúrate de que el botón/toggle tiene este ID

    if (usersLink) {
        usersLink.addEventListener("click", () => {
            console.log("Cargando usuarios...");
            obtenerUsuarios(); // Llamamos la función SOLO cuando se accede a la sección de Users
        });
    }
});

async function obtenerUsuarios() {
    try {
        const response = await fetch('http://localhost:4000/api/usuarios/usuarios'); // Verifica la ruta correcta
        const usuarios = await response.json();

        const tableBody = document.querySelector("#usuariosTable tbody");
        tableBody.innerHTML = ""; // Limpiar antes de agregar nuevos datos

        usuarios.forEach(usuario => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${usuario.id_user}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>
            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" 
                data-id="${usuario.id_user}" data-nombre="${usuario.nombre}" data-email="${usuario.email}">
                Editar
            </button>
        </td>
        <td>
            <button type="button" class="btn btn-outline-danger btnEliminar" data-id="${usuario.id_user}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                </svg>
            </button>
        </td>
    `;
    tableBody.appendChild(fila);
});




// ************Agregar eventos a los botones de eliminar después de generar la tabla  ***************************/

document.querySelectorAll(".btnEliminar").forEach(button => {
    button.addEventListener("click", function () {
        const userId = this.getAttribute("data-id");
        eliminarUsuario(userId);
    });
});


        // Configuramos el evento para cargar los datos del usuario al abrir el modal
        document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                const nombre = this.getAttribute('data-nombre');
                const email = this.getAttribute('data-email');

                // Llenamos los campos del modal con los datos del usuario
                document.getElementById('nombre').value = nombre;
                document.getElementById('email').value = email;

                // Agregamos un evento al botón "Guardar cambios"
                const saveButton = document.getElementById('saveChangesBtn');
                saveButton.onclick = () => guardarCambios(id);
            });
        });

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
}



//******************* Editar usuario *************************************/
async function guardarCambios(id) {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // Validación: asegúrate de que los campos no estén vacíos
    if (!nombre || !email) {0
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/usuarios/usuarios/${id}`, {
            method: 'PUT', // Usamos el método PUT para actualizar
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email
            })
        });

        if (response.ok) {
            alert('Usuario actualizado exitosamente');
            // Cierra el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModalCenter'));
            modal.hide();

            // Refresca la lista de usuarios
            obtenerUsuarios();
        } else {
            alert('Error al actualizar el usuario');
        }

    } catch (error) {
        console.error("Error al guardar cambios:", error);
        alert('Ocurrió un error al actualizar el usuario');
    }
}

async function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/usuarios/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert("Usuario eliminado correctamente");
            obtenerUsuarios(); // Refresca la tabla
        } else {
            alert("Error al eliminar el usuario");
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Hubo un problema al eliminar el usuario");
    }
}



/***********************************       NEW SALE      *****************************/



// Asegúrate de que la plantilla sea añadida al DOM antes de añadir el evento.
function mostrarNewSale() {
    const container = document.getElementById("mainAdmin");
    container.innerHTML = "";  // Elimina cualquier contenido previo

    const template = document.getElementById("newSale");
    if (template) {
        const clone = document.importNode(template.content, true);
        container.appendChild(clone); // Añadir la plantilla al contenedor

        // Cargar usuarios y añadirlos al select
        cargarUsuarios();

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



// Función para cargar los usuarios desde la API y llenar el select

async function cargarUsuarios() {
    try {
        const response = await fetch('http://localhost:4000/api/usuarios/usuarios');
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios.");
        }

        const usuarios = await response.json();  // Suponiendo que la respuesta es un array de usuarios

        const selectUser = document.getElementById("id_user");

        // Limpiar las opciones existentes (si las hay)
        selectUser.innerHTML = '';

        // Crear una opción por defecto
        const optionDefault = document.createElement("option");
        optionDefault.value = '';
        optionDefault.textContent = 'Selecciona un usuario';
        selectUser.appendChild(optionDefault);

        // Llenar el select con los usuarios
        usuarios.forEach(usuario => {
            const option = document.createElement("option");
            option.value = usuario.id_user;  // Suponiendo que los usuarios tienen un campo `id_user`
            option.textContent = usuario.nombre;  // O el campo que quieres mostrar (ej. nombre del usuario)
            selectUser.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        alert("No se pudieron cargar los usuarios.");
    }
}



// ***********************************              MY SALES                    ******************************************************************************


//********************************** card para mostrar las ordenes **************************** */
async function mostrarSales() {
    // Limpiar el contenedor donde se insertarán las tarjetas (ventas)
    const container = document.getElementById("mainAdmin");
    container.innerHTML = "";  // Elimina cualquier contenido previo

    // Obtener las órdenes y los usuarios
    try {
        const [ordersResponse, usersResponse] = await Promise.all([
            fetch('http://localhost:4000/api/orders/orders'),  // Obtener las órdenes
            fetch('http://localhost:4000/api/usuarios/usuarios')  // Obtener los usuarios
        ]);

        const orders = await ordersResponse.json();
        const users = await usersResponse.json();

        // Para cada orden, agregarla como tarjeta en el DOM
        orders.forEach(order => {
            // Buscar el usuario correspondiente por id_user
            const user = users.find(u => u.id_user === order.id_user);

            // Crear la tarjeta para cada orden
            crearCard(order, user, container);
        });
    } catch (error) {
        console.error("Error al obtener las órdenes o los usuarios:", error);
        alert("Hubo un error al obtener los datos.");
    }
}



function crearCard(order, user, container) {
    const template = document.getElementById("MySales");
    const clone = document.importNode(template.content, true);

    // Asignar datos a la tarjeta
    clone.querySelector(".cardTittle h5:nth-child(1)").textContent = `IdOrder: ${order.id_order}`;
    clone.querySelector(".cardTittle h5:nth-child(2)").textContent = user ? user.nombre : 'Usuario no encontrado';
    clone.querySelector(".cardDescription").textContent = order.description;

    // Convertir fechas a formato legible
    const creationDate = new Date(order.order_created_at);
    const formattedCreationDate = `${creationDate.getDate().toString().padStart(2, '0')}/${(creationDate.getMonth() + 1).toString().padStart(2, '0')}/${creationDate.getFullYear()} ${creationDate.getHours().toString().padStart(2, '0')}:${creationDate.getMinutes().toString().padStart(2, '0')}`;

    const deliveryDate = new Date(order.date_order);
    const formattedDeliveryDate = `${deliveryDate.getDate().toString().padStart(2, '0')}/${(deliveryDate.getMonth() + 1).toString().padStart(2, '0')}/${deliveryDate.getFullYear()} ${deliveryDate.getHours().toString().padStart(2, '0')}:${deliveryDate.getMinutes().toString().padStart(2, '0')}`;

    clone.querySelector(".list-group-item:nth-child(1)").textContent = `Dirección: ${order.direction}`;
    clone.querySelector(".list-group-item:nth-child(2)").textContent = `Día de creación: ${formattedCreationDate}`;
    clone.querySelector(".list-group-item:nth-child(3)").textContent = `Día de entrega: ${formattedDeliveryDate}`;
    clone.querySelector(".list-group-item:nth-child(4)").textContent = `Estado: ${order.status}`;

    // Asignar el ID de la orden en los botones
    const editButton = clone.querySelector(".edit-button");
    editButton.setAttribute("data-id", order.id_order);

    const deleteButton = clone.querySelector(".delete-button");
    deleteButton.setAttribute("data-id", order.id_order); // Asegurar que el botón de eliminar tiene el ID correcto

    // Agregar la tarjeta al contenedor
    container.appendChild(clone);
}




//********************* Abrir el modal para editar order ***************** */


let currentOrderId = null; // Variable global para almacenar el ID actual
let currentUserId = null; // Guardar el id del usuario


// Evento para abrir el modal al hacer clic en "Editar"
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-button')) {
        currentOrderId = e.target.getAttribute('data-id');
        if (!currentOrderId) {
            console.error("ID de orden no encontrado.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderId}`);
            if (!response.ok) throw new Error("Orden no encontrada");

            const order = await response.json();

            // Guardar el id del usuario
            currentUserId = order.id_user; 

            // Llenar los campos con los datos de la orden
            document.getElementById('editDescription').value = order.description || '';
            document.getElementById('editDirection').value = order.direction || '';

            // Convertir fecha al formato YYYY-MM-DDTHH:MM
            const orderDate = new Date(order.date_order);
            const formattedDate = orderDate.toISOString().slice(0, 16);
            document.getElementById('editDeliveryDate').value = formattedDate;

            // Establecer el estado actual en el select
            document.getElementById('editStatus').value = order.status || 'en_proceso';

            // Abrir el modal
            const modalElement = document.getElementById('editModal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } catch (error) {
            console.error("Error al obtener la orden:", error);
            alert("No se pudo cargar la información de la orden.");
        }
    }
});

/***************************************** BOTON GUARDAR CAMBIOS*********************** */
document.getElementById("saveChangesButton").addEventListener("click", async () => {
    if (!currentOrderId) {
        console.error("No se encontró el ID de la orden.");
        alert("Error: No se encontró la orden.");
        return;
    }

    // Capturar los datos editados del formulario
    const updatedOrder = {
        description: document.getElementById("editDescription").value.trim(),
        direction: document.getElementById("editDirection").value.trim(),
        date_order: document.getElementById("editDeliveryDate").value,
        status: document.getElementById("editStatus").value,
        id_user: currentUserId  // Asegurar que no se borre el usuario
    };

    try {
        const response = await fetch(`http://localhost:4000/api/orders/orders/${currentOrderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedOrder)
        });

        if (!response.ok) throw new Error("Error al actualizar la orden.");

        // Cerrar el modal después de actualizar
        const modalElement = document.getElementById("editModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Actualizar la interfaz sin recargar la página
        actualizarOrdenEnPantalla(currentOrderId, updatedOrder);
        
        alert("Orden actualizada con éxito.");
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        alert("No se pudo actualizar la orden.");
    }
});



/*************************************EDITAR ORDEN ***************************/
function actualizarOrdenEnPantalla(orderId, updatedOrder) {
    if (!orderId) {
        console.error("Error: orderId es undefined.");
        return;
    }

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const editButton = card.querySelector(".edit-button");
        if (editButton && editButton.getAttribute("data-id") === orderId) {
            console.log(`Actualizando tarjeta con ID: ${orderId}`);

            // Actualizar los datos en la tarjeta de la orden
            card.querySelector(".cardDescription").textContent = updatedOrder.description;
            card.querySelector("li:nth-child(1)").textContent = `Dirección: ${updatedOrder.direction}`;

            // Formatear fecha
            const deliveryDate = new Date(updatedOrder.date_order);
            const formattedDate = `${deliveryDate.getDate().toString().padStart(2, '0')}/${(deliveryDate.getMonth() + 1).toString().padStart(2, '0')}/${deliveryDate.getFullYear()} ${deliveryDate.getHours().toString().padStart(2, '0')}:${deliveryDate.getMinutes().toString().padStart(2, '0')}`;
            card.querySelector("li:nth-child(3)").textContent = `Día de entrega: ${formattedDate}`;

            // Actualizar el estado de la orden
            card.querySelector(".cardStatus").textContent = `Estado: ${updatedOrder.status === 'en_proceso' ? 'En proceso' : 'Entregado'}`;
        }
    });
}


/***********************************ELIMINAR ORDEN******************************** */
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-button")) {
        const orderId = e.target.getAttribute("data-id");

        console.log("ID de orden a eliminar:", orderId); // 🔥 Verifica que el ID es correcto

        if (!orderId || orderId === "ORDER_ID") {
            console.error("ID de orden no válido:", orderId);
            alert("Error: No se pudo obtener el ID de la orden.");
            return;
        }

        // Confirmación antes de eliminar
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta orden?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:4000/api/orders/orders/${orderId}`, { 
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Error al eliminar la orden.");

            // Eliminar la tarjeta del DOM
            e.target.closest(".card").remove();

            alert("Orden eliminada con éxito.");
        } catch (error) {
            console.error("Error al eliminar la orden:", error);
            alert("No se pudo eliminar la orden.");
        }
    }
});



