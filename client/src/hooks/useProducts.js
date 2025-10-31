import React from "react";
import { getAllProducts } from "../service/products";
import { useState, useEffect } from "react";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getAllProducts();
                console.log("Datos: ", data);
                setProducts(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();

    }, []);

    return { products, loading, error };
}