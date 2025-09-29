import './App.css';
import ProductDetail from './components/ProductDetail';
import Notification from './components/Notification';
import {useState, useEffect} from 'react';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [message, setMessage]= useState("");
  //const [isLoading, setIsLoading]= useState(true);
  const [error, setError]= useState(false);

  const getProduct = async () => {
        try{
            const response = await fetch("http://localhost:4000/api/productos");
            const data = await response.json();
            console.log(data);
            setProducts(data);
            //setIsLoading(false);
        }
        catch(error){
            console.error("Error fetching products:", error);
            //setIsLoading(false);
            setMessage("Error fetching products");
            setError(true)
            setTimeout(() => {
                setMessage("");
            }, 5000);
        }
    }
  useEffect(() => {
        getProduct();
    }, []);

  if (error) <Notification message={message} />;
  if (!products.length) <p>No hay productos</p>;

  return (
    <div className="App">
      <h1>Muebleria Hermanos Jota</h1>
      <h2>Productos</h2>
      <Notification message={message}/>

       {!selectedProduct ? (
        <ProductList
        catalogo={products}
        onClick={(producto) => setSelectedProduct(producto)}
        />
      ) : (
        <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)}/>
      )}
    </div>
  );
}

export default App;
