// menuController.js
import { mostrarSales, mostrarNewSale, mostrarUsers } from "./adminController.js";

// Menú hamburguesa común para todas las páginas
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navLinks");
  const burger = document.querySelector(".burger");

  if (nav && burger) {
    const links = nav.querySelectorAll("a");
    const buttons = nav.querySelectorAll("button");

    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      burger.classList.toggle("toggle");
    
      const overlay = document.querySelector(".overlay");
      if (overlay) {
        overlay.classList.toggle("active");
      }
    });
    

    const overlay = document.querySelector(".overlay");

    const cerrarMenu = () => {
      nav.classList.remove("nav-open");
      burger.classList.remove("toggle");
      overlay?.classList.remove("active");
    };
    
    links.forEach((link) => {
      link.addEventListener("click", cerrarMenu);
    });
    
    buttons.forEach((button) => {
      button.addEventListener("click", cerrarMenu);
    });
    
    overlay?.addEventListener("click", cerrarMenu);
    
  }

  // Código exclusivo para admin.html
  const isAdminPage = window.location.pathname.includes("admin.html");

  if (isAdminPage) {
    document.getElementById("b-sales")?.addEventListener("click", mostrarSales);
    document.getElementById("b-new-sale")?.addEventListener("click", mostrarNewSale);
    document.getElementById("b-users")?.addEventListener("click", mostrarUsers);
  }
});
