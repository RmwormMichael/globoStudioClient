import newSaleView from "../view/js/newSaleView.js";
import Vista from "../view/js/vista.js";
let vista = null;

document.addEventListener("DOMContentLoaded", () => {
  vista = new Vista();

  const isAdmin = document.getElementById("mainAdmin");
  if (isAdmin) {
    mostrarSales();
    setupEventListeners();
  }
});


/*********************************** ADMIN *****************************/



export function mostrarUsers() {
  vista.mostrarPlantilla("users", "mainAdmin"); // Cambia la plantilla

  // Esperar a que la plantilla se cargue antes de obtener los usuarios
  setTimeout(() => {
    mostrarUsuarios(); // Llamamos a la función para cargar la tabla
  }, 100); // Pequeño delay para asegurar que la plantilla se renderice
}

// /controller/adminController.js
import userModel from "../model/userModel.js";
import userView from "../view/js/userView.js";

let listaUsuarios = [];

document.addEventListener("DOMContentLoaded", () => {
  const usersLink = document.querySelector("#usersLink");

  if (usersLink) {
    usersLink.addEventListener("click", () => {
      console.log("Cargando usuarios...");
      mostrarUsuarios();
    });
  }
});

export async function mostrarUsuarios() {
  try {
    const usuarios = await userModel.obtenerUsuarios();
    listaUsuarios = usuarios; // Guardamos la lista original

    userView.mostrarUsuarios(usuarios, {
      onEdit: (usuario) => {
        userView.llenarModal(usuario, guardarCambios);
      },
      onDelete: async (id) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
          await userModel.eliminarUsuario(id);
          mostrarUsuarios(); // Recargar la lista
        }
      }
    });

    // Configuramos el buscador con filtrado avanzado
    userView.configurarBuscador((texto) => {
      if (!texto) {
        userView.mostrarUsuarios(listaUsuarios, {
          onEdit: (usuario) => userView.llenarModal(usuario, guardarCambios),
          onDelete: async (id) => {
            if (confirm("¿Estás seguro de eliminar este usuario?")) {
              await userModel.eliminarUsuario(id);
              mostrarUsuarios();
            }
          }
        });
        return;
      }

      const filtrados = listaUsuarios.filter(u =>
        u.id_user.toString().includes(texto) || // Buscar por ID
        u.nombre.toLowerCase().includes(texto) || // Buscar por nombre
        (u.email && u.email.toLowerCase().includes(texto)) // Buscar por email
      );

      userView.mostrarUsuarios(filtrados, {
        onEdit: (usuario) => userView.llenarModal(usuario, guardarCambios),
        onDelete: async (id) => {
          if (confirm("¿Estás seguro de eliminar este usuario?")) {
            await userModel.eliminarUsuario(id);
            mostrarUsuarios();
          }
        }
      });
    });

  } catch (error) {
    console.error("Error al mostrar usuarios:", error);
    alert("Error al cargar los usuarios");
  }
}

async function guardarCambios(id) {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const rol = document.getElementById("rol").value;

  if (!nombre || !email || !rol) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  try {
    const response = await userModel.editarUsuario(id, { nombre, email, rol });

    if (response.ok) {
      alert("Usuario actualizado exitosamente");
      userView.cerrarModal();
      mostrarUsuarios(); // Recargar la lista
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Error al actualizar el usuario");
    }
  } catch (error) {
    console.error("Error al guardar cambios:", error);
    alert("Ocurrió un error al actualizar el usuario");
  }
}




/*********************************** NEW SALE  *****************************/

export function mostrarNewSale() {
  newSaleView.renderNewSaleForm();
}




// *********************************** MY SALES  ******************************************************************************

import orderModel from "../model/orderModel.js";
import orderView from "../view/js/orderView.js";

// Variables globales
let currentOrderId = null;
let currentUserId = null;
let allOrders = []; // Almacenar todas las órdenes
let allUsers = [];   // Almacenar todos los usuarios

export async function mostrarSales() {
  const container = document.getElementById("mainAdmin");
  if (!container) return;
  
  // Cargar el template
  const template = document.getElementById("mySalesTemplate");
  const clone = document.importNode(template.content, true);
  container.innerHTML = "";
  container.appendChild(clone);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estás autenticado. Inicia sesión.");
    window.location.href = "/client.html";
    return;
  }

  try {
    [allOrders, allUsers] = await Promise.all([
      orderModel.obtenerOrdenes(token),
      orderModel.obtenerUsuarios(token),
    ]);

    renderOrders(allOrders, allUsers, container);
    setupSearch(container);
    setupEventListeners();
  } catch (error) {
    console.error("Error al obtener las órdenes o los usuarios:", error);
    alert("Hubo un error al obtener los datos.");
  }
}

function renderOrders(orders, users, container) {
  const ordersContainer = container.querySelector(".usersContainer");
  // Limpiar solo las tarjetas, no todo el contenedor (para mantener el buscador)
  const cards = ordersContainer.querySelectorAll(".card");
  cards.forEach(card => card.remove());
  
  orders.forEach((order) => {
    const user = users.find((u) => u.id_user === order.id_user);
    orderView.crearCard(order, user, ordersContainer);
  });
}

function setupSearch(container) {
  const searchInput = container.querySelector("#searchInput");
  const searchButton = container.querySelector("#searchButton");
  
  const handleSearch = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
      renderOrders(allOrders, allUsers, container);
      return;
    }
    
    // Filtrar órdenes
    const filteredOrders = allOrders.filter(order => {
      // Buscar por ID de orden
      if (order.id_order.toString().includes(searchTerm)) {
        return true;
      }
      
      // Buscar por nombre de usuario
      const user = allUsers.find(u => u.id_user === order.id_user);
      if (user && user.nombre.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Buscar por descripción (opcional)
      if (order.description.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      return false;
    });
    
    renderOrders(filteredOrders, allUsers, container);
  };
  
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}


 // --------------------------------------    EDITAR ORDENES -------------------

function setupEventListeners() {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-button")) {
      currentOrderId = e.target.getAttribute("data-id");
      const token = localStorage.getItem("token");
      if (!token) return alert("Inicia sesión.");

      try {
        const order = await orderModel.obtenerOrdenPorId(currentOrderId, token);
        currentUserId = order.id_user;
        orderView.llenarFormularioEdicion(order);
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar la orden.");
      }
    }

    if (e.target.classList.contains("delete-button")) {
      const orderId = e.target.getAttribute("data-id");
      const token = localStorage.getItem("token");
      if (!token) return alert("Inicia sesión.");

      if (confirm("¿Estás seguro de que deseas eliminar esta orden?")) {
        try {
          await orderModel.eliminarOrden(orderId, token);
          e.target.closest(".card").remove();
          alert("Orden eliminada con éxito.");
        } catch (error) {
          console.error(error);
          alert("No se pudo eliminar la orden.");
        }
      }
    }
  });

  document.getElementById("saveChangesButton")?.addEventListener("click", async () => {
    if (!currentOrderId) return alert("No se encontró la orden.");

    const updatedOrder = {
      description: document.getElementById("editDescription").value.trim(),
      direction: document.getElementById("editDirection").value.trim(),
      date_order: document.getElementById("editDeliveryDate").value,
      status: document.getElementById("editStatus").value,
      id_user: currentUserId,
    };

    const token = localStorage.getItem("token");
    if (!token) return alert("Debes iniciar sesión nuevamente.");

    try {
      await orderModel.actualizarOrden(currentOrderId, updatedOrder, token);
      orderView.actualizarOrdenEnPantalla(currentOrderId, updatedOrder);
      bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
      alert("Orden actualizada con éxito.");
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la orden.");
    }
  });
}