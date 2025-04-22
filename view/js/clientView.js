// view/clientView.js

export default class ClientView {
    constructor() {
      this.sidebar = document.getElementById("sidebar");
      this.profileButton = document.querySelector(".profile-icon");
    }
  
    activarSidebar() {
      this.sidebar?.classList.add("active");
    }
  
    cerrarSidebar() {
      this.sidebar?.classList.remove("active");
    }
  
    configurarCierreAutomatico(callback) {
      document.addEventListener("click", (event) => {
        if (
          this.sidebar &&
          this.profileButton &&
          !this.sidebar.contains(event.target) &&
          !this.profileButton.contains(event.target)
        ) {
          callback();
        }
      });
    }
  }
  




  // clientView.js
export function renderizarPerfil(usuario) {
  document.getElementById("profileWelcome").textContent = usuario.nombre;

    document.getElementById("profileEmail").textContent = usuario.email;
  }
  
  export function llenarModalCliente(usuario) {
    document.getElementById("clienteNombre").value = usuario.nombre;
    document.getElementById("clienteEmail").value = usuario.email;
  
    const saveButton = document.getElementById("clienteSaveChangesBtn");
    saveButton.setAttribute("data-id", usuario.id);
  }
  
  export function cerrarModalCliente() {
    const modal = bootstrap.Modal.getInstance(document.getElementById("clienteModal"));
    modal.hide();
  }
  



  export function renderizarOrdenesCliente(ordenes, container) {
    ordenes.forEach((order) => {
      crearCardCliente(order, container);
    });
  }
  
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
  
    clone
      .querySelector(".edit-button-client")
      .setAttribute("data-id", order.id_order);
  
    container.appendChild(clone);
  }
  



  export function mostrarDatosOrdenEnModal(order) {
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
  }
  
  export function obtenerDatosFormularioEdicion() {
    return {
      description: document.getElementById("editDescriptionClient").value.trim(),
      direction: document.getElementById("editDirectionClient").value.trim(),
      date_order: document.getElementById("editDeliveryDateClient").value,
    };
  }
  
  export function cerrarModalEdicion() {
    const modalElement = document.getElementById("editModalClient");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
  }

  

  export function mostrarNewSaleTemplate(container, idUser) {
    const template = document.getElementById("newSaleCliente");
    if (template) {
      const clone = document.importNode(template.content, true);
      container.appendChild(clone);
  
      const idUserInput = container.querySelector("#id_user");
      if (idUserInput) {
        idUserInput.value = idUser;
      }
    }
  }
  
  export function obtenerDatosNuevaOrden(container, idUser) {
    const dateOrder = container.querySelector("#date_order").value;
    const direction = container.querySelector("#direction").value;
    const description = container.querySelector("#description").value;
  
    if (!dateOrder || !direction || !description) {
      return null;
    }
  
    return {
      id_user: idUser,
      date_order: dateOrder,
      direction,
      description,
    };
  }
  
  export function limpiarFormularioNuevaOrden(container) {
    container.querySelector("#date_order").value = "";
    container.querySelector("#direction").value = "";
    container.querySelector("#description").value = "";
  }
  