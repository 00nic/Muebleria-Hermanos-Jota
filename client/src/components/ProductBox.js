import ProductDetail from "./ProductDetail";
import Notification from "./Notification";
import ProductList from "./ProductList";
const ProductBox = ({
  catalogo,
  handlerClick,
  isLoading,
  selectedProduct,
  onBack,
  error,
  message,
}) => {
  if (error) return <Notification message={message} error={error} />;
  if (isLoading) return <p>Cargando productos...</p>;
  return (
    <div className="product-box">
      {!isLoading && catalogo.length === 0 ? (
        <p className="no-products">No hay productos</p>
      ) : !selectedProduct && !error ? (
        <ProductList catalogo={catalogo} onClick={handlerClick} />
      ) : (
        <ProductDetail product={selectedProduct} onBack={onBack} />
      )}
    </div>
  );
};
export default ProductBox;
