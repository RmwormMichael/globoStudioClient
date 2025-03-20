/******************************** Menu hamburguesa inicio *****************/
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