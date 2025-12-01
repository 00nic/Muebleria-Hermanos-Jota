import { createContext, useContext } from "react";

export const NotificationContext = createContext();

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification debe ser usado dentro de un NotificationProvider"
        );
    }
    return context;
}
