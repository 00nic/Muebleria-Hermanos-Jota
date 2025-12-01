import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import { useNotification } from "../context/NotificationContext";
import {
    useLoadingNotification,
    useErrorNotification,
} from "../hooks/useNotifications";
import { useCart } from "../context/CartContext";
import { useAuth } from "../auth/AuthContext";
import ProductDetail from "../components/ProductDetail";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { user } = useAuth();
    const {
        product,
        loading,
        error,
        deleteLoading,
        deleteError,
        handleDelete,
    } = useProductDetail(id);
    const { showNotification } = useNotification();

    // Usar hooks personalizados para manejar notificaciones
    useLoadingNotification(loading, "Cargando producto...");
    useErrorNotification(error, "Error");
    useLoadingNotification(deleteLoading, "Eliminando producto...");
    useErrorNotification(deleteError, "Error");

    const handleAddToCart = () => {
        if (product) {
            addItem(product);
            console.log("Producto agregado al carrito:", product);
            showNotification(
                `${product.nombre} agregado al carrito!`,
                "success"
            );
        }
    };

    const handleBack = () => {
        navigate("/productos");
    };

    // Solo los admin pueden eliminar productos
    const isAdmin = user?.role === "admin";

    if (!product && !loading) {
        return null; // No hay producto y no está cargando
    }

    return (
        <div className="main">
            {product && (
                <ProductDetail
                    product={product}
                    onBack={handleBack}
                    onBuy={handleAddToCart}
                    onDelete={isAdmin ? handleDelete : null}
                    deleteLoading={deleteLoading}
                />
            )}
        </div>
    );
}
