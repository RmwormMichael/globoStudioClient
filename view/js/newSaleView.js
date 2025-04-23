import orderModel from "../../model/orderModel.js";

const newSaleView = {
  async renderNewSaleForm() {
    const container = document.getElementById("mainAdmin");
    container.innerHTML = ""; // Elimina cualquier contenido previo

    const template = document.getElementById("newSale");
    if (template) {
      const clone = document.importNode(template.content, true);
      container.appendChild(clone); // Añadir la plantilla al contenedor

      // Cargar usuarios y añadirlos al select
      await this.cargarUsuarios();

      // Ahora el botón existe, podemos añadir el eventListener
      const submitButton = document.getElementById("submitButton");
      if (submitButton) {
        submitButton.addEventListener("click", (event) => this.enviarPedido(event));
      }
    }
  },

  async cargarUsuarios() {
    try {
      const usuarios = await orderModel.obtenerUsuarios();
      const selectUser = document.getElementById("id_user");

      // Limpiar las opciones existentes (si las hay)
      selectUser.innerHTML = "";

      // Crear una opción por defecto
      const optionDefault = document.createElement("option");
      optionDefault.value = "";
      optionDefault.textContent = "Selecciona un usuario";
      selectUser.appendChild(optionDefault);

      // Llenar el select con los usuarios
      usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.id_user;
        option.textContent = usuario.nombre;
        selectUser.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
      alert("No se pudieron cargar los usuarios.");
    }
  },

  async enviarPedido(event) {
    event.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Inicia sesión.");
      window.location.href = "/login.html";
      return;
    }
  
    // Obtener valores del formulario
    const id_user = document.getElementById("id_user").value;
    const date_order = document.getElementById("date_order").value;
    const direction = document.getElementById("direction").value;
    const description = document.getElementById("description").value;
  
    // Validaciones
    if (!id_user || !date_order || !direction || !description) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    const orderData = {
      id_user,
      status: "en_proceso",
      date_order,
      direction,
      description,
    };
  
    try {
      // Mostrar estado de carga
      const submitButton = document.getElementById("submitButton");
      submitButton.disabled = true;
      submitButton.textContent = "Creando pedido...";
  
      // Crear pedido
      const result = await orderModel.crearPedido(orderData, token);
      
      // Si llegamos aquí, el pedido se creó correctamente
      alert("¡Pedido creado correctamente!");
      document.getElementById("orderForm").reset();
      
    } catch (error) {
      // Mostrar mensaje de error específico
      alert(`Error al crear el pedido: ${error.message}`);
      console.error("Error:", error);
    } finally {
      // Restaurar el botón
      const submitButton = document.getElementById("submitButton");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Añadir Orden";
      }
    }
  }
};

export default newSaleView;
