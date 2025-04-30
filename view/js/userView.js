const userView = {
  mostrarUsuarios(usuarios, { onEdit, onDelete }) {
    const usersContainer = document.querySelector(".usersContainer");
    
    // Limpiar solo las tarjetas existentes (manteniendo el input de búsqueda)
    const existingCards = usersContainer.querySelectorAll(".card.user");
    existingCards.forEach(card => card.remove());

    const templateCard = document.getElementById("userCard");

    usuarios.forEach(usuario => {
      const card = templateCard.content.cloneNode(true).querySelector(".card");
      
      card.querySelector(".user-id").textContent = `ID: ${usuario.id_user}`;
      card.querySelector(".user-name").textContent = usuario.nombre;
      card.querySelector(".user-email").textContent = usuario.email;

      const editBtn = card.querySelector(".edit-buttonUser");
      const deleteBtn = card.querySelector(".delete-buttonUser");

      editBtn.dataset.id = usuario.id_user;
      deleteBtn.dataset.id = usuario.id_user;

      editBtn.addEventListener("click", () => onEdit(usuario));
      deleteBtn.addEventListener("click", () => onDelete(usuario.id_user));

      // Añadir directamente al usersContainer (que ya tiene los estilos grid)
      usersContainer.appendChild(card);
    });

  },

  configurarBuscador(onFiltrar) {
    const inputBusqueda = document.getElementById("userSearchInput");
    const searchButton = document.getElementById("userSearchButton");
    
    const handleSearch = () => {
      const texto = inputBusqueda.value.toLowerCase().trim();
      onFiltrar(texto);
    };
    
    // Búsqueda al hacer clic en el botón
    searchButton.addEventListener("click", handleSearch);
    
    // Búsqueda al presionar Enter
    inputBusqueda.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
    
    // Búsqueda en tiempo real (opcional, descomenta si lo quieres)
    // inputBusqueda.addEventListener("input", handleSearch);
  },

  llenarModal(usuario, onSave) {
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("email").value = usuario.email;
    document.getElementById("rol").value = usuario.rol || "user"; // Asumiendo que hay un campo rol

    const saveBtn = document.getElementById("saveChangesBtn");
    // Limpiar evento anterior para evitar múltiples listeners
    saveBtn.replaceWith(saveBtn.cloneNode(true));
    document.getElementById("saveChangesBtn").onclick = () => onSave(usuario.id_user);
  },

  cerrarModal() {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("exampleModalCenter")
    );
    modal?.hide();
  }
};

export default userView;