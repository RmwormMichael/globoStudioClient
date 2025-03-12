let vista = null;

document.addEventListener("DOMContentLoaded", () => {
    vista = new Vista();
    mostrarUsers();
});


/*********************************** ADMIN *****************************/   

function mostrarSales() {
    vista.mostrarPlantilla("MySales", "mainAdmin")
}

function mostrarNewSale() {
    vista.mostrarPlantilla("newSale", "mainAdmin")
}

function mostrarDashboard() {
    vista.mostrarPlantilla("dashboard", "mainAdmin")
}

function mostrarPoints() {
    vista.mostrarPlantilla("points", "mainAdmin")
}

function mostrarUsers() {
    vista.mostrarPlantilla("users", "mainAdmin"); // Cambia la plantilla

    // Esperar a que la plantilla se cargue antes de obtener los usuarios
    setTimeout(() => {
        obtenerUsuarios(); // Llamamos a la función para cargar la tabla
    }, 100); // Pequeño delay para asegurar que la plantilla se renderice
}


/*******************************************Tabla usuarios */

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

// Agregar eventos a los botones de eliminar después de generar la tabla
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

async function guardarCambios(id) {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // Validación: asegúrate de que los campos no estén vacíos
    if (!nombre || !email) {
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

