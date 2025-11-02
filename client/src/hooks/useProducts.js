import { getAllProducts } from "../service/products";
import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageError, setMessageError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setMessageError(null);
        const data = await getAllProducts();
        console.log("Datos: ", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
        setMessageError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return { products, loading, messageError };
}
