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
  const [nameForm, setNameForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [messageForm, setMessageForm] = useState("");
  const [messageSucessForm, setMessageSucessForm] = useState("");

  const handlerNameChange = (e) => setNameForm(e.target.value);
  const handlerEmailChange = (e) => setEmailForm(e.target.value);
  const handlerMensajeChange = (e) => setMessageForm(e.target.value);

  const addContact = (e) => {
    e.preventDefault();
    console.log("Nombre:", nameForm);
    console.log("Email:", emailForm);
    console.log("Mensaje:", messageForm);
    setMessageSucessForm("Mensaje enviado correctamente");
    setTimeout(() => {
      setMessageSucessForm("");
    }, 5000);
    setNameForm("");
    setEmailForm("");
    setMessageForm("");
  };

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
          <ContactForm
            nameForm={nameForm}
            emailForm={emailForm}
            messageForm={messageForm}
            handlerNameChange={handlerNameChange}
            handlerEmailChange={handlerEmailChange}
            handlerMensajeChange={handlerMensajeChange}
            addContact={addContact}
            messageSucessForm={messageSucessForm}
            error={error}
          />
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
