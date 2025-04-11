import * as auth from "../model/authModel.js";

document.addEventListener("DOMContentLoaded", () => {
  const modalTitle = document.getElementById("modalTitle");
  const modalActionBtn = document.getElementById("modalActionBtn");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const resetForm = document.getElementById("resetForm");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");

  const showForm = (formToShow) => {
    [loginForm, registerForm, resetForm].forEach(
      (form) => (form.style.display = "none")
    );
    formToShow.style.display = "block";
  };

  // Botón login
  document.getElementById("loginBtn")?.addEventListener("click", () => {
    modalTitle.textContent = "Inicia sesión";
    showForm(loginForm);
    modalActionBtn.textContent = "Iniciar sesión";
  });

  // Botón registro
  document.getElementById("registerBtn")?.addEventListener("click", () => {
    modalTitle.textContent = "Crear cuenta";
    showForm(registerForm);
    modalActionBtn.textContent = "Registrar";
  });

  // Botón recuperación
  forgotPasswordLink?.addEventListener("click", () => {
    modalTitle.textContent = "Recuperar contraseña";
    showForm(resetForm);
    modalActionBtn.textContent = "Recuperar contraseña";
  });

  // Acción principal (login o registro o recuperación)
  modalActionBtn.addEventListener("click", async () => {
    if (loginForm.style.display !== "none") {
      // LOGIN
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      try {
        const data = await auth.loginUsuario(email, password);
        if (!data.token) return alert(data.message);

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        window.location.href =
          data.usuario.rol === "admin" ? "/admin.html" : "/client.html";
      } catch (error) {
        console.error("Error login", error);
      }
    } else if (registerForm.style.display !== "none") {
      // REGISTRO
      const nombre = document.getElementById("inputName").value;
      const email = document.getElementById("emailRegister").value;
      const password = document.getElementById("registerPassword").value;

      if (!nombre || !email || !password) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      if (!auth.validarCorreo(email)) {
        alert("Correo inválido.");
        return;
      }

      try {
        const data = await auth.registrarUsuario(nombre, email, password);
        alert(data.msg || "Registro completo");
      } catch (error) {
        console.error("Error registro", error);
      }
    } else if (resetForm.style.display !== "none") {
      // RECUPERACIÓN
      const email = document.getElementById("resetEmail").value;
      try {
        const data = await auth.recuperarPassword(email);
        if (!data.ok) {
          alert(data.message);
          return;
        }

        alert(
          "Te hemos enviado un correo con instrucciones para recuperar tu contraseña."
        );
        $("#exampleModal").modal("hide");
      } catch (error) {
        console.error("Error recuperación", error);
      }
    }
  });

  // Botón scroll
  window.onscroll = function () {
    const btn = document.getElementById("botonSubir");
    btn.style.display =
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
        ? "block"
        : "none";
  };
});

// Función para desplazarse hacia arriba al hacer clic
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.scrollToTop = scrollToTop;