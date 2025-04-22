const API_URL = "http://localhost:4000/api/usuarios/";

export const loginUsuario = async (email, password) => {
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};

export const registrarUsuario = async (nombre, email, password) => {
  const usuarioData = { nombre, email, password };
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioData),
  });
  return await response.json();
};

export const recuperarPassword = async (email) => {
  try {
    const response = await fetch(API_URL + "olvide-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        ok: false,
        message: data.msg || "Error al solicitar recuperación"
      };
    }
    
    return {
      ok: true,
      message: data.msg
    };
    
  } catch (error) {
    console.error("Error:", error);
    return {
      ok: false,
      message: "Error de conexión"
    };
  }
};

export const validarCorreo = (correo) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
};
