
/* --------------------------------- Modal Login --------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    const exampleModal = document.getElementById('exampleModal'); // Obtiene el modal por su ID

    // Verifica si el modal existe en el documento antes de ejecutar el código
    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => { 
            // Evento que se activa cuando se muestra el modal
            
            const button = event.relatedTarget; // Botón que activó la apertura del modal
            
            // Extrae la información del atributo 'data-bs-whatever' del botón
            const recipient = button.getAttribute('data-bs-whatever');

            // Aquí podrías hacer una petición AJAX si necesitas obtener datos dinámicamente
            
            // Actualiza el contenido del modal
            const modalTitle = exampleModal.querySelector('.modal-title'); // Encuentra el título del modal
            const modalBodyInput = exampleModal.querySelector('.modal-body input'); // Encuentra el campo de entrada dentro del modal
            
            if (modalTitle && modalBodyInput) { // Verifica que los elementos existen antes de usarlos
                modalTitle.textContent = `Nuevo mensaje para ${recipient}`; // Cambia el título con el dato extraído
                modalBodyInput.value = recipient; // Inserta el dato en el campo de entrada
            }
        });
    }

    /*************************** Modal Login ********************/

    // Escuchar el clic del botón "Iniciar sesión" para abrir el modal
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');
            const modalActionBtn = document.getElementById('modalActionBtn');

            if (modalTitle && modalBody && modalActionBtn) { // Verifica que los elementos existen
                modalTitle.textContent = 'Iniciar sesión';
                modalBody.innerHTML = `
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
                modalActionBtn.textContent = 'Iniciar sesión';
            } else {
                console.error("No se encontró el modal en el DOM.");
            }
        });
    }
});




// Escuchar el clic del botón "Registrarse" para abrir el modal


// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.getElementById('registerBtn');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function () {
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');
            const modalActionBtn = document.getElementById('modalActionBtn');

            // Verificar que los elementos existen antes de modificarlos
            if (modalTitle && modalBody && modalActionBtn) {
                modalTitle.textContent = 'Crear cuenta';
                modalBody.innerHTML = `
                    <div class="mb-3">
                        <label for="inputName" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="inputName" placeholder="Nombre Completo">
                    </div>
                    <div class="mb-3">
                        <label for="emailRegister" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="emailRegister" placeholder="name@example.com">
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword">
                        </div>
                    </div>
                `;
                modalActionBtn.textContent = 'Registrar';
            } else {
                console.error("No se encontró el modal en el DOM.");
            }
        });
    }
});




/*********************************** Fetch *******************************/


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
        if (data.usuario.rol == "admin") {
            console.log(data.usuario.rol);  
            window.location.href = "/admin.html";
        } else {
            console.log(data.usuario.rol);  
            window.location.href = "/client.html";
        }
    } catch (error) {
        console.error("Error en la autenticación", error);
    }
});





const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalActionBtn = document.getElementById('modalActionBtn');
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

    if (forgotPasswordLink) {
        // Cuando se hace clic en "Olvidaste tu contraseña"
        forgotPasswordLink.addEventListener('click', function() {
            // Cambiar el título y el contenido del cuerpo del modal
            modalTitle.textContent = 'Recuperar contraseña';
            modalBody.innerHTML = `
                <div class="mb-3">
                    <label for="resetEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="resetEmail" placeholder="name@example.com">
                </div>
            `;
            modalActionBtn.textContent = 'Recuperar contraseña';

            // Ocultar el enlace "Olvidaste tu contraseña"
            forgotPasswordLink.style.display = 'none';

            // Cambiar la acción del botón para enviar la solicitud de recuperación de contraseña
            modalActionBtn.onclick = async function() {
                const email = document.getElementById('resetEmail').value;
                try {
                    const response = await fetch("http://localhost:4000/api/usuarios/recuperar-password", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email })
                    });

                    const data = await response.json();
                    if (!response.ok) {
                        alert(data.message);
                        return;
                    }

                    alert("Te hemos enviado un correo con instrucciones para recuperar tu contraseña.");
                    $('#exampleModal').modal('hide'); // Cerrar el modal al enviar la solicitud
                } catch (error) {
                    console.error("Error al recuperar la contraseña", error);
                }
            };
        });
    }

    // Restaurar el contenido original del modal al cerrarlo
    const modalElement = document.getElementById('exampleModal');
    modalElement.addEventListener('hidden.bs.modal', function () {
        // Restaurar el título y el cuerpo original
        modalTitle.textContent = 'Inicia sesión';
        modalBody.innerHTML = `
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1"
                    placeholder="name@example.com">
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword">
                </div>
            </div>
        `;
        modalActionBtn.textContent = 'Iniciar sesión';
    
        // Mostrar nuevamente el enlace de "Olvidaste tu contraseña"
        forgotPasswordLink.style.display = 'inline-block';
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


function mostrarRecovery() {
    vista.mostrarPlantilla("recoveryTemp", "account")
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



