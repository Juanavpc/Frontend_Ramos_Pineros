// authService.js

const API_BASE_URL ="https://juanavpc.pythonanywhere.com/" || "http://localhost:5000"; 
const KEY_TOKEN = 'jwtToken'; 

const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/4`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Error de autenticación");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
      throw new Error("Error al procesar la solicitud de inicio de sesión");
    }
  },
  register: async (userData) => {
    try {
      console.log(JSON.stringify(userData))
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de registro de usuario');
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error durante el registro de usuario: ${error.message}`);
    }
  },
  saveToken: (token) => {
    localStorage.setItem(KEY_TOKEN, token);
  },

  getToken: () => {
    return localStorage.getItem(KEY_TOKEN);
  },

  removeToken: () => {
    localStorage.removeItem(KEY_TOKEN);
  },
  isAuthenticated: () => {
    const token = localStorage.getItem(KEY_TOKEN);
    return !!token;
  },


};

export default authService;
