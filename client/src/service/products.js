const getProduct = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/productos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export { getProduct };
