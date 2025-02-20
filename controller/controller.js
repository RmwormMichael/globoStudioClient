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
        const response = await fetch("http://localhost:4000/api/usuarios/usuarios", {
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
    vista.mostrarPlantilla("users", "mainAdmin")
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

/* Fotos de inicio */ 

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const cajas = document.querySelector('.cajas1');
const images = document.querySelectorAll('.imgDragon');
const totalImages = images.length;
let currentIndex = 0;

const containerWidth = document.querySelector('.carruselContainer').offsetWidth;
const imageWidth = containerWidth - 20; // Ajusta el tamaño de la imagen a 450px menos el margen (10px a cada lado)

function moveTo(index) {
    if (index < 0) index = totalImages - 1;
    if (index >= totalImages) index = 0;

    cajas.style.transform = `translateX(-${index * imageWidth}px)`;
    currentIndex = index;
}

// Mover con flechas
leftArrow.addEventListener('click', () => moveTo(currentIndex - 1));
rightArrow.addEventListener('click', () => moveTo(currentIndex + 1));

// Mover con gestos táctiles (para móviles)
let touchStartX = 0;
let touchEndX = 0;

cajas.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

cajas.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX > touchEndX) {
        moveTo(currentIndex + 1); // swipe left (next)
    } else if (touchStartX < touchEndX) {
        moveTo(currentIndex - 1); // swipe right (prev)
    }
});

/*************************** */