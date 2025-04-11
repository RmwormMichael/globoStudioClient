// menuController.js
import { mostrarSales, mostrarNewSale, mostrarDashboard, mostrarUsers } from "./adminController.js";

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
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        burger.classList.remove("toggle");
      });
    });

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        burger.classList.remove("toggle");
      });
    });
  }

  // Código exclusivo para admin.html
  const isAdminPage = window.location.pathname.includes("admin.html");

  if (isAdminPage) {
    document.getElementById("b-sales")?.addEventListener("click", mostrarSales);
    document.getElementById("b-new-sale")?.addEventListener("click", mostrarNewSale);
    document.getElementById("b-dashboard")?.addEventListener("click", mostrarDashboard);
    document.getElementById("b-users")?.addEventListener("click", mostrarUsers);
  }
});
