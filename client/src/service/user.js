const BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const createUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || `Error ${response.status}: ${response.statusText}`
            );
        }

        return data;
    } catch (error) {
        throw error
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
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
        await fetch(`${BASE_URL / user / logout}`, {
            method: 'POST',
            credentials: 'include'
        });

        return true;
    } catch (error) {
        throw error;
    }
};

//Agregar serivcio userProfile una vez que se complete el middleware de autenticacion en el backend