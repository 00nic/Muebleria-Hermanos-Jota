import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const AddProductPage = () => {
  const navigate = useNavigate();

  const handleProductAdded = (newProduct) => {
    navigate(`/productos/${newProduct._id}`, {
      state: { 
        notification: {
          message: `¡Producto "${newProduct.nombre}" creado exitosamente!`,
          type: "success"
        }
      }
    });
  };

  return (
    <div className="add-product-page">
      <ProductForm onProductAdded={handleProductAdded} />
    </div>
  );
};

export default AddProductPage;
