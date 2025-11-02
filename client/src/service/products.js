export const getAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/productos");
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Ha ocurrido un error al cargar los productos");
  }
};
/* 

const deleteProduct = async (id) => {
  navigate('/productos');
  const confirm = window.confirm(
    "¿Estás seguro que deseas eliminar este producto?"
  );
  if (!confirm) return;
  try {
    const response = await fetch(`http://localhost:3001/api/productos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Ha ocurrido un error al eliminar el producto: " + error);
  }
}; 
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Borrar Producto
      </button>
*/

/* const submitProduct = async (productData) => {
  try {
    const response = await fetch("https://api.ejemplo.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // 3. Enviamos el estado del formulario
    });
    if (!response.ok) {
      throw new Error("El registro falló.");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting product:", error);
    throw new Error("Ha ocurrido un error al enviar el producto");
  }
}; */
// Función para obtener la URL de la imagen
/* Esta funcion deberia ir en una carpeta helper, 
  pero por simplicidad del proyecto, la dejo aquí, 
  crear un archivo solo por esto es demasiado */
export const getImageUrl = (imageName) => {
  try {
    return require(`../assets/productos/${imageName.split("/").pop()}`);
  } catch (error) {
    console.error("Error loading image:", error);
    return ""; // o una imagen por defecto
  }
};
