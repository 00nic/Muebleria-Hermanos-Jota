import React from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
    const navigate = useNavigate();

    const handleNavigateToProducts = () => {
        navigate('/productos')
    }

    return (
        <div className="hero-banner">
            <h1>Bienvenidos a Muebleria Hermanos Jota</h1>
            <p>¡Renová tu hogar con estilo!</p>
            <button onClick={handleNavigateToProducts}>
                Ver productos
            </button>
        </div>
    )
}

export default HeroBanner;