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

burger.addEventListener("click", ()=>{
    nav.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
});

links.forEach(link=>{
    link.addEventListener("click",()=>{
        nav.classList.toggle("nav-open");
        burger.classList.toggle("toggle");
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

document.getElementById('loginBtn').addEventListener('click', function() {
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

document.getElementById('registerBtn').addEventListener('click', function() {
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
            window.location.href = "/admin.html";
        } else {
            window.location.href = "/admin.html";
        }
    } catch (error) {
        console.error("Error en la autenticación", error);
    }
});









/***********************************Fetch *******************************/

// Escuchar el clic del botón "Registrar"
document.getElementById('modalActionBtn').addEventListener('click', async function() {
    // Obtener los valores de los inputs
    const nombre = document.getElementById('inputName').value;
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('inputPassword').value;

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
            `;
            tableBody.appendChild(fila);
        });

        console.log("Usuarios cargados correctamente.");
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}







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




/*************************** */