import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import { useAuth } from "../../auth/AuthContext";
const HeroBanner = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleNavigateToProducts = () => {
        navigate("/productos");
    };
    const handleNavigateToContact = () => {
        navigate("/contacto");
    };
    const handleNavigateToCreateProduct = () => {
        navigate("/admin/crear-producto");
    };
    return (
        <div className="hero-banner">
            <h1>Bienvenidos a Muebleria Hermanos Jota</h1>
            <p>¡Renová tu hogar con estilo!</p>
            <Button onClick={handleNavigateToProducts} title="Ver productos" />
            <Button onClick={handleNavigateToContact} title="Contacto" />
            {user?.role === "admin" && (
                <Button
                    onClick={handleNavigateToCreateProduct}
                    title="Crear Producto"
                />
            )}
        </div>
    );
};

export default HeroBanner;
