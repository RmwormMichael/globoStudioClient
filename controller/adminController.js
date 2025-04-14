import newSaleView from "../view/js/newSaleView.js";
<<<<<<< HEAD
=======
import Vista from "../view/js/vista.js";
>>>>>>> 54f1cd0 (MVC todo el fronend)

let vista = null;

document.addEventListener("DOMContentLoaded", () => {
  vista = new Vista();

  const isAdmin = document.getElementById("mainAdmin");
  if (isAdmin) {
    mostrarSales();
  }
});


/*********************************** ADMIN *****************************/

export function mostrarDashboard() {
  vista.mostrarPlantilla("dashboard", "mainAdmin");
}

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

    userView.mostrarUsuarios(usuarios, {
      onEdit: (usuario) => {
        userView.llenarModal(usuario, guardarCambios);
      },
      onDelete: async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
          const response = await userModel.eliminarUsuario(id);
          if (response.ok) {
            alert("Usuario eliminado correctamente");
            mostrarUsuarios();
          } else {
            alert("Error al eliminar el usuario");
          }
        }
      },
    });

  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

async function guardarCambios(id) {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  if (!nombre || !email) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  try {
    const response = await userModel.editarUsuario(id, { nombre, email });

    if (response.ok) {
      alert("Usuario actualizado exitosamente");
      userView.cerrarModal();
      mostrarUsuarios();
    } else {
      alert("Error al actualizar el usuario");
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

export async function mostrarSales() {
  const container = document.getElementById("mainAdmin");
  if (!container) return; // No ejecutar si no estás en admin.html
  container.innerHTML = "";

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estás autenticado. Inicia sesión.");
    window.location.href = "/client.html";
    return;
  }

  try {
    const [orders, users] = await Promise.all([
      orderModel.obtenerOrdenes(token),
      orderModel.obtenerUsuarios(token),
    ]);

    orders.forEach((order) => {
      const user = users.find((u) => u.id_user === order.id_user);
      orderView.crearCard(order, user, container);
    });
  } catch (error) {
    console.error("Error al obtener las órdenes o los usuarios:", error);
    alert("Hubo un error al obtener los datos.");
  }
}

// Variables globales
let currentOrderId = null;
let currentUserId = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-button")) {
    currentOrderId = e.target.getAttribute("data-id");
    const token = localStorage.getItem("token");
    if (!token) return alert("Inicia sesión.");

    try {
      const order = await orderModel.obtenerOrdenPorId(currentOrderId, token);
      currentUserId = order.id_user;
      orderView.llenarFormularioEdicion(order);
      new bootstrap.Modal(document.getElementById("editModal")).show();
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
