import { API_ENDPOINTS } from "./api";

export const loginRequest = async (credentials) => {
    try {
        const response = await fetch(API_ENDPOINTS.auth.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al iniciar sesión");
        }

        const { token } = await response.json();
        return token;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};
