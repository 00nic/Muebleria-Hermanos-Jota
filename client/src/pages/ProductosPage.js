import { useProducts } from "../hooks/useProducts";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useNotification } from "../hooks/useNotification";
import ProductList from "../components/ProductList";
import Notification from "../components/utils/Notification";
import "./ProductosPage.css";

function ProductosPage() {
  const { products, loading, messageError } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const { message, type, setMessage, setType, clearNotifications } =
    useNotification();
  const notificationShown = useRef(false);

  useEffect(() => {
    if (location.state?.notification && !notificationShown.current) {
      notificationShown.current = true;
      setMessage(location.state.notification.message);
      setType(location.state.notification.type);
      setTimeout(() => clearNotifications(), 4000);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setMessage, setType, clearNotifications]);

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
      {message && <Notification message={message} type={type} />}
      <h1>Productos</h1>
      <ProductList catalogo={products} onClick={handleProductClick} />
    </div>
  );
}

export default ProductosPage;
