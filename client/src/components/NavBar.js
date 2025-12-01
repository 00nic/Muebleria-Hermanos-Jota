import { formatearPrecio } from "../utils/formatearPrecio";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../context/CartContext";
import Button from "./utils/Button";

const Navbar = () => {
    const { isAuthenticated, user } = useAuth();
    const { cartCount, cartTotal } = useCart();
    if (!isAuthenticated) {
        return (
            <nav className="navbar">
                <Link to="/" className="nav-title nav-link">
                    Mueblería Hermanos Jota
                </Link>
                <Link to="/auth?mode=login" className="nav-link">
                    Iniciar sesión
                </Link>
                <Link className="nav-link" to="/auth?mode=register">
                    Crear usuario
                </Link>
            </nav>
        );
    }
    return (
        <nav className="navbar">
            <Link to="/" className="nav-title nav-link">
                Mueblería Hermanos Jota
            </Link>
            <Link to="/perfil" className="nav-link nav-username">
                Mi perfil, {user.username}
            </Link>
            <Link className="nav-link" to="/productos">
                Productos
            </Link>
            <Link className="nav-link" to="/contacto">
                Contacto
            </Link>
            {user.role === "admin" && (
                <Link className="nav-link" to="/admin/crear-producto">
                    Crear Producto
                </Link>
            )}
            <div className="nav-cart">
                <Link to="/cart" className="nav-link">
                    🛒 {cartCount} items - {formatearPrecio(cartTotal)}
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;
