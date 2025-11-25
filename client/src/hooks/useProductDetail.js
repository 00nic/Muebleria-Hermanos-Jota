import { useState, useEffect } from "react";
import { getProductById, deleteProduct } from "../service/products";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export function useProductDetail(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getProductById(productId);
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) {
            return false;
        }

        setDeleteError(null);
        setDeleteLoading(true);

        try {
            await deleteProduct(product._id);
            const productName = product.nombre;
            navigate("/productos");
            // Mostrar notificación después de navegar para que se vea en /productos
            setTimeout(() => {
                showNotification(
                    `Producto "${productName}" eliminado correctamente`,
                    "success"
                );
            }, 100);
            return true;
        } catch (error) {
            setDeleteError(error.message);
            return false;
        } finally {
            setDeleteLoading(false);
        }
    };

    return {
        product,
        loading,
        error,
        deleteLoading,
        deleteError,
        handleDelete,
    };
}
