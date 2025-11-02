import { getImageUrl } from "../service/products";
import { formatearPrecio } from "../utils/formatearPrecio";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <h3 className="product-name">{product.nombre}</h3>
      <img
        className="product-image"
        src={getImageUrl(product.imagenUrl)}
        alt={product.nombre}
        width="200"
      />
      <p className="product-description">{product.descripcion}</p>
      <p className="product-price">
        <strong>Precio: {formatearPrecio(product.precio)}</strong>
      </p>
    </div>
  );
};

export default ProductCard;