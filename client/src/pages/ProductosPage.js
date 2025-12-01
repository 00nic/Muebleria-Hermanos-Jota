import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import {
    useLoadingNotification,
    useErrorNotification,
} from "../hooks/useNotifications";
import ProductList from "../components/ProductList";
import "./ProductosPage.css";

function ProductosPage() {
    const { products, loading, messageError } = useProducts();
    const navigate = useNavigate();

    // Usar hooks personalizados para manejar notificaciones
    useLoadingNotification(loading, "Cargando productos...");
    useErrorNotification(messageError, "Error");

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
