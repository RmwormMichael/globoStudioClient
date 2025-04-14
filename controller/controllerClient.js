<<<<<<< HEAD
window.onload = () => {
  mostrarProfile();
};
/* ****************************** pagina cliente ****************************/
=======
// controller/controllerClient.js
import ClientView from "../view/js/clientView.js";
import ClientModel from "../model/clientModel.js";
>>>>>>> 54f1cd0 (MVC todo el fronend)

const view = new ClientView();
const model = new ClientModel();

window.onload = () => {
  mostrarProfile(); // Esta función se mantiene igual hasta que la reorganicemos
};

// Mostrar barra lateral
<<<<<<< HEAD
function mostrarSidebar() {
  sidebar.classList.add("active");
}

// Cerrar barra lateral
function cerrarSidebar() {
  sidebar.classList.remove("active");
}

// Cerrar la barra cuando se haga clic fuera de ella
document.addEventListener("click", function (event) {
  if (
    sidebar &&
    profileButton &&
    !sidebar.contains(event.target) &&
    !profileButton.contains(event.target)
  ) {
    cerrarSidebar();
  }
});

// Cerrar sesión
function cerrarSesion() {
  if (confirm("¿seguro que quieres cerrar sesion?")) {
    window.location.href = "index.html"; // Regresa a la página anterior
=======
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
>>>>>>> 54f1cd0 (MVC todo el fronend)
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

<<<<<<< HEAD
/***************   Your Profile¨**********************************************************************/
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM cargado correctamente");
});

function mostrarProfile() {
  let template = document.getElementById("yourProfileTemplate");
  let contenido = document.getElementById("contenidoTemptlate");

  if (template && contenido) {
    let clon = template.content.cloneNode(true);
    contenido.innerHTML = ""; // Limpiar contenido previo
    contenido.appendChild(clon);

    // Llama a la función para obtener el perfil del usuario
    obtenerPerfil();
  } else {
    console.error("Error: No se encontró el template o el contenedor.");
  }
}

async function obtenerPerfil() {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage

  if (!token) {
    console.error("No hay token disponible");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/usuarios/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el perfil");
    }

    const usuario = await response.json();

    // Insertar datos en el DOM
    document.getElementById(
      "profileWelcome"
    ).textContent = `Profile: ${usuario.nombre}`;
    document.getElementById("profileEmail").textContent = usuario.email;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
  }
}

async function cargarDatosCliente() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No hay token disponible");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/usuarios/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el perfil");
    }

    const usuario = await response.json();

    // Llenar los campos del modal del cliente
    document.getElementById("clienteNombre").value = usuario.nombre;
    document.getElementById("clienteEmail").value = usuario.email;

    // Guardar el ID temporalmente como atributo del botón
    const saveButton = document.getElementById("clienteSaveChangesBtn");
    saveButton.setAttribute("data-id", usuario.id); // Almacena el ID del cliente
  } catch (error) {
    console.error("Error al obtener perfil:", error);
  }
}

async function guardarCambiosCliente() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No hay token disponible");
    return;
  }

  const id = document
    .getElementById("clienteSaveChangesBtn")
    .getAttribute("data-id");
  const nombre = document.getElementById("clienteNombre").value;
  const email = document.getElementById("clienteEmail").value;

  // Validación: asegúrate de que los campos no estén vacíos
  if (!nombre || !email) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/usuarios/usuarios/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
        }),
      }
    );

    if (response.ok) {
      alert("Perfil actualizado exitosamente");

      // Cerrar el modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("clienteModal")
      );
      modal.hide();

      // Recargar los datos del perfil
      obtenerPerfil();
    } else {
      alert("Error al actualizar el perfil");
    }
  } catch (error) {
    console.error("Error al guardar cambios:", error);
    alert("Ocurrió un error al actualizar el perfil");
  }
}

// Agregar el evento al botón después de definir las funciones
document
  .getElementById("clienteSaveChangesBtn")
  .addEventListener("click", guardarCambiosCliente);
=======
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




>>>>>>> 54f1cd0 (MVC todo el fronend)

/********************************** Ordenes Clliente**************/

/***************************************** MOSTRAR COTIZACIONES ***********************/
<<<<<<< HEAD
async function mostrarCotizaciones() {
  const container = document.getElementById("contenidoTemptlate");
  container.innerHTML = "";

  // 🔥 Obtener el token almacenado
  const token = localStorage.getItem("token");

=======
import { obtenerOrdenesCliente } from "../model/clientModel.js";
import { renderizarOrdenesCliente } from "../view/js/clientView.js";

export async function mostrarCotizaciones() {
  const container = document.getElementById("contenidoTemptlate");
  container.innerHTML = "";

  const token = localStorage.getItem("token");
>>>>>>> 54f1cd0 (MVC todo el fronend)
  if (!token) {
    console.error("No hay token disponible.");
    alert("Error de autenticación. Debes iniciar sesión nuevamente.");
    return;
  }

  try {
<<<<<<< HEAD
    const ordersResponse = await fetch(
      "http://localhost:4000/api/orders/orders/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 Agregar token en la solicitud
          "Content-Type": "application/json",
        },
      }
    );

    if (!ordersResponse.ok) {
      const errorData = await ordersResponse.json();
      throw new Error(errorData.msg || "Error al obtener las órdenes");
    }

    const orders = await ordersResponse.json();

=======
    const orders = await obtenerOrdenesCliente(token);
>>>>>>> 54f1cd0 (MVC todo el fronend)
    if (!Array.isArray(orders)) {
      console.error("La respuesta no es un array:", orders);
      alert("No hay cotizaciones disponibles.");
      return;
    }
<<<<<<< HEAD

    orders.forEach((order) => {
      crearCardCliente(order, container);
    });
=======
    renderizarOrdenesCliente(orders, container);
>>>>>>> 54f1cd0 (MVC todo el fronend)
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    alert("Hubo un error al obtener los datos.");
  }
}

<<<<<<< HEAD
/***************************************** CREAR CARD CLIENTE ***********************/
function crearCardCliente(order, container) {
  const template = document.getElementById("CotizacionesTemplate");
  const clone = document.importNode(template.content, true);

  clone.querySelector(".cardDescription").textContent = order.description;

  const creationDate = new Date(order.order_created_at);
  clone.querySelector(
    ".creation-date"
  ).textContent = `Creación: ${creationDate.toLocaleString()}`;

  const deliveryDate = new Date(order.date_order);
  clone.querySelector(
    ".delivery-date"
  ).textContent = `Entrega: ${deliveryDate.toLocaleString()}`;

  clone.querySelector(
    ".direction"
  ).textContent = `Dirección: ${order.direction}`;
  clone.querySelector(".cardStatus").textContent = `Estado: ${order.status}`;

  // Botones con ID único
  clone
    .querySelector(".edit-button-client")
    .setAttribute("data-id", order.id_order);

  container.appendChild(clone);
}
=======
window.mostrarCotizaciones = mostrarCotizaciones;

>>>>>>> 54f1cd0 (MVC todo el fronend)

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
<<<<<<< HEAD

    // 🔥 Obtener el token almacenado
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No hay token disponible.");
      alert("Error de autenticación. Debes iniciar sesión nuevamente.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/orders/orders/${currentOrderIdClient}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 Agregar token aquí
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Orden no encontrada");

      const order = await response.json();

      document.getElementById("editDescriptionClient").value =
        order.description || "";
      document.getElementById("editDirectionClient").value =
        order.direction || "";
      document.getElementById("editDeliveryDateClient").value = new Date(
        order.date_order
      )
        .toISOString()
        .slice(0, 16);

      const modal = new bootstrap.Modal(
        document.getElementById("editModalClient")
      );
      modal.show();
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      alert("No se pudo cargar la información de la orden.");
    }
  }
});

/***************************************** GUARDAR CAMBIOS EN ORDEN CLIENTE ***********************/
document
  .getElementById("saveChangesButtonClient")
  .addEventListener("click", async () => {
    if (!currentOrderIdClient) return;

    // 🔥 Obtener el token almacenado
=======
>>>>>>> 54f1cd0 (MVC todo el fronend)
    const token = localStorage.getItem("token");
    if (!token) {
<<<<<<< HEAD
      console.error("No hay token disponible.");
      alert("Error de autenticación. Debes iniciar sesión nuevamente.");
=======
      alert("Debes iniciar sesión nuevamente.");
>>>>>>> 54f1cd0 (MVC todo el fronend)
      return;
    }

    try {
<<<<<<< HEAD
      // Obtener la orden actual antes de enviarla para no perder `id_client`
      const response = await fetch(
        `http://localhost:4000/api/orders/orders/${currentOrderIdClient}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 Token para obtener la orden actual
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Orden no encontrada");

      const existingOrder = await response.json();

      const updatedOrder = {
        description: document
          .getElementById("editDescriptionClient")
          .value.trim(),
        direction: document.getElementById("editDirectionClient").value.trim(),
        date_order: document.getElementById("editDeliveryDateClient").value,
        id_client: existingOrder.id_client, // 🔹 Mantener el ID del cliente
        status: existingOrder.status, // 🔹 Mantener el estado
      };

      // Enviar la orden actualizada
      const updateResponse = await fetch(
        `http://localhost:4000/api/orders/orders/${currentOrderIdClient}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 Token en la actualización
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        }
      );

      if (!updateResponse.ok) throw new Error("Error al actualizar la orden.");

      bootstrap.Modal.getInstance(
        document.getElementById("editModalClient")
      ).hide();
      alert("Orden actualizada con éxito.");
      mostrarCotizaciones();
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      alert("No se pudo actualizar la orden.");
    }
  });

/*********************************** CREAR NUEVA ORDEN CLIENTE ************************** */

// Asegúrate de que la plantilla sea añadida al DOM antes de añadir el evento.
// Este es el código que ya tienes
function mostrarNewSale() {
  const container = document.getElementById("contenidoTemptlate");
  container.innerHTML = ""; // Limpiar el contenido previo

  const template = document.getElementById("newSaleCliente");
  if (template) {
    const clone = document.importNode(template.content, true);
    container.appendChild(clone); // Añadir la plantilla al contenedor

    // Asignar automáticamente el ID del usuario logueado desde el token
    const idUser = obtenerIdUsuarioDesdeToken();
    console.log("ID del usuario logueado:", idUser);

    const idUserInput = container.querySelector("#id_user");
    if (idUserInput) {
      idUserInput.value = idUser; // Asignar el ID al input oculto
    }

    // Agregar evento al botón
    const submitButton = container.querySelector("#submitButton");

    if (submitButton) {
      submitButton.addEventListener("click", async () => {
        console.log("Botón clickeado");

        // Obtener valores del formulario
        const dateOrder = container.querySelector("#date_order").value;
        const direction = container.querySelector("#direction").value;
        const description = container.querySelector("#description").value;

        if (!dateOrder || !direction || !description) {
          alert("Por favor, completa todos los campos.");
          return;
        }

        // Crear objeto de la orden
        const nuevaOrden = {
          id_user: idUser,
          date_order: dateOrder, // Ahora incluye fecha y hora
          direction: direction,
          description: description,
        };

        console.log("Orden a enviar:", nuevaOrden);

        try {
          const token = localStorage.getItem("token");

          const response = await fetch(
            "http://localhost:4000/api/orders/orders/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(nuevaOrden),
            }
          );

          const data = await response.json();

          if (response.ok) {
            alert("Orden creada con éxito.");
            // Limpiar campos después de crear la orden
            container.querySelector("#date_order").value = "";
            container.querySelector("#direction").value = "";
            container.querySelector("#description").value = "";
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error("Error al crear la orden:", error);
          alert("Error al crear la orden.");
        }
      });
    } else {
      console.error("No se encontró el botón para enviar la orden.");
    }
  }
}

function obtenerIdUsuarioDesdeToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) return null;

  const payload = JSON.parse(atob(tokenParts[1])); // Decodifica el payload
  return payload.id; // Retorna el ID del usuario
}
=======
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

>>>>>>> 54f1cd0 (MVC todo el fronend)
