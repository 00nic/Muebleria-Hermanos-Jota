import { useEffect } from "react";
import { useNotification } from "../context/NotificationContext";

/**
 * Hook personalizado para manejar notificaciones de loading
 * Evita sobrescribir notificaciones de success/error
 */
export const useLoadingNotification = (loading, message = "Cargando...") => {
    const { showNotification, clearNotifications, type } = useNotification();

    useEffect(() => {
        if (loading) {
            // Solo mostrar loading si no hay una notificación de success o error activa
            if (type !== "success" && type !== "error") {
                showNotification(message, "loading");
            }
        } else {
            // Solo limpiar si es una notificación de loading
            if (type === "loading") {
                clearNotifications();
            }
        }
    }, [loading, message, showNotification, clearNotifications, type]);
};

/**
 * Hook personalizado para manejar notificaciones de error
 */
export const useErrorNotification = (error, prefix = "Error") => {
    const { showNotification } = useNotification();

    useEffect(() => {
        if (error) {
            showNotification(`${prefix}: ${error}`, "error");
        }
    }, [error, prefix, showNotification]);
};
