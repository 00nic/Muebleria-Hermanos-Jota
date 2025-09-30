const ProductDetail = ({ product, onBack }) => {
  return (
    <div className="product-detail">
      <h2>{product.nombre}</h2>
      <img src={product.imagenUrl} alt={product.nombre} />
      <p>{product.descripción}</p>
      <h3>Detalles:</h3>
      <ul>
        {Object.entries(product.detalle).map(([key, detalle]) => (
          <li key={key}>{detalle}</li>
        ))}
      </ul>
      <button onClick={onBack}>Volver</button>
    </div>
  );
};

export default ProductDetail;
