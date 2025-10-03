import Button from "./utils/Button";
import Notification from "./utils/Notification";
import { getImageUrl } from "../service/products";
import { formatearPrecio, parsearPrecio } from "../utils/formatearPrecio";
const ProductDetail = ({ product, onBack, handlerBuy, message }) => {
  return (
    <div className="product-detail">
      <div className="product-detail-left">
        <h2 className="product-detail-name">{product.nombre}</h2>
        <img
          className="product-detail-image"
          src={getImageUrl(product.imagenUrl)}
          alt={product.nombre}
        />
        <p className="product-detail-description">{product.descripción}</p>
        <Button onClick={onBack} title={"Volver"} />
      </div>
      <div className="product-detail-right">
        <h3 className="product-detail-title">Detalles:</h3>
        <ul className="product-detail-list">
          {Object.entries(product.detalle).map(([key, detalle]) => (
            <li className={`product-detail-item ${key}`} key={key}>
              {key === "precio" ? formatearPrecio(parsearPrecio(detalle)) : detalle}
            </li>
          ))}
        </ul>
        <Notification message={message} error={false} />
        <Button
          nameClass={"producto-boton-comprar"}
          onClick={() => handlerBuy(product)}
          title={"Comprar"}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
