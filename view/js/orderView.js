const orderView = {
  crearCard(order, user, container) {
    const template = document.getElementById("MySales");
    const clone = document.importNode(template.content, true);

    // Mapeo de estados
    const statusMap = {
      'pendiente': 'Pendiente',
      'en_proceso': 'En proceso',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
      // Agrega más estados si es necesario
    };

    clone.querySelector(".order-id").textContent = `ID: ${order.id_order}`;
    clone.querySelector(".user-name").textContent = user ? user.nombre : "Usuario no encontrado";
    clone.querySelector(".cardDescription").textContent = order.description;

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    };

    clone.querySelector(".direction").textContent = `Dirección: ${order.direction}`;
    clone.querySelector(".creation-date").textContent = `Creado: ${formatDate(order.order_created_at)}`;
    clone.querySelector(".delivery-date").textContent = `Entrega: ${formatDate(order.date_order)}`;
    clone.querySelector(".cardStatus").textContent = `Estado: ${statusMap[order.status] || order.status}`;

    const editButton = clone.querySelector(".edit-button");
    editButton.setAttribute("data-id", order.id_order);
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#editModal");
    
    clone.querySelector(".delete-button").setAttribute("data-id", order.id_order);

    container.appendChild(clone);
  },

  llenarFormularioEdicion(order) {
    document.getElementById("editDescription").value = order.description || "";
    document.getElementById("editDirection").value = order.direction || "";

    const orderDate = new Date(order.date_order);
    const formattedDate = orderDate.toISOString().slice(0, 16);
    document.getElementById("editDeliveryDate").value = formattedDate;
    document.getElementById("editStatus").value = order.status || "en_proceso";
  },

  actualizarOrdenEnPantalla(orderId, updatedOrder) {
    const statusMap = {
      'pendiente': 'Pendiente',
      'en_proceso': 'En proceso',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const editButton = card.querySelector(".edit-button");
      if (editButton?.getAttribute("data-id") === orderId) {
        card.querySelector(".cardDescription").textContent = updatedOrder.description;
        card.querySelector(".direction").textContent = `Dirección: ${updatedOrder.direction}`;

        const deliveryDate = new Date(updatedOrder.date_order);
        const formattedDate = `${deliveryDate.getDate().toString().padStart(2, "0")}/${(deliveryDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${deliveryDate.getFullYear()} ${deliveryDate.getHours().toString().padStart(2, "0")}:${deliveryDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
        card.querySelector(".delivery-date").textContent = `Entrega: ${formattedDate}`;
        card.querySelector(".cardStatus").textContent = `Estado: ${statusMap[updatedOrder.status] || updatedOrder.status}`;
      }
    });
  },
};

export default orderView;