import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import Notification from "../components/utils/Notification";
import "./ProductosPage.css";
function ProductosPage() {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    //tendria que ir algo asi /productos/${product._id} y devolver la info de cada producto por ir
    navigate(``);
  };

  if (loading) {
    return <p className="loading-products">Cargando ...</p>;
  }

  if (error) {
    return <Notification message={`Error: ${error.message}`} type={"error"} />;
  }

  return (
    <div className="contenedor">
      <h1>Productos</h1>

      <ProductList
        catalogo={products}
        //Falta desarrollar la pagina de detalle de los productos
        onClick={handleProductClick}
      />
    </div>
  );
}
export default ProductosPage;
