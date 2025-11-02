import { formatearPrecio, parsearPrecio } from "../utils/formatearPrecio";
import { Link } from "react-router-dom";

const Navbar = ({ cart, onShowCart, onBack }) => {
  const cartCount = cart.length;
  //recibe un array donde el atributo detalle, tiene precio y el primer string es $
  const cartTotal = cart.reduce(
    (total, item) => total + parsearPrecio(item.precio), 0
  );

  return (
    <nav className="navbar">
      <Link className='nav-link' to='/'>Inicio</Link>
      <Link className='nav-link' to='/productos'>Productos</Link>

      <h2 className="nav-title" onClick={onBack}>
        Mueblería Hermanos Jota
      </h2>
      <div className="nav-cart" onClick={onShowCart}>
        🛒 {cartCount} item(s) - Total: {formatearPrecio(cartTotal)}
      </div>
    </nav>
  );
};
export default Navbar;
