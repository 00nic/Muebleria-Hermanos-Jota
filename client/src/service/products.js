const API_BASE_URL = process.env.REACT_APP_API_URL?.trim();

// Función helper para manejar errores HTTP
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return await response.json();
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Ha ocurrido un error al cargar los productos");
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Producto inexistente");
      }
      if (response.status === 400) {
        throw new Error("Id inválido");
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.mensaje || `Error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("No fue posible borrar el producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getImageUrl = (imageName) => {
  if (!imageName || imageName.trim() === "") {
    console.warn("No image name provided");
    return null;
  }

  // Si es una URL completa (http:// o https://), retornarla directamente
  if (imageName.startsWith("http://") || imageName.startsWith("https://")) {
    return imageName;
  }

  // Si es una ruta local, usar require
  try {
    const fileName = imageName.split("/").pop();
    if (!fileName) {
      return null;
    }
    return require(`../assets/productos/${fileName}`);
  } catch (error) {
    console.error("Error loading image:", imageName, error);
    return null;
  }
};
