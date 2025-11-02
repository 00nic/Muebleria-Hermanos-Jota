import { useParams, useLocation, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (location.state?.notification && !notificationShown.current) {
      notificationShown.current = true;
      setMessage(location.state.notification.message);
      setType(location.state.notification.type);
      setTimeout(() => clearNotifications(), 5000);
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
    return <p className="loading-products">Cargando datos del producto...</p>;
  }

  if (error) {
    return <Notification message={`Error: ${error}`} type="error" />;
  }

  if (!product) {
    return <Notification message="Producto no encontrado" type="error" />;
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
