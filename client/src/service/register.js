export const createUser = async (userData) => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
