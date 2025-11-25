import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../auth/AuthContext";

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    // Limpiar el carrito cuando cambia el usuario (login/logout)
    useEffect(() => {
        setCart([]);
    }, [user?.id]); // Se ejecuta cuando cambia el ID del usuario

    // Agregar un producto al carrito (con lógica anti-duplicados)
    const addItem = (product) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item._id === product._id
            );

            if (existingItemIndex !== -1) {
                // Si el producto ya existe, aumentar su quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity:
                        (updatedCart[existingItemIndex].quantity || 1) + 1,
                };
                return updatedCart;
            } else {
                // Si no existe, agregarlo con quantity = 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Remover una unidad de un producto del carrito
    const removeItem = (productId) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item._id === productId
            );

            if (existingItemIndex === -1) return prevCart;

            const updatedCart = [...prevCart];
            const currentQuantity =
                updatedCart[existingItemIndex].quantity || 1;

            if (currentQuantity > 1) {
                // Si tiene más de 1 unidad, reducir quantity
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: currentQuantity - 1,
                };
                return updatedCart;
            } else {
                // Si solo tiene 1 unidad, eliminar el producto
                return updatedCart.filter((item) => item._id !== productId);
            }
        });
    };

    // Eliminar todas las unidades de un producto del carrito
    const deleteItem = (productId) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item._id !== productId)
        );
    };

    // Limpiar el carrito completamente
    const clearCart = () => {
        setCart([]);
    };

    // Calcular el número total de items en el carrito (suma de quantities)
    const cartCount = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    // Calcular el total del carrito
    const cartTotal = cart.reduce(
        (total, item) => total + (item.precio || 0) * (item.quantity || 1),
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
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
