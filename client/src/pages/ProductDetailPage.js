import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import { useNotification } from "../context/NotificationContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";
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
    const { showNotification, clearNotifications, type } = useNotification();

    useEffect(() => {
        if (loading) {
            // Solo mostrar loading si no hay una notificación de success o error activa
            if (type !== "success" && type !== "error") {
                showNotification("Cargando producto...", "loading");
            }
        } else {
            // Solo limpiar si es una notificación de loading, NO tocar success/error
            if (type === "loading") {
                clearNotifications();
            }
        }
    }, [loading, showNotification, clearNotifications, type]);

    // Mostrar error si hay problema cargando el producto
    useEffect(() => {
        if (error) {
            showNotification(`Error: ${error}`, "error-loading");
        }
    }, [error, showNotification]);

    // Mostrar error si hay problema eliminando
    useEffect(() => {
        if (deleteError) {
            showNotification(deleteError, "error");
        }
    }, [deleteError, showNotification]);

    // Mostrar loading cuando está eliminando
    useEffect(() => {
        if (deleteLoading) {
            showNotification("Eliminando producto...", "loading");
        }
    }, [deleteLoading, showNotification]);

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
