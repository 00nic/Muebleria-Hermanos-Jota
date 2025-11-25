import { Route, Routes } from "react-router-dom";
import ProductosPage from "../pages/ProductosPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AddProductPage from "../pages/AddProductPage";
import ContactForm from "../pages/ContactForm";
import CartPage from "../pages/CartPage";
import LoginForm from "../components/auth/LoginForm";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomePage />} />
            <Route
                path="/perfil"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/productos"
                element={
                    <ProtectedRoute>
                        <ProductosPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/productos/:id"
                element={
                    <ProtectedRoute>
                        <ProductDetailPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/crear-producto"
                element={
                    <AdminRoute>
                        <AddProductPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/contacto"
                element={
                    <ProtectedRoute>
                        <ContactForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
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
    );
};
export default AppRoutes;
