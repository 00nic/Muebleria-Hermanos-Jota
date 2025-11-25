import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";

const CartPage = () => {
    const { cart, addItem, removeItem, deleteItem } = useCart();

    return (
        <Cart
            cart={cart}
            addItem={addItem}
            removeItem={removeItem}
            deleteItem={deleteItem}
        />
    );
};

export default CartPage;
