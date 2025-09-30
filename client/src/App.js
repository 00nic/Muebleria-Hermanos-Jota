import "./App.css";
import { useState, useEffect } from "react";
import ProductBox from "./components/ProductBox";
import { getProduct } from "./service/products";
function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

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
    </div>
  );
}

export default App;
