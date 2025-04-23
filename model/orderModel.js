const orderModel = {
  async crearPedido(orderData, token) {
    try {
      const response = await fetch("http://localhost:4000/api/orders/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        // Si la respuesta no es OK, lanzar un error con el mensaje del servidor
        throw new Error(data.message || "Error al crear el pedido");
      }
      
      return data;
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      throw error; // Re-lanzar el error para manejarlo en la vista
    }
  },
  
    async obtenerOrdenes(token) {
      const response = await fetch("http://localhost:4000/api/orders/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al obtener órdenes.");
      return await response.json();
    },
  
    async obtenerUsuarios(token) {
      const response = await fetch("http://localhost:4000/api/usuarios/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al obtener los usuarios.");
      return await response.json();
    },
  
    async obtenerOrdenPorId(id, token) {
      const response = await fetch(`http://localhost:4000/api/orders/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Orden no encontrada.");
      return await response.json();
    },
  
    async actualizarOrden(id, data, token) {
      const response = await fetch(`http://localhost:4000/api/orders/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al actualizar la orden.");
    },
  
    async eliminarOrden(id, token) {
      const response = await fetch(`http://localhost:4000/api/orders/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al eliminar la orden.");
    },

    async buscarOrdenes(termino, token) {
      const response = await fetch(`http://localhost:4000/api/orders/buscar?termino=${encodeURIComponent(termino)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al buscar órdenes.");
      return await response.json();
    },
};

  
  
  export default orderModel;
  