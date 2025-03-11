let vista = null;

window.onload = () => {
    vista = new Vista();
    mostrarArcos();
    mostrarLogin();
};

/******************************** Menu inicio *****************/
const nav = document.querySelector('.navLinks');
const burger = document.querySelector('.burger');
const links = nav.querySelectorAll("a");
const buttons = nav.querySelectorAll("button"); // Seleccionamos los botones

burger.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
});

links.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
        burger.classList.toggle("toggle");
    });
});

// Cerrar el menú cuando se haga clic en los botones (Login, Register, etc.)
buttons.forEach(button => {
    button.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        burger.classList.remove("toggle");
    });
});

/* --------------------------------- Modal Login --------------------------------- */

const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const recipient = button.getAttribute('data-bs-whatever')
        // If necessary, you could initiate an Ajax request here
        // and then do the updating in a callback.

        // Update the modal's content.
        const modalTitle = exampleModal.querySelector('.modal-title')
        const modalBodyInput = exampleModal.querySelector('.modal-body input')

        modalTitle.textContent = `New message to ${recipient}`
        modalBodyInput.value = recipient
    })
}
/*************************** Template Login ********************/


// Escuchar el clic del botón "Iniciar sesión" para abrir el modal
document.getElementById('loginBtn').addEventListener('click', function () {
    // Cambiar título y contenido del formulario a login
    document.getElementById('modalTitle').textContent = 'Inicia sesión';
    document.getElementById('modalBody').innerHTML = `
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword">
            </div>
        </div>
    `;
    document.getElementById('modalActionBtn').textContent = 'Iniciar sesión';
});





// Escuchar el clic del botón "Registrarse" para abrir el modal
document.getElementById('registerBtn').addEventListener('click', function () {
    // Cambiar título y contenido del formulario a register
    document.getElementById('modalTitle').textContent = 'Crear cuenta';
    document.getElementById('modalBody').innerHTML = `
        <div class="mb-3">
            <label for="inputName" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="inputName" placeholder="Nombre Completo">
            </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="emailRegister" placeholder="name@example.com">
        </div>
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword">
            </div>
        </div>
    `;
    document.getElementById('modalActionBtn').textContent = 'Registrar';
});


function mostrarRecovery() {
    vista.mostrarPlantilla("recoveryTemp", "account")
}





/***********************************Fetch *******************************/


// Escuchar el clic del botón "Iniciar sesión" para iniciar sesión
document.getElementById("modalActionBtn").addEventListener("click", async () => {
    const email = document.getElementById("exampleFormControlInput1").value;
    const password = document.getElementById("inputPassword").value;

    try {
        const response = await fetch("http://localhost:4000/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        // Guardar token y usuario en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // Redirigir según el rol
        if (data.usuario.rol === "admin") {
            window.location.href = "/cliente.html";
        } else {
            window.location.href = "/admin.html";
        }
    } catch (error) {
        console.error("Error en la autenticación", error);
    }
});






// Escuchar el clic del botón "Registrar" para enviar la solicitud
document.getElementById('modalActionBtn').addEventListener('click', async function () {
    // Obtener los valores de los inputs
    const nombre = document.getElementById('inputName').value;
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('inputPassword').value;

    // Función para validar el correo electrónico
    const esCorreoValido = (correo) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(correo);
    };

    // Validación de campos
    if (!nombre || !email || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!esCorreoValido(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    // Crear el objeto con los datos del usuario
    const usuarioData = {
        nombre,
        email,
        password
    };

    try {
        // Enviar la solicitud al backend con fetch
        const response = await fetch("http://localhost:4000/api/usuarios/", {
            method: "POST",  // El método HTTP será POST
            headers: {
                "Content-Type": "application/json"  // Indicamos que estamos enviando JSON
            },
            body: JSON.stringify(usuarioData)  // Convertimos el objeto de datos a formato JSON
        });

        // Obtener la respuesta del servidor en formato JSON
        const data = await response.json();

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            alert(data.msg);  // Mostrar el mensaje de éxito
        } else {
            alert(data.msg);  // Mostrar el mensaje de error
        }
    } catch (error) {
        // Manejar cualquier error que ocurra
        console.error("Error al registrar el usuario:", error);
        alert("Hubo un problema con la solicitud.");
    }
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
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                        </svg>
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminiar Usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ¿Estás seguro de que deseas eliminar este usuario?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary btnEliminar">Eliminar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </td>
            `;
            tableBody.appendChild(fila);
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


// Cargar los usuarios cuando la página cargue
document.addEventListener('DOMContentLoaded', obtenerUsuarios);














/* CLIENT */

function mostrarProfile() {
    vista.mostrarPlantilla("profile", "contenidoTemptlate")
}

function mostrarSettings() {
    vista.mostrarPlantilla("settings", "contenidoTemptlate")
}

/* Galeria */

function mostrarArcos() {
    vista.mostrarPlantilla("arcos", "mainCategory")
}

function mostrarBouquets() {
    vista.mostrarPlantilla("bouquets", "mainCategory")
}

function mostrarDiseños() {
    vista.mostrarPlantilla("diseños", "mainCategory")
}




/********************************** boton subir ****************/


// Muestra el botón cuando el usuario hace scroll hacia abajo
window.onscroll = function () {
    var btn = document.getElementById("botonSubir");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Función para desplazarse hacia arriba al hacer clic
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}