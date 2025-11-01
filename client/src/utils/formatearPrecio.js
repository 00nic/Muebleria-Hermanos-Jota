
const parsearPrecio = (precio) => {
    if (typeof precio === "number") return precio;
    return Number(precio.replace("$", "")
        .replace(/\./g, "")
        .replace(",", ".")
    );
};

const formatearPrecio = (precio) => {

    const numPrecio = Number(precio);

    if (isNaN(numPrecio) || precio === null || precio === undefined) {
        return "$ 0";
    }
    return numPrecio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
    });
};

export { formatearPrecio, parsearPrecio };