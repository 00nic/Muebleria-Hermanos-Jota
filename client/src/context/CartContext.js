import { createContext, useContext } from "react";

export const CartContext = createContext();

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
}
