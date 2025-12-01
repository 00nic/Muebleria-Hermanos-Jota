// Configuración centralizada de la API
const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

// Función para obtener headers de autenticación desde localStorage
export const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Función helper para manejar errores HTTP
export const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
            errorData.message ||
            `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
    }
    return await response.json();
};

// URLs de endpoints
export const API_ENDPOINTS = {
    productos: `${API_BASE_URL}/productos`,
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
    },
    user: {
        base: `${API_BASE_URL}/user`,
        register: `${API_BASE_URL}/user/register`,
        login: `${API_BASE_URL}/user/login`,
        logout: `${API_BASE_URL}/user/logout`,
    },
    orders: `${API_BASE_URL}/orders`,
};

export default API_BASE_URL;
