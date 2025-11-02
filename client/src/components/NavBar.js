import { formatearPrecio } from "../utils/formatearPrecio";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, cartTotal }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-title nav-link">
        Mueblería Hermanos Jota
      </Link>
      <Link className="nav-link" to="/">
        Inicio
      </Link>
      <Link className="nav-link" to="/productos">
        Productos
      </Link>
      <Link className="nav-link" to="/contacto">
        Contacto
      </Link>
      <Link className="nav-link" to="/admin/crear-producto">
        Crear Producto
      </Link>
      <div className="nav-cart">
        <Link to="/cart" className="nav-link">
          🛒 {cartCount} items - {formatearPrecio(cartTotal)}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
