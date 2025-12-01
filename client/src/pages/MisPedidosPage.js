import { useState, useEffect } from "react";
import { getUserOrders } from "../service/pedidos";
import { useNotification } from "../context/NotificationContext";
import { formatearPrecio } from "../utils/formatearPrecio";
import {
    formatDate,
    getOrderStatusText,
    getOrderStatusClass,
} from "../utils/orderUtils";
import "./MisPedidosPage.css";

const MisPedidosPage = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();

    useEffect(() => {
        const cargarPedidos = async () => {
            try {
                setLoading(true);
                const response = await getUserOrders();
                setPedidos(response.orders || []);
            } catch (error) {
                console.error("Error al cargar pedidos:", error);
                showNotification(
                    error.message || "Error al cargar tus pedidos",
                    "error"
                );
            } finally {
                setLoading(false);
            }
        };
        cargarPedidos();
    }, [showNotification]);

    if (loading) {
        return (
            <div className="mis-pedidos-page">
                <div className="loading">Cargando pedidos...</div>
            </div>
        );
    }

    return (
        <div className="mis-pedidos-page">
            <h1>Mis Pedidos</h1>

            {pedidos.length === 0 ? (
                <div className="no-pedidos">
                    <p>No tienes pedidos aún.</p>
                    <a href="/productos" className="btn-comprar">
                        Ver Productos
                    </a>
                </div>
            ) : (
                <div className="pedidos-list">
                    {pedidos.map((pedido) => (
                        <div key={pedido._id} className="pedido-card">
                            <div className="pedido-header">
                                <div className="pedido-info">
                                    <h3>Pedido #{pedido._id.slice(-6)}</h3>
                                    <p className="pedido-fecha">
                                        {formatDate(pedido.createdAt)}
                                    </p>
                                </div>
                                <div
                                    className={`pedido-status ${getOrderStatusClass(
                                        pedido.status
                                    )}`}
                                >
                                    {getOrderStatusText(pedido.status)}
                                </div>
                            </div>

                            <div className="pedido-items">
                                {pedido.items.map((item, index) => (
                                    <div key={index} className="pedido-item">
                                        <div className="item-info">
                                            <span className="item-nombre">
                                                {item.nombre}
                                            </span>
                                            <span className="item-cantidad">
                                                x{item.quantity}
                                            </span>
                                        </div>
                                        <div className="item-precio">
                                            {formatearPrecio(
                                                item.precio * item.quantity
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pedido-footer">
                                <div className="pedido-total">
                                    <span>Total:</span>
                                    <span className="total-precio">
                                        {formatearPrecio(pedido.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MisPedidosPage;
