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
            const errorData = await response.json();
            throw new Error(
                errorData.message || `Error ${response.status}: ${response.statusText}`
            );
        }

        return data;
    } catch (error) {
        throw error
    }
};