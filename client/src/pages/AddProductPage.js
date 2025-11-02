import ProductForm from "../components/ProductForm";

const AddProductPage = () => {
  const handleProductAdded = (newProduct) => {
    console.log("Producto agregado:", newProduct);
    // Aquí podrías agregar lógica adicional como redireccionar o actualizar una lista
  };

  return (
    <div className="add-product-page">
      <ProductForm onProductAdded={handleProductAdded} />
    </div>
  );
};

export default AddProductPage;

