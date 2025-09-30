import ProductDetail from "./ProductDetail";
import Notification from "./utils/Notification";
import ProductList from "./ProductList";
const ProductBox = ({
  catalogo,
  handlerSelect,
  isLoading,
  selectedProduct,
  onBack,
  error,
  message,
  handlerBuy,
}) => {
  if (error && !isLoading)
    return <Notification message={message} error={error} />;
  if (isLoading) return <p>Cargando productos...</p>;
  return (
    <div className="product-box">
      <h2>Productos</h2>
      {!isLoading && catalogo.length === 0 ? (
        <p className="no-products">No hay productos</p>
      ) : !selectedProduct && !error ? (
        <ProductList catalogo={catalogo} onClick={handlerSelect} />
      ) : (
        <ProductDetail
          product={selectedProduct}
          onBack={onBack}
          handlerBuy={handlerBuy}
          message={message}
        />
      )}
    </div>
  );
};
export default ProductBox;
