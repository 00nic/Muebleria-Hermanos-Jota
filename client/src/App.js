import "./App.css";
import { useState, useEffect } from "react";
import Cart from "./components/Cart";
import Navbar from "./components/NavBar";
import ProductBox from "./components/ProductBox";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

import { getProduct } from "./service/products";
function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [nameForm, setNameForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [messageForm, setMessageForm] = useState("");
  const [messageSucessForm, setMessageSucessForm] = useState("");

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setMessage(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };
  const addItem = (product) => {
    setCart([...cart, product]);
  };
  const removeItem = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };
  const handlerSelect = (producto) => setSelectedProduct(producto);
  const onBack = () => {
    setSelectedProduct(null);
    setMessage("");
    setMessageSucessForm("");
  };
  const handlerBuy = (producto) => {
    setCart([...cart, producto]);
    setMessage("Producto agregado al carrito");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

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
    }, 10000);
    setNameForm("");
    setEmailForm("");
    setMessageForm("");
  };
  return (
    <div className="App">
      <Navbar cart={cart} onShowCart={() => setShowCart(!showCart)} />

      {showCart ? (
        <Cart
          cart={cart}
          deleteItem={deleteItem}
          removeItem={removeItem}
          addItem={addItem}
        />
      ) : (
        <>
          <ProductBox
            catalogo={products}
            handlerSelect={handlerSelect}
            isLoading={isLoading}
            selectedProduct={selectedProduct}
            onBack={onBack}
            error={error}
            message={message}
            handlerBuy={handlerBuy}
          />
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
      )}

      <Footer />
    </div>
  );
}

export default App;
