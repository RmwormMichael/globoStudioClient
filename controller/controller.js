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


/* --------------------------------- Scroll --------------------------------- */

const mainHead = document.querySelector('.mainHead');

// Mantiene la posición de scroll anterior
let lastScrollTop = 0;

// Función para verificar la dirección del scroll
function handleScroll() {
    // Obtiene la posición de scroll actual
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Compara la posición actual con la anterior
    if (currentScrollTop > lastScrollTop) {
        // Scroll hacia abajo - ocultar
        mainHead.classList.add('hidden');
    } else {
        // Scroll hacia arriba - mostrar
        mainHead.classList.remove('hidden');
    }

    // Actualiza la posición de scroll anterior
    lastScrollTop = currentScrollTop;
}

// Función para limitar la frecuencia de ejecución de una función
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Crea una versión optimizada de la función de scroll usando throttle
const handleScrollThrottled = throttle(handleScroll, 500);

// Escuchar el evento de scroll
window.addEventListener('scroll', handleScrollThrottled);

// Agregar la clase 'fixedMenu' al elemento 'mainHead'
mainHead.classList.add('fixedMenu');


/* --------------------------------- Modal Login --------------------------------- */

const login = document.querySelector('.login');
const loginModal = document.getElementById('loginModal');

// Función para cerrar el modal
function closeModal() {
    if (login.classList.contains('loginToggle')) {
        // Agrega la clase de animación de salida
        login.classList.add('logout');

        // Espera el tiempo de duración de la animación para eliminar la clase y ocultar el modal
        login.addEventListener('transitionend', () => {
            login.classList.remove('loginToggle', 'logout');
            login.style.display = 'none'; // Oculta el modal
        }, { once: true });
    }
}

// Evento para abrir y cerrar el modal al hacer clic en el modal
loginModal.addEventListener('click', () => {
    if (login.classList.contains('loginToggle')) {
        closeModal();
    } else {
        login.style.display = 'flex'; // Muestra el modal
        login.classList.add('loginToggle');
    }
});

/*************************** Template Login ********************/

function mostrarLogin() {
    // Obtener el template y clonar su contenido
    const loginTemplate = document.getElementById("loginTemp");
    const loginContent = loginTemplate.content.cloneNode(true);

    // Limpiar el contenedor del modal y agregar el contenido del login
    const accountSection = document.getElementById("account");
    accountSection.innerHTML = '';  // Limpiar cualquier contenido anterior
    accountSection.appendChild(loginContent); // Añadir el contenido del template
}

function mostrarRecovery() {
    vista.mostrarPlantilla("recoveryTemp", "account")
}


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