const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/productos";

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
            const errorMessages = {
                404: "Producto inexistente",
                400: "Id inválido",
            };
            throw new Error(
                errorMessages[response.status] ||
                    `Error ${response.status}: ${response.statusText}`
            );
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
                errorData.mensaje ||
                    `Error ${response.status}: ${response.statusText}`
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
    const trimmedName = imageName?.trim();

    if (!trimmedName) {
        console.warn("No image name provided");
        return null;
    }

    // Si es una URL completa, retornarla directamente
    if (/^https?:\/\//i.test(trimmedName)) {
        return trimmedName;
    }

    // Si es una ruta local, usar require
    try {
        const fileName = trimmedName.split("/").pop();
        return fileName ? require(`../assets/productos/${fileName}`) : null;
    } catch (error) {
        console.error("Error loading image:", trimmedName, error);
        return null;
    }
};
