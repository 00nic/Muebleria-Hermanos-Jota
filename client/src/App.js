import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import ProductosPage from "./pages/ProductosPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <div>
      <Navbar cart={[]} />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/productos' element={<ProductosPage />} />
          <Route path='/productos/:id' element= {< ProductDetailPage /> } /> 
          <Route path='/contacto' element= {<div /> } /> 
          <Route path='/admin/crear-producto' element= {< div /> } /> 
        </Routes>
      </main>
    </div>
  )
}

export default App;
