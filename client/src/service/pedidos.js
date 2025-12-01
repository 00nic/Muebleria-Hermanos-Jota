import { API_ENDPOINTS, getAuthHeaders, handleResponse } from "./api";

const API_BASE_URL = API_ENDPOINTS.orders;

// Obtener todos los pedidos del usuario autenticado
export const getUserOrders = async () => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
};

// Obtener un pedido específico por ID
export const getOrderById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message ||
                    `Error ${response.status}: ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};

// Crear un nuevo pedido
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message ||
                    `Error ${response.status}: ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};
