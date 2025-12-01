import { API_ENDPOINTS, getAuthHeaders } from "./api";

export const createUser = async (userData) => {
    try {
        const response = await fetch(API_ENDPOINTS.user.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                    `Error ${response.status}: ${response.statusText}`
            );
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(API_ENDPOINTS.user.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await fetch(API_ENDPOINTS.user.logout, {
            method: "POST",
            headers: {
                ...getAuthHeaders(),
            },
            credentials: "include",
        });

        return true;
    } catch (error) {
        throw error;
    }
};

//Agregar serivcio userProfile una vez que se complete el middleware de autenticacion en el backend
