import Button from "./utils/Button";
const Cart = ({ cart, deleteItem, addItem, removeItem }) => {
  if (cart.length === 0) return <p>Tu carrito está vacío.</p>;

  // Función para contar la cantidad de cada producto por ID
  const getProductQuantities = () => {
    // Primero creamos el objeto con el conteo
    const productQuantities = cart.reduce((acc, item) => {
      const id = item.id;
      if (acc[id]) {
        acc[id] = {
          ...item,
          quantity: acc[id].quantity + 1,
        };
      } else {
        acc[id] = {
          ...item,
          quantity: 1,
        };
      }
      return acc;
    }, {});

    // Convertimos el objeto a array de pares [id, cantidad]
    return Object.values(productQuantities);
  };

  const listProductsById = getProductQuantities();
  return (
    <div>
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
          {listProductsById.map((product) => (
            <tr key={product.id}>
              <td style={styles.td}>{product.nombre}</td>
              <td style={styles.td}>{product.detalle.precio}</td>
              <td style={styles.td}>{product.quantity}</td>
              <td style={styles.td}>
                ${parseInt(product.detalle.precio.slice(1)) * product.quantity}
              </td>
              <td style={styles.td}>
                <Button
                  onClick={() => deleteItem(product.id)}
                  title={"Eliminar"}
                />
                <Button
                  title={"➕"}
                  onClick={() => {
                    addItem(product);
                  }}
                />
                <Button
                  title={"➖"}
                  onClick={() => {
                    removeItem(product.id);
                  }}
                />
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
