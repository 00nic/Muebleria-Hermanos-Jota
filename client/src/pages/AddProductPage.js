import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import ProductForm from "../components/ProductForm";

const AddProductPage = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const handleProductAdded = (newProduct) => {
        showNotification(
            `¡Producto "${newProduct.nombre}" creado exitosamente!`,
            "success"
        );
        navigate(`/productos/${newProduct._id}`);
    };

    const handleError = (errorMessage) => {
        showNotification(errorMessage, "error");
    };

    return (
        <div className="add-product-page">
            <ProductForm
                onProductAdded={handleProductAdded}
                onError={handleError}
            />
        </div>
    );
};

export default AddProductPage;
