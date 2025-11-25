import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { useEffect } from "react";
import ProductList from "../components/ProductList";
import "./ProductosPage.css";

function ProductosPage() {
    const { products, loading, messageError } = useProducts();
    const navigate = useNavigate();
    const { showNotification, clearNotifications, type } = useNotification();

    // Mostrar loading cuando está cargando productos
    // PERO NO sobrescribir notificaciones de success/error
    useEffect(() => {
        if (loading) {
            // Solo mostrar loading si no hay una notificación de success o error activa
            if (type !== "success" && type !== "error") {
                showNotification("Cargando productos...", "loading");
            }
        } else {
            // Solo limpiar si es una notificación de loading, NO tocar success/error
            if (type === "loading") {
                clearNotifications();
            }
        }
    }, [loading, showNotification, clearNotifications, type]);

    // Mostrar error si hay problema cargando productos
    useEffect(() => {
        if (messageError) {
            showNotification(`Error: ${messageError}`, "error-loading");
        }
    }, [messageError, showNotification]);

    const handleProductClick = (product) => {
        navigate(`/productos/${product._id}`);
    };

    return (
        <div className="contenedor">
            <h1>Productos</h1>
            {!loading && (
                <ProductList catalogo={products} onClick={handleProductClick} />
            )}
        </div>
    );
}

export default ProductosPage;
