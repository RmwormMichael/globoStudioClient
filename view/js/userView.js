const userView = {
  mostrarUsuarios(usuarios, { onEdit, onDelete }) {
    const contenedorCards = document.createElement("div");
    contenedorCards.classList.add("usersCardsContainer");

    const templateCard = document.getElementById("userCard");
    const usersContainer = document.querySelector(".usersContainer");
    
    // Limpiar solo las tarjetas, no todo el contenedor
    usersContainer.querySelector(".usersCardsContainer")?.remove();

    usuarios.forEach(usuario => {
      const card = templateCard.content.cloneNode(true);

      card.querySelector(".user-id").textContent = `ID: ${usuario.id_user}`;
      card.querySelector(".user-name").textContent = usuario.nombre;
      card.querySelector(".user-email").textContent = usuario.email;

      const editBtn = card.querySelector(".edit-buttonUser");
      const deleteBtn = card.querySelector(".delete-buttonUser");

      editBtn.dataset.id = usuario.id_user;
      deleteBtn.dataset.id = usuario.id_user;

      editBtn.addEventListener("click", () => onEdit(usuario));
      deleteBtn.addEventListener("click", () => onDelete(usuario.id_user));

      contenedorCards.appendChild(card);
    });

    usersContainer.appendChild(contenedorCards);
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