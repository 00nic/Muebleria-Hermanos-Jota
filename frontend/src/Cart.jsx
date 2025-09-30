import React from "react";

const Cart = ({ cart, onUpdateQuantity }) => {
  const cartItems = Object.values(cart);

  if (cartItems.length === 0) return <p style={{ padding: "20px" }}>Tu carrito está vacío.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Carrito de Compras</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.th}>Producto</th>
            <th style={styles.th}>Precio</th>
            <th style={styles.th}>Cantidad</th>
            <th style={styles.th}>Subtotal</th>
            <th style={styles.th}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ product, quantity }) => (
            <tr key={product.id}>
              <td style={styles.td}>{product.nombre}</td>
              <td style={styles.td}>${product.detalle.precio.toLocaleString()}</td>
              <td style={styles.td}>
                <input
                  type="number"
                  value={quantity}
                  min="0"
                  onChange={(e) => onUpdateQuantity(product.id, parseInt(e.target.value))}
                  style={{ width: "50px" }}
                />
              </td>
              <td style={styles.td}>${(product.detalle.precio * quantity).toLocaleString()}</td>
              <td style={styles.td}>
                <button onClick={() => onUpdateQuantity(product.id, 0)} style={styles.removeBtn}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: { border: "1px solid #ccc", padding: "10px" },
  td: { border: "1px solid #ccc", padding: "10px", textAlign: "center" },
  removeBtn: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Cart;
