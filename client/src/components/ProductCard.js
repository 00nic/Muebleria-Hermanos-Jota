import { getImageUrl } from "../service/products";
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
      <p className="product-description">{product.descripción}</p>
      <p className="product-price">
        <strong>
          Precio:
          {product.detalle.precio}
        </strong>
      </p>
      {/* 
            Por si piden el articulo Destacado
            {product.destacado && <span className="destacado">Destacado</span>} */}
    </div>
  );
};

export default ProductCard;
