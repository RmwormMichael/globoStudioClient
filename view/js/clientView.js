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
    // Crea un contenedor específico para las cotizaciones
    const cotizacionesContainer = document.createElement('div');
    cotizacionesContainer.className = 'cotizacionesContainer';
    
    // Limpia el contenedor principal antes de agregar
    container.innerHTML = '';
    
    ordenes.forEach((order) => {
      crearCardCliente(order, cotizacionesContainer);
    });
    
    // Agrega el contenedor de cotizaciones al contenedor principal
    container.appendChild(cotizacionesContainer);
  }
  
  function crearCardCliente(order, container) {
    const template = document.getElementById("CotizacionesTemplate");
    if (!template) {
      console.error("No se encontró el template de cotizaciones");
      return;
    }
  
    const clone = document.importNode(template.content, true);
  
    // Mapeo de estados para mostrar texto más amigable
    const statusMap = {
      'pendiente': 'Pendiente',
      'en_proceso': 'En proceso',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
  
    clone.querySelector(".cardDescription").textContent = order.description || "Sin descripción";
  
    const formatDate = (dateStr) => {
      if (!dateStr) return "Fecha no especificada";
      const date = new Date(dateStr);
      return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    clone.querySelector(".creation-date").textContent = `Creación: ${formatDate(order.order_created_at)}`;
    clone.querySelector(".delivery-date").textContent = `Entrega: ${formatDate(order.date_order)}`;
    clone.querySelector(".direction").textContent = `Dirección: ${order.direction || "No especificada"}`;
    clone.querySelector(".cardStatus").textContent = `Estado: ${statusMap[order.status] || order.status}`;
  
    const editButton = clone.querySelector(".edit-button-client");
    if (editButton) {
      editButton.setAttribute("data-id", order.id_order);
    }
  
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
  