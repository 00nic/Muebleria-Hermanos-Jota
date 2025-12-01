import { useState } from "react";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import { createOrder } from "../service/pedidos";

const API_BASE_URL= process.env.REACT_APP_API_URL || "http://localhost:3000/api/orders"


const CartPage = () => {
    const { cart, addItem, removeItem, deleteItem, clearCart, cartTotal } =
        useCart();
    const { showNotification } = useNotification();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        setIsProcessing(true);

        try {
            // Armar el objeto order con los items del carrito
            const orderData = {
                items: cart.map((item) => ({
                    productId: item._id,
                    nombre: item.nombre,
                    precio: item.precio,
                    quantity: item.quantity || 1,
                })),
                total: cartTotal,
            };

            // Usar el servicio centralizado
            const result = await createOrder(orderData);

            // Si es exitoso, limpiar el carrito
            clearCart();
            showNotification(
                `¡Pedido creado exitosamente! ID: ${
                    result.order?._id || "N/A"
                }`,
                "success"
            );
        } catch (error) {
            console.error("Error al finalizar compra:", error);
            showNotification(
                error.message ||
                    "Error al procesar el pedido. Intenta nuevamente.",
                "error"
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Cart
            cart={cart}
            addItem={addItem}
            removeItem={removeItem}
            deleteItem={deleteItem}
            handleCheckout={handleCheckout}
            isProcessing={isProcessing}
            cartTotal={cartTotal}
        />
    );
};

export default CartPage;
