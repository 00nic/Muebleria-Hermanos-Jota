import "./App.css";
import { useState, useEffect } from "react";
import ProductBox from "./components/ProductBox";
import { getProduct } from "./services/productService";
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
        setMessage("Error fetching products");
        setIsLoading(false);
      }
    };
    fetchData();
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
