import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Eliminar todas las instancias de un producto del carrito
    const deleteItem = (productId) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item._id !== productId)
        );
    };

    // Agregar un producto al carrito
    const addItem = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Remover una sola instancia de un producto del carrito
    const removeItem = (productId) => {
        setCart((prevCart) => {
            const index = prevCart.findIndex((item) => item._id === productId);
            if (index === -1) return prevCart;

            const updatedCart = [...prevCart];
            updatedCart.splice(index, 1);
            return updatedCart;
        });
    };

    // Limpiar el carrito completamente
    const clearCart = () => {
        setCart([]);
    };

    // Calcular el total del carrito
    const cartTotal = cart.reduce(
        (total, item) => total + (item.precio || 0),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                deleteItem,
                clearCart,
                cartCount: cart.length,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
