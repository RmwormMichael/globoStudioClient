// controller/controllerClient.js
import ClientView from "../view/js/clientView.js";
import ClientModel from "../model/clientModel.js";

const view = new ClientView();
const model = new ClientModel();

window.onload = () => {
  mostrarProfile(); // Esta función se mantiene igual hasta que la reorganicemos
};

// Mostrar barra lateral
window.mostrarSidebar = () => {
  view.activarSidebar();
};

// Cerrar barra lateral
window.cerrarSidebar = () => {
  view.cerrarSidebar();
};

// Cierre automático si se hace clic fuera del sidebar
view.configurarCierreAutomatico(view.cerrarSidebar.bind(view));

// Cerrar sesión
window.cerrarSesion = () => {
  model.cerrarSesion();
};







// controllerClient.js
import { obtenerPerfilDesdeAPI, actualizarPerfilEnAPI } from "../model/clientModel.js";
import { renderizarPerfil, llenarModalCliente, cerrarModalCliente } from "../view/js/clientView.js";

export async function mostrarProfile() {
  let template = document.getElementById("yourProfileTemplate");
  let contenido = document.getElementById("contenidoTemptlate");

  if (template && contenido) {
    let clon = template.content.cloneNode(true);
    contenido.innerHTML = "";
    contenido.appendChild(clon);

    try {
      const usuario = await obtenerPerfilDesdeAPI();
      renderizarPerfil(usuario);
    } catch (error) {
      console.error("Error al obtener perfil:", error);
    }
  } else {
    console.error("Error: No se encontró el template o el contenedor.");
  }
}

export async function cargarDatosCliente() {
  try {
    const usuario = await obtenerPerfilDesdeAPI();
    llenarModalCliente(usuario);
  } catch (error) {
    console.error("Error al cargar datos del cliente:", error);
  }
}

export async function guardarCambiosCliente() {
  const id = document.getElementById("clienteSaveChangesBtn").getAttribute("data-id");
  const nombre = document.getElementById("clienteNombre").value;
  const email = document.getElementById("clienteEmail").value;

  if (!nombre || !email) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  try {
    await actualizarPerfilEnAPI(id, nombre, email);
    alert("Perfil actualizado exitosamente");
    cerrarModalCliente();

    const usuarioActualizado = await obtenerPerfilDesdeAPI();
    renderizarPerfil(usuarioActualizado);
  } catch (error) {
    console.error("Error al guardar cambios:", error);
    alert("Ocurrió un error al actualizar el perfil");
  }
}

// Agrega el evento al botón después de definir las funciones
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("clienteSaveChangesBtn")
    .addEventListener("click", guardarCambiosCliente);
});


window.mostrarProfile = mostrarProfile;
window.cargarDatosCliente = cargarDatosCliente;





/********************************** Ordenes Clliente**************/

/***************************************** MOSTRAR COTIZACIONES ***********************/
import { obtenerOrdenesCliente } from "../model/clientModel.js";
import { renderizarOrdenesCliente } from "../view/js/clientView.js";

export async function mostrarCotizaciones() {
  const container = document.getElementById("contenidoTemptlate");
  container.innerHTML = "";

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No hay token disponible.");
    alert("Error de autenticación. Debes iniciar sesión nuevamente.");
    return;
  }

  try {
    // Mostrar loader mientras se cargan los datos
    container.innerHTML = '<div class="text-center">Cargando tus órdenes...</div>';
    
    const orders = await obtenerOrdenesCliente(token);
    
    if (!orders || orders.length === 0) {
      container.innerHTML = `
        <div class="alert alert-info">
          No tienes órdenes registradas aún.
          <button class="btn btn-primary mt-2" onclick="mostrarNewSale()">
            Crear nueva orden
          </button>
        </div>
      `;
      return;
    }
    
    renderizarOrdenesCliente(orders, container);
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    container.innerHTML = `
      <div class="alert alert-danger">
        Error al cargar tus órdenes: ${error.message}
      </div>
    `;
  }
}

window.mostrarCotizaciones = mostrarCotizaciones;


/***************************************** EDITAR ORDEN EN CLIENTE ***********************/
import {
  obtenerOrdenPorId,
  actualizarOrdenCliente,
} from "../model/clientModel.js";
import {
  mostrarDatosOrdenEnModal,
  obtenerDatosFormularioEdicion,
  cerrarModalEdicion,
} from "../view/js/clientView.js";

let currentOrderIdClient = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-button-client")) {
    currentOrderIdClient = e.target.getAttribute("data-id");
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión nuevamente.");
      return;
    }

    try {
      const order = await obtenerOrdenPorId(currentOrderIdClient, token);
      mostrarDatosOrdenEnModal(order);
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      alert("No se pudo cargar la información de la orden.");
    }
  }
});

document
  .getElementById("saveChangesButtonClient")
  .addEventListener("click", async () => {
    if (!currentOrderIdClient) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión nuevamente.");
      return;
    }

    try {
      const orderActual = await obtenerOrdenPorId(currentOrderIdClient, token);
      const nuevosDatos = obtenerDatosFormularioEdicion();

      const updatedOrder = {
        ...nuevosDatos,
        id_client: orderActual.id_client,
        status: orderActual.status,
      };

      await actualizarOrdenCliente(currentOrderIdClient, updatedOrder, token);

      cerrarModalEdicion();
      alert("Orden actualizada con éxito.");
      mostrarCotizaciones();
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      alert("No se pudo actualizar la orden.");
    }
  });


/*********************************** CREAR NUEVA ORDEN CLIENTE ************************** */

import {
  crearOrdenCliente,
  obtenerIdUsuarioDesdeToken,
} from "../model/clientModel.js";
import {
  obtenerDatosNuevaOrden,
  limpiarFormularioNuevaOrden,
  mostrarNewSaleTemplate,
} from "../view/js/clientView.js";

export function mostrarNewSale() {
  const container = document.getElementById("contenidoTemptlate");
  container.innerHTML = "";

  const idUser = obtenerIdUsuarioDesdeToken();
  mostrarNewSaleTemplate(container, idUser);

  const submitButton = container.querySelector("#submitButton");

  if (submitButton) {
    submitButton.addEventListener("click", async () => {
      const nuevaOrden = obtenerDatosNuevaOrden(container, idUser);

      if (!nuevaOrden) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await crearOrdenCliente(nuevaOrden, token);

        alert("Orden creada con éxito.");
        limpiarFormularioNuevaOrden(container);
      } catch (error) {
        alert(`Error al crear la orden: ${error.message}`);
        console.error("Error al crear la orden:", error);
      }
    });
  } else {
    console.error("No se encontró el botón para enviar la orden.");
  }
}

window.mostrarNewSale = mostrarNewSale;

