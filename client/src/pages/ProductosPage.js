import React from "react";
import { useProducts } from "../hooks/useProducts";



function ProductosPage() {
    const { products, loading, error } = useProducts();

    if (loading) {
        return <p>Cargando ...</p>
    };

    if (error) {
        return <p>Error: {error}</p>
    };

    return (
        <div>
            <h1>Productos</h1>

            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.nombre}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ProductosPage;