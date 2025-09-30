import React, { useState } from "react";
import Navbar from './Navbar';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState({}); // {productId: {product, quantity}}
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: '1', nombre: 'Aparador Uspallata', descripción: 'Aparador de seis puertas...', imagenUrl: 'img/productos/Aparador Uspallata.png', detalle: { precio: 450000 } },
    { id: '2', nombre: 'Biblioteca Recoleta', descripción: 'Sistema modular de estantes...', imagenUrl: 'img/productos/Biblioteca Recoleta.png', detalle: { precio: 380000 } },
    { id: '3', nombre: 'Butaca Mendoza', descripción: 'Butaca tapizada en bouclé...', imagenUrl: 'img/productos/Butaca Mendoza.png', detalle: { precio: 150000 } },
    { id: '4', nombre: 'Sillón Copacabana', descripción: 'Sillón lounge en cuero cognac...', imagenUrl: 'img/productos/Sillón Copacabana.png', detalle: { precio: 220000 } },
    { id: '5', nombre: 'Mesa de Centro Araucaria', descripción: 'Mesa de centro con sobre circular de mármol...', imagenUrl: 'img/productos/Mesa de Centro Araucaria.png', detalle: { precio: 110000 } },
    { id: '6', nombre: 'Mesa de Noche Aconcagua', descripción: 'Mesa de noche con cajón oculto...', imagenUrl: 'img/productos/Mesa de Noche Aconcagua.png', detalle: { precio: 75000 } }
  ];

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const prevItem = prevCart[product.id];
      const quantity = prevItem ? prevItem.quantity + 1 : 1;
      return {
        ...prevCart,
        [product.id]: { product, quantity }
      };
    });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prevCart,
        [productId]: { ...prevCart[productId], quantity }
      };
    });
  };

  const cartItemsCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = Object.values(cart).reduce((acc, item) => acc + item.product.detalle.precio * item.quantity, 0);

  return (
    <div className="App">
      <Navbar cartCount={cartItemsCount} cartTotal={cartTotal} onShowCart={() => setShowCart(!showCart)} />

      {showCart ? (
        <Cart cart={cart} onUpdateQuantity={handleUpdateQuantity} />
      ) : !selectedProduct ? (
        <div style={styles.productList}>
          {products.map(product => (
            <div key={product.id} style={styles.card} onClick={() => setSelectedProduct(product)}>
              <h3>{product.nombre}</h3>
              <img src={product.imagenUrl} alt={product.nombre} width="200"/>
              <p>${product.detalle.precio.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

const styles = {
  productList: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    padding: "20px",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    cursor: "pointer",
    width: "220px",
  },
};

export default App;
