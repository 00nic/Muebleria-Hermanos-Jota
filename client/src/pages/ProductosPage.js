import React from "react";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import Notification from "../components/utils/Notification";
import "./ProductosPage.css";
function ProductosPage() {
  const { products, loading, messageError } = useProducts();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/productos/${product._id}`);
  };

  if (loading) {
    return <p className="loading-products">Cargando ...</p>;
  }

  if (messageError) {
    return <Notification message={`Error: ${messageError}`} type={"error"} />;
  }
  /*
    TO DO MAP PRODUCTS ON PRODUCT LIST
         <ul>
                {products.map((product) => (
                    <Link to={`/productos/${product._id}`}>
                        <li key={product._id}>
                            {product.nombre}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
  */
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
