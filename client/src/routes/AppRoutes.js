import { Route, Routes, Navigate } from "react-router-dom";
import ProductosPage from "../pages/ProductosPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AddProductPage from "../pages/AddProductPage";
import ContactForm from "../pages/ContactForm";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AuthPage from "../pages/AuthPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />
            <Route path="/register" element={<Navigate to="/auth?mode=register" replace />} />
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
