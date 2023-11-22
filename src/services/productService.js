// productService.js

const API_BASE_URL = "https://juanavpc.pythonanywhere.com" || "http://localhost:5000"; "https://tu-api.com"; // Reemplaza con la URL correcta de tu API

const productService = {
  getProducts: async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener la lista de productos");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error en la solicitud de productos: ${error.message}`);
    }
  },

  addProduct: async (productData) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar un producto");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error al agregar un producto: ${error.message}`);
    }
  },

  deleteProduct: async (productId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  },
};

export default productService;
