import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import ProductosPage from "./pages/ProductosPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
import ContactForm from "./components/ContactForm";
import CartPage from "./pages/CartPage";
import { useCart } from "./hooks/useCart";

function App() {
  const { cart, addItem, removeItem, deleteItem, getCartCount, getCartTotal } =
    useCart();
  return (
    <div>
      <Navbar cartCount={getCartCount()} cartTotal={getCartTotal()} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route
            path="/productos/:id"
            element={<ProductDetailPage addItem={addItem} />}
          />
          <Route path="/admin/crear-producto" element={<AddProductPage />} />
          <Route path="/contacto" element={<ContactForm />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                addItem={addItem}
                removeItem={removeItem}
                deleteItem={deleteItem}
              />
            }
          />
          <Route
            path="*"
            element={
              <div className="no-page">
                <h2>Página no encontrada</h2>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
