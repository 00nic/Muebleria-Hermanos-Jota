import { useState } from "react";
import ProductDetail from "./ProductDetail";
import Notification from "./utils/Notification";
import ProductList from "./ProductList";
import ContactForm from "./ContactForm";

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
  return (
    <div className="product-box">
      {isLoading ? (
        <p className="loading-products">Cargando productos...</p>
      ) : error ? (
        <div className="error-load">
          <Notification message={message} error={error} />
        </div>
      ) : !selectedProduct && catalogo.length > 0 ? (
        <>
          <h2 className="product-box-title">Productos</h2>
          <ProductList catalogo={catalogo} onClick={handlerSelect} />
          <ContactForm />
        </>
      ) : selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={onBack}
          handlerBuy={handlerBuy}
          message={message}
        />
      ) : (
        <p className="no-products">No hay productos</p>
      )}
    </div>
  );
};
export default ProductBox;
