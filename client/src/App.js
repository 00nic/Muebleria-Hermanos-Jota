import "./App.css";
import { useState, useEffect } from "react";
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
  const handlerClick = (producto) => setSelectedProduct(producto);
  const onBack = () => setSelectedProduct(null);

  const handlerNameChange = (e) => setNameForm(e.target.value);
  const handlerEmailChange = (e) => setEmailForm(e.target.value);
  const handlerMensajeChange = (e) => setMessageForm(e.target.value);
  const addContact = (e) => {
    e.preventDefault();
    console.log("Nombre:", nameForm);
    console.log("Email:", emailForm);
    console.log("Mensaje:", messageForm);
    setMessage("Mensaje enviado correctamente");
    setTimeout(() => {
      setMessage("");
    }, 10000);
    setNameForm("");
    setEmailForm("");
    setMessageForm("");
  };

  return (
    <div className="App">
      <h1>Muebleria Hermanos Jota</h1>
      <h2>Productos</h2>

      <ProductBox
        catalogo={products}
        handlerClick={handlerClick}
        isLoading={isLoading}
        selectedProduct={selectedProduct}
        onBack={onBack}
        error={error}
        message={message}
      />
      <ContactForm
        nameForm={nameForm}
        emailForm={emailForm}
        messageForm={messageForm}
        handlerNameChange={handlerNameChange}
        handlerEmailChange={handlerEmailChange}
        handlerMensajeChange={handlerMensajeChange}
        addContact={addContact}
        message={message}
        error={error}
      />
      <Footer />
    </div>
  );
}

export default App;
