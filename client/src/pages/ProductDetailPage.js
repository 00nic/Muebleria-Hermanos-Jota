import { Link, useParams } from "react-router-dom";
import { startCase } from "lodash";
import { getImageUrl } from "../service/products";
import { useProductDetail } from "../hooks/useProductDetail";
import "./ProductDetailPage.css";

export default function ProductDetailPage({ addItem }) {
  const { id } = useParams();
  const { product, loading, error, deleteLoading, deleteError, handleDelete } =
    useProductDetail(id);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      alert(`${product.nombre} agregado al carrito!`);
    }
  };

  if (loading) {
    return <p>Cargando datos del producto...</p>;
  }

  if (error) {
    return <p>No fue posible obtener los datos: {error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="main">
      <section className="producto">
        <Link className="detalle-titulo" to="/productos">
          Volver al catálogo
        </Link>
        {getImageUrl(product.imagenUrl) && (
          <img
            className="producto-imagen"
            src={getImageUrl(product.imagenUrl)}
            alt="imagen del producto"
          />
        )}
        <h1 className="producto-titulo">{product.nombre}</h1>
        <p className="producto-descripcion">{product.descripcion}</p>
        <button
          className="producto-boton agregar-carrito"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
        <button
          className="producto-boton"
          onClick={handleDelete}
          disabled={deleteLoading}
        >
          {deleteLoading ? "Eliminando..." : "Eliminar producto"}
        </button>
        {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
      </section>
      {product.detalle && (
        <section className="detalles">
          {Object.entries(product.detalle).map(([clave, valor]) => (
            <div className="detalle" key={clave}>
              <h2 className="detalle-titulo">{startCase(clave)}</h2>
              <p className="detalle-descripcion">{valor}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
