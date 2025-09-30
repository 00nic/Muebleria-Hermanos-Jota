const Navbar = ({ cart, onShowCart }) => {
  const cartCount = cart.length;
  //recibe un array donde el atributo detalle, tiene precio y el primer string es $
  const cartTotal = cart.reduce(
    (total, item) => total + parseInt(item.detalle.precio.slice(1)),
    0
  );

  return (
    <nav>
      <h2>Mueblería Hermanos Jota</h2>
      <div onClick={onShowCart}>
        🛒 {cartCount} item(s) - Total: ${cartTotal}
      </div>
    </nav>
  );
};
export default Navbar;
