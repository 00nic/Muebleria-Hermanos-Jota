import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
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
    return <Notification message={`Error: ${messageError}`} type="error" />;
  }

  return (
    <div className="contenedor">
      <h1>Productos</h1>
      <ProductList catalogo={products} onClick={handleProductClick} />
    </div>
  );
}

export default ProductosPage;
