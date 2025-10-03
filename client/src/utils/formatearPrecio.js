const parsearPrecio = (precio) => {
    if (typeof precio === "number") return precio;
    return Number(precio.replace("$", "")
        .replace(/\./g, "")
        .replace(",", ".")
    );
}


const formatearPrecio = (precio) => {
    return precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
    })
}

export { formatearPrecio, parsearPrecio }
