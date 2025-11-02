import Cart from "../components/Cart";

const CartPage = ({ cart, addItem, removeItem, deleteItem }) => {
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
