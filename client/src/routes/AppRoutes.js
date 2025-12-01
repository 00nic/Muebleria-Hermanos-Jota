import { Route, Routes } from "react-router-dom";
import ProductosPage from "../pages/ProductosPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AddProductPage from "../pages/AddProductPage";
import ContactForm from "../pages/ContactForm";
import CartPage from "../pages/CartPage";
import LoginForm from "../components/auth/LoginForm";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import MisPedidosPage from "../pages/MisPedidosPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import RegisterPage from "../pages/RegisterPage";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterPage />} />
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
                path="/mis-pedidos"
                element={
                    <ProtectedRoute>
                        <MisPedidosPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
export default AppRoutes;
