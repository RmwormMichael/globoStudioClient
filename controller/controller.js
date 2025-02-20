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
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="inputConfirmPassword" class="col-sm-2 col-form-label">Confirm Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputConfirmPassword">
            </div>
        </div>
    `;
    document.getElementById('modalActionBtn').textContent = 'Registrar';
});
function mostrarRecovery() {
    vista.mostrarPlantilla("recoveryTemp", "account")
}

// /*************************** Template Register ********************/
//  function mostrarRegister() {
//     const registerTemplate = document.getElementById('registerModal');
//     const registerContent = registerTemplate.content.cloneNode(true); 

//     const accountSection = document.getElementById('account');
//     accountSection.innerHTML = '';
//     accountSection.appendChild()
//  }


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