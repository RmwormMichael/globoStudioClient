const orderView = {
    crearCard(order, user, container) {
      const template = document.getElementById("MySales");
      const clone = document.importNode(template.content, true);
  
      clone.querySelector(".cardTittle h5:nth-child(1)").textContent = `IdOrder: ${order.id_order}`;
      clone.querySelector(".cardTittle h5:nth-child(2)").textContent = user ? user.nombre : "Usuario no encontrado";
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
  
      clone.querySelector(".list-group-item:nth-child(1)").textContent = `Dirección: ${order.direction}`;
      clone.querySelector(".list-group-item:nth-child(2)").textContent = `Día de creación: ${formatDate(order.order_created_at)}`;
      clone.querySelector(".list-group-item:nth-child(3)").textContent = `Día de entrega: ${formatDate(order.date_order)}`;
      clone.querySelector(".list-group-item:nth-child(4)").textContent = `Estado: ${order.status}`;
  
      clone.querySelector(".edit-button").setAttribute("data-id", order.id_order);
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
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        const editButton = card.querySelector(".edit-button");
        if (editButton?.getAttribute("data-id") === orderId) {
          card.querySelector(".cardDescription").textContent = updatedOrder.description;
          card.querySelector("li:nth-child(1)").textContent = `Dirección: ${updatedOrder.direction}`;
  
          const deliveryDate = new Date(updatedOrder.date_order);
          const formattedDate = `${deliveryDate.getDate().toString().padStart(2, "0")}/${(deliveryDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${deliveryDate.getFullYear()} ${deliveryDate.getHours().toString().padStart(2, "0")}:${deliveryDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          card.querySelector("li:nth-child(3)").textContent = `Día de entrega: ${formattedDate}`;
          card.querySelector(".cardStatus").textContent = `Estado: ${
            updatedOrder.status === "en_proceso" ? "En proceso" : "Entregado"
          }`;
        }
      });
    },
  };
  
  export default orderView;
  