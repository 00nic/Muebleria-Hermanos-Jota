import { formatearPrecio } from "../utils/formatearPrecio";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../context/CartContext";
import Button from "./utils/Button";

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const { cartCount, cartTotal } = useCart();
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
            <Button
                onClick={logout}
                nameClass="nav-cart nav-link"
                title="Cerrar sesión"
            />
            <div className="nav-cart">
                <Link to="/perfil" className="nav-link nav-username">
                    Mi perfil, {user.username}
                </Link>
            </div>

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
            {user.role === "admin" && (
                <div className="nav-cart">
                    <Link className="nav-link" to="/admin/crear-producto">
                        Crear Producto
                    </Link>
                </div>
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
