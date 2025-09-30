import "./App.css";
import { useState, useEffect } from "react";
import ProductBox from "./components/ProductBox";

function App() {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/productos");
      const data = await response.json();
      console.log(data);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
      setMessage("Error fetching products");
      setError(true);
      setTimeout(() => {
        setMessage("");
      }, 10000);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="App">
      <h1>Muebleria Hermanos Jota</h1>
      <h2>Productos</h2>

      <ProductBox
        catalogo={products}
        handlerClick={(producto) => setSelectedProduct(producto)}
        isLoading={isLoading}
        selectedProduct={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        error={error}
        message={message}
      />
    </div>
  );
}

export default App;
