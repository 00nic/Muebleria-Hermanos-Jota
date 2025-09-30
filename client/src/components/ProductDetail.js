import Button from "./utils/Button";
import Notification from "./utils/Notification";
import { getImageUrl } from "../service/products";
const ProductDetail = ({ product, onBack, handlerBuy, message }) => {
  return (
    <div className="product-detail">
      <Button onClick={onBack} title={"Volver"} />
      <h2>{product.nombre}</h2>
      <img src={getImageUrl(product.imagenUrl)} alt={product.nombre} />
      <p>{product.descripción}</p>
      <h3>Detalles:</h3>
      <ul>
        {Object.entries(product.detalle).map(([key, detalle]) => (
          <li key={key}>{detalle}</li>
        ))}
      </ul>
      <Notification message={message} error={false} />
      <Button onClick={() => handlerBuy(product)} title={"Comprar"} />
    </div>
  );
};

export default ProductDetail;
