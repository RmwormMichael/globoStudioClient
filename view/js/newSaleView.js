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

    const token = localStorage.getItem("token"); // 🔥 Obtiene el token

    if (!token) {
      alert("No estás autenticado. Inicia sesión.");
      window.location.href = "/login.html"; // Redirige al login si no hay token
      return;
    }

    const id_user = document.getElementById("id_user").value;
    const date_order = document.getElementById("date_order").value;
    const direction = document.getElementById("direction").value;
    const description = document.getElementById("description").value;

    if (parseInt(id_user) < 1) {
      alert("El ID de usuario debe ser un número positivo.");
      return;
    }

    const status = "en_proceso";

    const orderData = {
      id_user, // ID seleccionado desde el select
      status,
      date_order,
      direction,
      description,
    };

    try {
      const result = await orderModel.crearPedido(orderData, token);

      if (result.success) {
        alert("¡Pedido creado correctamente!");
        document.getElementById("orderForm").reset();
      } else {
        alert(`Error al crear el pedido: ${result.msg}`);
      }
    } catch (error) {
      alert("Hubo un error al enviar los datos. Intenta nuevamente.");
    }
  }
};

export default newSaleView;
