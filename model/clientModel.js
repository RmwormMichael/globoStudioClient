// model/clientModel.js

export default class ClientModel {
    cerrarSesion() {
      if (confirm("¿seguro que quieres cerrar sesion?")) {
        window.location.href = "index.html";
      }
    }
  }
  



  // clientModel.js
  export async function obtenerPerfilDesdeAPI() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");
  
    const response = await fetch("http://localhost:4000/api/usuarios/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) throw new Error("No se pudo obtener el perfil");
    return await response.json();
  }
  
  export async function actualizarPerfilEnAPI(id, nombre, email) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");
  
    const response = await fetch(
      `http://localhost:4000/api/usuarios/usuarios/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email }),
      }
    );
  
    if (!response.ok) throw new Error("Error al actualizar el perfil");
    return await response.json();
  }
  


  export async function obtenerOrdenesCliente(token) {
    const response = await fetch("http://localhost:4000/api/orders/orders/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Error al obtener las órdenes");
    }
  
    return await response.json();
  }
  
  

  export async function obtenerOrdenPorId(id, token) {
    const response = await fetch(`http://localhost:4000/api/orders/orders/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Orden no encontrada");
    }
  
    return await response.json();
  }
  
  export async function actualizarOrdenCliente(id, data, token) {
    const response = await fetch(`http://localhost:4000/api/orders/orders/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Error al actualizar la orden.");
    }
  
    return await response.json();
  }
  



  export function obtenerIdUsuarioDesdeToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) return null;
  
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload.id;
  }
  
  export async function crearOrdenCliente(nuevaOrden, token) {
    const response = await fetch("http://localhost:4000/api/orders/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevaOrden),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "No se pudo crear la orden.");
    }
  
    return data;
  }
  