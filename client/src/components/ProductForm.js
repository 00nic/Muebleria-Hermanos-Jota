import { useState } from "react";
import { createProduct } from "../service/products";
import Notification from "./utils/Notification";

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "0",
    imageUrl: "",
    detalle: {
      precio: "",
      material: "",
      dimensiones: "",
      color: "",
    },
    destacado: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("detalle.")) {
      const detalleKey = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        detalle: {
          ...prevState.detalle,
          [detalleKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(false);
    setMessage("");

    try {
      // Preparar los datos para enviar
      const productData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock) || 0,
        imageUrl: formData.imageUrl.trim(),
        destacado: formData.destacado,
      };

      // Si hay detalles, agregarlos al objeto
      if (
        formData.detalle.precio ||
        formData.detalle.material ||
        formData.detalle.dimensiones ||
        formData.detalle.color
      ) {
        const detalle = {};
        if (formData.detalle.precio) {
          detalle.precio = formData.detalle.precio;
        }
        if (formData.detalle.material) {
          detalle.material = formData.detalle.material.trim();
        }
        if (formData.detalle.dimensiones) {
          detalle.dimensiones = formData.detalle.dimensiones.trim();
        }
        if (formData.detalle.color) {
          detalle.color = formData.detalle.color.trim();
        }
        productData.detalle = detalle;
      }

      // Validación básica
      if (!productData.nombre || !productData.precio || productData.precio <= 0) {
        throw new Error("Por favor completa los campos requeridos (nombre y precio válido)");
      }

      const newProduct = await createProduct(productData);
      setMessage(`¡Producto "${newProduct.nombre}" creado exitosamente!`);
      setError(false);

      // Limpiar el formulario
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "0",
        imageUrl: "",
        detalle: {
          precio: "",
          material: "",
          dimensiones: "",
          color: "",
        },
        destacado: false,
      });

      // Notificar al componente padre si existe la función
      if (onProductAdded) {
        onProductAdded(newProduct);
      }

      // Limpiar el mensaje después de 5 segundos
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (err) {
      setError(true);
      setMessage(err.message || "Error al crear el producto. Por favor intenta nuevamente.");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="product-form-title">Agregar Nuevo Producto</h2>

      {message && <Notification message={message} error={error} />}

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="form-section-title">Información Básica</h3>

          <div className="form-group">
            <label className="form-label" htmlFor="nombre">
              Nombre del Producto <span className="required">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Mesa de Comedor"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="form-textarea"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el producto..."
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="precio">
                Precio <span className="required">*</span>
              </label>
              <input
                className="form-input"
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="stock">
                Stock
              </label>
              <input
                className="form-input"
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="imageUrl">
              URL de la Imagen
            </label>
            <input
              className="form-input"
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Ej: nombre-imagen.png"
            />
          </div>

          <div className="form-group form-checkbox">
            <label className="form-label-checkbox">
              <input
                type="checkbox"
                name="destacado"
                checked={formData.destacado}
                onChange={handleChange}
              />
              <span>Producto destacado</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Detalles Adicionales (Opcional)</h3>

          <div className="form-group">
            <label className="form-label" htmlFor="detalle.precio">
              Precio en Detalle
            </label>
            <input
              className="form-input"
              type="text"
              id="detalle.precio"
              name="detalle.precio"
              value={formData.detalle.precio}
              onChange={handleChange}
              placeholder="Ej: $150.000"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="detalle.material">
              Material
            </label>
            <input
              className="form-input"
              type="text"
              id="detalle.material"
              name="detalle.material"
              value={formData.detalle.material}
              onChange={handleChange}
              placeholder="Ej: Madera de pino"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="detalle.dimensiones">
              Dimensiones
            </label>
            <input
              className="form-input"
              type="text"
              id="detalle.dimensiones"
              name="detalle.dimensiones"
              value={formData.detalle.dimensiones}
              onChange={handleChange}
              placeholder="Ej: 200cm x 100cm x 75cm"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="detalle.color">
              Color
            </label>
            <input
              className="form-input"
              type="text"
              id="detalle.color"
              name="detalle.color"
              value={formData.detalle.color}
              onChange={handleChange}
              placeholder="Ej: Natural, Marrón"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
