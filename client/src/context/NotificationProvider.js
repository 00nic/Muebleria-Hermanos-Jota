import { useState, useRef, useEffect } from "react";
import { NotificationContext } from "./NotificationContext";

export function NotificationProvider({ children }) {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const timeoutRef = useRef(null);

    // Limpiar timeout al desmontar para evitar memory leaks
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const clearNotifications = () => {
        setMessage("");
        setType("");
    };

    const showNotification = (msg, notificationType) => {
        // Limpiar timeout anterior si existe
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setMessage(msg);
        setType(notificationType);

        // Auto-limpiar después de 5 segundos (excepto loading y error-loading que deben cerrarse manualmente)
        if (
            notificationType !== "loading" &&
            notificationType !== "error-loading"
        ) {
            timeoutRef.current = setTimeout(clearNotifications, 5000);
        }
    };

    return (
        <NotificationContext.Provider
            value={{
                message,
                type,
                showNotification,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
