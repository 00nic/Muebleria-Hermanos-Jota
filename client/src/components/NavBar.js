import { formatearPrecio } from "../utils/formatearPrecio";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cartCount, cartTotal }) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/");
  };
  return (
    <nav className="navbar">
      <h2 className="nav-title" onClick={onBack}>
        Mueblería Hermanos Jota
      </h2>
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
