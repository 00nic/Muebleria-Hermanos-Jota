import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";
const HeroBanner = () => {
  const navigate = useNavigate();

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
      <Button onClick={handleNavigateToCreateProduct} title="Crear Producto" />
    </div>
  );
};

export default HeroBanner;
