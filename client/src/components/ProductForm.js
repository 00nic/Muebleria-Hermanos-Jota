import { useState } from "react";
import { createProduct } from "../service/products";

const ProductForm = ({ onProductAdded, onError }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "0",
        imagenUrl: "",
        detalle: {
            material: "",
            dimensiones: "",
            color: "",
        },
        destacado: false,
    });

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

        try {
            const precio = parseFloat(formData.precio);

            // Validación básica
            if (!formData.nombre.trim() || !precio || precio <= 0) {
                throw new Error(
                    "Por favor completa los campos requeridos (nombre y precio válido)"
                );
            }

            const productData = {
                nombre: formData.nombre.trim(),
                descripcion: formData.descripcion.trim(),
                precio,
                stock: parseInt(formData.stock, 10) || 0,
                imagenUrl: formData.imagenUrl.trim(),
                destacado: formData.destacado,
            };

            // Agregar detalles solo si tienen valores
            const detalle = Object.entries(formData.detalle)
                .filter(([, value]) => value.trim())
                .reduce(
                    (acc, [key, value]) => ({ ...acc, [key]: value.trim() }),
                    {}
                );

            if (Object.keys(detalle).length > 0) {
                productData.detalle = detalle;
            }

            const newProduct = await createProduct(productData);

            // Limpiar el formulario
            setFormData({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "0",
                imagenUrl: "",
                detalle: {
                    material: "",
                    dimensiones: "",
                    color: "",
                },
                destacado: false,
            });

            // Notificar al componente padre
            onProductAdded?.(newProduct);
        } catch (err) {
            const errorMessage =
                err.message ||
                "Error al crear el producto. Por favor intenta nuevamente.";
            onError?.(errorMessage);
            console.error("Error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="product-form-container">
            <h2 className="product-form-title">Agregar Nuevo Producto</h2>

            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3 className="form-section-title">Información Básica</h3>

                    <div className="form-group">
                        <label className="form-label" htmlFor="nombre">
                            Nombre del Producto{" "}
                            <span className="required">*</span>
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
                        <label className="form-label" htmlFor="imagenUrl">
                            URL de la Imagen
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="imagenUrl"
                            name="imagenUrl"
                            value={formData.imagenUrl}
                            onChange={handleChange}
                            placeholder="Ej: https://nombre-imagen.png"
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
                    <h3 className="form-section-title">
                        Detalles Adicionales (Opcional)
                    </h3>

                    <div className="form-group">
                        <label
                            className="form-label"
                            htmlFor="detalle.material"
                        >
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
                        <label
                            className="form-label"
                            htmlFor="detalle.dimensiones"
                        >
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
