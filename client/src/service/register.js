import { API_ENDPOINTS } from "./api";

export const createUser = async (userData) => {
    try {
        const response = await fetch(API_ENDPOINTS.auth.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        console.error("Error creating user:", error);
        throw error;
    }
};
