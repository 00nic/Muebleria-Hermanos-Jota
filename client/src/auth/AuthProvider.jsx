import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restaurar sesión desde localStorage al montar
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            try {
                const userData = decodeToken(storedToken);
                setToken(storedToken);
                setUser(userData);
            } catch (error) {
                console.error("Token almacenado inválido:", error);
                localStorage.removeItem("authToken");
            }
        }
        setLoading(false);
    }, []);

    // Decodifica el token JWT para obtener información del usuario
    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return {
                id: payload._id,
                email: payload.email,
                username: payload.username,
                role: payload.role,
            };
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            throw new Error("Token inválido");
        }
    };

    // Maneja el login del usuario
    const login = (tokenData) => {
        setToken(tokenData);
        const userData = decodeToken(tokenData);
        setUser(userData);
        localStorage.setItem("authToken", tokenData);
    };

    // Maneja el logout del usuario
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
    };

    const getAuthHeaders = () => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Chequea si el usuario está autenticado
    const isAuthenticated = Boolean(user && token);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                login,
                logout,
                getAuthHeaders,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
