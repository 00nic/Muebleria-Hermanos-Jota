const ProductCard = ({product, onClick}) => {
    
    return (
        <div onClick={onClick}>
            <h3>{product.nombre}</h3>
            <img src={product.imagenUrl} alt={product.nombre} width="200" />
            <p>{product.descripción}</p>
            <p><strong>Precio: </strong>{product.detalle.precio}</p>{/* 
            Por si piden el articulo Destacado
            {product.destacado && <span className="destacado">Destacado</span>} */}
        </div>
    )
}

export default ProductCard;