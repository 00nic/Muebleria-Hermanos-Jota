// Utilidad para formatear fechas en español
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Obtener texto del estado del pedido
export const getOrderStatusText = (status) => {
    const statusMap = {
        pending: "Pendiente",
        completed: "Completado",
        cancelled: "Cancelado",
    };
    return statusMap[status] || status;
};

// Obtener clase CSS para el estado del pedido
export const getOrderStatusClass = (status) => {
    return `status-${status}`;
};
