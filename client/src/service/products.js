const getProduct = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/productos");
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.message || "Ha ocurrido un error al cargar los productos"
    );
  }
};

export { getProduct };
