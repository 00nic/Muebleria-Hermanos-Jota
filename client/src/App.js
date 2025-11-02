import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import ProductosPage from "./pages/ProductosPage";
import AddProductPage from "./pages/AddProductPage";
import ContactForm from "./components/ContactForm";
// add import use state

function App() {
  return (
    <div>
      <Navbar cart={[]} />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/productos' element={<ProductosPage />} />
          <Route path='/agregar-producto' element={<AddProductPage />} />
          <Route path="/contacto" element={<ContactForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
