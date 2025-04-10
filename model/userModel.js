// /model/userModel.js
const userModel = {
    async obtenerUsuarios() {
      const response = await fetch("http://localhost:4000/api/usuarios/usuarios");
      return await response.json();
    },
  
    async editarUsuario(id, datos) {
      return await fetch(`http://localhost:4000/api/usuarios/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
    },
  
    async eliminarUsuario(id) {
      return await fetch(`http://localhost:4000/api/usuarios/usuarios/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  
  export default userModel;
  