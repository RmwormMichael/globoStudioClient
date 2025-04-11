// /view/userView.js
const userView = {
    mostrarUsuarios(usuarios, { onEdit, onDelete }) {
      const contenedorCards = document.createElement("div");
      contenedorCards.classList.add("usersCardsContainer");
  
      const templateCard = document.getElementById("userCard");
      const usersContainer = document.querySelector(".usersContainer");
      usersContainer.querySelector(".usersCardsContainer")?.remove();
  
      usuarios.forEach(usuario => {
        const card = templateCard.content.cloneNode(true);
  
        card.querySelector(".user-id").textContent = `ID: ${usuario.id_user}`;
        card.querySelector(".user-name").textContent = usuario.nombre;
        card.querySelector(".user-email").textContent = usuario.email;
  
        const editBtn = card.querySelector(".edit-buttonUser");
        const deleteBtn = card.querySelector(".delete-buttonUser");
  
        // Set data
        editBtn.dataset.id = usuario.id_user;
        editBtn.dataset.nombre = usuario.nombre;
        editBtn.dataset.email = usuario.email;
  
        deleteBtn.dataset.id = usuario.id_user;
  
        // Eventos
        editBtn.addEventListener("click", () => onEdit(usuario));
        deleteBtn.addEventListener("click", () => onDelete(usuario.id_user));
  
        contenedorCards.appendChild(card);
      });
  
      usersContainer.appendChild(contenedorCards);
    },
  
    llenarModal(usuario, onSave) {
      document.getElementById("nombre").value = usuario.nombre;
      document.getElementById("email").value = usuario.email;
  
      const saveBtn = document.getElementById("saveChangesBtn");
      saveBtn.onclick = () => onSave(usuario.id_user);
    },
  
    cerrarModal() {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("exampleModalCenter")
      );
      modal?.hide();
    }
  };
  
  export default userView;
  