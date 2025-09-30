const getProduct = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/productos");
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
// Función para obtener la URL de la imagen
/* Esta funcion deberia ir en una carpeta helper, 
  pero por simplicidad del proyecto, la dejo aquí, 
  crear un archivo solo por esto es demasiado */
const getImageUrl = (imageName) => {
  try {
    return require(`../assets/productos/${imageName.split("/").pop()}`);
  } catch (error) {
    console.error("Error loading image:", error);
    return ""; // o una imagen por defecto
  }
};
export { getProduct, getImageUrl };
