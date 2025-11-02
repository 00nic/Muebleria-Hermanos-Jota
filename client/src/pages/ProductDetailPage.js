import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import { useNotification } from "../hooks/useNotification";
import { useEffect, useRef } from "react";
import ProductDetail from "../components/ProductDetail";
import Notification from "../components/utils/Notification";
import "./ProductDetailPage.css";

export default function ProductDetailPage({ addItem }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { product, loading, error, deleteLoading, deleteError, handleDelete } =
    useProductDetail(id);
  const { message, type, setMessage, setType, clearNotifications } =
    useNotification();
  const notificationShown = useRef(false);

  // Mostrar notificación si viene desde la creación del producto
  useEffect(() => {
    if (location.state?.notification && !notificationShown.current) {
      notificationShown.current = true;
      setMessage(location.state.notification.message);
      setType(location.state.notification.type);

      // Limpiar después de 5 segundos
      setTimeout(() => clearNotifications(), 5000);

      // Limpiar el state de location para evitar que se muestre de nuevo
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setMessage, setType, clearNotifications]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setMessage(`${product.nombre} agregado al carrito!`);
      setType("success");
      setTimeout(() => clearNotifications(), 3000);
    }
  };

  const handleBack = () => {
    navigate("/productos");
  };

  if (loading) {
    return <p className="loading-message">Cargando datos del producto...</p>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">
          No fue posible obtener los datos: {error}
        </p>
        <Link to="/productos" className="back-link">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <p className="error-message">Producto no encontrado</p>
        <Link to="/productos" className="back-link">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="main">
      {message && <Notification message={message} type={type} />}

      <ProductDetail
        product={product}
        onBack={handleBack}
        onBuy={handleAddToCart}
        onDelete={handleDelete}
        deleteLoading={deleteLoading}
      />

      {deleteError && <Notification message={deleteError} type="error" />}
    </div>
  );
}
