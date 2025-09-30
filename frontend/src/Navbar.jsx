import React from "react";

const Navbar = ({ cartCount, cartTotal, onShowCart }) => {
  return (
    <nav style={styles.nav}>
      <h2>Mueblería Hermanos Jota</h2>
      <div style={styles.cart} onClick={onShowCart}>
        🛒 {cartCount} item(s) - Total: ${cartTotal.toLocaleString()}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#eee",
    marginBottom: "20px",
    borderBottom: "2px solid #ccc",
    cursor: "pointer"
  },
  cart: {
    fontSize: "18px",
  },
};

export default Navbar;
