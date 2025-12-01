import { getImageUrl } from "../service/products";
import { formatearPrecio } from "../utils/formatearPrecio";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import Button from "./utils/Button";

const ProductCard = ({ product, onClick }) => {
    const imageUrl = getImageUrl(product.imagenUrl);
    const { addItem } = useCart();
    const { showNotification } = useNotification();

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Evitar que se ejecute el onClick del card
        addItem(product);
        showNotification(`${product.nombre} agregado al carrito!`, "success");
    };

    return (
        <div className="product-card" onClick={onClick}>
            <h3 className="product-name">{product.nombre}</h3>
            {imageUrl && (
                <img
                    className="product-image"
                    src={imageUrl}
                    alt={product.nombre}
                />
            )}
            <p className="product-description">{product.descripcion}</p>
            <p className="product-price">
                <strong>Precio: {formatearPrecio(product.precio)}</strong>
            </p>
            <Button
                onClick={handleAddToCart}
                title="Añadir al Carrito"
                nameClass="producto-boton agregar-carrito"
            />
        </div>
    );
};

export default ProductCard;
