import { useState, useEffect } from "react";
import { getAllProducts } from "../service/products";

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
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setMessageError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  return { products, loading, messageError };
}