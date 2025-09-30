import Button from "./utils/Button";
const Cart = ({ cart, deleteItem, addItem, removeItem }) => {
  if (cart.length === 0)
    return <p className="cart-empty">Tu carrito está vacío.</p>;

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
    <div className="cart">
      <h2 className="cart-title">Carrito de Compras</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {listProductsById.map((product) => (
            <tr key={product.id}>
              <td className="cart-product-name">{product.nombre}</td>
              <td className="cart-price">{product.detalle.precio}</td>
              <td>{product.quantity}</td>
              <td className="cart-subtotal">
                ${parseInt(product.detalle.precio.slice(1)) * product.quantity}
              </td>
              <td>
                <div className="cart-buttons">
                  <Button
                    onClick={() => deleteItem(product.id)}
                    title={"Eliminar"}
                    nameClass="btn-cart btn-delete"
                  />
                  <Button
                    title={"➕"}
                    onClick={() => {
                      addItem(product);
                    }}
                    nameClass="btn-cart btn-quantity"
                  />
                  <Button
                    title={"➖"}
                    onClick={() => {
                      removeItem(product.id);
                    }}
                    nameClass="btn-cart btn-quantity"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
