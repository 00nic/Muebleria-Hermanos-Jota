import ProductDetail from "./ProductDetail";
import Notification from "./Notification";
import ProductList from "./components/ProductList";
const ProductBox = ({
  catalogo,
  handlerClick,
  isLoading,
  selectedProduct,
  onBack,
  error,
}) => {
  if (error) return <Notification message={message} />;
  if (!isLoading) return <p className="no-products">No hay productos</p>;
  return (
    <div className="product-box">
      {isLoading ? (
        <p>Cargando productos...</p>
      ) : selectedProduct && !error ? (
        <ProductList catalogo={catalogo} onClick={handlerClick} />
      ) : (
        <ProductDetail product={selectedProduct} onBack={onBack} />
      )}
    </div>
  );
};
export default ProductBox;
