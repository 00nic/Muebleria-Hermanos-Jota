import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  // Función helper para obtener el ID correcto (maneja tanto _id como id)
  const getProductId = (product) => {
    return product._id || product.id;
  };

  // Eliminar todas las instancias de un producto del carrito
  const deleteItem = (productId) => {
    const updatedCart = cart.filter((item) => getProductId(item) !== productId);
    setCart(updatedCart);
  };

  // Agregar un producto al carrito
  const addItem = (product) => {
    setCart([...cart, product]);
  };

  // Remover una sola instancia de un producto del carrito
  const removeItem = (productId) => {
    const index = cart.findIndex((item) => getProductId(item) === productId);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };

  // Limpiar el carrito completamente
  const clearCart = () => {
    setCart([]);
  };

  // Obtener el número total de items en el carrito
  const getCartCount = () => {
    return cart.length;
  };

  // Obtener el total del carrito
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const precio = typeof item.precio === "number" ? item.precio : 0;
      return total + precio;
    }, 0);
  };

  return {
    cart,
    addItem,
    removeItem,
    deleteItem,
    clearCart,
    getCartCount,
    getCartTotal,
  };
}
