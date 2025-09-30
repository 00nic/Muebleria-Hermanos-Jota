import React from "react";

const ProductDetail = ({ product, onBack, onAddToCart }) => {
  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>← Volver</button>
      <h2>{product.nombre}</h2>
      <img src={product.imagenUrl} alt={product.nombre} width="300" style={styles.img}/>
      <p>{product.descripción}</p>
      <ul>
        {product.detalle.medidas && <li>Medidas: {product.detalle.medidas}</li>}
        {product.detalle.materiales && <li>Materiales: {product.detalle.materiales}</li>}
        {product.detalle.acabado && <li>Acabado: {product.detalle.acabado}</li>}
        {product.detalle.precio && <li>Precio: ${product.detalle.precio.toLocaleString()}</li>}
      </ul>
      <button onClick={() => onAddToCart(product)} style={styles.addBtn}>
        Añadir al Carrito
      </button>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  backBtn: { marginBottom: "10px" },
  img: { margin: "10px 0" },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default ProductDetail;
