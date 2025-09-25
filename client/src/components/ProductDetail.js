const ProductDetail = ({ product, onBack }) => {

    return (
        <div className="product-detail">
            <button onClick={onBack}>Volver</button>
            <h2>{product.nombre}</h2>
            <img src={product.imagenUrl} alt={product.nombre} />
            <p>{product.descripción}</p>
            <h3>Detalles:</h3>
            <ul>
                {Object.entries(product.detalle).map(([key, detalle]) => (
                    <li key={key}>{detalle}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductDetail;