import React from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate("/productos");
  };
  const handleNavigateToContact = () => {
    navigate("/contacto");
  };

  return (
    <div className="hero-banner">
      <h1>Bienvenidos a Muebleria Hermanos Jota</h1>
      <p>¡Renová tu hogar con estilo!</p>
      <button onClick={handleNavigateToProducts}>Ver productos</button>
      <button onClick={handleNavigateToContact}>Contacto</button>
    </div>
  );
};

export default HeroBanner;
