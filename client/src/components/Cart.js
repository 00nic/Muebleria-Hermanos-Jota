import Button from "./utils/Button";
import { formatearPrecio } from "../utils/formatearPrecio";

const Cart = ({
    cart,
    deleteItem,
    addItem,
    removeItem,
    handleCheckout,
    isProcessing,
    cartTotal,
}) => {
    if (cart.length === 0)
        return <p className="cart-empty">Tu carrito está vacío.</p>;

    return (
        <div className="cart">
            <h2 className="cart-title">Carrito de Compras</h2>
            <div className="cart-table-wrapper">
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
                        {cart.map((product) => {
                            const productId = product._id;
                            const quantity = product.quantity || 1;
                            return (
                                <tr key={productId}>
                                    <td className="cart-product-name">
                                        {product.nombre}
                                    </td>
                                    <td className="cart-price">
                                        {formatearPrecio(product.precio)}
                                    </td>
                                    <td>{quantity}</td>
                                    <td className="cart-subtotal">
                                        {formatearPrecio(
                                            product.precio * quantity
                                        )}
                                    </td>
                                    <td>
                                        <div className="cart-buttons">
                                            <Button
                                                onClick={() =>
                                                    deleteItem(productId)
                                                }
                                                title="Eliminar"
                                                nameClass="btn-cart btn-delete"
                                            />
                                            <Button
                                                title="➕"
                                                onClick={() => addItem(product)}
                                                nameClass="btn-cart btn-quantity"
                                            />
                                            <Button
                                                title="➖"
                                                onClick={() =>
                                                    removeItem(productId)
                                                }
                                                nameClass="btn-cart btn-quantity"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="cart-summary">
                <h3 className="cart-total">
                    Total: {formatearPrecio(cartTotal)}
                </h3>
                <Button
                    onClick={handleCheckout}
                    title={isProcessing ? "Procesando..." : "Finalizar Compra"}
                    nameClass="btn-checkout"
                    disabled={isProcessing}
                />
            </div>
        </div>
    );
};

export default Cart;
