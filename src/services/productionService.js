// productionService.js

const API_BASE_URL = "https://juanavpc.pythonanywhere.com" || "http://localhost:5000";
const KEY_TOKEN = 'jwtToken';

const productionService = {
  getProductions: async () => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      const response = await fetch(`${API_BASE_URL}/produccion`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      });

      if (!response.ok) {
        throw new Error('Error al obtener producciones');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error en la solicitud de producciones: ${error.message}`);
    }
  },
  getDetalleProductions:async () => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      const response = await fetch(`${API_BASE_URL}/detproduccion`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      });

      if (!response.ok) {
        throw new Error('Error al obtener el detalle de producciones');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error en la solicitud de producciones: ${error.message}`);
    }
  },
  deleteDetalleProductions: async (detalleProduccionId) => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      const response = await fetch(`${API_BASE_URL}/detproduccion`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: detalleProduccionId }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar detalles de producción');
      }

      const deletedDetails = await response.json();
      return deletedDetails;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar detalles de producción: ${error.message}`);
    }
  },
  createProduction: async (productionData) => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      const response = await fetch(`${API_BASE_URL}/produccion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productionData),
      });

      if (!response.ok) {
        throw new Error('Error al crear producción');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al agregar una produccion: ${error.message}`);
    }
  },

  deleteProduction: async (productionId) => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      console.log({ id: productionId });
      const response = await fetch(`${API_BASE_URL}/produccion`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: productionId }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producción');
      }

      const deletedProduction = await response.json();
      return deletedProduction;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar la produccion: ${error.message}`);
    }
  },
};

export default productionService;