import { useAuth } from "../auth/AuthContext";
import { Route, Navigate, Routes } from "react-router-dom";
import ProductosPage from "../pages/ProductosPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AddProductPage from "../pages/AddProductPage";
import ContactForm from "../pages/ContactForm";
import CartPage from "../pages/CartPage";
import LoginForm from "../components/auth/LoginForm";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productos/:id" element={<ProductDetailPage />} />
            <Route path="/admin/crear-producto" element={<AddProductPage />} />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
                path="*"
                element={
                    <div className="no-page">
                        <h2>Página no encontrada</h2>
                    </div>
                }
            />
        </Routes>
    );
};
export default AppRoutes;
