const Navbar = ({ cart, onShowCart, onBack }) => {
  const cartCount = cart.length;
  //recibe un array donde el atributo detalle, tiene precio y el primer string es $
  const cartTotal = cart.reduce(
    (total, item) => total + parseInt(item.detalle.precio.slice(1)),
    0
  );

  return (
    <nav className="navbar">
      <h2 className="nav-title" onClick={onBack}>
        Mueblería Hermanos Jota
      </h2>
      <div className="nav-cart" onClick={onShowCart}>
        🛒 {cartCount} item(s) - Total: ${cartTotal}
      </div>
    </nav>
  );
};
export default Navbar;
