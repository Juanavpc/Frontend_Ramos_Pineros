// userService.js

const API_BASE_URL = "https://juanavpc.pythonanywhere.com" || "http://localhost:5000"; 
// Reemplaza con la URL de tu backend
const KEY_TOKEN = 'jwtToken';

const userService = {
  getUsers: async () => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);

      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener usuarios');
    }
  },

  editUser: async (userData) => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);

      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al editar el usuario');
      }

      const editedUser = await response.json();
      return editedUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error al editar el usuario');
    }
  },

  deleteUser: async (userId) => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);

      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      const deletedUser = await response.json();
      return deletedUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar el usuario');
    }
  },

};

export default userService;

