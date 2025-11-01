import {useState, useEffect, useNavigate} from 'react';
import {Link, useParams} from 'react-router-dom';
import {startCase} from 'lodash';


// funcionalidad de borrado de producto
export default function ProductDetailPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productData, setProductData]= useState(null);
    const {id} = useParams();
    const [deleteError, setDeleteError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate= useNavigate();

    useEffect(() => {
            const getProductById = async () => {
                try {
                    const response = await fetch(`/api/productos/${id}`);
                    if(!response.ok){
                        if(response.status === 404){
                            throw new Error('Producto inexistente')
                        }
                        if(response.status === 400){
                            throw new Error(`Id inválido`)
                        }
                        throw new Error('Petición no satisfactoria')
                    }
                    const data = await response.json()
                    setProductData(data)
    
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }; getProductById();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

        setDeleteError(null);
        setDeleteError(true);

        try{
            const response= await fetch(`/api/productos/${productData._id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',}
            });
            if (!response.ok){
                throw new Error('No fue posible borrar el producto')
            }
            navigate('/productos')

        }catch(error){
            setDeleteError(error.message)
        }finally{
            setDeleteLoading(false)
        }
    };

    if(loading){
        return <p>Cargando datos del producto...</p>
    }
    if(error){
        return <p>No fue posible obtener los datos: {error.message}</p>
    }
    return(
        <div>
            <Link to='/productos'>Volver al catálogo</Link>
            <div>
                <img src={productData.imagenUrl} alt='imagen del producto'></img>
                <h3>{productData.nombre}</h3>
                <h4>{productData.descripcion}</h4>
                <p>{productData.precio}</p>
                <button onClick={handleDelete} disabled={deleteLoading}>
                    { loading ? "Eliminando.." : "Eliminar producto"}
                </button>
                {deleteError && <p style={{color: "red"}}>{deleteError}</p>}
            </div>
            <div>
                {Object.entries(productData.detalle).map(([clave, valor]) => (
                    <div key={clave}>
                        <h2>{startCase(clave)}</h2>
                        <p>{valor}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}