const Navbar = ({ cart, onShowCart }) => {
  const cartCount = cart.length;
  const cartTotal = cart.reduce(
    (total, item) => total + item.detalle.precio,
    0
  );

  return (
    <nav>
      <h2>Mueblería Hermanos Jota</h2>
      <div onClick={onShowCart}>
        🛒 {cartCount} item(s) - Total: ${cartTotal.toLocaleString()}
      </div>
    </nav>
  );
};
export default Navbar;
