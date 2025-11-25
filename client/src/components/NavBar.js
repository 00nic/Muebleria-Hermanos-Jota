import { formatearPrecio } from "../utils/formatearPrecio";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Button from "./utils/Button";

const Navbar = ({ cartCount, cartTotal }) => {
    const { isAuthenticated, logout, user } = useAuth();
    if (!isAuthenticated) {
        return (
            <nav className="navbar">
                <Link to="/" className="nav-title nav-link">
                    Mueblería Hermanos Jota
                </Link>
                <Link to="/login" className="nav-link">
                    Login
                </Link>
                <Link className="nav-link" to="/registro">
                    Nuevo Usuario
                </Link>
            </nav>
        );
    }
    return (
        <nav className="navbar">
            <Link to="/" className="nav-title nav-link">
                Mueblería Hermanos Jota
            </Link>
            <span className="nav-link nav-username">
                Bienvenido, {user.username}
            </span>
            <Button
                onClick={logout}
                nameClass="nav-link"
                title="Cerrar sesión"
            />
            <div className="nav-cart">
                <Link className="nav-link" to="/productos">
                    Productos
                </Link>
            </div>
            <div className="nav-cart">
                <Link className="nav-link" to="/contacto">
                    Contacto
                </Link>
            </div>
            <div className="nav-cart">
                <Link className="nav-link" to="/admin/crear-producto">
                    Crear Producto
                </Link>
            </div>
            <div className="nav-cart">
                <Link to="/cart" className="nav-link">
                    🛒 {cartCount} items - {formatearPrecio(cartTotal)}
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;
