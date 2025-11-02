import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {startCase} from 'lodash';
import { getImageUrl } from "../service/products";
import "./ProductDetailPage.css"

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
        <div className='main' >
            <section className='producto'>
                <Link className='boton' to='/productos'>Volver al catálogo</Link>
                <img className='producto-imagen' src={getImageUrl(productData.imagenUrl)} alt='imagen del producto'></img>
                <h1 className='producto-titulo' >{productData.nombre}</h1>
                <p className='producto-descripcion' >{productData.descripcion}</p>
                {/* <p>{productData.precio}</p> */}
                <button className='producto-boton' onClick={handleDelete} disabled={deleteLoading}>
                    { loading ? "Eliminando.." : "Eliminar producto"}
                </button>
                {deleteError && <p style={{color: "red"}}>{deleteError}</p>}
            </section>
            {productData.detalle &&
                <section className='detalles'>
                    {Object.entries(productData.detalle).map(([clave, valor]) => (
                        <div className='detalle' key={clave}>
                            <h2 className='detalle-titulo' >{startCase(clave)}</h2>
                            <p className='detalle-descripcion' >{valor}</p>
                        </div>
                    ))}
                </section>
            }
        </div>
    )
}